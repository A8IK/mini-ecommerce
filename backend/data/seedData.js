const mongoose = require('mongoose');
const Product = require('../models/Product');
const dotenv = require('dotenv');

dotenv.config();

const products = [
  {
    title: "AirPods Pro Max",
    price: 549.99,
    originalPrice: 599.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=400&fit=crop",
    description: "Experience unparalleled sound quality with our premium wireless headphones featuring active noise cancellation, spatial audio, and all-day battery life. Crafted with aerospace-grade materials for ultimate comfort and durability.",
    category: "Audio",
    rating: 4.8,
    reviews: 2847,
    badge: "Bestseller",
    features: ["Active Noise Cancellation", "30-hour battery", "Spatial Audio", "Premium Build"],
    inStock: true,
    fastDelivery: true,
    inventory: 50
  },
  {
    title: "Apple Watch Ultra",
    price: 799.99,
    originalPrice: 849.99,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=400&fit=crop",
    description: "The most advanced smartwatch ever created. Built for extreme conditions with titanium case, precision GPS, and comprehensive health monitoring. Your ultimate companion for fitness and adventure.",
    category: "Wearables",
    rating: 4.9,
    reviews: 1523,
    badge: "Premium",
    features: ["Titanium Case", "GPS Precision", "Health Monitoring", "Water Resistant"],
    inStock: true,
    fastDelivery: true,
    inventory: 30
  },
  {
    title: "Herman Miller Aeron",
    price: 1395.99,
    originalPrice: 1495.99,
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=400&fit=crop",
    description: "Revolutionary ergonomic office chair designed by world-class engineers. Features advanced PostureFit technology, breathable mesh design, and 12-year warranty. The gold standard of office seating.",
    category: "Furniture",
    rating: 4.7,
    reviews: 892,
    badge: "Editor's Choice",
    features: ["PostureFit Technology", "Breathable Mesh", "12-Year Warranty", "Ergonomic Design"],
    inStock: true,
    fastDelivery: false,
    inventory: 15
  },
  {
    title: "Breville Bambino Plus",
    price: 199.99,
    originalPrice: 249.99,
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&h=400&fit=crop",
    description: "Professional-grade espresso machine in a compact design. Features automatic milk texturing, pre-infusion technology, and cafe-quality extraction. Perfect for the home barista.",
    category: "Kitchen",
    rating: 4.6,
    reviews: 1204,
    badge: "New",
    features: ["Auto Milk Texturing", "Pre-infusion Tech", "Compact Design", "Professional Grade"],
    inStock: true,
    fastDelivery: true,
    inventory: 25
  },
  {
    title: "Keychron K8 Pro",
    price: 199.99,
    originalPrice: 229.99,
    image: "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=600&h=400&fit=crop",
    description: "Ultimate wireless mechanical keyboard with hot-swappable switches, premium aluminum construction, and customizable RGB lighting. Engineered for professionals and enthusiasts alike.",
    category: "Tech",
    rating: 4.8,
    reviews: 3421,
    badge: "Hot",
    features: ["Hot-Swappable", "Aluminum Build", "RGB Lighting", "Wireless"],
    inStock: true,
    fastDelivery: true,
    inventory: 40
  },
  {
    title: "Peak Design Everyday",
    price: 279.99,
    originalPrice: 299.99,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&h=400&fit=crop",
    description: "Award-winning camera bag that adapts to any adventure. Features weatherproof construction, modular organization system, and lifetime warranty. Trusted by professional photographers worldwide.",
    category: "Bags",
    rating: 4.9,
    reviews: 756,
    badge: "Award Winner",
    features: ["Weatherproof", "Modular System", "Lifetime Warranty", "Professional Grade"],
    inStock: false,
    fastDelivery: false,
    inventory: 0
  }
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');
    
    // Clear existing products
    await Product.deleteMany({});
    console.log('Cleared existing products');
    
    // Insert new products
    const insertedProducts = await Product.insertMany(products);
    console.log(`✅ ${insertedProducts.length} products seeded successfully`);
    
    console.log('Seeded products:');
    insertedProducts.forEach(product => {
      console.log(`- ${product.title} (${product.category})`);
    });
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();