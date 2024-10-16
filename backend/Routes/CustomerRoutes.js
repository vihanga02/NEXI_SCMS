import express from "express";
const router = express.Router();

import {
  getOrder,
  getProducts,
  createOrder,
  login,
  logout,
  signup,
  addToCart, // Import the new method for adding to the cart
  removeFromCart, // Import the new method for removing from the cart
  checkout, // Import the new method for checking out
  checkLogin,
  getCart,
  getProfile
} from "../Controllers/CustomerController.js";
import authenticateToken from "../Middleware/Authentication.js";

// User authentication routes
router.post("/login", login);
router.post("/signup", signup);
router.post("/logout", logout)

// Order-related routes
router.get("/orders", getOrder);
router.get("/products", getProducts);
router.post("/createOrder", createOrder);

// Cart-related routes
router.post("/cart/add", authenticateToken, addToCart); 
router.get("/cart", authenticateToken, getCart); 
router.delete("/cart/remove", authenticateToken, removeFromCart);
router.post("/cart/checkout", authenticateToken, checkout); 

// Navbar route
router.get('/navbar',authenticateToken, checkLogin);

// Customer Details
router.get('/profile', authenticateToken, getProfile);

export default router;
