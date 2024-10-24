// Sidebar.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaTachometerAlt, FaListUl, FaUserFriends, FaClipboardList, FaChartLine, FaTruck } from 'react-icons/fa';
import axios from 'axios';
import './Sidebar.css';

const Sidebar = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');


    useEffect(() => {
        // Call the async function inside useEffect
        fetchAdminData();
    }, []); 

    // Define an async function to fetch admin details
    const fetchAdminData = async () => {
        try {
            const res = await axios.get("/admin/admindetails", { withCredentials: true });
          
            setName(res.data.Name); // Set the name
            setEmail(res.data.Email); // Set the email
          } catch (error) {
            console.error("Error getting admin details:", error);
          }
    };

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
            <div className="admin-info">
                <hr />
                <h2>Nimal Bandara</h2> 
                <p>vihangadsada@gmail.com</p>
            </div>
        </div>
    );
};

export default Sidebar;
