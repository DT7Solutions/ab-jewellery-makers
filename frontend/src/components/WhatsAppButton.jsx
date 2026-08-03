import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { openGeneralWhatsApp } from '../utils/whatsapp';
import './WhatsAppButton.css';

export default function WhatsAppButton() {
  return (
    <div className="floating-whatsapp-container">
      {/* Tooltip to the left of the button */}
      <div className="whatsapp-tooltip">
        Chat with Us
      </div>
      
      {/* Fixed WhatsApp Button on the bottom-right */}
      <button 
        className="floating-whatsapp-btn"
        onClick={openGeneralWhatsApp}
        aria-label="Quick WhatsApp Enquiry"
      >
        <FaWhatsapp size={28} />
        <span className="pulse-ring"></span>
      </button>
    </div>
  );
}
