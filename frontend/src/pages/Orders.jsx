import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Package, Calendar, MapPin, ArrowRight, CreditCard } from 'lucide-react';
import api from '../services/api';
import { formatPrice, formatDate } from '../utils/helpers';
import LoadingSpinner from '../components/LoadingSpinner';
import EmptyState from '../components/EmptyState';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await api.get('/orders');
        setOrders(Array.isArray(response.data) ? response.data : []);
      } catch (err) {
        console.error('Failed to fetch user orders:', err);
        setError('Failed to load orders.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <LoadingSpinner text="Fetching your orders..." fullPage />;

  if (!orders || orders.length === 0) {
    return (
      <EmptyState
        icon={Package}
        title="You haven't placed any orders yet"
        subtitle="When you place an order, it will appear here for easy tracking and management."
        actionLink="/products"
        actionText="Start Shopping"
      />
    );
  }

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
      <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.25rem' }}>
        My Orders
      </h1>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.925rem', marginBottom: '2rem' }}>
        View and manage your purchase history and order details.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {orders.map((order) => (
          <div key={order.id} className="card" style={{ padding: '1.5rem' }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '1rem',
                borderBottom: '1px solid var(--border-color)',
                paddingBottom: '1rem',
                marginBottom: '1rem',
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
                  <span style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-main)' }}>
                    Order #{order.id}
                  </span>
                  {getStatusBadge(order.status)}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', color: 'var(--text-muted)', fontSize: '0.8125rem', marginTop: '0.25rem' }}>
                  <Calendar size={14} />
                  <span>Placed on {formatDate(order.createdAt)}</span>
                </div>
              </div>

              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--primary)' }}>
                  {formatPrice(order.totalAmount)}
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.875rem', maxWidth: '500px' }}>
                <MapPin size={16} color="var(--primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span><strong>Ship to:</strong> {order.shippingAddress || 'Address on file'}</span>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem' }}>
                {order.status === 'PENDING' && (
                  <button
                    onClick={() => navigate('/payments', { state: { orderId: order.id, amount: order.totalAmount, shippingAddress: order.shippingAddress } })}
                    className="btn btn-primary"
                    style={{ padding: '0.45rem 0.9rem', fontSize: '0.85rem' }}
                  >
                    <CreditCard size={15} />
                    <span>Pay Now</span>
                  </button>
                )}

                <Link
                  to={`/orders/${order.id}`}
                  className="btn btn-outline"
                  style={{ padding: '0.45rem 0.9rem', fontSize: '0.85rem' }}
                >
                  <span>View Details</span>
                  <ArrowRight size={15} />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
