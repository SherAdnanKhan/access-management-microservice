// get the client
var mssql = require("mssql");
const dotenv = require('dotenv');

dotenv.config({ path: '../../config/config.env' });
// create the connection to database

exports.bpoConnection = async () => {
    const pool = new mssql.ConnectionPool({
        server: process.env.BPO_DB_SERVER,
        user: process.env.BPO_DB_USER,
        password: process.env.BPO_DB_PASSWORD,
        database: process.env.BPO_DB_DATABASE,
        requestTimeout: 300000,
        options: {
            encrypt: true, // for azure
            trustServerCertificate: true // change to true for local dev / self-signed certs
        }
    });
    try {
        await pool.connect();
        console.log('Connected to database');
        return pool;
    }
    catch (err) {
        console.log('Database connection failed!', err);

        return err;
    }
}
