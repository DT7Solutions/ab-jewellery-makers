import React, { useState, useEffect, useRef } from 'react';
import { FaPlus, FaSearch, FaEdit, FaTrash, FaTimes } from 'react-icons/fa';
import AdminLayout from '../../components/admin/AdminLayout';
import { fetchAdminCategories, saveCategory, deleteCategory } from '../../utils/api';
import './AdminDashboard.css';

export default function AdminCategories() {
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState('');
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
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('PUBLISHED');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [formError, setFormError] = useState('');
  const [saving, setSaving] = useState(false);

  const fileInputRef = useRef(null);

  const loadCategories = async () => {
    setLoading(true);
    try {
      const data = await fetchAdminCategories(search, statusFilter, page);
      setCategories(data.results || (Array.isArray(data) ? data : []));
      setTotalCount(data.count || (Array.isArray(data) ? data.length : 0));
    } catch (err) {
      alert("Failed to load categories: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Reset to page 1 when search or statusFilter changes
  useEffect(() => {
    setPage(1);
  }, [search, statusFilter]);

  // Debounced load when filters or page changes
  useEffect(() => {
    const handler = setTimeout(() => {
      loadCategories();
    }, 300);
    return () => clearTimeout(handler);
  }, [search, statusFilter, page]);

  // Handle Slug generation on Name change
  const handleNameChange = (e) => {
    const value = e.target.value;
    setName(value);
    
    // Only auto-generate slug if we are creating new OR if slug was empty
    if (!editId) {
      const autoSlug = value
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '') // remove special chars
        .replace(/\s+/g, '-')        // replace spaces with hyphens
        .replace(/-+/g, '-');        // reduce multiple hyphens
      setSlug(autoSlug);
    }
  };

  const openAddModal = () => {
    setEditId(null);
    setEditSlugKey(null);
    setName('');
    setSlug('');
    setDescription('');
    setStatus('PUBLISHED');
    setImageFile(null);
    setImagePreview('');
    setFormError('');
    setModalOpen(true);
  };

  const openEditModal = (cat) => {
    setEditId(cat.id);
    setEditSlugKey(cat.slug);
    setName(cat.name);
    setSlug(cat.slug);
    setDescription(cat.description || '');
    setStatus(cat.status);
    setImageFile(null);
    setImagePreview(cat.image || '');
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

    if (!name.trim() || !slug.trim()) {
      setFormError('Name and Slug are required fields.');
      return;
    }

    setSaving(true);
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('slug', slug);
      formData.append('description', description);
      formData.append('status', status);
      if (imageFile) {
        formData.append('image', imageFile);
      }

      await saveCategory(editSlugKey, formData);
      setModalOpen(false);
      loadCategories();
    } catch (err) {
      try {
        const errorDetail = JSON.parse(err.message);
        let errorMsg = '';
        Object.keys(errorDetail).forEach(key => {
          errorMsg += `${key}: ${errorDetail[key].join(', ')} `;
        });
        setFormError(errorMsg || 'Failed to save category.');
      } catch (parseErr) {
        setFormError(err.message || 'Failed to save category.');
      }
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (cat) => {
    if (window.confirm(`Are you sure you want to delete the category "${cat.name}"? This will delete all its products!`)) {
      try {
        await deleteCategory(cat.slug);
        loadCategories();
      } catch (err) {
        alert("Failed to delete category: " + err.message);
      }
    }
  };

  return (
    <AdminLayout title="Manage Categories">
      
      {/* FILTER AND ACTION BAR */}
      <section className="admin-filter-bar">
        <div className="admin-search-wrapper">
          <FaSearch className="admin-search-icon" />
          <input 
            type="text" 
            placeholder="Search categories by name..." 
            className="admin-search-input"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

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
          <FaPlus /> Add Category
        </button>
      </section>

      {/* DATA TABLE */}
      <section className="admin-table-container">
        {loading && categories.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px', color: 'var(--admin-text-gray)' }}>Loading categories...</div>
        ) : categories.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px', color: 'var(--admin-text-gray)' }}>No categories found matching your query.</div>
        ) : (
          <>
          <table className="admin-table">
            <thead>
              <tr>
                <th style={{ width: '80px' }}>Image</th>
                <th>Category Name</th>
                <th>Slug</th>
                <th>Status</th>
                <th>Designs</th>
                <th style={{ width: '120px', textAlign: 'center' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((cat) => (
                <tr key={cat.id}>
                  <td>
                    <img 
                      src={cat.image} 
                      alt={cat.name} 
                      className="admin-thumbnail"
                      onError={(e) => { e.target.src = '/images/products/heritage-necklace.png'; }}
                    />
                  </td>
                  <td style={{ fontWeight: '600', color: 'var(--admin-gold)' }}>{cat.name}</td>
                  <td><code>{cat.slug}</code></td>
                  <td>
                    <span className={`admin-status-badge ${cat.status === 'PUBLISHED' ? 'admin-status-published' : 'admin-status-draft'}`}>
                      {cat.status}
                    </span>
                  </td>
                  <td style={{ fontWeight: '500' }}>{cat.product_count || 0}</td>
                  <td style={{ textAlign: 'center' }}>
                    <div className="admin-table-actions" style={{ justifyContent: 'center' }}>
                      <button 
                        onClick={() => openEditModal(cat)} 
                        className="admin-table-action-btn admin-action-edit"
                        title="Edit Category"
                      >
                        <FaEdit />
                      </button>
                      <button 
                        onClick={() => handleDelete(cat)} 
                        className="admin-table-action-btn admin-action-delete"
                        title="Delete Category"
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
              <h2 className="admin-modal-title">{editId ? 'Edit Category' : 'Add New Category'}</h2>
              <button onClick={() => setModalOpen(false)} className="admin-modal-close">
                <FaTimes />
              </button>
            </div>

            <form onSubmit={handleSave}>
              <div className="admin-modal-body">
                {formError && <div className="admin-login-error" style={{ marginBottom: '15px' }}>{formError}</div>}

                <div className="admin-form-grid">
                  
                  <div className="admin-form-group">
                    <label className="admin-form-label">Category Name *</label>
                    <input 
                      type="text" 
                      className="admin-form-input" 
                      placeholder="e.g. Necklaces"
                      value={name}
                      onChange={handleNameChange}
                      required
                    />
                  </div>

                  <div className="admin-form-group">
                    <label className="admin-form-label">Slug (URL string) *</label>
                    <input 
                      type="text" 
                      className="admin-form-input" 
                      placeholder="e.g. necklaces"
                      value={slug}
                      onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/\s+/g, '-'))}
                      required
                    />
                  </div>

                  <div className="admin-form-group admin-form-full">
                    <label className="admin-form-label">Description</label>
                    <textarea 
                      className="admin-form-input" 
                      placeholder="Enter category description..."
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
                    <label className="admin-form-label">Category Image</label>
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
                  {saving ? 'Saving...' : 'Save Category'}
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </AdminLayout>
  );
}
