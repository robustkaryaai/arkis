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

      {/* FOOTER */}

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
