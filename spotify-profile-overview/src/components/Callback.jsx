import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';  // Ensure you're using the AuthProvider

export default function Callback() {
  const navigate = useNavigate();
  const { setToken } = useAuth();

  useEffect(() => {
    console.log('Callback component mounted');
    const hash = window.location.hash; // Get the URL hash
    console.log('Hash:', hash); // Log the hash
    let token = window.localStorage.getItem('token'); // Check localStorage for token
  
    // Check if the token exists in localStorage or in the URL hash
    if (!token && hash) {
      token = new URLSearchParams(hash.substring(1)).get('access_token'); // Extract access_token
      console.log('Token extracted from hash:', token); // Log extracted token
  
      if (token) {
        // Store the token in localStorage and update the state
        window.localStorage.setItem('token', token); 
        setToken(token); // Update the token in context
        // Redirect to the main application
        navigate('/'); 
      } else {
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
