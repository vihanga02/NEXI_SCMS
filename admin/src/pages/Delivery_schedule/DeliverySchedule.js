import React, { useState } from 'react'
import './Delivery_schedule.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function DeliverySchedule() {

  const navigate = useNavigate();
  const [date, setDate] = useState('');
  const [data, setData] = useState([]);
  const [vehicle, setVehicle] = useState('Not set');
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
      const response = await axios.post(`/admin/addDeliverySchedule`,{ withCredentials: true });
      console.log('Response from backend:', response.data);
    } catch (error) {
      console.error('Error sending request to backend:', error);
    }
  };

  const handleVehicle = async (e) => {
    setVehicle(e[0]); // Update selected item in state
    if(vehicle === 'Truck'){
      navigate(`/delivery_schedule/truckScheduler/`, { 
        state: { delivery_id: e[1] } 
      });
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
                  <div>{delivery.Delivery_status}</div>
                  <details className="dropdown">
                    <summary className="btn m-1 bg-green-500 hover:bg-gray-500">Change status</summary>
                    <ul className="menu dropdown-content bg-base-100 bg-gray-400 rounded z-[1] w-52 p-2 shadow">
                      <li><button onClick={() => handleSelect(['Not_Yet', delivery.Delivery_id])}>Not Yet</button></li>
                      <li><button onClick={() => handleSelect(['On_Train', delivery.Delivery_id])}>On Train</button></li>
                      <li><button onClick={() => handleSelect(['In_Truck', delivery.Delivery_id])}>In Truck</button></li>
                      <li><button onClick={() => handleSelect(['Completed', delivery.Delivery_id])}>Completed</button></li>
                    </ul>
                  </details>
                </td>
                <td>
                
                  <details className="dropdown">
                    <summary className="btn m-1">Set vehicle</summary>
                    <ul className="menu dropdown-content bg-base-100 bg-green-400 rounded z-[1] w-52 p-2 shadow">
                      <li><a onClick={() => handleVehicle(['Truck', delivery.Delivery_id])}>Truck</a></li>
                      <li><a onClick={() => handleVehicle(['Train', delivery.Delivery_id])}>Train</a></li>
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