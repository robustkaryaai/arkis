'use client';
import Navbar from '@/components/Navbar';
import ChatWidget from '@/components/ChatWidget';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

export default function RKHomeProduct() {
    const { user, loading: authLoading } = useAuth();
    const router = useRouter();

    const handlePreOrder = (e) => {
        e.preventDefault();
        if (!authLoading && !user) {
            router.push('/login?redirect=/products/pre-order?productId=rkai_home');
        } else {
            router.push('/products/pre-order?productId=rkai_home');
        }
    };

    return (
        <div style={{ background: 'var(--background)', minHeight: '100vh', color: 'var(--text)' }}>
            <Navbar />

            {/* PRODUCT HERO */}
            <section className="hero" style={{ minHeight: '90vh', padding: '140px 5% 80px', textAlign: 'center', position: 'relative' }}>
                <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div className="badge float-anim" style={{ marginBottom: '24px', color: '#fbbf24', border: '1px solid rgba(251,191,36,0.3)' }}>
                        <span className="dot" style={{ background: '#fbbf24' }} /> Hardware Pre-order Phase
                    </div>
                    
                    <h1 style={{ 
                        fontSize: 'clamp(48px, 8vw, 92px)', 
                        fontWeight: '900', 
                        lineHeight: '1.1', 
                        letterSpacing: '-2px',
                        marginBottom: '24px'
                    }}>
                        RK AI <span className="grad">Home</span>
                    </h1>
                    
                    <p style={{ 
                        fontSize: 'clamp(18px, 2.5vw, 24px)', 
                        color: 'var(--blue)', 
                        fontWeight: '600',
                        marginBottom: '16px',
                        letterSpacing: '1px',
                        textTransform: 'uppercase'
                    }}>
                        The Intelligent Endpoint for Your Living Space.
                    </p>

                    <p style={{ 
                        fontSize: 'clamp(16px, 1.8vw, 20px)', 
                        color: 'var(--muted)', 
                        maxWidth: '850px', 
                        lineHeight: '1.7',
                        marginBottom: '40px'
                    }}>
                        A lightweight, highly optimized voice assistant designed for the edge. 
                        Powered by Gemini and local intent routing, RK AI Home provides a hands-free, 
                        private experience for your entire household.
                    </p>

                    <div style={{ 
                        display: 'flex', 
                        flexWrap: 'wrap', 
                        gap: '16px', 
                        justifyContent: 'center'
                    }}>
                        <button 
                            onClick={handlePreOrder} 
                            className="btn-primary" 
                            style={{ 
                                padding: '16px 48px', fontSize: '18px', 
                                background: 'linear-gradient(135deg, #ec4899, #be185d)', 
                                border: 'none', cursor: 'pointer', fontWeight: '700', 
                                borderRadius: '50px', color: '#fff',
                                transition: 'all 0.3s ease',
                                boxShadow: '0 0 30px rgba(236, 72, 153, 0.3)'
                            }}
                            onMouseEnter={e => {
                                e.currentTarget.style.transform = 'translateY(-3px) scale(1.05)';
                                e.currentTarget.style.boxShadow = '0 10px 30px rgba(236, 72, 153, 0.5)';
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.transform = '';
                                e.currentTarget.style.boxShadow = '0 0 30px rgba(236, 72, 153, 0.3)';
                            }}
                        >
                            Pre-order Now
                        </button>
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
                            📦 Shipping Q3 2026
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
                        overflow: 'hidden'
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

            <section style={{ padding: '60px 5% 20px', maxWidth: '1200px', margin: '0 auto' }}>
                <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                    <div className="label">At a Glance</div>
                    <h2 style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: '800' }}>Price, delivery, and warranty.</h2>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '18px' }}>
                    <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '20px', padding: '22px' }}>
                        <div style={{ fontSize: '12px', fontWeight: '800', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--muted)' }}>Price</div>
                        <div style={{ marginTop: '10px', fontSize: '28px', fontWeight: '900' }}>₹4,999</div>
                        <div style={{ marginTop: '6px', color: 'var(--muted)', fontSize: '13px' }}>Hardware pre-order</div>
                    </div>
                    <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '20px', padding: '22px' }}>
                        <div style={{ fontSize: '12px', fontWeight: '800', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--muted)' }}>Delivery</div>
                        <div style={{ marginTop: '10px', fontSize: '28px', fontWeight: '900' }}>Q3 2026</div>
                        <div style={{ marginTop: '6px', color: 'var(--muted)', fontSize: '13px' }}>Estimated shipping window</div>
                    </div>
                    <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '20px', padding: '22px' }}>
                        <div style={{ fontSize: '12px', fontWeight: '800', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--muted)' }}>Warranty</div>
                        <div style={{ marginTop: '10px', fontSize: '28px', fontWeight: '900' }}>1 Year</div>
                        <div style={{ marginTop: '6px', color: 'var(--muted)', fontSize: '13px' }}>Limited hardware warranty</div>
                    </div>
                    <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '20px', padding: '22px' }}>
                        <div style={{ fontSize: '12px', fontWeight: '800', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--muted)' }}>Control</div>
                        <div style={{ marginTop: '10px', fontSize: '28px', fontWeight: '900' }}>Anywhere</div>
                        <div style={{ marginTop: '6px', color: 'var(--muted)', fontSize: '13px' }}>Manage via the ARKIS app</div>
                    </div>
                </div>
            </section>

            {/* CORE FEATURES SECTION */}
            <section style={{ padding: '100px 5%', maxWidth: '1200px', margin: '0 auto' }}>
                <div style={{ textAlign: 'center', marginBottom: '80px' }}>
                    <div className="label">Technical Excellence</div>
                    <h2 style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: '800' }}>Powerful Intelligence at the Edge.</h2>
                </div>

                <div style={{
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                    gap: '32px'
                }}>
                    <div className="feature-card" style={{ background: 'var(--surface)', padding: '40px', borderRadius: '24px', border: '1px solid var(--border)' }}>
                        <div style={{ fontSize: '32px', marginBottom: '20px' }}>🧠</div>
                        <h3 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '16px' }}>Advanced AI & Intent Routing</h3>
                        <p style={{ color: 'var(--muted)', fontSize: '15px', lineHeight: '1.7' }}>
                            Powered by Google's Gemini for complex reasoning and an AI-driven intent classifier for zero-latency local commands.
                            Built-in memory engine ensures contextual awareness across conversations.
                        </p>
                    </div>

                    <div className="feature-card" style={{ background: 'var(--surface)', padding: '40px', borderRadius: '24px', border: '1px solid var(--border)' }}>
                        <div style={{ fontSize: '32px', marginBottom: '20px' }}>🛡️</div>
                        <h3 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '16px' }}>Autonomous Resilience</h3>
                        <p style={{ color: 'var(--muted)', fontSize: '15px', lineHeight: '1.7' }}>
                            Offline fallback with 50+ whitelisted commands. Continuous self-diagnosis and error monitoring 
                            ensure maximum uptime and reliability without cloud dependence.
                        </p>
                    </div>

                    <div className="feature-card" style={{ background: 'var(--surface)', padding: '40px', borderRadius: '24px', border: '1px solid var(--border)' }}>
                        <div style={{ fontSize: '32px', marginBottom: '20px' }}>🎵</div>
                        <h3 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '16px' }}>Integrated Utilities</h3>
                        <p style={{ color: 'var(--muted)', fontSize: '15px', lineHeight: '1.7' }}>
                            Native music management, localized news, and weather with offline caching. Seamless 
                            provisioning via Bluetooth and real-time command polling from the mobile app.
                        </p>
                    </div>

                    <div className="feature-card" style={{ background: 'var(--surface)', padding: '40px', borderRadius: '24px', border: '1px solid var(--border)' }}>
                        <div style={{ fontSize: '32px', marginBottom: '20px' }}>☁️</div>
                        <h3 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '16px' }}>Cloud Creation Suite</h3>
                        <p style={{ color: 'var(--muted)', fontSize: '15px', lineHeight: '1.7' }}>
                            With ARKIS Cloud, generate notes, PPTs, timetables, DOCX files, planners, assignments, and tests—plus create AI images and videos—right from your home assistant.
                        </p>
                    </div>

                    <div className="feature-card" style={{ background: 'var(--surface)', padding: '40px', borderRadius: '24px', border: '1px solid var(--border)' }}>
                        <div style={{ fontSize: '32px', marginBottom: '20px' }}>✨</div>
                        <h3 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '16px' }}>Premium App Experience</h3>
                        <p style={{ color: 'var(--muted)', fontSize: '15px', lineHeight: '1.7' }}>
                            A polished mobile experience to configure your device, manage skills, and access your assistant instantly with a fast, premium interface.
                        </p>
                    </div>

                    <div className="feature-card" style={{ background: 'var(--surface)', padding: '40px', borderRadius: '24px', border: '1px solid var(--border)' }}>
                        <div style={{ fontSize: '32px', marginBottom: '20px' }}>📲</div>
                        <h3 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '16px' }}>Control From Anywhere</h3>
                        <p style={{ color: 'var(--muted)', fontSize: '15px', lineHeight: '1.7' }}>
                            Trigger commands remotely, monitor device status, and manage settings from your phone—securely—whether you’re in the next room or across the world.
                        </p>
                    </div>
                </div>
            </section>

            {/* UPCOMING FEATURES SECTION */}
            <section style={{ padding: '100px 5%', maxWidth: '1200px', margin: '0 auto', borderTop: '1px solid var(--border)' }}>
                <div style={{ 
                    background: 'linear-gradient(135deg, rgba(79, 156, 249, 0.05), rgba(155, 89, 245, 0.05))',
                    borderRadius: '32px',
                    padding: '60px',
                    border: '1px solid var(--border)'
                }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '800px' }}>
                        <div style={{ fontSize: '12px', fontWeight: '700', color: 'var(--blue)', textTransform: 'uppercase', letterSpacing: '2px' }}>Upcoming Roadmap</div>
                        <h2 style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: '800' }}>🔌 Smart Appliance Control</h2>
                        <p style={{ fontSize: '18px', color: 'var(--muted)', lineHeight: '1.6' }}>
                            RK AI Home is evolving into a complete smart home hub. Soon, you'll be able to directly 
                            control local devices (lights, plugs, thermostats) via voice, interfacing with Matter, 
                            Thread, and Tuya ecosystems—all processed locally for instant response.
                        </p>
                    </div>
                </div>
            </section>

            <section style={{ textAlign: 'center', padding: '120px 5%', background: 'linear-gradient(to bottom, transparent, rgba(236, 72, 153, 0.05))' }}>
                <h2 style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: '800', marginBottom: '24px' }}>Building the future of living.</h2>
                <p style={{ color: 'var(--muted)', fontSize: '18px', marginBottom: '48px' }}>Interested in early testing? Join the community for project updates.</p>
                <Link href="/login?redirect=/products/rk-ai-home" className="btn-secondary" style={{ padding: '18px 48px', fontSize: '18px' }}>Join the Community</Link>
            </section>

            <Footer />

            <ChatWidget />
        </div>
    );
}
