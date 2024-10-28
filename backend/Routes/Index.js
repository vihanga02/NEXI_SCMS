import express from "express";
const router = express.Router();

import customer_routes from "./CustomerRoutes.js";
import admin_routes from "./ManagerRoutes.js";

router.use("/customer", customer_routes);
router.use("/manager", admin_routes);


export default router;
