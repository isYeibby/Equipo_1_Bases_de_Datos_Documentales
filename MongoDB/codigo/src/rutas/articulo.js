const express = require("express");
const router = express.Router();
const ArticuloController = require("../controladores/articulo");

// Rutas de prueba
router.get("/ruta-de-prueba", ArticuloController.prueba);

// ==================== CRUD BÁSICO ====================
router.post("/articulo", ArticuloController.crear);           // CREATE
router.get("/articulo", ArticuloController.listar);            // READ - Todos
router.get("/articulo/:id", ArticuloController.obtenerUno);   // READ - Uno
router.put("/articulo/:id", ArticuloController.actualizar);   // UPDATE
router.delete("/articulo/:id", ArticuloController.eliminar);  // DELETE

// ==================== CONSULTAS AVANZADAS ====================
router.get("/categoria/:categoria", ArticuloController.buscarPorCategoria);
router.get("/buscar/filtros", ArticuloController.buscarConFiltros);
router.get("/buscar/texto", ArticuloController.buscarPorTexto);
router.get("/buscar/operadores", ArticuloController.buscarConOperadores);
router.get("/buscar/comparacion", ArticuloController.buscarConComparacion);

// ==================== OPERACIONES MÚLTIPLES ====================
router.put("/actualizar-multiple", ArticuloController.actualizarMultiple);
router.delete("/eliminar-multiple", ArticuloController.eliminarMultiple);

// ==================== AGGREGATION PIPELINE ====================
router.get("/estadisticas/categoria", ArticuloController.estadisticasPorCategoria);
router.get("/estadisticas/mas-vistos", ArticuloController.articulosMasVistos);

// ==================== ÍNDICES ====================
router.get("/indices/info", ArticuloController.obtenerIndices);

module.exports = router;
