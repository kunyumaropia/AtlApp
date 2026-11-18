import React, { useState } from 'react';
import './App.css';

import TopHeader from './Components/TopHeader';
import Sidebar from './Components/Sidebar';
import Dashboard from './Components/Dashboard';
import Owner from './Components/Owner';
import Units from './Components/Units';
import Tenants from './Components/Tenants';
import Utilities from './Components/Utilities';
import Bills from './Components/Bills';

export default function App() {
  const [activePage, setActivePage] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const [owner, setOwner] = useState({
    name: "Njoroge Kamau",
    email: "Kamau@example.com",
    phone: "0712345678"
  });

  const [units, setUnits] = useState([
    { id: 1, number: "A101", type: "1 Bedroom", rent: 15000, tenant: 1 }
  ]);

  const [tenants, setTenants] = useState([
    { id: 1, name: "Samuel Kinuthia", phone: "0711111111", unit: 1 }
  ]);

  const [utilities, setUtilities] = useState([
    { id: 1, name: "Water", cost: 1000 }
  ]);

  const toggleSidebar = () => setSidebarCollapsed(!sidebarCollapsed);

  const handleNavigate = (page) => {
    setActivePage(page);
    if (window.innerWidth <= 600) setSidebarCollapsed(true);
  };

  const totalUnits = units.length;
  const activeTenants = tenants.length;
  const rentIncome = units.reduce((acc, u) => (u.tenant !== null ? acc + u.rent : acc), 0);
  const utilityIncomePerTenant = utilities.reduce((acc, util) => acc + util.cost, 0);
  const utilityIncome = utilityIncomePerTenant * activeTenants;
  const totalIncome = rentIncome + utilityIncome;

  const handleSaveOwner = (newOwner) => {
    setOwner(newOwner);
    alert("Owner information saved successfully!");
  };

  const handleAddUnit = (newUnitData) => {
    const unit = {
      id: units.length ? Math.max(...units.map(u => u.id)) + 1 : 1,
      ...newUnitData,
      tenant: null
    };
    setUnits([...units, unit]);
    alert("Unit added successfully!");
  };

  const handleAddTenant = (newTenantData) => {
    const tenantId = tenants.length ? Math.max(...tenants.map(t => t.id)) + 1 : 1;
    const tenant = { id: tenantId, ...newTenantData };

    setTenants([...tenants, tenant]);
    setUnits(units.map(u => u.id === tenant.unit ? { ...u, tenant: tenantId } : u));
    alert("Tenant allocated successfully!");
  };

  const handleAddUtility = (newUtilData) => {
    const util = {
      id: utilities.length ? Math.max(...utilities.map(u => u.id)) + 1 : 1,
      ...newUtilData
    };
    setUtilities([...utilities, util]);
    alert("Utility added successfully!");
  };

  return (
    <div className="appContainer">
      <TopHeader onToggleSidebar={toggleSidebar} />
      <Sidebar 
        sidebarCollapsed={sidebarCollapsed} 
        onToggleSidebar={toggleSidebar} 
        activePage={activePage} 
        onNavigate={handleNavigate} 
      />

      <main className={`mainContent ${sidebarCollapsed ? 'expanded' : ''}`}>
        {activePage === 'dashboard' && (
          <Dashboard 
            totalIncome={totalIncome}
            totalUnits={totalUnits}
            utilityIncome={utilityIncome}
            activeTenants={activeTenants}
            units={units}
            utilities={utilities}
            tenants={tenants}
          />
        )}
        {activePage === 'owner' && <Owner owner={owner} onSaveOwner={handleSaveOwner} />}
        {activePage === 'units' && <Units units={units} tenants={tenants} onAddUnit={handleAddUnit} />}
        {activePage === 'tenants' && <Tenants tenants={tenants} units={units} onAddTenant={handleAddTenant} />}
        {activePage === 'utilities' && <Utilities utilities={utilities} onAddUtility={handleAddUtility} />}
        {activePage === 'bills' && <Bills tenants={tenants} units={units} utilities={utilities} />}
      </main>
    </div>
  );
}