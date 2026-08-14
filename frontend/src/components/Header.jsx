import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FaWhatsapp, FaBars, FaTimes } from 'react-icons/fa';
import { SITE_CONFIG } from '../config';
import { openGeneralWhatsApp } from '../utils/whatsapp';
import { BASE_TENALI_GOLD_RATES } from '../utils/goldRate';
import { fetchApiGoldRates } from '../utils/api';
import './Header.css';

export default function Header({ onSelectCategory }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [goldRates, setGoldRates] = useState(BASE_TENALI_GOLD_RATES);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);

    // Fetch dynamic live gold rates for Tenali AP from Django REST API
    fetchApiGoldRates().then(rates => {
      if (rates) setGoldRates(rates);
    });

    // Refresh every 5 minutes
    const interval = setInterval(() => {
      fetchApiGoldRates().then(rates => {
        if (rates) setGoldRates(rates);
      });
    }, 300000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(interval);
    };
  }, []);

  const navLinks = [
    { name: "HOME", path: "/" },
    { name: "ABOUT US", path: "/about" },
    { name: "COLLECTIONS", path: "/collections" },
    { name: "CONTACT US", path: "/contact" }
  ];

  return (
    <header className={`navbar ${scrolled ? 'navbar-scrolled' : 'navbar-transparent'}`}>
      <div className="container navbar-container">
        {/* Brand Logo */}
        <Link to="/" className="brand-logo" aria-label="Althaf Jewellery Makers Home">
          <img 
            src="/images/logo.png" 
            alt="Althaf Jewellery Makers - 22K Gold & Bridal Jewellery Showroom Tenali"
            className="brand-logo-img"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="desktop-nav" aria-label="Main Navigation">
          <ul className="nav-list">
            {navLinks.map((link, idx) => (
              <li key={idx} className="nav-item">
                <NavLink 
                  to={link.path} 
                  className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                  end={link.path === '/'}
                  onClick={() => {
                    if (link.path === '/collections' && onSelectCategory) {
                      onSelectCategory(null);
                    }
                  }}
                >
                  <span>{link.name}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Desktop Header Actions (Dynamic Tenali AP Live Gold Rate Badge + WhatsApp CTA) */}
        <div className="header-actions">
          {/* Live Dynamic Gold Price Badge for Tenali AP */}
          <div 
            className="live-gold-badge" 
            title={`Live 22K Gold Rate in ${goldRates.location} (Updated ${goldRates.lastUpdated})`}
          >
            <span className="live-dot"></span>
            <span className="gold-rate-label">TENALI 22K:</span>
            <span className="gold-rate-price">₹{goldRates.gold22k.toLocaleString('en-IN')}/g</span>
          </div>

          <button 
            className="btn-whatsapp-pill desktop-whatsapp"
            onClick={openGeneralWhatsApp}
            aria-label="Chat on WhatsApp with Althaf Jewellery Makers"
          >
            <span className="whatsapp-pill-icon">
              <FaWhatsapp size={15} />
            </span>
            <span className="whatsapp-pill-text">Chat on WhatsApp</span>
          </button>

          {/* Mobile Hamburger Toggle */}
          <button 
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="mobile-menu-overlay" onClick={() => setMobileMenuOpen(false)}>
          <div className="mobile-menu-content" onClick={(e) => e.stopPropagation()}>
            <div className="mobile-logo-header">
              <img src="/images/logo.png" alt="Althaf Jewellery Makers - 22K Gold Tenali" className="mobile-logo-img" />
            </div>

            <ul className="mobile-nav-list">
              {navLinks.map((link, idx) => (
                <li key={idx} className="mobile-nav-item">
                  <NavLink 
                    to={link.path} 
                    className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}
                    onClick={() => {
                      setMobileMenuOpen(false);
                      if (link.path === '/collections' && onSelectCategory) {
                        onSelectCategory(null);
                      }
                    }}
                    end={link.path === '/'}
                  >
                    {link.name}
                  </NavLink>
                </li>
              ))}
            </ul>

            <div className="mobile-whatsapp-container">
              <button 
                className="btn-whatsapp-pill w-full"
                onClick={() => {
                  setMobileMenuOpen(false);
                  openGeneralWhatsApp();
                }}
                aria-label="Chat on WhatsApp"
              >
                <span className="whatsapp-pill-icon">
                  <FaWhatsapp size={18} />
                </span>
                <span>Chat on WhatsApp</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
