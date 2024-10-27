import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import axios from 'axios';
import './Report.css';
import { useNavigate } from "react-router-dom";


// Register the necessary components with Chart.js
Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

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
        axios.get("/admin/profile",{withCredentials:true})
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
                const response = await axios.get(`/admin/quarterlySales?startDate=${startDate}`);
                
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
                console.error('Error fetching quarterly sales data:', error);
            }
        };

        fetchQuarterlySales();
    }, [startDate]); // Dependency array includes startDate to re-fetch when it changes

    return (
        <div className='Rcontainer'>
            <div className='rcontainer'>
                <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} />
                <div className='chart-container'>
                    <h2>Quarterly Sales Report</h2>
                    {chartData.labels.length > 0 && <Line data={chartData} />}
                </div>
            </div>
        </div>
    );
}

export default Report;
