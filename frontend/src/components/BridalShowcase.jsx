import React, { useState, useEffect } from 'react';
import { SITE_CONFIG } from '../config';
import { openGeneralWhatsApp } from '../utils/whatsapp';
import './BridalShowcase.css';

export default function BridalShowcase() {
  const slides = [
    {
      id: 1,
      title: "Raasvi",
      subtitle: "BRIDAL COLLECTION OF GUJARAT",
      description: "Be the bride of your dreams adorned in a 22KT gold masterpiece carrying the splendour of Gujarat’s rich, vibrant culture. Across its three resplendent layers, Raasvi celebrates the bride you dreamt of becoming, rooted in the joy, colour, and spirited festivities of the land.",
      buttonText: "Discover the Collection",
      image: "/images/raasvi-bride.png",
      alt: "Raasvi Gujarat Bridal Collection - 22K Gold Multi-Tiered Necklace Althaf Jewellery Tenali"
    },
    {
      id: 2,
      title: "Svarnam",
      subtitle: "ROYAL HERITAGE OF RAJASTHAN",
      description: "Embrace imperial royalty handcrafted in antique Kundan and Meenakari gold. Svarnam honors centuries of royal Rajasthan artistry, crafted for the bride who reigns with eternal elegance and regal majesty.",
      buttonText: "Discover the Collection",
      image: "/images/about-model.png",
      alt: "Svarnam Rajasthan Royal Kundan & Meenakari Bridal Jewellery Althaf Jewellery Tenali"
    },
    {
      id: 3,
      title: "Nitya",
      subtitle: "TEMPLE GOLD OF SOUTH INDIA",
      description: "Sacred motifs carved by master artisans in pure 22KT temple gold. Nitya captures the timeless devotion, divine heritage, and grand celebration of traditional South Indian bridal ceremonies.",
      buttonText: "Discover the Collection",
      image: "/images/products/heritage-necklace.png",
      alt: "Nitya South Indian Temple Gold Bridal Jewellery Althaf Jewellery Tenali"
    },
    {
      id: 4,
      title: "Kalyani",
      subtitle: "BRIDAL COUTURE OF BENGAL",
      description: "Intricate filigree work woven in featherlight pure gold. Kalyani brings alive the vintage charm, poetic romanticism, and regal craftsmanship of authentic Bengali bridal heritage.",
      buttonText: "Discover the Collection",
      image: "/images/hero-model.png",
      alt: "Kalyani Bengali Gold Filigree Bridal Jewellery Althaf Jewellery Tenali"
    }
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const currentSlide = slides[activeIndex];

  return (
    <section className="bridal-showcase-section" aria-label="Imperial Bridal Couture Collections">
      {/* Section Header */}
      <div className="bridal-header-container">
        <div className="bridal-header-center">
          <div className="bridal-title-inline">
            <div className="title-divider-side left">
              <span className="divider-line"></span>
              <span className="divider-diamond">◈</span>
              <span className="divider-line-short"></span>
            </div>
            <h2 className="bridal-title-text">OUR SIGNATURE BRIDAL COLLECTIONS</h2>
            <div className="title-divider-side right">
              <span className="divider-line-short"></span>
              <span className="divider-diamond">◈</span>
              <span className="divider-line"></span>
            </div>
          </div>
          <p className="section-tagline">IMPERIAL BRIDAL COUTURE CELEBRATING CENTURIES OF INDIAN REGAL HERITAGE IN TENALI</p>
        </div>
      </div>

      <div className="bridal-showcase-container">
        {/* Left Column: Narrative Content */}
        <div className="bridal-content-col">
          <h3 className="bridal-collection-title">{currentSlide.title}</h3>
          <p className="bridal-collection-desc">
            {currentSlide.description}
          </p>
          <button 
            className="btn-discover-collection"
            onClick={openGeneralWhatsApp}
            aria-label={`Discover the ${currentSlide.title} Collection on WhatsApp`}
          >
            {currentSlide.buttonText}
          </button>
        </div>

        {/* Right Column: Visual Composite (Pointed Arch Card Overlay + Hero Image) */}
        <div className="bridal-visual-col">
          {/* Overlapping Pointed Arch Emblem */}
          <div className="bridal-arch-card">
            {/* SVG Pointed Arch Double Border & Background */}
            <svg className="arch-svg-shape" viewBox="0 0 240 440" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path 
                d="M 120,4 C 185,48 236,115 236,220 C 236,325 185,392 120,436 C 55,392 4,325 4,220 C 4,115 55,48 120,4 Z" 
                fill="#1A0706" 
                stroke="#F5D061" 
                strokeWidth="2.5" 
              />
              <path 
                d="M 120,10 C 180,52 230,117 230,220 C 230,323 180,388 120,430 C 60,388 10,323 10,220 C 10,117 60,52 120,10 Z" 
                fill="none" 
                stroke="rgba(245, 208, 97, 0.45)" 
                strokeWidth="1" 
              />
            </svg>

            {/* Inner Content of the Arch Card */}
            <div className="arch-inner-content">
              {/* Brand Titles */}
              <div className="arch-brand-name">ALTHAF JEWELLERY MAKERS</div>
              <div className="arch-brand-subtitle">HERITAGE LUXURY INDIAN JEWELLERY</div>

              {/* Divider Ornament */}
              <div className="arch-presents-divider">
                <span className="arch-line"></span>
                <span className="arch-presents-text">PRESENTS</span>
                <span className="arch-line"></span>
              </div>

              {/* Cursive Script Collection Name */}
              <div className="arch-script-title">{currentSlide.title}</div>

              {/* Collection Subtitle */}
              <div className="arch-collection-subtitle">{currentSlide.subtitle}</div>

              {/* Dots Navigation Overlapping Bottom Tip */}
              <div className="arch-carousel-dots">
                {slides.map((_, idx) => (
                  <button
                    key={idx}
                    className={`arch-dot ${idx === activeIndex ? 'active' : ''}`}
                    onClick={() => setActiveIndex(idx)}
                    aria-label={`Go to slide ${idx + 1}: ${slides[idx].title}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right Hero Image Container */}
          <div className="bridal-hero-image-wrapper">
            <img 
              src={currentSlide.image} 
              alt={currentSlide.alt}
              className="bridal-hero-image" 
              loading="lazy"
            />
          </div>

          {/* Mobile Slide Dots Navigation */}
          <div className="mobile-bridal-dots">
            {slides.map((_, idx) => (
              <button
                key={idx}
                className={`mobile-dot ${idx === activeIndex ? 'active' : ''}`}
                onClick={() => setActiveIndex(idx)}
                aria-label={`Go to slide ${idx + 1}: ${slides[idx].title}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
