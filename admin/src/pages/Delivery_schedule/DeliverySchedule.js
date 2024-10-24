import React, { useState } from 'react'
import './Delivery_schedule.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function DeliverySchedule() {

  const navigate = useNavigate();
  const [date, setDate] = useState('');
  const [data, setData] = useState([]);
  const [status, setStatus] = useState(null); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(date);
      const schedules = await axios.get(`http://localhost:3001/nexi/admin/deliverySchedule/${date}`);
      setData(schedules.data);
      console.log(schedules.data);
    } catch (error) {
      console.error('Error getting schedules', 'Error getting schedules', error.response ? error.response : error);
    };
  }

    // Function to handle item selection
    const handleSelect = async (item) => {
      setStatus(item); // Update selected item in state
  
      // Sending the selected item to the backend
      try {
        const response = await axios.post(`http://localhost:3001/nexi/admin/`, { selectedItem: item });
        console.log('Response from backend:', response.data);
      } catch (error) {
        console.error('Error sending request to backend:', error);
      }
    };

  return (

      <div className='DScontainer'>
        <div className='dscontainer'>
        <h1>Delivery Schedule</h1>
        <form onSubmit={handleSubmit}>
          <label className='p-3'>Select Date : </label>
          <input
            className='text-black p-2 rounded bg-yellow-500 m-2'
            type='date' name='date' placeholder='Enter date' value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <button className='btn btn-primary m-2 p-2' type='submit'>Submit</button>
        </form>
        <table className='order-table'>
          <thead>
            <tr>
              <th>Delivery ID</th>
              <th>Train ID</th>
              <th>Truck ID</th>
              <th>Driver ID</th>
              <th>Assistant ID</th>
              <th>Shipment Date</th>
              <th>Vehicle Departure Time</th>
              <th>Vehicle Arrival Time</th>
              <th>Delivery Status</th>
            </tr>
          </thead>
          <tbody>
            {data.map((delivery, index) => (
              <tr key={index}>
                <td>{delivery.Delivery_id}</td>
                <td>{delivery.Train_id}</td>
                <td>{delivery.Truck_id}</td>
                <td>{delivery.Driver_id}</td>
                <td>{delivery.Assistant_id}</td>
                <td>{delivery.Shipment_date}</td>
                <td>{delivery.Vehicle_departure_time}</td>
                <td>{delivery.Vehicle_arrival_time}</td>
                <td>
                  {setStatus(delivery.Delivery_status)}
                  {status && <p>{status}</p>} {/* Display selected item */}
                  <details className="dropdown">
                    <summary className="btn m-1">Change status</summary>
                    <ul className="menu dropdown-content bg-base-100 bg-green-400 rounded z-[1] w-52 p-2 shadow">
                      <li><a onClick={() => handleSelect('On_Train')}>On Train</a></li>
                      <li><a onClick={() => handleSelect('In_Truck')}>In Truck</a></li>
                      <li><a onClick={() => handleSelect('Completed')}>Completed</a></li>
                    </ul>
                  </details>
                </td>
              </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
  )

}
export default DeliverySchedule;