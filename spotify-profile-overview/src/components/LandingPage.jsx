import React from 'react';
import { useAuth } from './AuthProvider';
import './LandingPage.css';  // Import the external CSS

export default function LandingPage() {
  const { login } = useAuth();

  console.log('LandingPage rendered');  // Check if this gets logged in the browser console

  return (
    <div className="landing-page">
      <h1>Spotify Profile</h1>
      <button onClick={login}>
        LOG IN TO SPOTIFY
      </button>
    </div>
  );
}
