import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import PagePreloader from './components/PagePreloader';
import Header from './components/Header';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';

import HomePage from './pages/HomePage';
import CollectionsPage from './pages/CollectionsPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import ProductDetailPage from './pages/ProductDetailPage';

import './index.css';

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleSelectCategory = (categoryName) => {
    setSelectedCategory(categoryName);
  };

  return (
    <BrowserRouter>
      {/* Luxury Dark Curtain Slide-Up Preloader */}
      <PagePreloader />

      <ScrollToTop />
      <div className="app-root">
        {/* Navigation Header */}
        <Header />

        {/* Multi-Page Routes */}
        <main>
          <Routes>
            <Route 
              path="/" 
              element={
                <HomePage 
                  selectedCategory={selectedCategory}
                  onSelectCategory={handleSelectCategory}
                />
              } 
            />
            <Route 
              path="/collections" 
              element={
                <CollectionsPage 
                  selectedCategory={selectedCategory}
                  onSelectCategory={handleSelectCategory}
                />
              } 
            />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/product/:id" element={<ProductDetailPage />} />
          </Routes>
        </main>

        {/* Luxury Footer */}
        <Footer />

        {/* Floating Sticky WhatsApp Button */}
        <WhatsAppButton />
      </div>
    </BrowserRouter>
  );
}
