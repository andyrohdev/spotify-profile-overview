import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './ArtistDetails.css';

const ArtistDetails = () => {
  const { id } = useParams(); 
  const [artist, setArtist] = useState(null);
  const [albums, setAlbums] = useState([]);
  const [topTracks, setTopTracks] = useState([]);
  const [relatedArtists, setRelatedArtists] = useState([]);

  useEffect(() => {
    fetchArtistDetails();
    fetchArtistAlbums();
    fetchArtistTopTracks();
    fetchRelatedArtists();
  }, [id]);

  const fetchArtistDetails = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`https://api.spotify.com/v1/artists/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setArtist(response.data);
    } catch (error) {
      console.error('Error fetching artist details:', error);
    }
  };

  const fetchArtistAlbums = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`https://api.spotify.com/v1/artists/${id}/albums`, {
        headers: { Authorization: `Bearer ${token}` },
        params: { limit: 10 },
      });
      setAlbums(response.data.items);
    } catch (error) {
      console.error('Error fetching artist albums:', error);
    }
  };

  const fetchArtistTopTracks = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`https://api.spotify.com/v1/artists/${id}/top-tracks`, {
        headers: { Authorization: `Bearer ${token}` },
        params: { market: 'US' },
      });
      setTopTracks(response.data.tracks);
    } catch (error) {
      console.error('Error fetching top tracks:', error);
    }
  };

  const fetchRelatedArtists = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`https://api.spotify.com/v1/artists/${id}/related-artists`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRelatedArtists(response.data.artists);
    } catch (error) {
      console.error('Error fetching related artists:', error);
    }
  };

  if (!artist) {
    return <p>Loading artist details...</p>;
  }

  return (
    <div className="artist-details__container">
      {/* Banner */}
      <div className="artist-details__banner">
        <img src={artist.images[0]?.url} alt={artist.name} className="artist-details__banner-image" />
      </div>

      {/* Artist Name */}
      <h1 className="artist-details__name">{artist.name}</h1>

      {/* Followers */}
      <p className="artist-details__followers">
        <strong>Followers:</strong> {artist.followers.total.toLocaleString()}
      </p>

      {/* Popularity */}
      <p className="artist-details__popularity">
        <strong>Popularity:</strong> {artist.popularity}/100
      </p>

      {/* Genres */}
      {artist.genres.length > 0 && (
        <p className="artist-details__genres">
          <strong>Genres:</strong> {artist.genres.join(', ')}
        </p>
      )}

      {/* External Spotify URL */}
      <p className="artist-details__spotify-link">
        <strong>Spotify Profile:</strong>{' '}
        <a href={artist.external_urls.spotify} target="_blank" rel="noopener noreferrer">
          {artist.name}'s Spotify
        </a>
      </p>

      {/* Artist Albums */}
      <div className="artist-details__section">
        <h2 className="artist-details__section-title">Albums</h2>
        <div className="artist-details__albums-container">
          {albums.map((album) => (
            <div key={album.id} className="artist-details__album-card">
              <img src={album.images[0]?.url} alt={album.name} className="artist-details__album-image" />
              <p>{album.name}</p>
              <p>{new Date(album.release_date).getFullYear()}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Top Tracks */}
      <div className="artist-details__section">
        <h2 className="artist-details__section-title">Top Tracks</h2>
        <ol className="artist-details__tracks-list">
          {topTracks.map((track, index) => (
            <li key={track.id}>
              {index + 1}. {track.name} - {formatDuration(track.duration_ms)}
            </li>
          ))}
        </ol>
      </div>

      {/* Related Artists */}
      <div className="artist-details__section">
        <h2 className="artist-details__section-title">Related Artists</h2>
        <div className="artist-details__related-artists-container">
          {relatedArtists.map((relatedArtist) => (
            <div key={relatedArtist.id} className="artist-details__related-artist-card">
              <img
                src={relatedArtist.images[0]?.url}
                alt={relatedArtist.name}
                className="artist-details__related-artist-image"
              />
              <p>{relatedArtist.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

function formatDuration(ms) {
  const minutes = Math.floor(ms / 60000);
  const seconds = ((ms % 60000) / 1000).toFixed(0);
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

export default ArtistDetails;
