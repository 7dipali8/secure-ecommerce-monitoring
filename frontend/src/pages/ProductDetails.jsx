import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ShoppingBag, ArrowLeft, ShieldCheck, Truck, Check, Plus, Minus } from 'lucide-react';
import api from '../services/api';
import { formatPrice } from '../utils/helpers';
import { getProductImage, handleImageError } from '../utils/imageFallback';
import { useCart } from '../context/CartContext';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [adding, setAdding] = useState(false);
  const [addedSuccess, setAddedSuccess] = useState(false);

  const fetchProduct = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get('/products');
      const productList = Array.isArray(response.data) ? response.data : [];
      const found = productList.find((p) => String(p.id) === String(id));

      if (found) {
        setProduct(found);
      } else {
        setError('Product not found in catalog');
      }
    } catch (err) {
      console.error('API Gateway error fetching product details:', err);
      setError('Unable to load product details. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  if (loading) return <LoadingSpinner text="Loading product details..." fullPage />;
  if (error || !product) return <ErrorMessage title="Unable to load product" message={error || 'Product not found'} onRetry={fetchProduct} />;

  const { name, description, price, category, stock, imageUrl } = product;
  const imageSrc = getProductImage(imageUrl, category);

  const handleAddToCart = async () => {
    setAdding(true);
    const res = await addToCart(product.id, quantity, product);
    setAdding(false);
    if (res.success) {
      setAddedSuccess(true);
      setTimeout(() => setAddedSuccess(false), 2000);
    }
  };

  const handleBuyNow = async () => {
    setAdding(true);
    const res = await addToCart(product.id, quantity, product);
    setAdding(false);
    if (res.success) {
      navigate('/checkout');
    }
  };

  return (
    <div className="fade-in" style={{ padding: '1rem 0 3rem 0' }}>
      <Link to="/products" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.375rem', color: 'var(--text-muted)', fontWeight: 600, fontSize: '0.875rem', marginBottom: '1.5rem' }}>
        <ArrowLeft size={16} />
        <span>Back to Products</span>
      </Link>

      <div className="card" style={{ padding: '2rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem' }}>
        {/* Left Column: Image Preview */}
        <div style={{ position: 'relative', borderRadius: 'var(--radius-lg)', overflow: 'hidden', backgroundColor: '#f1f5f9', minHeight: '360px' }}>
          <img
            src={imageSrc}
            alt={name}
            onError={(e) => handleImageError(e, category)}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          {category && (
            <span className="badge badge-primary" style={{ position: 'absolute', top: '15px', left: '15px' }}>
              {category}
            </span>
          )}
        </div>

        {/* Right Column: Specs & Actions */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.5rem', lineHeight: 1.25 }}>
            {name}
          </h1>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem' }}>
            <span style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--primary)' }}>
              {formatPrice(price)}
            </span>
            <span className={`badge ${stock > 0 ? 'badge-success' : 'badge-error'}`}>
              {stock > 0 ? `${stock} available in stock` : 'Out of Stock'}
            </span>
          </div>

          <div style={{ borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)', padding: '1.25rem 0', margin: '0.5rem 0 1.5rem 0' }}>
            <h4 style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.5rem' }}>
              Product Description
            </h4>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9375rem', lineHeight: 1.6 }}>
              {description || 'High quality electronic accessory designed for everyday performance and durability.'}
            </p>
          </div>

          {/* Quantity Selector */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label className="form-label">Quantity</label>
            <div style={{ display: 'inline-flex', alignItems: 'center', border: '1.5px solid var(--border-color)', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                style={{ padding: '0.6rem 0.875rem', backgroundColor: 'var(--bg-subtle)', color: 'var(--text-main)' }}
                disabled={quantity <= 1}
              >
                <Minus size={14} />
              </button>
              <span style={{ width: '45px', textAlign: 'center', fontWeight: 700, fontSize: '0.95rem' }}>
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(Math.min(stock || 10, quantity + 1))}
                style={{ padding: '0.6rem 0.875rem', backgroundColor: 'var(--bg-subtle)', color: 'var(--text-main)' }}
                disabled={quantity >= (stock || 10)}
              >
                <Plus size={14} />
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: 'auto' }}>
            <button
              onClick={handleAddToCart}
              disabled={adding || stock <= 0}
              className={`btn ${addedSuccess ? 'btn-secondary' : 'btn-outline'}`}
              style={{ flex: 1, padding: '0.75rem 1.25rem', fontSize: '0.95rem' }}
            >
              {addedSuccess ? <Check size={18} /> : <ShoppingBag size={18} />}
              <span>{addedSuccess ? 'Added to Cart' : 'Add to Cart'}</span>
            </button>

            <button
              onClick={handleBuyNow}
              disabled={adding || stock <= 0}
              className="btn btn-primary"
              style={{ flex: 1, padding: '0.75rem 1.25rem', fontSize: '0.95rem' }}
            >
              <span>Buy Now</span>
            </button>
          </div>

          {/* Trust Guarantees */}
          <div style={{ display: 'flex', gap: '1.5rem', marginTop: '1.75rem', paddingTop: '1rem', borderTop: '1px solid var(--border-color)', fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
              <Truck size={16} color="var(--primary)" />
              <span>Fast Express Dispatch</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
              <ShieldCheck size={16} color="var(--primary)" />
              <span>Verified Brand Warranty</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
