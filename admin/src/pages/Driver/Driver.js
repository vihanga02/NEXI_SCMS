import Sidebar from "../../components/Sidebar/Sidebar.js";
import Topbar from "../../components/Topbar/Topbar.js";
import "./Driver.css";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";

function Driver() {
  const navigate = useNavigate();

  // State to store driver data
  const [drivers, setDrivers] = useState([]);

  useEffect(() => {
    axios
      .get("/admin/driversofstore", { withCredentials: true })
      .then((response) => {
        // Set the fetched data to the drivers state
        console.log(response.data);
        setDrivers(response.data);
        
      })
      .catch((error) => {
        console.error("Error fetching driver data:", error);
        navigate("/");
      });
  }, []);

  return (
    <div className="driver-container">
      <h1 className="driver-title">Drivers of store</h1>
      <div className="driver-content">
        <table className="driver-table">
          <thead className="driver-table-head">
            <tr className="driver-table-row">
              <th className="driver-table-header">Driver ID</th>
              <th className="driver-table-header">Driver Name</th>
              <th className="driver-table-header">Total Work Hours</th>
              <th className="driver-table-header">Driver Status</th>
            </tr>
          </thead>
          <tbody className="driver-table-body">
            {drivers.map((driver) => (
              <tr key={driver.Driver_ID} className="driver-table-row">
                <td className="driver-table-data">{driver.Driver_ID}</td>
                <td className="driver-table-data">{driver.Driver_Name}</td>
                <td className="driver-table-data">{driver.Work_Hours}</td>
                <td className="driver-table-data">{driver.Availability}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Driver;
