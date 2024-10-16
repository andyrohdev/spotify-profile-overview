import React from 'react';
import { Link } from 'react-router-dom';
import './ArtistCard.css';

export default function ArtistCard({ artist }) {
  return (
    <Link to={`/artist/${artist.id}`} className="artist-card-link">
      <div className="artist-card">
        <img src={artist.images[0]?.url} alt={artist.name} className="artist-image" />
        <h3 className="artist-name">{artist.name}</h3>
      </div>
    </Link>
  );
}
