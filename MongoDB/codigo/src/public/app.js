// ==================== CONFIGURACIÓN ====================
const API_URL = 'http://localhost:3900/api';
let currentEditId = null;

// ==================== INICIALIZACIÓN ====================
document.addEventListener('DOMContentLoaded', () => {
    initTabs();
    initForms();
    loadArticles();
});

// ==================== TABS ====================
function initTabs() {
    const tabs = document.querySelectorAll('.nav-tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', (e) => switchTab(e.target.dataset.tab));
    });
}

function switchTab(tabName) {
    // Ocultar todos los tabs
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    document.querySelectorAll('.nav-tab').forEach(btn => {
        btn.classList.remove('active');
    });

    // Mostrar el tab seleccionado
    document.getElementById('tab-' + tabName).classList.add('active');
    document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
}

// ==================== FORMULARIOS ====================
function initForms() {
    // Formulario de crear artículo
    const createForm = document.getElementById('form-create');
    if (createForm) {
        createForm.addEventListener('submit', handleCreateArticle);
    }

    // Formulario de actualizar artículo
    const updateForm = document.getElementById('form-update');
    if (updateForm) {
        updateForm.addEventListener('submit', handleUpdateArticle);
    }

    // Formulario de búsqueda
    const searchForm = document.getElementById('form-search');
    if (searchForm) {
        searchForm.addEventListener('submit', handleSearch);
    }
}

// ==================== CRUD: CREATE ====================
async function handleCreateArticle(e) {
    e.preventDefault();
    
    const formData = {
        titulo: document.getElementById('create-titulo').value,
        contenido: document.getElementById('create-contenido').value,
        autor: document.getElementById('create-autor').value,
        categoria: document.getElementById('create-categoria').value
    };

    showLoading('create-btn');
    
    try {
        const response = await fetch(`${API_URL}/articulo`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });
        
        const data = await response.json();
        
        if (response.ok) {
            showResult('result-create', data, false);
            document.getElementById('form-create').reset();
            loadArticles(); // Recargar la lista
            showNotification('Artículo creado exitosamente', 'success');
        } else {
            showResult('result-create', data, true);
            showNotification('Error al crear artículo', 'error');
        }
    } catch (error) {
        showResult('result-create', { error: error.message }, true);
        showNotification('Error de conexión', 'error');
    } finally {
        hideLoading('create-btn');
    }
}

// ==================== CRUD: READ ====================
async function loadArticles() {
    showLoading('articles-grid');
    
    try {
        const response = await fetch(`${API_URL}/articulo`);
        const data = await response.json();
        
        if (response.ok && data.articulos) {
            displayArticles(data.articulos);
        } else {
            displayEmptyState();
        }
    } catch (error) {
        console.error('Error al cargar artículos:', error);
        displayEmptyState();
    } finally {
        hideLoading('articles-grid');
    }
}

function displayArticles(articulos) {
    const container = document.getElementById('articles-grid');
    
    if (!articulos || articulos.length === 0) {
        displayEmptyState();
        return;
    }
    
    container.innerHTML = articulos.map(articulo => `
        <div class="article-card" data-id="${articulo._id}">
            <div class="article-header">
                <span class="article-id">ID: ${articulo._id.substring(0, 8)}...</span>
                <span class="badge" style="background: #667eea; color: white;">${articulo.categoria || 'Sin categoría'}</span>
            </div>
            
            <h3 class="article-title">${articulo.titulo}</h3>
            
            <p class="article-content">${articulo.contenido}</p>
            
            <div class="article-meta">
                <span class="meta-item">
                    <strong>Autor:</strong> ${articulo.autor || 'Anónimo'}
                </span>
                <span class="meta-item">
                    <strong>Visitas:</strong> ${articulo.visitas || 0}
                </span>
                <span class="meta-item">
                    <strong>Fecha:</strong> ${new Date(articulo.fecha).toLocaleDateString('es-ES')}
                </span>
                <span class="meta-item">
                    <strong>Estado:</strong> ${articulo.publicado ? 'Publicado' : 'Borrador'}
                </span>
            </div>
            
            <div class="article-actions">
                <button class="btn-edit" onclick="openEditModal('${articulo._id}')">
                    Editar
                </button>
                <button class="btn-delete" onclick="deleteArticle('${articulo._id}')">
                    Eliminar
                </button>
            </div>
        </div>
    `).join('');
}

function displayEmptyState() {
    const container = document.getElementById('articles-grid');
    container.innerHTML = `
        <div class="empty-state" style="grid-column: 1 / -1;">
            <div class="empty-state-icon"> </div>
            <p class="empty-state-text">No hay artículos aún. ¡Crea tu primer artículo!</p>
        </div>
    `;
}

