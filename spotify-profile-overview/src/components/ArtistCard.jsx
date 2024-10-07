import React from 'react';
import './ArtistCard.css';  // Import the CSS for styling

export default function ArtistCard({ artist }) {
  return (
    <div className="artist-card">
      <img src={artist.images[0]?.url} alt={artist.name} className="artist-image" />
      <h3 className="artist-name">{artist.name}</h3>
    </div>
  );
}
