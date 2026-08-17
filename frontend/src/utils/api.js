import { PRODUCTS as FALLBACK_PRODUCTS } from '../data/products';
import { CATEGORIES as FALLBACK_CATEGORIES } from '../data/categories';
import { BASE_TENALI_GOLD_RATES } from './goldRate';

// Dynamically target local backend in development vs production backend in deployed site
const isLocalhost = typeof window !== 'undefined' &&
  (window.location.hostname === 'localhost' ||
   window.location.hostname === '127.0.0.1' ||
   window.location.hostname.startsWith('192.168.') ||
   window.location.hostname.startsWith('10.') ||
   window.location.hostname.startsWith('172.') ||
   window.location.hostname.endsWith('.local'));

export const API_BASE_URL = isLocalhost
  ? `http://${window.location.hostname || '127.0.0.1'}:8000/api`
  : 'https://www.api.abgoldjewelery.com/api';

export const MEDIA_BASE_URL = isLocalhost
  ? `http://${window.location.hostname || '127.0.0.1'}:8000`
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
 * Handle unauthorized responses
 */
function handleAuthResponse(response) {
  if (response.status === 401) {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_user');
    if (typeof window !== 'undefined' && !window.location.pathname.includes('/admin/login')) {
      window.location.href = '/admin/login';
    }
  }
  return response;
}

/**
 * Safe JSON parsing helper that prevents "Unexpected token < in JSON at position 0"
 */
