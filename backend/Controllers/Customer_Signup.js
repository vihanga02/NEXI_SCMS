// Controllers/signup.js
import bcrypt from 'bcrypt';
import Customer from '../Models/Customer.js';

async function customer_signup(req, res) {
    const { Name, Password, Email, Address, Phone_Number } = req.body;

    const [existingUser] = await Customer.getCustomer(Email);
    if (existingUser) {
        return res.status(400).json({ message: 'Username already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(Password, 10);

    // Insert new user into the database
    Customer.createCustomer(req, hashedPassword)

    res.status(201).json({ message: 'User registered successfully' });
}

export default customer_signup;