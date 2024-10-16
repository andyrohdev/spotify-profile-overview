import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './ArtistDetails.css';
import TrackCard from './TrackCard'; // Import TrackCard
import AlbumCard from './AlbumCard'; // Import AlbumCard
import ArtistCard from './ArtistCard'; // Import ArtistCard

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
        params: { limit: 6 }, // Limit the albums to 6
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
      {/* Profile Section */}
      <div className="artist-details__header">
        <img
          src={artist.images[0]?.url}
          alt={artist.name}
          className="artist-details__picture"
        />
        <a
          href={artist.external_urls.spotify}
          target="_blank"
          rel="noopener noreferrer"
          className="artist-details__name-link"
        >
          <h1 className="artist-details__name">{artist.name}</h1>
        </a>
        <div className="artist-details__stats">
          <div className="stat-item">
            <p>{artist.followers.total.toLocaleString()}</p>
            <span>Followers</span>
          </div>
          <div className="stat-item">
            <p>{artist.popularity}%</p>
            <span>Popularity</span>
          </div>
          <div className="artist-genres">
            {artist.genres.map((genre, index) => (
              <span key={index} className="genre-tag">{genre}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Side-by-side Tracks and Albums */}
      <div className="artist-details__content">
        <div className="artist-details__section">
          <h2 className="artist-details__section-title">Top Tracks</h2>
          <div className="artist-details__tracks-list">
            {topTracks.map((track) => (
              <TrackCard key={track.id} track={track} />
            ))}
          </div>
        </div>

        <div className="artist-details__section">
          <h2 className="artist-details__section-title">Recent Albums</h2>
          <div className="artist-details__albums-container">
            {albums.map((album) => (
              <AlbumCard key={album.id} album={album} />
            ))}
          </div>
        </div>
      </div>

      {/* Related Artists */}
      <div className="artist-details__section">
        <h2 className="artist-details__section-title">Related Artists</h2>
        <div className="artist-details__related-artists-container">
          {relatedArtists.map((relatedArtist) => (
            <ArtistCard key={relatedArtist.id} artist={relatedArtist} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ArtistDetails;
