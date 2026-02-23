'use client';
import Navbar from '@/components/Navbar';
import ChatWidget from '@/components/ChatWidget';
import Link from 'next/link';

export default function RKDesktopProduct() {
    return (
        <>
            <Navbar />

            {/* PRODUCT HERO */}
            <section className="hero" style={{ minHeight: '60vh', padding: '120px 5% 60px', textAlign: 'center' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', maxWidth: '800px', margin: '0 auto' }}>

                    <div style={{ width: '100%' }}>
                        <div className="badge" style={{ margin: '0 auto 16px' }}><span className="dot" />Now Live for macOS & Windows</div>
                        <h1 style={{ fontSize: 'clamp(42px, 6vw, 72px)', marginBottom: '20px' }}>
                            RK AI <span className="grad">Desktop</span>
                        </h1>
                        <p style={{ fontSize: '20px', color: 'var(--text)', opacity: 0.9, lineHeight: '1.6', marginBottom: '32px' }}>
                            The ultimate AI powerhouse for your computer. Control your system, generate high-quality documents, and run local models with zero latency.
                        </p>

                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
                            <a href="https://drive.google.com/uc?export=download&id=1aSeiA8ac0hg5W0HO_sGCQ1sWW4WLedqw" download className="btn-primary" style={{
                                display: 'flex', alignItems: 'center', gap: '12px', padding: '18px 36px',
                                borderRadius: '50px', fontSize: '16px', fontWeight: '700',
                                boxShadow: '0 10px 30px rgba(79, 156, 249, 0.3)'
                            }}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M16.365 1.43c0 1.14-.45 2.24-1.19 3.04-.83.9-2.21 1.6-3.46 1.5-.14-1.11.4-2.31 1.16-3.09.83-.87 2.22-1.53 3.41-1.45.06.67.08 1.34.08 1.99zM20.74 18.41c-.6 1.39-1.45 2.66-2.5 3.84-.94 1.03-1.98 2.11-3.32 2.15-1.17.04-1.95-.73-3.25-.73-1.31 0-2.15.71-3.31.75-1.36.04-2.42-1.14-3.36-2.17-2.06-2.28-3.62-6.44-3.56-10.35.04-2.04.74-3.99 2.02-5.35 1.07-1.15 2.56-1.82 4.14-1.85 1.19-.02 2.32.8 3.25.8.89 0 2.31-.99 3.88-.84.66.03 2.54.27 3.75 1.86-.1.06-2.24 1.32-2.22 3.94.02 3.14 2.74 4.18 2.77 4.19-.03.09-.44 1.51-1.49 2.97z" />
                                </svg>
                                macOS (DMG)
                            </a>
                            <a href="https://drive.google.com/uc?export=download&id=1BvVE-4huxgKPJ0Ya5yOYYlNp9EMBUlRm" download className="btn-secondary" style={{
                                display: 'flex', alignItems: 'center', gap: '12px', padding: '18px 36px',
                                borderRadius: '50px', fontSize: '16px', fontWeight: '700',
                                border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.05)',
                                color: 'var(--text)', transition: 'all 0.3s ease'
                            }}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M0 3.449L9.75 2.1v9.451H0V3.449zM0 12.451h9.75v9.451L0 20.551v-8.1zm10.75-10.825L24 0v11.551H10.75V1.626zM10.75 12.451H24V24l-13.25-1.826v-9.723z" /></svg>
                                Windows (EXE)
                            </a>
                        </div>
                        <p style={{ marginTop: '24px', fontSize: '13px', color: 'var(--muted)', fontWeight: '500' }}>
                            Stable Release: v2.0.0 · Free for Personal Use
                        </p>
                    </div>

                    <div style={{ marginTop: '60px', width: '100%', maxWidth: '600px', display: 'flex', justifyContent: 'center' }}>
                        <div style={{
                            width: '100%', height: '300px', background: 'var(--surface)',
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
                <p className="section-sub" style={{ margin: '0 auto 40px' }}>Join thousands of users building the future with RK AI.</p>
                <Link href="/login" className="btn-primary" style={{ padding: '16px 40px' }}>Get Started Now</Link>
            </section>

            {/* FOOTER */}
            <footer>
                <span className="logo"><span>RK AI</span></span>
                <span>© 2026 RK AI. All rights reserved.</span>
                <a href="mailto:rkai.official@gmail.com">rkai.official@gmail.com</a>
            </footer>

            <ChatWidget />
        </>
    );
}
