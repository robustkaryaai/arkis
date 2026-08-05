'use client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ChatWidget from '@/components/ChatWidget';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { FiArrowRight, FiBookOpen, FiCpu, FiCode, FiAward, FiUsers, FiMonitor, FiCheckCircle, FiStar, FiShield, FiTerminal, FiDatabase, FiGrid, FiChevronDown } from 'react-icons/fi';
import { StarField } from '@/components/SpaceUI';

const AC = '#10b981';
const ACB = '#34d399';

const featuredLearning = [
  { title: 'DinoX', desc: 'Master Python through an immersive RPG experience. Build real skills through 400+ story-driven coding missions. A partnered product with AntVerse.', icon: <FiCode size={22} />, partner: true, link: '/academy/dinox', color: '#a855f7' },
  { title: 'AI Foundations', desc: 'Understand modern AI, LLMs, and neural networks from the ground up — no PhD required.', icon: <FiCpu size={22} />, link: '/academy/paths/ai-foundations', color: AC },
  { title: 'Local AI', desc: 'Learn how to run private AI models on your own hardware and build applications that never call home.', icon: <FiMonitor size={22} />, link: '/academy/paths/local-ai', color: '#3b82f6' },
  { title: 'Linux Essentials', desc: 'Master the operating system that runs the modern web, from shell scripting to kernel architecture.', icon: <FiTerminal size={22} />, link: '/academy/paths/linux-essentials', color: '#f59e0b' },
  { title: 'Privacy Engineering', desc: 'Design systems that protect user data by default. Learn encryption, threat modelling, and zero-telemetry architecture.', icon: <FiShield size={22} />, link: '/academy/paths/privacy-engineering', color: '#ec4899' },
  { title: 'Future Computing', desc: 'Explore edge AI, robotics, and the technologies that will define the next decade of technology.', icon: <FiDatabase size={22} />, link: '/academy/paths/future-computing', color: '#cfe8ff' },
];

const bundles = [
  { name: 'RK AI Student Pack', price: '₹399/mo', oldPrice: '₹599', badge: 'AI + Coding', color: AC, features: ['RK AI PRO Subscription', 'DinoX Unlocked', 'Exclusive Coding Missions', 'Student Community Access'], link: '/payment?plan=pro' },
  { name: 'Neytreya Student Pack', price: '₹299/mo', oldPrice: '₹499', badge: 'Security & Learning', color: '#10b981', features: ['Neytreya Pro', 'DinoX Unlocked', 'Privacy Engineering Path', 'Beta Developer Programs'], link: '/products/neytreya' },
  { name: 'Ultimate Ecosystem Pack', price: '₹999/mo', oldPrice: '₹1499', badge: 'Best Value', color: '#3b82f6', featured: true, features: ['RK AI ELITE Subscription', 'Neytreya Pro', 'DinoX Unlocked', 'Future Certifications', 'Priority Support'], link: '/payment?plan=elite' },
];

const faqs = [
  { q: 'Is DinoX a RexyCore product?', a: 'No, DinoX is an independent partner product. It is our recommended platform for learning Python through an engaging RPG adventure, and we feature it in our Academy bundles.' },
  { q: 'How do Student Bundles work?', a: 'Student bundles combine premium partner experiences (like DinoX) with RexyCore products (like RK AI) at massive educational discounts to give you the ultimate learning ecosystem.' },
  { q: 'Can I use RK AI without DinoX?', a: 'Absolutely. RK AI is a standalone desktop AI assistant. DinoX is simply the learning platform we recommend to help you master programming.' },
  { q: 'Can I buy DinoX separately?', a: 'Yes, you can purchase DinoX directly. However, our Academy bundles offer the highest value by packaging it alongside RK AI and Neytreya.' },
];

