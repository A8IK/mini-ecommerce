import React from 'react';
import { ShoppingCart, Plus, Minus, X, Sparkles, Shield } from 'lucide-react';

const CartSidebar = ({ 
  isCartOpen, 
  setIsCartOpen, 
  cart, 
  cartLoading, 
  updateQuantity, 
  cartTotal, 
  cartItemCount, 
  setIsCheckoutOpen 
}) => {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      right: 0,
      width: '400px',
      height: '100vh',
      background: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(20px)',
      boxShadow: '-10px 0 50px rgba(0, 0, 0, 0.2)',
      transform: isCartOpen ? 'translateX(0)' : 'translateX(100%)',
      transition: 'transform 0.4s ease',
      zIndex: 1000,
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Cart Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1.5rem',
        borderBottom: '1px solid rgba(229, 231, 235, 0.5)'
      }}>
        <h2 style={{
          fontSize: '1.5rem',
          fontWeight: 'bold',
          background: 'linear-gradient(135deg, #7c3aed, #3b82f6)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          Shopping Cart
        </h2>
        <button
          onClick={() => setIsCartOpen(false)}
          style={{
            background: 'none',
            border: 'none',
            padding: '0.5rem',
            borderRadius: '0.5rem',
            cursor: 'pointer',
            transition: 'background 0.2s ease'
          }}
        >
          <X size={24} style={{ color: '#6b7280' }} />
        </button>
      </div>

      {/* Cart Items */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem' }}>
        {cartLoading ? (
          <div style={{ textAlign: 'center', paddingTop: '2rem' }}>
            <div style={{
              width: '40px',
              height: '40px',
              border: '3px solid #f3f4f6',
              borderTop: '3px solid #7c3aed',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
              margin: '0 auto'
            }}></div>
            <p style={{ marginTop: '1rem', color: '#6b7280' }}>Updating cart...</p>
          </div>
        ) : cart.length === 0 ? (
          <div style={{ textAlign: 'center', paddingTop: '4rem' }}>
            <div style={{ 
              display: 'inline-block', 
              position: 'relative', 
              marginBottom: '1.5rem' 
            }}>
              <ShoppingCart size={64} style={{ color: '#d1d5db' }} />
              <div style={{
                position: 'absolute',
                top: '-8px',
                right: '-8px',
                width: '32px',
                height: '32px',
                background: 'linear-gradient(135deg, #7c3aed, #3b82f6)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Sparkles size={16} style={{ color: 'white' }} />
              </div>
            </div>
            <h3 style={{ 
              fontSize: '1.25rem', 
              fontWeight: 'bold', 
              color: '#374151',
              marginBottom: '0.5rem'
            }}>
              Your cart is empty
            </h3>
            <p style={{ color: '#6b7280' }}>
              Start shopping to add items here!
            </p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {cart.map(item => (
              <div key={item.productId._id} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                padding: '1rem',
                background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.05), rgba(59, 130, 246, 0.05))',
                borderRadius: '1rem',
                border: '1px solid rgba(124, 58, 237, 0.1)'
              }}>
                <img 
                  src={item.productId.image} 
                  alt={item.productId.title}
                  style={{
                    width: '60px',
                    height: '60px',
                    objectFit: 'cover',
                    borderRadius: '0.75rem',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <div style={{ flex: 1 }}>
                  <h4 style={{
                    fontSize: '0.875rem',
                    fontWeight: 'bold',
                    color: '#1f2937',
                    marginBottom: '0.25rem',
                    lineHeight: '1.2'
                  }}>
                    {item.productId.title}
                  </h4>
                  <p style={{
                    fontSize: '1.125rem',
                    fontWeight: 'bold',
                    background: 'linear-gradient(135deg, #7c3aed, #3b82f6)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}>
                    ${item.price}
                  </p>
                </div>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '0.75rem',
                  background: 'white',
                  borderRadius: '0.75rem',
                  padding: '0.25rem',
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
                }}>
                  <button
                    onClick={() => updateQuantity(item.productId._id, item.quantity - 1)}
                    disabled={cartLoading}
                    style={{
                      background: 'none',
                      border: 'none',
                      padding: '0.25rem',
                      borderRadius: '0.5rem',
                      cursor: cartLoading ? 'not-allowed' : 'pointer',
                      transition: 'background 0.2s ease',
                      opacity: cartLoading ? 0.5 : 1
                    }}
                  >
                    <Minus size={16} style={{ color: '#6b7280' }} />
                  </button>
                  <span style={{
                    minWidth: '32px',
                    textAlign: 'center',
                    fontWeight: 'bold',
                    fontSize: '1rem',
                    color: '#374151'
                  }}>
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.productId._id, item.quantity + 1)}
                    disabled={cartLoading}
                    style={{
                      background: 'none',
                      border: 'none',
                      padding: '0.25rem',
                      borderRadius: '0.5rem',
                      cursor: cartLoading ? 'not-allowed' : 'pointer',
                      transition: 'background 0.2s ease',
                      opacity: cartLoading ? 0.5 : 1
                    }}
                  >
                    <Plus size={16} style={{ color: '#6b7280' }} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Cart Footer */}
      {cart.length > 0 && (
        <div style={{
          borderTop: '1px solid rgba(229, 231, 235, 0.5)',
          padding: '1.5rem',
          background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.05), rgba(59, 130, 246, 0.05))'
        }}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            marginBottom: '1rem'
          }}>
            <span style={{ 
              fontSize: '1.125rem', 
              fontWeight: 'bold',
              color: '#374151'
            }}>
              Total:
            </span>
            <span style={{
              fontSize: '2rem',
              fontWeight: 'bold',
              background: 'linear-gradient(135deg, #7c3aed, #3b82f6)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              ${cartTotal.toFixed(2)}
            </span>
          </div>
          
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            marginBottom: '1rem',
            color: '#10b981',
            fontSize: '0.875rem'
          }}>
            <Shield size={16} style={{ marginRight: '0.5rem' }} />
            Secure checkout guaranteed
          </div>
          
          <button
            onClick={() => setIsCheckoutOpen(true)}
            disabled={cartLoading}
            style={{
              width: '100%',
              padding: '1rem',
              borderRadius: '1rem',
              border: 'none',
              background: cartLoading 
                ? '#d1d5db' 
                : 'linear-gradient(135deg, #10b981, #059669)',
              color: 'white',
              fontWeight: 'bold',
              fontSize: '1.1rem',
              cursor: cartLoading ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: cartLoading 
                ? 'none' 
                : '0 4px 12px rgba(16, 185, 129, 0.3)',
              opacity: cartLoading ? 0.7 : 1
            }}
          >
            {cartLoading ? 'Processing...' : 'Proceed to Checkout'}
          </button>
        </div>
      )}
    </div>
  );
};

export default CartSidebar;