import express from "express";
const router = express.Router();

import {
  getOrder,
  getProducts,
  createOrder,
  login,
  logout,
  signup,
  addToCart, 
  removeFromCart,
  checkLogin,
  getCart,
  getProfile,
  fetchPreviousOrder,
  fetchCurrentOrder,
  updateCustomer,
  checkout,
  getRoutes,
  getStores,

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
router.delete("/cart/remove/:Product_ID", authenticateToken, removeFromCart);
router.post("/cart/checkout", authenticateToken, checkout);

router.get("/stores", getStores);
router.get("/routes", getRoutes);

// Navbar route
router.get('/navbar', authenticateToken, checkLogin);

// Customer Details
router.get('/profile', authenticateToken, getProfile);
router.get('/lastOrder', authenticateToken, fetchPreviousOrder);
router.get('/currentOrder', authenticateToken, fetchCurrentOrder);
router.post('/updateCustomer', authenticateToken, updateCustomer);

export default router;
