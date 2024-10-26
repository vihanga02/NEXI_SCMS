import express from "express";
const router = express.Router();
import authenticateToken from "../Middleware/Authentication.js";

import {
    getIncompletedTrainOrders,
    getIncompletedTruckOrders,
    getOrders,
    getDeliverySchedule,
    addDeliverySchedule,
    getTruckDelivery,
    addTruckDelivery,
    changeOrderStatus,
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
    getAdminStoreCity,
    getAssistantWorkedHours,
    getTruckHours
} from "../Controllers/AdminController.js";


// User authentication routes
router.post("/login", manager_login);



// Order-related routes
router.get("/incompletedTrainOrders", authenticateToken, getIncompletedTrainOrders);
router.get("/incompletedTruckOrders", authenticateToken, getIncompletedTruckOrders);
router.get("/orders", authenticateToken, getOrders);
router.get("/deliverySchedule/:date", authenticateToken, getDeliverySchedule);
router.get("/truckDelivery", authenticateToken, getTruckDelivery);
router.post("/addDeliverySchedule", authenticateToken, addDeliverySchedule);
router.post("/assignTruck", authenticateToken, addTruckDelivery);
router.post("/setDeliveryStatus", authenticateToken, setDeliveryStatus);
router.post("/changeOrderStatus", authenticateToken, changeOrderStatus);
router.get("/trains", authenticateToken, getTrains);
router.get("/drivers", authenticateToken, getDrivers);
router.get("/assistants", authenticateToken, getAssistants);
router.get("/vehicles", authenticateToken, getVehicles);
router.get("/admindetails",authenticateToken,getAdminDetails);

//routs for get reports//
router.get("/quarterlySales",authenticateToken,getQuarterlySales);
router.get("/productOrders",authenticateToken,getMostOrders);
router.get("/assistantWorkHours",authenticateToken,getAssistantWorkedHours);
router.get("/driverWorkHours",authenticateToken,getDriverWorkedHours);
router.get("/truckHours",authenticateToken,getTruckHours);

export default router;