import React from 'react';
import { IoDiamondOutline } from 'react-icons/io5';
import { HiOutlineUserGroup } from 'react-icons/hi2';
import { GiNecklace } from 'react-icons/gi';
import { FiAward } from 'react-icons/fi';
import { SITE_CONFIG } from '../config';
import './AboutUs.css';

export default function AboutUs() {
  const stats = [
    {
      icon: <IoDiamondOutline size={26} />,
      number: "25+",
      label: "Years of\nLegacy"
    },
    {
      icon: <HiOutlineUserGroup size={26} />,
      number: "10K+",
      label: "Happy\nCustomers"
    },
    {
      icon: <GiNecklace size={26} />,
      number: "5K+",
      label: "Unique\nDesigns"
    },
    {
      icon: <FiAward size={26} />,
      number: "100%",
      label: "Hallmarked\nJewellery"
    }
  ];

  return (
    <section id="about" className="about-section">
      <div className="container">
        <div className="about-grid">
          {/* Left Column: Image Frame */}
          <div className="about-image-column">
            <div className="about-image-frame">
              <img 
                src="/images/about-model.png" 
                alt="Indriya Jewellers Heritage Craftsmanship"
                className="about-image"
                loading="lazy"
              />
            </div>
          </div>

          {/* Right Column: Content */}
          <div className="about-content-column">
            {/* Header Title with Right-aligned Gold Diamond Line Ornament */}
            <div className="about-title-header">
              <h2 className="about-title-text">ABOUT US</h2>
              <div className="about-divider-side">
                <span className="divider-line-short"></span>
                <span className="divider-diamond">◈</span>
                <span className="divider-line"></span>
              </div>
            </div>

            {/* Narrative Paragraphs with equalized line lengths matching the 2nd line */}
            <div className="about-description">
              <p className="about-text">
                {SITE_CONFIG.brandName} is a regal celebration of Indian heritage, royal craftsmanship, and timeless bridal beauty.
              </p>
              <p className="about-text">
                Each piece is lovingly handcrafted by skilled artisans using finest materials, passed down through generations.
              </p>
              <p className="about-text">
                Our bespoke creations are masterfully designed to be cherished today, carried into tomorrow, and loved forever.
              </p>
            </div>

            {/* Stats Row with 4 Columns & Vertical Gold Dividers */}
            <div className="about-stats-container">
              {stats.map((stat, idx) => (
                <div key={idx} className="stat-card">
                  <div className="stat-icon">{stat.icon}</div>
                  <div className="stat-number">{stat.number}</div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
