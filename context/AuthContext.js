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
                if (typeof window !== 'undefined') {

                    // 🔥 Attach JWT if exists
                    const storedJWT = localStorage.getItem('auth_jwt');
                    if (storedJWT) {
                        client.setJWT(storedJWT);
                    }

                    const url = new URL(window.location.href);
                    const userId = url.searchParams.get('userId');
                    const secret = url.searchParams.get('secret');

                    if (userId && secret) {
                        await account.createSession(userId, secret);

                        // 🔥 Create JWT after session
                        const jwt = await account.createJWT();
                        localStorage.setItem('auth_jwt', jwt.jwt);
                        client.setJWT(jwt.jwt);

                        url.searchParams.delete('userId');
                        url.searchParams.delete('secret');
                        window.history.replaceState({}, '', url.toString());
                    }
                }
            } catch (_) {
                setUser(null);
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

            // 🔥 Generate JWT for email login too
            const jwt = await account.createJWT();
            localStorage.setItem('auth_jwt', jwt.jwt);
            client.setJWT(jwt.jwt);

            await checkUser();
            return { success: true };
        } catch (error) {
            return { success: false, error: error.message };
        }
    };

    const logout = async () => {
        try {
            await account.deleteSession('current');
            localStorage.removeItem('auth_jwt'); // 🔥 clear JWT
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