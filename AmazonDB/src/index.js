import { connectDB, closeDB } from "./db/connection.js";
import { createAlumnos } from "./crud/create.js";
import { readAlumnos } from "./crud/read.js";
import { updateAlumno } from "./crud/update.js";
import { deleteAlumno } from "./crud/delete.js";
import { estadisticas } from "./aggregation/stats.js";

async function main() {
  const db = await connectDB();
  const alumnos = db.collection("alumnos");

  await alumnos.deleteMany({});
  console.log("🧹 Colección limpia");

  await createAlumnos(alumnos);
  await readAlumnos(alumnos);
  await updateAlumno(alumnos);
  await deleteAlumno(alumnos);
  await estadisticas(alumnos);

  await closeDB();
}

main();
