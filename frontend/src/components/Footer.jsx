import React from 'react';
import { Link } from 'react-router-dom';
import { FaWhatsapp, FaInstagram, FaFacebookF, FaYoutube, FaPinterestP } from 'react-icons/fa';
import { FiMail, FiClock, FiPhoneCall, FiMapPin, FiShield } from 'react-icons/fi';
import { SITE_CONFIG } from '../config';
import { openGeneralWhatsApp } from '../utils/whatsapp';
import './Footer.css';

export default function Footer() {
  return (
    <footer id="footer" className="footer-section">
      {/* Clean Gold Top Border Bar */}
      <div className="footer-top-border-bar">
        <span className="footer-border-line"></span>
      </div>

      <div className="container">
        <div className="footer-grid">
          {/* Column 1: Pure Logo Image & Socials */}
          <div className="footer-col brand-col">
            <Link to="/" className="footer-logo-wrapper" aria-label="Althaf Jewellery Makers Home">
              <img 
                src="/images/logo.png" 
                alt="Althaf Jewellery Makers - Heritage 22K Gold & Bridal Jewellery Guntur" 
                className="footer-logo-img"
              />
            </Link>

            <p className="footer-brand-desc">
              <strong>{SITE_CONFIG.brandName}</strong> (AB Jewellery Makers) — 5 generations of royal Indian goldsmithing. Handcrafted 22K Gold, Polki, Kundan, and Antique Temple Jewellery in Guntur, Andhra Pradesh.
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '0.8rem 0', color: '#F5D061', fontSize: '0.82rem' }}>
              <FiShield size={16} />
              <span>100% BIS 916 Hallmarked & HUID Certified</span>
            </div>

            <div className="footer-socials">
              <a href="#instagram" className="social-icon" aria-label="Follow Althaf Jewellery on Instagram"><FaInstagram /></a>
              <a href="#facebook" className="social-icon" aria-label="Follow Althaf Jewellery on Facebook"><FaFacebookF /></a>
              <a href="#youtube" className="social-icon" aria-label="Watch Althaf Jewellery on YouTube"><FaYoutube /></a>
              <a href="#pinterest" className="social-icon" aria-label="Explore Althaf Jewellery on Pinterest"><FaPinterestP /></a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="footer-col">
            <h4 className="footer-heading">EXPLORE PAGES</h4>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About Our Legacy</Link></li>
              <li><Link to="/collections">Jewellery Collections</Link></li>
              <li><Link to="/contact">Contact & Store Map</Link></li>
            </ul>
          </div>

          {/* Column 3: Collections Link */}
          <div className="footer-col">
            <h4 className="footer-heading">COLLECTIONS</h4>
            <ul className="footer-links">
              <li><Link to="/collections">22K Gold Necklaces</Link></li>
              <li><Link to="/collections">Uncut Polki & Kundan</Link></li>
              <li><Link to="/collections">Temple Jhumkas & Earrings</Link></li>
              <li><Link to="/collections">Antique Nakshi Bangles</Link></li>
              <li><Link to="/collections">Diamond Mangalsutras</Link></li>
              <li><Link to="/collections">Bespoke Bridal Couture</Link></li>
            </ul>
          </div>

          {/* Column 4: Trust & Guarantees */}
          <div className="footer-col">
            <h4 className="footer-heading">PURITY & SERVICE</h4>
            <ul className="footer-links">
              <li><Link to="/about">BIS 916 Hallmark Standard</Link></li>
              <li><Link to="/about">Hereditary Goldsmithing</Link></li>
              <li><Link to="/contact">Live Guntur Gold Rates</Link></li>
              <li><Link to="/contact">Insured All-India Shipping</Link></li>
              <li><Link to="/contact">Lifetime Exchange & Buyback</Link></li>
            </ul>
          </div>

          {/* Column 5: Contact Us */}
          <div className="footer-col contact-col">
            <h4 className="footer-heading">GUNTUR BOUTIQUE</h4>
            <div className="contact-list">
              <div className="contact-item cursor-pointer" onClick={openGeneralWhatsApp} role="button" tabIndex={0}>
                <FaWhatsapp className="contact-icon whatsapp-color" />
                <span>Chat on WhatsApp: {SITE_CONFIG.displayPhone}</span>
              </div>
              <div className="contact-item">
                <FiMapPin className="contact-icon" />
                <span>{SITE_CONFIG.shortAddress}</span>
              </div>
              <div className="contact-item">
                <FiPhoneCall className="contact-icon" />
                <span>{SITE_CONFIG.displayPhone}</span>
              </div>
              <div className="contact-item">
                <FiMail className="contact-icon" />
                <span>{SITE_CONFIG.email}</span>
              </div>
              <div className="contact-item">
                <FiClock className="contact-icon" />
                <span>{SITE_CONFIG.storeHours}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <p>© 2026 {SITE_CONFIG.brandName}. All Rights Reserved. | 100% BIS Hallmarked 22K Gold Jewellery in Guntur, Andhra Pradesh.</p>
        </div>
      </div>
    </footer>
  );
}
