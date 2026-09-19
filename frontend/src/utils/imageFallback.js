/**
 * High quality category placeholder image URLs & SVG fallback generator
 */
const CATEGORY_PLACEHOLDERS = {
  Audio: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=80',
  Accessories: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&auto=format&fit=crop&q=80',
  Wearables: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=80',
  Bags: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&auto=format&fit=crop&q=80',
  Chargers: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=500&auto=format&fit=crop&q=80',
  Default: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=500&auto=format&fit=crop&q=80'
};

export const getProductImage = (imageUrl, category) => {
  if (imageUrl && typeof imageUrl === 'string' && imageUrl.trim().startsWith('http')) {
    return imageUrl.trim();
  }
  return CATEGORY_PLACEHOLDERS[category] || CATEGORY_PLACEHOLDERS.Default;
};

export const handleImageError = (e, category) => {
  e.target.onerror = null;
  e.target.src = CATEGORY_PLACEHOLDERS[category] || CATEGORY_PLACEHOLDERS.Default;
};
