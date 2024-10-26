import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Sidebar from '../../components/Sidebar/Sidebar';
import Topbar from '../../components/Topbar/Topbar';
import './UsedHoursOfTrucks.css'; // Assuming you have a CSS file for styling

function UsedHoursOfTrucks() {
    const [truckHours, setTruckHours] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // Fetch truck hours data when the component mounts
    useEffect(() => {
        const fetchTruckHours = async () => {
            try {
                const token = localStorage.getItem('token'); // Retrieve token from localStorage

                const response = await axios.get('/admin/truckHours', {
                    headers: {
                        'Authorization': `Bearer ${token}` // Pass token in the Authorization header
                    },
                    withCredentials: true // Allow sending cookies and credentials if needed
                });

                setTruckHours(response.data); // Set the fetched truck hours data
                setLoading(false);
            } catch (error) {
                console.error('Error fetching truck hours:', error);
                if (error.response && (error.response.status === 401 || error.response.status === 403)) {
                    navigate('/login'); // Redirect to login if unauthorized
                } else {
                    setError('Error fetching data. Please try again later.');
                }
                setLoading(false);
            }
        };

        fetchTruckHours();
    }, [navigate]);

    return (
        <div className="used-hours-of-trucks-container">
            <Sidebar />
            <div className="content">
                <Topbar />
                <div className="table-container">
                    <h2>Truck Usage Hours</h2>

                    {loading ? (
                        <p>Loading data...</p>
                    ) : error ? (
                        <p>{error}</p>
                    ) : (
                        <table className="modern-table">
                            <thead>
                                <tr>
                                    <th>Week Number</th>
                                    <th>Truck ID</th>
                                    <th>Hours Worked</th>
                                </tr>
                            </thead>
                            <tbody>
                                {truckHours.map((entry, index) => (
                                    <tr key={index}>
                                        <td>{entry.Week_number}</td>
                                        <td>{entry.Truck_id}</td>
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

export default UsedHoursOfTrucks;
