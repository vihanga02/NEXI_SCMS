import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import Sidebar from '../../components/Sidebar/Sidebar';
import Topbar from '../../components/Topbar/Topbar';
import './ReportsOfMainCities.css';

// Register necessary Chart.js components
Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function ReportsOfMainCities() {
    const [salesByCity, setSalesByCity] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSalesByCity = async () => {
            try {
                const response = await axios.get('/manager/salesByCity', {
                    withCredentials: true 
                });

                setSalesByCity(response.data); // Set the fetched sales by city data
                setLoading(false);
            } catch (error) {
                console.error('Error fetching sales by city:', error);
                if (error.response && (error.response.status === 401 || error.response.status === 403)) {
                    navigate('/'); // Redirect to login if unauthorized
                } else {
                    setError('Error fetching data. Please try again later.');
                }
                setLoading(false);
            }
        };

        fetchSalesByCity();
    }, [navigate]);

    // Prepare the data for the bar chart
    const chartData = {
        labels: salesByCity.map(entry => entry.City), // X-axis labels
        datasets: [
            {
                label: 'Total Sales',
                data: salesByCity.map(entry => entry['SUM(Total_Price)']), // Y-axis data
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    return (
        <div className="reports-main-cities-container">
            <div className="content">
                <div className="chart-container">
                    <h2>Sales by City</h2>
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

export default ReportsOfMainCities;
