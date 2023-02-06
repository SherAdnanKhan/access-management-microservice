// get the client
const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config({ path: '../../config/config.env' });
// create the connection to database

const pool = mysql.createPool({
  host: process.env.HELPDESK_DB_HOST,
  user: process.env.HELPDESK_DB_USER,
  port: process.env.HELPDESK_DB_PORT,
  password: process.env.HELPDESK_DB_PASSWORD,
  database: process.env.HELPDESK_DB_DATABASE,
});

const helpdeskConnection = pool.promise();

module.exports = helpdeskConnection;
