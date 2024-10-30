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
    releaseAll,

    addToDeliveryQueue,
    updateArrivalTime,

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
    insertAssistant,
    removeAssistant,

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
router.get("/paidOrders", authenticateToken("Manager"), getPaidOrders);
router.get("/deliverySchedule/:date", authenticateToken("Manager"), getDeliverySchedule);
router.get("/truckDelivery", authenticateToken("Manager"), getTruckDelivery);
router.post("/addDeliverySchedule", authenticateToken("Manager"), addDeliverySchedule);
router.delete("/deleteSchedule", authenticateToken("Manager"), deleteDelivery);
router.post("/assignTruck", authenticateToken("Manager"), addTruckDelivery);
router.post("/assignTrain", authenticateToken("Manager"), addTrainDelivery);
router.delete("/deleteTruck", authenticateToken("Manager"), deleteTruckDelivery);
router.post("/setDeliveryStatus", authenticateToken("Manager"), setDeliveryStatus);
router.post("/changeOrderStatus", authenticateToken("Manager"), changeOrderStatus);
router.get("/completedOrders", authenticateToken("Manager"), getCompletedOrders);
router.get("/receivedOrders", authenticateToken("Manager"), getReceivedOrders);
router.post("/releaseAll", authenticateToken("Manager"), releaseAll);

router.post("/queueForDelivery", authenticateToken("Manager"), addToDeliveryQueue); 
router.post("/updateArrivalTime", authenticateToken("Manager"), updateArrivalTime);

router.get("/trains", authenticateToken("Manager"), getTrains);
router.get("/drivers", authenticateToken("Manager"), getDrivers);
router.get("/assistants", authenticateToken("Manager"), getAssistants);
router.get("/vehicles", authenticateToken("Manager"), getVehicles);
router.get("/admindetails",authenticateToken("Manager"),getAdminDetails);
router.get('/profile', authenticateToken("Manager"), getProfile);

router.get("/availabilityCounts",authenticateToken("Manager"),getAvailabilityCounts);
router.get("/incompleteOrders",authenticateToken("Manager"),getIncompleteOrdersForStore);

router.get("/driversofstore", authenticateToken("Manager"), getDriversOfStore);
router.get("/assistantsofstore",authenticateToken("Manager"), getAssistsantsOfStore);
router.post("/driver/insert",authenticateToken("Manager"),insertDriver);
router.delete("/driver/remove/:Driver_ID",authenticateToken("Manager"), removeDriver);
router.post("/assistant/insert",authenticateToken("Manager"),insertAssistant);
router.delete("/assistant/remove/:Assistant_ID",authenticateToken("Manager"), removeAssistant);

//routs for get reports//
router.get("/quarterlySales",authenticateToken("Manager"),getQuarterlySales);
router.get("/productOrders",authenticateToken("Manager"),getMostOrders);
router.get("/assistantWorkHours",authenticateToken("Manager"),getAssistantWorkedHours);
router.get("/driverWorkHours",authenticateToken("Manager"),getDriverWorkedHours);
router.get("/truckHours",authenticateToken("Manager"),getTruckHours);
router.get("/salesByCity",authenticateToken("Manager"),getSalesByCity);
router.get("/salesByRoute",authenticateToken("Manager"),getSalesByRoute);
router.get("/customerOrderReport",authenticateToken("Manager"),getCustomerOrderReport);
router.delete("/assistant/remove/:assistant_ID",authenticateToken("Manager"), removeAssistant);

export default router;