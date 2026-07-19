'use client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ChatWidget from '@/components/ChatWidget';
import Link from 'next/link';
import { FiArrowRight, FiShield, FiCpu, FiEye, FiZap } from 'react-icons/fi';

const stats = [
  { label: 'Local-first AI', value: '100%', icon: <FiShield size={24} /> },
  { label: 'Private workflows', value: 'Zero Cloud', icon: <FiCpu size={24} /> },
  { label: 'Latency reduction', value: '3x faster', icon: <FiZap size={24} /> },
  { label: 'Screens processed', value: 'Live & Secure', icon: <FiEye size={24} /> },
];

const features = [
  { title: 'System Automation', desc: 'Natural language control for apps, files, and workflows across Windows, macOS, and Linux.' },
  { title: 'Smart Documents', desc: 'Generate PPTX, DOCX, reports and briefs instantly, with local AI privacy.' },
  { title: 'Voice & Chat', desc: 'Offline voice commands, assistant chat, and hands-free productivity built into your desktop.' },
  { title: 'Privacy First', desc: 'All processing remains on your machine by default. No hidden cloud telemetry.' },
];

const journeyHighlights = [
  { title: 'Local AI Engine', desc: 'RK AI runs models on your computer using Ollama and local GPU/CPU acceleration.' },
  { title: 'Deep System Reach', desc: 'Integrates with file search, task automation, screen understanding, and app control.' },
  { title: 'Multi-modal Workflows', desc: 'Combine voice, text, docs, and automation in one seamless desktop experience.' },
  { title: 'Indian Engineering', desc: 'Designed and shipped from India, built for global professionals and creators.' },
];

