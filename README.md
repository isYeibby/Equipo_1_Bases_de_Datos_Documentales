# Bases de Datos Documentales

## Descripción

Las **Bases de Datos Documentales** son un tipo de base de datos NoSQL diseñada para almacenar y gestionar información en documentos semi-estructurados (generalmente JSON, BSON o XML).

## Tabla de Contenidos

1. [Definición](#definición)
2. [Comparativa: SQL vs NoSQL](#comparativa-sql-vs-nosql)
3. [Manejadores Analizados](#manejadores-analizados)
4. [Tabla Comparativa Técnica](#tabla-comparativa-técnica)
5. [Referencias](#referencias)

---

## Definición

Las bases de datos documentales son un tipo de base de datos NoSQL diseñada para almacenar y gestionar información en documentos semi-estructurados (generalmente JSON, BSON o XML).

**Características principales:**
* **Flexibles:** No requieren un esquema predefinido (Schema-less)
* **Jerárquicos:** Un documento puede contener listas u otros documentos anidados
* **Escalables:** Diseñadas para escalar horizontalmente (Sharding)

---

## Comparativa: SQL vs NoSQL

### Modelo Relacional (SQL)
Los datos se normalizan y dividen en tablas. Requiere `JOINS` para unificar la información.

```sql
-- Tabla Usuarios
| ID | Nombre | Email |
|----|--------|-------|
| 1  | Ana    | ...   |

-- Tabla Redes (Relacionada por ID)
| UserID | Red     | Link |
|--------|---------|------|
| 1      | Twitter | @ana |
```

### Modelo Documental (NoSQL)

Los datos se almacenan juntos (Embedded), optimizando la lectura y el desarrollo.

```json
{
  "_id": 1,
  "nombre": "Ana",
  "email": "ana@email.com",
  "redes_sociales": [
    { "plataforma": "Twitter", "user": "@ana" },
    { "plataforma": "Instagram", "user": "@ana_foto" }
  ]
}
```

---

## Manejadores Analizados

* **MongoDB:** Líder del mercado. Base de datos de propósito general con formato BSON
* **Firebase Firestore:** Solución BaaS de Google. Ideal para aplicaciones móviles y en tiempo real
* **CouchDB:** Enfocado en la web, replicación maestro-maestro y capacidad offline
* **Couchbase:** Alto rendimiento con caché integrada y lenguaje N1QL (SQL para JSON)
* **Amazon DocumentDB:** Servicio gestionado de AWS compatible con MongoDB

---

## Tabla Comparativa Técnica

| Característica | MongoDB | Firestore | CouchDB | Couchbase | AWS DocumentDB |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Modelo** | BSON | JSON (Colecciones) | JSON | JSON / Key-Value | BSON |
| **Query Lang** | MQL | SDK Propio | MapReduce / Mango | N1QL (SQL-like) | MQL Compatible |
| **Arquitectura** | Replica Sets / Sharding | Serverless | Multi-Master | Shared-Nothing | Separa Storage/Compute |
| **Ideal para** | Big Data / Enterprise | Apps Móviles / Web | Offline-first | Gaming / Latencia Baja | Migración a Nube AWS |

---

## Referencias

* [MongoDB Manual](https://www.mongodb.com/document-databases)
* [AWS: What is a Document Database?](https://aws.amazon.com/nosql/document/)
* [Google Cloud Firestore Docs](https://cloud.google.com/firestore)
* [Couchbase Resources](https://www.google.com/search?q=https://www.couchbase.com/resources/why-nosql/document-databases/)
