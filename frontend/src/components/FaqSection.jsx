import React, { useState } from 'react';
import { FiChevronDown, FiHelpCircle } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { openGeneralWhatsApp } from '../utils/whatsapp';
import './FaqSection.css';

const FAQ_DATA = [
  {
    id: 1,
    question: "How do I verify the purity of gold jewellery at Althaf Jewellery Makers?",
    answer: "Every creation at Althaf Jewellery Makers is 100% BIS 916 Hallmarked by Government authorized testing centers in Andhra Pradesh. Each piece features the official BIS Hallmark triangular seal, 22K purity mark (916), and unique 6-digit alphanumeric HUID tracking stamp for absolute guaranteed purity."
  },
  {
    id: 2,
    question: "Can I order custom bridal jewellery or request design modifications in Guntur?",
    answer: "Yes! We specialize in bespoke bridal jewellery made-to-order. You can share your reference photos, Pinterest ideas, or custom sketches on WhatsApp or visit our flagship boutique at Lalapet, Guntur. Our 5th-generation hereditary goldsmiths will handcraft your dream heirloom to exact weight and design specifications."
  },
  {
    id: 3,
    question: "How are gold prices and making charges calculated for my order?",
    answer: "Our prices are calculated transparently using the live 22K Gold rate in Guntur, Andhra Pradesh. We provide itemized quotations detailing exact gross weight, stone weight, net gold weight, live gold rate, hallmarking charges, and making fees with zero hidden costs."
  },
  {
    id: 4,
    question: "What is your exchange and buyback policy for gold jewellery?",
    answer: "We offer a 100% Lifetime Exchange & Buyback Guarantee across all our hallmarked 22K gold, uncut Polki, and diamond creations. You can exchange or upgrade your heirlooms at prevailing live market rates in Guntur with zero deduction on net gold weight."
  },
  {
    id: 5,
    question: "Where is your boutique located in Guntur, and can I book a private bridal trial?",
    answer: "Our flagship jewellery boutique is located at Main Gold Market, Lalapet, Guntur, Andhra Pradesh (PIN: 522001). We welcome brides and families for personalized in-store bridal trials and private consultations. You can also reserve a VIP trial slot directly on WhatsApp."
  },
  {
    id: 6,
    question: "Do you provide insured home delivery for online orders across India?",
    answer: "Yes! Every order from Althaf Jewellery Makers is packed in tamper-evident secure luxury boxes and shipped with 100% full transit insurance via trusted logistics partners, ensuring complete peace of mind until delivered directly to your doorstep."
  },
  {
    id: 7,
    question: "What payment options are available, and do you accept old gold exchange?",
    answer: "We accept UPI (Google Pay, PhonePe, Paytm), Credit/Debit cards, Net Banking, and Bank Wire transfers. We also accept old gold jewellery exchange at 100% live Guntur 22K market bullion value toward your new purchase with zero melting deduction."
  }
];

export default function FaqSection() {
  const [activeId, setActiveId] = useState(1);

  const toggleAccordion = (id) => {
    setActiveId(prev => (prev === id ? null : id));
  };

  return (
    <section id="faq-section" className="faq-section" aria-label="Frequently Asked Questions">
      {/* Section Header */}
      <div className="faq-header-container">
        <div className="faq-header-center">
          <div className="faq-title-inline">
            <div className="title-divider-side left">
              <span className="divider-line"></span>
              <span className="divider-diamond">◈</span>
              <span className="divider-line-short"></span>
            </div>
            <h2 className="faq-title-text">FREQUENTLY ASKED QUESTIONS</h2>
            <div className="title-divider-side right">
              <span className="divider-line-short"></span>
              <span className="divider-diamond">◈</span>
              <span className="divider-line"></span>
            </div>
          </div>
          <p className="section-tagline">CLEAR ANSWERS ON 22K GOLD PURITY, BESPOKE ORDERS & GUNTUR BOUTIQUE</p>
        </div>
      </div>

      {/* Grid: Questions Left, Image Right */}
      <div className="faq-grid">
        {/* Left Column: Questions Accordion */}
        <div className="faq-accordion-col">
          <div className="faq-accordion-list">
            {FAQ_DATA.map((item) => {
              const isOpen = activeId === item.id;
              return (
                <div key={item.id} className={`faq-item ${isOpen ? 'open' : ''}`}>
                  <button 
                    className="faq-question-btn"
                    onClick={() => toggleAccordion(item.id)}
                    aria-expanded={isOpen}
                    aria-label={item.question}
                  >
                    <div className="faq-q-left">
                      <FiHelpCircle className="faq-q-icon" />
                      <span className="faq-question-text">{item.question}</span>
                    </div>
                    <span className={`faq-arrow-icon ${isOpen ? 'rotated' : ''}`}>
                      <FiChevronDown size={18} />
                    </span>
                  </button>

                  {isOpen && (
                    <div className="faq-answer-box">
                      <p className="faq-answer-text">{item.answer}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Direct WhatsApp CTA below FAQ list */}
          <div className="faq-whatsapp-cta">
            <span>Have more questions? Speak directly to our jewellery specialist.</span>
            <button 
              className="btn-whatsapp-pill" 
              onClick={openGeneralWhatsApp}
              aria-label="Ask questions on WhatsApp"
            >
              <FaWhatsapp size={18} />
              <span>Ask on WhatsApp</span>
            </button>
          </div>
        </div>

        {/* Right Column: Image Frame */}
        <div className="faq-image-col">
          <div className="faq-image-frame">
            <img 
              src="/images/raasvi-bride.png" 
              alt="Althaf Jewellery Makers Heritage Bride - 22K Gold Jewellery in Guntur AP" 
              className="faq-showcase-img"
              loading="lazy"
            />
            <div className="faq-image-overlay">
              <div className="faq-badge-content">
                <span className="faq-badge-title">HERITAGE OF TRUST</span>
                <span className="faq-badge-sub">100% BIS 916 Hallmarked • Guntur, AP</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
