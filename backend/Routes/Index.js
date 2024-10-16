import express from "express";
const router = express.Router();

import customer_routes from "./CustomerRoutes.js";

router.use("/customer", customer_routes);


export default router;
