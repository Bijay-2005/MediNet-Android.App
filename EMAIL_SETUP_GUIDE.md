# 📧 Email Setup Guide for 2-Step Verification

This guide will help you set up email functionality for the OTP (One-Time Password) verification system.

## 🔧 Prerequisites

1. **Gmail Account** (or other email provider)
2. **App Password** (for Gmail)
3. **Node.js** and **npm** installed

## 📋 Step-by-Step Setup

### 1. Gmail App Password Setup

#### For Gmail Users:
1. Go to your Google Account settings: https://myaccount.google.com/
2. Navigate to **Security** → **2-Step Verification**
3. Enable 2-Step Verification if not already enabled
4. Go to **Security** → **App passwords**
5. Select **Mail** and **Other (Custom name)**
6. Enter a name like "HealthCare+ App"
7. Click **Generate**
8. **Copy the 16-character password** (you'll need this)

### 2. Environment Variables Setup

Create a `.env` file in the `server` directory:

```bash
# Server Configuration
PORT=3001
NODE_ENV=development

# Database Configuration
MONGODB_URI=your_mongodb_connection_string

# Email Configuration
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-16-character-app-password
```

### 3. Install Dependencies

```bash
cd server
npm install nodemailer
```

### 4. Test Email Configuration

Run the email test endpoint:

```bash
curl http://localhost:3000/otp/test-email
```

Or visit: `http://localhost:3000/otp/test-email` in your browser.

## 🔍 Alternative Email Providers

### For Outlook/Hotmail:
```javascript
// In server/utils/emailService.js
const emailConfig = {
    service: 'outlook',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
};
```

### For Yahoo:
```javascript
const emailConfig = {
    service: 'yahoo',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
};
```

### For Custom SMTP:
```javascript
const emailConfig = {
    host: 'smtp.your-provider.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
};
```

## 🚀 Testing the OTP System

### 1. Start the Server
```bash
cd server
npm start
```

### 2. Test OTP Endpoints

#### Send Login OTP:
```bash
curl -X POST http://localhost:3000/otp/send-login-otp \
  -H "Content-Type: application/json" \
  -d '{"email": "your-email@example.com"}'
```

#### Send Signup OTP:
```bash
curl -X POST http://localhost:3000/otp/send-signup-otp \
  -H "Content-Type: application/json" \
  -d '{"email": "your-email@example.com", "name": "John Doe"}'
```

#### Verify OTP:
```bash
curl -X POST http://localhost:3000/otp/verify-otp \
  -H "Content-Type: application/json" \
  -d '{"email": "your-email@example.com", "otp": "123456", "type": "login"}'
```

## 🔒 Security Features

### OTP Configuration:
- **Length**: 6 digits
- **Expiry**: 5 minutes
- **Rate Limiting**: 1 minute cooldown between requests
- **Auto-cleanup**: Expired OTPs are automatically deleted

### Email Templates:
- Professional HTML templates
- Branded with HealthCare+ styling
- Clear instructions and security warnings
- Mobile-responsive design

## 🐛 Troubleshooting

### Common Issues:

1. **"Invalid credentials" error**
   - Check your app password is correct
   - Ensure 2-Step Verification is enabled
   - Verify email address is correct

2. **"Connection timeout" error**
   - Check your internet connection
   - Verify firewall settings
   - Try different email provider

3. **"Rate limit exceeded" error**
   - Wait 1 minute before requesting another OTP
   - Check for existing unused OTPs

4. **Email not received**
   - Check spam/junk folder
   - Verify email address is correct
   - Check email provider settings

### Debug Commands:

```bash
# Check server logs
cd server && npm start

# Test email configuration
curl http://localhost:3000/otp/test-email

# Check OTP status
curl http://localhost:3000/otp/otp-status/your-email@example.com/login
```

## 📱 Frontend Integration

The OTP system is fully integrated with the frontend:

1. **Login Flow**: User enters credentials → OTP sent → User verifies OTP → Access granted
2. **Signup Flow**: User registers → OTP sent → User verifies OTP → Account created
3. **Resend Functionality**: Users can request new OTPs with rate limiting
4. **Timer Display**: Shows countdown for OTP expiration
5. **Error Handling**: Clear error messages for all scenarios

## 🔄 Next Steps

Once email is configured:

1. **Test the complete flow** in the frontend
2. **Customize email templates** if needed
3. **Adjust OTP settings** (expiry time, length, etc.)
4. **Monitor email delivery** and adjust settings
5. **Set up production email service** (SendGrid, AWS SES, etc.)

## 📞 Support

If you encounter issues:

1. Check the server logs for detailed error messages
2. Verify your email configuration
3. Test with a different email provider
4. Check the troubleshooting section above

---

**Note**: For production use, consider using a professional email service like SendGrid, AWS SES, or Mailgun for better deliverability and monitoring. 