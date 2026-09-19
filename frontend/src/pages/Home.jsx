import React, { useState, useEffect } from 'react';
import Hero from '../components/Hero';
import CategoryNav from '../components/CategoryNav';
import ProductGrid from '../components/ProductGrid';
import SearchBar from '../components/SearchBar';
import ErrorMessage from '../components/ErrorMessage';
import api from '../services/api';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get('/products');
      if (Array.isArray(response.data)) {
        setProducts(response.data);
      } else {
        setProducts([]);
      }
    } catch (err) {
      console.error('Failed to load products from API Gateway:', err);
      setError('Unable to load products. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Filter products by category and search term
  const filteredProducts = products.filter((item) => {
    const matchesCategory =
      selectedCategory === 'All' ||
      (item.category && item.category.toLowerCase() === selectedCategory.toLowerCase());

    const query = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !query ||
      (item.name && item.name.toLowerCase().includes(query)) ||
      (item.description && item.description.toLowerCase().includes(query)) ||
      (item.category && item.category.toLowerCase().includes(query));

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="fade-in">
      <Hero />

      <section style={{ marginBottom: '2.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
          <div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-main)' }}>Featured Collection</h2>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Explore popular accessories and everyday technology</p>
          </div>

          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            onClear={() => setSearchQuery('')}
          />
        </div>

        <CategoryNav
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        <div style={{ marginTop: '1.5rem' }}>
          {error ? (
            <ErrorMessage
              title="Unable to load products"
              message="Unable to load products. Please try again."
              onRetry={fetchProducts}
            />
          ) : (
            <ProductGrid
              products={filteredProducts}
              loading={loading}
              error={null}
              emptyTitle="No matching products"
              emptySubtitle={`No products found for "${searchQuery || selectedCategory}".`}
            />
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
