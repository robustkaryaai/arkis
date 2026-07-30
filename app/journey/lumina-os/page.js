'use client';
import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import ChatWidget from '@/components/ChatWidget';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { FiCheckCircle, FiCircle, FiArrowRight, FiTool } from 'react-icons/fi';

const timeline = [
    {
        title: "Concept & Architecture",
        desc: "Designing the foundation of an AI-native operating system. Focused on zero-latency data pipelines and kernel-level integrations.",
        status: "completed",
        date: "Q3 2025"
    },
    {
        title: "Private Alpha Core",
        desc: "Initial boot sequence and core UI elements successfully tested. Neural processing unit (NPU) scheduling optimized.",
        status: "completed",
        date: "Q1 2026"
    },
    {
        title: "Active Development (Now)",
        desc: "Lumina OS is a long-term project in development, exploring how privacy, transparency, and AI can be considered from the beginning of an operating system.",
        status: "active",
        date: "Q3 2026"
    },
    {
        title: "Release Candidate 1",
        desc: "Full ecosystem sync with RK AI Home and Desktop. Security audits and final performance tuning.",
        status: "upcoming",
        date: "Q4 2026"
    },
    {
        title: "Global Launch",
        desc: "Lumina OS v1.0 goes live. The evolution of computing officially begins.",
        status: "upcoming",
        date: "Q1 2027"
    }
];

