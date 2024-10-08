import pool from '../dbConfig.js';

class Customer {
    static async getProducts() {
        const query = 'SELECT * FROM Product';
        try {
            const [results] = await pool.query(query);  // Use await and destructuring
            return results;
        } catch (error) {
            throw error;
        }
    }

    static async createOrder(request) {
        const decodedToken = decodeToken(request);
        const { Customer_ID, Store_ID, Route_ID, Ordered_Date, Expected_Date, Total_Capacity, Total_Price } = request.body;

        const query = "INSERT INTO Orders('Customer_ID', 'Store_ID', 'Route_ID', 'Ordered_Date', 'Expected_Date', 'Total_Capacity', 'Total_Price') VALUES (?, ?, ?, ?, ?, ?, ?)";

        try {
            const [results] = await pool.query(query, [Customer_ID, Store_ID, Route_ID, Ordered_Date, Expected_Date, Total_Capacity, Total_Price]);
            return results;
        } catch (error) {
            throw error;
        }
    }

    static async getOrders(req) {
        const token = decodeToken(req);
        const userID = token.ID;

        const query = `SELECT * FROM Orders WHERE Customer_ID=?`;

        try {
            const [results] = await pool.query(query, [userID]);
            return results;
        } catch (error) {
            throw error;
        }
    }

    static async getCustomer(Email) {

        const query = `SELECT * FROM Customer WHERE Email=?`;

        try {
            const [results] = await pool.query(query, [Email]);
            return results;
        } catch (error) {
            throw error;
        }
    }

    static async updateCustomer(req) {
        const token = decodeToken(req);
        const userID = token.ID;
        const { Name, Email, Address, Phone_Number } = req.body;

        const query = `UPDATE Customer SET Name=?, Email=?, Address=?, Phone_Number=? WHERE Customer_ID=?`;

        try {
            const [results] = await pool.query(query, [Name, Email, Address, Phone_Number, userID]);
            return results;
        } catch (error) {
            throw error;
        }
    }

    static async createCustomer(req, hashedPassword) {
        const { Name, Password, Email, Address, Phone_Number } = req.body;

        const query = 'INSERT INTO Customer (Name, Password, Email, Address, Phone_Number) VALUES (?, ?, ?, ?, ?)';

        try {
            const [results] = await pool.query(query, [Name, hashedPassword, Email, Address, Phone_Number]);
            return results;
        } catch (error) {
            throw error;
        }
    }
}

export default Customer;
