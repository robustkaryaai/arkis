'use client';
import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import ChatWidget from '@/components/ChatWidget';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { FiArrowRight, FiShield, FiCpu, FiUsers, FiLock, FiGlobe, FiZap } from 'react-icons/fi';
import { motion } from 'framer-motion';

const PRODUCTS = [
  { name: 'RK AI Desktop', color: '#3B82F6', desc: 'The flagship AI layer for Windows & macOS. Local model execution, system-wide automation, and privacy-first intelligence.', href: '/products/rk-ai-desktop' },
  { name: 'RK AI Home', color: '#ec4899', desc: 'Hardware-integrated ambient intelligence. Edge voice processing, offline-first smart home orchestration for families.', href: '/products/rk-ai-home' },
  { name: 'Lumina OS', color: '#cfe8ff', desc: 'A next-generation, AI-native operating system built from scratch on Linux. Zero telemetry. Wayland native.', href: '/products/lumina-os' },
  { name: 'Light Key', color: '#f59e0b', desc: 'An intelligent system-level keyboard layer that completes your thoughts locally in every app you use.', href: '/products/light-key' },
  { name: 'MALUS', color: '#10b981', desc: 'Context-aware ambient companion that sees your screen and understands your work — entirely on-device.', href: '/products/malus' },
];

const VALUES = [
  { icon: <FiLock size={24} />, title: 'Privacy is the Default', desc: 'Every Rexycore product is engineered so that your data never leaves your hardware without your explicit, informed action. We do not offer a "privacy mode" — privacy is the only mode.' },
  { icon: <FiCpu size={24} />, title: 'Local-First Intelligence', desc: 'We believe that powerful AI should not require handing your data to a corporation. Every model we deploy runs on your hardware, under your control, at your pace.' },
  { icon: <FiShield size={24} />, title: 'Zero Telemetry', desc: 'Our products contain no background analytics, no usage logging, and no crash reporting that reaches our servers without your knowledge. We simply do not collect what we do not need.' },
  { icon: <FiZap size={24} />, title: 'Uncompromising Performance', desc: 'Privacy-first does not mean slow. Our engineering teams are obsessed with squeezing maximum performance out of on-device models so you never feel the tradeoff.' },
  { icon: <FiGlobe size={24} />, title: 'Built in India, for the World', desc: 'Rexycore is proudly built in India. Our team understands the unique needs of users across different economic and linguistic contexts, and we build for all of them.' },
  { icon: <FiUsers size={24} />, title: 'Ecosystem Thinking', desc: 'Each Rexycore product is more powerful alongside the others. We design every layer of our ecosystem to communicate seamlessly, creating a whole that is greater than its parts.' },
];

