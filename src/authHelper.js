export async function refreshToken() {
  const refresh = localStorage.getItem('aets_refresh');
  if(!refresh) return null;
  const res = await fetch('/api/auth/refresh', {method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({refreshToken: refresh})});
  if(res.ok){
    const j = await res.json();
    if(j.token) localStorage.setItem('aets_token', j.token);
    if(j.refreshToken) localStorage.setItem('aets_refresh', j.refreshToken);
    return j.token;
  } else {
    // logout
    localStorage.removeItem('aets_token'); localStorage.removeItem('aets_refresh');
    return null;
  }
}
