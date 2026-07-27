'use client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ChatWidget from '@/components/ChatWidget';
import BackButton from '@/components/BackButton';
import Link from 'next/link';
import Image from 'next/image';
import { FiArrowRight, FiShield, FiEye, FiZap, FiTarget, FiActivity, FiCpu, FiLock } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { StarField, Card3D, staggerContainer, fadeUp, textVariant } from '@/components/SpaceUI';

const AC = '#10b981';
const ACB = '#34d399';

const stats = [
  { label: 'Screen Parse Time', value: '< 10ms', sub: 'Per frame, local only' },
  { label: 'Cloud Uploads', value: 'Zero', sub: 'Ever. By architecture.' },
  { label: 'Visual Context Accuracy', value: '94.7%', sub: 'OCR + semantic model' },
  { label: 'Supported Platforms', value: 'Win / Mac', sub: 'Linux in development' },
];

const features = [
  { icon: <FiEye size={22} />, title: 'Real-Time Screen Parsing', desc: 'MALUS continuously analyzes your screen at up to 30 frames per second using a local OCR + semantic model stack. It understands code, UI elements, documents, and images — simultaneously.' },
  { icon: <FiLock size={22} />, title: 'Permission-Gated Execution', desc: 'MALUS operates on a strict permission-first model. It cannot read your screen, take actions, or respond to events without your explicit per-session grant. You hold every key.' },
  { icon: <FiZap size={22} />, title: 'Zero-Latency Feedback Loop', desc: 'Because the entire inference pipeline runs locally, MALUS responds to on-screen events in under 10ms. There is no round-trip to a server. No waiting. Instantaneous.' },
  { icon: <FiActivity size={22} />, title: 'Workflow Orchestration', desc: 'MALUS learns the sequence of apps you use for specific tasks and can suggest, pre-load, or autonomously complete repetitive workflow steps on your behalf.' },
  { icon: <FiTarget size={22} />, title: 'Smart UI Element Recognition', desc: 'MALUS identifies interactive elements (buttons, form fields, links) on your screen and can interact with them on command. Ask it to "click the submit button" — and it does.' },
  { icon: <FiCpu size={22} />, title: 'Independent AI Core', desc: 'MALUS has its own embedded AI model, separate from RK AI Desktop. It functions as a standalone companion on any machine, with no dependency on other Rexycore products.' },
];

const timeline = [
  { phase: 'VISION', year: 'Month 1', title: 'The Missing Layer', desc: 'We realized that existing AI assistants are reactive — you open them, type a question, get an answer. MALUS was conceived to be the first AI that lives in the background and understands your work as it happens, without you ever having to ask.' },
  { phase: 'OCR ENGINE', year: 'Month 2–4', title: 'Building Real-Time Visual Understanding', desc: 'We integrated and heavily optimized a quantized vision-language model capable of parsing text, UI elements, and images from a live screen buffer at sub-20ms per cycle. Critical challenge: doing this without impacting GPU performance for the user\'s primary task.' },
  { phase: 'SECURITY', year: 'Month 5–6', title: 'The Permission Architecture', desc: 'Built a multi-layer permission system: session-level grants, per-app grants, and a global kill switch. Validated against third-party security audit that no data could leave the machine under any operating condition.' },
  { phase: 'INTELLIGENCE', year: 'Month 7–10', title: 'Contextual Reasoning Layer', desc: 'Added the semantic reasoning engine that connects visual observations to meaning. MALUS no longer just "sees" — it understands. If you are reviewing a pull request, it knows the conventions of that code language. If you are in email, it understands the social context of your conversation.' },
];

const charts = [
  { label: 'Screen parse accuracy (text + UI elements)', progress: 94, sub: 'Measured against ground-truth datasets' },
  { label: 'CPU overhead during active monitoring', progress: 97, sub: '< 3% CPU impact on test machines' },
  { label: 'Zero data exfiltration (security audit)', progress: 100, sub: 'Third-party security validation' },
  { label: 'Workflow completion time reduction', progress: 79, sub: 'Self-reported by internal testers' },
];

