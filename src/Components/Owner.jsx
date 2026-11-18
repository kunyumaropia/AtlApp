import React, { useState } from 'react';
import styles from './Owner.module.css';

export default function Owner({ owner, onSaveOwner }) {
  const [ownerName, setOwnerName] = useState(owner.name);
  const [ownerEmail, setOwnerEmail] = useState(owner.email);
  const [ownerPhone, setOwnerPhone] = useState(owner.phone);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSaveOwner({ name: ownerName, email: ownerEmail, phone: ownerPhone });
  };

  return (
    <section className={styles.page}>
      <div className={styles.pageHeader}>
        <div>
          <h1>Owner & Property</h1>
          <p>Manage apartment owner information</p>
        </div>
      </div>

      <div className={styles.formCard}>
        <h2>Owner Information</h2>
        <form onSubmit={handleSubmit}>
          <label>Owner Name</label>
          <input type="text" value={ownerName} onChange={(e) => setOwnerName(e.target.value)} required />

          <label>Email</label>
          <input type="email" value={ownerEmail} onChange={(e) => setOwnerEmail(e.target.value)} required />

          <label>Phone</label>
          <input type="text" value={ownerPhone} onChange={(e) => setOwnerPhone(e.target.value)} />

          <button type="submit">Save Owner</button>
        </form>
      </div>

      <div className={styles.infoCard}>
        <h2>Apartment Information</h2>
        <p><strong>Apartment:</strong> ATL Heights</p>
        <p><strong>Location:</strong> Nairobi, Kenya</p>
        <p><strong>Owner:</strong> <span>{owner.name}</span></p>
      </div>
    </section>
  );
}