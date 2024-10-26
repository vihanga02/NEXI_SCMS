import express from "express";
const router = express.Router();
import authenticateToken from "../Middleware/Authentication.js";

import {
    getPaidOrders,
    getDeliverySchedule,
    addDeliverySchedule,
    deleteDelivery,
    getTruckDelivery,
    addTruckDelivery,
    addTrainDelivery,
    deleteTruckDelivery,
    changeOrderStatus,
    getCompletedOrders,
    getReceivedOrders,

    addToDeliveryQueue,

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
    getTruckHours,
    getSalesByCity,
    getSalesByRoute
} from "../Controllers/AdminController.js";


// User authentication routes
router.post("/login", manager_login);



// Order-related routes
router.get("/paidOrders", authenticateToken, getPaidOrders);
router.get("/deliverySchedule/:date", authenticateToken, getDeliverySchedule);
router.get("/truckDelivery", authenticateToken, getTruckDelivery);
router.post("/addDeliverySchedule", authenticateToken, addDeliverySchedule);
router.delete("/deleteSchedule", authenticateToken, deleteDelivery);
router.post("/assignTruck", authenticateToken, addTruckDelivery);
router.post("/assignTrain", authenticateToken, addTrainDelivery);
router.delete("/deleteTruck", authenticateToken, deleteTruckDelivery);
router.post("/setDeliveryStatus", authenticateToken, setDeliveryStatus);
router.post("/changeOrderStatus", authenticateToken, changeOrderStatus);
router.get("/completedOrders", authenticateToken, getCompletedOrders);
router.get("/receivedOrders", authenticateToken, getReceivedOrders);

router.post("/queueForDelivery", authenticateToken, addToDeliveryQueue); 

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
router.get("/salesByCity",authenticateToken,getSalesByCity);
router.get("/salesByRoute",authenticateToken,getSalesByRoute);

export default router;