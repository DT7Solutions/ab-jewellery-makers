import React, { useState, useEffect } from 'react';
import { FaSearch, FaTrash, FaTimes, FaEye } from 'react-icons/fa';
import AdminLayout from '../../components/admin/AdminLayout';
import { fetchAdminInquiries, fetchAdminProducts, deleteInquiry } from '../../utils/api';
import './AdminDashboard.css';

export default function AdminInquiries() {
  const [inquiries, setInquiries] = useState([]);
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [productFilter, setProductFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  
  // Viewer Modal State
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const loadData = async () => {
    setLoading(true);
    try {
      if (products.length === 0) {
        const prods = await fetchAdminProducts();
        setProducts(prods.results || (Array.isArray(prods) ? prods : []));
      }
      const data = await fetchAdminInquiries(search, productFilter, page);
      setInquiries(data.results || (Array.isArray(data) ? data : []));
      setTotalCount(data.count || (Array.isArray(data) ? data.length : 0));
    } catch (err) {
      alert("Failed to load inquiries: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Reset to page 1 when search or productFilter changes
  useEffect(() => {
    setPage(1);
  }, [search, productFilter]);

  // Debounced load when filters or page changes
  useEffect(() => {
    const handler = setTimeout(() => {
      loadData();
    }, 300);
    return () => clearTimeout(handler);
  }, [search, productFilter, page]);

  const handleOpenDetail = (inq) => {
    setSelectedInquiry(inq);
    setModalOpen(true);
  };

  const handleDelete = async (inq) => {
    if (window.confirm(`Are you sure you want to delete the inquiry from "${inq.customer_name}"?`)) {
      try {
        await deleteInquiry(inq.id);
        if (selectedInquiry?.id === inq.id) {
          setModalOpen(false);
        }
        loadData();
      } catch (err) {
        alert("Failed to delete inquiry: " + err.message);
      }
    }
  };

  // Helper to map product ID to product Name
  const getProductName = (prodId) => {
    const prod = products.find(p => p.pk === prodId || p.id === String(prodId));
    return prod ? prod.name : `Product ID: ${prodId}`;
  };

  return (
    <AdminLayout title="Customer Inquiries">
      
      {/* FILTER BAR */}
      <section className="admin-filter-bar">
        <div className="admin-search-wrapper">
          <FaSearch className="admin-search-icon" />
          <input 
            type="text" 
            placeholder="Search inquiries by name, phone, message..." 
            className="admin-search-input"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <select 
          className="admin-select-filter"
          value={productFilter}
          onChange={(e) => setProductFilter(e.target.value)}
          style={{ flex: '0 0 250px' }}
        >
          <option value="">Filter by Queried Product</option>
          {products.map(p => (
            <option key={p.pk} value={p.pk}>{p.name}</option>
          ))}
        </select>
      </section>

      {/* DATA TABLE */}
      <section className="admin-table-container">
        {loading && inquiries.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px', color: 'var(--admin-text-gray)' }}>Loading inquiries...</div>
        ) : inquiries.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px', color: 'var(--admin-text-gray)' }}>No inquiries found.</div>
        ) : (
          <>
          <table className="admin-table">
            <thead>
              <tr>
                <th>Customer Name</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Queried Product</th>
                <th>Inquiry Date</th>
                <th>Message Snippet</th>
                <th style={{ width: '120px', textAlign: 'center' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {inquiries.map((inq) => (
                <tr key={inq.id}>
                  <td style={{ fontWeight: '600', color: 'var(--admin-gold)' }}>{inq.customer_name}</td>
                  <td>{inq.phone}</td>
                  <td>{inq.email || 'N/A'}</td>
                  <td style={{ fontWeight: '500' }}>
                    {inq.product ? getProductName(inq.product) : 'General Inquiry'}
                  </td>
                  <td>{new Date(inq.created_at).toLocaleDateString('en-IN')}</td>
                  <td style={{ maxWidth: '250px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', color: 'var(--admin-text-gray)' }}>
                    {inq.message}
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    <div className="admin-table-actions" style={{ justifyContent: 'center' }}>
                      <button 
                        onClick={() => handleOpenDetail(inq)} 
                        className="admin-table-action-btn admin-action-view"
                        title="View Full Inquiry"
                      >
                        <FaEye />
                      </button>
                      <button 
                        onClick={() => handleDelete(inq)} 
                        className="admin-table-action-btn admin-action-delete"
                        title="Delete Inquiry"
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

      {/* DETAIL MODAL */}
      {modalOpen && selectedInquiry && (
        <div className="admin-modal-overlay">
          <div className="admin-modal-content" style={{ maxWidth: '550px' }}>
            
            <div className="admin-modal-header">
              <h2 className="admin-modal-title">Inquiry Details</h2>
              <button onClick={() => setModalOpen(false)} className="admin-modal-close">
                <FaTimes />
              </button>
            </div>

            <div className="admin-modal-body">
              <div className="admin-inquiry-detail">
                
                <div className="admin-detail-row">
                  <span className="admin-detail-label">Customer</span>
                  <span className="admin-detail-value" style={{ fontWeight: 'bold', color: 'var(--admin-gold)' }}>
                    {selectedInquiry.customer_name}
                  </span>
                </div>

                <div className="admin-detail-row">
                  <span className="admin-detail-label">Phone</span>
                  <span className="admin-detail-value">
                    <a href={`tel:${selectedInquiry.phone}`} style={{ color: 'inherit', textDecoration: 'underline' }}>
                      {selectedInquiry.phone}
                    </a>
                  </span>
                </div>

                <div className="admin-detail-row">
                  <span className="admin-detail-label">Email</span>
                  <span className="admin-detail-value">
                    {selectedInquiry.email ? (
                      <a href={`mailto:${selectedInquiry.email}`} style={{ color: 'inherit', textDecoration: 'underline' }}>
                        {selectedInquiry.email}
                      </a>
                    ) : 'N/A'}
                  </span>
                </div>

                <div className="admin-detail-row">
                  <span className="admin-detail-label">Product</span>
                  <span className="admin-detail-value" style={{ fontWeight: '500' }}>
                    {selectedInquiry.product ? getProductName(selectedInquiry.product) : 'General Inquiry'}
                  </span>
                </div>

                <div className="admin-detail-row">
                  <span className="admin-detail-label">Received At</span>
                  <span className="admin-detail-value">
                    {new Date(selectedInquiry.created_at).toLocaleString('en-IN')}
                  </span>
                </div>

                <div style={{ marginTop: '10px' }}>
                  <span className="admin-detail-label" style={{ display: 'block', marginBottom: '8px' }}>Customer Message:</span>
                  <div className="admin-detail-message">
                    {selectedInquiry.message}
                  </div>
                </div>

              </div>
            </div>

            <div className="admin-modal-footer">
              <button 
                type="button" 
                onClick={() => handleDelete(selectedInquiry)} 
                className="admin-action-btn admin-btn-danger"
                style={{ marginRight: 'auto' }}
              >
                Delete Inquiry
              </button>
              <button 
                type="button" 
                onClick={() => setModalOpen(false)} 
                className="admin-action-btn admin-btn-secondary"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}

    </AdminLayout>
  );
}