// ==================== CRUD: UPDATE ====================
async function openEditModal(id) {
    currentEditId = id;
    
    try {
        const response = await fetch(`${API_URL}/articulo/${id}`);
        const data = await response.json();
        
        if (response.ok && data.articulo) {
            const articulo = data.articulo;
            
            // Llenar el formulario
            document.getElementById('update-id').value = articulo._id;
            document.getElementById('update-titulo').value = articulo.titulo;
            document.getElementById('update-contenido').value = articulo.contenido;
            document.getElementById('update-autor').value = articulo.autor || '';
            document.getElementById('update-categoria').value = articulo.categoria || '';
            
            // Mostrar modal
            document.getElementById('modal-update').classList.add('show');
            
            // Cambiar a la tab de actualizar
            switchTab('update');
        }
    } catch (error) {
        showNotification('Error al cargar artículo', 'error');
    }
}

function closeEditModal() {
    document.getElementById('modal-update').classList.remove('show');
    currentEditId = null;
    document.getElementById('form-update').reset();
}

async function handleUpdateArticle(e) {
    e.preventDefault();
    
    const id = document.getElementById('update-id').value;
    const formData = {
        titulo: document.getElementById('update-titulo').value,
        contenido: document.getElementById('update-contenido').value,
        autor: document.getElementById('update-autor').value,
        categoria: document.getElementById('update-categoria').value
    };

    showLoading('update-btn');
    
    try {
        const response = await fetch(`${API_URL}/articulo/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });
        
        const data = await response.json();
        
        if (response.ok) {
            showResult('result-update', data, false);
            closeEditModal();
            loadArticles(); // Recargar la lista
            showNotification('Artículo actualizado exitosamente', 'success');
        } else {
            showResult('result-update', data, true);
            showNotification('Error al actualizar artículo', 'error');
        }
    } catch (error) {
        showResult('result-update', { error: error.message }, true);
        showNotification('Error de conexión', 'error');
    } finally {
        hideLoading('update-btn');
    }
}

// ==================== CRUD: DELETE ====================
async function deleteArticle(id) {
    if (!confirm('¿Estás seguro de que deseas eliminar este artículo?')) {
        return;
    }
    
    try {
        const response = await fetch(`${API_URL}/articulo/${id}`, {
            method: 'DELETE'
        });
        
        const data = await response.json();
        
        if (response.ok) {
            loadArticles(); // Recargar la lista
            showNotification('Artículo eliminado exitosamente', 'success');
            
            // Mostrar resultado en la consola visual
            showResult('result-delete', data, false);
        } else {
            showNotification('Error al eliminar artículo', 'error');
            showResult('result-delete', data, true);
        }
    } catch (error) {
        showNotification('Error de conexión', 'error');
        showResult('result-delete', { error: error.message }, true);
    }
}

// ==================== BÚSQUEDA ====================
async function handleSearch(e) {
    e.preventDefault();
    
    const searchText = document.getElementById('search-text').value;
    const searchType = document.getElementById('search-type').value;
    
    showLoading('search-btn');
    
    try {
        let url = '';
        
        switch(searchType) {
            case 'texto':
                url = `${API_URL}/buscar/texto?texto=${encodeURIComponent(searchText)}`;
                break;
            case 'categoria':
                url = `${API_URL}/articulo`; // Filtraremos en el cliente
                break;
            case 'autor':
                url = `${API_URL}/articulo`; // Filtraremos en el cliente
                break;
        }
        
        const response = await fetch(url);
        const data = await response.json();
        
        if (response.ok) {
            let articulos = data.articulos || [];
            
            // Filtrar en el cliente si es necesario
            if (searchType === 'categoria') {
                articulos = articulos.filter(a => 
                    a.categoria && a.categoria.toLowerCase().includes(searchText.toLowerCase())
                );
            } else if (searchType === 'autor') {
                articulos = articulos.filter(a => 
                    a.autor && a.autor.toLowerCase().includes(searchText.toLowerCase())
                );
            }
            
            displaySearchResults(articulos, searchText);
        } else {
            showResult('result-search', data, true);
        }
    } catch (error) {
        showResult('result-search', { error: error.message }, true);
    } finally {
        hideLoading('search-btn');
    }
}

function displaySearchResults(articulos, searchTerm) {
    const container = document.getElementById('search-results');
    
    if (articulos.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon"> </div>
                <p class="empty-state-text">No se encontraron resultados para "${searchTerm}"</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = `
        <h3 style="color: #667eea; margin-bottom: 20px;">
            Resultados: ${articulos.length} artículo(s) encontrado(s)
        </h3>
        <div class="articles-grid">
            ${articulos.map(articulo => `
                <div class="article-card" data-id="${articulo._id}">
                    <div class="article-header">
                        <span class="article-id">ID: ${articulo._id.substring(0, 8)}...</span>
                        <span class="badge" style="background: #667eea; color: white;">${articulo.categoria || 'Sin categoría'}</span>
                    </div>
                    
                    <h3 class="article-title">${articulo.titulo}</h3>
                    
                    <p class="article-content">${articulo.contenido}</p>
                    
                    <div class="article-meta">
                        <span class="meta-item">
                            <strong>Autor:</strong> ${articulo.autor || 'Anónimo'}
                        </span>
                        <span class="meta-item">
                            <strong>Visitas:</strong> ${articulo.visitas || 0}
                        </span>
                        <span class="meta-item">
                            <strong>Fecha:</strong> ${new Date(articulo.fecha).toLocaleDateString('es-ES')}
                        </span>
                    </div>
                    
                    <div class="article-actions">
                        <button class="btn-edit" onclick="openEditModal('${articulo._id}')">
                            Editar
                        </button>
                        <button class="btn-delete" onclick="deleteArticle('${articulo._id}')">
                            Eliminar
                        </button>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

// ==================== ESTADÍSTICAS ====================
async function loadEstadisticas() {
    showLoading('estadisticas-container');
    
    try {
        const response = await fetch(`${API_URL}/estadisticas/categoria`);
        const data = await response.json();
        
        if (response.ok) {
            displayEstadisticas(data);
        }
    } catch (error) {
        console.error('Error al cargar estadísticas:', error);
    } finally {
        hideLoading('estadisticas-container');
    }
}

function displayEstadisticas(data) {
    const container = document.getElementById('estadisticas-container');
    
    if (!data || data.length === 0) {
        container.innerHTML = '<p>No hay datos de estadísticas</p>';
        return;
    }
    
    container.innerHTML = `
        <div class="grid">
            ${data.map(stat => `
                <div class="card">
                    <h4>${stat.categoria || 'Sin categoría'}</h4>
                    <div style="margin-top: 15px;">
                        <p><strong>Total artículos:</strong> ${stat.totalArticulos || stat.total}</p>
                        <p><strong>Total visitas:</strong> ${stat.totalVisitas || 0}</p>
                        <p><strong>Promedio visitas:</strong> ${stat.promedioVisitas || 0}</p>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

// ==================== PRUEBAS DE API ====================
async function testBuscarTexto() {
    try {
        const response = await fetch(`${API_URL}/buscar/texto?texto=mongodb`);
        const data = await response.json();
        showResult('result-texto', data);
    } catch (error) {
        showResult('result-texto', { error: error.message }, true);
    }
}

async function testOperadores() {
    try {
        const response = await fetch(`${API_URL}/buscar/operadores?operador=or&categoria1=Tecnología&categoria2=Ciencia`);
        const data = await response.json();
        showResult('result-operadores', data);
    } catch (error) {
        showResult('result-operadores', { error: error.message }, true);
    }
}

async function testComparacion() {
    try {
        const response = await fetch(`${API_URL}/buscar/comparacion?visitasMin=0&visitasMax=1000&categorias=Tecnología,Ciencia`);
        const data = await response.json();
        showResult('result-comparacion', data);
    } catch (error) {
        showResult('result-comparacion', { error: error.message }, true);
    }
}

async function testEstadisticas() {
    try {
        const response = await fetch(`${API_URL}/estadisticas/categoria`);
        const data = await response.json();
        showResult('result-estadisticas', data);
    } catch (error) {
        showResult('result-estadisticas', { error: error.message }, true);
    }
}

async function testMasVistos() {
    try {
        const response = await fetch(`${API_URL}/estadisticas/mas-vistos?limite=5`);
        const data = await response.json();
        showResult('result-masvistos', data);
    } catch (error) {
        showResult('result-masvistos', { error: error.message }, true);
    }
}

async function testIndices() {
    try {
        const response = await fetch(`${API_URL}/indices/info`);
        const data = await response.json();
        showResult('result-indices', data);
    } catch (error) {
        showResult('result-indices', { error: error.message }, true);
    }
}

// ==================== UTILIDADES ====================
function showResult(elementId, data, isError = false) {
    const resultDiv = document.getElementById(elementId);
    if (!resultDiv) return;
    
    resultDiv.innerHTML = '<pre>' + JSON.stringify(data, null, 2) + '</pre>';
    resultDiv.classList.add('show');
    if (isError) {
        resultDiv.classList.add('error');
    } else {
        resultDiv.classList.remove('error');
    }
}

function showLoading(elementId) {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    if (element.tagName === 'BUTTON') {
        element.disabled = true;
        element.innerHTML = '<span class="loading"></span>';
    }
}

function hideLoading(elementId) {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    if (element.tagName === 'BUTTON') {
        element.disabled = false;
        // Restaurar texto original del botón
        if (elementId === 'create-btn') element.innerHTML = 'Crear Artículo';
        if (elementId === 'update-btn') element.innerHTML = 'Guardar Cambios';
        if (elementId === 'search-btn') element.innerHTML = 'Buscar';
    }
}

function showNotification(message, type = 'success') {
    // Crear notificación
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 25px;
        background: ${type === 'success' ? '#4caf50' : '#f44336'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        z-index: 10000;
        animation: slideIn 0.3s;
    `;
    
    document.body.appendChild(notification);
    
    // Eliminar después de 3 segundos
    setTimeout(() => {
        notification.style.animation = 'fadeOut 0.3s';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Cerrar modal al hacer clic fuera
window.addEventListener('click', (e) => {
    const modal = document.getElementById('modal-update');
    if (e.target === modal) {
        closeEditModal();
    }
});
