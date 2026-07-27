'use client';
import Navbar from '@/components/Navbar';
import ChatWidget from '@/components/ChatWidget';
import Footer from '@/components/Footer';
import { Suspense, useEffect, useMemo, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { StarField, Card3D, staggerContainer, fadeUp, textVariant } from '@/components/SpaceUI';

function NotifyContent() {
    const { user, loading: authLoading } = useAuth();
    const router = useRouter();
    const searchParams = useSearchParams();

    const product = (searchParams.get('product') || '').toLowerCase();
    
    const theme = useMemo(() => {
        if (product === 'rk-ai-home') return { primary: '#ec4899', gradient: 'linear-gradient(135deg, #ec4899, #be185d)', glow: 'rgba(236,72,153,0.3)', bgGlow: 'rgba(236,72,153,0.1)' };
        if (product === 'lumina-os') return { primary: '#8b5cf6', gradient: 'linear-gradient(135deg, #8b5cf6, #6d28d9)', glow: 'rgba(139,92,246,0.3)', bgGlow: 'rgba(139,92,246,0.1)' };
        if (product === 'malus') return { primary: '#10B981', gradient: 'linear-gradient(135deg, #10B981, #059669)', glow: 'rgba(16,185,129,0.3)', bgGlow: 'rgba(16,185,129,0.1)' };
        if (product === 'rk-ai-desktop') return { primary: '#4f9cf9', gradient: 'linear-gradient(135deg, #4f9cf9, #3b82f6)', glow: 'rgba(79,156,249,0.3)', bgGlow: 'rgba(79,156,249,0.1)' };
        if (product === 'light-key') return { primary: '#eab308', gradient: 'linear-gradient(135deg, #eab308, #ca8a04)', glow: 'rgba(234,179,8,0.3)', bgGlow: 'rgba(234,179,8,0.1)' };
        return { primary: '#9b59f5', gradient: 'linear-gradient(135deg, #9b59f5, #7c3aed)', glow: 'rgba(155,89,245,0.3)', bgGlow: 'rgba(155,89,245,0.1)' };
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
        <div style={{ background: '#010104', minHeight: '100vh', color: '#fff', position: 'relative', overflowX: 'hidden' }}>
            <StarField />
            <div className="noise" aria-hidden />
            <Navbar />
            
            <div style={{ padding: '140px 5% 80px', maxWidth: '600px', margin: '0 auto', position: 'relative', zIndex: 10 }}>
                <motion.div variants={staggerContainer(0.1, 0.2)} initial="hidden" animate="show">
                    <div style={{ textAlign: 'center', marginBottom: '50px' }}>
                        <motion.div variants={fadeUp} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 16px', borderRadius: 99, background: theme.bgGlow, border: `1px solid ${theme.glow}`, color: theme.primary, fontSize: 12, fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 28 }}>
                            <motion.span animate={{ opacity: [1, 0.3, 1] }} transition={{ repeat: Infinity, duration: 2 }} style={{ width: 8, height: 8, borderRadius: '50%', background: theme.primary, boxShadow: `0 0 10px ${theme.primary}` }} /> Product Alerts
                        </motion.div>
                        <motion.h1 variants={textVariant(0.1)} style={{ fontSize: 'clamp(42px, 7vw, 80px)', fontWeight: '900', letterSpacing: '-2px', lineHeight: '1.05' }}>
                            Notify <span style={{ background: theme.gradient, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Me</span>
                        </motion.h1>
                        <motion.p variants={fadeUp} style={{ color: 'rgba(255,255,255,0.5)', fontSize: '18px', marginTop: '20px', lineHeight: '1.7' }}>
                            Get an email when {productLabel} becomes available.
                        </motion.p>
                    </div>

                    <motion.div variants={fadeUp}>
                        {submitted ? (
                            <Card3D orbColor={theme.glow} style={{ padding: '60px 40px', textAlign: 'center' }}>
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
                                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '15px' }}>
                                    We'll alert you at <strong>{email}</strong> the moment {productLabel} is ready.
                                </p>
                                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => router.push('/products')} style={{ marginTop: '30px', padding: '16px 32px', borderRadius: '99px', background: theme.gradient, border: 'none', color: '#fff', fontSize: 16, fontWeight: 800, cursor: 'pointer' }}>
                                    Explore More Products
                                </motion.button>
                            </Card3D>
                        ) : (
                            <Card3D orbColor={theme.glow} style={{ padding: '48px' }}>
                                <form onSubmit={submit}>
                                    <div>
                                        <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', marginBottom: '10px', letterSpacing: '1px' }}>Email</label>
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                            style={{ 
                                                width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', 
                                                borderRadius: '16px', padding: '18px 24px', color: '#fff', outline: 'none',
                                                fontSize: '16px', transition: 'all 0.3s ease'
                                            }}
                                            onFocus={e => e.target.style.borderColor = theme.primary}
                                            onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                                        />
                                    </div>
                                    <motion.button
                                        whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                                        type="submit"
                                        style={{ 
                                            marginTop: '32px', padding: '18px 48px', borderRadius: '999px', cursor: 'pointer',
                                            background: theme.gradient, color: '#fff', border: 'none', width: '100%',
                                            fontSize: '16px', fontWeight: '800'
                                        }}
                                    >
                                        Enable Notifications →
                                    </motion.button>
                                </form>
                            </Card3D>
                        )}
                    </motion.div>
                </motion.div>
            </div>
            <Footer />
            <ChatWidget />
        </div>
    );
}

export default function NotifyPage() {
    return (
        <Suspense fallback={<div style={{ background: '#010104', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><div className="spinner"></div></div>}>
            <NotifyContent />
        </Suspense>
    );
}
