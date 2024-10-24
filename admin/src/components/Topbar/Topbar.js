import React from 'react';
import './Topbar.css';
import logo from '../../assets/2.png';

const Topbar = () => {
  const handleLogout = () => {
    // Handle the logout functionality 
    console.log('Logged out');
  };

  return (
    <div className="topbar">
      <div className="company-name">
        <img src={logo} alt="Nexi Logo" />
        <p>THE NEXUS OF DISTRIBUTION</p>
      </div>
      <button className="logout-button" onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Topbar;