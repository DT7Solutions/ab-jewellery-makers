import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  FaTachometerAlt, 
  FaFolder, 
  FaGem, 
  FaCoins, 
  FaEnvelopeOpenText, 
  FaKey, 
  FaSignOutAlt, 
  FaBars, 
  FaTimes, 
  FaUserShield,
  FaChevronLeft,
  FaChevronRight,
  FaImages
} from 'react-icons/fa';
import { adminLogout, adminChangePassword } from '../../utils/api';
import '../../pages/admin/AdminDashboard.css';

export default function AdminLayout({ children, title = 'Admin Portal' }) {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Responsive / Collapsible states
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(() => {
    const saved = localStorage.getItem('admin_sidebar_collapsed');
    return saved === 'true';
  });

  const [currentUser, setCurrentUser] = useState(null);
  
  // Dropdown & Modal states
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [changePasswordModalOpen, setChangePasswordModalOpen] = useState(false);
  
  // Password Form States
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [pwError, setPwError] = useState('');
  const [pwSuccess, setPwSuccess] = useState('');
  const [pwSaving, setPwSaving] = useState(false);

  // Authenticate on render
  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    const userStr = localStorage.getItem('admin_user');
    
    if (!token || !userStr) {
      navigate('/admin/login');
      return;
    }

    try {
      setCurrentUser(JSON.parse(userStr));
    } catch (e) {
      navigate('/admin/login');
    }
  }, [navigate]);

  // Click outside to close dropdown
  useEffect(() => {
    if (!profileDropdownOpen) return;

    const handleOutsideClick = (e) => {
      if (!e.target.closest('.admin-header-profile')) {
        setProfileDropdownOpen(false);
      }
    };

    document.addEventListener('click', handleOutsideClick);
    return () => document.removeEventListener('click', handleOutsideClick);
  }, [profileDropdownOpen]);

  const handleLogout = async (e) => {
    e?.preventDefault();
    if (window.confirm('Are you sure you want to log out?')) {
      await adminLogout();
      navigate('/admin/login');
    }
  };

  const toggleSidebarCollapse = () => {
    const nextState = !sidebarCollapsed;
    setSidebarCollapsed(nextState);
    localStorage.setItem('admin_sidebar_collapsed', String(nextState));
  };

  const handlePasswordChangeSubmit = async (e) => {
    e.preventDefault();
    setPwError('');
    setPwSuccess('');

    if (!oldPassword || !newPassword || !confirmPassword) {
      setPwError('Please fill in all fields.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setPwError('New passwords do not match.');
      return;
    }

    if (newPassword.length < 6) {
      setPwError('New password must be at least 6 characters.');
      return;
    }

    setPwSaving(true);
    try {
      await adminChangePassword(oldPassword, newPassword);
      setPwSuccess('Password changed successfully!');
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setTimeout(() => {
        setChangePasswordModalOpen(false);
        setPwSuccess('');
      }, 1500);
    } catch (err) {
      setPwError(err.message || 'Failed to change password.');
    } finally {
      setPwSaving(false);
    }
  };

  if (!currentUser) {
    return (
      <div className="admin-body" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: 'var(--admin-bg-dark)' }}>
        Loading Admin Portal...
      </div>
    );
  }

  const menuItems = [
    { name: 'Dashboard', path: '/admin', icon: <FaTachometerAlt /> },
    { name: 'Hero Banners', path: '/admin/banners', icon: <FaImages /> },
    { name: 'Categories', path: '/admin/categories', icon: <FaFolder /> },
    { name: 'Products', path: '/admin/products', icon: <FaGem /> },
    { name: 'Gold Rates', path: '/admin/gold-rates', icon: <FaCoins /> },
    { name: 'Inquiries', path: '/admin/inquiries', icon: <FaEnvelopeOpenText /> },
  ];

  return (
    <div className="admin-body">
      <div className="admin-layout">
        
        {/* SIDEBAR NAVIGATION */}
        <aside className={`admin-sidebar ${sidebarCollapsed ? 'collapsed' : ''} ${sidebarOpen ? 'open' : ''}`}>
          <div className="admin-sidebar-header" style={{ justifyContent: 'center', flexDirection: 'row' }}>
            <div className="admin-sidebar-logo-wrapper" style={{ justifyContent: 'center', width: '100%' }}>
              <img 
                src={sidebarCollapsed ? "/images/logo-collapsed.png" : "/images/logo.png"} 
                alt="Logo" 
                className="admin-sidebar-logo" 
                onError={(e) => { e.target.style.display = 'none'; }} 
              />
            </div>
          </div>
          
          <nav className="admin-sidebar-menu">
            {menuItems.map((item) => (
              <Link 
                key={item.name} 
                to={item.path} 
                className={`admin-menu-item ${location.pathname === item.path ? 'active' : ''}`}
                onClick={() => setSidebarOpen(false)}
                title={sidebarCollapsed ? item.name : undefined}
              >
                <span className="admin-menu-icon">{item.icon}</span>
                <span className="admin-menu-text">{item.name}</span>
              </Link>
            ))}
          </nav>

          <div className="admin-sidebar-footer">
            <button 
              onClick={handleLogout} 
              className="admin-sidebar-logout-btn"
              title="Log Out"
            >
              <FaSignOutAlt className="admin-sidebar-logout-icon" />
              {!sidebarCollapsed && <span>Log Out</span>}
            </button>
          </div>
        </aside>

        {/* MAIN VIEWS */}
        <main className={`admin-main ${sidebarCollapsed ? 'expanded' : ''}`}>
          
          {/* HEADER BAR */}
          <header className="admin-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              {/* Desktop collapse toggle button */}
              <button 
                onClick={toggleSidebarCollapse} 
                className="admin-desktop-collapse-toggle"
                title={sidebarCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
              >
                {sidebarCollapsed ? <FaChevronRight size={10} /> : <FaChevronLeft size={10} />}
              </button>

              {/* Mobile menu toggle */}
              <button 
                onClick={() => setSidebarOpen(!sidebarOpen)} 
                className="admin-menu-toggle"
                title="Toggle Menu"
              >
                {sidebarOpen ? <FaTimes /> : <FaBars />}
              </button>
              
              <h1 className="admin-header-title">{title}</h1>
            </div>
            
            {/* User Profile Info Dropdown */}
            <div className="admin-header-profile">
              <button 
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)} 
                className="admin-user-profile-btn"
                aria-expanded={profileDropdownOpen}
              >
                <FaUserShield className="admin-profile-avatar-icon" />
                <span className="admin-profile-username">{currentUser.username}</span>
              </button>
              
              {profileDropdownOpen && (
                <div className="admin-profile-dropdown">
                  <div className="admin-dropdown-header">
                    <p className="admin-dropdown-user-name">{currentUser.username}</p>
                    <p className="admin-dropdown-user-email">{currentUser.email || 'Administrator'}</p>
                  </div>
                  <div className="admin-dropdown-divider"></div>
                  <button 
                    onClick={() => { setProfileDropdownOpen(false); setChangePasswordModalOpen(true); }} 
                    className="admin-dropdown-item"
                  >
                    <FaKey className="admin-dropdown-icon" /> Change Password
                  </button>
                  <button 
                    onClick={handleLogout} 
                    className="admin-dropdown-item admin-dropdown-logout"
                    style={{ borderBottomLeftRadius: '11px', borderBottomRightRadius: '11px' }}
                  >
                    <FaSignOutAlt className="admin-dropdown-icon" /> Log Out
                  </button>
                </div>
              )}
            </div>
          </header>

          {/* PAGE CONTENT */}
          {children}

          {/* FIXED BOTTOM FOOTER BAR */}
          <footer className="admin-footer-bar">
            <div className="admin-footer-content">
              <span>© 2026 Althaf Jewellery Makers Admin</span>
              <span>
                designed by <a href="https://dt7agency.com" target="_blank" rel="noopener noreferrer" className="admin-footer-link">dt7agency</a>
              </span>
            </div>
          </footer>

        </main>
      </div>

      {/* CHANGE PASSWORD MODAL */}
      {changePasswordModalOpen && (
        <div className="admin-modal-overlay">
          <div className="admin-modal-content" style={{ maxWidth: '400px' }}>
            
            <div className="admin-modal-header">
              <h2 className="admin-modal-title">Change Password</h2>
              <button onClick={() => setChangePasswordModalOpen(false)} className="admin-modal-close">
                <FaTimes />
              </button>
            </div>

            <form onSubmit={handlePasswordChangeSubmit}>
              <div className="admin-modal-body">
                {pwError && <div className="admin-login-error" style={{ marginBottom: '15px' }}>{pwError}</div>}
                {pwSuccess && (
                  <div style={{ 
                    backgroundColor: 'rgba(16, 185, 129, 0.08)', 
                    borderLeft: '4px solid var(--admin-success)', 
                    padding: '12px 15px', 
                    borderRadius: '4px', 
                    color: 'var(--admin-success)', 
                    fontSize: '0.85rem', 
                    marginBottom: '15px',
                    fontWeight: '500'
                  }}>
                    {pwSuccess}
                  </div>
                )}

                <div className="admin-form-group" style={{ marginBottom: '15px' }}>
                  <label className="admin-form-label" style={{ color: 'var(--admin-text-white)' }}>Current Password</label>
                  <input 
                    type="password" 
                    className="admin-form-input" 
                    placeholder="Enter current password"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    required
                  />
                </div>

                <div className="admin-form-group" style={{ marginBottom: '15px' }}>
                  <label className="admin-form-label" style={{ color: 'var(--admin-text-white)' }}>New Password</label>
                  <input 
                    type="password" 
                    className="admin-form-input" 
                    placeholder="Enter new password (min 6 chars)"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                  />
                </div>

                <div className="admin-form-group" style={{ marginBottom: '5px' }}>
                  <label className="admin-form-label" style={{ color: 'var(--admin-text-white)' }}>Confirm New Password</label>
                  <input 
                    type="password" 
                    className="admin-form-input" 
                    placeholder="Re-enter new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="admin-modal-footer">
                <button 
                  type="button" 
                  onClick={() => setChangePasswordModalOpen(false)} 
                  className="admin-action-btn admin-btn-secondary"
                  disabled={pwSaving}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="admin-action-btn admin-btn-primary"
                  disabled={pwSaving}
                >
                  {pwSaving ? 'Updating...' : 'Update Password'}
                </button>
              </div>
            </form>

          </div>
        </div>
      )}
    </div>
  );
}
