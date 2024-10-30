import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import axios from 'axios';
import './ReportsOfRoutes.css';

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function ReportsOfRoutes() {
    const [salesByRoute, setSalesByRoute] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSalesByRoute = async () => {
            try {
                const response = await axios.get('/manager/salesByRoute', {
                    withCredentials: true 
                });

                setSalesByRoute(response.data); 
                setLoading(false);
            } catch (error) {
                console.error('Error fetching sales by route:', error);
                if (error.response && (error.response.status === 401 || error.response.status === 403)) {
                    navigate('/'); 
                } else {
                    setError('Error fetching data. Please try again later.');
                }
                setLoading(false);
            }
        };

        fetchSalesByRoute();
    }, [navigate]);

    const chartData = {
        labels: salesByRoute.map(entry => entry.Route),
        datasets: [
            {
                label: 'Total Sales',
                data: salesByRoute.map(entry => parseFloat(entry.Total_Sales)), // Updated mapping
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    return (
        <div className="reports-routes-container">
            <div className="content">
                <div className="chart-container">
                    <h2>Sales by Route</h2>

                    {loading ? (
                        <p>Loading data...</p>
                    ) : error ? (
                        <p>{error}</p>
                    ) : (
                        <Bar data={chartData} options={{ responsive: true }} />
                    )}
                </div>
            </div>
        </div>
    );
}

export default ReportsOfRoutes;
