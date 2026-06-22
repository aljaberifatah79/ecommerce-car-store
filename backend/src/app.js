const express = require('express');
const app = express();
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

// Middleware
app.use(helmet()); // Security headers
app.use(cors()); // Cross-Origin Resource Sharing
app.use(morgan('combined')); // Logging
app.use(express.json()); // JSON parser
app.use(express.urlencoded({ extended: true })); // URL parser

// Health check
app.get('/api/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

// API Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/categories', require('./routes/categoryRoutes'));
app.use('/api/cart', require('./routes/cartRoutes'));
app.use('/api/payments', require('./routes/paymentRoutes'));

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ 
    success: false,
    message: 'الصفحة غير موجودة' 
  });
});

// Error Handler
const { errorHandler } = require('./middleware/errorMiddleware');
app.use(errorHandler);

module.exports = app;
