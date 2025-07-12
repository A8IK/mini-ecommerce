import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Pagination = ({ 
  currentPage, 
  totalPages, 
  totalProducts, 
  productsPerPage, 
  handlePageChange 
}) => {
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages = [];
    const showPages = 5; 
    
    if (totalPages <= showPages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      let start = Math.max(1, currentPage - 2);
      let end = Math.min(totalPages, currentPage + 2);
      
      if (end - start < showPages - 1) {
        if (start === 1) {
          end = Math.min(totalPages, start + showPages - 1);
        } else {
          start = Math.max(1, end - showPages + 1);
        }
      }
      
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
    }
    
    return pages;
  };

  const startItem = (currentPage - 1) * productsPerPage + 1;
  const endItem = Math.min(currentPage * productsPerPage, totalProducts);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '1.5rem',
      marginTop: '3rem',
      padding: '2rem'
    }}>
      {/* Results Info */}
      <div style={{
        color: '#6b7280',
        fontSize: '0.875rem',
        textAlign: 'center'
      }}>
        Showing {startItem} to {endItem} of {totalProducts} products
      </div>

      {/* Pagination Controls */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        flexWrap: 'wrap',
        justifyContent: 'center'
      }}>
        {/* Previous Button */}
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.5rem 1rem',
            borderRadius: '0.75rem',
            border: 'none',
            background: currentPage === 1 
              ? 'rgba(209, 213, 219, 0.5)' 
              : 'rgba(255, 255, 255, 0.9)',
            color: currentPage === 1 ? '#9ca3af' : '#374151',
            cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
            transition: 'all 0.2s ease',
            fontSize: '0.875rem',
            fontWeight: '500',
            backdropFilter: 'blur(10px)',
            boxShadow: currentPage === 1 
              ? 'none' 
              : '0 2px 8px rgba(0, 0, 0, 0.1)'
          }}
          onMouseEnter={(e) => {
            if (currentPage !== 1) {
              e.target.style.background = 'rgba(255, 255, 255, 1)';
              e.target.style.transform = 'translateY(-1px)';
            }
          }}
          onMouseLeave={(e) => {
            if (currentPage !== 1) {
              e.target.style.background = 'rgba(255, 255, 255, 0.9)';
              e.target.style.transform = 'translateY(0)';
            }
          }}
        >
          <ChevronLeft size={16} />
          Previous
        </button>

        {/* Page Numbers */}
        {getPageNumbers().map(pageNum => (
          <button
            key={pageNum}
            onClick={() => handlePageChange(pageNum)}
            style={{
              minWidth: '40px',
              height: '40px',
              borderRadius: '0.75rem',
              border: 'none',
              background: pageNum === currentPage
                ? 'linear-gradient(135deg, #7c3aed, #3b82f6)'
                : 'rgba(255, 255, 255, 0.9)',
              color: pageNum === currentPage ? 'white' : '#374151',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              fontSize: '0.875rem',
              fontWeight: pageNum === currentPage ? 'bold' : '500',
              backdropFilter: 'blur(10px)',
              boxShadow: pageNum === currentPage
                ? '0 4px 12px rgba(124, 58, 237, 0.3)'
                : '0 2px 8px rgba(0, 0, 0, 0.1)'
            }}
            onMouseEnter={(e) => {
              if (pageNum !== currentPage) {
                e.target.style.background = 'rgba(255, 255, 255, 1)';
                e.target.style.transform = 'translateY(-1px)';
              }
            }}
            onMouseLeave={(e) => {
              if (pageNum !== currentPage) {
                e.target.style.background = 'rgba(255, 255, 255, 0.9)';
                e.target.style.transform = 'translateY(0)';
              }
            }}
          >
            {pageNum}
          </button>
        ))}

        {/* Next Button */}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.5rem 1rem',
            borderRadius: '0.75rem',
            border: 'none',
            background: currentPage === totalPages 
              ? 'rgba(209, 213, 219, 0.5)' 
              : 'rgba(255, 255, 255, 0.9)',
            color: currentPage === totalPages ? '#9ca3af' : '#374151',
            cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
            transition: 'all 0.2s ease',
            fontSize: '0.875rem',
            fontWeight: '500',
            backdropFilter: 'blur(10px)',
            boxShadow: currentPage === totalPages 
              ? 'none' 
              : '0 2px 8px rgba(0, 0, 0, 0.1)'
          }}
          onMouseEnter={(e) => {
            if (currentPage !== totalPages) {
              e.target.style.background = 'rgba(255, 255, 255, 1)';
              e.target.style.transform = 'translateY(-1px)';
            }
          }}
          onMouseLeave={(e) => {
            if (currentPage !== totalPages) {
              e.target.style.background = 'rgba(255, 255, 255, 0.9)';
              e.target.style.transform = 'translateY(0)';
            }
          }}
        >
          Next
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default Pagination;