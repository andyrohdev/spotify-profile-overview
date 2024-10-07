import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';

export default function Callback() {
  const navigate = useNavigate();
  const { setToken } = useAuth();

  useEffect(() => {
    const fullHash = window.location.hash;  // Get the full hash part of the URL
    console.log('Full URL hash:', fullHash);

    let token = null;

    // Check for the presence of the access token in the hash
    if (fullHash.includes('access_token=')) {
      const tokenStartIndex = fullHash.indexOf('access_token=') + 'access_token='.length;
      const tokenEndIndex = fullHash.indexOf('&', tokenStartIndex);
      token = fullHash.substring(tokenStartIndex, tokenEndIndex);  // Extract the token

      console.log('Extracted access token:', token);
    }

    if (token) {
      window.localStorage.setItem('token', token);  // Store the token in localStorage
      setToken(token);  // Set the token in your auth context

      // Check if we're on GitHub Pages and include 'spotify-profile-overview' in the path
      const redirectPath = window.location.hostname === 'andyrohdev.github.io'
        ? '/spotify-profile-overview/#/'
        : '/';

      // Redirect back to the main page after token retrieval
      navigate(redirectPath);
    } else {
      console.error('No access token found in the URL');
    }
  }, [setToken, navigate]);

  return <div>Logging in...</div>;
}
