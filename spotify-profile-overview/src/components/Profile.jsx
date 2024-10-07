import React, { useEffect, useState } from 'react';
import { useAuth } from './AuthProvider';
import ArtistCard from './ArtistCard';
import TrackCard from './TrackCard';
import './Profile.css';  // Import the CSS file for styling

export default function Profile() {
  const { token, logout } = useAuth();
  const [topArtists, setTopArtists] = useState([]);
  const [topTracks, setTopTracks] = useState([]);
  const [profileData, setProfileData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await fetch('https://api.spotify.com/v1/me', {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.status === 401) {
          // Handle unauthorized error by logging out or reauthorizing
          setError('Unauthorized. Please log in again.');
          logout();  // Optionally log out the user
          return;
        }

        const data = await response.json();
        setProfileData(data);
      } catch (err) {
        console.error('Error fetching profile data:', err);
        setError('Failed to load profile data.');
      }
    };

    const fetchTopArtists = async () => {
      try {
        const response = await fetch('https://api.spotify.com/v1/me/top/artists?limit=10&time_range=long_term', {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.status === 401) {
          setError('Unauthorized. Please log in again.');
          logout();
          return;
        }

        const data = await response.json();
        setTopArtists(data.items || []);
      } catch (err) {
        console.error('Error fetching top artists:', err);
        setError('Failed to load top artists.');
      }
    };

    const fetchTopTracks = async () => {
      try {
        const response = await fetch('https://api.spotify.com/v1/me/top/tracks?limit=10&time_range=long_term', {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.status === 401) {
          setError('Unauthorized. Please log in again.');
          logout();
          return;
        }

        const data = await response.json();
        setTopTracks(data.items || []);
      } catch (err) {
        console.error('Error fetching top tracks:', err);
        setError('Failed to load top tracks.');
      }
    };

    if (token) {
      fetchProfileData();
      fetchTopArtists();
      fetchTopTracks();
    }
  }, [token, logout]);

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="profile-container">
      {profileData && (
        <>
          {/* Profile Section */}
          <div className="profile-header">
            <img
              src={profileData.images?.[0]?.url || 'https://www.gravatar.com/avatar/placeholder-url-here?d=mp'} // Fallback avatar
              alt={profileData.display_name}
              className="profile-picture"
            />
            <h1 className="profile-name">{profileData.display_name}</h1>
            <div className="profile-stats">
              <div className="stat-item">
                <p>{profileData.followers?.total || 0}</p>
                <span>Followers</span>
              </div>
              <div className="stat-item">
                <p>20</p>
                <span>Following</span>
              </div>
              <div className="stat-item">
                <p>90</p>
                <span>Playlists</span>
              </div>
            </div>
            <button onClick={logout} className="logout-button">
              LOGOUT
            </button>
          </div>

          {/* Top Artists and Tracks Section */}
          <div className="profile-content">
            <div className="top-artists">
              <div className="section-header">
                <h2>Top Artists of All Time</h2>
                <button className="see-more-button">SEE MORE</button>
              </div>
              <div className="artist-list">
                {topArtists.length > 0 ? (
                  topArtists.map((artist) => (
                    <ArtistCard key={artist.id} artist={artist} />
                  ))
                ) : (
                  <p>No top artists found.</p>
                )}
              </div>
            </div>

            <div className="top-tracks">
              <div className="section-header">
                <h2>Top Tracks of All Time</h2>
                <button className="see-more-button">SEE MORE</button>
              </div>
              <div className="track-list">
                {topTracks.length > 0 ? (
                  topTracks.map((track) => (
                    <TrackCard key={track.id} track={track} />
                  ))
                ) : (
                  <p>No top tracks found.</p>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
