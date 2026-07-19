'use client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ChatWidget from '@/components/ChatWidget';
import Link from 'next/link';
import { FiArrowRight, FiShield, FiCpu, FiEye, FiZap, FiClock, FiMessageCircle } from 'react-icons/fi';

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

      <main style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px 80px' }}>
        {/* HERO SECTION */}
        <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '40px', alignItems: 'center', padding: '100px 0 60px' }}>
          <div>
            <span style={{ 
                display: 'inline-flex', padding: '8px 16px', borderRadius: '999px', 
                background: 'rgba(79, 156, 249, 0.1)', color: '#4f9cf9', 
                fontSize: '13px', letterSpacing: '1px', fontWeight: '800', 
                marginBottom: '24px', textTransform: 'uppercase' 
            }}>
              RK AI Desktop — Learn More
            </span>
            <h1 style={{ fontSize: 'clamp(42px, 5vw, 64px)', lineHeight: '1.05', marginBottom: '24px', fontWeight: '900', letterSpacing: '-1px' }}>
              Meet the AI layer for your computer.
            </h1>
            <p style={{ fontSize: '18px', lineHeight: '1.8', color: 'var(--muted)', marginBottom: '36px', maxWidth: '600px' }}>
              RK AI Desktop brings local-first intelligence to Windows, macOS, and Linux.
              It combines offline voice, contextual chat, document generation, system automation,
              and smart desktop workflows—all while keeping your data strictly private.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
              <Link href="#why-rk-ai" 
                style={{ 
                    display: 'inline-flex', alignItems: 'center', gap: '10px', 
                    padding: '16px 32px', borderRadius: '999px', background: '#4f9cf9', 
                    color: '#fff', fontWeight: '800', textDecoration: 'none',
                    boxShadow: '0 10px 30px rgba(79,156,249,0.3)', transition: 'all 0.3s ease'
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 15px 40px rgba(79,156,249,0.4)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 10px 30px rgba(79,156,249,0.3)'; }}
              >
                Why RK AI? <FiArrowRight size={18} />
              </Link>
              <Link href="/products/rk-ai-desktop" 
                style={{ 
                    display: 'inline-flex', alignItems: 'center', padding: '16px 32px', 
                    borderRadius: '999px', background: 'rgba(255,255,255,0.05)', 
                    color: '#fff', border: '1px solid rgba(255,255,255,0.1)', 
                    fontWeight: '800', textDecoration: 'none', transition: 'all 0.3s ease'
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.08)'}
                onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
              >
                Back to Product
              </Link>
            </div>
          </div>

          <div style={{ 
              background: 'linear-gradient(180deg, rgba(79,156,249,0.1), rgba(79,156,249,0.02))', 
              border: '1px solid rgba(79,156,249,0.2)', borderRadius: '32px', 
              minHeight: '420px', padding: '40px', display: 'flex', flexDirection: 'column', 
              justifyContent: 'center', position: 'relative', overflow: 'hidden' 
          }}>
            <div style={{ 
                position: 'absolute', top: 0, right: 0, width: '300px', height: '300px', 
                background: 'radial-gradient(circle, rgba(79,156,249,0.15) 0%, transparent 70%)', 
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
        <section id="why-rk-ai" style={{ padding: '60px 0' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '24px' }}>
            {stats.map((item) => (
              <div key={item.label} style={{ 
                  background: 'var(--surface)', border: '1px solid var(--border)', 
                  borderRadius: '24px', padding: '32px', display: 'flex', flexDirection: 'column', gap: '16px' 
              }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'rgba(79,156,249,0.1)', color: '#4f9cf9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {item.icon}
                </div>
                <strong style={{ fontSize: '32px', fontWeight: '900' }}>{item.value}</strong>
                <p style={{ color: 'var(--muted)', margin: 0, fontWeight: '600' }}>{item.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FEATURES */}
        <section style={{ padding: '80px 0' }}>
          <div style={{ marginBottom: '40px' }}>
            <span style={{ display: 'block', color: '#4f9cf9', fontWeight: '800', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '12px' }}>Core strengths</span>
            <h2 style={{ fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: '900', margin: 0 }}>What RK AI Desktop gives you.</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px' }}>
            {features.map((feature) => (
              <div key={feature.title} style={{ 
                  padding: '32px', borderRadius: '24px', background: 'var(--surface)', 
                  border: '1px solid var(--border)', transition: 'all 0.3s ease' 
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.borderColor = 'rgba(79,156,249,0.4)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.borderColor = 'var(--border)'; }}
              >
                <h3 style={{ fontSize: '22px', fontWeight: '800', marginBottom: '16px' }}>{feature.title}</h3>
                <p style={{ color: 'var(--muted)', lineHeight: '1.7', margin: 0 }}>{feature.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CHARTS */}
        <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '60px', alignItems: 'center', padding: '80px 0' }}>
          <div>
            <span style={{ display: 'block', color: '#4f9cf9', fontWeight: '800', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '12px' }}>Performance snapshot</span>
            <h2 style={{ fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: '900', marginBottom: '24px', lineHeight: '1.1' }}>Designed to accelerate your workflow.</h2>
            <p style={{ color: 'var(--muted)', lineHeight: '1.8', fontSize: '18px' }}>
              RK AI Desktop lowers friction by keeping analytics and automation local, so actions happen instantly,
              files stay private, and AI can work directly with your screen context.
            </p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ padding: '24px', borderRadius: '24px', background: 'var(--surface)', border: '1px solid var(--border)' }}>
              <span style={{ display: 'block', fontWeight: '800', marginBottom: '16px' }}>Task completion speed</span>
              <div style={{ width: '100%', height: '12px', background: 'rgba(255,255,255,0.06)', borderRadius: '999px', overflow: 'hidden', marginBottom: '12px' }}>
                <div style={{ width: '80%', height: '100%', background: 'linear-gradient(90deg, #4f9cf9, #3b82f6)', borderRadius: '999px' }} />
              </div>
              <small style={{ color: 'var(--muted)', fontWeight: '600' }}>Up to 3x faster than cloud-only assistants</small>
            </div>
            <div style={{ padding: '24px', borderRadius: '24px', background: 'var(--surface)', border: '1px solid var(--border)' }}>
              <span style={{ display: 'block', fontWeight: '800', marginBottom: '16px' }}>Privacy compliance</span>
              <div style={{ width: '100%', height: '12px', background: 'rgba(255,255,255,0.06)', borderRadius: '999px', overflow: 'hidden', marginBottom: '12px' }}>
                <div style={{ width: '96%', height: '100%', background: 'linear-gradient(90deg, #22c55e, #16a34a)', borderRadius: '999px' }} />
              </div>
              <small style={{ color: 'var(--muted)', fontWeight: '600' }}>Data stays on your machine permanently</small>
            </div>
            <div style={{ padding: '24px', borderRadius: '24px', background: 'var(--surface)', border: '1px solid var(--border)' }}>
              <span style={{ display: 'block', fontWeight: '800', marginBottom: '16px' }}>Uptime and availability</span>
              <div style={{ width: '100%', height: '12px', background: 'rgba(255,255,255,0.06)', borderRadius: '999px', overflow: 'hidden', marginBottom: '12px' }}>
                <div style={{ width: '92%', height: '100%', background: 'linear-gradient(90deg, #a855f7, #9333ea)', borderRadius: '999px' }} />
              </div>
              <small style={{ color: 'var(--muted)', fontWeight: '600' }}>Always ready, even when offline</small>
            </div>
          </div>
        </section>

        {/* JOURNEY */}
        <section style={{ padding: '80px 0' }}>
          <div style={{ marginBottom: '40px' }}>
            <span style={{ display: 'block', color: '#4f9cf9', fontWeight: '800', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '12px' }}>Journey</span>
            <h2 style={{ fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: '900', margin: 0 }}>Built from real desktop experience.</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px', marginBottom: '24px' }}>
            {journeyHighlights.map((item) => (
              <div key={item.title} style={{ padding: '32px', borderRadius: '24px', border: '1px solid var(--border)', background: 'var(--surface)' }}>
                <h3 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '12px' }}>{item.title}</h3>
                <p style={{ color: 'var(--muted)', lineHeight: '1.7', margin: 0 }}>{item.desc}</p>
              </div>
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
            <Link href="/journey/lumina-os" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '24px 32px', borderRadius: '20px', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border)', textDecoration: 'none', color: 'inherit', transition: 'all 0.3s ease' }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.borderColor = 'rgba(79,156,249,0.3)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.02)'; e.currentTarget.style.borderColor = 'var(--border)'; }}
            >
              <div>
                <strong style={{ display: 'block', fontSize: '16px', fontWeight: '800', marginBottom: '4px' }}>Lumina OS Story</strong>
                <p style={{ margin: 0, fontSize: '14px', color: 'var(--muted)' }}>See how our OS journey shaped RK AI.</p>
              </div>
              <FiArrowRight size={20} color="#4f9cf9" />
            </Link>
            <Link href="/journey/light-key" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '24px 32px', borderRadius: '20px', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border)', textDecoration: 'none', color: 'inherit', transition: 'all 0.3s ease' }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.borderColor = 'rgba(79,156,249,0.3)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.02)'; e.currentTarget.style.borderColor = 'var(--border)'; }}
            >
              <div>
                <strong style={{ display: 'block', fontSize: '16px', fontWeight: '800', marginBottom: '4px' }}>Light Key Path</strong>
                <p style={{ margin: 0, fontSize: '14px', color: 'var(--muted)' }}>How intelligent input defined our workflow.</p>
              </div>
              <FiArrowRight size={20} color="#4f9cf9" />
            </Link>
          </div>
        </section>

        {/* MEDIA */}
        <section style={{ padding: '80px 0' }}>
          <div style={{ marginBottom: '40px', maxWidth: '600px' }}>
            <span style={{ display: 'block', color: '#4f9cf9', fontWeight: '800', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '12px' }}>Media</span>
            <h2 style={{ fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: '900', marginBottom: '16px' }}>Interactive preview.</h2>
            <p style={{ color: 'var(--muted)', lineHeight: '1.7', fontSize: '18px' }}>
              Watch how RK AI Desktop acts like a creative partner, managing documents, voice workflows, and automation across apps.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '24px' }}>
            <div style={{ borderRadius: '24px', border: '1px solid var(--border)', overflow: 'hidden', background: 'var(--surface)', position: 'relative' }}>
              <video autoPlay muted loop playsInline style={{ width: '100%', height: '400px', objectFit: 'cover', display: 'block' }}>
                <source src="/rk-ai-home-images/img_2565.mov" type="video/quicktime" />
              </video>
              <div style={{ position: 'absolute', bottom: '20px', left: '20px', padding: '8px 16px', background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(10px)', borderRadius: '999px', fontSize: '13px', fontWeight: '700' }}>Demo Preview</div>
            </div>
            <div style={{ borderRadius: '24px', border: '1px solid var(--border)', background: 'var(--surface)', padding: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div>
                <span style={{ display: 'block', fontSize: '28px', fontWeight: '800', lineHeight: '1.4', marginBottom: '24px' }}>
                  “RK AI Desktop feels like a local companion, not another cloud app.”
                </span>
                <p style={{ color: 'var(--muted)', fontWeight: '600', margin: 0 }}>— Early access creator testing content workflows.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section style={{ padding: '80px 0 40px' }}>
          <div style={{ 
              display: 'flex', flexWrap: 'wrap', gap: '32px', alignItems: 'center', justifyContent: 'space-between', 
              padding: '60px', borderRadius: '32px', background: 'linear-gradient(135deg, rgba(79,156,249,0.1), rgba(155,89,245,0.05))', 
              border: '1px solid rgba(79,156,249,0.2)' 
          }}>
            <div style={{ flex: '1 1 400px' }}>
              <h2 style={{ fontSize: 'clamp(32px, 4vw, 44px)', fontWeight: '900', marginBottom: '16px' }}>Want a faster, smarter desktop?</h2>
              <p style={{ color: 'var(--muted)', lineHeight: '1.7', fontSize: '18px', margin: 0 }}>
                RK AI Desktop combines offline intelligence, system automation, and privacy-first design into one seamless experience.
              </p>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
              <Link href="/products/rk-ai-desktop" style={{ padding: '16px 32px', borderRadius: '999px', background: 'rgba(255,255,255,0.05)', color: '#fff', border: '1px solid rgba(255,255,255,0.1)', fontWeight: '800', textDecoration: 'none' }}>Back to Product</Link>
              <Link href="/subscription" style={{ padding: '16px 32px', borderRadius: '999px', background: '#4f9cf9', color: '#fff', fontWeight: '800', textDecoration: 'none', boxShadow: '0 10px 30px rgba(79,156,249,0.3)' }}>Explore Subscription</Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <ChatWidget />
    </div>
  );
}
