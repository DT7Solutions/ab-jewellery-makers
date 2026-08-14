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
      label: "Years of\nLegacy in Tenali"
    },
    {
      icon: <HiOutlineUserGroup size={26} />,
      number: "10K+",
      label: "Happy\nFamilies Served"
    },
    {
      icon: <GiNecklace size={26} />,
      number: "5K+",
      label: "Unique\nGold Designs"
    },
    {
      icon: <FiAward size={26} />,
      number: "100%",
      label: "BIS 916\nHallmarked Gold"
    }
  ];

  return (
    <section id="about" className="about-section" aria-label="About Althaf Jewellery Makers">
      <div className="about-grid">
        {/* Left Column: Image Frame */}
        <div className="about-image-column">
          <div className="about-image-frame">
            <img 
              src="/images/about-model.png" 
              alt="Althaf Jewellery Makers Heritage Craftsmanship - 22K Gold Bridal Ornaments Tenali AP"
              className="about-image"
              loading="lazy"
            />
          </div>
        </div>

        {/* Right Column: Content */}
        <div className="about-content-column">
          {/* Header Title with Right-aligned Gold Diamond Line Ornament */}
          <div className="about-title-header">
            <h2 className="about-title-text">ABOUT OUR HERITAGE</h2>
            <div className="about-divider-side">
              <span className="divider-line-short"></span>
              <span className="divider-diamond">◈</span>
              <span className="divider-line"></span>
            </div>
          </div>
          <p className="section-tagline left-align">5 GENERATIONS OF GOLDSMITHING EXCELLENCE IN TENALI, ANDHRA PRADESH</p>

          {/* Narrative Paragraphs */}
          <div className="about-description">
            <p className="about-text">
              <strong>{SITE_CONFIG.brandName}</strong> is a regal celebration of Indian goldsmithing heritage, royal craftsmanship, and timeless bridal beauty situated at the historic Sharaf Bazar in Tenali.
            </p>
            <p className="about-text">
              Each piece is lovingly handcrafted by hereditary artisans using 100% BIS 916 hallmarked pure gold, genuine gemstones, and techniques passed down across 5 generations.
            </p>
            <p className="about-text">
              Our bespoke bridal creations are masterfully designed to be cherished on your auspicious wedding day, preserved as family heirlooms, and loved forever.
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
    </section>
  );
}