export default function About() {
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('active'); });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div style={{ background: 'var(--void)', color: '#fff', minHeight: '100vh', overflowX: 'hidden', position: 'relative' }}>
      <div className="noise" aria-hidden />
      <div className="nebula" aria-hidden>
        <div className="nebula__orb nebula__orb--1" />
        <div className="nebula__orb nebula__orb--2" />
        <div className="nebula__orb nebula__orb--3" />
        <div className="nebula__orb nebula__orb--4" />
      </div>
      <Navbar />

      {/* HERO */}
      <section style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', padding: '140px 5% 80px', position: 'relative', zIndex: 10 }}>
        <div style={{ maxWidth: '1100px', width: '100%', margin: '0 auto' }}>
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 16px', borderRadius: 99, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontSize: 12, fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 28 }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#7c3aed', boxShadow: '0 0 10px #7c3aed' }} /> Rexycore — Our Vision
            </div>
            <h1 style={{ fontSize: 'clamp(52px, 8vw, 96px)', fontWeight: 900, lineHeight: 1.0, letterSpacing: '-0.05em', marginBottom: 32 }}>
              Built for<br />
              <span className="flow-text flow-text--purple" style={{ fontSize: 'inherit', fontWeight: 'inherit', letterSpacing: 'inherit', lineHeight: 'inherit' }}>
                everyone.
              </span>
            </h1>
            <p style={{ maxWidth: 700, fontSize: 20, color: 'rgba(255,255,255,0.6)', lineHeight: 1.7, marginBottom: 48 }}>
              Rexycore is a technology company dedicated to building the intelligent systems of the future — from specialized AI assistants to native operating systems. Our mission is to prove that privacy and intelligence are not a tradeoff.
            </p>
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              <Link href="/products" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '15px 30px', borderRadius: 99, background: 'linear-gradient(135deg, #7C3AED, #3B82F6)', color: '#fff', fontWeight: 800, fontSize: 15, textDecoration: 'none' }}>
                Explore Products <FiArrowRight />
              </Link>
              <Link href="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '15px 30px', borderRadius: 99, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontWeight: 700, fontSize: 15, textDecoration: 'none' }}>
                Get in Touch
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* MISSION STATEMENT */}
      <section style={{ padding: '100px 5%', position: 'relative', zIndex: 10 }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: 64, alignItems: 'start' }}>
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div style={{ display: 'inline-block', padding: '5px 14px', borderRadius: 8, background: 'rgba(255,255,255,0.05)', color: '#a78bfa', fontSize: 11, fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 20 }}>Mission</div>
              <h2 style={{ fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 900, letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: 24 }}>AI that respects you.</h2>
              <p style={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.8, fontSize: 17, marginBottom: 20 }}>
                At the core of our philosophy is the belief that the future of AI is local. By shifting processing power from the cloud back to the edge, we enable experiences that are fast, private, and entirely under your control.
              </p>
              <p style={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.8, fontSize: 17 }}>
                We are not just building tools; we are designing an ecosystem. Every product we create is a pillar in a new standard of computing — one where privacy is the default, ownership is real, and innovation is relentless.
              </p>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div style={{ display: 'inline-block', padding: '5px 14px', borderRadius: 8, background: 'rgba(255,255,255,0.05)', color: '#67e8f9', fontSize: 11, fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 20 }}>By The Numbers</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                {[
                  { value: '5+', label: 'Products in the ecosystem' },
                  { value: '14 months', label: 'Lumina OS engineering timeline' },
                  { value: '0 bytes', label: 'Data sent to our servers by default' },
                  { value: '100%', label: 'Bootstrapped & independent' },
                ].map((s, i) => (
                  <div key={s.label} style={{ display: 'flex', gap: 20, alignItems: 'center', padding: '20px 24px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 16 }}>
                    <div style={{ fontSize: 32, fontWeight: 900, letterSpacing: '-1px', color: '#fff', minWidth: 80 }}>{s.value}</div>
                    <div style={{ fontSize: 15, color: 'rgba(255,255,255,0.5)', fontWeight: 600 }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section style={{ padding: '100px 5%', position: 'relative', zIndex: 10 }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ marginBottom: 60 }}>
            <div style={{ display: 'inline-block', padding: '5px 14px', borderRadius: 8, background: 'rgba(255,255,255,0.05)', color: '#a78bfa', fontSize: 11, fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 16 }}>Core Values</div>
            <h2 style={{ fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 900, letterSpacing: '-0.03em', lineHeight: 1.1 }}>What we believe.</h2>
          </motion.div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 20 }}>
            {VALUES.map((v, i) => (
              <motion.div key={v.title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 24, padding: '32px 28px' }}>
                <div style={{ width: 52, height: 52, borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(124,58,237,0.1)', color: '#a78bfa', marginBottom: 20 }}>{v.icon}</div>
                <h3 style={{ fontSize: 18, fontWeight: 800, marginBottom: 10, color: '#fff' }}>{v.title}</h3>
                <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, margin: 0 }}>{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ECOSYSTEM */}
      <section style={{ padding: '100px 5%', position: 'relative', zIndex: 10 }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: 'center', marginBottom: 60 }}>
            <div style={{ display: 'inline-block', padding: '5px 14px', borderRadius: 8, background: 'rgba(255,255,255,0.05)', color: '#67e8f9', fontSize: 11, fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 16 }}>The Ecosystem</div>
            <h2 style={{ fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 900, letterSpacing: '-0.03em' }}>Five pillars. One vision.</h2>
          </motion.div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {PRODUCTS.map((p, i) => (
              <motion.div key={p.name} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                <Link href={p.href} style={{ display: 'flex', alignItems: 'center', gap: 24, padding: '28px 32px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 20, textDecoration: 'none', transition: 'background 0.2s, border-color 0.2s' }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.borderColor = `${p.color}33`; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.02)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)'; }}>
                  <div style={{ width: 12, height: 12, borderRadius: '50%', background: p.color, boxShadow: `0 0 16px ${p.color}88`, flexShrink: 0 }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 17, fontWeight: 800, color: '#fff', marginBottom: 4 }}>{p.name}</div>
                    <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.45)' }}>{p.desc}</div>
                  </div>
                  <FiArrowRight color={p.color} size={20} style={{ flexShrink: 0 }} />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '80px 5% 120px', position: 'relative', zIndex: 10 }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.08), rgba(59,130,246,0.08))', border: '1px solid rgba(124,58,237,0.2)', borderRadius: 32, padding: '60px', textAlign: 'center' }}>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 900, letterSpacing: '-0.03em', marginBottom: 16 }}>Join the ecosystem.</h2>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 17, lineHeight: 1.7, maxWidth: 600, margin: '0 auto 40px' }}>Be part of the future of intelligent computing — private, powerful, and entirely yours.</p>
            <Link href="/products" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '16px 36px', borderRadius: 99, background: 'linear-gradient(135deg, #7C3AED, #3B82F6)', color: '#fff', fontWeight: 800, fontSize: 16, textDecoration: 'none' }}>
              Explore Rexycore Products <FiArrowRight />
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
      <ChatWidget />
    </div>
  );
}
