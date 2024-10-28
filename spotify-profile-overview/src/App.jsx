import React, { useEffect } from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import { useAuth } from './components/AuthProvider';
import Profile from './components/Profile';
import NotFound from './components/NotFound';
import Callback from './components/Callback';
import LandingPage from './components/LandingPage';
import Sidebar from './components/Sidebar';
import TopArtists from './components/TopArtists';
import TopTracks from './components/TopTracks';
import RecentTracks from './components/RecentTracks';  // Import the RecentTracks component
import ArtistDetails from './components/ArtistDetails';  // Import the ArtistDetails component
import './App.css';

export default function App() {
  const { token } = useAuth();

  useEffect(() => {
    const hash = window.location.hash;
    const isLocalhost = window.location.hostname === 'localhost';

    if (hash.includes('access_token') && !window.location.href.includes('/callback')) {
      const newUrl = isLocalhost
        ? `${window.location.origin}/#/callback${hash}`
        : `${window.location.origin}/spotify-profile-overview/#/callback${hash}`;

      console.log('Redirecting to:', newUrl);
      window.location.assign(newUrl);
    }
  }, []);

  useEffect(() => {
    const isLocalhost = window.location.hostname === 'localhost';
    const isLoggedIn = window.localStorage.getItem('isLoggedIn');

    if (token && !isLoggedIn) {
      console.log('Token found. Redirecting to profile...');
      window.localStorage.setItem('isLoggedIn', 'true');
      
      const homeUrl = isLocalhost
        ? '/#/'
        : '/spotify-profile-overview/#/';

      window.location.assign(homeUrl);
    }
  }, [token]);

  return (
    <Router>
      <div className={`app-container ${token ? '' : 'no-sidebar'}`}>
        {token && <Sidebar />}
        <div className="main-content">
          <Routes>
            <Route path="/" element={token ? <Profile /> : <LandingPage />} />
            <Route path="/artists" element={token ? <TopArtists /> : <LandingPage />} />
            <Route path="/tracks" element={token ? <TopTracks /> : <LandingPage />} />
            <Route path="/recent" element={token ? <RecentTracks /> : <LandingPage />} />
            <Route path="/artist/:id" element={token ? <ArtistDetails /> : <LandingPage />} /> {/* Artist Detail Route */}
            <Route path="/callback" element={<Callback />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}
