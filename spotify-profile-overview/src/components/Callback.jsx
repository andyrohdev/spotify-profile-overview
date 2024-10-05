import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';  // Ensure you're using the AuthProvider

export default function Callback() {
  const navigate = useNavigate();
  const { setToken } = useAuth();

  useEffect(() => {
    console.log('Callback component mounted');
    const hash = window.location.hash;
    console.log('Full URL hash:', hash);  // Log the entire hash string
    
    if (hash) {
      const token = new URLSearchParams(hash.substring(1)).get('access_token');
      console.log('Extracted access token:', token);  // Log the extracted token
      if (token) {
        window.localStorage.setItem('token', token);
        console.log('Token saved to localStorage:', token);  // Confirm token is saved
        setToken(token);
        navigate('/');
      } else {
        console.error('No access token found in URL');
      }
    } else {
      console.error('No hash in URL');
    }
  }, [setToken, navigate]);

  return <div>Logging in...</div>; // Loading message
}
