import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaFolder, 
  FaGem, 
  FaCoins, 
  FaEnvelopeOpenText, 
  FaChevronRight 
} from 'react-icons/fa';
import AdminLayout from '../../components/admin/AdminLayout';
import { 
  fetchAdminCategories, 
  fetchAdminProducts, 
  fetchAdminGoldRates, 
  fetchAdminInquiries 
} from '../../utils/api';
import './AdminDashboard.css';

export default function AdminDashboard() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [goldRates, setGoldRates] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      try {
        const catsRes = await fetchAdminCategories();
        const prodsRes = await fetchAdminProducts();
        const ratesRes = await fetchAdminGoldRates();
        const inqsRes = await fetchAdminInquiries();

        setCategories(catsRes.results || (Array.isArray(catsRes) ? catsRes : []));
        setProducts(prodsRes.results || (Array.isArray(prodsRes) ? prodsRes : []));
        setGoldRates(ratesRes.results || (Array.isArray(ratesRes) ? ratesRes : []));
        setInquiries(inqsRes.results || (Array.isArray(inqsRes) ? inqsRes : []));
      } catch (err) {
        console.error("Failed to load dashboard data:", err);
      } finally {
        setLoading(false);
      }
    }

    loadStats();
  }, []);

  const latestRate = goldRates[0] || {
    gold_22k_per_gram: '6850.00',
    gold_24k_per_gram: '7470.00',
    silver_per_gram: '91.00'
  };

  // Group products by category to build chart data
  const categoryChartData = categories.map(cat => {
    const count = products.filter(p => p.category === cat.id || p.categoryName === cat.name).length;
    return {
      name: cat.name,
      count
    };
  }).filter(c => c.count > 0);

  const maxProductCount = categoryChartData.reduce((max, c) => c.count > max ? c.count : max, 1);

  if (loading) {
    return (
      <AdminLayout title="Dashboard">
        <div style={{ textAlign: 'center', padding: '50px', color: 'var(--admin-text-gray)' }}>
          Loading stats & overview metrics...
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Dashboard">
      
      {/* STAT CARDS */}
      <section className="admin-stats-grid">
        <div className="admin-stat-card">
          <div className="admin-stat-info">
            <h3>Total Categories</h3>
            <p className="admin-stat-number">{categories.length}</p>
          </div>
          <div className="admin-stat-icon-wrapper">
            <FaFolder />
          </div>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-info">
            <h3>Total Products</h3>
            <p className="admin-stat-number">{products.length}</p>
          </div>
          <div className="admin-stat-icon-wrapper">
            <FaGem />
          </div>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-info">
            <h3>Gold 22K (Per g)</h3>
            <p className="admin-stat-number">₹{Math.round(parseFloat(latestRate.gold_22k_per_gram))}</p>
          </div>
          <div className="admin-stat-icon-wrapper">
            <FaCoins />
          </div>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-info">
            <h3>Inquiries</h3>
            <p className="admin-stat-number">{inquiries.length}</p>
          </div>
          <div className="admin-stat-icon-wrapper">
            <FaEnvelopeOpenText />
          </div>
        </div>
      </section>

      {/* CHARTS AND LISTS */}
      <div className="admin-dashboard-row">
        
        {/* PRODUCTS BY CATEGORY DISTRIBUTION BAR CHART */}
        <section className="admin-panel-card">
          <h2 className="admin-panel-title">Products by Category</h2>
          
          {categoryChartData.length === 0 ? (
            <div style={{ display: 'flex', height: '220px', alignItems: 'center', justifyContent: 'center', color: 'var(--admin-text-gray)' }}>
              No active products available.
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', padding: '10px 0' }}>
              {categoryChartData.map((data, index) => {
                const percentage = (data.count / maxProductCount) * 100;
                return (
                  <div key={index} style={{ display: 'grid', gridTemplateColumns: '150px 1fr 40px', alignItems: 'center', gap: '15px' }}>
                    <div style={{ fontWeight: '500', fontSize: '0.9rem', color: 'var(--admin-text-white)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {data.name}
                    </div>
                    <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '10px', height: '12px', overflow: 'hidden', border: '1px solid rgba(212,175,55,0.1)' }}>
                      <div style={{
                        background: 'linear-gradient(90deg, #d4af37 0%, #f5d061 100%)',
                        height: '100%',
                        width: `${percentage}%`,
                        borderRadius: '10px',
                        transition: 'width 1s cubic-bezier(0.4, 0, 0.2, 1)'
                      }}></div>
                    </div>
                    <div style={{ textAlign: 'right', fontWeight: 'bold', fontSize: '0.9rem', color: 'var(--admin-gold)' }}>
                      {data.count}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {/* RECENT INQUIRIES CARD */}
        <section className="admin-panel-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid rgba(212, 175, 55, 0.1)', paddingBottom: '10px' }}>
            <h2 className="admin-panel-title" style={{ margin: '0', border: 'none', padding: '0' }}>Recent Inquiries</h2>
            <Link to="/admin/inquiries" style={{ color: 'var(--admin-gold)', fontSize: '0.8rem', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '3px' }}>
              View All <FaChevronRight />
            </Link>
          </div>

          <div className="admin-recent-inquiries">
            {inquiries.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '30px', color: 'var(--admin-text-gray)', fontSize: '0.85rem' }}>
                No customer inquiries received yet.
              </div>
            ) : (
              inquiries.slice(0, 5).map((inq) => (
                <div key={inq.id} className="admin-inquiry-item">
                  <div className="admin-inquiry-meta">
                    <span className="admin-inquiry-name">{inq.customer_name}</span>
                    <span>{new Date(inq.created_at).toLocaleDateString('en-IN')}</span>
                  </div>
                  <div className="admin-inquiry-text" title={inq.message}>
                    {inq.message}
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

      </div>

    </AdminLayout>
  );
}
