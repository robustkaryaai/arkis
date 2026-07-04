'use client';
import Navbar from '@/components/Navbar';
import ChatWidget from '@/components/ChatWidget';
import Footer from '@/components/Footer';

const plans = [
  { name: 'Free', color: '#888888', price: '₹0', period: '/mo', desc: 'Enter the matrix.', storage: '50 MB', videos: 'Local', features: ['Spark: Local AI Engine (Ollama)', 'Offline Voice Command & Chat', 'Offline TTS & STT assistant', '5,000 max tokens & 30 RPM limit'], locked: [], cta: 'Download Free', href: '/#download', ghost: true },
  { name: 'Pro', color: '#4f9cf9', price: '₹599', period: '/mo', desc: 'Learn. Build. Dominate.', storage: '500 MB', videos: '10 videos/mo', features: ['Cloud Models (Gemini Flash & SDXL)', 'Live Web Search Integration', 'Coding Mode (IDE Integration)', 'Memory Matrix (Conversation Memory)'], locked: [], cta: 'Get Pro Plan' },
  { name: 'Elite', color: '#a855f7', featured: true, price: '₹1499', period: '/mo', desc: 'Master the system.', storage: '5 GB', videos: '50 videos/mo', features: ['Advanced Cloud Models (Gemini 3.1 & Flux)', 'RK AI Autonomy (Autonomous Actions)', 'Smart Vault (Unlimited Local File Indexing)', 'Screen Sense (Vision Analysis)'], locked: [], cta: 'Get Elite Plan' },
  { name: 'Quantum', color: '#f59e0b', price: '₹2999', period: '/mo', desc: 'Become the architect.', storage: '50 GB', videos: '100 videos/mo', features: ['Gemini Live (Native Audio Multimodal)', 'Unrestricted Computer Control', 'Autonomous Task Workflows', 'Priority Queue & Dedicated Compute'], locked: [], cta: 'Get Quantum Plan' }
];

export default function Tiers() {
  return (
    <div style={{ background: 'var(--background)', minHeight: '100vh', color: 'var(--text)' }}>
      <Navbar />

      <section className="hero" style={{ minHeight: '50vh', paddingTop: '120px', paddingBottom: '40px', textAlign: 'center' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div className="badge" style={{ margin: '0 auto 16px' }}><span className="dot" />Rexycore Cloud</div>
          <h1 style={{ fontSize: 'clamp(36px,6vw,72px)', lineHeight: '1.2' }}>Choose Your <span className="grad">Tier</span></h1>
          <p style={{ fontSize: '1.1rem', color: 'var(--muted)', marginTop: '16px' }}>Flexible plans for students, creators, and professionals.</p>
        </div>
      </section>

      <section style={{ padding: '40px 5%' }}>
        <div className="label">Plans</div>
        <div className="pricing-grid">
          {plans.map((p) => (
            <div key={p.name} className={`tier-card ${p.featured ? 'featured' : ''}`}>
              <div className="tier-name" style={{ color: p.color, display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ display: 'inline-block', width: '12px', height: '12px', borderRadius: '50%', background: p.color, boxShadow: `0 0 8px ${p.color}` }} />
                {p.name}
              </div>
              <div className="tier-price">
                <span className="amount">{p.price}</span>
                <span className="period">{p.period}</span>
              </div>
              <p className="tier-desc" style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>
                  {p.storage}
                </span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg>
                  {p.videos}
                </span>
              </p>
              <ul className="tier-features">
                {p.features.map(f => (<li key={f}><span className="tick">✓</span>{f}</li>))}
                {p.locked.map(f => (<li key={f}><span className="cross">✗</span>{f}</li>))}
              </ul>
              <a href={p.href || '#'} className={`tier-btn ${p.ghost ? 'ghost' : ''}`} onClick={!p.href ? (e) => { e.preventDefault(); alert(`Payments launching soon!\nEmail rexycoreofficial@gmail.com for early access to ${p.name}.`); } : undefined}>
                {p.cta}
              </a>
            </div>
          ))}
        </div>
        <p style={{ textAlign: 'center', color: 'var(--muted)', fontSize: '13px', marginTop: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#10b981' }}><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
          Secure payments via Paytm &middot; UPI &middot; Cards
        </p>
      </section>

      <Footer />
      <ChatWidget />
    </div>
  );
}
