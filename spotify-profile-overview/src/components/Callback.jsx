import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';

export default function Callback() {
  const navigate = useNavigate();
  const { setToken } = useAuth();

  useEffect(() => {
    console.log('Callback component mounted');

    let hash = window.location.hash;
    console.log('Full URL hash:', hash);

    // Check if the path is missing the project folder and correct it
    if (!window.location.pathname.includes('/spotify-profile-overview')) {
      const correctedUrl = `${window.location.origin}/spotify-profile-overview${window.location.hash}`;
      console.log('Correcting URL to:', correctedUrl);
      window.location.replace(correctedUrl);
      return;  // Stop execution after redirect
    }

    // On GitHub Pages, the hash part might contain "/#/callback" before the token
    if (hash.includes('#/callback#')) {
      hash = hash.split('#/callback#')[1];  // Fix the splitting logic for GitHub Pages
    } else if (hash.includes('#access_token')) {
      hash = hash.split('#')[1];  // Adjust if the token directly follows '#'
    }

    const params = new URLSearchParams(hash);
    const token = params.get('access_token');
    console.log('Extracted access token:', token);

    if (token) {
      window.localStorage.setItem('token', token);
      setToken(token);
      navigate('/');
    } else {
      console.error('No access token found in URL');
    }
  }, [setToken, navigate]);

  return <div>Logging in...</div>;
}
