'use client';
import Navbar from '@/components/Navbar';
import ChatWidget from '@/components/ChatWidget';
import Link from 'next/link';

export default function RKHomeProduct() {
    return (
        <div style={{ background: 'var(--bg)', minHeight: '100vh', color: 'var(--text)' }}>
            <Navbar />

            {/* PRODUCT HERO */}
            <section className="hero" style={{ minHeight: '80vh', padding: '140px 5% 80px', textAlign: 'center', position: 'relative' }}>
                <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div className="badge" style={{ marginBottom: '24px', animation: 'fade-in 1s ease-out', color: '#fbbf24', border: '1px solid rgba(251,191,36,0.3)' }}>
                        <span className="dot" style={{ background: '#fbbf24' }} /> Hardware Pre-order Phase
                    </div>
                    
                    <h1 style={{ 
                        fontSize: 'clamp(48px, 8vw, 92px)', 
                        fontWeight: '900', 
                        lineHeight: '1.1', 
                        letterSpacing: '-2px',
                        marginBottom: '24px',
                        animation: 'fade-up 1s ease-out'
                    }}>
                        RK AI <span className="grad">Home</span>
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
                        Ambient Intelligence for Physical Spaces.
                    </p>

                    <p style={{ 
                        fontSize: 'clamp(16px, 1.8vw, 20px)', 
                        color: 'var(--muted)', 
                        maxWidth: '800px', 
                        lineHeight: '1.7',
                        marginBottom: '40px',
                        animation: 'fade-up 1.4s ease-out'
                    }}>
                        RK AI Home is a hardware-integrated AI system designed to manage your physical environment. 
                        It acts as a central hub for your smart home, coordinating voice control, security, 
                        and automation across all your devices while prioritizing local data processing and privacy.
                    </p>

                    <div style={{ 
                        display: 'flex', 
                        flexWrap: 'wrap', 
                        gap: '16px', 
                        justifyContent: 'center',
                        animation: 'fade-up 1.6s ease-out'
                    }}>
                        <Link href="/login" className="btn-primary" style={{ padding: '16px 48px', fontSize: '18px', background: 'linear-gradient(135deg, #f59e0b, #d97706)' }}>Pre-order Now</Link>
                        <div style={{ 
                            padding: '16px 32px', 
                            borderRadius: '50px',
                            background: 'rgba(255,255,255,0.05)',
                            border: '1px solid var(--border)',
                            color: 'var(--muted)',
                            fontWeight: '700',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px'
                        }}>
                            � Shipping Q3 2026
                        </div>
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
                        boxShadow: '0 40px 100px rgba(0,0,0,0.5), inset 0 0 80px rgba(236, 72, 153, 0.05)',
                        position: 'relative',
                        overflow: 'hidden',
                        animation: 'scale-up 1.5s cubic-bezier(0.16, 1, 0.3, 1)'
                    }}>
                        🎙️
                        <div style={{
                            position: 'absolute', inset: 0,
                            background: 'radial-gradient(circle at center, #ec489922, transparent 70%)',
                            pointerEvents: 'none'
                        }} />
                    </div>
                </div>
            </section>

            {/* FEATURES SECTION */}
            <section style={{ padding: '100px 5%', maxWidth: '1200px', margin: '0 auto' }}>
                <div style={{ textAlign: 'center', marginBottom: '80px' }}>
                    <div className="label">Ambient Intelligence</div>
                    <h2 style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: '800' }}>Your home, but smarter.</h2>
                </div>

                <div style={{
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                    gap: '40px'
                }}>
                    {[
                        { icon: '🏠', title: 'Smart Coordination', desc: 'Intelligent control over lights, fans, and appliances. RK AI Home learns your routines to automate your lifestyle.' },
                        { icon: '🗣️', title: 'Wake Word Ready', desc: 'Always-on voice recognition with custom wake words. Designed for accurate detection even in noisy environments.' },
                        { icon: '🔒', title: 'Physical Privacy', desc: 'Hard-wired mute switches and local processing ensure your conversations stay within your four walls.' },
                        { icon: '📻', title: 'Music & Media', desc: 'High-fidelity audio playback with support for local libraries and major streaming services.' },
                        { icon: '🔗', title: 'Ecosystem Sync', desc: 'Seamlessly transition tasks from your RK AI Desktop to your Home Assistant without missing a beat.' },
                        { icon: '🛠️', title: 'Custom Hardware', desc: 'Bespoke industrial design engineered in India, optimized for durability and aesthetic integration.' },
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
            <section style={{ textAlign: 'center', padding: '120px 5%', background: 'linear-gradient(to bottom, transparent, rgba(236, 72, 153, 0.05))' }}>
                <h2 style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: '800', marginBottom: '24px' }}>Building the future of living.</h2>
                <p style={{ color: 'var(--muted)', fontSize: '18px', marginBottom: '48px' }}>Interested in early testing? Join the community for project updates.</p>
                <Link href="/login" className="btn-secondary" style={{ padding: '18px 48px', fontSize: '18px' }}>Join the Community</Link>
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
