import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Login from './pages/Login/Login.js';
import Signup from './pages/Signup/Signup.jsx';
import Navbar from './components/Navbar/Navbar.js';
import Footer from './components/Footer/Footer.js';
import Products from './pages/Products/Products.js';
import CategoryPage from './pages/ProductCategory/ProductCategory.js';
import ProductDetails from './pages/ProductDetails/ProductDetails.js';
import Dashboard from './pages/Dashboard/Dashboard.js';


import AboutUs from './pages/AboutUs/AboutUs.js';


import data from './data.json';

import AdminLogin from './pages/Admin/Login/Login.js';
import AdminDashboard from './pages/Admin/AdminDashboard/AdminDashboard.js';
import Driver from './pages/Admin/Driver/Driver.js';
import Assistant from './pages/Admin/Assistant/Assistant.js';
import Order from './pages/Admin/Order/Order.js';
import Report from './pages/Admin/Report/Report.js';



import data from './data.json'
import UserDetails from './pages/UserDetails/UserDetails.js';


const path = data.backend;

// Set the default base URL for Axios
axios.defaults.baseURL = path;

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

        
        {/* Use element prop instead of render prop */}
        <Route path="/products/:category" element={<Products/>} />
        <Route path="/products" element={<CategoryPage />} />
        
        <Route path="/products/category/:id" element={<ProductDetails />} />
        <Route path="/dashboard" element ={<Dashboard />} />


        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetails />} />

        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/userdetails" element={<UserDetails />} />

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
