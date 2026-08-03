import React, { useState, useEffect } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { FaStar } from 'react-icons/fa';
import { TESTIMONIALS } from '../data/testimonials';
import './Testimonials.css';

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const totalReviews = TESTIMONIALS.length;

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % totalReviews);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalReviews) % totalReviews);
  };

  // Auto slide every 5 seconds
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(timer);
  }, [currentIndex, isPaused]);

  // Determine visible items based on index
  const getVisibleItems = () => {
    const items = [];
    for (let i = 0; i < 3; i++) {
      items.push(TESTIMONIALS[(currentIndex + i) % totalReviews]);
    }
    return items;
  };

  const visibleReviews = getVisibleItems();

  return (
    <section className="testimonials-section" onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}>
      <div className="container">
        {/* Section Header matching FEATURED JEWELLERY inline title */}
        <div className="testimonials-header-container">
          <div className="testimonials-header-center">
            <div className="testimonials-title-inline">
              <div className="title-divider-side left">
                <span className="divider-line"></span>
                <span className="divider-diamond">◈</span>
                <span className="divider-line-short"></span>
              </div>
              <h2 className="testimonials-title-text">LOVED BY OUR CUSTOMERS</h2>
              <div className="title-divider-side right">
                <span className="divider-line-short"></span>
                <span className="divider-diamond">◈</span>
                <span className="divider-line"></span>
              </div>
            </div>
            <p className="section-tagline">REAL BRIDES & FAMILIES SHARING THEIR CHERISHED ALTHAF JEWELLERY EXPERIENCES</p>
          </div>
        </div>

        {/* Carousel Container */}
        <div className="testimonials-carousel-wrapper">
          <button className="carousel-arrow prev-arrow" onClick={prevSlide} aria-label="Previous Testimonial">
            <FiChevronLeft size={24} />
          </button>

          <div className="testimonials-grid">
            {visibleReviews.map((item, idx) => (
              <div key={`${item.id}-${idx}`} className="testimonial-card luxury-card">
                <div className="testimonial-stars">
                  {[...Array(item.rating)].map((_, sIdx) => (
                    <FaStar key={sIdx} size={15} color="#D4AF37" />
                  ))}
                </div>

                <p className="testimonial-quote">"{item.comment}"</p>

                <div className="testimonial-user">
                  <img src={item.avatar} alt={item.name} className="user-avatar" />
                  <div className="user-meta">
                    <span className="user-name">— {item.name}</span>
                    <span className="user-city">{item.city}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button className="carousel-arrow next-arrow" onClick={nextSlide} aria-label="Next Testimonial">
            <FiChevronRight size={24} />
          </button>
        </div>

        {/* Carousel Indicators */}
        <div className="carousel-dots">
          {TESTIMONIALS.map((_, idx) => (
            <button
              key={idx}
              className={`dot ${currentIndex === idx ? 'active' : ''}`}
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
