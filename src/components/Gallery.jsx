import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { openGeneralWhatsApp } from '../utils/whatsapp';
import './Gallery.css';

export default function Gallery({ onSelectImage }) {
  const galleryItems = [
    {
      id: 1,
      title: "Heritage Royal Necklace",
      image: "/images/products/heritage-necklace.png"
    },
    {
      id: 2,
      title: "Antique Gold Kada",
      image: "/images/products/gold-bangles.png"
    },
    {
      id: 3,
      title: "Emerald Polki Haar",
      image: "/images/products/polki-diamond-necklace.png"
    },
    {
      id: 4,
      title: "Temple Work Jhumkas",
      image: "/images/products/temple-jhumkas.png"
    },
    {
      id: 5,
      title: "Kundan Statement Ring",
      image: "/images/products/kundan-choker.png"
    }
  ];

  return (
    <section id="gallery" className="gallery-cta-section">
      <div className="container">
        <div className="gallery-cta-grid">
          {/* Left Column: 5 Photo Masonry Grid */}
          <div className="gallery-masonry-grid">
            {galleryItems.map((item) => (
              <div 
                key={item.id} 
                className={`gallery-item item-${item.id}`}
                onClick={() => onSelectImage && onSelectImage(item)}
              >
                <img src={item.image} alt={item.title} className="gallery-img" loading="lazy" />
                <div className="gallery-hover-overlay">
                  <span className="gallery-title">{item.title}</span>
                  <span className="view-design-badge">View Design</span>
                </div>
              </div>
            ))}
          </div>

          {/* Right Column: WhatsApp CTA Box matching reference layout */}
          <div className="whatsapp-banner-card luxury-card">
            <div className="whatsapp-banner-content">
              <h3 className="whatsapp-banner-title">
                Interested in any of<br />
                these designs?
              </h3>
              <p className="whatsapp-banner-text">
                Get pricing, quotes & details instantly on WhatsApp.
              </p>
              <button 
                className="btn-whatsapp-banner"
                onClick={openGeneralWhatsApp}
              >
                <span>CHAT ON WHATSAPP</span>
                <span className="whatsapp-icon-badge">
                  <FaWhatsapp size={16} />
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
