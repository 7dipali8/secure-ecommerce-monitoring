import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, ShieldCheck, Cpu } from 'lucide-react';

const Footer = () => {
  return (
    <footer
      style={{
        backgroundColor: 'var(--secondary)',
        color: '#94a3b8',
        padding: '3rem 0 2rem 0',
        marginTop: 'auto',
        borderTop: '1px solid #1e293b',
      }}
    >
      <div className="app-container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '2.5rem',
            marginBottom: '2.5rem',
          }}
        >
          {/* Brand Bio */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', marginBottom: '0.75rem' }}>
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: 'var(--primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff',
                }}
              >
                <ShoppingBag size={18} />
              </div>
              <span style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff' }}>ShopNest</span>
            </div>
            <p style={{ fontSize: '0.875rem', lineHeight: 1.6, color: '#cbd5e1' }}>
              Everything you need, in one place.
            </p>
            <p style={{ fontSize: '0.8125rem', color: '#64748b', marginTop: '0.75rem' }}>
              Your trusted marketplace for authentic accessories, tech gadgets, and everyday essentials.
            </p>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 style={{ color: '#ffffff', fontSize: '0.9375rem', fontWeight: 700, marginBottom: '1rem' }}>Quick Links</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.625rem', fontSize: '0.875rem' }}>
              <li><Link to="/products" style={{ color: '#cbd5e1' }}>All Products</Link></li>
              <li><Link to="/cart" style={{ color: '#cbd5e1' }}>My Cart</Link></li>
              <li><Link to="/orders" style={{ color: '#cbd5e1' }}>Track Orders</Link></li>
              <li><Link to="/profile" style={{ color: '#cbd5e1' }}>My Account</Link></li>
            </ul>
          </div>

          {/* Product Categories */}
          <div>
            <h4 style={{ color: '#ffffff', fontSize: '0.9375rem', fontWeight: 700, marginBottom: '1rem' }}>Categories</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.625rem', fontSize: '0.875rem' }}>
              <li><Link to="/products" style={{ color: '#cbd5e1' }}>Audio & Sound</Link></li>
              <li><Link to="/products" style={{ color: '#cbd5e1' }}>Tech Accessories</Link></li>
              <li><Link to="/products" style={{ color: '#cbd5e1' }}>Smart Wearables</Link></li>
              <li><Link to="/products" style={{ color: '#cbd5e1' }}>Bags & Gear</Link></li>
            </ul>
          </div>

          {/* Architecture Badge */}
          <div>
            <h4 style={{ color: '#ffffff', fontSize: '0.9375rem', fontWeight: 700, marginBottom: '1rem' }}>Tech Stack</h4>
            <div
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.04)',
                padding: '1rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#60a5fa', fontWeight: 600, fontSize: '0.8125rem', marginBottom: '0.375rem' }}>
                <Cpu size={16} />
                <span>Enterprise Microservices</span>
              </div>
              <p style={{ fontSize: '0.8125rem', color: '#94a3b8', lineHeight: 1.4 }}>
                Built with React, NestJS, AWS and Kubernetes.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          style={{
            paddingTop: '1.5rem',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '0.8125rem',
            flexWrap: 'wrap',
            gap: '1rem',
          }}
        >
          <div>© 2026 ShopNest. All rights reserved.</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', color: '#64748b' }}>
            <ShieldCheck size={14} />
            <span>Secure 256-Bit SSL Encrypted</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
