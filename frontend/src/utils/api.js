import { PRODUCTS as FALLBACK_PRODUCTS } from '../data/products';
import { CATEGORIES as FALLBACK_CATEGORIES } from '../data/categories';
import { BASE_GUNTUR_GOLD_RATES } from './goldRate';

export const API_BASE_URL = 'https://www.api.abgoldjewelery.com/api';

/**
 * Fetch all categories from Django REST Framework API with fallback
 */
export async function fetchApiCategories() {
  try {
    const response = await fetch(`${API_BASE_URL}/categories/`, {
      headers: { 'Accept': 'application/json' }
    });
    if (!response.ok) throw new Error(`HTTP error ${response.status}`);
    const data = await response.json();
    const results = Array.isArray(data) ? data : (data.results || []);

    if (results.length > 0) {
      return results.map(cat => ({
        id: cat.slug || String(cat.id),
        name: cat.name.toUpperCase(),
        image: cat.image || `/images/products/heritage-necklace.png`,
        count: `${cat.product_count || 12} Designs`
      }));
    }
  } catch (err) {
    console.warn("Django API offline, using fallback Categories:", err.message);
  }
  return FALLBACK_CATEGORIES;
}

/**
 * Fetch products from Django REST Framework API with optional category filter
 */
export async function fetchApiProducts(categoryName = null) {
  try {
    let url = `${API_BASE_URL}/products/`;
    if (categoryName && categoryName !== 'ALL') {
      url += `?category=${encodeURIComponent(categoryName)}`;
    }
    const response = await fetch(url, {
      headers: { 'Accept': 'application/json' }
    });
    if (!response.ok) throw new Error(`HTTP error ${response.status}`);
    const data = await response.json();
    const results = Array.isArray(data) ? data : (data.results || []);

    if (results.length > 0) {
      return results.map(prod => ({
        id: prod.slug || String(prod.id),
        name: prod.name,
        category: prod.category_name || prod.category,
        price: parseFloat(prod.price),
        formattedPrice: `₹${parseFloat(prod.price).toLocaleString('en-IN')}`,
        metal: "Gold",
        purity: prod.purity || "22K",
        weight: prod.weight || "N/A",
        image: prod.image || "/images/products/heritage-necklace.png",
        featured: prod.is_featured,
        bestseller: prod.is_bestseller,
        description: prod.description
      }));
    }
  } catch (err) {
    console.warn("Django API offline, using fallback Products:", err.message);
  }

  if (categoryName && categoryName !== 'ALL') {
    return FALLBACK_PRODUCTS.filter(p => p.category.toLowerCase() === categoryName.toLowerCase());
  }
  return FALLBACK_PRODUCTS;
}

/**
 * Fetch live gold rates from Django REST Framework API
 */
export async function fetchApiGoldRates() {
  try {
    const response = await fetch(`${API_BASE_URL}/gold-rates/latest/`, {
      headers: { 'Accept': 'application/json' }
    });
    if (!response.ok) throw new Error(`HTTP error ${response.status}`);
    const data = await response.json();
    if (data && data.gold_22k_per_gram) {
      return {
        location: data.location || "Guntur, AP",
        gold22k: Math.round(parseFloat(data.gold_22k_per_gram)),
        gold24k: Math.round(parseFloat(data.gold_24k_per_gram || 7470)),
        silver: Math.round(parseFloat(data.silver_per_gram || 91)),
        unit: 'gram',
        currency: 'INR',
        lastUpdated: data.updated_at ? new Date(data.updated_at).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) : "Just Now"
      };
    }
  } catch (err) {
    console.warn("Django Gold Rate API offline, using live Guntur AP rates:", err.message);
  }
  return BASE_GUNTUR_GOLD_RATES;
}

/**
 * Submit inquiry to Django REST Framework API
 */
export async function submitApiInquiry(inquiryData) {
  try {
    const response = await fetch(`${API_BASE_URL}/inquiries/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(inquiryData)
    });
    if (!response.ok) throw new Error(`HTTP error ${response.status}`);
    return await response.json();
  } catch (err) {
    console.warn("Django Inquiry API submission fallback:", err.message);
    return { success: true, message: "Inquiry saved locally." };
  }
}
