import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Check } from 'lucide-react';
import { formatPrice } from '../utils/helpers';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const [adding, setAdding] = useState(false);
  const [addedSuccess, setAddedSuccess] = useState(false);

  if (!product) return null;

  const { id, name, description, price, category, stock, imageUrl } = product;

  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setAdding(true);
    const result = await addToCart(id, 1, product);
    setAdding(false);
    if (result.success) {
      setAddedSuccess(true);
      setTimeout(() => setAddedSuccess(false), 2000);
    }
  };


  const imageSrc = imageUrl;

  return (
    <div className="card card-hover" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Product Image Container */}
      <Link to={`/products/${id}`} style={{ position: 'relative', overflow: 'hidden', paddingTop: '75%', backgroundColor: '#f1f5f9' }}>
        {imageSrc && (
          <img
            src={imageSrc}
            alt={name}
            onError={(e) => { e.currentTarget.style.display = "none"; }}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'transform 0.3s ease',
            }}
            loading="lazy"
          />
        )}
        {category && (
          <span
            className="badge badge-primary"
            style={{
              position: 'absolute',
              top: '10px',
              left: '10px',
              backdropFilter: 'blur(4px)',
              boxShadow: 'var(--shadow-sm)',
            }}
          >
            {category}
          </span>
        )}
      </Link>

      {/* Product Information */}
      <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
        <Link to={`/products/${id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
          <h3
            style={{
              fontSize: '1rem',
              fontWeight: 700,
              lineHeight: 1.35,
              marginBottom: '0.4rem',
              color: 'var(--text-main)',
              display: '-webkit-box',
              WebkitLineClamp: 1,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
            title={name}
          >
            {name}
          </h3>
        </Link>

        {description && (
          <p
            style={{
              fontSize: '0.8125rem',
              color: 'var(--text-muted)',
              marginBottom: '0.75rem',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              lineHeight: 1.4,
              minHeight: '2.25rem',
            }}
          >
            {description}
          </p>
        )}

        <div style={{ marginTop: 'auto', paddingTop: '0.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-main)' }}>
              {formatPrice(price)}
            </span>
            <span
              style={{
                fontSize: '0.75rem',
                fontWeight: 600,
                color: stock > 0 ? 'var(--success)' : 'var(--error)',
              }}
            >
              {stock > 0 ? `${stock} left` : 'Out of Stock'}
            </span>
          </div>

          <button
            onClick={handleAddToCart}
            disabled={adding || stock <= 0}
            className={`btn ${addedSuccess ? 'btn-secondary' : 'btn-primary'} btn-full`}
            style={{ padding: '0.55rem', fontSize: '0.85rem' }}
          >
            {addedSuccess ? (
              <>
                <Check size={16} />
                <span>Added</span>
              </>
            ) : (
              <>
                <ShoppingBag size={16} />
                <span>{adding ? 'Adding...' : 'Add to Cart'}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
