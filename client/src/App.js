import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Login from './pages/Login/Login.js';
import Signup from './pages/Signup/Signup.jsx';
import Navbar from './components/Navbar/Navbar.js';
import Footer from './components/Footer/Footer.js';

import Products from './pages/Products/Products.js';
import ProductDetails from './pages/ProductDetails/ProductDetails.js';

import Dashboard from './pages/Dashboard/Dashboard.js';

import data from './data.json'

const path = data.backend;

axios.defaults.baseURL = path

const App = () => {
  const location = useLocation();

  // Define paths where the Navbar should not appear
  const hideNavbar = ['/login', '/signup'].includes(location.pathname);
  const hideFooter = ['/login', '/signup'].includes(location.pathname);

  return (
    <>
      {!hideNavbar && <Navbar />} 
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetails />} />

        <Route path="/dashboard" element={<Dashboard />} />

      </Routes>
      {!hideFooter && <Footer />} 
    </>
  );
};

// Wrap the App component with Router outside
const WrappedApp = () => (
  <Router>
    <App />
  </Router>
);

export default WrappedApp;
