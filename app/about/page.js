import Navbar from '@/components/Navbar';
import ChatWidget from '@/components/ChatWidget';

export const metadata = { title: 'About ARKIS' };

export default function About() {
    return (
        <>
            <Navbar />

            <section className="hero" style={{ minHeight: '60vh', paddingTop: '120px', paddingBottom: '60px' }}>
                <div className="badge"><span className="dot" />Our Story</div>
                <h1 style={{ fontSize: 'clamp(36px,6vw,72px)' }}>Built by builders,<br /><span className="grad">for builders.</span></h1>
                <p>ARKIS started with a simple idea: AI should work for you, on your machine, without sending your data to anyone.</p>
            </section>

            <section>
                <div className="label">Mission</div>
                <h2 className="section-title">AI that respects you.</h2>
                <p className="section-sub" style={{ maxWidth: '640px', lineHeight: '1.9' }}>
                    We believe the future of AI is local — fast, private, and under your control. ARKIS builds the tools that make that future accessible to everyone, from students to studios.
                </p>
            </section>

            <section>
                <div className="label">What We Build</div>
                <h2 className="section-title">Our products.</h2>
                <div className="feature-grid">
                    {[
                        ['🎙️', 'RK AI Desktop', 'A voice-first AI assistant that runs entirely on your machine. Wake word detection, local LLMs via Ollama, music control, and more.'],
                        ['☁️', 'ARKIS Cloud Services', 'Premium AI services built on top of your local setup — image generation, video AI, web search, document intelligence.'],
                        ['📱', 'ARKIS Mobile', 'Control your RK AI assistant from your phone. Monitor status, send commands, and view chat history on the go.'],
                        ['🔌', 'ARKIS API', 'Integrate ARKIS capabilities into your own apps. Available on Pro and Studio plans.'],
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
                <h2 className="section-title">Ready to get started?</h2>
                <p className="section-sub" style={{ margin: '0 auto 32px' }}>Download RK AI free and experience local AI today.</p>
                <a className="btn-primary" href="/#download">Download Free →</a>
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
