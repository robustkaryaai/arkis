'use client';
import { useState, useEffect, useRef } from 'react';
import Navbar from '@/components/Navbar';
import ChatWidget from '@/components/ChatWidget';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { FiDownload, FiTerminal, FiAlertCircle, FiCpu, FiShield, FiCheckCircle, FiMic, FiLayout, FiActivity, FiBox, FiArchive } from 'react-icons/fi';
import { FaApple, FaWindows, FaLinux } from 'react-icons/fa';

// ── CUSTOM CSS ANIMATED COMPONENTS ────────────────────────────────────────

// ⚠️ Warning Icon
function AnimatedWarningIcon() {
    return (
        <div className="css-warning-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                <line x1="12" y1="9" x2="12" y2="13" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
            <style jsx>{`
                .css-warning-icon {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    color: #fbbf24;
                    animation: warning-pulse 1.8s infinite ease-in-out;
                }
                @keyframes warning-pulse {
                    0%, 100% { transform: scale(1); filter: drop-shadow(0 0 2px rgba(251, 191, 38, 0.2)); }
                    50% { transform: scale(1.08); filter: drop-shadow(0 0 8px rgba(251, 191, 38, 0.7)); }
                }
            `}</style>
        </div>
    );
}

// 💻 Animated Laptop Component
function AnimatedLaptopIcon() {
    return (
        <div className="css-laptop-container">
            <div className="css-laptop-screen">
                <div className="css-laptop-inner-screen">
                    <div className="css-laptop-scanline" />
                    <div className="css-laptop-glow" />
                    <div className="css-laptop-dots">
                        <span className="dot-g red" />
                        <span className="dot-g yellow" />
                        <span className="dot-g green" />
                    </div>
                    <div className="css-laptop-code-lines">
                        <div className="line l1" />
                        <div className="line l2" />
                        <div className="line l3" />
                    </div>
                </div>
            </div>
            <div className="css-laptop-keyboard" />
            <style jsx>{`
                .css-laptop-container {
                    width: 280px;
                    height: 180px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    position: relative;
                    margin-bottom: 20px;
                }
                .css-laptop-screen {
                    width: 220px;
                    height: 140px;
                    background: #1e1e2f;
                    border: 8px solid #2d2d44;
                    border-radius: 12px 12px 0 0;
                    position: relative;
                    box-shadow: 0 10px 30px rgba(0,0,0,0.5), inset 0 0 20px rgba(79, 156, 249, 0.2);
                    overflow: hidden;
                }
                .css-laptop-inner-screen {
                    width: 100%;
                    height: 100%;
                    position: relative;
                    background: radial-gradient(circle at center, rgba(79, 156, 249, 0.1) 0%, transparent 80%);
                }
                .css-laptop-scanline {
                    position: absolute;
                    width: 100%;
                    height: 2px;
                    background: linear-gradient(90deg, transparent, rgba(79, 156, 249, 0.8), transparent);
                    animation: scan 3s linear infinite;
                }
                .css-laptop-glow {
                    position: absolute;
                    inset: 0;
                    border: 1px solid rgba(79, 156, 249, 0.3);
                    border-radius: 4px;
                    animation: screen-glow 4s infinite alternate;
                }
                .css-laptop-dots {
                    position: absolute;
                    top: 6px;
                    left: 8px;
                    display: flex;
                    gap: 4px;
                }
                .dot-g {
                    width: 5px;
                    height: 5px;
                    border-radius: 50%;
                }
                .red { background: #ff5f56; }
                .yellow { background: #ffbd2e; }
                .green { background: #27c93f; }
                
                .css-laptop-code-lines {
                    position: absolute;
                    left: 10px;
                    top: 24px;
                    display: flex;
                    flex-direction: column;
                    gap: 6px;
                    width: 80%;
                }
                .line {
                    height: 4px;
                    background: rgba(255, 255, 255, 0.15);
                    border-radius: 2px;
                    animation: line-pulse 2s infinite ease-in-out;
                }
                .l1 { width: 60%; background: rgba(79, 156, 249, 0.6); animation-delay: 0.2s; }
                .l2 { width: 85%; background: rgba(155, 89, 245, 0.6); animation-delay: 0.4s; }
                .l3 { width: 45%; background: rgba(255, 255, 255, 0.3); animation-delay: 0.6s; }

                .css-laptop-keyboard {
                    width: 256px;
                    height: 10px;
                    background: #2d2d44;
                    border-radius: 0 0 8px 8px;
                    position: relative;
                    box-shadow: 0 8px 20px rgba(0,0,0,0.4);
                }
                .css-laptop-keyboard::after {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 50px;
                    height: 4px;
                    background: #1e1e2f;
                    border-radius: 0 0 4px 4px;
                }
                @keyframes scan {
                    0% { top: 0; }
                    100% { top: 100%; }
                }
                @keyframes screen-glow {
                    0%, 100% { opacity: 0.3; }
                    50% { opacity: 0.8; }
                }
                @keyframes line-pulse {
                    0%, 100% { opacity: 0.5; }
                    50% { opacity: 1; }
                }
            `}</style>
        </div>
    );
}

