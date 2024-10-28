import React from 'react';
import './Topbar.css';
import logo from '../../assets/2.png';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Topbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    axios.post('/manager/logout', {}, { withCredentials: true })
    .then((response) => {
        navigate('/');  
    })
    .catch((error) => {
        console.error('Logout failed:', error);
    });
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
