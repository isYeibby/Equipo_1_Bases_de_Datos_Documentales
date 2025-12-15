const Articulo = require("../modelos/articulo");

const prueba = (req, res) => {
    return res.status(200).json({
        message: "Soy una acción de prueba en el controlador de articulos"
    });
};

// ==================== CRUD BÁSICO ====================

// CREATE - Crear un artículo
const crear = async (req, res) => {
    try {
        const { titulo, contenido, autor, categoria } = req.body;

        if (!titulo || !contenido) {
            return res.status(400).json({
                status: "error",
                message: "Faltan datos requeridos: titulo y contenido"
            });
        }

        const articulo = new Articulo({
            titulo,
            contenido,
            autor: autor || "Anónimo",
            categoria: categoria || "General"
        });

        const articuloGuardado = await articulo.save();

        return res.status(201).json({
            status: "success",
            message: "Artículo creado correctamente",
            articulo: articuloGuardado
        });
    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: "Error al crear el artículo",
            error: error.message
        });
    }
};

// READ - Listar todos los artículos
const listar = async (req, res) => {
    try {
        const articulos = await Articulo.find({}).sort({ fecha: -1 });

        return res.status(200).json({
            status: "success",
            total: articulos.length,
            articulos
        });
    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: "Error al listar artículos",
            error: error.message
        });
    }
};

// READ - Obtener un artículo por ID
const obtenerUno = async (req, res) => {
    try {
        const { id } = req.params;
        const articulo = await Articulo.findById(id);

        if (!articulo) {
            return res.status(404).json({
                status: "error",
                message: "Artículo no encontrado"
            });
        }

        // Incrementar visitas
        articulo.visitas += 1;
        await articulo.save();

        return res.status(200).json({
            status: "success",
            articulo
        });
    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: "Error al obtener el artículo",
            error: error.message
        });
    }
};

// UPDATE - Actualizar un artículo
const actualizar = async (req, res) => {
    try {
        const { id } = req.params;
        const datosActualizar = req.body;

        const articuloActualizado = await Articulo.findByIdAndUpdate(
            id,
            datosActualizar,
            { new: true, runValidators: true }
        );

        if (!articuloActualizado) {
            return res.status(404).json({
                status: "error",
                message: "Artículo no encontrado"
            });
        }

        return res.status(200).json({
            status: "success",
            message: "Artículo actualizado correctamente",
            articulo: articuloActualizado
        });
    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: "Error al actualizar el artículo",
            error: error.message
        });
    }
};

// DELETE - Eliminar un artículo
const eliminar = async (req, res) => {
    try {
        const { id } = req.params;
        const articuloEliminado = await Articulo.findByIdAndDelete(id);

        if (!articuloEliminado) {
            return res.status(404).json({
                status: "error",
                message: "Artículo no encontrado"
            });
        }

        return res.status(200).json({
            status: "success",
            message: "Artículo eliminado correctamente",
            articulo: articuloEliminado
        });
    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: "Error al eliminar el artículo",
            error: error.message
        });
    }
};

// ==================== CONSULTAS AVANZADAS ====================

// Búsqueda por campo específico
const buscarPorCategoria = async (req, res) => {
    try {
        const { categoria } = req.params;
        const articulos = await Articulo.find({ categoria }).sort({ fecha: -1 });

        return res.status(200).json({
            status: "success",
            total: articulos.length,
            categoria,
            articulos
        });
    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: "Error en la búsqueda",
            error: error.message
        });
    }
};

// Búsqueda con múltiples filtros
const buscarConFiltros = async (req, res) => {
    try {
        const { autor, categoria, publicado } = req.query;
        const filtros = {};

        if (autor) filtros.autor = autor;
        if (categoria) filtros.categoria = categoria;
        if (publicado !== undefined) filtros.publicado = publicado === 'true';

        const articulos = await Articulo.find(filtros).sort({ fecha: -1 });

        return res.status(200).json({
            status: "success",
            total: articulos.length,
            filtros,
            articulos
        });
    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: "Error en la búsqueda",
            error: error.message
        });
    }
};

// Búsqueda por texto (text search)
const buscarPorTexto = async (req, res) => {
    try {
        const { texto } = req.query;

        if (!texto) {
            return res.status(400).json({
                status: "error",
                message: "Parámetro 'texto' requerido"
            });
        }

        const articulos = await Articulo.find(
            { $text: { $search: texto } },
            { score: { $meta: "textScore" } }
        ).sort({ score: { $meta: "textScore" } });

        return res.status(200).json({
            status: "success",
            total: articulos.length,
            texto,
            articulos
        });
    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: "Error en la búsqueda",
            error: error.message
        });
    }
};

