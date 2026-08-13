import React from 'react';
import SEO from '../components/SEO';
import SubpageBanner from '../components/SubpageBanner';
import Collections from '../components/Collections';
import CollectionsGrid from '../components/CollectionsGrid';
import Gallery from '../components/Gallery';

export default function CollectionsPage({ selectedCategory, onSelectCategory, onViewDetails }) {
  const activeTitle = selectedCategory 
    ? `${selectedCategory} Collection - 22K Gold & Bridal Jewellery | Althaf Jewellery Guntur`
    : "Handcrafted 22K Gold, Polki & Bridal Jewellery Collections | Althaf Jewellery Guntur AP";

  const activeDesc = selectedCategory
    ? `Explore our signature handcrafted ${selectedCategory} collection in pure 22K BIS 916 hallmarked gold at Althaf Jewellery Makers in Guntur, Andhra Pradesh. Custom orders available.`
    : "Explore the complete catalogue of 22K Gold Necklaces, Polki Diamonds, Kundan Chokers, Antique Temple Jhumkas, Bangles, Rings, Pendants & Mangalsutras at Althaf Jewellery Makers Guntur.";

  const collectionsSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": "https://althafjewellery.com/collections#webpage",
    "url": "https://althafjewellery.com/collections",
    "name": activeTitle,
    "description": activeDesc,
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "22K Gold Necklaces & Chokers",
          "url": "https://althafjewellery.com/collections?category=NECKLACES"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Temple & Chandbali Earrings",
          "url": "https://althafjewellery.com/collections?category=EARRINGS"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "22K Gold Bangles & Kadas",
          "url": "https://althafjewellery.com/collections?category=BANGLES"
        },
        {
          "@type": "ListItem",
          "position": 4,
          "name": "Peacock & Kundan Rings",
          "url": "https://althafjewellery.com/collections?category=RINGS"
        },
        {
          "@type": "ListItem",
          "position": 5,
          "name": "Solitaire Emerald Pendants",
          "url": "https://althafjewellery.com/collections?category=PENDANTS"
        },
        {
          "@type": "ListItem",
          "position": 6,
          "name": "Antique Nakshi Heritage Jewellery",
          "url": "https://althafjewellery.com/collections?category=ANTIQUE"
        },
        {
          "@type": "ListItem",
          "position": 7,
          "name": "Filigree Gold Bracelets",
          "url": "https://althafjewellery.com/collections?category=BRACELETS"
        },
        {
          "@type": "ListItem",
          "position": 8,
          "name": "Diamond & Gold Mangalsutras",
          "url": "https://althafjewellery.com/collections?category=MANGALSUTRA"
        }
      ]
    }
  };

  return (
    <div className="collections-page">
      {/* Dynamic SEO Head Management */}
      <SEO 
        title={activeTitle}
        description={activeDesc}
        keywords="22k gold collections guntur, bridal jewellery catalogue andhra pradesh, gold necklace designs, temple jewellery showroom guntur, antique nakshi gold, polki diamond sets"
        canonical="https://althafjewellery.com/collections"
        schema={collectionsSchema}
      />

      {/* Subpage Banner */}
      <SubpageBanner 
        title="OUR JEWELLERY COLLECTIONS"
        subtitle="Explore our handcrafted 22K Gold, Polki, Kundan, Antique, and Temple Jewellery creations in Guntur, Andhra Pradesh."
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

      {/* Educational Gold Guide & Hallmarking Guide */}
      <section className="collections-guide-section" style={{ backgroundColor: '#140504', padding: '3.5rem 0', borderTop: '1px solid rgba(245, 208, 97, 0.2)' }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            <div style={{ backgroundColor: 'rgba(26, 7, 6, 0.8)', padding: '2rem', border: '1px solid rgba(245, 208, 97, 0.3)', borderRadius: '4px' }}>
              <h3 style={{ fontFamily: 'var(--font-brand)', color: '#F5D061', fontSize: '1.2rem', marginBottom: '0.8rem', letterSpacing: '1px' }}>
                ✦ 100% BIS 916 HALLMARKED PURITY
              </h3>
              <p style={{ color: '#D4C3B3', fontSize: '0.88rem', lineHeight: '1.7', margin: 0 }}>
                Every single piece in our collection is crafted with certified 22K (91.6% pure gold) stamped with official Bureau of Indian Standards (BIS) hallmark and unique 6-digit HUID tracking numbers.
              </p>
            </div>

            <div style={{ backgroundColor: 'rgba(26, 7, 6, 0.8)', padding: '2rem', border: '1px solid rgba(245, 208, 97, 0.3)', borderRadius: '4px' }}>
              <h3 style={{ fontFamily: 'var(--font-brand)', color: '#F5D061', fontSize: '1.2rem', marginBottom: '0.8rem', letterSpacing: '1px' }}>
                ✦ LIVE MARKET RATE & TRANSPARENT BILLING
              </h3>
              <p style={{ color: '#D4C3B3', fontSize: '0.88rem', lineHeight: '1.7', margin: 0 }}>
                We practice transparent gold pricing updated live according to Guntur AP bullion market rates. Every invoice clearly separates gross weight, stone weight, net gold weight, making charges, and taxes.
              </p>
            </div>

            <div style={{ backgroundColor: 'rgba(26, 7, 6, 0.8)', padding: '2rem', border: '1px solid rgba(245, 208, 97, 0.3)', borderRadius: '4px' }}>
              <h3 style={{ fontFamily: 'var(--font-brand)', color: '#F5D061', fontSize: '1.2rem', marginBottom: '0.8rem', letterSpacing: '1px' }}>
                ✦ BESPOKE CUSTOM BRIDAL ORDERS
              </h3>
              <p style={{ color: '#D4C3B3', fontSize: '0.88rem', lineHeight: '1.7', margin: 0 }}>
                Have a reference picture or a custom bridal vision in mind? Connect directly with our 5th-generation hereditary goldsmiths on WhatsApp for 3D renderings, weight estimations, and personalized trials.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Close-up Gallery & WhatsApp CTA */}
      <Gallery onSelectImage={onViewDetails} />
    </div>
  );
}
