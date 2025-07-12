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
    description: "Experience unparalleled sound quality with our premium wireless headphones featuring active noise cancellation, spatial audio, and all-day battery life.",
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
    description: "The most advanced smartwatch ever created. Built for extreme conditions with titanium case, precision GPS, and comprehensive health monitoring.",
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
    description: "Revolutionary ergonomic office chair designed by world-class engineers. Features advanced PostureFit technology and 12-year warranty.",
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
    description: "Professional-grade espresso machine in a compact design. Features automatic milk texturing and cafe-quality extraction.",
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
    description: "Ultimate wireless mechanical keyboard with hot-swappable switches and premium aluminum construction.",
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
    description: "Award-winning camera bag that adapts to any adventure. Features weatherproof construction and lifetime warranty.",
    category: "Bags",
    rating: 4.9,
    reviews: 756,
    badge: "Award Winner",
    features: ["Weatherproof", "Modular System", "Lifetime Warranty", "Professional Grade"],
    inStock: false,
    fastDelivery: false,
    inventory: 0
  },

  {
    title: "Sony WH-1000XM5",
    price: 399.99,
    originalPrice: 429.99,
    image: "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=600&h=400&fit=crop",
    description: "Industry-leading noise canceling headphones with exceptional sound quality and 30-hour battery life.",
    category: "Audio",
    rating: 4.7,
    reviews: 1834,
    badge: "Bestseller",
    features: ["Industry-Leading ANC", "30-hour battery", "Quick Charge", "Premium Comfort"],
    inStock: true,
    fastDelivery: true,
    inventory: 35
  },
  {
    title: "iPad Pro 12.9",
    price: 1099.99,
    originalPrice: 1199.99,
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=600&h=400&fit=crop",
    description: "The ultimate iPad experience with M2 chip, Liquid Retina XDR display, and all-day battery life.",
    category: "Tech",
    rating: 4.9,
    reviews: 2456,
    badge: "Premium",
    features: ["M2 Chip", "Liquid Retina XDR", "Apple Pencil Support", "All-day Battery"],
    inStock: true,
    fastDelivery: true,
    inventory: 20
  },
  {
    title: "Steelcase Leap V2",
    price: 899.99,
    originalPrice: 999.99,
    image: "https://images.unsplash.com/photo-1549497538-303791108f95?w=600&h=400&fit=crop",
    description: "Award-winning ergonomic chair with LiveBack technology that adjusts to your spine's natural movement.",
    category: "Furniture",
    rating: 4.6,
    reviews: 1123,
    badge: "Hot",
    features: ["LiveBack Technology", "4D Arms", "Weight-Activated Mechanism", "12-Year Warranty"],
    inStock: true,
    fastDelivery: false,
    inventory: 18
  },
  {
    title: "KitchenAid Stand Mixer",
    price: 379.99,
    originalPrice: 429.99,
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop",
    description: "Iconic stand mixer with 10-speed slide control and tilt-head design for easy ingredient addition.",
    category: "Kitchen",
    rating: 4.8,
    reviews: 3567,
    badge: "Editor's Choice",
    features: ["10-Speed Control", "Tilt-Head Design", "Multiple Attachments", "Durable Construction"],
    inStock: true,
    fastDelivery: true,
    inventory: 42
  },
  {
    title: "MacBook Air M2",
    price: 1199.99,
    originalPrice: 1299.99,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&h=400&fit=crop",
    description: "Supercharged by M2 chip with incredible performance, exceptional battery life, and stunning Liquid Retina display.",
    category: "Tech",
    rating: 4.9,
    reviews: 1876,
    badge: "New",
    features: ["M2 Chip", "18-hour Battery", "Liquid Retina Display", "MagSafe Charging"],
    inStock: true,
    fastDelivery: true,
    inventory: 28
  },
  {
    title: "Tumi Alpha 3 Backpack",
    price: 495.99,
    originalPrice: 545.99,
    image: "https://images.unsplash.com/photo-1581605405669-fcdf81165afa?w=600&h=400&fit=crop",
    description: "Premium business backpack with expandable organization, laptop protection, and weather-resistant exterior.",
    category: "Bags",
    rating: 4.7,
    reviews: 789,
    badge: "Premium",
    features: ["Expandable Design", "Laptop Protection", "Weather Resistant", "Premium Materials"],
    inStock: true,
    fastDelivery: true,
    inventory: 22
  },
  {
    title: "Garmin Fenix 7",
    price: 699.99,
    originalPrice: 749.99,
    image: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=600&h=400&fit=crop",
    description: "Rugged GPS smartwatch built for adventure with solar charging and comprehensive health monitoring.",
    category: "Wearables",
    rating: 4.8,
    reviews: 1345,
    badge: "Hot",
    features: ["Solar Charging", "Multi-GNSS", "Health Monitoring", "Adventure Ready"],
    inStock: true,
    fastDelivery: true,
    inventory: 15
  },
  {
    title: "Bose QuietComfort Earbuds",
    price: 279.99,
    originalPrice: 329.99,
    image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=600&h=400&fit=crop",
    description: "True wireless earbuds with world-class noise cancellation and premium audio quality.",
    category: "Audio",
    rating: 4.6,
    reviews: 2134,
    badge: "Bestseller",
    features: ["World-Class ANC", "6-hour Battery", "Secure Fit", "Premium Audio"],
    inStock: true,
    fastDelivery: true,
    inventory: 55
  },
  {
    title: "West Elm Industrial Desk",
    price: 599.99,
    originalPrice: 699.99,
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&h=400&fit=crop",
    description: "Modern industrial desk with steel frame and wood top, perfect for home office or workspace.",
    category: "Furniture",
    rating: 4.5,
    reviews: 456,
    badge: "New",
    features: ["Steel Frame", "Wood Top", "Cable Management", "Modern Design"],
    inStock: true,
    fastDelivery: false,
    inventory: 12
  },
  {
    title: "Ninja Foodi Pressure Cooker",
    price: 179.99,
    originalPrice: 219.99,
    image: "https://images.unsplash.com/photo-1556909114-4e33d031c1de?w=600&h=400&fit=crop",
    description: "Multi-functional pressure cooker that crisps, pressure cooks, slow cooks, and more.",
    category: "Kitchen",
    rating: 4.7,
    reviews: 2789,
    badge: "Hot",
    features: ["Pressure Cook", "Air Crisp", "Slow Cook", "Multiple Functions"],
    inStock: true,
    fastDelivery: true,
    inventory: 33
  },
  {
    title: "Bellroy Leather Wallet",
    price: 89.99,
    originalPrice: 105.99,
    image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=600&h=400&fit=crop",
    description: "Premium leather wallet with RFID protection and slim design that holds 4-8+ cards.",
    category: "Bags",
    rating: 4.8,
    reviews: 1567,
    badge: "Editor's Choice",
    features: ["RFID Protection", "Premium Leather", "Slim Design", "Lifetime Warranty"],
    inStock: true,
    fastDelivery: true,
    inventory: 78
  },
  {
    title: "Samsung Galaxy Watch 6",
    price: 329.99,
    originalPrice: 369.99,
    image: "https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=600&h=400&fit=crop",
    description: "Advanced smartwatch with comprehensive health tracking, sleep monitoring, and long battery life.",
    category: "Wearables",
    rating: 4.6,
    reviews: 987,
    badge: "New",
    features: ["Health Tracking", "Sleep Monitoring", "Long Battery", "Water Resistant"],
    inStock: true,
    fastDelivery: true,
    inventory: 26
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
    console.log(` ${insertedProducts.length} products seeded successfully`);
    
    console.log('Seeded products:');
    insertedProducts.forEach(product => {
      console.log(`- ${product.title} (${product.category})`);
    });
    
    process.exit(0);
  } catch (error) {
    console.error(' Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();