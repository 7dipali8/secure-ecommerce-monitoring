import React from 'react';
import { Link } from 'react-router-dom';
import { PackageOpen, ArrowRight } from 'lucide-react';

const EmptyState = ({
  icon: Icon = PackageOpen,
  title = 'No products found',
  subtitle = 'We couldn\'t find anything matching your search criteria.',
  actionLink = '/products',
  actionText = 'Explore Products',
}) => {
  return (
    <div
      style={{
        padding: '3.5rem 1.5rem',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'var(--bg-card)',
        borderRadius: 'var(--radius-xl)',
        border: '1.5px dashed var(--border-color)',
        margin: '2rem 0',
      }}
    >
      <div
        style={{
          width: '64px',
          height: '64px',
          borderRadius: '50%',
          backgroundColor: 'var(--primary-light)',
          color: 'var(--primary)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '1rem',
        }}
      >
        <Icon size={32} />
      </div>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.4rem' }}>
        {title}
      </h3>

      <p style={{ color: 'var(--text-muted)', fontSize: '0.925rem', maxWidth: '400px', marginBottom: '1.5rem' }}>
        {subtitle}
      </p>

      {actionLink && actionText && (
        <Link to={actionLink} className="btn btn-primary">
          <span>{actionText}</span>
          <ArrowRight size={16} />
        </Link>
      )}
    </div>
  );
};

export default EmptyState;
