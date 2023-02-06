// get the client
const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config({ path: '../../config/config.env' });
// create the connection to database
const pool = mysql.createPool({
  host: process.env.ACTIVATE_DB_HOST,
  user: process.env.ACTIVATE_DB_USER,
  port: process.env.ACTIVATE_DB_PORT,
  password: process.env.ACTIVATE_DB_PASSWORD,
  database: process.env.ACTIVATE_DB_DATABASE,
});

const activateConnection = pool.promise();

module.exports = activateConnection;
