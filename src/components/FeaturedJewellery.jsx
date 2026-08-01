import React, { useState } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import ProductCard from './ProductCard';
import { PRODUCTS } from '../data/products';
import './FeaturedJewellery.css';

export default function FeaturedJewellery({ selectedCategory, onSelectCategory, onViewDetails }) {
  const [activeFilter, setActiveFilter] = useState("ALL");
  const [startIndex, setStartIndex] = useState(0);

  const currentCategoryFilter = selectedCategory && selectedCategory !== "ALL" ? selectedCategory : activeFilter;

  const filteredProducts = PRODUCTS.filter(p => {
    if (currentCategoryFilter === "ALL" || !currentCategoryFilter) return true;
    return p.category.toLowerCase() === currentCategoryFilter.toLowerCase();
  });

  const totalItems = filteredProducts.length;

  const handleNext = () => {
    if (totalItems === 0) return;
    setStartIndex(prev => (prev + 1) % totalItems);
  };

  const handlePrev = () => {
    if (totalItems === 0) return;
    setStartIndex(prev => (prev - 1 + totalItems) % totalItems);
  };

  const handleViewAllClick = () => {
    setActiveFilter("ALL");
    setStartIndex(0);
    if (onSelectCategory) {
      onSelectCategory(null);
    }
  };

  // Get 5 visible products starting from startIndex with circular wrapping
  const visibleCount = Math.min(5, totalItems);
  const visibleProducts = Array.from({ length: visibleCount }, (_, i) => {
    return filteredProducts[(startIndex + i) % totalItems];
  });

  return (
    <section id="featured-jewellery" className="featured-section">
      <div className="container">
        {/* Header matching exact layout in the screenshot */}
        <div className="featured-header-container">
          {/* Centered Title & Subtitle */}
          <div className="featured-header-center">
            <div className="featured-title-inline">
              <div className="title-divider-side left">
                <span className="divider-line"></span>
                <span className="divider-diamond">◈</span>
                <span className="divider-line-short"></span>
              </div>
              <h2 className="featured-title-text">FEATURED JEWELLERY</h2>
              <div className="title-divider-side right">
                <span className="divider-line-short"></span>
                <span className="divider-diamond">◈</span>
                <span className="divider-line"></span>
              </div>
            </div>
            <p className="featured-subtitle">Exquisite designs, timeless craftsmanship.</p>
          </div>

          {/* Top Right Action Controls (VIEW ALL + Interactive Slider Navigation) */}
          <div className="featured-header-right">
            <button 
              className="btn-view-all-rect"
              onClick={handleViewAllClick}
            >
              VIEW ALL
            </button>
            <div className="carousel-nav-arrows">
              <button 
                className="nav-arrow" 
                onClick={handlePrev}
                aria-label="Previous featured product"
              >
                <FiChevronLeft size={16} />
              </button>
              <button 
                className="nav-arrow" 
                onClick={handleNext}
                aria-label="Next featured product"
              >
                <FiChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* 5-Column Interactive Slider Product Grid */}
        <div className="featured-grid-5col">
          {visibleProducts.map((product, idx) => (
            <ProductCard 
              key={`${product.id}-${idx}`} 
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
