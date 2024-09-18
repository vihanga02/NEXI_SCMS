// import dotenv from 'dotenv'
// dotenv.config()

// const pool = mysql.createPool({
//     host: process.env.MYSQL_HOST,
//     user: process.env.MYSQL_USER,
//     password: process.env.MYSQL_PASSWORD,
//     database: process.env.MYSQL_DATABASE
// })

const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const app = express();

app.use(cors());

app.listen(8081,()=>{
    console.log("listening..");
})

