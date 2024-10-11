import React from 'react';
import './UserDetails.css';


const UserDetails = () => {
  // Dummy data for the customer profile
  const customerData = {
    fullName: "John Doe",
    username: "johndoe",
    email: "john.doe@example.com",
    phone: "+1 234 567 890",
    address: "123 Main Street, Springfield, USA"
  };

  // Dummy data for the customer's orders
  const orders = [
    { id: 1, product: "iPhone 14", quantity: 1, status: "Delivered" },
    { id: 2, product: "Samsung Galaxy S21", quantity: 2, status: "Processing" },
    { id: 3, product: "Google Pixel 7", quantity: 1, status: "Shipped" },
    { id: 4, product: "OnePlus 9", quantity: 1, status: "Delivered" },
    { id: 5, product: "Xiaomi Mi 11", quantity: 2, status: "Cancelled" },
    { id: 6, product: "Sony Xperia 5", quantity: 1, status: "Shipped" },
    { id: 7, product: "Nokia 8.3", quantity: 1, status: "Processing" },
    { id: 8, product: "Oppo Reno 5", quantity: 1, status: "Delivered" },
    { id: 9, product: "Realme 8", quantity: 1, status: "Returned" },
    { id: 10, product: "Asus Zenfone 8", quantity: 1, status: "Shipped" },
  ];
return (
    <div className="customer-profile">
        {/* Left side - Customer details */}
        <div className="customer-details">
            <h2>Customer Details</h2>
            <p><strong>Full Name:</strong> {customerData.fullName}</p>
            <p><strong>Username:</strong> {customerData.username}</p>
            <p><strong>Email:</strong> {customerData.email}</p>
            <p><strong>Phone Number:</strong> {customerData.phone}</p>
            <p><strong>Address:</strong> {customerData.address}</p>
        </div>

        {/* Right side - Customer orders */}
        <div className="customer-orders" style={{ maxHeight: '400px', overflowY: 'auto' }}>
            <h2>Your Orders</h2>
            <ul>
                {orders.map(order => (
                    <li key={order.id} className="order-item">
                        <p><strong>Product:</strong> {order.product}</p>
                        <p><strong>Quantity:</strong> {order.quantity}</p>
                        <p><strong>Status:</strong> {order.status}</p>
                    </li>
                ))}
            </ul>
        </div>
    </div>
);
};

export default UserDetails;
