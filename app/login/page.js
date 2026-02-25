'use client';
import Navbar from '@/components/Navbar';
import Link from 'next/link';
import { useState, useEffect, Suspense } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter, useSearchParams } from 'next/navigation';
import ChatWidget from '@/components/ChatWidget';

function LoginContent() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [localLoading, setLocalLoading] = useState(false);
    const { user, loading: authLoading, login } = useAuth();
    const router = useRouter();
    const searchParams = useSearchParams();
    const redirectTo = searchParams.get('redirect') || '/';

    useEffect(() => {
        if (!authLoading && user) {
            router.push(redirectTo);
        }
    }, [user, authLoading, router, redirectTo]);

    const handleEmailLogin = async (e) => {
        e.preventDefault();
        setError('');
        setLocalLoading(true);

        const res = await login(email, password);
        if (res.success) {
            router.push(redirectTo);
        } else {
            setError(res.error || 'Failed to login. Please check your credentials.');
            setLocalLoading(false);
        }
    };

    return (
        <div style={{ background: 'var(--background)', minHeight: '100vh', color: 'var(--text)' }}>
            <Navbar />

            <div style={{
                minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
                padding: '20px'
            }}>
                <div style={{
                    background: 'var(--surface)', border: '1px solid var(--border)',
                    borderRadius: '20px', padding: '40px', width: '100%', maxWidth: '400px',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
                }}>
                    <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                        <h1 style={{ fontSize: '28px', fontWeight: '800', letterSpacing: '-0.5px' }}>Welcome Back</h1>
                        <p style={{ color: 'var(--muted)', marginTop: '8px', fontSize: '14px' }}>Sign in to your ARKIS ecosystem account.</p>
                    </div>

                    {error && (
                        <div style={{
                            background: 'rgba(239, 68, 68, 0.1)',
                            border: '1px solid rgba(239, 68, 68, 0.2)',
                            color: '#ef4444',
                            padding: '12px',
                            borderRadius: '10px',
                            marginBottom: '20px',
                            fontSize: '13px',
                            textAlign: 'center'
                        }}>
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleEmailLogin} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <div>
                            <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>Email Address</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="you@example.com"
                                required
                                style={{
                                    width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)',
                                    borderRadius: '10px', padding: '12px 16px', color: 'var(--text)', fontSize: '15px',
                                    outline: 'none', transition: 'border-color 0.2s'
                                }} onFocus={e => e.target.style.borderColor = 'var(--blue)'} onBlur={e => e.target.style.borderColor = 'var(--border)'} />
                        </div>
                        <div>
                            <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                required
                                style={{
                                    width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)',
                                    borderRadius: '10px', padding: '12px 16px', color: 'var(--text)', fontSize: '15px',
                                    outline: 'none', transition: 'border-color 0.2s'
                                }} onFocus={e => e.target.style.borderColor = 'var(--blue)'} onBlur={e => e.target.style.borderColor = 'var(--border)'} />
                        </div>

                        <button type="submit" disabled={localLoading} className="btn-primary" style={{
                            width: '100%', padding: '14px', borderRadius: '10px', fontSize: '16px',
                            fontWeight: '700', cursor: localLoading ? 'not-allowed' : 'pointer', opacity: localLoading ? 0.7 : 1
                        }}>
                            {localLoading ? 'Signing in...' : 'Sign In'}
                        </button>
                    </form>

                    <div style={{ marginTop: '24px', textAlign: 'center' }}>
                        <p style={{ fontSize: '14px', color: 'var(--muted)' }}>
                            Don't have an account? <Link href="/#download" style={{ color: 'var(--blue)', fontWeight: '600', textDecoration: 'none' }}>Get Started</Link>
                        </p>
                    </div>
                </div>
            </div>

            <ChatWidget />
        </div>
    );
}

export default function Login() {
    return (
        <Suspense fallback={<div style={{ background: 'var(--background)', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><div className="spinner"></div></div>}>
            <LoginContent />
        </Suspense>
    );
}
