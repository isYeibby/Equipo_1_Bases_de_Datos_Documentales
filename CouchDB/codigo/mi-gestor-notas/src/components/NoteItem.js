import React from 'react';

const NoteItem = ({ note, onEdit, onDelete }) => {
    const { _id, title, content, category, priority, createdAt, updatedAt } = note;

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('es-ES', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className="note-card">
            <div className="note-header">
                <h3>{title}</h3>
                <span className={`priority-badge priority-${priority}`}>
                    {priority}
                </span>
            </div>
            <div className="note-meta">
                <span className="category-badge">{category}</span>
                <span className="note-date">
                    Creada: {formatDate(createdAt)}
                    {updatedAt !== createdAt && ` | Editada: ${formatDate(updatedAt)}`}
                </span>
            </div>
            <div className="note-content">
                <p>{content}</p>
            </div>
            <div className="note-actions">
                <button className="btn btn-secondary" onClick={() => onEdit(note)}>
                    Editar
                </button>
                <button className="btn btn-danger" onClick={() => onDelete(_id)}>
                    Eliminar
                </button>
            </div>
        </div>
    );
};

export default NoteItem;