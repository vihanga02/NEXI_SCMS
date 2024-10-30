
import { useNavigate } from 'react-router-dom';
import './Report.css';

import React, { useState, useEffect } from 'react';
import axios from 'axios';



function Report() {
    const navigate = useNavigate();

   
    
    useEffect(() => {
        axios.get("/manager/profile",{withCredentials:true})
        .then((response) => {
        })
        .catch((error) => {
          navigate("/"); 
            console.error("Error fetching customer profile:", error);
        });
      }, []); 

    return (
        <div className='Rcontainer'>
            <div className='rcontainer'>
                <div className='button-container'>
                    <button className='report-button' onClick={() => navigate('/report/quarterlysales')}>
                        <i className="fas fa-chart-line"></i> Quarterly Sales
                    </button>
                    <button className='report-button' onClick={() => navigate('/report/mostorders')}>
                        <i className="fas fa-box"></i> Most Orders
                    </button>
                    <button className='report-button' onClick={() => navigate('/report/maincitiesreports')}>
                        <i className="fas fa-city"></i> Reports of Main Cities
                    </button>
                    <button className='report-button' onClick={() => navigate('/report/hoursofdrivers')}>
                        <i className="fas fa-user-clock"></i> Driver Working Hours
                    </button>
                    <button className='report-button' onClick={() => navigate('/report/hoursofassistants')}>
                        <i className="fas fa-user-friends"></i> Assistants Working Hours
                    </button>
                    <button className='report-button' onClick={() => navigate('/report/usedhoursoftrucks')}>
                        <i className="fas fa-truck"></i> Used Hours of Trucks
                    </button>
                    <button className='report-button' onClick={() => navigate('/report/customerorderreports')}>
                        <i className="fas fa-users"></i> Customer Order Reports
                    </button>
                    <button className='report-button' onClick={() => navigate('/report/reportsofroutes')}>
                        <i className="fas fa-route"></i> Reports of Routes
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Report;
