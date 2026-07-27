'use client';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import Navbar from '@/components/Navbar';
import ChatWidget from '@/components/ChatWidget';
import Footer from '@/components/Footer';
import Image from 'next/image';
import { FiBell, FiArrowRight, FiDownload, FiShoppingCart } from 'react-icons/fi';

/* ─── Product definitions ─────────────────────────────────────── */
const PRODUCTS = [
  {
    id: 'rk-ai-desktop',
    category: 'AI Desktop Assistant',
    name: 'RK AI Desktop',
    tagline: 'Intelligence, locally run.',
    desc: 'A local-first AI system built for personal computing. Voice-enabled, automation-ready, and powered by on-device models that never leave your machine.',
    tags: ['Productivity', 'Local AI', 'System Control'],
    accent: '#3b82f6',
    accentB: '#6366f1',
    nebula: 'radial-gradient(circle at 20% 30%, rgba(59,130,246,0.3) 0%, transparent 55%), radial-gradient(circle at 75% 70%, rgba(99,102,241,0.2) 0%, transparent 50%)',
    badge: 'Live',
    badgeDot: '#4ade80',
    href: '/products/rk-ai-desktop',
    cta: 'Download Free',
    ctaIcon: <FiDownload />,
    logo: '/RK AI logo.png',
    comingSoon: false,
  },
  {
    id: 'rk-ai-home',
    category: 'Smart Home Device',
    name: 'RK AI Home',
    tagline: 'Your home, thinking with you.',
    desc: 'An AI system designed for physical environments — enabling voice control, automation, and intelligent coordination across your entire living space.',
    tags: ['Smart Home', 'Hardware', 'Pre-order'],
    accent: '#ec4899',
    accentB: '#a855f7',
    nebula: 'radial-gradient(circle at 30% 40%, rgba(236,72,153,0.3) 0%, transparent 55%), radial-gradient(circle at 70% 60%, rgba(168,85,247,0.2) 0%, transparent 50%)',
    badge: 'Pre-order',
    badgeDot: '#f472b6',
    href: '/products/rk-ai-home',
    cta: 'Pre-order Now',
    ctaIcon: <FiShoppingCart />,
    bgImage: '/rk-ai-home-images/feature.jpg',
    comingSoon: false,
    isBuyable: true,
  },
  {
    id: 'malus',
    category: 'AI Operating Companion',
    name: 'MALUS',
    tagline: 'Ambient intelligence for your desktop.',
    desc: 'A context-aware AI operating companion that understands your computer, adapts to your workflow, and naturally helps you while respecting your privacy.',
    tags: ['Companion', 'Context-Aware', 'Windows'],
    accent: '#10b981',
    accentB: '#059669',
    nebula: 'radial-gradient(circle at 25% 50%, rgba(16,185,129,0.3) 0%, transparent 55%), radial-gradient(circle at 75% 35%, rgba(5,150,105,0.2) 0%, transparent 50%)',
    badge: 'New',
    badgeDot: '#34d399',
    href: '/products/malus',
    cta: 'Meet MALUS',
    ctaIcon: <FiArrowRight />,
    logo: '/malus.jpeg',
    comingSoon: false,
  },
  {
    id: 'lumina-os',
    category: 'Operating System',
    name: 'Lumina OS',
    tagline: 'The OS reimagined from the ground up.',
    desc: 'Witness the evolution of computing. An AI-native Linux experience built around privacy, performance, and deep system intelligence.',
    tags: ['Linux', 'AI-Native', 'Privacy First'],
    accent: '#a855f7',
    accentB: '#6366f1',
    nebula: 'radial-gradient(circle at 60% 30%, rgba(168,85,247,0.35) 0%, transparent 55%), radial-gradient(circle at 25% 70%, rgba(99,102,241,0.2) 0%, transparent 50%)',
    badge: 'Alpha',
    badgeDot: '#a78bfa',
    href: '/products/lumina-os',
    cta: 'Explore More',
    ctaIcon: <FiArrowRight />,
    logo: '/luminaos.png',
    comingSoon: false,
  },
  {
    id: 'light-key',
    category: 'Intelligent Input',
    name: 'Light Key',
    tagline: 'Type smarter. Think faster.',
    desc: 'An intelligent input system that enhances typing with contextual suggestions, AI-powered auto-complete, and deep workflow integration.',
    tags: ['Input', 'AI-Keyboard', 'Beta'],
    accent: '#f59e0b',
    accentB: '#d97706',
    nebula: 'radial-gradient(circle at 40% 40%, rgba(245,158,11,0.3) 0%, transparent 55%), radial-gradient(circle at 70% 70%, rgba(217,119,6,0.2) 0%, transparent 50%)',
    badge: 'Coming Soon',
    badgeDot: '#fbbf24',
    href: '/notify?product=light-key',
    cta: 'Notify Me',
    ctaIcon: <FiBell />,
    comingSoon: true,
  },
  {
    id: 'rexycore-cloud',
    category: 'Rexycore Ecosystem',
    name: 'RexyCore Cloud',
    tagline: 'Your AI, everywhere.',
    desc: 'Matrix tiers for RK AI. Cloud storage, video generation caps, and advanced AI features accessible across all your devices.',
    tags: ['Cloud AI', 'Subscription', 'Live'],
    accent: '#0ea5e9',
    accentB: '#38bdf8',
    nebula: 'radial-gradient(circle at 50% 30%, rgba(14,165,233,0.3) 0%, transparent 55%), radial-gradient(circle at 30% 70%, rgba(56,189,248,0.2) 0%, transparent 50%)',
    badge: 'Live',
    badgeDot: '#4ade80',
    href: '/subscription',
    cta: 'Open Cloud',
    ctaIcon: <FiArrowRight />,
    comingSoon: false,
  },
];

