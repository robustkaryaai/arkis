'use client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ChatWidget from '@/components/ChatWidget';
import BackButton from '@/components/BackButton';
import Link from 'next/link';
import Image from 'next/image';
import { FiArrowRight, FiShield, FiCpu, FiEye, FiZap, FiTerminal, FiBox, FiCheckCircle, FiLock, FiLayers } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { StarField, Card3D, staggerContainer, fadeUp, textVariant } from '@/components/SpaceUI';

const AC = '#f8fafc';
const ACB = '#cfe8ff';

const stats = [
  { label: 'Cloud Telemetry Sent', value: '0 bytes', sub: 'Zero. Always.' },
  { label: 'Kernel Integration', value: 'Level 3', sub: 'Deep system control' },
  { label: 'Boot to Desktop', value: '4.2s', sub: 'Cold boot, SSD' },
  { label: 'AI Response Avg', value: '< 80ms', sub: 'On-device, always' },
];

const features = [
  { icon: <FiLock size={22} />, title: 'Zero Telemetry by Design', desc: 'Every component in Lumina OS — from the kernel scheduler to the desktop compositor — was engineered to never phone home. Telemetry is not opt-out. It does not exist.' },
  { icon: <FiCpu size={22} />, title: 'AI-Aware Kernel Scheduler', desc: 'The OS kernel itself is context-aware. It knows when you are in a focus session vs a creative workflow and dynamically allocates resources to the AI subsystems accordingly.' },
  { icon: <FiBox size={22} />, title: 'Custom Wayland Compositor', desc: 'We built our own display server from scratch on top of Wayland. This gives us direct frame-level control for buttery-smooth animations and ultra-low input latency.' },
  { icon: <FiEye size={22} />, title: 'Ambient AI Intelligence', desc: 'The AI layer observes your open apps, active tasks, and screen context to offer help proactively — without you ever needing to open a chat window.' },
  { icon: <FiTerminal size={22} />, title: 'CLI-First Compatibility', desc: 'For power users, Lumina exposes a rich local API and POSIX-compatible shell. You can automate anything about your environment using native scripting.' },
  { icon: <FiLayers size={22} />, title: 'RexyCore Ecosystem Sync', desc: 'First-party integration with RK AI Desktop, Neytreya, and RK AI Home. Your Lumina OS device is a hub for your entire intelligent ecosystem.' },
];

const timeline = [
  { phase: 'KERNEL', year: 'Month 1–3', title: 'Building the Foundation', desc: 'Forked and stripped a minimal Linux kernel, removing all non-essential modules. Established the base Wayland compositor and confirmed hardware-accelerated rendering on target devices. First boot achieved in Month 2.' },
  { phase: 'AI SCHEDULER', year: 'Month 4–6', title: 'Weaving Intelligence into the OS', desc: 'Integrated our Spark Engine directly into the kernel\'s process scheduler. The AI subsystem can now preemptively allocate CPU/GPU cycles based on user context, reducing perceived latency by 60%.' },
  { phase: 'DESKTOP ENV', year: 'Month 7–10', title: 'Designing the Interface', desc: 'Built the custom desktop environment: taskbar, app launcher, notification daemon, and window management system. Focused on a zero-distraction philosophy — every UI element earns its place.' },
  { phase: 'ALPHA', year: 'Month 11–14', title: 'Closed Alpha Launch', desc: 'Deployed to 47 internal testers across India. Identified and resolved 214 kernel panics, 89 display server race conditions, and 12 critical memory leak hotspots. Zero-telemetry architecture fully validated.' },
];

const charts = [
  { label: 'Privacy compliance (zero data upload)', progress: 100, color: ACB },
  { label: 'Offline AI capability vs leading competitors', progress: 94, color: AC },
  { label: 'Boot speed vs stock Ubuntu 24.04', progress: 78, color: ACB },
  { label: 'User-perceived response latency improvement', progress: 88, color: AC },
];

