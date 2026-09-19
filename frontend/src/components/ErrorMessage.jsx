import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

const ErrorMessage = ({ title = 'Something went wrong', message, onRetry }) => {
  return (
    <div
      className="card"
      style={{
        padding: '2rem',
        maxWidth: '500px',
        margin: '2rem auto',
        textAlign: 'center',
        borderLeft: '4px solid var(--error)',
      }}
    >
      <div
        style={{
          width: '48px',
          height: '48px',
          borderRadius: '50%',
          backgroundColor: 'var(--error-bg)',
          color: 'var(--error)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 1rem auto',
        }}
      >
        <AlertTriangle size={24} />
      </div>

      <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.5rem' }}>
        {title}
      </h3>

      {message && (
        <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '1.25rem' }}>
          {message}
        </p>
      )}

      {onRetry && (
        <button onClick={onRetry} className="btn btn-outline" style={{ margin: '0 auto' }}>
          <RefreshCw size={16} />
          <span>Try Again</span>
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;
