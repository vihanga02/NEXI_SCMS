import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import Topbar from '../../components/Topbar/Topbar';
import axios from 'axios';
import './MostOrders.css';  // Assuming you'll add some page-specific styles

function MostOrders() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch data from backend when the component mounts
    useEffect(() => {
        const fetchProductOrders = async () => {
            try {
                const response = await axios.get('/admin/productOrders'); // Your backend API endpoint
                setProducts(response.data); // Assuming API returns data in correct format
                setLoading(false);
            } catch (error) {
                console.error('Error fetching product orders:', error);
                setError('Error fetching data. Please try again later.');
                setLoading(false);
            }
        };

        fetchProductOrders();
    }, []);

    return (
        <div className="most-orders-container">
            {/* Sidebar */}
            <Sidebar />

            {/* Main content */}
            <div className="content">
                <Topbar />

                <div className="table-container">
                    <h2>Products with Most Orders</h2>

                    {loading ? (
                        <p>Loading data...</p>
                    ) : error ? (
                        <p>{error}</p>
                    ) : (
                        <table className="modern-table">
                            <thead>
                                <tr>
                                    <th>Product ID</th>
                                    <th>Product Name</th>
                                    <th>Total Sales</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map(product => (
                                    <tr key={product.Product_ID}>
                                        <td>{product.Product_ID}</td>
                                        <td>{product.Product_Name}</td>
                                        <td>{product.Total_sales}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    );
}

export default MostOrders;