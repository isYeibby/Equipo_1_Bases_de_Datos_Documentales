export async function estadisticas(collection) {
  const result = await collection.aggregate([
    {
      $group: {
        _id: "$carrera",
        promedioGeneral: { $avg: "$promedio" },
        totalAlumnos: { $sum: 1 }
      }
    }
  ]).toArray();

  console.log("📊 Estadísticas:", result);
}
