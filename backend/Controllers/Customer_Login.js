// Controllers/login.js
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Customer from '../Models/Customer.js';


async function cutomer_login(req, res) {
    const { Email, Password } = req.body;

    // Find the user by username
    const [user] = await Customer.getCustomer(Email);
    console.log(user);

    if (!user) {
        return res.status(401).json({ message: 'Invalid credentials', success: false });
    }

    // Check if the password is correct
    const match = await bcrypt.compare(Password, user.Password);
    if (!match) {
        return res.status(401).json({ message: 'Invalid credentials', success: false });
    }

    // Create a token
    const token = jwt.sign({ id: user.Customer_ID, username: user.Name }, process.env.SECRET_KEY, { expiresIn: '1h' });

    res.status(200).json({ token, success: true });
}

export default cutomer_login;