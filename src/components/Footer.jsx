import React from 'react';
import { FaWhatsapp, FaInstagram, FaFacebookF, FaYoutube, FaPinterestP } from 'react-icons/fa';
import { FiMail, FiClock, FiPhoneCall } from 'react-icons/fi';
import { SITE_CONFIG } from '../config';
import { openGeneralWhatsApp } from '../utils/whatsapp';
import './Footer.css';

export default function Footer() {
  return (
    <footer id="footer" className="footer-section">
      <div className="container">
        <div className="footer-grid">
          {/* Column 1: Pure Logo Image & Socials */}
          <div className="footer-col brand-col">
            <div className="footer-logo-wrapper">
              <img 
                src="/images/logo.png" 
                alt="Althaf Jewellery Makers Logo" 
                className="footer-logo-img"
              />
            </div>

            <p className="footer-brand-desc">
              Jewellery that celebrates tradition and elegance. Crafted for every you.
            </p>

            <div className="footer-socials">
              <a href="#instagram" className="social-icon" aria-label="Instagram"><FaInstagram /></a>
              <a href="#facebook" className="social-icon" aria-label="Facebook"><FaFacebookF /></a>
              <a href="#youtube" className="social-icon" aria-label="YouTube"><FaYoutube /></a>
              <a href="#pinterest" className="social-icon" aria-label="Pinterest"><FaPinterestP /></a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="footer-col">
            <h4 className="footer-heading">QUICK LINKS</h4>
            <ul className="footer-links">
              <li><a href="#hero">Home</a></li>
              <li><a href="#collections">Collections</a></li>
              <li><a href="#about">About Us</a></li>
              <li><a href="#craftsmanship">Our Story</a></li>
              <li><a href="#footer">Contact Us</a></li>
            </ul>
          </div>

          {/* Column 3: Help & Support */}
          <div className="footer-col">
            <h4 className="footer-heading">HELP & SUPPORT</h4>
            <ul className="footer-links">
              <li><a href="#faq">FAQ</a></li>
              <li><a href="#care">Jewellery Care</a></li>
              <li><a href="#size">Size Guide</a></li>
              <li><a href="#exchange">Exchange Policy</a></li>
              <li><a href="#shipping">Shipping Policy</a></li>
              <li><a href="#returns">Returns & Refunds</a></li>
            </ul>
          </div>

          {/* Column 4: Policies */}
          <div className="footer-col">
            <h4 className="footer-heading">POLICIES</h4>
            <ul className="footer-links">
              <li><a href="#privacy">Privacy Policy</a></li>
              <li><a href="#terms">Terms & Conditions</a></li>
              <li><a href="#payment">Payment Options</a></li>
              <li><a href="#track">Track Order</a></li>
            </ul>
          </div>

          {/* Column 5: Contact Us */}
          <div className="footer-col contact-col">
            <h4 className="footer-heading">CONTACT US</h4>
            <div className="contact-list">
              <div className="contact-item cursor-pointer" onClick={openGeneralWhatsApp}>
                <FaWhatsapp className="contact-icon whatsapp-color" />
                <span>Chat with us on WhatsApp</span>
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
          <p>© 2026 {SITE_CONFIG.brandName}. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
