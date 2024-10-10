import './Footer.css';
import React from 'react';


const Footer = () => {
    return (
      <div className="footer">
        <div className='footer-img'>
            <img
                src='/assets/2.png'
                alt="Nexi Logo"
                className="logo"
            />
            <div>
                <h2>NEXI</h2>
                <p>The Nexus of Distribution</p>
            </div> 
        </div>
        <div className="footer-content">
            <span>NEXI dev</span>
            <span>© NEXI customer Dashboard</span>
        </div>
      </div>
    )
  }
  
  export default Footer