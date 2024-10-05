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
    // Check if the URL contains the access token but doesn't have /callback
    const hash = window.location.hash;
    if (hash.includes('access_token') && !window.location.href.includes('/callback')) {
      // Append the current hash (containing the token) to /callback
      const newUrl = `${window.location.origin}/#/callback${hash}`;
      console.log('Redirecting to:', newUrl);
      window.location.assign(newUrl);  // Redirect while keeping the token in the hash
    }
  }, []);  // Run this effect once the component is mounted

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
