'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import ChatWidget from '@/components/ChatWidget';
import Footer from '@/components/Footer';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

// ─── RexyCore Cloud / Matrix tiers (aligned with rexycore-website /subscription) ──
const plans = [
    {
        emoji: '🆓', name: 'FREE AGENT', color: '#888888',
        price: '₹0', period: '/mo', desc: 'Enter the matrix.',
        storage: '50 MB', videos: '1 AI video / week (5 sec)',
        features: ['Voice chat + wake word', '1 AI Video / week (5 sec)', '24h data retention', 'Basic matrix commands'],
        locked: ['Higher storage', 'Priority processing'],
        cta: 'Open RexyCore Cloud', href: '/subscription', ghost: true,
    },
    {
        emoji: '⚡', name: '7-DAY TRIAL', color: '#00ff9d',
        price: '₹0', period: '/ 7 days', desc: 'Full access. Zero cost.',
        storage: '500 MB', videos: '10 AI videos / day (trial)',
        features: ['Everything in FREE', 'Unlimited AI images (7d)', '10 AI videos / day', '500 MB cloud', 'Priority processing'],
        locked: [],
        cta: 'Start in app', href: '/subscription',
    },
    {
        emoji: '🟢', name: 'STUDENT NODE', color: '#4f9cf9',
        price: '₹151', period: '/mo', desc: 'Learn. Build. Dominate.',
        storage: '500 MB', videos: '2 AI videos / week (5 sec)',
        features: ['Everything in FREE', '2 AI Videos / week (5 sec)', '36h retention', 'Homework AI Buddy', 'Drive integration', 'Lifetime ₹151/mo locked'],
        locked: [],
        cta: 'Join waitlist', href: '/subscription',
    },
    {
        emoji: '🔵', name: 'CREATOR PROTOCOL', color: '#ff8500', featured: true,
        price: '₹451', period: '/mo', desc: 'Create. Inspire. Expand.',
        storage: '2 GB', videos: '3 AI videos / week (10 sec)',
        features: ['Everything in STUDENT', '3 AI Videos / week (10 sec)', '5 days retention', 'LTX-2 Fast', 'Viral thumbnails', '2 GB cloud', 'Lifetime ₹451/mo locked'],
        locked: [],
        cta: 'Join waitlist', href: '/subscription',
    },
    {
        emoji: '🟣', name: 'PRO OPERATIVE', color: '#9b59f5',
        price: '₹951', period: '/mo', desc: 'Unlimited. Unstoppable.',
        storage: '5 GB', videos: '3 AI videos / week (2K Pro)',
        features: ['Everything in CREATOR', '3 AI Videos / week (2K Pro)', '7 days retention', 'Custom voice (rk-voice)', 'Personalized files', '5 GB cloud', 'Lifetime ₹951/mo locked'],
        locked: [],
        cta: 'Join waitlist', href: '/subscription',
    },
    {
        emoji: '🔴', name: 'STUDIO MATRIX', color: '#e8305f',
        price: '₹1601', period: '/mo', desc: 'The ultimate AI arsenal.',
        storage: '10 GB', videos: '3 AI videos / week (4K Pro)',
        features: ['Everything in PRO', '3 AI Videos / week (4K Pro)', '2 weeks retention', 'Multi-character scenes', 'Best model tier (4K+)', '10 GB cloud', 'Lifetime ₹1601/mo locked'],
        locked: [],
        cta: 'Join waitlist', href: '/subscription',
    },
];

