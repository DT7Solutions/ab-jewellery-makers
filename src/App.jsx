import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import TrustBar from './components/TrustBar';
import Collections from './components/Collections';
import FeaturedJewellery from './components/FeaturedJewellery';
import Craftsmanship from './components/Craftsmanship';
import AboutUs from './components/AboutUs';
import Testimonials from './components/Testimonials';
import Gallery from './components/Gallery';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import ProductModal from './components/ProductModal';
import './index.css';

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [activeModalItem, setActiveModalItem] = useState(null);

  const handleSelectCategory = (categoryName) => {
    setSelectedCategory(categoryName);
  };

  const handleViewDetails = (item) => {
    setActiveModalItem(item);
  };

  const handleCloseModal = () => {
    setActiveModalItem(null);
  };

  return (
    <div className="app-root">
      {/* Navigation Header */}
      <Header />

      {/* Main Content Sections */}
      <main>
        {/* Cinematic Hero */}
        <Hero />

        {/* 5-Column Trust Bar */}
        <TrustBar />

        {/* Circular Collections Grid */}
        <Collections 
          selectedCategory={selectedCategory}
          onSelectCategory={handleSelectCategory}
        />

        {/* Featured Jewellery Catalogue */}
        <FeaturedJewellery 
          selectedCategory={selectedCategory}
          onSelectCategory={handleSelectCategory}
          onViewDetails={handleViewDetails}
        />

        {/* Editorial Craftsmanship Banner */}
        <Craftsmanship />

        {/* About Us & Heritage Stats */}
        <AboutUs />

        {/* Customer Reviews Carousel */}
        <Testimonials />

        {/* Close-up Gallery & WhatsApp Enquiry Banner */}
        <Gallery onSelectImage={handleViewDetails} />
      </main>

      {/* Luxury Footer */}
      <Footer />

      {/* Floating Sticky WhatsApp Button */}
      <WhatsAppButton />

      {/* Product Detail Modal */}
      {activeModalItem && (
        <ProductModal 
          item={activeModalItem} 
          onClose={handleCloseModal} 
        />
      )}
    </div>
  );
}
