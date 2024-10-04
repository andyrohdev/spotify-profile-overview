import React from 'react';
import { useAuth } from './AuthProvider';  // Import useAuth to access logout

export default function Profile() {
  const { logout } = useAuth();  // Destructure the logout function

  return (
    <div>
      <h1>Profile Page</h1>
      <div>
        {/* Placeholder for where ArtistCard(s) will go */}
      </div>

      {/* Log Out Button */}
      <button 
        onClick={logout} 
        style={{ padding: '10px 20px', marginTop: '20px', cursor: 'pointer', backgroundColor: '#1DB954', color: '#fff', border: 'none', borderRadius: '50px' }}
      >
        Log Out
      </button>

      {/* Other components can go here, like a list of top tracks */}
    </div>
  );
}
