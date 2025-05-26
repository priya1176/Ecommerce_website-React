const jwt = require('jsonwebtoken');

const JWT_SECRET = '1beecb1045bc0659'; 

// Generate JWT Token
const generateToken = (user) => {
    return jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });
};

// Verify JWT Token
const verifyToken = (token) => {
    return jwt.verify(token, JWT_SECRET);
};

module.exports = { generateToken, verifyToken };
