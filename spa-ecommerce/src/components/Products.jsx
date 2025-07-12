import React from 'react';
import { Plus, Star, Heart, Truck, ArrowLeft, Search, Zap, AlertCircle } from 'lucide-react';
import Pagination from './Pagination';

const Products = ({ 
  currentPage,
  setCurrentPage,
  products, 
  productsLoading, 
  error,
  categories, 
  selectedCategory, 
  setSelectedCategory,
  addToCart, 
  toggleWishlist, 
  wishlist,
  cartLoading,
  setSelectedProduct,
  selectedProduct,
  searchQuery,
  pagination
}) => {

  // Product Card Component
  const ProductCard = ({ product }) => (
    <div style={{
      position: 'relative',
      background: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(10px)',
      borderRadius: '1.5rem',
      padding: '0',
      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      transition: 'all 0.4s ease',
      cursor: 'pointer',
      overflow: 'hidden'
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'translateY(-8px)';
      e.currentTarget.style.boxShadow = '0 30px 60px rgba(124, 58, 237, 0.2)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.1)';
    }}>
      
      {/* Badge */}
      {product.badge && (
        <div style={{
          position: 'absolute',
          top: '1rem',
          left: '1rem',
          zIndex: 10,
          background: product.badge === 'Bestseller' ? '#f97316' :
                     product.badge === 'Premium' ? '#7c3aed' :
                     product.badge === 'New' ? '#10b981' :
                     product.badge === 'Hot' ? '#ef4444' : '#3b82f6',
          color: 'white',
          padding: '0.25rem 0.75rem',
          borderRadius: '9999px',
          fontSize: '0.75rem',
          fontWeight: 'bold'
        }}>
          {product.badge}
        </div>
      )}

      {/* Wishlist Button */}
      <button
        onClick={(e) => { e.stopPropagation(); toggleWishlist(product._id); }}
        style={{
          position: 'absolute',
          top: '1rem',
          right: '1rem',
          zIndex: 10,
          background: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(10px)',
          border: 'none',
          borderRadius: '50%',
          width: '40px',
          height: '40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          transition: 'all 0.2s ease'
        }}
      >
        <Heart 
          size={20} 
          style={{ 
            color: wishlist.includes(product._id) ? '#ef4444' : '#6b7280',
            fill: wishlist.includes(product._id) ? '#ef4444' : 'none'
          }} 
        />
      </button>

      <div onClick={() => { setSelectedProduct(product); setCurrentPage('product'); }}>
        {/* Product Image */}
        <div style={{ position: 'relative', overflow: 'hidden' }}>
          <img 
            src={product.image} 
            alt={product.title}
            style={{
              width: '100%',
              height: '250px',
              objectFit: 'cover',
              transition: 'transform 0.6s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'scale(1.1)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'scale(1)';
            }}
          />
        </div>

        {/* Product Info */}
        <div style={{ padding: '1.5rem' }}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            marginBottom: '0.5rem' 
          }}>
            <span style={{
              background: 'linear-gradient(135deg, #7c3aed, #3b82f6)',
              color: 'white',
              padding: '0.25rem 0.75rem',
              borderRadius: '9999px',
              fontSize: '0.75rem',
              fontWeight: '600'
            }}>
              {product.category}
            </span>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Star size={16} style={{ color: '#fbbf24', fill: '#fbbf24' }} />
              <span style={{ 
                marginLeft: '0.25rem', 
                fontSize: '0.875rem', 
                fontWeight: '600',
                color: '#374151' 
              }}>
                {product.rating}
              </span>
              <span style={{ 
                marginLeft: '0.25rem', 
                fontSize: '0.75rem', 
                color: '#9ca3af' 
              }}>
                ({product.reviews})
              </span>
            </div>
          </div>

          <h3 style={{
            fontSize: '1.25rem',
            fontWeight: 'bold',
            color: '#1f2937',
            marginBottom: '0.75rem',
            lineHeight: '1.3',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}>
            {product.title}
          </h3>

          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.5rem', 
            marginBottom: '1rem' 
          }}>
            <span style={{
              fontSize: '1.75rem',
              fontWeight: 'bold',
              background: 'linear-gradient(135deg, #7c3aed, #3b82f6)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              ${product.price}
            </span>
            {product.originalPrice && (
              <span style={{
                fontSize: '1rem',
                color: '#9ca3af',
                textDecoration: 'line-through'
              }}>
                ${product.originalPrice}
              </span>
            )}
          </div>

          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '1rem', 
            marginBottom: '1rem',
            fontSize: '0.875rem'
          }}>
            {product.inStock ? (
              <div style={{ display: 'flex', alignItems: 'center', color: '#10b981' }}>
                <div style={{
                  width: '8px',
                  height: '8px',
                  backgroundColor: '#10b981',
                  borderRadius: '50%',
                  marginRight: '0.5rem'
                }}></div>
                In Stock
              </div>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', color: '#ef4444' }}>
                <div style={{
                  width: '8px',
                  height: '8px',
                  backgroundColor: '#ef4444',
                  borderRadius: '50%',
                  marginRight: '0.5rem'
                }}></div>
                Out of Stock
              </div>
            )}
            
            {product.fastDelivery && (
              <div style={{ display: 'flex', alignItems: 'center', color: '#3b82f6' }}>
                <Truck size={16} style={{ marginRight: '0.25rem' }} />
                Fast Delivery
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add to Cart Button */}
      <div style={{ padding: '0 1.5rem 1.5rem' }}>
        <button
          onClick={(e) => { 
            e.stopPropagation(); 
            if (product.inStock && !cartLoading) addToCart(product); 
          }}
          disabled={!product.inStock || cartLoading}
          style={{
            width: '100%',
            padding: '0.75rem 1rem',
            borderRadius: '1rem',
            border: 'none',
            background: product.inStock && !cartLoading
              ? 'linear-gradient(135deg, #7c3aed, #3b82f6)' 
              : '#d1d5db',
            color: product.inStock && !cartLoading ? 'white' : '#9ca3af',
            fontWeight: 'bold',
            fontSize: '1rem',
            cursor: product.inStock && !cartLoading ? 'pointer' : 'not-allowed',
            transition: 'all 0.2s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem'
          }}
          onMouseEnter={(e) => {
            if (product.inStock && !cartLoading) {
              e.target.style.transform = 'scale(1.05)';
              e.target.style.boxShadow = '0 10px 25px rgba(124, 58, 237, 0.3)';
            }
          }}
          onMouseLeave={(e) => {
            if (product.inStock && !cartLoading) {
              e.target.style.transform = 'scale(1)';
              e.target.style.boxShadow = 'none';
            }
          }}
        >
          <Plus size={20} />
          {cartLoading ? 'Adding...' : product.inStock ? 'Add to Cart' : 'Out of Stock'}
        </button>
      </div>
    </div>
  );

  // Home Page Content
  if (currentPage === 'home') {
    return (
      <div>
        {/* Hero Section */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: 'linear-gradient(135deg, #7c3aed, #3b82f6)',
            color: 'white',
            padding: '0.5rem 1rem',
            borderRadius: '9999px',
            fontSize: '0.875rem',
            fontWeight: 'bold',
            marginBottom: '1rem'
          }}>
            <Zap size={16} />
            Premium Collection for you
          </div>
          
          <h2 style={{
            fontSize: '4rem',
            fontWeight: 'bold',
            background: 'linear-gradient(135deg, #7c3aed 0%, #3b82f6 50%, #7c3aed 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '1.5rem',
            lineHeight: '1.1'
          }}>
            Discover Extraordinary Products
          </h2>
          
          <p style={{
            fontSize: '1.25rem',
            color: '#6b7280',
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: '1.6'
          }}>
            Bet you can't shopping less.
          </p>
        </div>

        {/* Category Filter */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '1rem',
          marginBottom: '3rem'
        }}>
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              disabled={productsLoading}
              style={{
                padding: '0.75rem 1.5rem',
                borderRadius: '1rem',
                border: 'none',
                fontWeight: 'bold',
                cursor: productsLoading ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s ease',
                background: selectedCategory === category
                  ? 'linear-gradient(135deg, #7c3aed, #3b82f6)'
                  : 'rgba(255, 255, 255, 0.7)',
                color: selectedCategory === category ? 'white' : '#374151',
                backdropFilter: 'blur(10px)',
                boxShadow: selectedCategory === category 
                  ? '0 4px 12px rgba(124, 58, 237, 0.3)' 
                  : '0 2px 8px rgba(0, 0, 0, 0.1)',
                opacity: productsLoading ? 0.6 : 1
              }}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Loading State for Products */}
        {productsLoading && (
          <div style={{ textAlign: 'center', padding: '3rem 0' }}>
            <div style={{
              width: '50px',
              height: '50px',
              border: '4px solid #e5e7eb',
              borderTop: '4px solid #7c3aed',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
              margin: '0 auto 1rem'
            }}></div>
            <p style={{ color: '#6b7280', fontSize: '1.1rem' }}>
              Loading products from database...
            </p>
          </div>
        )}

        {/* Products Grid */}
        {!productsLoading && (
          <>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
              gap: '2rem'
            }}>
              {products.map(product => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>

            {/* ADD PAGINATION COMPONENT HERE */}
            {pagination && pagination.totalPages > 1 && (
              <Pagination 
                currentPage={pagination.currentPage}
                totalPages={pagination.totalPages}
                totalProducts={pagination.totalProducts}
                productsPerPage={pagination.productsPerPage}
                handlePageChange={pagination.handlePageChange}
              />
            )}
          </>
        )}

        {/* No Products Found */}
        {!productsLoading && products.length === 0 && (
          <div style={{ textAlign: 'center', padding: '4rem 0' }}>
            <div style={{
              width: '80px',
              height: '80px',
              background: '#f3f4f6',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.5rem'
            }}>
              <Search size={40} style={{ color: '#9ca3af' }} />
            </div>
            <h3 style={{
              fontSize: '1.5rem',
              fontWeight: 'bold',
              color: '#374151',
              marginBottom: '0.5rem'
            }}>
              No products found
            </h3>
            <p style={{ color: '#6b7280', fontSize: '1rem' }}>
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>
    );
  }

  // Product Detail Page - MOBILE RESPONSIVE
  if (currentPage === 'product' && selectedProduct) {
    return (
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <button
          onClick={() => setCurrentPage('home')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: 'rgba(255, 255, 255, 0.7)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            borderRadius: '1rem',
            padding: '0.75rem 1rem',
            color: '#7c3aed',
            fontWeight: 'bold',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            marginBottom: '2rem'
          }}
        >
          <ArrowLeft size={20} />
          Back to Products
        </button>
        
        <div style={{
          background: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(20px)',
          borderRadius: '2rem',
          overflow: 'hidden',
          boxShadow: '0 25px 50px rgba(0, 0, 0, 0.1)',
          border: '1px solid rgba(255, 255, 255, 0.2)'
        }}>
          {/* Responsive Container */}
          <div style={{
            display: 'flex',
            flexDirection: window.innerWidth <= 768 ? 'column' : 'row',
            gap: window.innerWidth <= 768 ? '1rem' : '3rem'
          }}>
            {/* Product Image */}
            <div style={{ 
              flex: window.innerWidth <= 768 ? 'none' : '1',
              padding: window.innerWidth <= 768 ? '1.5rem 1.5rem 0' : '2rem'
            }}>
              <div style={{ position: 'relative' }}>
                <img 
                  src={selectedProduct.image} 
                  alt={selectedProduct.title}
                  style={{
                    width: '100%',
                    height: window.innerWidth <= 768 ? '300px' : '400px',
                    objectFit: 'cover',
                    borderRadius: '1.5rem',
                    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <button
                  onClick={() => toggleWishlist(selectedProduct._id)}
                  style={{
                    position: 'absolute',
                    top: '1rem',
                    right: '1rem',
                    background: 'rgba(255, 255, 255, 0.9)',
                    backdropFilter: 'blur(10px)',
                    border: 'none',
                    borderRadius: '50%',
                    width: '48px',
                    height: '48px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                  }}
                >
                  <Heart 
                    size={24} 
                    style={{ 
                      color: wishlist.includes(selectedProduct._id) ? '#ef4444' : '#6b7280',
                      fill: wishlist.includes(selectedProduct._id) ? '#ef4444' : 'none'
                    }} 
                  />
                </button>
              </div>
            </div>

            {/* Product Details */}
            <div style={{ 
              flex: window.innerWidth <= 768 ? 'none' : '1',
              padding: window.innerWidth <= 768 ? '1rem 1.5rem 2rem' : '2rem'
            }}>
              <h1 style={{
                fontSize: window.innerWidth <= 768 ? '2rem' : '3rem',
                fontWeight: 'bold',
                color: '#1f2937',
                marginBottom: '1rem',
                lineHeight: '1.1'
              }}>
                {selectedProduct.title}
              </h1>
              
              <p style={{
                color: '#6b7280',
                marginBottom: '2rem',
                lineHeight: '1.7',
                fontSize: window.innerWidth <= 768 ? '1rem' : '1.1rem'
              }}>
                {selectedProduct.description}
              </p>
              
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '1rem',
                marginBottom: '2rem'
              }}>
                <span style={{
                  fontSize: window.innerWidth <= 768 ? '2.5rem' : '3rem',
                  fontWeight: 'bold',
                  background: 'linear-gradient(135deg, #7c3aed, #3b82f6)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>
                  ${selectedProduct.price}
                </span>
              </div>
              
              <button
                onClick={() => addToCart(selectedProduct)}
                disabled={!selectedProduct.inStock || cartLoading}
                style={{
                  width: '100%',
                  padding: window.innerWidth <= 768 ? '0.875rem' : '1rem',
                  borderRadius: '1rem',
                  border: 'none',
                  background: selectedProduct.inStock && !cartLoading
                    ? 'linear-gradient(135deg, #7c3aed, #3b82f6)' 
                    : '#d1d5db',
                  color: selectedProduct.inStock && !cartLoading ? 'white' : '#9ca3af',
                  fontWeight: 'bold',
                  fontSize: window.innerWidth <= 768 ? '1rem' : '1.2rem',
                  cursor: selectedProduct.inStock && !cartLoading ? 'pointer' : 'not-allowed',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.75rem',
                  boxShadow: selectedProduct.inStock && !cartLoading
                    ? '0 4px 12px rgba(124, 58, 237, 0.3)' 
                    : 'none'
                }}
              >
                <Plus size={window.innerWidth <= 768 ? 20 : 24} />
                {cartLoading ? 'Adding...' : selectedProduct.inStock ? 'Add to Cart' : 'Out of Stock'}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default Products;