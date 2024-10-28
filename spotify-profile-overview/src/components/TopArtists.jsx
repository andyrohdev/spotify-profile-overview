import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TopArtists.css';
import ArtistCard from './ArtistCard';

const timeRanges = ['All Time', 'Last 6 Months', 'Last 4 Weeks'];

const TopArtists = () => {
  const [topArtists, setTopArtists] = useState([]);
  const [timeRange, setTimeRange] = useState('long_term');

  useEffect(() => {
    fetchTopArtists();
  }, [timeRange]);

  useEffect(() => {
    addMarqueeEffect(); // Run the marquee effect when the artists data changes
  }, [topArtists]);

  const fetchTopArtists = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`https://api.spotify.com/v1/me/top/artists`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          time_range: timeRange,
          limit: 50,
        },
      });
      setTopArtists(response.data.items);
    } catch (error) {
      console.error('Error fetching top artists:', error);
    }
  };

  const handleTimeRangeChange = (range) => {
    if (range === 'All Time') setTimeRange('long_term');
    if (range === 'Last 6 Months') setTimeRange('medium_term');
    if (range === 'Last 4 Weeks') setTimeRange('short_term');
  };

  // Function to add the marquee effect for overflowing text
  const addMarqueeEffect = () => {
    const titles = document.querySelectorAll('.artist-podium h3');
    titles.forEach(title => {
      if (title.scrollWidth > title.clientWidth) {
        title.classList.add('marquee');
      } else {
        title.classList.remove('marquee');
      }
    });
  };

  const top3Artists = topArtists.slice(0, 3);
  const otherArtists = topArtists.slice(3);

  return (
    <div className="top-artists-container">
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

      {topArtists.length === 0 ? (
        <p>No artists to display</p>
      ) : (
        <>
          <div className="artists-podium">
            {top3Artists.map((artist, index) => (
              <div
                key={artist.id}
                className={`artist-podium ${index === 0 ? 'first-place' : index === 1 ? 'second-place' : 'third-place'}`}
              >
                <img src={artist.images[0]?.url} alt={artist.name} />
                
                {/* Wrap title in marquee-wrapper to prevent overflow */}
                <div className='marquee-wrapper'>
                  <h3>{artist.name}</h3>
                </div>
              </div>
            ))}
          </div>

          <ol className="artists-top-50-list">
            {otherArtists.map((artist, index) => (
              <li key={artist.id}>
                <span className="artist-position">{index + 4}</span>
                <ArtistCard artist={artist} />
              </li>
            ))}
          </ol>
        </>
      )}
    </div>
  );
};

export default TopArtists;
