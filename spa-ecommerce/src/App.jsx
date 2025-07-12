import React, { useState, useEffect } from 'react';
import { Sparkles, AlertCircle } from 'lucide-react';
import ApiService from './services/api';
import Navigation from './components/Navigation';
import Products from './components/Products';
import CartSidebar from './components/CartSidebar';
import Checkout from './components/Checkout';

const ECommerceApp = () => {
  // State management
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [wishlist, setWishlist] = useState([]);
  const [checkoutForm, setCheckoutForm] = useState({
    name: '',
    email: '',
    address: ''
  });
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  // Loading and error states
  const [isLoading, setIsLoading] = useState(true);
  const [productsLoading, setProductsLoading] = useState(false);
  const [cartLoading, setCartLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Session management
  const [sessionId] = useState(() => {
    let id = localStorage.getItem('ecommerce_session_id');
    if (!id) {
      id = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
      localStorage.setItem('ecommerce_session_id', id);
    }
    return id;
  });

  // Fetch products from backend
  const fetchProducts = async (filters = {}) => {
    try {
      setProductsLoading(true);
      setError(null);
      const data = await ApiService.getProducts(filters);
      setProducts(data);
    } catch (error) {
      setError('Failed to load products. Please check if the backend server is running.');
      console.error('Error fetching products:', error);
    } finally {
      setProductsLoading(false);
    }
  };

  // Fetch cart from backend
  const fetchCart = async () => {
    try {
      setCartLoading(true);
      const cartData = await ApiService.getCart(sessionId);
      setCart(cartData.items || []);
    } catch (error) {
      console.error('Error fetching cart:', error);
      setCart([]);
    } finally {
      setCartLoading(false);
    }
  };

  // Initial data loading
  useEffect(() => {
    const loadInitialData = async () => {
      setIsLoading(true);
      await Promise.all([
        fetchProducts(),
        fetchCart()
      ]);
      setTimeout(() => setIsLoading(false), 1000);
    };

    loadInitialData();
  }, []);

  // Filter products based on search and category
  useEffect(() => {
    const filters = {};
    if (selectedCategory !== 'All') {
      filters.category = selectedCategory;
    }
    if (searchQuery.trim()) {
      filters.search = searchQuery.trim();
    }
    
    fetchProducts(filters);
  }, [searchQuery, selectedCategory]);

  const categories = ['All', ...new Set(products.map(p => p.category))];

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

const addToCart = async (product, event = null) => {
  try {
    setCartLoading(true);
    await ApiService.addToCart(sessionId, product._id, 1, product.price);
    await fetchCart(); 

    alert(` ${product.title} added to cart successfully!`);

    if (event && event.target) {
      const button = event.target;
      const originalText = button.textContent;
      button.textContent = 'Added!';
      button.style.background = 'linear-gradient(135deg, #10b981, #059669)';
      setTimeout(() => {
        button.textContent = originalText;
        button.style.background = 'linear-gradient(135deg, #7c3aed, #3b82f6)';
      }, 1000);
    }
  } catch (error) {
    console.error('Error adding to cart:', error);
    alert(' Failed to add item to cart. Please try again.');
  } finally {
    setCartLoading(false);
  }
};

  // Update cart quantity
  const updateQuantity = async (productId, newQuantity) => {
    try {
      setCartLoading(true);
      if (newQuantity <= 0) {
        // Remove item if quantity is 0 or less
        const updatedCart = cart.filter(item => item.productId._id !== productId);
        setCart(updatedCart);
      }
      await ApiService.updateCartItem(sessionId, productId, newQuantity);
      await fetchCart(); 
    } catch (error) {
      console.error('Error updating cart:', error);
      await fetchCart(); 
    } finally {
      setCartLoading(false);
    }
  };

  // Wishlist functions
  const toggleWishlist = (productId) => {
    setWishlist(prev => {
      const updated = prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId];
      localStorage.setItem('ecommerce_wishlist', JSON.stringify(updated));
      return updated;
    });
  };

  // Load wishlist from localStorage
  useEffect(() => {
    const savedWishlist = localStorage.getItem('ecommerce_wishlist');
    if (savedWishlist) {
      setWishlist(JSON.parse(savedWishlist));
    }
  }, []);

  // Handle checkout
  const handleCheckout = async () => {
    if (!checkoutForm.name || !checkoutForm.email || !checkoutForm.address) {
      alert('Please fill in all required fields');
      return;
    }

    try {
      setCartLoading(true);
      await ApiService.createOrder(sessionId, checkoutForm);
      setOrderPlaced(true);
      
      setTimeout(() => {
        setIsCheckoutOpen(false);
        setOrderPlaced(false);
        setCart([]);
        setCheckoutForm({ name: '', email: '', address: '' });
      }, 2500);
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Failed to place order. Please try again.');
    } finally {
      setCartLoading(false);
    }
  };

  // Loading screen
  if (isLoading) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #1e293b 0%, #7c3aed 50%, #1e293b 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ 
            position: 'relative', 
            display: 'inline-block',
            marginBottom: '2rem'
          }}>
            <div style={{
              width: '80px',
              height: '80px',
              border: '4px solid rgba(124, 58, 237, 0.3)',
              borderRadius: '50%',
              borderTop: '4px solid #7c3aed',
              animation: 'spin 1s linear infinite'
            }}></div>
            <Sparkles style={{
              width: '32px',
              height: '32px',
              color: '#a855f7',
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)'
            }} />
          </div>
          <h2 style={{ 
            fontSize: '2rem', 
            fontWeight: 'bold', 
            marginBottom: '1rem',
            background: 'linear-gradient(135deg, #a855f7, #3b82f6)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Loading Premium Store
          </h2>
          <p style={{ color: '#a855f7', fontSize: '1.1rem' }}>
            Connecting to backend...
          </p>
        </div>
      </div>
    );
  }

  // Error state
  if (error && products.length === 0) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f8fafc 0%, #e0e7ff 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem'
      }}>
        <div style={{
          background: 'white',
          borderRadius: '2rem',
          padding: '3rem',
          textAlign: 'center',
          maxWidth: '500px',
          boxShadow: '0 25px 50px rgba(0, 0, 0, 0.1)'
        }}>
          <AlertCircle size={64} style={{ color: '#ef4444', marginBottom: '1rem' }} />
          <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem', color: '#1f2937' }}>
            Backend Connection Error
          </h2>
          <p style={{ color: '#6b7280', marginBottom: '2rem', lineHeight: '1.6' }}>
            {error}
          </p>
          <div style={{ 
            background: '#fef3cd', 
            border: '1px solid #fcd34d',
            borderRadius: '1rem',
            padding: '1rem',
            marginBottom: '2rem',
            textAlign: 'left'
          }}>
            <h3 style={{ fontWeight: 'bold', marginBottom: '0.5rem', color: '#92400e' }}>
              To fix this:
            </h3>
            <ol style={{ color: '#92400e', paddingLeft: '1.2rem' }}>
              <li>Make sure MongoDB is running</li>
              <li>Start your backend server: <code>npm start</code></li>
              <li>Run the seed script: <code>npm run seed</code></li>
              <li>Backend should be running on port 5000</li>
            </ol>
          </div>
          <button
            onClick={() => window.location.reload()}
            style={{
              background: 'linear-gradient(135deg, #7c3aed, #3b82f6)',
              color: 'white',
              border: 'none',
              padding: '1rem 2rem',
              borderRadius: '1rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              fontSize: '1rem'
            }}
          >
            Retry Connection
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f8fafc 0%, #e0e7ff 25%, #dbeafe 75%, #f8fafc 100%)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Animated background elements */}
      <div style={{
        position: 'absolute',
        top: '25%',
        left: '25%',
        width: '300px',
        height: '300px',
        background: 'radial-gradient(circle, rgba(124, 58, 237, 0.1) 0%, transparent 70%)',
        borderRadius: '50%',
        filter: 'blur(40px)',
        animation: 'float 8s ease-in-out infinite'
      }}></div>

      {/* Navigation */}
      <Navigation 
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        cartItemCount={cartItemCount}
        setIsCartOpen={setIsCartOpen}
        setSelectedProduct={setSelectedProduct}
      />

      {/* Main Content */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem 1rem' }}>
        <Products 
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          products={products}
          productsLoading={productsLoading}
          error={error}
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          addToCart={addToCart}
          toggleWishlist={toggleWishlist}
          wishlist={wishlist}
          cartLoading={cartLoading}
          setSelectedProduct={setSelectedProduct}
          selectedProduct={selectedProduct}
          searchQuery={searchQuery}
        />
      </div>

      {/* Cart Sidebar */}
      <CartSidebar 
        isCartOpen={isCartOpen}
        setIsCartOpen={setIsCartOpen}
        cart={cart}
        cartLoading={cartLoading}
        updateQuantity={updateQuantity}
        cartTotal={cartTotal}
        cartItemCount={cartItemCount}
        setIsCheckoutOpen={setIsCheckoutOpen}
      />
      
      {/* Checkout Modal */}
      <Checkout 
        isCheckoutOpen={isCheckoutOpen}
        setIsCheckoutOpen={setIsCheckoutOpen}
        orderPlaced={orderPlaced}
        checkoutForm={checkoutForm}
        setCheckoutForm={setCheckoutForm}
        handleCheckout={handleCheckout}
        cartLoading={cartLoading}
        cartTotal={cartTotal}
      />
      
      {/* Overlay for cart */}
      {isCartOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.3)',
            backdropFilter: 'blur(4px)',
            zIndex: 999
          }}
          onClick={() => setIsCartOpen(false)}
        />
      )}

      {/* CSS Animation for float effect */}
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @keyframes float {
          0%, 100% { 
            transform: translateY(0px) rotate(0deg); 
            opacity: 0.7;
          }
          50% { 
            transform: translateY(-20px) rotate(180deg); 
            opacity: 0.9;
          }
        }
      `}</style>
    </div>
  );
};

export default ECommerceApp;