import React from "react";
import { useParams } from "react-router-dom"; // Import useParams to access route parameters
import './ProductDetails.css';

const products = [
    { id: '1', name: 'Product 1', price: '$20', image: require('../../assets/iphone-14.jpg') },
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

const ProductDetails = () => {
    const { id } = useParams(); // Get the product ID from the URL
    const product = products.find(p => p.id === id); // Find the product by ID

    if (!product) {
        return <div>Product not found</div>; // Handle case where product is not found
    }

    return (
        <div className="product-details">
            <div className="img-container">
                <img src={product.image} alt={product.name} />   
            </div>
            <div className="discription-container">
                <h2>{product.name}</h2>
                <p className="price">Price: {product.price}</p>
                
                <p className="product-descritpion">The SuperPhone X is the latest innovation in smartphone technology, designed to enhance your digital experience like never before. With its sleek design and powerful features, it’s perfect for both work and play. It boasts a 6.7-inch OLED display for vibrant colors and stunning visuals, a triple-camera system with a 108MP main lens, ultra-wide angle, and telephoto capabilities for capturing every moment in breathtaking detail. Powered by the latest A15 Bionic chip, the SuperPhone X offers lightning-fast performance and smooth multitasking, complemented by up to 24 hours of battery life on a single charge to ensure you stay connected throughout your day.  </p>
                {/* Additional product details can be added here */}
                <button className="add-to-cart">Add To Cart</button>
            </div>  
        </div>
    );
};

export default ProductDetails;
