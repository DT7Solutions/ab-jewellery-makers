import React from 'react';
import SubpageBanner from '../components/SubpageBanner';
import Collections from '../components/Collections';
import CollectionsGrid from '../components/CollectionsGrid';
import Gallery from '../components/Gallery';

export default function CollectionsPage({ selectedCategory, onSelectCategory, onViewDetails }) {
  return (
    <div className="collections-page">
      {/* Subpage Banner */}
      <SubpageBanner 
        title="OUR JEWELLERY COLLECTIONS"
        subtitle="Explore our handcrafted 22K Gold, Polki, Kundan, Antique, and Temple Jewellery creations."
        bgImage="/images/footer-gold-bg.png"
      />

      {/* Collections Category Grid */}
      <Collections 
        selectedCategory={selectedCategory}
        onSelectCategory={onSelectCategory}
      />

      {/* Dynamic Collection Catalogue Grid with Filters */}
      <CollectionsGrid 
        selectedCategory={selectedCategory}
        onSelectCategory={onSelectCategory}
        onViewDetails={onViewDetails}
      />

      {/* Close-up Gallery & WhatsApp CTA */}
      <Gallery onSelectImage={onViewDetails} />
    </div>
  );
}
