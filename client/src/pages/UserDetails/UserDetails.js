import React,{useState, useEffect} from 'react';
import './UserDetails.css';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

const UserDetails = () => {
    const navigate = useNavigate();
    const [customerData, setCustomerData] = useState({});
    const [last_order_details, setLastOrderDetails] = useState({});
    const [order_details, setOrderDetails] = useState([]); 
    const [orders, setOrders] = useState([]);
    const [Phone_Number, setPhoneNumber] = useState('');
    const [Name, setName] = useState('');
    const [login_status, setLoginStatus] = useState(true);

    const [isEditingPhone, setIsEditingPhone] = useState(false);
    const [isEditingName, setIsEditingName] = useState(false);

    useEffect(() => {
        axios.get("/customer/profile",{withCredentials:true})
        .then((response) => {
            setCustomerData(response.data[0]);
        })
        .catch((error) => {
            setLoginStatus(false);
            console.error("Error fetching customer profile:", error);
        });

        axios.get('customer/lastOrder', { withCredentials: true })
        .then((response) => {
            response.data.data[0].Ordered_Date = new Date(response.data.data[0].Ordered_Date).toLocaleDateString();
            setLastOrderDetails(response.data.data[0]);
        })
        .catch((error) => {
            setLoginStatus(false);
            console.error('Error fetching last order:', error);
        });

        axios.get('customer/currentOrder', { withCredentials: true })
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
            setOrderDetails([]);
            setOrders([]);
            }
        })
        .catch((error) => {
            setLoginStatus(false);
            console.error('Error fetching current order:', error);
        });
    }, []);

    const updateCustomerDataPhoneNumber = () => {
        if (login_status) {
            setIsEditingPhone(true); // Set edit mode for phone number
        } else {
            navigate('/');
        }
    };

    const updateCustomerDataName = () => {
        if (login_status) {
            setIsEditingName(true); // Set edit mode for name
        } else {
            navigate('/');
        }
    };

    const handleSavePhoneNumber = () => {
        if (!/^\d{10}$/.test(Phone_Number)) {
            setPhoneNumber('');
            alert('Phone number must be exactly 10 digits.');
            return;
        }

        axios.post('customer/updateCustomer', 
            { Phone_Number }, 
            { withCredentials: true }
        )
        .then(response => {
            setCustomerData({ ...customerData, Phone_Number });
            setIsEditingPhone(false);
            console.log('Phone number updated successfully.');
        })
        .catch(error => {
            setLoginStatus(false);
            console.error('Error updating phone number:', error);
        });
    };

    const handleSaveName = () => {
        axios.post('customer/updateCustomer', 
            { Name }, 
            { withCredentials: true }
        )
        .then(response => {
            setCustomerData({ ...customerData, Name });
            setIsEditingName(false); // Exit edit mode
            console.log('Name updated successfully.');
        })
        .catch(error => {
            setLoginStatus(false);
            console.error('Error updating name:', error);
        });
    };

    const handleLogout = () => {
        axios.post('/customer/logout', {}, { withCredentials: true })
        .then((response) => {
            console.log(response.data.message);
            navigate('/');  
        })
        .catch((error) => {
            console.error('Logout failed:', error);
        });
    };

    useEffect(() => {
        if (!login_status) {
            navigate('/login');
        }
    }, [login_status]);

    return login_status ? (
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
                                    value={Name} 
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
                                    value={Phone_Number} 
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
                    <div>
                        <p className='order-d'><strong>Order ID</strong></p><p>{last_order_details.Order_ID}</p>
                    </div>
                    <div>
                        <p className='order-d'><strong>Ordered Date</strong></p><p>{(last_order_details.Ordered_Date)}</p>
                    </div>
                    <div>
                        <p className='order-d'><strong>Total Price</strong></p><p>LKR {last_order_details.Total_Price}</p>                    
                    </div>
                </div>
            </div>

            {/* Right side - Customer orders */}
            <div className="customer-orders">
                <h2>Your Current Orders</h2>
                <div className='customer-order-in'>
                    {order_details.length > 0 ? (
                <>
                    {order_details.map((order, index) => (
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
                                                    <p className='detail-value detail-value-price' >LKR {filteredOrder.Order_item_Price}</p>
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
    ) : <div>Not logged in.</div>;
};

export default UserDetails;
