import React from 'react';
import { FiEye, FiTarget, FiAward, FiCheck } from 'react-icons/fi';
import './VisionMission.css';

const CalligraphicFloralCorner = ({ className }) => (
  <svg 
    className={`ornate-corner-svg ${className}`} 
    width="46" 
    height="46" 
    viewBox="0 0 110 110" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="goldSwirlGradNew" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFF8DC" />
        <stop offset="25%" stopColor="#F7D369" />
        <stop offset="65%" stopColor="#D4AF37" />
        <stop offset="100%" stopColor="#8B6508" />
      </linearGradient>
      <linearGradient id="goldAccentGrad" x1="100%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#FFE58F" />
        <stop offset="50%" stopColor="#E2C068" />
        <stop offset="100%" stopColor="#A37814" />
      </linearGradient>
    </defs>
    
    {/* Ornate Triple Filigree Border Frame */}
    <path 
      d="M 4 45 L 4 10 C 4 6.7 6.7 4 10 4 L 45 4" 
      stroke="url(#goldSwirlGradNew)" 
      strokeWidth="2.8" 
      strokeLinecap="round" 
    />
    <path 
      d="M 8 52 L 8 14 C 8 10.7 10.7 8 14 8 L 52 8" 
      stroke="url(#goldSwirlGradNew)" 
      strokeWidth="1.2" 
      strokeDasharray="4 2"
      strokeOpacity="0.75"
    />

    {/* Elegant Calligraphic Royal Paisley (Mango/Kalka) Centerpiece */}
    <path 
      d="M 14 14 Q 38 18 55 35 Q 72 52 75 75 Q 52 72 35 55 Q 18 38 14 14 Z" 
      fill="url(#goldSwirlGradNew)" 
      fillOpacity="0.9"
    />
    <path 
      d="M 14 14 C 28 28 42 42 62 62 C 48 56 36 50 26 48 C 24 38 18 28 14 14 Z" 
      fill="url(#goldAccentGrad)" 
    />

    {/* Intricate Swirling Vines (Top Edge Scrollwork) */}
    <path 
      d="M 10 4 C 42 4 72 12 88 28 C 100 40 102 58 92 68 C 82 76 68 70 70 56 C 72 42 88 40 92 48 C 96 56 90 64 84 60" 
      stroke="url(#goldSwirlGradNew)" 
      strokeWidth="2" 
      strokeLinecap="round"
      fill="none" 
    />
    <path 
      d="M 28 12 Q 52 14 68 28 C 78 38 80 50 72 56 C 66 60 58 54 62 44 C 66 36 76 38 78 44" 
      stroke="url(#goldAccentGrad)" 
      strokeWidth="1.4" 
      strokeLinecap="round"
      fill="none" 
    />

    {/* Intricate Swirling Vines (Left Edge Scrollwork) */}
    <path 
      d="M 4 10 C 4 42 12 72 28 88 C 40 100 58 102 68 92 C 76 82 70 68 56 70 C 42 72 40 88 48 92 C 56 96 64 90 60 84" 
      stroke="url(#goldSwirlGradNew)" 
      strokeWidth="2" 
      strokeLinecap="round"
      fill="none" 
    />
    <path 
      d="M 12 28 Q 14 52 28 68 C 38 78 50 80 56 72 C 60 66 54 58 44 62 C 36 66 38 76 44 78" 
      stroke="url(#goldAccentGrad)" 
      strokeWidth="1.4" 
      strokeLinecap="round"
      fill="none" 
    />

    {/* Blooming Royal Floral Lotus Petals (Diagonal Wings) */}
    <path 
      d="M 32 32 C 48 24 64 22 78 14 C 68 28 62 40 52 48 C 44 42 38 38 32 32 Z" 
      fill="url(#goldSwirlGradNew)"
    />
    <path 
      d="M 32 32 C 24 48 22 64 14 78 C 28 68 40 62 48 52 C 42 44 38 38 32 32 Z" 
      fill="url(#goldSwirlGradNew)"
    />

    {/* Sparkling Jeweled Gold Diamond Stars & Nodes */}
    <path d="M 88 28 L 91 32 L 88 36 L 85 32 Z" fill="#FFF8DC" />
    <path d="M 28 88 L 32 91 L 36 88 L 32 85 Z" fill="#FFF8DC" />
    <path d="M 72 72 L 76 77 L 72 82 L 67 77 Z" fill="url(#goldSwirlGradNew)" />
    
    <circle cx="92" cy="48" r="2.5" fill="url(#goldSwirlGradNew)" />
    <circle cx="48" cy="92" r="2.5" fill="url(#goldSwirlGradNew)" />
    <circle cx="68" cy="92" r="2.2" fill="url(#goldAccentGrad)" />
    <circle cx="92" cy="68" r="2.2" fill="url(#goldAccentGrad)" />
    <circle cx="14" cy="14" r="3" fill="#FFF8DC" />
  </svg>
);

