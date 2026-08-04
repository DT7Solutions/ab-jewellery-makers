import React, { useState, useEffect } from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { openGeneralWhatsApp } from '../utils/whatsapp';
import './Hero.css';

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const slides = [
    {
      id: 1,
      image: "/images/hero-bg-full.png",
      titleLine1: "Timeless Beauty.",
      titleLine2: "Crafted with",
      goldWord: "Tradition.",
      description: "Handcrafted jewellery that reflects your inner elegance."
    },
    {
      id: 2,
      image: "/images/hero-slide-2.jpg",
      titleLine1: "Royal Heritage.",
      titleLine2: "Designed for",
      goldWord: "Royalty.",
      description: "Opulent 22K Gold and Temple masterpiece collections."
    },
    {
      id: 3,
      image: "/images/hero-slide-3.jpg",
      titleLine1: "Pure Elegance.",
      titleLine2: "Handcrafted to",
      goldWord: "Perfection.",
      description: "Purity is our priority. Crafted for generations to cherish."
    }
  ];

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
    >
      {/* Background Image Slides */}
      {slides.map((slide, idx) => (
        <div 
          key={slide.id}
          className={`hero-bg-slide ${idx === currentSlide ? 'active' : ''}`}
          style={{ backgroundImage: `url(${slide.image})` }}
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
