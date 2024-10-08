import pool from '../dbConfig.js';

module.export = class Customer {
    static async getProduct() {
        const query = 'select * from Products';
        return new Promise((resolve, reject) => {
            pool.query(query, (error, results, fields) => {
            if (error) {
                return reject(error);
            }
            resolve(results);
            });
        });
    }

    static async createOrder(request) {
}
}