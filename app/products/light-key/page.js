'use client';
import Navbar from '@/components/Navbar';
import ChatWidget from '@/components/ChatWidget';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { FiCpu, FiZap, FiCommand, FiLock, FiFastForward, FiLink, FiSettings } from 'react-icons/fi';

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
                        Light <span className="grad-lightkey">Key</span>
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
                        and automate typing tasks across the entire Rexycore ecosystem.
                    </p>

                    <div style={{ 
                        display: 'flex', 
                        flexWrap: 'wrap', 
                        gap: '16px', 
                        justifyContent: 'center'
                    }}>
                        <Link 
                            href="/notify?product=light-key" 
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
                        overflow: 'hidden',
                        color: '#f59e0b'
                    }}>
                        <FiCpu size={120} />
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
                        { icon: <FiZap size={40} />, title: 'Contextual Suggestions', desc: 'Predictive typing that understands your intent. Light Key learns your vocabulary and context to offer relevant word and phrase completions.' },
                        { icon: <FiCommand size={40} />, title: 'Smart Commands', desc: 'Execute system actions directly from your keyboard. Use simple shortcuts to trigger complex AI workflows and automations.' },
                        { icon: <FiLock size={40} />, title: 'Private by Design', desc: 'Your keystrokes are never uploaded. All learning and prediction happens locally on your machine for absolute privacy.' },
                        { icon: <FiFastForward size={40} />, title: 'Speed & Focus', desc: 'Reduce friction between your thoughts and the screen. Designed to keep you in the flow state with minimal interruptions.' },
                        { icon: <FiLink size={40} />, title: 'Unified Ecosystem', desc: 'One input system for all your Rexycore devices. Seamlessly transition your typing experience across Desktop and Mobile.' },
                        { icon: <FiSettings size={40} />, title: 'Customizable', desc: 'Tailor Light Key to your specific needs. Create your own commands and fine-tune suggestion sensitivity.' },
                    ].map((f, i) => (
                        <div key={f.title} className="feature-card" style={{
                            background: 'var(--surface)', 
                            padding: '40px', 
                            borderRadius: '24px',
                            border: '1px solid var(--border)',
                            transition: 'all 0.3s ease',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '16px'
                        }}>
                            <div style={{ 
                                color: '#f59e0b', 
                                background: 'rgba(245, 158, 11, 0.1)', 
                                width: '64px', 
                                height: '64px', 
                                borderRadius: '16px', 
                                display: 'flex', 
                                alignItems: 'center', 
                                justifyContent: 'center' 
                            }}>{f.icon}</div>
                            <h3 style={{ fontSize: '22px', fontWeight: '800' }}>{f.title}</h3>
                            <p style={{ color: 'var(--muted)', fontSize: '16px', lineHeight: '1.7' }}>{f.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* BOTTOM CTA */}
            <section style={{
                position: 'relative', overflow: 'hidden',
                padding: '160px 5%', textAlign: 'center',
                background: 'linear-gradient(160deg, rgba(245,158,11,0.06) 0%, rgba(0,0,0,0) 60%, rgba(217,119,6,0.04) 100%)',
                borderTop: '1px solid rgba(245,158,11,0.15)'
            }}>
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '800px', height: '800px', background: 'radial-gradient(circle, rgba(245,158,11,0.07) 0%, transparent 65%)', pointerEvents: 'none' }} />
                <div style={{ position: 'relative', zIndex: 1, maxWidth: '700px', margin: '0 auto' }}>
                    <p style={{ fontSize: '13px', fontWeight: '800', color: '#f59e0b', letterSpacing: '4px', textTransform: 'uppercase', marginBottom: '28px' }}>LIGHT KEY · Coming Soon</p>
                    <h2 style={{ fontSize: 'clamp(42px, 7vw, 80px)', fontWeight: '900', lineHeight: '1.05', letterSpacing: '-2px', marginBottom: '28px' }}>
                        Type smarter.<br />
                        <span style={{ background: 'linear-gradient(135deg, #f59e0b 30%, #d97706)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Think faster.</span>
                    </h2>
                    <p style={{ color: 'var(--muted)', fontSize: '18px', lineHeight: '1.7', marginBottom: '52px' }}>
                        First units are reserved for early supporters. Follow the journey — and secure your name on the launch list before it fills.
                    </p>
                    <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <Link href="/journey/light-key" style={{
                            padding: '20px 52px', fontSize: '17px', borderRadius: '50px',
                            background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                            color: '#fff', fontWeight: '800', textDecoration: 'none',
                            boxShadow: '0 10px 40px rgba(245,158,11,0.4)', transition: 'all 0.3s ease'
                        }}
                            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px) scale(1.04)'; e.currentTarget.style.boxShadow = '0 20px 60px rgba(245,158,11,0.6)'; }}
                            onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 10px 40px rgba(245,158,11,0.4)'; }}
                        >Join the Journey →</Link>
                        <Link href="/notify?product=light-key" style={{
                            padding: '20px 52px', fontSize: '17px', borderRadius: '50px',
                            background: 'transparent', border: '1px solid rgba(245,158,11,0.4)',
                            color: '#f59e0b', fontWeight: '800', textDecoration: 'none',
                            transition: 'all 0.3s ease'
                        }}
                            onMouseEnter={e => { e.currentTarget.style.borderColor = '#f59e0b'; e.currentTarget.style.background = 'rgba(245,158,11,0.08)'; e.currentTarget.style.transform = 'translateY(-3px)'; }}
                            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(245,158,11,0.4)'; e.currentTarget.style.background = 'transparent'; e.currentTarget.style.transform = ''; }}
                        >Notify Me at Launch</Link>
                    </div>
                </div>
            </section>


            <Footer />
            <ChatWidget />
        </div>
    );
}
