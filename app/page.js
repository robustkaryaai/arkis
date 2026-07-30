'use client';
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ChatWidget from '@/components/ChatWidget';
import { motion, useMotionValue, useSpring, useTransform, useScroll } from 'framer-motion';
import {
  FiShield, FiFlag, FiCpu, FiGlobe, FiLock, FiMonitor, FiActivity,
  FiTerminal, FiArrowRight, FiEye, FiWifi, FiCode, FiUsers,
  FiZap, FiHeart, FiPackage, FiMap, FiGitBranch
} from 'react-icons/fi';

/* ─────────────────────────────────
   ANIMATION VARIANTS
───────────────────────────────── */
const staggerContainer = (sc, dc) => ({ hidden: {}, show: { transition: { staggerChildren: sc, delayChildren: dc } } });
const fadeIn = (dir, type, delay, dur) => ({
  hidden: { x: dir === 'left' ? 80 : dir === 'right' ? -80 : 0, y: dir === 'up' ? 80 : dir === 'down' ? -80 : 0, opacity: 0 },
  show: { x: 0, y: 0, opacity: 1, transition: { type, delay, duration: dur, ease: 'easeOut' } },
});
const textVariant = (delay) => ({
  hidden: { y: 50, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { type: 'spring', duration: 1.25, delay } },
});

/* ─────────────────────────────────
   LIVING STAR FIELD + METEORITES
───────────────────────────────── */
function StarField() {
  const canvasRef = useRef(null);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener('resize', resize);

    // Stars
    const stars = Array.from({ length: 320 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.4 + 0.15,
      baseOpacity: Math.random() * 0.6 + 0.1,
      twinkleSpeed: Math.random() * 0.018 + 0.004,
      twinkleOffset: Math.random() * Math.PI * 2,
      driftX: (Math.random() - 0.5) * 0.06,
      driftY: Math.random() * 0.05 + 0.006,
      parallax: Math.random() * 0.4 + 0.08,
    }));

    const shoots = [];
    // Spawn frequently — every ~2 seconds on avg (60fps * 0.008 chance ≈ one every 8 seconds, but we spawn in bursts)
    const spawnShoot = () => {
      const count = Math.floor(Math.random() * 2) + 1; // 1-2 at once
      for (let k = 0; k < count; k++) {
        shoots.push({
          x: Math.random() * canvas.width * 1.2,
          y: Math.random() * canvas.height * 0.45,
          len: Math.random() * 160 + 80,
          speed: Math.random() * 14 + 8,
          opacity: 0.85 + Math.random() * 0.15,
          angle: Math.PI / 4 + (Math.random() - 0.5) * 0.4,
          width: Math.random() * 1.5 + 0.8,
        });
      }
    };

    let t = 0;
    let scrollVal = 0;
    const unsub = scrollYProgress.on('change', v => { scrollVal = v; });
    let animId;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      t++;

      // Spawn shooting stars frequently
      if (Math.random() < 0.018) spawnShoot();

      // Stars
      stars.forEach(s => {
        s.x += s.driftX; s.y += s.driftY;
        if (s.x < 0) s.x = canvas.width;
        if (s.x > canvas.width) s.x = 0;
        if (s.y > canvas.height) s.y = 0;
        const py = (s.y + scrollVal * canvas.height * s.parallax * 0.35) % canvas.height;
        const op = s.baseOpacity + Math.sin(t * s.twinkleSpeed + s.twinkleOffset) * 0.3;
        ctx.beginPath();
        ctx.arc(s.x, py, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${Math.max(0, op)})`;
        ctx.fill();
      });

      // Shooting stars / meteorites
      for (let i = shoots.length - 1; i >= 0; i--) {
        const ss = shoots[i];
        const tailX = ss.x - Math.cos(ss.angle) * ss.len;
        const tailY = ss.y - Math.sin(ss.angle) * ss.len;
        const g = ctx.createLinearGradient(ss.x, ss.y, tailX, tailY);
        g.addColorStop(0, `rgba(220,230,255,${ss.opacity})`);
        g.addColorStop(0.3, `rgba(180,200,255,${ss.opacity * 0.5})`);
        g.addColorStop(1, 'rgba(180,200,255,0)');
        ctx.beginPath();
        ctx.moveTo(ss.x, ss.y);
        ctx.lineTo(tailX, tailY);
        ctx.strokeStyle = g;
        ctx.lineWidth = ss.width;
        ctx.lineCap = 'round';
        ctx.stroke();
        // Bright head dot
        ctx.beginPath();
        ctx.arc(ss.x, ss.y, ss.width * 1.2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${ss.opacity})`;
        ctx.fill();
        ss.x += Math.cos(ss.angle) * ss.speed;
        ss.y += Math.sin(ss.angle) * ss.speed;
        ss.opacity -= 0.013;
        if (ss.opacity <= 0 || ss.x > canvas.width + 200 || ss.y > canvas.height + 200) shoots.splice(i, 1);
      }

      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize); unsub(); };
  }, [scrollYProgress]);

  return <canvas ref={canvasRef} style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }} />;
}

