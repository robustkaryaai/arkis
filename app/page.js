'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ChatWidget from '@/components/ChatWidget';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

/* ── BLUR WORDS COMPONENT ────────────────────────────── */
function BlurWords({ text, baseDelay = 0 }) {
  const words = text.split(' ');
  return (
    <>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 20, filter: 'blur(14px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{
            duration: 0.8,
            delay: baseDelay + i * 0.08,
            ease: [0.16, 1, 0.3, 1],
          }}
          style={{ display: 'inline-block', marginRight: '0.25em' }}
        >
          {word}
        </motion.span>
      ))}
    </>
  );
}

/* ── TYPEWRITER ─────────────────────────── */
const PHRASES = [
  'Built for the future.',
  'Privacy. Redefined.',
  'Powered by intelligence.',
  'Designed for autonomy.',
  'Local. Private. Powerful.',
  'AI without compromise.',
  'Your AI. Your rules.',
];

function Typewriter() {
  const [idx, setIdx] = useState(0);
  const [text, setText] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    let t;
    const full = PHRASES[idx];
    if (!deleting) {
      if (text.length < full.length) {
        t = setTimeout(() => setText(full.slice(0, text.length + 1)), 90);
      } else {
        t = setTimeout(() => setDeleting(true), 3800);
      }
    } else {
      if (text.length > 0) {
        t = setTimeout(() => setText(full.slice(0, text.length - 1)), 45);
      } else {
        setDeleting(false);
        setIdx(p => (p + 1) % PHRASES.length);
      }
    }
    return () => clearTimeout(t);
  }, [text, deleting, idx]);

  return (
    <span className="hero-title__type">
      <span
        style={{
          background: 'linear-gradient(135deg, #a78bfa 0%, #f472b6 45%, #60a5fa 100%)',
          backgroundSize: '200% 200%',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          animation: 'grad-shift 5s ease infinite',
        }}
      >
        {text}
      </span>
      <span className="typewriter-cursor" />
    </span>
  );
}

/* ── BENTO CARD WITH CURSOR TRACKING ─────────────────────────── */
function BentoCard({ card, index }) {
  const ref = useRef(null);
  
  // Mouse position state for the glowing orb
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  // Framer motion values for 3D tilt
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['7.5deg', '-7.5deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-7.5deg', '7.5deg']);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // For 3D tilt
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
    
    // For glowing orb
    setMousePosition({ x: mouseX, y: mouseY });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        perspective: '1000px',
      }}
      className={`bento-cell bento-cell--${card.size}`}
    >
      {/* The glowing orb that follows the cursor */}
      <motion.div
        animate={{
          opacity: isHovered ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
        style={{
          position: 'absolute',
          top: mousePosition.y - 150,
          left: mousePosition.x - 150,
          width: '300px',
          height: '300px',
          background: `radial-gradient(circle, ${card.orbColor} 0%, transparent 70%)`,
          filter: 'blur(40px)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />
      
      <div style={{ position: 'relative', zIndex: 10, transform: 'translateZ(30px)' }}>
        <div className={`bento-icon ${card.iconClass}`}>{card.icon}</div>
        <p className="bento-label">{card.label}</p>
        {card.big !== undefined && (
          <p className="bento-big">{card.big}<sup style={{ fontSize: '0.35em', fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase' }}>{card.bigSuffix}</sup></p>
        )}
        <h3 className="bento-title">{card.title}</h3>
        <p className="bento-desc">{card.desc}</p>
      </div>
    </motion.div>
  );
}

/* ── BENTO DATA ─────────────────────────── */
const BENTO = [
  {
    size: 'wide',
    icon: '🔒',
    iconClass: 'bento-icon--v',
    label: 'Privacy Architecture',
    title: 'Your data stays yours.',
    desc: 'Local execution, strict data boundaries, zero telemetry. We designed the system so even we can\'t access your information.',
    big: '0',
    bigSuffix: 'leaks',
    orbColor: 'rgba(124, 58, 237, 0.4)', // Violet
  },
  {
    size: 'narrow',
    icon: '🇮🇳',
    iconClass: 'bento-icon--b',
    label: 'Origin',
    title: 'Engineered in India.',
    desc: 'Built by Indian engineers, for the world.',
    orbColor: 'rgba(37, 99, 235, 0.4)', // Blue
  },
  {
    size: 'half',
    icon: '🧠',
    iconClass: 'bento-icon--p',
    label: 'AI-Optional',
    title: 'You control the AI.',
    desc: 'Every AI feature can be disabled completely. We build AI-first — not AI-forced.',
    orbColor: 'rgba(219, 39, 119, 0.4)', // Pink
  },
  {
    size: 'half',
    icon: '🌐',
    iconClass: 'bento-icon--c',
    label: 'Ecosystem',
    title: 'Everything connects.',
    desc: 'Desktop to OS, assistant to platform — our products are designed to work as one.',
    orbColor: 'rgba(8, 145, 178, 0.4)', // Cyan
  },
];

/* ── PAGE ───────────────────────────────── */
export default function Home() {
  return (
    <>
      {/* Living nebula background */}
      <div className="nebula" aria-hidden>
        <div className="nebula__orb nebula__orb--1" />
        <div className="nebula__orb nebula__orb--2" />
        <div className="nebula__orb nebula__orb--3" />
        <div className="nebula__orb nebula__orb--4" />
      </div>
      <div className="noise" aria-hidden />

      <Navbar />

      {/* ── HERO ──────────────────────────── */}
      <section className="hero layer">
        <motion.div 
          initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="hero-eyebrow"
        >
          <span className="pulse" aria-hidden />
          Engineered in India
        </motion.div>

        <motion.h1 
          className="hero-title"
          style={{ willChange: 'transform' }}
        >
          <span className="line-static">
            <BlurWords text="An AI-first ecosystem." baseDelay={0.1} />
          </span>
          <Typewriter />
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, scale: 0.96, filter: 'blur(8px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          transition={{ duration: 1.1, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="hero-desc"
        >
          Rexycore builds privacy-focused, ecosystem-driven products
          that respect your autonomy — and never compromise.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="hero-actions"
        >
          <Link href="/products" className="btn-primary">
            Explore Products
            <span aria-hidden style={{ fontSize: 14 }}>→</span>
          </Link>
          <Link href="/about" className="btn-secondary">
            Learn about us
          </Link>
        </motion.div>
      </section>

      <hr className="divider" />

      {/* ── BENTO SECTION ─────────────────── */}
      <div className="section layer">
        <motion.p 
          initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="section-label"
        >
          Why Rexycore
        </motion.p>
        <motion.h2 
          initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="section-heading"
        >
          Built different.<br />By design.
        </motion.h2>

        <div className="bento">
          {BENTO.map((card, index) => (
            <BentoCard key={card.label} card={card} index={index} />
          ))}
        </div>
      </div>

      <Footer />
      <ChatWidget />
    </>
  );
}
