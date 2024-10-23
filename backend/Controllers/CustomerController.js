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

async function logout(req, res) {
  // Clear the token cookie
  res.cookie("token", "", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    expires: new Date(0), // Set to expire immediately
  });

  return res.status(200).json({ message: "Logout successful", success: true });
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

async function getCart(req, res) {
  const Customer_ID = req.user.id;

  try {
    const cart = await Customer.getCart(Customer_ID);
    res.status(200).json(cart);
  } catch (error) {
    console.error("Error in getCart:", error);
    res.status(500).json({ message: "Error getting cart" });
  }
}

// Remove an item from the cart
async function removeFromCart(req, res) {
  const Product_ID = req.params.Product_ID; // Get Product_ID from the URL parameter
  const Customer_ID = req.user.id; // Assuming you still need the customer ID

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
  const Customer_ID = req.user.id; // Extracting Customer_ID from the request
  const { Store_ID, Route_ID } = req.body; // Extract Store_ID and Route_ID from the request body

  try {
    // Pass Customer_ID, Store_ID, and Route_ID to the checkout method
    const result = await Customer.checkout(Customer_ID, Store_ID, Route_ID);
    res.status(200).json(result);
  } catch (error) {
    console.error("Error in checkout:", error);
    res.status(500).json({ success: false, message: "Error during checkout." });
  }
}


async function getStores(req, res) {
  try{
    const result = await Customer.getStores();
    res.status(200).json(result);

  }
  catch(error){
    console.error("Error in selecting store:", error);
    res.status(500).json({success:false, message:"Error during selecting store"});
  }
}


async function getRoutes(req, res) {
  try {
    const result = await Customer.getRoutes();
    res.status(200).json(result);
  } catch (error) {
    console.error("Error in selecting store:", error);
    res
      .status(500)
      .json({ success: false, message: "Error during selecting store" });
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

async function getProfile(req, res) {
  try {
    req = req.user.username;
    const profile = await Customer.getCustomerByUsername(req);
    res.status(200).json(profile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "server error" });
  }
}

// Controller to get the current (pending) order
async function fetchCurrentOrder(req, res) {
  const customerId = req.user.id; // Assuming you have middleware that sets req.user with authenticated user info
  
  try {
    const currentOrder = await Customer.getCurrentOrder(customerId);
    if (!currentOrder || currentOrder.length === 0) {
      return res.status(404).json({ success: false, message: 'No pending order found' });
    }

    const orderItems = {};
    for (const order of currentOrder) {
      const currentOrderItems = await Customer.getCurrentOrderItem(order.Order_ID);
      orderItems[order.Order_ID] = currentOrderItems;
    }
    return res.status(200).json({ success: true, data: currentOrder, order_item: orderItems });
  } catch (error) {
    console.error('Error fetching current order:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
}

// Controller to get the previous order
async function fetchPreviousOrder(req, res) {
  const customerId = req.user.id; // Assuming you have middleware that sets req.user with authenticated user info
  
  try {
    const previousOrder = await Customer.getPreviousOrder(customerId);
    
    if (!previousOrder || previousOrder.length === 0) {
      return res.status(404).json({ success: false, message: 'No previous order found' });
    }

    return res.status(200).json({ success: true, data: previousOrder });
  } catch (error) {
    console.error('Error fetching previous order:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
}

async function updateCustomer(req, res) {
  const { Name, Phone_Number } = req.body;
  try {
    const profile = await Customer.getCustomerByUsername(req.user.username);
    if (Phone_Number &&  !Name) {
      profile[0].Phone_Number = Phone_Number;
    }else if (!Phone_Number && Name) {
      profile[0].Name = Name;
    }
    const result = await Customer.updateCustomer(profile[0]); 
    return res.status(200).json({ success: true, message: "Customer updated successfully" });
  } catch (error) {
    console.error("Error updating customer:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
}

export {
  getOrder,
  getProducts,
  createOrder,
  login,
  logout,
  signup,
  addToCart,
  removeFromCart,
  checkout,
  checkLogin,
  getCart,
  getProfile,
  fetchCurrentOrder,
  fetchPreviousOrder,
  updateCustomer,
  getRoutes,
  getStores
};
