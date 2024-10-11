import React, { useState } from 'react';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../../assets/2.png';
import axios from 'axios';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [success, setSuccess] = useState(false);  // Fixed typo
  const [status, setStatus] = useState('');
  const navigate = useNavigate();  // Use useNavigate for navigation

  function handleSubmit(event) {
    event.preventDefault();
    console.log(username, password);

    if (!username || !password) {
      setStatus('Please fill in both fields.');
      setSuccess(false);
      return;
    }
    navigate('/admindashboard');
  }

  return (
    <div className="login-container">
      <div className="login-left">
        <div className="logo-container">
          <img
            src={logo}  // Path to your actual logo image
            alt="Nexi Logo"
            className="logo"
          />
          <h2>NEXI</h2>
          <p>The Nexus of Distribution</p>
        </div>
        <p className="text">Welcome back! Please login to your account.</p>
        <form className="login-form" onSubmit={handleSubmit}>
          <input 
            type="text" 
            placeholder="Enter your Username" 
            className="input-field" 
            onChange={e => setUsername(e.target.value)} 
          />
          <input 
            type="password" 
            placeholder="Enter your Password" 
            className="input-field" 
            onChange={e => setPassword(e.target.value)} 
          />
          <button type="submit" className="login-button">Login</button>
        </form>
        <span>Don't have an account? <Link to="/signup">Register</Link></span>
        <div className="forgot-password"><a href="#">Forgot password</a></div>
        {status && <div className={`status-message ${success ? 'success' : 'error'}`}>{status}</div>}
      </div>
      <div className="login-right">
        {/* Add content for the right section if needed */}
      </div>
    </div>
  );
};

export default AdminLogin;
