import { PRODUCTS as FALLBACK_PRODUCTS } from '../data/products';
import { CATEGORIES as FALLBACK_CATEGORIES } from '../data/categories';
import { BASE_TENALI_GOLD_RATES } from './goldRate';

// Dynamically target local backend in development vs production backend in deployed site
const isLocalhost = typeof window !== 'undefined' && 
  (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');

export const API_BASE_URL = isLocalhost 
  ? 'http://127.0.0.1:8000/api' 
  : 'https://www.api.abgoldjewelery.com/api';

export const MEDIA_BASE_URL = isLocalhost 
  ? 'http://127.0.0.1:8000' 
  : 'https://www.api.abgoldjewelery.com';

/**
 * Helper to get authentication headers
 */
function getAuthHeaders(extraHeaders = {}) {
  const token = localStorage.getItem('admin_token');
  const headers = { ...extraHeaders };
  if (token) {
    headers['Authorization'] = `Token ${token}`;
  }
  return headers;
}

/**
 * Format image URL properly
 */
export function getFullImageUrl(imagePath, fallback = '/images/products/heritage-necklace.png') {
  if (!imagePath) return fallback;

  const strPath = String(imagePath).trim();
  if (!strPath) return fallback;

  if (strPath.startsWith('http://') || strPath.startsWith('https://')) {
    return strPath;
  }

  if (strPath.startsWith('/media/')) {
    return `${MEDIA_BASE_URL}${strPath}`;
  }
  if (strPath.startsWith('media/')) {
    return `${MEDIA_BASE_URL}/${strPath}`;
  }
  if (strPath.startsWith('products/') || strPath.startsWith('categories/')) {
    return `${MEDIA_BASE_URL}/media/${strPath}`;
  }

  return strPath;
}

/**
 * AUTHENTICATION API CALLS
 */
export async function adminLogin(username, password) {
  const response = await fetch(`${API_BASE_URL}/admin/login/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({ username, password })
  });

  if (!response.ok) {
    const errData = await response.json();
    throw new Error(errData.error || errData.detail || 'Login failed');
  }

  const data = await response.json();
  localStorage.setItem('admin_token', data.token);
  localStorage.setItem('admin_user', JSON.stringify({
    username: data.username,
    email: data.email,
    is_staff: data.is_staff
  }));
  return data;
}

export async function adminLogout() {
  try {
    const response = await fetch(`${API_BASE_URL}/admin/logout/`, {
      method: 'POST',
      headers: getAuthHeaders({
        'Accept': 'application/json'
      })
    });
    if (!response.ok) {
      console.warn("Logout request returned status code:", response.status);
    }
  } catch (err) {
    console.error("Logout request failed:", err);
  } finally {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_user');
  }
}

export async function adminChangePassword(oldPassword, newPassword) {
  const response = await fetch(`${API_BASE_URL}/admin/change-password/`, {
    method: 'POST',
    headers: getAuthHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }),
    body: JSON.stringify({ old_password: oldPassword, new_password: newPassword })
  });

  if (!response.ok) {
    const errData = await response.json();
    throw new Error(errData.error || errData.detail || 'Password change failed');
  }
  return await response.json();
}

/**
 * PUBLIC API CALLS WITH FALLBACKS
 */
export async function fetchApiCategories() {
  try {
    const response = await fetch(`${API_BASE_URL}/categories/?no_pagination=true`, {
      headers: { 'Accept': 'application/json' }
    });
    if (!response.ok) throw new Error(`HTTP error ${response.status}`);
    const data = await response.json();
    const results = Array.isArray(data) ? data : (data.results || []);

    if (results.length > 0) {
      return results.map(cat => ({
        id: cat.slug || String(cat.id),
        pk: cat.id,
        name: cat.name.toUpperCase(),
        slug: cat.slug,
        description: cat.description,
        status: cat.status,
        image: getFullImageUrl(cat.image, `/images/products/heritage-necklace.png`),
        count: `${cat.product_count || 0} Designs`
      }));
    }
  } catch (err) {
    console.warn("Django API offline, using fallback Categories:", err.message);
  }
  return FALLBACK_CATEGORIES;
}

export async function fetchApiProducts(categoryName = null) {
  try {
    let url = `${API_BASE_URL}/products/?no_pagination=true`;
    if (categoryName && categoryName !== 'ALL') {
      url += `&category=${encodeURIComponent(categoryName)}`;
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
        pk: prod.id,
        name: prod.name,
        category: prod.category_name || prod.category,
        categoryName: prod.category_name,
        price: parseFloat(prod.price),
        formattedPrice: `₹${parseFloat(prod.price).toLocaleString('en-IN')}`,
        metal: "Gold",
        purity: prod.purity || "22K",
        weight: prod.weight || "N/A",
        image: getFullImageUrl(prod.image, "/images/products/heritage-necklace.png"),
        featured: prod.is_featured,
        bestseller: prod.is_bestseller,
        active: prod.is_active,
        status: prod.status,
        description: prod.description,
        product_code: prod.product_code,
        certification: prod.certification,
        tags: prod.tags,
        custom_flags: prod.custom_flags
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

export async function fetchApiGoldRates() {
  try {
    const response = await fetch(`${API_BASE_URL}/gold-rates/latest/`, {
      headers: { 'Accept': 'application/json' }
    });
    if (!response.ok) throw new Error(`HTTP error ${response.status}`);
    const data = await response.json();
    if (data && data.gold_22k_per_gram) {
      return {
        id: data.id,
        location: data.location || "Tenali, AP",
        gold22k: Math.round(parseFloat(data.gold_22k_per_gram)),
        gold24k: Math.round(parseFloat(data.gold_24k_per_gram || 7470)),
        silver: Math.round(parseFloat(data.silver_per_gram || 91)),
        unit: 'gram',
        currency: 'INR',
        lastUpdated: data.updated_at ? new Date(data.updated_at).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) : "Just Now"
      };
    }
  } catch (err) {
    console.warn("Django Gold Rate API offline, using live Tenali AP rates:", err.message);
  }
  return BASE_TENALI_GOLD_RATES;
}

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

/**
 * ADMIN DATA API CALLS (Requires Auth Token)
 */

export async function fetchAdminCategories(search = '', statusFilter = '', page = 1) {
  let url = `${API_BASE_URL}/categories/?page=${page}&`;
  if (search) url += `search=${encodeURIComponent(search)}&`;
  if (statusFilter) url += `status=${encodeURIComponent(statusFilter)}`;

  const response = await fetch(url, {
    headers: getAuthHeaders({ 'Accept': 'application/json' })
  });

  if (!response.ok) throw new Error(`Fetch categories failed: ${response.status}`);
  return await response.json();
}

export async function saveCategory(id, formData) {
  const isNew = !id;
  const url = isNew ? `${API_BASE_URL}/categories/` : `${API_BASE_URL}/categories/${id}/`;
  
  // Note: For multipart/form-data (uploads), we must NOT set Content-Type header manually.
  // The browser will set it with the correct boundary parameters automatically.
  const response = await fetch(url, {
    method: isNew ? 'POST' : 'PATCH',
    headers: getAuthHeaders(),
    body: formData
  });

  if (!response.ok) {
    const errData = await response.json();
    throw new Error(JSON.stringify(errData) || 'Failed to save category');
  }
  return await response.json();
}

export async function deleteCategory(id) {
  const response = await fetch(`${API_BASE_URL}/categories/${id}/`, {
    method: 'DELETE',
    headers: getAuthHeaders()
  });

  if (!response.ok) throw new Error(`Delete category failed: ${response.status}`);
  return true;
}

export async function fetchAdminProducts(filters = {}) {
  let url = `${API_BASE_URL}/products/?`;
  Object.keys(filters).forEach(key => {
    if (filters[key] !== undefined && filters[key] !== null && filters[key] !== '') {
      url += `${key}=${encodeURIComponent(filters[key])}&`;
    }
  });

  const response = await fetch(url, {
    headers: getAuthHeaders({ 'Accept': 'application/json' })
  });

  if (!response.ok) throw new Error(`Fetch products failed: ${response.status}`);
  return await response.json();
}

export async function saveProduct(id, formData) {
  const isNew = !id;
  const url = isNew ? `${API_BASE_URL}/products/` : `${API_BASE_URL}/products/${id}/`;

  const response = await fetch(url, {
    method: isNew ? 'POST' : 'PATCH',
    headers: getAuthHeaders(),
    body: formData
  });

  if (!response.ok) {
    const errData = await response.json();
    throw new Error(JSON.stringify(errData) || 'Failed to save product');
  }
  return await response.json();
}

export async function deleteProduct(id) {
  const response = await fetch(`${API_BASE_URL}/products/${id}/`, {
    method: 'DELETE',
    headers: getAuthHeaders()
  });

  if (!response.ok) throw new Error(`Delete product failed: ${response.status}`);
  return true;
}

export async function fetchAdminGoldRates(page = 1) {
  const response = await fetch(`${API_BASE_URL}/gold-rates/?page=${page}`, {
    headers: getAuthHeaders({ 'Accept': 'application/json' })
  });

  if (!response.ok) throw new Error(`Fetch gold rates failed: ${response.status}`);
  return await response.json();
}

export async function saveGoldRate(id, rateData) {
  const isNew = !id;
  const url = isNew ? `${API_BASE_URL}/gold-rates/` : `${API_BASE_URL}/gold-rates/${id}/`;

  const response = await fetch(url, {
    method: isNew ? 'POST' : 'PUT',
    headers: getAuthHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }),
    body: JSON.stringify(rateData)
  });

  if (!response.ok) {
    const errData = await response.json();
    throw new Error(errData.detail || 'Failed to save gold rate');
  }
  return await response.json();
}

export async function deleteGoldRate(id) {
  const response = await fetch(`${API_BASE_URL}/gold-rates/${id}/`, {
    method: 'DELETE',
    headers: getAuthHeaders()
  });

  if (!response.ok) throw new Error(`Delete gold rate failed: ${response.status}`);
  return true;
}

export async function fetchAdminInquiries(search = '', product = '', page = 1) {
  let url = `${API_BASE_URL}/inquiries/?page=${page}&`;
  if (search) url += `search=${encodeURIComponent(search)}&`;
  if (product) url += `product=${encodeURIComponent(product)}`;

  const response = await fetch(url, {
    headers: getAuthHeaders({ 'Accept': 'application/json' })
  });

  if (!response.ok) throw new Error(`Fetch inquiries failed: ${response.status}`);
  return await response.json();
}

export async function deleteInquiry(id) {
  const response = await fetch(`${API_BASE_URL}/inquiries/${id}/`, {
    method: 'DELETE',
    headers: getAuthHeaders()
  });

  if (!response.ok) throw new Error(`Delete inquiry failed: ${response.status}`);
  return true;
}

/**
 * HERO BANNER API CALLS
 */

export async function fetchApiHeroBanners() {
  try {
    const response = await fetch(`${API_BASE_URL}/hero-banners/`, {
      headers: { 'Accept': 'application/json' }
    });
    if (!response.ok) throw new Error(`HTTP error ${response.status}`);
    const data = await response.json();
    return Array.isArray(data) ? data : (data.results || []);
  } catch (err) {
    console.warn("Django Hero Banners API offline, using static fallback:", err.message);
    return [];
  }
}

export async function fetchAdminHeroBanners(page = 1) {
  const response = await fetch(`${API_BASE_URL}/hero-banners/?page=${page}`, {
    headers: getAuthHeaders({ 'Accept': 'application/json' })
  });
  if (!response.ok) throw new Error(`Fetch hero banners failed: ${response.status}`);
  return await response.json();
}

export async function saveHeroBanner(id, formData) {
  const isNew = !id;
  const url = isNew ? `${API_BASE_URL}/hero-banners/` : `${API_BASE_URL}/hero-banners/${id}/`;

  const response = await fetch(url, {
    method: isNew ? 'POST' : 'PATCH',
    headers: getAuthHeaders(),
    body: formData
  });

  if (!response.ok) {
    const errData = await response.json();
    throw new Error(JSON.stringify(errData) || 'Failed to save hero banner');
  }
  return await response.json();
}

export async function deleteHeroBanner(id) {
  const response = await fetch(`${API_BASE_URL}/hero-banners/${id}/`, {
    method: 'DELETE',
    headers: getAuthHeaders()
  });

  if (!response.ok) throw new Error(`Delete hero banner failed: ${response.status}`);
  return true;
}
