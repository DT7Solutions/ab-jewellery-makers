import React from 'react';
import './TrustBar.css';

export default function TrustBar() {
  const trustItems = [
    {
      id: 1,
      icon: (
        <svg viewBox="0 0 40 40" width="38" height="38" fill="none" stroke="#F5D061" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 4 L33 9 V18 C33 27 20 34 20 34 C20 34 7 27 7 18 V9 L20 4 Z" />
          <path d="M20 9 L29 13 V18 C29 24 20 29 20 29 C20 29 11 24 11 18 V13 L20 9 Z" strokeWidth="1.2" opacity="0.7" />
          <circle cx="20" cy="18" r="3" fill="#F5D061" />
        </svg>
      ),
      line1: <><span className="trust-highlight-num">100%</span> Hallmarked</>,
      line2: "Pure Jewellery"
    },
    {
      id: 2,
      icon: (
        <svg viewBox="0 0 40 40" width="38" height="38" fill="none" stroke="#F5D061" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 6 H24 L33 15 V31 C33 33 31 35 29 35 H12 C10 35 8 33 8 31 V10 C8 8 10 6 12 6 Z" />
          <circle cx="18" cy="13" r="2.5" />
          <path d="M15 22 C18 20 22 25 25 23" strokeWidth="1.5" />
          <path d="M15 27 H25" strokeWidth="1.5" />
        </svg>
      ),
      line1: "Transparent",
      line2: "Pricing"
    },
    {
      id: 3,
      icon: (
        <svg viewBox="0 0 40 40" width="38" height="38" fill="none" stroke="#F5D061" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 7 C27.18 7 33 12.82 33 20 C33 27.18 27.18 33 20 33 C12.82 33 7 27.18 7 20" />
          <path d="M33 14 L33 20 H27" strokeWidth="2" />
          <path d="M7 26 L7 20 H13" strokeWidth="2" />
          <circle cx="20" cy="20" r="3.5" fill="#F5D061" />
        </svg>
      ),
      line1: "Easy Exchange &",
      line2: "Buyback"
    },
    {
      id: 4,
      icon: (
        <svg viewBox="0 0 40 40" width="38" height="38" fill="none" stroke="#F5D061" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 4 L33 9 V18 C33 27 20 34 20 34 C20 34 7 27 7 18 V9 L20 4 Z" />
          <path d="M15 17 L19 21 L26 14" strokeWidth="2" />
        </svg>
      ),
      line1: "Secure & Insured",
      line2: "Delivery"
    },
    {
      id: 5,
      icon: (
        <svg viewBox="0 0 40 40" width="38" height="38" fill="none" stroke="#F5D061" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 6 L24 13 L31 14 L26 19 L27 26 L20 22 L13 26 L14 19 L9 14 L16 13 Z" />
          <path d="M12 32 C16 29 24 29 28 32" strokeWidth="1.5" />
        </svg>
      ),
      line1: "Trusted by",
      line2: "Thousands"
    }
  ];

  return (
    <section className="trust-bar-section">
      <div className="container trust-container">
        {/* Trust Bar inside boxed card container */}
        <div className="trust-bar-card">
          <div className="trust-bar-flex">
            {trustItems.map((item, idx) => (
              <React.Fragment key={item.id}>
                <div className="trust-item-block">
                  <div className="trust-icon-box">
                    {item.icon}
                  </div>
                  <div className="trust-text-box">
                    <span className="trust-line1">{item.line1}</span>
                    <span className="trust-line2">{item.line2}</span>
                  </div>
                </div>
                {idx < trustItems.length - 1 && (
                  <div className="trust-vertical-divider" />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
