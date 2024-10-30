import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/Sidebar/Sidebar';
import Topbar from '../../components/Topbar/Topbar';
import { Bar } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import axios from 'axios';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
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
    const chartRef = useRef(null); // Ref for the chart container
    const downloadBtnRef = useRef(); // Ref for the download button

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
                const dates = salesData.map(item => item.Order_Date);
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

    const downloadPDF = async () => {
        const downloadBtn = downloadBtnRef.current;

        // Temporarily hide the download button
        downloadBtn.style.display = 'none';

        // Capture the chart area as a canvas
        const canvas = await html2canvas(chartRef.current);
        const imgData = canvas.toDataURL('image/png');

        // Restore the download button visibility
        downloadBtn.style.display = 'block';

        // Create and save the PDF
        const pdf = new jsPDF('landscape');
        pdf.setFontSize(18);
        pdf.text("Quarterly Sales", 15, 20);
        pdf.addImage(imgData, 'PNG', 10, 30, 280, 150);
        pdf.save('Quarterly_Sales_Report.pdf');
    };
    
    return (
        <div className="Rcontainer">
            <Sidebar />
            <div className="rcontainer">
                <Topbar />

                <div className="date-picker">
                    <label htmlFor="startDate">Select Start Date:</label>
                    <input
                        type="date"
                        id="startDate"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                    />
                </div>

                <div className="chart-area" ref={chartRef}>
                    {loading ? (
                        <p>Loading chart...</p>
                    ) : error ? (
                        <p>{error}</p>
                    ) : (
                        <Bar data={chartData} options={{ responsive: true }} />
                    )}

                    {/* Download PDF Button */}
                    <button onClick={downloadPDF} ref={downloadBtnRef} className="download-btn">
                        Download PDF
                    </button>
                </div>
            </div>
        </div>
    );
}

export default QuarterlySales;
