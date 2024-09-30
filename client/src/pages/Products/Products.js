import React from "react";
import './Products.css';
import { Link } from 'react-router-dom';


const products = [
    { id: '1', name: 'Product 1', price: '$20', image: 'https://img.freepik.com/free-photo/elegant-smartphone-composition_23-2149437106.jpg?t=st=1727331980~exp=1727335580~hmac=1854a4f49245882ca05cdda49c3c900d319bd3c33a78f75d32e5e0216b5f2bab&w=826' },
    { id: '2', name: 'Product 2', price: '$30', image: 'https://img.freepik.com/free-photo/elegant-smartphone-composition_23-2149437106.jpg?t=st=1727331980~exp=1727335580~hmac=1854a4f49245882ca05cdda49c3c900d319bd3c33a78f75d32e5e0216b5f2bab&w=826' },
    { id: '3', name: 'Product 3', price: '$40', image: 'https://img.freepik.com/free-photo/elegant-smartphone-composition_23-2149437106.jpg?t=st=1727331980~exp=1727335580~hmac=1854a4f49245882ca05cdda49c3c900d319bd3c33a78f75d32e5e0216b5f2bab&w=826' },
    { id: '4', name: 'Product 4', price: '$50', image: 'https://img.freepik.com/free-photo/elegant-smartphone-composition_23-2149437106.jpg?t=st=1727331980~exp=1727335580~hmac=1854a4f49245882ca05cdda49c3c900d319bd3c33a78f75d32e5e0216b5f2bab&w=826' },
    { id: '5', name: 'Product 5', price: '$60', image: 'https://img.freepik.com/free-photo/elegant-smartphone-composition_23-2149437106.jpg?t=st=1727331980~exp=1727335580~hmac=1854a4f49245882ca05cdda49c3c900d319bd3c33a78f75d32e5e0216b5f2bab&w=826' },
    { id: '6', name: 'Product 6', price: '$70', image: 'https://img.freepik.com/free-photo/elegant-smartphone-composition_23-2149437106.jpg?t=st=1727331980~exp=1727335580~hmac=1854a4f49245882ca05cdda49c3c900d319bd3c33a78f75d32e5e0216b5f2bab&w=826' },
    { id: '6', name: 'Product 6', price: '$70', image: 'https://img.freepik.com/free-photo/elegant-smartphone-composition_23-2149437106.jpg?t=st=1727331980~exp=1727335580~hmac=1854a4f49245882ca05cdda49c3c900d319bd3c33a78f75d32e5e0216b5f2bab&w=826' },
    { id: '6', name: 'Product 6', price: '$70', image: 'https://img.freepik.com/free-photo/elegant-smartphone-composition_23-2149437106.jpg?t=st=1727331980~exp=1727335580~hmac=1854a4f49245882ca05cdda49c3c900d319bd3c33a78f75d32e5e0216b5f2bab&w=826' },
    { id: '6', name: 'Product 6', price: '$70', image: 'https://img.freepik.com/free-photo/elegant-smartphone-composition_23-2149437106.jpg?t=st=1727331980~exp=1727335580~hmac=1854a4f49245882ca05cdda49c3c900d319bd3c33a78f75d32e5e0216b5f2bab&w=826' },
    { id: '6', name: 'Product 6', price: '$70', image: 'https://img.freepik.com/free-photo/elegant-smartphone-composition_23-2149437106.jpg?t=st=1727331980~exp=1727335580~hmac=1854a4f49245882ca05cdda49c3c900d319bd3c33a78f75d32e5e0216b5f2bab&w=826' },
    { id: '6', name: 'Product 6', price: '$70', image: 'https://img.freepik.com/free-photo/elegant-smartphone-composition_23-2149437106.jpg?t=st=1727331980~exp=1727335580~hmac=1854a4f49245882ca05cdda49c3c900d319bd3c33a78f75d32e5e0216b5f2bab&w=826' },
    { id: '6', name: 'Product 6', price: '$70', image: 'https://img.freepik.com/free-photo/elegant-smartphone-composition_23-2149437106.jpg?t=st=1727331980~exp=1727335580~hmac=1854a4f49245882ca05cdda49c3c900d319bd3c33a78f75d32e5e0216b5f2bab&w=826' },
    { id: '6', name: 'Product 6', price: '$70', image: 'https://img.freepik.com/free-photo/elegant-smartphone-composition_23-2149437106.jpg?t=st=1727331980~exp=1727335580~hmac=1854a4f49245882ca05cdda49c3c900d319bd3c33a78f75d32e5e0216b5f2bab&w=826' },
    { id: '6', name: 'Product 6', price: '$70', image: 'https://img.freepik.com/free-photo/elegant-smartphone-composition_23-2149437106.jpg?t=st=1727331980~exp=1727335580~hmac=1854a4f49245882ca05cdda49c3c900d319bd3c33a78f75d32e5e0216b5f2bab&w=826' },
    { id: '6', name: 'Product 6', price: '$70', image: 'https://img.freepik.com/free-photo/elegant-smartphone-composition_23-2149437106.jpg?t=st=1727331980~exp=1727335580~hmac=1854a4f49245882ca05cdda49c3c900d319bd3c33a78f75d32e5e0216b5f2bab&w=826' },
    { id: '6', name: 'Product 6', price: '$70', image: 'https://img.freepik.com/free-photo/elegant-smartphone-composition_23-2149437106.jpg?t=st=1727331980~exp=1727335580~hmac=1854a4f49245882ca05cdda49c3c900d319bd3c33a78f75d32e5e0216b5f2bab&w=826' },
    { id: '6', name: 'Product 6', price: '$70', image: 'https://img.freepik.com/free-photo/elegant-smartphone-composition_23-2149437106.jpg?t=st=1727331980~exp=1727335580~hmac=1854a4f49245882ca05cdda49c3c900d319bd3c33a78f75d32e5e0216b5f2bab&w=826' },
    { id: '6', name: 'Product 6', price: '$70', image: 'https://img.freepik.com/free-photo/elegant-smartphone-composition_23-2149437106.jpg?t=st=1727331980~exp=1727335580~hmac=1854a4f49245882ca05cdda49c3c900d319bd3c33a78f75d32e5e0216b5f2bab&w=826' },
    { id: '6', name: 'Product 6', price: '$70', image: 'https://img.freepik.com/free-photo/elegant-smartphone-composition_23-2149437106.jpg?t=st=1727331980~exp=1727335580~hmac=1854a4f49245882ca05cdda49c3c900d319bd3c33a78f75d32e5e0216b5f2bab&w=826' },
];

const Products = () => {
    return (
        <div className="products">
            <h1>Explore Products</h1>
            <div className="product-grid">
                {products.map(product => (
                    <Link key={product.id} to={`/product/${product.id}`} className="product-item">
                        <img src={product.image} alt={product.name} />
                        <div className="product-name">{product.name}</div>
                        <div className="product-price">{product.price}</div>
                        <div><button className="add-to-cart">Add To Cart</button></div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Products;
