'use client';
import Link from 'next/link';
import { useState, useRef } from 'react';
import Navbar from '@/components/Navbar';
import ChatWidget from '@/components/ChatWidget';
import Footer from '@/components/Footer';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { FiBell, FiArrowRight, FiDownload, FiShoppingCart } from 'react-icons/fi';
import { StarField, HoverNebula, textVariant, fadeUp, staggerContainer, SectionHeader, FlowText } from '@/components/SpaceUI';

/* ─── Product data ────────────────────────────────────────────── */
const PRODUCTS = [
  {
    id: 'rk-ai-desktop',
    category: 'AI Desktop Assistant',
    name: 'RK AI Desktop',
    tagline: 'Intelligence, locally run.',
    desc: 'A local-first AI system built for personal computing. Voice-enabled, automation-ready, and powered by on-device models that never leave your machine.',
    tags: ['Productivity', 'Local AI', 'System Control'],
    color: '#a5b4fc',
    accent: '#6366f1',
    badge: 'Live',
    badgeDot: '#4ade80',
    href: '/products/rk-ai-desktop',
    cta: 'Download Free',
    ctaIcon: <FiDownload />,
    logo: '/RK AI logo.png',
  },
  {
    id: 'rk-ai-home',
    category: 'Smart Home Device',
    name: 'RK AI Home',
    tagline: 'Your home, thinking with you.',
    desc: 'An AI system designed for physical environments — enabling voice control, automation, and intelligent coordination across your entire living space.',
    tags: ['Smart Home', 'Hardware', 'Pre-order'],
    color: '#f9a8d4',
    accent: '#ec4899',
    badge: 'Pre-order',
    badgeDot: '#fbcfe8',
    href: '/products/rk-ai-home',
    cta: 'Pre-order Now',
    ctaIcon: <FiShoppingCart />,
    bgImage: '/rk-ai-home-images/feature.jpg',
    isBuyable: true,
  },
  {
    id: 'malus',
    category: 'AI Operating Companion',
    name: 'MALUS',
    tagline: 'Ambient intelligence for your desktop.',
    desc: 'A context-aware AI operating companion that understands your computer, adapts to your workflow, and naturally helps you while respecting your privacy.',
    tags: ['Companion', 'Context-Aware', 'Windows'],
    color: '#6ee7b7',
    accent: '#10b981',
    badge: 'New',
    badgeDot: '#34d399',
    href: '/products/malus',
    cta: 'Meet MALUS',
    ctaIcon: <FiArrowRight />,
    logo: '/malus.jpeg',
  },
  {
    id: 'lumina-os',
    category: 'Operating System',
    name: 'Lumina OS',
    tagline: 'The OS reimagined from the ground up.',
    desc: 'Witness the evolution of computing. An AI-native Linux experience built around privacy, performance, and deep system intelligence.',
    tags: ['Linux', 'AI-Native', 'Privacy First'],
    color: '#e0f2fe',
    accent: '#7dd3fc',
    badge: 'Alpha',
    badgeDot: '#e2e8f0',
    href: '/products/lumina-os',
    cta: 'Explore More',
    ctaIcon: <FiArrowRight />,
    logo: '/luminaos.png',
  },
  {
    id: 'light-key',
    category: 'Intelligent Input',
    name: 'Light Key',
    tagline: 'Type smarter. Think faster.',
    desc: 'An intelligent input system that enhances typing with contextual suggestions, AI-powered auto-complete, and deep workflow integration.',
    tags: ['Input', 'AI-Keyboard', 'Beta'],
    color: '#fcd34d',
    accent: '#f59e0b',
    badge: 'Beta',
    badgeDot: '#fbbf24',
    href: '/products/light-key',
    cta: 'Get Insight',
    ctaIcon: <FiArrowRight />,
    comingSoon: true,
  },
  {
    id: 'rexycore-cloud',
    category: 'Rexycore Ecosystem',
    name: 'RexyCore Cloud',
    tagline: 'Your AI, everywhere.',
    desc: 'Matrix tiers for RK AI. Cloud storage, video generation caps, and advanced AI features accessible across all your devices.',
    tags: ['Cloud AI', 'Subscription', 'Live'],
    color: '#7dd3fc',
    accent: '#0ea5e9',
    badge: 'Live',
    badgeDot: '#4ade80',
    href: '/subscription',
    cta: 'Explore Cloud',
    ctaIcon: <FiArrowRight />,
  },
];

