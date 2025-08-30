# Authentication Flow Documentation

## Overview

This document describes the enhanced authentication system that implements the following user flow:

1. **Login Success**: If client login succeeds with server auth users DB → open the main page
2. **Login Failure**: If login fails → show signup section first for new users
3. **After Signup**: After successful signup → redirect to login with pre-filled email
4. **Login Failure Again**: If login fails again → show "password or email is incorrect"

## Flow Implementation

### 1. Login Attempt
- User enters email and password
- System validates against server database
- **Success**: User is logged in and redirected to main page
- **Failure**: System checks error type and responds accordingly

### 2. Error Handling
- **USER_NOT_FOUND**: Shows "Account not found. Please sign up first." and automatically switches to signup form
- **INVALID_PASSWORD**: Shows "Email or password is incorrect" and stays on login form
- **USER_EXISTS** (during signup): Shows "User already exists. Please login instead." and switches to login form

### 3. Signup Process
- User fills out registration form (name, email, password, confirm password)
- System validates input and checks for existing users
- **Success**: Shows success message and automatically switches to login form with pre-filled email
- **Failure**: Shows appropriate error message

### 4. Login Attempt Counter
- System tracks login attempts
- After 3+ failed attempts, suggests signing up if user doesn't have an account
- Counter resets on successful login

## Server-Side Implementation

### Enhanced Error Messages
```javascript
// Login errors
if (!user) {
    return res.status(403).json({ 
        message: 'Account not found. Please sign up first.', 
        success: false,
        errorType: 'USER_NOT_FOUND'
    });
}

if (!isPassEqual) {
    return res.status(403).json({ 
        message: 'Email or password is incorrect', 
        success: false,
        errorType: 'INVALID_PASSWORD'
    });
}

// Signup errors
if (existingUser) {
    return res.status(409).json({ 
        message: 'User already exists. Please login instead.', 
        success: false,
        errorType: 'USER_EXISTS'
    });
}
```

### Protected Routes
- Added JWT middleware for route protection
- `/server/profile` endpoint requires valid authentication token
- Returns user profile data for authenticated requests

## Client-Side Implementation

### Enhanced UI Features
- **Visual Error Display**: Errors are shown in prominent red boxes
- **Success Messages**: Success states are shown in green boxes
- **Login Attempt Counter**: Shows current attempt number and suggestions
- **Auto-switching**: Automatically switches between login/signup based on errors
- **Pre-filled Forms**: Email is pre-filled when switching from signup to login

### Error Handling
```javascript
// Login error handling
if (response.errorType === 'USER_NOT_FOUND') {
    setError('Account not found. Please sign up first.');
    setTimeout(() => {
        toggleForm(); // Switch to signup
    }, 2000);
} else {
    setError(response.message || 'Email or password is incorrect');
}

// Signup error handling
if (response.errorType === 'USER_EXISTS') {
    setError('User already exists. Please login instead.');
    setTimeout(() => {
        toggleForm(); // Switch to login
    }, 2000);
}
```

## API Endpoints

### Authentication Endpoints
- `POST /server/signup` - User registration
- `POST /server/login` - User authentication
- `GET /server/profile` - Get user profile (protected)

### Request/Response Examples

#### Signup Request
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

#### Login Request
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

#### Success Response
```json
{
  "message": "Login successful",
  "success": true,
  "jwtToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "email": "john@example.com",
  "name": "John Doe",
  "_id": "507f1f77bcf86cd799439011"
}
```

#### Error Response
```json
{
  "message": "Account not found. Please sign up first.",
  "success": false,
  "errorType": "USER_NOT_FOUND"
}
```

## Security Features

### Password Security
- Passwords are hashed using bcrypt with salt rounds of 10
- Passwords are never stored in plain text
- Password comparison is done securely

### JWT Token Security
- Tokens expire after 24 hours
- Tokens are stored securely in localStorage
- Protected routes verify token validity

### Input Validation
- Email format validation
- Password strength requirements
- Name validation
- Server-side validation middleware

## Testing

### Manual Testing
1. Try to login with non-existent user → Should show signup suggestion
2. Sign up with new email → Should succeed and redirect to login
3. Login with correct credentials → Should succeed and access main page
4. Try to signup with existing email → Should show login suggestion
5. Login with wrong password → Should show "Email or password is incorrect"

### Automated Testing
Use the `AuthTest` component to run automated authentication flow tests:
- Tests non-existent user login
- Tests user signup
- Tests successful login
- Tests protected route access

## Usage

### Starting the Application
1. Start the server: `cd server && npm start` (runs on port 3000)
2. Start the client: `cd client && npm run dev` (runs on port 3000)
3. Access the application at `http://localhost:3000`

### Testing the Flow
1. Navigate to the login page
2. Try logging in with a non-existent account
3. Follow the prompts to sign up
4. Complete the signup process
5. Login with your new credentials
6. Verify you can access protected routes

## Troubleshooting

### Common Issues
1. **Server not running**: Ensure MongoDB is running and server is started on port 3000
2. **CORS errors**: Check that client (port 3000) and server (port 3000) ports are configured correctly
3. **JWT errors**: Verify JWT_SECRET environment variable is set
4. **Database connection**: Ensure MongoDB connection string is correct

### Debug Mode
Enable debug logging by setting environment variables:
```bash
DEBUG=true
LOG_LEVEL=debug
```

## Future Enhancements

### Planned Features
1. **Password Reset**: Email-based password recovery
2. **Email Verification**: Email confirmation for new accounts
3. **Social Login**: Google, Facebook integration
4. **Two-Factor Authentication**: SMS/Email 2FA
5. **Session Management**: Multiple device session handling
6. **Rate Limiting**: Prevent brute force attacks

### Security Improvements
1. **HTTPS**: Implement SSL/TLS encryption
2. **Rate Limiting**: Add request rate limiting
3. **Input Sanitization**: Enhanced input validation
4. **Audit Logging**: Track authentication events
5. **Account Lockout**: Temporary lockout after failed attempts 