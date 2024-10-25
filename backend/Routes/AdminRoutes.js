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
    getQuarterlySales,
    getAdminDetails,
    getMostOrders,
    getDriverWorkedHours,
    setDeliveryStatus,
    getAdminStoreCity
} from "../Controllers/AdminController.js";

// User authentication routes
router.post("/login", manager_login);



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
router.get("/mostOrders",authenticateToken,getMostOrders);
router.get("/hoursofdrivers",authenticateToken,getDriverWorkedHours);

export default router;