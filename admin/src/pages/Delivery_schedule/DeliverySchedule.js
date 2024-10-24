import React, { useEffect, useState } from 'react'
import Sidebar from '../../components/Sidebar/Sidebar.js'
import Topbar from '../../components/Topbar/Topbar.js';
import './Delivery_schedule.css'
import { useNavigate } from "react-router-dom";
import axios from 'axios';


function DeliverySchedule() {

  const navigate = useNavigate();
  const [date, setDate] = useState('');
  const [data, setData] = useState([]);

  // const date = '2024-10-21';
  // const data = [
  //   {Delivery_id: 'JohnDoe', Truck_id: 'Route 1'},
  //   {Delivery_id: 'Jojnc', Truck_id: 'jnefcj 1'},
  //   {Delivery_id: 'jbdcj', Truck_id: 'cbdjb 1'}
  // ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(date);
      const schedules = await axios.get(`http://localhost:3000/admin/deliverySchedule/${date}`);
      setData(schedules.data);
      console.log(schedules.data);
    } catch (error) {
      console.error('Error getting schedules', 'Error getting schedules', error.response ? error.response : error);
    };
  }

  return (
    <div className='DScontainer'>
      <div className='dscontainer'>
        <div>
        <form onSubmit={handleSubmit}>
          <h1>Delivery Schedule</h1>
          <label className='p-3'>Select Date : </label>
          <input
            className='text-black p-2 rounded bg-yellow-500 right-6'
            type='date' name='date' placeholder='Enter date' value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <button className='btn btn-primary left-3' type='submit'>Submit</button>
        </form>
        <table className='order-table'>
          <thead>
            <tr>
              <th>Delivery_id</th>
              <th>Truck_id</th>
              <th>Driver_id</th>
              <th>Assistant_id</th>
              <th>Shipment_date</th>
            </tr>
          </thead>
          <tbody>
            {data.map((delivery, index) => (
              <tr key={index}>
                <td>{delivery.Delivery_id}</td>
                <td>{delivery.Truck_id}</td>
                <td>{delivery.Driver_id}</td>
                <td>{delivery.Assistant_id}</td>
                <td>{delivery.shipment_date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default DeliverySchedule