import React, { useState, useEffect } from "react";
import axios from "axios";

const StoreRouteSelector = ({ onStoreRouteChange }) => {
  const [stores, setStores] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [filteredRoutes, setFilteredRoutes] = useState([]);
  const [selectedStore, setSelectedStore] = useState("");
  const [selectedRoute, setSelectedRoute] = useState("");

  useEffect(() => {
    const fetchStoresAndRoutes = async () => {
      try {
        const storeResponse = await axios.get("/customer/stores");
        const routeResponse = await axios.get("/customer/routes");

        setStores(storeResponse.data);
        setRoutes(routeResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchStoresAndRoutes();
  }, []);

  useEffect(() => {
    // Filter routes based on selected store
    if (selectedStore) {
      const filtered = routes.filter(
        (route) => route.Store_ID === Number(selectedStore)
      );
      setFilteredRoutes(filtered);
      setSelectedRoute(""); // Reset selected route when store changes
    } else {
      setFilteredRoutes([]); // Reset routes if no store selected
    }
  }, [selectedStore, routes]);

  const handleStoreChange = (e) => {
    const storeId = e.target.value;
    setSelectedStore(storeId);
    setSelectedRoute(""); // Reset route when store changes
    onStoreRouteChange(storeId, ""); // Notify parent of store change
  };

  const handleRouteChange = (e) => {
    const routeId = e.target.value;
    setSelectedRoute(routeId); // Update selected route
    onStoreRouteChange(selectedStore, routeId); // Notify parent of selected route
  };

  return (
    <div>
      <div>
        <label htmlFor="store">Select Store:</label>
        <select id="store" value={selectedStore} onChange={handleStoreChange}>
          <option value="">--Choose Store--</option>
          {stores.map((store) => (
            <option key={store.Store_ID} value={store.Store_ID}>
              {store.City}
            </option>
          ))}
        </select>
      </div>

      <div style={{ marginTop: "20px" }}>
        <label htmlFor="route">Select Route:</label>
        <select
          id="route"
          value={selectedRoute}
          onChange={handleRouteChange}
          disabled={!selectedStore} // Disable route dropdown if no store is selected
        >
          <option value="">--Choose Route--</option>
          {filteredRoutes.length > 0 ? (
            filteredRoutes.map((route) => (
              <option key={route.Route_ID} value={route.Route_ID}>
                {route.Route}
              </option>
            ))
          ) : (
            <option value="" disabled>
              No routes available
            </option>
          )}
        </select>
      </div>
    </div>
  );
};

export default StoreRouteSelector;
