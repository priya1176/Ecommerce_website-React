const express = require('express');
const bcrypt = require('bcryptjs');
const Users = require('../models/Customer'); 
const { generateToken } = require('../utils/jwt');
const router = express.Router();

router.post('/users', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await Users.findOne({ where: { email } });
        console.log(user); // Log the user object to check if it's found


        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        user.lastLogin = new Date();
        await user.save();

        const token = generateToken(user);
        res.json({ token, message: 'Login successful',username: user.username });

    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

module.exports = router;
