'use client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ChatWidget from '@/components/ChatWidget';
import BackButton from '@/components/BackButton';
import Link from 'next/link';
import { FiArrowRight, FiShield, FiGlobe, FiZap, FiCheckCircle, FiEdit3, FiCpu, FiRefreshCw } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { StarField, Card3D, staggerContainer, fadeUp, textVariant } from '@/components/SpaceUI';

const AC = '#f59e0b';
const ACB = '#fbbf24';

const stats = [
  { label: 'Network Requests for Suggestions', value: '0', sub: 'Fully local inference' },
  { label: 'Supported Host Apps', value: '∞', sub: 'System-wide input hook' },
  { label: 'Avg Suggestion Latency', value: '38ms', sub: 'On Apple M-series' },
  { label: 'Languages Supported', value: '40+', sub: 'Translation & autocomplete' },
];

const features = [
  { icon: <FiEdit3 size={22} />, title: 'Context-Aware Autocomplete', desc: 'Light Key reads the surrounding text in your active window and generates completions that are semantically aware of your paragraph, tone, and intent — not just the last word.' },
  { icon: <FiGlobe size={22} />, title: 'Real-Time Translation', desc: 'Highlight any selected text and invoke a shortcut. Light Key translates it in-place, maintaining formatting and meaning across 40+ languages without leaving your app.' },
  { icon: <FiZap size={22} />, title: 'Instant Rewriting', desc: 'Select a paragraph and trigger a rewrite in any tone: formal, casual, persuasive, technical. The replacement appears in under 100ms with zero round-trip.' },
  { icon: <FiShield size={22} />, title: 'Zero Cloud Dependency', desc: 'Every keystroke analysis, every suggestion, every translation happens on your local machine. Light Key never transmits your text to any server under any circumstance.' },
  { icon: <FiCpu size={22} />, title: 'Low-Impact Background Process', desc: 'Engineered from the ground up to be invisible to system performance. Light Key uses less than 0.5% CPU at idle and spikes to a maximum of 4% during active inference.' },
  { icon: <FiRefreshCw size={22} />, title: 'Adaptive Learning', desc: 'Light Key builds a local style profile of your writing. Over time, suggestions feel less like AI autocomplete and more like your own thoughts finishing themselves.' },
];

const timeline = [
  { phase: 'RESEARCH', year: 'Month 1–2', title: 'The Input Layer Problem', desc: 'We identified that all existing AI keyboard tools route keystrokes through the cloud, creating a 300–2000ms latency and an unacceptable privacy vulnerability. We decided to build a local OS input hook that intercepts at the system API level.' },
  { phase: 'CORE ENGINE', year: 'Month 3–5', title: 'Building Local NLP Inference', desc: 'Integrated a quantized language model (< 800MB RAM footprint) capable of generating high-quality continuations from short prompts. Achieved sub-60ms P99 latency on a standard MacBook Air M2.' },
  { phase: 'SYSTEM HOOK', year: 'Month 6–8', title: 'Cross-App Input Interception', desc: 'Developed a system-wide keyboard input extension compatible with macOS, Windows 11, and major Linux desktop environments. The hook captures context from the active document without modifying or intercepting clipboard content.' },
  { phase: 'POLISH', year: 'Month 9–12', title: 'Translation & Style Engine', desc: 'Added the multi-language translation layer and built the personal style profiler. Early beta users reported that suggestions felt "unnervingly accurate" to their own writing style within 2 weeks of use.' },
];

const charts = [
  { label: 'Latency vs cloud-based tools (e.g. Copilot)', progress: 96, sub: '38ms vs avg 620ms' },
  { label: 'Suggestion acceptance rate in beta', progress: 72, sub: 'Users accepted 72% of suggestions' },
  { label: 'Memory footprint vs competitor tools', progress: 88, sub: '800MB vs avg 2.4GB competitor' },
  { label: 'User productivity increase (self-reported)', progress: 81, sub: 'Across 34 beta participants' },
];

