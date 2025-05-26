const express = require('express');
const authMiddleware = require('../middleware/auth');
const router = express.Router();

// Protected Route Example
router.get('/products', authMiddleware, (req, res) => {
    res.json({ message: 'Welcome to the protected dashboard', user: req.user });
});

module.exports = router;
