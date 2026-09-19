import React from 'react';
import ProductCard from './ProductCard';
import SkeletonLoader from './SkeletonLoader';
import EmptyState from './EmptyState';

const ProductGrid = ({ products, loading, error, emptyTitle = 'No products found', emptySubtitle = 'Try changing your search query or category filter.' }) => {
  if (loading) {
    return (
      <div className="product-grid">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
          <SkeletonLoader key={n} type="card" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: '3rem 0', textAlign: 'center' }}>
        <p style={{ color: 'var(--error)', fontWeight: 600 }}>{error}</p>
      </div>
    );
  }

  if (!products || products.length === 0) {
    return <EmptyState title={emptyTitle} subtitle={emptySubtitle} />;
  }

  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;
