const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const AuthRouter = require('./Routes/AuthRouter');
const OTPRouter = require('./Routes/OTPRouter');
const AppointmentRouter = require('./Routes/AppointmentRouter');

require('dotenv').config();
require('./Models/db');
const PORT = process.env.PORT || 3001

// CORS configuration - more permissive for development
app.use(cors({
    origin: true, // Allow all origins in development
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

// Body parser middleware
app.use(bodyParser.json());

// Add request logging middleware
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url} - Origin: ${req.headers.origin || 'unknown'}`);
    next();
});

// Root route
app.get('/', (req, res) => {
    res.json({
        message: 'HealthCare+ Server API',
        status: 'running',
        version: '1.0.0',
        endpoints: {
            health: '/ping',
            signup: 'POST /server/signup',
            login: 'POST /server/login',
            otp: {
                sendLoginOTP: 'POST /otp/send-login-otp',
                sendSignupOTP: 'POST /otp/send-signup-otp',
                verifyOTP: 'POST /otp/verify-otp',
                checkStatus: 'GET /otp/otp-status/:email/:type'
            },
            appointments: {
                create: 'POST /appointments/create',
                getUserAppointments: 'GET /appointments/user',
                getAppointmentById: 'GET /appointments/:id',
                updateStatus: 'PATCH /appointments/:id/status',
                cancel: 'PATCH /appointments/:id/cancel'
            }
        },
        timestamp: new Date().toISOString()
    });
});

// Health check endpoint
app.get('/ping', (req, res) => {
    console.log('Health check requested from:', req.headers.origin);
    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.status(200).send('PONG');
});

// Test endpoint for debugging
app.get('/test', (req, res) => {
    console.log('Test endpoint requested from:', req.headers.origin);
    res.json({
        success: true,
        message: 'Server is working!',
        timestamp: new Date().toISOString(),
        origin: req.headers.origin
    });
});

// Email test endpoint
app.get('/test-email', async (req, res) => {
    try {
        const emailService = require('./utils/emailService');
        const result = await emailService.verifyConfig();
        
        if (result.success) {
            res.json({
                success: true,
                message: 'Email configuration is valid!',
                config: {
                    user: process.env.EMAIL_USER || 'Not configured',
                    service: 'gmail'
                }
            });
        } else {
            res.status(500).json({
                success: false,
                message: 'Email configuration error',
                error: result.error
            });
        }
    } catch (error) {
        console.error('Email test error:', error);
        res.status(500).json({
            success: false,
            message: 'Email test failed',
            error: error.message
        });
    }
});

// OPTIONS handler for CORS preflight requests
app.options('*', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
    res.status(200).send();
});

// Serve static files
app.use(express.static('public'));

// Routes
app.use('/server', AuthRouter);
app.use('/otp', OTPRouter);
app.use('/appointments', AppointmentRouter);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Server error:', err);
    res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
    });
});

// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({
        success: false,
        message: 'Endpoint not found',
        path: req.originalUrl
    });
});

app.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 Server is running on http://0.0.0.0:${PORT}`);
    console.log(`📡 Health check available at http://0.0.0.0:${PORT}/ping`);
    console.log(`🔗 API endpoints available at http://0.0.0.0:${PORT}/server`);
    console.log(`📧 OTP endpoints available at http://0.0.0.0:${PORT}/otp`);
    console.log(`🏥 Appointment endpoints available at http://0.0.0.0:${PORT}/appointments`);
  });
  



