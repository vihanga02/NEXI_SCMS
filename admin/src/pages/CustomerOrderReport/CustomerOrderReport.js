import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import axios from 'axios';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import './CustomerOrderReport.css'; // CSS for styling

// Register necessary Chart.js components
Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function CustomerOrderReport() {
    const [orderCountByCustomer, setOrderCountByCustomer] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const chartRef = useRef(); // Ref to capture the chart element
    const downloadBtnRef = useRef(); // Ref to control the download button visibility

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

    // Function to download the chart as PDF
    const downloadPDF = async () => {
        const doc = new jsPDF();
        const chartElement = chartRef.current;
        const downloadBtn = downloadBtnRef.current;

        // Temporarily hide the download button
        downloadBtn.style.display = 'none';

        // Capture the chart as an image
        const canvas = await html2canvas(chartElement);
        const imgData = canvas.toDataURL('image/png');

        // Show the download button again
        downloadBtn.style.display = 'block';

        // Add the image to the PDF and save it
        doc.setFontSize(18);
        doc.text("Customer Order Report", 14, 20);
        doc.addImage(imgData, 'PNG', 10, 30, 180, 100); // Adjust width and height as needed
        doc.save("Customer_Order_Report.pdf");
    };

    return (
        <div className="customer-order-report-container">
            <div className="content">
                <div className="chart-container" ref={chartRef}>

                    <h2>Customer Order Report</h2>
                    
                    <button onClick={downloadPDF} ref={downloadBtnRef} className="download-btn">Download PDF</button>

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
