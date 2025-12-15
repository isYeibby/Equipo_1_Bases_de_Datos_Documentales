const express = require("express");
const cors = require("cors");
const { conexion } = require("./basedatos/conexion");

// Conectar a la base de datos
conexion();

// Crear servidor de express
const app = express();
const puerto = 3900;

// Configurar CORS
app.use(cors());

// Convertir body a objeto JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir archivos estáticos
app.use(express.static('public'));

// Usar rutas
const rutas_articulo = require("./rutas/articulo");

// Cargar rutas
app.use("/api", rutas_articulo);

// Ruta principal
app.get("/", (req, res) => {
    console.log("Ruta principal OK");
    return res.status(200).send("<h1>Hola mundo con Node.js y Express</h1>");
});

// Iniciar servidor
app.listen(puerto, () => {
    console.log("Servidor corriendo en el puerto " + puerto);
    console.log("Documentación disponible en: http://localhost:" + puerto + "/index.html");
});
