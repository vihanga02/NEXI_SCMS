import express from "express";
const router = express.Router();

import {
  getOrder,
  getProducts,
  createOrder,
  login,
  signup,
  addToCart, 
  getCart,
  removeFromCart, 
  checkout,
} from "../Controllers/CustomerController.js";
import authenticateToken from "../Middleware/Authentication.js";

// User authentication routes
router.post("/login", login);
router.post("/signup", signup);

// Order-related routes
router.get("/orders", getOrder);
router.get("/products", getProducts);
router.post("/createOrder", createOrder);

// Cart-related routes
router.post("/cart/add", authenticateToken, addToCart); 
router.get("/cart", authenticateToken, getCart); 
router.delete("/cart/remove", authenticateToken, removeFromCart);
router.post("/cart/checkout", authenticateToken, checkout); 

export default router;
