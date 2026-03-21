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
    checkUser();
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

      const data = await getMe();
      setUser(data?.user || null);
    } catch (_) {
      setUser(null);
    } finally {
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