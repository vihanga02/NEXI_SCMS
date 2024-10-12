import React, { useEffect, useState } from "react";
import './ProductCategory.css'; // Import your existing styles
import axios from "axios";
import CatGrid from '../../components/CategoryGrid/Category.js'; // Import your category grid component
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation

const CategoryPage = () => {
    const [products, setProducts] = useState([]); // State for storing products
    const [categories, setCategories] = useState([]); // State for storing product categories
    const navigate = useNavigate(); // Initialize useNavigate for navigation

    useEffect(() => {
        getProducts(); // Fetch products when the component mounts
    }, []);

    const getProducts = async () => {
        try {
            const result = await axios.get('/customer/products'); // Fetch products from API
            setProducts(result.data);
            // Extract distinct categories from the products data
            const distinctCategories = [...new Set(result.data.map(product => product.Category))];
            setCategories(distinctCategories); // Set categories state
            console.log(result.data.map(product => product.Category));
        } catch (err) {
            console.log(err); // Log any errors
        }
    };

    const handleSelectCategory = (selectedCategory) => {
        navigate(`/products/${selectedCategory}`); 
    };

    return (
        <div className="products">
            <h1>Explore Categories</h1>

            {/* Show Category Grid */}
            <CatGrid category={categories} onSelectCategory={handleSelectCategory} />
        </div>
    );
};

export default CategoryPage;
