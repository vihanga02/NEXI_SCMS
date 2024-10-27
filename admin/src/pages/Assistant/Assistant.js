
import './Assistant.css';
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../../components/Sidebar/Sidebar.js'
import Topbar from '../../components/Topbar/Topbar.js';

function Assistant() {
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







  const assistants = [
    { id: 1, name: 'John Doe', hours: 40, status: 'Available' },
    { id: 2, name: 'Jane Smith', hours: 35, status: 'Resting' },
    { id: 3, name: 'Bob Johnson', hours: 50, status: 'Working' },
    { id: 4, name: 'Alice Brown', hours: 45, status: 'Available' },
    { id: 5, name: 'Charlie Davis', hours: 30, status: 'Resting' },
    { id: 6, name: 'Eve Wilson', hours: 55, status: 'Working' }
  ];


  return (
    <div className='assistant-container'>
      <h1 className='assistant-title'>Assistants of store</h1>
      <div className='assistant-content'>
        <table className='assistant-table'>
          <thead className='assistant-table-head'>
            <tr className='assistant-table-row'>
              <th className='assistant-table-header'>Assistant ID</th>
              <th className='assistant-table-header'>Assistant Name</th>
              <th className='assistant-table-header'>Total Work Hours</th>
              <th className='assistant-table-header'>Assistant Status</th>
            </tr>
          </thead>
          <tbody className='assistant-table-body'>
            {assistants.map(assistant => (
              <tr key={assistant.id} className='assistant-table-row'>
                <td className='assistant-table-data'>{assistant.id}</td>
                <td className='assistant-table-data'>{assistant.name}</td>
                <td className='assistant-table-data'>{assistant.hours}</td>
                <td className='assistant-table-data'>{assistant.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Assistant