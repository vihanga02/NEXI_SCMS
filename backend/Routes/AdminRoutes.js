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
    manager_login
} from "../Controllers/AdminController.js";

// User authentication routes
router.get("/login", manager_login);


// Order-related routes
router.get("/incompletedTrainOrders", authenticateToken, getIncompletedTrainOrders);
router.get("/incompletedTruckOrders", authenticateToken, getIncompletedTruckOrders);
router.get("/orders", authenticateToken, getOrders);
router.get("/deliverySchedule", authenticateToken, getDeliverySchedule);
router.post("/addDeliverySchedule", authenticateToken, addDeliverySchedule);
router.post("/changeOrderStatusToIn_Truck", authenticateToken, changeOrderStatusToIn_Truck);
router.get("/trains", authenticateToken, getTrains);
router.get("/drivers", authenticateToken, getDrivers);
router.get("/assistants", authenticateToken, getAssistants);
router.get("/vehicles", authenticateToken, getVehicles);

export default router;