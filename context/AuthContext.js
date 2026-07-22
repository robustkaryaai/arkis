'use client';
// context/AuthContext.js
// Drop-in replacement — same API as before (user, loading, login, loginWithGoogle, logout, checkUser)
// but now talks to your backend instead of Appwrite directly

import { createContext, useContext, useEffect, useState } from 'react';
import {
  loginWithGoogle as apiLoginWithGoogle,
  logout as apiLogout,
  getMe,
  getStoredToken,
} from '@/lib/api';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleAuthChanged = () => {
      setLoading(true);
      checkUser();
    };

    const handleStorage = (event) => {
      if (event.key === 'rk_web_token' || event.key === 'rk_web_user_id') {
        handleAuthChanged();
      }
    };

    window.addEventListener('rk-auth-changed', handleAuthChanged);
    window.addEventListener('storage', handleStorage);
    checkUser();

    return () => {
      window.removeEventListener('rk-auth-changed', handleAuthChanged);
      window.removeEventListener('storage', handleStorage);
    };
  }, []);

  const checkUser = async () => {
    try {
      // Only attempt if we have a stored token
      const token = getStoredToken();
      if (!token) {
        setUser(null);
        setLoading(false);
        return;
      }

      // 1. Instantly load from cache for fast UI (Stale-While-Revalidate)
      const cachedUser = localStorage.getItem('rk_web_user_data');
      if (cachedUser) {
        try {
          setUser(JSON.parse(cachedUser));
        } catch (e) {
          // ignore parse errors
        }
      }
      // We can stop blocking the UI loading state now since we have *something* or nothing
      setLoading(false);

      // 2. Always ping the backend to refresh the data (in case subscription changed)
      try {
        const userData = await getMe();
        if (userData) {
          localStorage.setItem('rk_web_user_data', JSON.stringify(userData));
          setUser(userData);
        } else if (!cachedUser) {
           setUser(null);
        }
      } catch (err) {
        console.warn('Backend ping failed (might be asleep), keeping local cache.');
      }
    } catch (_) {
      setUser(null);
      setLoading(false);
    }
  };

  // Email/password login still proxies through your existing /desktop/login route
  const login = async (email, password) => {
    try {
      const BASE = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://rk-ai-backend.onrender.com';
      const res = await fetch(`${BASE}/desktop/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (!res.ok) return { success: false, error: data.error || 'Login failed' };

      // data is an Appwrite session — store the userId + session $id as token
      const { storeSession } = await import('@/lib/api');
      storeSession(data.$id, data.userId);

      await checkUser();
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  const loginWithGoogle = (redirectTo = '/') => {
    apiLoginWithGoogle(redirectTo);
  };

  const logout = async () => {
    await apiLogout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, loginWithGoogle, logout, checkUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);