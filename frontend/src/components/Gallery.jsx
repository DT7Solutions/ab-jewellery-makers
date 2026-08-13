import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { openGeneralWhatsApp } from '../utils/whatsapp';
import './Gallery.css';

export default function Gallery({ onSelectImage }) {
  const galleryItems = [
    {
      id: 1,
      title: "Heritage Royal Necklace",
      image: "/images/products/heritage-necklace.png",
      alt: "Heritage Royal 22K Gold Necklace Set - Althaf Jewellery Guntur"
    },
    {
      id: 2,
      title: "Antique Gold Kada",
      image: "/images/products/gold-bangles.png",
      alt: "Temple Antique 22K Gold Kada Bangle - Althaf Jewellery Guntur"
    },
    {
      id: 3,
      title: "Emerald Polki Haar",
      image: "/images/products/polki-diamond-necklace.png",
      alt: "Uncut Polki Diamond Emerald Haar - Althaf Jewellery Guntur"
    },
    {
      id: 4,
      title: "Temple Work Jhumkas",
      image: "/images/products/temple-jhumkas.png",
      alt: "Traditional Temple Work 22K Gold Jhumkas - Althaf Jewellery Guntur"
    },
    {
      id: 5,
      title: "Gold Statement Ring",
      image: "/images/products/peacock-ring.png",
      alt: "Royal Peacock 22K Gold Statement Ring - Althaf Jewellery Guntur"
    }
  ];

  // Duplicate items for infinite seamless slider animation
  const sliderItems = [...galleryItems, ...galleryItems, ...galleryItems];

  return (
    <section id="gallery" className="gallery-cta-section" aria-label="Close-up Jewellery Showcase">
      <div className="container">
        <div className="gallery-cta-grid">
          {/* Left Side: Continuous Auto Slider */}
          <div className="gallery-slider-wrapper">
            <div className="gallery-slider-track">
              {sliderItems.map((item, idx) => (
                <div 
                  key={`${item.id}-${idx}`} 
                  className="gallery-item-card"
                  onClick={() => onSelectImage && onSelectImage(item)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onSelectImage && onSelectImage(item)}
                  aria-label={`View design ${item.title}`}
                >
                  <img 
                    src={item.image} 
                    alt={item.alt || item.title} 
                    className="gallery-img" 
                    loading="lazy" 
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = "/images/products/heritage-necklace.png";
                    }}
                  />
                  <div className="gallery-hover-overlay">
                    <span className="gallery-title">{item.title}</span>
                    <span className="view-design-badge">View Design</span>
                  </div>
                </div>
              ))}
            </div>
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
                Get pricing, live gold rate quotes & custom details<br />
                instantly on WhatsApp.
              </p>
              <button 
                className="btn-whatsapp-cta"
                onClick={openGeneralWhatsApp}
                aria-label="Chat on WhatsApp for instant quote"
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
