'use client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ChatWidget from '@/components/ChatWidget';
import Link from 'next/link';
import { FiArrowRight, FiShield, FiCpu, FiEye, FiZap, FiTerminal, FiBox, FiDatabase } from 'react-icons/fi';
import { motion } from 'framer-motion';

const stats = [
  { label: 'Local Execution', value: '100%', icon: <FiShield size={22} /> },
  { label: 'Cloud Telemetry', value: 'Zero', icon: <FiCpu size={22} /> },
  { label: 'Latency Reduction', value: 'Instant', icon: <FiZap size={22} /> },
  { label: 'Visual Perception', value: 'Live & Secure', icon: <FiEye size={22} /> },
];

const features = [
  { title: 'Intelligent Intent Routing', desc: 'Seamlessly understands your requests and routes them to the optimal on-device engine for maximum speed and accuracy.', icon: <FiTerminal size={22} /> },
  { title: 'Persistent Contextual Memory', desc: 'Remembers your previous interactions and system context, providing personalized and continuous intelligence without uploading data.', icon: <FiDatabase size={22} /> },
  { title: 'Intelligent Document Understanding', desc: 'Instantly reads and analyzes complex local documents (PDFs, PPTXs, DOCX) directly on your machine.', icon: <FiBox size={22} /> },
  { title: 'Seamless OS Integration', desc: 'Deeply hooks into Windows, macOS, and Linux to automate tasks across native applications natively.', icon: <FiCpu size={22} /> },
];

const journeyHighlights = [
  { title: 'Private On-Device Engine', desc: 'We engineered a highly optimized local runtime that dynamically allocates memory and compute, delivering instantaneous responses without internet reliance.', phase: 'Core' },
  { title: 'Snapvault Orb', desc: 'An ever-present, sleek floating intelligence module that sits on your desktop, ready to assist visually or interactively at a moments notice.', phase: 'Elite' },
  { title: 'Autonomous Overlays', desc: 'The system visually maps your screen, understanding UI elements to autonomously click, type, and navigate across any software seamlessly.', phase: 'Elite' },
  { title: 'Multi-modal Workflows', desc: 'Combine offline voice commands, text chat, visual screen parsing, and system automation into one continuous fluid intelligent workflow.', phase: 'Pro + Elite' },
];

const charts = [
  { label: 'Task completion speed', detail: 'Instant on-device execution', progress: '98%', color: 'var(--blue)' },
  { label: 'Privacy compliance', detail: 'Zero data uploaded to cloud', progress: '100%', color: '#22c55e' },
  { label: 'Uptime and availability', detail: 'Always ready, offline capable', progress: '100%', color: 'var(--violet)' },
];

