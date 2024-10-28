import React, { useState } from 'react';
import './Login.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import logo from '../../assets/2.png';


const Login = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [success, setSuccess] = useState('');
  const [status, setStatus] = useState('');
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    console.log(username, password);

    if (!username || !password) {
      setStatus('Please fill in both fields.');
      setSuccess(false);
      return;
    }

    axios
      .post("/manager/login", {Username: username, Password:password },{ withCredentials: true })
      .then((res) => {
        
        setStatus(res.data.status);
        // setSuccess(res.data.success);
        if (res.data.success) {
          setSuccess(true);
          setStatus('Login successful.');
          navigate('/admindashboard');
        } else {
          setSuccess(false);
          setStatus('Login failed.');
        }
      })

  }


  return (
    <div className="login-container">
      <div className="login-left">
        <div className="logo-container">
          <img
            src={logo}
            alt="Nexi Logo"
            className="logo"
          />
          <h2>NEXI</h2>
          <p>The Nexus of Distribution</p>
        </div>
        <p className='text'>Welcome back! Please login to your account.</p>
        <form className="login-form" onSubmit={handleSubmit}>
          <input type="Uname" placeholder="Enter your Username" className="input-field"
            onChange={e => setUsername(e.target.value)} />
          <input type="password" placeholder="Enter your Password" className="input-field"
            onChange={e => setPassword(e.target.value)} />
          <button type="submit" className="login-button">Login</button>
        </form>
        <span>Don't you have an account?<Link to='/signup'>Register</Link></span>
        <div className="forgot-password" ><a href="">Forgot password</a></div>
      </div>
      <div className="login-right">
      </div>
    </div>
  );
};

export default Login;