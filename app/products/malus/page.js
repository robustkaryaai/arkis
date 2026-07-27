'use client';
import { useRef, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ChatWidget from '@/components/ChatWidget';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { FiEye, FiActivity, FiZap, FiTarget, FiCheckCircle } from 'react-icons/fi';
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
          background: `radial-gradient(circle, rgba(16,185,129,0.3) 0%, transparent 70%)`,
          filter: 'blur(40px)', pointerEvents: 'none', zIndex: 0,
        }}
      />
      <div style={{ position: 'relative', zIndex: 10, transform: 'translateZ(30px)' }}>
        <div style={{
          width: 44, height: 44, borderRadius: 12,
          display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, marginBottom: 24,
          background: 'rgba(16,185,129,0.15)', color: '#34d399'
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
  { size: 'wide', icon: <FiEye />, title: 'Context-Aware Observation', desc: 'MALUS visually processes your screen context securely on-device, understanding exactly what you are looking at to provide relevant, immediate assistance without you needing to explain everything.' },
  { size: 'narrow', icon: <FiActivity />, title: 'Workflow Integration', desc: 'Adapts to how you work, acting as an intelligent co-pilot for coding, designing, or researching.' },
  { size: 'half', icon: <FiZap />, title: 'Zero Latency Mode', desc: 'Because it runs locally, MALUS responds instantly to on-screen events without round-tripping to a server.' },
  { size: 'half', icon: <FiTarget />, title: 'Permission First', desc: 'MALUS cannot run, observe, or execute anything without explicit user consent. You hold the keys.' },
];

export default function MalusPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#000', color: '#fff', position: 'relative' }}>
      
      {/* Product Specific Ambient Background */}
      <div
        style={{
          position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none',
          background: 'radial-gradient(circle at 25% 50%, rgba(16,185,129,0.2) 0%, transparent 55%), radial-gradient(circle at 75% 35%, rgba(5,150,105,0.15) 0%, transparent 50%)',
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
          style={{ background: 'rgba(16,185,129,0.12)', borderColor: 'rgba(16,185,129,0.3)', color: '#6ee7b7' }}
        >
          <span className="pulse" style={{ background: '#10b981', boxShadow: '0 0 6px #10b981' }} />
          Available for Windows
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          style={{ fontSize: 'clamp(52px, 8.5vw, 130px)', fontWeight: 900, letterSpacing: '-0.05em', lineHeight: 0.95, marginBottom: 20 }}
        >
          <span style={{ color: 'rgba(255,255,255,0.2)' }}>Meet</span> MALUS
        </motion.h1>
        
        <motion.h2
          initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: 28,
            background: 'linear-gradient(135deg, #10b981, #059669)', WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent'
          }}
        >
          Ambient intelligence for your desktop.
        </motion.h2>

        <motion.p 
          initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          style={{ fontSize: 'clamp(16px, 2vw, 20px)', color: 'rgba(255,255,255,0.55)', maxWidth: 640, lineHeight: 1.65, marginBottom: 48 }}
        >
          A context-aware AI operating companion that understands your computer, adapts to your workflow, and naturally helps you while respecting your privacy.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="hero-actions"
        >
          <a href="#download" className="btn-primary" style={{ background: '#fff', color: '#000', padding: '16px 32px', fontSize: 16 }}>
            Download MALUS
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
            <h3 style={{ fontSize: '40px', fontWeight: 800, marginBottom: 20, letterSpacing: '-1px' }}>Sees what you see.<br/>Knows what you mean.</h3>
            <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: 18, lineHeight: 1.7, marginBottom: 24 }}>
              Instead of switching context to ask a question, MALUS observes your screen in real-time. If you are stuck on a piece of code or reading a complex document, just ask "What does this mean?" and it already knows.
            </p>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: 12, color: 'rgba(255,255,255,0.8)' }}><FiCheckCircle color="#34d399" /> Real-time screen processing</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: 12, color: 'rgba(255,255,255,0.8)' }}><FiCheckCircle color="#34d399" /> Independent from RK AI Desktop</li>
            </ul>
          </div>
          <div style={{ flex: '1 1 400px', display: 'flex', justifyContent: 'center' }}>
            <Image src="/malus.jpeg" width={300} height={300} alt="MALUS" style={{ borderRadius: 32, filter: 'drop-shadow(0 0 40px rgba(16,185,129,0.3))' }} />
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
          className="section-label" style={{ color: '#34d399' }}
        >
          Capabilities
        </motion.p>
        <motion.h2 
          initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="section-heading"
        >
          Companion <br />Intelligence.
        </motion.h2>

        <div className="bento">
          {FEATURES.map((feature, index) => (
            <FeatureCard key={feature.title} feature={feature} index={index} />
          ))}
        </div>
      </section>

      {/* ── DOWNLOAD ─────────────────── */}
      <section id="download" className="section layer" style={{ paddingTop: 60 }}>
        <div style={{ background: 'rgba(16,185,129,0.05)', border: '1px solid rgba(16,185,129,0.2)', borderRadius: 32, padding: '80px 40px', textAlign: 'center' }}>
          <h2 style={{ fontSize: 44, fontWeight: 800, letterSpacing: '-0.04em', marginBottom: 16 }}>Start Your Companion.</h2>
          <p style={{ color: 'rgba(255,255,255,0.5)', marginBottom: 48, fontSize: 18, maxWidth: 600, margin: '0 auto 48px' }}>
            MALUS is currently available exclusively for Windows 10/11. macOS and Linux support coming later this year.
          </p>
          
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <a href="/downloads/malus-windows.exe" className="btn-primary" style={{ background: '#fff', color: '#000', padding: '24px 48px', fontSize: 20, borderRadius: 99, display: 'flex', alignItems: 'center', gap: 12 }}>
              <FiDownload size={24} /> Download for Windows
            </a>
          </div>
        </div>
      </section>

      <Footer />
      <ChatWidget />
    </div>
  );
}
