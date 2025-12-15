export async function readAlumnos(collection) {
  const todos = await collection.find().toArray();
  console.log("📖 Todos:", todos);

  const destacados = await collection.find({ promedio: { $gte: 9 } }).toArray();
  console.log("⭐ Destacados:", destacados);
}
