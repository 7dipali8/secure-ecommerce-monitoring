/**
 * Product-specific image mapping.
 * Database currently contains example.com placeholder URLs,
 * so those URLs are intentionally ignored.
 */

const PRODUCT_IMAGES = {
  'Wireless Headphones':
    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=80',

  'Mechanical Keyboard':
    'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&auto=format&fit=crop&q=80',

  'Smart Watch':
    'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=80',

  'Laptop Backpack':
    'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&auto=format&fit=crop&q=80',

  'USB-C Fast Charger':
    'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&fm=jpg&q=80&w=500',

  'Wireless Earbuds':
    'https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=500&auto=format&fit=crop&q=80',

  'Bluetooth Speaker':
    'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&auto=format&fit=crop&q=80',

  'Gaming Mouse':
    'https://images.unsplash.com/photo-1527814050087-3793815479db?w=500&auto=format&fit=crop&q=80',

  'Wireless Mouse':
    'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=500&auto=format&fit=crop&q=80',

  'HD Webcam':
    'https://images.unsplash.com/photo-1760348213920-d2a90ed705fd?auto=format&fit=crop&fm=jpg&q=80&w=500',

  'Laptop Stand':
    'https://unsplash.com/photos/wLXk9eHYE0A/download?force=true',

  'USB-C Hub':
    'https://unsplash.com/photos/4nVJUZEJb3s/download?force=true',

  'Power Bank 20000mAh':
    'https://unsplash.com/photos/UP_RojtnvTU/download?force=true',

  'Fast Charging Cable':
    'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=500&auto=format&fit=crop&q=80',

  'Smartphone Case':
    'https://unsplash.com/photos/FQXbLmlmvWY/download?force=true',

  'Smart Band':
    'https://images.unsplash.com/photo-1557935728-e6d1eaabe558?w=500&auto=format&fit=crop&q=80',

  'Laptop Backpack Pro':
    'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=500&auto=format&fit=crop&q=80',

  'Travel Backpack':
    'https://images.unsplash.com/photo-1551632811-561732d1e306?w=500&auto=format&fit=crop&q=80',

  'USB Flash Drive 64GB':
    'https://unsplash.com/photos/JWydjixDw1M/download?force=true',

  'Portable SSD 500GB':
    'https://unsplash.com/photos/W4GR5u0M2JQ/download?force=true',

  'MicroSD Card 128GB':
    'https://images.unsplash.com/photo-1546526155-29858d428a5f?auto=format&fit=crop&fm=jpg&q=80&w=500',

  'Wi-Fi Router':
    'https://images.unsplash.com/photo-1606904825846-647eb07f5be2?w=500&auto=format&fit=crop&q=80',

  'Ethernet Cable 10m':
    'https://unsplash.com/photos/PSpf_XgOM5w/download?force=true',

  'Desk Lamp':
    'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500&auto=format&fit=crop&q=80',


  'Running Shoes':
    'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&auto=format&fit=crop&q=80',

  'Sports Training Shoes':
    'https://images.unsplash.com/photo-1552346154-21d32810aba3?w=500&auto=format&fit=crop&q=80',

  'Football':
    'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=500&auto=format&fit=crop&q=80',

  'Cricket Bat':
    '/products/cricket-bat.jpg',

  'Cricket Ball':
    '/products/cricket-ball.jpg',

  'Badminton Racket':
    'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=500&auto=format&fit=crop&q=80',

  'Basketball':
    'https://images.unsplash.com/photo-1519861531473-9200262188bf?w=500&auto=format&fit=crop&q=80',

  'Yoga Mat':
    'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500&auto=format&fit=crop&q=80',

  'Resistance Bands':
    'https://images.unsplash.com/photo-1598971639058-fab3c3109a00?w=500&auto=format&fit=crop&q=80',

  'Skipping Rope':
    'https://images.unsplash.com/photo-1598289431512-b97b0917affc?w=500&auto=format&fit=crop&q=80',


  'Pro Running Shoes':
    'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&auto=format&fit=crop&q=80',

  'Trail Running Shoes':
    'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=500&auto=format&fit=crop&q=80',

  'Marathon Running Shoes':
    'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=500&auto=format&fit=crop&q=80',

  'Sprint Running Shoes':
    'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=500&auto=format&fit=crop&q=80',

  'Football Training Shoes':
    'https://images.unsplash.com/photo-1511886929837-354d827aae26?w=500&auto=format&fit=crop&q=80',

  'Football Studs':
    'https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=500&auto=format&fit=crop&q=80',

  'Professional Football':
    'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=500&auto=format&fit=crop&q=80',

  'Training Football':
    'https://images.unsplash.com/photo-1553778263-73a83bab9b0c?w=500&auto=format&fit=crop&q=80',

  'Cricket Bat English Willow':
    '/products/cricket-bat-english-willow.jpg',

  'Cricket Bat Kashmir Willow':
    '/products/cricket-bat-kashmir-willow.jpg',

  'Cricket Bat Junior':
    '/products/cricket-bat-junior.jpg',

  'Leather Cricket Ball':
    '/products/leather-cricket-ball.png',

  'Practice Cricket Ball':
    '/products/practice-cricket-ball.jpg',

  'Cricket Batting Gloves':
    '/products/cricket-batting-gloves.jpg',

  'Cricket Helmet':
    '/products/cricket-helmet.jpg',

  'Cricket Leg Guards':
    '/products/cricket-leg-guards.jpg',

  'Badminton Racket Pro':
    'https://images.unsplash.com/photo-1722003180803-577efd6d2ecc?auto=format&fit=crop&q=80&w=600',

  'Badminton Racket Beginner':
    'https://images.unsplash.com/photo-1722003180803-577efd6d2ecc?auto=format&fit=crop&q=80&w=600',

  'Badminton Shuttlecocks':
    'https://images.unsplash.com/photo-1542308743-d21b236ab3f0?auto=format&fit=crop&q=80&w=600',

  'Badminton Net':
    'https://images.unsplash.com/photo-1759819599139-11dc50b241c2?auto=format&fit=crop&q=80&w=600',

  'Basketball Pro':
    'https://images.unsplash.com/photo-1519861531473-9200262188bf?auto=format&fit=crop&q=80&w=600',

  'Basketball Training':
    'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&q=80&w=600',

  'Basketball Shoes':
    'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&q=80&w=600',

  'Basketball Hoop':
    'https://images.unsplash.com/photo-1505666287802-931dc83948e3?auto=format&fit=crop&q=80&w=600',

  'Volleyball':
    'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?auto=format&fit=crop&q=80&w=600',

  'Volleyball Net':
    'https://images.unsplash.com/photo-1592656094267-764a45160876?auto=format&fit=crop&q=80&w=600',



























  'Mechanical Number Pad':
    'https://images.unsplash.com/photo-1595225476474-87563907a212?w=500&auto=format&fit=crop&q=80'
};

