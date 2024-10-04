import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';  // Ensure you're using the AuthProvider

export default function Callback() {
  const navigate = useNavigate();
  const { setToken } = useAuth();

  useEffect(() => {
    const hash = window.location.hash;
    let token = window.localStorage.getItem('token');
  
    // Check if the token exists in localStorage or in the URL hash
    if (!token && hash) {
      token = new URLSearchParams(hash.substring(1)).get('access_token');
      
      if (token) {
        window.localStorage.setItem('token', token);
        setToken(token);
        navigate('/');  // Redirect to the profile page
      } else {
        console.error('No token found in URL');
        navigate('/');
      }
    } else if (token) {
      setToken(token);
      navigate('/');
    } else {
      navigate('/');
    }
  }, [setToken, navigate]);
  

  return <div>Logging in...</div>;
}