function ProductCard({ product, onSelect }) {
    const isOrange = product.accentColor === '#f59e0b' || product.isBuyable;
    const shadowColor = isOrange ? 'rgba(245, 158, 11, 0.2)' : `${product.accentColor}22`;

    return (
        <div className="product-card" style={{
            background: 'var(--surface)', border: '1px solid var(--border)',
            borderRadius: '20px', overflow: 'hidden',
            transition: 'transform 0.25s, border-color 0.25s, box-shadow 0.25s',
            cursor: 'pointer', display: 'flex', flexDirection: 'column',
            height: '100%' // Ensure all cards take full height of their container
        }}
            onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-6px)';
                e.currentTarget.style.borderColor = product.accentColor;
                e.currentTarget.style.boxShadow = `0 20px 60px ${shadowColor}`;
            }}
            onMouseLeave={e => {
                e.currentTarget.style.transform = '';
                e.currentTarget.style.borderColor = 'var(--border)';
                e.currentTarget.style.boxShadow = '';
            }}
        >
            {/* Product image / banner */}
            <div style={{
                height: '180px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: product.bgImage ? `url("${product.bgImage}") center/cover no-repeat` : `linear-gradient(135deg, ${product.accentColor}22, ${product.accentColor2 || product.accentColor}11)`,
                borderBottom: '1px solid var(--border)', position: 'relative',
            }}>
                {product.bgImage && (
                    <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to top, var(--surface) 0%, transparent 40%, ${product.accentColor}66 100%)` }} />
                )}
                {product.badge && (
                    <div style={{
                        position: 'absolute', top: '14px', right: '14px',
                        background: product.badgeColor || 'linear-gradient(135deg, #f59e0b, #d97706)',
                        color: '#fff', fontSize: '11px', fontWeight: '700', padding: '4px 12px',
                        borderRadius: '50px', letterSpacing: '1px', textTransform: 'uppercase',
                        zIndex: 2,
                        boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
                    }}>{product.badge}</div>
                )}
                {!product.bgImage && (
                    <div style={{ fontSize: '72px', filter: product.dimmed ? 'grayscale(0.4) opacity(0.7)' : '' }}>
                        {product.icon}
                    </div>
                )}
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
                    {product.isBuyable ? (
                        <button onClick={onSelect} style={{
                            width: '100%', background: `linear-gradient(135deg, ${product.accentColor}, ${product.accentColor2 || product.accentColor}cc)`,
                            color: '#fff', border: 'none', borderRadius: '50px', padding: '13px 20px',
                            fontWeight: '700', fontSize: '15px', cursor: 'pointer', fontFamily: 'inherit',
                            transition: 'transform 0.2s, box-shadow 0.2s',
                        }}
                            onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.02)'; e.currentTarget.style.boxShadow = `0 10px 20px ${product.accentColor}33`; }}
                            onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = ''; }}
                        >
                            🛒 {product.cta}
                        </button>
                    ) : product.comingSoon ? (
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                            <Link
                                href={product.href || '#'}
                                style={{
                                    display: 'block',
                                    width: '100%',
                                    background: `linear-gradient(135deg, ${product.accentColor}, ${product.accentColor2 || product.accentColor}cc)`,
                                    borderRadius: '50px',
                                    padding: '12px 16px',
                                    textAlign: 'center',
                                    color: '#fff',
                                    fontWeight: '700',
                                    fontSize: '14px',
                                    textDecoration: 'none',
                                    transition: 'all 0.3s ease',
                                    boxShadow: `0 0 18px ${product.accentColor}22`,
                                }}
                                onClick={e => {
                                    e.stopPropagation();
                                }}
                                onMouseEnter={e => {
                                    e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
                                    e.currentTarget.style.boxShadow = `0 10px 25px ${product.accentColor}33`;
                                }}
                                onMouseLeave={e => {
                                    e.currentTarget.style.transform = '';
                                    e.currentTarget.style.boxShadow = `0 0 18px ${product.accentColor}22`;
                                }}
                            >
                                See More
                            </Link>
                            <Link
                                href={`/notify?product=${encodeURIComponent(product.notifyProductKey || product.id)}`}
                                style={{
                                    display: 'block',
                                    width: '100%',
                                    background: 'rgba(255,255,255,0.04)',
                                    border: `1px solid ${product.accentColor}44`,
                                    borderRadius: '50px',
                                    padding: '12px 16px',
                                    textAlign: 'center',
                                    color: product.accentColor,
                                    fontWeight: '700',
                                    fontSize: '14px',
                                    textDecoration: 'none',
                                    transition: 'all 0.3s ease',
                                    boxShadow: `0 0 18px ${product.accentColor}22`,
                                }}
                                onClick={e => {
                                    e.stopPropagation();
                                }}
                                onMouseEnter={e => {
                                    e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
                                    e.currentTarget.style.boxShadow = `0 10px 25px ${product.accentColor}33`;
                                }}
                                onMouseLeave={e => {
                                    e.currentTarget.style.transform = '';
                                    e.currentTarget.style.boxShadow = `0 0 18px ${product.accentColor}22`;
                                }}
                            >
                                🔔 Notify Me
                            </Link>
                        </div>
                    ) : (
                        <button
                            onClick={onSelect}
                            style={{
                                width: '100%', background: `linear-gradient(135deg, ${product.accentColor}, ${product.accentColor2 || product.accentColor}cc)`,
                                color: '#fff', border: 'none', borderRadius: '50px', padding: '13px 20px',
                                fontWeight: '700', fontSize: '15px', cursor: 'pointer', fontFamily: 'inherit',
                                transition: 'all 0.3s ease',
                                boxShadow: `0 0 20px ${product.accentColor}33`
                            }}
                            onMouseEnter={e => {
                                e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
                                e.currentTarget.style.boxShadow = `0 10px 25px ${product.accentColor}66`;
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.transform = '';
                                e.currentTarget.style.boxShadow = `0 0 20px ${product.accentColor}33`;
                            }}
                        >
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
                        <h2 style={{ fontSize: '32px', fontWeight: '800' }}>☁️ RexyCore Cloud — Matrix tiers</h2>
                        <p style={{ color: 'var(--muted)', marginTop: '6px' }}>Same plans as the subscription hub. RK Home billing is tied to your linked device in the app.</p>
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
        id: 'rkai_desktop',
        icon: <Image src="/RK AI logo.png" alt="RK AI" width={80} height={80} style={{ objectFit: 'contain', filter: 'drop-shadow(0 0 20px rgba(79, 156, 249, 0.4))' }} />,
        category: 'AI Desktop Assistant',
        name: 'RK AI Desktop',
        desc: 'A local-first AI system built for personal computing. Voice-enabled, automation-ready, and powered by on-device models.',
        tags: ['Productivity', 'Local AI', 'System Control'],
        accentColor: '#4f9cf9',
        accentColor2: '#9b59f5',
        badge: 'Live',
        badgeColor: 'linear-gradient(135deg, #4ade80, #16a34a)',
        cta: 'Download Now',
        href: '/products/rk-ai-desktop',
        comingSoon: false,
    },
    {
        id: 'rkai_home',
        icon: null,
        bgImage: '/rk-ai-home-images/feature.jpg',
        logo: '/rkhome.png',
        category: 'Smart Home Device',
        name: 'RK AI Home',
        desc: 'An AI system designed for physical environments — enabling voice control, automation, and intelligent coordination.',
        tags: ['Smart Home', 'Hardware', 'Pre-order'],
        accentColor: '#ec4899',
        accentColor2: '#be185d',
        badge: 'Pre-order',
        badgeColor: 'linear-gradient(135deg, #ec4899, #be185d)',
        cta: 'Pre-order Now',
        href: '/products/rk-ai-home',
        comingSoon: false,
        isPhysical: true,
        isBuyable: true
    },
    {
        id: 'lumina_os',
        icon: <Image src="/luminaos.png" alt="Lumina OS" width={90} height={90} style={{ objectFit: 'contain', filter: 'drop-shadow(0 0 20px rgba(168, 85, 247, 0.4))', transform: 'translateY(15px)' }} />,
        category: 'Operating System',
        name: 'Lumina OS',
        desc: 'A lightweight, AI-integrated operating system built around speed, privacy, and intelligent workflows.',
        tags: ['Linux', 'AI-Native', 'Privacy First'],
        accentColor: '#a855f7',
        accentColor2: '#6366f1',
        badge: 'In Development',
        badgeColor: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
        cta: 'Learn More',
        href: '/products/lumina-os',
        comingSoon: false,
    },
    {
        id: 'lightkey',
        icon: '⌨️',
        category: 'Intelligent Input',
        name: 'Light Key',
        desc: 'An intelligent input system that enhances typing with contextual suggestions and AI-powered assistance.',
        tags: ['Input', 'AI-Keyboard', 'Beta'],
        accentColor: '#f59e0b',
        accentColor2: '#d97706',
        badge: 'Coming Soon',
        badgeColor: 'linear-gradient(135deg, #f59e0b, #d97706)',
        cta: 'Learn More',
        href: '/products/light-key',
        comingSoon: true,
        notifyProductKey: 'light-key',
        isBuyable: false
    },
    {
        id: 'cloud',
        icon: '☁️',
        category: 'Rexycore Ecosystem',
        name: 'RexyCore Cloud',
        desc: 'Matrix tiers for RK AI — storage, video caps, and cloud features. View your active plan, waitlist, and account on the subscription hub.',
        tags: ['Cloud AI', 'Matrix tiers', 'Live'],
        accentColor: '#0ea5e9',
        accentColor2: '#38bdf8',
        badge: 'Live',
        badgeColor: 'linear-gradient(135deg, #0ea5e9, #38bdf8)',
        cta: 'RexyCore Cloud',
        href: '/subscription',
        isModal: false,
        comingSoon: false,
    },
];

export default function Products() {
    const [showTiers, setShowTiers] = useState(false);
    const { user, loading: authLoading } = useAuth();
    const router = useRouter();

    const handleProductAction = (product) => {
        if (product.isModal) {
            setShowTiers(true);
        } else if (product.href) {
            window.location.href = product.href;
        }
    };

    useEffect(() => {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

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

    return (
        <div style={{ background: 'var(--background)', color: 'var(--text)', minHeight: '100vh' }}>
            <Navbar />

            <section className="hero" style={{ minHeight: '60vh', paddingTop: '120px', paddingBottom: '60px', textAlign: 'center' }}>
                <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                    <div className="badge float-anim" style={{ margin: '0 auto 16px' }}><span className="dot" />Ecosystem</div>
                    <h1 style={{ fontSize: 'clamp(36px,6vw,72px)', lineHeight: '1.2' }}>The Rexycore<br /><span className="grad">Product Suite.</span></h1>
                    <p style={{ fontSize: '1.2rem', opacity: 0.8, marginTop: '20px' }}>Explore our range of AI-first products designed for privacy, performance, and control.</p>
                </div>
            </section>

            <section style={{ padding: '40px 5%' }}>
                <div className="label reveal">Our Products</div>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                    gap: '32px',
                    marginTop: '40px',
                    alignItems: 'stretch'
                }}>
                    {products.map((p, i) => (
                        <div key={p.id} className={`reveal reveal-delay-${(i % 3) + 1}`}>
                            <ProductCard product={p} onSelect={() => handleProductAction(p)} />
                        </div>
                    ))}
                </div>
            </section>

            <Footer />
            {showTiers && <TierModal onClose={() => setShowTiers(false)} />}
            <ChatWidget />
        </div>
    );
}