/* ─── Product Card ────────────────────────────────────────────── */
function ProductCard({ product, isHovered, onEnter, onLeave }) {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotX = ((y - cy) / cy) * -7;
    const rotY = ((x - cx) / cx) * 7;
    card.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-8px) scale(1.02)`;
    const shine = card.querySelector('.card-shine');
    if (shine) shine.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.1) 0%, transparent 60%)`;
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0) scale(1)';
    const shine = card.querySelector('.card-shine');
    if (shine) shine.style.background = 'none';
    onLeave?.();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: '-40px' }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={onEnter}
        style={{
          position: 'relative',
          background: 'rgba(255,255,255,0.025)',
          border: `1px solid ${isHovered ? product.color + '40' : 'rgba(255,255,255,0.07)'}`,
          borderRadius: 24,
          overflow: 'hidden',
          transition: 'transform 0.4s cubic-bezier(0.23,1,0.32,1), border-color 0.4s',
          transformStyle: 'preserve-3d',
          cursor: 'pointer',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
        }}
      >
        {/* Shine */}
        <div className="card-shine" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 3, borderRadius: 24 }} />
        {/* Top edge */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.15, 255, 255, rgba(255, transparent), transparent)', zIndex: 4 }} />

        {/* Color explosion when hovered — inside card top */}
        <AnimatePresence>
          {isHovered && (
            <motion.div key="card-glow"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '60%', background: `radial-gradient(ellipse at 50% 0%, ${product.color}20 0%, transparent 70%)`, pointerEvents: 'none', zIndex: 1 }}
            />
          )}
        </AnimatePresence>

        {/* Banner */}
        <div style={{ height: 200, position: 'relative', overflow: 'hidden', background: product.bgImage ? undefined : `linear-gradient(90deg, ${product.color}18, ${product.accent}0f, ${product.color}18)`, flexShrink: 0 }}>
          {product.bgImage && (
            <>
              <Image src={product.bgImage} alt={product.name} fill style={{ objectFit: 'cover', opacity: 0.65 }} />
              <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(90deg, ${product.color}25, rgba(0, 0, 0, 0.7, 0, 0, rgba(0, ${product.color}25))` }} />
            </>
          )}
          {product.logo && !product.bgImage && (
            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Image src={product.logo} alt={product.name} width={72} height={72} style={{ objectFit: 'contain', borderRadius: 18, filter: `drop-shadow(0 0 20px ${product.color}88)` }} />
            </div>
          )}
          {!product.logo && !product.bgImage && (
            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 64, color: product.color, filter: `drop-shadow(0 0 20px ${product.color}88)` }}>✦</div>
          )}
          <div style={{ position: 'absolute', top: 14, left: 14, zIndex: 5, display: 'flex', alignItems: 'center', gap: 5, padding: '4px 10px', borderRadius: 99, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.1)', fontSize: 11, fontWeight: 700, color: '#fff' }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: product.badgeDot, boxShadow: `0 0 6px ${product.badgeDot}` }} />
            {product.badge}
          </div>
        </div>

        {/* Body */}
        <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: 12, flex: 1, position: 'relative', zIndex: 2 }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: product.color, marginBottom: 6 }}>{product.category}</div>
            <h3 style={{ fontSize: 22, fontWeight: 900, letterSpacing: '-0.03em', marginBottom: 4, color: '#fff' }}>{product.name}</h3>
            <p style={{ fontSize: 13, fontWeight: 500, color: 'rgba(255,255,255,0.35)', marginBottom: 8, fontStyle: 'italic' }}>{product.tagline}</p>
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.52)', lineHeight: 1.65 }}>{product.desc}</p>
          </div>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {product.tags.map(t => (
              <span key={t} style={{ padding: '3px 10px', borderRadius: 99, background: `${product.color}15`, color: product.color, border: `1px solid ${product.color}30`, fontSize: 11, fontWeight: 700 }}>{t}</span>
            ))}
          </div>
          <div style={{ marginTop: 'auto', paddingTop: 8 }}>
            <Link href={product.href}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, width: '100%', padding: '13px 20px', borderRadius: 99, background: `linear-gradient(90deg, ${product.color}, ${product.accent}, ${product.color})`, color: product.id === 'lumina-os' ? '#000' : '#fff', fontWeight: 700, fontSize: 15, textDecoration: 'none', boxShadow: `0 4px 20px ${product.color}33` }}
              onClick={e => e.stopPropagation()}
            >
              {product.ctaIcon} {product.cta}
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Page ────────────────────────────────────────────────────── */
export default function Products() {
  const [hoveredProduct, setHoveredProduct] = useState(null);

  return (
    <div style={{ minHeight: '100vh', background: '#010104', color: '#fff', position: 'relative' }}>
      <StarField />
      {/* Hover nebula — full viewport color burst on card hover */}
      <HoverNebula color={hoveredProduct?.color} />
      <div className="noise" aria-hidden />
      <Navbar />

      {/* ── HERO ── */}
      <section style={{ position: 'relative', zIndex: 10, minHeight: '52vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '140px 5% 80px' }}>
        <motion.div variants={staggerContainer(0.1, 0.2)} initial="hidden" animate="show" style={{ maxWidth: 720 }}>
          <motion.div variants={fadeUp(0.05)} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 18px', borderRadius: 99, border: '1px solid rgba(165,180,252,0.2)', background: 'rgba(165,180,252,0.05)', backdropFilter: 'blur(20px)', marginBottom: 36 }}>
            <motion.span animate={{ opacity: [1, 0.3, 1] }} transition={{ repeat: Infinity, duration: 2 }} style={{ width: 6, height: 6, borderRadius: '50%', background: '#a5b4fc', boxShadow: '0 0 8px #a5b4fc' }} />
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, color: 'rgba(255,255,255,0.55)', textTransform: 'uppercase' }}>Rexycore Ecosystem</span>
          </motion.div>
          <motion.h1 variants={textVariant(0.1)} style={{ fontSize: 'clamp(44px, 7vw, 88px)', fontWeight: 900, letterSpacing: '-0.05em', lineHeight: 1.05, marginBottom: 24 }}>
            The Rexycore<br />
            <FlowText gradient="linear-gradient(90deg, #a5b4fc, #7dd3fc, #6ee7b7, #7dd3fc, #a5b4fc)">Product Suite.</FlowText>
          </motion.h1>
          <motion.p variants={fadeUp(0.3)} style={{ fontSize: 18, color: 'rgba(255,255,255,0.4)', lineHeight: 1.7 }}>
            Privacy-first, AI-powered products built for the way you live, work, and create — with no compromises.
          </motion.p>
        </motion.div>
      </section>

      {/* Gradient rule */}
      <div style={{ padding: '0 5%', marginBottom: 72, position: 'relative', zIndex: 10 }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', height: 1, background: 'linear-gradient(90deg, transparent, rgba(165, 180, 252, 0.2, 252, 180, rgba(165, transparent) 50%, transparent 100%)' }} />
      </div>

      {/* ── PRODUCT GRID ── */}
      <section style={{ position: 'relative', zIndex: 10, padding: '0 5% 140px' }}>
        <div style={{ maxWidth: 1320, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 24 }}>
            {PRODUCTS.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                isHovered={hoveredProduct?.id === product.id}
                onEnter={() => setHoveredProduct(product)}
                onLeave={() => setHoveredProduct(null)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA STRIP ── */}
      <section style={{ position: 'relative', zIndex: 10, padding: '0 5% 140px' }}>
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, amount: 0.15 }}
          style={{ maxWidth: 760, margin: '0 auto', padding: '60px 5%', borderRadius: 28, background: 'rgba(255,255,255,0.012)', border: '1px solid rgba(165,180,252,0.14)', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: -80, left: '50%', transform: 'translateX(-50%)', width: '80%', height: 160, background: 'radial-gradient(ellipse, rgba(165,180,252,0.09) 0%, transparent 70%)', filter: 'blur(40px)' }} />
          <h2 style={{ fontSize: 'clamp(26px, 4vw, 44px)', fontWeight: 900, letterSpacing: '-0.04em', marginBottom: 14, position: 'relative' }}>Not sure where to start?</h2>
          <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.3)', marginBottom: 36, position: 'relative', maxWidth: 420, margin: '0 auto 36px' }}>Take a look at our ecosystem overview — see how every product connects.</p>
          <Link href="/home-y" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '14px 32px', borderRadius: 99, background: '#fff', color: '#000', fontWeight: 800, fontSize: 15, textDecoration: 'none' }}>
            Explore the Ecosystem <FiArrowRight />
          </Link>
        </motion.div>
      </section>

      <div style={{ position: 'relative', zIndex: 10 }}><Footer /></div>
      <ChatWidget />
    </div>
  );
}
