import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import './ReportsOfMainCities.css';

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function ReportsOfMainCities() {
    const [salesByCity, setSalesByCity] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const chartRef = useRef();

    useEffect(() => {
        const fetchSalesByCity = async () => {
            try {
                const response = await axios.get('/manager/salesByCity', {
                    withCredentials: true 
                });

                setSalesByCity(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching sales by city:', error);
                if (error.response && (error.response.status === 401 || error.response.status === 403)) {
                    navigate('/');
                } else {
                    setError('Error fetching data. Please try again later.');
                }
                setLoading(false);
            }
        };

        fetchSalesByCity();
    }, [navigate]);

    const chartData = {
        labels: salesByCity.map(entry => entry.City),
        datasets: [
            {
                label: 'Total Sales',
                data: salesByCity.map(entry => entry['SUM(Total_Price)']),
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    const downloadPDF = async () => {
        const doc = new jsPDF();
        const chartElement = chartRef.current;

        const canvas = await html2canvas(chartElement);
        const imgData = canvas.toDataURL('image/png');

        doc.setFontSize(18);
        doc.text("Sales by City", 14, 20);
        doc.addImage(imgData, 'PNG', 10, 30, 180, 100);
        doc.save("Sales_by_City_Report.pdf");
    };

    return (
        <div className="reports-main-cities-container">
            <div className="content">
                <div className="chart-container" ref={chartRef}>
                    <h2>Sales by City</h2>
                    {loading ? (
                        <p>Loading data...</p>
                    ) : error ? (
                        <p>{error}</p>
                    ) : (
                        <Bar data={chartData} options={{ responsive: true }} />
                    )}
                    <button onClick={downloadPDF} className="download-btn">
                        Download PDF
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ReportsOfMainCities;