export default function LightKeyLearnMore() {
  return (
    <div style={{ background: '#010104', color: '#fff', minHeight: '100vh', overflowX: 'hidden', position: 'relative' }}>
      
      <StarField />
      <div className="noise" aria-hidden />

      <BackButton href="/products/light-key" label="Light Key" />
      <Navbar />

      {/* HERO */}
      <section style={{ minHeight: '90vh', display: 'flex', alignItems: 'center', padding: '160px 5% 80px', position: 'relative', zIndex: 10 }}>
        <div style={{ maxWidth: '1100px', width: '100%', margin: '0 auto' }}>
          <motion.div variants={staggerContainer(0.12, 0.1)} initial="hidden" whileInView="show" viewport={{ once: false, amount: 0.15 }}>
            <motion.div variants={fadeUp} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 16px', borderRadius: 99, background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.25)', color: ACB, fontSize: 12, fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 28 }}>
              <motion.span animate={{ opacity: [1, 0.3, 1] }} transition={{ repeat: Infinity, duration: 2 }} style={{ width: 8, height: 8, borderRadius: '50%', background: AC, boxShadow: `0 0 10px ${AC}` }} /> Intelligent Input Layer — Beta
            </motion.div>
            <motion.h1 variants={textVariant(0.1)} style={{ fontSize: 'clamp(48px, 7vw, 88px)', fontWeight: 900, lineHeight: 1.05, letterSpacing: '-0.04em', marginBottom: 28, maxWidth: 900 }}>
              Your keyboard,<br />
              <span style={{ color: ACB }}>supercharged locally.</span>
            </motion.h1>
            <motion.p variants={fadeUp} style={{ maxWidth: 640, fontSize: 20, color: 'rgba(255,255,255,0.6)', lineHeight: 1.7, marginBottom: 44 }}>
              Light Key is a system-level AI input layer that makes your keyboard smarter in every app you use — without ever sending a single character to the cloud.
            </motion.p>
            <motion.div variants={fadeUp} style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              <a href="#journey" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 28px', borderRadius: 99, background: `linear-gradient(135deg, ${AC}, ${ACB})`, color: '#000', fontWeight: 800, fontSize: 15, textDecoration: 'none' }}>
                See the Build Story <FiArrowRight />
              </a>
              <Link href="/products/light-key" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 28px', borderRadius: 99, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontWeight: 700, fontSize: 15, textDecoration: 'none' }}>
                Back to Light Key
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* LIVE DEMO VISUAL */}
      <section style={{ padding: '0 5% 80px', position: 'relative', zIndex: 10 }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <motion.div variants={staggerContainer(0.1, 0.2)} initial="hidden" whileInView="show" viewport={{ once: false, amount: 0.15 }}>
            <motion.div variants={fadeUp}>
              <Card3D style={{ background: 'rgba(10,10,15,0.9)', padding: '48px 40px' }} orbColor="rgba(245,158,11,0.2)">
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)', fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 24 }}>— Live input demo</div>
                <div style={{ fontFamily: 'Georgia, serif', fontSize: 22, lineHeight: 1.8, color: 'rgba(255,255,255,0.85)' }}>
                  I wanted to follow up on our discussion from yesterday. After reviewing the proposal in full,
                  <span style={{ color: ACB, borderBottom: `2px solid ${ACB}44`, paddingBottom: 2 }}> I believe the implementation timeline is feasible provided we allocate the additional engineering resources discussed in Q3.</span>
                  <span style={{ display: 'inline-block', width: 2, height: 22, background: ACB, verticalAlign: 'middle', marginLeft: 2, animation: 'blink 1s step-end infinite', boxShadow: `0 0 8px ${ACB}` }} />
                </div>
                <div style={{ marginTop: 28, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                  {['Tab to accept', 'Shift+Tab to rephrase', '⌥+T to translate'].map(hint => (
                    <div key={hint} style={{ background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.2)', borderRadius: 8, padding: '6px 14px', fontSize: 12, color: ACB, fontWeight: 700 }}>{hint}</div>
                  ))}
                </div>
              </Card3D>
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
                <Card3D style={{ padding: '32px 28px', height: '100%' }} orbColor="rgba(245,158,11,0.2)">
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
            <motion.div variants={fadeUp} style={{ display: 'inline-block', padding: '5px 14px', borderRadius: 8, background: 'rgba(245,158,11,0.08)', color: ACB, fontSize: 11, fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 16 }}>Capabilities</motion.div>
            <motion.h2 variants={textVariant(0)} style={{ fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 900, letterSpacing: '-0.03em', lineHeight: 1.1 }}>Everything your keyboard should do.</motion.h2>
          </motion.div>
          <motion.div variants={staggerContainer(0.05, 0.1)} initial="hidden" whileInView="show" viewport={{ once: false, amount: 0.15 }} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 20 }}>
            {features.map((f, i) => (
              <motion.div key={f.title} variants={fadeUp}>
                <Card3D style={{ padding: '32px 28px', height: '100%' }} orbColor="rgba(245,158,11,0.2)">
                  <div style={{ width: 48, height: 48, borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(245,158,11,0.1)', color: ACB, marginBottom: 20 }}>{f.icon}</div>
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
            <motion.div variants={fadeUp} style={{ display: 'inline-block', padding: '5px 14px', borderRadius: 8, background: 'rgba(245,158,11,0.08)', color: ACB, fontSize: 11, fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 16 }}>The Build</motion.div>
            <motion.h2 variants={textVariant(0)} style={{ fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 900, letterSpacing: '-0.03em' }}>12 months, zero shortcuts.</motion.h2>
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
                      <Card3D style={{ padding: '28px 28px', borderLeft: isLeft ? `3px solid ${AC}` : undefined, borderRight: !isLeft ? `3px solid ${ACB}` : undefined }} orbColor="rgba(245,158,11,0.2)">
                        <div style={{ display: 'flex', gap: 10, marginBottom: 14, alignItems: 'center' }}>
                          <span style={{ padding: '3px 10px', borderRadius: 6, background: 'rgba(245,158,11,0.1)', color: ACB, fontSize: 10, fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase' }}>{item.phase}</span>
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
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: 80, alignItems: 'center' }}>
          <motion.div variants={staggerContainer(0.1, 0.2)} initial="hidden" whileInView="show" viewport={{ once: false, amount: 0.15 }}>
            <motion.div variants={fadeUp} style={{ display: 'inline-block', padding: '5px 14px', borderRadius: 8, background: 'rgba(245,158,11,0.08)', color: ACB, fontSize: 11, fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 16 }}>Benchmarks</motion.div>
            <motion.h2 variants={textVariant(0)} style={{ fontSize: 'clamp(28px, 3.5vw, 44px)', fontWeight: 900, letterSpacing: '-0.03em', marginBottom: 16 }}>The numbers speak.</motion.h2>
            <motion.p variants={fadeUp} style={{ color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, fontSize: 15 }}>Beta testing across 34 participants over 8 weeks. Measured against the most popular AI writing and keyboard tools available.</motion.p>
          </motion.div>
          <motion.div variants={staggerContainer(0.1, 0.3)} initial="hidden" whileInView="show" viewport={{ once: false, amount: 0.15 }} style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
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
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '80px 5% 120px', position: 'relative', zIndex: 10 }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <motion.div variants={staggerContainer(0.1, 0.2)} initial="hidden" whileInView="show" viewport={{ once: false, amount: 0.15 }}>
            <motion.div variants={fadeUp}>
              <Card3D style={{ padding: '60px 48px', display: 'flex', flexWrap: 'wrap', gap: 32, alignItems: 'center', justifyContent: 'space-between' }} orbColor="rgba(245,158,11,0.2)">
                <div style={{ flex: '1 1 320px' }}>
                  <h2 style={{ fontSize: 'clamp(24px, 3.5vw, 38px)', fontWeight: 900, letterSpacing: '-0.03em', marginBottom: 12 }}>Join the Beta.</h2>
                  <p style={{ color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, margin: 0, fontSize: 15 }}>Light Key is currently available in limited beta. Get access and transform how you write, forever.</p>
                </div>
                <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
                  <Link href="/waitlist" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '15px 30px', borderRadius: 99, background: `linear-gradient(135deg, ${AC}, ${ACB})`, color: '#000', fontWeight: 800, fontSize: 15, textDecoration: 'none' }}>
                    Get Early Access <FiArrowRight />
                  </Link>
                  <Link href="/products/light-key" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '15px 30px', borderRadius: 99, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontWeight: 700, fontSize: 15, textDecoration: 'none' }}>
                    Back to Light Key
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
