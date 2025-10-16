import importedFetch from '../../src/fetchWithAuth';
import React from 'react';

export default function AssetList({token}){
  const [assets,setAssets] = React.useState([]);
  React.useEffect(()=>{
    importedFetch('/api/assets', { headers: { Authorization: 'Bearer ' + token } })
      .then(r=>r.json()).then(setAssets).catch(()=>{});
  },[token]);
  return (
    <div>
      <h3>Assets</h3>
      <table border="1" cellPadding="6">
        <thead><tr><th>ID</th><th>Tag</th><th>Name</th><th>Status</th></tr></thead>
        <tbody>
          {assets.map(a=>(
            <tr key={a.id}><td>{a.id}</td><td>{a.assetTag}</td><td>{a.name}</td><td>{a.status}</td></tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
