// ProductGrid.js
import React from "react";
import { Link } from 'react-router-dom';
import './ProductGrid.css'; // Ensure this CSS file is linked correctly

const ProductGrid = ({ products }) => {
    return (
        <div className="product-grid">
            {products.map(product => (
                <Link key={product.Product_ID} to={`/products/category/${product.Product_ID}`} className="product-item">
                    <img src={product.Image_Link} alt={product.Product_Name} />
                    <div className="product-name">{product.Product_Name}</div>
                    <div className="product-price">LKR {product.Price}</div>
                    <div><button className="add-to-cart">Add To Cart</button></div>
                </Link>
            ))}
        </div>
    );
};

export default ProductGrid;
