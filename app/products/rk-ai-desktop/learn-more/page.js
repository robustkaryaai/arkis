'use client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ChatWidget from '@/components/ChatWidget';
import Link from 'next/link';
import BackButton from '@/components/BackButton';
import { FiArrowRight, FiShield, FiCpu, FiEye, FiZap, FiTerminal, FiBox, FiDatabase, FiLock, FiCodesandbox, FiActivity } from 'react-icons/fi';
import { motion } from 'framer-motion';

const stats = [
  { label: 'Local Execution', value: '100%', icon: <FiShield size={22} /> },
  { label: 'Cloud Telemetry', value: 'Zero', icon: <FiCpu size={22} /> },
  { label: 'Latency Reduction', value: 'Instant', icon: <FiZap size={22} /> },
  { label: 'Visual Perception', value: 'Live', icon: <FiEye size={22} /> },
];

const architectureSteps = [
  { 
    phase: 'Phase 1: Interception', 
    title: 'Native Hooking & Event Parsing',
    desc: 'RK AI Desktop securely hooks into your operating system\'s accessibility APIs. It doesn\'t just read text; it parses the active UI tree, understanding buttons, input fields, and window contexts in real-time, converting them into actionable vectors.',
    icon: <FiActivity size={24} color="var(--blue)" />
  },
  { 
    phase: 'Phase 2: Inference', 
    title: 'Dynamic Resource Allocation (DRA)',
    desc: 'When an intent is detected, DRA instantly spins up the specialized small language model (SLM) required for the task. Need vision? The vision transformer loads into VRAM. Need text generation? The instruct model takes over. All happening in milliseconds.',
    icon: <FiCpu size={24} color="var(--blue)" />
  },
  { 
    phase: 'Phase 3: Execution', 
    title: 'Autonomous System Interaction',
    desc: 'The model outputs synthetic mouse movements, keyboard strokes, and API calls. It moves your cursor exactly as a human would, validating its actions through continuous visual feedback loops, ensuring 100% accuracy.',
    icon: <FiTerminal size={24} color="var(--blue)" />
  },
];

const journeyHighlights = [
  { title: 'The Malus Engine', desc: 'We began by engineering Malus: a highly optimized, local-first runtime capable of running billions of parameters securely without internet access. This formed our core foundation.', phase: 'Genesis' },
  { title: 'Snapvault Orb', desc: 'We needed a persistent interface. The Orb was born—a sleek, floating widget that acts as your omnipresent assistant, ready to assist visually or interactively at a moment\'s notice.', phase: 'Evolution' },
  { title: 'Autonomous Overlays', desc: 'By mapping screen coordinates to intent, we enabled the AI to autonomously click, type, and navigate across any software seamlessly, breaking the barrier between chat and action.', phase: 'Revolution' },
  { title: 'Multi-modal Ecosystem', desc: 'Today, RK AI Desktop combines offline voice commands, text chat, visual screen parsing, and system automation into one continuous, fluid, intelligent workflow.', phase: 'Current' },
];

