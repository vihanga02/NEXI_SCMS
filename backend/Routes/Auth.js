import express from "express";
const router = express.Router();

import customer_login from "../Controllers/Customer_Login.js";
import customer_signup from "../Controllers/Customer_Signup.js";
import authenticateToken from "../Controllers/Authentication.js";


router.post("/customer_login", customer_login);
router.post("/customer_signup", customer_signup);
router.get("/customer", authenticateToken, (req, res) => {
  res.json(req.user);
});

export default router;