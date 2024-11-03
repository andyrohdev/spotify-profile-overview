import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './TrackCard.css'; // Import the CSS for styling

export default function TrackCard({ track }) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/track/${track.id}`);
  };

  return (
    <div className="track-card" onClick={handleCardClick}>
      <img src={track.album.images[0]?.url} alt={track.name} className="track-image" />
      <div className="track-info">
        <h3 className="track-name">{track.name}</h3>
        <p className="track-artist">
          {track.artists.map((artist, index) => (
            <span key={artist.id}>
              <Link
                to={`/artist/${artist.id}`}
                className="artist-link"
                onClick={(e) => e.stopPropagation()} // Prevents parent click event
              >
                {artist.name}
              </Link>
              {index < track.artists.length - 1 && ', '}
            </span>
          ))}
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
