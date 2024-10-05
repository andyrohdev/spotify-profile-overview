import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';

export default function Callback() {
  const navigate = useNavigate();
  const { setToken } = useAuth();

  useEffect(() => {
    console.log('Callback component mounted');

    // Ensure that the URL contains the correct subdirectory before anything else
    if (!window.location.pathname.includes('/spotify-profile-overview')) {
      const correctUrl = window.location.origin + '/spotify-profile-overview' + window.location.hash;
      console.log('Correcting URL to:', correctUrl);
      window.location.replace(correctUrl);
      return;  // Stop execution after redirect
    }

    // Get the full URL hash after confirming the correct path
    let hash = window.location.hash;
    console.log('Full URL hash:', hash);

    // Handle situation where there's a double hash (e.g., /#/callback#access_token=...)
    if (hash.includes('/callback#')) {
      hash = hash.split('/callback#')[1]; // Removes the `#/callback#` part
    }

    // Create URLSearchParams object to extract access token
    const params = new URLSearchParams(hash);
    const token = params.get('access_token');

    console.log('Extracted access token:', token);
    if (token) {
      window.localStorage.setItem('token', token);
      setToken(token);
      navigate('/spotify-profile-overview');  // Redirect to the home/profile page
    } else {
      console.error('No access token found in URL');
    }
  }, [setToken, navigate]);

  return <div>Logging in...</div>;  // Loading message
}
