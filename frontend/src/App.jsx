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

// Admin Dashboard Components
import AdminLoginPage from './pages/admin/AdminLoginPage';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminCategories from './pages/admin/AdminCategories';
import AdminProducts from './pages/admin/AdminProducts';
import AdminGoldRates from './pages/admin/AdminGoldRates';
import AdminInquiries from './pages/admin/AdminInquiries';
import AdminHeroBanners from './pages/admin/AdminHeroBanners';

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
        <Routes>
          {/* Admin routes (isolated from public layout) */}
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/categories" element={<AdminCategories />} />
          <Route path="/admin/products" element={<AdminProducts />} />
          <Route path="/admin/gold-rates" element={<AdminGoldRates />} />
          <Route path="/admin/inquiries" element={<AdminInquiries />} />
          <Route path="/admin/banners" element={<AdminHeroBanners />} />

          {/* Public website routes wrapped in the public layout */}
          <Route 
            path="/*" 
            element={
              <>
                <Header />
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
                <Footer />
                <WhatsAppButton />
              </>
            } 
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
