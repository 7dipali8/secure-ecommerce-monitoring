import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, MapPin, CreditCard, ShieldCheck } from 'lucide-react';
import api from '../services/api';
import { formatPrice, formatDate } from '../utils/helpers';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

const OrderDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [productsMap, setProductsMap] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        // Fetch user orders via GET /orders (API Gateway contract)
        const [ordersRes, productsRes] = await Promise.all([
          api.get('/orders'),
          api.get('/products'),
        ]);

        const ordersList = Array.isArray(ordersRes.data) ? ordersRes.data : [];
        const foundOrder = ordersList.find((o) => String(o.id) === String(id));

        const productsList = Array.isArray(productsRes.data) ? productsRes.data : [];
        const map = {};
        productsList.forEach((p) => {
          map[p.id] = p;
        });
        setProductsMap(map);

        if (foundOrder) {
          setOrder(foundOrder);
        } else {
          setError(`Order #${id} was not found in your purchase history.`);
        }
      } catch (err) {
        console.error('Failed to fetch order details:', err);
        setError('Failed to load order details.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [id]);

  if (loading) return <LoadingSpinner text="Loading order details..." fullPage />;
  if (error || !order) return <ErrorMessage title="Order Not Found" message={error} onRetry={() => navigate('/orders')} />;

  const getStatusBadge = (status) => {
    const st = (status || 'PENDING').toUpperCase();
    if (st === 'PAID' || st === 'SUCCESS' || st === 'DELIVERED') {
      return <span className="badge badge-success">{st}</span>;
    }
    if (st === 'CANCELLED' || st === 'FAILED') {
      return <span className="badge badge-error">{st}</span>;
    }
    return <span className="badge badge-warning">{st}</span>;
  };

  return (
    <div className="fade-in" style={{ padding: '1rem 0 3rem 0' }}>
      <Link to="/orders" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.375rem', color: 'var(--text-muted)', fontWeight: 600, fontSize: '0.875rem', marginBottom: '1.5rem' }}>
        <ArrowLeft size={16} />
        <span>Back to Orders</span>
      </Link>

      <div className="card" style={{ padding: '2rem' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1.25rem', marginBottom: '1.5rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-main)' }}>
                Order #{order.id}
              </h1>
              {getStatusBadge(order.status)}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', color: 'var(--text-muted)', fontSize: '0.875rem', marginTop: '0.25rem' }}>
              <Calendar size={15} />
              <span>Placed on {formatDate(order.createdAt)}</span>
            </div>
          </div>

          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--primary)' }}>
              {formatPrice(order.totalAmount)}
            </div>
          </div>
        </div>

        {/* Info Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
          <div style={{ backgroundColor: 'var(--bg-main)', padding: '1.25rem', borderRadius: 'var(--radius-md)' }}>
            <h4 style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
              <MapPin size={16} color="var(--primary)" />
              <span>Shipping Address</span>
            </h4>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
              {order.shippingAddress || 'Address on file'}
            </p>
          </div>

          <div style={{ backgroundColor: 'var(--bg-main)', padding: '1.25rem', borderRadius: 'var(--radius-md)' }}>
            <h4 style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
              <ShieldCheck size={16} color="var(--primary)" />
              <span>Payment Status</span>
            </h4>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
              Status: <strong>{order.status || 'PENDING'}</strong>
            </p>
            {order.status === 'PENDING' && (
              <button
                onClick={() => navigate('/payments', { state: { orderId: order.id, amount: order.totalAmount, shippingAddress: order.shippingAddress } })}
                className="btn btn-primary"
                style={{ marginTop: '0.75rem', padding: '0.4rem 0.85rem', fontSize: '0.8125rem' }}
              >
                <CreditCard size={14} />
                <span>Complete Payment</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
