import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import Topbar from '../../components/Topbar/Topbar';
import axios from 'axios';
import './AssistantWorkedHours.css';  // Assuming you'll add some page-specific styles

function AssistantWorkedHours() {
    const [assistantWorkHours, setAssistantWorkHours] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch the assistant work hours data when the component mounts
    useEffect(() => {
        const fetchAssistantWorkHours = async () => {
            try {
                const token = localStorage.getItem('token'); // Retrieve the token from localStorage

                const response = await axios.get('/admin/assistantWorkHours', {
                    headers: {
                        'Authorization': `Bearer ${token}` // Pass token in the Authorization header
                    },
                    withCredentials: true // Allow sending cookies and credentials if needed
                });

                setAssistantWorkHours(response.data); // Set the fetched assistant work hours data
                setLoading(false);
            } catch (error) {
                console.error('Error fetching assistant work hours:', error);
                setError('Error fetching data. Please try again later.');
                setLoading(false);
            }
        };

        fetchAssistantWorkHours();
    }, []);

    return (
        <div className="assistant-work-hours-container">
            {/* Sidebar */}
            <Sidebar />

            {/* Main content */}
            <div className="content">
                <Topbar />

                <div className="table-container">
                    <h2>Assistant Work Hours</h2>

                    {loading ? (
                        <p>Loading data...</p>
                    ) : error ? (
                        <p>{error}</p>
                    ) : (
                        <table className="modern-table">
                            <thead>
                                <tr>
                                    <th>Week Number</th>
                                    <th>Assistant ID</th>
                                    <th>Hours Worked</th>
                                </tr>
                            </thead>
                            <tbody>
                                {assistantWorkHours.map((entry, index) => (
                                    <tr key={index}>
                                        <td>{entry.Week_number}</td>
                                        <td>{entry.Assistant_id}</td>
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

export default AssistantWorkedHours;
