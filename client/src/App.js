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
import AdminLogin from './pages/Admin/Login/Login.js';
import AdminDashboard from './pages/Admin/AdminDashboard/AdminDashboard.js';
import Driver from './pages/Admin/Driver/Driver.js';
import Assistant from './pages/Admin/Assistant/Assistant.js';
import Order from './pages/Admin/Order/Order.js';
import Report from './pages/Admin/Report/Report.js';


import data from './data.json'

const path = data.backend;

axios.defaults.baseURL = path

const App = () => {
  const location = useLocation();

  // Define paths where the Navbar should not appear
  const hideNavbar = ['/login', '/signup','/admindashboard','/driver','/order','/report','/assistant'].includes(location.pathname);
  const hideFooter = ['/login', '/signup','/admindashboard','/driver','/order','/report','/assistant'].includes(location.pathname);
  

  return (
    <>
      {!hideNavbar && <Navbar />} 
      <Routes>
        
        <Route path="/adminlogin" element={<AdminLogin/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetails />} />

        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admindashboard" element={<AdminDashboard/>} />
        <Route path="/driver" element={<Driver/>}/>
        <Route path="/order" element={<Order/>}/>
        <Route path="/assistant" element={<Assistant/>}/>
        <Route path="/report" element={<Report/>}/>

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
