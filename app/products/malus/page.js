'use client';
import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ChatWidget from '@/components/ChatWidget';
import Link from 'next/link';
import { FiDownload, FiTerminal, FiAlertCircle, FiCpu, FiShield, FiCheckCircle, FiMic, FiLayout, FiActivity, FiBox, FiArchive } from 'react-icons/fi';
import { FaWindows } from 'react-icons/fa';

// ── CUSTOM CSS ANIMATED COMPONENTS ────────────────────────────────────────

// 🧠 Animated AI Core Component (Hero Section)
function AnimatedCoreIcon() {
    return (
        <div className="css-core-container">
            <div className="css-core-outer">
                <div className="css-core-inner">
                    <div className="css-core-pulse" />
                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="css-core-svg">
                        <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2" />
                        <line x1="12" y1="22" x2="12" y2="15.5" />
                        <polyline points="22 8.5 12 15.5 2 8.5" />
                        <polyline points="2 15.5 12 8.5 22 15.5" />
                        <line x1="12" y1="2" x2="12" y2="8.5" />
                    </svg>
                    <div className="css-core-dots">
                        <span className="dot-c" style={{ top: '-15px', left: '50%' }} />
                        <span className="dot-c" style={{ bottom: '-15px', left: '50%' }} />
                        <span className="dot-c" style={{ top: '50%', left: '-15px' }} />
                        <span className="dot-c" style={{ top: '50%', right: '-15px' }} />
                    </div>
                </div>
            </div>
            
            {/* Connecting Lines */}
            <div className="css-line-horizontal" />
            <div className="css-line-vertical" />

            <style jsx>{`
                .css-core-container {
                    width: 280px;
                    height: 280px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    position: relative;
                    margin-bottom: 20px;
                }
                .css-core-outer {
                    width: 160px;
                    height: 160px;
                    border-radius: 50%;
                    border: 1px dashed rgba(16, 185, 129, 0.4);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    position: relative;
                    animation: spin-slow 20s linear infinite;
                    z-index: 2;
                    background: var(--surface);
                }
                .css-core-inner {
                    width: 100px;
                    height: 100px;
                    border-radius: 50%;
                    background: rgba(16, 185, 129, 0.1);
                    border: 1px solid rgba(16, 185, 129, 0.3);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    position: relative;
                    animation: spin-slow-reverse 15s linear infinite;
                    box-shadow: 0 0 40px rgba(16, 185, 129, 0.2);
                }
                .css-core-pulse {
                    position: absolute;
                    inset: 0;
                    border-radius: 50%;
                    background: radial-gradient(circle at center, rgba(16, 185, 129, 0.4) 0%, transparent 70%);
                    animation: core-pulse 3s infinite alternate;
                }
                .css-core-svg {
                    position: relative;
                    z-index: 3;
                    animation: float-icon 4s ease-in-out infinite;
                }
                .css-core-dots .dot-c {
                    position: absolute;
                    width: 8px;
                    height: 8px;
                    background: #10B981;
                    border-radius: 50%;
                    box-shadow: 0 0 10px #10B981;
                    transform: translate(-50%, -50%);
                    animation: dot-pulse 2s infinite alternate;
                }
                .css-line-horizontal, .css-line-vertical {
                    position: absolute;
                    background: linear-gradient(90deg, transparent, rgba(16, 185, 129, 0.5), transparent);
                    z-index: 1;
                }
                .css-line-horizontal {
                    width: 100%;
                    height: 1px;
                    left: 0;
                    top: 50%;
                }
                .css-line-vertical {
                    height: 100%;
                    width: 1px;
                    top: 0;
                    left: 50%;
                    background: linear-gradient(0deg, transparent, rgba(16, 185, 129, 0.5), transparent);
                }
                @keyframes spin-slow { 100% { transform: rotate(360deg); } }
                @keyframes spin-slow-reverse { 100% { transform: rotate(-360deg); } }
                @keyframes core-pulse { 0% { opacity: 0.5; transform: scale(0.9); } 100% { opacity: 1; transform: scale(1.1); } }
                @keyframes float-icon { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-5px); } }
                @keyframes dot-pulse { 0% { opacity: 0.4; transform: translate(-50%, -50%) scale(0.8); } 100% { opacity: 1; transform: translate(-50%, -50%) scale(1.2); } }
            `}</style>
        </div>
    );
}

