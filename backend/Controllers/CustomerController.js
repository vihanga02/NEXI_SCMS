import Customer from "../Models/CustomerModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

async function checkLogin(req, res) {
  if (req.user) {
    return res.status(200).json({ login_status: true });
  } else {
    return res.status(401).json({ success: false });
  }
}

async function login(req, res) {
  try {
    const { Username, Password } = req.body;

    // Find the user by username
    const [user] = await Customer.getCustomerByUsername(Username);

    if (!user) {
      return res
        .status(401)
        .json({ message: "Invalid credentials", success: false });
    }

    // Check if the password is correct
    const match = await bcrypt.compare(Password, user.Password);
    if (!match) {
      return res
        .status(401)
        .json({ message: "Invalid credentials", success: false });
    }

    // Create a token
    const token = jwt.sign(
      { id: user.Customer_ID, username: user.Username },
      process.env.SECRET_KEY,
      { expiresIn: "1h" }
    );

    // Set the token as an HTTP-only cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    // Return the token in the response
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Server error", success: false });
  }
}

async function signup(req, res) {
  const { Name, Username, Password, Email, Address, Phone_Number } = req.body;

  // Check if email or username already exists
  const [existingEmail] = await Customer.getCustomer(Email);
  const [existingUsername] = await Customer.getCustomerByUsername(Username);

  if (existingEmail) {
    return res.status(400).json({ message: "Email already exists" });
  }

  if (existingUsername) {
    return res.status(400).json({ message: "Username already exists" });
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(Password, 10);

  // Insert new user into the database
  Customer.createCustomer(req, hashedPassword);

  res.status(201).json({ message: "User registered successfully" });
}

// Add an item to the cart
async function addToCart(req, res) {
  const { Product_ID, Quantity } = req.body;
  const Customer_ID = req.user.id;

  try {
    const result = await Customer.addToCart({
      Customer_ID,
      Product_ID,
      Quantity,
    });
    res.status(200).json(result);
  } catch (error) {
    console.error("Error in addToCart:", error);
    res.status(500).json({ success: false, message: "Error adding to cart." });
  }
}

// Remove an item from the cart
async function removeFromCart(req, res) {
  const { Customer_ID, Product_ID } = req.body;

  try {
    const result = await Customer.removeFromCart({
      Customer_ID,
      Product_ID,
    });
    res.status(200).json(result);
  } catch (error) {
    console.error("Error in removeFromCart:", error);
    res
      .status(500)
      .json({ success: false, message: "Error removing item from cart." });
  }
}

// Checkout the cart
async function checkout(req, res) {
  const { Customer_ID } = req.body;

  try {
    const result = await Customer.checkout(Customer_ID);
    res.status(200).json(result);
  } catch (error) {
    console.error("Error in checkout:", error);
    res.status(500).json({ success: false, message: "Error during checkout." });
  }
}

async function getOrder(req, res) {
  try {
    const order = await Customer.getOrders(req);
    console.log(order);
    res.status(200).json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "server error" });
  }
}

async function getProducts(req, res) {
  try {
    const products = await Customer.getProducts(req);
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "server error" });
  }
}

async function createOrder(req, res) {
  try {
    const order = await Customer.createOrder(req);
    res.status(200).json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "server error" });
  }
}

export {
  getOrder,
  getProducts,
  createOrder,
  login,
  signup,
  addToCart,
  removeFromCart,
  checkout,
  checkLogin,
};
