import React from 'react';
import { GiDiamondRing, GiSparkles, GiLaurelCrown } from 'react-icons/gi';
import { FiAward } from 'react-icons/fi';
import { SITE_CONFIG } from '../config';
import './AboutUs.css';

export default function AboutUs() {
  const stats = [
    {
      icon: <GiDiamondRing size={26} />,
      number: "25+",
      label: "Years of Legacy"
    },
    {
      icon: <GiLaurelCrown size={26} />,
      number: "10K+",
      label: "Happy Customers"
    },
    {
      icon: <GiSparkles size={26} />,
      number: "5K+",
      label: "Unique Designs"
    },
    {
      icon: <FiAward size={26} />,
      number: "100%",
      label: "Hallmarked Jewellery"
    }
  ];

  return (
    <section id="about" className="about-section">
      <div className="container">
        <div className="about-grid">
          {/* Left Column: Image */}
          <div className="about-image-column">
            <div className="about-image-frame">
              <img 
                src="/images/about-model.png" 
                alt="Althaf Jewellery Makers Heritage Craftsmanship Model"
                className="about-image"
                loading="lazy"
              />
              <div className="about-image-border"></div>
            </div>
          </div>

          {/* Right Column: Narrative & Stats */}
          <div className="about-content-column">
            <div className="section-divider-left">
              <span>✦</span>
              <span className="section-divider-line-short"></span>
            </div>
            <h2 className="section-title text-left">ABOUT US</h2>

            <div className="about-description">
              <p className="about-lead">
                {SITE_CONFIG.brandName} is a celebration of heritage, craftsmanship and timeless beauty.
              </p>
              <p className="about-text">
                Each piece is lovingly handcrafted by skilled artisans using finest materials, passed down through generations.
              </p>
              <p className="about-text">
                Our creations are designed to be cherished today, tomorrow and forever.
              </p>
            </div>

            {/* Stats Row */}
            <div className="about-stats-container">
              {stats.map((stat, idx) => (
                <div key={idx} className="stat-card">
                  <div className="stat-icon">{stat.icon}</div>
                  <div className="stat-number">{stat.number}</div>
                  <div className="stat-label">{stat.label}</div>
                  {idx < stats.length - 1 && <div className="stat-separator"></div>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
