'use client';
import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import ChatWidget from '@/components/ChatWidget';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { FiArrowRight, FiShield, FiCpu, FiUsers, FiLock, FiGlobe, FiZap } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { StarField, Card3D, SectionHeader, staggerContainer, textVariant, fadeUp, fadeRight } from '@/components/SpaceUI';

const PRODUCTS = [
  { name: 'RK AI Desktop', color: '#a5b4fc', desc: 'A personal desktop AI assistant for documents, coding, writing, research, and everyday tasks.', href: '/products/rk-ai-desktop' },
  { name: 'RK AI Home', color: '#f9a8d4', desc: 'A home AI companion that brings natural voice interaction beyond the desktop.', href: '/products/rk-ai-home' },
  { name: 'Lumina OS', color: '#7dd3fc', desc: 'A long-term operating-system project in development, designed around privacy, transparency, and AI.', href: '/products/lumina-os' },
  { name: 'Light Key', color: '#fcd34d', desc: 'An intelligent keyboard for context-aware writing assistance across applications.', href: '/products/light-key' },
  { name: 'MALUS', color: '#6ee7b7', desc: 'A local system intelligence layer that observes hardware, applications, workflows, and system behaviour.', href: '/products/malus' },
];

const VALUES = [
  { icon: <FiLock size={22} />, title: 'Privacy with control', desc: 'Cloud services are never used silently. When a request needs them, the user stays informed and in control of what is shared.', c: '#a5b4fc' },
  { icon: <FiCpu size={22} />, title: 'Local-first intelligence', desc: 'Whenever practical, work happens on your hardware. Cloud services extend capability when online information or more computing power is genuinely needed.', c: '#7dd3fc' },
  { icon: <FiShield size={22} />, title: 'Clear engineering', desc: 'We explain the decisions behind our products plainly, with a focus on useful software rather than inflated promises.', c: '#6ee7b7' },
  { icon: <FiZap size={22} />, title: 'Useful by design', desc: 'Performance, usability, and privacy belong together. The goal is software that earns a place in everyday life.', c: '#fcd34d' },
  { icon: <FiGlobe size={22} />, title: 'Built in India, for the World', desc: 'Rexycore is proudly built in India. Our team understands the unique needs of users across different economic and linguistic contexts, and we build for all of them.', c: '#f9a8d4' },
  { icon: <FiUsers size={22} />, title: 'Useful together', desc: 'Every product remains useful independently. When appropriate, products can share context to create a more considered experience.', c: '#a5b4fc' },
];

