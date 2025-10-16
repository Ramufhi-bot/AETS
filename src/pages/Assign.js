import importedFetch from '../../src/fetchWithAuth';
import React from 'react';

export default function Assign({token}){
  const [assets,setAssets]=React.useState([]);
  const [userId,setUserId]=React.useState('');
  const [assetId,setAssetId]=React.useState('');
  React.useEffect(()=>{ importedFetch('/api/assets',{headers:{Authorization:'Bearer '+token}}).then(r=>r.json()).then(setAssets); },[]);
  async function doAssign(e){
    e.preventDefault();
    const payload = { assetId: Number(assetId), userId: Number(userId), assignedBy: null };
    const res = await importedFetch('/api/assignments/assign',{method:'POST',headers:{'Content-Type':'application/json', Authorization:'Bearer '+token}, body:JSON.stringify(payload)});
    if(res.ok){ alert('Assigned'); } else { alert('Failed'); }
  }
  return (
    <div>
      <h3>Assign Asset</h3>
      <form onSubmit={doAssign}>
        <div>
          <select value={assetId} onChange={e=>setAssetId(e.target.value)}>
            <option value="">Select asset</option>
            {assets.map(a=> <option key={a.id} value={a.id}>{a.assetTag} - {a.name} ({a.status})</option>)}
          </select>
        </div>
        <div><input placeholder="Assignee user id" value={userId} onChange={e=>setUserId(e.target.value)} /></div>
        <button type="submit">Assign</button>
      </form>
    </div>
  );
}
