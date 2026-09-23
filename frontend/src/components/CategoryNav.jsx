import React from 'react';
import { Layers, Headphones, Cable, Watch, ShoppingBag, Zap } from 'lucide-react';

const DEFAULT_CATEGORIES = [
  { name: 'All', icon: Layers },
  { name: 'Audio', icon: Headphones },
  { name: 'Accessories', icon: Cable },
  { name: 'Wearables', icon: Watch },
  { name: 'Bags', icon: ShoppingBag },
  { name: 'Chargers', icon: Zap },
];

const CategoryNav = ({ selectedCategory, onSelectCategory, categories = DEFAULT_CATEGORIES }) => {
  return (
    <nav className="category-nav-bar" style={{ padding: '0.75rem 0', overflowX: 'auto', maxWidth: '100%', width: '100%' }}>
      <div style={{ display: 'flex', gap: '0.625rem', alignItems: 'center' }}>
        {categories.map((cat) => {
          const categoryName = typeof cat === 'string' ? cat : cat.name;
          const isSelected = selectedCategory === categoryName;
          const Icon = typeof cat === 'object' && cat.icon ? cat.icon : Layers;

          return (
            <button
              key={categoryName}
              onClick={() => onSelectCategory(categoryName)}
              className={`btn ${isSelected ? 'btn-primary' : 'btn-outline'}`}
              style={{
                borderRadius: 'var(--radius-full)',
                padding: '0.45rem 1rem',
                fontSize: '0.85rem',
                whiteSpace: 'nowrap',
                boxShadow: isSelected ? 'var(--shadow-md)' : 'none',
              }}
            >
              <Icon size={15} />
              <span>{categoryName}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default CategoryNav;
