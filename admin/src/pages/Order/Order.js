
import './Order.css';
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Order() {
  // Sample data for the table

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



  const orders = [
    { username: 'JohnDoe', route: 'Route 1', orderedDay: '2023-10-01', expectedDay: '2023-10-05', totalPrice: '$100' },
    { username: 'JaneSmith', route: 'Route 2', orderedDay: '2023-10-02', expectedDay: '2023-10-06', totalPrice: '$150' },
    // Add more sample data as needed
  ];

  return (
    <div className='ADcontainer'>
      <div className='Acontainer'>
        <div className='order-content'>
          <h2>Customer's Pending Orders</h2>
          <table className='order-table'>
            <thead>
              <tr>
                <th>Customer Username</th>
                <th>Route Name</th>
                <th>Ordered Day</th>
                <th>Expected Day</th>
                <th>Total Price</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={index}>
                  <td>{order.username}</td>
                  <td>{order.route}</td>
                  <td>{order.orderedDay}</td>
                  <td>{order.expectedDay}</td>
                  <td>{order.totalPrice}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Order;