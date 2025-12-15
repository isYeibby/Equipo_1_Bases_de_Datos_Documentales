import React from 'react';
import NoteItem from './NoteItem';

const NoteList = ({ notes, onEdit, onDelete }) => {
    if (notes.length === 0) {
        return <div className="empty-notes">No hay notas para mostrar.</div>;
    }

    return (
        <div className="note-list">
            {notes.map(note => (
                <NoteItem
                    key={note._id}
                    note={note}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            ))}
        </div>
    );
};

export default NoteList;