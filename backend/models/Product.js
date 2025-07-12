const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  originalPrice: { type: Number },
  image: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  rating: { type: Number, default: 0 },
  reviews: { type: Number, default: 0 },
  badge: { type: String },
  features: [String],
  inStock: { type: Boolean, default: true },
  fastDelivery: { type: Boolean, default: false },
  inventory: { type: Number, default: 0 }
}, {
  timestamps: true
});

// Check if model already exists before creating
module.exports = mongoose.models.Product || mongoose.model('Product', productSchema);