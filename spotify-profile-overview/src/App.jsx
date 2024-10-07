import React, { useEffect } from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import { useAuth } from './components/AuthProvider';
import Profile from './components/Profile';
import NotFound from './components/NotFound';
import Callback from './components/Callback';
import LandingPage from './components/LandingPage';

export default function App() {
  const { token } = useAuth();

  useEffect(() => {
    const hash = window.location.hash;

    // Check if the URL contains the access token but doesn't have /callback
    if (hash.includes('access_token') && !window.location.href.includes('/callback')) {
      // Append the current hash (containing the token) to /callback
      const newUrl = `${window.location.origin}/#/callback${hash}`;
      console.log('Redirecting to:', newUrl);
      window.location.assign(newUrl);  // Redirect while keeping the token in the hash
    }
  }, []);  // Run this effect once the component is mounted

  useEffect(() => {
    // Prevent redirect loop by checking if the user is already logged in
    const isLoggedIn = window.localStorage.getItem('isLoggedIn');

    if (token && !isLoggedIn) {
      // If there's a token and the user is not already logged in, redirect to home
      console.log('Token found. Redirecting to profile...');
      window.localStorage.setItem('isLoggedIn', 'true');  // Mark user as logged in
      window.location.assign('/#/');  // Redirect to home page
    }
  }, [token]);

  return (
    <Router>
      <Routes>
        <Route 
          path="/" 
          element={token ? <Profile /> : <LandingPage />} 
        />
        <Route path="/callback" element={<Callback />} />
        <Route path="*" element={<NotFound />} />  {/* Fallback route for unmatched paths */}
      </Routes>
    </Router>
  );
}
