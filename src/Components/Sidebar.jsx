import React from 'react';
import styles from './Sidebar.module.css';

export default function Sidebar({ sidebarCollapsed, onToggleSidebar, activePage, onNavigate }) {
  return (
    <aside className={`${styles.sidebar} ${sidebarCollapsed ? styles.collapsed : ''}`}>
      <div className={styles.logo}>
        <div className={styles.logoHeader}>
          <h2>ATL Apartments</h2>
          <button className={`${styles.toggleBtn} ${styles.closeBtn}`} onClick={onToggleSidebar} aria-label="Close Navigation">
            ✕
          </button>
        </div>
        <p>Management System</p>
      </div>

      <nav className={styles.nav}>
        <button onClick={() => onNavigate('dashboard')} className={activePage === 'dashboard' ? styles.activeNav : ''}>
          Dashboard
        </button>
        <button onClick={() => onNavigate('owner')} className={activePage === 'owner' ? styles.activeNav : ''}>
          Owner & Property
        </button>
        <button onClick={() => onNavigate('units')} className={activePage === 'units' ? styles.activeNav : ''}>
          Units
        </button>
        <button onClick={() => onNavigate('tenants')} className={activePage === 'tenants' ? styles.activeNav : ''}>
          Tenants
        </button>
        <button onClick={() => onNavigate('utilities')} className={activePage === 'utilities' ? styles.activeNav : ''}>
          Utilities
        </button>
        <button onClick={() => onNavigate('bills')} className={activePage === 'bills' ? styles.activeNav : ''}>
          Monthly Bills
        </button>
      </nav>
    </aside>
  );
}