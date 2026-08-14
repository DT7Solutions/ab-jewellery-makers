import React, { useState, useEffect } from 'react';
import './PagePreloader.css';

export default function PagePreloader() {
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState('loading'); // 'loading' | 'sliding' | 'done'

  useEffect(() => {
    // Progress counter animation
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 5;
      });
    }, 40);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress === 100) {
      // Small pause at 100% then slide dark screen UP
      const slideTimer = setTimeout(() => {
        setStage('sliding');
        document.body.classList.add('reveal-preview');
      }, 300);

      // Remove from DOM after slide animation completes
      const doneTimer = setTimeout(() => {
        setStage('done');
      }, 1300);

      return () => {
        clearTimeout(slideTimer);
        clearTimeout(doneTimer);
      };
    }
  }, [progress]);

  if (stage === 'done') return null;

  return (
    <div className={`preloader-overlay ${stage === 'sliding' ? 'slide-up' : ''}`}>
      <div className="preloader-content">
        {/* Brand Crest Logo */}
        <div className="preloader-logo-wrapper">
          <img 
            src="/images/logo.png" 
            alt="Althaf Jewellery Makers Logo" 
            className="preloader-logo-img"
          />
          <div className="preloader-crest-ring"></div>
        </div>

        {/* Brand Name & Subtitle */}
        <h1 className="preloader-brand-title">ALTHAF JEWELLERY MAKERS</h1>
        <p className="preloader-brand-sub">HANDCRAFTED HERITAGE • TENALI, AP</p>

        {/* Gold Loading Progress Bar */}
        <div className="preloader-progress-container">
          <div 
            className="preloader-progress-bar" 
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="preloader-percentage">{progress}%</div>
      </div>

      {/* Decorative Gold Filigree Bottom Accents */}
      <div className="preloader-bottom-ornament">
        <span className="ornament-line"></span>
        <span className="ornament-star">✦</span>
        <span className="ornament-line"></span>
      </div>
    </div>
  );
}
