import React from 'react';

export default function MFA({token}){
  const [secret, setSecret] = React.useState(null);
  const [uri, setUri] = React.useState(null);
  const [username, setUsername] = React.useState('');
  const [code, setCode] = React.useState('');
  async function setup(){
    const res = await fetch('/api/mfa/setup', {method:'POST', headers:{'Content-Type':'application/json', Authorization:'Bearer '+token}, body:JSON.stringify({username})});
    const j = await res.json();
    if(res.ok){ setSecret(j.secret); setUri(j.uri); } else { alert('Failed'); }
  }
  async function verify(){
    const res = await fetch('/api/mfa/verify', {method:'POST', headers:{'Content-Type':'application/json', Authorization:'Bearer '+token}, body:JSON.stringify({username, code})});
    if(res.ok) alert('MFA verified'); else alert('Invalid code');
  }
  return (
    <div>
      <h3>MFA Setup</h3>
      <div>
        <input placeholder="username" value={username} onChange={e=>setUsername(e.target.value)} />
        <button onClick={setup}>Generate Secret</button>
      </div>
      {uri && <div><p>Scan this URI in your authenticator app:</p><pre>{uri}</pre></div>}
      <div>
        <input placeholder="6-digit code" value={code} onChange={e=>setCode(e.target.value)} />
        <button onClick={verify}>Verify</button>
      </div>
    </div>
  );
}
