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
                            <button id="btn-mac" onClick={() => startDownload('mac')} className="btn-primary" style={{
                                display: 'flex', alignItems: 'center', gap: '12px', padding: '18px 36px',
                                borderRadius: '50px', fontSize: '16px', fontWeight: '700',
                                boxShadow: '0 10px 30px rgba(79, 156, 249, 0.3)', border: 'none', cursor: 'pointer'
                            }}>
                                <svg fill="#ffffff" height="20" width="20" viewBox="0 0 22.773 22.773" stroke="#ffffff"><g strokeWidth="0"></g><g strokeLinecap="round" strokeLinejoin="round"></g><g> <g> <g> <path d="M15.769,0c0.053,0,0.106,0,0.162,0c0.13,1.606-0.483,2.806-1.228,3.675c-0.731,0.863-1.732,1.7-3.351,1.573 c-0.108-1.583,0.506-2.694,1.25-3.561C13.292,0.879,14.557,0.16,15.769,0z"></path> <path d="M20.67,16.716c0,0.016,0,0.03,0,0.045c-0.455,1.378-1.104,2.559-1.896,3.655c-0.723,0.995-1.609,2.334-3.191,2.334 c-1.367,0-2.275-0.879-3.676-0.903c-1.482-0.024-2.297,0.735-3.652,0.926c-0.155,0-0.31,0-0.462,0 c-0.995-0.144-1.798-0.932-2.383-1.642c-1.725-2.098-3.058-4.808-3.306-8.276c0-0.34,0-0.679,0-1.019 c0.105-2.482,1.311-4.5,2.914-5.478c0.846-0.52,2.009-0.963,3.304-0.765c0.555,0.086,1.122,0.276,1.619,0.464 c0.471,0.181,1.06,0.502,1.618,0.485c0.378-0.011,0.754-0.208,1.135-0.347c1.116-0.403,2.21-0.865,3.652-0.648 c1.733,0.262,2.963,1.032,3.723,2.22c-1.466,0.933-2.625,2.339-2.427,4.74C17.818,14.688,19.086,15.964,20.67,16.716z"></path> </g> </g> </g></svg>
                                <span id="mac-label">Download for macOS</span>
                            </button>
                            <button id="btn-win" onClick={() => startDownload('win')} className="btn-secondary" style={{
                                display: 'flex', alignItems: 'center', gap: '12px', padding: '18px 36px',
                                borderRadius: '50px', fontSize: '16px', fontWeight: '700',
                                border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.05)',
                                color: 'var(--text)', cursor: 'pointer'
                            }}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M0 3.449L9.75 2.1v9.451H0V3.449zM0 12.451h9.75v9.451L0 20.551v-8.1zm10.75-10.825L24 0v11.551H10.75V1.626zM10.75 12.451H24V24l-13.25-1.826v-9.723z" /></svg>
                                <span id="win-label">Download for Windows</span>
                            </button>
                        </div>

                        <script dangerouslySetInnerHTML={{
                            __html: `
                            function startDownload(platform) {
                                const urls = {
                                    mac: 'https://github.com/robustkaryaai/arkis/releases/download/v2.0.0/RK-AI.dmg',
                                    win: 'https://github.com/robustkaryaai/arkis/releases/download/v2.0.0/RK-AI.exe'
                                };
                                const labels = { mac: document.getElementById('mac-label'), win: document.getElementById('win-label') };
                                const btns = { mac: document.getElementById('btn-mac'), win: document.getElementById('btn-win') };
                                labels[platform].textContent = '⬇ Starting download...';
                                btns[platform].style.opacity = '0.7';
                                btns[platform].disabled = true;
                                window.location.href = urls[platform];
                                setTimeout(() => {
                                    labels.mac.textContent = 'Download for macOS';
                                    labels.win.textContent = 'Download for Windows';
                                    btns.mac.style.opacity = '1'; btns.mac.disabled = false;
                                    btns.win.style.opacity = '1'; btns.win.disabled = false;
                                }, 4000);
                            }
                        ` }} />
                        <p style={{ marginTop: '24px', fontSize: '13px', color: 'var(--muted)', fontWeight: '500' }}>
                            Stable Release: v2.0.0 · Free for Personal Use
                        </p>
                        <div style={{
                            marginTop: '20px', background: 'rgba(251,191,36,0.06)',
                            border: '1px solid rgba(251,191,36,0.18)', borderRadius: '16px',
                            padding: '18px 24px', maxWidth: '500px', textAlign: 'left'
                        }}>
                            <p style={{ fontSize: '13px', color: '#fbbf24', fontWeight: '700', marginBottom: '10px' }}>
                                ⚠️ macOS: "damaged" or "unverified developer" warning?
                            </p>
                            <p style={{ fontSize: '12px', color: 'var(--muted)', marginBottom: '10px', lineHeight: '1.5' }}>
                                This is normal — Apple blocks unsigned apps until you allow them. It takes 3 clicks:
                            </p>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                {[
                                    ['1', '🖱️ Right-click the downloaded DMG', 'Choose "Open" from the menu (not double-click)'],
                                    ['2', '🔓 Click "Open" in the dialog', 'MacOS will ask to confirm — hit Open'],
                                    ['3', '✅ Done!', 'App opens. macOS remembers your choice.'],
                                ].map(([num, title, desc]) => (
                                    <div key={num} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                                        <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: 'rgba(251,191,36,0.2)', border: '1px solid rgba(251,191,36,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: '700', color: '#fbbf24', flexShrink: 0, marginTop: '1px' }}>{num}</div>
                                        <div>
                                            <p style={{ fontSize: '12px', fontWeight: '600', color: '#e2e8f0', margin: 0 }}>{title}</p>
                                            <p style={{ fontSize: '11px', color: 'var(--muted)', margin: 0 }}>{desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <p style={{ fontSize: '11px', color: '#64748b', marginTop: '10px', marginBottom: 0 }}>
                                Or go to <strong style={{ color: 'var(--muted)' }}>System Settings → Privacy & Security</strong> → scroll down → click <strong style={{ color: 'var(--muted)' }}>Open Anyway</strong>.
                            </p>
                        </div>
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
                <p className="section-sub" style={{ margin: '0 auto 40px' }}>Join thousands of users building the future with ARKIS.</p>
                <Link href="/login" className="btn-primary" style={{ padding: '16px 40px' }}>Get Started Now</Link>
            </section>

            {/* FOOTER */}
            <footer>
                <span className="logo"><span>ARKIS</span></span>
                <span>© 2026 ARKIS. All rights reserved.</span>
                <a href="mailto:arkisglobal.official@gmail.com">arkisglobal.official@gmail.com</a>
            </footer>

            <ChatWidget />
        </>
    );
}
