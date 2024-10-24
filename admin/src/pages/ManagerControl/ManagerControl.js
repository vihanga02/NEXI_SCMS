import React, { useState } from 'react';
import './ManagerControl.css';

const ManagerControl = () => {
    const [managers, setManagers] = useState([
        { id: 1, name: 'Manager 1', email: 'manager1@example.com', store: 'null' },
        { id: 2, name: 'Manager 2', email: 'manager2@example.com', store: 'null' },
        { id: 3, name: 'Manager 3', email: 'manager3@example.com', store: 'null' },
        { id: 4, name: 'Manager 4', email: 'manager4@example.com', store: 'null' },
        { id: 5, name: 'Manager 5', email: 'manager5@example.com', store: 'null' },
        { id: 6, name: 'Manager 6', email: 'manager6@example.com', store: 'null' },
    ]);

    const [stores, setStores] = useState([
        { id: 1, name: 'Store 1', details: 'Details of Store 1', trucks: 5, drivers: 10, assistants: 3 },
        { id: 2, name: 'Store 2', details: 'Details of Store 2', trucks: 3, drivers: 7, assistants: 2 },
        { id: 3, name: 'Store 3', details: 'Details of Store 3', trucks: 4, drivers: 8, assistants: 4 },
        { id: 4, name: 'Store 4', details: 'Details of Store 4', trucks: 6, drivers: 12, assistants: 5 },
        { id: 5, name: 'Store 5', details: 'Details of Store 5', trucks: 2, drivers: 5, assistants: 1 },
        { id: 6, name: 'Store 6', details: 'Details of Store 6', trucks: 7, drivers: 15, assistants: 6 },
    ]);

    const [selectedManager, setSelectedManager] = useState(null);
    const [selectedStore, setSelectedStore] = useState(null);

    const removeManager = (id) => {
        setManagers(managers.filter(manager => manager.id !== id));
    };

    const assignStoreToManager = () => {
        if (selectedManager && selectedStore) {
            setManagers(managers.map(manager => 
                manager.id === selectedManager ? { ...manager, store: selectedStore } : manager
            ));
        }
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
                    {managers.map(manager => (
                        <tr key={manager.id}>
                            <td>{manager.id}</td>
                            <td>{manager.name}</td>
                            <td>{manager.email}</td>
                            <td>{manager.store !== 'null' ? stores.find(store => store.id === manager.store)?.name : 'Not Assigned'}</td>
                            <td><button className="manager-control__button" onClick={() => removeManager(manager.id)}>Remove</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
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
                    {stores.map(store => (
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
        </div>
    );
};

export default ManagerControl;