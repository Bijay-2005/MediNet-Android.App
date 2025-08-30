const nodemailer = require('nodemailer');

// Email configuration
const emailConfig = {
    service: 'gmail', // You can change this to your email service
    auth: {
        user: process.env.EMAIL_USER || 'your-email@gmail.com',
        pass: process.env.EMAIL_PASSWORD || 'your-app-password'
    }
};

// Create transporter
const transporter = nodemailer.createTransport(emailConfig);

// Email templates
const emailTemplates = {
    loginOTP: (otp, userName) => ({
        subject: '🔐 Your Login OTP - HealthCare+',
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
                    <h1 style="margin: 0; font-size: 28px;">🏥 HealthCare+</h1>
                    <p style="margin: 10px 0 0 0; opacity: 0.9;">Your Health, Our Priority</p>
                </div>
                
                <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px;">
                    <h2 style="color: #333; margin-bottom: 20px;">🔐 Login Verification</h2>
                    
                    <p style="color: #666; line-height: 1.6; margin-bottom: 25px;">
                        Hello ${userName || 'there'},<br><br>
                        We received a login request for your HealthCare+ account. To complete your login, please use the verification code below:
                    </p>
                    
                    <div style="background: white; border: 2px dashed #667eea; border-radius: 10px; padding: 25px; text-align: center; margin: 25px 0;">
                        <div style="font-size: 32px; font-weight: bold; color: #667eea; letter-spacing: 8px; margin-bottom: 10px;">
                            ${otp}
                        </div>
                        <p style="color: #666; margin: 0; font-size: 14px;">Enter this code in the app to verify your login</p>
                    </div>
                    
                    <div style="background: #fff3cd; border: 1px solid #ffeaa7; border-radius: 8px; padding: 15px; margin: 20px 0;">
                        <p style="color: #856404; margin: 0; font-size: 14px;">
                            ⏰ <strong>Important:</strong> This code will expire in 5 minutes for your security.
                        </p>
                    </div>
                    
                    <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">
                        If you didn't request this login, please ignore this email and consider changing your password.
                    </p>
                    
                    <div style="text-align: center; margin-top: 30px;">
                        <p style="color: #999; font-size: 12px; margin: 0;">
                            This is an automated message, please do not reply to this email.
                        </p>
                    </div>
                </div>
            </div>
        `
    }),
    
    signupOTP: (otp, userName) => ({
        subject: '🎉 Welcome to HealthCare+ - Verify Your Account',
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
                    <h1 style="margin: 0; font-size: 28px;">🏥 HealthCare+</h1>
                    <p style="margin: 10px 0 0 0; opacity: 0.9;">Your Health, Our Priority</p>
                </div>
                
                <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px;">
                    <h2 style="color: #333; margin-bottom: 20px;">🎉 Welcome to HealthCare+!</h2>
                    
                    <p style="color: #666; line-height: 1.6; margin-bottom: 25px;">
                        Hello ${userName},<br><br>
                        Thank you for joining HealthCare+! To complete your account setup, please verify your email address using the code below:
                    </p>
                    
                    <div style="background: white; border: 2px dashed #667eea; border-radius: 10px; padding: 25px; text-align: center; margin: 25px 0;">
                        <div style="font-size: 32px; font-weight: bold; color: #667eea; letter-spacing: 8px; margin-bottom: 10px;">
                            ${otp}
                        </div>
                        <p style="color: #666; margin: 0; font-size: 14px;">Enter this code in the app to verify your account</p>
                    </div>
                    
                    <div style="background: #d4edda; border: 1px solid #c3e6cb; border-radius: 8px; padding: 15px; margin: 20px 0;">
                        <p style="color: #155724; margin: 0; font-size: 14px;">
                            ✅ <strong>Welcome aboard!</strong> You're just one step away from accessing all our health services.
                        </p>
                    </div>
                    
                    <div style="background: #fff3cd; border: 1px solid #ffeaa7; border-radius: 8px; padding: 15px; margin: 20px 0;">
                        <p style="color: #856404; margin: 0; font-size: 14px;">
                            ⏰ <strong>Important:</strong> This code will expire in 5 minutes for your security.
                        </p>
                    </div>
                    
                    <div style="text-align: center; margin-top: 30px;">
                        <p style="color: #999; font-size: 12px; margin: 0;">
                            Welcome to the HealthCare+ family! 🏥
                        </p>
                    </div>
                </div>
            </div>
        `
    })
};

// Email service functions
const emailService = {
    // Send OTP email
    sendOTP: async (email, otp, type = 'login', userName = '') => {
        try {
            const template = type === 'signup' ? emailTemplates.signupOTP(otp, userName) : emailTemplates.loginOTP(otp, userName);
            
            const mailOptions = {
                from: `"HealthCare+" <${emailConfig.auth.user}>`,
                to: email,
                subject: template.subject,
                html: template.html
            };
            
            const result = await transporter.sendMail(mailOptions);
            console.log('Email sent successfully:', result.messageId);
            return { success: true, messageId: result.messageId };
            
        } catch (error) {
            console.error('Email sending failed:', error);
            return { success: false, error: error.message };
        }
    },
    
    // Verify email configuration
    verifyConfig: async () => {
        try {
            await transporter.verify();
            console.log('Email configuration is valid');
            return { success: true };
        } catch (error) {
            console.error('Email configuration error:', error);
            return { success: false, error: error.message };
        }
    }
};

module.exports = emailService; 