export default function MalusLearnMore() {
  return (
    <div style={{ background: '#010104', color: '#fff', minHeight: '100vh', overflowX: 'hidden', position: 'relative' }}>
      
      <StarField />
      <div className="noise" aria-hidden />

      <BackButton href="/products/malus" label="MALUS" />
      <Navbar />

      {/* HERO */}
      <section style={{ minHeight: '90vh', display: 'flex', alignItems: 'center', padding: '160px 5% 80px', position: 'relative', zIndex: 10 }}>
        <div style={{ maxWidth: '1100px', width: '100%', margin: '0 auto' }}>
          <motion.div variants={staggerContainer(0.12, 0.1)} initial="hidden" whileInView="show" viewport={{ once: false, amount: 0.15 }}>
            <motion.div variants={fadeUp} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 16px', borderRadius: 99, background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.25)', color: ACB, fontSize: 12, fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 28 }}>
              <motion.span animate={{ opacity: [1, 0.3, 1] }} transition={{ repeat: Infinity, duration: 2 }} style={{ width: 8, height: 8, borderRadius: '50%', background: AC, boxShadow: `0 0 10px ${AC}` }} /> Ambient AI Companion
            </motion.div>
            <motion.h1 variants={textVariant(0.1)} style={{ fontSize: 'clamp(48px, 7vw, 88px)', fontWeight: 900, lineHeight: 1.05, letterSpacing: '-0.04em', marginBottom: 28, maxWidth: 900 }}>
              It sees what you see.<br />
              <span style={{ color: ACB }}>It knows what you mean.</span>
            </motion.h1>
            <motion.p variants={fadeUp} style={{ maxWidth: 640, fontSize: 20, color: 'rgba(255,255,255,0.6)', lineHeight: 1.7, marginBottom: 44 }}>
              MALUS is a context-aware AI companion that operates as a living layer over your desktop. Instead of answering questions you ask, it anticipates them — because it already understands your screen.
            </motion.p>
            <motion.div variants={fadeUp} style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              <a href="#journey" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 28px', borderRadius: 99, background: `linear-gradient(135deg, ${AC}, ${ACB})`, color: '#000', fontWeight: 800, fontSize: 15, textDecoration: 'none' }}>
                How We Built It <FiArrowRight />
              </a>
              <Link href="/products/malus" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 28px', borderRadius: 99, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontWeight: 700, fontSize: 15, textDecoration: 'none' }}>
                Back to MALUS
              </Link>
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
                <Card3D style={{ padding: '32px 28px', height: '100%' }} orbColor="rgba(16,185,129,0.3)">
                  <div style={{ fontSize: 44, fontWeight: 900, letterSpacing: '-2px', color: ACB, marginBottom: 8 }}>{s.value}</div>
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
            <motion.div variants={fadeUp} style={{ display: 'inline-block', padding: '5px 14px', borderRadius: 8, background: 'rgba(16,185,129,0.08)', color: ACB, fontSize: 11, fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 16 }}>Capabilities</motion.div>
            <motion.h2 variants={textVariant(0)} style={{ fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 900, letterSpacing: '-0.03em', lineHeight: 1.1 }}>Ambient intelligence, redefined.</motion.h2>
          </motion.div>
          <motion.div variants={staggerContainer(0.05, 0.1)} initial="hidden" whileInView="show" viewport={{ once: false, amount: 0.15 }} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 20 }}>
            {features.map((f, i) => (
              <motion.div key={f.title} variants={fadeUp}>
                <Card3D style={{ padding: '32px 28px', height: '100%' }} orbColor="rgba(16,185,129,0.3)">
                  <div style={{ width: 48, height: 48, borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(16,185,129,0.1)', color: ACB, marginBottom: 20 }}>{f.icon}</div>
                  <h3 style={{ fontSize: 18, fontWeight: 800, marginBottom: 10, color: '#fff' }}>{f.title}</h3>
                  <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.55)', lineHeight: 1.7, margin: 0 }}>{f.desc}</p>
                </Card3D>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* TIMELINE */}
      <section id="journey" style={{ padding: '100px 5%', position: 'relative', zIndex: 10 }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <motion.div variants={staggerContainer(0.1, 0.2)} initial="hidden" whileInView="show" viewport={{ once: false, amount: 0.15 }} style={{ textAlign: 'center', marginBottom: 80 }}>
            <motion.div variants={fadeUp} style={{ display: 'inline-block', padding: '5px 14px', borderRadius: 8, background: 'rgba(16,185,129,0.08)', color: ACB, fontSize: 11, fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 16 }}>Engineering Journey</motion.div>
            <motion.h2 variants={textVariant(0)} style={{ fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 900, letterSpacing: '-0.03em' }}>10 months to ambient intelligence.</motion.h2>
          </motion.div>
          <div style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', top: 0, bottom: 0, left: '50%', transform: 'translateX(-50%)', width: 2, background: `linear-gradient(to bottom, transparent, ${AC}, ${ACB}, transparent)` }} />
            <motion.div variants={staggerContainer(0.1, 0.2)} initial="hidden" whileInView="show" viewport={{ once: false, amount: 0.15 }} style={{ display: 'flex', flexDirection: 'column', gap: 56 }}>
              {timeline.map((item, i) => {
                const isLeft = i % 2 === 0;
                return (
                  <motion.div key={item.title} variants={fadeUp} style={{ display: 'flex', justifyContent: isLeft ? 'flex-start' : 'flex-end', position: 'relative' }}>
                    <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 18, height: 18, borderRadius: '50%', background: '#000', border: `4px solid ${AC}`, boxShadow: `0 0 20px ${AC}66`, zIndex: 2 }} />
                    <div style={{ width: 'calc(50% - 52px)' }}>
                      <Card3D style={{ padding: '28px 28px', borderLeft: isLeft ? `3px solid ${AC}` : undefined, borderRight: !isLeft ? `3px solid ${ACB}` : undefined }} orbColor="rgba(16,185,129,0.2)">
                        <div style={{ display: 'flex', gap: 10, marginBottom: 14, alignItems: 'center' }}>
                          <span style={{ padding: '3px 10px', borderRadius: 6, background: 'rgba(16,185,129,0.1)', color: ACB, fontSize: 10, fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase' }}>{item.phase}</span>
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

      {/* CHARTS + IMAGE */}
      <section style={{ padding: '100px 5%', position: 'relative', zIndex: 10 }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: 64, alignItems: 'center' }}>
          <motion.div variants={staggerContainer(0.1, 0.2)} initial="hidden" whileInView="show" viewport={{ once: false, amount: 0.15 }}>
            <motion.div variants={fadeUp}>
              <div style={{ display: 'inline-block', padding: '5px 14px', borderRadius: 8, background: 'rgba(16,185,129,0.08)', color: ACB, fontSize: 11, fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 16 }}>Performance</div>
              <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 44px)', fontWeight: 900, letterSpacing: '-0.03em', marginBottom: 40 }}>Privacy and speed, both.</h2>
            </motion.div>
            <motion.div variants={staggerContainer(0.1, 0.2)} style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
              {charts.map((c, i) => (
                <motion.div key={c.label} variants={fadeUp}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                    <span style={{ fontSize: 13, fontWeight: 700, color: 'rgba(255,255,255,0.8)' }}>{c.label}</span>
                    <span style={{ fontSize: 13, fontWeight: 900, color: ACB }}>{c.progress}%</span>
                  </div>
                  <div style={{ height: 8, background: 'rgba(255,255,255,0.06)', borderRadius: 99, overflow: 'hidden', marginBottom: 6 }}>
                    <motion.div initial={{ width: 0 }} whileInView={{ width: `${c.progress}%` }} viewport={{ once: false, amount: 0.15 }} transition={{ duration: 1.4, delay: i * 0.1 }}
                      style={{ height: '100%', background: `linear-gradient(90deg, ${AC}99, ${ACB})`, borderRadius: 99 }} />
                  </div>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', fontWeight: 600 }}>{c.sub}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
          
          <motion.div variants={staggerContainer(0.1, 0.2)} initial="hidden" whileInView="show" viewport={{ once: false, amount: 0.15 }}>
            <motion.div variants={fadeUp}>
              <Card3D style={{ padding: '48px', display: 'flex', flexDirection: 'column', gap: 24 }} orbColor="rgba(16,185,129,0.3)">
                <Image src="/malus.jpeg" width={400} height={260} alt="MALUS" style={{ width: '100%', height: 200, objectFit: 'cover', borderRadius: 20, filter: `drop-shadow(0 0 40px ${AC}33)` }} />
                <blockquote style={{ fontSize: 18, fontWeight: 700, lineHeight: 1.6, color: '#fff', fontStyle: 'italic', margin: 0 }}>
                  "MALUS noticed I was stuck on a bug before I even typed a single question. It just offered the solution."
                </blockquote>
                <p style={{ color: ACB, fontWeight: 800, fontSize: 12, letterSpacing: 1, textTransform: 'uppercase', margin: 0 }}>— Alpha Tester #4, Mumbai</p>
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
              <Card3D style={{ padding: '60px 48px', display: 'flex', flexWrap: 'wrap', gap: 32, alignItems: 'center', justifyContent: 'space-between' }} orbColor="rgba(16,185,129,0.3)">
                <div style={{ flex: '1 1 320px' }}>
                  <h2 style={{ fontSize: 'clamp(24px, 3.5vw, 38px)', fontWeight: 900, letterSpacing: '-0.03em', marginBottom: 12 }}>Get MALUS for your machine.</h2>
                  <p style={{ color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, margin: 0, fontSize: 15 }}>Available for Windows and macOS. Download and experience a new category of AI companion.</p>
                </div>
                <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
                  <Link href="/products/malus" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '15px 30px', borderRadius: 99, background: `linear-gradient(135deg, ${AC}, ${ACB})`, color: '#000', fontWeight: 800, fontSize: 15, textDecoration: 'none' }}>
                    Get MALUS <FiArrowRight />
                  </Link>
                  <Link href="/products/malus" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '15px 30px', borderRadius: 99, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontWeight: 700, fontSize: 15, textDecoration: 'none' }}>
                    Back to MALUS
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
