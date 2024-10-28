import React, { useState, useEffect } from 'react';
import './UserDetails.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserDetails = () => {
    const navigate = useNavigate();
    const [customerData, setCustomerData] = useState({});
    const [lastOrderDetails, setLastOrderDetails] = useState({});
    const [orderDetails, setOrderDetails] = useState([]);
    const [orders, setOrders] = useState([]);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [name, setName] = useState('');
    const [loginStatus, setLoginStatus] = useState(true);

    const [isEditingPhone, setIsEditingPhone] = useState(false);
    const [isEditingName, setIsEditingName] = useState(false);

    useEffect(() => {
        // Fetch customer profile
        axios.get("/customer/profile", { withCredentials: true })
            .then((response) => {
                setCustomerData(response.data[0]);
            })
            .catch((error) => {
                if (error.response && error.response.status === 401) {
                    setLoginStatus(false); // Only update login status if authentication fails
                }
                console.error("Error fetching customer profile:", error);
            });

        // Fetch last order
        axios.get('/customer/lastOrder', { withCredentials: true })
            .then((response) => {
                if (response.data.data.length > 0) {
                    const lastOrder = response.data.data[0];
                    lastOrder.Ordered_Date = new Date(lastOrder.Ordered_Date).toLocaleDateString();
                    setLastOrderDetails(lastOrder);
                } else {
                    setLastOrderDetails(null); // No last order available
                }
            })
            .catch((error) => {
                console.error('Error fetching last order:', error);
            });

        // Fetch current orders
        axios.get('/customer/currentOrder', { withCredentials: true })
            .then((response) => {
                const orderData = response.data.data;
                const orderItems = response.data.order_item;

                if (orderData.length > 0) {
                    const formattedOrders = orderData.map(order => {
                        order.Ordered_Date = new Date(order.Ordered_Date).toLocaleDateString();
                        order.Expected_Date = new Date(order.Expected_Date).toLocaleDateString();
                        return order;
                    });
                    setOrderDetails(formattedOrders);
                    setOrders(orderItems);
                } else {
                    setOrderDetails([]); // No current orders
                    setOrders([]);
                }
            })
            .catch((error) => {
                console.error('Error fetching current orders:', error);
            });
    }, []);

    const updateCustomerDataPhoneNumber = () => {
        if (loginStatus) {
            setIsEditingPhone(true);
        } else {
            navigate('/login');
        }
    };

    const updateCustomerDataName = () => {
        if (loginStatus) {
            setIsEditingName(true);
        } else {
            navigate('/login');
        }
    };

    const handleSavePhoneNumber = () => {
        if (!/^\d{10}$/.test(phoneNumber)) {
            setPhoneNumber('');
            alert('Phone number must be exactly 10 digits.');
            return;
        }

        axios.post('/customer/updateCustomer', { phoneNumber }, { withCredentials: true })
            .then(response => {
                setCustomerData({ ...customerData, Phone_Number: phoneNumber });
                setIsEditingPhone(false);
            })
            .catch(error => {
                if (error.response && error.response.status === 401) {
                    setLoginStatus(false);
                }
                console.error('Error updating phone number:', error);
            });
    };

    const handleSaveName = () => {
        axios.post('/customer/updateCustomer', { Name: name }, { withCredentials: true })
            .then(response => {
                setCustomerData({ ...customerData, Name: name });
                setIsEditingName(false);
            })
            .catch(error => {
                if (error.response && error.response.status === 401) {
                    setLoginStatus(false);
                }
                console.error('Error updating name:', error);
            });
    };

    const handleLogout = () => {
        axios.post('/customer/logout', {}, { withCredentials: true })
            .then(() => navigate('/'))
            .catch((error) => console.error('Logout failed:', error));
    };

    useEffect(() => {
        if (!loginStatus) {
            navigate('/login');
        }
    }, [loginStatus]);

    return loginStatus ? (
        <div className="customer-profile">
            <div>
                <div className="customer-details">
                    <h2>Customer Details</h2>
                    <div>
                        <p className='detail-topic'><strong>Full Name</strong></p>
                        {isEditingName ? (
                            <>
                                <input 
                                    type="text" 
                                    value={name} 
                                    onChange={(e) => setName(e.target.value)} 
                                />
                                <button className='save-btn' onClick={handleSaveName}>Save</button>
                                <button className='cancel-btn' onClick={() => setIsEditingName(false)}>Cancel</button>
                            </>
                        ) : (
                            <>
                                <p className='detail-value'>{customerData.Name}</p>
                                <button className="edit-button" onClick={updateCustomerDataName}>Edit</button>
                            </>
                        )}
                    </div>
                    <div>
                        <p className='detail-topic'><strong>Username</strong></p>
                        <p className='detail-value'>{customerData.Username}</p>
                    </div>
                    <div>
                        <p className='detail-topic'><strong>Email</strong></p>
                        <p className='detail-value'>{customerData.Email}</p>
                    </div>
                    <div>
                        <p className='detail-topic'><strong>Phone Number</strong></p>
                        {isEditingPhone ? (
                            <>
                                <input 
                                    type="text" 
                                    value={phoneNumber} 
                                    onChange={(e) => setPhoneNumber(e.target.value)} 
                                />
                                <button className='save-btn' onClick={handleSavePhoneNumber}>Save</button>
                                <button className='cancel-btn' onClick={() => setIsEditingPhone(false)}>Cancel</button>
                            </>
                        ) : (
                            <>
                                <p className='detail-value'>{customerData.Phone_Number}</p>
                                <button className="edit-button" onClick={updateCustomerDataPhoneNumber}>Edit</button>
                            </>
                        )}
                    </div>
                    <button className="logout-button" onClick={handleLogout}>Logout</button>
                </div>
                <div className="previous-orders">
                    <h2>Last Order</h2>
                    {lastOrderDetails ? (
                        <>
                            <div>
                                <p className='order-d'><strong>Order ID</strong></p><p>{lastOrderDetails.Order_ID}</p>
                            </div>
                            <div>
                                <p className='order-d'><strong>Ordered Date</strong></p><p>{lastOrderDetails.Ordered_Date}</p>
                            </div>
                            <div>
                                <p className='order-d'><strong>Total Price</strong></p><p>LKR {lastOrderDetails.Total_Price}</p>                    
                            </div>
                        </>
                    ) : (
                        <p>No last order available.</p>
                    )}
                </div>
            </div>

            <div className="customer-orders">
                <h2>Your Current Orders</h2>
                <div className='customer-order-in'>
                    {orderDetails.length > 0 ? (
                        <>
                            {orderDetails.map((order, index) => (
                                <div key={index} className='order-details'>
                                    <div className='order-details-inside'>
                                        <p className='order-d'><strong>Order ID</strong></p><p>{order.Order_ID}</p>
                                    </div>
                                    <div className='order-details-inside'>
                                        <p className='order-d'><strong>Ordered Date</strong></p><p>{order.Ordered_Date}</p>
                                    </div>
                                    <div className='order-details-inside'>
                                        <p className='order-d'><strong>Expected Date</strong></p><p>{order.Expected_Date}</p>
                                    </div>
                                    <div className='order-details-inside'>
                                        <p className='order-d'><strong>Total Price</strong></p><p>{order.Total_Price}</p>
                                    </div>
                                    <div className='order-item-div'>
                                        <ul>
                                            {orders[order.Order_ID] && orders[order.Order_ID].map((filteredOrder, index) => (
                                                <li key={`${filteredOrder.Order_ID}-${index}`} className="order-item">
                                                    <img src={filteredOrder.Image_Link} alt={filteredOrder.Product_Name} />
                                                    <div>
                                                        <div>
                                                           <p className='detail-value'>{filteredOrder.Product_Name}</p>
                                                        </div>
                                                        <div>
                                                            <p className='order-topic'><strong>Quantity</strong></p><p className='detail-value'>{filteredOrder.Quantity}</p>
                                                        </div>
                                                        <div>
                                                            <p className='detail-value detail-value-price'>LKR {filteredOrder.Order_item_Price}</p>
                                                        </div>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            ))}
                        </>
                    ) : (
                        <p>No current orders.</p>
                    )}
                </div>
            </div>
        </div>
    ) : <div>Redirecting to login...</div>;
};

export default UserDetails;
