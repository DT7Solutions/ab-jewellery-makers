import React from 'react';
import { CATEGORIES } from '../data/categories';
import './Collections.css';

export default function Collections({ onSelectCategory, selectedCategory }) {
  const handleCategoryClick = (categoryName) => {
    if (onSelectCategory) {
      onSelectCategory(categoryName);
    }
    const featuredSection = document.getElementById('featured-jewellery');
    if (featuredSection) {
      featuredSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="collections" className="collections-section">
      <div className="container">
        {/* Inline Section Header matching user image */}
        <div className="collections-header-inline">
          <div className="collections-divider-side left">
            <span className="divider-line"></span>
            <span className="divider-diamond">◈</span>
            <span className="divider-line-short"></span>
          </div>
          <h2 className="collections-title-text">EXPLORE OUR COLLECTIONS</h2>
          <div className="collections-divider-side right">
            <span className="divider-line-short"></span>
            <span className="divider-diamond">◈</span>
            <span className="divider-line"></span>
          </div>
        </div>

        {/* Circular Categories Grid */}
        <div className="collections-grid">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.name;
            return (
              <div 
                key={cat.id} 
                className={`collection-card ${isSelected ? 'active' : ''}`}
                onClick={() => handleCategoryClick(cat.name)}
                role="button"
                tabIndex={0}
              >
                <div className="collection-image-wrapper">
                  <div className="gold-ring-glow"></div>
                  <img 
                    src={cat.image} 
                    alt={cat.name} 
                    className="collection-image" 
                    loading="lazy"
                  />
                </div>
                <h3 className="collection-name">{cat.name}</h3>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
