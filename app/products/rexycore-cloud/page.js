'use client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ChatWidget from '@/components/ChatWidget';
import BackButton from '@/components/BackButton';
import Link from 'next/link';
import { FiArrowRight, FiCloud, FiShield, FiZap, FiDatabase, FiLock, FiGlobe, FiCpu, FiCheckCircle, FiStar } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { StarField, Card3D, staggerContainer, fadeUp, textVariant, FlowText } from '@/components/SpaceUI';

const AC = '#0ea5e9';
const ACB = '#38bdf8';

const stats = [
  { label: 'Uptime SLA', value: '99.99%', sub: 'Across all matrix tiers' },
  { label: 'Regions Available', value: 'Global', sub: 'Edge-routed to you' },
  { label: 'Local AI Sync', value: 'Real-time', sub: 'Desktop ↔ Cloud handoff' },
  { label: 'Privacy Standard', value: 'Zero-log', sub: 'No telemetry, ever' },
];

const tiers = [
  { name: 'Free', price: '₹0', color: '#888', features: ['Basic AI Access', '1 GB Cloud Storage', '10 generations/day', 'Community Support'], popular: false },
  { name: 'Pro', price: '₹399/mo', color: AC, features: ['Full RK AI Desktop', '50 GB Storage', '500 generations/day', 'DinoX Unlocked', 'Priority Queue'], popular: false },
  { name: 'Elite', price: '₹799/mo', color: '#a78bfa', features: ['Everything in Pro', '200 GB Storage', 'Unlimited generations', 'Snapvault Orb', 'Autonomous Agents', 'Beta Features'], popular: true },
  { name: 'Quantum', price: 'Custom', color: '#ec4899', features: ['Everything in Elite', 'Dedicated compute', 'Custom model fine-tuning', 'SLA guarantee', 'Dedicated support'], popular: false },
];

const features = [
  { icon: <FiCloud size={22} />, title: 'Hybrid Local-Cloud Architecture', desc: 'RexyCore Cloud is not a replacement for local AI — it is an extension. Your RK AI Desktop processes everything on-device first. The cloud layer adds capacity, sync, and generation power when you need to scale beyond your hardware.' },
  { icon: <FiShield size={22} />, title: 'Zero-Log Privacy Guarantee', desc: 'We do not store your prompts, your outputs, or your usage patterns. Our cloud infrastructure is designed to be stateless for user content — the only data we retain is what is required to manage your subscription.' },
  { icon: <FiDatabase size={22} />, title: 'Encrypted Cloud Storage', desc: 'All files synced through RexyCore Cloud are encrypted at rest with AES-256 and in transit with TLS 1.3. You hold the keys. Even our infrastructure administrators cannot access your stored content.' },
  { icon: <FiZap size={22} />, title: 'Smart Generation Routing', desc: 'When you trigger a generation on RK AI Desktop, our router intelligently decides whether to process it locally on your hardware or offload to our cloud based on task complexity, your current hardware load, and your plan tier.' },
  { icon: <FiCpu size={22} />, title: 'Dedicated Compute (Elite+)', desc: 'Pro and Elite subscribers share a high-performance GPU pool with guaranteed queue priority. Quantum tier subscribers receive isolated, dedicated compute nodes for consistent performance regardless of platform load.' },
  { icon: <FiGlobe size={22} />, title: 'Global Edge Network', desc: 'Our cloud nodes are distributed across multiple regions. Your requests are automatically routed to the geographically nearest node to minimize latency, regardless of your subscription tier.' },
];

const timeline = [
  { phase: 'FOUNDATION', year: 'Q1 2024', title: 'Infrastructure Design', desc: 'Designed a cloud architecture that could operate as a true extension of local AI rather than a replacement. The core constraint: user data may never be logged, even for debugging. This required building a fully stateless request pipeline from scratch.' },
  { phase: 'SYNC ENGINE', year: 'Q2 2024', title: 'Local ↔ Cloud Handoff Protocol', desc: 'Built the real-time synchronisation protocol that allows RK AI Desktop to seamlessly offload tasks to the cloud mid-session. The handoff is invisible to the user — they never experience a context switch or a loading state.' },
  { phase: 'MATRIX TIERS', year: 'Q3 2024', title: 'Subscription & Slot System', desc: 'Launched the Matrix Tier pricing system with early-access price locks. Implemented a live slot counter so users could see real scarcity in real-time. The waitlist filled within 48 hours of soft launch.' },
  { phase: 'LIVE', year: 'Q4 2024', title: 'Public Launch', desc: 'RexyCore Cloud went live with Free, Pro, and Elite tiers. The Quantum tier is currently available on request for teams requiring dedicated infrastructure. Over 1,200 subscribers joined in the first 30 days.' },
];

