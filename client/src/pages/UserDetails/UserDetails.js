import React from 'react';
import './UserDetails.css';


const UserDetails = () => {
  // Dummy data for the customer profile
  const customerData = {
    fullName: "John Doe",
    username: "johndoe",
    email: "john.doe@example.com",
    phone: "+1 234 567 890",
    address: "123 Main Street, Springfield, USA",
    
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
return (
    <div className="customer-profile">
        <div>
            <div className="customer-details">
                <h2>Customer Details</h2>
                <div>
                    <p className='detail-topic'><strong>Full Name</strong></p>
                    <p className='detail-value'>{customerData.fullName}</p>
                    <button className="edit-button">Edit</button>
                </div>
                <div>
                    <p className='detail-topic'><strong>Username</strong></p>
                    <p className='detail-value'>{customerData.username}</p>
                </div>
                <div>
                    <p className='detail-topic'><strong>Email</strong></p>
                    <p className='detail-value'>{customerData.email}</p>
                </div>
                <div>
                    <p className='detail-topic'><strong>Phone Number</strong>
                    </p><p className='detail-value'>{customerData.phone}</p>
                    <button className="edit-button">Edit</button>
                </div>
                <button className="logout-button">Logout</button>
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
);
};

export default UserDetails;