// 📁 System Automation Icon
function AnimatedFolderIcon() {
    return (
        <div className="animated-icon-box">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="url(#blue-violet)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="folder-svg">
                <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
                <line x1="8" y1="12" x2="16" y2="12" className="anim-line-1" />
                <line x1="8" y1="16" x2="14" y2="16" className="anim-line-2" />
            </svg>
            <style jsx>{`
                .animated-icon-box {
                    display: inline-block;
                }
                .folder-svg {
                    animation: folder-float 3s ease-in-out infinite;
                }
                .anim-line-1 {
                    animation: pulse-line 1.5s infinite ease-in-out;
                }
                .anim-line-2 {
                    animation: pulse-line 1.5s infinite ease-in-out;
                    animation-delay: 0.3s;
                }
                @keyframes folder-float {
                    0%, 100% { transform: translateY(0) rotate(0deg); }
                    50% { transform: translateY(-4px) rotate(1deg); }
                }
                @keyframes pulse-line {
                    0%, 100% { stroke-dasharray: 8; stroke-dashoffset: 0; opacity: 0.4; }
                    50% { stroke-dasharray: 8; stroke-dashoffset: 4; opacity: 1; }
                }
            `}</style>
        </div>
    );
}

// 📝 Smart Documents Icon
function AnimatedDocumentIcon() {
    return (
        <div className="animated-icon-box">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="url(#blue-violet)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="doc-svg">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" className="w1" />
                <line x1="16" y1="17" x2="8" y2="17" className="w2" />
                <polyline points="10 9 9 9 8 9" className="w3" />
            </svg>
            <style jsx>{`
                .doc-svg {
                    animation: doc-wiggle 4s ease-in-out infinite;
                }
                .w1 { animation: line-write 2s infinite ease-in-out; }
                .w2 { animation: line-write 2s infinite ease-in-out; animation-delay: 0.5s; }
                .w3 { animation: line-write 2s infinite ease-in-out; animation-delay: 1s; }
                @keyframes doc-wiggle {
                    0%, 100% { transform: translateY(0) scale(1); }
                    50% { transform: translateY(-3px) scale(1.03); }
                }
                @keyframes line-write {
                    0%, 100% { stroke-dasharray: 10; stroke-dashoffset: 10; opacity: 0.3; }
                    50% { stroke-dasharray: 10; stroke-dashoffset: 0; opacity: 1; }
                }
            `}</style>
        </div>
    );
}

// 🛡️ Privacy First Icon
function AnimatedShieldIcon() {
    return (
        <div className="animated-icon-box">
            <div className="shield-wrapper">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="url(#blue-violet)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shield-svg">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
                <div className="shield-radar" />
            </div>
            <style jsx>{`
                .shield-wrapper {
                    position: relative;
                    width: 40px;
                    height: 40px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .shield-svg {
                    z-index: 2;
                    animation: shield-rotate 4s infinite ease-in-out;
                }
                .shield-radar {
                    position: absolute;
                    width: 32px;
                    height: 32px;
                    border: 2px solid rgba(79, 156, 249, 0.4);
                    border-radius: 50%;
                    animation: radar-pulse 2s infinite linear;
                    z-index: 1;
                }
                @keyframes shield-rotate {
                    0%, 100% { transform: rotateY(0deg); }
                    50% { transform: rotateY(15deg); }
                }
                @keyframes radar-pulse {
                    0% { transform: scale(0.6); opacity: 1; }
                    100% { transform: scale(1.6); opacity: 0; }
                }
            `}</style>
        </div>
    );
}

