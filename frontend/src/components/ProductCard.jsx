import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaWhatsapp } from 'react-icons/fa';
import { openProductWhatsApp } from '../utils/whatsapp';
import './ProductCard.css';

export default function ProductCard({ product, onViewDetails }) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    if (product && product.id) {
      navigate(`/product/${product.id}`);
    } else if (onViewDetails) {
      onViewDetails(product);
    }
  };

  const handleWhatsAppClick = (e) => {
    e.stopPropagation();
    openProductWhatsApp(product);
  };

  return (
    <div 
      className="product-card luxury-card" 
      onClick={handleCardClick}
      role="link"
      tabIndex={0}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleCardClick()}
      aria-label={`View details of ${product.name}`}
    >
      {/* Product Image Container */}
      <div className="product-image-container">
        <img 
          src={product.image} 
          alt={`${product.name} - ${product.purity || '22K'} Hallmarked Gold Jewellery Althaf Guntur`} 
          className="product-image"
          loading="lazy"
        />
      </div>

      {/* Product Info */}
      <div className="product-info">
        <h3 className="product-title">{product.name}</h3>

        <div className="product-price-wrapper">
          <span className="product-price">{product.formattedPrice}</span>
        </div>

        {/* CTA Button with WhatsApp Green Badge */}
        <button 
          className="btn-interested"
          onClick={handleWhatsAppClick}
          aria-label={`Enquire about ${product.name} on WhatsApp`}
        >
          <span className="btn-text">I'M INTERESTED</span>
          <span className="whatsapp-badge">
            <FaWhatsapp size={13} />
          </span>
        </button>
      </div>
    </div>
  );
}
