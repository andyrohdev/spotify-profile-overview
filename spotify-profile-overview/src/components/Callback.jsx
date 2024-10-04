import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';  // Ensure you're using the AuthProvider

export default function Callback() {
  const navigate = useNavigate();
  const { setToken } = useAuth();

  useEffect(() => {
    const hash = window.location.hash;
    let token = window.localStorage.getItem('token');

    // If no token exists in localStorage but found in URL hash, set it
    if (!token && hash) {
      token = new URLSearchParams(hash.substring(1)).get('access_token');
      window.localStorage.setItem('token', token);  // Store token in localStorage
      setToken(token);  // Update AuthProvider with token
      navigate('/');  // Redirect to profile page
    }
  }, [setToken, navigate]);

  return <div>Logging in...</div>;
}
