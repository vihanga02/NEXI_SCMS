import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import Topbar from '../../components/Topbar/Topbar';
import { Line } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import axios from 'axios';
import './QuarterlySales.css';  // Assuming you'll add some page-specific styles

// Register necessary Chart.js components
Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function QuarterlySales() {
    const [startDate, setStartDate] = useState('2024-10-01');  // Default start date
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

    // Function to fetch quarterly sales data
    const fetchQuarterlySales = async () => {
        setLoading(true);  // Set loading state to true
        setError(null);    // Reset any previous errors

        try {
            const response = await axios.get('/admin/quarterlySales', {
                params: { startDate },    // Pass startDate as a query parameter
                withCredentials: true     // Include credentials in the request
            });

            // Validate if response data exists and is in correct format
            if (response && response.data) {
                const salesData = response.data;
                console.log('Quarterly Sales Data:', salesData);  // Debugging line

                // Map data to chart format
                const dates = salesData.map(item => item.Order_Date);  // X-axis values
                const totalOrders = salesData.map(item => item.Total_Orders);  // Y-axis values

                // Update chart data state
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
            } else {
                throw new Error('No data received');
            }
        } catch (error) {
            console.error('Error fetching quarterly sales data:', error);
            setError('Error fetching quarterly sales data');
        } finally {
            setLoading(false);  // Set loading to false after request completion
        }
    };

    // Fetch quarterly sales data whenever startDate changes
    useEffect(() => {
        fetchQuarterlySales();  // Fetch data when the component mounts or startDate changes
    }, [startDate]);  // Dependency array includes startDate

    return (
        <div className="Rcontainer">
            <Sidebar />

            <div className="rcontainer">
                <Topbar />

                {/* Date Picker for selecting the start date */}
                <div className="date-picker">
                    <label htmlFor="startDate">Select Start Date:</label>
                    <input
                        type="date"
                        id="startDate"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                    />
                </div>

                {/* Display the Quarterly Sales Chart or Loading/Error Messages */}
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
