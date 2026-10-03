import React, { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { CreditCard, CheckCircle2, ShieldCheck, ArrowRight, Smartphone, Banknote } from 'lucide-react';
import api from '../services/api';
import { formatPrice } from '../utils/helpers';
import { useToast } from '../context/ToastContext';
import { useCart } from '../context/CartContext';

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { addToast } = useToast();
  const { fetchCart } = useCart();

  const stateData = location.state || {};
  const {
    orderId = 1,
    amount = 0,
    shippingAddress = '',
    cartItemIds = [],
  } = stateData;

  const [paymentMethod, setPaymentMethod] = useState('CARD');
  const [submitting, setSubmitting] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [transactionData, setTransactionData] = useState(null);
  const [error, setError] = useState('');

  const handleProcessPayment = async (e) => {
    e.preventDefault();
    if (!orderId || amount <= 0) {
      setError('Invalid order or amount for payment processing.');
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      // POST /payments endpoint matching backend DTO: { orderId, paymentMethod, amount }
      const response = await api.post('/payments', {
        orderId: Number(orderId),
        paymentMethod,
        amount: Number(amount),
      });

      // Response format: { message: "Payment successful", payment: { id, transactionId, status, ... } }
      const paymentInfo = response.data?.payment || response.data;
      setTransactionData(paymentInfo);

      try {
        if (Array.isArray(cartItemIds) && cartItemIds.length > 0) {
          await api.post('/cart/clear-purchased', { cartItemIds });
        }
        await fetchCart();
      } catch (cartError) {
        console.error('Payment succeeded, but cart cleanup failed:', cartError);
      }

      setPaymentSuccess(true);
      addToast('Payment successful!', 'success');
    } catch (err) {
      console.error('Payment processing error:', err);
      const msg = err.response?.data?.message || err.message || 'Payment processing failed. Please try again.';
      setError(msg);
    } finally {
      setSubmitting(false);
    }
  };

  if (paymentSuccess) {
    return (
      <div className="fade-in" style={{ padding: '3rem 1rem', display: 'flex', justifyContent: 'center' }}>
        <div className="card" style={{ maxWidth: '520px', width: '100%', padding: '2.5rem', textAlign: 'center' }}>
          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              backgroundColor: 'var(--success-bg)',
              color: 'var(--success)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.25rem auto',
            }}
          >
            <CheckCircle2 size={36} />
          </div>

          <h1 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.5rem' }}>
            Payment Successful
          </h1>

          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '1.5rem', lineHeight: 1.5 }}>
            Your payment has been processed successfully for <strong>Order #{orderId}</strong>.
          </p>

          {transactionData?.transactionId && (
            <div style={{ backgroundColor: 'var(--bg-main)', padding: '0.85rem', borderRadius: 'var(--radius-md)', fontSize: '0.85rem', fontFamily: 'monospace', marginBottom: '1.75rem', color: 'var(--text-main)' }}>
              Transaction ID: <strong>{transactionData.transactionId}</strong>
            </div>
          )}

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <button
              onClick={() => navigate('/orders')}
              className="btn btn-primary"
              style={{ flex: 1, padding: '0.75rem' }}
            >
              <span>View Orders</span>
            </button>
            <button
              onClick={() => navigate('/products')}
              className="btn btn-outline"
              style={{ flex: 1, padding: '0.75rem' }}
            >
              <span>Continue Shopping</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fade-in" style={{ padding: '1rem 0 3rem 0' }}>
      <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.25rem' }}>
        Complete Payment
      </h1>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.925rem', marginBottom: '2rem' }}>
        Select your preferred payment method to complete Order #{orderId}.
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

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: '2rem' }}>
        {/* Payment Methods Choice */}
        <form onSubmit={handleProcessPayment} className="card" style={{ padding: '2rem' }}>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '1.25rem' }}>
            Choose Payment Method
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.75rem' }}>
            {/* Card Option */}
            <label
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                padding: '1rem 1.25rem',
                borderRadius: 'var(--radius-md)',
                border: `2px solid ${paymentMethod === 'CARD' ? 'var(--primary)' : 'var(--border-color)'}`,
                backgroundColor: paymentMethod === 'CARD' ? 'var(--primary-light)' : 'transparent',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              <input
                type="radio"
                name="payment"
                value="CARD"
                checked={paymentMethod === 'CARD'}
                onChange={() => setPaymentMethod('CARD')}
              />
              <CreditCard size={22} color={paymentMethod === 'CARD' ? 'var(--primary)' : 'var(--text-muted)'} />
              <div>
                <div style={{ fontWeight: 700, color: 'var(--text-main)', fontSize: '0.95rem' }}>Credit / Debit Card</div>
                <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>Visa, Mastercard, RuPay, Maestro</div>
              </div>
            </label>

            {/* UPI Option */}
            <label
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                padding: '1rem 1.25rem',
                borderRadius: 'var(--radius-md)',
                border: `2px solid ${paymentMethod === 'UPI' ? 'var(--primary)' : 'var(--border-color)'}`,
                backgroundColor: paymentMethod === 'UPI' ? 'var(--primary-light)' : 'transparent',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              <input
                type="radio"
                name="payment"
                value="UPI"
                checked={paymentMethod === 'UPI'}
                onChange={() => setPaymentMethod('UPI')}
              />
              <Smartphone size={22} color={paymentMethod === 'UPI' ? 'var(--primary)' : 'var(--text-muted)'} />
              <div>
                <div style={{ fontWeight: 700, color: 'var(--text-main)', fontSize: '0.95rem' }}>UPI / Instant Pay</div>
                <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>Google Pay, PhonePe, Paytm, BHIM</div>
              </div>
            </label>

            {/* Cash on Delivery Option */}
            <label
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                padding: '1rem 1.25rem',
                borderRadius: 'var(--radius-md)',
                border: `2px solid ${paymentMethod === 'COD' ? 'var(--primary)' : 'var(--border-color)'}`,
                backgroundColor: paymentMethod === 'COD' ? 'var(--primary-light)' : 'transparent',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              <input
                type="radio"
                name="payment"
                value="COD"
                checked={paymentMethod === 'COD'}
                onChange={() => setPaymentMethod('COD')}
              />
              <Banknote size={22} color={paymentMethod === 'COD' ? 'var(--primary)' : 'var(--text-muted)'} />
              <div>
                <div style={{ fontWeight: 700, color: 'var(--text-main)', fontSize: '0.95rem' }}>Cash on Delivery (COD)</div>
                <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>Pay cash upon delivery at your address</div>
              </div>
            </label>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="btn btn-primary btn-full"
            style={{ padding: '0.85rem', fontSize: '1rem' }}
          >
            <span>{submitting ? 'Processing Payment...' : `Pay ${formatPrice(amount)}`}</span>
            <ArrowRight size={18} />
          </button>
        </form>

        {/* Order Summary Right Box */}
        <div>
          <div className="card" style={{ padding: '1.5rem' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem' }}>Order Details</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem', fontSize: '0.875rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)' }}>
                <span>Order Reference</span>
                <span style={{ fontWeight: 700, color: 'var(--text-main)' }}>#{orderId}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)' }}>
                <span>Total Amount</span>
                <span style={{ fontWeight: 800, color: 'var(--primary)', fontSize: '1.1rem' }}>{formatPrice(amount)}</span>
              </div>
              {shippingAddress && (
                <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '0.75rem', marginTop: '0.5rem', color: 'var(--text-muted)' }}>
                  <strong>Shipping Address:</strong>
                  <div style={{ fontSize: '0.8125rem', marginTop: '0.2rem' }}>{shippingAddress}</div>
                </div>
              )}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', color: 'var(--success)', fontSize: '0.75rem', marginTop: '1.25rem', fontWeight: 600 }}>
              <ShieldCheck size={16} />
              <span>Official ShopNest Payment Protection</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