export default function VisionMission() {
  const pillars = [
    {
      icon: <FiEye size={28} />,
      title: "OUR VISION",
      tagline: "ROYAL BENCHMARK OF JEWELLERY EXCELLENCE",
      desc: "To be globally recognized as the ultimate benchmark of Indian heritage jewellery—where ancient royal craft meets contemporary elegance, preserving gold artistry for future generations.",
      highlights: ["Global Heritage Standard", "Timeless Royal Designs", "Artisan Empowerment"]
    },
    {
      icon: <FiTarget size={28} />,
      title: "OUR MISSION",
      tagline: "PRESERVING CRAFT, HONOURING TRUST",
      desc: "To handcraft pure 22KT gold, antique polki, and Kundan heirlooms with uncompromised integrity—bringing golden happiness, authenticity, and perfection to every bride and family.",
      highlights: ["100% Certified 22KT Gold", "Bespoke Bridal Couture", "Hereditary Goldsmiths"]
    },
    {
      icon: <FiAward size={28} />,
      title: "CORE VALUES",
      tagline: "PURITY IS OUR PRIORITY",
      desc: "Purity is our guiding light. We guarantee 100% BIS hallmarked transparency, itemized pricing breakdown, master-level finish, and lifelong customer devotion in every creation.",
      highlights: ["Itemized Transparent Rates", "100% BIS Hallmarking", "Lifelong Customer Trust"]
    }
  ];

  return (
    <section className="vm-version2-section">
      <div className="container">
        {/* Section Header */}
        <div className="vm-v2-header">
          <span className="vm-v2-tag">OUR FOUNDATIONAL PILLARS</span>
          <h2 className="vm-v2-title">VISION, MISSION & VALUES</h2>
          <div className="vm-v2-divider">
            <span className="v2-line"></span>
            <span className="v2-crest">❖</span>
            <span className="v2-line"></span>
          </div>
          <p className="vm-v2-intro">
            Built on centuries of Indian heritage, royal integrity, and an unyielding commitment to gold purity.
          </p>
        </div>

        {/* 3 Architectural Pillar Cards */}
        <div className="vm-v2-grid">
          {pillars.map((pillar, idx) => (
            <div key={idx} className="vm-v2-card">
              {/* Decorative Swirl Floral Corner Calligraphic Designs (All 4 Corners) */}
              <CalligraphicFloralCorner className="top-left" />
              <CalligraphicFloralCorner className="top-right" />
              <CalligraphicFloralCorner className="bottom-left" />
              <CalligraphicFloralCorner className="bottom-right" />

              {/* Icon & Title Block */}
              <div className="vm-v2-card-header">
                <div className="vm-v2-icon">{pillar.icon}</div>
                <h3 className="vm-v2-card-title">{pillar.title}</h3>
                <div className="vm-v2-tagline">{pillar.tagline}</div>
              </div>

              <div className="vm-v2-card-line"></div>

              {/* Description */}
              <p className="vm-v2-desc">{pillar.desc}</p>

              {/* Highlights List */}
              <div className="vm-v2-highlights">
                {pillar.highlights.map((item, hIdx) => (
                  <div key={hIdx} className="vm-highlight-item">
                    <FiCheck className="highlight-check" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
