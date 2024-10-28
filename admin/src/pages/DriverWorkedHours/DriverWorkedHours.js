import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Sidebar from '../../components/Sidebar/Sidebar';
import Topbar from '../../components/Topbar/Topbar';
import './DriverWorkedHours.css'; // Assuming you have a CSS file for styling

function DriverWorkedHours() {
    const [driverWorkHours, setDriverWorkHours] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // Fetch the driver work hours data when the component mounts
    useEffect(() => {
        const fetchDriverWorkHours = async () => {
            try {
                const token = localStorage.getItem('token'); // Retrieve the token from localStorage

                const response = await axios.get('/manager/driverWorkHours', {
                    headers: {
                        'Authorization': `Bearer ${token}` // Pass token in the Authorization header
                    },
                    withCredentials: true // Allow sending cookies and credentials if needed
                });

                setDriverWorkHours(response.data); // Set the fetched driver work hours data
                setLoading(false);
            } catch (error) {
                console.error('Error fetching driver work hours:', error);
                if (error.response && (error.response.status === 401 || error.response.status === 403)) {
                    navigate('/login'); // Redirect to login if unauthorized
                } else {
                    setError('Error fetching data. Please try again later.');
                }
                setLoading(false);
            }
        };

        fetchDriverWorkHours();
    }, [navigate]);

    return (
        <div className="driver-work-hours-container">
            <Sidebar />
            <div className="content">
                <Topbar />
                <div className="table-container">
                    <h2>Driver Work Hours</h2>

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
                                    <th>Hours Worked</th>
                                </tr>
                            </thead>
                            <tbody>
                                {driverWorkHours.map((entry, index) => (
                                    <tr key={index}>
                                        <td>{entry.Week_number}</td>
                                        <td>{entry.Driver_id}</td>
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
