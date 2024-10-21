import React, { useState, useEffect } from "react";
import "./Cart.css";
import { FaTrash } from "react-icons/fa";
import axios from "axios";
import StoreRouteSelector from "../../components/StoreRouteSelector/StoreRouteSelector";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [selectedStore, setSelectedStore] = useState(""); // State for selected store
  const [selectedRoute, setSelectedRoute] = useState(""); // State for selected route

  useEffect(() => {
    getCartItems();
  }, []);

  // Get cart items from the backend
  const getCartItems = async () => {
    try {
      const cart = await axios.get("/customer/cart", { withCredentials: true });
      setCartItems(cart.data); // Assuming the data is in the correct format
    } catch (error) {
      console.error("Error getting cart items:", error);
    }
  };

  // Handle delete item
  const handleDeleteItem = async (product_id) => {
    try {
      await axios.delete(`/customer/cart/remove/${product_id}`, {
        withCredentials: true,
      });
      setCartItems(cartItems.filter((item) => item.product_id !== product_id));
    } catch (error) {
      console.error("Error deleting cart item:", error);
    }
  };

  // Handle checkout
  const handleCheckout = async () => {
    try {
      // Send POST request to backend to checkout with store_id and route_id
      await axios.post(
        "/customer/cart/checkout",
        { Store_ID: selectedStore, Route_ID: selectedRoute }, // Include selected store and route
        { withCredentials: true }
      );

      // If successful, clear the cart items
      setCartItems([]);
      setSelectedStore(""); // Reset store selection
      setSelectedRoute(""); // Reset route selection
    } catch (error) {
      console.error("Error checking out:", error);
    }
  };

  // Function to handle store and route selection
  const handleStoreRouteChange = (storeId, routeId) => {
    setSelectedStore(storeId);
    setSelectedRoute(routeId);
  };

  return (
    <div className="cart">
      <div className="cart-details">
        <div>
          <h1 className="cart-heading">Your Smartphone Cart</h1>
          <h2 className="cart-subheading">
            Finalize your smartphone choices and proceed to checkout!
          </h2>
        </div>
        <table className="cart-table">
          <tbody>
            {cartItems.map((item) => (
              <tr key={item.product_id} className="cart-item-row">
                <td className="product-column">
                  <img
                    src={item.image_link}
                    alt={item.product_name}
                    className="cart-item-image"
                  />
                  <h3 className="item-info">{item.product_name}</h3>
                </td>
                <td>Quantity: {item.total_quantity}</td>
                <td>
                  <button
                    className="delete-btn"
                    onClick={() => handleDeleteItem(item.product_id)}
                  >
                    <FaTrash />
                  </button>
                </td>
                <td>
                  LKR {(item.unit_price * item.total_quantity).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pass the handleStoreRouteChange function to StoreRouteSelector */}
      <StoreRouteSelector onStoreRouteChange={handleStoreRouteChange} />

      <div className="cart-summary">
        <div className="price-details">
          <h4>Total Price</h4>
          <p style={{ fontSize: "20px" }}>LKR</p>
          <p>
            {cartItems
              .reduce(
                (acc, item) => acc + item.unit_price * item.total_quantity,
                0
              )
              .toFixed(2)}
          </p>
        </div>
        <button className="checkout-btn" onClick={handleCheckout}>
          Checkout Now
        </button>
      </div>
    </div>
  );
};

export default Cart;
