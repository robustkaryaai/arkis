'use client';
import { useRef, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ChatWidget from '@/components/ChatWidget';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { FiHome, FiWifiOff, FiCpu, FiSettings, FiShoppingCart, FiCheckCircle } from 'react-icons/fi';
import Image from 'next/image';

/* ── BENTO CARD WITH CURSOR TRACKING ─────────────────────────── */
function FeatureCard({ feature, index }) {
  const ref = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['7deg', '-7deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-7deg', '7deg']);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
    setMousePosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleMouseLeave = () => { setIsHovered(false); x.set(0); y.set(0); };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove} onMouseEnter={() => setIsHovered(true)} onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d', perspective: '1000px' }}
      className={`bento-cell bento-cell--${feature.size || 'narrow'}`}
    >
      <motion.div
        animate={{ opacity: isHovered ? 1 : 0 }} transition={{ duration: 0.3 }}
        style={{
          position: 'absolute', top: mousePosition.y - 150, left: mousePosition.x - 150,
          width: 300, height: 300,
          background: `radial-gradient(circle, rgba(236,72,153,0.3) 0%, transparent 70%)`,
          filter: 'blur(40px)', pointerEvents: 'none', zIndex: 0,
        }}
      />
      <div style={{ position: 'relative', zIndex: 10, transform: 'translateZ(30px)' }}>
        <div style={{
          width: 44, height: 44, borderRadius: 12,
          display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, marginBottom: 24,
          background: 'rgba(236,72,153,0.15)', color: '#f472b6'
        }}>
          {feature.icon}
        </div>
        <h3 className="bento-title">{feature.title}</h3>
        <p className="bento-desc">{feature.desc}</p>
      </div>
    </motion.div>
  );
}

const FEATURES = [
  { size: 'wide', icon: <FiWifiOff />, title: '100+ Offline Commands.', desc: 'Your home doesn\'t stop when the internet drops. RK AI Home executes over 100 native voice commands completely offline using Edge processing.' },
  { size: 'narrow', icon: <FiCpu />, title: 'Pi Zero Optimized', desc: 'Built to run on just 512MB of RAM. The software is infinitely efficient, proving intelligence doesn\'t require a supercomputer.' },
  { size: 'half', icon: <FiHome />, title: 'Smart Intent Routing', desc: 'Our custom intent_classifier.py ensures that local commands stay local, while complex queries are seamlessly routed to Gemini.' },
  { size: 'half', icon: <FiSettings />, title: 'Self-Diagnosis Engine', desc: 'RK AI Home constantly monitors its own health. If a peripheral fails, it diagnoses itself and reports the issue vocally.' },
];

