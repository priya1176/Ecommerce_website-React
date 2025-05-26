const jwt = require('jsonwebtoken');
const { verifyToken } = require('../utils/jwt');

const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        const decoded = verifyToken(token);
        req.user = decoded; // Add user info to request object
        next();
    } catch (err) {
        res.status(401).json({ message: 'Invalid token' });
    }
};

module.exports = authMiddleware;
