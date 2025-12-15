import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const client = new MongoClient(process.env.DOCDB_URI);

export async function connectDB() {
  await client.connect();
  console.log("✅ Conectado a Amazon DocumentDB");
  return client.db("universidad");
}

export async function closeDB() {
  await client.close();
  console.log("🔌 Conexión cerrada");
}
