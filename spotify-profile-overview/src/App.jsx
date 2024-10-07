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

    // Check if running on localhost or GitHub Pages
    const isLocalhost = window.location.hostname === 'localhost';

    // Only redirect if the URL contains the access token and does NOT include /callback AND you're not already on the callback route
    if (hash.includes('access_token') && !window.location.href.includes('/callback')) {
      // Set the correct redirect URL based on the environment (localhost or GitHub Pages)
      const newUrl = isLocalhost
        ? `${window.location.origin}/#/callback${hash}`  // No subdirectory for localhost
        : `${window.location.origin}/spotify-profile-overview/#/callback${hash}`;  // Use subdirectory for GitHub Pages

      console.log('Redirecting to:', newUrl);
      window.location.assign(newUrl);  // Redirect while keeping the token in the hash
    }
  }, []);  // Run this effect once the component is mounted

  useEffect(() => {
    const isLocalhost = window.location.hostname === 'localhost';

    // Prevent redirect loop by checking if the user is already logged in
    const isLoggedIn = window.localStorage.getItem('isLoggedIn');

    if (token && !isLoggedIn) {
      console.log('Token found. Redirecting to profile...');
      window.localStorage.setItem('isLoggedIn', 'true');  // Mark user as logged in
      
      // Set the correct home redirect URL based on the environment
      const homeUrl = isLocalhost
        ? '/#/'  // No subdirectory for localhost
        : '/spotify-profile-overview/#/';  // Use subdirectory for GitHub Pages

      window.location.assign(homeUrl);  // Redirect to home page
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
