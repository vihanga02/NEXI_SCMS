import Manager from "../Models/Manager.js";

async function manager_login (res, req) {
    const { Email, Password } = req.body;

    // Find the manager by email
    const [manager] = await Manager.getManager(Email);
    console.log(manager);

    if (!manager) {
        return res.status(401).json({ message: 'Invalid credentials', success: false });
    }

    // Check if the password is correct
    const match = await bcrypt.compare(Password, manager.Password);
    if (!match) {
        return res.status(401).json({ message: 'Invalid credentials', success: false });
    }

    // Create a token
    const token = jwt.sign({ id: manager.Manager_ID, username: manager.Name }, process.env.SECRET_KEY, { expiresIn: '1h' });

    res.status(200).json({ token, success: true });
}

export default manager_login;