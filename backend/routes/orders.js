const express = require('express');
const Order = require('../models/Order');
const Cart = require('../models/Cart');
const router = express.Router();

// Create new order
router.post('/create', async (req, res) => {
  try {
    const { sessionId, customerInfo } = req.body;
    
    // Get cart
    const cart = await Cart.findOne({ sessionId }).populate('items.productId');
    
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    // Generate order number
    const orderNumber = 'ORD' + Date.now() + Math.random().toString(36).substr(2, 5).toUpperCase();

    // Create order items
    const orderItems = cart.items.map(item => ({
      productId: item.productId._id,
      title: item.productId.title,
      price: item.price,
      quantity: item.quantity
    }));

    // Create order
    const order = new Order({
      orderNumber,
      customerInfo,
      items: orderItems,
      totalAmount: cart.totalAmount,
      status: 'confirmed'
    });

    await order.save();

    await Cart.findOneAndDelete({ sessionId });

    console.log(' Order created:', orderNumber);
    res.status(201).json({
      message: 'Order placed successfully!',
      order
    });
  } catch (error) {
    console.error(' Error creating order:', error);
    res.status(500).json({ message: error.message });
  }
});

router.get('/get/:orderNumber', async (req, res) => {
  try {
    const order = await Order.findOne({ orderNumber: req.params.orderNumber })
                            .populate('items.productId');
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    res.json(order);
  } catch (error) {
    console.error(' Error fetching order:', error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;