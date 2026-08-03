import React from 'react';
import './Craftsmanship.css';

export default function Craftsmanship() {
  return (
    <section id="craftsmanship" className="craftsmanship-section">
      <div className="craftsmanship-bg-overlay"></div>
      
      <div className="container craftsmanship-container">
        <div className="craftsmanship-content">
          <div className="craftsmanship-title-inline">
            <div className="title-divider-side left">
              <span className="divider-line"></span>
              <span className="divider-diamond">◈</span>
              <span className="divider-line-short"></span>
            </div>
            <span className="craftsmanship-badge-text">CRAFTED WITH HERITAGE</span>
            <div className="title-divider-side right">
              <span className="divider-line-short"></span>
              <span className="divider-diamond">◈</span>
              <span className="divider-line"></span>
            </div>
          </div>

          <h2 className="craftsmanship-title">
            Where Craftsmanship<br />
            Meets Perfection
          </h2>

          <p className="craftsmanship-description">
            Each piece tells a story of heritage, passion and artistry. Handcrafted by master goldsmiths using traditional Indian goldsmithing techniques.
          </p>
        </div>
      </div>
    </section>
  );
}