// Consultas con operadores lógicos
const buscarConOperadores = async (req, res) => {
    try {
        const { operador, categoria1, categoria2, visitasMin } = req.query;

        let query;
        
        if (operador === 'or') {
            // Búsqueda con $or
            query = {
                $or: [
                    { categoria: categoria1 || "Tecnología" },
                    { categoria: categoria2 || "Ciencia" }
                ]
            };
        } else {
            // Búsqueda con $and y operadores de comparación
            query = {
                $and: [
                    { categoria: categoria1 || "Tecnología" },
                    { visitas: { $gte: parseInt(visitasMin) || 0 } }
                ]
            };
        }

        const articulos = await Articulo.find(query).sort({ fecha: -1 });

        return res.status(200).json({
            status: "success",
            total: articulos.length,
            query,
            articulos
        });
    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: "Error en la búsqueda",
            error: error.message
        });
    }
};

// Consultas con operadores de comparación
const buscarConComparacion = async (req, res) => {
    try {
        const { visitasMin, visitasMax, categorias } = req.query;

        const query = {};

        if (visitasMin || visitasMax) {
            query.visitas = {};
            if (visitasMin) query.visitas.$gte = parseInt(visitasMin);
            if (visitasMax) query.visitas.$lte = parseInt(visitasMax);
        }

        if (categorias) {
            const categoriasArray = categorias.split(',');
            query.categoria = { $in: categoriasArray };
        }

        const articulos = await Articulo.find(query).sort({ visitas: -1 });

        return res.status(200).json({
            status: "success",
            total: articulos.length,
            query,
            articulos
        });
    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: "Error en la búsqueda",
            error: error.message
        });
    }
};

// Actualización múltiple
const actualizarMultiple = async (req, res) => {
    try {
        const { categoria, datosActualizar } = req.body;

        if (!categoria || !datosActualizar) {
            return res.status(400).json({
                status: "error",
                message: "Se requiere categoria y datosActualizar"
            });
        }

        const resultado = await Articulo.updateMany(
            { categoria },
            { $set: datosActualizar }
        );

        return res.status(200).json({
            status: "success",
            message: "Artículos actualizados correctamente",
            modificados: resultado.modifiedCount
        });
    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: "Error al actualizar artículos",
            error: error.message
        });
    }
};

// Eliminación múltiple
const eliminarMultiple = async (req, res) => {
    try {
        const { categoria } = req.body;

        if (!categoria) {
            return res.status(400).json({
                status: "error",
                message: "Se requiere el campo categoria"
            });
        }

        const resultado = await Articulo.deleteMany({ categoria });

        return res.status(200).json({
            status: "success",
            message: "Artículos eliminados correctamente",
            eliminados: resultado.deletedCount
        });
    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: "Error al eliminar artículos",
            error: error.message
        });
    }
};

// ==================== AGGREGATION PIPELINE ====================

// Agregación básica con $match, $group y $project
const estadisticasPorCategoria = async (req, res) => {
    try {
        const estadisticas = await Articulo.aggregate([
            // $match - Filtrar solo artículos publicados
            {
                $match: { publicado: true }
            },
            // $group - Agrupar por categoría
            {
                $group: {
                    _id: "$categoria",
                    total: { $sum: 1 },
                    totalVisitas: { $sum: "$visitas" },
                    promedioVisitas: { $avg: "$visitas" },
                    visitasMax: { $max: "$visitas" },
                    visitasMin: { $min: "$visitas" }
                }
            },
            // $project - Seleccionar y formatear campos
            {
                $project: {
                    _id: 0,
                    categoria: "$_id",
                    totalArticulos: "$total",
                    totalVisitas: 1,
                    promedioVisitas: { $round: ["$promedioVisitas", 2] },
                    visitasMax: 1,
                    visitasMin: 1
                }
            },
            // $sort - Ordenar por total de artículos
            {
                $sort: { totalArticulos: -1 }
            }
        ]);

        return res.status(200).json({
            status: "success",
            total: estadisticas.length,
            estadisticas
        });
    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: "Error en la agregación",
            error: error.message
        });
    }
};

// Agregación avanzada
const articulosMasVistos = async (req, res) => {
    try {
        const { limite } = req.query;

        const articulos = await Articulo.aggregate([
            {
                $match: { publicado: true }
            },
            {
                $sort: { visitas: -1 }
            },
            {
                $limit: parseInt(limite) || 10
            },
            {
                $project: {
                    titulo: 1,
                    autor: 1,
                    categoria: 1,
                    visitas: 1,
                    fecha: 1
                }
            }
        ]);

        return res.status(200).json({
            status: "success",
            total: articulos.length,
            articulos
        });
    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: "Error en la agregación",
            error: error.message
        });
    }
};

// Información de índices
const obtenerIndices = async (req, res) => {
    try {
        const indices = await Articulo.collection.getIndexes();

        return res.status(200).json({
            status: "success",
            message: "Índices de la colección articulos",
            indices
        });
    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: "Error al obtener índices",
            error: error.message
        });
    }
};

module.exports = {
    prueba,
    crear,
    listar,
    obtenerUno,
    actualizar,
    eliminar,
    buscarPorCategoria,
    buscarConFiltros,
    buscarPorTexto,
    buscarConOperadores,
    buscarConComparacion,
    actualizarMultiple,
    eliminarMultiple,
    estadisticasPorCategoria,
    articulosMasVistos,
    obtenerIndices
};
