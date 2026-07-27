'use client';
import { useRef, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ChatWidget from '@/components/ChatWidget';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { FiDownload, FiTerminal, FiShield, FiMic, FiLayout, FiCpu, FiBox, FiCheckCircle } from 'react-icons/fi';
import { FaApple, FaWindows, FaLinux } from 'react-icons/fa';

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
          background: `radial-gradient(circle, rgba(59,130,246,0.3) 0%, transparent 70%)`,
          filter: 'blur(40px)', pointerEvents: 'none', zIndex: 0,
        }}
      />
      <div style={{ position: 'relative', zIndex: 10, transform: 'translateZ(30px)' }}>
        <div style={{
          width: 44, height: 44, borderRadius: 12,
          display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, marginBottom: 24,
          background: 'rgba(59,130,246,0.15)', color: '#60a5fa'
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
  { size: 'wide', icon: <FiShield />, title: 'Absolute Privacy. Zero Cloud.', desc: 'Your data never leaves your machine. Powered by the Spark Engine, RK AI runs powerful LLMs entirely locally using Ollama. Read, write, and analyze documents completely offline.' },
  { size: 'narrow', icon: <FiCpu />, title: 'System-wide Automation', desc: 'Control your PC naturally. "Turn on dark mode," "Mute the volume," or "Open my browser." Your AI acts as a native extension of your OS.' },
  { size: 'half', icon: <FiMic />, title: 'Always Listening (When You Want)', desc: 'Built-in offline Wake Word detection. Just say "Hey Rexycore" and start talking. Real-time STT and TTS keep the conversation fluid and hands-free.' },
  { size: 'half', icon: <FiLayout />, title: 'Professional Generation', desc: 'Don\'t just generate text. RK AI natively generates fully formatted PowerPoint presentations (.pptx) and Word documents (.docx) straight to your desktop.' },
];

export default function RkAiDesktop() {
  return (
    <div style={{ minHeight: '100vh', background: '#000', color: '#fff', position: 'relative' }}>
      
      {/* Product Specific Ambient Background */}
      <div
        style={{
          position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none',
          background: 'radial-gradient(circle at 20% 30%, rgba(59,130,246,0.2) 0%, transparent 55%), radial-gradient(circle at 75% 70%, rgba(99,102,241,0.15) 0%, transparent 50%)',
        }}
      />
      <div className="noise" aria-hidden />

      <Navbar />

      {/* ── HERO ──────────────────────────── */}
      <section style={{
        position: 'relative', zIndex: 10,
        minHeight: '90vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        textAlign: 'center', padding: '110px 24px 60px',
      }}>
        <motion.div 
          initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="hero-eyebrow"
          style={{ background: 'rgba(59,130,246,0.12)', borderColor: 'rgba(59,130,246,0.3)', color: '#93c5fd' }}
        >
          <span className="pulse" style={{ background: '#60a5fa', boxShadow: '0 0 6px #60a5fa' }} />
          Available Now for Mac, Windows & Linux
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          style={{ fontSize: 'clamp(52px, 8.5vw, 130px)', fontWeight: 900, letterSpacing: '-0.05em', lineHeight: 0.95, marginBottom: 20 }}
        >
          RK AI <span style={{ color: 'rgba(255,255,255,0.2)' }}>Desktop</span>
        </motion.h1>
        
        <motion.h2
          initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: 28,
            background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent'
          }}
        >
          Intelligence, locally run.
        </motion.h2>

        <motion.p 
          initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          style={{ fontSize: 'clamp(16px, 2vw, 20px)', color: 'rgba(255,255,255,0.55)', maxWidth: 640, lineHeight: 1.65, marginBottom: 48 }}
        >
          A local-first AI system built for personal computing. Voice-enabled, automation-ready, and powered by on-device models that never leave your machine. Experience the power of AI without surrendering your privacy.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="hero-actions"
        >
          <a href="#download" className="btn-primary" style={{ background: '#fff', color: '#000', padding: '16px 32px', fontSize: 16 }}>
            <FiDownload /> Download RK AI
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
            <h3 style={{ fontSize: '40px', fontWeight: 800, marginBottom: 20, letterSpacing: '-1px' }}>Local LLMs.<br/>Unlimited Freedom.</h3>
            <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: 18, lineHeight: 1.7, marginBottom: 24 }}>
              Using the integrated <strong>Spark Engine</strong> (powered by Ollama), RK AI pulls down massive language models directly to your hardware. No internet required. No subscriptions. No data harvesting.
            </p>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: 12, color: 'rgba(255,255,255,0.8)' }}><FiCheckCircle color="#60a5fa" /> Fully uncensored local execution</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: 12, color: 'rgba(255,255,255,0.8)' }}><FiCheckCircle color="#60a5fa" /> Direct file system access</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: 12, color: 'rgba(255,255,255,0.8)' }}><FiCheckCircle color="#60a5fa" /> Free, unlimited token generation</li>
            </ul>
          </div>
          <div style={{ flex: '1 1 400px', background: '#0a0a0f', borderRadius: 24, padding: 32, border: '1px solid rgba(59,130,246,0.2)', boxShadow: '0 20px 60px rgba(0,0,0,0.5), inset 0 0 20px rgba(59,130,246,0.05)' }}>
            <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
              <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ff5f56' }} />
              <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ffbd2e' }} />
              <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#27c93f' }} />
            </div>
            <div style={{ fontFamily: 'monospace', color: '#94a3b8', fontSize: 14, lineHeight: 1.8 }}>
              <span style={{ color: '#60a5fa' }}>rexycore</span>@local:~$ <span style={{ color: '#fff' }}>start spark-engine</span><br/>
              <span style={{ color: '#a78bfa' }}>[INFO]</span> Initializing local models...<br/>
              <span style={{ color: '#a78bfa' }}>[INFO]</span> Llama 3 loaded into memory (8.2GB).<br/>
              <span style={{ color: '#a78bfa' }}>[INFO]</span> Hardware acceleration: <span style={{ color: '#4ade80' }}>ACTIVE (Metal/CUDA)</span><br/>
              <span style={{ color: '#60a5fa' }}>rexycore</span>@local:~$ <span style={{ color: '#fff' }}>AI is ready.</span><br/>
              <span className="typewriter-cursor" style={{ background: '#fff', width: 8, height: 16 }} />
            </div>
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
          className="section-label" style={{ color: '#60a5fa' }}
        >
          Core Architecture
        </motion.p>
        <motion.h2 
          initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="section-heading"
        >
          Uncompromised<br />capability.
        </motion.h2>

        <div className="bento">
          {FEATURES.map((feature, index) => (
            <FeatureCard key={feature.title} feature={feature} index={index} />
          ))}
        </div>
      </section>

      {/* ── DOWNLOAD ─────────────────── */}
      <section id="download" className="section layer" style={{ paddingTop: 60 }}>
        <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 32, padding: '80px 40px', textAlign: 'center' }}>
          <h2 style={{ fontSize: 44, fontWeight: 800, letterSpacing: '-0.04em', marginBottom: 16 }}>Ready to upgrade your OS?</h2>
          <p style={{ color: 'rgba(255,255,255,0.5)', marginBottom: 48, fontSize: 18, maxWidth: 600, margin: '0 auto 48px' }}>
            RK AI Desktop runs strictly on your local hardware. Minimum 8GB RAM required for standard models, 16GB recommended for Pro models.
          </p>
          
          <div style={{ display: 'flex', justifyContent: 'center', gap: 20, flexWrap: 'wrap' }}>
            <a href="/downloads/rk-ai-windows.exe" className="btn-secondary" style={{ padding: '24px 32px', display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'center', width: 220, borderRadius: 24, background: 'rgba(59,130,246,0.05)', borderColor: 'rgba(59,130,246,0.2)' }}>
              <FaWindows size={48} style={{ color: '#3b82f6' }} />
              <div>
                <div style={{ fontWeight: 800, fontSize: 20, color: '#fff' }}>Windows</div>
                <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', marginTop: 4 }}>Windows 10 / 11<br/>(.exe)</div>
              </div>
            </a>
            <a href="/downloads/rk-ai-macos.dmg" className="btn-secondary" style={{ padding: '24px 32px', display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'center', width: 220, borderRadius: 24 }}>
              <FaApple size={48} style={{ color: '#fff' }} />
              <div>
                <div style={{ fontWeight: 800, fontSize: 20, color: '#fff' }}>macOS</div>
                <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', marginTop: 4 }}>Apple Silicon M1+<br/>(.dmg)</div>
              </div>
            </a>
            <a href="/downloads/rk-ai-linux.AppImage" className="btn-secondary" style={{ padding: '24px 32px', display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'center', width: 220, borderRadius: 24 }}>
              <FaLinux size={48} style={{ color: '#fbbf24' }} />
              <div>
                <div style={{ fontWeight: 800, fontSize: 20, color: '#fff' }}>Linux</div>
                <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', marginTop: 4 }}>Ubuntu / Debian<br/>(AppImage)</div>
              </div>
            </a>
          </div>
        </div>
      </section>

      <Footer />
      <ChatWidget />
    </div>
  );
}
