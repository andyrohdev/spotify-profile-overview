import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useAuth } from './components/AuthProvider';
import Profile from './components/Profile';
import Callback from './components/Callback';
import LandingPage from './components/LandingPage';

export default function App() {
  const { token } = useAuth();

  useEffect(() => {
    console.log('Token value:', token);  // Log the token to see its value
    if (!token) {
      console.log('User is not logged in.');
    } else {
      console.log('User is logged in with token:', token);
    }
  }, [token]);

  return (
    <Router basename="/spotify-profile-overview">
      <Routes>
        <Route 
          path="/" 
          element={
            token  // Check if token exists before rendering Profile
              ? <Profile /> 
              : <LandingPage />
          } 
        />
        <Route path="/callback" element={<Callback />} />
      </Routes>
    </Router>
  );
}
