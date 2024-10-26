import pool from '../dbConfig.js'

class Manager{
    static async getManager(Username) {
        const query = `SELECT * FROM store_manager WHERE Username=?`;

        try {
            const [results] = await pool.query(query, [Username]);
            return results;
        } catch (error) {
            throw error;
        }
    }
    //model for getting the most orders
    static async getMostOrders(req) {
        const query = `SELECT * FROM product_orders;`;
        try {
            const [rows] = await pool.query(query); // Only get the rows part
            // Print rows for debugging
            return rows; // Return only rows
        } catch (error) {
            throw error;
        }
    }
    //model for get the assistant worked hours
    static async getAssistantWorkHours() {
        const query = `SELECT * FROM assistant_work_hours`; // Query the view directly
        try {
            const [rows] = await pool.query(query); // Execute the query and return rows
            return rows; // Return only rows
        } catch (error) {
            console.error("Error in getAssistantWorkHours:", error);
            throw error;
        }
    }

    //model for getting the quarterly sales
    static async getQuarterlySales(req) {
        const { startDate } = req.query;
        
        const query = `CALL Quarterly_sales_from(?)`;
        try {
            const [rows] = await pool.query(query, [startDate]); // Get only the rows
             // Verify that this is the correct data
            return rows[0]; // Return only the first element of rows
        } catch (error) {
            console.error("Error in getQuarterlySales:", error);
            throw error;
        }
    }
       // Model function to get truck hours
    static async getTruckHours() {
        const query = `SELECT * FROM truck_hours`; // Query the view directly

        try {
            const [rows] = await pool.query(query); // Execute the query and return rows
            return rows; // Return only rows
        } catch (error) {
            console.error("Error in getTruckHours:", error);
            throw error;
        }
    }

        // Function to get the total hours worked by each driver
        static async getDriverWorkHours() {
            const query = `SELECT * FROM driver_work_hours`; // Query the view directly
            try {
                const [rows] = await pool.query(query); // Execute the query and return rows
                return rows; // Return only rows
            } catch (error) {
                console.error("Error in getDriverWorkHours:", error);
                throw error;
            }
        }
// Model function to get sales by city
        static async getSalesByCity() {
            const query = `SELECT * FROM sales_by_city`; // Query the view directly
    
            try {
                const [rows] = await pool.query(query); // Execute the query and return rows
                return rows; // Return only rows
            } catch (error) {
                console.error("Error in getSalesByCity:", error);
                throw error;
            }
        }

    // Model function to get sales by route
    static async getSalesByRoute() {
        const query = `SELECT * FROM sales_by_route`; // Query the view directly

        try {
            const [rows] = await pool.query(query); // Execute the query and return rows
            return rows; // Return only rows
        } catch (error) {
            console.error("Error in getSalesByRoute:", error);
            throw error;
        }
    }
    

    
    
    
    static async getIncompletedTrainOrders(req){
        // get the orders which does not have a train assigned the state is not delivered
        const query = `Select *  from Delivery_Schedule where Delivery_status='On_Train`;
       
        try{
            const result = await pool.query(query, null);
            return result;
        } catch (error) {
            throw error;
        }
    }

    static async getIncompletedTruckOrders(req){
        // get the orders which does not have a train assigned the state is not delivered
        const query = `Select *  from Delivery_Schedule where Delivery_status='In_Truck`;
       
        try{
            const result = await pool.query(query, null);
            return result;
        } catch (error) {
            throw error;
        }
    }

    static async getOrders(req){
        const query = `select * from Orders`

        try {
            const result = await pool.query(query, null);
            return result;
        } catch (error) {
            throw error;
        }
    }

    static async getTruckDelivery(storeID){
        const query = 
            `SELECT 
                td.ID,
                t.Truck_ID,
                td.Driver_ID,
                td.Assistant_ID
            FROM truck_delivery td
            LEFT JOIN truck t ON td.truck_ID = t.Truck_ID
            WHERE t.Store_ID = ?;`;
        try{
            const result = await pool.query(query, [storeID]);
            return result[0];
        }
        catch(error){
            throw error;
        }
    }
    
    static async addDeliverySchedule(){

        const query = `INSERT INTO delivery_schedule(shipment_date,Delivery_status) VALUES (CURDATE(), 'Not_Yet');`;
        try{
            const result = await pool.query(query, NULL);
            console.log(result);
            return result;
        }catch(error){
            throw error;
        }
    }

    static async getDeliverySchedule(date){
        const query = `select * from Delivery_Schedule where shipment_date=?`;
        try{
            const result = await pool.query(query, date);
            return result[0];
        }catch(error){
            throw error;
        }
    }
    
    static async addTruckDelivery(AdminID, delivery_id){
        console.log("model",delivery_id,AdminID);
        const query = 'call CreateTruckDelivery(?,?)';
        try {
            const result = await pool.query(query, [AdminID, delivery_id]);
            console.log(result);
            return result;
        } catch (error) {
            throw error;
        }
    }

    static async setDeliveryStatus(status, Delivery_id){
        const query = `update Delivery_Schedule set Delivery_status=? where Delivery_id=?`;
        try {
            const result = await pool.query(query, [status, Delivery_id]);
            return result;
        } catch (error) {
            throw error;
        }
    }

    static async changeOrderStatus(status, orderID){
        
        const query = 
            `update orders set Order_state=? where Order_id=?`;
        try {
            const result = await pool.query(query,[status,orderID]);
            return result;
        } catch (error) {
            throw error;
        }
    }

// ----------------------------------------------------------------------

    // Function to get trains by Store_ID using the stored procedure
    static async getTrains(req) {
        const { Store_ID } = req.body;
        const query = `CALL getTrainsByStoreID(?)`;
        const values = [Store_ID];

        try {
            const result = await pool.query(query, values);
            return result[0]; // Stored procedure returns results as an array of arrays
        } catch (error) {
            throw error;
        }
    }

    // Function to get drivers by city using the stored procedure
    static async getDrivers(city) {
        const query = `CALL getDriversByCity(?)`;

        try {
            const result = await pool.query(query, [city]);
            return result[0]; // Stored procedure returns results as an array of arrays
        } catch (error) {
            throw error;
        }
    }

    // Function to get driver assistants by city using the stored procedure
    static async getAssistants(city) {
        const query = `CALL getAssistantsByCity(?)`;

        try {
            const result = await pool.query(query, [city]);
            return result[0]; // Stored procedure returns results as an array of arrays
        } catch (error) {
            throw error;
        }
    }

    // Function to get vehicles by city using the stored procedure
    static async getVehicles(city) {
        const query = `CALL getVehiclesByCity(?)`;

        try {
            const result = await pool.query(query, [city]);
            return result[0]; // Stored procedure returns results as an array of arrays
        } catch (error) {
            throw error;
        }
    }

    static async getAdminDetails(adminID) { // Add adminId as a parameter
        
        const query = `CALL GetAdminDetails(?)`;
    
        try {
            const result = await pool.query(query, [adminID]); 
            return result[0][0][0]; 
        } catch (error) {
            throw error;
        }
    }



    
    
    static async getStoreCity(storeID){
        const query = `select City from store where Store_ID=?`;
        try{
            const result = await pool.query(query, storeID);
            return result;
        } catch (error) {
            throw error;
        }
    }
}

export default Manager;