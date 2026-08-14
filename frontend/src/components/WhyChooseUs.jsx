import React from 'react';
import { FiCheckCircle, FiShield, FiHeart, FiStar } from 'react-icons/fi';
import './WhyChooseUs.css';

export default function WhyChooseUs() {
  const highlights = [
    {
      icon: <FiShield size={24} />,
      title: "100% BIS 916 Hallmarked",
      desc: "Every 22K gold piece comes with certified purity stamp and unique 6-digit HUID tracking number."
    },
    {
      icon: <FiStar size={24} />,
      title: "5th-Gen Master Goldsmithing",
      desc: "Handcrafted by hereditary karigars in Tenali with centuries of royal Indian temple & polki heritage."
    },
    {
      icon: <FiHeart size={24} />,
      title: "Bespoke Custom Bridal Couture",
      desc: "Custom-designed bridal jewellery tailored to your vision, wedding outfit color, and budget."
    },
    {
      icon: <FiCheckCircle size={24} />,
      title: "Transparent Live Rate Billing",
      desc: "Clear itemized pricing on live Tenali AP gold rates, net weight, hallmarking, and making charges."
    }
  ];

  return (
    <section className="why-choose-section" aria-label="Why Choose Althaf Jewellery Makers">
      <div className="why-choose-grid">
        {/* Left Column: Content (Opposite to AboutUs) */}
        <div className="why-choose-content-col">
          <div className="why-choose-title-header">
            <h2 className="why-choose-title-text">WHY CHOOSE US</h2>
            <div className="why-choose-divider-side">
              <span className="divider-line"></span>
              <span className="divider-diamond">◈</span>
              <span className="divider-line-short"></span>
            </div>
          </div>
          <p className="section-tagline left-align">5 GENERATIONS OF HEREDITARY GOLDSMITHING & UNCOMPROMISED TRUST IN TENALI</p>

          <p className="why-choose-intro">
            At <strong>Althaf Jewellery Makers</strong>, we combine centuries-old royal Indian goldsmithing traditions with uncompromised BIS 916 purity, live market pricing, and modern customer trust.
          </p>

          <div className="why-choose-features-grid">
            {highlights.map((item, idx) => (
              <div key={idx} className="why-feature-card">
                <div className="why-feature-icon">{item.icon}</div>
                <div className="why-feature-info">
                  <h3 className="why-feature-title">{item.title}</h3>
                  <p className="why-feature-desc">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Image Frame (Opposite to AboutUs) */}
        <div className="why-choose-image-col">
          <div className="why-choose-image-frame">
            <img 
              src="/images/hero-slide-3.jpg" 
              alt="Why Choose Althaf Jewellery Makers - 22K Gold Purity & Master Craftsmanship Tenali" 
              className="why-choose-image"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
