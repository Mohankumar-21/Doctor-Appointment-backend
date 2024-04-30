const express = require('express');
const colors = require('colors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const path = require('path');

// Dotenv configuration
dotenv.config();

// MongoDB connection
connectDB();

// Create Express app
const app = express();

// Middleware
app.use(express.json());
app.use(morgan('dev'));




// API routes
app.use('/api/v1/user', require('./routes/userRoutes'));
app.use('/api/v1/admin', require('./routes/adminRoutes'));
app.use('/api/v1/doctor', require('./routes/doctorRoutes'));


  

// Listen to the port
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server Running in ${process.env.NODE_ENV} Mode on port ${process.env.PORT}`.bgCyan.white);
});
