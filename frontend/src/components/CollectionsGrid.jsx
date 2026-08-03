import React, { useState, useMemo, useEffect } from 'react';
import { FiSearch, FiSliders, FiCheck, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import ProductCard from './ProductCard';
import { PRODUCTS as FALLBACK_PRODUCTS } from '../data/products';
import { fetchApiProducts } from '../utils/api';
import './CollectionsGrid.css';

const CATEGORY_LIST = [
  "ALL",
  "NECKLACES",
  "EARRINGS",
  "BANGLES",
  "RINGS",
  "PENDANTS",
  "ANTIQUE",
  "BRACELETS",
  "MANGALSUTRA"
];

const METAL_LIST = [
  "ALL METALS",
  "22K GOLD",
  "POLKI",
  "KUNDAN"
];

const ITEMS_PER_PAGE = 8;

export default function CollectionsGrid({ selectedCategory, onSelectCategory, onViewDetails }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMetal, setSelectedMetal] = useState("ALL METALS");
  const [sortBy, setSortBy] = useState("featured");
  const [currentPage, setCurrentPage] = useState(1);
  const [productsList, setProductsList] = useState(FALLBACK_PRODUCTS);

  // Determine active category from prop or local
  const activeCategory = selectedCategory || "ALL";

  useEffect(() => {
    fetchApiProducts(activeCategory).then(prods => {
      if (prods && prods.length > 0) {
        setProductsList(prods);
      }
    });
  }, [activeCategory]);

  const handleCategoryChange = (catName) => {
    if (onSelectCategory) {
      onSelectCategory(catName === "ALL" ? null : catName);
    }
  };

  // Reset to page 1 whenever any filter or search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory, selectedMetal, searchQuery, sortBy]);

  // Filter & Sort logic
  const filteredProducts = useMemo(() => {
    return productsList.filter(product => {
      const prodCategory = (product.category || "").toUpperCase();
      const prodPurity = (product.purity || "").toUpperCase();
      const prodMetal = (product.metal || "").toUpperCase();
      const prodName = (product.name || "").toUpperCase();
      const prodDesc = (product.description || "").toUpperCase();

      // 1. Category Filter
      if (activeCategory !== "ALL") {
        if (prodCategory !== activeCategory.toUpperCase()) {
          return false;
        }
      }

      // 2. Metal / Craft Filter
      if (selectedMetal !== "ALL METALS") {
        if (selectedMetal === "22K GOLD" && !prodPurity.includes("22K")) return false;
        if (selectedMetal === "POLKI" && !prodMetal.includes("POLKI") && !prodName.includes("POLKI") && !prodDesc.includes("POLKI")) return false;
        if (selectedMetal === "KUNDAN" && !prodMetal.includes("KUNDAN") && !prodName.includes("KUNDAN") && !prodDesc.includes("KUNDAN")) return false;
      }

      // 3. Search Filter
      if (searchQuery.trim() !== "") {
        const query = searchQuery.toLowerCase();
        const matchName = (product.name || "").toLowerCase().includes(query);
        const matchCategory = (product.category || "").toLowerCase().includes(query);
        const matchDesc = (product.description || "").toLowerCase().includes(query);
        if (!matchName && !matchCategory && !matchDesc) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === "price-low") return (a.price || 0) - (b.price || 0);
      if (sortBy === "price-high") return (b.price || 0) - (a.price || 0);
      if (sortBy === "weight-low") return parseFloat(a.weight || 0) - parseFloat(b.weight || 0);
      if (sortBy === "name") return (a.name || "").localeCompare(b.name || "");
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }, [productsList, activeCategory, selectedMetal, searchQuery, sortBy]);

  // Pagination Math
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const startProductIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedProducts = filteredProducts.slice(startProductIndex, startProductIndex + ITEMS_PER_PAGE);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      const catalogueElement = document.getElementById('collections-catalogue');
      if (catalogueElement) {
        catalogueElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  // Count items per category for filter pill badges
  const getCategoryCount = (catName) => {
    if (catName === "ALL") return productsList.length;
    return productsList.filter(p => (p.category || '').toUpperCase() === catName.toUpperCase()).length;
  };

  return (
    <section id="collections-catalogue" className="collections-grid-section">
      <div className="container">
        {/* Section Header */}
        <div className="cg-header">
          <span className="cg-tag">OUR EXQUISITE CREATIONS</span>
          <h2 className="cg-title">COLLECTION CATALOGUE</h2>
          <div className="cg-divider">
            <span className="cg-line"></span>
            <span className="cg-crest">❖</span>
            <span className="cg-line"></span>
          </div>
          <p className="cg-subtitle">
            Explore handcrafted 22K Gold, Polki, Kundan, and Antique heirlooms filtered by collection.
          </p>
        </div>

        {/* Category Filter Pills Bar */}
        <div className="cg-category-pills">
          {CATEGORY_LIST.map((cat) => {
            const isSelected = activeCategory.toUpperCase() === cat.toUpperCase();
            const count = getCategoryCount(cat);
            return (
              <button
                key={cat}
                className={`cg-pill ${isSelected ? 'active' : ''}`}
                onClick={() => handleCategoryChange(cat)}
              >
                <span>{cat}</span>
                <span className="cg-pill-count">({count})</span>
              </button>
            );
          })}
        </div>

        {/* Filter Controls Toolbar (Search, Metal Pill Filters & Sort Dropdown) */}
        <div className="cg-toolbar">
          {/* Metal Filter Pills */}
          <div className="cg-metal-filters">
            {METAL_LIST.map((metal) => (
              <button
                key={metal}
                className={`cg-metal-btn ${selectedMetal === metal ? 'active' : ''}`}
                onClick={() => setSelectedMetal(metal)}
              >
                {selectedMetal === metal && <FiCheck className="cg-check-icon" />}
                <span>{metal}</span>
              </button>
            ))}
          </div>

          {/* Search & Sort Controls */}
          <div className="cg-toolbar-right">
            {/* Search Input */}
            <div className="cg-search-box">
              <FiSearch className="cg-search-icon" />
              <input
                type="text"
                placeholder="Search jewellery, category..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="cg-search-input"
              />
              {searchQuery && (
                <button className="cg-clear-btn" onClick={() => setSearchQuery("")}>
                  ×
                </button>
              )}
            </div>

            {/* Sort Selector */}
            <div className="cg-sort-box">
              <FiSliders className="cg-sort-icon" />
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
                className="cg-sort-select"
              >
                <option value="featured">Featured First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="weight-low">Weight: Light to Heavy</option>
                <option value="name">Alphabetical (A-Z)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Active Filter & Pagination Summary Bar */}
        <div className="cg-status-bar">
          <div className="cg-result-count">
            SHOWING <strong>{filteredProducts.length > 0 ? startProductIndex + 1 : 0} - {Math.min(startProductIndex + ITEMS_PER_PAGE, filteredProducts.length)}</strong> OF <strong>{filteredProducts.length}</strong> {activeCategory !== "ALL" ? activeCategory : "TOTAL"} DESIGNS
          </div>
          {(activeCategory !== "ALL" || selectedMetal !== "ALL METALS" || searchQuery) && (
            <button 
              className="cg-reset-filters-btn"
              onClick={() => {
                handleCategoryChange("ALL");
                setSelectedMetal("ALL METALS");
                setSearchQuery("");
              }}
            >
              Reset Filters ↺
            </button>
          )}
        </div>

        {/* Product Grid with Category-Based Image Changes */}
        {paginatedProducts.length > 0 ? (
          <div key={`${activeCategory}-${selectedMetal}-${sortBy}-${searchQuery}-${currentPage}`} className="cg-products-grid">
            {paginatedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onViewDetails={onViewDetails}
              />
            ))}
          </div>
        ) : (
          <div className="cg-no-results">
            <div className="no-results-crest">❖</div>
            <h3>No Creations Found</h3>
            <p>No jewellery matches your selected filter criteria. Try choosing another category or reset filters.</p>
            <button 
              className="btn-gold-outline"
              onClick={() => {
                handleCategoryChange("ALL");
                setSelectedMetal("ALL METALS");
                setSearchQuery("");
              }}
            >
              SHOW ALL COLLECTIONS
            </button>
          </div>
        )}

        {/* Interactive Pagination Bar */}
        {totalPages > 1 && (
          <div className="cg-pagination-bar">
            <button 
              className="cg-page-arrow" 
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              aria-label="Previous Page"
            >
              <FiChevronLeft size={16} />
              <span>PREV</span>
            </button>

            <div className="cg-page-numbers">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                <button
                  key={pageNum}
                  className={`cg-page-num ${pageNum === currentPage ? 'active' : ''}`}
                  onClick={() => handlePageChange(pageNum)}
                >
                  {pageNum}
                </button>
              ))}
            </div>

            <button 
              className="cg-page-arrow" 
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              aria-label="Next Page"
            >
              <span>NEXT</span>
              <FiChevronRight size={16} />
            </button>
          </div>
        )}

        {/* Price & Quote Disclaimer */}
        <div className="price-disclaimer">
          <p>* Indicative prices listed. Final weight & hallmarked 22K gold live rates calculated at quote confirmation via WhatsApp.</p>
        </div>
      </div>
    </section>
  );
}