export default function RKDesktopLearnMore() {
  return (
    <div style={{ background: 'var(--background)', color: 'var(--text)', minHeight: '100vh', overflowX: 'hidden' }}>
      <Navbar />

      <main style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px 80px', position: 'relative' }}>
        
        {/* Background Glows */}
        <div style={{ position: 'absolute', top: '10%', left: '50%', transform: 'translate(-50%, -50%)', width: '1000px', height: '1000px', background: 'radial-gradient(circle, rgba(79, 156, 249, 0.08) 0%, transparent 60%)', pointerEvents: 'none', zIndex: 0 }} />
        <div style={{ position: 'absolute', bottom: '20%', right: '-20%', width: '800px', height: '800px', background: 'radial-gradient(circle, rgba(155, 89, 245, 0.05) 0%, transparent 60%)', pointerEvents: 'none', zIndex: 0 }} />

        {/* HERO SECTION */}
        <section className="hero" style={{ position: 'relative', zIndex: 1, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '40px', alignItems: 'center', padding: '120px 0 60px' }}>
          <div>
            <div className="badge float-anim" style={{ marginBottom: '24px', animation: 'fade-in 1s ease-out' }}>
                <span className="dot" style={{ background: 'var(--blue)' }} /> RK AI Desktop — Learn More
            </div>
            <h1 style={{ fontSize: 'clamp(42px, 6vw, 72px)', lineHeight: '1.05', marginBottom: '24px', fontWeight: '900', letterSpacing: '-1px', animation: 'fade-up 1s ease-out' }}>
              Meet the AI layer for your <span className="grad">computer.</span>
            </h1>
            <p style={{ fontSize: '18px', lineHeight: '1.8', color: 'var(--muted)', marginBottom: '36px', maxWidth: '600px', animation: 'fade-up 1.2s ease-out' }}>
              RK AI Desktop brings local-first intelligence to Windows, macOS, and Linux.
              It combines offline voice, contextual chat, document generation, system automation,
              and smart desktop workflows—all while keeping your data strictly private.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', animation: 'fade-up 1.4s ease-out' }}>
              <Link href="#why-rk-ai" className="btn-primary" style={{ padding: '16px 32px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                Why RK AI? <FiArrowRight size={18} />
              </Link>
              <Link href="/products/rk-ai-desktop" className="btn-secondary" style={{ padding: '16px 32px' }}>
                Back to Product
              </Link>
            </div>
          </div>

          <div style={{ 
              background: 'var(--surface)', 
              border: '1px solid var(--border)', 
              borderRadius: '32px', 
              minHeight: '420px', padding: '40px', display: 'flex', flexDirection: 'column', 
              justifyContent: 'center', position: 'relative', overflow: 'hidden',
              boxShadow: '0 30px 60px rgba(0,0,0,0.5), inset 0 0 40px rgba(79, 156, 249, 0.1)',
              animation: 'scale-up 1.5s cubic-bezier(0.16, 1, 0.3, 1)'
          }}>
            <div style={{ 
                position: 'absolute', top: 0, right: 0, width: '300px', height: '300px', 
                background: 'radial-gradient(circle, rgba(79, 156, 249, 0.15) 0%, transparent 70%)', 
                pointerEvents: 'none' 
            }} />
            
            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{ display: 'inline-flex', background: 'rgba(255,255,255,0.08)', color: '#d1d5db', padding: '8px 14px', borderRadius: '999px', fontSize: '11px', fontWeight: '800', marginBottom: '24px', letterSpacing: '1px', textTransform: 'uppercase' }}>
                Trusted by creators & teams
              </div>
              <div style={{ fontSize: '48px', fontWeight: '900', marginBottom: '16px', lineHeight: '1' }}>AI Desktop</div>
              <p style={{ color: 'var(--muted)', lineHeight: '1.7', fontSize: '16px', marginBottom: '32px' }}>
                Local-first assistant for professional workflows, code, content, and automation.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', fontSize: '13px', color: '#999', fontWeight: '600' }}>
                <span style={{ padding: '6px 12px', background: 'rgba(0,0,0,0.3)', borderRadius: '8px' }}>macOS • Windows • Linux</span>
                <span style={{ padding: '6px 12px', background: 'rgba(0,0,0,0.3)', borderRadius: '8px' }}>Private by default</span>
              </div>
            </div>
          </div>
        </section>

        {/* TRUST GRID */}
        <section id="why-rk-ai" style={{ position: 'relative', zIndex: 1, padding: '80px 0' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '24px' }}>
            {stats.map((item) => (
              <div key={item.label} className="feature-card" style={{ 
                  background: 'var(--surface)', border: '1px solid var(--border)', 
                  borderRadius: '24px', padding: '32px', display: 'flex', flexDirection: 'column', gap: '16px' 
              }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'rgba(79, 156, 249, 0.1)', color: 'var(--blue)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {item.icon}
                </div>
                <strong style={{ fontSize: '36px', fontWeight: '900' }}>{item.value}</strong>
                <p style={{ color: 'var(--muted)', margin: 0, fontWeight: '600' }}>{item.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FEATURES */}
        <section style={{ position: 'relative', zIndex: 1, padding: '80px 0' }}>
          <div style={{ marginBottom: '60px', textAlign: 'center' }}>
            <span style={{ display: 'inline-block', color: 'var(--blue)', fontWeight: '800', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '12px' }}>Core strengths</span>
            <h2 style={{ fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: '900', margin: 0 }}>What RK AI Desktop gives you.</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px' }}>
            {features.map((feature) => (
              <div key={feature.title} className="feature-card" style={{ 
                  padding: '40px', borderRadius: '24px', background: 'var(--surface)', 
                  border: '1px solid var(--border)'
              }}>
                <h3 style={{ fontSize: '22px', fontWeight: '800', marginBottom: '16px' }}>{feature.title}</h3>
                <p style={{ color: 'var(--muted)', lineHeight: '1.7', margin: 0 }}>{feature.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CHARTS */}
        <section style={{ position: 'relative', zIndex: 1, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '60px', alignItems: 'center', padding: '100px 0' }}>
          <div>
            <span style={{ display: 'block', color: 'var(--blue)', fontWeight: '800', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '12px' }}>Performance snapshot</span>
            <h2 style={{ fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: '900', marginBottom: '24px', lineHeight: '1.1' }}>Designed to accelerate your workflow.</h2>
            <p style={{ color: 'var(--muted)', lineHeight: '1.8', fontSize: '18px' }}>
              RK AI Desktop lowers friction by keeping analytics and automation local, so actions happen instantly,
              files stay private, and AI can work directly with your screen context.
            </p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div className="feature-card" style={{ padding: '32px', borderRadius: '24px', background: 'var(--surface)', border: '1px solid var(--border)' }}>
              <span style={{ display: 'block', fontWeight: '800', marginBottom: '16px', fontSize: '16px' }}>Task completion speed</span>
              <div style={{ width: '100%', height: '14px', background: 'rgba(255,255,255,0.06)', borderRadius: '999px', overflow: 'hidden', marginBottom: '16px' }}>
                <div style={{ width: '80%', height: '100%', background: 'linear-gradient(90deg, var(--blue), #3b82f6)', borderRadius: '999px' }} />
              </div>
              <small style={{ color: 'var(--muted)', fontWeight: '600' }}>Up to 3x faster than cloud-only assistants</small>
            </div>
            <div className="feature-card" style={{ padding: '32px', borderRadius: '24px', background: 'var(--surface)', border: '1px solid var(--border)' }}>
              <span style={{ display: 'block', fontWeight: '800', marginBottom: '16px', fontSize: '16px' }}>Privacy compliance</span>
              <div style={{ width: '100%', height: '14px', background: 'rgba(255,255,255,0.06)', borderRadius: '999px', overflow: 'hidden', marginBottom: '16px' }}>
                <div style={{ width: '96%', height: '100%', background: 'linear-gradient(90deg, #22c55e, #16a34a)', borderRadius: '999px' }} />
              </div>
              <small style={{ color: 'var(--muted)', fontWeight: '600' }}>Data stays on your machine permanently</small>
            </div>
            <div className="feature-card" style={{ padding: '32px', borderRadius: '24px', background: 'var(--surface)', border: '1px solid var(--border)' }}>
              <span style={{ display: 'block', fontWeight: '800', marginBottom: '16px', fontSize: '16px' }}>Uptime and availability</span>
              <div style={{ width: '100%', height: '14px', background: 'rgba(255,255,255,0.06)', borderRadius: '999px', overflow: 'hidden', marginBottom: '16px' }}>
                <div style={{ width: '92%', height: '100%', background: 'linear-gradient(90deg, var(--violet), #9333ea)', borderRadius: '999px' }} />
              </div>
              <small style={{ color: 'var(--muted)', fontWeight: '600' }}>Always ready, even when offline</small>
            </div>
          </div>
        </section>

        {/* JOURNEY */}
        <section style={{ position: 'relative', zIndex: 1, padding: '80px 0' }}>
          <div style={{ marginBottom: '60px', textAlign: 'center' }}>
            <span style={{ display: 'inline-block', color: 'var(--blue)', fontWeight: '800', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '12px' }}>Journey</span>
            <h2 style={{ fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: '900', margin: 0 }}>Built from real desktop experience.</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px', marginBottom: '32px' }}>
            {journeyHighlights.map((item) => (
              <div key={item.title} className="feature-card" style={{ padding: '40px', borderRadius: '24px', border: '1px solid var(--border)', background: 'var(--surface)' }}>
                <h3 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '16px' }}>{item.title}</h3>
                <p style={{ color: 'var(--muted)', lineHeight: '1.7', margin: 0 }}>{item.desc}</p>
              </div>
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
            <Link href="/journey/lumina-os" className="feature-card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '32px', borderRadius: '24px', background: 'var(--surface)', border: '1px solid var(--border)', textDecoration: 'none', color: 'inherit' }}>
              <div>
                <strong style={{ display: 'block', fontSize: '18px', fontWeight: '800', marginBottom: '8px' }}>Lumina OS Story</strong>
                <p style={{ margin: 0, fontSize: '15px', color: 'var(--muted)' }}>See how our OS journey shaped RK AI.</p>
              </div>
              <FiArrowRight size={24} color="var(--blue)" />
            </Link>
            <Link href="/journey/light-key" className="feature-card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '32px', borderRadius: '24px', background: 'var(--surface)', border: '1px solid var(--border)', textDecoration: 'none', color: 'inherit' }}>
              <div>
                <strong style={{ display: 'block', fontSize: '18px', fontWeight: '800', marginBottom: '8px' }}>Light Key Path</strong>
                <p style={{ margin: 0, fontSize: '15px', color: 'var(--muted)' }}>How intelligent input defined our workflow.</p>
              </div>
              <FiArrowRight size={24} color="var(--blue)" />
            </Link>
          </div>
        </section>

        {/* MEDIA */}
        <section style={{ position: 'relative', zIndex: 1, padding: '100px 0' }}>
          <div style={{ marginBottom: '60px', maxWidth: '800px', margin: '0 auto 60px', textAlign: 'center' }}>
            <span style={{ display: 'inline-block', color: 'var(--blue)', fontWeight: '800', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '12px' }}>Media</span>
            <h2 style={{ fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: '900', marginBottom: '24px' }}>Interactive preview.</h2>
            <p style={{ color: 'var(--muted)', lineHeight: '1.7', fontSize: '18px' }}>
              Watch how RK AI Desktop acts like a creative partner, managing documents, voice workflows, and automation across apps.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '32px' }}>
            <div className="feature-card" style={{ borderRadius: '32px', border: '1px solid var(--border)', overflow: 'hidden', background: 'var(--surface)', position: 'relative', padding: 0 }}>
              <video autoPlay muted loop playsInline style={{ width: '100%', height: '460px', objectFit: 'cover', display: 'block' }}>
                <source src="/rk-ai-home-images/img_2565.mov" type="video/quicktime" />
              </video>
              <div style={{ position: 'absolute', bottom: '24px', left: '24px', padding: '10px 20px', background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(10px)', borderRadius: '999px', fontSize: '14px', fontWeight: '700' }}>Demo Preview</div>
            </div>
            <div className="feature-card" style={{ borderRadius: '32px', border: '1px solid var(--border)', background: 'var(--surface)', padding: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div>
                <span style={{ display: 'block', fontSize: '32px', fontWeight: '900', lineHeight: '1.4', marginBottom: '32px' }}>
                  “RK AI Desktop feels like a local companion, not another cloud app.”
                </span>
                <p style={{ color: 'var(--muted)', fontWeight: '600', margin: 0, fontSize: '16px' }}>— Early access creator testing content workflows.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section style={{ position: 'relative', zIndex: 1, padding: '80px 0 40px' }}>
          <div style={{ 
              display: 'flex', flexWrap: 'wrap', gap: '40px', alignItems: 'center', justifyContent: 'space-between', 
              padding: '80px 60px', borderRadius: '40px', background: 'var(--surface)', 
              border: '1px solid var(--border)',
              boxShadow: '0 40px 80px rgba(0,0,0,0.4), inset 0 0 60px rgba(79, 156, 249, 0.05)'
          }}>
            <div style={{ flex: '1 1 400px' }}>
              <h2 style={{ fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: '900', marginBottom: '20px' }}>Want a faster, smarter desktop?</h2>
              <p style={{ color: 'var(--muted)', lineHeight: '1.7', fontSize: '18px', margin: 0 }}>
                RK AI Desktop combines offline intelligence, system automation, and privacy-first design into one seamless experience.
              </p>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
              <Link href="/products/rk-ai-desktop" className="btn-secondary" style={{ padding: '18px 40px' }}>Back to Product</Link>
              <Link href="/subscription" className="btn-primary" style={{ padding: '18px 40px' }}>Explore Subscription</Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <ChatWidget />
    </div>
  );
}
