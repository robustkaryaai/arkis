'use client';
import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';

/* ─── STAR FIELD CANVAS ─────────────────────────────────────────── */
export function StarField() {
  const canvasRef = useRef(null);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener('resize', resize);

    const stars = Array.from({ length: 300 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.3 + 0.15,
      baseOpacity: Math.random() * 0.55 + 0.1,
      twinkleSpeed: Math.random() * 0.018 + 0.004,
      twinkleOffset: Math.random() * Math.PI * 2,
      driftX: (Math.random() - 0.5) * 0.006,
      driftY: Math.random() * 0.005 + 0.0006,
      parallax: Math.random() * 0.4 + 0.08,
    }));

    const shoots = [];
    const spawnShoot = () => {
      const count = Math.floor(Math.random() * 2) + 1;
      for (let k = 0; k < count; k++) {
        shoots.push({
          x: Math.random() * canvas.width * 1.2,
          y: Math.random() * canvas.height * 0.5,
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
      if (Math.random() < 0.018) spawnShoot();

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

      for (let i = shoots.length - 1; i >= 0; i--) {
        const ss = shoots[i];
        const tailX = ss.x - Math.cos(ss.angle) * ss.len;
        const tailY = ss.y - Math.sin(ss.angle) * ss.len;
        const g = ctx.createLinearGradient(ss.x, ss.y, tailX, tailY);
        g.addColorStop(0, `rgba(220,230,255,${ss.opacity})`);
        g.addColorStop(0.3, `rgba(180,200,255,${ss.opacity * 0.5})`);
        g.addColorStop(1, 'rgba(180,200,255,0)');
        ctx.beginPath(); ctx.moveTo(ss.x, ss.y); ctx.lineTo(tailX, tailY);
        ctx.strokeStyle = g; ctx.lineWidth = ss.width; ctx.lineCap = 'round'; ctx.stroke();
        ctx.beginPath(); ctx.arc(ss.x, ss.y, ss.width * 1.2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${ss.opacity})`; ctx.fill();
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

/* ─── HOVER NEBULA (color bursts on card hover) ─────────────────── */
export function HoverNebula({ color }) {
  return (
    <motion.div
      key={color || 'none'}
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: color ? 1 : 0, scale: color ? 1 : 0.6 }}
      exit={{ opacity: 0, scale: 0.6 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      aria-hidden
      style={{
        position: 'fixed', inset: 0, zIndex: 1, pointerEvents: 'none',
        background: color
          ? `radial-gradient(ellipse at 50% 40%, ${color}1a 0%, ${color}08 35%, transparent 65%)`
          : 'transparent',
        filter: 'blur(40px)',
      }}
    />
  );
}

/* ─── SCROLL ANIMATION VARIANTS ─────────────────────────────────── */
export const textVariant = (delay = 0) => ({
  hidden: { y: 48, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { type: 'spring', duration: 1.2, delay } },
});

export const fadeUp = (delay = 0) => ({
  hidden: { y: 32, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 0.75, delay, ease: [0.16, 1, 0.3, 1] } },
});

export const fadeRight = (delay = 0) => ({
  hidden: { x: -32, opacity: 0 },
  show: { x: 0, opacity: 1, transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] } },
});

export const staggerContainer = (sc = 0.1, dc = 0) => ({
  hidden: {},
  show: { transition: { staggerChildren: sc, delayChildren: dc } },
});

/* ─── SECTION WRAPPER (consistent max-width + padding) ──────────── */
export function Section({ children, style, zIndex = 10 }) {
  return (
    <section style={{ position: 'relative', zIndex, padding: '0 5%', ...style }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        {children}
      </div>
    </section>
  );
}

/* ─── SECTION HEADER with stagger text flow ─────────────────────── */
export function SectionHeader({ label, title, sub, align = 'left', style }) {
  return (
    <motion.div
      variants={staggerContainer(0.1, 0.05)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.2 }}
      style={{ marginBottom: 52, textAlign: align, ...style }}
    >
      {label && (
        <motion.p variants={textVariant(0)} style={{ fontSize: 11, fontWeight: 800, letterSpacing: 3, color: 'rgba(165,180,252,0.6)', textTransform: 'uppercase', marginBottom: 14 }}>
          {label}
        </motion.p>
      )}
      <motion.h2 variants={textVariant(0.1)} style={{ fontSize: 'clamp(30px, 4.5vw, 54px)', fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1.08, marginBottom: sub ? 18 : 0 }}>
        {title}
      </motion.h2>
      {sub && (
        <motion.p variants={fadeUp(0.2)} style={{ fontSize: 18, color: 'rgba(255,255,255,0.38)', maxWidth: 580, lineHeight: 1.72, margin: align === 'center' ? '18px auto 0' : '18px 0 0' }}>
          {sub}
        </motion.p>
      )}
    </motion.div>
  );
}

/* ─── 3D HOVER CARD ─────────────────────────────────────────────── */
export function Card3D({ children, style, delay = 0, orbColor = 'rgba(165,180,252,0.2)' }) {
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

/* ─── GRADIENT DIVIDER ──────────────────────────────────────────── */
export function GradientDivider({ color = 'rgba(165,180,252,0.2)' }) {
  return (
    <div style={{ padding: '0 5%', marginBottom: 80 }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', height: 1, background: `linear-gradient(90deg, transparent 0%, ${color} 50%, transparent 100%)` }} />
    </div>
  );
}

/* ─── FLOW TEXT ─────────────────────────────────────────────────── */
/* Usage: <FlowText gradient="linear-gradient(135deg,#8b5cf6,#10b981)">Word</FlowText>
   Pass speed="fast|slow" or a number in seconds (default 4s). */
export function FlowText({ children, gradient, speed = 12, as: Tag = 'span', style = {}, className = '' }) {
  const seconds = typeof speed === 'number' ? speed : speed === 'fast' ? 6 : speed === 'slow' ? 18 : 12;
  const safeGradient = (gradient || 'linear-gradient(90deg, #a5b4fc, #7dd3fc, #6ee7b7, #7dd3fc, #a5b4fc)')
    .replace(/135deg/g, '90deg')
    .replace(/to bottom right/gi, 'to right');

  return (
    <Tag
      className={className}
      style={{
        display: 'inline-block',
        background: safeGradient,
        backgroundSize: '200% auto',
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        animation: `flow-text-shine ${seconds}s linear infinite`,
        paddingBottom: '0.1em',
        marginBottom: '-0.1em',
        paddingRight: '0.05em',
        marginRight: '-0.05em',
        ...style,
      }}
    >
      {children}
      <style>{`@keyframes flow-text-shine { to { background-position: -200% center; } }`}</style>
    </Tag>
  );
}

/* ─── NEBULA BURST ──────────────────────────────────────────────── */
/* Listens for window event 'nebula-burst' with detail: { color?, preset? }
   Presets: 'upgrade' | 'download' | 'preorder' | 'success' | 'random'
   Also fires randomly ~once every 5-9 minutes on its own.
   Trigger from anywhere: triggerNebula('upgrade')  */

export function triggerNebula(preset = 'random', color = null) {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new CustomEvent('nebula-burst', { detail: { preset, color } }));
}

const NEBULA_PRESETS = {
  upgrade:  { colors: ['#8b5cf6', '#a78bfa', '#6d28d9'], label: '✦ Plan Upgraded' },
  download: { colors: ['#10b981', '#34d399', '#059669'], label: '✦ Download Started' },
  preorder: { colors: ['#f59e0b', '#fbbf24', '#d97706'], label: '✦ Pre-order Placed' },
  success:  { colors: ['#3b82f6', '#60a5fa', '#1d4ed8'], label: '✦ Success' },
  random:   { colors: ['#f43f5e', '#8b5cf6', '#10b981', '#f59e0b', '#3b82f6'], label: null },
};

export function NebulaBurst() {
  const [burst, setBurst] = useState(null); // { colors, label }
  const timeoutRef = useRef(null);
  const randomTimerRef = useRef(null);

  const fire = (preset = 'random', color = null) => {
    const cfg = NEBULA_PRESETS[preset] || NEBULA_PRESETS.random;
    const colors = color ? [color] : cfg.colors;
    setBurst({ colors, label: cfg.label });
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setBurst(null), 3200);
  };

  useEffect(() => {
    const handler = (e) => fire(e.detail?.preset, e.detail?.color);
    window.addEventListener('nebula-burst', handler);

    // Random ambient burst every 5–9 minutes
    const scheduleRandom = () => {
      const delay = (Math.random() * 4 + 5) * 60 * 1000; // 5-9 min
      randomTimerRef.current = setTimeout(() => {
        fire('random');
        scheduleRandom();
      }, delay);
    };
    scheduleRandom();

    return () => {
      window.removeEventListener('nebula-burst', handler);
      clearTimeout(timeoutRef.current);
      clearTimeout(randomTimerRef.current);
    };
  }, []);

  if (!burst) return null;

  const [c1, c2, c3] = [
    burst.colors[0] || '#8b5cf6',
    burst.colors[1] || burst.colors[0] || '#3b82f6',
    burst.colors[2] || burst.colors[0] || '#10b981',
  ];

  return (
    <AnimatePresence>
      {burst && (
        <>
          {/* Full-screen radial nebula bloom */}
          <motion.div
            key="nebula-bg"
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1.08 }}
            exit={{ opacity: 0, scale: 1.2 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            aria-hidden
            style={{
              position: 'fixed', inset: 0, zIndex: 9990, pointerEvents: 'none',
              background: `radial-gradient(ellipse at 50% 40%, ${c1}28 0%, ${c2}14 35%, ${c3}08 60%, transparent 80%)`,
              filter: 'blur(30px)',
            }}
          />
          {/* Particle streaks - CSS only, no extra lib */}
          <motion.div
            key="nebula-streaks"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.7, 0] }}
            transition={{ duration: 2.5, ease: 'easeInOut' }}
            aria-hidden
            style={{ position: 'fixed', inset: 0, zIndex: 9991, pointerEvents: 'none', overflow: 'hidden' }}
          >
            {Array.from({ length: 16 }).map((_, i) => {
              const angle = (i / 16) * 360;
              const len = 80 + Math.random() * 120;
              const col = burst.colors[i % burst.colors.length];
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: [0, 0.9, 0], scale: [0, 1, 1.5] }}
                  transition={{ duration: 1.8 + Math.random() * 0.8, delay: Math.random() * 0.3, ease: 'easeOut' }}
                  style={{
                    position: 'absolute',
                    top: '50%', left: '50%',
                    width: len, height: 2,
                    borderRadius: 99,
                    background: `linear-gradient(90deg, ${col}CC, transparent)`,
                    transformOrigin: '0 50%',
                    transform: `rotate(${angle}deg) translateY(-50%)`,
                    boxShadow: `0 0 8px ${col}88`,
                  }}
                />
              );
            })}
          </motion.div>
          {/* Optional label toast */}
          {burst.label && (
            <motion.div
              key="nebula-label"
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              style={{
                position: 'fixed', bottom: 32, left: '50%', transform: 'translateX(-50%)',
                zIndex: 9992, pointerEvents: 'none',
                background: 'rgba(10,10,18,0.85)', backdropFilter: 'blur(20px)',
                border: `1px solid ${c1}55`,
                borderRadius: 99, padding: '10px 24px',
                fontSize: 13, fontWeight: 800, color: '#fff',
                letterSpacing: 1,
                boxShadow: `0 0 30px ${c1}44, 0 8px 32px rgba(0,0,0,0.5)`,
              }}
            >
              <span style={{
                background: `linear-gradient(135deg, ${c1}, ${c2})`,
                WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent',
              }}>
                {burst.label}
              </span>
            </motion.div>
          )}
        </>
      )}
    </AnimatePresence>
  );
}

