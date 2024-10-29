import express from "express";
const router = express.Router();
import { getManager, removeManager, getStores } from "../Controllers/AdminController.js";
import authenticateToken from "../Middleware/Authentication.js";


router.get("/getManagers", authenticateToken, getManager);
router.get("/stores", authenticateToken, getStores);
router.delete("/remove/:Driver_ID", authenticateToken, removeManager);

export default router;