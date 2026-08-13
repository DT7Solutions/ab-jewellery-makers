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

export default function AboutPage() {
  const aboutSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "@id": "https://althafjewellery.com/about#webpage",
    "url": "https://althafjewellery.com/about",
    "name": "About Althaf Jewellery Makers | 5 Generations of Goldsmithing in Guntur AP",
    "description": "Learn about the heritage, craftsmanship, and 5-generation legacy of Althaf Jewellery Makers in Guntur, Andhra Pradesh. 100% BIS 916 Hallmarked royal Indian jewellery.",
    "mainEntity": {
      "@type": "JewelryStore",
      "name": "Althaf Jewellery Makers",
      "foundingDate": "1998",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Main Gold Market, Lalapet",
        "addressLocality": "Guntur",
        "addressRegion": "Andhra Pradesh",
        "postalCode": "522001",
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
        title="About Althaf Jewellery Makers | 5 Generations of Heritage Goldsmiths in Guntur AP"
        description="Discover the royal legacy of Althaf Jewellery Makers (AB Jewellery Makers) in Guntur, Andhra Pradesh. 5 generations of hereditary master goldsmiths crafting 100% BIS 916 hallmarked bridal heirlooms."
        keywords="about althaf jewellery makers, best jewellers guntur history, 5 generations goldsmiths andhra pradesh, bis 916 hallmark gold guntur, lalapet gold market legacy"
        canonical="https://althafjewellery.com/about"
        schema={aboutSchema}
      />

      {/* Subpage Banner */}
      <SubpageBanner 
        title="ABOUT ALTHAF JEWELLERY MAKERS"
        subtitle="A regal celebration of Indian heritage, royal craftsmanship, and timeless bridal beauty passed down through generations in Guntur, AP."
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
