import React, { useState } from 'react'
import './Delivery_schedule.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function DeliverySchedule() {

  const navigate = useNavigate();
  const [date, setDate] = useState('');
  const [data, setData] = useState([]);
  const [status, setStatus] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(date);
      const schedules = await axios.get(`/admin/deliverySchedule/${date}`,{ withCredentials: true });
      setData(schedules.data);
      console.log(schedules.data);
    } catch (error) {
      console.error('Error getting schedules', error.response ? error.response : error);
    };
  }

  // Function to handle item selection
  const handleSelect = async (status) => {
    setStatus(status); // Update selected item in state

    // Sending the selected item to the backend
    try {
      const response = await axios.post(`/admin/setDeliveryStatus`, { status: status[0], Delivery_id: status[1] },{ withCredentials: true });
      console.log('Response from backend:', response.data);
    } catch (error) {
      console.error('Error sending request to backend:', error);
    }
  };


  const createSchedule = async () => {
    try {
      const response = await axios.post(`/admin/addDeliverySchedule`,{},{ withCredentials: true });
      console.log('Response from backend:', response.data);
    } catch (error) {
      console.error('Error sending request to backend:', error);
    }
  };

  const handleTracking = async (e) => {
      navigate(`/order`, {
        state: { delivery_id: e } 
      });
  };

  const handleDel = async (ID) => {
    try {
      const response = await axios.delete(`/admin/deleteSchedule`, { 
        data: {deliveryID: ID },
        withCredentials: true 
      });
      console.log('Response from backend:', response.data);
    } catch (error) {
      console.error('Error sending request to backend:', error);
    }
  };

  return (

    <div className='DScontainer'>
      <div className='dscontainer'>
        <h1>Delivery Schedule</h1>
        <form onSubmit={handleSubmit} className='border-s-black-200 '>
          <label className='p-3 m-8'>Select Date : </label>
          <input
            className='text-black p-2 rounded bg-yellow-500 m-2'
            type='date' name='date' placeholder='Enter date' value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <button className='btn btn-primary m-2 p-2' type='submit'>Submit</button>
        </form>
        <button className='btn btn-primary m-2 p-2' onClick={() => createSchedule()}>Create new empty schedule</button>
        <table className='order-table'>
          <thead>
            <tr>
              <th>Delivery ID</th>
              <th>Shipment Date</th>
              <th>Vehicle Departure Time</th>
              <th>Vehicle Arrival Time</th>
              <th>Delivery Status</th>
              <th>Truck or train</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((delivery, index) => (
              <tr key={index}>
                <td>{delivery.Delivery_id}</td>
                <td>{delivery.Shipment_Date}</td>
                <td>{delivery.Vehicle_departure_time}</td>
                <td>{delivery.Vehicle_arrival_time}</td>
                <td>
                  {/* setStatus(delivery.Delivery_status) */}
                  <div className='btn m-0.5' onClick={() => window.location.reload()}>{delivery.Delivery_status}</div>
                  <details className="dropdown">
                    <summary className="btn m-0.5 bg-green-500 hover:border-spacing-3">Change status</summary>
                    <ul className="menu dropdown-content bg-base-100 bg-green-400 rounded z-[1] w-52 p-2 shadow">
                      <li><button onClick={() => handleSelect(['Not_Yet', delivery.Delivery_id])}>Not Yet</button></li>
                      <li><button onClick={() => handleSelect(['On_Train', delivery.Delivery_id])}>On Train</button></li>
                      <li><button onClick={() => handleSelect(['In_Truck', delivery.Delivery_id])}>In Truck</button></li>
                      <li><button onClick={() => handleSelect(['Completed', delivery.Delivery_id])}>Completed</button></li>
                    </ul>
                  </details>
                </td>
                <td>
                  <button className="btn m-0.5 btn-primary" onClick={() => handleTracking(delivery.Delivery_id)} >Track Orders</button>
                </td>
                <td><button className='btn btn-danger' onClick={() => handleDel(delivery.Delivery_id)}>Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )

}
export default DeliverySchedule;