export default function RKDesktopLearnMore() {
  return (
    <div style={{ background: 'var(--void)', color: '#fff', minHeight: '100vh', overflowX: 'hidden', position: 'relative' }}>
      <div
        style={{
          position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none',
          background: 'radial-gradient(circle at 20% 30%, rgba(79, 156, 249, 0.15) 0%, transparent 55%), radial-gradient(circle at 75% 70%, rgba(99,102,241,0.1) 0%, transparent 50%)',
        }}
      />
      <div className="noise" aria-hidden />

      <BackButton href="/products/rk-ai-desktop" label="RK AI Desktop" />
      <Navbar />

      {/* HERO */}
      <section className="hero" style={{ textAlign: 'left', alignItems: 'flex-start', paddingTop: '160px', paddingBottom: '80px', position: 'relative', zIndex: 10 }}>
        <div style={{ maxWidth: '1100px', width: '100%', margin: '0 auto', padding: '0 5%' }}>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="hero-eyebrow float-anim" style={{ marginBottom: '24px', color: '#fff', border: '1px solid rgba(79,156,249,0.3)' }}>
              <span className="pulse" style={{ background: 'var(--blue)', boxShadow: '0 0 10px var(--blue)' }} /> Deep Dive: Architecture
            </div>
            <h1 style={{ maxWidth: '900px', fontSize: 'clamp(48px, 8vw, 80px)', lineHeight: '1.05', letterSpacing: '-2px', fontWeight: '900' }}>
              The anatomy of <span className="flow-text flow-text--blue" style={{ display: 'inline-block' }}>native intelligence.</span>
            </h1>
            <p style={{ maxWidth: '700px', margin: '24px 0 40px', fontSize: '20px', color: 'var(--subtext)', lineHeight: '1.7' }}>
              We bypassed traditional cloud constraints to build an ultra-fast, completely localized AI execution engine. Explore the technical decisions that make RK AI Desktop the most powerful tool on your machine.
            </p>
            <div className="hero-btns" style={{ justifyContent: 'flex-start' }}>
              <Link href="/products/rk-ai-desktop" className="btn-secondary">
                <FiArrowRight style={{ transform: 'rotate(180deg)' }} /> Back to Product
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* STATS */}
      <section style={{ padding: '40px 5%', position: 'relative', zIndex: 10 }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div className="feature-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}>
            {stats.map((item, i) => (
              <div key={item.label} className={`feature-card reveal reveal-delay-${i + 1}`} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div className="feature-icon" style={{ background: 'rgba(79,156,249,0.1)', color: 'var(--blue)' }}>{item.icon}</div>
                <strong style={{ fontSize: '36px', fontWeight: '900', letterSpacing: '-1px', lineHeight: '1' }}>{item.value}</strong>
                <p style={{ fontWeight: '700', fontSize: '14px', color: 'var(--subtext)', margin: 0, textTransform: 'uppercase', letterSpacing: '1px' }}>{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* THE ARCHITECTURE */}
      <section style={{ padding: '120px 5%', position: 'relative', zIndex: 10 }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div className="reveal" style={{ marginBottom: '64px' }}>
            <span className="label">System Pipeline</span>
            <h2 style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: '900', letterSpacing: '-1px', marginBottom: '16px' }}>How it actually works.</h2>
            <p style={{ fontSize: '18px', color: 'var(--subtext)', maxWidth: '600px', lineHeight: '1.7' }}>
              RK AI doesn't just read your screen like a screenshot. It intercepts UI layout graphs directly from the OS, enabling deterministic interaction.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '24px' }}>
            {architectureSteps.map((step, i) => (
              <div key={i} className={`reveal reveal-delay-${i + 1}`} style={{
                background: 'rgba(255,255,255,0.02)', border: '1px solid var(--glass-border)',
                borderRadius: '24px', padding: '40px', backdropFilter: 'blur(20px)',
                display: 'grid', gridTemplateColumns: '80px 1fr', gap: '32px', alignItems: 'center'
              }}>
                <div style={{
                  width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(79,156,249,0.1)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(79,156,249,0.3)',
                  boxShadow: '0 0 30px rgba(79,156,249,0.1)'
                }}>
                  {step.icon}
                </div>
                <div>
                  <div style={{ fontSize: '12px', fontWeight: '800', color: 'var(--blue)', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '8px' }}>
                    {step.phase}
                  </div>
                  <h3 style={{ fontSize: '24px', fontWeight: '800', marginBottom: '12px' }}>{step.title}</h3>
                  <p style={{ color: 'var(--subtext)', fontSize: '16px', lineHeight: '1.7', margin: 0 }}>
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* THE JOURNEY / TIMELINE */}
      <section id="journey" style={{ padding: '120px 5%', position: 'relative', zIndex: 10 }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div className="reveal" style={{ textAlign: 'center', marginBottom: '80px' }}>
            <span className="label">Evolution</span>
            <h2 style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: '900', letterSpacing: '-1px' }}>The Capability Stack.</h2>
            <p style={{ margin: '16px auto 0', textAlign: 'center', color: 'var(--subtext)', fontSize: '18px', maxWidth: '600px' }}>
              How we built the ultimate intelligent layer for your OS, phase by phase.
            </p>
          </div>

          <div style={{ position: 'relative', maxWidth: '800px', margin: '0 auto' }}>
            {/* Center line */}
            <div style={{
              position: 'absolute', top: 0, bottom: 0, left: '32px',
              width: '2px', background: 'linear-gradient(to bottom, transparent, var(--blue), transparent)',
              borderRadius: '2px', zIndex: 0
            }} />

            <div style={{ display: 'flex', flexDirection: 'column', gap: '64px' }}>
              {journeyHighlights.map((item, index) => (
                <div key={item.title} className={`reveal reveal-delay-${(index % 3) + 1}`} style={{ display: 'flex', position: 'relative', zIndex: 1, paddingLeft: '80px' }}>
                  {/* Connector dot */}
                  <div style={{
                    position: 'absolute', top: '24px', left: '24px',
                    width: '18px', height: '18px', borderRadius: '50%',
                    background: 'var(--void)', border: '4px solid var(--blue)',
                    boxShadow: '0 0 16px rgba(79, 156, 249, 0.5)', zIndex: 2
                  }} />

                  <div style={{
                    background: 'rgba(255,255,255,0.02)', border: '1px solid var(--glass-border)',
                    borderRadius: '24px', padding: '32px', backdropFilter: 'blur(20px)', width: '100%'
                  }}>
                    <span style={{
                      display: 'inline-block', padding: '6px 14px', borderRadius: '8px',
                      background: 'rgba(79,156,249,0.1)', color: 'var(--blue)', border: '1px solid rgba(79,156,249,0.2)',
                      fontSize: '11px', fontWeight: '800', letterSpacing: '1.5px',
                      textTransform: 'uppercase', marginBottom: '16px'
                    }}>
                      {item.phase}
                    </span>
                    <h3 style={{ fontSize: '22px', fontWeight: '800', marginBottom: '12px' }}>{item.title}</h3>
                    <p style={{ color: 'var(--subtext)', lineHeight: '1.7', margin: 0, fontSize: '15px' }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CODE EXAMPLE SECTION */}
      <section style={{ padding: '80px 5%', position: 'relative', zIndex: 10 }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div className="reveal" style={{ 
            background: 'rgba(10,10,15,0.8)', border: '1px solid rgba(255,255,255,0.1)', 
            borderRadius: '24px', overflow: 'hidden', display: 'flex', flexWrap: 'wrap' 
          }}>
            <div style={{ flex: '1 1 400px', padding: '60px 40px' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--blue)', fontWeight: '800', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '16px' }}>
                <FiCodesandbox size={16} /> Developer First
              </div>
              <h2 style={{ fontSize: '32px', fontWeight: '900', marginBottom: '20px', letterSpacing: '-1px' }}>Extendable by nature.</h2>
              <p style={{ color: 'var(--subtext)', fontSize: '16px', lineHeight: '1.7', marginBottom: '32px' }}>
                RK AI Desktop isn't just a black box. You can write custom TypeScript macros to define complex multi-step workflows. We expose our entire UI intent engine via a simple SDK.
              </p>
              <Link href="/academy" className="btn-primary" style={{ padding: '14px 28px' }}>View Documentation</Link>
            </div>
            <div style={{ flex: '1 1 500px', background: '#0d1117', padding: '40px', borderLeft: '1px solid rgba(255,255,255,0.05)' }}>
              <pre style={{ margin: 0, fontFamily: 'monospace', fontSize: '14px', lineHeight: '1.6', color: '#c9d1d9', overflowX: 'auto' }}>
                <code style={{ color: '#ff7b72' }}>import</code> {'{ RKDesktop }'} <code style={{ color: '#ff7b72' }}>from</code> <code style={{ color: '#a5d6ff' }}>'@rexycore/sdk'</code>;<br/><br/>
                <code style={{ color: '#ff7b72' }}>const</code> ai = <code style={{ color: '#ff7b72' }}>new</code> RKDesktop();<br/><br/>
                <code style={{ color: '#8b949e' }}>// Define an autonomous workflow</code><br/>
                ai.<code style={{ color: '#d2a8ff' }}>onCommand</code>(<code style={{ color: '#a5d6ff' }}>'prepare meeting'</code>, <code style={{ color: '#ff7b72' }}>async</code> () ={'>'} {'{'}<br/>
                &nbsp;&nbsp;<code style={{ color: '#ff7b72' }}>await</code> ai.app.<code style={{ color: '#d2a8ff' }}>open</code>(<code style={{ color: '#a5d6ff' }}>'Slack'</code>);<br/>
                &nbsp;&nbsp;<code style={{ color: '#ff7b72' }}>await</code> ai.ui.<code style={{ color: '#d2a8ff' }}>click</code>(<code style={{ color: '#a5d6ff' }}>'#status-button'</code>);<br/>
                &nbsp;&nbsp;<code style={{ color: '#ff7b72' }}>await</code> ai.ui.<code style={{ color: '#d2a8ff' }}>type</code>(<code style={{ color: '#a5d6ff' }}>'In a meeting 🔴'</code>);<br/>
                &nbsp;&nbsp;<br/>
                &nbsp;&nbsp;<code style={{ color: '#ff7b72' }}>await</code> ai.app.<code style={{ color: '#d2a8ff' }}>open</code>(<code style={{ color: '#a5d6ff' }}>'Zoom'</code>);<br/>
                &nbsp;&nbsp;<code style={{ color: '#ff7b72' }}>await</code> ai.ui.<code style={{ color: '#d2a8ff' }}>clickText</code>(<code style={{ color: '#a5d6ff' }}>'Join Meeting'</code>);<br/>
                {'}'});
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '80px 5% 120px', position: 'relative', zIndex: 10 }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div className="reveal" style={{ display: 'flex', flexWrap: 'wrap', gap: '32px', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(79,156,249,0.05)', padding: '60px', borderRadius: '32px', border: '1px solid rgba(79,156,249,0.2)' }}>
            <div style={{ flex: '1 1 400px' }}>
              <h2 style={{ fontSize: 'clamp(32px, 4vw, 40px)', fontWeight: '900', marginBottom: '16px', letterSpacing: '-1px' }}>Ready to upgrade your system?</h2>
              <p style={{ color: 'var(--subtext)', lineHeight: '1.7', margin: 0, fontSize: '18px' }}>
                Offline intelligence, system automation, and privacy-first design in one seamless experience.
              </p>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
              <Link href="/products/rk-ai-desktop" className="btn-secondary" style={{ padding: '16px 32px' }}>Back to Product</Link>
              <Link href="/subscription" className="btn-primary" style={{ padding: '16px 32px' }}>Explore Subscription</Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <ChatWidget />
    </div>
  );
}
