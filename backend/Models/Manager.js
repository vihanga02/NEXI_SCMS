import pool from '../dbConfig.js'

class Manager{

    static async getManagar(Email) {

        const query = `SELECT * FROM Store_Manager WHERE Email=?`;

        try {
            const [results] = await pool.query(query, [Email]);
            return results;
        } catch (error) {
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

    
    static async getDeleverySchedule(req){
        const query = `select * from Delivery_Schedule where date>=curdate()`

        const result = await call_db(query, null);

        return result;
    }
    
    static async addDeleverySchedule(req){
        const {Train_id_Truck_id, Driver_id, Assistant_id, Order_id, Vehicle_arrival_time, Vehicle_departure_time, Delivery_status} = req.body;
        const query = `insert into Delivery_Schedule (Train_id_Truck_id, Driver_id, Assistant_id, Order_id, Vehicle_arrival_time, Vehicle_departure_time, Delivery_status) values (?, ?, ?, ?, ?, ?, ?)`;
        const values = [Train_id_Truck_id, Driver_id, Assistant_id, Order_id, Vehicle_arrival_time, Vehicle_departure_time, Delivery_status];

        try {
            const result = await pool.query(query, values);
            return result;
        } catch (error) {
            throw error;
        }

    }

    static async changeOrderStatusToIn_Truck(req){
        const { Delivery_id } = req.body;
        const query = `update Delivery_Schedule set Delivery_status='In_Truck' where Delivery_id=?`;
        const values = [Delivery_id];

        try {
            const result = await pool.query(query, values);
            return result;
        } catch (error) {
            throw error;
        }
    }


    static async getTrains(req){
        const { Store_ID } = req.body;
        const query = `SELECT 
                        t.Train_ID,
                        t.Train_Name,
                        ts.Day,
                        ts.Start_Time,
                        ts.End_Station_ID
                    FROM 
                        Train t
                    JOIN 
                        Train_Schedule ts ON t.Train_ID = ts.Train_ID
                    JOIN 
                        Destination d ON ts.Trip_ID = d.Trip_ID
                    JOIN 
                        Store s ON d.Store_ID = s.Store_ID
                    JOIN 
                        Store_Manager sm ON sm.Store_ID = s.Store_ID
                    WHERE 
                        s.Store_ID = ?`;

        const values = [Store_ID];

        try {
            const result = await pool.query(query, values);
            return result;
        } catch (error) {
            throw error;
        }
    }

// ----------------------------------------------------------------------

    static async getDrivers(city){
        const query = `SELECT 
                            d.Driver_ID,
                            d.Work_Hours,
                            d.Availability,
                            s.City
                        FROM 
                            Driver d
                        JOIN 
                            Store s ON d.Store_ID = s.Store_ID
                        WHERE 
                            s.City = '[CITY_NAME]';  -- Replace [CITY_NAME] with the actual city name`;
        const values = [city];

        try {
            const result = await pool.query(query, values);
            return result;
        } catch (error) {
            throw error;
        }
    }


    static async getAssistants(city){
        const query = `SELECT 
            da.Assistant_ID,
            da.Work_Hours,
            da.Availability,
            s.City
        FROM 
            Driver_Assistant da
        JOIN 
            Store s ON da.Store_ID = s.Store_ID
        WHERE 
            s.City = ?`;
        const values = [city];

        try {
            const result = await pool.query(query, values);
            return result;
        } catch (error) {
            throw error;
        }
    }

    static async getVehicles(city){
        const query = `SELECT 
            t.Truck_ID,
            t.Reg_Number,
            t.Used_Hours,
            t.Availability,
            s.City
        FROM 
            Truck t
        JOIN 
            Store s ON t.Store_ID = s.Store_ID
        WHERE 
            s.City = ?`;
        const values = [city];

        try {
            const result = await pool.query(query, values);
            return result;
        } catch (error) {
            throw error;
        }
    }
}

export default Manager;