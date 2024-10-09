import Manager from '../Models/Manager';

// Controller to get incomplete train orders
export const getIncompletedTrainOrders = async (req, res) => {
    try {
        const result = await Manager.getIncompletedTrainOrders(req);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: "Error fetching incomplete train orders", error: error.message });
    }
};

// Controller to get incomplete truck orders
export const getIncompletedTruckOrders = async (req, res) => {
    try {
        const result = await Manager.getIncompletedTruckOrders(req);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: "Error fetching incomplete truck orders", error: error.message });
    }
};

// Controller to get all orders
export const getOrders = async (req, res) => {
    try {
        const result = await Manager.getOrders(req);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: "Error fetching orders", error: error.message });
    }
};

// Controller to get the delivery schedule
export const getDeliverySchedule = async (req, res) => {
    try {
        const result = await Manager.getDeleverySchedule(req);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: "Error fetching delivery schedule", error: error.message });
    }
};

// Controller to add a new delivery schedule
export const addDeliverySchedule = async (req, res) => {
    try {
        const result = await Manager.addDeleverySchedule(req);
        res.status(201).json({ message: "Delivery schedule added successfully", data: result });
    } catch (error) {
        res.status(500).json({ message: "Error adding delivery schedule", error: error.message });
    }
};

// Controller to change order status to "In Truck"
export const changeOrderStatusToIn_Truck = async (req, res) => {
    try {
        const result = await Manager.changeOrderStatusToIn_Truck(req);
        res.status(200).json({ message: "Order status changed to 'In Truck'", data: result });
    } catch (error) {
        res.status(500).json({ message: "Error updating order status", error: error.message });
    }
};

// Controller to get trains for a specific store
export const getTrains = async (req, res) => {
    try {
        const result = await Manager.getTrains(req);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: "Error fetching trains", error: error.message });
    }
};

// Controller to get drivers for a specific city
export const getDrivers = async (req, res) => {
    const { city } = req.params;
    try {
        const result = await Manager.getDrivers(city);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: `Error fetching drivers for city: ${city}`, error: error.message });
    }
};

// Controller to get assistant drivers for a specific city
export const getAssistants = async (req, res) => {
    const { city } = req.params;
    try {
        const result = await Manager.getAssistants(city);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: `Error fetching assistants for city: ${city}`, error: error.message });
    }
};

// Controller to get vehicles for a specific city
export const getVehicles = async (req, res) => {
    const { city } = req.params;
    try {
        const result = await Manager.getVehicles(city);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: `Error fetching vehicles for city: ${city}`, error: error.message });
    }
};
