import React, { useState } from "react";
import "./Login.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(""); // For showing status messages
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(username, password);

    // Validation check
    if (!username || !password) {
      setMessage("Please fill in both fields.");
      setSuccess(false);
      return;
    }

    axios
      .post(
        "/customer/login",
        { Username: username, Password: password },
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res.data);
        setSuccess(res.data.success);
        if (res.data.success) {
          setMessage("Login successful.");
          navigate("/"); // Redirect to dashboard
        } else {
          setMessage("Login failed. Please check your credentials.");
        }
      })
      .catch((error) => {
        // Handle 401 and other errors
        if (error.response && error.response.status === 401) {
          setMessage("Invalid username or password. Please try again.");
        } else {
          setMessage("An error occurred. Please try again later.");
        }
        setSuccess(false);
      });
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <div className="logo-container">
          <img
            src="/assets/2.png" // Replace with your actual logo image path
            alt="Nexi Logo"
            className="logo"
          />
          <h2>NEXI</h2>
          <p>The Nexus of Distribution</p>
        </div>
        <p className="text">Welcome back! Please login to your account.</p>
        <form className="login-form" onSubmit={handleSubmit}>
          <input
            type="text" // Changed from Uname to text
            placeholder="Enter your Username"
            className="input-field"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
          <input
            type="password"
            placeholder="Enter your Password"
            className="input-field"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <button type="submit" className="login-button">
            Login
          </button>
        </form>

        {/* Display login status messages */}
        {message && (
          <p className={success ? "success-message" : "error-message"}>
            {message}
          </p>
        )}

        <span>
          Don't have an account? <Link to="/signup">Register</Link>
        </span>
        <div className="forgot-password">
          <a href="">Forgot password</a>
        </div>
      </div>
      <div className="login-right">
        {/* <h3>Streamlining your distribution from railway to doorstep with seamless efficiency.</h3> */}
      </div>
    </div>
  );
};

export default Login;
