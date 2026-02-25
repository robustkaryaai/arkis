'use client';
import Navbar from '@/components/Navbar';
import ChatWidget from '@/components/ChatWidget';
import Footer from '@/components/Footer';
import Link from 'next/link';

export default function LuminaOSProduct() {
    return (
        <div style={{ background: 'var(--background)', minHeight: '100vh', color: 'var(--text)' }}>
            <Navbar />

            {/* PRODUCT HERO */}
            <section className="hero" style={{ minHeight: '80vh', padding: '140px 5% 80px', textAlign: 'center', position: 'relative' }}>
                <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div className="badge float-anim" style={{ marginBottom: '24px' }}>
                        <span className="dot" style={{ background: '#10b981' }} /> Alpha Development Phase
                    </div>
                    
                    <h1 style={{ 
                        fontSize: 'clamp(48px, 8vw, 92px)', 
                        fontWeight: '900', 
                        lineHeight: '1.1', 
                        letterSpacing: '-2px',
                        marginBottom: '24px'
                    }}>
                        Lumina <span className="grad">OS</span>
                    </h1>
                    
                    <p style={{ 
                        fontSize: 'clamp(18px, 2.5vw, 24px)', 
                        color: 'var(--blue)', 
                        fontWeight: '600',
                        marginBottom: '16px',
                        letterSpacing: '1px',
                        textTransform: 'uppercase'
                    }}>
                        A Privacy-First, AI-Native Operating System.
                    </p>

                    <p style={{ 
                        fontSize: 'clamp(16px, 1.8vw, 20px)', 
                        color: 'var(--muted)', 
                        maxWidth: '800px', 
                        lineHeight: '1.7',
                        marginBottom: '40px'
                    }}>
                        Lumina OS is built from the ground up to rethink how humans interact with machines in the AI era. 
                        It integrates artificial intelligence directly into the kernel, providing a seamless, fast, and 
                        private workspace that adapts to your needs.
                    </p>

                    <div style={{ 
                        display: 'flex', 
                        flexWrap: 'wrap', 
                        gap: '16px', 
                        justifyContent: 'center'
                    }}>
                        <Link 
                            href="/login?redirect=/products/lumina-os" 
                            className="btn-primary" 
                            style={{ 
                                padding: '16px 48px', fontSize: '18px',
                                background: 'linear-gradient(135deg, #10b981, #059669)',
                                boxShadow: '0 0 30px rgba(16, 185, 129, 0.3)',
                                transition: 'all 0.3s ease'
                            }}
                            onMouseEnter={e => {
                                e.currentTarget.style.transform = 'translateY(-3px) scale(1.05)';
                                e.currentTarget.style.boxShadow = '0 10px 30px rgba(16, 185, 129, 0.5)';
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.transform = '';
                                e.currentTarget.style.boxShadow = '0 0 30px rgba(16, 185, 129, 0.3)';
                            }}
                        >
                            Join the Waitlist
                        </Link>
                        <a 
                            href="https://luminaos.vercel.app" 
                            target="_blank" rel="noopener noreferrer" 
                            className="btn-secondary" 
                            style={{ 
                                padding: '16px 48px', fontSize: '18px', textDecoration: 'none',
                                transition: 'all 0.3s ease'
                            }}
                            onMouseEnter={e => {
                                e.currentTarget.style.borderColor = '#10b981';
                                e.currentTarget.style.boxShadow = '0 0 20px rgba(16, 185, 129, 0.1)';
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.borderColor = 'var(--border)';
                                e.currentTarget.style.boxShadow = '';
                            }}
                        >
                            Experience Lumina OS in Web
                        </a>
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
                        boxShadow: '0 40px 100px rgba(0,0,0,0.5), inset 0 0 80px rgba(16, 185, 129, 0.05)',
                        position: 'relative',
                        overflow: 'hidden'
                    }}>
                        💿
                        <div style={{
                            position: 'absolute', inset: 0,
                            background: 'radial-gradient(circle at center, #10b98122, transparent 70%)',
                            pointerEvents: 'none'
                        }} />
                    </div>
                </div>
            </section>

            {/* FEATURES SECTION */}
            <section style={{ padding: '100px 5%', maxWidth: '1200px', margin: '0 auto' }}>
                <div style={{ textAlign: 'center', marginBottom: '80px' }}>
                    <div className="label">The Foundation</div>
                    <h2 style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: '800' }}>AI at the core, not the edge.</h2>
                </div>

                <div style={{
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                    gap: '40px'
                }}>
                    {[
                        { icon: '�', title: 'AI Disable Switch', desc: 'The ultimate control. A system-level toggle to completely disable all AI features, reverting to a pure, high-performance Linux environment whenever you choose.' },
                        { icon: '🧠', title: 'Native AI Stack', desc: 'A built-in AI layer that manages your tasks, search, and system configurations with intuitive ease, processed 100% locally.' },
                        { icon: '🔒', title: 'Hardened Privacy', desc: 'No data collection. No telemetry. Your machine belongs to you, and Lumina OS ensures it stays that way.' },
                        { icon: '�', title: 'Speed Engine', desc: 'Custom kernel optimizations for lightning-fast application launches and system responsiveness.' },
                        { icon: '🎨', title: 'Adaptive UI', desc: 'A visual ecosystem that morphs based on your current task, maximizing focus and reducing noise.' },
                        { icon: '🐧', title: 'Linux Based', desc: 'The security and stability of Linux, transformed into a modern, user-friendly AI environment.' },
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
            <section style={{ textAlign: 'center', padding: '120px 5%', background: 'linear-gradient(to bottom, transparent, rgba(16, 185, 129, 0.05))' }}>
                <h2 style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: '800', marginBottom: '24px' }}>Witness the evolution of computing.</h2>
                <p style={{ color: 'var(--muted)', fontSize: '18px', marginBottom: '48px' }}>Early access spots for Lumina OS Alpha are limited. Secure yours now.</p>
                <Link href="/login?redirect=/products/lumina-os" className="btn-primary" style={{ padding: '18px 48px', fontSize: '18px' }}>Join the Waitlist</Link>
            </section>

            <Footer />
            <ChatWidget />
        </div>
    );
}
