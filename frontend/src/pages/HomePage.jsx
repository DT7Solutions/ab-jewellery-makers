import React from 'react';
import SEO from '../components/SEO';
import Hero from '../components/Hero';
import TrustBar from '../components/TrustBar';
import Collections from '../components/Collections';
import FeaturedJewellery from '../components/FeaturedJewellery';
import BridalShowcase from '../components/BridalShowcase';
import Craftsmanship from '../components/Craftsmanship';
import AboutUs from '../components/AboutUs';
import Testimonials from '../components/Testimonials';
import FaqSection from '../components/FaqSection';
import Gallery from '../components/Gallery';

export default function HomePage({ selectedCategory, onSelectCategory, onViewDetails }) {
  const homeSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "JewelryStore",
        "@id": "https://althafjewellery.com/#store",
        "name": "Althaf Jewellery Makers",
        "alternateName": "AB Jewellery Makers",
        "url": "https://althafjewellery.com/",
        "logo": "https://althafjewellery.com/images/logo.png",
        "image": "https://althafjewellery.com/images/hero-bg-full.png",
        "description": "Handcrafted 22K Gold, Polki, Kundan, and Antique Temple Jewellery in Guntur, Andhra Pradesh. 100% BIS 916 Hallmarked Purity.",
        "telephone": "+91-9876543210",
        "email": "hello@althafjewellery.com",
        "priceRange": "₹₹₹",
        "currenciesAccepted": "INR",
        "paymentAccepted": "Cash, Credit Card, UPI, Net Banking",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Main Gold Market, Lalapet",
          "addressLocality": "Guntur",
          "addressRegion": "Andhra Pradesh",
          "postalCode": "522001",
          "addressCountry": "IN"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 16.3067,
          "longitude": 80.4365
        },
        "openingHoursSpecification": [
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            "opens": "10:00",
            "closes": "19:00"
          }
        ],
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "reviewCount": "180"
        }
      },
      {
        "@type": "FAQPage",
        "@id": "https://althafjewellery.com/#faq",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "How do I verify the purity of gold jewellery at Althaf Jewellery Makers?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Every creation at Althaf Jewellery Makers is 100% BIS 916 Hallmarked by Government authorized testing centers with official BIS Hallmark seal, 22K purity mark, and unique HUID tracking stamp."
            }
          },
          {
            "@type": "Question",
            "name": "Can I order custom bridal jewellery or request design modifications in Guntur?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes! We specialize in bespoke bridal jewellery. Share your reference photos or design ideas on WhatsApp or visit our flagship boutique at Lalapet Main Gold Market in Guntur, AP. Our 5th-generation goldsmiths will handcraft your dream heirloom."
            }
          },
          {
            "@type": "Question",
            "name": "How are live gold prices calculated at Althaf Jewellery Makers?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Prices are calculated transparently using the live 22K Gold rate in Guntur, Andhra Pradesh. We provide itemized quotations detailing exact net gold weight, live rate, hallmarking charges, and making fees with zero hidden costs."
            }
          },
          {
            "@type": "Question",
            "name": "Do you provide insured home delivery across Andhra Pradesh and India?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes! Every order from Althaf Jewellery Makers is packed in tamper-evident secure luxury boxes and shipped with 100% full transit insurance directly to your doorstep."
            }
          }
        ]
      }
    ]
  };

  return (
    <>
      {/* Dynamic SEO Head Management */}
      <SEO 
        title="Althaf Jewellery Makers | Best 22K Gold, Polki & Bridal Jewellery in Guntur AP"
        description="Discover handcrafted 22K Gold, Polki, Kundan, and Antique Temple Jewellery at Althaf Jewellery Makers in Guntur, Andhra Pradesh. 100% BIS 916 Hallmarked heritage designs, transparent live gold pricing & custom bridal orders."
        keywords="Althaf Jewellery Makers, AB Jewellery Makers, Gold Jewellery Guntur, 22K Gold Rate Guntur, Bridal Gold Jewellery Andhra Pradesh, Polki Diamond Necklace, Kundan Choker Guntur, Temple Jhumkas, Antique Nakshi Gold, 916 BIS Hallmarked Gold, Best Jewellers in Guntur"
        canonical="https://althafjewellery.com/"
        schema={homeSchema}
      />

      {/* Cinematic Hero Slider */}
      <Hero />

      {/* 5-Column Trust Bar */}
      <TrustBar />

      {/* Circular Collections Grid */}
      <Collections 
        selectedCategory={selectedCategory}
        onSelectCategory={onSelectCategory}
      />

      {/* Featured Jewellery Catalogue */}
      <FeaturedJewellery 
        selectedCategory={selectedCategory}
        onSelectCategory={onSelectCategory}
        onViewDetails={onViewDetails}
      />

      {/* Bridal Showcase Banner (Signature Collections) */}
      <BridalShowcase />

      {/* Editorial Craftsmanship Banner */}
      <Craftsmanship />

      {/* About Us & Heritage Stats */}
      <AboutUs />

      {/* Customer Reviews Carousel */}
      <Testimonials />

      {/* FAQ Section */}
      <FaqSection />

      {/* Close-up Gallery & WhatsApp Enquiry Banner */}
      <Gallery onSelectImage={onViewDetails} />

      {/* Semantic Rich SEO Knowledge & Location Narrative Section */}
      <section className="seo-rich-overview-section" style={{ backgroundColor: '#140504', padding: '3.5rem 0', borderTop: '1px solid rgba(245, 208, 97, 0.15)' }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem' }}>
          <div style={{ maxWidth: '980px', margin: '0 auto', textAlign: 'center' }}>
            <span style={{ fontSize: '0.75rem', letterSpacing: '3px', color: '#E2C068', textTransform: 'uppercase', display: 'block', marginBottom: '0.5rem' }}>
              HERITAGE GOLD SHOWROOM IN GUNTUR, ANDHRA PRADESH
            </span>
            <h2 style={{ fontFamily: 'var(--font-brand)', fontSize: '1.8rem', color: '#F5D061', letterSpacing: '2px', marginBottom: '1.2rem', textTransform: 'uppercase' }}>
              Authentic Indian Goldsmithing & Bespoke Bridal Couture
            </h2>
            <p style={{ color: '#D4C3B3', fontSize: '0.92rem', lineHeight: '1.8', marginBottom: '1.2rem', fontWeight: '300' }}>
              Welcome to <strong>Althaf Jewellery Makers</strong> (also known as <strong>AB Jewellery Makers</strong>), Guntur’s trusted destination for genuine <strong>22K BIS 916 Hallmarked Gold</strong>, royal <strong>uncut Polki diamonds</strong>, traditional <strong>Kundan necklaces</strong>, and antique <strong>Temple Nakshi jewellery</strong>. Located at the heart of the historic <strong>Main Gold Market in Lalapet, Guntur (AP - 522001)</strong>, our family has carried forward 5 generations of hereditary goldsmithing excellence.
            </p>
            <p style={{ color: '#A89280', fontSize: '0.86rem', lineHeight: '1.7', margin: 0 }}>
              Whether you are planning your complete bridal trousseau, looking for live 22K/24K Guntur gold rate valuations, or commissioning a bespoke custom gold ornament, our master karigars guarantee 100% hallmarked purity, transparent itemized billing, and lifetime buyback assurance.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
