import React from 'react';
import { Search, X } from 'lucide-react';

const SearchBar = ({ value, onChange, onClear, placeholder = 'Search products, categories, tech...' }) => {
  return (
    <div className="search-bar-wrapper" style={{ position: 'relative', width: '100%', maxWidth: '480px' }}>
      <Search
        size={18}
        style={{
          position: 'absolute',
          left: '12px',
          top: '50%',
          transform: 'translateY(-50%)',
          color: 'var(--text-muted)',
          pointerEvents: 'none',
        }}
      />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label="Search products"
        style={{
          width: '100%',
          padding: '0.6rem 2.2rem 0.6rem 2.4rem',
          borderRadius: 'var(--radius-full)',
          border: '1.5px solid var(--border-color)',
          backgroundColor: 'var(--bg-main)',
          fontSize: '0.875rem',
          outline: 'none',
          transition: 'all var(--transition-fast)',
        }}
      />
      {value && (
        <button
          onClick={onClear}
          aria-label="Clear search"
          style={{
            position: 'absolute',
            right: '10px',
            top: '50%',
            transform: 'translateY(-50%)',
            color: 'var(--text-muted)',
            padding: '2px',
          }}
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
