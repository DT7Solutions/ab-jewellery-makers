import React from 'react';
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
  return (
    <>
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

      {/* Bridal Showcase Banner (Raasvi Gujarat Collection) */}
      <BridalShowcase />

      {/* Editorial Craftsmanship Banner */}
      <Craftsmanship />

      {/* About Us & Heritage Stats */}
      <AboutUs />

      {/* Customer Reviews Carousel (LOVED BY OUR CUSTOMERS) */}
      <Testimonials />

      {/* FAQ Section (Questions Left, Luxury Image Right) */}
      <FaqSection />

      {/* Close-up Gallery & WhatsApp Enquiry Banner */}
      <Gallery onSelectImage={onViewDetails} />
    </>
  );
}