export default function LuminaOSLearnMore() {
  return (
    <div style={{ background: '#010104', color: '#fff', minHeight: '100vh', overflowX: 'hidden', position: 'relative' }}>
      
      <StarField />
      <div className="noise" aria-hidden />

      <BackButton href="/products/lumina-os" label="Lumina OS" />
      <Navbar />

      {/* HERO */}
      <section style={{ minHeight: '90vh', display: 'flex', alignItems: 'center', padding: '160px 5% 80px', position: 'relative', zIndex: 10 }}>
        <div style={{ maxWidth: '1100px', width: '100%', margin: '0 auto' }}>
          <motion.div variants={staggerContainer(0.12, 0.1)} initial="hidden" whileInView="show" viewport={{ once: false, amount: 0.15 }}>
            <motion.div variants={fadeUp} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 16px', borderRadius: 99, background: 'rgba(207,232,255,0.08)', border: '1px solid rgba(207,232,255,0.2)', color: ACB, fontSize: 12, fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 28 }}>
              <motion.span animate={{ opacity: [1, 0.3, 1] }} transition={{ repeat: Infinity, duration: 2 }} style={{ width: 8, height: 8, borderRadius: '50%', background: AC, boxShadow: `0 0 8px ${AC}` }} /> Alpha Engineering Deep Dive
            </motion.div>
            <motion.h1 variants={textVariant(0.1)} style={{ fontSize: 'clamp(48px, 7vw, 88px)', fontWeight: 900, lineHeight: 1.05, letterSpacing: '-0.04em', marginBottom: 28, maxWidth: 900 }}>
              The OS that thinks<br />
              <span style={{ color: ACB }}>before you ask.</span>
            </motion.h1>
            <motion.p variants={fadeUp} style={{ maxWidth: 640, fontSize: 20, color: 'rgba(255,255,255,0.6)', lineHeight: 1.7, marginBottom: 44 }}>
              Lumina OS is not Linux with an AI plugin installed. It is a ground-up reimagination of what an operating system should be when intelligence is a first-class citizen of the kernel itself.
            </motion.p>
            <motion.div variants={fadeUp} style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              <Link href="/products/lumina-os" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 28px', borderRadius: 99, background: `linear-gradient(90deg, #fff, ${ACB}, #fff)`, color: '#000', fontWeight: 800, fontSize: 15, textDecoration: 'none' }}>
                Explore Lumina OS <FiArrowRight />
              </Link>
              <a href="#journey" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 28px', borderRadius: 99, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontWeight: 700, fontSize: 15, textDecoration: 'none' }}>
                View the Journey
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* STATS */}
      <section style={{ padding: '80px 5%', position: 'relative', zIndex: 10 }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <motion.div variants={staggerContainer(0.1, 0.2)} initial="hidden" whileInView="show" viewport={{ once: false, amount: 0.15 }} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 24 }}>
            {stats.map((s, i) => (
              <motion.div key={s.label} variants={fadeUp}>
                <Card3D style={{ padding: '32px 28px', height: '100%' }} orbColor="rgba(207,232,255,0.2)">
                  <div style={{ fontSize: 44, fontWeight: 900, letterSpacing: '-2px', color: AC, marginBottom: 8 }}>{s.value}</div>
                  <div style={{ fontWeight: 700, fontSize: 14, color: '#fff', marginBottom: 4 }}>{s.label}</div>
                  <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>{s.sub}</div>
                </Card3D>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CORE FEATURES */}
      <section style={{ padding: '80px 5%', position: 'relative', zIndex: 10 }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <motion.div variants={staggerContainer(0.1, 0.2)} initial="hidden" whileInView="show" viewport={{ once: false, amount: 0.15 }} style={{ marginBottom: 56 }}>
            <motion.div variants={fadeUp} style={{ display: 'inline-block', padding: '5px 14px', borderRadius: 8, background: 'rgba(207,232,255,0.08)', color: ACB, fontSize: 11, fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 16 }}>Architecture</motion.div>
            <motion.h2 variants={textVariant(0)} style={{ fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 900, letterSpacing: '-0.03em', lineHeight: 1.1 }}>Engineering from first principles.</motion.h2>
          </motion.div>
          <motion.div variants={staggerContainer(0.05, 0.1)} initial="hidden" whileInView="show" viewport={{ once: false, amount: 0.15 }} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 20 }}>
            {features.map((f, i) => (
              <motion.div key={f.title} variants={fadeUp}>
                <Card3D style={{ padding: '32px 28px', height: '100%' }} orbColor="rgba(207,232,255,0.2)">
                  <div style={{ width: 48, height: 48, borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(207,232,255,0.08)', color: ACB, marginBottom: 20 }}>{f.icon}</div>
                  <h3 style={{ fontSize: 18, fontWeight: 800, marginBottom: 10, color: '#fff' }}>{f.title}</h3>
                  <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.55)', lineHeight: 1.7, margin: 0 }}>{f.desc}</p>
                </Card3D>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* JOURNEY TIMELINE */}
      <section id="journey" style={{ padding: '100px 5%', position: 'relative', zIndex: 10 }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <motion.div variants={staggerContainer(0.1, 0.2)} initial="hidden" whileInView="show" viewport={{ once: false, amount: 0.15 }} style={{ textAlign: 'center', marginBottom: 80 }}>
            <motion.div variants={fadeUp} style={{ display: 'inline-block', padding: '5px 14px', borderRadius: 8, background: 'rgba(207,232,255,0.08)', color: ACB, fontSize: 11, fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 16 }}>The Build Story</motion.div>
            <motion.h2 variants={textVariant(0)} style={{ fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 900, letterSpacing: '-0.03em' }}>14 months of engineering.</motion.h2>
            <motion.p variants={fadeUp} style={{ color: 'rgba(255,255,255,0.5)', marginTop: 12, fontSize: 17 }}>How we went from a blank kernel to a living, breathing AI OS.</motion.p>
          </motion.div>
          <div style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', top: 0, bottom: 0, left: '50%', transform: 'translateX(-50%)', width: 2, background: `linear-gradient(90deg, transparent, ${ACB}, ${AC}, transparent)` }} />
            <motion.div variants={staggerContainer(0.1, 0.2)} initial="hidden" whileInView="show" viewport={{ once: false, amount: 0.15 }} style={{ display: 'flex', flexDirection: 'column', gap: 56 }}>
              {timeline.map((item, i) => {
                const isLeft = i % 2 === 0;
                return (
                  <motion.div key={item.title} variants={fadeUp} style={{ display: 'flex', justifyContent: isLeft ? 'flex-start' : 'flex-end', position: 'relative' }}>
                    <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 18, height: 18, borderRadius: '50%', background: '#000', border: `4px solid ${ACB}`, boxShadow: `0 0 20px ${ACB}66`, zIndex: 2 }} />
                    <div style={{ width: 'calc(50% - 52px)' }}>
                      <Card3D style={{ padding: '28px 28px', borderLeft: isLeft ? `3px solid ${ACB}` : undefined, borderRight: !isLeft ? `3px solid ${AC}` : undefined }} orbColor="rgba(207,232,255,0.2)">
                        <div style={{ display: 'flex', gap: 10, marginBottom: 14, alignItems: 'center' }}>
                          <span style={{ padding: '3px 10px', borderRadius: 6, background: 'rgba(207,232,255,0.1)', color: ACB, fontSize: 10, fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase' }}>{item.phase}</span>
                          <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)', fontWeight: 600 }}>{item.year}</span>
                        </div>
                        <h3 style={{ fontSize: 18, fontWeight: 800, marginBottom: 10, color: '#fff' }}>{item.title}</h3>
                        <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, margin: 0 }}>{item.desc}</p>
                      </Card3D>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </section>

      {/* PERFORMANCE CHARTS */}
      <section style={{ padding: '100px 5%', position: 'relative', zIndex: 10 }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))', gap: 80, alignItems: 'center' }}>
          <motion.div variants={staggerContainer(0.1, 0.2)} initial="hidden" whileInView="show" viewport={{ once: false, amount: 0.15 }}>
            <motion.div variants={fadeUp} style={{ display: 'inline-block', padding: '5px 14px', borderRadius: 8, background: 'rgba(207,232,255,0.08)', color: ACB, fontSize: 11, fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 16 }}>Performance</motion.div>
            <motion.h2 variants={textVariant(0)} style={{ fontSize: 'clamp(28px, 3.5vw, 44px)', fontWeight: 900, letterSpacing: '-0.03em', marginBottom: 16 }}>Numbers that matter.</motion.h2>
            <motion.p variants={fadeUp} style={{ color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, fontSize: 15 }}>
              Lumina OS is a long-term project in development. This page describes its direction, not comparisons or unannounced capabilities.
            </motion.p>
          </motion.div>
          <motion.div variants={staggerContainer(0.1, 0.3)} initial="hidden" whileInView="show" viewport={{ once: false, amount: 0.15 }} style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
            {charts.map((c, i) => (
              <motion.div key={c.label} variants={fadeUp}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: 'rgba(255,255,255,0.8)' }}>{c.label}</span>
                  <span style={{ fontSize: 13, fontWeight: 900, color: c.color }}>{c.progress}%</span>
                </div>
                <div style={{ height: 8, background: 'rgba(255,255,255,0.06)', borderRadius: 99, overflow: 'hidden' }}>
                  <motion.div initial={{ width: 0 }} whileInView={{ width: `${c.progress}%` }} viewport={{ once: false, amount: 0.15 }} transition={{ duration: 1.4, delay: i * 0.1, ease: 'easeOut' }}
                    style={{ height: '100%', background: `linear-gradient(90deg, ${c.color}99, ${c.color}, ${c.color}99)`, borderRadius: 99 }} />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* QUOTE + IMAGE */}
      <section style={{ padding: '80px 5%', position: 'relative', zIndex: 10 }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: 32 }}>
          <motion.div variants={staggerContainer(0.1, 0.2)} initial="hidden" whileInView="show" viewport={{ once: false, amount: 0.15 }}>
            <motion.div variants={fadeUp}>
              <Card3D style={{ padding: '48px 40px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }} orbColor="rgba(207,232,255,0.2)">
                <div style={{ fontSize: 64, color: ACB, lineHeight: 1, marginBottom: 20, fontFamily: 'Georgia, serif' }}>"</div>
                <blockquote style={{ fontSize: 20, fontWeight: 700, lineHeight: 1.6, marginBottom: 24, color: '#fff', fontStyle: 'italic' }}>
                  Lumina OS finally made me feel like the computer was working for me, not the other way around.
                </blockquote>
                <p style={{ color: ACB, fontWeight: 800, fontSize: 13, letterSpacing: 1, textTransform: 'uppercase' }}>— Alpha Tester #12, Bengaluru</p>
              </Card3D>
            </motion.div>
          </motion.div>
          <motion.div variants={staggerContainer(0.1, 0.2)} initial="hidden" whileInView="show" viewport={{ once: false, amount: 0.15 }}>
            <motion.div variants={fadeUp}>
              <Card3D style={{ position: 'relative', overflow: 'hidden', minHeight: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }} orbColor="rgba(207,232,255,0.2)">
                <Image src="/luminaos.png" width={340} height={280} alt="Lumina OS Desktop" style={{ objectFit: 'contain', filter: `drop-shadow(0 0 60px ${ACB}44)` }} />
              </Card3D>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '80px 5% 120px', position: 'relative', zIndex: 10 }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <motion.div variants={staggerContainer(0.1, 0.2)} initial="hidden" whileInView="show" viewport={{ once: false, amount: 0.15 }}>
            <motion.div variants={fadeUp}>
              <Card3D style={{ padding: '60px 48px', display: 'flex', flexWrap: 'wrap', gap: 32, alignItems: 'center', justifyContent: 'space-between' }} orbColor="rgba(207,232,255,0.2)">
                <div style={{ flex: '1 1 320px' }}>
                  <h2 style={{ fontSize: 'clamp(24px, 3.5vw, 38px)', fontWeight: 900, letterSpacing: '-0.03em', marginBottom: 12 }}>Be part of the Alpha.</h2>
                  <p style={{ color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, margin: 0, fontSize: 15 }}>Lumina OS is currently in a highly controlled Alpha. Express interest to be considered for early access.</p>
                </div>
                <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
                  <Link href="/waitlist" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '15px 30px', borderRadius: 99, background: `linear-gradient(90deg, ${AC}, ${ACB}, ${AC})`, color: '#000', fontWeight: 800, fontSize: 15, textDecoration: 'none' }}>
                    Join Waitlist <FiArrowRight />
                  </Link>
                  <Link href="/products/lumina-os" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '15px 30px', borderRadius: 99, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontWeight: 700, fontSize: 15, textDecoration: 'none' }}>
                    Back to Lumina OS
                  </Link>
                </div>
              </Card3D>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />
      <ChatWidget />
    </div>
  );
}
