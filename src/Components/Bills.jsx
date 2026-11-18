import React, { useState } from 'react';
import styles from './Bills.module.css';

export default function Bills({ tenants, units, utilities }) {
  const [selectedTenantId, setSelectedTenantId] = useState('');

  const tenant = tenants.find(t => t.id === Number(selectedTenantId));
  const unit = tenant ? units.find(u => u.id === tenant.unit) : null;
  const utilityTotal = utilities.reduce((acc, u) => acc + u.cost, 0);
  const totalAmount = unit ? unit.rent + utilityTotal : 0;

  return (
    <section className={styles.page}>
      <div className={styles.pageHeader}>
        <div>
          <h1>Monthly Bills</h1>
          <p>Generate tenant monthly bill</p>
        </div>
      </div>

      <div className={styles.formCard}>
        <label>Select Tenant</label>
        <select value={selectedTenantId} onChange={(e) => setSelectedTenantId(e.target.value)}>
          <option value="">Select Tenant</option>
          {tenants.map(t => (
            <option key={t.id} value={t.id}>{t.name}</option>
          ))}
        </select>
      </div>

      {selectedTenantId ? (
        <div className={styles.billCard}>
          <div className={styles.billHeader}>
            <h2>ATL Apartments</h2>
            <p>Monthly Tenant Bill</p>
            <p>Date: {new Date().toLocaleDateString()}</p>
          </div>

          <p><strong>Tenant:</strong> {tenant?.name}</p>
          <p><strong>Phone:</strong> {tenant?.phone}</p>
          <p><strong>Unit:</strong> {unit?.number}</p>

          <hr className={styles.divider} />

          <div className={styles.billRow}>
            <span>Monthly Rent</span>
            <span>KES {unit?.rent.toLocaleString()}</span>
          </div>

          {utilities.map(u => (
            <div key={u.id} className={styles.billRow}>
              <span>{u.name}</span>
              <span>KES {u.cost.toLocaleString()}</span>
            </div>
          ))}

          <div className={styles.billTotal}>
            <span>Total Amount</span>
            <span>KES {totalAmount.toLocaleString()}</span>
          </div>

          <div className={styles.printArea}>
            <button onClick={() => window.print()} className={styles.printButton}>Print Bill</button>
          </div>
        </div>
      ) : (
        <div className={styles.billCard}>
          <p>Select a tenant to generate a bill.</p>
        </div>
      )}
    </section>
  );
}