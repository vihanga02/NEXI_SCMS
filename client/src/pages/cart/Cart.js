import React, { useState, useEffect } from "react";
import "./Cart.css";
import { FaTrash } from "react-icons/fa";
import axios from "axios";
import StoreRouteSelector from "../../components/StoreRouteSelector/StoreRouteSelector";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [selectedStore, setSelectedStore] = useState(""); 
  const [selectedRoute, setSelectedRoute] = useState(""); 

  useEffect(() => {
    axios.get("/customer/profile",{withCredentials:true})
    .then((response) => {
    })
    .catch((error) => {
      navigate("/login"); 
        console.error("Error fetching customer profile:", error);
    });
  }, []); 

  useEffect(() => {
    getCartItems();
  }, []);

  // Get cart items from the backend
  const getCartItems = async () => {
    try {
      const cart = await axios.get("/customer/cart", { withCredentials: true });
      setCartItems(cart.data);
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
      setCartItems([]);
      setSelectedStore(""); 
      setSelectedRoute(""); 
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
        <StoreRouteSelector onStoreRouteChange={handleStoreRouteChange} />
        <button className="checkout-btn" onClick={handleCheckout}>
          Checkout Now
        </button>
      </div>
    </div>
  );
};

export default Cart;
