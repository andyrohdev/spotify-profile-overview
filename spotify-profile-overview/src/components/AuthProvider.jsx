import React, { createContext, useState, useEffect, useContext } from 'react';

// Create a context to hold authentication state
const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);

  useEffect(() => {
    // Get the token from localStorage if it exists
    const storedToken = window.localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const login = () => {
    const CLIENT_ID = '3dbc0c6e8950478687663a14bae7adea';  // Your actual Client ID
    const REDIRECT_URI = 'https://andyrohdev.github.io/spotify-profile-overview/callback';  // GitHub Pages URL
    const AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize';
    const RESPONSE_TYPE = 'token';  // Ensure this is correct
    const SCOPES = 'user-read-private user-read-email';
  
    // Build the full login URL and log it
    const loginUrl = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPES}`;
    console.log('Login URL:', loginUrl);
  
    // Redirect to Spotify's login page
    window.location.href = loginUrl;
  };
  
  const logout = () => {
    setToken(null);  // Clear the token from state
    window.localStorage.removeItem('token');  // Remove token from localStorage
  };

  return (
    <AuthContext.Provider value={{ token, setToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to access the AuthContext
export function useAuth() {
  return useContext(AuthContext);
}
