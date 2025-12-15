import React, { useState } from 'react';

const CategoryFilter = ({ categories, selectedCategory, onSelectCategory, onAddCategory }) => {
    const [newCategory, setNewCategory] = useState('');

    const handleAddCategory = () => {
        if (newCategory.trim() && !categories.includes(newCategory.trim())) {
            onAddCategory(newCategory.trim());
            setNewCategory('');
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleAddCategory();
        }
    };

    return (
        <div className="category-filter">
            <h3>Categorías</h3>
            <div className="category-list">
                <button
                    className={`category-tag ${selectedCategory === 'all' ? 'active' : ''}`}
                    onClick={() => onSelectCategory('all')}
                >
                    Todas
                </button>
                {categories.map(category => (
                    <button
                        key={category}
                        className={`category-tag ${selectedCategory === category ? 'active' : ''}`}
                        onClick={() => onSelectCategory(category)}
                    >
                        {category}
                    </button>
                ))}
            </div>
            <div className="add-category">
                <input
                    type="text"
                    placeholder="Nueva categoría"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    onKeyPress={handleKeyPress}
                />
                <button onClick={handleAddCategory}>Añadir</button>
            </div>
        </div>
    );
};

export default CategoryFilter;