/* ─── 3D Card Component ───────────────────────────────────────── */
function ProductCard({ product, isActive, onHover, onLeave }) {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotX = ((y - cy) / cy) * -8;
    const rotY = ((x - cx) / cx) * 8;
    card.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-8px) scale(1.02)`;
    // Move shine spot
    const shine = card.querySelector('.card-shine');
    if (shine) {
      shine.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.12) 0%, transparent 60%)`;
    }
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0) scale(1)';
    const shine = card.querySelector('.card-shine');
    if (shine) shine.style.background = 'none';
    onLeave?.();
  };

  const handleMouseEnter = () => {
    onHover?.(product);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      style={{
        position: 'relative',
        background: 'rgba(255,255,255,0.028)',
        border: `1px solid ${isActive ? product.accent + '55' : 'rgba(255,255,255,0.08)'}`,
        borderRadius: 28,
        overflow: 'hidden',
        transition: 'transform 0.4s cubic-bezier(0.23,1,0.32,1), border-color 0.3s, box-shadow 0.4s',
        transformStyle: 'preserve-3d',
        boxShadow: isActive
          ? `0 30px 80px rgba(0,0,0,0.5), 0 0 0 1px ${product.accent}33, 0 0 60px ${product.accent}22`
          : '0 4px 24px rgba(0,0,0,0.25)',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}
    >
      {/* Mouse-tracked shine overlay */}
      <div className="card-shine" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 3, borderRadius: 28 }} />

      {/* Top edge shine */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent)', zIndex: 4 }} />

      {/* Banner */}
      <div style={{
        height: 200,
        position: 'relative',
        overflow: 'hidden',
        background: product.bgImage ? undefined : `linear-gradient(135deg, ${product.accent}22 0%, ${product.accentB}15 100%)`,
        flexShrink: 0,
      }}>
        {product.bgImage && (
          <>
            <Image src={product.bgImage} alt={product.name} fill style={{ objectFit: 'cover', opacity: 0.7 }} />
            <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to bottom, ${product.accent}33, rgba(0,0,0,0.7))` }} />
          </>
        )}
        {product.logo && !product.bgImage && (
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Image src={product.logo} alt={product.name} width={72} height={72} style={{ objectFit: 'contain', borderRadius: 18, filter: `drop-shadow(0 0 24px ${product.accent}88)` }} />
          </div>
        )}
        {!product.logo && !product.bgImage && (
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 64, filter: `drop-shadow(0 0 20px ${product.accent}88)` }}>
            ✦
          </div>
        )}

        {/* Badge */}
        <div style={{
          position: 'absolute', top: 14, left: 14, zIndex: 5,
          display: 'flex', alignItems: 'center', gap: 5,
          padding: '4px 10px', borderRadius: 99,
          background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.12)',
          fontSize: 11, fontWeight: 700, color: '#fff',
        }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: product.badgeDot, boxShadow: `0 0 6px ${product.badgeDot}` }} />
          {product.badge}
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: 12, flex: 1 }}>
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: product.accent, marginBottom: 6 }}>
            {product.category}
          </div>
          <h3 style={{ fontSize: 22, fontWeight: 800, letterSpacing: '-0.5px', marginBottom: 4 }}>{product.name}</h3>
          <p style={{ fontSize: 13, fontWeight: 500, color: 'rgba(255,255,255,0.4)', marginBottom: 8, fontStyle: 'italic' }}>{product.tagline}</p>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.55)', lineHeight: 1.65 }}>{product.desc}</p>
        </div>

        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {product.tags.map(t => (
            <span key={t} style={{
              padding: '3px 10px', borderRadius: 99,
              background: `${product.accent}18`, color: product.accent,
              border: `1px solid ${product.accent}33`,
              fontSize: 11, fontWeight: 700,
            }}>{t}</span>
          ))}
        </div>

        <div style={{ marginTop: 'auto', paddingTop: 8 }}>
          <Link
            href={product.href}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              width: '100%',
              padding: '13px 20px',
              borderRadius: 99,
              background: `linear-gradient(135deg, ${product.accent}, ${product.accentB})`,
              color: '#fff',
              fontWeight: 700, fontSize: 15,
              textDecoration: 'none',
              transition: 'opacity 0.2s, transform 0.2s, box-shadow 0.2s',
              boxShadow: `0 4px 20px ${product.accent}44`,
            }}
            onMouseEnter={e => { e.currentTarget.style.boxShadow = `0 8px 30px ${product.accent}66`; e.currentTarget.style.transform = 'translateY(-1px)'; }}
            onMouseLeave={e => { e.currentTarget.style.boxShadow = `0 4px 20px ${product.accent}44`; e.currentTarget.style.transform = ''; }}
            onClick={e => e.stopPropagation()}
          >
            {product.ctaIcon} {product.cta}
          </Link>
        </div>
      </div>
    </div>
  );
}

/* ─── Page ────────────────────────────────────────────────────── */
export default function Products() {
  const [activeProduct, setActiveProduct] = useState(null);
  const bgRef = useRef(null);

  // Morph background on hover
  useEffect(() => {
    const bg = bgRef.current;
    if (!bg) return;
    if (activeProduct) {
      bg.style.opacity = '1';
      bg.style.background = activeProduct.nebula;
    } else {
      bg.style.opacity = '0';
    }
  }, [activeProduct]);

  return (
    <div style={{ minHeight: '100vh', background: '#000', color: '#fff', position: 'relative' }}>
      {/* Morphing ambient background */}
      <div
        ref={bgRef}
        style={{
          position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none',
          transition: 'opacity 0.8s ease, background 1s ease',
          opacity: 0,
        }}
      />

      {/* Static void nebula */}
      <div className="nebula" aria-hidden>
        <div className="nebula__orb nebula__orb--1" />
        <div className="nebula__orb nebula__orb--3" />
      </div>
      <div className="noise" aria-hidden />

      <Navbar />

      {/* Hero */}
      <section style={{
        position: 'relative', zIndex: 10,
        minHeight: '52vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
        textAlign: 'center', padding: '140px 24px 80px',
      }}>
        <div style={{ maxWidth: 700 }}>
          <div className="hero-eyebrow" style={{ margin: '0 auto 28px', display: 'inline-flex' }}>
            <span className="pulse" />
            Rexycore Ecosystem
          </div>
          <h1 style={{ fontSize: 'clamp(44px, 7vw, 84px)', fontWeight: 900, letterSpacing: '-0.05em', lineHeight: 1.05, marginBottom: 24 }}>
            The Rexycore<br />
            <span style={{ background: 'linear-gradient(135deg, #a78bfa, #f472b6, #60a5fa)', WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundSize: '200%', animation: 'grad-shift 5s ease infinite' }}>
              Product Suite.
            </span>
          </h1>
          <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.5)', lineHeight: 1.65, fontWeight: 400 }}>
            Privacy-first, AI-powered products built for the way you live, work, and create — with no compromises.
          </p>
        </div>
      </section>

      {/* Products Grid */}
      <section style={{ position: 'relative', zIndex: 10, padding: '0 24px 120px', maxWidth: 1200, margin: '0 auto' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
          gap: 24,
        }}>
          {PRODUCTS.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              isActive={activeProduct?.id === product.id}
              onHover={setActiveProduct}
              onLeave={() => setActiveProduct(null)}
            />
          ))}
        </div>
      </section>

      <Footer />
      <ChatWidget />
    </div>
  );
}
