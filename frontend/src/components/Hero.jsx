import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, ArrowRight, ShieldCheck, Truck, Headphones } from 'lucide-react';

const Hero = () => {
  return (
    <section
      style={{
        position: 'relative',
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #1e40af 100%)',
        color: '#ffffff',
        borderRadius: 'var(--radius-xl)',
        padding: '3.5rem 2.5rem',
        margin: '1rem 0 2.5rem 0',
        overflow: 'hidden',
        width: '100%',
        maxWidth: '100%',
        boxSizing: 'border-box',
        boxShadow: 'var(--shadow-xl)',
      }}
    >
      <div style={{ position: 'relative', zIndex: 2, maxWidth: '650px' }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.35rem 0.85rem',
            borderRadius: 'var(--radius-full)',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(8px)',
            fontSize: '0.8125rem',
            fontWeight: 700,
            color: '#93c5fd',
            marginBottom: '1.25rem',
            border: '1px solid rgba(255, 255, 255, 0.15)',
          }}
        >
          <ShieldCheck size={16} />
          <span>Verified Electronics & Accessories</span>
        </div>

        <h1
          style={{
            fontSize: 'clamp(2.2rem, 4vw, 3.2rem)',
            fontWeight: 800,
            lineHeight: 1.15,
            letterSpacing: '-0.025em',
            marginBottom: '1.25rem',
          }}
        >
          Everything you need,<br />
          <span style={{ color: '#60a5fa' }}>in one place.</span>
        </h1>

        <p
          style={{
            fontSize: '1.1rem',
            color: '#cbd5e1',
            lineHeight: 1.6,
            marginBottom: '2rem',
            maxWidth: '520px',
          }}
        >
          Discover accessories, gadgets and everyday tech products at great prices.
        </p>

        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <Link
            to="/products"
            className="btn btn-primary"
            style={{
              padding: '0.85rem 2rem',
              fontSize: '1rem',
              borderRadius: 'var(--radius-md)',
              boxShadow: '0 4px 14px rgba(37, 99, 235, 0.5)',
            }}
          >
            <span>Shop Now</span>
            <ArrowRight size={18} />
          </Link>
        </div>

        {/* Value Props Row */}
        <div
          style={{
            display: 'flex',
            gap: '2rem',
            marginTop: '3rem',
            paddingTop: '1.5rem',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            flexWrap: 'wrap',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', fontSize: '0.85rem', color: '#94a3b8' }}>
            <Truck size={18} color="#60a5fa" />
            <span>Fast Express Delivery</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', fontSize: '0.85rem', color: '#94a3b8' }}>
            <ShieldCheck size={18} color="#60a5fa" />
            <span>100% Authentic Stock</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', fontSize: '0.85rem', color: '#94a3b8' }}>
            <Headphones size={18} color="#60a5fa" />
            <span>24/7 Dedicated Support</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
