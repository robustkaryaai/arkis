import Navbar from '@/components/Navbar';
import ChatWidget from '@/components/ChatWidget';
import Link from 'next/link';

export const metadata = { title: 'ARKIS — AI, Redefined' };

export default function Home() {
  return (
    <>
      <Navbar />

      {/* HERO */}
      <section className="hero">
        <div className="badge"><span className="dot" />Now in Beta — Local AI for Everyone</div>
        <h1>AI that runs<br /><span className="grad">on your machine.</span></h1>
        <p>ARKIS brings a fully private, blazing-fast voice AI assistant to your desktop. No cloud lock-in. Just your voice and your hardware.</p>
        <div className="hero-btns">
          <Link className="btn-primary" href="#download">Download Free</Link>
          <Link className="btn-secondary" href="/products">View Plans</Link>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features">
        <div className="label">Why ARKIS</div>
        <h2 className="section-title">Built different.<br />By design.</h2>
        <p className="section-sub">Every decision was made to give you a smarter, faster, more private AI experience.</p>
        <div className="feature-grid">
          {[
            ['🔒', '100% Private', 'Your conversations never leave your machine. RK AI runs entirely offline using local Ollama models.'],
            ['⚡', 'Instant Response', 'Wake word detection, speech recognition, and AI generation happen locally — zero latency.'],
            ['🎙️', 'Natural Voice', 'Fuzzy wake word matching understands your accent and variations of "RK" perfectly.'],
            ['🖼️', 'AI Image Generation', 'Say "RK generate an image of..." and get a high-quality result in seconds (Pro+).'],
            ['🌐', 'Live Web Search', 'Ask anything about today\'s news or the web and get an AI-summarised answer (Pro+).'],
            ['🎵', 'Music + Commands', 'Play music, open apps, control your system — all hands-free.'],
          ].map(([icon, title, desc]) => (
            <div key={title} className="feature-card">
              <div className="feature-icon">{icon}</div>
              <h3>{title}</h3>
              <p>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PRICING CTA */}
      <section style={{ textAlign: 'center' }}>
        <div className="label">Plans</div>
        <h2 className="section-title">Simple, honest pricing.</h2>
        <p className="section-sub" style={{ margin: '0 auto 32px' }}>Start free. Upgrade for image generation, video AI, and more.</p>
        <Link className="btn-primary" href="/products">See All Plans →</Link>
      </section>

      {/* DOWNLOAD */}
      <section id="download">
        <div className="label">Download</div>
        <h2 className="section-title">Get RK AI now.</h2>
        <p className="section-sub">Available on all major platforms. Free to start.</p>
        <div className="download-grid" style={{ marginTop: '32px' }}>
          {[
            ['🍎', 'macOS', 'DMG · Intel & Apple Silicon'],
            ['🪟', 'Windows', 'EXE (NSIS) + MSI · 64-bit'],
            ['🐧', 'Linux', 'AppImage + .deb'],
          ].map(([icon, name, sub]) => (
            <a key={name} className="dl-btn" href="#">
              <span>{icon}</span>
              <div><strong>{name}</strong><br /><small style={{ color: 'var(--muted)' }}>{sub}</small></div>
            </a>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <span className="logo"><span>ARKIS</span></span>
        <span>© 2026 ARKIS. All rights reserved.</span>
        <span>Built with ❤️ and local AI</span>
      </footer>

      <ChatWidget />
    </>
  );
}
