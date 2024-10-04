import React, { createContext, useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';  // Import PropTypes for prop validation

// Create a context to hold authentication state
const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = window.localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const login = () => {
    const CLIENT_ID = '3dbc0c6e8950478687663a14bae7adea';
    const REDIRECT_URI = 'https://andyrohdev.github.io/spotify-profile-overview/#/callback'; // GitHub Pages URL with hash
    const AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize';
    const RESPONSE_TYPE = 'token';
    const SCOPES = 'user-read-private user-read-email';
  
    const loginUrl = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPES}`;
    console.log('Login URL:', loginUrl);
    window.location.href = loginUrl;
  };

  const logout = () => {
    setToken(null);
    window.localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ token, setToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// PropTypes validation
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// Custom hook to access the AuthContext
export function useAuth() {
  return useContext(AuthContext);
}
