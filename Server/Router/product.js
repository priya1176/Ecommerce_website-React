const express = require('express');
const router = express.Router();
const Product = require('../models/Product'); // Adjust the path as necessary

// POST route to create a new product
router.post('/products', async (req, res) => {
  try {
    const {
      title,
      category,
      brand,
      price,
      color,
      image,
      description,
      productID,
      stockQuantity,
      sku,
      rating,
      isFeatured,
    } = req.body;

    // Basic validation
    if (!title || !category || !brand || !price || !productID) {
      return res.status(400).json({ message: 'Title, category, brand, price, and productID are required' });
    }

    // Create a new product record
    const newProduct = await Product.create({
      title,
      category,
      brand,
      price,
      color,
      image,
      description,
      productID,
      stockQuantity,
      sku,
      rating,
      isFeatured,
    });
    
    res.status(201).json({ message: 'Product created successfully', product: newProduct });
  } catch (error) {
    // Handle different types of errors
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ message: 'Product ID already exists' });
    }
    res.status(500).json({ message: 'Error creating product', error: error.message });
  }
});

// GET route to fetch all products
router.get('/products', async (req, res) => {
  try {
    // Fetch all products from the database
    const products = await Product.findAll();
    
    // Send the products as a JSON response
    res.status(200).json({
      success: true,
      data: products
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({
      success: false,
      message: 'Server error. Please try again later.',
    });
  }
});

module.exports = router;
