# 🚀 API REST - MongoDB Blog Demo

## 📋 Descripción
API REST completa para gestión de artículos de blog con MongoDB, demostrando todas las operaciones CRUD, consultas avanzadas y Aggregation Pipeline.

## ✅ Funcionalidades Implementadas

### 1. Configuración y Conexión
- ✅ MongoDB en localhost:27017
- ✅ Conexión con Mongoose
- ✅ Base de datos: `mi_blog`
- ✅ Colección: `articulos`

### 2. CRUD Básico
- ✅ **CREATE** - Inserción de documentos
- ✅ **READ** - Consultas básicas (todos y por ID)
- ✅ **UPDATE** - Actualización individual
- ✅ **DELETE** - Eliminación individual

### 3. Consultas Avanzadas
- ✅ Búsqueda por campo específico (categoría)
- ✅ Búsqueda con múltiples filtros
- ✅ Búsqueda por texto (text search)
- ✅ Operadores lógicos ($and, $or)
- ✅ Operadores de comparación ($gt, $lt, $in, $gte, $lte)

### 4. Operaciones Múltiples
- ✅ Actualización múltiple (updateMany)
- ✅ Eliminación múltiple (deleteMany)

### 5. Aggregation Pipeline
- ✅ $match - Filtrado de documentos
- ✅ $group - Agrupación con estadísticas
- ✅ $project - Selección de campos
- ✅ $sort - Ordenamiento
- ✅ $limit - Limitación de resultados

### 6. Índices
- ✅ Índice de texto: `{ titulo: 'text', contenido: 'text' }`
- ✅ Índice simple: `{ fecha: -1 }`
- ✅ Índice compuesto: `{ categoria: 1, fecha: -1 }`

## 🚀 Instalación y Ejecución

```bash
# Instalar dependencias
npm install

# Iniciar servidor
npm start
```

El servidor estará disponible en: **http://localhost:3900**

## 📚 Documentación Interactiva

Abre en tu navegador: **http://localhost:3900/index.html**

La documentación incluye:
- Lista completa de endpoints
- Ejemplos de uso
- Botones de prueba interactivos
- Checklist de funcionalidades

## 🔌 Endpoints Principales

### CRUD Básico
```
POST   /api/articulo           - Crear artículo
GET    /api/articulo           - Listar todos
GET    /api/articulo/:id       - Obtener uno
PUT    /api/articulo/:id       - Actualizar
DELETE /api/articulo/:id       - Eliminar
```

### Consultas Avanzadas
```
GET    /api/categoria/:categoria                    - Por categoría
GET    /api/buscar/filtros?autor=X&categoria=Y      - Múltiples filtros
GET    /api/buscar/texto?texto=palabra              - Text search
GET    /api/buscar/operadores?operador=or&...       - Operadores lógicos
GET    /api/buscar/comparacion?visitasMin=5&...     - Operadores comparación
```

### Operaciones Múltiples
```
PUT    /api/actualizar-multiple    - Actualizar varios
DELETE /api/eliminar-multiple      - Eliminar varios
```

### Aggregation Pipeline
```
GET    /api/estadisticas/categoria     - Estadísticas por categoría
GET    /api/estadisticas/mas-vistos    - Artículos más vistos
```

### Índices
```
GET    /api/indices/info    - Información de índices
```

## 💾 Modelo de Datos

```javascript
{
  titulo: String (requerido),
  contenido: String (requerido),
  fecha: Date (default: Date.now),
  imagen: String (default: "default.png"),
  autor: String,
  categoria: String,
  visitas: Number (default: 0),
  publicado: Boolean (default: true)
}
```

## 📝 Ejemplos de Uso

### Crear un artículo
```bash
curl -X POST http://localhost:3900/api/articulo \
  -H "Content-Type: application/json" \
  -d '{
    "titulo": "Mi artículo",
    "contenido": "Contenido del artículo",
    "autor": "Juan Pérez",
    "categoria": "Tecnología"
  }'
```

### Buscar por texto
```bash
curl http://localhost:3900/api/buscar/texto?texto=Node.js
```

### Obtener estadísticas
```bash
curl http://localhost:3900/api/estadisticas/categoria
```

## 🛠️ Tecnologías Utilizadas

- **Node.js** - Entorno de ejecución
- **Express** - Framework web
- **MongoDB** - Base de datos NoSQL
- **Mongoose** - ODM para MongoDB
- **CORS** - Habilitación de CORS
- **Validator** - Validación de datos

## 📊 Estructura del Proyecto

```
P2/
├── basedatos/
│   └── conexion.js          # Conexión a MongoDB
├── controladores/
│   └── articulo.js          # Lógica de negocio
├── modelos/
│   └── articulo.js          # Esquema Mongoose
├── rutas/
│   └── articulo.js          # Definición de rutas
├── public/
│   └── index.html           # Documentación interactiva
├── index.js                 # Servidor Express
└── package.json
```

## 🎯 Casos de Uso Demostrados

1. **Inserción de datos** - Crear artículos con validación
2. **Consultas simples** - Listar y buscar por ID
3. **Consultas complejas** - Filtros múltiples, text search
4. **Agregaciones** - Estadísticas y análisis de datos
5. **Optimización** - Uso de índices para mejorar rendimiento
6. **Operaciones masivas** - Actualizar/eliminar múltiples documentos

## 🔍 Pruebas Recomendadas

1. Crear varios artículos de diferentes categorías
2. Probar búsqueda por texto
3. Ejecutar consultas con operadores
4. Ver estadísticas agrupadas
5. Verificar índices creados
6. Probar actualización/eliminación múltiple

## 📱 Herramientas Adicionales

- **MongoDB Compass** - Visualizar base de datos
- **Postman/Thunder Client** - Probar endpoints
- **Navegador Web** - Documentación interactiva

## 👨‍💻 Autor

Yhosmar - Proyecto de Tecnologías Web

## 📄 Licencia

ISC
