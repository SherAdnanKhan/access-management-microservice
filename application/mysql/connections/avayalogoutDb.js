// get the client
const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config({ path: '../../config/config.env' });
// create the connection to database

const pool = mysql.createPool({
  host: process.env.AVAYALOGOUT_DB_HOST,
  user: process.env.AVAYALOGOUT_DB_USER,
  port: process.env.AVAYALOGOUT_DB_PORT,
  password: process.env.AVAYALOGOUT_DB_PASSWORD,
  database: process.env.AVAYALOGOUT_DB_DATABASE,
});

const avayalogoutConnection = pool.promise();

module.exports = avayalogoutConnection;
