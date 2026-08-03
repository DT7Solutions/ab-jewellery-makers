import React, { useState } from 'react';
import SubpageBanner from '../components/SubpageBanner';
import { FaWhatsapp } from 'react-icons/fa';
import { FiMail, FiPhoneCall, FiClock, FiMapPin, FiCheckCircle } from 'react-icons/fi';
import { SITE_CONFIG } from '../config';
import { openGeneralWhatsApp, openCustomWhatsApp } from '../utils/whatsapp';
import { submitApiInquiry } from '../utils/api';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    interest: 'Bridal Jewellery',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Save inquiry to Django REST API (PostgreSQL database)
      await submitApiInquiry({
        customer_name: formData.name,
        phone: formData.phone,
        message: `Category Interest: ${formData.interest} | Message: ${formData.message}`
      });
    } catch (err) {
      console.warn("API submission handled:", err);
    }

    setIsSubmitting(false);
    setSubmitted(true);

    // Launch WhatsApp Custom Message
    const customMsg = `Hello Althaf Jewellery Makers,\n\nName: ${formData.name}\nPhone: ${formData.phone}\nInterested In: ${formData.interest}\nMessage: ${formData.message}`;
    openCustomWhatsApp(customMsg);
  };

  return (
    <div className="contact-page">
      {/* Subpage Banner */}
      <SubpageBanner 
        title="CONTACT & ENQUIRIES"
        subtitle="Get instant quotations, custom order details & product consultations directly on WhatsApp."
        bgImage="/images/footer-gold-bg.png"
      />

      {/* Main Contact Section */}
      <section style={{ padding: '4rem 0', backgroundColor: 'var(--secondary)' }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '3rem',
            alignItems: 'start'
          }}>
            {/* Left Box: Contact Info Card */}
            <div style={{
              backgroundColor: 'var(--secondary-card)',
              border: '1px solid var(--border-gold)',
              padding: '2.5rem',
              borderRadius: '4px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
            }}>
              <h3 style={{
                fontFamily: 'var(--font-brand)',
                fontSize: '1.4rem',
                color: '#F5D061',
                marginBottom: '1.5rem',
                letterSpacing: '2px',
                textTransform: 'uppercase'
              }}>
                Store Details
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '15px' }}>
                  <FiMapPin size={22} color="#F5D061" style={{ flexShrink: 0, marginTop: '3px' }} />
                  <div>
                    <h5 style={{ color: 'var(--cream)', fontSize: '0.95rem', marginBottom: '3px' }}>Store Address</h5>
                    <p style={{ color: 'var(--muted)', fontSize: '0.88rem', lineHeight: 1.5 }}>
                      {SITE_CONFIG.address}
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '15px' }}>
                  <FiPhoneCall size={20} color="#F5D061" style={{ flexShrink: 0, marginTop: '3px' }} />
                  <div>
                    <h5 style={{ color: 'var(--cream)', fontSize: '0.95rem', marginBottom: '3px' }}>Phone Number</h5>
                    <p style={{ color: 'var(--muted)', fontSize: '0.88rem' }}>{SITE_CONFIG.displayPhone}</p>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '15px' }}>
                  <FiMail size={20} color="#F5D061" style={{ flexShrink: 0, marginTop: '3px' }} />
                  <div>
                    <h5 style={{ color: 'var(--cream)', fontSize: '0.95rem', marginBottom: '3px' }}>Email Address</h5>
                    <p style={{ color: 'var(--muted)', fontSize: '0.88rem' }}>{SITE_CONFIG.email}</p>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '15px' }}>
                  <FiClock size={20} color="#F5D061" style={{ flexShrink: 0, marginTop: '3px' }} />
                  <div>
                    <h5 style={{ color: 'var(--cream)', fontSize: '0.95rem', marginBottom: '3px' }}>Store Hours</h5>
                    <p style={{ color: 'var(--muted)', fontSize: '0.88rem' }}>{SITE_CONFIG.storeHours}</p>
                  </div>
                </div>
              </div>

              {/* Direct WhatsApp Pill */}
              <div style={{ marginTop: '2.5rem' }}>
                <button 
                  className="btn-whatsapp-pill" 
                  onClick={openGeneralWhatsApp}
                  style={{ width: '100%', justifyContent: 'center', padding: '0.85rem' }}
                >
                  <FaWhatsapp size={20} />
                  <span>Chat Directly on WhatsApp</span>
                </button>
              </div>
            </div>

            {/* Right Box: Quick Inquiry Form */}
            <div style={{
              backgroundColor: 'var(--secondary-card)',
              border: '1px solid var(--border-gold)',
              padding: '2.5rem',
              borderRadius: '4px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
            }}>
              <h3 style={{
                fontFamily: 'var(--font-brand)',
                fontSize: '1.4rem',
                color: '#F5D061',
                marginBottom: '1.5rem',
                letterSpacing: '2px',
                textTransform: 'uppercase'
              }}>
                Send Instant Enquiry
              </h3>

              {submitted && (
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  backgroundColor: 'rgba(37, 211, 102, 0.12)',
                  border: '1px solid rgba(37, 211, 102, 0.4)',
                  color: '#25D366',
                  padding: '1rem',
                  borderRadius: '4px',
                  marginBottom: '1.5rem',
                  fontSize: '0.88rem'
                }}>
                  <FiCheckCircle size={20} style={{ flexShrink: 0 }} />
                  <span>Thank you! Your enquiry has been submitted successfully and sent to WhatsApp.</span>
                </div>
              )}

              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                <div>
                  <label style={{ display: 'block', color: 'var(--cream)', fontSize: '0.85rem', marginBottom: '0.4rem' }}>Your Name</label>
                  <input 
                    type="text" 
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter your full name"
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      backgroundColor: 'rgba(20,5,4,0.8)',
                      border: '1px solid rgba(245, 208, 97, 0.4)',
                      color: 'var(--cream)',
                      borderRadius: '2px',
                      outline: 'none'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', color: 'var(--cream)', fontSize: '0.85rem', marginBottom: '0.4rem' }}>Phone / WhatsApp Number</label>
                  <input 
                    type="tel" 
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="Enter your contact number"
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      backgroundColor: 'rgba(20,5,4,0.8)',
                      border: '1px solid rgba(245, 208, 97, 0.4)',
                      color: 'var(--cream)',
                      borderRadius: '2px',
                      outline: 'none'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', color: 'var(--cream)', fontSize: '0.85rem', marginBottom: '0.4rem' }}>Interested Category</label>
                  <select 
                    value={formData.interest}
                    onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      backgroundColor: 'rgba(20,5,4,0.8)',
                      border: '1px solid rgba(245, 208, 97, 0.4)',
                      color: 'var(--cream)',
                      borderRadius: '2px',
                      outline: 'none'
                    }}
                  >
                    <option value="Bridal Jewellery">Bridal Jewellery</option>
                    <option value="Antique Gold">Antique Gold</option>
                    <option value="Polki & Kundan">Polki & Kundan</option>
                    <option value="Temple Jewellery">Temple Jewellery</option>
                    <option value="Diamond Couture">Diamond Couture</option>
                    <option value="Custom Order">Custom Design Order</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', color: 'var(--cream)', fontSize: '0.85rem', marginBottom: '0.4rem' }}>Message / Requirements</label>
                  <textarea 
                    rows="4"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us what you are looking for..."
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      backgroundColor: 'rgba(20,5,4,0.8)',
                      border: '1px solid rgba(245, 208, 97, 0.4)',
                      color: 'var(--cream)',
                      borderRadius: '2px',
                      outline: 'none',
                      resize: 'vertical'
                    }}
                  ></textarea>
                </div>

                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-gold-outline"
                  style={{ width: '100%', justifyContent: 'center', marginTop: '0.5rem' }}
                >
                  {isSubmitting ? "Submitting..." : "Send Enquiry via WhatsApp"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Google Map Location Section */}
      <section className="contact-map-section" style={{ padding: '0 0 5rem 0', backgroundColor: 'var(--secondary)' }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem' }}>
          {/* Map Section Header */}
          <div style={{ textTransform: 'center', textAlign: 'center', marginBottom: '2.5rem' }}>
            <span style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.72rem',
              fontWeight: '600',
              letterSpacing: '3px',
              color: '#E2C068',
              textTransform: 'uppercase',
              display: 'inline-block',
              marginBottom: '0.5rem'
            }}>
              FIND OUR BOUTIQUE
            </span>
            <h2 style={{
              fontFamily: 'var(--font-brand)',
              fontSize: '2.2rem',
              color: '#F5D061',
              letterSpacing: '3px',
              textTransform: 'uppercase',
              marginBottom: '0.8rem',
              fontWeight: '500'
            }}>
              STORE LOCATION & MAP
            </h2>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '1rem' }}>
              <span style={{ height: '1px', width: '90px', background: 'linear-gradient(90deg, transparent 0%, rgba(245, 208, 97, 0.7) 50%, transparent 100%)' }}></span>
              <span style={{ color: '#F5D061', fontSize: '0.95rem' }}>❖</span>
              <span style={{ height: '1px', width: '90px', background: 'linear-gradient(90deg, transparent 0%, rgba(245, 208, 97, 0.7) 50%, transparent 100%)' }}></span>
            </div>
            <p style={{ fontSize: '0.95rem', color: '#FBF2E3', fontWeight: '300', margin: 0, opacity: 0.9 }}>
              Visit our flagship jewellery showroom for personalized bridal trials and custom consultations.
            </p>
          </div>

          {/* Map Embed Frame Wrapper */}
          <div style={{
            backgroundColor: 'var(--secondary-card)',
            border: '1px solid var(--border-gold)',
            borderRadius: '6px',
            overflow: 'hidden',
            boxShadow: '0 15px 40px rgba(0,0,0,0.6)',
            position: 'relative'
          }}>
            <iframe
              title="Althaf Jewellery Makers Location Map - Guntur"
              src={SITE_CONFIG.mapEmbedUrl}
              width="100%"
              height="450"
              style={{ border: 0, display: 'block' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>

            {/* Floating Directions Bar Below Map */}
            <div style={{
              padding: '1.5rem 2rem',
              backgroundColor: 'rgba(26, 7, 6, 0.95)',
              borderTop: '1px solid rgba(245, 208, 97, 0.25)',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '1rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <FiMapPin size={24} color="#F5D061" />
                <div>
                  <h4 style={{ color: '#F5D061', fontFamily: 'var(--font-brand)', fontSize: '1.1rem', margin: '0 0 2px 0' }}>
                    Althaf Jewellery Makers Flagship Store
                  </h4>
                  <p style={{ color: '#D4C3B3', fontSize: '0.85rem', margin: 0 }}>
                    {SITE_CONFIG.shortAddress} • {SITE_CONFIG.storeHours}
                  </p>
                </div>
              </div>

              <a
                href={SITE_CONFIG.mapDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold-outline"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}
              >
                <FiMapPin size={16} />
                <span>Get Driving Directions</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