export default function AcademyPage() {
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <div style={{ background: 'var(--void)', color: '#fff', minHeight: '100vh', overflowX: 'hidden', position: 'relative' }}>
      <StarField />
      <div className="noise" aria-hidden />
      <Navbar />

      {/* HERO */}
      <section style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', padding: '140px 5% 80px', position: 'relative', zIndex: 10 }}>
        <div style={{ maxWidth: '1100px', width: '100%', margin: '0 auto' }}>
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }} style={{ textAlign: 'center' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 16px', borderRadius: 99, background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.25)', color: ACB, fontSize: 12, fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 28 }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: AC, boxShadow: `0 0 10px ${AC}` }} /> RexyCore Academy
            </div>
            <h1 style={{ fontSize: 'clamp(52px, 8vw, 96px)', fontWeight: 900, lineHeight: 1.0, letterSpacing: '-0.05em', marginBottom: 28 }}>
              The real future<br />
              <span className="flow-text flow-text--emerald" style={{ fontSize: 'inherit', fontWeight: 'inherit', letterSpacing: 'inherit', lineHeight: 'inherit' }}>
                building blocks.
              </span>
            </h1>
            <p style={{ maxWidth: 680, margin: '0 auto 48px', fontSize: 19, color: 'rgba(255,255,255,0.55)', lineHeight: 1.7 }}>
              Learn the technologies shaping tomorrow — from programming and AI to privacy-first computing — with carefully curated paths, partner products, and exclusive student benefits.
            </p>
            <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
              <button onClick={() => document.getElementById('featured').scrollIntoView({ behavior: 'smooth' })} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '15px 30px', borderRadius: 99, background: '#fff', color: '#000', fontWeight: 800, fontSize: 15, border: 'none', cursor: 'pointer', boxShadow: '0 8px 32px rgba(255,255,255,0.25)' }}>
                Explore Learning <FiArrowRight />
              </button>
              <button onClick={() => document.getElementById('bundles').scrollIntoView({ behavior: 'smooth' })} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '15px 30px', borderRadius: 99, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontWeight: 700, fontSize: 15, cursor: 'pointer' }}>
                <FiAward /> Student Programs
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FEATURED LEARNING */}
      <section id="featured" style={{ padding: '80px 5%', position: 'relative', zIndex: 10 }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, amount: 0.15 }} style={{ marginBottom: 56 }}>
            <div style={{ display: 'inline-block', padding: '5px 14px', borderRadius: 8, background: 'rgba(16,185,129,0.08)', color: ACB, fontSize: 11, fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 16 }}>Curriculum</div>
            <h2 style={{ fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 900, letterSpacing: '-0.03em' }}>Featured learning paths.</h2>
          </motion.div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 20 }}>
            {featuredLearning.map((item, i) => (
              <motion.div key={item.title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, amount: 0.15 }} transition={{ delay: i * 0.07 }}>
                <Link href={item.link} style={{ display: 'flex', flexDirection: 'column', gap: 16, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 24, padding: '32px 28px', textDecoration: 'none', height: '100%', boxSizing: 'border-box', transition: 'background 0.2s, border-color 0.2s' }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.borderColor = `${item.color}33`; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.02)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'; }}>
                  <div style={{ width: 52, height: 52, borderRadius: 14, background: `${item.color}15`, border: `1px solid ${item.color}33`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: item.color }}>{item.icon}</div>
                  {item.partner && <span style={{ display: 'inline-block', padding: '3px 10px', background: 'rgba(168,85,247,0.1)', color: '#a855f7', fontSize: 10, fontWeight: 800, letterSpacing: 1.5, borderRadius: 6, textTransform: 'uppercase', border: '1px solid rgba(168,85,247,0.2)', alignSelf: 'flex-start' }}>AntVerse Partner</span>}
                  <div>
                    <div style={{ fontSize: 18, fontWeight: 800, color: '#fff', marginBottom: 8 }}>{item.title}</div>
                    <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', lineHeight: 1.65, margin: 0 }}>{item.desc}</p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: item.color, fontSize: 14, fontWeight: 700, marginTop: 'auto' }}>
                    {item.partner ? 'Visit Partner' : 'Start Path'} <FiArrowRight size={14} />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* DINOX PARTNER + BUNDLES */}
      <section id="bundles" style={{ padding: '80px 5%', position: 'relative', zIndex: 10 }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, amount: 0.15 }}
            style={{ background: 'rgba(16,185,129,0.03)', border: '1px solid rgba(16,185,129,0.12)', borderRadius: 32, padding: '60px 48px', display: 'flex', flexWrap: 'wrap', gap: 48, alignItems: 'stretch', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 0, right: 0, width: 400, height: 400, background: 'radial-gradient(circle, rgba(16,185,129,0.06), transparent 70%)', pointerEvents: 'none' }} />
            {/* DinoX info */}
            <div style={{ flex: '1 1 400px', display: 'flex', flexDirection: 'column', position: 'relative', zIndex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
                <img src="/dinox.png" alt="DinoX Logo" style={{ width: 60, filter: 'drop-shadow(0 10px 20px rgba(16,185,129,0.5))' }} />
                <span style={{ padding: '6px 16px', background: 'rgba(16,185,129,0.1)', color: '#34d399', fontSize: 11, fontWeight: 800, letterSpacing: 1, borderRadius: 99, border: '1px solid rgba(16,185,129,0.25)', textTransform: 'uppercase' }}>Featured Learning Partner</span>
              </div>
              <h2 style={{ fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 900, marginBottom: 16, letterSpacing: '-0.03em' }}>DinoX</h2>
              <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: 17, lineHeight: 1.7, marginBottom: 32 }}>DinoX is our recommended platform for mastering Python through an engaging RPG adventure. Learn by playing, coding, and conquering 400+ real missions.</p>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 36px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                {['Python 3', '400+ Missions', 'XP Progression', 'RPG Learning', 'Offline Mode', 'Desktop App'].map(f => (
                  <li key={f} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, fontWeight: 600, color: 'rgba(255,255,255,0.75)' }}>
                    <FiCheckCircle color="#10b981" size={16} /> {f}
                  </li>
                ))}
              </ul>
              <Link href="/academy/dinox" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 28px', borderRadius: 99, background: 'linear-gradient(90deg, #10b981, #059669, #10b981)', color: '#fff', fontWeight: 800, fontSize: 15, textDecoration: 'none', alignSelf: 'flex-start', boxShadow: '0 8px 32px rgba(16,185,129,0.35)' }}>
                Learn More About DinoX <FiArrowRight />
              </Link>
            </div>
            {/* Bundle cards */}
            <div style={{ flex: '1 1 320px', position: 'relative', zIndex: 1 }}>
              <div style={{ fontSize: 18, fontWeight: 800, marginBottom: 20, color: '#fff' }}>Student Bundles</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {bundles.map((b) => (
                  <motion.div whileHover={{ scale: 1.03, y: -4, boxShadow: '0 15px 35px rgba(0,0,0,0.5)' }} transition={{ type: 'spring', stiffness: 300, damping: 20 }} key={b.name} style={{ background: b.featured ? `rgba(59,130,246,0.06)` : 'rgba(0,0,0,0.4)', border: `1px solid ${b.featured ? 'rgba(59,130,246,0.3)' : 'rgba(255,255,255,0.06)'}`, borderRadius: 20, padding: '24px', position: 'relative', overflow: 'hidden' }}>
                    {b.featured && <div style={{ position: 'absolute', top: 0, right: 0, background: '#3b82f6', color: '#fff', fontSize: 9, fontWeight: 900, padding: '4px 14px', borderBottomLeftRadius: 12, letterSpacing: 1 }}>BEST VALUE</div>}
                    <div style={{ fontSize: 10, color: b.color, fontWeight: 800, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 4 }}>{b.badge}</div>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 12 }}>
                      <span style={{ fontSize: 20, fontWeight: 900, color: '#fff' }}>{b.price}</span>
                      <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.3)', textDecoration: 'line-through' }}>{b.oldPrice}</span>
                    </div>
                    <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 16px', display: 'flex', flexDirection: 'column', gap: 6 }}>
                      {b.features.map(f => (
                        <li key={f} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'rgba(255,255,255,0.6)' }}>
                          <FiCheckCircle size={13} color={b.color} /> {f}
                        </li>
                      ))}
                    </ul>
                    <Link href={b.link} style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '100%', padding: '10px', borderRadius: 12, background: b.featured ? 'linear-gradient(90deg, #34d399, #3b82f6, #34d399)' : 'rgba(255,255,255,0.06)', color: '#fff', fontWeight: 700, fontSize: 14, textDecoration: 'none', boxSizing: 'border-box' }}>
                      Claim Bundle
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* LEARNING PATHS + CERTS */}
      <section style={{ padding: '80px 5%', position: 'relative', zIndex: 10 }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 40 }}>
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: false, amount: 0.15 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
              <div style={{ width: 40, height: 40, borderRadius: 12, background: 'rgba(59,130,246,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#3b82f6' }}><FiGrid size={20} /></div>
              <div style={{ fontSize: 22, fontWeight: 800 }}>Learning Paths</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[{ name: 'Programming (Python, C++, Rust)', slug: 'programming', color: '#f59e0b' }, { name: 'Artificial Intelligence', slug: 'ai-foundations', color: AC }, { name: 'Privacy & Security', slug: 'privacy-engineering', color: '#ec4899' }, { name: 'Future Computing', slug: 'future-computing', color: '#cfe8ff' }].map(path => (
                <Link href={`/academy/paths/${path.slug}`} key={path.name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '18px 22px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 16, textDecoration: 'none', transition: 'background 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.04)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.02)'}>
                  <span style={{ fontWeight: 600, color: 'rgba(255,255,255,0.8)', fontSize: 14 }}>{path.name}</span>
                  <FiArrowRight color={path.color} size={16} />
                </Link>
              ))}
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: false, amount: 0.15 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
              <div style={{ width: 40, height: 40, borderRadius: 12, background: 'rgba(168,85,247,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#a855f7' }}><FiAward size={20} /></div>
              <div style={{ fontSize: 22, fontWeight: 800 }}>Certifications</div>
              <span style={{ padding: '3px 8px', background: 'rgba(255,255,255,0.08)', borderRadius: 6, fontSize: 9, fontWeight: 800, letterSpacing: 1.5, color: 'rgba(255,255,255,0.4)' }}>COMING SOON</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {['Python Foundations', 'AI Foundations', 'Privacy First Computing', 'Edge AI'].map(cert => (
                <div key={cert} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 22px', background: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.04)', borderRadius: 14, opacity: 0.5 }}>
                  <span style={{ fontWeight: 600, fontSize: 14 }}>{cert}</span>
                  <FiAward color="rgba(255,255,255,0.3)" size={16} />
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* COMMUNITY */}
      <section style={{ padding: '80px 5%', position: 'relative', zIndex: 10 }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, amount: 0.15 }}
            style={{ background: 'linear-gradient(90deg, rgba(59, 130, 246, 0.05, 246, 130, rgba(59), rgba(16,185,129,0.05))', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 32, padding: '60px', textAlign: 'center' }}>
            <FiUsers size={40} color={AC} style={{ marginBottom: 24 }} />
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 900, letterSpacing: '-0.03em', marginBottom: 16 }}>Join the Academy Community</h2>
            <p style={{ color: 'rgba(255,255,255,0.5)', maxWidth: 600, margin: '0 auto 40px', fontSize: 16, lineHeight: 1.7 }}>
              Connect with thousands of students, participate in hackathons, share projects, and grow together.
            </p>
            <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 56 }}>
              {['Student Discord', 'Hackathons', 'Leaderboards', 'Challenges'].map(c => (
                <div key={c} style={{ padding: '10px 20px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 99, fontSize: 14, fontWeight: 700, color: 'rgba(255,255,255,0.8)' }}>{c}</div>
              ))}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20, textAlign: 'left' }}>
              {[
                { name: 'Arjun K.', role: 'Computer Science Student', text: 'The Creator Bundle completely changed how I learn. Playing DinoX while using RK AI to understand complex algorithms is literally the future of education.' },
                { name: 'Sarah M.', role: 'Self-taught Developer', text: 'Finally, a platform that teaches real-world AI and privacy-first computing instead of just generic web dev tutorials. The quality is unmatched.' }
              ].map((t, i) => (
                <div key={i} style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 24, padding: '32px' }}>
                  <div style={{ display: 'flex', gap: 3, color: '#fbbf24', marginBottom: 16 }}>
                    {[...Array(5)].map((_, j) => <FiStar key={j} fill="currentColor" size={14} />)}
                  </div>
                  <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 15, lineHeight: 1.7, fontStyle: 'italic', marginBottom: 20 }}>"{t.text}"</p>
                  <div style={{ fontWeight: 800, fontSize: 14 }}>{t.name}</div>
                  <div style={{ color: 'rgba(255,255,255,0.35)', fontSize: 12 }}>{t.role}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: '80px 5% 120px', position: 'relative', zIndex: 10 }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: false, amount: 0.15 }} style={{ textAlign: 'center', marginBottom: 48 }}>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 900, letterSpacing: '-0.03em' }}>Frequently asked questions.</h2>
          </motion.div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {faqs.map((faq, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, amount: 0.15 }} transition={{ delay: i * 0.07 }}
                style={{ background: 'rgba(255,255,255,0.02)', border: `1px solid ${openFaq === i ? 'rgba(16,185,129,0.25)' : 'rgba(255,255,255,0.06)'}`, borderRadius: 18, overflow: 'hidden', transition: 'border-color 0.2s' }}>
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{ width: '100%', padding: '22px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'none', border: 'none', color: '#fff', cursor: 'pointer', textAlign: 'left' }}>
                  <span style={{ fontSize: 16, fontWeight: 700 }}>{faq.q}</span>
                  <FiChevronDown size={20} color={ACB} style={{ transform: openFaq === i ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s', flexShrink: 0 }} />
                </button>
                {openFaq === i && (
                  <div style={{ padding: '0 24px 22px', color: 'rgba(255,255,255,0.5)', fontSize: 15, lineHeight: 1.7 }}>{faq.a}</div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <ChatWidget />
    </div>
  );
}
