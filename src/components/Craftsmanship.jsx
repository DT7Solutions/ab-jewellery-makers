import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { openGeneralWhatsApp } from '../utils/whatsapp';
import './Craftsmanship.css';

export default function Craftsmanship() {
  return (
    <section id="craftsmanship" className="craftsmanship-section">
      <div className="craftsmanship-bg-overlay"></div>
      
      <div className="container craftsmanship-container">
        <div className="craftsmanship-content">
          <div className="craftsmanship-badge">
            <span>✦</span>
            <span>CRAFTED WITH HERITAGE</span>
            <span>✦</span>
          </div>

          <h2 className="craftsmanship-title">
            Where Craftsmanship<br />
            Meets Perfection
          </h2>

          <p className="craftsmanship-description">
            Each piece tells a story of heritage, passion and artistry. Handcrafted by master goldsmiths using traditional Indian goldsmithing techniques.
          </p>

          <button 
            className="btn-gold-outline craftsmanship-cta"
            onClick={openGeneralWhatsApp}
          >
            <span>I'M INTERESTED</span>
            <span className="whatsapp-icon-badge">
              <FaWhatsapp size={14} />
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
