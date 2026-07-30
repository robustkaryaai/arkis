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
  { id: 'rk-desktop', color: '#a5b4fc', glow: 'rgba(99,102,241,0.5)',  icon: <FiMonitor size={22} />,  tag: 'Available Now',   name: 'RK AI Desktop', who: 'Developers, power users, creators',   tagline: 'The intelligent operating layer.', desc: 'The most capable local AI assistant ever built. Deeply integrated into your operating system — it understands what you are working on, surfaces information proactively, and never phones home. Your hardware. Your model. Your rules.', href: '/products/rk-ai-desktop' },
  { id: 'rk-home',    color: '#f9a8d4', glow: 'rgba(236,72,153,0.5)',  icon: <FiGlobe size={22} />,    tag: 'Pre-order Open',  name: 'RK AI Home',    who: 'Families, smart home users',         tagline: 'Voice-first private AI.',         desc: 'A voice AI that actually belongs to you. No cloud microphone stream, no data harvesting. Rexy listens, understands, and responds entirely within your home network. Privacy is not a feature — it is the architecture.', href: '/products/rk-ai-home' },
  { id: 'malus',      color: '#6ee7b7', glow: 'rgba(16,185,129,0.5)',  icon: <FiActivity size={22} />, tag: 'Available Now',   name: 'MALUS',         who: 'Developers, analysts, power users',  tagline: 'System observer. Zero telemetry.', desc: 'Observe everything your machine does — CPU, RAM, battery, network, active apps, workflows. MALUS builds a complete behavioral model of your device locally. It knows your patterns better than any cloud service, and shares none of it.', href: '/products/malus' },
  { id: 'lumina',     color: '#7dd3fc', glow: 'rgba(14,165,233,0.5)',  icon: <FiTerminal size={22} />, tag: 'In Development',  name: 'Lumina OS',     who: 'Privacy-conscious users, enterprises', tagline: 'Privacy-native OS.',              desc: 'An operating system designed by default around privacy. Lumina OS eliminates the surveillance layer baked into every mainstream OS today. No forced updates, no telemetry, no account requirements. Just computing that belongs entirely to you.', href: '/products/lumina-os' },
  { id: 'lightkey',   color: '#fcd34d', glow: 'rgba(245,158,11,0.5)',  icon: <FiCpu size={22} />,     tag: 'Beta Soon',       name: 'Light Key',     who: 'Writers, coders, anyone who types',  tagline: 'Keyboard AI. Completely local.',   desc: 'AI completion at the lowest level of input — the keyboard. Light Key predicts and completes your thoughts in any app, on any window, without ever leaving your machine. No cloud autocomplete. No logging. Pure local inference.', href: '/products/light-key' },
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
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, color: 'rgba(255,255,255,0.55)', textTransform: 'uppercase' }}>Rexycore · Engineered in India</span>
          </motion.div>

          <motion.h1 variants={textVariant(0.2)} style={{ fontSize: 'clamp(50px, 9vw, 118px)', fontWeight: 900, letterSpacing: '-0.055em', lineHeight: 1, marginBottom: 32 }}>
            AI that works<br />
            <span className="flowing-gradient" style={{ background: 'linear-gradient(90deg, #a5b4fc, #7dd3fc, #6ee7b7, #7dd3fc, #a5b4fc)' }}>for you.</span>
          </motion.h1>

          <motion.p variants={fadeIn('up', 'tween', 0.4, 0.9)} style={{ fontSize: 'clamp(17px, 2vw, 22px)', color: 'rgba(255,255,255,0.4)', maxWidth: 680, margin: '0 auto', lineHeight: 1.75, marginBottom: 52 }}>
            Rexycore is a privacy-first AI ecosystem. Five interconnected products. Zero telemetry. All running on your hardware — orbiting only your world.
          </motion.p>

          <motion.div variants={fadeIn('up', 'tween', 0.55, 0.8)} style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center' }}>
            <PrimaryBtn href="/products">Explore Products <FiArrowRight size={14} /></PrimaryBtn>
            <SecondaryBtn href="/about">Our Philosophy</SecondaryBtn>
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
          <SH label="The Problem" title={<>The modern web is built on <span style={{ color: 'rgba(255,255,255,0.2)' }}>surveillance.</span></>} sub="Every AI assistant trains on your conversations. Every cloud model logs your queries. Your most private moments feed someone else's dataset." />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 18 }}>
            {[
              { icon: <FiWifi size={18} />, t: 'Cloud-dependent by default', b: 'Every major AI product requires persistent internet and sends your data to remote servers for processing. You are the product.', c: '#f87171' },
              { icon: <FiEye size={18} />, t: 'Privacy as an afterthought', b: 'Privacy policies protect companies, not users. Your queries, context, and behavior are all logged, analyzed, and sold.', c: '#fb923c' },
              { icon: <FiPackage size={18} />, t: 'Fragmented toolchains', b: 'Dozens of disconnected AI tools that don\'t share context — each with its own subscription and its own data silo.', c: '#f87171' },
              { icon: <FiZap size={18} />, t: 'Subscription fatigue', b: 'Pay monthly to rent intelligence that disappears the moment you stop. You own nothing. Their knowledge of you is theirs.', c: '#fb923c' },
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
              <SH label="The Solution" title="A connected AI ecosystem that belongs entirely to you." sub="Not one product — an interconnected suite of AI modules. All on your hardware. All offline-capable. All private by architecture." />
              <CosmicBtn href="/products">See the Ecosystem <FiArrowRight size={14} /></CosmicBtn>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                { label: 'Architecture', value: 'Local-first, offline-capable', c: '#a5b4fc' },
                { label: 'Data model', value: 'Zero retention, zero transit', c: '#7dd3fc' },
                { label: 'AI execution', value: 'On-device inference only', c: '#6ee7b7' },
                { label: 'Connectivity', value: 'Optional, never required', c: '#f9a8d4' },
                { label: 'Licensing', value: 'Perpetual, no cloud lock-in', c: '#fcd34d' },
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
          <SH label="Products" title="Choose your orbit." sub="Click any module to explore. Every product is powerful alone — extraordinary together." />
          <motion.div variants={staggerContainer(0.5, 0.2)} initial="hidden" whileInView="show" viewport={{ once: false, amount: 0.1 }} style={{ display: 'flex', gap: 14, minHeight: 600 }}>
            {PRODUCTS.map(p => <ExploreCard key={p.id} product={p} active={active} onActivate={() => setActive(p.id)} />)}
          </motion.div>
        </div>
      </section>

      {/* ════════ 5. ECOSYSTEM ════════ */}
      <section className="layer" style={{ position: 'relative', zIndex: 10, padding: '0 5% 130px' }}>
        <div style={W}>
          <SH label="Ecosystem" title="Five products. One brain." sub="Each module is powerful alone. Together they form an intelligence layer that understands your entire computing life." />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 18 }}>
            {[
              { from: 'RK AI Desktop', fromC: '#a5b4fc', to: 'MALUS', toC: '#6ee7b7', desc: 'RK AI Desktop reads system context from MALUS — understanding your active workflows, resource state, and app patterns to give smarter, faster responses.' },
              { from: 'MALUS', fromC: '#6ee7b7', to: 'Lumina OS', toC: '#7dd3fc', desc: 'On Lumina OS, MALUS integrates at the kernel level for a behavioral model with zero overhead and zero telemetry ever leaving the machine.' },
              { from: 'RK AI Home', fromC: '#f9a8d4', to: 'RK AI Desktop', toC: '#a5b4fc', desc: 'Your home and desktop assistants share a local knowledge graph. Ask Rexy at home, continue on desktop — zero cloud sync required.' },
              { from: 'Light Key', fromC: '#fcd34d', to: 'All Modules', toC: 'rgba(255,255,255,0.4)', desc: 'Light Key sits at the input layer across all products. Intelligent completion in every window, powered by local context from the whole ecosystem.' },
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
          <SH label="Core Principles" title="The laws we don't break." sub="These are not promises. They are architectural constraints baked into every product we ship." />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 18 }}>
            {[
              { icon: <FiLock size={18} />, t: 'Privacy first', b: 'Every design decision starts with a single question: does this expose user data? If yes, we find another way.', c: '#a5b4fc' },
              { icon: <FiEye size={18} />, t: 'Transparency', b: 'We document what our software does. No hidden services. No background processes. No secret telemetry.', c: '#7dd3fc' },
              { icon: <FiWifi size={18} />, t: 'Offline capability', b: 'Every Rexycore product works entirely without internet. Connectivity is an option, never a requirement.', c: '#6ee7b7' },
              { icon: <FiZap size={18} />, t: 'Performance', b: 'Local processing means low latency. We optimize for your hardware so responses feel instant, not cloud-delayed.', c: '#fcd34d' },
              { icon: <FiHeart size={18} />, t: 'Accessibility', b: 'Powerful computing for everyone. We design interfaces that work for first-time users and power users alike.', c: '#f9a8d4' },
              { icon: <FiShield size={18} />, t: 'Security by design', b: "Attack surfaces are minimized by removing cloud dependencies. What can't connect can't be breached remotely.", c: '#a5b4fc' },
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
            <SH label="Technology" title="Built on modern, privacy-respecting infrastructure." sub="No proprietary cloud APIs. No third-party model providers. All intelligence runs on open, auditable foundations." />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                { t: 'Local AI Inference', b: 'Models run on your CPU/GPU using open inference runtimes. No API keys, no usage limits, no latency.', c: '#a5b4fc' },
                { t: 'Cross-platform', b: 'macOS, Windows, and Linux. Lumina OS extends this to a fully custom privacy-native environment.', c: '#7dd3fc' },
                { t: 'Hardware-aware optimization', b: 'We profile your machine and select the right model size and inference backend automatically.', c: '#6ee7b7' },
                { t: 'Secure local IPC', b: 'Modules communicate through encrypted local channels. No data leaves the device boundary, even inter-process.', c: '#f9a8d4' },
                { t: 'Open model support', b: 'Compatible with leading open models. Bring your own weights and run them with full Rexycore integration.', c: '#fcd34d' },
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
          <SH label="Vision" title="Where we are going." sub="Rexycore is a platform, not a product. Every release moves us closer to computing that is private by default." align="center" />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 18 }}>
            {[
              { icon: <FiCpu size={18} />, t: 'Smarter local models', b: 'As hardware improves, our local models grow more capable. The intelligence gap between cloud and local narrows every year.', c: '#a5b4fc' },
              { icon: <FiGlobe size={18} />, t: 'Education platform', b: 'AI-powered learning tools that run on school hardware without internet dependency — privacy-first education for everyone.', c: '#7dd3fc' },
              { icon: <FiCode size={18} />, t: 'Developer ecosystem', b: 'Open SDKs so developers can build Rexycore-native applications that inherit our privacy guarantees automatically.', c: '#6ee7b7' },
              { icon: <FiMap size={18} />, t: 'Lumina OS expansion', b: 'A fully sovereign computing stack — from boot to application layer. Every component privacy-native and open to inspection.', c: '#f9a8d4' },
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
              <SH label="Developers" title="Build on Rexycore." sub="Extend the ecosystem. Ship AI-native apps that inherit our privacy guarantees from day one." />
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <button disabled style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '13px 22px', borderRadius: 99, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.35)', fontWeight: 700, fontSize: 14, cursor: 'not-allowed', fontFamily: 'inherit' }}>
                  <FiCode size={14} /> Docs <span style={{ fontSize: 10, padding: '2px 8px', borderRadius: 99, background: 'rgba(245,158,11,0.15)', color: '#f59e0b', fontWeight: 800, letterSpacing: 0.5, border: '1px solid rgba(245,158,11,0.3)' }}>COMING SOON</span>
                </button>
                <button disabled style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '13px 22px', borderRadius: 99, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.35)', fontWeight: 700, fontSize: 14, cursor: 'not-allowed', fontFamily: 'inherit' }}>
                  <FiGitBranch size={14} /> SDK <span style={{ fontSize: 10, padding: '2px 8px', borderRadius: 99, background: 'rgba(245,158,11,0.15)', color: '#f59e0b', fontWeight: 800, letterSpacing: 0.5, border: '1px solid rgba(245,158,11,0.3)' }}>COMING SOON</span>
                </button>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                { t: 'Privacy-inheriting apps', b: 'Any app built on Rexycore SDK gets local-first AI execution. No cloud setup, no API key management.', c: '#a5b4fc' },
                { t: 'Rexycore Hub compatibility', b: 'Build modules that plug directly into the Hub — our local orchestration layer connecting all products.', c: '#7dd3fc' },
                { t: 'Open model integration', b: 'Swap in any compatible open-weight model. We provide the inference runtime, you bring the intelligence.', c: '#6ee7b7' },
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
          <SH label="Trust" title="Why you can trust us." sub="Trust is not built with policies. It is built with architecture." align="center" />
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, amount: 0.15 }}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 24, background: 'rgba(255,255,255,0.01)', backdropFilter: 'blur(20px)' }}>
            {[
              { n: '0', label: 'Data Leaks', sub: 'Since inception', c: '#a5b4fc' },
              { n: '5', label: 'Core Modules', sub: 'In the ecosystem', c: '#7dd3fc' },
              { n: '100%', label: 'Local Processing', sub: 'Always', c: '#6ee7b7' },
              { n: '0', label: 'Cloud Requirements', sub: 'Ever', c: '#f9a8d4' },
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
          <SH label="Community" title="You're not just a user." sub="You are part of the ecosystem. Join thousands who believe computing should serve people, not platforms." align="center" />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
            {[
              { icon: <FiUsers size={18} />, t: 'Join the community', b: 'Connect with Rexycore users and builders. Share workflows, ask questions, shape the roadmap.', href: '/community', c: '#a5b4fc' },
              { icon: <FiGitBranch size={18} />, t: 'Contribute', b: 'Select Rexycore components are open source. Audit the code, submit fixes, or build extensions.', href: '/contribute', c: '#6ee7b7' },
              { icon: <FiMap size={18} />, t: 'Follow the roadmap', b: 'See exactly what we are building and when. Public roadmap, no hidden features, no surprises.', href: '/roadmap', c: '#7dd3fc' },
              { icon: <FiFlag size={18} />, t: 'Give feedback', b: 'Every major decision has started with user feedback. Your input shapes what gets built next.', href: '/feedback', c: '#f9a8d4' },
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
          <h2 style={{ fontSize: 'clamp(30px, 5vw, 52px)', fontWeight: 900, letterSpacing: '-0.04em', marginBottom: 18, position: 'relative' }}>Ready to launch?</h2>
          <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.3)', position: 'relative', maxWidth: 460, margin: '0 auto 44px', lineHeight: 1.7 }}>Join the movement toward local, private, and powerful computing. Your orbit is waiting.</p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <PrimaryBtn href="/products">Explore the Ecosystem <FiArrowRight size={14} /></PrimaryBtn>
            <CosmicBtn href="/subscription">View Plans</CosmicBtn>
          </div>
        </motion.div>
      </section>

      <div style={{ position: 'relative', zIndex: 10 }}><Footer /></div>
      <ChatWidget />
    </>
  );
}
