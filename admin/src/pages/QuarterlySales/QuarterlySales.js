import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import Topbar from '../../components/Topbar/Topbar';
import { Line } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import axios from 'axios';
import './QuarterlySales.css';  // Assuming you'll add some page-specific styles

// Register Chart.js components
Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function QuarterlySales() {
    const [startDate, setStartDate] = useState('2024-10-01'); 
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [
            {
                label: 'Total Orders',
                data: [],
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch quarterly sales data
    useEffect(() => {
        const fetchQuarterlySales = async () => {
            setLoading(true);
            try {
                const response = await axios.get('/admin/quarterlySales', {
                    params: { startDate: startDate },
                    withCredentials: true
                });
                
                const salesData = response.data;

                const dates = salesData.map(item => item.Order_Date); // X-axis
                const totalOrders = salesData.map(item => item.Total_Orders); // Y-axis

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
                setLoading(false);
            } catch (error) {
                setError('Error fetching quarterly sales data');
                console.error('Error:', error);
                setLoading(false);
            }
        };

        fetchQuarterlySales();
    }, [startDate]); // Re-fetch when the startDate changes

    return (
        <div className="Rcontainer">
            {/* Sidebar */}
            <Sidebar />

            {/* Main content */}
            <div className="rcontainer">
                {/* Topbar */}
                <Topbar />

                {/* Input field for selecting the start date */}
                <div className="date-picker">
                    <label htmlFor="startDate">Select Start Date:</label>
                    <input
                        type="date"
                        id="startDate"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                    />
                </div>

                {/* Quarterly Sales Chart */}
                <div className="chart-area">
                    {loading ? (
                        <p>Loading chart...</p>
                    ) : error ? (
                        <p>{error}</p>
                    ) : (
                        <Line data={chartData} />
                    )}
                </div>
            </div>
        </div>
    );
}

export default QuarterlySales;
