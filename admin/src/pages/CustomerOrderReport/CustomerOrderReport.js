import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import axios from 'axios';
import './CustomerOrderReport.css'; // CSS for styling

// Register necessary Chart.js components
Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function CustomerOrderReport() {
    const [orderCountByCustomer, setOrderCountByCustomer] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchOrderCountByCustomer = async () => {
            try {
                const response = await axios.get('/manager/customerOrderReport', {
                    withCredentials: true 
                });

                setOrderCountByCustomer(response.data); // Set the fetched data
                setLoading(false);
            } catch (error) {
                console.error('Error fetching customer order report:', error);
                if (error.response && (error.response.status === 401 || error.response.status === 403)) {
                    navigate('/'); // Redirect to login if unauthorized
                } else {
                    setError('Error fetching data. Please try again later.');
                }
                setLoading(false);
            }
        };

        fetchOrderCountByCustomer();
    }, [navigate]);

    // Prepare the data for the bar chart
    const chartData = {
        labels: orderCountByCustomer.map(entry => `Customer ${entry.Customer_ID}`), // X-axis labels
        datasets: [
            {
                label: 'Total Orders',
                data: orderCountByCustomer.map(entry => entry.Total_Orders), // Y-axis data
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    return (
        <div className="customer-order-report-container">
            <div className="content">
                <div className="chart-container">
                    <h2>Customer Order Report</h2>

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

export default CustomerOrderReport;
