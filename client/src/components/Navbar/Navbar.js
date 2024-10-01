import React from 'react';
import './Navbar.css';
import logo from '../../assets/2.png';
import '@fortawesome/fontawesome-free/css/all.min.css'; // Font Awesome import

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img
          src={logo}
          alt="Nexi Logo"
          className="logo"
        />
        <h2>NEXI</h2>
      </div>
      <div className="navbar-center">
        <ul className="nav-links">
          <li>
            <a href="/dashboard">Dashboard</a>
          </li>
          <li>
            <a href="/products">Products</a>
          </li>
          <li>
            <a href="/login">About Us</a>
          </li>
          <li className='icon-li'>
            <a href="/login" className="cart-icon">
                <i className="fas fa-shopping-cart"></i>
                <span className="cart-count">0</span> {/* Dynamic cart count can be updated here */}
            </a>
          </li>
          <li className='icon-li'>
            <a href="/login" className="user-icon">
                <i className="fas fa-user"></i>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
