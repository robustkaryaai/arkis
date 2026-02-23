'use client';
import Link from 'next/link';
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import ChatWidget from '@/components/ChatWidget';

// ─── Tier data (matches rk-main subscription page) ─────────────────────────
const plans = [
    {
        emoji: '🆓', name: 'Free', color: '#9333ea',
        price: '₹0', period: '/mo', desc: 'Personal exploration & testing.',
        storage: '500 MB', videos: 'No videos',
        features: ['Voice chat + wake word', 'Any local Ollama model', 'Music playback', '500 MB storage'],
        locked: ['Video generation', 'PPT / DOCX gen', 'AI image generation'],
        cta: 'Download Free', href: '/#download', ghost: true,
    },
    {
        emoji: '🟢', name: 'Student', color: '#4caf50',
        price: '₹149', period: '/mo', desc: 'Students & Assignments.',
        storage: '5 GB', videos: 'No videos',
        features: ['5 GB storage', 'Unlimited text documents', 'PPT & DOCX generation', 'Priority support'],
        locked: ['AI video generation'],
        cta: 'Get Student Plan',
    },
    {
        emoji: '🔵', name: 'Creator', color: '#2196f3', featured: true,
        price: '₹299', period: '/mo', desc: 'Content Creators.',
        storage: '20 GB', videos: '2 videos/mo',
        features: ['20 GB storage', '2 AI videos/month', 'Thumbnail generation', 'All document types', 'Advanced AI'],
        locked: [],
        cta: 'Get Creator Plan',
    },
    {
        emoji: '🟣', name: 'Pro', color: '#9c27b0',
        price: '₹599', period: '/mo', desc: 'Power Users & Pros.',
        storage: '50 GB', videos: '10 videos/mo',
        features: ['50 GB storage', '10 AI videos/month', 'Unlimited documents', 'Priority processing', 'API access'],
        locked: [],
        cta: 'Get Pro Plan',
    },
    {
        emoji: '🔴', name: 'Studio', color: '#f44336',
        price: '₹999', period: '/mo', desc: 'Studios & Schools.',
        storage: '120 GB', videos: '30 videos/mo',
        features: ['120 GB storage', '30 AI videos/month', 'Team collaboration', 'White-label', 'Dedicated support'],
        locked: [],
        cta: 'Get Studio Plan',
    },
];

