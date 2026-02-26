'use client';
import Navbar from '@/components/Navbar';
import ChatWidget from '@/components/ChatWidget';
import Footer from '@/components/Footer';
import Link from 'next/link';

export default function LightKeyProduct() {
    return (
        <div style={{ background: 'var(--background)', minHeight: '100vh', color: 'var(--text)' }}>
            <Navbar />

            {/* PRODUCT HERO */}
            <section className="hero" style={{ minHeight: '80vh', padding: '140px 5% 80px', textAlign: 'center', position: 'relative' }}>
                <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div className="badge float-anim" style={{ marginBottom: '24px' }}>
                        <span className="dot" style={{ background: '#f59e0b' }} /> Beta Testing Soon
                    </div>
                    
                    <h1 style={{ 
                        fontSize: 'clamp(48px, 8vw, 92px)', 
                        fontWeight: '900', 
                        lineHeight: '1.1', 
                        letterSpacing: '-2px',
                        marginBottom: '24px'
                    }}>
                        Light <span className="grad">Key</span>
                    </h1>
                    
                    <p style={{ 
                        fontSize: 'clamp(18px, 2.5vw, 24px)', 
                        color: 'var(--blue)', 
                        fontWeight: '600',
                        marginBottom: '16px',
                        letterSpacing: '1px',
                        textTransform: 'uppercase'
                    }}>
                        Context-Aware Intelligence for Every Keystroke.
                    </p>

                    <p style={{ 
                        fontSize: 'clamp(16px, 1.8vw, 20px)', 
                        color: 'var(--muted)', 
                        maxWidth: '800px', 
                        lineHeight: '1.7',
                        marginBottom: '40px'
                    }}>
                        Light Key is an intelligent input layer that bridges the gap between your thoughts and your machine. 
                        It uses on-device context to provide real-time suggestions, execute smart commands, 
                        and automate typing tasks across the entire ARKIS ecosystem.
                    </p>

                    <div style={{ 
                        display: 'flex', 
                        flexWrap: 'wrap', 
                        gap: '16px', 
                        justifyContent: 'center'
                    }}>
                        <Link 
                            href="/waitlist?product=light-key" 
                            className="btn-primary" 
                            style={{ 
                                padding: '18px 48px', fontSize: '18px',
                                background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                                boxShadow: '0 0 30px rgba(245, 158, 11, 0.3)',
                                transition: 'all 0.3s ease'
                            }}
                            onMouseEnter={e => {
                                e.currentTarget.style.transform = 'translateY(-3px) scale(1.05)';
                                e.currentTarget.style.boxShadow = '0 10px 30px rgba(245, 158, 11, 0.5)';
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.transform = '';
                                e.currentTarget.style.boxShadow = '0 0 30px rgba(245, 158, 11, 0.3)';
                            }}
                        >
                            Join the Waitlist
                        </Link>
                        <button disabled className="btn-secondary" style={{ padding: '18px 48px', fontSize: '18px', opacity: 0.5, cursor: 'not-allowed' }}>Buy Light Key (Coming Soon)</button>
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
                        overflow: 'hidden'
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
                        { icon: '✨', title: 'Contextual Suggestions', desc: 'Predictive typing that understands your intent. Light Key learns your vocabulary and context to offer relevant word and phrase completions.' },
                        { icon: '⌨️', title: 'Smart Commands', desc: 'Execute system actions directly from your keyboard. Use simple shortcuts to trigger complex AI workflows and automations.' },
                        { icon: '🔒', title: 'Private by Design', desc: 'Your keystrokes are never uploaded. All learning and prediction happens locally on your machine for absolute privacy.' },
                        { icon: '🚀', title: 'Speed & Focus', desc: 'Reduce friction between your thoughts and the screen. Designed to keep you in the flow state with minimal interruptions.' },
                        { icon: '🔗', title: 'Unified Ecosystem', desc: 'One input system for all your ARKIS devices. Seamlessly transition your typing experience across Desktop and Mobile.' },
                        { icon: '🛠️', title: 'Customizable', desc: 'Tailor Light Key to your specific needs. Create your own commands and fine-tune suggestion sensitivity.' },
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

            <section style={{ textAlign: 'center', padding: '120px 5%', background: 'linear-gradient(to bottom, transparent, rgba(245, 158, 11, 0.05))' }}>
                <h2 style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: '800', marginBottom: '24px' }}>The future of input is here.</h2>
                <p style={{ color: 'var(--muted)', fontSize: '18px', marginBottom: '48px' }}>Join the waitlist to be among the first to experience Light Key.</p>
                <Link href="/waitlist?product=light-key" className="btn-primary" style={{ padding: '18px 48px', fontSize: '18px' }}>Join the Waitlist</Link>
            </section>

            <Footer />
            <ChatWidget />
        </div>
    );
}
