import React from 'react';

const SkeletonLoader = ({ type = 'card' }) => {
  if (type === 'card') {
    return (
      <div className="card" style={{ height: '340px', display: 'flex', flexDirection: 'column' }}>
        <div className="skeleton" style={{ width: '100%', height: '180px' }} />
        <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.625rem', flex: 1 }}>
          <div className="skeleton" style={{ width: '80%', height: '18px' }} />
          <div className="skeleton" style={{ width: '100%', height: '14px' }} />
          <div className="skeleton" style={{ width: '60%', height: '14px' }} />
          <div className="skeleton" style={{ width: '40%', height: '22px', marginTop: 'auto' }} />
        </div>
      </div>
    );
  }

  return <div className="skeleton" style={{ width: '100%', height: '100px' }} />;
};

export default SkeletonLoader;
