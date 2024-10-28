import React from 'react';
import './AlbumCard.css';

export default function AlbumCard({ album }) {
  return (
    <div className="album-card">
      <img src={album.images[0]?.url} alt={album.name} className="album-image" />
      <div className="album-info">
        <h3 className="album-name">{album.name}</h3>
        <p className="album-release-date">{new Date(album.release_date).getFullYear()}</p>
      </div>
    </div>
  );
}
