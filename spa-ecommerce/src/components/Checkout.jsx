import React from 'react';
import { X, Check, Sparkles, Shield } from 'lucide-react';

const Checkout = ({ 
  isCheckoutOpen, 
  setIsCheckoutOpen, 
  orderPlaced, 
  checkoutForm, 
  setCheckoutForm, 
  handleCheckout, 
  cartLoading, 
  cartTotal 
}) => {
  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(0, 0, 0, 0.5)',
      backdropFilter: 'blur(8px)',
      display: isCheckoutOpen ? 'flex' : 'none',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem',
      zIndex: 1100
    }}>
      <div style={{
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(20px)',
        borderRadius: '2rem',
        maxWidth: '500px',
        width: '100%',
        padding: '2rem',
        boxShadow: '0 25px 50px rgba(0, 0, 0, 0.25)',
        border: '1px solid rgba(255, 255, 255, 0.2)'
      }}>
        {orderPlaced ? (
          <div style={{ textAlign: 'center', padding: '2rem 0' }}>
            <div style={{
              width: '80px',
              height: '80px',
              background: 'linear-gradient(135deg, #10b981, #059669)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.5rem',
              boxShadow: '0 10px 25px rgba(16, 185, 129, 0.3)'
            }}>
              <Check size={40} style={{ color: 'white' }} />
            </div>
            <h3 style={{
              fontSize: '2rem',
              fontWeight: 'bold',
              marginBottom: '1rem',
              background: 'linear-gradient(135deg, #10b981, #059669)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              Order Placed Successfully!
            </h3>
            <p style={{ color: '#6b7280', marginBottom: '1rem', fontSize: '1.1rem' }}>
              Thank you for your purchase.
            </p>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              color: '#7c3aed',
              fontSize: '1rem'
            }}>
              <Sparkles size={20} style={{ marginRight: '0.5rem' }} />
              Order confirmation sent to your email!
            </div>
          </div>
        ) : (
          <>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              marginBottom: '2rem'
            }}>
              <h2 style={{
                fontSize: '2rem',
                fontWeight: 'bold',
                background: 'linear-gradient(135deg, #7c3aed, #3b82f6)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                Checkout
              </h2>
              <button
                onClick={() => setIsCheckoutOpen(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  padding: '0.5rem',
                  borderRadius: '0.5rem',
                  cursor: 'pointer'
                }}
              >
                <X size={24} style={{ color: '#6b7280' }} />
              </button>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '0.875rem',
                  fontWeight: 'bold',
                  color: '#374151',
                  marginBottom: '0.5rem'
                }}>
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={checkoutForm.name}
                  onChange={(e) => setCheckoutForm({...checkoutForm, name: e.target.value})}
                  placeholder="Enter your full name"
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    border: '2px solid #e5e7eb',
                    borderRadius: '1rem',
                    fontSize: '1rem',
                    transition: 'all 0.2s ease',
                    background: 'white'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#7c3aed';
                    e.target.style.boxShadow = '0 0 0 3px rgba(124, 58, 237, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#e5e7eb';
                    e.target.style.boxShadow = 'none';
                  }}
                />
              </div>
              
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '0.875rem',
                  fontWeight: 'bold',
                  color: '#374151',
                  marginBottom: '0.5rem'
                }}>
                  Email Address <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <input
                  type="email"
                  required
                  value={checkoutForm.email}
                  onChange={(e) => setCheckoutForm({...checkoutForm, email: e.target.value})}
                  placeholder="Enter your email (e.g., user@example.com)"
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    border: (() => {
                      if (!checkoutForm.email) return '2px solid #e5e7eb';
                      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                      return emailRegex.test(checkoutForm.email) ? '2px solid #10b981' : '2px solid #ef4444';
                    })(),
                    borderRadius: '1rem',
                    fontSize: '1rem',
                    transition: 'all 0.2s ease',
                    background: 'white',
                    outline: 'none'
                  }}
                  onFocus={(e) => {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (checkoutForm.email && !emailRegex.test(checkoutForm.email)) {
                      e.target.style.borderColor = '#ef4444';
                      e.target.style.boxShadow = '0 0 0 3px rgba(239, 68, 68, 0.1)';
                    } else {
                      e.target.style.borderColor = '#7c3aed';
                      e.target.style.boxShadow = '0 0 0 3px rgba(124, 58, 237, 0.1)';
                    }
                  }}
                  onBlur={(e) => {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (checkoutForm.email && !emailRegex.test(checkoutForm.email)) {
                      e.target.style.borderColor = '#ef4444';
                    } else if (checkoutForm.email) {
                      e.target.style.borderColor = '#10b981';
                    } else {
                      e.target.style.borderColor = '#e5e7eb';
                    }
                    e.target.style.boxShadow = 'none';
                  }}
                />
                
                {/* Validation Messages */}
                {checkoutForm.email && (() => {
                  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                  if (!emailRegex.test(checkoutForm.email)) {
                    return (
                      <p style={{
                        color: '#ef4444',
                        fontSize: '0.75rem',
                        marginTop: '0.25rem',
                        marginLeft: '0.25rem'
                      }}>
                        ⚠️ Please enter a valid email address (must contain @ and domain)
                      </p>
                    );
                  } else {
                    return (
                      <p style={{
                        color: '#10b981',
                        fontSize: '0.75rem',
                        marginTop: '0.25rem',
                        marginLeft: '0.25rem'
                      }}>
                        Valid email format
                      </p>
                    );
                  }
                })()}
              </div>
              
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '0.875rem',
                  fontWeight: 'bold',
                  color: '#374151',
                  marginBottom: '0.5rem'
                }}>
                  Shipping Address
                </label>
                <textarea
                  required
                  rows="3"
                  value={checkoutForm.address}
                  onChange={(e) => setCheckoutForm({...checkoutForm, address: e.target.value})}
                  placeholder="Enter your complete address"
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    border: '2px solid #e5e7eb',
                    borderRadius: '1rem',
                    fontSize: '1rem',
                    transition: 'all 0.2s ease',
                    background: 'white',
                    resize: 'vertical',
                    minHeight: '80px'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#7c3aed';
                    e.target.style.boxShadow = '0 0 0 3px rgba(124, 58, 237, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#e5e7eb';
                    e.target.style.boxShadow = 'none';
                  }}
                />
              </div>
              
              <div style={{
                borderTop: '1px solid #e5e7eb',
                paddingTop: '1.5rem'
              }}>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  marginBottom: '1.5rem'
                }}>
                  <span style={{ 
                    fontSize: '1.125rem', 
                    fontWeight: 'bold',
                    color: '#374151'
                  }}>
                    Total Amount:
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
                
                <button
                  onClick={handleCheckout}
                  disabled={cartLoading}
                  style={{
                    width: '100%',
                    padding: '1rem',
                    borderRadius: '1rem',
                    border: 'none',
                    background: cartLoading 
                      ? '#d1d5db' 
                      : 'linear-gradient(135deg, #7c3aed, #3b82f6)',
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: '1.1rem',
                    cursor: cartLoading ? 'not-allowed' : 'pointer',
                    transition: 'all 0.3s ease',
                    boxShadow: cartLoading 
                      ? 'none' 
                      : '0 4px 12px rgba(124, 58, 237, 0.3)',
                    opacity: cartLoading ? 0.7 : 1
                  }}
                >
                  {cartLoading ? 'Placing Order...' : 'Place Order'}
                </button>
                
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  marginTop: '1rem',
                  color: '#6b7280',
                  fontSize: '0.875rem'
                }}>
                  <Shield size={16} style={{ marginRight: '0.5rem' }} />
                  Your payment information is secure
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Checkout;