'use client';
import Navbar from '@/components/Navbar';
import ChatWidget from '@/components/ChatWidget';
import Link from 'next/link';

export default function LightKeyProduct() {
    return (
        <div style={{ background: 'var(--bg)', minHeight: '100vh', color: 'var(--text)' }}>
            <Navbar />

            {/* PRODUCT HERO */}
            <section className="hero" style={{ minHeight: '80vh', padding: '140px 5% 80px', textAlign: 'center', position: 'relative' }}>
                <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div className="badge" style={{ marginBottom: '24px', animation: 'fade-in 1s ease-out' }}>
                        <span className="dot" style={{ background: '#f59e0b' }} /> Beta Testing Soon
                    </div>
                    
                    <h1 style={{ 
                        fontSize: 'clamp(48px, 8vw, 92px)', 
                        fontWeight: '900', 
                        lineHeight: '1.1', 
                        letterSpacing: '-2px',
                        marginBottom: '24px',
                        animation: 'fade-up 1s ease-out'
                    }}>
                        Light <span className="grad">Key</span>
                    </h1>
                    
                    <p style={{ 
                        fontSize: 'clamp(18px, 2.5vw, 24px)', 
                        color: 'var(--blue)', 
                        fontWeight: '600',
                        marginBottom: '16px',
                        letterSpacing: '1px',
                        textTransform: 'uppercase',
                        animation: 'fade-up 1.2s ease-out'
                    }}>
                        The AI-powered evolution of the keyboard.
                    </p>

                    <p style={{ 
                        fontSize: 'clamp(16px, 1.8vw, 20px)', 
                        color: 'var(--muted)', 
                        maxWidth: '800px', 
                        lineHeight: '1.7',
                        marginBottom: '40px',
                        animation: 'fade-up 1.4s ease-out'
                    }}>
                        An intelligent input system that enhances typing with contextual suggestions, smart commands, and AI-powered assistance — built for speed and focus.
                    </p>

                    <div style={{ 
                        display: 'flex', 
                        flexWrap: 'wrap', 
                        gap: '16px', 
                        justifyContent: 'center',
                        animation: 'fade-up 1.6s ease-out'
                    }}>
                        <Link href="/login" className="btn-primary" style={{ padding: '18px 48px', fontSize: '18px', background: 'linear-gradient(135deg, #f59e0b, #d97706)' }}>Buy Light Key</Link>
                        <Link href="/login" className="btn-secondary" style={{ padding: '18px 48px', fontSize: '18px' }}>Get Early Access (Beta)</Link>
                    </div>

                    {/* PRODUCT IMAGE PLACEHOLDER */}
                    <div style={{ 
                        marginTop: '80px', 
                        width: '100%', 
                        maxWidth: '900px', 
                        aspectRatio: '16/9',
                        background: 'var(--surface)',
                        border: '1px solid var(--border)',
                        borderRadius: '32px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '120px',
                        boxShadow: '0 40px 100px rgba(0,0,0,0.5), inset 0 0 80px rgba(245, 158, 11, 0.05)',
                        position: 'relative',
                        overflow: 'hidden',
                        animation: 'scale-up 1.5s cubic-bezier(0.16, 1, 0.3, 1)'
                    }}>
                        ⌨️
                        <div style={{
                            position: 'absolute', inset: 0,
                            background: 'radial-gradient(circle at center, #f59e0b22, transparent 70%)',
                            pointerEvents: 'none'
                        }} />
                    </div>
                </div>
            </section>

            {/* FEATURES SECTION */}
            <section style={{ padding: '100px 5%', maxWidth: '1200px', margin: '0 auto' }}>
                <div style={{ textAlign: 'center', marginBottom: '80px' }}>
                    <div className="label">Intelligent Input</div>
                    <h2 style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: '800' }}>Type at the speed of thought.</h2>
                </div>

                <div style={{
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                    gap: '40px'
                }}>
                    {[
                        { icon: '🪄', title: 'Contextual Flow', desc: 'Predictive typing that understands what you’re building. From code to creative writing, Light Key adapts to your style.' },
                        { icon: '⌨️', title: 'Smart Commands', desc: 'Execute system actions and AI workflows directly from your keyboard. Type "/create-ppt" and watch the magic happen.' },
                        { icon: '✍️', title: 'AI Assistant', desc: 'Real-time grammar, tone, and clarity improvements. Professional communication built into every keystroke.' },
                        { icon: '🔒', title: 'Local Encryption', desc: 'Your keystrokes never leave your device. All suggestions and processing happen locally for total security.' },
                        { icon: '🚀', title: 'Macro Engine', desc: 'Create complex multi-step automations and trigger them with simple, intelligent shortcuts.' },
                        { icon: '💎', title: 'ARKIS Integrated', desc: 'Works as the primary input layer for Lumina OS and syncs your custom shortcuts across the ecosystem.' },
                    ].map(f => (
                        <div key={f.title} className="feature-card" style={{
                            background: 'var(--surface)', 
                            padding: '40px', 
                            borderRadius: '24px',
                            border: '1px solid var(--border)',
                            transition: 'all 0.3s ease'
                        }}>
                            <div style={{ fontSize: '40px', marginBottom: '24px' }}>{f.icon}</div>
                            <h3 style={{ fontSize: '22px', fontWeight: '800', marginBottom: '16px' }}>{f.title}</h3>
                            <p style={{ color: 'var(--muted)', fontSize: '16px', lineHeight: '1.7' }}>{f.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA SECTION */}
            <section style={{ textAlign: 'center', padding: '120px 5%', background: 'linear-gradient(to bottom, transparent, rgba(245, 158, 11, 0.05))' }}>
                <h2 style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: '800', marginBottom: '24px' }}>Don’t just type. Command.</h2>
                <p style={{ color: 'var(--muted)', fontSize: '18px', marginBottom: '48px' }}>Be among the first to experience the evolution of the keyboard.</p>
                <Link href="/login" className="btn-primary" style={{ padding: '18px 48px', fontSize: '18px' }}>Get Early Access</Link>
            </section>

            <footer style={{ padding: '80px 5%', borderTop: '1px solid var(--border)', textAlign: 'center' }}>
                <div className="nav-logo" style={{ justifyContent: 'center', marginBottom: '24px' }}>
                    <span>ARKIS</span>
                </div>
                <p style={{ color: 'var(--muted)', fontSize: '14px' }}>© 2026 ARKIS. All rights reserved.</p>
            </footer>

            <ChatWidget />
        </div>
    );
}
