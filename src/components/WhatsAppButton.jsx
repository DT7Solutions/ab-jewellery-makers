import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { openGeneralWhatsApp } from '../utils/whatsapp';
import './WhatsAppButton.css';

export default function WhatsAppButton() {
  return (
    <div className="floating-whatsapp-container">
      <button 
        className="floating-whatsapp-btn"
        onClick={openGeneralWhatsApp}
        aria-label="Quick WhatsApp Enquiry"
      >
        <FaWhatsapp size={28} />
        <span className="pulse-ring"></span>
      </button>
      <div className="whatsapp-tooltip">
        Chat with Us
      </div>
    </div>
  );
}
