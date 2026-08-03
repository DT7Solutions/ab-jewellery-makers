import React from 'react';
import { FiCheckCircle, FiShield, FiHeart, FiStar } from 'react-icons/fi';
import './WhyChooseUs.css';

export default function WhyChooseUs() {
  const highlights = [
    {
      icon: <FiShield size={24} />,
      title: "100% BIS Hallmarked",
      desc: "Every 22K gold piece comes with certified purity and hallmark guarantee."
    },
    {
      icon: <FiStar size={24} />,
      title: "Master Goldsmithing",
      desc: "Handcrafted by hereditary karigars with centuries of royal Indian heritage."
    },
    {
      icon: <FiHeart size={24} />,
      title: "Bespoke Custom Orders",
      desc: "Bespoke bridal couture custom-designed to bring your dream vision to life."
    },
    {
      icon: <FiCheckCircle size={24} />,
      title: "Transparent Valuation",
      desc: "Clear itemized pricing on gold rate, net weight, making charges, and stones."
    }
  ];

  return (
    <section className="why-choose-section">
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

          <p className="why-choose-intro">
            At Althaf Jewellery Makers, we combine centuries-old royal goldsmithing traditions with uncompromised purity and modern customer trust.
          </p>

          <div className="why-choose-features-grid">
            {highlights.map((item, idx) => (
              <div key={idx} className="why-feature-card">
                <div className="why-feature-icon">{item.icon}</div>
                <div className="why-feature-info">
                  <h4 className="why-feature-title">{item.title}</h4>
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
              alt="Why Choose Althaf Jewellery Makers" 
              className="why-choose-image"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
