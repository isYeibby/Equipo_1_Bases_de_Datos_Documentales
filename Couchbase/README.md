# CRUD Interactivo de Couchbase con Python

Este proyecto es una aplicación de consola que demuestra las operaciones básicas (CRUD) sobre una base de datos documental **Couchbase**.

Utiliza un menú interactivo para crear, leer, actualizar y eliminar documentos en el bucket de ejemplo `travel-sample`. Está pensado para fines académicos, prácticas de bases de datos o pruebas de concepto.

---

## Requisitos Previos

Antes de ejecutar el proyecto, asegúrate de contar con lo siguiente:

1. **Python 3.6 o superior** instalado en el sistema.
2. **Couchbase Server** en ejecución en `localhost` (instalación local o mediante Docker).
3. Conexión a internet para descargar dependencias.

---

## Inicialización de la Base de Datos

Antes de ejecutar el script, Couchbase debe estar configurado correctamente:

1. **Acceder a la consola de Couchbase**

```

[http://localhost:8091](http://localhost:8091/)

````

2. **Credenciales utilizadas por el script**

- Usuario: `admin`
- Contraseña: `123456`

Si utilizas otras credenciales, edita las variables `DB_USER` y `DB_PASS` al inicio del archivo `main.py`.

3. **Cargar el bucket de ejemplo**

- Ve a **Settings > Sample Buckets**
- Selecciona y carga el bucket **travel-sample**

El script no funcionará si este bucket no existe.

---

## Instalación y Ejecución

### 1. Preparar el entorno (recomendado)

Se recomienda usar un entorno virtual para evitar conflictos de dependencias.

```bash
python -m venv venv
source venv/bin/activate
````

### 2. Instalar dependencias

Instala el SDK oficial de Couchbase para Python:

```bash
pip install couchbase
```

### 3. Ejecutar la aplicación

Ejecuta el script que contiene el menú CRUD:

```bash
python3 main.py
```

---

## Guía de Uso

Al ejecutar el programa se mostrará un menú interactivo con las siguientes opciones:

### Opción 1: CREATE (Crear / Resetear)

Crea un documento en la base de datos.

Si el documento ya existe, se sobrescribe con los valores originales. Esto es útil para reiniciar las pruebas.

### Opción 2: READ (Leer)

Busca el documento por su ID y muestra su contenido en formato JSON.

Si el documento no existe, el programa mostrará un mensaje de error.

### Opción 3: UPDATE (Actualizar)

Actualiza uno o más campos del documento existente.

Permite observar los cambios directamente al volver a ejecutar la opción de lectura.

### Opción 4: DELETE (Eliminar)

Elimina el documento de la base de datos usando su ID.

### Opción 5: Salir

Finaliza la ejecución del programa.

---

## Solución de Problemas Comunes

### Error de autenticación o conexión

- Verifica que Couchbase Server esté en ejecución.
    
- Asegúrate de que el usuario y la contraseña sean correctos.
    

### Error `BucketNotFound`

- Confirma que el bucket `travel-sample` esté cargado desde la consola de Couchbase.
    

### Error al ejecutar `pip install couchbase` en Linux

- Asegúrate de tener las herramientas de compilación instaladas.
    
- En Arch / EndeavourOS: `base-devel`
    
- Verifica que el entorno virtual esté activado.
    

---

## Autor

Jorge López López