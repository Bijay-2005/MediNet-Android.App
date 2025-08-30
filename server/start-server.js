// Server startup script with enhanced logging
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const AuthRouter = require('./Routes/AuthRouter');

require('dotenv').config();
require('./Models/db');
const PORT = process.env.PORT || 3001;

// Enhanced logging
console.log('🚀 Starting HealthCare+ Server...');
console.log('📊 Environment:', process.env.NODE_ENV || 'development');
console.log('🔌 Port:', PORT);
console.log('💾 MongoDB URL:', process.env.MONGODB_URI ? 'Connected' : 'Using default connection');

// Root route
app.get('/', (req, res) => {
    console.log('🏠 Root endpoint accessed');
    res.json({
        message: 'HealthCare+ Server API',
        status: 'running',
        version: '1.0.0',
        environment: process.env.NODE_ENV || 'development',
        endpoints: {
            health: '/ping',
            signup: 'POST /server/signup',
            login: 'POST /server/login'
        },
        timestamp: new Date().toISOString()
    });
});

app.get('/ping', (req, res) => {
    console.log('📡 Ping received');
    res.json({ message: 'PONG', timestamp: new Date().toISOString(), status: 'healthy' });
});

// Middleware
app.use(bodyParser.json());
app.use(cors({
    origin: ['http://localhost:3001', 'http://localhost:5173'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Enhanced request logging
app.use((req, res, next) => {
    const timestamp = new Date().toISOString();
    console.log(`🌐 ${timestamp} - ${req.method} ${req.url}`);
    if (req.body && Object.keys(req.body).length > 0) {
        console.log('📝 Request body:', JSON.stringify(req.body, null, 2));
    }
    next();
});

// Routes
app.use('/server', AuthRouter);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('❌ Server error:', err);
    res.status(500).json({ 
        message: 'Internal server error', 
        success: false,
        timestamp: new Date().toISOString()
    });
});

// 404 handler
app.use('*', (req, res) => {
    console.log(`❓ 404 - Route not found: ${req.method} ${req.originalUrl}`);
    res.status(404).json({ 
        message: 'Route not found', 
        success: false,
        availableRoutes: ['/ping', '/server/signup', '/server/login']
    });
});

app.listen(PORT, () => {
    console.log('✅ Server is running successfully!');
    console.log(`🌍 Server URL: http://localhost:${PORT}`);
    console.log('📋 Available endpoints:');
    console.log('   - GET  /ping');
    console.log('   - POST /server/signup');
    console.log('   - POST /server/login');
    console.log('🔄 Ready to accept requests...\n');
});