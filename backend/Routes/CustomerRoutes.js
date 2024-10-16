import express from "express";
const router = express.Router();

import {
  getOrder,
  getProducts,
  createOrder,
  login,
  signup,
  addToCart, // Import the new method for adding to the cart
  removeFromCart, // Import the new method for removing from the cart
  checkout, // Import the new method for checking out
  checkLogin
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
router.post("/cart/add", authenticateToken, addToCart); // Route for adding items to the cart
router.delete("/cart/remove", authenticateToken, removeFromCart); // Route for removing items from the cart
router.post("/cart/checkout", authenticateToken, checkout); // Route for checking out

// Navbar route
router.get('/navbar',authenticateToken, checkLogin);

export default router;
