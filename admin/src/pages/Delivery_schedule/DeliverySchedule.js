import './Delivery_schedule.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { useState, useEffect } from 'react';


function DeliverySchedule() {

  const navigate = useNavigate();
  const [date, setDate] = useState('');
  const [data, setData] = useState([]);
  const [status, setStatus] = useState([]);



  useEffect(() => {
    axios.get("/manager/profile",{withCredentials:true})
    .then((response) => {
    })
    .catch((error) => {
      navigate("/"); 
        console.error("Error fetching customer profile:", error);
    });
  }, [data]); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const schedules = await axios.get(`/manager/deliverySchedule/${date}`,{ withCredentials: true });
      setData(schedules.data);
    } catch (error) {
      console.error('Error getting schedules', error.response ? error.response : error);
    };
  }

  // Function to handle item selection
  const handleSelect = async (status) => {
    setStatus(status); // Update selected item in state

    // Sending the selected item to the backend
    try {
      const response = await axios.post(`/manager/setDeliveryStatus`, { status: status[0], Delivery_id: status[1] },{ withCredentials: true });

    } catch (error) {
      console.error('Error sending request to backend:', error);
    }
  };


  const createSchedule = async () => {
    try {
      const response = await axios.post(`/manager/addDeliverySchedule`,{},{ withCredentials: true });
      toast.success("Schedule created!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      console.log('Response from backend:', response.data);
    } catch (error) {
      console.error('Error sending request to backend:', error);
    }
  };

  const handleTracking = async (e) => {
    toast.success("Navigating to orders!", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

    setTimeout(() => {
      navigate(`/order`, {
        state: { delivery_id: e } 
      });
    }, 1000);

  };

  const updateArrival = async (ID) => {
    try {
      const response = await axios.post(`/admin/updateArrivalTime`, { deliveryID: ID }, { withCredentials: true });
      toast.success("Arrival time updated!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      console.log('Response from backend:', response.data);
    } catch (error) {
      console.error('Error sending request to backend:', error);
    }
  };

  const handleDel = async (ID) => {
    try {
      const response = await axios.delete(`/manager/deleteSchedule`, { 
        data: {deliveryID: ID },
        withCredentials: true 
      });
      toast.success("Schedule deleted!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
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
        <button className='btn btn-secondary m-1' onClick={() => navigate(`/delivery_schedule/truckScheduler/`)}>Truck Schedules</button>
        <button className='btn btn-secondary m-1' onClick={() => navigate(`/delivery_schedule/trainScheduler/`)}>Train Schedules</button>
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
                <td>{new Date(delivery.Shipment_date).toLocaleDateString()}</td>
                <td>{delivery.Vehicle_departure_time}</td>
                <td>
                  {delivery.Vehicle_arrival_time}<br />
                  <button className='btn m-0.5 btn-primary' onClick={() => updateArrival(delivery.Delivery_id)}>Update Arrival Time</button>
                </td>
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
      <ToastContainer />
    </div>
  )

}
export default DeliverySchedule;