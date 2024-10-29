import React, { useState, useEffect } from "react";
import "./ManagerControl.css";
import axios from "axios";

const ManagerControl = () => {
  const [managers, setManagers] = useState([]);
  const [stores, setStores] = useState([]);
  const [selectedManager, setSelectedManager] = useState(null);
  const [selectedStore, setSelectedStore] = useState(null);
  const [newManagerName, setNewManagerName] = useState("");
  const [newManagerEmail, setNewManagerEmail] = useState("");

  // Fetch managers and stores data from the backend
  useEffect(() => {
    // Fetch managers
    axios
      .get("/manager", { withCredentials: true })
      .then((response) => setManagers(response.data))
      .catch((error) => console.error("Error fetching managers:", error));

    // Fetch stores
    axios
      .get("/api/stores", { withCredentials: true })
      .then((response) => setStores(response.data))
      .catch((error) => console.error("Error fetching stores:", error));
  }, []);

  // Remove a manager
  const removeManager = (id) => {
    axios
      .delete(`/api/managers/${id}`, { withCredentials: true })
      .then(() => {
        setManagers(managers.filter((manager) => manager.id !== id));
      })
      .catch((error) => console.error("Error removing manager:", error));
  };

  // Assign selected store to selected manager
  const assignStoreToManager = () => {
    if (selectedManager && selectedStore) {
      axios
        .post(
          `/api/managers/${selectedManager}/assignStore`,
          { storeId: selectedStore },
          { withCredentials: true }
        )
        .then(() => {
          setManagers(
            managers.map((manager) =>
              manager.id === selectedManager
                ? { ...manager, store: selectedStore }
                : manager
            )
          );
        })
        .catch((error) => console.error("Error assigning store:", error));
    }
  };

  // Add a new manager
  const addManager = () => {
    axios
      .post(
        "/api/managers",
        { name: newManagerName, email: newManagerEmail },
        { withCredentials: true }
      )
      .then((response) => {
        setManagers([...managers, response.data]);
        setNewManagerName("");
        setNewManagerEmail("");
      })
      .catch((error) => console.error("Error adding manager:", error));
  };

  return (
    <div className="manager-control">
      <h1 className="manager-control__title">Manager Control</h1>
      <h2 className="manager-control__subtitle">Managers</h2>
      <table className="manager-control__table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Store</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {managers.map((manager) => (
            <tr key={manager.id}>
              <td>{manager.id}</td>
              <td>{manager.name}</td>
              <td>{manager.email}</td>
              <td>
                {manager.store
                  ? stores.find((store) => store.id === manager.store)?.name
                  : "Not Assigned"}
              </td>
              <td>
                <button
                  className="manager-control__button"
                  onClick={() => removeManager(manager.id)}
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="add-manager-section">
        <h2 className="manager-control__subtitle">Add Manager</h2>
        <button className="add-button" onClick={addManager}>
          Add Manager
        </button>
      </div>

      <h2 className="manager-control__subtitle">Stores</h2>
      <table className="manager-control__table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Details</th>
            <th>Trucks</th>
            <th>Drivers</th>
            <th>Assistants</th>
          </tr>
        </thead>
        <tbody>
          {stores.map((store) => (
            <tr key={store.id}>
              <td>{store.id}</td>
              <td>{store.name}</td>
              <td>{store.details}</td>
              <td>{store.trucks}</td>
              <td>{store.drivers}</td>
              <td>{store.assistants}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="assignment-section">
        <h2 className="manager-control__subtitle">Assign Store to Manager</h2>
        <select
          onChange={(e) => setSelectedManager(e.target.value)}
          value={selectedManager || ""}
        >
          <option value="">Select Manager</option>
          {managers.map((manager) => (
            <option key={manager.id} value={manager.id}>
              {manager.name}
            </option>
          ))}
        </select>
        <select
          onChange={(e) => setSelectedStore(e.target.value)}
          value={selectedStore || ""}
        >
          <option value="">Select Store</option>
          {stores.map((store) => (
            <option key={store.id} value={store.id}>
              {store.name}
            </option>
          ))}
        </select>
        <button className="assign-button" onClick={assignStoreToManager}>
          Assign Store
        </button>
      </div>
    </div>
  );
};

export default ManagerControl;
