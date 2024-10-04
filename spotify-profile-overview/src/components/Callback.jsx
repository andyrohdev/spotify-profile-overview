import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';  // Ensure you're using the AuthProvider

export default function Callback() {
  const navigate = useNavigate();
  const { setToken } = useAuth();

  useEffect(() => {
    const hash = window.location.hash; // Get the URL hash
    let token = window.localStorage.getItem('token'); // Check localStorage for token

    // Check if the token exists in localStorage or in the URL hash
    if (!token && hash) {
      token = new URLSearchParams(hash.substring(1)).get('access_token'); // Extract access_token
      
      if (token) {
        // Store the token in localStorage and update the state
        window.localStorage.setItem('token', token); 
        setToken(token); // Update the token in context
        // Redirect to the main application
        navigate('/'); 
      } else {
        // If no token is found, redirect back to the landing page
        console.error('No token found in URL');
        navigate('/');
      }
    } else if (token) {
      // If the token exists in localStorage, use it
      setToken(token);
      navigate('/'); // Redirect to the main application
    } else {
      // If no token is found in both localStorage and URL hash, redirect to landing page
      navigate('/');
    }
  }, [setToken, navigate]);

  return <div>Logging in...</div>; // Loading message
}
