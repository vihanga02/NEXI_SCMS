// Sidebar.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaTachometerAlt, FaListUl, FaUserFriends, FaClipboardList, FaChartLine, FaTruck } from 'react-icons/fa';
import axios from 'axios';
import './Sidebar.css';

const Sidebar = () => {
    const [admin, setAdmin] = useState({ name: '', email: '' });

    useEffect(() => {
        // Define an async function to fetch admin details
        const fetchAdminData = async () => {
            try {
                const response = await axios.get('/api/admin'); 
                setAdmin(response.data); 
            } catch (error) {
                console.error('Error fetching admin data:', error);
            }
        };

        // Call the async function inside useEffect
        fetchAdminData();
    }, []); 

    const menuItems = [
        { name: 'Dashboard', icon: <FaTachometerAlt />, path: '/admindashboard' },
        { name: 'Order List', icon: <FaListUl />, path: '/order' },
        { name: 'Driver', icon: <FaUserFriends />, path: '/driver' },
        { name: 'Assistant', icon: <FaClipboardList />, path: '/assistant' },
        { name: 'Report', icon: <FaChartLine />, path: '/report' },
        { name: 'Delivery Schedule', icon: <FaTruck />, path: '/delivery_schedule' },
    ];

    return (
        <div className="sidebar">
            <div className="admin-info">
                <h2>{admin.name}</h2>
                <p>{admin.email}</p>
            </div>
            <hr />
            <ul className="menu">
                {menuItems.map(item => (
                    <li key={item.name}>
                        <Link to={item.path} className="menu-item">
                            {item.icon}
                            <span>{item.name}</span>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Sidebar;
