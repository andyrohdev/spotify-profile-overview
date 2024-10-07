import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';

export default function Callback() {
  const navigate = useNavigate();
  const { setToken } = useAuth();

  useEffect(() => {
    console.log('Callback component mounted');

    let url = window.location.href;  // Get the full URL
    console.log('Full URL:', url);

    // Manually handle the specific URL structure for GitHub Pages
    if (url.includes('#/callback#access_token=')) {
      const tokenStartIndex = url.indexOf('access_token=') + 'access_token='.length;
      const tokenEndIndex = url.indexOf('&', tokenStartIndex);  // End at the first '&'
      const token = url.substring(tokenStartIndex, tokenEndIndex);  // Extract the token

      console.log('Manually extracted access token:', token);

      if (token) {
        window.localStorage.setItem('token', token);  // Store the token
        setToken(token);  // Set the token in your auth context
        navigate('/');  // Navigate to the main page after login
      } else {
        console.error('No access token found in the URL');
      }
    } else {
      console.error('URL structure does not match the expected pattern');
    }
  }, [setToken, navigate]);

  return <div>Logging in...</div>;
}
