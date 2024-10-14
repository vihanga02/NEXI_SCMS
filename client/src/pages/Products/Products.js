import React, { useEffect, useState } from "react";
import "./Products.css";
import { Link } from "react-router-dom";
import axios from "axios";
import "@fortawesome/fontawesome-free/css/all.min.css";
import ProductGrid from "../../components/ProductGrid/ProductGrid";

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
      <div>
        <ProductGrid products={filteredProducts} />
      </div>
    </div>
  );
};

export default Products;
