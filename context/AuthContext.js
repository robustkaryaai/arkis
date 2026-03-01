'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { account, client } from '@/lib/appwrite';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const init = async () => {
            try {
                await checkUser();
            } catch (_) {
            }
        };
        init();
    }, []);

    const checkUser = async () => {
        try {
            const session = await account.get();
            setUser(session);
        } catch (error) {
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    const login = async (email, password) => {
        try {
            await account.createEmailPasswordSession(email, password);
            await checkUser();
            return { success: true };
        } catch (error) {
            return { success: false, error: error.message };
        }
    };

    const logout = async () => {
        try {
            await account.deleteSession('current');
            setUser(null);
            try { window.localStorage.removeItem('appwrite_session_id'); } catch (_) {}
            client.setHeader('X-Appwrite-Session', '');
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    const loginWithGoogle = (redirectTo = '/') => {
        const origin = window.location.origin.replace(/\/$/, '');
        const successUrl = `${origin}/auth/callback?redirect=${encodeURIComponent(redirectTo.startsWith('/') ? redirectTo : `/${redirectTo}`)}`;
        const failureUrl = `${origin}/login?error=oauth_failed`;
        account.createOAuth2Session('google', successUrl, failureUrl);
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, loginWithGoogle, logout, checkUser }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
