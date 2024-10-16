import React from 'react';
import { Link } from 'react-router-dom';
import './TrackCard.css';  // Import the CSS for styling

export default function TrackCard({ track }) {
  return (
    <div className="track-card">
      <img src={track.album.images[0]?.url} alt={track.name} className="track-image" />
      <div className="track-info">
        <h3 className="track-name">{track.name}</h3>
        <p className="track-artist">
          {track.artists.map((artist) => (
            <Link 
              key={artist.id} 
              to={`/artist/${artist.id}`} // Navigate to artist detail page with artist ID
              className="artist-link"
            >
              {artist.name}
            </Link>
          )).reduce((prev, curr) => [prev, ', ', curr])} {/* Add comma between artists */}
        </p>
      </div>
      <p className="track-duration">{formatDuration(track.duration_ms)}</p>
    </div>
  );
}

// Utility function to format the track duration from milliseconds to MM:SS
function formatDuration(ms) {
  const minutes = Math.floor(ms / 60000);
  const seconds = ((ms % 60000) / 1000).toFixed(0);
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}
