import { SITE_CONFIG } from '../config';

/**
 * Format phone number for wa.me URL
 */
export const getCleanPhoneNumber = (phone) => {
  return (phone || SITE_CONFIG.whatsappNumber).replace(/[^0-9]/g, '');
};

/**
 * Generate WhatsApp URL for a specific product enquiry
 */
export const generateProductWhatsAppUrl = (product) => {
  const phone = getCleanPhoneNumber(SITE_CONFIG.whatsappNumber);
  
  const message = `Hello ${SITE_CONFIG.brandName},

I'm interested in the following jewellery:

Product: ${product.name}
Product ID: ${product.id}
Category: ${product.category}
Displayed Price: ${product.formattedPrice || `₹${product.price?.toLocaleString('en-IN')}`}
Metal: ${product.metal}
Purity: ${product.purity}
Approx Weight: ${product.weight}

Please send me:
- Today's gold rate
- Price breakdown
- Making charges
- Taxes if applicable
- Availability
- Final quotation

Thank you.`;

  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
};

/**
 * Generate general WhatsApp enquiry URL
 */
export const generateGeneralWhatsAppUrl = () => {
  const phone = getCleanPhoneNumber(SITE_CONFIG.whatsappNumber);
  
  const message = `Hello ${SITE_CONFIG.brandName},

I am browsing your collection online and would like to get more information regarding your designs, today's gold rate, making charges, and custom orders.

Please connect me with a luxury jewellery consultant.

Thank you.`;

  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
};

export const openProductWhatsApp = (product) => {
  const url = generateProductWhatsAppUrl(product);
  window.open(url, '_blank', 'noopener,noreferrer');
};

export const openGeneralWhatsApp = () => {
  const url = generateGeneralWhatsAppUrl();
  window.open(url, '_blank', 'noopener,noreferrer');
};
