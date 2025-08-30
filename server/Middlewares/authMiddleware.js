const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    try {
        // Get token from header
        const token = req.header('Authorization')?.replace('Bearer ', '');
        
        if (!token) {
            return res.status(401).json({ 
                message: 'Access denied. No token provided.', 
                success: false 
            });
        }

        // Verify token
        const jwtSecret = process.env.JWT_SECRET || 'your-default-secret-key-here';
        const decoded = jwt.verify(token, jwtSecret);
        
        // Add user info to request
        req.user = decoded;
        next();
    } catch (error) {
        console.error('Auth middleware error:', error);
        return res.status(401).json({ 
            message: 'Invalid token.', 
            success: false 
        });
    }
};

module.exports = authMiddleware; 