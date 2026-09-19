import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, User, LogOut, Package, Menu, X, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { totalItems } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
    setMobileOpen(false);
  };

  return (
    <header
      style={{
        backgroundColor: 'var(--secondary)',
        color: '#ffffff',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        boxShadow: 'var(--shadow-md)',
      }}
    >
      <div className="app-container">
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: '70px',
            gap: '1.5rem',
          }}
        >
          {/* Brand Logo & Tagline */}
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', textDecoration: 'none' }}>
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff',
                boxShadow: '0 4px 12px rgba(37, 99, 235, 0.4)',
              }}
            >
              <ShoppingBag size={22} />
            </div>
            <div>
              <div style={{ fontSize: '1.35rem', fontWeight: 800, letterSpacing: '-0.02em', color: '#ffffff', lineHeight: 1.1 }}>
                ShopNest
              </div>
              <div style={{ fontSize: '0.6875rem', color: '#94a3b8', fontWeight: 500 }}>
                Everything you need, in one place
              </div>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="desktop-menu" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <Link to="/products" style={{ fontWeight: 600, color: '#e2e8f0', fontSize: '0.925rem' }}>
              Products
            </Link>

            {isAuthenticated ? (
              <>
                <Link to="/orders" style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', color: '#e2e8f0', fontWeight: 600, fontSize: '0.925rem' }}>
                  <Package size={17} />
                  <span>Orders</span>
                </Link>

                <Link to="/profile" style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', color: '#e2e8f0', fontWeight: 600, fontSize: '0.925rem' }}>
                  <User size={17} />
                  <span>Hi, {user?.name || user?.email?.split('@')[0] || 'User'}</span>
                </Link>

                <button
                  onClick={handleLogout}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.375rem',
                    color: '#f87171',
                    fontWeight: 600,
                    fontSize: '0.925rem',
                    padding: '0.35rem 0.75rem',
                    borderRadius: 'var(--radius-sm)',
                    backgroundColor: 'rgba(239, 68, 68, 0.1)',
                  }}
                >
                  <LogOut size={16} />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <Link to="/login" className="btn btn-primary" style={{ padding: '0.45rem 1.1rem', fontSize: '0.875rem' }}>
                <User size={16} />
                <span>Login</span>
              </Link>
            )}

            {/* Cart Icon Button */}
            <Link
              to="/cart"
              style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '0.5rem',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                color: '#ffffff',
                textDecoration: 'none',
              }}
              aria-label="View Cart"
            >
              <ShoppingBag size={20} />
              {totalItems > 0 && (
                <span
                  style={{
                    position: 'absolute',
                    top: '-6px',
                    right: '-6px',
                    backgroundColor: 'var(--accent)',
                    color: '#ffffff',
                    fontSize: '0.75rem',
                    fontWeight: 800,
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
                  }}
                >
                  {totalItems}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="mobile-toggle" style={{ display: 'none' }}>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              style={{ color: '#ffffff', padding: '0.5rem' }}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Responsive Mobile Drawer */}
        {mobileOpen && (
          <div
            style={{
              padding: '1rem 0 1.5rem 0',
              borderTop: '1px solid #1e293b',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
            }}
          >
            <Link to="/products" onClick={() => setMobileOpen(false)} style={{ color: '#ffffff', fontWeight: 600 }}>
              Products
            </Link>
            <Link to="/cart" onClick={() => setMobileOpen(false)} style={{ color: '#ffffff', fontWeight: 600 }}>
              Cart ({totalItems})
            </Link>
            {isAuthenticated ? (
              <>
                <Link to="/orders" onClick={() => setMobileOpen(false)} style={{ color: '#ffffff', fontWeight: 600 }}>
                  My Orders
                </Link>
                <Link to="/profile" onClick={() => setMobileOpen(false)} style={{ color: '#ffffff', fontWeight: 600 }}>
                  My Profile ({user?.email})
                </Link>
                <button onClick={handleLogout} style={{ color: '#f87171', textAlign: 'left', fontWeight: 600 }}>
                  Logout
                </button>
              </>
            ) : (
              <Link to="/login" onClick={() => setMobileOpen(false)} style={{ color: 'var(--primary)', fontWeight: 700 }}>
                Login / Create Account
              </Link>
            )}
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .desktop-menu { display: none !important; }
          .mobile-toggle { display: block !important; }
        }
      `}</style>
    </header>
  );
};

export default Navbar;
