import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import axios from 'axios';
import './QuarterlySales.css';

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function QuarterlySales() {
    const [startDate, setStartDate] = useState('2024-10-01');
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [
            {
                label: 'Total Orders',
                data: [],
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const fetchQuarterlySales = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await axios.get('/manager/quarterlySales', {
                params: { startDate },
                withCredentials: true // Include credentials (cookies with token)
            });
            
            if (response && response.data) {
                const salesData = response.data;
                const dates = salesData.map(item => new Date(item.Order_Date).toLocaleDateString());
                const totalOrders = salesData.map(item => item.Total_Orders);

                setChartData({
                    labels: dates,
                    datasets: [
                        {
                            label: 'Total Orders',
                            data: totalOrders,
                            backgroundColor: 'rgba(75, 192, 192, 0.6)',
                            borderColor: 'rgba(75, 192, 192, 1)',
                            borderWidth: 1,
                        },
                    ],
                });
            } else {
                throw new Error('No data received');
            }
        } catch (error) {
            console.error('Error fetching quarterly sales data:', error);

            if (error.response && (error.response.status === 401 || error.response.status === 403)) {
                // Redirect to login if unauthorized
                navigate('/');
            } else {
                setError('Error fetching quarterly sales data');
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchQuarterlySales();
    }, [startDate]);

    return (
        <div className="Rcontainer">
            <div className="rcontainer">
                <h1>Quarterly Sales</h1>
                <div className="date-picker">
                    <label htmlFor="startDate">Select Start Date:</label>
                    <input
                        type="date"
                        id="startDate"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                    />
                </div>

                <div className="chart-area">
                    {loading ? (
                        <p>Loading chart...</p>
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

export default QuarterlySales;
