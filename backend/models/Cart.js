const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  productId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Product', 
    required: true 
  },
  quantity: { 
    type: Number, 
    required: true, 
    min: 1,
    default: 1
  },
  price: { 
    type: Number, 
    required: true 
  }
});

const cartSchema = new mongoose.Schema({
  sessionId: { 
    type: String, 
    required: true, 
    unique: true 
  },
  items: [cartItemSchema],
  totalAmount: { 
    type: Number, 
    default: 0 
  }
}, {
  timestamps: true
});

// Check if model already exists before creating
module.exports = mongoose.models.Cart || mongoose.model('Cart', cartSchema);