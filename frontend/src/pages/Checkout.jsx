import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, MapPin, ArrowRight, CreditCard, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { formatPrice } from '../utils/helpers';
import api from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';

const Checkout = () => {
  const { cartItems, totalItems } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [shippingAddress, setShippingAddress] = useState('');
  const [productsMap, setProductsMap] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

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
        console.error('Error fetching product catalog for checkout:', err);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  if (loading) return <LoadingSpinner text="Preparing checkout details..." fullPage />;

  if (!cartItems || cartItems.length === 0) {
    return (
      <div style={{ padding: '3rem 0', textAlign: 'center' }}>
        <h2>Your cart is empty</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>Add items to your cart before proceeding to checkout.</p>
        <button onClick={() => navigate('/products')} className="btn btn-primary">
          Explore Products
        </button>
      </div>
    );
  }

  // Calculate items and subtotal
  let subtotal = 0;
  const orderItemsPayload = cartItems.map((item) => {
    const product = productsMap[item.productId] || { name: `Product #${item.productId}`, price: 0 };
    const price = Number(product.price || 0);
    subtotal += price * (item.quantity || 1);

    return {
      productId: item.productId,
      quantity: item.quantity,
      product,
    };
  });

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    if (!shippingAddress.trim()) {
      setError('Please provide a complete shipping address.');
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      // POST /orders endpoint matching backend contract
      const response = await api.post('/orders', {
        shippingAddress: shippingAddress.trim(),
        items: orderItemsPayload.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
        })),
      });

      // Response format: { order: { id, totalAmount, ... }, items: [...] }
      const orderData = response.data?.order || response.data;
      const orderId = orderData?.id;
      const amount = orderData?.totalAmount || subtotal;

      // Navigate to Payment page with generated order context
      navigate('/payments', {
        state: {
          orderId,
          amount,
          shippingAddress: shippingAddress.trim(),
          cartItemIds: cartItems
            .map((item) => Number(item.id))
            .filter((id) => Number.isInteger(id) && id > 0),
        },
      });
    } catch (err) {
      console.error('Order creation error:', err);
      const msg = err.response?.data?.message || err.message || 'Failed to place order. Please try again.';
      setError(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fade-in" style={{ padding: '1rem 0 3rem 0' }}>
      <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.25rem' }}>
        Checkout
      </h1>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.925rem', marginBottom: '2rem' }}>
        Enter delivery details and confirm your purchase.
      </p>

      {error && (
        <div
          style={{
            backgroundColor: 'var(--error-bg)',
            color: 'var(--error)',
            padding: '0.75rem 1rem',
            borderRadius: 'var(--radius-md)',
            fontSize: '0.875rem',
            fontWeight: 500,
            marginBottom: '1.5rem',
            borderLeft: '4px solid var(--error)',
          }}
        >
          {error}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '2rem' }}>
        {/* Left Column: Delivery Form */}
        <form onSubmit={handleSubmitOrder} className="card" style={{ padding: '2rem' }}>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <MapPin size={20} color="var(--primary)" />
            <span>Delivery Address</span>
          </h3>

          <div className="form-group">
            <label className="form-label" htmlFor="checkout-email">Account Email</label>
            <input
              id="checkout-email"
              type="text"
              disabled
              value={user?.email || ''}
              className="form-input"
              style={{ backgroundColor: 'var(--bg-subtle)' }}
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="checkout-address">Shipping Address</label>
            <textarea
              id="checkout-address"
              required
              rows={4}
              value={shippingAddress}
              onChange={(e) => setShippingAddress(e.target.value)}
              placeholder="House/Flat No., Street Name, City, State, Pincode"
              className="form-input"
              style={{ resize: 'vertical' }}
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="btn btn-primary btn-full"
            style={{ padding: '0.85rem', fontSize: '1rem', marginTop: '1rem' }}
          >
            <span>{submitting ? 'Placing Order...' : 'Continue to Payment'}</span>
            <ArrowRight size={18} />
          </button>
        </form>

        {/* Right Column: Order Items Review */}
        <div>
          <div className="card" style={{ padding: '1.5rem', position: 'sticky', top: '90px' }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <ShoppingBag size={20} color="var(--primary)" />
              <span>Order Summary</span>
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxHeight: '280px', overflowY: 'auto', paddingRight: '0.5rem', marginBottom: '1.25rem' }}>
              {orderItemsPayload.map((item) => (
                <div key={item.productId} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.875rem' }}>
                  <div>
                    <div style={{ fontWeight: 600, color: 'var(--text-main)' }}>{item.product.name}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Qty: {item.quantity}</div>
                  </div>
                  <div style={{ fontWeight: 700, color: 'var(--text-main)' }}>
                    {formatPrice(Number(item.product.price || 0) * item.quantity)}
                  </div>
                </div>
              ))}
            </div>

            <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.875rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)' }}>
                <span>Subtotal ({totalItems} items)</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)' }}>
                <span>Shipping</span>
                <span style={{ color: 'var(--success)', fontWeight: 600 }}>FREE</span>
              </div>
              <div style={{ borderTop: '1px solid var(--border-color)', margin: '0.5rem 0 0 0', paddingTop: '0.75rem', display: 'flex', justifyContent: 'space-between', fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-main)' }}>
                <span>Total</span>
                <span style={{ color: 'var(--primary)' }}>{formatPrice(subtotal)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 868px) {
          div[style*="grid-template-columns: 1fr 380px"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Checkout;
