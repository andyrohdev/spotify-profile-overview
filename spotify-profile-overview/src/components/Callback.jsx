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

    // Handle the situation where there's a double hash (i.e., `/#/callback#access_token=...`)
    // First, check if we have `/#/callback` and strip that part
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
