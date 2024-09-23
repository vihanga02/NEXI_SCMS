import React, { useState } from 'react';
import '../Styles/Login.css';
import { Link } from 'react-router-dom';

const Login = () => {

  const[email, setEmail] = useState('');
  const[password, setPassword] = useState('');
  function handleSubmit(event){
    event.preventDefault();
  }

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
        <form className="login-form" onSubmit={handleSubmit}>
          <input type="email" placeholder="Enter your Email Address" className="input-field" 
          onChange={e => setEmail(e.target.value)}/>
          <input type="password" placeholder="Enter your Password" className="input-field" 
          onChange={e => setPassword(e.target.value)}/>
          <div className="forgot-password" ><a href="">Forgot password</a></div>
          {/* <div className="Register" >Not Registered? <Link to="/Signup.jsx">Click here</Link></div> */}

          <button type="submit" className="login-button">Login</button>
        </form>
        <span>Don't you have an account?<Link to ='/register'>Register</Link></span>
      </div>
      <div className="login-right">
        
          <h3>Streamlining your distribution from railway to doorstep with seamless efficiency.</h3>

          {/* <p>Welcome back! Please login to your account.</p> */}
        </div>
        <img
          src="../public/Login.webp" // Replace with your actual background image path
          alt="Truck"
          className="background-image"
        />

      </div>
    </div>
  );
};

export default Login;