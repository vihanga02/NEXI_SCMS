import Manager from '../Models/Manager.js';
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
// Controller to get incomplete train orders
async function getIncompletedTrainOrders(req, res){
    try {
        const result = await Manager.getIncompletedTrainOrders(req);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: "Error fetching incomplete train orders", error: error.message });
    }
};
//controller to get quaterly sales
async function getQuarterlySales(req, res){
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

async function getProfile(req, res) {
    try {
      req = req.user.username;
      const profile = await Manager.getManager(req);
      res.status(200).json(profile);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "server error" });
    }
  }



async function manager_login (req, res) {
    const { Username, Password } = req.body;


    // Find the manager by email
    const [manager] = await Manager.getManager(Username);
   


    if (!manager) {

        return res.status(401).json({ message: 'Invalid credentials', success: false });
    }

     // Check if the password is correct
     const match = await bcrypt.compare(Password, manager.Password);
     if (!match) {
       return res
         .status(401)
         .json({ message: "Invalid credentials", success: false });
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

async function manager_logout(req, res) {
    // Clear the token cookie

    res.cookie("token", " ", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      expires: new Date(0), // Set to expire immediately
    });
    

    
    return res.status(200).json({ message: "Logout successful", success: true });
  }   

async function getAdminDetails(req, res){
    const adminID = req.user.id;
 
    try {
        const result = await Manager.getAdminDetails(adminID);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: "Error fetching orders", error: error.message });
    }
};


async function manager_signup(req, res) {
   
    const { Name, Username, City, Password, Email, Address, Phone_Number } = req.body;
  
    // Check if email or username already exists
    const [existingEmail] = await Manager.getEmail(Email);

    
    const [existingUsername] = await Manager.getManagerByUsername(Username);


    const [existingManager] = await Manager.getManagerByStore(City);

   
  
    if (existingEmail) {
      return res.status(400).json({ message: "Email already exists" });
    }

    if (existingUsername) {
       
      return res.status(400).json({ message: "Username already exists" });
    }



    if (existingManager) {
       
        return res.status(400).json({ message: "Store Manager already exists" });
      }
     
  
    // Hash the password
    const hashedPassword = await bcrypt.hash(Password, 10);
   
  
    // Insert new user into the database
    Manager.createManager(req, hashedPassword);
  
    res.status(201).json({ message: "User registered successfully" });
}




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
    manager_signup,
    getQuarterlySales,
    getAdminDetails,
    manager_logout,
    getProfile
}