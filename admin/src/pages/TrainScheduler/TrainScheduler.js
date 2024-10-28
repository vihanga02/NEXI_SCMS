import React,{useEffect, useState} from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import './TrainScheduler.css';


const TrainScheduler = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const delivery_id = location.state || {};
    const [trains, setTrains] = useState([]);

    const getTrains = async () => {
        try {
            const response = await axios.get('/manager/trains', { withCredentials: true });
            setTrains(response.data);
        } catch (error) {
            console.error('Error getting trains', error.response ? error.response : error);
        }
    };

    useEffect(() => {
        getTrains();
    }, []);

    const handleAssign = async (train_id) => {
        console.log('Assign Train');
        try {
            const response = await axios.post('/manager/assignTrain', { trainID: train_id, delID:delivery_id },{ withCredentials: true });
            console.log('Response from backend:', response.data);
            navigate('/delivery_schedule');
        } catch (error) {
            console.error('Error assigning train:', error);
        }
    }

  return (

        <div className='ADcontainer'>
            <div className='Acontainer'>
                <div className='order-content'>
                <h2>Available Trains</h2>
                <table className='order-table'>
                    <thead>
                    <tr>
                        <th>Train ID</th>
                        <th>Train Name</th>
                        <th>Day</th>
                        <th>Start Time</th>
                        <th>Available space</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {trains.map((train,index) => (
                        <tr key={index}>
                            <td>{train.Train_ID}</td>
                            <td>{train.Train_Name}</td>
                            <td>{new Date(train.Day).toLocaleDateString()}</td>
                            <td>{train.Start_Time}</td>
                            <td>{train.Available_space}</td>
                            <td>
                                <button 
                                className='btn btn-primary' 
                                onClick={() => handleAssign(train.Train_ID)}>Assign Train</button>
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

export default TrainScheduler