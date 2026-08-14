import React, { useState, useEffect, useRef } from 'react';
import { FaPlus, FaSearch, FaEdit, FaTrash, FaTimes } from 'react-icons/fa';
import AdminLayout from '../../components/admin/AdminLayout';
import { fetchAdminCategories, fetchAdminProducts, saveProduct, deleteProduct } from '../../utils/api';
import './AdminDashboard.css';

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  
  // Search & Filter States
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [purityFilter, setPurityFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  // Form States
  const [editId, setEditId] = useState(null);
  const [editSlugKey, setEditSlugKey] = useState(null); // Used to patch on key
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [weight, setWeight] = useState('');
  const [purity, setPurity] = useState('22K');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('PUBLISHED');
  const [availableFlags, setAvailableFlags] = useState(['Featured', 'Bestseller', 'Trending', 'New Arrival']);
  const [activeFlags, setActiveFlags] = useState([]);
  const [newFlagInput, setNewFlagInput] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [productCode, setProductCode] = useState('');
  const [certification, setCertification] = useState('BIS 916 Hallmarked & Certified');
  const [tags, setTags] = useState('');
  const [formError, setFormError] = useState('');
  const [saving, setSaving] = useState(false);

  const fileInputRef = useRef(null);

  const loadData = async () => {
    setLoading(true);
    try {
      // Load categories first if not loaded
      let cats = categories;
      if (categories.length === 0) {
        cats = await fetchAdminCategories();
        // Since categories API now returns { results }, extract them
        const catsList = cats.results || (Array.isArray(cats) ? cats : []);
        setCategories(catsList);
      }

      const filters = {
        search,
        category: categoryFilter,
        purity: purityFilter,
        status: statusFilter,
        page
      };

      const prods = await fetchAdminProducts(filters);
      const prodsList = prods.results || (Array.isArray(prods) ? prods : []);
      setProducts(prodsList);
      setTotalCount(prods.count || (Array.isArray(prods) ? prods.length : 0));

      // Scan and extract all unique custom flags from loaded products
      const uniqueFlags = new Set(['Featured', 'Bestseller', 'Trending', 'New Arrival']);
      prodsList.forEach(p => {
        if (p.custom_flags) {
          p.custom_flags.split(',').forEach(f => {
            const trimmed = f.trim();
            if (trimmed) uniqueFlags.add(trimmed);
          });
        }
      });
      setAvailableFlags(Array.from(uniqueFlags));
    } catch (err) {
      alert("Failed to load products: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Reset to page 1 when any filter changes
  useEffect(() => {
    setPage(1);
  }, [search, categoryFilter, purityFilter, statusFilter]);

  // Debounced load when filters or page change
  useEffect(() => {
    const handler = setTimeout(() => {
      loadData();
    }, 300);
    return () => clearTimeout(handler);
  }, [search, categoryFilter, purityFilter, statusFilter, page]);

  // Handle Slug generation on Name change
  const handleNameChange = (e) => {
    const value = e.target.value;
    setName(value);
    
    if (!editId) {
      const autoSlug = value
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-');
      setSlug(autoSlug);
    }
  };

  const openAddModal = () => {
    setEditId(null);
    setEditSlugKey(null);
    setName('');
    setSlug('');
    setCategory(categories[0]?.id || '');
    setPrice('');
    setWeight('');
    setPurity('22K');
    setDescription('');
    setStatus('PUBLISHED');
    setActiveFlags([]);
    setNewFlagInput('');
    setImageFile(null);
    setImagePreview('');
    setProductCode('');
    setCertification('BIS 916 Hallmarked & Certified');
    setTags('');
    setFormError('');
    setModalOpen(true);
  };

  const openEditModal = (prod) => {
    setEditId(prod.id);
    setEditSlugKey(prod.slug);
    setName(prod.name);
    setSlug(prod.slug);
    setCategory(prod.category || '');
    setPrice(prod.price);
    setWeight(prod.weight || '');
    setPurity(prod.purity || '22K');
    setDescription(prod.description || '');
    setStatus(prod.status);
    let flags = prod.custom_flags ? prod.custom_flags.split(',').map(f => f.trim()).filter(f => f !== '') : [];
    if (flags.length === 0) {
      if (prod.is_featured || prod.featured) flags.push('Featured');
      if (prod.is_bestseller || prod.bestseller) flags.push('Bestseller');
    }
    setActiveFlags(flags);
    setNewFlagInput('');
    setImageFile(null);
    setImagePreview(prod.image || '');
    setProductCode(prod.product_code || '');
    setCertification(prod.certification || 'BIS 916 Hallmarked & Certified');
    setTags(prod.tags || '');
    setFormError('');
    setModalOpen(true);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setFormError('');

    if (!name.trim() || !slug.trim() || !category || !price) {
      setFormError('Name, Slug, Category, and Price are required.');
      return;
    }

    setSaving(true);
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('slug', slug);
      formData.append('category', category);
      formData.append('price', price);
      formData.append('weight', weight);
      formData.append('purity', purity);
      formData.append('description', description);
      formData.append('status', status);
      formData.append('is_featured', activeFlags.includes('Featured') ? 'true' : 'false');
      formData.append('is_bestseller', activeFlags.includes('Bestseller') ? 'true' : 'false');
      formData.append('is_active', 'true');
      formData.append('product_code', productCode);
      formData.append('certification', certification);
      formData.append('tags', tags);
      formData.append('custom_flags', activeFlags.join(', '));
      
      if (imageFile) {
        formData.append('image', imageFile);
      }

      await saveProduct(editSlugKey, formData);
      setModalOpen(false);
      loadData();
    } catch (err) {
      try {
        const errorDetail = JSON.parse(err.message);
        let errorMsg = '';
        Object.keys(errorDetail).forEach(key => {
          errorMsg += `${key}: ${errorDetail[key].join(', ')} `;
        });
        setFormError(errorMsg || 'Failed to save product.');
      } catch (parseErr) {
        setFormError(err.message || 'Failed to save product.');
      }
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (prod) => {
    if (window.confirm(`Are you sure you want to delete the product "${prod.name}"?`)) {
      try {
        await deleteProduct(prod.slug);
        loadData();
      } catch (err) {
        alert("Failed to delete product: " + err.message);
      }
    }
  };

  return (
    <AdminLayout title="Manage Products">
      
      {/* FILTER BAR */}
      <section className="admin-filter-bar">
        <div className="admin-search-wrapper">
          <FaSearch className="admin-search-icon" />
          <input 
            type="text" 
            placeholder="Search products by name/desc..." 
            className="admin-search-input"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <select 
          className="admin-select-filter"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map(c => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>

        <select 
          className="admin-select-filter"
          value={purityFilter}
          onChange={(e) => setPurityFilter(e.target.value)}
        >
          <option value="">All Purities</option>
          <option value="22K">22K Gold</option>
          <option value="24K">24K Gold</option>
          <option value="18K">18K Gold</option>
        </select>

        <select 
          className="admin-select-filter"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">All Statuses</option>
          <option value="PUBLISHED">Published</option>
          <option value="DRAFT">Draft</option>
        </select>

        <button onClick={openAddModal} className="admin-action-btn admin-btn-primary">
          <FaPlus /> Add Product
        </button>
      </section>

      {/* DATA TABLE */}
      <section className="admin-table-container">
        {loading && products.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px', color: 'var(--admin-text-gray)' }}>Loading products...</div>
        ) : products.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px', color: 'var(--admin-text-gray)' }}>No products found matching filters.</div>
        ) : (
          <>
          <table className="admin-table admin-products-table">
            <thead>
              <tr>
                <th style={{ width: '80px' }}>Image</th>
                <th>Code</th>
                <th>Product Name</th>
                <th>Category</th>
                <th>Price (INR)</th>
                <th>Weight</th>
                <th>Purity</th>
                <th>Certification</th>
                <th>Status</th>
                <th>Badges</th>
                <th style={{ width: '120px', textAlign: 'center' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((prod) => (
                <tr key={prod.id}>
                  <td>
                    <img 
                      src={prod.image} 
                      alt={prod.name} 
                      className="admin-thumbnail"
                      onError={(e) => { e.target.src = '/images/products/heritage-necklace.png'; }}
                    />
                  </td>
                  <td style={{ fontWeight: '500' }}><code>{prod.product_code || 'N/A'}</code></td>
                  <td style={{ fontWeight: '600', color: 'var(--admin-gold)' }}>{prod.name}</td>
                  <td>{prod.category_name || prod.categoryName || 'N/A'}</td>
                  <td style={{ fontWeight: 'bold' }}>₹{parseFloat(prod.price).toLocaleString('en-IN')}</td>
                  <td>{prod.weight || 'N/A'}</td>
                  <td>{prod.purity}</td>
                  <td><span style={{ fontSize: '0.85rem' }}>{prod.certification || 'N/A'}</span></td>
                  <td>
                    <span className={`admin-status-badge ${prod.status === 'PUBLISHED' ? 'admin-status-published' : 'admin-status-draft'}`}>
                      {prod.status}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                      {(prod.custom_flags || '').split(',').map((f, i) => {
                        const trimmed = f.trim();
                        if (!trimmed) return null;
                        return (
                          <span 
                            key={i} 
                            className="admin-status-badge" 
                            style={{ 
                              fontSize: '0.65rem', 
                              backgroundColor: 'rgba(179, 143, 36, 0.08)',
                              color: 'var(--admin-gold)',
                              border: '1px solid rgba(179, 143, 36, 0.2)',
                              padding: '2px 6px',
                              borderRadius: '4px',
                              textTransform: 'uppercase',
                              fontWeight: '600'
                            }}
                          >
                            {trimmed}
                          </span>
                        );
                      })}
                    </div>
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    <div className="admin-table-actions" style={{ justifyContent: 'center' }}>
                      <button 
                        onClick={() => openEditModal(prod)} 
                        className="admin-table-action-btn admin-action-edit"
                        title="Edit Product"
                      >
                        <FaEdit />
                      </button>
                      <button 
                        onClick={() => handleDelete(prod)} 
                        className="admin-table-action-btn admin-action-delete"
                        title="Delete Product"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {/* PAGINATION CONTROLS */}
          {totalCount > 10 && (
            <div className="admin-pagination-wrapper">
              <p className="admin-pagination-info">
                Showing page {page} of {Math.ceil(totalCount / 10) || 1} ({totalCount} total items)
              </p>
              <div className="admin-pagination-buttons">
                <button 
                  onClick={() => setPage(p => Math.max(p - 1, 1))} 
                  disabled={page <= 1}
                  className="admin-pagination-btn"
                >
                  Previous
                </button>
                <button 
                  onClick={() => setPage(p => p + 1)} 
                  disabled={page >= Math.ceil(totalCount / 10)}
                  className="admin-pagination-btn"
                >
                  Next
                </button>
              </div>
            </div>
          )}
          </>
        )}
      </section>

      {/* FORM MODAL */}
      {modalOpen && (
        <div className="admin-modal-overlay">
          <div className="admin-modal-content">
            
            <div className="admin-modal-header">
              <h2 className="admin-modal-title">{editId ? 'Edit Product' : 'Add New Product'}</h2>
              <button onClick={() => setModalOpen(false)} className="admin-modal-close">
                <FaTimes />
              </button>
            </div>

            <form onSubmit={handleSave}>
              <div className="admin-modal-body">
                {formError && <div className="admin-login-error" style={{ marginBottom: '15px' }}>{formError}</div>}

                <div className="admin-form-grid">
                  
                  <div className="admin-form-group">
                    <label className="admin-form-label">Product Name *</label>
                    <input 
                      type="text" 
                      className="admin-form-input" 
                      placeholder="e.g. Traditional Gold Choker"
                      value={name}
                      onChange={handleNameChange}
                      required
                    />
                  </div>

                  <div className="admin-form-group">
                    <label className="admin-form-label">Slug *</label>
                    <input 
                      type="text" 
                      className="admin-form-input" 
                      placeholder="e.g. traditional-gold-choker"
                      value={slug}
                      onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/\s+/g, '-'))}
                      required
                    />
                  </div>

                  <div className="admin-form-group">
                    <label className="admin-form-label">Category *</label>
                    <select 
                      className="admin-form-input"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      required
                    >
                      <option value="">Select Category</option>
                      {categories.map(c => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                      ))}
                    </select>
                  </div>

                  <div className="admin-form-group">
                    <label className="admin-form-label">Price (INR) *</label>
                    <input 
                      type="number" 
                      step="0.01"
                      className="admin-form-input" 
                      placeholder="e.g. 150000"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      required
                    />
                  </div>

                  <div className="admin-form-group">
                    <label className="admin-form-label">Weight</label>
                    <input 
                      type="text" 
                      className="admin-form-input" 
                      placeholder="e.g. 24.5 grams"
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                    />
                  </div>

                  <div className="admin-form-group">
                    <label className="admin-form-label">Purity</label>
                    <select 
                      className="admin-form-input"
                      value={purity}
                      onChange={(e) => setPurity(e.target.value)}
                    >
                      <option value="22K">22K Gold (916 Hallmarked)</option>
                      <option value="24K">24K Fine Gold</option>
                      <option value="18K">18K Gold</option>
                    </select>
                  </div>

                  <div className="admin-form-group">
                    <label className="admin-form-label">Product Code / SKU</label>
                    <input 
                      type="text" 
                      className="admin-form-input" 
                      placeholder="e.g. IND-NK-001"
                      value={productCode}
                      onChange={(e) => setProductCode(e.target.value)}
                    />
                  </div>

                  <div className="admin-form-group">
                    <label className="admin-form-label">Certification</label>
                    <input 
                      type="text" 
                      className="admin-form-input" 
                      placeholder="e.g. BIS 916 Hallmarked"
                      value={certification}
                      onChange={(e) => setCertification(e.target.value)}
                    />
                  </div>

                  <div className="admin-form-group admin-form-full">
                    <label className="admin-form-label">Tags (comma-separated)</label>
                    <input 
                      type="text" 
                      className="admin-form-input" 
                      placeholder="e.g. Bridal, Popular, New Arrival, Traditional"
                      value={tags}
                      onChange={(e) => setTags(e.target.value)}
                    />
                  </div>

                  <div className="admin-form-group admin-form-full">
                    <label className="admin-form-label">Description</label>
                    <textarea 
                      className="admin-form-input" 
                      placeholder="Enter detailed description of craftsmanship, design, etc..."
                      rows="3"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      style={{ resize: 'vertical' }}
                    ></textarea>
                  </div>

                  <div className="admin-form-group">
                    <label className="admin-form-label">Status</label>
                    <select 
                      className="admin-form-input"
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                    >
                      <option value="PUBLISHED">Published</option>
                      <option value="DRAFT">Draft</option>
                    </select>
                  </div>

                  <div className="admin-form-group">
                    <label className="admin-form-label">Product Image</label>
                    <div className="admin-image-upload-wrapper">
                      {imagePreview && (
                        <img 
                          src={imagePreview} 
                          alt="Preview" 
                          className="admin-image-preview"
                          onError={(e) => { e.target.src = '/images/products/heritage-necklace.png'; }}
                        />
                      )}
                      <input 
                        type="file" 
                        accept="image/*"
                        ref={fileInputRef}
                        style={{ display: 'none' }}
                        onChange={handleImageChange}
                      />
                      <button 
                        type="button" 
                        className="admin-btn-secondary"
                        style={{ padding: '8px 12px', fontSize: '0.85rem' }}
                        onClick={() => fileInputRef.current.click()}
                      >
                        Choose File
                      </button>
                    </div>
                  </div>

                  <div className="admin-form-group admin-form-full">
                    <label className="admin-form-label">Product Badges / Flags</label>
                    <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', marginBottom: '15px' }}>
                      {availableFlags.map(flag => (
                        <div key={flag} className="admin-checkbox-group">
                          <input 
                            type="checkbox" 
                            id={`flag-${flag}`} 
                            className="admin-checkbox"
                            checked={activeFlags.includes(flag)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setActiveFlags([...activeFlags, flag]);
                              } else {
                                setActiveFlags(activeFlags.filter(f => f !== flag));
                              }
                            }}
                          />
                          <label htmlFor={`flag-${flag}`} style={{ cursor: 'pointer', fontSize: '0.9rem' }}>{flag}</label>
                        </div>
                      ))}
                    </div>
                    <div style={{ display: 'flex', gap: '10px', maxWidth: '350px' }}>
                      <input 
                        type="text" 
                        className="admin-form-input" 
                        placeholder="Add custom badge (e.g. Popular)"
                        value={newFlagInput}
                        onChange={(e) => setNewFlagInput(e.target.value)}
                        style={{ padding: '6px 12px', fontSize: '0.85rem' }}
                      />
                      <button 
                        type="button" 
                        className="admin-action-btn admin-btn-primary"
                        style={{ padding: '6px 15px', fontSize: '0.85rem', flexShrink: '0' }}
                        onClick={() => {
                          const clean = newFlagInput.trim();
                          if (clean && !availableFlags.includes(clean)) {
                            setAvailableFlags([...availableFlags, clean]);
                            setActiveFlags([...activeFlags, clean]);
                            setNewFlagInput('');
                          }
                        }}
                      >
                        Add
                      </button>
                    </div>
                  </div>

                </div>
              </div>

              <div className="admin-modal-footer">
                <button 
                  type="button" 
                  onClick={() => setModalOpen(false)} 
                  className="admin-action-btn admin-btn-secondary"
                  disabled={saving}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="admin-action-btn admin-btn-primary"
                  disabled={saving}
                >
                  {saving ? 'Saving...' : 'Save Product'}
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </AdminLayout>
  );
}