export default function About() {
  return (
    <div style={{ background: '#010104', color: '#fff', minHeight: '100vh', overflowX: 'hidden', position: 'relative' }}>
      <StarField />
      <div className="noise" aria-hidden />
      <Navbar />

      {/* ── HERO ── */}
      <section style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', padding: '140px 5% 80px', position: 'relative', zIndex: 10 }}>
        <div style={{ maxWidth: 1100, width: '100%', margin: '0 auto' }}>
          <motion.div variants={staggerContainer(0.12, 0.1)} initial="hidden" animate="show">
            <motion.div variants={fadeUp(0)} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 18px', borderRadius: 99, border: '1px solid rgba(165,180,252,0.2)', background: 'rgba(165,180,252,0.05)', backdropFilter: 'blur(20px)', marginBottom: 36 }}>
              <motion.span animate={{ opacity: [1, 0.3, 1] }} transition={{ repeat: Infinity, duration: 2 }} style={{ width: 6, height: 6, borderRadius: '50%', background: '#a5b4fc', boxShadow: '0 0 8px #a5b4fc' }} />
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, color: 'rgba(255,255,255,0.55)', textTransform: 'uppercase' }}>Rexycore — Our Vision</span>
            </motion.div>
            <motion.h1 variants={textVariant(0.1)} style={{ fontSize: 'clamp(52px, 8vw, 96px)', fontWeight: 900, lineHeight: 1.0, letterSpacing: '-0.055em', marginBottom: 32 }}>
              Built for<br />
              <span style={{ background: 'linear-gradient(90deg, #a5b4fc, #7dd3fc, #6ee7b7, #7dd3fc, #a5b4fc)', WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>everyone.</span>
            </motion.h1>
            <motion.p variants={fadeUp(0.3)} style={{ maxWidth: 680, fontSize: 20, color: 'rgba(255,255,255,0.4)', lineHeight: 1.75, marginBottom: 48 }}>
              RexyCore is a software company building privacy-first AI products. We believe modern AI should adapt to people instead of forcing people to adapt to AI.
            </motion.p>
            <motion.div variants={fadeUp(0.4)} style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
              <motion.div whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.97 }} style={{ display: 'inline-block' }}>
                <Link href="/products" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 30px', borderRadius: 99, background: '#fff', color: '#000', fontWeight: 800, fontSize: 15, textDecoration: 'none' }}>
                  Explore Products <FiArrowRight />
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.97 }} style={{ display: 'inline-block' }}>
                <Link href="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '13px 28px', borderRadius: 99, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.12)', color: '#fff', fontWeight: 700, fontSize: 15, textDecoration: 'none' }}>
                  Get in Touch
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Divider */}
      <div style={{ padding: '0 5%', marginBottom: 80, position: 'relative', zIndex: 10 }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', height: 1, background: 'linear-gradient(90deg, transparent, rgba(165, 180, 252, 0.2, 252, 180, rgba(165, transparent) 50%, transparent 100%)' }} />
      </div>

      {/* ── MISSION ── */}
      <section style={{ padding: '0 5% 100px', position: 'relative', zIndex: 10 }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', gap: 64, alignItems: 'start' }}>
          <motion.div variants={staggerContainer(0.12, 0.1)} initial="hidden" whileInView="show" viewport={{ once: false, amount: 0.2 }}>
            <motion.p variants={textVariant(0)} style={{ fontSize: 11, fontWeight: 800, letterSpacing: 3, color: 'rgba(165,180,252,0.6)', textTransform: 'uppercase', marginBottom: 16 }}>Mission</motion.p>
            <motion.h2 variants={textVariant(0.1)} style={{ fontSize: 'clamp(30px, 4vw, 50px)', fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1.1, marginBottom: 24 }}>AI that respects you.</motion.h2>
            <motion.p variants={fadeUp(0.2)} style={{ color: 'rgba(255,255,255,0.45)', lineHeight: 1.82, fontSize: 17, marginBottom: 20 }}>
              We prefer local execution whenever it makes sense, so the computer in front of you can do more of the work. When a task needs online capabilities or exceeds local hardware, cloud services can extend the product—with your permission.
            </motion.p>
            <motion.p variants={fadeUp(0.3)} style={{ color: 'rgba(255,255,255,0.45)', lineHeight: 1.82, fontSize: 17 }}>
              We build focused tools with clear responsibilities. They should feel natural to use on their own and work together thoughtfully when that improves the experience.
            </motion.p>
          </motion.div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {[
              { value: '01', label: 'AI should adapt to people', c: '#a5b4fc' },
              { value: '02', label: 'Local execution when practical', c: '#7dd3fc' },
              { value: '03', label: 'Clear responsibilities per product', c: '#6ee7b7' },
              { value: '04', label: 'Users remain in control', c: '#fcd34d' },
            ].map((s, i) => (
              <motion.div key={s.label} initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: false, amount: 0.15 }} transition={{ duration: 0.5, delay: i * 0.08 }}
                style={{ display: 'flex', gap: 20, alignItems: 'center', padding: '20px 24px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 16 }}>
                <div style={{ fontSize: 30, fontWeight: 900, letterSpacing: '-1px', color: s.c, minWidth: 90 }}>{s.value}</div>
                <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.4)', fontWeight: 600 }}>{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── VALUES ── */}
      <section style={{ padding: '0 5% 100px', position: 'relative', zIndex: 10 }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <SectionHeader label="Core Values" title="What we believe." sub="The principles that guide every engineering decision, product launch, and design choice we make." />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 18 }}>
            {VALUES.map((v, i) => (
              <Card3D key={v.title} delay={(i % 3) * 0.08} orbColor={`${v.c}20`} style={{ padding: '30px 26px' }}>
                <div style={{ width: 48, height: 48, borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', background: `${v.c}12`, color: v.c, marginBottom: 20 }}>{v.icon}</div>
                <h3 style={{ fontSize: 17, fontWeight: 800, marginBottom: 10 }}>{v.title}</h3>
                <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', lineHeight: 1.75 }}>{v.desc}</p>
              </Card3D>
            ))}
          </div>
        </div>
      </section>

      {/* ── ECOSYSTEM ── */}
      <section style={{ padding: '0 5% 100px', position: 'relative', zIndex: 10 }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <SectionHeader label="The products" title="Focused tools. Shared direction." sub="Each product has a clear role and remains useful on its own. Together, they support a more personal kind of computing." align="center" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {PRODUCTS.map((p, i) => (
              <motion.div key={p.name} initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: false, amount: 0.15 }} transition={{ duration: 0.55, delay: i * 0.07 }}>
                <Link href={p.href} style={{ display: 'flex', alignItems: 'center', gap: 20, padding: '24px 28px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 18, textDecoration: 'none', transition: 'background 0.25s, border-color 0.25s' }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.borderColor = `${p.color}30`; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.02)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)'; }}>
                  <div style={{ width: 10, height: 10, borderRadius: '50%', background: p.color, boxShadow: `0 0 12px ${p.color}80`, flexShrink: 0 }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 16, fontWeight: 800, color: '#fff', marginBottom: 3 }}>{p.name}</div>
                    <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.38)' }}>{p.desc}</div>
                  </div>
                  <FiArrowRight color={p.color} size={18} style={{ flexShrink: 0 }} />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ padding: '0 5% 140px', position: 'relative', zIndex: 10 }}>
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, amount: 0.15 }}
          style={{ maxWidth: 760, margin: '0 auto', background: 'rgba(255,255,255,0.012)', border: '1px solid rgba(165,180,252,0.15)', borderRadius: 28, padding: '60px 5%', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: -80, left: '50%', transform: 'translateX(-50%)', width: '80%', height: 160, background: 'radial-gradient(ellipse, rgba(165,180,252,0.08) 0%, transparent 70%)', filter: 'blur(40px)' }} />
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 900, letterSpacing: '-0.04em', marginBottom: 16, position: 'relative' }}>A more personal future for AI.</h2>
          <p style={{ color: 'rgba(255,255,255,0.38)', fontSize: 17, lineHeight: 1.7, maxWidth: 500, margin: '0 auto 36px', position: 'relative' }}>Explore the products and the thinking behind software that works closer to the people who use it.</p>
          <motion.div whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.97 }} style={{ display: 'inline-block' }}>
            <Link href="/products" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 32px', borderRadius: 99, background: '#fff', color: '#000', fontWeight: 800, fontSize: 15, textDecoration: 'none' }}>
              Explore Rexycore Products <FiArrowRight />
            </Link>
          </motion.div>
        </motion.div>
      </section>

      <div style={{ position: 'relative', zIndex: 10 }}><Footer /></div>
      <ChatWidget />
    </div>
  );
}
