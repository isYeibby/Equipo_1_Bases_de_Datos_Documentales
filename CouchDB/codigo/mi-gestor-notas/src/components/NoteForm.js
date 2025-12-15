import React, { useState, useEffect } from 'react';

const NoteForm = ({ onSubmit, initialData, categories, onCancel }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState(categories[0] || '');
    const [priority, setPriority] = useState('media');

    useEffect(() => {
        // Define resetForm dentro del useEffect
        const resetForm = () => {
            setTitle('');
            setContent('');
            setCategory(categories[0] || '');
            setPriority('media');
        };

        if (initialData) {
            setTitle(initialData.title || '');
            setContent(initialData.content || '');
            setCategory(initialData.category || categories[0] || '');
            setPriority(initialData.priority || 'media');
        } else {
            resetForm();
        }
    }, [initialData, categories]); // Solo estas dependencias

    const handleSubmit = (e) => {
        e.preventDefault();
        const noteData = { title, content, category, priority };
        onSubmit(noteData);
        if (!initialData) {
            // Reset manual cuando no hay initialData
            setTitle('');
            setContent('');
            setCategory(categories[0] || '');
            setPriority('media');
        }
    };
    return (
        <form className="note-form" onSubmit={handleSubmit}>
            <h2>{initialData ? 'Editar Nota' : 'Nueva Nota'}</h2>
            <input
                type="text"
                placeholder="Título"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />
            <textarea
                placeholder="Contenido"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
            />
            <div className="form-row">
                <select value={category} onChange={(e) => setCategory(e.target.value)}>
                    {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                    ))}
                </select>
                <select value={priority} onChange={(e) => setPriority(e.target.value)}>
                    <option value="alta">Alta</option>
                    <option value="media">Media</option>
                    <option value="baja">Baja</option>
                </select>
            </div>
            <div className="form-buttons">
                <button type="submit" className="btn btn-primary">
                    {initialData ? 'Actualizar' : 'Crear'}
                </button>
                {initialData && (
                    <button type="button" className="btn btn-secondary" onClick={onCancel}>
                        Cancelar
                    </button>
                )}
            </div>
        </form>
    );
};

export default NoteForm;