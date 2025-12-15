Gestor de Notas con Categorías
Características principales:
Crear, leer, actualizar y eliminar notas

Categorizar notas con etiquetas

Búsqueda y filtrado

Interfaz responsive y amigable

Sincronización en tiempo real (si añades PouchDB)

🛠️ Estructura del Proyecto
bash
mi-gestor-notas/
├── src/
│   ├── components/
│   │   ├── NoteForm.jsx
│   │   ├── NoteList.jsx
│   │   ├── NoteItem.jsx
│   │   ├── CategoryFilter.jsx
│   │   └── SearchBar.jsx
│   ├── services/
│   │   └── couchdbService.js
│   ├── App.js
│   ├── App.css
│   └── index.js
📦 Instalación de Dependencias
bash
# Crear proyecto React
npx create-react-app mi-gestor-notas
cd mi-gestor-notas

# Instalar dependencias necesarias
npm install axios          # Para llamadas HTTP a CouchDB
npm install pouchdb-browser # Opcional para sincronización offline
npm install react-icons    # Para íconos
npm install @mui/material @emotion/react @emotion/styled  # Opcional para UI
🗄️ Base de Datos CouchDB
1. Crear base de datos en CouchDB:
javascript
// URL: http://localhost:5984/_utils
// Crear base de datos: "notes_app"
2. Configurar CORS en CouchDB:
bash
# En la configuración de CouchDB (Fauxton)
# Ir a: Configuración → CORS
# Habilitar CORS y agregar: http://localhost:3000

autor: gonzalo santiago
