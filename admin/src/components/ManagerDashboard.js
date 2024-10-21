import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Styles/ManagerDashboard.css";
import BrandExample from "./Brandexample"; // Import your top navigation

const ManagerDashboard = () => {
  const [activeSection, setActiveSection] = useState("orders");

  const orders = [
    { id: 1, customer: "Customer A", product: "Item 1", status: "Shipped" },
    { id: 2, customer: "Customer B", product: "Item 2", status: "Pending" },
  ];

  const drivers = [
    { id: 1, name: "Driver A", hours: 35, status: "Available" },
    { id: 2, name: "Driver B", hours: 38, status: "Assigned" },
  ];

  const reports = {
    quarterlySales: [1000, 2000, 1500, 3000],
    popularItems: ["Item 1", "Item 2", "Item 3"],
    citySales: [
      { city: "Colombo", sales: 5000 },
      { city: "Kandy", sales: 3000 },
    ],
  };

  const renderSection = () => {
    switch (activeSection) {
      case "orders":
        return (
          <section className="orders-section">
            <h2>Recent Orders</h2>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Product</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td>{order.id}</td>
                    <td>{order.customer}</td>
                    <td>{order.product}</td>
                    <td>{order.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        );
      case "drivers":
        return (
          <section className="drivers-section">
            <h2>Driver Availability</h2>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Driver</th>
                  <th>Hours Worked</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {drivers.map((driver) => (
                  <tr key={driver.id}>
                    <td>{driver.name}</td>
                    <td>{driver.hours} hrs</td>
                    <td>{driver.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        );
      case "reports":
        return (
          <section className="reports-section">
            <h2>Reports</h2>
            <div className="report-item">
              <h3>Quarterly Sales</h3>
              <ul>
                {reports.quarterlySales.map((sales, index) => (
                  <li key={index}>
                    Q{index + 1}: ${sales}
                  </li>
                ))}
              </ul>
            </div>
            <div className="report-item">
              <h3>Popular Items</h3>
              <ul>
                {reports.popularItems.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="report-item">
              <h3>Sales by City</h3>
              <ul>
                {reports.citySales.map((cityData, index) => (
                  <li key={index}>
                    {cityData.city}: ${cityData.sales}
                  </li>
                ))}
              </ul>
            </div>
          </section>
        );
      default:
        return null;
    }
  };

  return (
    <div className="d-flex">
      {/* Top Navbar */}
      <BrandExample />

      {/* Sidebar */}
      <div className="d-flex">
        <nav id="sidebar" className="bg-light">
          <ul className="list-unstyled components">
            <li className={activeSection === "orders" ? "active" : ""}>
              <button
                className="btn btn-link"
                onClick={() => setActiveSection("orders")}
              >
                Orders
              </button>
            </li>
            <li className={activeSection === "drivers" ? "active" : ""}>
              <button
                className="btn btn-link"
                onClick={() => setActiveSection("drivers")}
              >
                Drivers
              </button>
            </li>
            <li className={activeSection === "reports" ? "active" : ""}>
              <button
                className="btn btn-link"
                onClick={() => setActiveSection("reports")}
              >
                Reports
              </button>
            </li>
          </ul>
        </nav>

        {/* Main Content */}
        <div id="content" className="p-4">
          {renderSection()}
        </div>
      </div>
    </div>
  );
};

export default ManagerDashboard;
