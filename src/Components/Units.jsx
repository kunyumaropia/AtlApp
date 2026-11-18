import React, { useState } from 'react';
import styles from './Units.module.css';

export default function Units({ units, tenants, onAddUnit }) {
  const [showForm, setShowForm] = useState(false);
  const [number, setNumber] = useState('');
  const [type, setType] = useState('1 Bedroom');
  const [rent, setRent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!number || !rent) return;
    onAddUnit({ number, type, rent: Number(rent) });
    setNumber('');
    setRent('');
    setShowForm(false);
  };

  return (
    <section className={styles.page}>
      <div className={styles.pageHeader}>
        <div>
          <h1>Apartment Units</h1>
        </div>
        <button onClick={() => setShowForm(!showForm)} className={styles.primaryButton}>+ Add Unit</button>
      </div>

      {showForm && (
        <div className={styles.formCard}>
          <h2>Add Apartment Unit</h2>
          <form onSubmit={handleSubmit}>
            <label>Unit Number</label>
            <input type="text" placeholder="A101" value={number} onChange={(e) => setNumber(e.target.value)} required />

            <label>Unit Type</label>
            <select value={type} onChange={(e) => setType(e.target.value)}>
              <option>Single Room</option>
              <option>1 Bedroom</option>
              <option>2 Bedroom</option>
              <option>3 Bedroom</option>
            </select>

            <label>Monthly Rent</label>
            <input type="number" value={rent} onChange={(e) => setRent(e.target.value)} required />

            <button type="submit">Add Unit</button>
          </form>
        </div>
      )}

      <div className={styles.tableCard}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Unit</th>
              <th>Type</th>
              <th>Rent</th>
              <th>Status</th>
              <th>Tenant</th>
            </tr>
          </thead>
          <tbody>
            {units.map(unit => {
              const tenantObj = tenants.find(t => t.id === unit.tenant);
              return (
                <tr key={unit.id}>
                  <td>{unit.number}</td>
                  <td>{unit.type}</td>
                  <td>KES {unit.rent.toLocaleString()}</td>
                  <td>{tenantObj ? "Occupied" : "Vacant"}</td>
                  <td>{tenantObj ? tenantObj.name : "None"}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}