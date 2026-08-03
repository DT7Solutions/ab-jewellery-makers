import React from 'react';
import './SubpageBanner.css';

export default function SubpageBanner({ title, subtitle, bgImage = '/images/footer-gold-bg.png' }) {
  return (
    <section 
      className="subpage-banner-section"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="subpage-banner-overlay"></div>
      <div className="container subpage-banner-container">
        <div className="subpage-banner-content">
          <h1 className="subpage-banner-title">{title}</h1>
          {subtitle && <p className="subpage-banner-subtitle">{subtitle}</p>}
        </div>
      </div>
    </section>
  );
}
