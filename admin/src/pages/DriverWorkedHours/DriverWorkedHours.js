import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import './DriverWorkedHours.css';

function DriverWorkedHours() {
    const [driverWorkHours, setDriverWorkHours] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // Fetch the driver work hours data when the component mounts
    useEffect(() => {
        const fetchDriverWorkHours = async () => {
            try {
                const response = await axios.get('/manager/driverWorkHours', {
                    withCredentials: true 
                });

                setDriverWorkHours(response.data); // Set the fetched driver work hours data
                setLoading(false);
            } catch (error) {
                console.error('Error fetching driver work hours:', error);
                if (error.response && (error.response.status === 401 || error.response.status === 403)) {
                    navigate('/'); // Redirect to login if unauthorized
                } else {
                    setError('Error fetching data. Please try again later.');
                }
                setLoading(false);
            }
        };

        fetchDriverWorkHours();
    }, [navigate]);

    // Function to download table as PDF
    const downloadPDF = () => {
        const doc = new jsPDF();
        doc.text("Driver Work Hours", 20, 10);

        doc.autoTable({
            startY: 20,
            head: [['Week Number', 'Driver ID', 'Driver Name', 'Hours Worked']],
            body: driverWorkHours.map(entry => [
                entry.Week_number,
                entry.Driver_id,
                entry.Driver_name,
                entry.Hours_worked
            ]),
        });

        doc.save("Driver_Work_Hours_Report.pdf");
    };

    return (
        <div className="driver-work-hours-container">
            <div className="content">
                <div className="table-container">
                    <h2>Driver Work Hours</h2>
                    
                    <button onClick={downloadPDF} className="download-btn">Download PDF</button>

                    {loading ? (
                        <p>Loading data...</p>
                    ) : error ? (
                        <p>{error}</p>
                    ) : (
                        <table className="modern-table">
                            <thead>
                                <tr>
                                    <th>Week Number</th>
                                    <th>Driver ID</th>
                                    <th>Driver Name</th>
                                    <th>Hours Worked</th>
                                </tr>
                            </thead>
                            <tbody>
                                {driverWorkHours.map((entry, index) => (
                                    <tr key={index}>
                                        <td>{entry.Week_number}</td>
                                        <td>{entry.Driver_id}</td>
                                        <td>{entry.Driver_name}</td>
                                        <td>{entry.Hours_worked}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    );
}

export default DriverWorkedHours;
