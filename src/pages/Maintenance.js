import importedFetch from '../../src/fetchWithAuth';
import React from 'react';

export default function Maintenance({token}){
  const [assets,setAssets]=React.useState([]);
  const [assetId,setAssetId]=React.useState('');
  const [desc,setDesc]=React.useState('');
  const [logs,setLogs]=React.useState([]);
  React.useEffect(()=>{ importedFetch('/api/assets',{headers:{Authorization:'Bearer '+token}}).then(r=>r.json()).then(setAssets); fetch('/api/maintenance',{headers:{Authorization:'Bearer '+token}}).then(r=>r.json()).then(setLogs); },[]);
  async function report(e){
    e.preventDefault();
    const payload = { assetId:Number(assetId), description:desc };
    const res = await importedFetch('/api/maintenance/report',{method:'POST', headers:{'Content-Type':'application/json', Authorization:'Bearer '+token}, body:JSON.stringify(payload)});
    if(res.ok){ alert('Reported'); const j=await res.json(); setLogs([j,...logs]); }
  }
  return (
    <div>
      <h3>Maintenance</h3>
      <form onSubmit={report}>
        <div>
          <select value={assetId} onChange={e=>setAssetId(e.target.value)}>
            <option value="">Select asset</option>
            {assets.map(a=> <option key={a.id} value={a.id}>{a.assetTag} - {a.name}</option>)}
          </select>
        </div>
        <div><textarea placeholder="Describe issue" value={desc} onChange={e=>setDesc(e.target.value)} /></div>
        <button type="submit">Report</button>
      </form>
      <h4>Logs</h4>
      <ul>{logs.map(l=> <li key={l.id}>{l.id} - Asset {l.assetId} - {l.status} - {l.description}</li>)}</ul>
    </div>
  );
}
