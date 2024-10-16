import React,{useState, useEffect} from 'react';
import './UserDetails.css';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

const UserDetails = () => {
    const navigate = useNavigate();
    const [customerData, setCustomerData] = useState({});
    const [login_status, setLoginStatus] = useState(true);

    useEffect(() => {
        // Fetch the customer profile data from the server
        axios.get("/customer/profile",{withCredentials:true})
        .then((response) => {
            setCustomerData(response.data[0]);
        })
        .catch((error) => {
            setLoginStatus(false);
            console.error("Error fetching customer profile:", error);
        });
    }, []);
  
    const handleLogout = () => {
        axios.post('/customer/logout', {}, { withCredentials: true })
          .then((response) => {
            console.log(response.data.message);
            navigate('/login');  // Redirect to login page after logout
          })
          .catch((error) => {
            console.error('Logout failed:', error);
          });
      };

  // Dummy data for the customer's orders
const orders = [
    { id: 1, Product_Name: "iPhone 14", Quantity: 1, Total_Price: "$999", Image_Link:"/assets/iphone-14.jpg" },
    { id: 2, Product_Name: "Samsung Galaxy S21", Quantity: 2, Total_Price: "$799", Image_Link:"/assets/iphone-14.jpg" },
    { id: 3, Product_Name: "Google Pixel 7", Quantity: 1, Total_Price: "$699", Image_Link:"/assets/iphone-14.jpg" },
    { id: 4, Product_Name: "OnePlus 9", Quantity: 1, Total_Price: "$729", Image_Link:"/assets/iphone-14.jpg" },
    { id: 5, Product_Name: "Xiaomi Mi 11", Quantity: 2, Total_Price: "$599", Image_Link:"/assets/iphone-14.jpg" },
    { id: 6, Product_Name: "Sony Xperia 5", Quantity: 1, Total_Price: "$949", Image_Link:"/assets/iphone-14.jpg" },
    { id: 7, Product_Name: "Nokia 8.3", Quantity: 1, Total_Price: "$479", Image_Link:"/assets/iphone-14.jpg" },
    { id: 8, Product_Name: "Oppo Reno 5", Quantity: 1, Total_Price: "$499", Image_Link:"/assets/iphone-14.jpg" },
    { id: 9, Product_Name: "Realme 8", Quantity: 1, Total_Price: "$299", Image_Link:"/assets/iphone-14.jpg" },
    { id: 10, Product_Name: "Asus Zenfone 8", Quantity: 1, Total_Price: "$599", Image_Link:"/assets/iphone-14.jpg" },
];
useEffect(() => {
    if (!login_status) {
        navigate('/');
    }
}, [login_status]);

return login_status ? (
    <div className="customer-profile">
        <div>
            <div className="customer-details">
                <h2>Customer Details</h2>
                <div>
                    <p className='detail-topic'><strong>Full Name</strong></p>
                    <p className='detail-value'>{customerData.Name}</p>
                    <button className="edit-button">Edit</button>
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
                    <p className='detail-topic'><strong>Phone Number</strong>
                    </p><p className='detail-value'>{customerData.Phone_Number}</p>
                    <button className="edit-button">Edit</button>
                </div>
                <button className="logout-button" onClick={handleLogout}>Logout</button>
            </div>
            <div className="previous-orders">
                <h2>Last Order</h2>
                <div>
                    <p className='order-d'><strong>Order ID</strong></p><p>5</p>
                </div>
                <div>
                    <p className='order-d'><strong>Ordered Date</strong></p><p>2222-22-22</p>
                </div>
                <div>
                    <p className='order-d'><strong>Total Price</strong></p><p>$2000</p>                    
                </div>
            </div>
        </div>

        {/* Right side - Customer orders */}
        <div className="customer-orders">
            <h2>Your Current Order</h2>
            <div className='order-details'>
                <div>
                    <p className='order-d'><strong>Order ID</strong></p><p>5</p>
                </div>
                <div>
                    <p className='order-d'><strong>Ordered Date</strong></p><p>2222-22-22</p>
                </div>
                <div>
                    <p className='order-d'><strong>Expected Date</strong></p><p>2222-22-22</p>
                </div>
                <div>
                    <p className='order-d'><strong>Total Price</strong></p><p>$1231</p>
                </div>
            </div>
            <div className='order-item-div'>
                <ul>
                {orders.map(order => (
                    <li key={order.id} className="order-item">
                        <img src={order.Image_Link} alt={order.Product_Name} />
                        <div>
                            <div>
                                <p className='order-topic'><strong>Product</strong></p><p className='detail-value'>{order.Product_Name}</p>
                            </div>
                            <div>
                                <p className='order-topic'><strong>Quantity</strong></p><p className='detail-value'>{order.Quantity}</p>
                            </div>
                            <div>
                                <p className='order-topic'><strong>Price</strong></p><p className='detail-value'>{order.Total_Price}</p>
                            </div>
                        </div>
                    </li>
                ))}
                </ul>
            </div>
            
        </div>
    </div>
) : <div>sa</div>;
};

export default UserDetails;
