import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import './TrackDetails.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const TrackDetails = () => {
  const { trackId } = useParams();
  const [track, setTrack] = useState(null);
  const [audioFeatures, setAudioFeatures] = useState(null);
  const [audioAnalysis, setAudioAnalysis] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.3); // Set default volume to 50%
  const audioRef = useRef(null);

  useEffect(() => {
    audioRef.current = new Audio();
    audioRef.current.volume = volume; // Set initial volume to 50%
    fetchTrackDetails();
    fetchAudioFeatures();
    fetchAudioAnalysis();

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = ''; // Clear the source
      }
    };
  }, [trackId]);

  useEffect(() => {
    if (track && track.preview_url) {
      audioRef.current.src = track.preview_url;
      audioRef.current.onloadedmetadata = () => {
        setDuration(audioRef.current.duration);
      };
      audioRef.current.ontimeupdate = () => {
        setCurrentTime(audioRef.current.currentTime);
      };
    }
  }, [track]);

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

  const fetchAudioFeatures = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`https://api.spotify.com/v1/audio-features/${trackId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAudioFeatures(response.data);
    } catch (error) {
      console.error('Error fetching audio features:', error);
    }
  };

  const fetchAudioAnalysis = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`https://api.spotify.com/v1/audio-analysis/${trackId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAudioAnalysis(response.data);
    } catch (error) {
      console.error('Error fetching audio analysis:', error);
    }
  };

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(error => {
        if (error.name !== 'AbortError') {
          console.error('Error trying to play the audio:', error);
        }
      });
    }
    setIsPlaying(!isPlaying);
  };

  const handleVolumeChange = (e) => {
    const newVolume = e.target.value;
    setVolume(newVolume);
    audioRef.current.volume = newVolume;
  };

  const handleProgressChange = (e) => {
    const newTime = e.target.value;
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  if (!track || !audioFeatures || !audioAnalysis) return <p>Loading track details...</p>;

  const keyMap = [
    'C', 'C♯/D♭', 'D', 'D♯/E♭', 'E', 'F',
    'F♯/G♭', 'G', 'G♯/A♭', 'A', 'A♯/B♭', 'B'
  ];
  const key = keyMap[audioFeatures.key] || 'Unknown';

  const chartData = {
    labels: [
      'Acousticness', 'Danceability', 'Energy',
      'Instrumentalness', 'Liveness', 'Speechiness', 'Valence'
    ],
    datasets: [
      {
        label: 'Audio Features',
        data: [
          audioFeatures.acousticness,
          audioFeatures.danceability,
          audioFeatures.energy,
          audioFeatures.instrumentalness,
          audioFeatures.liveness,
          audioFeatures.speechiness,
          audioFeatures.valence,
        ],
        backgroundColor: [
          '#8B5CF6', '#EC4899', '#F59E0B',
          '#10B981', '#3B82F6', '#EF4444', '#6366F1'
        ],
      },
    ],
  };

  return (
    <div className="track-details-container">
      <div className="track-details-card">
        <img src={track.album.images[0]?.url} alt={track.name} className="track-details-image" />
        <div className="track-details-info">
          <h2 className="track-details-title">
            <a href={track.external_urls.spotify} target="_blank" rel="noopener noreferrer">
              {track.name}
            </a>
          </h2>
          <p className="track-details-album">Album: {track.album.name}</p>
          <p className="track-details-artist">Artists: {track.artists.map(artist => artist.name).join(', ')}</p>
          <p className="track-details-duration">Duration: {formatDuration(track.duration_ms)}</p>
          <p className="track-details-popularity">Popularity: {track.popularity}%</p>
          <p className="track-details-explicit">Explicit: {track.explicit ? 'Yes' : 'No'}</p>
          <p className="track-details-release-date">Release Date: {track.album.release_date}</p>
          <p className="track-details-number">Track Number: {track.track_number}</p>

          {track.preview_url && (
            <div className="track-details-audio-controls">
              <button
                className={`track-details-play-button ${isPlaying ? 'playing' : ''}`}
                onClick={togglePlay}
              >
                {isPlaying ? 'Pause' : 'Play'}
              </button>
              <div className="track-details-slider-container">
                <input
                  type="range"
                  className="track-details-progress"
                  value={currentTime}
                  max={duration}
                  onChange={handleProgressChange}
                />
                <div className="track-details-volume-container">
                  <i className="volume-icon">🔊</i>
                  <input
                    type="range"
                    className="track-details-volume"
                    value={volume}
                    min="0"
                    max="1"
                    step="0.01"
                    onChange={handleVolumeChange}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="track-details-audio-features-section">
        <h3>Audio Analysis</h3>
        <div className="track-details-info-grid">
          <div className="track-details-info-item">
            <span>{formatDuration(track.duration_ms)}</span><p>Duration</p>
          </div>
          <div className="track-details-info-item">
            <span>{key}</span><p>Key</p>
          </div>
          <div className="track-details-info-item">
            <span>{audioFeatures.mode === 1 ? 'Major' : 'Minor'}</span><p>Modality</p>
          </div>
          <div className="track-details-info-item">
            <span>{audioFeatures.time_signature}</span><p>Time Signature</p>
          </div>
          <div className="track-details-info-item">
            <span>{audioFeatures.tempo.toFixed(1)}</span><p>Tempo (BPM)</p>
          </div>
          <div className="track-details-info-item">
            <span>{audioAnalysis.bars.length}</span><p>Bars</p>
          </div>
          <div className="track-details-info-item">
            <span>{audioAnalysis.beats.length}</span><p>Beats</p>
          </div>
          <div className="track-details-info-item">
            <span>{audioAnalysis.sections.length}</span><p>Sections</p>
          </div>
          <div className="track-details-info-item">
            <span>{audioAnalysis.segments.length}</span><p>Segments</p>
          </div>
          <div className="track-details-info-item">
            <span>{track.popularity}%</span><p>Popularity</p>
          </div>
        </div>
        <div className="track-details-chart-container">
          <Bar
            data={chartData}
            options={{
              maintainAspectRatio: true,
              responsive: true,
            }}
          />
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

export default TrackDetails;
