import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TopTracks.css';
import TrackCard from './TrackCard';

const timeRanges = ['All Time', 'Last 6 Months', 'Last 4 Weeks'];

const TopTracks = () => {
  const [topTracks, setTopTracks] = useState([]);
  const [timeRange, setTimeRange] = useState('long_term');

  useEffect(() => {
    fetchTopTracks();
  }, [timeRange]);

  const fetchTopTracks = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`https://api.spotify.com/v1/me/top/tracks`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          time_range: timeRange,
          limit: 50,
        },
      });
      setTopTracks(response.data.items);
    } catch (error) {
      console.error('Error fetching top tracks:', error);
    }
  };

  const handleTimeRangeChange = (range) => {
    if (range === 'All Time') setTimeRange('long_term');
    if (range === 'Last 6 Months') setTimeRange('medium_term');
    if (range === 'Last 4 Weeks') setTimeRange('short_term');
  };

  const top3Tracks = topTracks.slice(0, 3);
  const otherTracks = topTracks.slice(3);

  return (
    <div className="top-tracks-container">
      <div className="time-period-filter">
        {timeRanges.map((range) => (
          <span
            key={range}
            className={timeRange === range.toLowerCase().replace(' ', '_') ? 'active' : ''}
            onClick={() => handleTimeRangeChange(range)}
          >
            {range}
          </span>
        ))}
      </div>

      {topTracks.length === 0 ? (
        <p>No tracks to display</p>
      ) : (
        <>
          <div className="podium">
            {top3Tracks.map((track, index) => (
              <div
                key={track.id}
                className={`track-podium ${index === 0 ? 'first-place' : index === 1 ? 'second-place' : 'third-place'}`}
              >
                <img src={track.album.images[0]?.url} alt={track.name} />
                <h3>{track.name}</h3>
              </div>
            ))}
          </div>

          <ol className="top-50-list">
            {otherTracks.map((track, index) => (
              <li key={track.id}>
                <span className="track-position">{index + 4}</span>
                <TrackCard track={track} />
              </li>
            ))}
          </ol>
        </>
      )}
    </div>
  );
};

export default TopTracks;
