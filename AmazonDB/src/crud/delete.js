export async function deleteAlumno(collection) {
  const result = await collection.deleteOne({ nombre: "Ana" });
  console.log("🗑️ Eliminados:", result.deletedCount);
}
