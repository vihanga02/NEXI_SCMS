import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // Import useParams to access route parameters
import axios from "axios";
import './ProductDetails.css';

const ProductDetails = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [quantity, setQuantity] = useState(1);
    
    useEffect(() => {
        getProducts();
    }, [])

    const getProducts = async () => {
        try {
            const result = await axios.get('/customer/products/');
            setProducts(result.data);
        } catch (err) {
            setError("Error fetching products. Please try again later.");
        } finally {
            setLoading(false);
        }
    }

    const { id } = useParams(); // Get the product ID from the URL
    const product = products.find(p => p.Product_ID == id); // Find the product by ID

    // Loading state
    if (loading) {
        return <div>Loading...</div>; 
    }

    // Error handling
    if (error) {
        return <div>{error}</div>; 
    }

    // Handle case where product is not found
    if (!product) {
        return <div>Product not found</div>; 
    }

    const handleIncrease = () => {
        setQuantity(prevQuantity => prevQuantity + 1);
    };

    const handleDecrease = () => {
        setQuantity(prevQuantity => (prevQuantity > 1 ? prevQuantity - 1 : 1));
    };

    return (
        <div className="product-details">
            <div className="img-container">
                <img src={product.Image_Link} alt={product.Product_Name} />   
            </div>
            <div className="description-container">
                <h2>{product.Product_Name}</h2>
                <p className="price">Price: {product.Price}</p>
                <p className="product-description">{product.Description}</p>
                <div>
                    <button className="decrease" onClick={handleDecrease}>-</button>
                    <input type="number" min="1" value={quantity} readOnly />
                    <button className="increase" onClick={handleIncrease}>+</button>
                    <button className="add-to-cart">Add To Cart</button>
                </div>
            </div>  
        </div>
    );
};

export default ProductDetails;