export default function RkAiHome() {
  return (
    <div style={{ minHeight: '100vh', background: '#000', color: '#fff', position: 'relative' }}>
      
      {/* Product Specific Ambient Background */}
      <div
        style={{
          position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none',
          background: 'radial-gradient(circle at 30% 40%, rgba(236,72,153,0.2) 0%, transparent 55%), radial-gradient(circle at 70% 60%, rgba(168,85,247,0.15) 0%, transparent 50%)',
        }}
      />
      <div className="noise" aria-hidden />

      <Navbar />

      {/* ── HERO ──────────────────────────── */}
      <section style={{
        position: 'relative', zIndex: 10,
        minHeight: '90vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        textAlign: 'center', padding: '140px 24px 80px',
      }}>
        <motion.div 
          initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="hero-eyebrow"
          style={{ background: 'rgba(236,72,153,0.12)', borderColor: 'rgba(236,72,153,0.3)', color: '#f472b6' }}
        >
          <span className="pulse" style={{ background: '#ec4899', boxShadow: '0 0 6px #ec4899' }} />
          Hardware Pre-order Phase
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          style={{ fontSize: 'clamp(52px, 8.5vw, 130px)', fontWeight: 900, letterSpacing: '-0.05em', lineHeight: 0.95, marginBottom: 20 }}
        >
          RK AI <span style={{ color: 'rgba(255,255,255,0.2)' }}>Home</span>
        </motion.h1>
        
        <motion.h2
          initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: 28,
            background: 'linear-gradient(135deg, #ec4899, #a855f7)', WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent'
          }}
        >
          Your home, thinking with you.
        </motion.h2>

        <motion.p 
          initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          style={{ fontSize: 'clamp(16px, 2vw, 20px)', color: 'rgba(255,255,255,0.55)', maxWidth: 640, lineHeight: 1.65, marginBottom: 48 }}
        >
          An AI system designed for physical environments — enabling voice control, automation, and intelligent coordination across your entire living space without sacrificing privacy.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="hero-actions"
        >
          <a href="#preorder" className="btn-primary" style={{ background: '#fff', color: '#000', padding: '16px 32px', fontSize: 16 }}>
            <FiShoppingCart /> Pre-order Now
          </a>
          <a href="#deepdive" className="btn-secondary" style={{ padding: '16px 32px', fontSize: 16 }}>
            Learn More
          </a>
        </motion.div>
      </section>

      <hr className="divider" />

      {/* ── LEARN MORE (DEEP DIVE) ─────────────────── */}
      <section id="deepdive" className="section layer" style={{ paddingBottom: 60 }}>
        <motion.div 
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          style={{ 
            background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', 
            borderRadius: 32, padding: '80px 5%', marginBottom: 60, display: 'flex', flexWrap: 'wrap', gap: 40, alignItems: 'center'
          }}
        >
          <div style={{ flex: '1 1 400px' }}>
            <div style={{ position: 'relative', width: '100%', height: 300, borderRadius: 24, overflow: 'hidden', boxShadow: '0 20px 60px rgba(236,72,153,0.3)' }}>
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)', zIndex: 1 }} />
              <img src="/rk-ai-home-images/feature.jpg" alt="RK AI Home" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          </div>
          <div style={{ flex: '1 1 400px' }}>
            <h3 style={{ fontSize: '40px', fontWeight: 800, marginBottom: 20, letterSpacing: '-1px' }}>Hardware<br/>Meets Intelligence.</h3>
            <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: 18, lineHeight: 1.7, marginBottom: 24 }}>
              The RK AI Home client is a sleek, unobtrusive hardware node that connects your physical environment to the Rexycore ecosystem. Powered by a highly optimized Raspberry Pi Zero W architecture.
            </p>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: 12, color: 'rgba(255,255,255,0.8)' }}><FiCheckCircle color="#ec4899" /> Matter / Tuya / Thread Integration</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: 12, color: 'rgba(255,255,255,0.8)' }}><FiCheckCircle color="#ec4899" /> Edge-processed voice recognition</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: 12, color: 'rgba(255,255,255,0.8)' }}><FiCheckCircle color="#ec4899" /> Seamless sync with RK AI Desktop</li>
            </ul>
          </div>
        </motion.div>
      </section>

      {/* ── FEATURES BENTO ─────────────────── */}
      <section className="section layer" style={{ paddingBottom: 60, paddingTop: 0 }}>
        <motion.p 
          initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="section-label" style={{ color: '#f472b6' }}
        >
          Engineering
        </motion.p>
        <motion.h2 
          initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="section-heading"
        >
          Built for<br />the physical world.
        </motion.h2>

        <div className="bento">
          {FEATURES.map((feature, index) => (
            <FeatureCard key={feature.title} feature={feature} index={index} />
          ))}
        </div>
      </section>

      {/* ── PREORDER ─────────────────── */}
      <section id="preorder" className="section layer" style={{ paddingTop: 60 }}>
        <div style={{ background: 'rgba(236,72,153,0.05)', border: '1px solid rgba(236,72,153,0.2)', borderRadius: 32, padding: '80px 40px', textAlign: 'center' }}>
          <h2 style={{ fontSize: 44, fontWeight: 800, letterSpacing: '-0.04em', marginBottom: 16 }}>Secure Your Node.</h2>
          <p style={{ color: 'rgba(255,255,255,0.5)', marginBottom: 24, fontSize: 18, maxWidth: 600, margin: '0 auto 24px' }}>
            RK AI Home is currently in the hardware pre-order phase. Shipping begins Q3 2026.
          </p>
          <div style={{ fontSize: 64, fontWeight: 900, marginBottom: 40, letterSpacing: '-2px' }}>₹4,999</div>
          
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <button className="btn-primary" style={{ background: '#fff', color: '#000', padding: '20px 48px', fontSize: 20, borderRadius: 99, display: 'flex', alignItems: 'center', gap: 12 }} onClick={() => alert('Pre-order system launching soon! Check back or contact support.')}>
              <FiShoppingCart /> Pre-order Hardware
            </button>
          </div>
        </div>
      </section>

      <Footer />
      <ChatWidget />
    </div>
  );
}
