'use client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ChatWidget from '@/components/ChatWidget';
import BackButton from '@/components/BackButton';
import Link from 'next/link';
import { FiArrowRight, FiShield, FiMic, FiWifi, FiHome, FiSpeaker, FiCpu, FiCheckCircle } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { StarField, Card3D, staggerContainer, fadeUp, textVariant } from '@/components/SpaceUI';

const AC = '#ec4899';
const ACB = '#f472b6';

const stats = [
  { label: 'Cloud Dependency', value: 'Zero', sub: 'Fully offline-capable' },
  { label: 'Idle Power Draw', value: '< 5W', sub: 'On Raspberry Pi Zero W' },
  { label: 'Smart Device Protocols', value: '4+', sub: 'Matter, Tuya, Thread, Zigbee' },
  { label: 'Wake Word Response', value: '< 200ms', sub: 'Edge-processed locally' },
];

const features = [
  { icon: <FiMic size={22} />, title: 'Edge Voice Processing', desc: 'Voice commands are processed entirely on the RK AI Home hardware node. No audio clip ever leaves your home network — not even a single frame. Wake word detection is local and instantaneous.' },
  { icon: <FiHome size={22} />, title: 'Universal Smart Home Hub', desc: 'RK AI Home integrates natively with Matter, Tuya, Thread, and Zigbee protocols out of the box. Control lights, climate, security cameras, locks, and plugs from a single intelligent layer.' },
  { icon: <FiSpeaker size={22} />, title: 'Family Orchestration', desc: 'Set household-wide announcements, coordinate schedules for multiple family members, manage alarms and reminders for children and adults simultaneously — all from a natural voice interface.' },
  { icon: <FiWifi size={22} />, title: 'Offline-First Architecture', desc: 'Your smart home must never rely on a corporate server staying online. RK AI Home is engineered to operate 100% of its critical functions when the internet is completely unavailable.' },
  { icon: <FiShield size={22} />, title: 'Private Local Inference', desc: 'The AI reasoning layer runs on a quantized model stored on-device. Your home conversations, routines, and automation rules are never processed by a third-party cloud AI.' },
  { icon: <FiCpu size={22} />, title: 'RexyCore Sync', desc: 'When you come home and your RK AI Desktop detects it, it can seamlessly hand off context to RK AI Home — pausing music on your PC and resuming it on your home speakers automatically.' },
];

const timeline = [
  { phase: 'CONCEPT', year: 'Month 1–2', title: 'Privacy vs. Convenience: A False Tradeoff', desc: 'Every existing smart home platform routes your voice commands through mega-corp servers. We set out to prove you do not have to choose between a smart home and a private one. The key insight: an RPi Zero W is powerful enough to run quantized voice models with sub-200ms latency.' },
  { phase: 'HARDWARE', year: 'Month 3–5', title: 'Designing the Node', desc: 'Engineered a minimal hardware form factor using a Raspberry Pi compute module, custom antenna configuration, and passive cooling. The goal: a node smaller than a deck of cards that can sit on any shelf, drawing under 5 watts, running 24/7.' },
  { phase: 'VOICE ENGINE', year: 'Month 6–8', title: 'Edge Speech Processing', desc: 'Ported and heavily quantized Whisper-style transcription to run inference on-device in real-time. Implemented a custom wake word model trained specifically on "Hey Rexycore" in Indian English and multiple regional accents.' },
  { phase: 'INTEGRATIONS', year: 'Month 9–12', title: 'Connecting the Home', desc: 'Built native drivers for Matter, Tuya, and Zigbee. Added the family orchestration layer with multi-user voice profiles, announcement queuing, and calendar integration that syncs locally. Currently in hardware pre-production for Pre-order fulfillment.' },
];

const charts = [
  { label: 'Smart home commands processed offline', progress: 100, sub: 'All critical functions work without internet' },
  { label: 'Voice wake word accuracy (Indian English)', progress: 97, sub: 'Tested across 12 regional accents' },
  { label: 'Device integration breadth vs competitors', progress: 85, sub: 'Matter + Tuya + Thread + Zigbee' },
  { label: 'Power efficiency vs Google Nest Hub', progress: 92, sub: '< 5W idle vs 7W+ for Nest Hub' },
];

