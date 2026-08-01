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
      title: "Gold Statement Ring",
      image: "/images/products/peacock-ring.png"
    }
  ];

  return (
    <section id="gallery" className="gallery-cta-section">
      <div className="container">
        <div className="gallery-cta-grid">
          {/* Left Side: 5 Square Photos in a single row */}
          <div className="gallery-row-5col">
            {galleryItems.map((item) => (
              <div 
                key={item.id} 
                className="gallery-item-card"
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

          {/* Right Side: Interested in any of these designs? WhatsApp CTA Box */}
          <div className="whatsapp-cta-card">
            <div className="whatsapp-card-pattern"></div>
            <div className="whatsapp-card-content">
              <h3 className="whatsapp-card-title">
                Interested in any of<br />
                these designs?
              </h3>
              <p className="whatsapp-card-text">
                Get pricing, quotes & details<br />
                instantly on WhatsApp.
              </p>
              <button 
                className="btn-whatsapp-cta"
                onClick={openGeneralWhatsApp}
                aria-label="Chat on WhatsApp"
              >
                <span className="cta-btn-text">CHAT ON WHATSAPP</span>
                <span className="whatsapp-badge-icon">
                  <FaWhatsapp size={14} />
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
