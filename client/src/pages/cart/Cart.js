import React, { useState } from 'react';
import './Cart.css';
import { FaTrash } from 'react-icons/fa';

const Cart = () => {
  // Example cart items
  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'Samsung Galaxy', price: 500, quantity: 2, image: '/assets/iphone-11.jpeg' },
    { id: 2, name: 'Iphone-12', price: 600, quantity: 1, image: '/assets/iphone-14.jpg' },
  ]);

  // Handle delete item
  const handleDeleteItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  return (
    <div className="cart">
      <div>
        <h1 className="cart-heading">Your Smartphone Cart</h1>
        <h2 className="cart-subheading">Finalize your smartphone choices and proceed to checkout!</h2>
      </div>
      <table className="cart-table">
        <thead>
          <tr>
            <th></th>
            <th>Product</th>
            <th>Quantity</th>
            <th>Remove</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map(item => (
            <tr key={item.id} className="cart-item-row">
              <td>
                  <img src={item.image} alt={item.name} className="cart-item-image" />
              </td>
              <td className="cart-item-details">
                  <h3 className="item-info">{item.name}</h3>      
              </td>
              <td>{item.quantity}</td>
              <td>
                <button className="delete-btn" onClick={() => handleDeleteItem(item.id)}>
                  <FaTrash />
                </button>
              </td>
              <td>${(item.price * item.quantity).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="cart-summary">
        <h4>Total: ${cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)}</h4>
        <button className="checkout-btn">Proceed to Checkout</button>
      </div>
    </div>
  );
};

export default Cart;
