import React, { useEffect, useState } from "react";
import './Products.css';
import { Link } from 'react-router-dom';
import axios from "axios";


const Products = () => {

    const [products, setProducts] = useState([]);
    
    useEffect(() => {
        getProducts();
    },[])

    const getProducts = async () => {
        try{
            const result = await axios.get('/customer/products');
            setProducts(result.data);
        }
        catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="products">
            <h1>Explore Products</h1>
            <div className="product-grid">
                {products.map(product => (
                    <Link key={product.id} to={`/products/${product.Product_ID}`} className="product-item">
                        <img src={product.Image_Link} alt={product.Product_Name} />
                        <div className="product-name">{product.Product_Name}</div>
                        <div className="product-price">{product.Price}</div>
                        <div><button className="add-to-cart">Add To Cart</button></div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Products;
