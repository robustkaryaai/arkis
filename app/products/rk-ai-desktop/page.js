'use client';
import Navbar from '@/components/Navbar';
import ChatWidget from '@/components/ChatWidget';
import Footer from '@/components/Footer';
import Link from 'next/link';

export default function RKDesktopProduct() {
    const startDownload = (platform) => {
        const urls = {
            mac: 'https://github.com/robustkaryaai/arkis/releases/download/v2.0.0/RK-AI.dmg',
            win: 'https://github.com/robustkaryaai/arkis/releases/download/v2.0.0/RK-AI.exe'
        };
        window.location.href = urls[platform];
    };

    return (
        <div style={{ background: 'var(--background)', minHeight: '100vh', color: 'var(--text)' }}>
            <Navbar />

            {/* PRODUCT HERO */}
            <section className="hero" style={{ minHeight: '80vh', padding: '140px 5% 80px', textAlign: 'center', position: 'relative' }}>
                <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div className="badge" style={{ marginBottom: '24px', animation: 'fade-in 1s ease-out' }}>
                        <span className="dot" /> Now Live for macOS & Windows
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
                        <button onClick={() => startDownload('mac')} className="btn-primary" style={{ padding: '16px 32px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <svg fill="currentColor" height="20" width="20" viewBox="0 0 24 24"><path d="M17.064 14.81c0-2.522 2.06-3.734 2.152-3.801-1.18-1.727-3.018-1.962-3.664-1.99-1.543-.16-3.023.903-3.806.903-.784 0-2.007-.887-3.308-.863-1.71.025-3.287.994-4.167 2.523-1.776 3.085-.453 7.644 1.28 10.138.85 1.226 1.858 2.597 3.184 2.548 1.278-.049 1.762-.824 3.308-.824 1.545 0 1.98.824 3.333.799 1.38-.024 2.247-1.226 3.092-2.451 1.002-1.428 1.385-2.816 1.408-2.888-.03-.013-2.708-1.039-2.732-4.145zm-2.284-9.67c.692-.843 1.155-2.013.827-3.14-1.077.043-2.384.717-3.156 1.613-.692.802-1.298 1.993-.97 3.097 1.2.093 2.456-.727 3.299-1.57z"/></svg>
                            Download for macOS
                        </button>
                        <button onClick={() => startDownload('win')} className="btn-secondary" style={{ padding: '16px 32px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M0 3.449L9.75 2.1v9.451H0V3.449zM0 12.451h9.75v9.451L0 20.551v-8.1zm10.75-10.825L24 0v11.551H10.75V1.626zM10.75 12.451H24V24l-13.25-1.826v-9.723z" /></svg>
                            Download for Windows
                        </button>
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
                        boxShadow: '0 40px 100px rgba(0,0,0,0.5), inset 0 0 80px rgba(79, 156, 249, 0.05)',
                        position: 'relative',
                        overflow: 'hidden',
                        animation: 'scale-up 1.5s cubic-bezier(0.16, 1, 0.3, 1)'
                    }}>
                        💻
                        <div style={{
                            position: 'absolute', inset: 0,
                            background: 'radial-gradient(circle at center, var(--blue)22, transparent 70%)',
                            pointerEvents: 'none'
                        }} />
                    </div>
                </div>
            </section>



            {/* INSTALLATION NOTICE FOR MACOS */}
            <section style={{ padding: '60px 5%', maxWidth: '800px', margin: '0 auto' }}>
                <div style={{
                    background: 'rgba(251,191,36,0.06)',
                    border: '1px solid rgba(251,191,36,0.18)', 
                    borderRadius: '24px',
                    padding: '32px'
                }}>
                    <h3 style={{ color: '#fbbf24', fontSize: '18px', fontWeight: '800', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        ⚠️ macOS Installation Note
                    </h3>
                    <p style={{ fontSize: '14px', color: 'var(--muted)', marginBottom: '20px', lineHeight: '1.6' }}>
                        If you see a "damaged" or "unverified developer" warning, Apple is blocking the app because it's unsigned. Run this command in your Terminal to fix it:
                    </p>
                    <code style={{ 
                        display: 'block',
                        background: 'rgba(0,0,0,0.3)', 
                        padding: '16px', 
                        borderRadius: '12px', 
                        border: '1px solid rgba(251,191,36,0.1)', 
                        fontFamily: 'JetBrains Mono, monospace', 
                        fontSize: '12px', 
                        color: '#e2e8f0',
                        marginBottom: '20px',
                        overflowX: 'auto'
                    }}>
                        xattr -rd com.apple.quarantine ~/Downloads/RK-AI.dmg && open ~/Downloads/RK-AI.dmg
                    </code>
                    <p style={{ fontSize: '12px', color: '#64748b' }}>
                        Don't worry the app is completely safe to use
                    </p>
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
                        { icon: '📁', title: 'System Automation', desc: 'Control your machine with natural language. Open apps, manage files, and automate workflows with zero effort.' },
                        { icon: '📝', title: 'Smart Documents', desc: 'Generate professional presentations and reports in seconds. Built-in support for PPTX and DOCX formats.' },
                        { icon: '🛡️', title: 'Privacy First', desc: 'Powered by local LLMs via Ollama. Your data never leaves your machine unless you want it to.' },
                        { icon: '🎙️', title: 'Voice Interaction', desc: 'Seamless voice-to-action capabilities. Hands-free productivity designed for the modern professional.' },
                        { icon: '🎨', title: 'Content Engine', desc: 'Create high-quality AI images and short-form videos directly within your workspace.' },
                        { icon: '⚡', title: 'Indian-Made', desc: 'Founded and engineered in India, building world-class technology for global users.' },
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
            <section style={{ textAlign: 'center', padding: '120px 5%', background: 'linear-gradient(to bottom, transparent, rgba(79,156,249,0.05))' }}>
                <h2 style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: '800', marginBottom: '24px' }}>Ready to redefine your workspace?</h2>
                <p style={{ color: 'var(--muted)', fontSize: '18px', marginBottom: '48px' }}>Join the ecosystem of privacy-focused, AI-first productivity.</p>
                <Link href="/login" className="btn-primary" style={{ padding: '18px 48px', fontSize: '18px' }}>Get Started Free</Link>
            </section>

            <Footer />

            <ChatWidget />
        </div>
    );
}
