import Navbar from '@/components/Navbar';
import ChatWidget from '@/components/ChatWidget';

export const metadata = { title: 'About ARKIS' };

export default function About() {
    return (
        <>
            <Navbar />

            <section className="hero" style={{ minHeight: '60vh', paddingTop: '120px', paddingBottom: '60px' }}>
                <div className="badge"><span className="dot" />Our Vision</div>
                <h1 style={{ fontSize: 'clamp(36px,6vw,72px)' }}>Computing,<br /><span className="grad">Redefined.</span></h1>
                <p>ARKIS is a technology company focused on building intelligent systems — from AI assistants to operating systems.</p>
            </section>

            <section>
                <div className="label">Mission</div>
                <h2 className="section-title">AI that respects you.</h2>
                <div className="section-sub" style={{ maxWidth: '900px', lineHeight: '1.8', color: 'var(--text)', opacity: 0.9 }}>
                    <p style={{ marginBottom: '24px' }}>
                        ARKIS is a technology company dedicated to building the intelligent systems of the future — from specialized AI assistants to decentralized operating systems. Our mission is to bridge the gap between high-performance computing and true personal privacy. We believe that technology should empower human potential without requiring the sacrifice of digital autonomy.
                    </p>
                    <p style={{ marginBottom: '24px' }}>
                        At the core of our philosophy is the belief that the future of AI is local. By shifting processing power from the cloud back to the edge, we enable experiences that are fast, private, and entirely under your control. Whether you are a student streamlining your research or a studio automating complex workflows, ARKIS builds the infrastructure that keeps your data where it belongs: with you.
                    </p>
                    <p>
                        We aren't just building tools; we are designing an ecosystem. From the RK AI Desktop environment to the upcoming Lumina OS, every product we create is a pillar in a new standard of computing. One where privacy is the default, ownership is real, and innovation is relentless.
                    </p>
                </div>
            </section>

            <section>
                <div className="label">Ecosystem</div>
                <h2 className="section-title">Technological pillars.</h2>
                <div className="feature-grid">
                    {[
                        ['💻', 'RK AI Desktop', 'The flagship AI assistant ecosystem for power users. Local model execution, system-wide automation, and privacy-first intelligence.'],
                        ['🏠', 'RK AI Home', 'Hardware-integrated ambient intelligence. Empowering physical spaces with voice-activated assistance that respects the home boundary.'],
                        ['�', 'Lumina OS', 'A next-generation operating system built from the ground up for the AI-first era. Independent, secure, and user-centric.'],
                        ['�', 'Light Key', 'The proprietary authentication and access layer for the ARKIS ecosystem, ensuring unified security across all systems.'],
                    ].map(([icon, title, desc]) => (
                        <div key={title} className="feature-card">
                            <div className="feature-icon">{icon}</div>
                            <h3>{title}</h3>
                            <p>{desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section style={{ textAlign: 'center' }}>
                <h2 className="section-title">Join the ecosystem.</h2>
                <p className="section-sub" style={{ margin: '0 auto 32px' }}>Be part of the future of intelligent computing.</p>
                <Link className="btn-primary" href="/products">Explore ARKIS Products →</Link>
            </section>

            <footer>
                <span className="logo"><span>ARKIS</span></span>
                <span>© 2026 ARKIS. All rights reserved.</span>
                <a href="mailto:hello@arkis.ai">hello@arkis.ai</a>
            </footer>

            <ChatWidget />
        </>
    );
}
