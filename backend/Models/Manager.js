import pool from '../dbConfig.js'

class Manager{

    static async getManager(UserName) {
        const query = `SELECT * FROM Store_Manager WHERE Username=?`;

        try {
            const [results] = await pool.query(query, [UserName]);
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

    
    static async getDeliverySchedule(req){
        const {date} = req.body;
        const query = `select * from Delivery_Schedule where shipment_date=?`;
        try{
            const result = await pool.query(query, date);
            return result;
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
}

export default Manager;