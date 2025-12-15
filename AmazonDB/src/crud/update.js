export async function updateAlumno(collection) {
  const result = await collection.updateOne(
    { nombre: "Luis" },
    { $set: { promedio: 9.1 } }
  );
  console.log("✏️ Actualizados:", result.modifiedCount);
}
