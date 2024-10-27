import express from "express";
const router = express.Router();
import authenticateToken from "../Middleware/Authentication.js";

import {
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
    manager_logout,
    getQuarterlySales,
    getAdminDetails,
    getProfile
} from "../Controllers/AdminController.js";

// User authentication routes
router.post("/login", manager_login);
router.post("/signup",manager_signup);
router.post("/logout", manager_logout)



// Order-related routes
router.get("/incompletedTrainOrders", authenticateToken, getIncompletedTrainOrders);
router.get("/incompletedTruckOrders", authenticateToken, getIncompletedTruckOrders);
router.get("/orders", authenticateToken, getOrders);
router.get("/deliverySchedule/:date", getDeliverySchedule);
router.post("/addDeliverySchedule", authenticateToken, addDeliverySchedule);
router.post("/changeOrderStatusToIn_Truck", authenticateToken, changeOrderStatusToIn_Truck);
router.get("/trains", authenticateToken, getTrains);
router.get("/drivers", authenticateToken, getDrivers);
router.get("/assistants", authenticateToken, getAssistants);
router.get("/vehicles", authenticateToken, getVehicles);
router.get("/quarterlySales",authenticateToken,getQuarterlySales);
router.get("/admindetails",authenticateToken,getAdminDetails);
router.get('/profile', authenticateToken, getProfile);


export default router;