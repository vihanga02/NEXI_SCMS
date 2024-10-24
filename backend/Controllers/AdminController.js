import Manager from '../Models/Manager.js';
import jwt from "jsonwebtoken";
// Controller to get incomplete train orders
async function getIncompletedTrainOrders(req, res){
    try {
        const result = await Manager.getIncompletedTrainOrders(req);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: "Error fetching incomplete train orders", error: error.message });
    }
};
//controller to get hours of drivers
async function getDriverWorkedHours(req, res){
    try {
        const result = await Manager.getDriverWorkedHours(req);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: "Error fetching driver worked hours", error: error.message });
    }
};

//controller to get most orders
async function getMostOrders(req, res){
    try {
        const result = await Manager.getMostOrders(req);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: "Error fetching most orders", error: error.message });
    }
};

//controller to get quaterly sales
async function getQuarterlySales(req, res){
    console.log("In controller");
    try {
        console.log("In controller");
        //const startDate = req.query.startDate; // Ensure you are extracting the date from the request query
        const result = await Manager.getQuarterlySales(req);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: "Error fetching quarterly sales", error: error.message });
    }
}


// Controller to get incomplete truck orders
async function getIncompletedTruckOrders(req, res){
    try {
        const result = await Manager.getIncompletedTruckOrders(req);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: "Error fetching incomplete truck orders", error: error.message });
    }
};

// Controller to get all orders
async function getOrders(req, res){
    try {
        const result = await Manager.getOrders(req);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: "Error fetching orders", error: error.message });
    }
};

// Controller to get the delivery schedule
async function getDeliverySchedule(req, res){
    const date = req.params.date;
    try {
        const result = await Manager.getDeliverySchedule(date);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: "Error fetching delivery schedule", error: error.message });
    }
};

// Controller to add a new delivery schedule
async function addDeliverySchedule(req, res){
    try {
        const result = await Manager.addDeliverySchedule(req);
        res.status(201).json({ message: "Delivery schedule added successfully", data: result });
    } catch (error) {
        res.status(500).json({ message: "Error adding delivery schedule", error: error.message });
    }
};

// Controller to change order status to "In Truck"
async function changeOrderStatusToIn_Truck(req, res){
    try {
        const result = await Manager.changeOrderStatusToIn_Truck(req);
        res.status(200).json({ message: "Order status changed to 'In Truck'", data: result });
    } catch (error) {
        res.status(500).json({ message: "Error updating order status", error: error.message });
    }
};

// Controller to get trains for a specific store
async function getTrains(req, res){
    try {
        const result = await Manager.getTrains(req);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: "Error fetching trains", error: error.message });
    }
};

// Controller to get drivers for a specific city
async function getDrivers(req, res){
    const { city } = req.params;
    try {
        const result = await Manager.getDrivers(city);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: `Error fetching drivers for city: ${city}`, error: error.message });
    }
};

// Controller to get assistant drivers for a specific city
async function getAssistants(req, res){
    const { city } = req.params;
    try {
        const result = await Manager.getAssistants(city);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: `Error fetching assistants for city: ${city}`, error: error.message });
    }
};

// Controller to get vehicles for a specific city
async function getVehicles(req, res){
    const { city } = req.params;
    try {
        const result = await Manager.getVehicles(city);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: `Error fetching vehicles for city: ${city}`, error: error.message });
    }
};

async function manager_login (req, res) {
    const { Username, Password } = req.body;


    // Find the manager by email
    const [manager] = await Manager.getManager(Username);
    console.log(manager);

    if (!manager) {

        return res.status(401).json({ message: 'Invalid credentials', success: false });
    }

    // Check if the password is correct
    // const match = await bcrypt.compare(Password, manager.Password);
    const match = Password === manager.Password;
    if (!match) {
        return res.status(401).json({ message: 'Invalid credentials', success: false });
    }

    // Create a token
    const token = jwt.sign({ id: manager.Manager_ID, username: manager.Name }, process.env.SECRET_KEY, { expiresIn: '1h' });

    

    res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      });

     return res.status(200).json({ success: true, });

}

async function getAdminDetails(req, res){
    const adminID = req.user.id;
    console.log(`Fetching admin details for Admin ID: ${adminID}`);
    try {
        const result = await Manager.getAdminDetails(adminID);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: "Error fetching orders", error: error.message });
    }
};





export{
    getIncompletedTrainOrders,
    getIncompletedTruckOrders,
    getOrders,
    getDeliverySchedule,
    addDeliverySchedule,
    changeOrderStatusToIn_Truck,
    getTrains,
    getDrivers,
    getAssistants,
    getVehicles,
    manager_login,
    getQuarterlySales,
    getAdminDetails,
    getMostOrders,
    getDriverWorkedHours
}