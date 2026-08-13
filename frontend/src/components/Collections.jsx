import React, { useState, useEffect } from 'react';
import { CATEGORIES as FALLBACK_CATEGORIES } from '../data/categories';
import { fetchApiCategories } from '../utils/api';
import './Collections.css';

export default function Collections({ onSelectCategory, selectedCategory }) {
  const [categoriesList, setCategoriesList] = useState(FALLBACK_CATEGORIES);

  useEffect(() => {
    fetchApiCategories().then(cats => {
      if (cats && cats.length > 0) {
        setCategoriesList(cats);
      }
    });
  }, []);

  const handleCategoryClick = (categoryName) => {
    if (onSelectCategory) {
      onSelectCategory(categoryName);
    }
    const targetSection = document.getElementById('collections-catalogue') || document.getElementById('featured-jewellery');
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="collections" className="collections-section" aria-label="Jewellery Categories">
      <div className="container">
        {/* Inline Section Header */}
        <div className="collections-header-inline">
          <div className="collections-divider-side left">
            <span className="divider-line"></span>
            <span className="divider-diamond">◈</span>
            <span className="divider-line-short"></span>
          </div>
          <h2 className="collections-title-text">EXPLORE OUR SIGNATURE COLLECTIONS</h2>
          <div className="collections-divider-side right">
            <span className="divider-line-short"></span>
            <span className="divider-diamond">◈</span>
            <span className="divider-line"></span>
          </div>
        </div>
        <p className="section-tagline">HANDCRAFTED 22K GOLD • ROYAL POLKI • KUNDAN • ANTIQUE TEMPLE HEIRLOOMS IN GUNTUR</p>

        {/* Circular Categories Grid */}
        <div className="collections-grid">
          {categoriesList.map((cat) => {
            const isSelected = selectedCategory === cat.name;
            return (
              <div 
                key={cat.id} 
                className={`collection-card ${isSelected ? 'active' : ''}`}
                onClick={() => handleCategoryClick(cat.name)}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleCategoryClick(cat.name)}
                role="button"
                tabIndex={0}
                aria-label={`Explore ${cat.name} Collection`}
              >
                <div className="collection-image-wrapper">
                  <div className="gold-ring-glow"></div>
                  <img 
                    src={cat.image} 
                    alt={`Althaf Jewellery Makers - ${cat.name} 22K Gold Collection Guntur`} 
                    className="collection-image" 
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = "/images/products/heritage-necklace.png";
                    }}
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
