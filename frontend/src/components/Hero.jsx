import React, { useState, useEffect } from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { openGeneralWhatsApp } from '../utils/whatsapp';
import { fetchApiHeroBanners } from '../utils/api';
import './Hero.css';

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [slides, setSlides] = useState([
    {
      id: 1,
      image: "/images/hero-bg-full.png",
      titleLine1: "Timeless Beauty.",
      titleLine2: "Crafted with",
      goldWord: "Tradition.",
      description: "100% BIS 916 Hallmarked 22K Gold, Polki & Kundan Bridal Masterpieces in Tenali, AP."
    },
    {
      id: 2,
      image: "/images/hero-slide-2.jpg",
      titleLine1: "Royal Heritage.",
      titleLine2: "Designed for",
      goldWord: "Royalty.",
      description: "Handcrafted Temple Nakshi Gold & Imperial Bridal Jewellery by 5th-generation goldsmiths."
    },
    {
      id: 3,
      image: "/images/hero-slide-3.jpg",
      titleLine1: "Pure Elegance.",
      titleLine2: "Handcrafted to",
      goldWord: "Perfection.",
      description: "Purity is our priority. Live Tenali AP gold pricing & bespoke custom jewellery orders."
    }
  ]);

  useEffect(() => {
    fetchApiHeroBanners().then((data) => {
      if (data && data.length > 0) {
        const mappedSlides = data.map((item) => ({
          id: item.id,
          image: item.image || "/images/hero-bg-full.png",
          titleLine1: item.title_line_1,
          titleLine2: item.title_line_2,
          goldWord: item.gold_word,
          description: item.description
        }));
        setSlides(mappedSlides);
      }
    });
  }, []);

  const totalSlides = slides.length;

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  // Auto slide every 6 seconds
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 6000);
    return () => clearInterval(timer);
  }, [currentSlide, isPaused]);

  return (
    <section 
      id="hero" 
      className="hero-section"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-label="Althaf Jewellery Makers Showcase"
    >
      {/* Background Image Slides */}
      {slides.map((slide, idx) => (
        <div 
          key={slide.id}
          className={`hero-bg-slide ${idx === currentSlide ? 'active' : ''}`}
          style={{ backgroundImage: `url(${slide.image})` }}
          role="img"
          aria-label={`Althaf Jewellery Makers Heritage Banner - ${slide.goldWord}`}
        />
      ))}

      {/* Dark gradient overlay for text legibility on left */}
      <div className="hero-gradient-overlay"></div>
      
      <div className="container hero-container">
        {/* Left Column: Hero Content */}
        <div className="hero-content">
          <h1 className="hero-title">
            {slides[currentSlide].titleLine1}<br />
            {slides[currentSlide].titleLine2}<br />
            <span className="gold-text">{slides[currentSlide].goldWord}</span>
          </h1>

          <p className="hero-description">
            {slides[currentSlide].description}
          </p>

          <div className="hero-cta-wrapper">
            <button 
              className="btn-gold-outline hero-cta-btn"
              onClick={openGeneralWhatsApp}
              aria-label="Enquire about jewellery on WhatsApp"
            >
              <span>I'M INTERESTED</span>
              <span className="whatsapp-icon-badge">
                <FaWhatsapp size={14} />
              </span>
            </button>
          </div>

          {/* Hero Slider Navigation Dots (Left-aligned below I'M INTERESTED button) */}
          <div className="hero-slider-dots">
            {slides.map((_, idx) => (
              <button
                key={idx}
                className={`hero-dot ${currentSlide === idx ? 'active' : ''}`}
                onClick={() => setCurrentSlide(idx)}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
