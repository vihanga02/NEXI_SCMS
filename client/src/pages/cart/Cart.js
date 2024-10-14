import React, { useState } from 'react';
import './Cart.css';
import phone1 from '../../assets/galaxy-a54.jpg';
import phone2 from '../../assets/iphone-12.jpeg';

const Cart = () => {
  // Example cart items
  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'Samsung Galaxy', price: 500, quantity: 2, image: phone1 },
    { id: 2, name: 'Iphone-12', price: 600, quantity: 1, image: phone2 },
  ]);

  // Calculate total price
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  // Handle quantity change
  const handleQuantityChange = (id, delta) => {
    setCartItems(cartItems.map(item =>
      item.id === id
        ? { ...item, quantity: Math.max(1, item.quantity + delta) }
        : item
    ));
  };

  return (
    <div className="cart">
      <table className="cart-table">
        <thead>
          <tr>
            <th>Product</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total Price</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map(item => (
            <tr key={item.id} className="cart-item-row">
              <td className="cart-item-details">
                <img src={item.image} alt={item.name} className="cart-item-image" />
                <div className="item-info">
                  <h3>{item.name}</h3>
                  <p>Color: Black</p>
                  <p>Size: Standard</p>
                </div>
              </td>
              <td>${item.price.toFixed(2)}</td>
              <td>
                <div className="item-quantity">
                  <button onClick={() => handleQuantityChange(item.id, -1)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => handleQuantityChange(item.id, 1)}>+</button>
                </div>
              </td>
              <td className="item-total-price">
                ${(item.price * item.quantity).toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="cart-summary">
        <h4>Total: ${totalPrice.toFixed(2)}</h4>
        <button className="checkout-btn">Proceed to Checkout</button>
      </div>
    </div>
  );
};

export default Cart;
