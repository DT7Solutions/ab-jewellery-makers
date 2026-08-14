import React, { useState, useEffect, useRef } from 'react';
import { FaPlus, FaEdit, FaTrash, FaTimes } from 'react-icons/fa';
import AdminLayout from '../../components/admin/AdminLayout';
import { fetchAdminHeroBanners, saveHeroBanner, deleteHeroBanner } from '../../utils/api';
import './AdminDashboard.css';

export default function AdminHeroBanners() {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  // Form States
  const [editId, setEditId] = useState(null);
  const [titleLine1, setTitleLine1] = useState('');
  const [titleLine2, setTitleLine2] = useState('');
  const [goldWord, setGoldWord] = useState('');
  const [description, setDescription] = useState('');
  const [order, setOrder] = useState('0');
  const [isActive, setIsActive] = useState(true);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [formError, setFormError] = useState('');
  const [saving, setSaving] = useState(false);

  const fileInputRef = useRef(null);

  const loadData = async () => {
    setLoading(true);
    try {
      const response = await fetchAdminHeroBanners(page);
      const results = response.results || (Array.isArray(response) ? response : []);
      setBanners(results);
      setTotalCount(response.count || (Array.isArray(response) ? response.length : 0));
    } catch (err) {
      alert("Failed to load hero banners: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [page]);

  const openAddModal = () => {
    setEditId(null);
    setTitleLine1('');
    setTitleLine2('');
    setGoldWord('');
    setDescription('');
    setOrder('0');
    setIsActive(true);
    setImageFile(null);
    setImagePreview('');
    setFormError('');
    setModalOpen(true);
  };

  const openEditModal = (banner) => {
    setEditId(banner.id);
    setTitleLine1(banner.title_line_1 || '');
    setTitleLine2(banner.title_line_2 || '');
    setGoldWord(banner.gold_word || '');
    setDescription(banner.description || '');
    setOrder(String(banner.order || 0));
    setIsActive(banner.is_active !== false);
    setImageFile(null);
    setImagePreview(banner.image || '');
    setFormError('');
    setModalOpen(true);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDelete = async (banner) => {
    if (window.confirm(`Are you sure you want to delete the slide with gold word "${banner.gold_word}"?`)) {
      try {
        await deleteHeroBanner(banner.id);
        alert("Hero slide deleted successfully!");
        loadData();
      } catch (err) {
        alert("Failed to delete banner: " + err.message);
      }
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setFormError('');

    try {
      const formData = new FormData();
      formData.append('title_line_1', titleLine1);
      formData.append('title_line_2', titleLine2);
      formData.append('gold_word', goldWord);
      formData.append('description', description);
      formData.append('order', parseInt(order, 10) || 0);
      formData.append('is_active', isActive);

      if (imageFile) {
        formData.append('image', imageFile);
      }

      await saveHeroBanner(editId, formData);
      alert(editId ? "Hero banner updated successfully!" : "Hero banner created successfully!");
      setModalOpen(false);
      loadData();
    } catch (err) {
      setFormError(err.message || "Failed to save banner slide.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <AdminLayout title="Hero Banners">
      <div className="admin-section-header">
        <div>
          <h2 className="admin-section-title">Manage Homepage Hero Slides</h2>
          <p className="admin-section-subtitle">Add or edit homepage slideshow banners, festival announcements, and seasonal gold offers.</p>
        </div>
        <button onClick={openAddModal} className="admin-action-btn admin-btn-primary">
          <FaPlus /> Add New Slide
        </button>
      </div>

      <section className="admin-card">
        {loading ? (
          <div className="admin-loading-spinner-wrapper">
            <div className="admin-loading-spinner"></div>
            <p>Loading banners...</p>
          </div>
        ) : banners.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--admin-text-gray)' }}>
            No banners defined. Creating a banner will replace the default homepage slides.
          </div>
        ) : (
          <>
            <div className="admin-table-responsive">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th style={{ width: '80px', textAlign: 'center' }}>Slide</th>
                    <th>Title Content</th>
                    <th>Description</th>
                    <th style={{ width: '80px', textAlign: 'center' }}>Order</th>
                    <th style={{ width: '100px', textAlign: 'center' }}>Status</th>
                    <th style={{ width: '120px', textAlign: 'center' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {banners.map((banner) => (
                    <tr key={banner.id}>
                      <td style={{ textAlign: 'center' }}>
                        <img 
                          src={banner.image || "/images/hero-bg-full.png"} 
                          alt={banner.gold_word} 
                          className="admin-thumbnail"
                          style={{ width: '60px', height: '40px', objectFit: 'cover', borderRadius: '4px' }}
                          onError={(e) => { e.target.src = '/images/hero-bg-full.png'; }}
                        />
                      </td>
                      <td>
                        <div style={{ fontWeight: '500', fontSize: '0.9rem' }}>{banner.title_line_1}</div>
                        <div style={{ fontSize: '0.85rem', color: 'var(--admin-text-gray)' }}>{banner.title_line_2}</div>
                        <span style={{ fontWeight: 'bold', color: 'var(--admin-gold)', fontSize: '0.85rem' }}>{banner.gold_word}</span>
                      </td>
                      <td style={{ fontSize: '0.85rem', maxWidth: '300px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {banner.description}
                      </td>
                      <td style={{ textAlign: 'center', fontWeight: '500' }}>{banner.order}</td>
                      <td style={{ textAlign: 'center' }}>
                        <span className={`admin-status-badge ${banner.is_active ? 'admin-status-published' : 'admin-status-draft'}`}>
                          {banner.is_active ? 'Active' : 'Draft'}
                        </span>
                      </td>
                      <td style={{ textAlign: 'center' }}>
                        <div className="admin-table-actions" style={{ justifyContent: 'center' }}>
                          <button 
                            onClick={() => openEditModal(banner)} 
                            className="admin-table-action-btn admin-action-edit"
                            title="Edit Slide"
                          >
                            <FaEdit />
                          </button>
                          <button 
                            onClick={() => handleDelete(banner)} 
                            className="admin-table-action-btn admin-action-delete"
                            title="Delete Slide"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

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

      {modalOpen && (
        <div className="admin-modal-overlay">
          <div className="admin-modal-content">
            
            <div className="admin-modal-header">
              <h2 className="admin-modal-title">{editId ? 'Edit Hero Banner' : 'Add New Hero Banner'}</h2>
              <button onClick={() => setModalOpen(false)} className="admin-modal-close">
                <FaTimes />
              </button>
            </div>

            <form onSubmit={handleSave}>
              <div className="admin-modal-body">
                {formError && <div className="admin-login-error" style={{ marginBottom: '15px' }}>{formError}</div>}

                <div className="admin-form-grid" style={{ gridTemplateColumns: '1fr' }}>
                  
                  <div className="admin-form-group">
                    <label className="admin-form-label">Title Line 1 *</label>
                    <input 
                      type="text" 
                      className="admin-form-input" 
                      placeholder="e.g. Timeless Beauty."
                      value={titleLine1}
                      onChange={(e) => setTitleLine1(e.target.value)}
                      required
                    />
                  </div>

                  <div className="admin-form-group">
                    <label className="admin-form-label">Title Line 2 *</label>
                    <input 
                      type="text" 
                      className="admin-form-input" 
                      placeholder="e.g. Crafted with"
                      value={titleLine2}
                      onChange={(e) => setTitleLine2(e.target.value)}
                      required
                    />
                  </div>

                  <div className="admin-form-group">
                    <label className="admin-form-label">Highlighted Gold Word *</label>
                    <input 
                      type="text" 
                      className="admin-form-input" 
                      placeholder="e.g. Tradition."
                      value={goldWord}
                      onChange={(e) => setGoldWord(e.target.value)}
                      required
                    />
                  </div>

                  <div className="admin-form-group">
                    <label className="admin-form-label">Description / Offer Details *</label>
                    <textarea 
                      className="admin-form-input" 
                      style={{ height: '80px', resize: 'vertical' }}
                      placeholder="e.g. Celebrate Akshaya Tritiya with 100% BIS Hallmarked jewellery and low making charges."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      required
                    />
                  </div>

                  <div className="admin-form-grid" style={{ gridTemplateColumns: '1fr 1fr', padding: 0 }}>
                    <div className="admin-form-group">
                      <label className="admin-form-label">Display Order</label>
                      <input 
                        type="number" 
                        className="admin-form-input" 
                        value={order}
                        onChange={(e) => setOrder(e.target.value)}
                      />
                    </div>

                    <div className="admin-form-group" style={{ display: 'flex', alignItems: 'center', paddingTop: '28px' }}>
                      <div className="admin-checkbox-group">
                        <input 
                          type="checkbox" 
                          id="is_active"
                          className="admin-checkbox"
                          checked={isActive}
                          onChange={(e) => setIsActive(e.target.checked)}
                        />
                        <label htmlFor="is_active" style={{ cursor: 'pointer', fontSize: '0.95rem', fontWeight: '500', color: 'var(--admin-text-white)' }}>
                          Active (Visible on homepage)
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="admin-form-group">
                    <label className="admin-form-label">Banner Background Image {!editId && '*'}</label>
                    <input 
                      type="file" 
                      ref={fileInputRef}
                      onChange={handleImageChange}
                      accept="image/*"
                      style={{ display: 'none' }}
                    />
                    
                    <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                      <button 
                        type="button" 
                        onClick={() => fileInputRef.current.click()}
                        className="admin-action-btn admin-btn-secondary"
                        style={{ padding: '8px 16px', fontSize: '0.85rem' }}
                      >
                        Choose Image File
                      </button>
                      
                      {imagePreview && (
                        <div style={{ position: 'relative' }}>
                          <img 
                            src={imagePreview} 
                            alt="Preview" 
                            style={{ width: '120px', height: '70px', objectFit: 'cover', borderRadius: '4px', border: '1px solid var(--admin-border)' }}
                          />
                          <button 
                            type="button"
                            onClick={() => {
                              setImageFile(null);
                              setImagePreview('');
                            }}
                            style={{
                              position: 'absolute',
                              top: '-6px',
                              right: '-6px',
                              backgroundColor: 'red',
                              color: 'white',
                              border: 'none',
                              borderRadius: '50%',
                              width: '18px',
                              height: '18px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              cursor: 'pointer',
                              fontSize: '0.65rem'
                            }}
                          >
                            ×
                          </button>
                        </div>
                      )}
                    </div>
                    <small style={{ color: 'var(--admin-text-gray)', marginTop: '5px', display: 'block' }}>
                      Recommended size: 1920x1080px (Landscape format).
                    </small>
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
                  {saving ? 'Saving...' : 'Save Slide'}
                </button>
              </div>
            </form>

          </div>
        </div>
      )}
    </AdminLayout>
  );
}