export default function RkAiHomeLearnMore() {
  return (
    <div style={{ background: '#010104', color: '#fff', minHeight: '100vh', overflowX: 'hidden', position: 'relative' }}>
      
      <StarField />
      <div className="noise" aria-hidden />

      <BackButton href="/products/rk-ai-home" label="RK AI Home" />
      <Navbar />

      {/* HERO */}
      <section style={{ minHeight: '90vh', display: 'flex', alignItems: 'center', padding: '160px 5% 80px', position: 'relative', zIndex: 10 }}>
        <div style={{ maxWidth: '1100px', width: '100%', margin: '0 auto' }}>
          <motion.div variants={staggerContainer(0.12, 0.1)} initial="hidden" whileInView="show" viewport={{ once: false, amount: 0.15 }}>
            <motion.div variants={fadeUp} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 16px', borderRadius: 99, background: 'rgba(236,72,153,0.08)', border: '1px solid rgba(236,72,153,0.25)', color: ACB, fontSize: 12, fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 28 }}>
              <motion.span animate={{ opacity: [1, 0.3, 1] }} transition={{ repeat: Infinity, duration: 2 }} style={{ width: 8, height: 8, borderRadius: '50%', background: AC, boxShadow: `0 0 10px ${AC}` }} /> Hardware Pre-Order — Shipping 2025
            </motion.div>
            <motion.h1 variants={textVariant(0.1)} style={{ fontSize: 'clamp(48px, 7vw, 88px)', fontWeight: 900, lineHeight: 1.05, letterSpacing: '-0.04em', marginBottom: 28, maxWidth: 900 }}>
              Your home,<br />
              <span style={{ color: ACB }}>thinking with you.</span>
            </motion.h1>
            <motion.p variants={fadeUp} style={{ maxWidth: 640, fontSize: 20, color: 'rgba(255,255,255,0.6)', lineHeight: 1.7, marginBottom: 44 }}>
              RK AI Home is the first privacy-native smart home system. Voice processing, automation, and family coordination — all on a node smaller than a deck of cards, drawing less than 5 watts.
            </motion.p>
            <motion.div variants={fadeUp} style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              <a href="#journey" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 28px', borderRadius: 99, background: `linear-gradient(90deg, ${AC}, ${ACB}, ${AC})`, color: '#fff', fontWeight: 800, fontSize: 15, textDecoration: 'none' }}>
                The Engineering Story <FiArrowRight />
              </a>
              <Link href="/products/rk-ai-home" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 28px', borderRadius: 99, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontWeight: 700, fontSize: 15, textDecoration: 'none' }}>
                Back to RK AI Home
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
                <Card3D style={{ padding: '32px 28px', height: '100%' }} orbColor="rgba(236,72,153,0.3)">
                  <div style={{ fontSize: 44, fontWeight: 900, letterSpacing: '-2px', color: ACB, marginBottom: 8 }}>{s.value}</div>
                  <div style={{ fontWeight: 700, fontSize: 14, color: '#fff', marginBottom: 4 }}>{s.label}</div>
                  <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>{s.sub}</div>
                </Card3D>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* HARDWARE SPEC BOX */}
      <section style={{ padding: '80px 5%', position: 'relative', zIndex: 10 }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <motion.div variants={staggerContainer(0.1, 0.2)} initial="hidden" whileInView="show" viewport={{ once: false, amount: 0.15 }}>
            <motion.div variants={fadeUp}>
              <Card3D style={{ padding: '60px 48px', display: 'flex', flexWrap: 'wrap', gap: 48, alignItems: 'center' }} orbColor="rgba(236,72,153,0.2)">
                <div style={{ flex: '1 1 360px' }}>
                  <div style={{ display: 'inline-block', padding: '5px 14px', borderRadius: 8, background: 'rgba(236,72,153,0.08)', color: ACB, fontSize: 11, fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 20 }}>Hardware Specs</div>
                  <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 44px)', fontWeight: 900, letterSpacing: '-0.03em', marginBottom: 20 }}>The Node.</h2>
                  <p style={{ color: 'rgba(255,255,255,0.55)', lineHeight: 1.7, marginBottom: 28, fontSize: 15 }}>Custom-designed hardware built around a Raspberry Pi compute module with our proprietary firmware. Engineered for silent, 24/7 operation with passive thermal management.</p>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 14, padding: 0 }}>
                    {['ARM Cortex-A53 quad-core @ 1.4GHz', 'Dual-band 802.11ac WiFi + BT 4.2', '< 5W power draw, no fan required', 'On-device Whisper voice model', 'Matter 1.1 + Tuya + Zigbee 3.0', 'USB-C powered, wall-mountable'].map(spec => (
                      <li key={spec} style={{ display: 'flex', alignItems: 'center', gap: 12, color: 'rgba(255,255,255,0.75)', fontSize: 14, fontWeight: 600 }}>
                        <FiCheckCircle color={ACB} size={16} style={{ flexShrink: 0 }} /> {spec}
                      </li>
                    ))}
                  </ul>
                </div>
                <div style={{ flex: '1 1 300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ width: 220, height: 220, borderRadius: 36, background: `linear-gradient(90deg, rgba(236, 72, 153, 0.15, 153, 72, rgba(236), rgba(244,114,182,0.08))`, border: `2px solid rgba(236,72,153,0.2)`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', boxShadow: `0 0 80px ${AC}22` }}>
                    <div style={{ fontSize: 48, fontWeight: 900, color: AC }}>RK</div>
                    <div style={{ fontSize: 18, fontWeight: 800, color: '#fff', letterSpacing: 2 }}>HOME</div>
                    <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginTop: 8, fontWeight: 600 }}>NODE v1.0</div>
                  </div>
                </div>
              </Card3D>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CORE FEATURES */}
      <section style={{ padding: '80px 5%', position: 'relative', zIndex: 10 }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <motion.div variants={staggerContainer(0.1, 0.2)} initial="hidden" whileInView="show" viewport={{ once: false, amount: 0.15 }} style={{ marginBottom: 56 }}>
            <motion.div variants={fadeUp} style={{ display: 'inline-block', padding: '5px 14px', borderRadius: 8, background: 'rgba(236,72,153,0.08)', color: ACB, fontSize: 11, fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 16 }}>Capabilities</motion.div>
            <motion.h2 variants={textVariant(0)} style={{ fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 900, letterSpacing: '-0.03em', lineHeight: 1.1 }}>Everything your home should do.</motion.h2>
          </motion.div>
          <motion.div variants={staggerContainer(0.05, 0.1)} initial="hidden" whileInView="show" viewport={{ once: false, amount: 0.15 }} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 20 }}>
            {features.map((f, i) => (
              <motion.div key={f.title} variants={fadeUp}>
                <Card3D style={{ padding: '32px 28px', height: '100%' }} orbColor="rgba(236,72,153,0.3)">
                  <div style={{ width: 48, height: 48, borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(236,72,153,0.1)', color: ACB, marginBottom: 20 }}>{f.icon}</div>
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
            <motion.div variants={fadeUp} style={{ display: 'inline-block', padding: '5px 14px', borderRadius: 8, background: 'rgba(236,72,153,0.08)', color: ACB, fontSize: 11, fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 16 }}>Engineering Story</motion.div>
            <motion.h2 variants={textVariant(0)} style={{ fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 900, letterSpacing: '-0.03em' }}>12 months from idea to pre-order.</motion.h2>
          </motion.div>
          <div style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', top: 0, bottom: 0, left: '50%', transform: 'translateX(-50%)', width: 2, background: `linear-gradient(90deg, transparent, ${AC}, ${ACB}, transparent)` }} />
            <motion.div variants={staggerContainer(0.1, 0.2)} initial="hidden" whileInView="show" viewport={{ once: false, amount: 0.15 }} style={{ display: 'flex', flexDirection: 'column', gap: 56 }}>
              {timeline.map((item, i) => {
                const isLeft = i % 2 === 0;
                return (
                  <motion.div key={item.title} variants={fadeUp} style={{ display: 'flex', justifyContent: isLeft ? 'flex-start' : 'flex-end', position: 'relative' }}>
                    <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 18, height: 18, borderRadius: '50%', background: '#000', border: `4px solid ${AC}`, boxShadow: `0 0 20px ${AC}66`, zIndex: 2 }} />
                    <div style={{ width: 'calc(50% - 52px)' }}>
                      <Card3D style={{ padding: '28px 28px', borderLeft: isLeft ? `3px solid ${AC}` : undefined, borderRight: !isLeft ? `3px solid ${ACB}` : undefined }} orbColor="rgba(236,72,153,0.2)">
                        <div style={{ display: 'flex', gap: 10, marginBottom: 14, alignItems: 'center' }}>
                          <span style={{ padding: '3px 10px', borderRadius: 6, background: 'rgba(236,72,153,0.1)', color: ACB, fontSize: 10, fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase' }}>{item.phase}</span>
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
            <motion.div variants={fadeUp} style={{ display: 'inline-block', padding: '5px 14px', borderRadius: 8, background: 'rgba(236,72,153,0.08)', color: ACB, fontSize: 11, fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 16 }}>Benchmarks</motion.div>
            <motion.h2 variants={textVariant(0)} style={{ fontSize: 'clamp(28px, 3.5vw, 44px)', fontWeight: 900, letterSpacing: '-0.03em', marginBottom: 16 }}>Why this matters.</motion.h2>
            <motion.p variants={fadeUp} style={{ color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, fontSize: 15 }}>Internal benchmarks comparing RK AI Home against Google Nest Hub, Amazon Echo, and Apple HomePod in privacy, offline capability, and device compatibility.</motion.p>
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
                    style={{ height: '100%', background: `linear-gradient(90deg, ${AC}99, ${ACB}, ${AC}99)`, borderRadius: 99 }} />
                </div>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', fontWeight: 600 }}>{c.sub}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* QUOTE */}
      <section style={{ padding: '80px 5%', position: 'relative', zIndex: 10 }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <motion.div variants={staggerContainer(0.1, 0.2)} initial="hidden" whileInView="show" viewport={{ once: false, amount: 0.15 }}>
            <motion.div variants={fadeUp}>
              <Card3D style={{ padding: '60px 48px', textAlign: 'center' }} orbColor="rgba(236,72,153,0.3)">
                <div style={{ fontSize: 72, color: ACB, lineHeight: 0.8, marginBottom: 28, fontFamily: 'Georgia, serif' }}>"</div>
                <blockquote style={{ fontSize: 24, fontWeight: 700, lineHeight: 1.6, marginBottom: 28, color: '#fff', fontStyle: 'italic', maxWidth: 700, margin: '0 auto 28px' }}>
                  My kids say "Hey Rexycore" more than they say my name. I take that as a win.
                </blockquote>
                <p style={{ color: ACB, fontWeight: 800, fontSize: 13, letterSpacing: 1, textTransform: 'uppercase' }}>— Pre-order Customer #7, Hyderabad</p>
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
              <Card3D style={{ padding: '60px 48px', display: 'flex', flexWrap: 'wrap', gap: 32, alignItems: 'center', justifyContent: 'space-between' }} orbColor="rgba(236,72,153,0.3)">
                <div style={{ flex: '1 1 320px' }}>
                  <h2 style={{ fontSize: 'clamp(24px, 3.5vw, 38px)', fontWeight: 900, letterSpacing: '-0.03em', marginBottom: 12 }}>Pre-order the Node.</h2>
                  <p style={{ color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, margin: 0, fontSize: 15 }}>Be among the first to get RK AI Home. Shipping is expected in early 2025 to early backers.</p>
                </div>
                <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
                  <Link href="/products/rk-ai-home" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '15px 30px', borderRadius: 99, background: `linear-gradient(90deg, ${AC}, ${ACB}, ${AC})`, color: '#fff', fontWeight: 800, fontSize: 15, textDecoration: 'none' }}>
                    Pre-order Now <FiArrowRight />
                  </Link>
                  <Link href="/products/rk-ai-home" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '15px 30px', borderRadius: 99, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontWeight: 700, fontSize: 15, textDecoration: 'none' }}>
                    Back to RK AI Home
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
