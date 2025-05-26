const express = require('express');
const Customer = require('../models/Customer'); 
const router = express.Router();
const bcrypt = require('bcrypt');


router.post('/customers', async (req, res) => {
  try {
    const { username, email, phone, address, pin, password } = req.body;

    // Basic validation
    if (!username || !email || !phone || !address || !pin || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if the email already exists
    const existingCustomer = await Customer.findOne({ where: { email } });
    if (existingCustomer) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new customer
    const newCustomer = await Customer.create({
      username,
      email,
      phone,
      address,
      pin,
      password: hashedPassword // Store the hashed password
    });

    res.status(201).json({ message: 'Customer created successfully', customer: newCustomer });
  } catch (error) {
    // Handle different types of errors
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ message: 'Email already exists' });
    }
    res.status(500).json({ message: 'Error creating customer', error: error.message });
  }
});

module.exports = router;
