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
    const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
    const REDIRECT_URI = window.location.hostname === 'localhost'
      ? import.meta.env.VITE_REDIRECT_URI
      : import.meta.env.VITE_PRODUCTION_REDIRECT_URI;
    const AUTH_ENDPOINT = import.meta.env.VITE_AUTH_ENDPOINT;
    const RESPONSE_TYPE = import.meta.env.VITE_RESPONSE_TYPE;
    const SCOPES = import.meta.env.VITE_SCOPES;
    
    const loginUrl = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&response_type=${RESPONSE_TYPE}&scope=${encodeURIComponent(SCOPES)}`;
    
    window.location.href = loginUrl;
  };

  const logout = () => {
    window.localStorage.removeItem('token');  // Remove the token
    window.localStorage.removeItem('isLoggedIn');  // Clear any login status
    window.location.reload();  // Reload to ensure the app returns to the login screen
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
