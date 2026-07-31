import React, { useState, useEffect } from 'react';
import { FaWhatsapp, FaBars, FaTimes, FaChevronDown } from 'react-icons/fa';
import { openGeneralWhatsApp } from '../utils/whatsapp';
import './Header.css';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeNav, setActiveNav] = useState('HOME');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: "HOME", href: "#hero" },
    { name: "COLLECTIONS", href: "#collections", hasDropdown: true },
    { name: "ABOUT US", href: "#about" },
    { name: "OUR STORY", href: "#craftsmanship" },
    { name: "CONTACT US", href: "#footer" }
  ];

  return (
    <header className={`navbar ${scrolled ? 'navbar-scrolled' : 'navbar-transparent'}`}>
      <div className="container navbar-container">
        {/* Brand Logo */}
        <a href="#hero" className="brand-logo" aria-label="Althaf Jewellery Makers Home">
          <img 
            src="/images/logo.png" 
            alt="Althaf Jewellery Makers Logo"
            className="brand-logo-img"
          />
        </a>

        {/* Desktop Navigation */}
        <nav className="desktop-nav">
          <ul className="nav-list">
            {navLinks.map((link, idx) => (
              <li key={idx} className="nav-item">
                <a 
                  href={link.href} 
                  className={`nav-link ${activeNav === link.name ? 'active' : ''}`}
                  onClick={() => setActiveNav(link.name)}
                >
                  <span>{link.name}</span>
                  {link.hasDropdown && <FaChevronDown size={10} className="dropdown-arrow" />}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Desktop WhatsApp Pill CTA */}
        <div className="header-actions">
          <button 
            className="btn-whatsapp-pill desktop-whatsapp"
            onClick={openGeneralWhatsApp}
            aria-label="Chat on WhatsApp"
          >
            <span className="whatsapp-pill-icon">
              <FaWhatsapp size={16} />
            </span>
            <span className="whatsapp-pill-text">Chat on WhatsApp</span>
          </button>

          {/* Mobile Hamburger Toggle */}
          <button 
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
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
              <img src="/images/logo.png" alt="Althaf Jewellery Makers Logo" className="mobile-logo-img" />
            </div>

            <ul className="mobile-nav-list">
              {navLinks.map((link, idx) => (
                <li key={idx} className="mobile-nav-item">
                  <a 
                    href={link.href} 
                    className="mobile-nav-link"
                    onClick={() => {
                      setActiveNav(link.name);
                      setMobileMenuOpen(false);
                    }}
                  >
                    {link.name}
                  </a>
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
