
import Sidebar from '../../components/Sidebar/Sidebar.js'
import Topbar from '../../components/Topbar/Topbar.js';
import './Driver.css'
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Driver() {



  const navigate = useNavigate();


  useEffect(() => {
    axios.get("/admin/profile",{withCredentials:true})
    .then((response) => {
    })
    .catch((error) => {
      navigate("/"); 
        console.error("Error fetching customer profile:", error);
    });
  }, []); 



  const drivers = [
    { id: 1, name: 'John Doe', hours: 40, status: 'Available' },
    { id: 2, name: 'Jane Smith', hours: 35, status: 'Resting' },
    { id: 3, name: 'Bob Johnson', hours: 50, status: 'Working' },
    { id: 4, name: 'Alice Brown', hours: 45, status: 'Available' },
    { id: 5, name: 'Charlie Davis', hours: 30, status: 'Resting' },
    { id: 6, name: 'Eve Wilson', hours: 55, status: 'Working' }
  ];


  return (
    <div className='driver-container'>
      <h1 className='driver-title'>Drivers of store</h1>
      <div className='driver-content'>
        <table className='driver-table'>
          <thead className='driver-table-head'>
            <tr className='driver-table-row'>
              <th className='driver-table-header'>Driver ID</th>
              <th className='driver-table-header'>Driver Name</th>
              <th className='driver-table-header'>Total Work Hours</th>
              <th className='driver-table-header'>Driver Status</th>
            </tr>
          </thead>
          <tbody className='driver-table-body'>
            {drivers.map(driver => (
              <tr key={driver.id} className='driver-table-row'>
                <td className='driver-table-data'>{driver.id}</td>
                <td className='driver-table-data'>{driver.name}</td>
                <td className='driver-table-data'>{driver.hours}</td>
                <td className='driver-table-data'>{driver.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Driver