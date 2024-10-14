import React from "react";
import './Category.css'; // Ensure this CSS file is linked correctly

const CatGrid = ({ category, onSelectCategory }) => {
    // Create a new array with "All" added at the start
    const categoriesWithAll = [ ...category,"All"]; 
    
    return (
        <div className="cat-grid">
            {categoriesWithAll.map(cat => (
                <div key={cat} className="cat-item" onClick={() => onSelectCategory(cat)}>
                    <img src={`/assets/${cat}.jpg`} alt={cat} />
                </div>
            ))}
        </div>
    );
};

export default CatGrid;
