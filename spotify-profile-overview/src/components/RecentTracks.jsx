import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './RecentTracks.css';
import TrackCard from './TrackCard';

const RecentTracks = () => {
  const [recentTracks, setRecentTracks] = useState([]);

  useEffect(() => {
    fetchRecentTracks();
  }, []);

  const fetchRecentTracks = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`https://api.spotify.com/v1/me/player/recently-played`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          limit: 50,
        },
      });
      setRecentTracks(response.data.items);
    } catch (error) {
      console.error('Error fetching recent tracks:', error);
    }
  };

  return (
    <div className="recent-tracks-container">
      {recentTracks.length === 0 ? (
        <p>No recent tracks to display</p>
      ) : (
        <ol className="tracks-list">
          {recentTracks.map((item, index) => (
            // Use `played_at` to ensure uniqueness
            <li key={`${item.track.id}-${item.played_at}`}>
              <span className="track-position">{index + 1}</span>
              <TrackCard track={item.track} />
            </li>
          ))}
        </ol>
      )}
    </div>
  );
};

export default RecentTracks;
