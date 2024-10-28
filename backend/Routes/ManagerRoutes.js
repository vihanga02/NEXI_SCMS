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
    manager_signup,
    manager_logout,
    getQuarterlySales,
    getAdminDetails,

    getDriversOfStore,
    getAssistsantsOfStore,
    insertDriver,
    removeDriver,

    getProfile,

    getMostOrders,

    getDriverWorkedHours,
    setDeliveryStatus,
    getAssistantWorkedHours,
    getTruckHours,
    getSalesByCity,
    getSalesByRoute,
    getCustomerOrderReport,
    getAvailabilityCounts,
    getIncompletedTrainOrders,
    getIncompleteOrdersForStore,

} from "../Controllers/ManagerController.js";



// User authentication routes
router.post("/login", manager_login);
router.post("/signup",manager_signup);
router.post("/logout", manager_logout)



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
router.get('/profile', authenticateToken, getProfile);

router.get("/availabilityCounts",authenticateToken,getAvailabilityCounts);
router.get("/incompleteOrders",authenticateToken,getIncompleteOrdersForStore);

router.get("/driversofstore", authenticateToken, getDriversOfStore);
router.get("/assistantsofstore",authenticateToken, getAssistsantsOfStore);
router.post("/driver/insert",authenticateToken,insertDriver);
router.delete("/driver/remove/:Driver_ID",authenticateToken, removeDriver);

//routs for get reports//
router.get("/quarterlySales",authenticateToken,getQuarterlySales);
router.get("/productOrders",authenticateToken,getMostOrders);
router.get("/assistantWorkHours",authenticateToken,getAssistantWorkedHours);
router.get("/driverWorkHours",authenticateToken,getDriverWorkedHours);
router.get("/truckHours",authenticateToken,getTruckHours);
router.get("/salesByCity",authenticateToken,getSalesByCity);
router.get("/salesByRoute",authenticateToken,getSalesByRoute);
router.get("/customerOrderReport",authenticateToken,getCustomerOrderReport);

export default router;