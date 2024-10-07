import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';

export default function Callback() {
  const navigate = useNavigate();
  const { setToken } = useAuth();

  useEffect(() => {
    console.log('Callback component mounted');

    let hash = window.location.hash;  // Use the hash part of the URL
    console.log('Full URL hash:', hash);

    // Directly extract the access token from the current URL structure
    if (hash.includes('access_token=')) {
      const tokenStartIndex = hash.indexOf('access_token=') + 'access_token='.length;
      const tokenEndIndex = hash.indexOf('&', tokenStartIndex);  // End at the first '&'
      const token = hash.substring(tokenStartIndex, tokenEndIndex);  // Extract the token

      console.log('Extracted access token:', token);

      if (token) {
        window.localStorage.setItem('token', token);  // Store the token in localStorage
        setToken(token);  // Set the token in your auth context

        // After setting the token, manually redirect to the correct route
        navigate('/spotify-profile-overview');
      } else {
        console.error('No access token found in the URL');
      }
    } else {
      console.error('No access token present in the URL');
    }
  }, [setToken, navigate]);

  return <div>Logging in...</div>;
}
