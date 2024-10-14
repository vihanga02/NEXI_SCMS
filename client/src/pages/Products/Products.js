import React, { useEffect, useState } from "react";
import './Products.css';
import axios from "axios";
import '@fortawesome/fontawesome-free/css/all.min.css'; 
import ProductGrid from '../../components/ProductGrid/ProductGrid.js';
import { useParams } from "react-router-dom";

const Products = () => {
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    const { category } = useParams(); // Use "category" as the parameter name

    console.log(category); // Log the selected category

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async () => {
        try {
            const result = await axios.get('/customer/products');
            setProducts(result.data);
        } catch (err) {
            console.log(err);
        }
    };

    // Filter products based on the selected category and search term
    const filteredProducts = products.filter(product => 
        (category === "All" || product.Category === category) && 
        product.Product_Name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="products">
            <h1>{`Explore ${category} Products`}</h1>

            {/* Display the search bar when a category is selected */}
            <div className="search-container">
                <i className="fas fa-search search-icon"></i>
                <input 
                    type="text" 
                    className="search-bar" 
                    placeholder="Search products..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {/* Display filtered products */}
            <ProductGrid products={filteredProducts} />
        </div>
    );
};

export default Products;