import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./ProductDetails.css";
import axios from "axios";
import { useEffect, useState } from "react";

const ProductDetails = () => {
  const [products, setProducts] = useState([]);
  const [quantity, setQuantity] = useState(0);
  const navigate = useNavigate(); // For redirecting if not authenticated

  // Configure Axios to include cookies in requests
  axios.defaults.withCredentials = true;

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      const result = await axios.get("/customer/products/");
      setProducts(result.data);
    } catch (err) {
      console.log(err);
    }
  };

  const { id } = useParams(); // Get the product ID from the URL
  const product = products.find((p) => p.Product_ID == id); // Find the product by ID

  if (!product) {
    return <div>Product not found</div>; // Handle case where product is not found
  }

  // Function to increase the quantity
  const handleIncrease = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  // Function to decrease the quantity (min = 0)
  const handleDecrease = () => {
    if (quantity > 0) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  // Function to handle adding to cart
  const handleAddToCart = async () => {
    try {
      await axios.post(
        "/customer/cart/add",
        {
          Product_ID: product.Product_ID,
          Quantity: quantity,
        },
        { withCredentials: true }
      );
      alert("Product added to cart!");
    } catch (err) {
      console.error("Error adding to cart:", err);
      if (err.response.status === 401) {
        // Redirect to login if not authenticated
        navigate("/login");
      }
    }
  };

  return (
    <div className="product-details">
      <div className="img-container">
        <img src={product.Image_Link} alt={product.Product_Name} />
      </div>
      <div className="discription-container">
        <h2>{product.Product_Name}</h2>
        <p className="price">Price: {product.Price}</p>

        <p className="product-descritpion">{product.Description}</p>

        <div className="quantity-container">
          <button onClick={handleDecrease} className="counter-btn">
            -
          </button>
          <span className="quantity-display">{quantity}</span>
          <button onClick={handleIncrease} className="counter-btn">
            +
          </button>
        </div>

        <button className="add-to-cart" onClick={handleAddToCart}>
          Add To Cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;
