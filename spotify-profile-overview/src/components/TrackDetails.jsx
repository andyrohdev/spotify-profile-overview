import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './TrackDetails.css'; // Import CSS for styling

const TrackDetails = () => {
  const { trackId } = useParams(); // Get the track ID from the URL
  const [track, setTrack] = useState(null);

  useEffect(() => {
    fetchTrackDetails();
  }, [trackId]);

  const fetchTrackDetails = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`https://api.spotify.com/v1/tracks/${trackId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTrack(response.data);
    } catch (error) {
      console.error('Error fetching track details:', error);
    }
  };

  if (!track) return <p>Loading track details...</p>;

  return (
    <div className="track-details-container">
      <img src={track.album.images[0]?.url} alt={track.name} className="track-album-image" />
      <h2 className="track-name">{track.name}</h2>
      <p className="track-album">Album: {track.album.name}</p>
      <p className="track-artist">
        Artists: {track.artists.map(artist => artist.name).join(', ')}
      </p>
      <p className="track-duration">Duration: {formatDuration(track.duration_ms)}</p>
      <p className="track-popularity">Popularity: {track.popularity}</p>
      <p className="track-explicit">Explicit: {track.explicit ? 'Yes' : 'No'}</p>
      <p className="track-release-date">Release Date: {track.album.release_date}</p>
      <a href={track.external_urls.spotify} target="_blank" rel="noopener noreferrer">
        Listen on Spotify
      </a>
    </div>
  );
};

// Utility function to format the track duration from milliseconds to MM:SS
function formatDuration(ms) {
  const minutes = Math.floor(ms / 60000);
  const seconds = ((ms % 60000) / 1000).toFixed(0);
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

export default TrackDetails;
