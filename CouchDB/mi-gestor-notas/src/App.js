import React, { useState, useEffect } from 'react';
import { couchdbService } from './services/couchdbService';
import NoteForm from './components/NoteForm';
import NoteList from './components/NoteList';
import CategoryFilter from './components/CategoryFilter';
import SearchBar from './components/SearchBar';
import './App.css';

function App() {
  const [notes, setNotes] = useState([]);
  const [editingNote, setEditingNote] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([
    'Trabajo', 'Personal', 'Estudio', 'Ideas', 'Urgente'
  ]);

  // Cargar notas al iniciar
  useEffect(() => {
    loadNotes();
  }, []);

  const loadNotes = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await couchdbService.getAllNotes();
      setNotes(data);

      // Extraer categorías únicas de las notas
      const uniqueCategories = [...new Set(data.map(note => note.category))];
      const allCategories = [...new Set([...categories, ...uniqueCategories])];
      setCategories(allCategories);
    } catch (error) {
      console.error('Error cargando notas:', error);
      setError('Error al cargar las notas. Verifica que CouchDB esté corriendo.');
    } finally {
      setLoading(false);
    }
  };

  // CREATE
  const handleCreate = async (noteData) => {
    try {
      setError(null);
      await couchdbService.createNote(noteData);
      await loadNotes();
      setEditingNote(null);
    } catch (error) {
      console.error('Error creando nota:', error);
      setError('Error al crear la nota');
    }
  };

  // UPDATE
  const handleUpdate = async (id, noteData) => {
    try {
      setError(null);
      await couchdbService.updateNote(id, noteData);
      await loadNotes();
      setEditingNote(null);
    } catch (error) {
      console.error('Error actualizando nota:', error);
      setError('Error al actualizar la nota');
    }
  };

  // DELETE
  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar esta nota?')) {
      try {
        setError(null);
        await couchdbService.deleteNote(id);
        await loadNotes();
      } catch (error) {
        console.error('Error eliminando nota:', error);
        setError('Error al eliminar la nota');
      }
    }
  };

  // Filtrar notas
  const filteredNotes = notes.filter(note => {
    const matchesCategory = selectedCategory === 'all' ||
      note.category === selectedCategory;

    const matchesSearch = searchQuery === '' ||
      (note.title && note.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (note.content && note.content.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  const handleAddCategory = (newCategory) => {
    if (newCategory && !categories.includes(newCategory)) {
      setCategories([...categories, newCategory]);
    }
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>📓 Gestor de Notas</h1>
        <p>Total: {notes.length} notas | Mostrando: {filteredNotes.length}</p>
      </header>

      {error && (
        <div className="error-message" style={{
          background: '#ffebee',
          color: '#c62828',
          padding: '15px',
          borderRadius: '5px',
          marginBottom: '20px',
          textAlign: 'center'
        }}>
          ⚠️ {error}
        </div>
      )}

      <div className="main-content">
        <div className="sidebar">
          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            onAddCategory={handleAddCategory}
          />

          <SearchBar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />

          <div className="db-info" style={{
            background: 'white',
            padding: '15px',
            borderRadius: '10px',
            marginTop: '20px',
            fontSize: '14px',
            color: '#666'
          }}>
            <h4>💡 Información</h4>
            <p>CouchDB: {notes.length} notas cargadas</p>
            <p>Filtro: {selectedCategory === 'all' ? 'Todas' : selectedCategory}</p>
            <button
              onClick={loadNotes}
              style={{
                marginTop: '10px',
                padding: '8px 15px',
                background: '#2196f3',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                width: '100%'
              }}
            >
              🔄 Actualizar
            </button>
          </div>
        </div>

        <div className="content">
          <NoteForm
            onSubmit={editingNote ?
              (data) => handleUpdate(editingNote._id, data) :
              handleCreate}
            initialData={editingNote}
            categories={categories}
            onCancel={() => setEditingNote(null)}
          />

          {loading ? (
            <div className="loading">
              <div className="spinner" style={{
                border: '4px solid #f3f3f3',
                borderTop: '4px solid #667eea',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                animation: 'spin 1s linear infinite',
                margin: '0 auto 20px'
              }}></div>
              Cargando notas...
            </div>
          ) : (
            <>
              <div className="notes-header" style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '20px'
              }}>
                <h3>📝 Notas ({filteredNotes.length})</h3>
                <div className="stats">
                  <span style={{
                    marginRight: '15px',
                    color: '#666',
                    fontSize: '14px'
                  }}>
                    🟢 Alta: {filteredNotes.filter(n => n.priority === 'alta').length}
                  </span>
                  <span style={{
                    marginRight: '15px',
                    color: '#666',
                    fontSize: '14px'
                  }}>
                    🟡 Media: {filteredNotes.filter(n => n.priority === 'media').length}
                  </span>
                  <span style={{
                    color: '#666',
                    fontSize: '14px'
                  }}>
                    🔵 Baja: {filteredNotes.filter(n => n.priority === 'baja').length}
                  </span>
                </div>
              </div>

              {filteredNotes.length === 0 ? (
                <div className="empty-notes">
                  {searchQuery ?
                    `No se encontraron notas para "${searchQuery}"` :
                    selectedCategory !== 'all' ?
                      `No hay notas en la categoría "${selectedCategory}"` :
                      'No hay notas creadas aún. ¡Crea tu primera nota!'}
                </div>
              ) : (
                <NoteList
                  notes={filteredNotes}
                  onEdit={setEditingNote}
                  onDelete={handleDelete}
                />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;