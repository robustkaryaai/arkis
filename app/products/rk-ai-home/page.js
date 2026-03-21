'use client';
import { useState, useRef, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import ChatWidget from '@/components/ChatWidget';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

export default function RKHomeProduct() {
    const { user, loading: authLoading } = useAuth();
    const router = useRouter();

    const videos = [
        '/rk-ai-home-images/img_2565.mov',
        '/rk-ai-home-images/img_2566.mov',
        '/rk-ai-home-images/img_2567.mov',
        '/rk-ai-home-images/img_2568.mov'
    ];
    const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(true);
    const videoRefs = useRef([]);

    const togglePlayPause = (e) => {
        e.stopPropagation();
        const currentVideo = videoRefs.current[currentVideoIndex];
        if (currentVideo) {
            if (isPlaying) {
                currentVideo.pause();
            } else {
                currentVideo.play().catch(e => console.error(e));
            }
            setIsPlaying(!isPlaying);
        }
    };

    const handleVideoEnd = () => {
        setCurrentVideoIndex((prev) => (prev + 1) % videos.length);
        setIsPlaying(true);
    };

    useEffect(() => {
        const currentVideo = videoRefs.current[currentVideoIndex];
        if (currentVideo && isPlaying) {
            currentVideo.currentTime = 0; // Restart if desired, or just play contiguous
            currentVideo.play().catch(e => console.error("AutoPlay failed", e));
        }
    }, [currentVideoIndex, isPlaying]);

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

                    {/* PRODUCT HERO SLIDER */}
                    <div style={{ 
                        marginTop: '80px', 
                        width: '100%', 
                        maxWidth: '900px', 
                        aspectRatio: '16/9',
                        background: 'var(--surface)',
                        border: '1px solid var(--border)',
                        borderRadius: '32px',
                        display: 'flex',
                        boxShadow: '0 40px 100px rgba(0,0,0,0.5), 0 0 100px rgba(236, 72, 153, 0.4)',
                        position: 'relative',
                        overflow: 'hidden',
                        cursor: 'pointer'
                    }} onClick={togglePlayPause}>
                        {videos.map((src, index) => (
                            <video
                                key={src}
                                src={src}
                                ref={el => videoRefs.current[index] = el}
                                autoPlay={currentVideoIndex === index}
                                muted
                                playsInline
                                onEnded={handleVideoEnd}
                                style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    opacity: currentVideoIndex === index ? 1 : 0,
                                    transition: 'opacity 0.8s ease-in-out',
                                    pointerEvents: currentVideoIndex === index ? 'auto' : 'none',
                                    zIndex: currentVideoIndex === index ? 2 : 1
                                }}
                            />
                        ))}

                        {/* Play/Pause Overlay Component */}
                        <div style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: '80px',
                            height: '80px',
                            borderRadius: '50%',
                            background: 'rgba(0,0,0,0.4)',
                            border: '1px solid rgba(255,255,255,0.1)',
                            backdropFilter: 'blur(8px)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '32px',
                            color: 'white',
                            opacity: isPlaying ? 0 : 1,
                            transition: 'opacity 0.3s ease',
                            pointerEvents: 'none',
                            zIndex: 15
                        }}>
                            {isPlaying ? '' : '▶'}
                        </div>

                        {/* Slider Controls */}
                        <div style={{
                            position: 'absolute',
                            bottom: '24px',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            display: 'flex',
                            gap: '12px',
                            zIndex: 10
                        }}>
                            {videos.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={(e) => { e.stopPropagation(); setCurrentVideoIndex(index); setIsPlaying(true); }}
                                    style={{
                                        width: '12px',
                                        height: '12px',
                                        borderRadius: '50%',
                                        background: currentVideoIndex === index ? '#ec4899' : 'rgba(255, 255, 255, 0.4)',
                                        border: '1px solid rgba(0,0,0,0.2)',
                                        cursor: 'pointer',
                                        transition: 'all 0.3s ease',
                                        padding: 0
                                    }}
                                    aria-label={`Go to video ${index + 1}`}
                                    onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.2)'}
                                    onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                                />
                            ))}
                        </div>

                        <div style={{
                            position: 'absolute', inset: 0,
                            background: 'radial-gradient(circle at center, transparent 30%, rgba(236, 72, 153, 0.4) 100%)',
                            pointerEvents: 'none',
                            mixBlendMode: 'screen',
                            zIndex: 5
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
                        <div style={{ marginTop: '6px', color: 'var(--muted)', fontSize: '13px' }}>Manage via the Rexycore app</div>
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
                        <h3 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '16px' }}>Advanced AI & 101+ Local Commands</h3>
                        <p style={{ color: 'var(--muted)', fontSize: '15px', lineHeight: '1.7' }}>
                            Powered by Google Gemini for complex reasoning. If the internet goes down, RK automatically falls back to over 100 perfectly optimized local offline commands.
                        </p>
                    </div>

                    <div className="feature-card" style={{ background: 'var(--surface)', padding: '40px', borderRadius: '24px', border: '1px solid var(--border)' }}>
                        <div style={{ fontSize: '32px', marginBottom: '20px' }}>🎵</div>
                        <h3 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '16px' }}>Spotify & 64GB Local Library</h3>
                        <p style={{ color: 'var(--muted)', fontSize: '15px', lineHeight: '1.7' }}>
                            Seamless Spotify OAuth integration, YouTube-to-MP3 fallback, and a massive 64GB local cache. Mind Reading Autoplay keeps the music going forever using AI matching.
                        </p>
                    </div>

                    <div className="feature-card" style={{ background: 'var(--surface)', padding: '40px', borderRadius: '24px', border: '1px solid var(--border)' }}>
                        <div style={{ fontSize: '32px', marginBottom: '20px' }}>☁️</div>
                        <h3 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '16px' }}>Cloud Creation Suite</h3>
                        <p style={{ color: 'var(--muted)', fontSize: '15px', lineHeight: '1.7' }}>
                            With Rexycore Cloud, generate assignments, PPT presentations, DOCX essays, timetables, and even AI artwork or videos directly from your voice.
                        </p>
                    </div>

                    <div className="feature-card" style={{ background: 'var(--surface)', padding: '40px', borderRadius: '24px', border: '1px solid var(--border)' }}>
                        <div style={{ fontSize: '32px', marginBottom: '20px' }}>✨</div>
                        <h3 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '16px' }}>Premium Companion App</h3>
                        <p style={{ fontSize: '1.2rem', color: 'var(--muted)', lineHeight: '1.8' }}>
                            Manage your smart alarms, view command history, pair via BLE, and access the file studio through a stunning mobile companion interface (RexyCore Home).
                        </p>
                    </div>

                    <div className="feature-card" style={{ background: 'var(--surface)', padding: '40px', borderRadius: '24px', border: '1px solid var(--border)' }}>
                        <div style={{ fontSize: '32px', marginBottom: '20px' }}>📲</div>
                        <h3 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '16px' }}>Night Protocol & Uplink</h3>
                        <p style={{ color: 'var(--muted)', fontSize: '15px', lineHeight: '1.7' }}>
                            Send text commands remotely via the Command Uplink. Use 'Night Protocol' to instantly mute all audio responses when your household needs complete silence.
                        </p>
                    </div>

                    <div className="feature-card" style={{ background: 'var(--surface)', padding: '40px', borderRadius: '24px', border: '1px solid var(--border)' }}>
                        <div style={{ fontSize: '32px', marginBottom: '20px' }}>🛡️</div>
                        <h3 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '16px' }}>Privacy & Security Core</h3>
                        <p style={{ color: 'var(--muted)', fontSize: '15px', lineHeight: '1.7' }}>
                            System tasks process locally. Hardware is anonymized behind 9-digit Slugs. All remote communications are secured with Base64 audio buffers and AES-256 encryption.
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
