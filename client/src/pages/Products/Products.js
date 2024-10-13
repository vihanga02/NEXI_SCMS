import React, { useEffect, useState } from "react";
import "./Products.css";
import { Link } from "react-router-dom";
import axios from "axios";
import "@fortawesome/fontawesome-free/css/all.min.css";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // Add searchTerm state

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      const result = await axios.get("/customer/products");
      setProducts(result.data);
    } catch (err) {
      console.log(err);
    }
  };

  // Filter products based on search term
  const filteredProducts = products.filter((product) =>
    product.Product_Name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="products">
      <h1>Explore Products</h1>

      {/* Search Bar */}
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

      <div className="product-grid">
        {filteredProducts.map((product) => (
          <Link
            key={product.Product_ID}
            to={`/products/${product.Product_ID}`}
            className="product-item"
          >
            <img src={product.Image_Link} alt={product.Product_Name} />
            <div className="product-name">{product.Product_Name}</div>
            <div className="product-price">{product.Price}</div>
            <div>
              <button className="add-to-cart">Add To Cart</button>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Products;
