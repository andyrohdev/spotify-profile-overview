import React, { useEffect, useState } from 'react';
import { useAuth } from './AuthProvider';
import ArtistCard from './ArtistCard';
import TrackCard from './TrackCard';

export default function Profile() {
  const { token, logout } = useAuth();
  const [topArtists, setTopArtists] = useState([]);  // Initialize as empty array
  const [topTracks, setTopTracks] = useState([]);    // Initialize as empty array

  useEffect(() => {
    // Fetch top artists
    const fetchTopArtists = async () => {
      const response = await fetch('https://api.spotify.com/v1/me/top/artists?limit=5', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      setTopArtists(data.items || []);  // Safeguard: Set empty array if data is undefined
    };

    // Fetch top tracks
    const fetchTopTracks = async () => {
      const response = await fetch('https://api.spotify.com/v1/me/top/tracks?limit=5', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      setTopTracks(data.items || []);  // Safeguard: Set empty array if data is undefined
    };

    if (token) {
      fetchTopArtists();
      fetchTopTracks();
    }
  }, [token]);

  return (
    <div>
      <h1>Profile Page</h1>

      {/* Top Artists Section */}
      <h2>Top Artists of All Time</h2>
      <div className="artist-list">
        {topArtists.length > 0 ? (
          topArtists.map((artist) => (
            <ArtistCard key={artist.id} artist={artist} />
          ))
        ) : (
          <p>No top artists found.</p>
        )}
      </div>

      {/* Top Tracks Section */}
      <h2>Top Tracks of All Time</h2>
      <div className="track-list">
        {topTracks.length > 0 ? (
          topTracks.map((track) => (
            <TrackCard key={track.id} track={track} />
          ))
        ) : (
          <p>No top tracks found.</p>
        )}
      </div>

      {/* Log Out Button */}
      <button 
        onClick={logout} 
        style={{ padding: '10px 20px', marginTop: '20px', cursor: 'pointer', backgroundColor: '#1DB954', color: '#fff', border: 'none', borderRadius: '50px' }}
      >
        Log Out
      </button>
    </div>
  );
}
