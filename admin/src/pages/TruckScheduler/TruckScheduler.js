import React, { useEffect,useState } from 'react'
import './TruckScheduler.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';

function TruckScheduler() {

    const navigate = useNavigate();
    const location = useLocation();
    const[deliveries, setDeliveries] = useState([]);
    const delivery_id = location.state || {};

    const fetchDeliveries = async () => {
        try {
            const response = await axios.get(`/manager/truckDelivery`,{ withCredentials: true });
            setDeliveries(response.data);
        } catch (error) {
            console.error('Error fetching deliveries', error);
        }
    };

    useEffect(() => {
        fetchDeliveries();
    }, [deliveries]);

    const handleAssign = async () => {
        // Send request to backend to assign truck
        try {
            const response = await axios.post(`/manager/assignTruck`, { delivery_id },{ withCredentials: true });
            console.log('Response from backend:', response.data);
            toast.success("Truck schedule assigned!", {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
              });
            // navigate('/delivery_schedule');
        } catch (error) {
            toast.error("Error assigning!", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "colored",
            });
            console.error('Error assigning truck:', error);
        }
    };

    const handleDelete = async (id) => {
        // Send request to backend to delete truck
        try {
            const response = await axios.delete(`/manager/deleteTruck`, { 
                data: { ID: id },
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
            console.error('Error deleting truck:', error);
        }
    };

  return (
    <div>
        <div className='ADcontainer'>
            <div className='Acontainer'>
                <h1>Truck Scheduler</h1>
                <button className='btn btn-primary' onClick={() => handleAssign()}>Assign Truck, Driver & Assistant</button>
                <table className='order-table'>
                    <thead>
                    <tr>
                        <th>Delivery ID</th>
                        <th>Truck_ID</th>
                        <th>Driver_ID</th>
                        <th>Driver Name</th>
                        <th>Assistant_ID</th>
                        <th>Assistant Name</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {deliveries.map((delivery, index) => (
                        <tr key={index}>
                            <td>{delivery.Truck_Del_ID}</td>
                            <td>{delivery.Truck_id}</td>
                            <td>{delivery.Driver_id}</td>
                            <td>{delivery.Driver_name}</td>
                            <td>{delivery.Assistant_id}</td>
                            <td>{delivery.Assistant_name}</td>
                            <td>
                                <button className='btn btn-danger' onClick={() => handleDelete(delivery.ID)}>DELETE</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
        <ToastContainer/>
    </div>
  )
}

export default TruckScheduler;
