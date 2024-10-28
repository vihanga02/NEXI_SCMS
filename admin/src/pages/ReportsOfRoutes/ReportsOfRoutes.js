import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import axios from 'axios';
import Sidebar from '../../components/Sidebar/Sidebar';
import Topbar from '../../components/Topbar/Topbar';
import './ReportsOfRoutes.css';

// Register necessary Chart.js components
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

                setSalesByRoute(response.data); // Set the fetched sales by route data
                setLoading(false);
            } catch (error) {
                console.error('Error fetching sales by route:', error);
                if (error.response && (error.response.status === 401 || error.response.status === 403)) {
                    navigate('/'); // Redirect to login if unauthorized
                } else {
                    setError('Error fetching data. Please try again later.');
                }
                setLoading(false);
            }
        };

        fetchSalesByRoute();
    }, [navigate]);

    // Prepare the data for the bar chart
    const chartData = {
        labels: salesByRoute.map(entry => entry.Route), // X-axis labels
        datasets: [
            {
                label: 'Total Sales',
                data: salesByRoute.map(entry => entry['SUM(Total_Price)']), // Y-axis data
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    return (
        <div className="reports-routes-container">
            <Sidebar />
            <div className="content">
                <Topbar />
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
