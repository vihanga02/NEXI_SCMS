import React from 'react';
import '../Styles/Login.css';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div className="login-container">
      <div className="login-left">
      <p className='text'>Welcome back! Please login to your account!!</p>
        <div className="logo-container">
          <img
            src="../../2.png" // Replace with your actual logo image path
            alt="Nexi Logo"
            className="logo"
          />
          <h2>NEXI</h2>
          <p>The Nexus of Distribution</p>
        </div>
        <form className="login-form">
          <input type="email" placeholder="Enter your Email Address" className="input-field" />
          <input type="password" placeholder="Enter your Password" className="input-field" />
          <button type="submit" className="login-button">Login</button>
        </form>
        <span>Don't you have an account?<Link to ='/register'>Register</Link></span>
      </div>
      <div className="login-right">
        
          <h3>Streamlining your distribution from railway to doorstep with seamless efficiency.</h3>
          
        
        
      </div>
    </div>
  );
};

export default Login;