import { SITE_CONFIG } from '../config';

/**
 * Format phone number for wa.me URL
 */
export const getCleanPhoneNumber = (phone) => {
  return (phone || SITE_CONFIG.whatsappNumber).replace(/[^0-9]/g, '');
};

/**
 * Generate full absolute URL for an image asset
 * Converts localhost paths to public Hostinger domain for WhatsApp compatibility
 */
export const getAbsoluteImageUrl = (imagePath) => {
  if (!imagePath) return '';
  
  const PUBLIC_DOMAIN = 'https://paleturquoise-dove-798660.hostingersite.com';
  const MEDIA_BASE_URL = 'https://www.api.abgoldjewelery.com';
  
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    if (imagePath.includes('localhost') || imagePath.includes('127.0.0.1')) {
      const relativePath = imagePath.replace(/^https?:\/\/[^\/]+/, '');
      return `${PUBLIC_DOMAIN}${relativePath}`;
    }
    return imagePath;
  }
  
  const cleanPath = imagePath.startsWith('/') ? imagePath : `/${imagePath}`;
  if (cleanPath.startsWith('/media/')) {
    return `${MEDIA_BASE_URL}${cleanPath}`;
  }
  if (cleanPath.startsWith('/products/') || cleanPath.startsWith('/categories/')) {
    return `${MEDIA_BASE_URL}/media${cleanPath}`;
  }
  
  const isLocal = typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');
  const base = isLocal ? PUBLIC_DOMAIN : window.location.origin;
  
  return `${base}${cleanPath}`;
};

/**
 * Generate clean WhatsApp message for a product without any '*' symbols
 */
export const generateProductWhatsAppMessage = (product) => {
  if (!product) return '';

  const fullImageUrl = getAbsoluteImageUrl(product.image);
  const priceText = product.formattedPrice || (product.price ? `₹${Number(product.price).toLocaleString('en-IN')}` : 'Price on Request');

  return `ALTHAF JEWELLERY MAKERS — HERITAGE LUXURY ENQUIRY

Hello ${SITE_CONFIG.brandName},

I am interested in purchasing/enquiring about this jewellery design:

Product: ${product.name}
Product Code: #${product.id}
Category: ${product.category || 'Luxury Collection'}
Price: ${priceText}
Metal & Purity: ${product.metal || 'Gold'} ${product.purity || '(22K 916 Hallmark)'}
Approx Weight: ${product.weight || 'N/A'}

Product Link:
${fullImageUrl}

Please share:
1. Today's live Gold Rate (Guntur AP)
2. Detailed Price Breakdown & Making Charges
3. Availability & Customization Timeline

Thank you!`;
};

/**
 * Open WhatsApp with pre-filled product details and a single clean link
 */
export const openProductWhatsApp = (product) => {
  const phone = getCleanPhoneNumber(SITE_CONFIG.whatsappNumber);
  const message = generateProductWhatsAppMessage(product);
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank', 'noopener,noreferrer');
};

/**
 * Generate general WhatsApp enquiry URL without any '*' symbols
 */
export const generateGeneralWhatsAppUrl = () => {
  const phone = getCleanPhoneNumber(SITE_CONFIG.whatsappNumber);
  
  const message = `Hello ${SITE_CONFIG.brandName},

I am browsing your luxury jewellery collection online and would like to get information regarding your latest designs, today's gold rates, making charges, and custom bridal orders.

Please connect me with a luxury jewellery consultant.

Thank you!`;

  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
};

export const openGeneralWhatsApp = () => {
  const url = generateGeneralWhatsAppUrl();
  window.open(url, '_blank', 'noopener,noreferrer');
};

export const openCustomWhatsApp = (customMessage) => {
  const phone = getCleanPhoneNumber(SITE_CONFIG.whatsappNumber);
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(customMessage)}`;
  window.open(url, '_blank', 'noopener,noreferrer');
};
