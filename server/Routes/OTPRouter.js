const express = require('express');
const router = express.Router();
const otpService = require('../utils/otpService');
const emailService = require('../utils/emailService');
const User = require('../Models/user');

// Send OTP for login
router.post('/send-login-otp', async (req, res) => {
    try {
        const { email } = req.body;
        
        if (!email) {
            return res.status(400).json({
                success: false,
                message: 'Email is required'
            });
        }
        
        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found. Please sign up first.',
                errorType: 'USER_NOT_FOUND'
            });
        }
        
        // Send OTP
        const result = await otpService.createAndSendOTP(email, 'login', user.name);
        
        if (result.success) {
            res.json({
                success: true,
                message: result.message,
                expiresIn: result.expiresIn
            });
        } else {
            res.status(400).json({
                success: false,
                message: result.message,
                errorType: result.errorType
            });
        }
        
    } catch (error) {
        console.error('Send login OTP error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to send OTP'
        });
    }
});

// Send OTP for signup
router.post('/send-signup-otp', async (req, res) => {
    try {
        const { email, name } = req.body;
        
        if (!email || !name) {
            return res.status(400).json({
                success: false,
                message: 'Email and name are required'
            });
        }
        
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'User already exists. Please login instead.',
                errorType: 'USER_EXISTS'
            });
        }
        
        // Send OTP
        const result = await otpService.createAndSendOTP(email, 'signup', name);
        
        if (result.success) {
            res.json({
                success: true,
                message: result.message,
                expiresIn: result.expiresIn
            });
        } else {
            res.status(400).json({
                success: false,
                message: result.message,
                errorType: result.errorType
            });
        }
        
    } catch (error) {
        console.error('Send signup OTP error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to send OTP'
        });
    }
});

// Verify OTP
router.post('/verify-otp', async (req, res) => {
    try {
        const { email, otp, type = 'login' } = req.body;
        
        if (!email || !otp) {
            return res.status(400).json({
                success: false,
                message: 'Email and OTP are required'
            });
        }
        
        // Verify OTP
        const result = await otpService.verifyOTP(email, otp, type);
        
        if (result.success) {
            res.json({
                success: true,
                message: result.message
            });
        } else {
            res.status(400).json({
                success: false,
                message: result.message,
                errorType: result.errorType
            });
        }
        
    } catch (error) {
        console.error('Verify OTP error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to verify OTP'
        });
    }
});

// Check OTP status
router.get('/otp-status/:email/:type', async (req, res) => {
    try {
        const { email, type } = req.params;
        
        if (!email || !type) {
            return res.status(400).json({
                success: false,
                message: 'Email and type are required'
            });
        }
        
        const result = await otpService.checkOTPStatus(email, type);
        res.json(result);
        
    } catch (error) {
        console.error('Check OTP status error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to check OTP status'
        });
    }
});

// Test email configuration
router.get('/test-email', async (req, res) => {
    try {
        const result = await emailService.verifyConfig();
        res.json(result);
    } catch (error) {
        console.error('Test email error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to test email configuration'
        });
    }
});

module.exports = router; 