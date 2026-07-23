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

      {/* THE JOURNEY */}
      <section id="journey" style={{ padding: '80px 5% 120px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div className="reveal" style={{ marginBottom: '48px' }}>
            <span className="label">Ecosystem Features</span>
            <h2 className="section-title">The Complete Capability Stack.</h2>
            <p className="section-sub" style={{ margin: 0 }}>Both Pro and Elite capabilities are fully integrated into the engine.</p>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            {journeyHighlights.map((item, i) => (
              <div key={item.title} className="reveal" style={{ display: 'flex', gap: '32px', padding: '32px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '24px' }}>
                <div style={{ flexShrink: 0, width: '120px' }}>
                  <span style={{ color: 'var(--blue)', fontWeight: '800', letterSpacing: '1px', fontSize: '14px', textTransform: 'uppercase' }}>
                    {item.phase}
                  </span>
                </div>
                <div>
                  <h3 style={{ fontSize: '24px', fontWeight: '800', marginBottom: '12px' }}>{item.title}</h3>
                  <p style={{ color: 'var(--muted)', lineHeight: '1.6', fontSize: '16px' }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <ChatWidget />
    </div>
  );
}
