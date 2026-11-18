import React, { useState } from 'react';
import styles from './Utilities.module.css';

export default function Utilities({ utilities, onAddUtility }) {
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState('');
  const [cost, setCost] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !cost) return;
    onAddUtility({ name, cost: Number(cost) });
    setName('');
    setCost('');
    setShowForm(false);
  };

  return (
    <section className={styles.page}>
      <div className={styles.pageHeader}>
        <div>
          <h1>Utilities</h1>
        </div>
        <button onClick={() => setShowForm(!showForm)} className={styles.primaryButton}>+ Add Utility</button>
      </div>

      {showForm && (
        <div className={styles.formCard}>
          <h2>Add Utility</h2>
          <form onSubmit={handleSubmit}>
            <label>Utility Name</label>
            <input type="text" placeholder="Water" value={name} onChange={(e) => setName(e.target.value)} required />

            <label>Monthly Cost Per Tenant</label>
            <input type="number" value={cost} onChange={(e) => setCost(e.target.value)} required />

            <button type="submit">Add Utility</button>
          </form>
        </div>
      )}

      <div className={styles.utilityList}>
        {utilities.map(util => (
          <div key={util.id} className={styles.utilityCard}>
            <h3>{util.name}</h3>
            <p>Monthly cost per tenant</p>
            <div className={styles.utilityPrice}>KES {util.cost.toLocaleString()}</div>
          </div>
        ))}
      </div>
    </section>
  );
}