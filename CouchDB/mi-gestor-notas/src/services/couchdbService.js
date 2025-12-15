import axios from 'axios';

// Configuración de CouchDB
const COUCHDB_URL = 'http://localhost:5984'; // Cambia si es necesario
const DB_NAME = 'notes_app';
const USERNAME = 'Gonzalo';   // Cambia si es necesario
const PASSWORD = '123456789'; // Cambia si es necesario

// Configuración de axios para CouchDB
const api = axios.create({
    baseURL: `${COUCHDB_URL}/${DB_NAME}`,
    headers: {
        'Content-Type': 'application/json'
    },
    auth: {
        username: USERNAME,
        password: PASSWORD
    }
});

export const couchdbService = {
    // CREATE - Crear nueva nota
    async createNote(note) {
        try {
            console.log('Enviando nota a CouchDB...');
            const noteWithTimestamp = {
                ...note,
                type: 'note',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            };

            const response = await api.post('/', noteWithTimestamp);
            console.log('Nota creada exitosamente:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error creando nota:', error);
            // Detalles adicionales del error
            if (error.response) {
                console.error('Response data:', error.response.data);
                console.error('Response status:', error.response.status);
            }
            throw error;
        }
    },

    // READ - Obtener todas las notas
    async getAllNotes() {
        try {
            const response = await api.get('/_all_docs?include_docs=true');
            // Filtramos solo los documentos de tipo 'note'
            const notes = response.data.rows
                .map(row => row.doc)
                .filter(doc => doc && doc.type === 'note');
            return notes;
        } catch (error) {
            console.error('Error obteniendo notas:', error);
            return [];
        }
    },

    // READ - Obtener una nota por ID
    async getNote(id) {
        try {
            const response = await api.get(`/${id}`);
            return response.data;
        } catch (error) {
            if (error.response?.status === 404) {
                return null;
            }
            console.error('Error obteniendo nota:', error);
            throw error;
        }
    },

    // UPDATE - Actualizar nota
    async updateNote(id, note) {
        try {
            // Obtener la nota actual para tener la revisión
            const current = await this.getNote(id);
            if (!current) {
                throw new Error('Nota no encontrada');
            }

            const updatedNote = {
                ...current,
                ...note,
                _id: id,
                _rev: current._rev,
                updatedAt: new Date().toISOString()
            };

            const response = await api.put(`/${id}`, updatedNote);
            return response.data;
        } catch (error) {
            console.error('Error actualizando nota:', error);
            throw error;
        }
    },

    // DELETE - Eliminar nota
    async deleteNote(id) {
        try {
            const current = await this.getNote(id);
            if (!current) {
                throw new Error('Nota no encontrada');
            }

            const response = await api.delete(`/${id}?rev=${current._rev}`);
            return response.data;
        } catch (error) {
            console.error('Error eliminando nota:', error);
            throw error;
        }
    },

    // Búsqueda por contenido (usando vistas o _find)
    async searchNotes(query) {
        try {
            // Usando _find (requiere que exista un índice, pero CouchDB 2.0+ lo soporta nativamente)
            const response = await api.post('/_find', {
                selector: {
                    type: 'note',
                    $or: [
                        { title: { $regex: `(?i)${query}` } },
                        { content: { $regex: `(?i)${query}` } }
                    ]
                }
            });
            return response.data.docs || [];
        } catch (error) {
            console.error('Error en búsqueda:', error);
            return [];
        }
    },

    // Obtener notas por categoría
    async getNotesByCategory(category) {
        try {
            const response = await api.post('/_find', {
                selector: {
                    type: 'note',
                    category: category
                }
            });
            return response.data.docs || [];
        } catch (error) {
            console.error('Error obteniendo notas por categoría:', error);
            return [];
        }
    }
};