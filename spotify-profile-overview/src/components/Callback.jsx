import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';

export default function Callback() {
  const navigate = useNavigate();
  const { setToken } = useAuth();

  useEffect(() => {
    const hash = window.location.hash;  // Get the hash part of the URL
    console.log('Full URL hash:', hash);

    if (hash.includes('access_token=')) {
      const tokenStartIndex = hash.indexOf('access_token=') + 'access_token='.length;
      const tokenEndIndex = hash.indexOf('&', tokenStartIndex);  // End at the first '&'
      const token = hash.substring(tokenStartIndex, tokenEndIndex);

      if (token) {
        window.localStorage.setItem('token', token);  // Store the token in localStorage
        setToken(token);  // Set the token in your auth context

        // Redirect back to the home page after token retrieval
        navigate('/');
      } else {
        console.error('No access token found in the URL');
      }
    } else {
      console.error('No access token present in the URL');
    }
  }, [setToken, navigate]);

  return <div>Logging in...</div>;
}
