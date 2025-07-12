const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  productId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Product', 
    required: true 
  },
  title: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true }
});

const orderSchema = new mongoose.Schema({
  orderNumber: { type: String, unique: true, required: true },
  customerInfo: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true }
  },
  items: [orderItemSchema],
  totalAmount: { type: Number, required: true },
  status: { 
    type: String, 
    enum: ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'],
    default: 'confirmed'
  }
}, {
  timestamps: true
});

// Check if model already exists before creating
module.exports = mongoose.models.Order || mongoose.model('Order', orderSchema);