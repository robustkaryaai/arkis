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
        <div className="badge"><span className="dot" />Engineered in India</div>
        <h1>An AI-first ecosystem.<br /><span className="grad">Built for the future.</span></h1>
        <p>ARKIS is a technology company building privacy-focused, ecosystem-driven products that respect your autonomy.</p>
        <div className="hero-btns">
          <Link className="btn-primary" href="/products">Explore Products</Link>
          <Link className="btn-secondary" href="/about">Our Vision</Link>
        </div>
      </section>

      {/* VISION */}
      <section style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto', paddingTop: '40px' }}>
        <p style={{ fontSize: '1.2rem', color: 'var(--text)', lineHeight: '1.6' }}>
          <strong>Our Vision</strong><br />
          Technology should amplify human potential without compromising privacy. We are building an independent ecosystem where AI is a utility, not an overlord—starting with the desktop and expanding to the home, the operating system, and beyond.
        </p>
      </section>

      {/* FEATURES / WHY ARKIS */}
      <section id="features">
        <div className="label">Why ARKIS</div>
        <h2 className="section-title">Built different.<br />By design.</h2>
        <div className="feature-grid" style={{ marginTop: '40px' }}>
          {[
            ['🔒', 'Privacy-First', 'Your data is yours. Our architectures are designed to prioritize local execution and strict data boundaries.'],
            ['🇮🇳', 'Indian-Made', 'Founded and engineered in India, building world-class technology for global users.'],
            ['⚙️', 'AI-Optional', 'We build AI-first, but user-controlled. You have the power to fully disable AI support in our environments.'],
            ['🌐', 'Ecosystem-Driven', 'From the desktop assistant to the operating system, every product is designed to work seamlessly together.'],
          ].map(([icon, title, desc]) => (
            <div key={title} className="feature-card">
              <div className="feature-icon">{icon}</div>
              <h3>{title}</h3>
              <p>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* DOWNLOAD */}
      <section id="download" style={{ textAlign: 'center', padding: '80px 5%' }}>
        <div className="label">Download</div>
        <h2 className="section-title">Get RK AI for Desktop.</h2>
        <p className="section-sub">Experience the ARKIS ecosystem today. Blazing fast, fully private.</p>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '20px',
          maxWidth: '600px',
          margin: '40px auto 0'
        }}>
          <a href="/downloads/RK-AI-mac.dmg" className="btn-primary" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
            <span>🍎</span> macOS (DMG)
          </a>
          <a href="/downloads/RK-AI-windows.exe" className="btn-secondary" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', background: 'var(--surface)', border: '1px solid var(--border)' }}>
            <span>🪟</span> Windows (EXE)
          </a>
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
