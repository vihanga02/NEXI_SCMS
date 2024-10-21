import React from 'react';
import './Topbar.css';

const Topbar = () => {
  const handleLogout = () => {
    // Handle the logout functionality 
    console.log('Logged out');
  };

  return (
    <div className="topbar">
      <div className="company-name">NEXI-THE NEXUS OF DISTRIBUTION</div>
      <button className="logout-button" onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Topbar;