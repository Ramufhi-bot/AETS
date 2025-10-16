import React from 'react';

export default function Login({onLogin}){
  const [username,setUsername]=React.useState('');
  const [password,setPassword]=React.useState('');
  async function submit(e){
    e.preventDefault();
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify({username,password})
    });
    const data = await res.json().catch(()=>({}));
    if(res.ok && data.token){
      localStorage.setItem('aets_token', data.token);
      if(data.refreshToken) localStorage.setItem('aets_refresh', data.refreshToken);
      onLogin(data.token);
    } else {
      alert('Login failed: '+(data.error||'unknown'));
    }
  }
  return (
    <div style={{padding:20}}>
      <h2>Asset Guard — Login</h2>
      <form onSubmit={submit}>
        <div><input placeholder="username" value={username} onChange={e=>setUsername(e.target.value)} /></div>
        <div><input type="password" placeholder="password" value={password} onChange={e=>setPassword(e.target.value)} /></div>
        <button type="submit">Login</button>
      </form>
      <p>Tip: Admins use MFA — after login go to Settings → MFA to configure.</p>
    </div>
  );
}
