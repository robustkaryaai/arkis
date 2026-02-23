import Navbar from '@/components/Navbar';
import ChatWidget from '@/components/ChatWidget';
import Link from 'next/link';

export const metadata = { title: 'About RK AI' };

export default function About() {
    return (
        <div style={{ background: 'var(--background)', color: 'var(--text)', minHeight: '100vh' }}>
            <Navbar />

            <section className="hero" style={{ minHeight: '60vh', paddingTop: '120px', paddingBottom: '60px', textAlign: 'center' }}>
                <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                    <div className="badge" style={{ margin: '0 auto 16px' }}><span className="dot" />Our Vision</div>
                    <h1 style={{ fontSize: 'clamp(36px,6vw,72px)', lineHeight: '1.2' }}>Built for,<br /><span className="grad">everyone.</span></h1>
                    <p style={{ fontSize: '1.2rem', opacity: 0.8, marginTop: '20px' }}>RK AI is a technology company focused on building intelligent systems — from AI assistants to operating systems.</p>
                </div>
            </section>

            <section style={{ padding: '80px 5%', maxWidth: '1200px', margin: '0 auto' }}>
                <div className="label">Mission</div>
                <h2 className="section-title">AI that respects you.</h2>
                <div className="section-sub" style={{ maxWidth: '900px', lineHeight: '1.8', opacity: 0.9 }}>
                    <p style={{ marginBottom: '24px' }}>
                        RK AI is a technology company dedicated to building the intelligent systems of the future — from specialized AI assistants to decentralized operating systems. Our mission is to bridge the gap between high-performance computing and true personal privacy. We believe that technology should empower human potential without requiring the sacrifice of digital autonomy.
                    </p>
                    <p style={{ marginBottom: '24px' }}>
                        At the core of our philosophy is the belief that the future of AI is local. By shifting processing power from the cloud back to the edge, we enable experiences that are fast, private, and entirely under your control. Whether you are a student streamlining your research or a studio automating complex workflows, RK AI builds the infrastructure that keeps your data where it belongs: with you.
                    </p>
                    <p>
                        We aren't just building tools; we are designing an ecosystem. From the RK AI Desktop environment to the upcoming Lumina OS, every product we create is a pillar in a new standard of computing. One where privacy is the default, ownership is real, and innovation is relentless.
                    </p>
                </div>
            </section>

            <section style={{ padding: '80px 5%', maxWidth: '1200px', margin: '0 auto' }}>
                <div className="label">Ecosystem</div>
                <h2 className="section-title">Technological pillars.</h2>
                <div className="feature-grid" style={{
                    display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: '40px', marginTop: '60px'
                }}>
                    {[
                        ['💻', 'RK AI Desktop', 'The flagship AI assistant ecosystem for power users. Local model execution, system-wide automation, and privacy-first intelligence.'],
                        ['🏠', 'RK AI Home', 'Hardware-integrated ambient intelligence. Empowering physical spaces with voice-activated assistance that respects the home boundary.'],
                        ['💿', 'Lumina OS', 'A next-generation operating system built from the ground up for the AI-first era. Independent, secure, and user-centric.'],
                        ['🔑', 'Light Key', 'The proprietary authentication and access layer for the RK AI ecosystem, ensuring unified security across all systems.'],
                    ].map(([icon, title, desc]) => (
                        <div key={title} className="feature-card" style={{
                            background: 'var(--surface)', padding: '32px', borderRadius: '24px',
                            border: '1px solid var(--border)'
                        }}>
                            <div style={{ fontSize: '40px', marginBottom: '20px' }}>{icon}</div>
                            <h3 style={{ fontSize: '22px', marginBottom: '12px' }}>{title}</h3>
                            <p style={{ color: 'var(--muted)', fontSize: '15px', lineHeight: '1.6' }}>{desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section style={{ textAlign: 'center', padding: '100px 5%' }}>
                <h2 className="section-title">Join the ecosystem.</h2>
                <p className="section-sub" style={{ margin: '0 auto 32px' }}>Be part of the future of intelligent computing.</p>
                <Link className="btn-primary" href="/products" style={{ padding: '18px 40px', borderRadius: '50px' }}>Explore RK AI Products →</Link>
            </section>

            <footer style={{ padding: '60px 5%', textAlign: 'center', borderTop: '1px solid var(--border)' }}>
                <span className="logo" style={{ fontSize: '24px', fontWeight: '800' }}><span>RK AI</span></span>
                <p style={{ color: 'var(--muted)', marginTop: '12px' }}>© 2026 RK AI. All rights reserved.</p>
                <a href="mailto:arkisglobal.official@gmail.com" style={{ color: 'var(--blue)', textDecoration: 'none' }}>arkisglobal.official@gmail.com</a>
            </footer>

            <ChatWidget />
        </div>
    );
}
