import React, { useState } from 'react';
import './Cart.css';
import { FaTrash } from 'react-icons/fa';

const Cart = () => {
  // Example cart items
  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'Samsung Galaxy', price: 50000, quantity: 2, image: '/assets/iphone-11.jpeg' },
    { id: 2, name: 'Iphone-12', price: 60000, quantity: 1, image: '/assets/iphone-14.jpg' },
  ]);

  // Handle delete item
  const handleDeleteItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  return (
    <div className="cart">
      <div className='cart-details'>
        <div>
          <h1 className="cart-heading">Your Smartphone Cart</h1>
          <h2 className="cart-subheading">Finalize your smartphone choices and proceed to checkout!</h2>
        </div>
        <table className="cart-table">
          <tbody>
            {cartItems.map(item => (
              <tr key={item.id} className="cart-item-row">
                <td className='product-column'>
                    <img src={item.image} alt={item.name} className="cart-item-image" />
                    <h3 className="item-info">{item.name}</h3>      
                </td>
                <td>quantity: {item.quantity}</td>
                <td>
                  <button className="delete-btn" onClick={() => handleDeleteItem(item.id)}>
                    <FaTrash />
                  </button>
                </td>
                <td>LKR {(item.price * item.quantity).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="cart-summary">
        <div className='price-details'>
          <h4>Total Price</h4>
          <p style={{fontSize: "20px"}}>LKR</p>
          <p>{cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)}</p>
        </div>
        <button className="checkout-btn">Checkout Now</button>

      </div>
    </div>
  );
};

export default Cart;
