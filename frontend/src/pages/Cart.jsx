import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, ArrowRight, Trash2, Plus, Minus, ShieldCheck } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/helpers';
import { getProductImage, handleImageError } from '../utils/imageFallback';
import api from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';
import EmptyState from '../components/EmptyState';

const Cart = () => {
  const { cartItems, totalItems, loading: cartLoading, updateQuantity } = useCart();
  const [productsMap, setProductsMap] = useState({});
  const [loadingProducts, setLoadingProducts] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await api.get('/products');
        const list = Array.isArray(response.data) ? response.data : [];
        const map = {};
        list.forEach((p) => {
          map[p.id] = p;
        });
        setProductsMap(map);
      } catch (err) {
        console.error('Failed to load products map for cart:', err);
      } finally {
        setLoadingProducts(false);
      }
    };

    loadProducts();
  }, []);

  if (cartLoading || loadingProducts) {
    return <LoadingSpinner text="Fetching your cart..." fullPage />;
  }

  if (!cartItems || cartItems.length === 0) {
    return (
      <EmptyState
        icon={ShoppingBag}
        title="Your cart is empty"
        subtitle="Looks like you haven't added any items to your shopping cart yet."
        actionLink="/products"
        actionText="Start Shopping"
      />
    );
  }

  // Calculate Subtotal based on product details matching productId
  let subtotal = 0;
  const enrichedItems = cartItems.map((item) => {
    const product = productsMap[item.productId] || {
      name: `Product #${item.productId}`,
      price: 0,
      category: 'Electronics',
    };
    const itemTotal = Number(product.price || 0) * (item.quantity || 1);
    subtotal += itemTotal;

    return {
      ...item,
      product,
      itemTotal,
    };
  });

  return (
    <div className="fade-in" style={{ padding: '1rem 0 3rem 0' }}>
      <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.25rem' }}>
        Shopping Cart ({totalItems} {totalItems === 1 ? 'item' : 'items'})
      </h1>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.925rem', marginBottom: '2rem' }}>
        Review your items before proceeding to secure checkout.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '2rem' }}>
        {/* Cart Item List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {enrichedItems.map((item) => (
            <div
              key={item.id || item.productId}
              className="card"
              style={{
                padding: '1.25rem',
                display: 'flex',
                alignItems: 'center',
                gap: '1.25rem',
                flexWrap: 'wrap',
              }}
            >
              {/* Product Thumbnail */}
              <div
                style={{
                  width: '90px',
                  height: '90px',
                  borderRadius: 'var(--radius-md)',
                  overflow: 'hidden',
                  backgroundColor: '#f1f5f9',
                  flexShrink: 0,
                }}
              >
                <img
                  src={getProductImage(item.product.imageUrl, item.product.category)}
                  alt={item.product.name}
                  onError={(e) => handleImageError(e, item.product.category)}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>

              {/* Title & Info */}
              <div style={{ flex: 1, minWidth: '180px' }}>
                <Link to={`/products/${item.productId}`} style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-main)', textDecoration: 'none' }}>
                  {item.product.name}
                </Link>
                <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                  Category: {item.product.category || 'General'}
                </div>
                <div style={{ fontSize: '0.925rem', fontWeight: 700, color: 'var(--primary)', marginTop: '0.375rem' }}>
                  {formatPrice(item.product.price)} each
                </div>
              </div>

              {/* Quantity Selector */}
              <div style={{ display: 'flex', alignItems: 'center', border: '1.5px solid var(--border-color)', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
                <button
                  onClick={() => updateQuantity(item.productId, -1)}
                  style={{ padding: '0.4rem 0.6rem', backgroundColor: 'var(--bg-subtle)' }}
                  aria-label="Decrease quantity"
                >
                  <Minus size={14} />
                </button>
                <span style={{ width: '36px', textAlign: 'center', fontWeight: 700, fontSize: '0.875rem' }}>
                  {item.quantity}
                </span>
                <button
                  onClick={() => updateQuantity(item.productId, 1)}
                  style={{ padding: '0.4rem 0.6rem', backgroundColor: 'var(--bg-subtle)' }}
                  aria-label="Increase quantity"
                >
                  <Plus size={14} />
                </button>
              </div>

              {/* Total Item Price */}
              <div style={{ textAlign: 'right', minWidth: '100px' }}>
                <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-main)' }}>
                  {formatPrice(item.itemTotal)}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary Sidebar */}
        <div>
          <div className="card" style={{ padding: '1.5rem', position: 'sticky', top: '90px' }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '1.25rem', color: 'var(--text-main)' }}>
              Order Summary
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Total Items ({totalItems})</span>
                <span style={{ fontWeight: 600, color: 'var(--text-main)' }}>{totalItems}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Subtotal</span>
                <span style={{ fontWeight: 600, color: 'var(--text-main)' }}>{formatPrice(subtotal)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Estimated Shipping</span>
                <span style={{ fontWeight: 600, color: 'var(--success)' }}>FREE</span>
              </div>

              <div style={{ borderTop: '1px solid var(--border-color)', margin: '0.75rem 0', paddingTop: '0.75rem', display: 'flex', justifyContent: 'space-between', fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-main)' }}>
                <span>Total Amount</span>
                <span style={{ color: 'var(--primary)' }}>{formatPrice(subtotal)}</span>
              </div>
            </div>

            <button
              onClick={() => navigate('/checkout')}
              className="btn btn-primary btn-full"
              style={{ padding: '0.85rem', fontSize: '1rem', marginTop: '1.25rem' }}
            >
              <span>Proceed to Checkout</span>
              <ArrowRight size={18} />
            </button>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.375rem', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '1rem' }}>
              <ShieldCheck size={14} color="var(--success)" />
              <span>Guaranteed 256-bit Encrypted Checkout</span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 868px) {
          div[style*="grid-template-columns: 1fr 340px"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Cart;
