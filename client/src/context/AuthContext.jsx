import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { API_BASE_URL } from '../services/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(() => localStorage.getItem('societix_access_token'));
  const [isLoading, setIsLoading] = useState(true);

  // Fetch current user details if access token exists
  const fetchMe = useCallback(async (token) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/v1/auth/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        const data = await res.json();
        setUser(data.data.user);
      } else {
        // Token expired or invalid
        localStorage.removeItem('societix_access_token');
        localStorage.removeItem('societix_refresh_token');
        setAccessToken(null);
        setUser(null);
      }
    } catch (err) {
      console.error('[AuthContext] Failed to verify token:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (accessToken) {
      fetchMe(accessToken);
    } else {
      setIsLoading(false);
    }
  }, [accessToken, fetchMe]);

  // Sign In action
  const login = async (identifier, password) => {
    const res = await fetch(`${API_BASE_URL}/api/v1/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ identifier, password }),
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || 'Failed to sign in.');
    }

    localStorage.setItem('societix_access_token', data.data.accessToken);
    localStorage.setItem('societix_refresh_token', data.data.refreshToken);
    setAccessToken(data.data.accessToken);
    setUser(data.data.user);
    return data.data.user;
  };

  // Sign Up / Register action
  const register = async (formData) => {
    const res = await fetch(`${API_BASE_URL}/api/v1/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    if (!res.ok) {
      const errorMsg = data.errors?.length
        ? data.errors.map((e) => e.message).join(' ')
        : data.message || 'Registration failed.';
      throw new Error(errorMsg);
    }

    localStorage.setItem('societix_access_token', data.data.accessToken);
    localStorage.setItem('societix_refresh_token', data.data.refreshToken);
    setAccessToken(data.data.accessToken);
    setUser(data.data.user);
    return data.data.user;
  };

  // Sign Out action
  const logout = async () => {
    try {
      if (accessToken) {
        await fetch(`${API_BASE_URL}/api/v1/auth/logout`, {
          method: 'POST',
          headers: { Authorization: `Bearer ${accessToken}` },
        });
      }
    } catch (err) {
      // Ignore network errors on logout
    } finally {
      localStorage.removeItem('societix_access_token');
      localStorage.removeItem('societix_refresh_token');
      setAccessToken(null);
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        accessToken,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
        refreshMe: () => fetchMe(accessToken),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
