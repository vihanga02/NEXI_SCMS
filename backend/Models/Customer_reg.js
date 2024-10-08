import pool from '../dbConfig.js';

let CustomerInstance = null;

class CustomerAuth{
    static getInstance(){
        if(CustomerInstance === null){
            CustomerInstance = new CustomerAuth();
        }
        return CustomerInstance;
    }

    

    async registerCustomer(cusDetails){
        let { Customer_ID, Name ,Password ,Email, Address, Phone_Number} = cusDetails;

        const query = "INSERT INTO `Customer` ('Customer_ID', 'Name' ,'Password' ,'Email', 'Address', 'Phone_Number') VALUES (?,?,?,?,?)"
        console.log([Customer_ID, Name ,Password ,Email, Address, Phone_Number]);

        try {
            const [result] = await pool.query(query, [Customer_ID, Name ,Password ,Email, Address, Phone_Number])
            return result;
        }
        catch (error){
            throw(error);
        }
    }
    
}


module.exports = CustomerAuth;
