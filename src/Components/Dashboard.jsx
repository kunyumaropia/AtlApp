import React, { useState } from 'react';
import styles from './Dashboard.module.css';

export default function Dashboard({ totalIncome, totalUnits, utilityIncome, activeTenants, units, utilities, tenants }) {
  const [selectedDetails, setSelectedDetails] = useState(null);
  const rentIncome = units.reduce((acc, u) => (u.tenant !== null ? acc + u.rent : acc), 0);

  return (
    <section className={styles.page}>
      <div className={styles.pageHeader}>
        <div>
          <h1>Dashboard</h1>
          <p>ATL Apartments</p>
        </div>
      </div>

      <div className={styles.dashboardCards}>
        <div className={`${styles.card} ${styles.clickable}`} onClick={() => setSelectedDetails('income')}>
          <h3>Total Income</h3>
          <p>KES {totalIncome.toLocaleString()}</p>
          <span>Click for details</span>
        </div>

        <div className={`${styles.card} ${styles.clickable}`} onClick={() => setSelectedDetails('units')}>
          <h3>Total Units</h3>
          <p>{totalUnits}</p>
          <span>Click for details</span>
        </div>

        <div className={`${styles.card} ${styles.clickable}`} onClick={() => setSelectedDetails('utilities')}>
          <h3>Utility Income</h3>
          <p>KES {utilityIncome.toLocaleString()}</p>
          <span>Click for details</span>
        </div>

        <div className={`${styles.card} ${styles.clickable}`} onClick={() => setSelectedDetails('tenants')}>
          <h3>Active Tenants</h3>
          <p>{activeTenants}</p>
          <span>Click for details</span>
        </div>
      </div>

      <div className={styles.detailsBox}>
        <h2>
          {selectedDetails === 'income' && 'Income Breakdown'}
          {selectedDetails === 'units' && 'Unit Breakdown'}
          {selectedDetails === 'utilities' && 'Utility Breakdown'}
          {selectedDetails === 'tenants' && 'Tenant Breakdown'}
          {!selectedDetails && 'Detailed Information'}
        </h2>
        <div>
          {!selectedDetails && <p>Click one of the dashboard cards above.</p>}
          
          {selectedDetails === 'income' && (
            <div>
              <p><strong>Rent Income:</strong> KES {rentIncome.toLocaleString()}</p>
              <p><strong>Utility Income:</strong> KES {utilityIncome.toLocaleString()}</p>
              <p><strong>Total Income:</strong> KES {totalIncome.toLocaleString()}</p>
            </div>
          )}

          {selectedDetails === 'units' && (
            <table className={styles.table}>
              <thead>
                <tr><th>Unit</th><th>Status</th><th>Rent</th></tr>
              </thead>
              <tbody>
                {units.map(u => (
                  <tr key={u.id}>
                    <td>{u.number}</td>
                    <td>{u.tenant ? 'Occupied' : 'Vacant'}</td>
                    <td>KES {u.rent.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {selectedDetails === 'utilities' && (
            <table className={styles.table}>
              <thead>
                <tr><th>Utility</th><th>Cost / Tenant</th><th>Total Income</th></tr>
              </thead>
              <tbody>
                {utilities.map(util => (
                  <tr key={util.id}>
                    <td>{util.name}</td>
                    <td>KES {util.cost.toLocaleString()}</td>
                    <td>KES {(util.cost * activeTenants).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {selectedDetails === 'tenants' && (
            <table className={styles.table}>
              <thead>
                <tr><th>Tenant</th><th>Phone</th><th>Unit</th></tr>
              </thead>
              <tbody>
                {tenants.map(t => {
                  const unitObj = units.find(u => u.id === t.unit);
                  return (
                    <tr key={t.id}>
                      <td>{t.name}</td>
                      <td>{t.phone}</td>
                      <td>{unitObj ? unitObj.number : 'None'}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </section>
  );
}