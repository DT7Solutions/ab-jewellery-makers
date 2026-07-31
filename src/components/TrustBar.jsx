import React from 'react';
import { FiAward, FiTag, FiRefreshCw, FiShield, FiHeart } from 'react-icons/fi';
import './TrustBar.css';

export default function TrustBar() {
  const trustItems = [
    {
      icon: <FiAward size={26} />,
      title: "100% Hallmarked",
      subtitle: "Pure Jewellery"
    },
    {
      icon: <FiTag size={26} />,
      title: "Transparent",
      subtitle: "Pricing"
    },
    {
      icon: <FiRefreshCw size={26} />,
      title: "Easy Exchange &",
      subtitle: "Buyback"
    },
    {
      icon: <FiShield size={26} />,
      title: "Secure & Insured",
      subtitle: "Delivery"
    },
    {
      icon: <FiHeart size={26} />,
      title: "Trusted by",
      subtitle: "Thousands"
    }
  ];

  return (
    <section className="trust-bar-section">
      <div className="container">
        <div className="trust-bar-grid">
          {trustItems.map((item, idx) => (
            <div key={idx} className="trust-item">
              <div className="trust-icon-wrapper">
                {item.icon}
              </div>
              <div className="trust-text">
                <span className="trust-title">{item.title}</span>
                <span className="trust-subtitle">{item.subtitle}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
