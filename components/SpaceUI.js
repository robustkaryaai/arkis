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
      driftX: (Math.random() - 0.5) * 0.06,
      driftY: Math.random() * 0.05 + 0.006,
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
