import express from "express";
const router = express.Router();
import { getManager, removeManager } from "../Controllers/AdminController.js";
import authenticateToken from "../Middleware/Authentication.js";


router.post("/admin/getManagers", authenticateToken, getManager);
router.delete("/admin/remove/:Driver_ID", authenticateToken, removeManager);

export default router;