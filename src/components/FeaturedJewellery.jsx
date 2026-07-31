import React, { useState } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import ProductCard from './ProductCard';
import { PRODUCTS } from '../data/products';
import './FeaturedJewellery.css';

export default function FeaturedJewellery({ selectedCategory, onSelectCategory, onViewDetails }) {
  const [activeFilter, setActiveFilter] = useState("ALL");

  const filterOptions = ["ALL", "Necklaces", "Earrings", "Bangles", "Rings", "Pendants", "Antique"];

  const currentCategoryFilter = selectedCategory && selectedCategory !== "ALL" ? selectedCategory : activeFilter;

  const filteredProducts = PRODUCTS.filter(p => {
    if (currentCategoryFilter === "ALL" || !currentCategoryFilter) return true;
    return p.category.toLowerCase() === currentCategoryFilter.toLowerCase();
  });

  const handleFilterClick = (filter) => {
    setActiveFilter(filter);
    if (onSelectCategory) {
      onSelectCategory(filter === "ALL" ? null : filter);
    }
  };

  return (
    <section id="featured-jewellery" className="featured-section">
      <div className="container">
        {/* Header with Title & Controls */}
        <div className="featured-header">
          <div className="featured-title-block">
            <div className="section-divider-left">
              <span>✦</span>
              <span className="section-divider-line-short"></span>
            </div>
            <h2 className="section-title text-left">FEATURED JEWELLERY</h2>
            <p className="section-subtitle">Exquisite designs, timeless craftsmanship.</p>
          </div>

          <div className="featured-header-actions">
            <button 
              className="btn-view-all"
              onClick={() => handleFilterClick("ALL")}
            >
              VIEW ALL
            </button>
            <div className="carousel-nav-arrows">
              <button className="nav-arrow" aria-label="Previous page">
                <FiChevronLeft size={20} />
              </button>
              <button className="nav-arrow" aria-label="Next page">
                <FiChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="filter-pills-bar">
          {filterOptions.map((filter, idx) => (
            <button
              key={idx}
              className={`filter-pill ${currentCategoryFilter.toLowerCase() === filter.toLowerCase() ? 'active' : ''}`}
              onClick={() => handleFilterClick(filter)}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* 5-Column Grid */}
        <div className="featured-grid">
          {filteredProducts.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onViewDetails={onViewDetails}
            />
          ))}
        </div>

        {/* Disclaimer Note */}
        <div className="price-disclaimer">
          <p>*Prices are indicative and may vary. Final price & quotation will be shared on WhatsApp.</p>
        </div>
      </div>
    </section>
  );
}
