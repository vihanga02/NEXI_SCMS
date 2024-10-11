import React from "react";
import { useParams } from "react-router-dom"; // Import useParams to access route parameters
import './ProductDetails.css';
import axios from "axios";
import { useEffect, useState } from "react";

const ProductDetails = () => {
    const [products, setProducts] = useState([]);
    
    useEffect(() => {
        getProducts();
    },[])

    const getProducts = async () => {
        try{
            const result = await axios.get('/customer/products/');
            setProducts(result.data);
        }
        catch (err) {
            console.log(err);
        }
    }

    const { id } = useParams(); // Get the product ID from the URL
    const product = products.find(p => p.Product_ID == id); // Find the product by ID
    if (!product) {
        return <div>Product not found</div>; // Handle case where product is not found
    }

    return (
        <div className="product-details">
            <div className="img-container">
                <img src={product.Image_Link} alt={product.Product_Name} />   
            </div>
            <div className="discription-container">
                <h2>{product.Product_Name}</h2>
                <p className="price">Price: {product.Price}</p>
                
                <p className="product-descritpion">{product.Description}</p>
                <button className="add-to-cart">Add To Cart</button>
            </div>  
        </div>
    );
};

export default ProductDetails;
