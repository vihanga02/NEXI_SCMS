import React, {useState} from 'react';
import './Navbar.css';
import '@fortawesome/fontawesome-free/css/all.min.css'; 
import axios from 'axios';

const Navbar = () => {
  const [login_status, setLoginStatus] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  axios.get('/customer/navbar', { withCredentials: true })
  .then((res) => {
    setLoginStatus(res.data.login_status);
    getCartItems();
  }).catch((error) => {
    console.error(error);
  })

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
          {login_status && (
            <>
              <li className='icon-li'>
                <a href="/cart" className="cart-icon">
                    <i className="fas fa-shopping-cart"></i>
                    <span className="cart-count">{cartItems.length}</span> {/* Dynamic cart count can be updated here */}
                </a>
              </li>
              <li className='icon-li'>
                <a href="/userdetails" className="user-icon">
                    <i className="fas fa-user"></i>
                </a>
              </li>
            </>
          )}
          {!login_status && (
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
