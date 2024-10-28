
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/Sidebar/Sidebar.js';
import Topbar from '../../components/Topbar/Topbar.js';
import './Report.css';

import React, { useState, useEffect } from 'react';
import axios from 'axios';



function Report() {
    const navigate = useNavigate();

    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [
            {
                label: 'Total Sales',
                data: [],
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    });
    const [startDate, setStartDate] = useState('2024-10-01'); // Default or user-selected date

    useEffect(() => {
        axios.get("/manager/profile",{withCredentials:true})
        .then((response) => {
        })
        .catch((error) => {
          navigate("/"); 
            console.error("Error fetching customer profile:", error);
        });
      }, []); 



    useEffect(() => {
        const fetchQuarterlySales = async () => {
            try {
              console.log('Starting date:', startDate);
                const response = await axios.get(`/manager/quarterlySales?startDate=${startDate}`);
                
                const salesData = response.data;

                const dates = salesData.map(item => item.Order_Date);
                const totalOrders = salesData.map(item => item.Total_Orders);

                setChartData({
                    labels: dates,
                    datasets: [
                        {
                            label: 'Total Orders',
                            data: totalOrders,
                            backgroundColor: 'rgba(75, 192, 192, 0.2)',
                            borderColor: 'rgba(75, 192, 192, 1)',
                            borderWidth: 1,
                        },
                    ],
                });
            } catch (error) {
                //console.error('Error fetching quarterly sales data:', error);
            }
        };

        fetchQuarterlySales();
    }, [startDate]); // Dependency array includes startDate to re-fetch when it changes


    return (
        <div className='Rcontainer'>
            <Sidebar />
            <div className='rcontainer'>
                <Topbar />
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