// 👁️ Context Awareness Icon
function AnimatedEyeIcon() {
    return (
        <div className="animated-icon-box">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="eye-svg">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" className="eye-pupil" />
            </svg>
            <style jsx>{`
                .animated-icon-box { display: inline-block; }
                .eye-svg { animation: eye-float 4s ease-in-out infinite; }
                .eye-pupil { animation: pupil-move 6s infinite; }
                @keyframes eye-float {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-4px); }
                }
                @keyframes pupil-move {
                    0%, 10% { transform: translate(0, 0); }
                    20%, 30% { transform: translate(-2px, 0); }
                    40%, 50% { transform: translate(2px, 0); }
                    60%, 100% { transform: translate(0, 0); }
                }
            `}</style>
        </div>
    );
}

// ⚡ Workflow Intelligence Icon
function AnimatedZapIcon() {
    return (
        <div className="animated-icon-box">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="zap-svg">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
            </svg>
            <style jsx>{`
                .zap-svg { animation: zap-flicker 2s infinite ease-in-out; filter: drop-shadow(0 0 4px rgba(16, 185, 129, 0.5)); }
                @keyframes zap-flicker {
                    0%, 100% { opacity: 1; transform: scale(1); }
                    45%, 55% { opacity: 0.8; }
                    50% { opacity: 1; transform: scale(1.1); }
                }
            `}</style>
        </div>
    );
}

