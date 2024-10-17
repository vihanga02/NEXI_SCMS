import express from "express";
const router = express.Router();

import customer_routes from "./CustomerRoutes.js";
import admin_routes from "./AdminRoutes.js";

router.use("/customer", customer_routes);
router.use("/admin", admin_routes);


export default router;
