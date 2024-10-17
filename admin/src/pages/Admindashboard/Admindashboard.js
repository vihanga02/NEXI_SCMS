import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../../components/Sidebar/Sidebar.js';
import Topbar from '../../components/Topbar/Topbar.js';

import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Default styles for the calendar
import './Admindashboard.css';

function Admindashboard() {
  const [activeUsers, setActiveUsers] = useState(0);
  const [incompleteOrders, setIncompleteOrders] = useState(0);
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const fetchData = async () => {
      try {
        
        const activeUsersResponse = await axios.get('/api/active-users'); // Replace with your actual API endpoint
        setActiveUsers(activeUsersResponse.data.count);

        const incompleteOrdersResponse = await axios.get('/api/incomplete-orders'); // Replace with your actual API endpoint
        setIncompleteOrders(incompleteOrdersResponse.data.count);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className='ADcontainer'>
      <Sidebar />
      <div className='Acontainer'>
        <Topbar />
      
        <div className='widgets-row'>
          <div className='widget active-users'>
            <h3>Active Users</h3>
            <p>{activeUsers}</p>
            <div className='progress-bar'>
              <div className='progress' style={{ width: `${(activeUsers / 100) * 100}%` }}></div>
            </div>
          </div>
          <div className='widget incomplete-orders'>
            <h3>Incomplete Orders</h3>
            <p>{incompleteOrders}</p>
            <div className='progress-bar'>
              <div className='progress' style={{ width: `${(incompleteOrders / 100) * 100}%` }}></div>
            </div>
          </div>
        </div>

       
        <div className='calendar-container'>
          <Calendar onChange={setDate} value={date} />
        </div>
      </div>
    </div>
  );
}

export default Admindashboard;
