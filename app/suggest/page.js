'use client';
import { useState, useEffect, useMemo, Suspense } from 'react';
import Navbar from '@/components/Navbar';
import ChatWidget from '@/components/ChatWidget';
import Footer from '@/components/Footer';
import { useSearchParams } from 'next/navigation';

function SuggestContent() {
    const searchParams = useSearchParams();
    const product = (searchParams.get('product') || '').toLowerCase();
    
    const theme = useMemo(() => {
        if (product === 'rk-ai-home') return { primary: '#ec4899', gradient: 'linear-gradient(135deg, #ec4899, #be185d)', glow: 'rgba(236,72,153,0.4)', bgGlow: 'rgba(236,72,153,0.05)' };
        if (product === 'lumina-os') return { primary: '#22c55e', gradient: 'linear-gradient(135deg, #22c55e, #16a34a)', glow: 'rgba(34,197,94,0.4)', bgGlow: 'rgba(34,197,94,0.05)' };
        if (product === 'rk-ai-desktop') return { primary: '#4f9cf9', gradient: 'linear-gradient(135deg, #4f9cf9, #3b82f6)', glow: 'rgba(79,156,249,0.4)', bgGlow: 'rgba(79,156,249,0.05)' };
        if (product === 'light-key') return { primary: '#eab308', gradient: 'linear-gradient(135deg, #eab308, #ca8a04)', glow: 'rgba(234,179,8,0.4)', bgGlow: 'rgba(234,179,8,0.05)' };
        return { primary: '#9b59f5', gradient: 'linear-gradient(135deg, #9b59f5, #7c3aed)', glow: 'rgba(155,89,245,0.4)', bgGlow: 'rgba(155,89,245,0.05)' };
    }, [product]);

    const productName = useMemo(() => {
        if (product === 'rk-ai-home') return 'RK AI Home';
        if (product === 'lumina-os') return 'Lumina OS';
        if (product === 'rk-ai-desktop') return 'RK AI Desktop';
        if (product === 'light-key') return 'Light Key';
        return 'RK AI';
    }, [product]);

    const [form, setForm] = useState({ name: '', email: '', feature: '', impact: '' });
    const [sent, setSent] = useState(false);

    useEffect(() => {
        const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, observerOptions);
        document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        window.location.href = `mailto:rkai.official@gmail.com?subject=Feature Request: ${encodeURIComponent(form.feature)}&body=${encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\nProduct: ${productName}\n\nFeature: ${form.feature}\n\nExpected Impact:\n${form.impact}`)}`;
        setSent(true);
    };

    return (
        <div style={{ background: 'var(--background)', color: 'var(--text)', minHeight: '100vh', overflowX: 'hidden' }}>
            <Navbar />

            <section className="hero" style={{ minHeight: '50vh', paddingTop: '140px', paddingBottom: '40px', textAlign: 'center', position: 'relative' }}>
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '800px', height: '800px', background: `radial-gradient(circle, ${theme.bgGlow} 0%, transparent 70%)`, pointerEvents: 'none' }} />
                
                <div style={{ maxWidth: '800px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
                    <div className="badge float-anim" style={{ margin: '0 auto 16px', color: theme.primary, border: `1px solid ${theme.glow}` }}>
                        <span className="dot" style={{ background: theme.primary }} /> Shape the Future
                    </div>
                    <h1 style={{ fontSize: 'clamp(42px,7vw,80px)', lineHeight: '1.05', fontWeight: '900', letterSpacing: '-2px' }}>
                        Suggest a<br />
                        <span style={{ background: theme.gradient, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Feature.</span>
                    </h1>
                    <p style={{ fontSize: '1.2rem', color: 'var(--muted)', marginTop: '24px', lineHeight: '1.7' }}>
                        Your ideas power {productName}. Tell us what you want to see built next.
                    </p>
                </div>
            </section>

            <section style={{ maxWidth: '800px', margin: '0 auto', padding: '40px 5% 100px', position: 'relative', zIndex: 1 }}>
                <div className="reveal" style={{ transition: 'all 0.6s ease', opacity: 1, transform: 'none' }}>
                    {sent ? (
                        <div style={{ textAlign: 'center', padding: '80px 40px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '32px' }}>
                            <div style={{ fontSize: '72px', marginBottom: '24px' }}>🚀</div>
                            <h2 style={{ fontSize: '32px', fontWeight: '800', marginBottom: '16px' }}>Idea submitted!</h2>
                            <p style={{ color: 'var(--muted)', fontSize: '16px', lineHeight: '1.7', maxWidth: '400px', margin: '0 auto' }}>
                                Your email client should open. The engineering team reads every submission for {productName}.
                            </p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} style={{ 
                            display: 'flex', flexDirection: 'column', gap: '28px', 
                            background: 'var(--surface)', border: '1px solid var(--border)', 
                            padding: '48px', borderRadius: '32px',
                            boxShadow: '0 20px 40px rgba(0,0,0,0.4)' 
                        }}>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
                                {[
                                    { label: 'Your Name', key: 'name', type: 'text', placeholder: 'Tony Stark' },
                                    { label: 'Email Address', key: 'email', type: 'email', placeholder: 'you@example.com' },
                                ].map(({ label, key, type, placeholder }) => (
                                    <div key={key} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                        <label style={{ fontSize: '13px', fontWeight: '700', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>{label}</label>
                                        <input type={type} required placeholder={placeholder} value={form[key]}
                                            onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                                            style={{ 
                                                background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', 
                                                borderRadius: '16px', padding: '16px 20px', color: 'var(--text)', 
                                                fontFamily: 'inherit', fontSize: '15px', outline: 'none',
                                                transition: 'all 0.3s ease' 
                                            }}
                                            onFocus={e => e.target.style.borderColor = theme.primary}
                                            onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                                        />
                                    </div>
                                ))}
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                <label style={{ fontSize: '13px', fontWeight: '700', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>Feature Idea</label>
                                <input type="text" required placeholder="e.g. Integrate with smart blinds" value={form.feature}
                                    onChange={e => setForm(f => ({ ...f, feature: e.target.value }))}
                                    style={{ 
                                        background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', 
                                        borderRadius: '16px', padding: '16px 20px', color: 'var(--text)', 
                                        fontFamily: 'inherit', fontSize: '15px', outline: 'none',
                                        transition: 'all 0.3s ease' 
                                    }}
                                    onFocus={e => e.target.style.borderColor = theme.primary}
                                    onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                                />
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                <label style={{ fontSize: '13px', fontWeight: '700', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>How would this impact your daily life?</label>
                                <textarea required rows={6} placeholder="Tell us how you would use it..." value={form.impact}
                                    onChange={e => setForm(f => ({ ...f, impact: e.target.value }))}
                                    style={{ 
                                        background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', 
                                        borderRadius: '16px', padding: '16px 20px', color: 'var(--text)', 
                                        fontFamily: 'inherit', fontSize: '15px', outline: 'none', resize: 'vertical',
                                        transition: 'all 0.3s ease' 
                                    }}
                                    onFocus={e => e.target.style.borderColor = theme.primary}
                                    onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                                />
                            </div>
                            <button type="submit" 
                                style={{ 
                                    alignSelf: 'flex-start', cursor: 'pointer', padding: '18px 48px',
                                    background: theme.gradient, color: '#fff', border: 'none',
                                    borderRadius: '999px', fontSize: '16px', fontWeight: '800',
                                    boxShadow: `0 10px 30px ${theme.glow}`, transition: 'all 0.3s ease'
                                }}
                                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = `0 15px 40px ${theme.glow}`; }}
                                onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = `0 10px 30px ${theme.glow}`; }}
                            >
                                Submit Idea →
                            </button>
                        </form>
                    )}
                </div>
            </section>

            <Footer />
            <ChatWidget />
        </div>
    );
}

export default function Suggest() {
    return (
        <Suspense fallback={<div style={{ minHeight: '100vh', background: 'var(--background)' }} />}>
            <SuggestContent />
        </Suspense>
    );
}
