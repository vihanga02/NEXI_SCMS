import React, { useState } from 'react';
import '../Styles/Login.css';
import { Link } from 'react-router-dom';
import logo from '../assets/2.png';

const Login = () => {
  
  const[email, setEmail] = useState('');
  const[password, setPassword] = useState('');

  function handleSubmit(event){
    event.preventDefault();
    console.log(email, password);
  }
  

  return (
    <div className="login-container">
      <div className="login-left">
      
        <div className="logo-container">
          <img
            src={logo} // Replace with your actual logo image path
            alt="Nexi Logo"
            className="logo"
          />
          <h2>NEXI</h2>
          <p>The Nexus of Distribution</p>
        </div>
        <p className='text'>Welcome back! Please login to your account.</p>
        <form className="login-form" onSubmit={handleSubmit}>
          <input type="email" placeholder="Enter your Email Address" className="input-field" 
          onChange={e => setEmail(e.target.value)}/>
          <input type="password" placeholder="Enter your Password" className="input-field" 
          onChange={e => setPassword(e.target.value)}/>
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
