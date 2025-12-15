export async function createAlumnos(collection) {
  const result = await collection.insertMany([
    { nombre: "Karen", carrera: "Ingeniería en Sistemas", edad: 21, promedio: 9.2, activo: true },
    { nombre: "Luis", carrera: "Ingeniería en Sistemas", edad: 22, promedio: 8.4, activo: true },
    { nombre: "Ana", carrera: "Ingeniería Industrial", edad: 23, promedio: 9.6, activo: false }
  ]);
  console.log("📌 Insertados:", result.insertedCount);
}
