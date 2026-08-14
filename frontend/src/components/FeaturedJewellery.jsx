import React, { useState, useEffect } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import ProductCard from './ProductCard';
import { PRODUCTS as FALLBACK_PRODUCTS } from '../data/products';
import { fetchApiProducts } from '../utils/api';
import './FeaturedJewellery.css';

export default function FeaturedJewellery({ selectedCategory, onSelectCategory, onViewDetails }) {
  const [activeFilter, setActiveFilter] = useState("ALL");
  const [startIndex, setStartIndex] = useState(0);
  const [productsList, setProductsList] = useState(FALLBACK_PRODUCTS);

  const currentCategoryFilter = selectedCategory && selectedCategory !== "ALL" ? selectedCategory : activeFilter;

  useEffect(() => {
    fetchApiProducts(currentCategoryFilter).then(prods => {
      if (prods && prods.length > 0) {
        setProductsList(prods);
        setStartIndex(0);
      }
    });
  }, [currentCategoryFilter]);

  const totalItems = productsList.length;

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
    return productsList[(startIndex + i) % totalItems];
  });

  return (
    <section id="featured-jewellery" className="featured-section" aria-label="Featured Jewellery Catalogue">
      <div className="container">
        {/* Header */}
        <div className="featured-header-container">
          {/* Centered Title & Subtitle */}
          <div className="featured-header-center">
            <div className="featured-title-inline">
              <div className="title-divider-side left">
                <span className="divider-line"></span>
                <span className="divider-diamond">◈</span>
                <span className="divider-line-short"></span>
              </div>
              <h2 className="featured-title-text">FEATURED 22K GOLD JEWELLERY</h2>
              <div className="title-divider-side right">
                <span className="divider-line-short"></span>
                <span className="divider-diamond">◈</span>
                <span className="divider-line"></span>
              </div>
            </div>
            <p className="featured-subtitle">ROYAL BIS 916 HALLMARKED CREATIONS HANDCRAFTED FOR YOUR CELEBRATIONS IN TENALI</p>
          </div>

          {/* Top Right Action Controls */}
          <div className="featured-header-right">
            <button 
              className="btn-view-all-rect"
              onClick={handleViewAllClick}
              aria-label="View all featured jewellery designs"
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
          <p>*All designs handcrafted in 100% BIS 916 hallmarked pure gold. Live rate quotation shared on WhatsApp enquiry.</p>
        </div>
      </div>
    </section>
  );
}
