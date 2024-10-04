import React from 'react';
import { useAuth } from './AuthProvider';

export default function LandingPage() {
  const { login } = useAuth();

  console.log('LandingPage rendered');  // Check if this gets logged in the browser console

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', backgroundColor: '#000' }}>
      <h1 style={{ color: '#fff', marginBottom: '20px' }}>Spotify Profile</h1>
      <button 
        onClick={login}
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          color: '#fff',
          backgroundColor: '#1DB954',  // Spotify green
          border: 'none',
          borderRadius: '50px',
          cursor: 'pointer',
        }}
      >
        LOG IN TO SPOTIFY
      </button>
    </div>
  );
}