// 🎙️ Voice Interaction Icon
function AnimatedVoiceIcon() {
    return (
        <div className="voice-waves">
            <span className="wave-bar wb1" />
            <span className="wave-bar wb2" />
            <span className="wave-bar wb3" />
            <span className="wave-bar wb4" />
            <span className="wave-bar wb5" />
            <style jsx>{`
                .voice-waves {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    gap: 3px;
                    height: 40px;
                    width: 40px;
                }
                .wave-bar {
                    width: 4px;
                    background: linear-gradient(to top, var(--blue), var(--violet));
                    border-radius: 50px;
                    transition: height 0.3s;
                }
                .wb1 { height: 12px; animation: bounce-wave 1.2s infinite ease-in-out alternate; }
                .wb2 { height: 28px; animation: bounce-wave 0.8s infinite ease-in-out alternate 0.2s; }
                .wb3 { height: 38px; animation: bounce-wave 1s infinite ease-in-out alternate 0.4s; }
                .wb4 { height: 22px; animation: bounce-wave 0.7s infinite ease-in-out alternate 0.1s; }
                .wb5 { height: 10px; animation: bounce-wave 1.4s infinite ease-in-out alternate 0.3s; }
                @keyframes bounce-wave {
                    from { transform: scaleY(0.4); }
                    to { transform: scaleY(1.1); }
                }
            `}</style>
        </div>
    );
}

// 🎨 Content Engine Icon
function AnimatedPaletteIcon() {
    return (
        <div className="palette-container">
            <div className="palette-orb" />
            <style jsx>{`
                .palette-container {
                    width: 40px;
                    height: 40px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .palette-orb {
                    width: 30px;
                    height: 30px;
                    border-radius: 50%;
                    background: linear-gradient(135deg, #ff007f, #7f00ff, #00f0ff, #00ff7f);
                    background-size: 300% 300%;
                    animation: gradient-rotate 4s infinite linear, orb-float 2.5s infinite ease-in-out alternate;
                    box-shadow: 0 0 15px rgba(0, 240, 255, 0.4);
                }
                @keyframes gradient-rotate {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
                @keyframes orb-float {
                    from { transform: translateY(2px) scale(0.95); }
                    to { transform: translateY(-3px) scale(1.05); }
                }
            `}</style>
        </div>
    );
}

// ⚡ Indian-Made Icon
function AnimatedLightningIcon() {
    return (
        <div className="lightning-box">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="url(#blue-violet)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="bolt-svg">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
            </svg>
            <div className="tricolor-trail">
                <span className="trail-dot saffron" />
                <span className="trail-dot white" />
                <span className="trail-dot green-dot" />
            </div>
            <style jsx>{`
                .lightning-box {
                    position: relative;
                    width: 40px;
                    height: 40px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .bolt-svg {
                    animation: bolt-flicker 2s infinite ease-in-out;
                    filter: drop-shadow(0 0 4px rgba(79, 156, 249, 0.5));
                }
                .tricolor-trail {
                    position: absolute;
                    bottom: -2px;
                    display: flex;
                    gap: 3px;
                }
                .trail-dot {
                    width: 4px;
                    height: 4px;
                    border-radius: 50%;
                    opacity: 0.8;
                    animation: trail-pulse 1.5s infinite alternate;
                }
                .saffron { background: #ff9933; animation-delay: 0.1s; }
                .white { background: #ffffff; animation-delay: 0.3s; }
                .green-dot { background: #138808; animation-delay: 0.5s; }
                @keyframes bolt-flicker {
                    0%, 100% { opacity: 1; transform: scale(1); }
                    45%, 55% { opacity: 0.85; }
                    50% { opacity: 1; transform: scale(1.08); }
                }
                @keyframes trail-pulse {
                    from { transform: scale(0.7); opacity: 0.4; }
                    to { transform: scale(1.2); opacity: 1; }
                }
            `}</style>
        </div>
    );
}


