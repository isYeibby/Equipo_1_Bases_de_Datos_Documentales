# API REST - MongoDB Blog Demo

## Descripción
API REST completa para gestión de artículos de blog con MongoDB, demostrando todas las operaciones CRUD, consultas avanzadas y Aggregation Pipeline.

---

## Sobre MongoDB

### ¿Qué es MongoDB?
MongoDB es una base de datos **NoSQL orientada a documentos** que rompe con el paradigma de tablas rígidas (filas/columnas) para almacenar información en documentos **BSON** (Binary JSON), permitiendo estructuras anidadas y jerárquicas que se alinean mejor con la programación orientada a objetos.

### Ficha Técnica
- **Empresa:** MongoDB Inc. (NASDAQ: MDB)
- **Versión Actual:** MongoDB 8.0 (Estable, Octubre 2024)
- **Licencia:** SSPL (Server Side Public License) - "Source Available"

### Arquitectura de Escalabilidad (Sharding)
MongoDB escala horizontalmente mediante **Sharding**:

1. **Shards (Fragmentos):** Servidores individuales que guardan solo una parte de los datos
2. **Mongos (Router):** Actúa como "recepcionista", redirigiendo consultas al shard correcto
3. **Config Servers:** Guardan metadatos y el mapa de ubicación de datos
4. **Chunks & Balancer:** Los datos se dividen en bloques (Chunks) que se equilibran automáticamente entre servidores

### MQL (MongoDB Query Language)
MQL es un lenguaje expresivo diseñado para documentos JSON. El **Aggregation Framework** permite:

- **$match**: Filtra documentos (equivalente a WHERE)
- **$group**: Agrupa datos (equivalente a GROUP BY)
- **$lookup**: Realiza uniones con otras colecciones (equivalente a LEFT JOIN)
- **$project**: Moldea el resultado final (equivalente a SELECT)

### Casos de Uso Reales

**Ejemplos de empresas que usan MongoDB:**
- **India's Aadhaar:** Sistema de identificación biométrica de 1.2 mil millones de personas
- **SEGA & FACEIT:** Perfiles de jugadores y matchmaking en tiempo real
- **Shutterfly:** Metadatos de 6 mil millones de fotos (10,000 ops/segundo)
- **Barclays:** Detección de fraude en tiempo real
- **Walmart & eBay:** Catálogos de productos con atributos variables
- **Forbes:** CMS para contenido viral y multimedia

### Ventajas y Desventajas

| Ventaja | Desventaja |
|---------|------------|
| **Esquema Flexible:** Cambia campos sin ALTER TABLE | **Uso de Memoria:** Alto consumo de RAM para índices |
| **Desarrollo Rápido:** Objetos JSON directos, sin ORM complejo | **Tamaño en Disco:** BSON ocupa más espacio que SQL |
| **Alta Disponibilidad:** Réplicas automáticas y self-healing | **Duplicidad de Datos:** Desnormalización para evitar Joins |

### Cuándo usar MongoDB
- Catálogos de productos con atributos variables (E-commerce)
- Gestión de contenido (CMS) con estructuras dinámicas
- Internet de las Cosas (IoT) - Ingesta masiva de sensores
- Vista única del cliente - Integración de múltiples fuentes

### Cuándo NO usar MongoDB
- Transacciones financieras complejas multi-tabla
- Reportes con múltiples Joins masivos
- Sistemas de auditoría con relaciones altamente complejas

---

## Funcionalidades Implementadas

### 1. Configuración y Conexión
- MongoDB en localhost:27017
- Conexión con Mongoose
- Base de datos: `mi_blog`
- Colección: `articulos`

### 2. CRUD Básico
- **CREATE** - Inserción de documentos
- **READ** - Consultas básicas (todos y por ID)
- **UPDATE** - Actualización individual
- **DELETE** - Eliminación individual

### 3. Consultas Avanzadas
- Búsqueda de texto completo con índices
- Operadores lógicos: $and, $or, $not, $nor
- Operadores de comparación: $gt, $gte, $lt, $lte, $in, $ne
- Filtrado por múltiples criterios

### 4. Aggregation Pipeline
- Estadísticas agrupadas por categoría
- Cálculos agregados: $sum, $avg, $max, $min
- Top artículos más visitados
- Transformaciones de datos con $project

### 5. Índices y Optimización
- Índices de texto para búsquedas full-text
- Índices compuestos para consultas multi-campo
- Monitoreo de rendimiento

---

## Estructura del Proyecto

