const express = require('express');
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const router = express.Router();

router.get('/get/:sessionId', async (req, res) => {
  try {
    const cart = await Cart.findOne({ sessionId: req.params.sessionId })
                          .populate('items.productId');
    
    if (!cart) {
      return res.json({ 
        sessionId: req.params.sessionId,
        items: [], 
        totalAmount: 0 
      });
    }
    
    console.log(`✅ Found cart for session ${req.params.sessionId} with ${cart.items.length} items`);
    res.json(cart);
  } catch (error) {
    console.error('❌ Error fetching cart:', error);
    res.status(500).json({ message: error.message });
  }
});

router.post('/add/:sessionId', async (req, res) => {
  try {
    const { productId, quantity = 1, price } = req.body;
    const sessionId = req.params.sessionId;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    if (!product.inStock) {
      return res.status(400).json({ message: 'Product is out of stock' });
    }

    let cart = await Cart.findOne({ sessionId });
    
    if (!cart) {
      cart = new Cart({ 
        sessionId, 
        items: [],
        totalAmount: 0
      });
    }

    const existingItemIndex = cart.items.findIndex(item => 
      item.productId.toString() === productId
    );

    if (existingItemIndex > -1) {
      cart.items[existingItemIndex].quantity += quantity;
    } else {
      cart.items.push({
        productId,
        quantity,
        price: price || product.price
      });
    }
    cart.totalAmount = cart.items.reduce((total, item) => 
      total + (item.price * item.quantity), 0
    );

    await cart.save();
    await cart.populate('items.productId');
    
    console.log(`✅ Added product to cart: ${product.title}`);
    res.json(cart);
  } catch (error) {
    console.error('❌ Error adding to cart:', error);
    res.status(500).json({ message: error.message });
  }
});

router.put('/update/:sessionId', async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const sessionId = req.params.sessionId;

    const cart = await Cart.findOne({ sessionId });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    if (quantity <= 0) {
      cart.items = cart.items.filter(item => 
        item.productId.toString() !== productId
      );
    } else {
      const itemIndex = cart.items.findIndex(item => 
        item.productId.toString() === productId
      );

      if (itemIndex === -1) {
        return res.status(404).json({ message: 'Item not found in cart' });
      }

      cart.items[itemIndex].quantity = quantity;
    }

    cart.totalAmount = cart.items.reduce((total, item) => 
      total + (item.price * item.quantity), 0
    );

    await cart.save();
    await cart.populate('items.productId');
    
    res.json(cart);
  } catch (error) {
    console.error(' Error updating cart:', error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;