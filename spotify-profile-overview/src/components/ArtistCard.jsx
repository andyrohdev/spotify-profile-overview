import React from 'react';

export default function ArtistCard({ artist }) {
  return (
    <div className="artist-card">
      <img src={artist.images[0]?.url} alt={artist.name} className="artist-image" />
      <p>{artist.name}</p>
    </div>
  );
}
