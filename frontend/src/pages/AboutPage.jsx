import React from 'react';
import SEO from '../components/SEO';
import SubpageBanner from '../components/SubpageBanner';
import AboutUs from '../components/AboutUs';
import WhyChooseUs from '../components/WhyChooseUs';
import VisionMission from '../components/VisionMission';
import TrustBar from '../components/TrustBar';
import Testimonials from '../components/Testimonials';
import FaqSection from '../components/FaqSection';
import BridalShowcase from '../components/BridalShowcase';
import { SITE_CONFIG } from '../config';

export default function AboutPage() {
  const aboutSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "@id": "https://althafjewellery.com/about#webpage",
    "url": "https://althafjewellery.com/about",
    "name": `About ${SITE_CONFIG.brandName} | 5 Generations of Heritage Goldsmiths`,
    "description": `Discover the royal legacy of ${SITE_CONFIG.brandName} in Tenali, Andhra Pradesh. 5 generations of hereditary master goldsmiths crafting 100% BIS 916 hallmarked bridal heirlooms.`,
    "mainEntity": {
      "@type": "JewelryStore",
      "name": SITE_CONFIG.brandName,
      "foundingDate": "1998",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Shop No. 26, ASR Complex, Beside Metro Shoemart, Gandhi Chowk, Sharaf Bazar",
        "addressLocality": "Tenali",
        "addressRegion": "Andhra Pradesh",
        "postalCode": "522201",
        "addressCountry": "IN"
      },
      "award": "100% BIS 916 Hallmarked Certification Standard",
      "knowsAbout": ["22K Gold Jewellery", "Uncut Polki Diamonds", "Antique Temple Ornaments", "Kundan Bridal Sets"]
    }
  };

  return (
    <div className="about-page">
      {/* Dynamic SEO Head Management */}
      <SEO 
        title={`About ${SITE_CONFIG.brandName} | 5 Generations of Heritage Goldsmiths in Tenali AP`}
        description={`Discover the royal legacy of ${SITE_CONFIG.brandName} in Tenali, Andhra Pradesh. 5 generations of hereditary master goldsmiths crafting 100% BIS 916 hallmarked bridal heirlooms.`}
        keywords="about althaf jewellery makers, best jewellers tenali history, 5 generations goldsmiths andhra pradesh, bis 916 hallmark gold tenali, sharaf bazar gold market legacy"
        canonical="https://althafjewellery.com/about"
        schema={aboutSchema}
      />

      {/* Subpage Banner */}
      <SubpageBanner 
        title="ABOUT ALTHAF JEWELLERY MAKERS"
        subtitle="A regal celebration of Indian heritage, royal craftsmanship, and timeless bridal beauty passed down through generations in Tenali, AP."
        bgImage="/images/hero-bg-full.png"
      />

      {/* About Us & Legacy Stats (Image Left, Content Right) */}
      <AboutUs />

      {/* Why Choose Us (Opposite Layout: Content Left, Image Right) */}
      <WhyChooseUs />

      {/* Vision, Mission & Core Values Grid */}
      <VisionMission />

      {/* Trust & Heritage Values */}
      <TrustBar />

      {/* Bridal Story Showcase */}
      <BridalShowcase />

      {/* Customer Reviews */}
      <Testimonials />

      {/* FAQ Section */}
      <FaqSection />
    </div>
  );
}
