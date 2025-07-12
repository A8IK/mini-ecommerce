import React from 'react';
import { ShoppingCart, Search, Sparkles } from 'lucide-react';

const Navigation = ({ 
  currentPage, 
  setCurrentPage, 
  searchQuery, 
  setSearchQuery, 
  cartItemCount, 
  setIsCartOpen, 
  setSelectedProduct 
}) => {
  return (
    <nav style={{
      background: 'rgba(255, 255, 255, 0.9)',
      backdropFilter: 'blur(20px)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 1rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '80px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{
            width: '40px',
            height: '40px',
            background: 'linear-gradient(135deg, #7c3aed, #3b82f6)',
            borderRadius: '1rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Sparkles size={24} style={{ color: 'white' }} />
          </div>
          <h1 style={{
            fontSize: '2rem',
            fontWeight: 'bold',
            background: 'linear-gradient(135deg, #7c3aed, #3b82f6)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            LuxeStore
          </h1>
        </div>

        {/* Search Bar */}
        <div style={{ flex: 1, maxWidth: '400px', margin: '0 2rem' }}>
          <div style={{ position: 'relative' }}>
            <Search 
              size={20} 
              style={{
                position: 'absolute',
                left: '1rem',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#9ca3af'
              }}
            />
            <input
              type="text"
              placeholder="Search premium products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                paddingLeft: '3rem',
                paddingRight: '1rem',
                paddingTop: '0.75rem',
                paddingBottom: '0.75rem',
                background: 'rgba(255, 255, 255, 0.7)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                borderRadius: '1rem',
                fontSize: '1rem',
                transition: 'all 0.2s ease'
              }}
              onFocus={(e) => {
                e.target.style.background = 'rgba(255, 255, 255, 0.9)';
                e.target.style.borderColor = '#7c3aed';
                e.target.style.boxShadow = '0 0 0 3px rgba(124, 58, 237, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.background = 'rgba(255, 255, 255, 0.7)';
                e.target.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <button
            onClick={() => { 
              setCurrentPage('home'); 
              setSelectedProduct(null); 
            }}
            style={{
              background: 'none',
              border: 'none',
              fontWeight: 'bold',
              fontSize: '1rem',
              color: currentPage === 'home' ? '#7c3aed' : '#6b7280',
              cursor: 'pointer',
              transition: 'color 0.2s ease'
            }}
          >
            Home
          </button>
          
          <button
            onClick={() => setIsCartOpen(true)}
            style={{
              position: 'relative',
              background: 'rgba(255, 255, 255, 0.7)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              borderRadius: '1rem',
              padding: '0.75rem',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            <ShoppingCart size={24} style={{ color: '#6b7280' }} />
            {cartItemCount > 0 && (
              <span style={{
                position: 'absolute',
                top: '-8px',
                right: '-8px',
                background: 'linear-gradient(135deg, #ef4444, #dc2626)',
                color: 'white',
                borderRadius: '50%',
                width: '24px',
                height: '24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.75rem',
                fontWeight: 'bold',
                boxShadow: '0 2px 8px rgba(239, 68, 68, 0.4)'
              }}>
                {cartItemCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;