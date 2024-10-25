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
    static async getQuarterlySales(req) {
        const {startDate} = req.body;
        console.log("Fetching quarterly sales starting from:", startDate);
        const query = `CALL Quarterly_sales_from(?)`;
        try {
            const [results] = await pool.query(query, [startDate]);
            return results;
        } catch (error) {
            console.error("Error in getQuarterlySales:", error);
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

    
    static async getDeliverySchedule(date){
        const query = `select * from Delivery_Schedule where shipment_date=?`;
        try{
            const result = await pool.query(query, date);
            return result[0];
        }catch(error){
            throw error;
        }
    }
    
    static async addDeliverySchedule(req){
        const {store_id} = req.body.store_id;
        const query = 'call CreateDeliverySchedule(store_id)'
        const values = [store_id];
        try {
            const result = await pool.query(query, values);
            return result;
        } catch (error) {
            throw error;
        }

    }

    static async changeOrderStatusToIn_Truck(req){
        const { Delivery_id } = req.body;
        const query = 
            `update Delivery_Schedule set Delivery_status='In_Truck' where Delivery_id=?`;

        try {
            const result = await pool.query(query,[Delivery_id]);
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
        
        const query = `CALL GetAdminDetails(?)`; // Use the placeholder
      
    
        try {
            const result = await pool.query(query, [adminID]); // Pass the adminId as the parameter
            console.log(result);
            return result[0][0][0]; 
        } catch (error) {
            throw error;
        }
    }
    

}

export default Manager;