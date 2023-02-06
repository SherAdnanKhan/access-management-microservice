// get the client
const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config({ path: '../../config/config.env' });
// create the connection to database

const pool = mysql.createPool({
  host: process.env.WIFIGUEST_DB_HOST,
  user: process.env.WIFIGUEST_DB_USER,
  port: process.env.WIFIGUEST_DB_PORT,
  password: process.env.WIFIGUEST_DB_PASSWORD,
  database: process.env.WIFIGUEST_DB_DATABASE,
});

const wifiguestConnection = pool.promise();

module.exports = wifiguestConnection;
