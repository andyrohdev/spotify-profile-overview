import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaSpotify, FaGithub } from 'react-icons/fa';
import { MdPerson, MdLibraryMusic, MdMusicNote, MdHistory, MdPlaylistPlay } from 'react-icons/md';
import './Sidebar.css';

export default function Sidebar() {
  const location = useLocation();

  return (
    <div className="sidebar">
      <div className="logo-container">
        {/* No green highlight for Spotify logo */}
        <Link to="/">
          <FaSpotify className="logo" />
        </Link>
      </div>

      {/* Sidebar Links */}
      <div className="sidebar-links">
        <Link to="/" className={location.pathname === '/' ? 'active' : ''}>
          <MdPerson className="icon" />
          <span className="text">Profile</span>
        </Link>
        <Link to="/tracks" className={location.pathname === '/tracks' ? 'active' : ''}>
          <MdMusicNote className="icon" />
          <span className="text">Top Tracks</span>
        </Link>
        <Link to="/artists" className={location.pathname === '/artists' ? 'active' : ''}>
          <MdLibraryMusic className="icon" />
          <span className="text">Top Artists</span>
        </Link>
        <Link to="/recent" className={location.pathname === '/recent' ? 'active' : ''}>
          <MdHistory className="icon" />
          <span className="text">Recent</span>
        </Link>
        <Link to="/playlists" className={location.pathname === '/playlists' ? 'active' : ''}>
          <MdPlaylistPlay className="icon" />
          <span className="text">Playlists</span>
        </Link>
      </div>

      {/* Portfolio and GitHub Links */}
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