function ProductCard({ product, onSelect }) {
    return (
        <div style={{
            background: 'var(--surface)', border: '1px solid var(--border)',
            borderRadius: '20px', overflow: 'hidden',
            transition: 'transform 0.25s, border-color 0.25s, box-shadow 0.25s',
            cursor: 'pointer', display: 'flex', flexDirection: 'column',
        }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.borderColor = product.accentColor; e.currentTarget.style.boxShadow = `0 20px 60px ${product.accentColor}22`; }}
            onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.boxShadow = ''; }}
        >
            {/* Product image / banner */}
            <div style={{
                height: '180px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: `linear-gradient(135deg, ${product.accentColor}22, ${product.accentColor2 || product.accentColor}11)`,
                borderBottom: '1px solid var(--border)', position: 'relative',
            }}>
                {product.badge && (
                    <div style={{
                        position: 'absolute', top: '14px', right: '14px',
                        background: product.badgeColor || 'linear-gradient(135deg, #f59e0b, #d97706)',
                        color: '#fff', fontSize: '11px', fontWeight: '700', padding: '4px 12px',
                        borderRadius: '50px', letterSpacing: '1px', textTransform: 'uppercase',
                    }}>{product.badge}</div>
                )}
                <div style={{ fontSize: '72px', filter: product.dimmed ? 'grayscale(0.4) opacity(0.7)' : '' }}>
                    {product.icon}
                </div>
            </div>

            {/* Info */}
            <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div>
                    <div style={{ fontSize: '11px', fontWeight: '700', letterSpacing: '2px', color: 'var(--muted)', textTransform: 'uppercase', marginBottom: '6px' }}>
                        {product.category}
                    </div>
                    <h3 style={{ fontSize: '22px', fontWeight: '800', letterSpacing: '-0.5px' }}>{product.name}</h3>
                    <p style={{ fontSize: '14px', color: 'var(--muted)', marginTop: '6px', lineHeight: '1.7' }}>{product.desc}</p>
                </div>

                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    {product.tags.map(t => (
                        <span key={t} style={{ background: `${product.accentColor}18`, color: product.accentColor, border: `1px solid ${product.accentColor}33`, borderRadius: '50px', padding: '3px 12px', fontSize: '12px', fontWeight: '600' }}>{t}</span>
                    ))}
                </div>

                <div style={{ marginTop: 'auto', paddingTop: '16px' }}>
                    {product.comingSoon ? (
                        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '50px', padding: '12px 20px', textAlign: 'center', color: 'var(--muted)', fontWeight: '600', fontSize: '14px' }}>
                            🔔 Notify Me When Available
                        </div>
                    ) : (
                        <button onClick={onSelect} style={{
                            width: '100%', background: `linear-gradient(135deg, ${product.accentColor}, ${product.accentColor2 || product.accentColor}cc)`,
                            color: '#fff', border: 'none', borderRadius: '50px', padding: '13px 20px',
                            fontWeight: '700', fontSize: '15px', cursor: 'pointer', fontFamily: 'inherit',
                            transition: 'opacity 0.2s',
                        }}>
                            {product.cta}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

function TierModal({ onClose }) {
    return (
        <div style={{
            position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(8px)',
            zIndex: 1000, display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
            overflowY: 'auto', padding: '60px 20px',
        }} onClick={e => e.target === e.currentTarget && onClose()}>
            <div style={{ width: '100%', maxWidth: '1000px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                    <div>
                        <h2 style={{ fontSize: '32px', fontWeight: '800' }}>🎙️ RK AI Home Assistant — Plans</h2>
                        <p style={{ color: 'var(--muted)', marginTop: '6px' }}>Choose the plan that's right for you.</p>
                    </div>
                    <button onClick={onClose} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '50%', width: '44px', height: '44px', color: 'var(--text)', cursor: 'pointer', fontSize: '18px', fontFamily: 'inherit' }}>✕</button>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(175px, 1fr))', gap: '16px' }}>
                    {plans.map(p => (
                        <div key={p.name} style={{
                            background: 'rgba(255,255,255,0.04)', border: `1px solid ${p.featured ? 'var(--blue)' : p.color + '33'}`,
                            borderRadius: '16px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '14px',
                            boxShadow: p.featured ? '0 0 40px rgba(79,156,249,0.12)' : '',
                            position: 'relative',
                        }}>
                            {p.featured && <div style={{ position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)', background: 'linear-gradient(135deg, var(--blue), var(--violet))', color: '#fff', fontSize: '10px', fontWeight: '700', padding: '3px 14px', borderRadius: '50px', letterSpacing: '2px' }}>POPULAR</div>}
                            <div>
                                <div style={{ fontSize: '12px', fontWeight: '700', letterSpacing: '2px', color: p.color, textTransform: 'uppercase' }}>{p.emoji} {p.name}</div>
                                <div style={{ fontSize: '36px', fontWeight: '900', letterSpacing: '-1.5px', marginTop: '4px' }}>{p.price}<span style={{ fontSize: '13px', color: 'var(--muted)', fontWeight: '400' }}>{p.period}</span></div>
                                <div style={{ fontSize: '12px', color: 'var(--muted)', marginTop: '4px' }}>💾 {p.storage} · 🎥 {p.videos}</div>
                            </div>
                            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '7px' }}>
                                {p.features.map(f => <li key={f} style={{ fontSize: '12px', display: 'flex', gap: '7px' }}><span style={{ color: 'var(--blue)' }}>✓</span>{f}</li>)}
                                {p.locked.map(f => <li key={f} style={{ fontSize: '12px', display: 'flex', gap: '7px', color: 'var(--muted)' }}><span>✗</span>{f}</li>)}
                            </ul>
                            <a href={p.href || '#'}
                                onClick={!p.href ? e => { e.preventDefault(); alert(`Payments launching soon!\nEmail hello@arkis.ai for early access to ${p.name}.`); } : undefined}
                                style={{
                                    display: 'block', marginTop: 'auto', padding: '10px', textAlign: 'center',
                                    background: p.ghost ? 'var(--surface)' : `linear-gradient(135deg, ${p.color}, ${p.color}bb)`,
                                    border: p.ghost ? '1px solid var(--border)' : 'none',
                                    borderRadius: '50px', color: '#fff', fontWeight: '700', fontSize: '13px', textDecoration: 'none',
                                    cursor: 'pointer',
                                }}>{p.cta}</a>
                        </div>
                    ))}
                </div>
                <p style={{ textAlign: 'center', color: 'var(--muted)', fontSize: '13px', marginTop: '20px' }}>
                    🔒 Secure payments via Paytm · UPI · Cards
                </p>
            </div>
        </div>
    );
}

