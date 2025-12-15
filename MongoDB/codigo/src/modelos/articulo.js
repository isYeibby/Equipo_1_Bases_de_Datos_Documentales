const { Schema, model } = require("mongoose");

const ArticuloSchema = Schema({
    titulo: {
        type: String,
        required: true
    },
    contenido: {
        type: String,
        required: true
    },
    fecha: {
        type: Date,
        default: Date.now
    },
    imagen: {
        type: String,
        default: "default.png"
    },
    autor: {
        type: String,
        required: false
    },
    categoria: {
        type: String,
        required: false
    },
    visitas: {
        type: Number,
        default: 0
    },
    publicado: {
        type: Boolean,
        default: true
    }
});

// Crear índice de texto para búsqueda
ArticuloSchema.index({ titulo: 'text', contenido: 'text' });

// Crear índice simple en fecha
ArticuloSchema.index({ fecha: -1 });

// Crear índice compuesto
ArticuloSchema.index({ categoria: 1, fecha: -1 });

module.exports = model("Articulo", ArticuloSchema, "articulos");
