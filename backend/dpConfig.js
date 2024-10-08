import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DB,
}).promise();

async function fetchData() {
  const result = await pool.query('SELECT * FROM store');
  console.log(result[0]);
}

fetchData();
module.export = pool;