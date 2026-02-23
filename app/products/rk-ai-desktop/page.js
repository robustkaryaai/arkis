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
                            <a href="/downloads/RK-AI-mac.dmg" className="btn-primary" style={{
                                display: 'flex', alignItems: 'center', gap: '12px', padding: '18px 36px',
                                borderRadius: '50px', fontSize: '16px', fontWeight: '700',
                                boxShadow: '0 10px 30px rgba(79, 156, 249, 0.3)'
                            }}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.05 20.28c-.96.78-1.92 1.45-3 1.45s-1.47-.63-2.65-.63c-1.2 0-1.63.61-2.67.63-1.05.02-2.17-.79-3.21-1.68C3.52 18.25 2 15.27 2 12.11c0-3.12 2.02-4.76 4-4.76 1.05 0 2.08.57 2.72.57.65 0 1.55-.57 2.82-.57 1.33 0 2.45.65 3.16 1.45-2.58 1.41-2.18 4.71.55 5.75-.43 1.15-.99 2.29-1.99 3.16l1.79 2.57zm-3.66-13.68c-.02 1.95-1.61 3.59-3.55 3.59-.02-1.89 1.62-3.59 3.55-3.59z" /></svg>
                                macOS (DMG)
                            </a>
                            <a href="/downloads/RK-AI-windows.exe" className="btn-secondary" style={{
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
                <a href="mailto:arkisglobal.official@gmail.com">arkisglobal.official@gmail.com</a>
            </footer>

            <ChatWidget />
        </>
    );
}