const products = [
    {
        id: 'rkai',
        icon: '🎙️',
        category: 'AI Home Assistant',
        name: 'RK AI',
        desc: 'A fully local voice AI assistant for your desktop. Wake word detection, Ollama models, music, web search, image generation and more.',
        tags: ['Voice AI', 'Local LLM', 'macOS · Windows · Linux'],
        accentColor: '#4f9cf9',
        accentColor2: '#9b59f5',
        badge: 'Live',
        badgeColor: 'linear-gradient(135deg, #4ade80, #16a34a)',
        cta: 'View Plans →',
        comingSoon: false,
    },
    {
        id: 'lightkey',
        icon: '🔑',
        category: 'Lumina OS Component',
        name: 'Light Key',
        desc: 'The authentication & access layer for Lumina OS — a lightweight, secure key that unlocks the full Lumina experience. Designed to integrate seamlessly with ARKIS services.',
        tags: ['Lumina OS', 'Auth Layer', 'Coming Soon'],
        accentColor: '#f59e0b',
        accentColor2: '#d97706',
        badge: 'Coming Soon',
        badgeColor: 'linear-gradient(135deg, #f59e0b, #d97706)',
        cta: '',
        comingSoon: true,
        dimmed: false,
    },
];

export default function Products() {
    const [showTiers, setShowTiers] = useState(false);

    return (
        <>
            <Navbar />

            {/* HERO */}
            <section className="hero" style={{ minHeight: '45vh', paddingTop: '100px', paddingBottom: '40px' }}>
                <div className="badge"><span className="dot" />ARKIS Product Store</div>
                <h1 style={{ fontSize: 'clamp(36px,6vw,68px)' }}>Build the future<br /><span className="grad">with ARKIS.</span></h1>
                <p>AI tools built for real people. Private, local, and powerful.</p>
            </section>

            {/* PRODUCT CARDS */}
            <section style={{ padding: '0 5% 80px' }}>
                <div className="label" style={{ marginBottom: '24px' }}>Products</div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', maxWidth: '800px' }}>
                    {products.map(p => (
                        <ProductCard key={p.id} product={p} onSelect={() => p.id === 'rkai' && setShowTiers(true)} />
                    ))}
                </div>
            </section>

            {/* FOOTER */}
            <footer>
                <span className="logo"><span>ARKIS</span></span>
                <span>© 2026 ARKIS. All rights reserved.</span>
                <a href="mailto:hello@arkis.ai">hello@arkis.ai</a>
            </footer>

            {showTiers && <TierModal onClose={() => setShowTiers(false)} />}
            <ChatWidget />
        </>
    );
}
