const express = require('express');
const Product = require('../models/Product');
const mongoose = require('mongoose');
const router = express.Router();

// GET /api/products - Fetch from MongoDB
router.get('/', async (req, res) => {
  try {
    // Check MongoDB connection
    if (mongoose.connection.readyState !== 1) {
      return res.status(500).json({ 
        message: 'Database not connected',
        mongoStatus: 'disconnected'
      });
    }

    const { category, search } = req.query;
    let query = {};
    
    if (category && category !== 'All') {
      query.category = category;
    }
    
    if (search) {
      query.title = { $regex: search, $options: 'i' };
    }
    
    console.log('🔍 Fetching from MongoDB with query:', query);
    
    const products = await Product.find(query);
    
    console.log(`✅ Found ${products.length} products from MongoDB`);
    
    if (products.length === 0) {
      return res.json({ 
        products: [],
        message: 'No products found. Run npm run seed to populate database.'
      });
    }
    
    res.json({ products });
    
  } catch (error) {
    console.error('❌ MongoDB Error:', error.message);
    res.status(500).json({ 
      message: 'Database error: ' + error.message,
      suggestion: 'Check MongoDB connection and run npm run seed'
    });
  }
});

// GET /api/products/single/:id - Get single product from MongoDB
router.get('/single/:id', async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(500).json({ message: 'Database not connected' });
    }

    console.log('🔍 Fetching product by ID:', req.params.id);
    
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    console.log('✅ Found product:', product.title);
    res.json(product);
    
  } catch (error) {
    console.error('❌ Error fetching product:', error);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Invalid product ID' });
    }
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;