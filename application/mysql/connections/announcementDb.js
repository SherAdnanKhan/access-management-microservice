// get the client
const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config({ path: '../../config/config.env' });
// create the connection to database

const pool = mysql.createPool({
  host: process.env.ANNOUNCEMENT_DB_HOST,
  user: process.env.ANNOUNCEMENT_DB_USER,
  port: process.env.ANNOUNCEMENT_DB_PORT,
  password: process.env.ANNOUNCEMENT_DB_PASSWORD,
  database: process.env.ANNOUNCEMENT_DB_DATABASE,
});

const announcementConnection = pool.promise();

module.exports = announcementConnection;
