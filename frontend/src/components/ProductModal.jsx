import React from 'react';
import { FaWhatsapp, FaTimes } from 'react-icons/fa';
import { openProductWhatsApp, openGeneralWhatsApp } from '../utils/whatsapp';
import './ProductModal.css';

import { submitApiInquiry, getFullImageUrl } from '../utils/api';

export default function ProductModal({ item, onClose }) {
  if (!item) return null;

  const isProduct = Boolean(item.id && item.metal);
  const modalImageUrl = getFullImageUrl(item.image);

  const handleEnquiry = () => {
    // Record inquiry in Django backend DB
    if (isProduct) {
      submitApiInquiry({
        customer_name: "Website Visitor",
        phone: "WhatsApp Inquiry",
        message: `Inquired about product: ${item.name} (${item.id || item.slug})`
      });
      openProductWhatsApp(item);
    } else {
      openGeneralWhatsApp();
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content luxury-card" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
          <FaTimes size={20} />
        </button>

        <div className="modal-body">
          <div className="modal-image-container">
            <img 
              src={modalImageUrl} 
              alt={item.name || item.title} 
              className="modal-image"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = "/images/products/heritage-necklace.png";
              }}
            />
          </div>

          <div className="modal-info">
            <div className="section-divider-left">
              <span>✦</span>
              <span className="section-divider-line-short"></span>
            </div>
            
            <h2 className="modal-title">{item.name || item.title}</h2>

            {isProduct ? (
              <>
                <div className="modal-specs-list">
                  <div className="modal-spec-row">
                    <span>Product ID:</span> <strong>{item.id}</strong>
                  </div>
                  <div className="modal-spec-row">
                    <span>Category:</span> <strong>{item.category}</strong>
                  </div>
                  <div className="modal-spec-row">
                    <span>Metal & Purity:</span> <strong>{item.metal} ({item.purity})</strong>
                  </div>
                  <div className="modal-spec-row">
                    <span>Approx. Weight:</span> <strong>{item.weight}</strong>
                  </div>
                </div>
                <p className="modal-description">{item.description}</p>
              </>
            ) : (
              <p className="modal-description">
                Heritage Indian gold jewellery piece handcrafted with intricate detail and precision. Enquire now on WhatsApp for details and customization options.
              </p>
            )}

            {/* High Visibility WhatsApp Direct Action Button */}
            <button className="btn-whatsapp-modal" onClick={handleEnquiry}>
              <FaWhatsapp size={22} className="modal-whatsapp-icon" />
              <span>ENQUIRE ON WHATSAPP</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
