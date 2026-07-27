'use client';
import Navbar from '@/components/Navbar';
import ChatWidget from '@/components/ChatWidget';
import Footer from '@/components/Footer';
import { Suspense, useEffect, useMemo, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter, useSearchParams } from 'next/navigation';

function NotifyContent() {
    const { user, loading: authLoading } = useAuth();
    const router = useRouter();
    const searchParams = useSearchParams();

    const product = (searchParams.get('product') || '').toLowerCase();
    
    const theme = useMemo(() => {
        if (product === 'rk-ai-home') return { primary: '#ec4899', gradient: 'linear-gradient(135deg, #ec4899, #be185d)', glow: 'rgba(236,72,153,0.4)', bgGlow: 'rgba(236,72,153,0.05)' };
        if (product === 'lumina-os') return { primary: '#8b5cf6', gradient: 'linear-gradient(135deg, #8b5cf6, #6d28d9)', glow: 'rgba(139,92,246,0.4)', bgGlow: 'rgba(139,92,246,0.05)' };
        if (product === 'malus') return { primary: '#10B981', gradient: 'linear-gradient(135deg, #10B981, #059669)', glow: 'rgba(16,185,129,0.4)', bgGlow: 'rgba(16,185,129,0.05)' };
        if (product === 'rk-ai-desktop') return { primary: '#4f9cf9', gradient: 'linear-gradient(135deg, #4f9cf9, #3b82f6)', glow: 'rgba(79,156,249,0.4)', bgGlow: 'rgba(79,156,249,0.05)' };
        if (product === 'light-key') return { primary: '#eab308', gradient: 'linear-gradient(135deg, #eab308, #ca8a04)', glow: 'rgba(234,179,8,0.4)', bgGlow: 'rgba(234,179,8,0.05)' };
        return { primary: '#9b59f5', gradient: 'linear-gradient(135deg, #9b59f5, #7c3aed)', glow: 'rgba(155,89,245,0.4)', bgGlow: 'rgba(155,89,245,0.05)' };
    }, [product]);

    const productLabel = useMemo(() => {
        if (product === 'rk-ai-home') return 'RK AI Home';
        if (product === 'light-key') return 'Light Key';
        if (product === 'lumina-os') return 'Lumina OS';
        if (product === 'rk-ai-desktop') return 'RK AI Desktop';
        if (product === 'malus') return 'Malus';
        return 'Rexycore';
    }, [product]);

    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        if (!authLoading && !user) {
            const qp = product ? `?product=${encodeURIComponent(product)}` : '';
            router.push(`/login?redirect=${encodeURIComponent(`/notify${qp}`)}`);
        }
        if (!authLoading && user) {
            setEmail((prev) => prev || user.email || '');
        }
    }, [authLoading, user, router, product]);

    const submit = (e) => {
        e.preventDefault();
        try {
            const raw = localStorage.getItem('rexycore_notify') || '[]';
            const list = JSON.parse(raw);
            list.unshift({
                id: `${Date.now()}`,
                product: productLabel,
                productKey: product || null,
                email,
                createdAt: new Date().toISOString(),
            });
            localStorage.setItem('rexycore_notify', JSON.stringify(list));
        } catch (_) { }
        setSubmitted(true);
    };

    return (
        <div style={{ background: 'var(--void)', minHeight: '100vh', color: '#fff', position: 'relative', overflowX: 'hidden' }}>
            <div className="noise" aria-hidden />
            <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', background: `radial-gradient(circle at 50% 10%, ${theme.bgGlow} 0%, transparent 60%)` }} />
            <Navbar />
            
            <div style={{ padding: '140px 5% 80px', maxWidth: '600px', margin: '0 auto', position: 'relative', zIndex: 10 }}>
                
                <div style={{ textAlign: 'center', marginBottom: '50px', position: 'relative', zIndex: 1 }}>
                    <div className="hero-eyebrow float-anim" style={{ margin: '0 auto 16px', color: theme.primary, border: `1px solid ${theme.glow}` }}>
                        <span className="pulse" style={{ background: theme.primary }} /> Product Alerts
                    </div>
                    <h1 style={{ fontSize: 'clamp(42px, 7vw, 80px)', fontWeight: '900', letterSpacing: '-2px', lineHeight: '1.05' }}>
                        Notify <span style={{ background: theme.gradient, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Me</span>
                    </h1>
                    <p style={{ color: 'var(--subtext)', fontSize: '18px', marginTop: '20px', lineHeight: '1.7' }}>
                        Get an email when {productLabel} becomes available.
                    </p>
                </div>

                {submitted ? (
                    <div style={{
                        background: 'rgba(255,255,255,0.02)', border: `1px solid var(--glass-border)`,
                        borderRadius: '24px', padding: '60px 40px', textAlign: 'center', boxShadow: '0 20px 40px rgba(0,0,0,0.4)', backdropFilter: 'blur(20px)'
                    }}>
                        <div style={{
                            width: '80px', height: '80px', borderRadius: '50%',
                            background: theme.bgGlow, border: `1px solid ${theme.glow}`,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            margin: '0 auto 24px', boxShadow: `0 0 30px ${theme.bgGlow}`
                        }}>
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={theme.primary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M22 17H2a3 3 0 0 0 3-3V9a7 7 0 0 1 14 0v5a3 3 0 0 0 3 3zm-8.27 4a2 2 0 0 1-3.46 0"></path>
                            </svg>
                        </div>
                        <h2 style={{ fontSize: '28px', fontWeight: '900', marginBottom: '12px' }}>Notification Active</h2>
                        <p style={{ color: 'var(--subtext)', fontSize: '15px' }}>
                            We'll alert you at <strong>{email}</strong> the moment {productLabel} is ready.
                        </p>
                        <button onClick={() => router.push('/products')} className="btn-primary" style={{ marginTop: '30px', padding: '14px 28px', borderRadius: '99px', background: theme.gradient, border: 'none', boxShadow: `0 0 20px ${theme.bgGlow}` }}>
                            Explore More Products
                        </button>
                    </div>
                ) : (
                    <form onSubmit={submit} style={{
                        background: 'rgba(255,255,255,0.02)', border: `1px solid var(--glass-border)`,
                        borderRadius: '24px', padding: '48px', position: 'relative', zIndex: 1,
                        boxShadow: '0 20px 40px rgba(0,0,0,0.4)', backdropFilter: 'blur(20px)'
                    }}>
                        <div>
                            <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: 'var(--subtext)', textTransform: 'uppercase', marginBottom: '10px', letterSpacing: '1px' }}>Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                style={{ 
                                    width: '100%', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--glass-border)', 
                                    borderRadius: '16px', padding: '18px 24px', color: '#fff', outline: 'none',
                                    fontSize: '16px', transition: 'all 0.3s ease'
                                }}
                                onFocus={e => e.target.style.borderColor = theme.primary}
                                onBlur={e => e.target.style.borderColor = 'var(--glass-border)'}
                            />
                        </div>
                        <button
                            type="submit"
                            style={{ 
                                marginTop: '32px', padding: '18px 48px', borderRadius: '999px', cursor: 'pointer',
                                background: theme.gradient, color: '#fff', border: 'none',
                                fontSize: '16px', fontWeight: '800', boxShadow: `0 10px 30px ${theme.glow}`,
                                transition: 'all 0.3s ease'
                            }}
                            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = `0 15px 40px ${theme.glow}`; }}
                            onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = `0 10px 30px ${theme.glow}`; }}
                        >
                            Enable Notifications →
                        </button>
                    </form>
                )}
            </div>
            <Footer />
            <ChatWidget />
        </div>
    );
}

export default function NotifyPage() {
    return (
        <Suspense fallback={<div style={{ background: 'var(--void)', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><div className="spinner"></div></div>}>
            <NotifyContent />
        </Suspense>
    );
}
