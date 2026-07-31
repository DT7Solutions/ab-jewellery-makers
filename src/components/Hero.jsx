import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { openGeneralWhatsApp } from '../utils/whatsapp';
import './Hero.css';

export default function Hero() {
  return (
    <section id="hero" className="hero-section">
      {/* Dark gradient overlay for crystal clear text readability on left */}
      <div className="hero-gradient-overlay"></div>
      
      <div className="container hero-container">
        {/* Left Column: Hero Content */}
        <div className="hero-content">
          <h1 className="hero-title">
            Timeless Beauty.<br />
            Crafted with<br />
            <span className="gold-text">Tradition.</span>
          </h1>

          <p className="hero-description">
            Handcrafted jewellery that reflects<br className="desktop-br" />
            your inner elegance.
          </p>

          <div className="hero-cta-wrapper">
            <button 
              className="btn-gold-outline hero-cta-btn"
              onClick={openGeneralWhatsApp}
            >
              <span>I'M INTERESTED</span>
              <span className="whatsapp-icon-badge">
                <FaWhatsapp size={14} />
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
