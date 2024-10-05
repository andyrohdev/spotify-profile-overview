import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';  // Ensure you're using the AuthProvider

export default function Callback() {
  const navigate = useNavigate();
  const { setToken } = useAuth();

  useEffect(() => {
    console.log('Callback component mounted');
    
    // Get the full URL hash
    let hash = window.location.hash;
    console.log('Full URL hash:', hash);  // Log the entire hash string

    // Ensure that the URL contains the correct subdirectory
    if (!window.location.pathname.includes('/spotify-profile-overview')) {
      const correctUrl = window.location.origin + '/spotify-profile-overview' + window.location.hash;
      console.log('Correcting URL to:', correctUrl);
      window.location.replace(correctUrl);  // Redirect to the correct path
      return;  // Stop execution after redirect
    }

    // Handle the situation where there's a double hash (i.e., `/#/callback#access_token=...`)
    if (hash.includes('/callback#')) {
      hash = hash.split('/callback#')[1]; // Removes the `#/callback#` part
    }

    // Now, create a URLSearchParams object to extract the access token
    const params = new URLSearchParams(hash);
    const token = params.get('access_token');
    
    console.log('Extracted access token:', token);  // Log the extracted token
    if (token) {
      window.localStorage.setItem('token', token);
      setToken(token);
      navigate('/');
    } else {
      console.error('No access token found in URL');
    }
  }, [setToken, navigate]);

  return <div>Logging in...</div>;  // Loading message
}