const charts = [
  { label: 'Uptime over trailing 90 days', progress: 99, sub: 'One scheduled maintenance window' },
  { label: 'Request latency P99 vs cloud competitors', progress: 91, sub: 'Edge routing reduces avg by 340ms' },
  { label: 'User data privacy compliance', progress: 100, sub: 'Zero data logged or shared' },
  { label: 'Local-first task offload efficiency', progress: 88, sub: '88% of tasks resolved on-device' },
];

export default function RexyCoreCloudPage() {
  return (
    <div style={{ background: '#010104', color: '#fff', minHeight: '100vh', overflowX: 'hidden', position: 'relative' }}>
      
      <StarField />
      <div className="noise" aria-hidden />

      <BackButton href="/products" label="Product Suite" />
      <Navbar />

      {/* HERO */}
      <section style={{ minHeight: '90vh', display: 'flex', alignItems: 'center', padding: '160px 5% 80px', position: 'relative', zIndex: 10 }}>
        <div style={{ maxWidth: '1100px', width: '100%', margin: '0 auto' }}>
          <motion.div variants={staggerContainer(0.12, 0.1)} initial="hidden" whileInView="show" viewport={{ once: false, amount: 0.15 }}>
            <motion.div variants={fadeUp} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 16px', borderRadius: 99, background: 'rgba(14,165,233,0.08)', border: '1px solid rgba(14,165,233,0.25)', color: ACB, fontSize: 12, fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 28 }}>
              <motion.span animate={{ opacity: [1, 0.3, 1] }} transition={{ repeat: Infinity, duration: 2 }} style={{ width: 8, height: 8, borderRadius: '50%', background: '#4ade80', boxShadow: '0 0 10px #4ade80' }} /> Live — Matrix Tiers Active
            </motion.div>
            <motion.h1 variants={textVariant(0.1)} style={{ fontSize: 'clamp(48px, 7vw, 88px)', fontWeight: 900, lineHeight: 1.05, letterSpacing: '-0.04em', marginBottom: 28, maxWidth: 900 }}>
              Your AI,<br />
              <FlowText gradient={`linear-gradient(90deg, ${AC}, ${ACB}, ${AC})`}>
                everywhere.
              </FlowText>
            </motion.h1>
            <motion.p variants={fadeUp} style={{ maxWidth: 640, fontSize: 20, color: 'rgba(255,255,255,0.6)', lineHeight: 1.7, marginBottom: 44 }}>
              RexyCore Cloud extends your local AI with encrypted storage, powerful generation capacity, and seamless cross-device sync — while maintaining our zero-telemetry, privacy-first architecture throughout.
            </motion.p>
            <motion.div variants={fadeUp} style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href="/subscription" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '15px 30px', borderRadius: 99, background: `linear-gradient(90deg, ${AC}, ${ACB}, ${AC})`, color: '#000', fontWeight: 800, fontSize: 15, textDecoration: 'none', boxShadow: `0 8px 32px ${AC}44` }}>
                  View Matrix Tiers <FiArrowRight />
                </Link>
              </motion.div>
              <motion.a whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} href="#journey" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '15px 30px', borderRadius: 99, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontWeight: 700, fontSize: 15, textDecoration: 'none' }}>
                How It Works
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* STATS */}
      <section style={{ padding: '80px 5%', position: 'relative', zIndex: 10 }}>
        <motion.div variants={staggerContainer(0.1, 0.2)} initial="hidden" whileInView="show" viewport={{ once: false, amount: 0.15 }} style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 24 }}>
          {stats.map((s, i) => (
            <motion.div key={s.label} variants={fadeUp}>
              <Card3D style={{ padding: '32px 28px', height: '100%', boxSizing: 'border-box' }} orbColor="rgba(14,165,233,0.3)">
                <div style={{ fontSize: 44, fontWeight: 900, letterSpacing: '-2px', color: ACB, marginBottom: 8 }}>{s.value}</div>
                <div style={{ fontWeight: 700, fontSize: 14, color: '#fff', marginBottom: 4 }}>{s.label}</div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>{s.sub}</div>
              </Card3D>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* TIER PREVIEW */}
      <section style={{ padding: '80px 5%', position: 'relative', zIndex: 10 }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <motion.div variants={staggerContainer(0.1, 0.2)} initial="hidden" whileInView="show" viewport={{ once: false, amount: 0.15 }} style={{ marginBottom: 56 }}>
            <motion.div variants={fadeUp} style={{ display: 'inline-block', padding: '5px 14px', borderRadius: 8, background: 'rgba(14,165,233,0.08)', color: ACB, fontSize: 11, fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 16 }}>Pricing</motion.div>
            <motion.h2 variants={textVariant(0)} style={{ fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 900, letterSpacing: '-0.03em' }}>Choose your Matrix Tier.</motion.h2>
            <motion.p variants={fadeUp} style={{ color: 'rgba(255,255,255,0.45)', marginTop: 12, fontSize: 15 }}>Early subscribers lock their price permanently. Prices will increase at public launch.</motion.p>
          </motion.div>
          <motion.div variants={staggerContainer(0.05, 0.1)} initial="hidden" whileInView="show" viewport={{ once: false, amount: 0.15 }} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20 }}>
            {tiers.map((t, i) => (
              <motion.div key={t.name} variants={fadeUp}>
                <Card3D style={{ padding: '32px 28px', display: 'flex', flexDirection: 'column', gap: 16, height: '100%', boxSizing: 'border-box' }} orbColor={t.popular ? 'rgba(167,139,250,0.3)' : `${t.color}33`}>
                  {t.popular && <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translate(-50%, -50%)', padding: '4px 16px', borderRadius: 99, background: 'linear-gradient(90deg, #a78bfa, #7c3aed, #a78bfa)', color: '#fff', fontSize: 11, fontWeight: 900, letterSpacing: 1.5, whiteSpace: 'nowrap', zIndex: 10 }}>MOST POPULAR</div>}
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: t.color, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 6 }}>{t.name}</div>
                    <div style={{ fontSize: 32, fontWeight: 900, color: '#fff', letterSpacing: '-1px' }}>{t.price}</div>
                  </div>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10, flex: 1 }}>
                    {t.features.map(f => (
                      <li key={f} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13, color: 'rgba(255,255,255,0.7)', fontWeight: 600 }}>
                        <FiCheckCircle size={14} color={t.color} style={{ flexShrink: 0 }} /> {f}
                      </li>
                    ))}
                  </ul>
                  <Link href="/subscription" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, padding: '12px', borderRadius: 14, background: t.popular ? 'linear-gradient(90deg, #a78bfa, #7c3aed, #a78bfa)' : `${t.color}18`, border: `1px solid ${t.color}44`, color: t.popular ? '#fff' : t.color, fontWeight: 800, fontSize: 14, textDecoration: 'none', transition: 'opacity 0.2s' }}
                    onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
                    onMouseLeave={e => e.currentTarget.style.opacity = '1'}>
                    {t.price === '₹0' ? 'Get Started Free' : t.price === 'Custom' ? 'Contact Us' : 'Subscribe'} <FiArrowRight size={14} />
                  </Link>
                </Card3D>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FEATURES */}
      <section style={{ padding: '80px 5%', position: 'relative', zIndex: 10 }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <motion.div variants={staggerContainer(0.1, 0.2)} initial="hidden" whileInView="show" viewport={{ once: false, amount: 0.15 }} style={{ marginBottom: 56 }}>
            <motion.div variants={fadeUp} style={{ display: 'inline-block', padding: '5px 14px', borderRadius: 8, background: 'rgba(14,165,233,0.08)', color: ACB, fontSize: 11, fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 16 }}>Architecture</motion.div>
            <motion.h2 variants={textVariant(0)} style={{ fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 900, letterSpacing: '-0.03em' }}>Cloud without compromise.</motion.h2>
          </motion.div>
          <motion.div variants={staggerContainer(0.05, 0.1)} initial="hidden" whileInView="show" viewport={{ once: false, amount: 0.15 }} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 20 }}>
            {features.map((f, i) => (
              <motion.div key={f.title} variants={fadeUp}>
                <Card3D style={{ padding: '32px 28px', height: '100%', boxSizing: 'border-box' }} orbColor="rgba(14,165,233,0.3)">
                  <div style={{ width: 48, height: 48, borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', background: `rgba(14,165,233,0.1)`, color: ACB, marginBottom: 20 }}>{f.icon}</div>
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
            <motion.div variants={fadeUp} style={{ display: 'inline-block', padding: '5px 14px', borderRadius: 8, background: 'rgba(14,165,233,0.08)', color: ACB, fontSize: 11, fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 16 }}>Build History</motion.div>
            <motion.h2 variants={textVariant(0)} style={{ fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 900, letterSpacing: '-0.03em' }}>From zero to live in 12 months.</motion.h2>
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
                      <Card3D style={{ padding: '28px', borderLeft: isLeft ? `3px solid ${AC}` : undefined, borderRight: !isLeft ? `3px solid ${ACB}` : undefined }} orbColor="rgba(14,165,233,0.15)">
                        <div style={{ display: 'flex', gap: 10, marginBottom: 14, alignItems: 'center' }}>
                          <span style={{ padding: '3px 10px', borderRadius: 6, background: `rgba(14,165,233,0.1)`, color: ACB, fontSize: 10, fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase' }}>{item.phase}</span>
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
            <motion.div variants={fadeUp} style={{ display: 'inline-block', padding: '5px 14px', borderRadius: 8, background: 'rgba(14,165,233,0.08)', color: ACB, fontSize: 11, fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 16 }}>Performance</motion.div>
            <motion.h2 variants={textVariant(0)} style={{ fontSize: 'clamp(28px, 3.5vw, 44px)', fontWeight: 900, letterSpacing: '-0.03em', marginBottom: 16 }}>Numbers from production.</motion.h2>
            <motion.p variants={fadeUp} style={{ color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, fontSize: 15 }}>Live metrics from our infrastructure dashboard, averaged over the last 90 days of production traffic.</motion.p>
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

      {/* TESTIMONIAL + ENTERPRISE LINK */}
      <section style={{ padding: '80px 5%', position: 'relative', zIndex: 10 }}>
        <motion.div variants={staggerContainer(0.1, 0.2)} initial="hidden" whileInView="show" viewport={{ once: false, amount: 0.15 }} style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: 24 }}>
          <motion.div variants={fadeUp}>
            <Card3D style={{ padding: '48px 40px', height: '100%', boxSizing: 'border-box' }} orbColor="rgba(14,165,233,0.3)">
              <div style={{ display: 'flex', gap: 3, color: '#fbbf24', marginBottom: 20 }}>
                {[...Array(5)].map((_, j) => <FiStar key={j} fill="currentColor" size={16} />)}
              </div>
              <blockquote style={{ fontSize: 20, fontWeight: 700, lineHeight: 1.6, marginBottom: 24, color: '#fff', fontStyle: 'italic' }}>
                "The seamless handoff between my local RK AI and RexyCore Cloud is genuinely magical. I've never thought about which one is running."
              </blockquote>
              <p style={{ color: ACB, fontWeight: 800, fontSize: 12, letterSpacing: 1, textTransform: 'uppercase' }}>— Elite Subscriber, Bengaluru</p>
            </Card3D>
          </motion.div>
          <motion.div variants={fadeUp}>
            <Card3D style={{ padding: '48px 40px', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 20, height: '100%', boxSizing: 'border-box' }} orbColor="rgba(167,139,250,0.3)">
              <div style={{ fontSize: 13, color: '#a78bfa', fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase' }}>Enterprise</div>
              <h3 style={{ fontSize: 28, fontWeight: 900, letterSpacing: '-0.03em', color: '#fff', marginBottom: 0 }}>Need massive scale?</h3>
              <p style={{ color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, fontSize: 15 }}>Custom storage, unlimited autonomous agents, dedicated compute nodes, and a direct SLA. Our Quantum tier is built for teams and enterprises with serious workloads.</p>
              <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link href="/enterprise" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '13px 26px', borderRadius: 99, background: 'linear-gradient(90deg, #7c3aed, #a78bfa, #7c3aed)', color: '#fff', fontWeight: 800, fontSize: 14, textDecoration: 'none' }}>
                    Enterprise Inquiry <FiArrowRight />
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link href="/subscription" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '13px 26px', borderRadius: 99, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontWeight: 700, fontSize: 14, textDecoration: 'none' }}>
                    See All Tiers
                  </Link>
                </motion.div>
              </div>
            </Card3D>
          </motion.div>
        </motion.div>
      </section>

      {/* CTA */}
      <section style={{ padding: '80px 5% 120px', position: 'relative', zIndex: 10 }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <motion.div variants={staggerContainer(0.1, 0.2)} initial="hidden" whileInView="show" viewport={{ once: false, amount: 0.15 }}>
            <motion.div variants={fadeUp}>
              <Card3D style={{ padding: '60px 48px', display: 'flex', flexWrap: 'wrap', gap: 32, alignItems: 'center', justifyContent: 'space-between' }} orbColor="rgba(14,165,233,0.3)">
                <div style={{ flex: '1 1 320px' }}>
                  <h2 style={{ fontSize: 'clamp(24px, 3.5vw, 38px)', fontWeight: 900, letterSpacing: '-0.03em', marginBottom: 12 }}>Lock your price today.</h2>
                  <p style={{ color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, margin: 0, fontSize: 15 }}>Early subscribers keep their price forever, even after we increase it at public launch. There are limited slots remaining.</p>
                </div>
                <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link href="/subscription" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '15px 30px', borderRadius: 99, background: `linear-gradient(90deg, ${AC}, ${ACB}, ${AC})`, color: '#000', fontWeight: 800, fontSize: 15, textDecoration: 'none' }}>
                      View Matrix Tiers <FiArrowRight />
                    </Link>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link href="/products" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '15px 30px', borderRadius: 99, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontWeight: 700, fontSize: 15, textDecoration: 'none' }}>
                      Back to Products
                    </Link>
                  </motion.div>
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