/* SpaceNebula removed — space is pure black */

/* ─────────────────────────────────
   ANIMATED BUTTONS
───────────────────────────────── */
function PrimaryBtn({ href, children }) {
  return (
    <motion.div whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.97 }} style={{ display: 'inline-block' }}>
      <Link href={href} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 32px', borderRadius: 999, background: '#fff', color: '#000', fontWeight: 800, fontSize: 15, textDecoration: 'none', boxShadow: '0 0 30px rgba(255,255,255,0.12)' }}>
        {children}
      </Link>
    </motion.div>
  );
}

function SecondaryBtn({ href, children }) {
  return (
    <motion.div whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.97 }} style={{ display: 'inline-block' }}>
      <Link href={href} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '13px 28px', borderRadius: 999, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.12)', color: '#fff', fontWeight: 700, fontSize: 15, textDecoration: 'none', backdropFilter: 'blur(12px)' }}>
        {children}
      </Link>
    </motion.div>
  );
}

function CosmicBtn({ href, children }) {
  return (
    <motion.div whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.97 }} style={{ display: 'inline-block' }}>
      <Link href={href} style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '14px 36px', borderRadius: 999, background: 'linear-gradient(90deg, #4338ca, #0e7490, #4338ca)', color: '#fff', fontWeight: 800, fontSize: 15, textDecoration: 'none', boxShadow: '0 0 40px rgba(67,56,202,0.25)' }}>
        {children}
      </Link>
    </motion.div>
  );
}

/* ─────────────────────────────────
   3D HOVER CARD
───────────────────────────────── */
function Card3D({ children, style, delay = 0, orbColor = 'rgba(129,140,248,0.22)' }) {
  const ref = useRef(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const mx = useMotionValue(0); const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 150, damping: 20 });
  const sy = useSpring(my, { stiffness: 150, damping: 20 });
  const rotateX = useTransform(sy, [-0.5, 0.5], ['5deg', '-5deg']);
  const rotateY = useTransform(sx, [-0.5, 0.5], ['-5deg', '5deg']);
  return (
    <motion.div ref={ref}
      onMouseMove={e => { const r = ref.current.getBoundingClientRect(); mx.set((e.clientX - r.left) / r.width - 0.5); my.set((e.clientY - r.top) / r.height - 0.5); setMouse({ x: e.clientX - r.left, y: e.clientY - r.top }); }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); mx.set(0); my.set(0); }}
      initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, margin: '-60px' }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d', perspective: 1000, position: 'relative', overflow: 'hidden', borderRadius: 20, background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.07)', backdropFilter: 'blur(24px)', ...style }}>
      <motion.div animate={{ opacity: hovered ? 1 : 0 }} transition={{ duration: 0.4 }} style={{ position: 'absolute', top: mouse.y - 110, left: mouse.x - 110, width: 220, height: 220, borderRadius: '50%', background: `radial-gradient(circle, ${orbColor} 0%, transparent 70%)`, pointerEvents: 'none', zIndex: 0 }} />
      <div style={{ position: 'relative', zIndex: 1, transform: 'translateZ(20px)' }}>{children}</div>
    </motion.div>
  );
}

/* ─────────────────────────────────
   PRODUCT DATA
───────────────────────────────── */
const PRODUCTS = [
  { id: 'rk-desktop', color: '#a5b4fc', glow: 'rgba(99,102,241,0.5)',  icon: <FiMonitor size={22} />,  tag: 'Available Now',   name: 'RK AI Desktop', who: 'Anyone who wants AI without a subscription to a cloud service', tagline: 'Local AI on your desktop.', desc: 'RK AI Desktop runs AI models on your own machine. It can work with documents, code, notes, and conversations without routing requests to remote servers. If you have the hardware and a local model, you can use it without an internet connection.', href: '/products/rk-ai-desktop' },
  { id: 'rk-home',    color: '#f9a8d4', glow: 'rgba(236,72,153,0.5)',  icon: <FiGlobe size={22} />,    tag: 'Pre-order Open',  name: 'RK AI Home',    who: 'Households that want voice AI without sending conversations to the cloud', tagline: 'Voice AI that stays home.', desc: 'RK AI Home is a dedicated home device for voice interaction and smart home tasks. It is designed to handle conversations locally, so what you say stays in your home environment rather than in a cloud data center.', href: '/products/rk-ai-home' },
  { id: 'malus',      color: '#6ee7b7', glow: 'rgba(16,185,129,0.5)',  icon: <FiActivity size={22} />, tag: 'Available Now',   name: 'MALUS',         who: 'Anyone who wants to understand what their computer is doing', tagline: 'System intelligence layer.', desc: 'MALUS observes how your computer behaves — processor usage, memory, storage, running applications, and workflow patterns. It is not a chatbot or assistant. Its role is to build a model of your machine locally and share that context with other RexyCore products.', href: '/products/malus' },
  { id: 'lumina',     color: '#7dd3fc', glow: 'rgba(14,165,233,0.5)',  icon: <FiTerminal size={22} />, tag: 'In Development',  name: 'Lumina OS',     who: 'A future product — not available yet', tagline: 'Privacy built into the OS itself.', desc: 'Lumina OS is being designed so that privacy is an architectural decision, not a setting. The goal is an operating environment where AI, applications, and system services work together without collecting data you did not consent to share. It is currently in development.', href: '/products/lumina-os' },
  { id: 'lightkey',   color: '#fcd34d', glow: 'rgba(245,158,11,0.5)',  icon: <FiCpu size={22} />,     tag: 'Beta Soon',       name: 'Light Key',     who: 'Anyone who wants AI assistance wherever they type', tagline: 'AI at the keyboard layer.', desc: 'Most AI tools only work inside their own window. Light Key works wherever you type — documents, browsers, terminals, messaging apps. Suggestions are generated locally, so your keystrokes are not sent anywhere.', href: '/products/light-key' },
];

