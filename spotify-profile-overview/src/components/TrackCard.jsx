import React from 'react';

export default function TrackCard({ track }) {
  return (
    <div className="track-card">
      <p>{track.name} - {track.artists[0].name}</p>
    </div>
  );
}
