import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Login from './pages/Login/Login.js';
import Signup from './pages/Signup/Signup.jsx';
import Navbar from './components/Navbar/Navbar.js';
import Footer from './components/Footer/Footer.js';

const App = () => {
  const location = useLocation();

  // Define paths where the Navbar should not appear
  const hideNavbar = ['/login', '/signup'].includes(location.pathname);
  const hideFooter = ['/login', '/signup'].includes(location.pathname);

  return (
    <>
      {!hideNavbar && <Navbar />} {/* Render Navbar only if not on Login or Signup pages */}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {/* Add other routes here */}
      </Routes>
      {!hideFooter && <Footer />} {/* Render Footer only if not on Login or Signup pages */}
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
