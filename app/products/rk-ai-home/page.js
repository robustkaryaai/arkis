'use client';
import { useState, useRef, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import ChatWidget from '@/components/ChatWidget';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { FiCpu, FiMusic, FiSmartphone, FiShield, FiMic, FiActivity, FiPackage, FiPlay, FiZap } from 'react-icons/fi';

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
    const [isPreOrdering, setIsPreOrdering] = useState(false);
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
        setIsPreOrdering(true);
        const target = '/products/pre-order?productId=rkai_home';
        setTimeout(() => {
            if (!authLoading && !user) {
                const redirect = encodeURIComponent(target);
                router.push(`/login?redirect=${redirect}`);
            } else {
                router.push(target);
            }
        }, 800);
    };

    return (
        <div style={{ background: 'var(--background)', minHeight: '100vh', color: 'var(--text)' }}>
            <Navbar />

            {/* PRODUCT HERO */}
            <section className="hero" style={{ minHeight: '90vh', padding: '140px 5% 80px', textAlign: 'center', position: 'relative' }}>
                <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div className="badge float-anim" style={{ marginBottom: '24px', color: '#ec4899', border: '1px solid rgba(236,72,153,0.3)' }}>
                        <span className="dot" style={{ background: '#ec4899' }} /> Hardware Pre-order Phase
                    </div>
                    
                    <h1 style={{ 
                        fontSize: 'clamp(48px, 8vw, 92px)', 
                        fontWeight: '900', 
                        lineHeight: '1.1', 
                        letterSpacing: '-2px',
                        marginBottom: '24px'
                    }}>
                        RK AI <span className="grad-home">Home</span>
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
                            disabled={isPreOrdering}
                            className="btn-primary" 
                            style={{ 
                                padding: '16px 48px', fontSize: '18px', 
                                background: 'linear-gradient(135deg, #ec4899, #be185d, #ec4899)', 
                                backgroundSize: '200% 200%',
                                animation: 'flowGrad 3s ease infinite',
                                border: 'none', cursor: isPreOrdering ? 'default' : 'pointer', fontWeight: '700', 
                                borderRadius: '50px', color: '#fff',
                                transition: 'all 0.3s ease',
                                boxShadow: '0 0 30px rgba(236, 72, 153, 0.4)',
                                display: 'flex', alignItems: 'center', gap: '10px'
                            }}
                            onMouseEnter={e => {
                                if (isPreOrdering) return;
                                e.currentTarget.style.transform = 'translateY(-3px) scale(1.05)';
                                e.currentTarget.style.boxShadow = '0 10px 40px rgba(236, 72, 153, 0.6)';
                            }}
                            onMouseLeave={e => {
                                if (isPreOrdering) return;
                                e.currentTarget.style.transform = '';
                                e.currentTarget.style.boxShadow = '0 0 30px rgba(236, 72, 153, 0.4)';
                            }}
                        >
                            {isPreOrdering ? (
                                <>
                                    <div style={{ width: '18px', height: '18px', borderRadius: '50%', border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', animation: 'spin 0.8s linear infinite' }} />
                                    Loading...
                                </>
                            ) : 'Pre-order Now'}
                        </button>
                        <Link
                            href="/suggest"
                            style={{
                                padding: '16px 32px',
                                borderRadius: '50px',
                                background: 'rgba(236,72,153,0.08)',
                                border: '1px solid rgba(236,72,153,0.35)',
                                color: '#ec4899',
                                fontWeight: '700',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px',
                                textDecoration: 'none',
                                fontSize: '16px',
                                transition: 'all 0.3s ease'
                            }}
                            onMouseEnter={e => {
                                e.currentTarget.style.background = 'rgba(236,72,153,0.15)';
                                e.currentTarget.style.transform = 'translateY(-2px)';
                                e.currentTarget.style.boxShadow = '0 8px 24px rgba(236,72,153,0.2)';
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.background = 'rgba(236,72,153,0.08)';
                                e.currentTarget.style.transform = '';
                                e.currentTarget.style.boxShadow = '';
                            }}
                        >
                            💡 Suggest a Feature
                        </Link>
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
                            <FiPlay />
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
                    {[
                        { icon: <FiCpu size={32} />, title: 'Advanced AI & 101+ Local Commands', desc: 'Powered by Google Gemini for complex reasoning. If the internet goes down, RK automatically falls back to over 100 perfectly optimized local offline commands.' },
                        { icon: <FiMusic size={32} />, title: 'Spotify & 64GB Local Library', desc: 'Seamless Spotify OAuth integration, YouTube-to-MP3 fallback, and a massive 64GB local cache. Mind Reading Autoplay keeps the music going forever using AI matching.' },
                        { icon: <FiSmartphone size={32} />, title: 'Cloud Creation Suite', desc: 'With Rexycore Cloud, generate assignments, PPT presentations, DOCX essays, timetables, and even AI artwork or videos directly from your voice.' },
                        { icon: <FiActivity size={32} />, title: 'Premium Companion App', desc: 'Manage your smart alarms, view command history, pair via BLE, and access the file studio through a stunning mobile companion interface (RexyCore Home).' },
                        { icon: <FiSmartphone size={32} />, title: 'Night Protocol & Uplink', desc: "Send text commands remotely via the Command Uplink. Use 'Night Protocol' to instantly mute all audio responses when your household needs complete silence." },
                        { icon: <FiShield size={32} />, title: 'Privacy & Security Core', desc: 'System tasks process locally. Hardware is anonymized behind 9-digit Slugs. All remote communications are secured with Base64 audio buffers and AES-256 encryption.' }
                    ].map((f, i) => (
                        <div key={i} className="feature-card" style={{ 
                            background: 'var(--surface)', 
                            padding: '40px', 
                            borderRadius: '24px', 
                            border: '1px solid var(--border)',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '16px',
                            transition: 'all 0.3s ease'
                        }}>
                            <div style={{ 
                                color: 'var(--blue)', 
                                background: 'rgba(79, 156, 249, 0.1)', 
                                width: '64px', 
                                height: '64px', 
                                borderRadius: '16px', 
                                display: 'flex', 
                                alignItems: 'center', 
                                justifyContent: 'center' 
                            }}>
                                {f.icon}
                            </div>
                            <h3 style={{ fontSize: '20px', fontWeight: '800' }}>{f.title}</h3>
                            <p style={{ color: 'var(--muted)', fontSize: '15px', lineHeight: '1.7' }}>
                                {f.desc}
                            </p>
                        </div>
                    ))}
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
                        <h2 style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '16px' }}>
                            <FiZap style={{ color: '#fbbf24' }} /> Smart Appliance Control
                        </h2>
                        <p style={{ fontSize: '18px', color: 'var(--muted)', lineHeight: '1.6' }}>
                            RK AI Home is evolving into a complete smart home hub. Soon, you'll be able to directly 
                            control local devices (lights, plugs, thermostats) via voice, interfacing with Matter, 
                            Thread, and Tuya ecosystems—all processed locally for instant response.
                        </p>
                    </div>
                </div>
            </section>

            {/* BOTTOM CTA — SUGGEST FEATURE */}
            <section style={{
                position: 'relative', overflow: 'hidden',
                padding: '160px 5%', textAlign: 'center',
                background: 'linear-gradient(160deg, rgba(236,72,153,0.05) 0%, rgba(0,0,0,0) 60%, rgba(190,24,93,0.03) 100%)',
                borderTop: '1px solid rgba(236,72,153,0.12)'
            }}>
                <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '1px', height: '80px', background: 'linear-gradient(to bottom, rgba(236,72,153,0.7), transparent)' }} />
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '700px', height: '700px', background: 'radial-gradient(circle, rgba(236,72,153,0.07) 0%, transparent 65%)', pointerEvents: 'none' }} />
                <div style={{ position: 'relative', zIndex: 1, maxWidth: '650px', margin: '0 auto' }}>
                    <h2 style={{ fontSize: 'clamp(42px, 7vw, 80px)', fontWeight: '900', lineHeight: '1.05', letterSpacing: '-2px', marginBottom: '20px' }}>
                        Your assistant.<br />
                        <span style={{ background: 'linear-gradient(135deg, #ec4899 30%, #be185d)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Your command.</span>
                    </h2>
                    <p style={{ color: 'var(--muted)', fontSize: '19px', lineHeight: '1.7', marginBottom: '52px' }}>
                        What feature do you want to see in RK AI Home?<br />Tell us — and we'll build it.
                    </p>
                    <Link href="/suggest" style={{
                        display: 'inline-flex', alignItems: 'center', gap: '10px',
                        padding: '20px 56px', fontSize: '17px', borderRadius: '50px',
                        background: 'linear-gradient(135deg, #ec4899, #be185d)',
                        color: '#fff', fontWeight: '800', textDecoration: 'none',
                        boxShadow: '0 10px 40px rgba(236,72,153,0.4)', transition: 'all 0.3s ease'
                    }}
                        onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px) scale(1.04)'; e.currentTarget.style.boxShadow = '0 20px 60px rgba(236,72,153,0.6)'; }}
                        onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 10px 40px rgba(236,72,153,0.4)'; }}
                    >
                        💡 Suggest a Feature
                    </Link>
                </div>
            </section>


            <Footer />

            <style>{`
                @keyframes flowGrad {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
                @keyframes spin {
                    to { transform: rotate(360deg); }
                }
            `}</style>

            <ChatWidget />
        </div>
    );
}
