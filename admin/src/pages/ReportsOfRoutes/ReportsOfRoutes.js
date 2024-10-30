import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import axios from 'axios';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import './ReportsOfRoutes.css';

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function ReportsOfRoutes() {
    const [salesByRoute, setSalesByRoute] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const chartRef = useRef(); // Ref to capture the chart element
    const downloadBtnRef = useRef(); // Ref for the download button

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

    // Function to download the chart as PDF
    const downloadPDF = async () => {
        const doc = new jsPDF();
        const chartElement = chartRef.current;
        const downloadBtn = downloadBtnRef.current;

        // Hide the download button temporarily
        downloadBtn.style.display = 'none';

        // Capture the chart as an image
        const canvas = await html2canvas(chartElement);
        const imgData = canvas.toDataURL('image/png');

        // Restore the download button visibility
        downloadBtn.style.display = 'block';

        // Add the image to the PDF and save it
        doc.setFontSize(18);
        doc.text("Sales by Route Report", 14, 20);
        doc.addImage(imgData, 'PNG', 10, 30, 180, 100); // Adjust width and height as needed
        doc.save("Sales_By_Route_Report.pdf");
    };

    return (
        <div className="reports-routes-container">
            <div className="content">
                <div className="chart-container" ref={chartRef}>
                    <h2>Sales by Route</h2>
                    
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

export default ReportsOfRoutes;
