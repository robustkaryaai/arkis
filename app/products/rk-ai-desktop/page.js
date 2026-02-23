'use client';
import Navbar from '@/components/Navbar';
import ChatWidget from '@/components/ChatWidget';
import Link from 'next/link';

export default function RKDesktopProduct() {
    return (
        <>
            <Navbar />

            {/* PRODUCT HERO */}
            <section className="hero" style={{ minHeight: '60vh', padding: '120px 5% 60px' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '60px', alignItems: 'center', maxWidth: '1200px', margin: '0 auto' }}>

                    <div style={{ flex: '1 1 500px' }}>
                        <div className="badge"><span className="dot" />Now Live for macOS & Windows</div>
                        <h1 style={{ fontSize: 'clamp(42px, 6vw, 72px)', marginBottom: '20px' }}>
                            RK AI <span className="grad">Desktop</span>
                        </h1>
                        <p style={{ fontSize: '20px', color: 'var(--text)', opacity: 0.9, lineHeight: '1.6', marginBottom: '32px' }}>
                            The ultimate AI powerhouse for your computer. Control your system, generate high-quality documents, and run local models with zero latency.
                        </p>

                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
                            <a href="/downloads/RK-AI-mac.dmg" className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '16px 32px' }}>
                                <span>🍎</span> Download for Mac
                            </a>
                            <a href="/downloads/RK-AI-windows.exe" className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '16px 32px', border: '1px solid var(--border)' }}>
                                <span>🪟</span> Download for Windows
                            </a>
                        </div>
                        <p style={{ marginTop: '16px', fontSize: '12px', color: 'var(--muted)' }}>
                            Latest Version: 1.0.0 · Free to start · Requires Ollama for local mode
                        </p>
                    </div>

                    <div style={{ flex: '1 1 400px', display: 'flex', justifyContent: 'center' }}>
                        <div style={{
                            width: '100%', height: '400px', background: 'var(--surface)',
                            border: '1px solid var(--border)', borderRadius: '24px',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: '100px', boxShadow: '0 40px 80px rgba(0,0,0,0.4)',
                            position: 'relative', overflow: 'hidden'
                        }}>
                            💻
                            <div style={{
                                position: 'absolute', inset: 0,
                                background: 'radial-gradient(circle at center, var(--blue)11, transparent)',
                                pointerEvents: 'none'
                            }} />
                        </div>
                    </div>

                </div>
            </section>

            {/* DETAILED FEATURES */}
            <section style={{ padding: '80px 5%', maxWidth: '1200px', margin: '0 auto' }}>
                <div className="label">Capabilities</div>
                <h2 className="section-title">One tool. Multiple superpowers.</h2>

                <div style={{
                    display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: '32px', marginTop: '60px'
                }}>
                    {[
                        { icon: '📁', title: 'System Automation', desc: 'Open apps, organize files, and automate repetitive tasks using natural voice commands.' },
                        { icon: '📝', title: 'Document Gen', desc: 'Create complex PPT presentations and professional DOCX reports in seconds.' },
                        { icon: '🎨', title: 'Creative Studio', desc: 'Generate 4K AI images and short-form videos directly from your desktop workspace.' },
                        { icon: '🔍', title: 'Smart Search', desc: 'Real-time web summaries for the latest news, weather, and research.' },
                        { icon: '🛡️', title: 'Privacy Core', desc: 'Switch to local-only mode using Ollama models (Llama 3, Mistral) for absolute privacy.' },
                        { icon: '🏢', title: 'Indian-Optimized', desc: 'Optimized response times for Indian networks and support for diverse accents.' },
                    ].map(f => (
                        <div key={f.title} style={{
                            background: 'var(--surface)', padding: '32px', borderRadius: '20px',
                            border: '1px solid var(--border)'
                        }}>
                            <div style={{ fontSize: '32px', marginBottom: '16px' }}>{f.icon}</div>
                            <h3 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '12px' }}>{f.title}</h3>
                            <p style={{ color: 'var(--muted)', fontSize: '15px', lineHeight: '1.6' }}>{f.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <section style={{ textAlign: 'center', padding: '100px 5%', background: 'linear-gradient(to bottom, transparent, rgba(79,156,249,0.05))' }}>
                <h2 className="section-title">Ready to upgrade your computer?</h2>
                <p className="section-sub" style={{ margin: '0 auto 40px' }}>Join thousands of users building the future with ARKIS.</p>
                <Link href="/login" className="btn-primary" style={{ padding: '16px 40px' }}>Get Started Now</Link>
            </section>

            {/* FOOTER */}
            <footer>
                <span className="logo"><span>ARKIS</span></span>
                <span>© 2026 ARKIS. All rights reserved.</span>
                <a href="mailto:hello@arkis.ai">hello@arkis.ai</a>
            </footer>

            <ChatWidget />
        </>
    );
}
