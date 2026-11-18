import React from 'react';
import styles from './TopHeader.module.css';

export default function TopHeader({ onToggleSidebar }) {
  return (
    <header className={styles.topHeader}>
      <button className={styles.toggleBtn} onClick={onToggleSidebar} aria-label="Open Navigation">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#E3E3E3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="3" y1="12" x2="21" y2="12"></line>
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <line x1="3" y1="18" x2="21" y2="18"></line>
        </svg>
      </button>
      <div className={styles.topLogo}>
        <h2>ATL Apartments</h2>
      </div>
    </header>
  );
}