// app.js

// 1. CONFIGURACIÓN E INICIALIZACIÓN (Con tu proyecto real)
const firebaseConfig = {
    apiKey: "AIzaSyDATVuMOyhwZMXbS24Da4aJZ4J72vrVC5A",
    authDomain: "bddf-92104.firebaseapp.com",
    projectId: "bddf-92104",
    storageBucket: "bddf-92104.firebasestorage.app",
    messagingSenderId: "968142126494",
    appId: "1:968142126494:web:dbb2c9cbb7e95b1596aa8f",
    measurementId: "G-C4Z0J9J8QP"
};

// Inicializa Firebase
firebase.initializeApp(firebaseConfig);

// 🚨 LÍNEA CRÍTICA: FORZAR CONEXIÓN AL EMULADOR 🚨
// Esto le dice al SDK que use el servidor local (127.0.0.1:8080) en lugar de la nube.
firebase.firestore().useEmulator('127.0.0.1', 8080); 

const db = firebase.firestore();
const tasksCollection = db.collection('tareas');

// --------------------------------------------------------
// 2. FUNCIÓN R (READ) - LECTURA EN TIEMPO REAL (onSnapshot)
// --------------------------------------------------------

tasksCollection.onSnapshot(snapshot => {
    const tasksList = document.getElementById('tasks-list');
    tasksList.innerHTML = ''; // Limpiar la lista
    
    // Ocultar mensaje de carga una vez que se reciban los datos
    document.getElementById('loading-message')?.remove(); 

    snapshot.forEach(doc => {
        const task = doc.data();
        const taskId = doc.id; 

        // Crea un DIV con clases de Bootstrap para el estilo
        const taskDiv = document.createElement('div');
        taskDiv.className = 'task-item'; 
        
        // Contenido de la tarea
        taskDiv.innerHTML = `
            <div class="task-content">
                <strong class="text-dark">${task.name}</strong> 
                <span class="badge bg-secondary ms-2">${task.priority}</span>
            </div>
            <div class="task-actions">
                <button class="btn btn-sm btn-outline-primary me-2" 
                        onclick="updateTask('${taskId}', '${task.priority}')">
                    Cambiar Prioridad (UPDATE)
                </button>
                <button class="btn btn-sm btn-outline-danger" 
                        onclick="deleteTask('${taskId}')">
                    Eliminar (DELETE)
                </button>
            </div>
        `;
        tasksList.appendChild(taskDiv);
    });
});

// --------------------------------------------------------
// 3. FUNCIÓN C (CREATE)
// --------------------------------------------------------

document.getElementById('task-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('task-name').value;
    const priority = document.getElementById('task-priority').value;

    tasksCollection.add({
        name: name,
        priority: priority,
        timestamp: firebase.firestore.FieldValue.serverTimestamp() // Op. Avanzada 1: Timestamp
    })
    .then(() => {
        console.log("Tarea agregada con éxito.");
        document.getElementById('task-form').reset();
    })
    .catch(error => {
        console.error("Error al agregar tarea: ", error);
    });
});

// --------------------------------------------------------
// 4. FUNCIÓN U (UPDATE)
// --------------------------------------------------------

function updateTask(id, currentPriority) {
    let newPriority;
    // Lógica simple para rotar prioridad
    if (currentPriority === 'Baja') newPriority = 'Media';
    else if (currentPriority === 'Media') newPriority = 'Alta';
    else newPriority = 'Baja';
    
    // El onSnapshot actualizará la UI automáticamente
    tasksCollection.doc(id).update({
        priority: newPriority
    })
    .then(() => console.log("Tarea actualizada."))
    .catch(error => console.error("Error al actualizar: ", error));
}

// --------------------------------------------------------
// 5. FUNCIÓN D (DELETE)
// --------------------------------------------------------

function deleteTask(id) {
    tasksCollection.doc(id).delete()
    .then(() => console.log("Tarea eliminada."))
    .catch(error => console.error("Error al eliminar: ", error));
}

// --------------------------------------------------------
// 6. OPERACIÓN AVANZADA ESPECÍFICA (Consulta Compuesta)
// --------------------------------------------------------

document.getElementById('run-advanced-query').addEventListener('click', () => {
    const resultsDiv = document.getElementById('advanced-results');
    resultsDiv.innerHTML = 'Cargando...';

    // Op. Avanzada 3: Consulta Filtrada y Ordenada
    tasksCollection
        .where('priority', '==', 'Alta')
        .orderBy('name', 'asc')
        .get() // Usamos .get() en lugar de onSnapshot para una lectura única
        .then(snapshot => {
            resultsDiv.innerHTML = '';
            snapshot.forEach(doc => {
                const task = doc.data();
                resultsDiv.innerHTML += `<div class="alert alert-success p-2 mt-1">${task.name}</div>`;
            });
            if (snapshot.empty) {
                resultsDiv.innerHTML = '<div class="alert alert-warning p-2 mt-1">No hay tareas de alta prioridad.</div>';
            }
        })
        .catch(error => console.error("Error en consulta avanzada: ", error));
});