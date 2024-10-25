import React, { useEffect,useState } from 'react'
import './TruckScheduler.css';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

function TruckScheduler() {

    const location = useLocation();
    const[deliveries, setDeliveries] = useState([]);
    const delivery_id = location.state || {};

    const fetchDeliveries = async () => {
        try {
            const response = await axios.get(`/admin/truckDelivery`,{ withCredentials: true });
            setDeliveries(response.data);
        } catch (error) {
            console.error('Error fetching deliveries', error);
        }
    };

    useEffect(() => {
        fetchDeliveries();
    }, []);

    const handleAssign = async () => {
        // Send request to backend to assign truck
        try {
            console.log('Assign Truck');
            const response = await axios.post(`/admin/assignTruck`, { deliveryID: delivery_id },{ withCredentials: true });
            console.log('Response from backend:', response.data);
        } catch (error) {
            console.error('Error assigning truck:', error);
        }
    };

    const handleDelete = async () => {
        // Send request to backend to delete truck
        try {
            const response = await axios.post(`/admin/deleteTruck`, { deliveryID: delivery_id });
            console.log('Response from backend:', response.data);
        } catch (error) {
            console.error('Error deleting truck:', error);
        }
        console.log('Delete Truck');
    };

  return (
    <div>
        <div className='ADcontainer'>
            <div className='Acontainer'>
                <h1>Truck Scheduler</h1>
                <button className='btn btn-primary' onClick={handleAssign}>Assign Truck, Driver & Assistant</button>
                <table className='order-table'>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Truck_ID</th>
                        <th>Driver_ID</th>
                        <th>Assistant_ID</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {deliveries.map((delivery, index) => (
                        <tr key={index}>
                            <td>{delivery.ID}</td>
                            <td>{delivery.Truck_ID}</td>
                            <td>{delivery.Driver_ID}</td>
                            <td>{delivery.Assistant_ID}</td>
                            <td>
                                <button className='btn btn-danger' onClick={handleDelete}>DELETE</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
  )
}

export default TruckScheduler;