```
MongoDB/
├── codigo/
│   └── src/
│       ├── index.js              # Servidor Express principal
│       ├── package.json          # Dependencias del proyecto
│       ├── basedatos/
│       │   └── conexion.js       # Configuración de MongoDB
│       ├── controladores/
│       │   └── articulo.js       # Lógica CRUD y consultas
│       ├── modelos/
│       │   └── articulo.js       # Esquema Mongoose
│       ├── rutas/
│       │   └── articulo.js       # Definición de endpoints
│       └── public/
│           ├── index.html        # Demo interactivo
│           ├── styles.css        # Estilos modularizados
│           └── app.js            # Lógica frontend
├── capturas/                     # Screenshots de Compass y MongoDB
└── README.md                     # Esta documentación
```

---

## Uso


**Iniciar el servidor**
```bash
npm start
```

**Acceder a la aplicación**
```
http://localhost:3900/index.html
```

---

## API Endpoints

### CRUD Básico

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/articulo` | Obtiene todos los artículos |
| GET | `/api/articulo/:id` | Obtiene un artículo por ID |
| POST | `/api/articulo` | Crea un nuevo artículo |
| PUT | `/api/articulo/:id` | Actualiza un artículo |
| DELETE | `/api/articulo/:id` | Elimina un artículo |

### Consultas Avanzadas

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/buscar/texto?texto=palabra` | Búsqueda de texto completo |
| GET | `/api/buscar/operadores?operador=or&categoria1=Tech` | Operadores lógicos |
| GET | `/api/buscar/comparacion?visitasMin=5&visitasMax=100` | Operadores de comparación |

### Aggregation

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/estadisticas/categoria` | Estadísticas por categoría |
| GET | `/api/estadisticas/mas-vistos?limite=5` | Top artículos más visitados |

### Índices

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/indices/info` | Información de índices |

---

## Ejemplos de Uso

### Crear un Artículo (POST)

**Request:**
```json
POST /api/articulo
Content-Type: application/json

{
  "titulo": "Introducción a MongoDB",
  "contenido": "MongoDB es una base de datos NoSQL...",
  "autor": "Juan Pérez",
  "categoria": "Tecnología"
}
```

**Response:**
```json
{
  "status": "success",
  "articulo": {
    "_id": "675d1234567890abcdef1234",
    "titulo": "Introducción a MongoDB",
    "contenido": "MongoDB es una base de datos NoSQL...",
    "autor": "Juan Pérez",
    "categoria": "Tecnología",
    "fecha": "2025-12-15T00:00:00.000Z",
    "visitas": 0,
    "publicado": true
  }
}
```

### Búsqueda de Texto (GET)

**Request:**
```
GET /api/buscar/texto?texto=mongodb
```

**Query MQL Equivalente:**
```javascript
db.articulos.find(
  { $text: { $search: "mongodb" } },
  { score: { $meta: "textScore" } }
).sort({ score: { $meta: "textScore" } })
```

### Aggregation: Estadísticas (GET)

**Request:**
```
GET /api/estadisticas/categoria
```

**Pipeline MQL:**
```javascript
db.articulos.aggregate([
  { $match: { publicado: true } },
  {
    $group: {
      _id: "$categoria",
      total: { $sum: 1 },
      totalVisitas: { $sum: "$visitas" },
      promedioVisitas: { $avg: "$visitas" }
    }
  },
  { $sort: { total: -1 } }
])
```

---

## Tecnologías Utilizadas

- **Backend:**
  - Node.js
  - Express.js
  - Mongoose
  - CORS

- **Base de Datos:**
  - MongoDB

- **Frontend:**
  - HTML5
  - CSS3
  - JavaScript

---

## Referencias

- Aerospike. (s.f.). *5 Real World Examples of MongoDB Issues*. Recuperado el 14 de diciembre de 2025, de https://aerospike.com/blog/mongodb-issues/

- AlmaBetter. (2024, 15 de septiembre). *MongoDB vs SQL: Which Database is Best for Developers?*. https://www.almabetter.com/bytes/articles/mongodb-vs-sql

- CData. (2024, 26 de agosto). *The Top 10 Real-World MongoDB Use Cases You Should Know in 2024*. https://www.cdata.com/blog/mongodb-use-cases

- Hevo Data. (2024, 16 de diciembre). *7 Best MongoDB Use Cases (Examples & When to Use)*. https://hevodata.com/learn/mongodb-use-case/

- Knowi. (s.f.). *The Best Introduction to MongoDB Query Language (MQL) [2025]*. Recuperado el 14 de diciembre de 2025, de https://www.knowi.com/blog/the-best-introduction-to-mongodb-query-language-mql/

- MongoDB Inc. (s.f.). *MongoDB Sharding*. MongoDB Manual. Recuperado de https://www.mongodb.com/docs/manual/sharding/

- MongoDB Inc. (2024). *MongoDB's 2024 Year in Review*. MongoDB Blog. https://www.mongodb.com/company/blog/mongodbs-2024-year-in-review

- RalanTech. (2025). *Advantages & Disadvantages of Using MongoDB (2025)*. https://www.ralantech.com/resources/advantages-disadvantages-of-using-mongodb-2025/
