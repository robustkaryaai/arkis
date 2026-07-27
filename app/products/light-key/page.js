'use client';
import { useRef, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ChatWidget from '@/components/ChatWidget';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { FiEdit3, FiCpu, FiMessageSquare, FiSettings, FiCheckCircle } from 'react-icons/fi';

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
          background: `radial-gradient(circle, rgba(245,158,11,0.3) 0%, transparent 70%)`,
          filter: 'blur(40px)', pointerEvents: 'none', zIndex: 0,
        }}
      />
      <div style={{ position: 'relative', zIndex: 10, transform: 'translateZ(30px)' }}>
        <div style={{
          width: 44, height: 44, borderRadius: 12,
          display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, marginBottom: 24,
          background: 'rgba(245,158,11,0.15)', color: '#fcd34d'
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
  { size: 'wide', icon: <FiCpu />, title: 'Contextual AI Autocomplete.', desc: 'Light Key doesn\'t just guess the next word — it understands the context of your entire document, email, or code block, offering full sentence and paragraph completions natively across your OS.' },
  { size: 'narrow', icon: <FiEdit3 />, title: 'Grammar & Tone', desc: 'Highlight any text in any app, and Light Key will instantly rewrite it to match your desired tone (Professional, Casual, Direct).' },
  { size: 'half', icon: <FiMessageSquare />, title: 'Smart Replies', desc: 'When reading an email, Light Key drafts 3 contextual responses before you even start typing.' },
  { size: 'half', icon: <FiSettings />, title: 'Local Privacy', desc: 'Like all Rexycore products, Light Key processes your keystrokes locally. Your typing data is never uploaded.' },
];

export default function LightKeyPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#000', color: '#fff', position: 'relative' }}>
      
      {/* Product Specific Ambient Background */}
      <div
        style={{
          position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none',
          background: 'radial-gradient(circle at 40% 40%, rgba(245,158,11,0.25) 0%, transparent 55%), radial-gradient(circle at 70% 70%, rgba(217,119,6,0.15) 0%, transparent 50%)',
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
          style={{ background: 'rgba(245,158,11,0.12)', borderColor: 'rgba(245,158,11,0.3)', color: '#fcd34d' }}
        >
          <span className="pulse" style={{ background: '#f59e0b', boxShadow: '0 0 6px #f59e0b' }} />
          Beta Testing Soon
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          style={{ fontSize: 'clamp(52px, 8.5vw, 130px)', fontWeight: 900, letterSpacing: '-0.05em', lineHeight: 0.95, marginBottom: 20 }}
        >
          Light <span style={{ color: 'rgba(255,255,255,0.2)' }}>Key</span>
        </motion.h1>
        
        <motion.h2
          initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: 28,
            background: 'linear-gradient(135deg, #f59e0b, #d97706)', WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent'
          }}
        >
          Type smarter. Think faster.
        </motion.h2>

        <motion.p 
          initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          style={{ fontSize: 'clamp(16px, 2vw, 20px)', color: 'rgba(255,255,255,0.55)', maxWidth: 640, lineHeight: 1.65, marginBottom: 48 }}
        >
          An intelligent input system that enhances typing with contextual suggestions, AI-powered auto-complete, and deep workflow integration across your entire OS.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="hero-actions"
        >
          <a href="#beta" className="btn-primary" style={{ background: '#fff', color: '#000', padding: '16px 32px', fontSize: 16 }}>
            Join Beta Waitlist
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
            <h3 style={{ fontSize: '40px', fontWeight: 800, marginBottom: 20, letterSpacing: '-1px' }}>Your keyboard,<br/>supercharged.</h3>
            <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: 18, lineHeight: 1.7, marginBottom: 24 }}>
              Light Key replaces your standard system input method with a highly optimized, AI-driven layer. Press Tab to complete full thoughts, or use a quick shortcut to ask the AI to rewrite your current paragraph.
            </p>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: 12, color: 'rgba(255,255,255,0.8)' }}><FiCheckCircle color="#f59e0b" /> Works in every app (Word, Chrome, VSCode)</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: 12, color: 'rgba(255,255,255,0.8)' }}><FiCheckCircle color="#f59e0b" /> Multi-language translation on the fly</li>
            </ul>
          </div>
          <div style={{ flex: '1 1 400px', background: '#0a0a0f', borderRadius: 24, padding: 32, border: '1px solid rgba(245,158,11,0.2)', boxShadow: '0 20px 60px rgba(0,0,0,0.5), inset 0 0 20px rgba(245,158,11,0.05)' }}>
            <div style={{ fontFamily: 'Inter', fontSize: 18, lineHeight: 1.6, color: '#fff' }}>
              Dear team, <br/><br/>
              I wanted to follow up on our meeting from yesterday.
              <span style={{ color: 'rgba(245,158,11,0.6)', fontStyle: 'italic', background: 'rgba(245,158,11,0.1)', padding: '0 4px', borderRadius: 4, marginLeft: 4 }}>
                I have reviewed the proposal and everything looks good to proceed with Phase 1.
              </span>
              <span className="typewriter-cursor" style={{ background: '#f59e0b', width: 8, height: 18, marginLeft: 4 }} />
            </div>
            <div style={{ marginTop: 24, display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.1)', padding: '6px 12px', borderRadius: 8, fontSize: 12, color: 'rgba(255,255,255,0.6)', fontWeight: 600 }}>
              <span style={{ background: 'rgba(255,255,255,0.2)', padding: '2px 6px', borderRadius: 4, color: '#fff' }}>Tab</span> to accept
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
          className="section-label" style={{ color: '#fcd34d' }}
        >
          Features
        </motion.p>
        <motion.h2 
          initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="section-heading"
        >
          Write better.<br />Faster.
        </motion.h2>

        <div className="bento">
          {FEATURES.map((feature, index) => (
            <FeatureCard key={feature.title} feature={feature} index={index} />
          ))}
        </div>
      </section>

      {/* ── DOWNLOAD ─────────────────── */}
      <section id="beta" className="section layer" style={{ paddingTop: 60 }}>
        <div style={{ background: 'rgba(245,158,11,0.05)', border: '1px solid rgba(245,158,11,0.2)', borderRadius: 32, padding: '80px 40px', textAlign: 'center' }}>
          <h2 style={{ fontSize: 44, fontWeight: 800, letterSpacing: '-0.04em', marginBottom: 16 }}>Request Beta Access.</h2>
          <p style={{ color: 'rgba(255,255,255,0.5)', marginBottom: 48, fontSize: 18, maxWidth: 600, margin: '0 auto 48px' }}>
            Light Key is entering closed beta soon. Join the waitlist to receive your invitation.
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
