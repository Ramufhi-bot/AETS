import MFA from './MFA';
import React from 'react';
import AssetList from './AssetList';
import Assign from './Assign';
import Maintenance from './Maintenance';

export default function Dashboard({token, onLogout}){
  const [page,setPage]=React.useState('dashboard');
  return (
    <div style={{display:'flex'}}>
      <aside style={{width:220, padding:20, borderRight:'1px solid #ddd'}}>
        <h3>Asset Guard</h3>
        <nav>
          <div style={{cursor:'pointer'}} onClick={()=>setPage('dashboard')}>Dashboard</div>
          <div style={{cursor:'pointer'}} onClick={()=>setPage('assets')}>Assets</div>
          <div style={{cursor:'pointer'}} onClick={()=>setPage('assign')}>Borrow/Assign</div>
          <div style={{cursor:'pointer'}} onClick={()=>setPage('maintenance')}>Maintenance</div>
          <div style={{cursor:'pointer'}} onClick={()=>setPage('reports')}>Reports</div>
          <div style={{cursor:'pointer'}} onClick={()=>setPage('mfa')}>MFA</div>
          <div style={{cursor:'pointer', marginTop:20}} onClick={onLogout}>Logout</div>
        </nav>
      </aside>
      <main style={{flex:1, padding:20}}>
        {page==='dashboard' && <div><h2>Dashboard</h2><AssetList token={token} /></div>}
        {page==='assets' && <AssetList token={token} />}
        {page==='assign' && <Assign token={token} />}
        {page==='maintenance' && <Maintenance token={token} />}
        {page==='reports' && <div><h3>Reports</h3><p>Generate PDF/Excel in backend (use /api/reports endpoints)</p></div>}
      {page==='mfa' && <MFA token={token} />}</main>
    </div>
  );
}
