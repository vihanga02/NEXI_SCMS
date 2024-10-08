import pool from '../config/db.js';

module.export = class Customer {
    static async getProduct() {
        const query = 'select * from Products';
        pool.query(query,
            (error, results, fields) => {
                if (error) {
                    reject(error);
                };
                resolve(results);
            }
        )
    }
}