export default function RKDesktopLearnMore() {
  return (
    <div style={{ background: 'var(--bg)', color: 'var(--text)', minHeight: '100vh', overflowX: 'hidden' }}>
      <Navbar />

      {/* HERO */}
      <section className="hero" style={{ textAlign: 'left', alignItems: 'flex-start' }}>
        <div style={{ maxWidth: '1100px', width: '100%', margin: '0 auto' }}>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="badge float-anim" style={{ marginBottom: '24px' }}>
              <span className="dot" style={{ background: 'var(--blue)' }} /> Architecture & Design
            </div>
            <h1 style={{ maxWidth: '800px' }}>
              The most advanced <span className="grad">native intelligence</span> ever built.
            </h1>
            <p style={{ maxWidth: '600px', margin: '0 0 36px', textAlign: 'left' }}>
              Explore the technology behind RK AI Desktop. We bypassed traditional cloud computing to build an ultra-fast, entirely localized AI execution engine that runs natively on your hardware.
            </p>
            <div className="hero-btns" style={{ justifyContent: 'flex-start' }}>
              <Link href="/products/rk-ai-desktop" className="btn-secondary">
                <FiArrowRight style={{ transform: 'rotate(180deg)' }} /> Back to Product
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* STATS GRID */}
      <section style={{ padding: '80px 5%' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div className="feature-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}>
            {stats.map((item, i) => (
              <div key={item.label} className={`feature-card reveal reveal-delay-${i + 1}`} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div className="feature-icon">{item.icon}</div>
                <strong style={{ fontSize: '32px', fontWeight: '900', letterSpacing: '-1px', lineHeight: '1' }}>{item.value}</strong>
                <p style={{ fontWeight: '700', fontSize: '14px', color: 'var(--muted)', margin: 0 }}>{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section style={{ padding: '80px 5%' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div className="reveal" style={{ marginBottom: '48px' }}>
            <span className="label">Core Engine</span>
            <h2 className="section-title">How we achieved localized intelligence.</h2>
          </div>
          <div className="feature-grid">
            {features.map((f, i) => (
              <div key={f.title} className={`feature-card reveal reveal-delay-${i + 1}`}>
                <div className="feature-icon">{f.icon}</div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* THE JOURNEY / TIMELINE */}
      <section id="journey" style={{ padding: '100px 5%' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div className="reveal" style={{ textAlign: 'center', marginBottom: '72px' }}>
            <span className="label">Evolution</span>
            <h2 className="section-title">The Capability Stack.</h2>
            <p className="section-sub" style={{ margin: '12px auto 0', textAlign: 'center' }}>
              How we built the ultimate intelligent layer for your OS, phase by phase.
            </p>
          </div>

          {/* Timeline */}
          <div style={{ position: 'relative' }}>
            {/* Center line */}
            <div style={{
              position: 'absolute', top: 0, bottom: 0, left: '50%', transform: 'translateX(-50%)',
              width: '2px', background: 'linear-gradient(to bottom, transparent, var(--blue), var(--violet), transparent)',
              borderRadius: '2px', zIndex: 0
            }} />

            <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
              {journeyHighlights.map((item, index) => {
                const isLeft = index % 2 === 0;
                return (
                  <div key={item.title} style={{ display: 'flex', justifyContent: isLeft ? 'flex-start' : 'flex-end', position: 'relative', zIndex: 1 }}>
                    {/* Connector dot */}
                    <div style={{
                      position: 'absolute', top: '50%', left: '50%',
                      transform: 'translate(-50%, -50%)',
                      width: '16px', height: '16px', borderRadius: '50%',
                      background: 'var(--bg)', border: '4px solid var(--blue)',
                      boxShadow: '0 0 16px rgba(79, 156, 249, 0.5)', zIndex: 2
                    }} />

                    <div className={`feature-card reveal ${isLeft ? 'reveal-delay-1' : 'reveal-delay-2'}`} style={{
                      width: 'calc(50% - 48px)',
                      position: 'relative',
                      borderLeft: isLeft ? '3px solid var(--blue)' : undefined,
                      borderRight: !isLeft ? '3px solid var(--violet)' : undefined,
                    }}>
                      <span style={{
                        display: 'inline-block', padding: '4px 12px', borderRadius: '6px',
                        background: 'rgba(79,156,249,0.1)', color: 'var(--blue)',
                        fontSize: '11px', fontWeight: '800', letterSpacing: '1.5px',
                        textTransform: 'uppercase', marginBottom: '14px'
                      }}>
                        {item.phase}
                      </span>
                      <h3 style={{ fontSize: '18px', fontWeight: '800', marginBottom: '10px' }}>{item.title}</h3>
                      <p style={{ color: 'var(--muted)', lineHeight: '1.7', margin: 0, fontSize: '14px' }}>{item.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Journey Links */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px', marginTop: '64px' }}>
            {[
              { href: '/journey/lumina-os', title: 'Lumina OS Story', sub: 'See how our OS journey shaped RK AI.' },
              { href: '/journey/light-key', title: 'Light Key Path', sub: 'How intelligent input defined our workflow.' },
            ].map(link => (
              <Link key={link.href} href={link.href} className="feature-card reveal" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', textDecoration: 'none', color: 'inherit' }}>
                <div>
                  <strong style={{ display: 'block', fontSize: '16px', fontWeight: '800', marginBottom: '6px' }}>{link.title}</strong>
                  <p style={{ margin: 0, fontSize: '13px' }}>{link.sub}</p>
                </div>
                <FiArrowRight size={20} color="var(--blue)" style={{ flexShrink: 0 }} />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* PERFORMANCE CHARTS */}
      <section style={{ padding: '80px 5%' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '60px', alignItems: 'center' }}>
          <div className="reveal">
            <span className="label">Performance</span>
            <h2 className="section-title">Designed to accelerate your workflow.</h2>
            <p className="section-sub" style={{ marginTop: '12px' }}>
              Keeping analytics and automation local means actions happen instantly,
              files stay private, and AI works directly with your screen context.
            </p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {charts.map((c, i) => (
              <div key={i} className={`feature-card reveal reveal-delay-${i + 1}`}>
                <span style={{ display: 'block', fontWeight: '800', marginBottom: '14px', fontSize: '14px' }}>{c.label}</span>
                <div style={{ width: '100%', height: '10px', background: 'rgba(255,255,255,0.06)', borderRadius: '999px', overflow: 'hidden', marginBottom: '10px' }}>
                  <motion.div
                    initial={{ width: 0 }} whileInView={{ width: c.progress }} viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: 0.2 }}
                    style={{ height: '100%', background: c.color, borderRadius: '999px' }}
                  />
                </div>
                <small style={{ color: 'var(--muted)', fontSize: '12px', fontWeight: '600' }}>{c.detail}</small>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MEDIA */}
      <section style={{ padding: '80px 5%' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div className="reveal" style={{ textAlign: 'center', marginBottom: '48px' }}>
            <span className="label">Media</span>
            <h2 className="section-title">Interactive preview.</h2>
            <p className="section-sub" style={{ margin: '12px auto 0', textAlign: 'center' }}>
              Watch how RK AI Desktop manages documents, voice workflows, and automation across apps.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '24px' }}>
            <div className="feature-card reveal reveal-delay-1" style={{ padding: 0, overflow: 'hidden', position: 'relative' }}>
              <video autoPlay muted loop playsInline style={{ width: '100%', height: '360px', objectFit: 'cover', display: 'block' }}>
                <source src="/rk-ai-home-images/img_2565.mov" type="video/quicktime" />
              </video>
              <div style={{ position: 'absolute', bottom: '16px', left: '16px', padding: '6px 14px', background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(10px)', borderRadius: '999px', fontSize: '12px', fontWeight: '700', letterSpacing: '1px' }}>DEMO PREVIEW</div>
            </div>
            <div className="feature-card reveal reveal-delay-2" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div>
                <blockquote style={{ fontSize: '18px', fontWeight: '700', lineHeight: '1.6', marginBottom: '20px', fontStyle: 'italic', color: 'var(--text)' }}>
                  "RK AI Desktop feels like a local companion, not another cloud app."
                </blockquote>
                <p style={{ color: 'var(--blue)', fontWeight: '800', margin: 0, fontSize: '13px', textTransform: 'uppercase', letterSpacing: '1px' }}>— Early Access Creator</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '80px 5%' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div className="feature-card reveal" style={{ display: 'flex', flexWrap: 'wrap', gap: '32px', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ flex: '1 1 300px' }}>
              <h2 style={{ fontSize: 'clamp(24px, 4vw, 36px)', fontWeight: '900', marginBottom: '12px' }}>Want a faster, smarter desktop?</h2>
              <p style={{ color: 'var(--muted)', lineHeight: '1.7', margin: 0, fontSize: '15px' }}>
                Offline intelligence, system automation, and privacy-first design in one seamless experience.
              </p>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px' }}>
              <Link href="/products/rk-ai-desktop" className="btn-secondary">Back to Product</Link>
              <Link href="/subscription" className="btn-primary">Explore Subscription</Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <ChatWidget />
    </div>
  );
}
