import React, { useState } from 'react'
import Sidebar from '../../components/Sidebar/Sidebar.js'
import Topbar from '../../components/Topbar/Topbar.js';
import './Delivery_schedule.css'
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import axios from 'axios';


function DeliverySchedule() {

  const navigate = useNavigate();
  const [date, setDate] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.get('/delivery_schedule', { date: date })
  };

  return (
    <div className='DScontainer'>
      <div className='dscontainer'>
        <div>
          <h1>Delivery Schedule</h1>
          <label className='p-3'>Select Date : </label>
          <input
            className='text-white bg-red-950 p-2 rounded'
            type='date' name='date' placeholder='Enter date' value={date}
            onChange={(e) => setDate(e.target.value)}
            onSubmit={handleSubmit} />
        </div>
        <div>
          {/* <table className='border-spacing-1'>
            <th>
              <td>Order Date</td>
              <td>Order Time</td>
              <td>Customer Name</td>
              <td>Customer Phone</td>
              <td>Customer Address</td>
              <td>Order Status</td>
              <td>Delivery Date</td>
              <td>Delivery Time</td>
              <td>Driver Name</td>
              <td>Assistant Name</td>
              <td>Vehicle Number</td>
            </th>
          </table> */}
        </div>
      </div>
    </div>
  )
}

export default DeliverySchedule