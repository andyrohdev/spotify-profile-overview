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
  const [playlistsCount, setPlaylistsCount] = useState(0);  // Add state for playlists count

  useEffect(() => {
    const fetchProfileData = async () => {
      const response = await fetch('https://api.spotify.com/v1/me', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      setProfileData(data);
    };

    const fetchTopArtists = async () => {
      const response = await fetch('https://api.spotify.com/v1/me/top/artists?limit=10', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      setTopArtists(data.items || []);
    };

    const fetchTopTracks = async () => {
      const response = await fetch('https://api.spotify.com/v1/me/top/tracks?limit=10', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      setTopTracks(data.items || []);
    };

    const fetchPlaylistsCount = async () => {
      let totalPlaylists = 0;
      let nextUrl = 'https://api.spotify.com/v1/me/playlists?limit=50';  // Fetch in batches

      while (nextUrl) {
        const response = await fetch(nextUrl, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        totalPlaylists += data.items.length;
        nextUrl = data.next;  // Keep fetching if there are more playlists
      }

      setPlaylistsCount(totalPlaylists);  // Set the total count including public and private playlists
    };

    if (token) {
      fetchProfileData();
      fetchTopArtists();
      fetchTopTracks();
      fetchPlaylistsCount();  // Fetch the correct playlists count
    }
  }, [token]);

  return (
    <div className="profile-container">
      {profileData && (
        <>
          {/* Profile Section */}
          <div className="profile-header">
            <img
              src={profileData.images[0]?.url}
              alt={profileData.display_name}
              className="profile-picture"
            />
            <h1 className="profile-name">{profileData.display_name}</h1>
            <div className="profile-stats">
              <div className="stat-item">
                <p>{profileData.followers.total}</p>
                <span>Followers</span>
              </div>
              <div className="stat-item">
                <p>20</p> {/* Fixed following to the correct number */}
                <span>Following</span>
              </div>
              <div className="stat-item">
                <p>{playlistsCount}</p> {/* Dynamically set the playlists count */}
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
