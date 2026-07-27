'use client';
import { useRef, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ChatWidget from '@/components/ChatWidget';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { FiLock, FiCpu, FiLayers, FiShield, FiCheckCircle, FiArrowRight } from 'react-icons/fi';
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
          background: `radial-gradient(circle, rgba(168,85,247,0.3) 0%, transparent 70%)`,
          filter: 'blur(40px)', pointerEvents: 'none', zIndex: 0,
        }}
      />
      <div style={{ position: 'relative', zIndex: 10, transform: 'translateZ(30px)' }}>
        <div style={{
          width: 44, height: 44, borderRadius: 12,
          display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, marginBottom: 24,
          background: 'rgba(168,85,247,0.15)', color: '#c084fc'
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
  { size: 'wide', icon: <FiLock />, title: 'Hardware Level Kill-Switch.', desc: 'The defining feature of Lumina OS is the system-level AI DISABLE SWITCH. With one click, every single AI component, daemon, and process is killed at the kernel level. You have absolute control.' },
  { size: 'narrow', icon: <FiCpu />, title: 'AI-Native Architecture', desc: 'Built from the ground up on a custom Linux kernel to natively run LLMs and machine learning tasks efficiently without bloatware.' },
  { size: 'half', icon: <FiLayers />, title: 'Spatial UI', desc: 'A custom desktop environment that renders everything with deep blur, glassmorphism, and responsive physics. It feels alive.' },
  { size: 'half', icon: <FiShield />, title: 'Telemetry Zero', desc: 'We don\'t track your app usage, we don\'t sell your data, and we don\'t need an account to use the OS. It is entirely yours.' },
];

export default function LuminaOSPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#000', color: '#fff', position: 'relative' }}>
      
      {/* Product Specific Ambient Background */}
      <div
        style={{
          position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none',
          background: 'radial-gradient(circle at 60% 30%, rgba(168,85,247,0.25) 0%, transparent 55%), radial-gradient(circle at 25% 70%, rgba(99,102,241,0.15) 0%, transparent 50%)',
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
          style={{ background: 'rgba(168,85,247,0.12)', borderColor: 'rgba(168,85,247,0.3)', color: '#c084fc' }}
        >
          <span className="pulse" style={{ background: '#a855f7', boxShadow: '0 0 6px #a855f7' }} />
          Limited Alpha Phase
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          style={{ fontSize: 'clamp(52px, 8.5vw, 130px)', fontWeight: 900, letterSpacing: '-0.05em', lineHeight: 0.95, marginBottom: 20 }}
        >
          Lumina <span style={{ color: 'rgba(255,255,255,0.2)' }}>OS</span>
        </motion.h1>
        
        <motion.h2
          initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: 28,
            background: 'linear-gradient(135deg, #a855f7, #6366f1)', WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent'
          }}
        >
          The OS reimagined from the ground up.
        </motion.h2>

        <motion.p 
          initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          style={{ fontSize: 'clamp(16px, 2vw, 20px)', color: 'rgba(255,255,255,0.55)', maxWidth: 640, lineHeight: 1.65, marginBottom: 48 }}
        >
          Witness the evolution of computing. An AI-native Linux experience built around privacy, performance, and deep system intelligence.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="hero-actions"
        >
          <a href="#alpha" className="btn-primary" style={{ background: '#fff', color: '#000', padding: '16px 32px', fontSize: 16 }}>
            Join Alpha Waitlist
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
            <h3 style={{ fontSize: '40px', fontWeight: 800, marginBottom: 20, letterSpacing: '-1px' }}>Built on Linux.<br/>Made for Humans.</h3>
            <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: 18, lineHeight: 1.7, marginBottom: 24 }}>
              Lumina OS takes the rock-solid stability of Linux and wraps it in a breathtaking custom desktop environment. We removed the complexity of the terminal while maintaining the freedom of open source.
            </p>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: 12, color: 'rgba(255,255,255,0.8)' }}><FiCheckCircle color="#a855f7" /> Custom Window Manager</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: 12, color: 'rgba(255,255,255,0.8)' }}><FiCheckCircle color="#a855f7" /> Wayland Native</li>
            </ul>
          </div>
          <div style={{ flex: '1 1 400px', display: 'flex', justifyContent: 'center' }}>
            <Image src="/luminaos.png" width={300} height={300} alt="Lumina OS" style={{ filter: 'drop-shadow(0 0 40px rgba(168,85,247,0.4))' }} />
          </div>
        </motion.div>
      </section>

      {/* ── THE LUMINA OS JOURNEY ─────────────────── */}
      <section className="section layer" style={{ paddingBottom: 60, paddingTop: 0 }}>
        <motion.div 
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          style={{ 
            background: 'rgba(168,85,247,0.05)', border: '1px solid rgba(168,85,247,0.2)', 
            borderRadius: 32, padding: '80px 5%', marginBottom: 60, display: 'flex', flexWrap: 'wrap', gap: 40, alignItems: 'center'
          }}
        >
          <div style={{ flex: '1 1 100%' }}>
            <h3 style={{ fontSize: '36px', fontWeight: 800, marginBottom: 20, letterSpacing: '-1px', color: '#c084fc' }}>The Lumina OS Journey</h3>
            <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 18, lineHeight: 1.7, marginBottom: 32 }}>
              Building an operating system from scratch is no small feat. The Lumina OS journey started with a simple question: What if the OS itself was aware, but entirely under your control? Over the past 14 months, our engineering team in India has built a bespoke display server, integrated raw LLM inference directly into the system scheduler, and designed a user interface that feels organic, not mechanical. 
              <br/><br/>
              We are currently in a highly restricted Alpha phase, stabilizing the kernel and ensuring our strict zero-telemetry protocols hold up under load.
            </p>
            <a href="https://luminaos.vercel.app" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: '#a855f7', fontWeight: 700, textDecoration: 'none' }}>
              View the Web Preview <FiArrowRight />
            </a>
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
          className="section-label" style={{ color: '#c084fc' }}
        >
          System Architecture
        </motion.p>
        <motion.h2 
          initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="section-heading"
        >
          Redesigning <br />Computing.
        </motion.h2>

        <div className="bento">
          {FEATURES.map((feature, index) => (
            <FeatureCard key={feature.title} feature={feature} index={index} />
          ))}
        </div>
      </section>

      {/* ── DOWNLOAD ─────────────────── */}
      <section id="alpha" className="section layer" style={{ paddingTop: 60 }}>
        <div style={{ background: 'rgba(168,85,247,0.05)', border: '1px solid rgba(168,85,247,0.2)', borderRadius: 32, padding: '80px 40px', textAlign: 'center' }}>
          <h2 style={{ fontSize: 44, fontWeight: 800, letterSpacing: '-0.04em', marginBottom: 16 }}>Request Alpha Access.</h2>
          <p style={{ color: 'rgba(255,255,255,0.5)', marginBottom: 48, fontSize: 18, maxWidth: 600, margin: '0 auto 48px' }}>
            Spots for the Lumina OS Alpha are extremely limited. Join the waitlist to receive your unique ISO download link when a spot opens.
          </p>
          
          <div style={{ display: 'flex', justifyContent: 'center', gap: 16, flexDirection: 'column', alignItems: 'center' }}>
            <input type="email" placeholder="Enter your email address" style={{ padding: '16px 24px', width: '100%', maxWidth: 400, borderRadius: 12, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontSize: 16, outline: 'none' }} />
            <button className="btn-primary" style={{ background: '#fff', color: '#000', padding: '16px 48px', fontSize: 18, borderRadius: 99, display: 'flex', alignItems: 'center', gap: 12, border: 'none', cursor: 'pointer' }} onClick={() => alert('Added to Waitlist!')}>
              Join Waitlist
            </button>
          </div>
        </div>
      </section>

      <Footer />
      <ChatWidget />
    </div>
  );
}
