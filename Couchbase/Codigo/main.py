import time
from datetime import timedelta

# Importaciones necesarias de Couchbase
from couchbase.cluster import Cluster
from couchbase.auth import PasswordAuthenticator
from couchbase.options import ClusterOptions
from couchbase.exceptions import DocumentNotFoundException

# --- CONFIGURACIÓN ---
DB_HOST = "localhost"
DB_USER = "admin"
DB_PASS = "123456"
BUCKET_NAME = "travel-sample"

# --- DATOS FIJOS (HARDCODED) ---
DOC_ID = "airline_demo_menu"
DATA_ORIGINAL = {
    "type": "airline",
    "id": 7777,
    "callsign": "LINUX-AIR",
    "iata": "LX",
    "name": "Endeavour Airlines",
    "country": "Arch Linux Land"
}

def conectar_db():
    print("Conectando a Couchbase...")
    try:
        auth = PasswordAuthenticator(DB_USER, DB_PASS)
        cluster = Cluster(f"couchbase://{DB_HOST}", ClusterOptions(auth))
        cluster.wait_until_ready(timedelta(seconds=5))
        bucket = cluster.bucket(BUCKET_NAME)
        collection = bucket.default_collection()
        print("Conectado exitosamente.\n")
        return collection
    except Exception as e:
        print(f"Error de conexión: {e}")
        print("Asegúrate que Couchbase esté corriendo en localhost:8091")
        exit()

def mostrar_menu():
    print("-" * 30)
    print("   MENÚ CRUD COUCHBASE")
    print("-" * 30)
    print("1. CREATE (Crear/Resetear documento)")
    print("2. READ   (Leer documento)")
    print("3. UPDATE (Actualizar país)")
    print("4. DELETE (Borrar documento)")
    print("5. Salir")
    print("-" * 30)

def main():
    collection = conectar_db()

    while True:
        mostrar_menu()
        opcion = input("Selecciona una opción: ")

        print("\n" + "="*30)
        
        try:
            # --- OPCIÓN 1: CREATE ---
            if opcion == "1":
                # Usamos upsert para crear o sobreescribir con los datos originales
                collection.upsert(DOC_ID, DATA_ORIGINAL)
                print(f"CREATE: Documento '{DOC_ID}' creado/restaurado.")
                print(f"   Datos: {DATA_ORIGINAL}")

            # --- OPCIÓN 2: READ ---
            elif opcion == "2":
                try:
                    resultado = collection.get(DOC_ID)
                    contenido = resultado.content_as[dict]
                    print(f"READ: Documento encontrado.")
                    print(f"   Nombre: {contenido['name']}")
                    print(f"   País:   {contenido['country']}")
                    print(f"   JSON completo: {contenido}")
                except DocumentNotFoundException:
                    print("READ: El documento no existe. Usa la opción 1 primero.")

            # --- OPCIÓN 3: UPDATE ---
            elif opcion == "3":
                try:
                    # Primero leemos para asegurarnos que existe
                    resultado = collection.get(DOC_ID)
                    doc_actual = resultado.content_as[dict]
                    
                    # Modificamos el dato fijo (alternamos el país para que se note el cambio)
                    if doc_actual["country"] == "Arch Linux Land":
                        doc_actual["country"] = "Mexico"
                    else:
                        doc_actual["country"] = "Arch Linux Land"
                    
                    collection.replace(DOC_ID, doc_actual)
                    print(f"UPDATE: Documento actualizado.")
                    print(f"   Nuevo País: {doc_actual['country']}")
                except DocumentNotFoundException:
                    print("UPDATE: No se puede actualizar un documento que no existe.")

            # --- OPCIÓN 4: DELETE ---
            elif opcion == "4":
                try:
                    collection.remove(DOC_ID)
                    print(f"DELETE: Documento '{DOC_ID}' eliminado correctamente.")
                except DocumentNotFoundException:
                    print("DELETE: El documento ya estaba borrado o no existe.")

            # --- SALIR ---
            elif opcion == "5":
                print("Cerrando programa...")
                break
            
            else:
                print("Opción no válida.")

        except Exception as e:
            print(f"Ocurrió un error inesperado: {e}")

        print("="*30 + "\n")
        time.sleep(1) # Pausa pequeña para leer

if __name__ == "__main__":
    main()