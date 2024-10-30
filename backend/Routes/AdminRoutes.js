import express from "express";
const router = express.Router();
import { getManager, removeManager, getStores } from "../Controllers/AdminController.js";
import authenticateToken from "../Middleware/Authentication.js";


router.get("/getManagers", authenticateToken("Admin"), getManager);
router.get("/stores", authenticateToken("Admin"), getStores);
router.delete("/remove/:Driver_ID", authenticateToken("Admin"), removeManager);

export default router;