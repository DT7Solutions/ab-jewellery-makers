import React from 'react';
import SubpageBanner from '../components/SubpageBanner';
import AboutUs from '../components/AboutUs';
import WhyChooseUs from '../components/WhyChooseUs';
import VisionMission from '../components/VisionMission';
import TrustBar from '../components/TrustBar';
import Testimonials from '../components/Testimonials';
import FaqSection from '../components/FaqSection';
import BridalShowcase from '../components/BridalShowcase';

export default function AboutPage() {
  return (
    <div className="about-page">
      {/* Subpage Banner */}
      <SubpageBanner 
        title="ABOUT ALTHAF JEWELLERY MAKERS"
        subtitle="A regal celebration of Indian heritage, royal craftsmanship, and timeless bridal beauty passed down through generations."
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
