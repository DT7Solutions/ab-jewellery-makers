import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { openProductWhatsApp } from '../utils/whatsapp';
import './ProductCard.css';

export default function ProductCard({ product, onViewDetails }) {
  const handleWhatsAppClick = (e) => {
    e.stopPropagation();
    openProductWhatsApp(product);
  };

  return (
    <div className="product-card luxury-card" onClick={() => onViewDetails && onViewDetails(product)}>
      {/* Product Image Wrapper */}
      <div className="product-image-container">
        <img 
          src={product.image} 
          alt={product.name} 
          className="product-image"
          loading="lazy"
        />
        <div className="product-image-overlay"></div>
      </div>

      {/* Product Details */}
      <div className="product-info">
        <h3 className="product-title">{product.name}</h3>

        <div className="product-price-wrapper">
          <span className="product-price">{product.formattedPrice}</span>
        </div>

        {/* Product Specs */}
        <div className="product-specs">
          <div className="spec-item">
            <span className="spec-label">Metal:</span>
            <span className="spec-value">{product.metal} ({product.purity})</span>
          </div>
          <div className="spec-item">
            <span className="spec-label">Approx. Weight:</span>
            <span className="spec-value">{product.weight}</span>
          </div>
        </div>

        {/* CTA Button */}
        <button 
          className="btn-gold-outline product-cta-btn"
          onClick={handleWhatsAppClick}
          aria-label={`Enquire about ${product.name} on WhatsApp`}
        >
          <span>I'M INTERESTED</span>
          <span className="whatsapp-icon-badge">
            <FaWhatsapp size={14} />
          </span>
        </button>
      </div>
    </div>
  );
}
