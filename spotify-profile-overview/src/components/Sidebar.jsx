import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaSpotify, FaGithub } from 'react-icons/fa';
import { MdPerson, MdLibraryMusic, MdMusicNote, MdHistory, MdPlaylistPlay } from 'react-icons/md';
import './Sidebar.css';

export default function Sidebar() {
  const location = useLocation();
  const [hoveredIndex, setHoveredIndex] = useState(null); // To track hover state

  const handleMouseEnter = (index) => {
    setHoveredIndex(index); // Set hovered index on mouse enter
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null); // Reset hover state on mouse leave
  };

  const links = [
    { to: '/', icon: <MdPerson className="icon" />, label: 'Profile' },
    { to: '/tracks', icon: <MdMusicNote className="icon" />, label: 'Top Tracks' },
    { to: '/artists', icon: <MdLibraryMusic className="icon" />, label: 'Top Artists' },
    { to: '/recent', icon: <MdHistory className="icon" />, label: 'Recent' },
    { to: '/playlists', icon: <MdPlaylistPlay className="icon" />, label: 'Playlists' },
  ];

  return (
    <div className="sidebar">
      <div className="logo-container">
        <Link to="/">
          <FaSpotify className="logo" />
        </Link>
      </div>

      <div className="sidebar-links">
        {links.map((link, index) => (
          <Link
            key={index}
            to={link.to}
            className={location.pathname === link.to || hoveredIndex === index ? 'active' : ''}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
          >
            {link.icon}
            <span className="text">{link.label}</span>
          </Link>
        ))}
      </div>

      <div className="sidebar-bottom">
        <a href="https://andyrohdev.github.io/portfolio-website/" target="_blank" rel="noopener noreferrer">
          <MdPerson className="portfolio-icon" />
          <span className="portfolio-label">Portfolio</span>
        </a>
        <a href="https://github.com/andyrohdev/spotify-profile-overview" target="_blank" rel="noopener noreferrer">
          <FaGithub className="github-icon" />
        </a>
      </div>
    </div>
  );
}
