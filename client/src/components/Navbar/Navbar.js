import React, { useState, useEffect } from 'react';
import './Navbar.css';
import '@fortawesome/fontawesome-free/css/all.min.css'; 
import axios from 'axios';

const Navbar = () => {
  const [loginStatus, setLoginStatus] = useState(false); // Renamed to camelCase for consistency
  const [cartItems, setCartItems] = useState([]);

  // Fetch login status and cart items only when the component mounts
  useEffect(() => {
    const fetchLoginStatus = async () => {
      try {
        const res = await axios.get('/customer/navbar', { withCredentials: true });
        setLoginStatus(res.data.login_status);
        if (res.data.login_status) {
          getCartItems(); // Only fetch cart items if user is logged in
        }
      } catch (error) {
        console.error("Error fetching login status:", error);
      }
    };

    fetchLoginStatus();
  }, []); // Empty dependency array ensures this runs once when component mounts

  const getCartItems = async () => {
    try {
      const cart = await axios.get("/customer/cart", { withCredentials: true });
      setCartItems(cart.data);
    } catch (error) {
      console.error("Error getting cart items:", error);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img
          src='/assets/2.png'
          alt="Nexi Logo"
          className="logo"
        />
        <h2>NEXI</h2>
      </div>
      <div className="navbar-center">
        <ul className="nav-links">
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/products">Products</a>
          </li>
          <li>
            <a href="/aboutus">About Us</a>
          </li>
          {loginStatus && (
            <>
              <li className='icon-li'>
                <a href="/cart" className="cart-icon">
                    <i className="fas fa-shopping-cart"></i>
                    <span className="cart-count">{cartItems.length}</span> {/* Dynamic cart count */}
                </a>
              </li>
              <li className='icon-li'>
                <a href="/userdetails" className="user-icon">
                    <i className="fas fa-user"></i>
                </a>
              </li>
            </>
          )}
          {!loginStatus && (
            <li className='login-button-div'>
              <button onClick={() => window.location.href='/login'} className="login-button">
                Login
              </button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