export default function RKDesktopProduct() {
    const [downloadPlatform, setDownloadPlatform] = useState(null);
    const [detectedOS, setDetectedOS] = useState(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const platform = window.navigator.platform.toLowerCase();
            const userAgent = window.navigator.userAgent.toLowerCase();
            
            if (platform.includes('mac') || userAgent.includes('mac')) setDetectedOS('mac');
            else if (platform.includes('win') || userAgent.includes('win')) setDetectedOS('win');
            else if (platform.includes('linux') || userAgent.includes('linux')) setDetectedOS('linux');
        }
    }, []);

    const startDownload = (platform) => {
        // Open beautiful option modal for the selected platform
        setDownloadPlatform(platform);
    };

    return (
        <div style={{ background: 'var(--background)', minHeight: '100vh', color: 'var(--text)' }}>
            <Navbar />

            {/* SVG Gradients definitions */}
            <svg style={{ position: 'absolute', width: 0, height: 0 }} aria-hidden="true">
                <defs>
                    <linearGradient id="blue-violet" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="var(--blue, #4f9cf9)" />
                        <stop offset="100%" stopColor="var(--violet, #9b59f5)" />
                    </linearGradient>
                </defs>
            </svg>

            {/* PRODUCT HERO */}
            <section className="hero" style={{ minHeight: '80vh', padding: '140px 5% 80px', textAlign: 'center', position: 'relative' }}>
                <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div className="badge float-anim" style={{ marginBottom: '24px', animation: 'fade-in 1s ease-out' }}>
                        <span className="dot" /> Now Live for macOS, Windows & Linux
                    </div>
                    
                    <h1 style={{ 
                        fontSize: 'clamp(48px, 8vw, 92px)', 
                        fontWeight: '900', 
                        lineHeight: '1.1', 
                        letterSpacing: '-2px',
                        marginBottom: '24px',
                        animation: 'fade-up 1s ease-out'
                    }}>
                        RK AI <span className="grad">Desktop</span>
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
                        The Intelligent Layer for Your Computer.
                    </p>

                    <p style={{ 
                        fontSize: 'clamp(16px, 1.8vw, 20px)', 
                        color: 'var(--muted)', 
                        maxWidth: '800px', 
                        lineHeight: '1.7',
                        marginBottom: '40px',
                        animation: 'fade-up 1.4s ease-out'
                    }}>
                        RK AI Desktop is a local-first AI ecosystem that transforms how you interact with your machine. 
                        It combines the power of large language models with deep system integration, allowing you to 
                        automate tasks, create professional content, and manage your digital life—all with 100% privacy.
                    </p>

                    <div style={{ 
                        display: 'flex', 
                        flexWrap: 'wrap', 
                        gap: '16px', 
                        justifyContent: 'center',
                        animation: 'fade-up 1.6s ease-out'
                    }}>
                        <button onClick={() => startDownload('mac')} className={detectedOS === 'mac' ? "btn-primary" : "btn-secondary"} style={{ padding: '16px 32px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <FaApple size={20} />
                            Download for macOS
                        </button>
                        <button onClick={() => startDownload('win')} className={detectedOS === 'win' ? "btn-primary" : "btn-secondary"} style={{ padding: '16px 32px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <FaWindows size={20} />
                            Download for Windows
                        </button>
                        <button onClick={() => startDownload('linux')} className={detectedOS === 'linux' ? "btn-primary" : "btn-secondary"} style={{ padding: '16px 32px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <FaLinux size={20} />
                            Download for Linux
                        </button>
                    </div>

                    {/* INSTALLATION NOTICE FOR MACOS */}
                    <section style={{ padding: '60px 0 0 0', width: '100%', maxWidth: '800px', margin: '0 auto' }}>
                        <div style={{
                            background: 'rgba(251,191,36,0.04)',
                            border: '1px solid rgba(251,191,36,0.12)', 
                            borderRadius: '24px',
                            padding: '32px',
                            textAlign: 'left',
                            boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
                        }}>
                            <h3 style={{ color: '#fbbf24', fontSize: '18px', fontWeight: '800', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <FiAlertCircle /> macOS Installation Note
                            </h3>
                            <p style={{ fontSize: '14px', color: 'var(--muted)', marginBottom: '20px', lineHeight: '1.6', textAlign: 'left', margin: '0 0 20px 0', maxWidth: 'none' }}>
                                If you see a "damaged" or "unverified developer" warning, Apple is blocking the app because it's unsigned. Run this command in your Terminal to fix it:
                            </p>
                            <div style={{ position: 'relative' }}>
                                <code style={{ 
                                    display: 'block',
                                    background: 'rgba(0,0,0,0.4)', 
                                    padding: '20px 40px 20px 20px', 
                                    borderRadius: '16px', 
                                    border: '1px solid rgba(255,255,255,0.05)', 
                                    fontFamily: 'JetBrains Mono, monospace', 
                                    fontSize: '13px', 
                                    color: '#e2e8f0',
                                    marginBottom: '20px',
                                    overflowX: 'auto',
                                    whiteSpace: 'nowrap',
                                    lineHeight: '1.5'
                                }}>
                                    <span style={{ color: '#fbbf24' }}>$</span> xattr -rd com.apple.quarantine ~/Downloads/RK-AI.dmg && open ~/Downloads/RK-AI.dmg
                                </code>
                                <div style={{ position: 'absolute', top: '12px', right: '12px', color: 'rgba(255,255,255,0.2)' }}>
                                    <FiTerminal size={18} />
                                </div>
                            </div>
                            <p style={{ fontSize: '14px', color: 'var(--muted)', marginBottom: '20px', lineHeight: '1.6', textAlign: 'left', margin: '0 0 20px 0', maxWidth: 'none' }}>
                                <FiCheckCircle style={{ color: '#4ade80' }} /> Don't worry, the app is completely safe to use.
                            </p>
                        </div>
                    </section>

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
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 40px 100px rgba(0,0,0,0.5), inset 0 0 80px rgba(79, 156, 249, 0.05)',
                        position: 'relative',
                        overflow: 'hidden',
                        animation: 'scale-up 1.5s cubic-bezier(0.16, 1, 0.3, 1)'
                    }}>
                        <AnimatedLaptopIcon />
                        <div style={{
                            position: 'absolute', inset: 0,
                            background: 'radial-gradient(circle at center, rgba(79, 156, 249, 0.08), transparent 70%)',
                            pointerEvents: 'none'
                        }} />
                    </div>
                </div>
            </section>

            {/* FEATURES SECTION */}
            <section style={{ padding: '100px 5%', maxWidth: '1200px', margin: '0 auto' }}>
                <div style={{ textAlign: 'center', marginBottom: '80px' }}>
                    <div className="label">Capabilities</div>
                    <h2 style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: '800' }}>Local Power. Global Intelligence.</h2>
                </div>

                <div style={{
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                    gap: '40px'
                }}>
                    {[
                        { icon: <AnimatedFolderIcon />, title: 'System Automation', desc: 'Control your machine with natural language. Open apps, manage files, and automate workflows with zero effort.' },
                        { icon: <AnimatedDocumentIcon />, title: 'Smart Documents', desc: 'Generate professional presentations and reports in seconds. Built-in support for PPTX and DOCX formats.' },
                        { icon: <AnimatedShieldIcon />, title: 'Privacy First', desc: 'Powered by local LLMs via Ollama. Your data never leaves your machine unless you want it to.' },
                        { icon: <AnimatedVoiceIcon />, title: 'Voice Interaction', desc: 'Seamless voice-to-action capabilities. Hands-free productivity designed for the modern professional.' },
                        { icon: <AnimatedPaletteIcon />, title: 'Content Engine', desc: 'Create high-quality AI images and short-form videos directly within your workspace.' },
                        { icon: <AnimatedLightningIcon />, title: 'Indian-Made', desc: 'Founded and engineered in India, building world-class technology for global users.' },
                    ].map(f => (
                        <div key={f.title} className="feature-card" style={{
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
          {/* CUSTOM SELECTION DIALOG MODAL */}
{downloadPlatform && (
    <div className="modal-overlay">
        <div className="modal-card">
            <div className="modal-header">
                <h3>
                    Download for{" "}
                    {downloadPlatform === "win"
                        ? "Windows"
                        : downloadPlatform === "mac"
                        ? "macOS"
                        : "Linux"}
                </h3>

                <button
                    className="modal-close"
                    onClick={() => setDownloadPlatform(null)}
                >
                    &times;
                </button>
            </div>

            <p className="modal-subtitle">
                Choose your preferred installation package below.
            </p>

            {/* REQUIREMENTS NOTE */}
            <div className="requirements-box">
                <div className="requirements-title">
                    <AnimatedWarningIcon />
                    <span>
                        Please make sure you have Node.js v20 and Python
                        installed.
                    </span>
                </div>

                <div className="requirements-links">
                    <a
                        href="https://nodejs.org/en/download"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Download Node.js
                    </a>

                    <a
                        href="https://www.python.org/downloads/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Download Python
                    </a>
                </div>

                {/* OS SPECIFIC COMMANDS */}
                <div className="terminal-box">
                    <div className="terminal-header">
                        <FiTerminal />
                        <span>Installation Commands</span>
                    </div>

                    <code>
                        {downloadPlatform === "win" &&
`# Install Node.js (winget)
winget install OpenJS.NodeJS

# Install Python
winget install Python.Python.3.12`}
                        
                        {downloadPlatform === "mac" &&
`# Install Homebrew (if not installed)
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install Node.js v20
brew install node@20

# Install Python
brew install python`}
                        
                        {downloadPlatform === "linux" &&
`# Ubuntu/Debian

sudo apt update

# Install Node.js v20
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Install Python
sudo apt install -y python3 python3-pip`}
                    </code>
                </div>
            </div>

            <div className="modal-options">
                {downloadPlatform === "mac" ? (
                    <>
                        <a
                            href="https://github.com/robustkaryaai/RK-AI-DESKTOP-DOWNLOAD/releases/download/v1.0.0/RK-AI.dmg"
                            className="modal-option-card"
                        >
                            <div className="option-icon">
                                <FiBox
                                    size={24}
                                    style={{ color: "var(--blue)" }}
                                />
                            </div>

                            <div className="option-info">
                                <h4>DMG Disk Image</h4>
                                <p>
                                    Standard macOS installer with drag-and-drop
                                    installation.
                                </p>
                            </div>
                        </a>
                    </>
                ) : downloadPlatform === "win" ? (
                    <>
                        <a
                            href="https://github.com/robustkaryaai/RK-AI-DESKTOP-DOWNLOAD/releases/download/v1.0.0/RK-AI.exe"
                            className="modal-option-card"
                        >
                            <div className="option-icon">
                                <FiBox
                                    size={24}
                                    style={{ color: "var(--blue)" }}
                                />
                            </div>

                            <div className="option-info">
                                <h4>EXE Installer</h4>
                                <p>
                                    Quick setup installer for Windows systems.
                                </p>
                            </div>
                        </a>

                        <a
                            href="https://github.com/robustkaryaai/RK-AI-DESKTOP-DOWNLOAD/releases/download/v1.0.0/RK-AI.zip"
                            className="modal-option-card"
                        >
                            <div className="option-icon">
                                <FiArchive
                                    size={24}
                                    style={{ color: "var(--violet)" }}
                                />
                            </div>

                            <div className="option-info">
                                <h4>ZIP Portable</h4>
                                <p>
                                    Extract and run instantly without installing.
                                </p>
                            </div>
                        </a>
                    </>
                ) : (
                    <>
                        <a
                            href="https://github.com/robustkaryaai/RK-AI-DESKTOP-DOWNLOAD/releases/download/v1.0.0/RK-AI.deb"
                            className="modal-option-card"
                        >
                            <div className="option-icon">
                                <FiBox
                                    size={24}
                                    style={{ color: "var(--blue)" }}
                                />
                            </div>

                            <div className="option-info">
                                <h4>DEB Package</h4>
                                <p>
                                    Native package for Ubuntu and Debian-based
                                    systems.
                                </p>
                            </div>
                        </a>

                        <a
                            href="https://github.com/robustkaryaai/RK-AI-DESKTOP-DOWNLOAD/releases/download/v1.0.0/RK-AI.AppImage"
                            className="modal-option-card"
                        >
                            <div className="option-icon">
                                <FiActivity
                                    size={24}
                                    style={{ color: "var(--violet)" }}
                                />
                            </div>

                            <div className="option-info">
                                <h4>AppImage Portable</h4>
                                <p>
                                    Universal Linux executable for most
                                    distributions.
                                </p>
                            </div>
                        </a>
                    </>
                )}
            </div>
        </div>

        <style jsx>{`
            .modal-overlay {
                position: fixed;
                inset: 0;
                background: rgba(7, 7, 15, 0.88);
                backdrop-filter: blur(14px);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10000;
                animation: overlay-fade 0.3s ease-out;
            }

            .modal-card {
                background: rgba(18, 18, 29, 0.96);
                border: 1px solid rgba(255,255,255,0.08);
                border-radius: 28px;
                width: 92%;
                max-width: 650px;
                padding: 32px;
                box-shadow:
                    0 40px 80px rgba(0,0,0,0.6),
                    inset 0 0 40px rgba(79,156,249,0.05);
                animation: card-slide 0.35s cubic-bezier(0.16,1,0.3,1);
                max-height: 90vh;
                overflow-y: auto;
            }

            .modal-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 8px;
            }

            .modal-header h3 {
                font-size: 28px;
                font-weight: 900;
                background: linear-gradient(
                    135deg,
                    var(--blue),
                    var(--violet)
                );
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
            }

            .modal-close {
                background: none;
                border: none;
                color: var(--muted);
                font-size: 30px;
                cursor: pointer;
                transition: 0.2s ease;
            }

            .modal-close:hover {
                color: white;
                transform: scale(1.1);
            }

            .modal-subtitle {
                color: var(--muted);
                margin-bottom: 24px;
                font-size: 15px;
            }

            .requirements-box {
                background: rgba(251,191,36,0.05);
                border: 1px solid rgba(251,191,36,0.12);
                border-radius: 20px;
                padding: 22px;
                margin-bottom: 28px;
            }

            .requirements-title {
                display: flex;
                align-items: center;
                gap: 12px;
                font-weight: 800;
                color: #fbbf24;
                font-size: 16px;
                margin-bottom: 16px;
            }

            .requirements-links {
                display: flex;
                flex-wrap: wrap;
                gap: 12px;
                margin-bottom: 18px;
            }

            .requirements-links a {
                text-decoration: none;
                background: rgba(255,255,255,0.06);
                padding: 10px 14px;
                border-radius: 12px;
                color: white;
                font-size: 13px;
                transition: 0.2s ease;
                border: 1px solid rgba(255,255,255,0.06);
            }

            .requirements-links a:hover {
                background: rgba(79,156,249,0.12);
                border-color: rgba(79,156,249,0.4);
            }

            .terminal-box {
                background: rgba(0,0,0,0.4);
                border-radius: 18px;
                overflow: hidden;
                border: 1px solid rgba(255,255,255,0.06);
            }

            .terminal-header {
                display: flex;
                align-items: center;
                gap: 10px;
                padding: 12px 16px;
                border-bottom: 1px solid rgba(255,255,255,0.06);
                color: #9ca3af;
                font-size: 13px;
            }

            .terminal-box code {
                display: block;
                padding: 18px;
                white-space: pre-wrap;
                color: #e5e7eb;
                font-family: 'JetBrains Mono', monospace;
                font-size: 13px;
                line-height: 1.7;
            }

            .modal-options {
                display: flex;
                flex-direction: column;
                gap: 16px;
            }

            .modal-option-card {
                display: flex;
                align-items: center;
                gap: 20px;
                background: rgba(255,255,255,0.03);
                border: 1px solid rgba(255,255,255,0.06);
                border-radius: 18px;
                padding: 20px;
                text-decoration: none;
                color: var(--text);
                transition: all 0.25s ease;
            }

            .modal-option-card:hover {
                background: rgba(79,156,249,0.06);
                border-color: rgba(79,156,249,0.35);
                transform: translateY(-2px);
            }

            .option-info h4 {
                font-size: 16px;
                font-weight: 700;
                margin-bottom: 4px;
            }

            .option-info p {
                color: var(--muted);
                font-size: 13px;
                line-height: 1.5;
            }

            @keyframes overlay-fade {
                from { opacity: 0; }
                to { opacity: 1; }
            }

            @keyframes card-slide {
                from {
                    transform: translateY(20px) scale(0.96);
                    opacity: 0;
                }
                to {
                    transform: translateY(0) scale(1);
                    opacity: 1;
                }
            }
        `}</style>
    </div>
)}

            {/* BOTTOM CTA */}
            <section style={{
                position: 'relative', overflow: 'hidden',
                padding: '160px 5%', textAlign: 'center',
                background: 'linear-gradient(160deg, rgba(79,156,249,0.06) 0%, rgba(0,0,0,0) 60%, rgba(155,89,245,0.04) 100%)',
                borderTop: '1px solid rgba(79,156,249,0.15)'
            }}>
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '800px', height: '800px', background: 'radial-gradient(circle, rgba(79,156,249,0.07) 0%, transparent 65%)', pointerEvents: 'none' }} />
                <div style={{ position: 'relative', zIndex: 1, maxWidth: '700px', margin: '0 auto' }}>
                    <p style={{ fontSize: '13px', fontWeight: '800', color: '#4f9cf9', letterSpacing: '4px', textTransform: 'uppercase', marginBottom: '28px' }}>RK AI DESKTOP · Free to Download</p>
                    <h2 style={{ fontSize: 'clamp(42px, 7vw, 80px)', fontWeight: '900', lineHeight: '1.05', letterSpacing: '-2px', marginBottom: '28px' }}>
                        Your AI.<br />
                        <span style={{ background: 'linear-gradient(135deg, #4f9cf9 30%, #9b59f5)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Your machine.</span>
                    </h2>
                    <p style={{ color: 'var(--muted)', fontSize: '18px', lineHeight: '1.7', marginBottom: '52px' }}>
                        100% local. Completely private. Learn more about it.
                    </p>
                    <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <button onClick={() => window.location.href = "/products/rk-ai-desktop-learn-more"} style={{
                            padding: '20px 52px', fontSize: '17px', borderRadius: '50px',
                            background: 'linear-gradient(135deg, #4f9cf9, #9b59f5)',
                            color: '#fff', fontWeight: '800', border: 'none', cursor: 'pointer',
                            boxShadow: '0 10px 40px rgba(79,156,249,0.4)', transition: 'all 0.3s ease'
                        }}
                            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px) scale(1.04)'; e.currentTarget.style.boxShadow = '0 20px 60px rgba(79,156,249,0.6)'; }}
                            onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 10px 40px rgba(79,156,249,0.4)'; }}
                        >Learn More</button>
                        <Link href="/subscription" style={{
                            padding: '20px 52px', fontSize: '17px', borderRadius: '50px',
                            background: 'transparent', border: '1px solid rgba(79,156,249,0.4)',
                            color: '#4f9cf9', fontWeight: '800', textDecoration: 'none',
                            transition: 'all 0.3s ease'
                        }}
                            onMouseEnter={e => { e.currentTarget.style.borderColor = '#4f9cf9'; e.currentTarget.style.background = 'rgba(79,156,249,0.08)'; e.currentTarget.style.transform = 'translateY(-3px)'; }}
                            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(79,156,249,0.4)'; e.currentTarget.style.background = 'transparent'; e.currentTarget.style.transform = ''; }}
                        >View Subscription Plans</Link>
                    </div>
                </div>
            </section>

            <Footer />

            <ChatWidget />
        </div>
    );
}
