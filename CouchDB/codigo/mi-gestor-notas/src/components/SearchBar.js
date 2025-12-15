import React from 'react';

const SearchBar = ({ searchQuery, onSearchChange }) => {
    return (
        <div className="search-bar">
            <input
                type="text"
                placeholder="Buscar notas por título o contenido..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
            />
        </div>
    );
};

export default SearchBar;