// 🛡️ Privacy Icon (Emerald)
function AnimatedEmeraldShieldIcon() {
    return (
        <div className="animated-icon-box">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shield-svg">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            <style jsx>{`
                .shield-svg { animation: shield-rotate 4s infinite ease-in-out; }
                @keyframes shield-rotate {
                    0%, 100% { transform: rotateY(0deg); }
                    50% { transform: rotateY(20deg); }
                }
            `}</style>
        </div>
    );
}

// 💬 Smart Conversations Icon
function AnimatedChatIcon() {
    return (
        <div className="animated-icon-box">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="chat-svg">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                <line x1="9" y1="10" x2="15" y2="10" className="c-line l1" />
                <line x1="9" y1="14" x2="13" y2="14" className="c-line l2" />
            </svg>
            <style jsx>{`
                .chat-svg { animation: chat-bounce 3s infinite ease-in-out; }
                .c-line { stroke-dasharray: 10; stroke-dashoffset: 10; }
                .l1 { animation: type-line 2s infinite steps(10); }
                .l2 { animation: type-line 2s infinite steps(10) 0.5s; }
                @keyframes chat-bounce {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-4px); }
                }
                @keyframes type-line {
                    0%, 20% { stroke-dashoffset: 10; }
                    80%, 100% { stroke-dashoffset: 0; }
                }
            `}</style>
        </div>
    );
}

export default function MalusProductPage() {
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

    const startDownload = () => {
        alert("MALUS Windows release is coming soon. Join the waitlist!");
    };

    return (
        <div style={{ background: 'var(--background)', minHeight: '100vh', color: 'var(--text)' }}>
            <Navbar />

            {/* SVG Gradients definitions */}
            <svg style={{ position: 'absolute', width: 0, height: 0 }} aria-hidden="true">
                <defs>
                    <linearGradient id="emerald-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#34D399" />
                        <stop offset="100%" stopColor="#059669" />
                    </linearGradient>
                </defs>
            </svg>

            {/* PRODUCT HERO */}
            <section className="hero" style={{ minHeight: '80vh', padding: '140px 5% 80px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
                <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', zIndex: 2 }}>
                    
                    <div className="badge float-anim" style={{ marginBottom: '24px', animation: 'fade-in 1s ease-out' }}>
                        <span className="dot" style={{ background: '#10B981' }} /> The Newest Addition
                    </div>
                    
                    <h1 style={{ 
                        fontSize: 'clamp(48px, 8vw, 92px)', 
                        fontWeight: '900', 
                        lineHeight: '1.1', 
                        letterSpacing: '-2px',
                        marginBottom: '24px',
                        animation: 'fade-up 1s ease-out'
                    }}>
                        Meet <span style={{ background: 'linear-gradient(135deg, #34D399, #059669)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>MALUS</span>
                    </h1>
                    
                    <p style={{ 
                        fontSize: 'clamp(18px, 2.5vw, 24px)', 
                        color: '#10B981', 
                        fontWeight: '600',
                        marginBottom: '16px',
                        letterSpacing: '1px',
                        textTransform: 'uppercase',
                        animation: 'fade-up 1.2s ease-out'
                    }}>
                        Your AI Operating Companion.
                    </p>

                    <p style={{ 
                        fontSize: 'clamp(16px, 1.8vw, 20px)', 
                        color: 'var(--muted)', 
                        maxWidth: '800px', 
                        lineHeight: '1.7',
                        marginBottom: '40px',
                        animation: 'fade-up 1.4s ease-out'
                    }}>
                        Your computer already knows what's happening. Now it has an intelligence that understands it.
                        Malus observes your workflow with your permission, and naturally offers help when it matters.
                        It doesn't wait for commands—it understands context.
                    </p>

                    <div style={{ 
                        display: 'flex', 
                        flexWrap: 'wrap', 
                        gap: '16px', 
                        justifyContent: 'center',
                        animation: 'fade-up 1.6s ease-out'
                    }}>
                        <button onClick={startDownload} style={{
                            padding: '16px 32px', display: 'flex', alignItems: 'center', gap: '10px',
                            background: 'linear-gradient(135deg, #10B981, #059669)',
                            border: 'none', borderRadius: '50px', color: '#fff', fontSize: '18px', fontWeight: '700',
                            cursor: 'pointer', boxShadow: '0 10px 30px rgba(16, 185, 129, 0.3)',
                            transition: 'all 0.3s ease'
                        }}
                        onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)'; e.currentTarget.style.boxShadow = '0 15px 40px rgba(16, 185, 129, 0.5)'; }}
                        onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 10px 30px rgba(16, 185, 129, 0.3)'; }}
                        >
                            <FaWindows size={20} />
                            Download for Windows
                        </button>
                    </div>

                    {/* PRODUCT IMAGE PLACEHOLDER (Animated Core) */}
                    <div style={{ 
                        marginTop: '80px', 
                        width: '100%', 
                        maxWidth: '900px', 
                        aspectRatio: '16/9',
                        background: 'var(--surface)',
                        border: '1px solid var(--border)',
                        borderRadius: '32px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 40px 100px rgba(0,0,0,0.5), inset 0 0 80px rgba(16, 185, 129, 0.05)',
                        position: 'relative',
                        overflow: 'hidden',
                        animation: 'scale-up 1.5s cubic-bezier(0.16, 1, 0.3, 1)'
                    }}>
                        <AnimatedCoreIcon />
                        <div style={{
                            position: 'absolute', inset: 0,
                            background: 'radial-gradient(circle at center, rgba(16, 185, 129, 0.08), transparent 70%)',
                            pointerEvents: 'none'
                        }} />
                    </div>
                </div>
            </section>

            {/* FEATURES SECTION */}
            <section style={{ padding: '100px 5%', maxWidth: '1200px', margin: '0 auto' }}>
                <div style={{ textAlign: 'center', marginBottom: '80px' }} className="reveal">
                    <div className="label">Beyond an Assistant</div>
                    <h2 style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: '800' }}>An Extension of You.</h2>
                </div>

                <div style={{
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                    gap: '40px'
                }}>
                    {[
                        { icon: <AnimatedEyeIcon />, title: 'Context Awareness', desc: 'Understands what application you\'re using and what you\'re trying to accomplish.' },
                        { icon: <AnimatedZapIcon />, title: 'Workflow Intelligence', desc: 'Learns your workflow and offers timely suggestions without interrupting your flow.' },
                        { icon: <AnimatedEmeraldShieldIcon />, title: 'Privacy by Design', desc: 'Nothing is observed without user permission. Privacy is a core principle—not an afterthought.' },
                        { icon: <FiCpu size={40} color="#10B981" />, title: 'Local AI First', desc: 'Runs with local language models whenever possible for privacy and speed.' },
                        { icon: <FiActivity size={40} color="#10B981" />, title: 'Resource Aware', desc: 'Continuously monitors RAM, CPU, GPU, and system health before deciding which AI model to use.' },
                        { icon: <AnimatedChatIcon />, title: 'Smart Conversations', desc: 'Talks like a teammate instead of a robotic assistant. Supports, jokes, warns, and explains naturally.' },
                    ].map((f, i) => (
                        <div key={f.title} className={`feature-card reveal reveal-delay-${(i % 3) + 1}`} style={{
                            background: 'var(--surface)', 
                            padding: '40px', 
                            borderRadius: '24px',
                            border: '1px solid var(--border)',
                            transition: 'all 0.3s ease'
                        }}>
                            <div style={{ height: '48px', marginBottom: '24px', display: 'flex', alignItems: 'center' }}>{f.icon}</div>
                            <h3 style={{ fontSize: '22px', fontWeight: '800', marginBottom: '16px' }}>{f.title}</h3>
                            <p style={{ color: 'var(--muted)', fontSize: '16px', lineHeight: '1.7' }}>{f.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* REXYCORE ECOSYSTEM FLOW */}
            <section style={{ padding: '100px 5%', maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }} className="reveal">
                <div className="label">Architecture</div>
                <h2 style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: '800', marginBottom: '40px' }}>The Context Engine</h2>
                <p style={{ color: 'var(--muted)', fontSize: '18px', lineHeight: '1.7', marginBottom: '60px', maxWidth: '700px', margin: '0 auto 60px' }}>
                    Malus acts as a context engine that securely understands what's happening on your system in real-time, feeding that awareness into its intelligence layer.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
                    
                    <div style={{ width: '100%', maxWidth: '600px', padding: '40px', borderRadius: '24px', background: 'rgba(16, 185, 129, 0.05)', border: '1px solid #10B981', textAlign: 'center' }} className="reveal reveal-delay-1">
                        <h3 style={{ fontSize: '28px', color: '#10B981', marginBottom: '8px', fontWeight: '800' }}>MALUS</h3>
                        <p style={{ color: '#34D399', fontWeight: '600', marginBottom: '16px' }}>AI Operating Companion</p>
                        <p style={{ color: 'var(--muted)', lineHeight: '1.6' }}>Observes context, understands workflows, and provides intelligent awareness.</p>
                    </div>

                    <div style={{ height: '40px', width: '2px', background: 'linear-gradient(to bottom, #10B981, var(--border))' }} className="reveal reveal-delay-2" />

                    <div style={{ width: '100%', maxWidth: '600px', padding: '40px', borderRadius: '24px', background: 'var(--surface)', border: '1px solid var(--border)', textAlign: 'center' }} className="reveal reveal-delay-3">
                        <h3 style={{ fontSize: '28px', color: '#fff', marginBottom: '8px', fontWeight: '800' }}>RK AI</h3>
                        <p style={{ color: 'var(--blue)', fontWeight: '600', marginBottom: '16px' }}>AI Assistant</p>
                        <p style={{ color: 'var(--muted)', lineHeight: '1.6' }}>Executes tasks, performs reasoning, automation, generation, and tool usage.</p>
                    </div>
                    
                </div>
                
                <p style={{ textAlign: 'center', marginTop: '60px', color: 'var(--muted)', fontStyle: 'italic', fontSize: '16px' }}>
                    "MALUS and RK AI are independent products that become even more powerful when used together."
                </p>
            </section>

            {/* BOTTOM CTA */}
            <section style={{
                position: 'relative', overflow: 'hidden',
                padding: '160px 5%', textAlign: 'center',
                background: 'linear-gradient(160deg, rgba(16,185,129,0.05) 0%, rgba(0,0,0,0) 60%, rgba(5,150,105,0.03) 100%)',
                borderTop: '1px solid rgba(16,185,129,0.12)'
            }}>
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '700px', height: '700px', background: 'radial-gradient(circle, rgba(16,185,129,0.07) 0%, transparent 65%)', pointerEvents: 'none' }} />
                <div style={{ position: 'relative', zIndex: 1, maxWidth: '800px', margin: '0 auto' }}>
                    <h2 style={{ fontSize: 'clamp(32px, 4vw, 56px)', fontWeight: '900', lineHeight: '1.1', letterSpacing: '-1px', marginBottom: '20px' }}>
                        The smartest computer isn't the fastest one.<br />
                        <span style={{ background: 'linear-gradient(135deg, #34D399, #059669)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>It's the one that understands you.</span>
                    </h2>
                    <p style={{ color: 'var(--muted)', fontSize: '19px', lineHeight: '1.7', marginBottom: '52px' }}>
                        Join the waitlist for MALUS and be the first to experience true context-aware AI.
                    </p>
                    <Link href="/notify?product=malus" style={{
                        display: 'inline-flex', alignItems: 'center', gap: '10px',
                        padding: '20px 56px', fontSize: '17px', borderRadius: '50px',
                        background: 'linear-gradient(135deg, #10B981, #059669)',
                        color: '#fff', fontWeight: '800', textDecoration: 'none',
                        boxShadow: '0 10px 40px rgba(16,185,129,0.4)', transition: 'all 0.3s ease'
                    }}
                        onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px) scale(1.04)'; e.currentTarget.style.boxShadow = '0 20px 60px rgba(16,185,129,0.6)'; }}
                        onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 10px 40px rgba(16,185,129,0.4)'; }}
                    >
                        Notify Me →
                    </Link>
                </div>
            </section>

            <Footer />
            <ChatWidget />
        </div>
    );
}
