const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require("../Models/user");


const signup = async (req, res) => {
    try {
        console.log('Signup request received:', req.body);
        const { name, email, password } = req.body;
        
        // Check if user already exists
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            console.log('User already exists:', email);
            return res.status(409)
                .json({ 
                    message: 'User already exists. Please login instead.', 
                    success: false,
                    errorType: 'USER_EXISTS'
                });
        }
        
        // Create new user
        const userModel = new UserModel({ name, email, password });
        userModel.password = await bcrypt.hash(password, 10);
        const savedUser = await userModel.save();
        
        console.log('User created successfully:', savedUser.email);
        res.status(201)
            .json({
                message: "Signup successful",
                success: true
            })
    } catch (err) {
        console.error('Signup error:', err);
        res.status(500)
            .json({
                message: "Internal server error",
                success: false
            })
    }
}


const login = async (req, res) => {
    try {
        console.log('Login request received:', req.body);
        const { email, password } = req.body;
        
        // Find user in database
        const user = await UserModel.findOne({ email });
        
        if (!user) {
            console.log('User not found:', email);
            return res.status(403)
                .json({ 
                    message: 'Account not found. Please sign up first.', 
                    success: false,
                    errorType: 'USER_NOT_FOUND'
                });
        }
        
        // Compare password
        const isPassEqual = await bcrypt.compare(password, user.password);
        if (!isPassEqual) {
            console.log('Password mismatch for user:', email);
            return res.status(403)
                .json({ 
                    message: 'Email or password is incorrect', 
                    success: false,
                    errorType: 'INVALID_PASSWORD'
                });
        }
        
        // Generate JWT token
        const jwtSecret = process.env.JWT_SECRET || 'your-default-secret-key-here';
        const jwtToken = jwt.sign(
            { email: user.email, _id: user._id },
            jwtSecret,
            { expiresIn: '24h' }
        )

        console.log('Login successful for user:', email);
        res.status(200)
            .json({
                message: "Login successful",
                success: true,
                jwtToken,
                email: user.email,
                name: user.name,
                _id: user._id
            })
    } catch (err) {
        console.error('Login error:', err);
        res.status(500)
            .json({
                message: "Internal server error",
                success: false
            })
    }
}

const getProfile = async (req, res) => {
    try {
        // User info is available from auth middleware
        const user = await UserModel.findById(req.user._id).select('-password');
        
        if (!user) {
            return res.status(404).json({ 
                message: 'User not found', 
                success: false 
            });
        }

        res.status(200).json({
            message: 'Profile retrieved successfully',
            success: true,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email
            }
        });
    } catch (err) {
        console.error('Get profile error:', err);
        res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};

module.exports = {
    signup,
    login,
    getProfile
}