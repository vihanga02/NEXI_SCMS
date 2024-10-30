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
router.post("/cart/add", authenticateToken("Customer"), addToCart);
router.get("/cart", authenticateToken("Customer"), getCart);
router.delete("/cart/remove/:Product_ID", authenticateToken("Customer"), removeFromCart);
router.post("/cart/checkout", authenticateToken("Customer"), checkout);

router.get("/stores", getStores);
router.get("/routes", getRoutes);

// Navbar route
router.get('/navbar', authenticateToken("Customer"), checkLogin);

// Customer Details
router.get('/profile', authenticateToken("Customer"), getProfile);
router.get('/lastOrder', authenticateToken("Customer"), fetchPreviousOrder);
router.get('/currentOrder', authenticateToken("Customer"), fetchCurrentOrder);
router.post('/updateCustomer', authenticateToken("Customer"), updateCustomer);

export default router;
