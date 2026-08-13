import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FaWhatsapp, FaShieldAlt, FaAward, FaTruck, FaPhoneAlt, FaChevronLeft, FaSearchPlus } from 'react-icons/fa';
import { FiCheckCircle, FiShare2, FiInfo, FiHeart } from 'react-icons/fi';
import SEO from '../components/SEO';
import SubpageBanner from '../components/SubpageBanner';
import ProductCard from '../components/ProductCard';
import { PRODUCTS as FALLBACK_PRODUCTS } from '../data/products';
import { fetchApiProducts, getFullImageUrl } from '../utils/api';
import { openProductWhatsApp } from '../utils/whatsapp';
import { SITE_CONFIG } from '../config';
import './ProductDetailPage.css';

/* Interactive Luxury Image Magnifier Glass Component */
const ImageMagnifier = ({ src, alt }) => {
  const [showMagnifier, setShowMagnifier] = useState(false);
  const [[x, y], setXY] = useState([0, 0]);
  const [[imgWidth, imgHeight], setSize] = useState([0, 0]);
  const resolvedSrc = getFullImageUrl(src);

  const handleMouseEnter = (e) => {
    const elem = e.currentTarget;
    const { width, height } = elem.getBoundingClientRect();
    setSize([width, height]);
    setShowMagnifier(true);
  };

  const handleMouseMove = (e) => {
    const elem = e.currentTarget;
    const { top, left } = elem.getBoundingClientRect();
    const currentX = e.clientX - left;
    const currentY = e.clientY - top;
    setXY([currentX, currentY]);
  };

  const handleMouseLeave = () => {
    setShowMagnifier(false);
  };

  // Percentages for zoomed background image positioning
  const xPercent = imgWidth > 0 ? (x / imgWidth) * 100 : 50;
  const yPercent = imgHeight > 0 ? (y / imgHeight) * 100 : 50;

  return (
    <div 
      className="magnifier-container"
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <img 
        src={resolvedSrc} 
        alt={alt} 
        className="pdp-main-image" 
        loading="eager"
        onError={(e) => {
          e.currentTarget.onerror = null;
          e.currentTarget.src = "/images/products/heritage-necklace.png";
        }}
      />

      {/* Circular Magnifying Glass Loupe Lens */}
      {showMagnifier && (
        <div 
          className="magnifier-glass"
          style={{
            top: `${y - 80}px`,
            left: `${x - 80}px`,
            backgroundImage: `url(${resolvedSrc})`,
            backgroundPosition: `${xPercent}% ${yPercent}%`,
            backgroundSize: `${imgWidth * 2.8}px ${imgHeight * 2.8}px`
          }}
        />
      )}

      {/* Hover Zoom Hint Overlay Badge */}
      <div className={`magnifier-hint ${showMagnifier ? 'hidden' : ''}`}>
        <FaSearchPlus size={11} />
        <span>Hover to Magnify Detail</span>
      </div>
    </div>
  );
};

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const [product, setProduct] = useState(() => {
    return FALLBACK_PRODUCTS.find(p => p.id === id || p.slug === id) || FALLBACK_PRODUCTS[0];
  });
  const [allProducts, setAllProducts] = useState(FALLBACK_PRODUCTS);

  // Scroll to top and fetch updated product from Django REST API
  useEffect(() => {
    window.scrollTo(0, 0);

    fetchApiProducts().then(prods => {
      if (prods && prods.length > 0) {
        setAllProducts(prods);
        const found = prods.find(p => p.id === id || String(p.id) === String(id) || p.slug === id);
        if (found) {
          setProduct(found);
        }
      }
    });
  }, [id]);

  if (!product) {
    return (
      <div className="product-not-found container" style={{ padding: '6rem 0', textAlign: 'center' }}>
        <h2 style={{ color: '#F5D061', fontFamily: 'var(--font-brand)', fontSize: '2rem' }}>Product Not Found</h2>
        <p style={{ color: '#D4C3B3', margin: '1rem 0 2rem 0' }}>The jewellery item you are looking for does not exist or has been updated.</p>
        <Link to="/collections" className="btn-gold-outline">Back to Collections</Link>
      </div>
    );
  }

  const productImage = getFullImageUrl(product.image);

  // Schema.org Structured Data for Product & BreadcrumbList
  const productSchema = {
    "@context": "https://schema.org/",
    "@graph": [
      {
        "@type": "Product",
        "@id": `https://althafjewellery.com/product/${product.id}#product`,
        "name": product.name,
        "image": productImage.startsWith('http') ? productImage : `https://althafjewellery.com${productImage}`,
        "description": product.description,
        "sku": product.id,
        "mpn": product.id,
        "brand": {
          "@type": "Brand",
          "name": "Althaf Jewellery Makers"
        },
        "category": product.category,
        "material": `${product.purity || '22K'} Gold`,
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": String(product.rating || "4.9"),
          "reviewCount": String(product.reviewCount || "45")
        },
        "offers": {
          "@type": "Offer",
          "url": `https://althafjewellery.com/product/${product.id}`,
          "priceCurrency": "INR",
          "price": String(product.price || "100000"),
          "priceValidUntil": "2027-12-31",
          "itemCondition": "https://schema.org/NewCondition",
          "availability": "https://schema.org/InStock",
          "seller": {
            "@type": "JewelryStore",
            "name": "Althaf Jewellery Makers"
          }
        }
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://althafjewellery.com/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Collections",
            "item": "https://althafjewellery.com/collections"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": product.category,
            "item": `https://althafjewellery.com/collections?category=${encodeURIComponent(product.category)}`
          },
          {
            "@type": "ListItem",
            "position": 4,
            "name": product.name,
            "item": `https://althafjewellery.com/product/${product.id}`
          }
        ]
      }
    ]
  };

  // Filter 4 similar products from the same or other categories
  const relatedProducts = allProducts.filter(p => p.id !== product.id && (p.category || '').toUpperCase() === (product.category || '').toUpperCase()).slice(0, 4);
  const fallbackRelated = relatedProducts.length < 4 
    ? [...relatedProducts, ...allProducts.filter(p => p.id !== product.id && (p.category || '').toUpperCase() !== (product.category || '').toUpperCase())].slice(0, 4)
    : relatedProducts;

  const handleWhatsAppClick = () => {
    openProductWhatsApp(product);
  };

  const handleShareClick = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: `Check out ${product.name} at Althaf Jewellery Makers`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const pageTitle = product.seoTitle || `${product.name} - ${product.purity || '22K'} Gold | Althaf Jewellery Makers Guntur`;
  const pageDesc = product.seoDescription || `${product.description} 100% BIS 916 Hallmarked pure gold jewellery at Althaf Jewellery Makers, Lalapet, Guntur AP. Enquire on WhatsApp.`;

  return (
    <div className="product-detail-page">
      {/* Dynamic SEO Head Management */}
      <SEO 
        title={pageTitle}
        description={pageDesc}
        keywords={product.keywords || `${product.name}, ${product.category} gold guntur, 22k jewellery andhra pradesh, bis 916 hallmark`}
        canonical={`https://althafjewellery.com/product/${product.id}`}
        ogImage={productImage.startsWith('http') ? productImage : `https://althafjewellery.com${productImage}`}
        ogType="product"
        schema={productSchema}
      />

      {/* Subpage Banner */}
      <SubpageBanner
        title={product.name}
        subtitle={`${product.purity || '22K'} Pure Gold • ${product.category} • Handcrafted Heirloom in Guntur`}
        bgImage="/images/footer-gold-bg.png"
      />

      {/* Main Product Detail Section */}
      <section className="product-detail-section">
        <div className="container">
          {/* Breadcrumb & Navigation Bar */}
          <nav className="product-breadcrumb" aria-label="Breadcrumb">
            <button onClick={() => navigate(-1)} className="btn-back">
              <FaChevronLeft size={12} />
              <span>Back to Catalogue</span>
            </button>
            <span className="breadcrumb-separator">/</span>
            <Link to="/collections" className="breadcrumb-link">Collections</Link>
            <span className="breadcrumb-separator">/</span>
            <span className="breadcrumb-link">{product.category}</span>
            <span className="breadcrumb-separator">/</span>
            <span className="breadcrumb-current">{product.name}</span>
          </nav>

          {/* Detailed Product Content Grid */}
          <div className="product-main-grid">
            {/* Left Column: Interactive Magnifier Image Viewer */}
            <div className="pdp-image-column">
              <div className="pdp-main-image-wrapper luxury-card">
                <div className="hallmark-purity-badge">
                  <span>{product.hallmark || 'BIS 916 HALLMARKED'}</span>
                </div>

                {/* Interactive Hover Magnifier View */}
                <ImageMagnifier src={productImage} alt={`${product.name} - ${product.purity || '22K'} Gold Jewellery Althaf Guntur`} />
              </div>

              {/* Trust Badges Bar below image */}
              <div className="pdp-trust-bar">
                <div className="pdp-trust-item">
                  <FaShieldAlt className="pdp-trust-icon" />
                  <span>100% BIS 916 Hallmarked Gold</span>
                </div>
                <div className="pdp-trust-item">
                  <FaAward className="pdp-trust-icon" />
                  <span>Lifetime Exchange Guarantee</span>
                </div>
                <div className="pdp-trust-item">
                  <FaTruck className="pdp-trust-icon" />
                  <span>Insured Express Shipping</span>
                </div>
              </div>
            </div>

            {/* Right Column: In-Depth Product Specifications & Actions */}
            <div className="pdp-info-column">
              <div className="pdp-category-tag">{(product.category || '').toUpperCase()} COLLECTION</div>
              <h1 className="pdp-title">{product.name}</h1>

              <div className="pdp-price-row">
                <span className="pdp-price">{product.formattedPrice || `₹${(product.price || 0).toLocaleString('en-IN')}`}</span>
                <span className="pdp-price-disclaimer">*Indicative Price (Live rate Guntur AP)</span>
              </div>

              <div className="pdp-divider"></div>

              {/* Comprehensive Product Specification Table */}
              <div className="pdp-specs-card">
                <h3 className="pdp-specs-title">PRODUCT SPECIFICATIONS</h3>
                <div className="pdp-specs-grid">
                  <div className="pdp-spec-item">
                    <span className="spec-label">Product Code</span>
                    <span className="spec-val highlight">{product.id}</span>
                  </div>
                  <div className="pdp-spec-item">
                    <span className="spec-label">Jewellery Category</span>
                    <span className="spec-val">{product.category}</span>
                  </div>
                  <div className="pdp-spec-item">
                    <span className="spec-label">Metal & Purity</span>
                    <span className="spec-val">{product.metal || 'Gold'} ({product.purity || '22K'} Gold)</span>
                  </div>
                  <div className="pdp-spec-item">
                    <span className="spec-label">Approximate Weight</span>
                    <span className="spec-val">{product.weight}</span>
                  </div>
                  <div className="pdp-spec-item">
                    <span className="spec-label">Certification</span>
                    <span className="spec-val">{product.hallmark || 'BIS 916 Hallmarked & Certified'}</span>
                  </div>
                  <div className="pdp-spec-item">
                    <span className="spec-label">Store Location</span>
                    <span className="spec-val">Main Gold Market, Guntur AP</span>
                  </div>
                </div>
              </div>

              {/* In-Detail Story & Description */}
              <div className="pdp-description-box">
                <h3 className="pdp-sub-heading">CRAFTSMANSHIP & DESIGN STORY</h3>
                <p className="pdp-desc-text">{product.longDescription || product.description}</p>
                <p className="pdp-desc-text">
                  Handcrafted by 5th-generation hereditary goldsmiths in Guntur using authentic royal carving techniques. 
                  Every curve is polished to perfection with 100% hallmarked gold, bringing eternal warmth, brilliance, and elegance to your special celebrations.
                </p>
              </div>

              {/* Key Highlights Checklist */}
              <div className="pdp-highlights-list">
                <div className="pdp-hl-item">
                  <FiCheckCircle className="hl-icon" />
                  <span>100% Certified 22K Hallmarked Gold Purity</span>
                </div>
                <div className="pdp-hl-item">
                  <FiCheckCircle className="hl-icon" />
                  <span>Transparent Itemized Pricing & Live Rate Billing</span>
                </div>
                <div className="pdp-hl-item">
                  <FiCheckCircle className="hl-icon" />
                  <span>Custom Sizing & Bespoke Alteration Available</span>
                </div>
                <div className="pdp-hl-item">
                  <FiCheckCircle className="hl-icon" />
                  <span>Personalized In-Store Trial at Guntur Boutique</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pdp-actions-wrapper">
                <button className="btn-whatsapp-pdp" onClick={handleWhatsAppClick} aria-label="Enquire on WhatsApp for best quote">
                  <FaWhatsapp size={22} />
                  <span>ENQUIRE ON WHATSAPP FOR BEST QUOTE</span>
                </button>

                <div className="pdp-secondary-actions">
                  <a href={`tel:${SITE_CONFIG.whatsappNumber}`} className="btn-phone-pdp" aria-label="Call Showroom">
                    <FaPhoneAlt size={15} />
                    <span>Call Showroom</span>
                  </a>

                  <button className="btn-share-pdp" onClick={handleShareClick} aria-label="Share Item">
                    <FiShare2 size={16} />
                    <span>{copied ? "Link Copied!" : "Share Item"}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Related / Similar Jewellery Suggestions Grid */}
          <div className="pdp-related-section">
            <div className="pdp-related-header">
              <span className="cg-tag">MORE FROM OUR VAULT</span>
              <h2 className="pdp-related-title">YOU MAY ALSO ADORE</h2>
              <div className="cg-divider">
                <span className="cg-line"></span>
                <span className="cg-crest">❖</span>
                <span className="cg-line"></span>
              </div>
            </div>

            <div className="pdp-related-grid">
              {fallbackRelated.map((relProduct) => (
                <ProductCard key={relProduct.id} product={relProduct} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