const CATEGORY_PLACEHOLDERS = {
  Audio:
    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=80',

  Accessories:
    'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&auto=format&fit=crop&q=80',

  Wearables:
    'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=80',

  Bags:
    'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&auto=format&fit=crop&q=80',

  Chargers:
    'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=500&auto=format&fit=crop&q=80',

  Sports:
    'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=500&auto=format&fit=crop&q=80',

  Cricket:
    'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=500&auto=format&fit=crop&q=80',

  Badminton:
    'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=500&auto=format&fit=crop&q=80',

  Basketball:
    'https://images.unsplash.com/photo-1519861531473-9200262188bf?w=500&auto=format&fit=crop&q=80',

  Volleyball:
    'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?w=500&auto=format&fit=crop&q=80',

  Football:
    'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=500&auto=format&fit=crop&q=80',

  Fitness:
    'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=500&auto=format&fit=crop&q=80',

  Running:
    'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=500&auto=format&fit=crop&q=80',

  Yoga:
    'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500&auto=format&fit=crop&q=80',

  Default:
    'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=500&auto=format&fit=crop&q=80'
};

export const getProductImage = (imageUrl, name, category) => {
  // Ignore the current example.com placeholder URLs.
  if (
    imageUrl &&
    typeof imageUrl === 'string' &&
    imageUrl.trim().startsWith('http') &&
    !imageUrl.includes('example.com')
  ) {
    return imageUrl.trim();
  }

  // Use a unique image for each known product.
  if (name && PRODUCT_IMAGES[name]) {
    return PRODUCT_IMAGES[name];
  }

  // Category fallback for any future product.
  return CATEGORY_PLACEHOLDERS[category] || CATEGORY_PLACEHOLDERS.Default;
};

export const handleImageError = (e, name, category) => {
  e.target.onerror = null;

  if (name && PRODUCT_IMAGES[name]) {
    e.target.src = PRODUCT_IMAGES[name];
    return;
  }

  e.target.src =
    CATEGORY_PLACEHOLDERS[category] || CATEGORY_PLACEHOLDERS.Default;
};
