import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';

export default function Callback() {
  const navigate = useNavigate();
  const { setToken } = useAuth();

  useEffect(() => {
    console.log('Callback component mounted');
    
    // Get the full URL hash
    let hash = window.location.hash;
    console.log('Full URL hash:', hash);  // Log the entire hash string

    // Only attempt to extract the token if the URL contains "access_token"
    if (hash.includes('access_token')) {
      const tokenMatch = hash.match(/access_token=([^&]*)/);
      const token = tokenMatch ? tokenMatch[1] : null;

      console.log('Extracted access token:', token);  // Log the extracted token
      if (token) {
        window.localStorage.setItem('token', token);
        setToken(token);
        navigate('/');
      } else {
        console.error('No access token found in URL');
      }
    }
  }, [setToken, navigate]);

  return <div>Logging in...</div>;  // Loading message
}
