'use client';
import Navbar from '@/components/Navbar';
import Link from 'next/link';
import { useState } from 'react';
import { account } from '@/lib/appwrite';
import { useRouter } from 'next/navigation';
import ChatWidget from '@/components/ChatWidget';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleEmailLogin = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await account.createEmailPasswordSession(email, password);
            router.push('/products');
        } catch (err) {
            setError(err.message || 'Failed to login. Please check your credentials.');
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = () => {
        setLoading(true);
        account.createOAuth2Session(
            'google',
            `${window.location.origin}/products`,
            `${window.location.origin}/login`
        );
    };

    return (
        <div style={{ background: 'var(--background)', minHeight: '100vh', color: 'var(--text)' }}>
            <Navbar />

            <div style={{
                minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
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

                        <button
                            type="submit"
                            disabled={loading}
                            className="btn-primary"
                            style={{ width: '100%', marginTop: '10px', padding: '14px', fontSize: '15px', opacity: loading ? 0.7 : 1 }}>
                            {loading ? 'Authenticating...' : 'Sign In'}
                        </button>
                    </form>

                    <div style={{ textAlign: 'center', marginTop: '30px', position: 'relative' }}>
                        <hr style={{ border: 'none', borderTop: '1px solid var(--border)' }} />
                        <span style={{ position: 'absolute', top: '-10px', left: '50%', transform: 'translateX(-50%)', background: 'var(--surface)', padding: '0 10px', fontSize: '12px', color: 'var(--muted)', fontWeight: '700' }}>OR</span>
                    </div>

                    <button
                        onClick={handleGoogleLogin}
                        disabled={loading}
                        style={{
                            width: '100%', marginTop: '24px', background: 'transparent', border: '1px solid var(--border)',
                            borderRadius: '50px', padding: '12px', color: 'var(--text)', fontSize: '14px', fontWeight: '600',
                            cursor: 'pointer', transition: 'background 0.2s', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
                            opacity: loading ? 0.7 : 1
                        }} onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'} onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                        <svg width="18" height="18" viewBox="0 0 24 24"><path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" /><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" /><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" /><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" /></svg>
                        {loading ? 'Opening Google...' : 'Continue with Google'}
                    </button>

                    <div style={{ textAlign: 'center', marginTop: '24px', fontSize: '14px', color: 'var(--muted)' }}>
                        Don't have an account? <Link href="#" style={{ color: 'var(--blue)', textDecoration: 'none', fontWeight: '600' }}>Request Access</Link>
                    </div>
                </div>
            </div>

            <ChatWidget />
        </div>
    );
}
