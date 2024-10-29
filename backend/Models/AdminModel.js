import pool from "../dbConfig.js";

class Admin {

  static async getManagers() {
    const query = `SELECT * FROM store_manager`;

    try {
      const [results] = await pool.query(query);

      return results;
    } catch (error) {
      throw error;
    }
  }



  static async removeManager(Manager_ID) {
    const query = "DELETE FROM store_manager WHERE Manager_ID = ?";
    try {
      const [results] = await pool.query(query, [Manager_ID]);
      return results;
    } catch (error) {
      throw error;
    }
  }
}

export default Admin;   