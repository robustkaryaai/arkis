'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { account, client } from '@/lib/appwrite';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const loadUser = async () => {
        try {
            const u = await account.get();
            setUser(u);
        } catch {
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const init = async () => {
            try {
                if (typeof window !== 'undefined') {

                    // Attach JWT if stored
                    const stored = localStorage.getItem('auth_jwt');
                    if (stored) client.setJWT(stored);

                    const url = new URL(window.location.href);
                    const userId = url.searchParams.get('userId');
                    const secret = url.searchParams.get('secret');

                    // OAuth redirect session creation (if applicable)
                    if (userId && secret) {
                        await account.createSession(userId, secret);

                        const jwt = await account.createJWT();
                        localStorage.setItem('auth_jwt', jwt.jwt);
                        client.setJWT(jwt.jwt);

                        url.searchParams.delete('userId');
                        url.searchParams.delete('secret');
                        window.history.replaceState({}, '', url.toString());
                    }
                }
            } catch {}

            await loadUser();
        };

        init();
    }, []);

    const login = async (email, password) => {
        try {
            await account.createEmailPasswordSession(email, password);

            const jwt = await account.createJWT();
            localStorage.setItem('auth_jwt', jwt.jwt);
            client.setJWT(jwt.jwt);

            await loadUser();
            return { success: true };
        } catch (e) {
            return { success: false, error: e.message };
        }
    };

    const logout = async () => {
        try {
            await account.deleteSession('current');
        } finally {
            localStorage.removeItem('auth_jwt');
            client.setJWT('');
            setUser(null);
        }
    };

    const loginWithGoogle = (redirectTo = '/') => {
        const origin = window.location.origin.replace(/\/$/, '');
        const successUrl = `${origin}${redirectTo.startsWith('/') ? redirectTo : `/${redirectTo}`}`;
        const failureUrl = `${origin}/login?error=oauth_failed`;

        account.createOAuth2Session('google', successUrl, failureUrl);
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, loginWithGoogle, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);