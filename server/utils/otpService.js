const OTP = require('../Models/otp');
const emailService = require('./emailService');

// OTP configuration
const OTP_CONFIG = {
    LENGTH: 6,
    EXPIRY_MINUTES: 5,
    MAX_ATTEMPTS: 3,
    RESEND_COOLDOWN_MINUTES: 1
};

// OTP service functions
const otpService = {
    // Generate a random OTP
    generateOTP: () => {
        return Math.floor(100000 + Math.random() * 900000).toString();
    },
    
    // Create and send OTP
    createAndSendOTP: async (email, type = 'login', userName = '') => {
        try {
            // Check for recent OTP requests (rate limiting)
            const recentOTP = await OTP.findOne({
                email,
                type,
                createdAt: { $gte: new Date(Date.now() - OTP_CONFIG.RESEND_COOLDOWN_MINUTES * 60 * 1000) },
                isUsed: false
            });
            
            if (recentOTP) {
                const timeLeft = Math.ceil((recentOTP.createdAt.getTime() + OTP_CONFIG.RESEND_COOLDOWN_MINUTES * 60 * 1000 - Date.now()) / 1000);
                return {
                    success: false,
                    message: `Please wait ${timeLeft} seconds before requesting another OTP`,
                    errorType: 'RATE_LIMIT'
                };
            }
            
            // Invalidate any existing unused OTPs for this email and type
            await OTP.updateMany(
                { email, type, isUsed: false },
                { isUsed: true }
            );
            
            // Generate new OTP
            const otp = otpService.generateOTP();
            const expiresAt = new Date(Date.now() + OTP_CONFIG.EXPIRY_MINUTES * 60 * 1000);
            
            // Save OTP to database
            const otpRecord = new OTP({
                email,
                otp,
                type,
                expiresAt
            });
            
            await otpRecord.save();
            
            // Send OTP via email
            const emailResult = await emailService.sendOTP(email, otp, type, userName);
            
            if (emailResult.success) {
                console.log(`OTP sent successfully to ${email} for ${type}`);
                return {
                    success: true,
                    message: `OTP sent to ${email}`,
                    expiresIn: OTP_CONFIG.EXPIRY_MINUTES * 60 // seconds
                };
            } else {
                // If email fails, delete the OTP record
                await OTP.findByIdAndDelete(otpRecord._id);
                return {
                    success: false,
                    message: 'Failed to send OTP email',
                    error: emailResult.error
                };
            }
            
        } catch (error) {
            console.error('Error creating OTP:', error);
            return {
                success: false,
                message: 'Failed to create OTP',
                error: error.message
            };
        }
    },
    
    // Verify OTP
    verifyOTP: async (email, otp, type = 'login') => {
        try {
            // Find the OTP record
            const otpRecord = await OTP.findOne({
                email,
                otp,
                type,
                isUsed: false,
                expiresAt: { $gt: new Date() }
            });
            
            if (!otpRecord) {
                return {
                    success: false,
                    message: 'Invalid or expired OTP',
                    errorType: 'INVALID_OTP'
                };
            }
            
            // Mark OTP as used
            otpRecord.isUsed = true;
            await otpRecord.save();
            
            console.log(`OTP verified successfully for ${email}`);
            return {
                success: true,
                message: 'OTP verified successfully'
            };
            
        } catch (error) {
            console.error('Error verifying OTP:', error);
            return {
                success: false,
                message: 'Failed to verify OTP',
                error: error.message
            };
        }
    },
    
    // Check OTP status (for frontend polling)
    checkOTPStatus: async (email, type = 'login') => {
        try {
            const otpRecord = await OTP.findOne({
                email,
                type,
                isUsed: false,
                expiresAt: { $gt: new Date() }
            }).sort({ createdAt: -1 });
            
            if (!otpRecord) {
                return {
                    success: false,
                    message: 'No active OTP found',
                    errorType: 'NO_OTP'
                };
            }
            
            const timeLeft = Math.ceil((otpRecord.expiresAt.getTime() - Date.now()) / 1000);
            
            return {
                success: true,
                hasActiveOTP: true,
                expiresIn: timeLeft,
                createdAt: otpRecord.createdAt
            };
            
        } catch (error) {
            console.error('Error checking OTP status:', error);
            return {
                success: false,
                message: 'Failed to check OTP status',
                error: error.message
            };
        }
    },
    
    // Clean up expired OTPs (can be called periodically)
    cleanupExpiredOTPs: async () => {
        try {
            const result = await OTP.deleteMany({
                expiresAt: { $lt: new Date() }
            });
            
            console.log(`Cleaned up ${result.deletedCount} expired OTPs`);
            return result.deletedCount;
            
        } catch (error) {
            console.error('Error cleaning up expired OTPs:', error);
            return 0;
        }
    }
};

module.exports = otpService; 