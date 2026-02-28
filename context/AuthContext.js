'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { account } from '@/lib/appwrite';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const init = async () => {
            try {
                if (typeof window !== 'undefined') {
                    const url = new URL(window.location.href);
                    const userId = url.searchParams.get('userId');
                    const secret = url.searchParams.get('secret');

                    if (userId && secret) {
                        await account.createSession(userId, secret);

                        url.searchParams.delete('userId');
                        url.searchParams.delete('secret');
                        window.history.replaceState({}, '', url.toString());
                    }
                }
            } catch (_) {
            } finally {
                await checkUser();
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
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    const loginWithGoogle = (redirectTo = '/') => {
        const origin = window.location.origin.replace(/\/$/, '');
        const successUrl = `${origin}${redirectTo.startsWith('/') ? redirectTo : `/${redirectTo}`}`;
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