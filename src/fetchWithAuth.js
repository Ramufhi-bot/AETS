import { refreshToken } from './authHelper';
export async function fetchWithAuth(url, opts = {}) {
  let token = localStorage.getItem('aets_token');
  opts.headers = opts.headers || {};
  if(token) opts.headers['Authorization'] = 'Bearer ' + token;
  let res = await fetch(url, opts);
  if(res.status === 401){
    const newToken = await refreshToken();
    if(newToken){
      opts.headers['Authorization'] = 'Bearer ' + newToken;
      res = await fetch(url, opts);
    }
  }
  return res;
}
