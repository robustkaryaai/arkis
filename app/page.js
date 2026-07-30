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
            A local AI ecosystem<br />
            <span className="flowing-gradient" style={{ background: 'linear-gradient(90deg, #a5b4fc, #7dd3fc, #6ee7b7, #7dd3fc, #a5b4fc)' }}>built to last.</span>
          </motion.h1>

          <motion.p variants={fadeIn('up', 'tween', 0.4, 0.9)} style={{ fontSize: 'clamp(17px, 2vw, 22px)', color: 'rgba(255,255,255,0.4)', maxWidth: 680, margin: '0 auto', lineHeight: 1.75, marginBottom: 52 }}>
            RexyCore is a software company building an ecosystem of independent AI products. Each product has a specific responsibility. When used together, they share context through local communication without routing anything through a cloud service.
          </motion.p>

          <motion.div variants={fadeIn('up', 'tween', 0.55, 0.8)} style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center' }}>
            <PrimaryBtn href="/products">See the Products <FiArrowRight size={14} /></PrimaryBtn>
            <SecondaryBtn href="/about">How RexyCore Thinks</SecondaryBtn>
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
          <SH label="The Ecosystem" title={<>Five products. One <span className="flowing-gradient" style={{ background: 'linear-gradient(90deg, #a5b4fc, #7dd3fc, #a5b4fc)' }}>local network.</span></>} sub="RexyCore is not a single application. It is a set of specialized products that each solve a specific problem. Individually, each product is useful on its own. When multiple products are installed, they communicate locally to share context — without a server in the middle." />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 18 }}>
            {[
              { icon: <FiWifi size={18} />, t: 'Independent by design', b: 'Each product has a single defined responsibility. RK AI Desktop handles conversation and document interaction. MALUS handles system observation. Neither product tries to do the other\'s job.', c: '#a5b4fc' },
              { icon: <FiPackage size={18} />, t: 'Local communication', b: 'Products that are installed on the same machine can exchange context through a local communication channel. This happens on-device. The channel does not route through any external infrastructure.', c: '#7dd3fc' },
              { icon: <FiEye size={18} />, t: 'Shared context, not shared data', b: 'When MALUS tells RK AI Desktop what applications are open and how the system is performing, that is context passing locally between two processes. No data leaves the machine.', c: '#6ee7b7' },
              { icon: <FiZap size={18} />, t: 'Additive value', b: 'Adding a second RexyCore product improves the usefulness of the products already installed. The more of the ecosystem you use, the more context each product has to work with — all of it local.', c: '#fcd34d' },
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
              <SH label="The RexyCore API" title="How products communicate locally." sub="RexyCore products communicate through a local API layer that runs on your machine. This is how MALUS passes system state to RK AI Desktop, and how future products will exchange context as the ecosystem grows." />
              <CosmicBtn href="/products">Explore the Products <FiArrowRight size={14} /></CosmicBtn>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                { label: 'Communication layer', value: 'Local, on-device only', c: '#a5b4fc' },
                { label: 'Data scope', value: 'Context, not conversation history', c: '#7dd3fc' },
                { label: 'External routing', value: 'None for AI features', c: '#6ee7b7' },
                { label: 'Product coupling', value: 'Loose — each product is optional', c: '#f9a8d4' },
                { label: 'Expansion', value: 'New products join the same local layer', c: '#fcd34d' },
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
          <SH label="Products" title="Five products. Five responsibilities." sub="Each RexyCore product is designed to solve one specific problem well. Click any product to read what it does, how it works, and what its current status is." />
          <motion.div variants={staggerContainer(0.5, 0.2)} initial="hidden" whileInView="show" viewport={{ once: false, amount: 0.1 }} style={{ display: 'flex', gap: 14, minHeight: 600 }}>
            {PRODUCTS.map(p => <ExploreCard key={p.id} product={p} active={active} onActivate={() => setActive(p.id)} />)}
          </motion.div>
        </div>
      </section>

      {/* ════════ 5. ECOSYSTEM ════════ */}
      <section className="layer" style={{ position: 'relative', zIndex: 10, padding: '0 5% 130px' }}>
        <div style={W}>
          <SH label="Ecosystem Integration" title="How RexyCore products share context." sub="Products in the RexyCore ecosystem can communicate through a local inter-process channel. This allows one product to pass information to another without any network request. The following are the active integration paths that exist today." />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 18 }}>
            {[
              { from: 'MALUS', fromC: '#6ee7b7', to: 'RK AI Desktop', toC: '#a5b4fc', desc: 'MALUS continuously observes processor load, memory usage, running applications, and workflow patterns. When RK AI Desktop is also installed, it can query that context to produce more relevant responses — such as knowing what you\'re currently working on without you explaining it.' },
              { from: 'RK AI Home', fromC: '#f9a8d4', to: 'RK AI Desktop', toC: '#a5b4fc', desc: 'RK AI Home and RK AI Desktop are designed to cover different environments. The home device handles voice interaction in physical spaces. The desktop assistant handles screen-based work. Together they extend continuous assistance across both.' },
              { from: 'Light Key', fromC: '#fcd34d', to: 'Any Application', toC: 'rgba(255,255,255,0.4)', desc: 'Light Key operates at the OS input layer rather than inside a specific application. This means it provides suggestions in any text field, across any application, without requiring integration work from those applications.' },
              { from: 'Lumina OS', fromC: '#7dd3fc', to: 'Full Ecosystem', toC: 'rgba(255,255,255,0.4)', desc: 'Lumina OS is the planned long-term foundation. When complete, the goal is for all RexyCore products to run on an operating environment where local AI, privacy, and system services are designed together from the start rather than layered on top.' },
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
          <SH label="Engineering Decisions" title="Why the ecosystem is structured this way." sub="RexyCore products are independent because a monolithic application that does everything is harder to extend, harder to audit, and breaks entirely when one component has a problem. Separate products with defined responsibilities are more maintainable and more trustworthy." />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 18 }}>
            {[
              { icon: <FiLock size={18} />, t: 'Single responsibility per product', b: 'MALUS observes the system. RK AI Desktop handles conversation and document work. Light Key handles keyboard input. Each product does one thing well rather than expanding to do everything.', c: '#a5b4fc' },
              { icon: <FiEye size={18} />, t: 'Local-first AI execution', b: 'AI inference runs on your hardware using open model weights. The model files live on your machine. When you query a local model, the round-trip is entirely within your own device.', c: '#7dd3fc' },
              { icon: <FiShield size={18} />, t: 'Loose coupling between products', b: 'Every RexyCore product functions independently. Installing MALUS improves RK AI Desktop, but RK AI Desktop works without it. Products are optional, not dependencies.', c: '#6ee7b7' },
              { icon: <FiWifi size={18} />, t: 'Cloud used selectively', b: 'RexyCore products prefer local execution. Google APIs and cloud services are used only when local hardware genuinely cannot perform the task — such as live web search or tasks requiring compute the device does not have.', c: '#fcd34d' },
              { icon: <FiZap size={18} />, t: 'Open model compatibility', b: 'Products work with open AI model weights rather than a proprietary model tied to RexyCore infrastructure. You can use your own models with compatible formats.', c: '#f9a8d4' },
              { icon: <FiHeart size={18} />, t: 'Context without collection', b: 'When products share context locally, the shared data is scoped to what is needed for the task — active application name, system load, recent input. It is not a full behavioral record.', c: '#a5b4fc' },
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
            <SH label="Local AI Inference" title="What happens when you run AI on your own hardware." sub="Local inference means the AI model runs as a process on your machine. Your input is tokenized, passed to the model, and the output is generated — all within your own CPU or GPU. No network request is made during this process." />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                { t: 'Model execution', b: 'Open model weights are loaded into memory on your device. Inference runs against those weights locally. The model can be any compatible open format — it does not need to be a RexyCore-provided model.', c: '#a5b4fc' },
                { t: 'Hardware acceleration', b: 'On devices with capable GPUs, inference is accelerated using the GPU rather than the CPU. This significantly reduces response latency. On CPU-only machines, inference is slower but still functional.', c: '#7dd3fc' },
                { t: 'Supported platforms', b: 'RK AI Desktop runs on macOS, Windows, and Linux. Hardware acceleration support varies by platform and GPU vendor. Lumina OS will extend this to a purpose-built environment.', c: '#6ee7b7' },
                { t: 'When cloud is used', b: 'For tasks that genuinely require it — live web search, content that requires real-time data, or capabilities beyond local hardware — RexyCore products may route to cloud services. This is done with your permission and documented clearly.', c: '#f9a8d4' },
                { t: 'Open model compatibility', b: 'RexyCore products target open model formats rather than a proprietary model format. This means you can bring your own weights and run them within the product without being locked to a single model provider.', c: '#fcd34d' },
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
          <SH label="Roadmap" title="Products in development." sub="The following products are either in active development or planned. None of these are available for download today." align="center" />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 18 }}>
            {[
              { icon: <FiCpu size={18} />, t: 'Lumina OS', b: 'An operating system being designed so that privacy, local AI, and system transparency are architectural decisions. Not an existing Linux distribution with added software — a purpose-built environment for the RexyCore ecosystem.', c: '#a5b4fc' },
              { icon: <FiGlobe size={18} />, t: 'Light Key', b: 'An AI keyboard layer that provides suggestions wherever you type, across all applications. Inference runs locally. The goal is AI typing assistance that does not require any application-level integration.', c: '#7dd3fc' },
              { icon: <FiCode size={18} />, t: 'Deeper ecosystem context', b: 'As more products ship and the local communication layer matures, the amount of context that products can share will grow. Each new product in the ecosystem makes the existing ones more capable.', c: '#6ee7b7' },
              { icon: <FiMap size={18} />, t: 'Broader hardware targets', b: 'Current products run best on machines with 8GB or more of RAM and a capable GPU for acceleration. As model quantization improves, the minimum hardware requirements will decrease.', c: '#f9a8d4' },
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
              <SH label="Cloud Philosophy" title="Local-first, not local-only." sub="RexyCore products are designed to run AI tasks locally whenever possible. Cloud services are used only when the task genuinely requires them — not because they are more convenient to implement." />
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <button disabled style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '13px 22px', borderRadius: 99, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.35)', fontWeight: 700, fontSize: 14, cursor: 'not-allowed', fontFamily: 'inherit' }}>
                  <FiCode size={14} /> Developer Docs <span style={{ fontSize: 10, padding: '2px 8px', borderRadius: 99, background: 'rgba(245,158,11,0.15)', color: '#f59e0b', fontWeight: 800, letterSpacing: 0.5, border: '1px solid rgba(245,158,11,0.3)' }}>IN PROGRESS</span>
                </button>
                <button disabled style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '13px 22px', borderRadius: 99, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.35)', fontWeight: 700, fontSize: 14, cursor: 'not-allowed', fontFamily: 'inherit' }}>
                  <FiGitBranch size={14} /> Local SDK <span style={{ fontSize: 10, padding: '2px 8px', borderRadius: 99, background: 'rgba(245,158,11,0.15)', color: '#f59e0b', fontWeight: 800, letterSpacing: 0.5, border: '1px solid rgba(245,158,11,0.3)' }}>IN PROGRESS</span>
                </button>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                { t: 'When local execution is used', b: 'Document interaction, code assistance, conversation, system observation, and keyboard suggestions all run locally. These are the core use cases for every RexyCore product.', c: '#a5b4fc' },
                { t: 'When cloud is used', b: 'Tasks that require live data — such as web search — or tasks that exceed local hardware capability may route to cloud services like Google APIs. This is done with explicit user permission.', c: '#7dd3fc' },
                { t: 'What is never sent remotely', b: 'Local conversation history, document contents, system observation data, and keystroke input are not transmitted to any external service. These stay on the device.', c: '#6ee7b7' },
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
          <SH label="Current Status" title="What is available today." sub="A summary of where each product stands. Product pages contain the full detail." align="center" />
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, amount: 0.15 }}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 24, background: 'rgba(255,255,255,0.01)', backdropFilter: 'blur(20px)' }}>
            {[
              { n: '2', label: 'Available Now', sub: 'RK AI Desktop & MALUS', c: '#a5b4fc' },
              { n: '1', label: 'Pre-order Open', sub: 'RK AI Home (hardware)', c: '#7dd3fc' },
              { n: '2', label: 'In Development', sub: 'Lumina OS & Light Key', c: '#6ee7b7' },
              { n: '0', label: 'Cloud for AI', sub: 'Local inference only', c: '#f9a8d4' },
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
          <SH label="Learn More" title="Go deeper into the ecosystem." sub="The product pages cover each product's purpose, architecture, and current status in full. The about page explains the thinking behind the company." align="center" />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
            {[
              { icon: <FiMonitor size={18} />, t: 'RK AI Desktop', b: 'How local AI models run on your machine, what the product can do with documents and code, and how it integrates with MALUS for system context.', href: '/products/rk-ai-desktop', c: '#a5b4fc' },
              { icon: <FiActivity size={18} />, t: 'MALUS', b: 'How continuous system observation works, what MALUS monitors, what it does not do, and how it provides context to other RexyCore products.', href: '/products/malus', c: '#6ee7b7' },
              { icon: <FiGlobe size={18} />, t: 'RK AI Home', b: 'The design of a dedicated home AI device, how it handles voice interaction locally, and how it complements the desktop product.', href: '/products/rk-ai-home', c: '#f9a8d4' },
              { icon: <FiMap size={18} />, t: 'The Vision', b: 'Why RexyCore is building an ecosystem rather than a single product, and where the long-term architecture is intended to go.', href: '/about', c: '#7dd3fc' },
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
          <h2 style={{ fontSize: 'clamp(30px, 5vw, 52px)', fontWeight: 900, letterSpacing: '-0.04em', marginBottom: 18, position: 'relative' }}>Start with the products that are ready.</h2>
          <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.3)', position: 'relative', maxWidth: 520, margin: '0 auto 44px', lineHeight: 1.7 }}>RK AI Desktop and MALUS are available now on macOS, Windows, and Linux. RK AI Home hardware is available for pre-order. Lumina OS and Light Key are in development.</p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <PrimaryBtn href="/products">Browse Products <FiArrowRight size={14} /></PrimaryBtn>
            <CosmicBtn href="/subscription">View Plans</CosmicBtn>
          </div>
        </motion.div>
      </section>

      <div style={{ position: 'relative', zIndex: 10 }}><Footer /></div>
      <ChatWidget />
    </>
  );
}
