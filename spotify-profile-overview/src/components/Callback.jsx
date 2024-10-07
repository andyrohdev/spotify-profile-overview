import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';

export default function Callback() {
  const navigate = useNavigate();
  const { setToken } = useAuth();

  useEffect(() => {
    const fullHash = window.location.hash;
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

      // Check if the path already contains 'spotify-profile-overview'
      if (window.location.pathname.includes('spotify-profile-overview')) {
        // Redirect back to the main page without appending the subdirectory again
        navigate('/spotify-profile-overview/#/');
      } else {
        // Redirect to the root if on localhost or incorrect path
        navigate('/');
      }
    } else {
      console.error('No access token found in the URL');
    }
  }, [setToken, navigate]);

  return <div>Logging in...</div>;
}
