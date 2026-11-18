import React, { useState } from 'react';
import styles from './Tenants.module.css';

export default function Tenants({ tenants, units, onAddTenant }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [unitId, setUnitId] = useState('');

  const vacantUnits = units.filter(u => u.tenant === null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!unitId) {
      alert("Please select a vacant unit.");
      return;
    }
    onAddTenant({ name, phone, unit: Number(unitId) });
    setName('');
    setPhone('');
    setUnitId('');
  };

  return (
    <section className={styles.page}>
      <div className={styles.pageHeader}>
        <div>
          <h1>Tenant Allocation</h1>
          <p>Allocate tenants to apartment units</p>
        </div>
      </div>

      <div className={styles.formCard}>
        <h2>Allocate Tenant</h2>
        <form onSubmit={handleSubmit}>
          <label>Tenant Name</label>
          <input type="text" placeholder="Lucas Maropia" value={name} onChange={(e) => setName(e.target.value)} required />

          <label>Phone</label>
          <input type="text" placeholder="0712345678" value={phone} onChange={(e) => setPhone(e.target.value)} />

          <label>Select Unit</label>
          <select value={unitId} onChange={(e) => setUnitId(e.target.value)} required>
            <option value="">Select vacant unit</option>
            {vacantUnits.map(u => (
              <option key={u.id} value={u.id}>
                {u.number} - {u.type} (KES {u.rent.toLocaleString()})
              </option>
            ))}
          </select>

          <button type="submit">Allocate Unit</button>
        </form>
      </div>

      <div className={styles.tableCard}>
        <h2>Current Tenants</h2>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone</th>
              <th>Unit</th>
            </tr>
          </thead>
          <tbody>
            {tenants.map(tenant => {
              const unitObj = units.find(u => u.id === tenant.unit);
              return (
                <tr key={tenant.id}>
                  <td>{tenant.name}</td>
                  <td>{tenant.phone}</td>
                  <td>{unitObj ? unitObj.number : "Not assigned"}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}