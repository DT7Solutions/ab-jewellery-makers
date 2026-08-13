import React from 'react';
import './Craftsmanship.css';

export default function Craftsmanship() {
  return (
    <section id="craftsmanship" className="craftsmanship-section" aria-label="Heritage Indian Craftsmanship">
      <div className="craftsmanship-bg-overlay"></div>
      
      <div className="container craftsmanship-container">
        <div className="craftsmanship-content">
          <div className="craftsmanship-title-inline">
            <div className="title-divider-side left">
              <span className="divider-line"></span>
              <span className="divider-diamond">◈</span>
              <span className="divider-line-short"></span>
            </div>
            <span className="craftsmanship-badge-text">5 GENERATIONS OF HERITAGE GOLDSMITHING</span>
            <div className="title-divider-side right">
              <span className="divider-line-short"></span>
              <span className="divider-diamond">◈</span>
              <span className="divider-line"></span>
            </div>
          </div>

          <h2 className="craftsmanship-title">
            Where Royal Heritage<br />
            Meets Pure Gold Perfection
          </h2>

          <p className="craftsmanship-description">
            Every creation at Althaf Jewellery Makers tells a sacred story of heritage, passion, and devotion. Handcrafted by 5th-generation hereditary master goldsmiths in Guntur, AP using authentic Nakshi, Kundan Jadau, and Temple carving techniques with 100% BIS 916 hallmarked purity.
          </p>
        </div>
      </div>
    </section>
  );
}
