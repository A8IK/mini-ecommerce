Premium E-commerce Platform

A modern, full-stack e-commerce application built with React and Node.js, featuring a beautiful UI, real-time cart management, and seamless shopping experience.
##  Features

- ** Modern UI/UX**: Beautiful, responsive design with glassmorphism effects
- ** Product Catalog**: Browse premium products with detailed views
- ** Advanced Search**: Real-time search and category filtering
- ** Pagination**: Smooth pagination for product listings (6 products per page)
- ** Shopping Cart**: Persistent cart with real-time updates
- ** Checkout System**: Complete checkout flow with form validation
- ** Wishlist**: Save favorite products locally
- ** Responsive Design**: Mobile-first design that works on all devices
- ** Session Management**: Session-based cart persistence
- ** Real-time Updates**: Live cart updates and product management
## Tech Stack

### Frontend
- **React 18** - Modern UI library with hooks
-  **Vite** - Fast build tool and development server
- **Lucide React** - Beautiful icon library
- **CSS-in-JS** - Styled components with inline styles
- **Local Storage** - Session and wishlist persistence

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **dotenv** - Environment variable management
- **CORS** - Cross-origin resource sharing

### Development Tools
- **Nodemon** - Development server auto-restart

## Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local installation or MongoDB Atlas)
- Git

## Backend Setup
Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Update .env with your MongoDB connection string
PORT=5000
MONGODB_URI=mongodb+srv://atikul2585:miniCommerce@cluster0.lf7jgsp.mongodb.net/
JWT_SECRET=your-super-secret-jwt-key-here
NODE_ENV=development

Database Setup
Seed the database with sample products (18 products)
node data/seedData.js

Frontend Setup
Navigate to frontend directory (in a new terminal)
cd spa-ecommerce

# Install dependencies
npm install

## Running the Application
Start Backend Server
cd backend
npm start
Backend should run on http://localhost:5000

## Start Frontend Development Server
cd spa-ecommerce
npm run dev
Backend should run on: http://localhost:5173