/* ─────────────────────────────────
   EXPLODING PRODUCT CARD
───────────────────────────────── */
function ExploreCard({ product, active, onActivate }) {
  const isActive = active === product.id;
  const ref = useRef(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const mx = useMotionValue(0); const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 120, damping: 18 });
  const sy = useSpring(my, { stiffness: 120, damping: 18 });
  const rotateX = useTransform(sy, [-0.5, 0.5], ['4deg', '-4deg']);
  const rotateY = useTransform(sx, [-0.5, 0.5], ['-4deg', '4deg']);

  return (
    <motion.div
      ref={ref}
      onMouseMove={e => {
        if (!ref.current || !isActive) return;
        const r = ref.current.getBoundingClientRect();
        mx.set((e.clientX - r.left) / r.width - 0.5);
        my.set((e.clientY - r.top) / r.height - 0.5);
        setMouse({ x: e.clientX - r.left, y: e.clientY - r.top });
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); mx.set(0); my.set(0); }}
      onClick={onActivate}
      style={{
        flex: isActive ? '3.5' : '0.5',
        minWidth: isActive ? 'auto' : '72px',
        height: '580px',
        borderRadius: 20,
        position: 'relative',
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'flex 0.7s cubic-bezier(0.4, 0, 0.2, 1)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        background: isActive ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.015)',
        border: isActive ? `1px solid ${product.color}35` : '1px solid rgba(255,255,255,0.06)',
        rotateX: isActive ? rotateX : 0,
        rotateY: isActive ? rotateY : 0,
        transformStyle: 'preserve-3d',
        perspective: 1200,
      }}
    >
      {/* ── COLOR EXPLOSION — top of card ── */}
      <motion.div
        animate={{ opacity: isActive ? 1 : 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: '55%',
          background: `radial-gradient(ellipse at 50% 0%, ${product.color}22 0%, ${product.color}08 45%, transparent 75%)`,
          pointerEvents: 'none', zIndex: 0,
        }}
      />
      {/* Cursor glow */}
      {isActive && (
        <motion.div animate={{ opacity: hovered ? 1 : 0 }} transition={{ duration: 0.3 }}
          style={{ position: 'absolute', top: mouse.y - 120, left: mouse.x - 120, width: 240, height: 240, borderRadius: '50%', background: `radial-gradient(circle, ${product.color}18 0%, transparent 65%)`, pointerEvents: 'none', zIndex: 1 }}
        />
      )}

      {/* ── COLLAPSED STATE ── */}
      {!isActive && (
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', zIndex: 2 }}>
          <div style={{ width: 40, height: 40, borderRadius: '50%', border: `1px solid ${product.color}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 100 }}>
            <span style={{ color: product.color, fontSize: 16 }}>{product.icon}</span>
          </div>
          <div style={{ position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%) rotate(-90deg)', whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ width: 4, height: 4, borderRadius: '50%', background: product.color, flexShrink: 0 }} />
            <span style={{ fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.55)' }}>{product.name}</span>
          </div>
        </div>
      )}

      {/* ── EXPANDED STATE — top-down layout ── */}
      {isActive && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          style={{ padding: '36px 40px', position: 'relative', zIndex: 2, height: '100%', display: 'flex', flexDirection: 'column' }}
        >
          {/* Tag top */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '5px 14px', borderRadius: 99, background: `${product.color}12`, border: `1px solid ${product.color}30`, marginBottom: 'auto', alignSelf: 'flex-start' }}>
            <span style={{ width: 4, height: 4, borderRadius: '50%', background: product.color }} />
            <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: 1.5, color: product.color, textTransform: 'uppercase' }}>{product.tag}</span>
          </div>
          {/* Content at bottom */}
          <div>
            <h3 style={{ fontSize: 'clamp(26px, 2.8vw, 40px)', fontWeight: 900, letterSpacing: '-0.04em', marginBottom: 8, lineHeight: 1.1 }}>{product.name}</h3>
            <p style={{ fontSize: 13, fontWeight: 700, color: product.color, marginBottom: 4 }}>{product.tagline}</p>
            <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.25)', marginBottom: 16, fontStyle: 'italic' }}>For: {product.who}</p>
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.45)', lineHeight: 1.7, marginBottom: 28, maxWidth: 400 }}>{product.desc}</p>
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} style={{ display: 'inline-block' }}>
              <Link href={product.href} onClick={e => e.stopPropagation()}
                style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '11px 24px', borderRadius: 99, background: product.color, color: '#000', fontWeight: 800, fontSize: 13, textDecoration: 'none' }}>
                Explore <FiArrowRight size={13} />
              </Link>
            </motion.div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}

/* ─────────────────────────────────
   SECTION HEADER
───────────────────────────────── */
function SH({ label, title, sub, align = 'left' }) {
  return (
    <motion.div variants={staggerContainer(0.1, 0.1)} initial="hidden" whileInView="show" viewport={{ once: false, amount: 0.2 }} style={{ marginBottom: 52, textAlign: align }}>
      {label && <motion.p variants={textVariant(0)} style={{ fontSize: 11, fontWeight: 800, letterSpacing: 3, color: 'rgba(165,180,252,0.5)', textTransform: 'uppercase', marginBottom: 14 }}>{label}</motion.p>}
      <motion.h2 variants={textVariant(0.1)} style={{ fontSize: 'clamp(30px, 4.5vw, 54px)', fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1.08, marginBottom: sub ? 18 : 0 }}>{title}</motion.h2>
      {sub && <motion.p variants={fadeIn('up', 'tween', 0.2, 0.8)} style={{ fontSize: 18, color: 'rgba(255,255,255,0.38)', maxWidth: 580, lineHeight: 1.72, margin: align === 'center' ? '0 auto' : 0 }}>{sub}</motion.p>}
    </motion.div>
  );
}

/* ─────────────────────────────────
   PAGE
───────────────────────────────── */
export default function HomeSpace() {
  const [active, setActive] = useState('rk-desktop');
  const P = '0 5%';
  const W = { maxWidth: 1200, margin: '0 auto' };

  return (
    <>
      <StarField />
      <div className="noise" aria-hidden />
      <Navbar />

      {/* ════════ 1. HERO ════════ */}
      <section className="layer" style={{ position: 'relative', zIndex: 10, minHeight: '100svh', display: 'flex', alignItems: 'center', padding: '160px 5% 80px' }}>
        <motion.div variants={staggerContainer(0.1, 0.2)} initial="hidden" animate="show" style={{ maxWidth: 1100, margin: '0 auto', width: '100%', textAlign: 'center' }}>
          <motion.div variants={fadeIn('up', 'tween', 0.1, 0.8)} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 18px', borderRadius: 99, border: '1px solid rgba(165,180,252,0.2)', background: 'rgba(165,180,252,0.06)', backdropFilter: 'blur(20px)', marginBottom: 48 }}>
            <motion.span animate={{ opacity: [1, 0.3, 1] }} transition={{ repeat: Infinity, duration: 2 }} style={{ width: 6, height: 6, borderRadius: '50%', background: '#a5b4fc', boxShadow: '0 0 8px #a5b4fc' }} />
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, color: 'rgba(255,255,255,0.55)', textTransform: 'uppercase' }}>RexyCore · Engineered in India</span>
          </motion.div>

          <motion.h1 variants={textVariant(0.2)} style={{ fontSize: 'clamp(50px, 9vw, 118px)', fontWeight: 900, letterSpacing: '-0.055em', lineHeight: 1, marginBottom: 32 }}>
            AI that runs<br />
            <span className="flowing-gradient" style={{ background: 'linear-gradient(90deg, #a5b4fc, #7dd3fc, #6ee7b7, #7dd3fc, #a5b4fc)' }}>on your machine.</span>
          </motion.h1>

          <motion.p variants={fadeIn('up', 'tween', 0.4, 0.9)} style={{ fontSize: 'clamp(17px, 2vw, 22px)', color: 'rgba(255,255,255,0.4)', maxWidth: 680, margin: '0 auto', lineHeight: 1.75, marginBottom: 52 }}>
            RexyCore builds software products that run AI locally whenever practical. The goal is not to reject cloud computing — it is to reduce unnecessary dependence on it, and give people more ownership over their software and data.
          </motion.p>

          <motion.div variants={fadeIn('up', 'tween', 0.55, 0.8)} style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center' }}>
            <PrimaryBtn href="/products">See the Products <FiArrowRight size={14} /></PrimaryBtn>
            <SecondaryBtn href="/about">How We Think</SecondaryBtn>
          </motion.div>
        </motion.div>
      </section>

      {/* gradient rule */}
      <div style={{ padding: P, marginBottom: 100, position: 'relative', zIndex: 10 }}>
        <div style={{ ...W, height: 1, background: 'linear-gradient(90deg, transparent, rgba(165, 180, 252, 0.25, 252, 180, rgba(165, transparent) 50%, transparent 100%)' }} />
      </div>

      {/* ════════ 2. THE PROBLEM ════════ */}
      <section className="layer" style={{ position: 'relative', zIndex: 10, padding: `0 ${P} 120px`, paddingLeft: '5%', paddingRight: '5%', paddingBottom: 120 }}>
        <div style={W}>
          <SH label="Why RexyCore Exists" title={<>Most AI tools are built around a server, <span style={{ color: 'rgba(255,255,255,0.2)' }}>not around you.</span></>} sub="When you send a query to a cloud AI, that request travels to a remote server, gets processed there, and the interaction is typically logged. For many tasks, that trade-off is unnecessary." />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 18 }}>
            {[
              { icon: <FiWifi size={18} />, t: 'Dependence by design', b: 'Most AI tools stop working the moment you lose internet access. That is a product decision, not a technical limitation — local hardware is often capable enough.', c: '#f87171' },
              { icon: <FiEye size={18} />, t: 'Data you did not choose to share', b: 'When AI runs remotely, every conversation becomes part of a larger system. The provider decides how that data is stored, used, and retained.', c: '#fb923c' },
              { icon: <FiPackage size={18} />, t: 'Products that do not talk to each other', b: 'Most AI tools exist in isolation. Your desktop assistant knows nothing about your system load, your keyboard has no context from your documents.', c: '#f87171' },
              { icon: <FiZap size={18} />, t: 'Intelligence that is not yours', b: 'Cloud AI is rented. The model, the compute, and the conversation history all live on someone else\'s infrastructure. RexyCore\'s goal is to change what is normal.', c: '#fb923c' },
            ].map((item, i) => (
              <Card3D key={item.t} delay={i * 0.08} orbColor="rgba(248,113,113,0.16)" style={{ padding: '30px 26px' }}>
                <div style={{ fontSize: 20, color: item.c, marginBottom: 18 }}>{item.icon}</div>
                <h3 style={{ fontSize: 17, fontWeight: 800, marginBottom: 10 }}>{item.t}</h3>
                <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.36)', lineHeight: 1.75 }}>{item.b}</p>
              </Card3D>
            ))}
          </div>
        </div>
      </section>

      {/* ════════ 3. THE SOLUTION ════════ */}
      <section className="layer" style={{ position: 'relative', zIndex: 10, padding: '0 5% 130px' }}>
        <div style={W}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 80, alignItems: 'center' }}>
            <div>
              <SH label="The Approach" title="Independent products. Local communication. One ecosystem." sub="RexyCore is not a single AI tool. It is a set of products with different responsibilities that can work together through local communication — without a cloud layer in the middle." />
              <CosmicBtn href="/products">See the Products <FiArrowRight size={14} /></CosmicBtn>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                { label: 'AI execution', value: 'On your hardware, not a server', c: '#a5b4fc' },
                { label: 'Internet access', value: 'Optional, not required', c: '#7dd3fc' },
                { label: 'Product design', value: 'Each product has one responsibility', c: '#6ee7b7' },
                { label: 'Data sharing', value: 'Between products, locally only', c: '#f9a8d4' },
                { label: 'Privacy approach', value: 'By architecture, not policy', c: '#fcd34d' },
              ].map((row, i) => (
                <motion.div key={row.label} initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: false, amount: 0.15 }} transition={{ duration: 0.5, delay: i * 0.08 }}
                  style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', borderRadius: 14, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.28)' }}>{row.label}</span>
                  <span style={{ fontSize: 14, fontWeight: 800, color: row.c }}>{row.value}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════ 4. PRODUCTS ════════ */}
      <section className="layer" style={{ position: 'relative', zIndex: 10, padding: '0 5% 160px' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          <SH label="Products" title="What RexyCore builds." sub="Each product has a specific purpose. Click to see what it does, why it exists, and what its current status is." />
          <motion.div variants={staggerContainer(0.5, 0.2)} initial="hidden" whileInView="show" viewport={{ once: false, amount: 0.1 }} style={{ display: 'flex', gap: 14, minHeight: 600 }}>
            {PRODUCTS.map(p => <ExploreCard key={p.id} product={p} active={active} onActivate={() => setActive(p.id)} />)}
          </motion.div>
        </div>
      </section>

      {/* ════════ 5. ECOSYSTEM ════════ */}
      <section className="layer" style={{ position: 'relative', zIndex: 10, padding: '0 5% 130px' }}>
        <div style={W}>
          <SH label="How They Fit Together" title="Products that share context, not data." sub="Each RexyCore product works independently. When multiple products are installed, they can communicate locally to improve each other's usefulness. There is no central server coordinating this — it happens on your machine." />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 18 }}>
            {[
              { from: 'RK AI Desktop', fromC: '#a5b4fc', to: 'MALUS', toC: '#6ee7b7', desc: 'When MALUS is running alongside RK AI Desktop, the desktop assistant can understand your current system state — what applications are open, how resources are being used — without you explaining it.' },
              { from: 'RK AI Home', fromC: '#f9a8d4', to: 'RK AI Desktop', toC: '#a5b4fc', desc: 'RK AI Home is designed to complement the desktop assistant rather than replace it. The two products cover different environments — one follows you around the house, the other is focused on your screen.' },
              { from: 'Light Key', fromC: '#fcd34d', to: 'Any Application', toC: 'rgba(255,255,255,0.4)', desc: 'Light Key works at the input layer, so it is not limited to one application. Wherever you type, it can offer local suggestions. No other product in the ecosystem needs to change to support it.' },
              { from: 'Lumina OS', fromC: '#7dd3fc', to: 'Ecosystem', toC: 'rgba(255,255,255,0.4)', desc: 'Lumina OS is the long-term foundation. When it is ready, the goal is for all RexyCore products to run on an operating environment designed around the same privacy principles from the start.' },
            ].map((item, i) => (
              <Card3D key={i} delay={i * 0.1} orbColor="rgba(103,232,249,0.14)" style={{ padding: '28px 26px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14, flexWrap: 'wrap' }}>
                  <span style={{ fontSize: 11, fontWeight: 800, color: item.fromC, background: `${item.fromC}14`, padding: '4px 10px', borderRadius: 99 }}>{item.from}</span>
                  <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.2)' }}>→</span>
                  <span style={{ fontSize: 11, fontWeight: 800, color: item.toC, background: `${item.toC}14`, padding: '4px 10px', borderRadius: 99 }}>{item.to}</span>
                </div>
                <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.38)', lineHeight: 1.75 }}>{item.desc}</p>
              </Card3D>
            ))}
          </div>
        </div>
      </section>

      {/* ════════ 6. CORE PRINCIPLES ════════ */}
      <section className="layer" style={{ position: 'relative', zIndex: 10, padding: '0 5% 130px' }}>
        <div style={W}>
          <SH label="Design Principles" title="The decisions that guide every product." sub="These are not marketing positions. They are the actual constraints that shape how each product is designed and built." />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 18 }}>
            {[
              { icon: <FiLock size={18} />, t: 'Local-first whenever practical', b: 'If a task can be done on your hardware without a meaningful trade-off in quality, it should be. Sending data to a server should require a reason, not be the default.', c: '#a5b4fc' },
              { icon: <FiEye size={18} />, t: 'Privacy by architecture', b: 'Privacy is more reliable when it is the result of how a system is built, not what it promises. If data never leaves the device, a policy is not needed to protect it.', c: '#7dd3fc' },
              { icon: <FiShield size={18} />, t: 'User ownership over data', b: 'Your conversations, documents, and usage patterns should belong to you. RexyCore products do not retain or transmit that information to build profiles or train models.', c: '#6ee7b7' },
              { icon: <FiWifi size={18} />, t: 'Transparency over hidden behavior', b: 'Software should be honest about what it is doing. RexyCore products do not run hidden background processes or make network calls without a clear purpose.', c: '#fcd34d' },
              { icon: <FiZap size={18} />, t: 'Clear product responsibilities', b: 'Each product in the ecosystem does one thing well rather than expanding to do everything. That makes each product easier to understand, audit, and trust.', c: '#f9a8d4' },
              { icon: <FiHeart size={18} />, t: 'AI should assist, not collect', b: 'AI that improves by collecting your behavior is a conflict of interest. RexyCore products improve through development, not through harvesting what you do.', c: '#a5b4fc' },
            ].map((item, i) => (
              <Card3D key={item.t} delay={(i % 3) * 0.08} orbColor={`${item.c}20`} style={{ padding: '30px 26px' }}>
                <div style={{ fontSize: 20, color: item.c, marginBottom: 18 }}>{item.icon}</div>
                <h3 style={{ fontSize: 17, fontWeight: 800, marginBottom: 10 }}>{item.t}</h3>
                <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.36)', lineHeight: 1.75 }}>{item.b}</p>
              </Card3D>
            ))}
          </div>
        </div>
      </section>

      {/* ════════ 7. TECHNOLOGY ════════ */}
      <section className="layer" style={{ position: 'relative', zIndex: 10, padding: '0 5% 130px' }}>
        <div style={W}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 80, alignItems: 'start' }}>
            <SH label="How It Works" title="What running AI locally actually means." sub="Running AI locally means the model lives on your computer, not on a remote server. Your input is processed by your CPU or GPU and the response is generated on the same machine." />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                { t: 'On-device inference', b: 'AI models run on your CPU or GPU. Responses are generated locally. Nothing in that process requires a network connection.', c: '#a5b4fc' },
                { t: 'Supported platforms', b: 'RK AI Desktop supports macOS, Windows, and Linux. Lumina OS is a future operating environment being designed around the same principles.', c: '#7dd3fc' },
                { t: 'Open model compatibility', b: 'RexyCore products are designed to work with open AI models rather than locking users into a proprietary model that only runs on our infrastructure.', c: '#6ee7b7' },
                { t: 'Local inter-product communication', b: 'When multiple RexyCore products are installed, they communicate with each other on your machine. That communication does not pass through an external server.', c: '#f9a8d4' },
                { t: 'What the cloud is used for', b: 'Some features, like account management and software updates, use network access. When they do, that is documented. Local AI execution does not depend on it.', c: '#fcd34d' },
              ].map((item, i) => (
                <motion.div key={item.t} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, amount: 0.15 }} transition={{ duration: 0.5, delay: i * 0.08 }}
                  style={{ padding: '18px 22px', borderRadius: 16, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <h4 style={{ fontSize: 14, fontWeight: 800, color: item.c, marginBottom: 7 }}>{item.t}</h4>
                  <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.33)', lineHeight: 1.7 }}>{item.b}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════ 8. VISION ════════ */}
      <section className="layer" style={{ position: 'relative', zIndex: 10, padding: '0 5% 130px' }}>
        <div style={W}>
          <SH label="Where This Is Heading" title="What we are still building." sub="These are honest statements about what does not exist yet. We list them because transparency about what is in development is more useful than pretending it already works." align="center" />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 18 }}>
            {[
              { icon: <FiCpu size={18} />, t: 'Lumina OS', b: 'An operating system designed so that privacy is a core architectural decision rather than a setting you can turn on. It is currently in development.', c: '#a5b4fc' },
              { icon: <FiGlobe size={18} />, t: 'Light Key Beta', b: 'Light Key is not available yet. The goal is an AI keyboard layer that works across all applications without any cloud dependency.', c: '#7dd3fc' },
              { icon: <FiCode size={18} />, t: 'Deeper ecosystem integration', b: 'As more RexyCore products ship, their local communication becomes more useful. The goal is context that improves across the ecosystem without leaving your machine.', c: '#6ee7b7' },
              { icon: <FiMap size={18} />, t: 'Broader hardware support', b: 'Local AI depends on local hardware. As inference becomes more efficient, RexyCore products will support a wider range of devices with fewer requirements.', c: '#f9a8d4' },
            ].map((item, i) => (
              <Card3D key={item.t} delay={i * 0.1} orbColor={`${item.c}1a`} style={{ padding: '30px 26px' }}>
                <div style={{ fontSize: 20, color: item.c, marginBottom: 18 }}>{item.icon}</div>
                <h3 style={{ fontSize: 17, fontWeight: 800, marginBottom: 10 }}>{item.t}</h3>
                <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.36)', lineHeight: 1.75 }}>{item.b}</p>
              </Card3D>
            ))}
          </div>
        </div>
      </section>

      {/* ════════ 9. DEVELOPERS ════════ */}
      <section className="layer" style={{ position: 'relative', zIndex: 10, padding: '0 5% 130px' }}>
        <div style={W}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 80, alignItems: 'center' }}>
            <div>
              <SH label="For Developers" title="We do not have a developer program yet." sub="No SDK, no public API, no open-source repository to link to here. When that changes, this section will be updated. We are listing it now so it is honest rather than empty." />
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <button disabled style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '13px 22px', borderRadius: 99, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.35)', fontWeight: 700, fontSize: 14, cursor: 'not-allowed', fontFamily: 'inherit' }}>
                  <FiCode size={14} /> Docs <span style={{ fontSize: 10, padding: '2px 8px', borderRadius: 99, background: 'rgba(245,158,11,0.15)', color: '#f59e0b', fontWeight: 800, letterSpacing: 0.5, border: '1px solid rgba(245,158,11,0.3)' }}>NOT YET</span>
                </button>
                <button disabled style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '13px 22px', borderRadius: 99, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.35)', fontWeight: 700, fontSize: 14, cursor: 'not-allowed', fontFamily: 'inherit' }}>
                  <FiGitBranch size={14} /> SDK <span style={{ fontSize: 10, padding: '2px 8px', borderRadius: 99, background: 'rgba(245,158,11,0.15)', color: '#f59e0b', fontWeight: 800, letterSpacing: 0.5, border: '1px solid rgba(245,158,11,0.3)' }}>NOT YET</span>
                </button>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                { t: 'What is possible today', b: 'You can use RexyCore products as they are designed. There is no public integration layer yet for building on top of them.', c: '#a5b4fc' },
                { t: 'What is being considered', b: 'As the ecosystem matures, exposing local APIs between products is something we are thinking about. Nothing is ready to announce.', c: '#7dd3fc' },
                { t: 'Open model support', b: 'RK AI Desktop is designed to work with open AI models. You can use your own models rather than being locked into one provider.', c: '#6ee7b7' },
              ].map((item, i) => (
                <motion.div key={item.t} initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: false, amount: 0.15 }} transition={{ duration: 0.5, delay: i * 0.1 }}
                  style={{ padding: '18px 22px', borderRadius: 16, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <h4 style={{ fontSize: 14, fontWeight: 800, color: item.c, marginBottom: 7 }}>{item.t}</h4>
                  <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.33)', lineHeight: 1.7 }}>{item.b}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════ 10. TRUST ════════ */}
      <section className="layer" style={{ position: 'relative', zIndex: 10, padding: '0 5% 130px' }}>
        <div style={W}>
          <SH label="The Current State" title="What exists today." sub="A plain summary of what is available now and what is still being built. No numbers invented to fill space." align="center" />
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, amount: 0.15 }}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 24, background: 'rgba(255,255,255,0.01)', backdropFilter: 'blur(20px)' }}>
            {[
              { n: '2', label: 'Products Available', sub: 'RK AI Desktop & MALUS', c: '#a5b4fc' },
              { n: '1', label: 'Pre-order Open', sub: 'RK AI Home', c: '#7dd3fc' },
              { n: '2', label: 'In Development', sub: 'Lumina OS & Light Key', c: '#6ee7b7' },
              { n: '0', label: 'Cloud Required', sub: 'For AI features', c: '#f9a8d4' },
            ].map((s, i, arr) => (
              <div key={s.label} style={{ padding: '40px 16px', textAlign: 'center', borderRight: i < arr.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none' }}>
                <div style={{ fontSize: 'clamp(36px, 4vw, 52px)', fontWeight: 900, letterSpacing: '-0.04em', color: s.c }}>{s.n}</div>
                <div style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.38)', letterSpacing: 1.5, textTransform: 'uppercase', marginTop: 10 }}>{s.label}</div>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.18)', marginTop: 4 }}>{s.sub}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ════════ 11. COMMUNITY ════════ */}
      <section className="layer" style={{ position: 'relative', zIndex: 10, padding: '0 5% 130px' }}>
        <div style={W}>
          <SH label="Following the Work" title="How to stay informed." sub="RexyCore is still early. The most honest thing we can offer is transparency about what we are building and why." align="center" />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
            {[
              { icon: <FiUsers size={18} />, t: 'Contact us', b: 'If you have a question about a product, a concern, or feedback on the direction of the company, we want to hear it directly.', href: '/contact', c: '#a5b4fc' },
              { icon: <FiGitBranch size={18} />, t: 'Read about the products', b: 'Each product page explains what that product is, why it exists, and what its current status is. Start with whatever interests you.', href: '/products', c: '#6ee7b7' },
              { icon: <FiMap size={18} />, t: 'The philosophy behind this', b: 'If you want to understand why RexyCore makes the decisions it does, the about page explains the thinking behind the company.', href: '/about', c: '#7dd3fc' },
              { icon: <FiFlag size={18} />, t: 'Suggest something', b: 'If there is a feature that would make a product meaningfully more useful, or a problem we have not addressed, send it our way.', href: '/contact', c: '#f9a8d4' },
            ].map((item, i) => (
              <Card3D key={item.t} delay={i * 0.08} orbColor={`${item.c}18`} style={{ padding: '26px 22px' }}>
                <div style={{ fontSize: 20, color: item.c, marginBottom: 14 }}>{item.icon}</div>
                <h3 style={{ fontSize: 16, fontWeight: 800, marginBottom: 8 }}>{item.t}</h3>
                <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.33)', lineHeight: 1.7, marginBottom: 14 }}>{item.b}</p>
                <Link href={item.href} style={{ fontSize: 12, fontWeight: 700, color: item.c, textDecoration: 'none' }}>Get involved →</Link>
              </Card3D>
            ))}
          </div>
        </div>
      </section>

      {/* ════════ 12. FINAL CTA ════════ */}
      <section className="layer" style={{ position: 'relative', zIndex: 10, padding: '0 5% 160px' }}>
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, amount: 0.15 }}
          style={{ maxWidth: 860, margin: '0 auto', padding: '80px 5%', borderRadius: 32, background: 'rgba(255,255,255,0.012)', border: '1px solid rgba(165,180,252,0.15)', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: -100, left: '50%', transform: 'translateX(-50%)', width: '80%', height: 200, background: 'radial-gradient(ellipse, rgba(165,180,252,0.1) 0%, transparent 70%)', filter: 'blur(40px)' }} />
          <h2 style={{ fontSize: 'clamp(30px, 5vw, 52px)', fontWeight: 900, letterSpacing: '-0.04em', marginBottom: 18, position: 'relative' }}>Start with what is available.</h2>
          <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.3)', position: 'relative', maxWidth: 480, margin: '0 auto 44px', lineHeight: 1.7 }}>RK AI Desktop and MALUS are available now. RK AI Home is in pre-order. Lumina OS and Light Key are in development. Begin with what is ready, and the rest will follow.</p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <PrimaryBtn href="/products">See the Products <FiArrowRight size={14} /></PrimaryBtn>
            <CosmicBtn href="/subscription">View Plans</CosmicBtn>
          </div>
        </motion.div>
      </section>

      <div style={{ position: 'relative', zIndex: 10 }}><Footer /></div>
      <ChatWidget />
    </>
  );
}
