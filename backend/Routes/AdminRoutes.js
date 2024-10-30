import express from "express";
const router = express.Router();
import { getManager, removeManager, getStores } from "../Controllers/AdminController.js";
import authenticateToken from "../Middleware/Authentication.js";

router.post("/admin/getManagers", authenticateToken("Admin"), getManager);
router.delete("/admin/remove/:Manager_ID", authenticateToken("Admin"), removeManager);

export default router;