
# ☁️ Firebase Cloud Firestore  
### Demo de Base de Datos NoSQL en Tiempo Real

---

## 📋 Descripción del Manejador

**Cloud Firestore** es una base de datos **NoSQL orientada a documentos**, desarrollada por Google como parte de la plataforma **Firebase**. Está diseñada para ser **altamente escalable**, **serverless** y con una capacidad clave de **sincronización de datos en tiempo real**, ideal para aplicaciones web y móviles modernas.

| Detalle | Valor |
| :--- | :--- |
| **Tipo de BD** | NoSQL de Documentos |
| **Desarrollador** | Google (Firebase) |
| **Licencia** | Comercial (Pago por uso, con plan gratuito) |
| **Modelo de Acceso** | SDKs nativos (Web, Android, iOS, etc.) |
| **Arquitectura** | Serverless (Google Cloud Platform) |

---

## 💡 Modelo de Datos y Arquitectura

Firestore organiza los datos en una jerarquía bien definida:

- **Colecciones**  
  Contenedores de documentos.

- **Documentos**  
  Unidades básicas de almacenamiento, con estructura clave–valor (similar a JSON).

- **Subcolecciones**  
  Colecciones anidadas dentro de un documento.

Esta estructura permite modelar datos complejos de forma flexible y eficiente.

---

## ✨ Funcionalidades Clave y Diferenciadores

| Característica | Detalle |
| :--- | :--- |
| **Tiempo Real** | Sincronización bidireccional inmediata usando `onSnapshot()`. Cualquier cambio se refleja al instante en todos los clientes conectados. |
| **Soporte Offline** | El SDK mantiene una caché local. Las operaciones funcionan sin conexión y se sincronizan automáticamente al restablecerse la red. |
| **Coherencia Fuerte** | Las lecturas siempre obtienen la versión más reciente del documento. |
| **Transacciones** | Soporte para transacciones atómicas (ACID) en operaciones de múltiples pasos. |
| **Escalabilidad** | Escalado horizontal automático gestionado por Google Cloud. |

---

## 🛠️ Demostración Práctica  
### CRUD Web con JavaScript y Firebase Emulator

La demostración consiste en una **aplicación web local** que utiliza el **Emulador de Firebase** para mostrar:

- Operaciones CRUD
- Sincronización en tiempo real
- Persistencia simulada de datos

---

## 🔌 Instalación y Ejecución Local

### Requisitos Previos
- **Node.js**
- **npm**
- **Java JDK**

### Pasos de Ejecución

```bash
# 1. Instalar la CLI de Firebase globalmente
npm install -g firebase-tools

# 2. Navegar a la carpeta del proyecto
cd tu-proyecto-firestore

# 3. Iniciar los emuladores y el hosting local
firebase emulators:start
````

> ⚠️ Nota importante:
> La línea
> `useEmulator('127.0.0.1', 8080);`
> en el archivo `app.js` es **crítica** para conectar la aplicación con el emulador de Firestore.

---

## 🔗 Endpoints de la Demo

| Recurso                  | Host / Puerto                                                      | Propósito                                                  |
| :----------------------- | :----------------------------------------------------------------- | :--------------------------------------------------------- |
| **App Web (Hosting)**    | [http://127.0.0.1:5500](http://127.0.0.1:5500)                     | Interfaz para realizar el CRUD y visualizar el tiempo real |
| **Consola del Emulador** | [http://127.0.0.1:4000/firestore](http://127.0.0.1:4000/firestore) | Interfaz gráfica para verificar los datos almacenados      |

---

## 📂 Operaciones CRUD (Funciones JavaScript)

| Operación  | Método Clave                      | Explicación                                               |
| :--------- | :-------------------------------- | :-------------------------------------------------------- |
| **CREATE** | `tasksCollection.add(...)`        | Crea un documento con ID generado automáticamente         |
| **READ**   | `tasksCollection.onSnapshot(...)` | Escucha cambios en tiempo real y actualiza la UI          |
| **UPDATE** | `doc(id).update(...)`             | Modifica campos específicos sin sobrescribir el documento |
| **DELETE** | `doc(id).delete()`                | Elimina un documento de la colección                      |

---

## 🌟 Operaciones Avanzadas Demostradas

### 🔍 Consulta Compuesta

Filtrado por prioridad **"Alta"** y ordenamiento por nombre:

```js
tasksCollection
  .where('priority', '==', 'Alta')
  .orderBy('name', 'asc')
  .get();
```

### ⏱️ Timestamp de Servidor

Uso de hora del servidor para garantizar precisión temporal:

```js
FieldValue.serverTimestamp()
```

---

## ⚖️ Ventajas y Desventajas

### ✅ Ventajas

* Excelente soporte **offline** y sincronización en tiempo real
* Arquitectura **serverless**, sin gestión de servidores
* Coherencia fuerte y soporte para transacciones

### ❌ Desventajas / Limitaciones

* El costo escala por número de lecturas y escrituras
* No soporta **JOINs** (requiere desnormalización)
* Índices compuestos deben definirse previamente

---

## 🎯 Casos de Uso (¿Cuándo Elegir Firestore?)

Firestore es ideal cuando la **experiencia del usuario** depende de baja latencia y tiempo real:

* Aplicaciones de chat y mensajería
* Juegos multijugador (estado y puntuaciones)
* Feeds sociales dinámicos
* Aplicaciones móviles con funcionamiento offline

---

## 👤 Autor

**Autor:** Vidal Canseco Leyva
**Tecnología:** Firebase – Cloud Firestore