export default function LuminaJourney() {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth <= 768);
        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, []);

    useEffect(() => {
        const observerOptions = { threshold: 0.15, rootMargin: '0px 0px -40px 0px' };
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) entry.target.classList.add('active');
            });
        }, observerOptions);
        document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    return (
        <div style={{ background: 'var(--background)', color: 'var(--text)', minHeight: '100vh', overflowX: 'hidden' }}>
            <Navbar />

            {/* Hero */}
            <section style={{ minHeight: '60vh', paddingTop: '140px', paddingBottom: '60px', textAlign: 'center', position: 'relative', padding: '140px 5% 60px' }}>
                <div style={{ position: 'absolute', top: '30%', left: '50%', transform: 'translate(-50%, -50%)', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(168,85,247,0.15) 0%, transparent 70%)', zIndex: 0, pointerEvents: 'none' }} />
                <div style={{ maxWidth: '800px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
                    <div className="hero-eyebrow float-anim" style={{ margin: '0 auto 16px', background: 'rgba(168,85,247,0.1)', color: '#a855f7', border: '1px solid rgba(168,85,247,0.3)' }}>
                        <span className="pulse" style={{ background: '#a855f7', boxShadow: '0 0 10px #a855f7' }} />
                        Lumina OS — Build Journey
                    </div>
                    <h1 style={{ fontSize: 'clamp(36px, 8vw, 80px)', lineHeight: '1.1', letterSpacing: '-2px', fontWeight: '900' }}>
                        We&apos;re building<br />
                        <span style={{ background: 'linear-gradient(90deg, #a855f7, #6366f1, #a855f7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                            Lumina OS.
                        </span>
                    </h1>
                    <p style={{ fontSize: 'clamp(15px, 2vw, 19px)', opacity: 0.7, marginTop: '24px', maxWidth: '600px', margin: '24px auto 0', lineHeight: '1.7' }}>
                        Follow our real development roadmap as we craft a lightweight, AI-integrated operating system built for speed, privacy, and intelligent workflows.
                    </p>
                </div>
            </section>

            {/* Timeline */}
            <section style={{ maxWidth: '1000px', margin: '0 auto', padding: isMobile ? '40px 20px 80px' : '60px 5% 100px', position: 'relative' }}>

                {/* Vertical line */}
                {!isMobile && (
                    <div style={{
                        position: 'absolute', left: '50%', transform: 'translateX(-50%)',
                        top: '60px', bottom: '100px', width: '2px',
                        background: 'linear-gradient(90deg, rgba(168, 85, 247, 0.6, 247, 85, rgba(168), rgba(99,102,241,0.1))',
                        zIndex: 0
                    }} />
                )}
                {isMobile && (
                    <div style={{
                        position: 'absolute', left: '28px', top: '40px', bottom: '40px', width: '2px',
                        background: 'linear-gradient(90deg, rgba(168, 85, 247, 0.6, 247, 85, rgba(168), rgba(99,102,241,0.1))',
                        zIndex: 0
                    }} />
                )}

                <div style={{ display: 'flex', flexDirection: 'column', gap: isMobile ? '32px' : '60px', position: 'relative', zIndex: 1 }}>
                    {timeline.map((item, i) => {
                        const isLeft = i % 2 === 0;
                        const isCompleted = item.status === 'completed';
                        const isActive = item.status === 'active';
                        const color = isActive ? '#a855f7' : isCompleted ? '#22c55e' : 'rgba(255,255,255,0.3)';

                        /* ─── Mobile layout ─── */
                        if (isMobile) {
                            return (
                                <div key={i} className="reveal reveal-delay-1" style={{ display: 'flex', alignItems: 'flex-start', gap: '20px' }}>
                                    {/* Dot */}
                                    <div style={{
                                        flexShrink: 0, marginTop: '4px',
                                        width: '36px', height: '36px', borderRadius: '50%',
                                        background: 'var(--background)', border: `2px solid ${color}`,
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        color, boxShadow: isActive ? `0 0 20px ${color}` : 'none', zIndex: 2
                                    }}>
                                        {isCompleted ? <FiCheckCircle size={16} /> : isActive ? <FiTool size={16} /> : <FiCircle size={16} />}
                                    </div>
                                    {/* Card */}
                                    <div style={{
                                        flex: 1,
                                        background: isActive ? 'rgba(168,85,247,0.05)' : 'var(--surface)',
                                        border: `1px solid ${isActive ? 'rgba(168,85,247,0.3)' : 'var(--border)'}`,
                                        padding: '20px', borderRadius: '16px',
                                        boxShadow: isActive ? '0 10px 40px rgba(168,85,247,0.1)' : 'none',
                                    }}>
                                        <div style={{ fontSize: '11px', fontWeight: '800', color, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '6px' }}>{item.date}</div>
                                        <h3 style={{ fontSize: '18px', fontWeight: '800', marginBottom: '8px', color: isActive ? '#fff' : 'var(--text)' }}>{item.title}</h3>
                                        <p style={{ fontSize: '14px', color: 'var(--muted)', lineHeight: '1.6', margin: 0 }}>{item.desc}</p>
                                    </div>
                                </div>
                            );
                        }

                        /* ─── Desktop layout ─── */
                        return (
                            <div key={i} className="reveal reveal-delay-1" style={{
                                display: 'flex',
                                flexDirection: isLeft ? 'row' : 'row-reverse',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '40px'
                            }}>
                                {/* Content */}
                                <div style={{ flex: 1, display: 'flex', justifyContent: isLeft ? 'flex-end' : 'flex-start', textAlign: isLeft ? 'right' : 'left' }}>
                                    <div style={{
                                        background: isActive ? 'rgba(168,85,247,0.05)' : 'var(--surface)',
                                        border: `1px solid ${isActive ? 'rgba(168,85,247,0.3)' : 'var(--border)'}`,
                                        padding: '30px', borderRadius: '20px', maxWidth: '400px',
                                        boxShadow: isActive ? '0 10px 40px rgba(168,85,247,0.1)' : 'none',
                                        transition: 'transform 0.3s',
                                    }}
                                        onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-5px)'}
                                        onMouseLeave={e => e.currentTarget.style.transform = ''}
                                    >
                                        <div style={{ fontSize: '12px', fontWeight: '800', color, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '8px' }}>{item.date}</div>
                                        <h3 style={{ fontSize: '24px', fontWeight: '800', marginBottom: '12px', color: isActive ? '#fff' : 'var(--text)' }}>{item.title}</h3>
                                        <p style={{ fontSize: '15px', color: 'var(--muted)', lineHeight: '1.6', margin: 0 }}>{item.desc}</p>
                                    </div>
                                </div>

                                {/* Center dot */}
                                <div style={{
                                    flexShrink: 0, width: '40px', height: '40px', borderRadius: '50%',
                                    background: 'var(--background)', border: `2px solid ${color}`,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    color, boxShadow: isActive ? `0 0 24px ${color}` : 'none', zIndex: 2
                                }}>
                                    {isCompleted ? <FiCheckCircle size={20} /> : isActive ? <FiTool size={20} /> : <FiCircle size={20} />}
                                </div>

                                {/* Balance spacer */}
                                <div style={{ flex: 1 }} />
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* CTA */}
            <section style={{ padding: 'clamp(50px, 8vw, 80px) 5%', textAlign: 'center', background: 'linear-gradient(90deg, transparent, rgba(168, 85, 247, 0.05, 247, 85, rgba(168, transparent))', borderTop: '1px solid var(--border)' }}>
                <div style={{ maxWidth: '600px', margin: '0 auto' }} className="reveal">
                    <div style={{ fontSize: '12px', fontWeight: '800', letterSpacing: '3px', color: '#a855f7', textTransform: 'uppercase', marginBottom: '16px' }}>
                        In Active Development
                    </div>
                    <h2 style={{ fontSize: 'clamp(26px, 5vw, 40px)', fontWeight: '900', marginBottom: '16px', lineHeight: '1.2' }}>
                        We&apos;re building Lumina OS right now.
                    </h2>
                    <p style={{ fontSize: 'clamp(14px, 2vw, 16px)', color: 'var(--muted)', marginBottom: '36px', lineHeight: '1.7' }}>
                        Be the first to know when we open early access. No spam — just a single notification when Lumina OS is ready for you.
                    </p>
                    <Link href="/notify?product=lumina-os" style={{
                        display: 'inline-flex', alignItems: 'center', gap: '12px',
                        background: 'linear-gradient(90deg, #a855f7, #6366f1, #a855f7)',
                        color: '#fff', padding: 'clamp(14px, 2vw, 18px) clamp(28px, 5vw, 44px)',
                        borderRadius: '50px', fontWeight: '800',
                        fontSize: 'clamp(14px, 2vw, 16px)',
                        textDecoration: 'none',
                        boxShadow: '0 10px 30px rgba(168,85,247,0.3)',
                        transition: 'transform 0.3s, box-shadow 0.3s'
                    }}
                        onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.05)'; e.currentTarget.style.boxShadow = '0 15px 40px rgba(168,85,247,0.5)'; }}
                        onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 10px 30px rgba(168,85,247,0.3)'; }}
                    >
                        Notify Me When It&apos;s Ready <FiArrowRight size={20} />
                    </Link>
                </div>
            </section>

            <Footer />
            <ChatWidget />
        </div>
    );
}
