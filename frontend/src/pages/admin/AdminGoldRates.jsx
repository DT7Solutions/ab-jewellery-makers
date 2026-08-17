import React, { useState, useEffect } from 'react';
import { FaPlus, FaEdit, FaTrash, FaTimes } from 'react-icons/fa';
import AdminLayout from '../../components/admin/AdminLayout';
import { fetchAdminGoldRates, saveGoldRate, deleteGoldRate } from '../../utils/api';
import './AdminDashboard.css';

export default function AdminGoldRates() {
  const [rates, setRates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  // Form States
  const [editId, setEditId] = useState(null);
  const [location, setLocation] = useState('Tenali, AP');
  const [gold22k, setGold22k] = useState('');
  const [gold24k, setGold24k] = useState('');
  const [silver, setSilver] = useState('');
  const [formError, setFormError] = useState('');
  const [saving, setSaving] = useState(false);

  const loadRates = async () => {
    setLoading(true);
    try {
      const data = await fetchAdminGoldRates(page);
      setRates(data.results || (Array.isArray(data) ? data : []));
      setTotalCount(data.count || (Array.isArray(data) ? data.length : 0));
    } catch (err) {
      alert("Failed to load gold rates: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRates();
  }, [page]);

  const openAddModal = () => {
    setEditId(null);
    setLocation('Tenali, AP');
    setGold22k('');
    setGold24k('');
    setSilver('');
    setFormError('');
    setModalOpen(true);
  };

  const openEditModal = (rate) => {
    setEditId(rate.id);
    setLocation(rate.location || 'Tenali, AP');
    setGold22k(rate.gold_22k_per_gram);
    setGold24k(rate.gold_24k_per_gram || '');
    setSilver(rate.silver_per_gram || '');
    setFormError('');
    setModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setFormError('');

    if (!location.trim() || !gold22k) {
      setFormError('Location and Gold 22K Rate are required.');
      return;
    }

    setSaving(true);
    try {
      const rateData = {
        location,
        gold_22k_per_gram: parseFloat(gold22k),
        gold_24k_per_gram: gold24k ? parseFloat(gold24k) : null,
        silver_per_gram: silver ? parseFloat(silver) : null
      };

      await saveGoldRate(editId, rateData);
      setModalOpen(false);
      loadRates();
    } catch (err) {
      setFormError(err.message || 'Failed to save gold rate.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (rate) => {
    if (window.confirm(`Are you sure you want to delete rate log for "${rate.location}"?`)) {
      try {
        await deleteGoldRate(rate.id);
        loadRates();
      } catch (err) {
        alert("Failed to delete gold rate: " + err.message);
      }
    }
  };

  return (
    <AdminLayout title="Manage Gold Rates">
      
      {/* ACTION BAR */}
      <section className="admin-filter-bar" style={{ justifyContent: 'flex-end' }}>
        <button onClick={openAddModal} className="admin-action-btn admin-btn-primary">
          <FaPlus /> Update Gold Rates
        </button>
      </section>

      {/* DATA TABLE */}
      <section className="admin-table-container">
        {loading && rates.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px', color: 'var(--admin-text-gray)' }}>Loading rates...</div>
        ) : rates.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px', color: 'var(--admin-text-gray)' }}>No gold rate updates recorded.</div>
        ) : (
          <>
          <table className="admin-table">
            <thead>
              <tr>
                <th>Location</th>
                <th>Gold 22K (per gram)</th>
                <th>Gold 24K (per gram)</th>
                <th>Silver (per gram)</th>
                <th>Last Updated</th>
                <th style={{ width: '120px', textAlign: 'center' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {rates.map((rate) => (
                <tr key={rate.id}>
                  <td style={{ fontWeight: '600', color: 'var(--admin-gold)' }}>{rate.location}</td>
                  <td style={{ fontWeight: 'bold' }}>₹{Math.round(parseFloat(rate.gold_22k_per_gram))}</td>
                  <td style={{ fontWeight: 'bold' }}>{rate.gold_24k_per_gram ? `₹${Math.round(parseFloat(rate.gold_24k_per_gram))}` : 'N/A'}</td>
                  <td style={{ fontWeight: 'bold' }}>{rate.silver_per_gram ? `₹${Math.round(parseFloat(rate.silver_per_gram))}` : 'N/A'}</td>
                  <td>{new Date(rate.updated_at).toLocaleString('en-IN')}</td>
                  <td style={{ textAlign: 'center' }}>
                    <div className="admin-table-actions" style={{ justifyContent: 'center' }}>
                      <button 
                        onClick={() => openEditModal(rate)} 
                        className="admin-table-action-btn admin-action-edit"
                        title="Edit Rates"
                      >
                        <FaEdit />
                      </button>
                      <button 
                        onClick={() => handleDelete(rate)} 
                        className="admin-table-action-btn admin-action-delete"
                        title="Delete Entry"
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
              <h2 className="admin-modal-title">{editId ? 'Update Gold Rates' : 'Record New Gold Rates'}</h2>
              <button onClick={() => setModalOpen(false)} className="admin-modal-close">
                <FaTimes />
              </button>
            </div>

            <form onSubmit={handleSave}>
              <div className="admin-modal-body">
                {formError && <div className="admin-login-error" style={{ marginBottom: '15px' }}>{formError}</div>}

                <div className="admin-form-grid">
                  
                  <div className="admin-form-group">
                    <label className="admin-form-label">Location *</label>
                    <input 
                      type="text" 
                      className="admin-form-input" 
                      placeholder="e.g. Tenali, AP"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      required
                    />
                  </div>

                  <div className="admin-form-group">
                    <label className="admin-form-label">Gold 22K Rate (Per Gram) *</label>
                    <input 
                      type="number" 
                      step="0.01"
                      className="admin-form-input" 
                      placeholder="e.g. 14220"
                      value={gold22k}
                      onChange={(e) => setGold22k(e.target.value)}
                      required
                    />
                  </div>

                  <div className="admin-form-group">
                    <label className="admin-form-label">Gold 24K Rate (Per Gram)</label>
                    <input 
                      type="number" 
                      step="0.01"
                      className="admin-form-input" 
                      placeholder="e.g. 15512"
                      value={gold24k}
                      onChange={(e) => setGold24k(e.target.value)}
                    />
                  </div>

                  <div className="admin-form-group">
                    <label className="admin-form-label">Silver Rate (Per Gram)</label>
                    <input 
                      type="number" 
                      step="0.01"
                      className="admin-form-input" 
                      placeholder="e.g. 234"
                      value={silver}
                      onChange={(e) => setSilver(e.target.value)}
                    />
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
                  {saving ? 'Updating...' : 'Save Gold Rates'}
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </AdminLayout>
  );
}
