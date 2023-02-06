// get the client
const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config({ path: '../../config/config.env' });
// create the connection to database

const pool = mysql.createPool({
  host: process.env.SDOTP_DB_HOST,
  user: process.env.SDOTP_DB_USER,
  port: process.env.SDOTP_DB_PORT,
  password: process.env.SDOTP_DB_PASSWORD,
  database: process.env.SDOTP_DB_DATABASE,
});

const sdotpConnection = pool.promise();

module.exports = sdotpConnection;
