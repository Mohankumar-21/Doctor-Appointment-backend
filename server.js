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

// Static files
app.use(express.static(path.join(__dirname, 'client/build')));

// API routes
app.use('/api/v1/user', require('./routes/userRoutes'));
app.use('/api/v1/admin', require('./routes/adminRoutes'));
app.use('/api/v1/doctor', require('./routes/doctorRoutes'));

// Wildcard route for serving index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build/index.html'));
  });
  

// Listen to the port
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server Running in ${process.env.NODE_ENV} Mode on port ${process.env.PORT}`.bgCyan.white);
});