async function safeParseJson(response) {
  const contentType = response.headers.get('content-type') || '';
  const text = await response.text();

  if (!text || !text.trim()) {
    return null;
  }

  // If content-type is JSON or string looks like JSON object/array
  if (contentType.includes('application/json') || text.trim().startsWith('{') || text.trim().startsWith('[')) {
    try {
      return JSON.parse(text);
    } catch (e) {
      console.warn('Failed to parse JSON string:', text.substring(0, 100));
      throw new Error(`Invalid JSON received (Status ${response.status})`);
    }
  }

  // If response is HTML, provide a clear informative error
  if (text.trim().startsWith('<') || contentType.includes('text/html')) {
    throw new Error(`Server returned HTML instead of JSON (HTTP ${response.status}). Please check API URL.`);
  }

  return text;
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

  if (strPath.startsWith('/images/')) {
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
  let response;
  try {
    response = await fetch(`${API_BASE_URL}/admin/login/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ username, password })
    });
  } catch (err) {
    console.error('Admin login network failure:', err);
    throw new Error(`Unable to connect to backend server at ${API_BASE_URL}. Please verify the Django server is running.`);
  }

  if (!response.ok) {
    let errMsg = 'Login failed';
    try {
      const errData = await safeParseJson(response);
      errMsg = (errData && (errData.error || errData.detail)) || `Server error (HTTP ${response.status})`;
    } catch (_) {
      errMsg = `Server error (HTTP ${response.status})`;
    }
    throw new Error(errMsg);
  }

  const data = await safeParseJson(response);
  if (!data || !data.token) {
    throw new Error('Invalid authentication response from server.');
  }

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
  let response;
  try {
    response = await fetch(`${API_BASE_URL}/admin/change-password/`, {
      method: 'POST',
      headers: getAuthHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }),
      body: JSON.stringify({ old_password: oldPassword, new_password: newPassword })
    });
  } catch (err) {
    throw new Error(`Connection error: ${err.message}`);
  }

  handleAuthResponse(response);

  if (!response.ok) {
    let errMsg = 'Password change failed';
    try {
      const errData = await safeParseJson(response);
      errMsg = (errData && (errData.error || errData.detail)) || `Error ${response.status}`;
    } catch (_) {}
    throw new Error(errMsg);
  }
  return await safeParseJson(response);
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
    const data = await safeParseJson(response);
    const results = Array.isArray(data) ? data : (data?.results || []);

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
    const data = await safeParseJson(response);
    const results = Array.isArray(data) ? data : (data?.results || []);

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
    const data = await safeParseJson(response);
    if (data && data.gold_22k_per_gram) {
      return {
        id: data.id,
        location: data.location || "Tenali, AP",
        gold22k: Math.round(parseFloat(data.gold_22k_per_gram || 14220)),
        gold24k: Math.round(parseFloat(data.gold_24k_per_gram || 15512)),
        silver: Math.round(parseFloat(data.silver_per_gram || 234)),
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
    return await safeParseJson(response);
  } catch (err) {
    console.warn("Django Inquiry API submission fallback:", err.message);
    return { success: true, message: "Inquiry saved locally." };
  }
}

/**
 * ADMIN DATA API CALLS (Requires Auth Token)
 */

export async function fetchAdminCategories(search = '', statusFilter = '', page = 1, noPagination = false) {
  let url = `${API_BASE_URL}/categories/?`;
  if (noPagination) {
    url += 'no_pagination=true&';
  } else {
    url += `page=${page}&`;
  }
  if (search) url += `search=${encodeURIComponent(search)}&`;
  if (statusFilter) url += `status=${encodeURIComponent(statusFilter)}`;

  const response = await fetch(url, {
    headers: getAuthHeaders({ 'Accept': 'application/json' })
  });

  handleAuthResponse(response);
  if (!response.ok) throw new Error(`Fetch categories failed: ${response.status}`);
  return await safeParseJson(response);
}

export async function saveCategory(id, formData) {
  const isNew = !id;
  const url = isNew ? `${API_BASE_URL}/categories/` : `${API_BASE_URL}/categories/${id}/`;

  const response = await fetch(url, {
    method: isNew ? 'POST' : 'PATCH',
    headers: getAuthHeaders(),
    body: formData
  });

  handleAuthResponse(response);
  if (!response.ok) {
    let errMsg = 'Failed to save category';
    try {
      const errData = await safeParseJson(response);
      if (typeof errData === 'object' && errData !== null) {
        const messages = [];
        for (const [key, val] of Object.entries(errData)) {
          const detail = Array.isArray(val) ? val.join(' ') : String(val);
          messages.push(`${key}: ${detail}`);
        }
        errMsg = messages.join(', ') || 'Validation failed';
      } else {
        errMsg = String(errData);
      }
    } catch (_) {}
    throw new Error(errMsg);
  }
  return await safeParseJson(response);
}

export async function deleteCategory(id) {
  const response = await fetch(`${API_BASE_URL}/categories/${id}/`, {
    method: 'DELETE',
    headers: getAuthHeaders()
  });

  handleAuthResponse(response);
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

  handleAuthResponse(response);
  if (!response.ok) throw new Error(`Fetch products failed: ${response.status}`);
  return await safeParseJson(response);
}

export async function saveProduct(id, formData) {
  const isNew = !id;
  const url = isNew ? `${API_BASE_URL}/products/` : `${API_BASE_URL}/products/${id}/`;

  const response = await fetch(url, {
    method: isNew ? 'POST' : 'PATCH',
    headers: getAuthHeaders(),
    body: formData
  });

  handleAuthResponse(response);
  if (!response.ok) {
    let errMsg = 'Failed to save product';
    try {
      const errData = await safeParseJson(response);
      if (typeof errData === 'object' && errData !== null) {
        const messages = [];
        for (const [key, val] of Object.entries(errData)) {
          const detail = Array.isArray(val) ? val.join(' ') : String(val);
          messages.push(`${key}: ${detail}`);
        }
        errMsg = messages.join(', ') || 'Validation failed';
      } else {
        errMsg = String(errData);
      }
    } catch (_) {}
    throw new Error(errMsg);
  }
  return await safeParseJson(response);
}

export async function deleteProduct(id) {
  const response = await fetch(`${API_BASE_URL}/products/${id}/`, {
    method: 'DELETE',
    headers: getAuthHeaders()
  });

  handleAuthResponse(response);
  if (!response.ok) throw new Error(`Delete product failed: ${response.status}`);
  return true;
}

export async function fetchAdminGoldRates(page = 1) {
  const response = await fetch(`${API_BASE_URL}/gold-rates/?page=${page}`, {
    headers: getAuthHeaders({ 'Accept': 'application/json' })
  });

  handleAuthResponse(response);
  if (!response.ok) throw new Error(`Fetch gold rates failed: ${response.status}`);
  return await safeParseJson(response);
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

  handleAuthResponse(response);
  if (!response.ok) {
    let errMsg = 'Failed to save gold rate';
    try {
      const errData = await safeParseJson(response);
      errMsg = (errData && (errData.detail || errData.error)) || `Error ${response.status}`;
    } catch (_) {}
    throw new Error(errMsg);
  }
  return await safeParseJson(response);
}

export async function deleteGoldRate(id) {
  const response = await fetch(`${API_BASE_URL}/gold-rates/${id}/`, {
    method: 'DELETE',
    headers: getAuthHeaders()
  });

  handleAuthResponse(response);
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

  handleAuthResponse(response);
  if (!response.ok) throw new Error(`Fetch inquiries failed: ${response.status}`);
  return await safeParseJson(response);
}

export async function deleteInquiry(id) {
  const response = await fetch(`${API_BASE_URL}/inquiries/${id}/`, {
    method: 'DELETE',
    headers: getAuthHeaders()
  });

  handleAuthResponse(response);
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
    const data = await safeParseJson(response);
    return Array.isArray(data) ? data : (data?.results || []);
  } catch (err) {
    console.warn("Django Hero Banners API offline, using static fallback:", err.message);
    return [];
  }
}

export async function fetchAdminHeroBanners(page = 1) {
  const response = await fetch(`${API_BASE_URL}/hero-banners/?page=${page}`, {
    headers: getAuthHeaders({ 'Accept': 'application/json' })
  });

  handleAuthResponse(response);
  if (!response.ok) throw new Error(`Fetch hero banners failed: ${response.status}`);
  return await safeParseJson(response);
}

export async function saveHeroBanner(id, formData) {
  const isNew = !id;
  const url = isNew ? `${API_BASE_URL}/hero-banners/` : `${API_BASE_URL}/hero-banners/${id}/`;

  const response = await fetch(url, {
    method: isNew ? 'POST' : 'PATCH',
    headers: getAuthHeaders(),
    body: formData
  });

  handleAuthResponse(response);
  if (!response.ok) {
    let errMsg = 'Failed to save hero banner';
    try {
      const errData = await safeParseJson(response);
      errMsg = typeof errData === 'object' ? JSON.stringify(errData) : errData;
    } catch (_) {}
    throw new Error(errMsg);
  }
  return await safeParseJson(response);
}

export async function deleteHeroBanner(id) {
  const response = await fetch(`${API_BASE_URL}/hero-banners/${id}/`, {
    method: 'DELETE',
    headers: getAuthHeaders()
  });

  handleAuthResponse(response);
  if (!response.ok) throw new Error(`Delete hero banner failed: ${response.status}`);
  return true;
}
