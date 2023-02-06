const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const errorHandler = require('./middlewares/error.js');
const helmet = require('helmet');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');
const cors = require('cors');
const mysql = require('mysql2');


// Load env vars
dotenv.config({ path: './config/config.env' });

// Routes files
const logs = require('./routes/log.js');

const app = express();

// Body parser

app.use(express.json());

// Middleware

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('combined'));
}


// Security headers
app.use(helmet());

// Prevent xss attacks
app.use(xss());

// Rate limiting
const limiter = rateLimit({
    windowMs: 10 * 60 * 100,
    max: 100
});

app.use(limiter);

// Prevent http param pollution
app.use(hpp());

// Enable Cors error

app.use(cors());

// Mount routes
app.use('/', logs);

// Error handler
app.use(errorHandler);

const PORT = 8001;


const server = app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port 8001`));

//Unhandled promise rejections

process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`);
    server.close(() => process.exit(1));
});