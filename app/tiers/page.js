'use client';
import Navbar from '@/components/Navbar';
import ChatWidget from '@/components/ChatWidget';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { FiCheck, FiArrowRight, FiZap, FiCpu, FiUsers, FiMonitor, FiShield, FiClock } from 'react-icons/fi';
import { motion } from 'framer-motion';

/* ─── RK AI Plans ─────────────────────────────────── */
const rkPlans = [
  {
    name: 'Free',
    emoji: '⚡',
    color: '#6b7280',
    price: '₹0',
    period: '/month',
    tagline: 'Enter the matrix.',
    desc: 'Everything you need to get started with local AI on your desktop or Pi.',
    features: [
      'Spark: Local AI Engine (Ollama)',
      'Offline Voice Command & Chat',
      'Offline TTS & STT assistant',
      '5,000 max tokens & 30 RPM limit',
      'RK AI Desktop & Home access',
      'Privacy-first local processing',
    ],
    cta: 'Download Free',
    href: '/#download',
    ghost: true,
  },
  {
    name: 'Pro',
    emoji: '🔵',
    color: '#3b82f6',
    price: '₹599',
    period: '/month',
    tagline: 'Learn. Build. Dominate.',
    desc: 'Cloud-enhanced intelligence for students, developers, and creators.',
    features: [
      'Everything in Free',
      'Cloud Models (Gemini Flash & SDXL)',
      'Live Web Search Integration',
      'Coding Mode (IDE Integration)',
      'Memory Matrix (Conversation Memory)',
      '500 MB cloud storage',
      '10 video generations/month',
    ],
    cta: 'Get Pro',
    ghost: false,
  },
  {
    name: 'Elite',
    emoji: '🟣',
    color: '#a855f7',
    price: '₹1,499',
    period: '/month',
    tagline: 'Master the system.',
    desc: 'Advanced cloud models and autonomous features for power users.',
    features: [
      'Everything in Pro',
      'Advanced Cloud Models (Gemini 3.1 & Flux)',
      'RK AI Autonomy (Autonomous Actions)',
      'Smart Vault (Unlimited Local File Indexing)',
      'Screen Sense (Vision Analysis)',
      '5 GB cloud storage',
      '50 video generations/month',
    ],
    featured: true,
    cta: 'Get Elite',
    ghost: false,
  },
];

/* ─── MALUS Plans ─────────────────────────────────── */
const malusPlans = [
  {
    name: 'Free',
    emoji: '🟢',
    color: '#10b981',
    price: '₹0',
    period: '/month',
    tagline: 'Everything needed to experience MALUS.',
    features: [
      'OS monitoring',
      'Active app detection',
      'Workflow detection',
      'Context Engine',
      'Behavior Engine',
      'Observation feed',
      'CPU / RAM / Battery / Disk monitoring',
      'Network monitoring',
      'System health alerts',
      'Privacy controls',
      'Local processing',
      'RexyCore Hub compatibility',
      'RK AI integration (when available)',
      '7-day history',
      'Automatic updates',
    ],
    cta: 'Download MALUS',
    href: '/products/malus',
    ghost: true,
  },
  {
    name: 'MALUS Plus',
    emoji: '🔵',
    color: '#3b82f6',
    price: '₹149',
    period: '/month',
    tagline: 'Perfect for students, developers, and creators.',
    features: [
      'Everything in Free',
      'Unlimited history',
      'Timeline view',
      'Productivity analytics',
      'Workflow insights',
      'Study session tracking',
      'Project activity tracking',
      'Daily, weekly & monthly summaries',
      'Advanced observation filters',
      'Custom notification settings',
      'App usage reports',
      'Resource usage trends',
      'Focus time statistics',
      'Priority updates',
      'Early feature access',
    ],
    cta: 'Get Plus',
    ghost: false,
  },
  {
    name: 'MALUS Pro',
    emoji: '🟣',
    color: '#a855f7',
    price: '₹299',
    period: '/month',
    tagline: 'For power users and professionals.',
    features: [
      'Everything in Plus',
      'Predictive workflow insights',
      'Advanced Behavior Engine',
      'Pattern learning',
      'Burnout & fatigue detection',
      'Deep productivity reports',
      'Custom observation rules',
      'Workflow comparison',
      'Export reports (PDF/CSV)',
      'Workspace profiles',
      'Cross-device sync (future)',
      'Beta features',
      'Premium support',
    ],
    featured: true,
    cta: 'Get Pro',
    ghost: false,
  },
  {
    name: 'MALUS Teams',
    emoji: '🏢',
    color: '#f59e0b',
    price: '₹799',
    period: '/month',
    tagline: 'For companies and teams.',
    soon: true,
    features: [
      'Everything in Pro',
      'Team dashboards',
      'Shared workspace analytics',
      'Admin controls',
      'Organization deployment',
      'Centralized policy management',
      'Team productivity reports',
      'Enterprise support',
    ],
    cta: 'Coming Soon',
    ghost: true,
  },
];

function PlanCard({ plan, accentPrimary }) {
  const color = plan.color;
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.15 }}
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        background: plan.featured ? `rgba(${hexToRgb(color)},0.06)` : 'rgba(255,255,255,0.02)',
        border: `1px solid ${plan.featured ? `rgba(${hexToRgb(color)},0.35)` : 'rgba(255,255,255,0.07)'}`,
        borderRadius: '24px',
        padding: '32px 28px',
        backdropFilter: 'blur(20px)',
        boxShadow: plan.featured ? `0 0 60px rgba(${hexToRgb(color)},0.12)` : 'none',
        flex: 1,
        minWidth: 0,
      }}
    >
      {plan.featured && (
        <div style={{
          position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)',
          background: `linear-gradient(135deg, ${color}, ${color}cc)`,
          color: '#fff', fontSize: '10px', fontWeight: 900, letterSpacing: '1.5px',
          padding: '4px 16px', borderRadius: '99px', textTransform: 'uppercase', whiteSpace: 'nowrap',
          boxShadow: `0 4px 16px rgba(${hexToRgb(color)},0.4)`,
        }}>Most Popular</div>
      )}
      {plan.soon && (
        <div style={{
          position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)',
          background: 'rgba(245,158,11,0.2)', border: '1px solid rgba(245,158,11,0.4)',
          color: '#fbbf24', fontSize: '10px', fontWeight: 900, letterSpacing: '1.5px',
          padding: '4px 16px', borderRadius: '99px', textTransform: 'uppercase', whiteSpace: 'nowrap',
        }}>Coming Soon</div>
      )}

      {/* Header */}
      <div style={{ marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
          <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: color, boxShadow: `0 0 8px ${color}`, flexShrink: 0 }} />
          <span style={{ fontWeight: '900', fontSize: '18px', color: '#fff' }}>{plan.name}</span>
        </div>
        <div style={{ marginBottom: '8px' }}>
          <span style={{ fontSize: '36px', fontWeight: '900', color: '#fff', letterSpacing: '-1px' }}>{plan.price}</span>
          <span style={{ fontSize: '14px', color: 'rgba(255,255,255,0.4)', marginLeft: '4px' }}>{plan.period}</span>
        </div>
        <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', lineHeight: '1.5', margin: 0 }}>{plan.tagline}</p>
      </div>

      {/* Divider */}
      <div style={{ height: '1px', background: `rgba(${hexToRgb(color)},0.15)`, marginBottom: '20px' }} />

      {/* Features */}
      <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 24px', display: 'flex', flexDirection: 'column', gap: '10px', flex: 1 }}>
        {plan.features.map((f, i) => (
          <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '13.5px', color: 'rgba(255,255,255,0.7)' }}>
            <FiCheck size={14} color={color} style={{ flexShrink: 0, marginTop: '2px' }} />
            {f}
          </li>
        ))}
      </ul>

      {/* CTA */}
      {plan.href ? (
        <Link href={plan.href} style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
          padding: '13px', borderRadius: '14px', fontWeight: 700, fontSize: '14px',
          textDecoration: 'none', transition: 'all 0.2s',
          background: plan.ghost ? 'rgba(255,255,255,0.05)' : `linear-gradient(135deg, ${color}, ${color}cc)`,
          border: plan.ghost ? '1px solid rgba(255,255,255,0.1)' : 'none',
          color: '#fff',
          boxShadow: plan.ghost ? 'none' : `0 4px 20px rgba(${hexToRgb(color)},0.35)`,
          cursor: plan.soon ? 'not-allowed' : 'pointer',
          opacity: plan.soon ? 0.6 : 1,
        }}>
          {plan.cta}
        </Link>
      ) : (
        <button
          disabled={plan.soon}
          onClick={() => !plan.soon && alert(`Payment launching soon!\nEmail rexycoreofficial@gmail.com for early access.`)}
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
            padding: '13px', borderRadius: '14px', fontWeight: 700, fontSize: '14px',
            transition: 'all 0.2s', width: '100%',
            background: plan.ghost ? 'rgba(255,255,255,0.05)' : `linear-gradient(135deg, ${color}, ${color}cc)`,
            border: plan.ghost ? '1px solid rgba(255,255,255,0.1)' : 'none',
            color: '#fff',
            boxShadow: plan.ghost ? 'none' : `0 4px 20px rgba(${hexToRgb(color)},0.35)`,
            cursor: plan.soon ? 'not-allowed' : 'pointer',
            opacity: plan.soon ? 0.6 : 1,
          }}
        >
          {plan.cta}
        </button>
      )}
    </motion.div>
  );
}

// Utility: convert hex to "r,g,b" string
function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? `${parseInt(result[1], 16)},${parseInt(result[2], 16)},${parseInt(result[3], 16)}`
    : '255,255,255';
}

export default function Tiers() {
  return (
    <div style={{ background: 'var(--void)', minHeight: '100vh', color: '#fff', position: 'relative', overflowX: 'hidden' }}>
      <div className="noise" aria-hidden />
      <div className="nebula" aria-hidden>
        <div className="nebula__orb nebula__orb--1" />
        <div className="nebula__orb nebula__orb--2" />
        <div className="nebula__orb nebula__orb--3" />
        <div className="nebula__orb nebula__orb--4" />
      </div>
      <Navbar />

      {/* ── HERO ─────────────────────────────────────── */}
      <section style={{ padding: '140px 5% 60px', maxWidth: '1200px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 10 }}>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
          <div className="hero-eyebrow" style={{ marginBottom: '28px', display: 'inline-flex' }}>
            <span className="pulse" /> Rexycore Pricing
          </div>
          <h1 style={{ fontSize: 'clamp(48px, 7vw, 88px)', fontWeight: 900, lineHeight: 1.0, letterSpacing: '-0.04em', marginBottom: '24px' }}>
            Plans for every{' '}
            <span className="flow-text flow-text--purple" style={{ display: 'inline-block' }}>use case.</span>
          </h1>
          <p style={{ fontSize: '19px', color: 'rgba(255,255,255,0.5)', maxWidth: '620px', margin: '0 auto', lineHeight: 1.7 }}>
            We have two product ecosystems — <strong style={{ color: '#818cf8' }}>RK AI</strong> for your desktop & home assistant, and <strong style={{ color: '#10b981' }}>MALUS</strong> for intelligent system observation. Each has its own independent subscription.
          </p>
        </motion.div>
      </section>

      {/* ── RK AI SECTION ────────────────────────────── */}
      <section style={{ padding: '40px 5% 100px', maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 10 }}>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, amount: 0.15 }} style={{ marginBottom: '48px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'rgba(129,140,248,0.12)', border: '1px solid rgba(129,140,248,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <FiZap size={20} color="#818cf8" />
            </div>
            <div>
              <h2 style={{ fontSize: 'clamp(26px, 3vw, 38px)', fontWeight: 900, letterSpacing: '-0.03em', margin: 0 }}>RK AI Subscription</h2>
              <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '14px', margin: '4px 0 0' }}>One plan powers both RK AI Desktop and RK AI Home</p>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 20px', background: 'rgba(129,140,248,0.05)', border: '1px solid rgba(129,140,248,0.15)', borderRadius: '14px', width: 'fit-content' }}>
            <FiMonitor size={16} color="#818cf8" />
            <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)', fontWeight: 600 }}>Covers: RK AI Desktop (Windows, macOS, Linux) + RK AI Home (Raspberry Pi)</span>
          </div>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', alignItems: 'start' }}>
          {rkPlans.map((plan, i) => (
            <PlanCard key={plan.name} plan={plan} accentPrimary="#818cf8" />
          ))}
        </div>
      </section>

      {/* Divider */}
      <div style={{ maxWidth: '1200px', margin: '0 auto 80px', padding: '0 5%', position: 'relative', zIndex: 10 }}>
        <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)' }} />
      </div>

      {/* ── MALUS SECTION ────────────────────────────── */}
      <section style={{ padding: '0 5% 120px', maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 10 }}>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, amount: 0.15 }} style={{ marginBottom: '48px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'rgba(16,185,129,0.12)', border: '1px solid rgba(16,185,129,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <FiCpu size={20} color="#10b981" />
            </div>
            <div>
              <h2 style={{ fontSize: 'clamp(26px, 3vw, 38px)', fontWeight: 900, letterSpacing: '-0.03em', margin: 0 }}>MALUS Subscription</h2>
              <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '14px', margin: '4px 0 0' }}>Standalone plans for MALUS — the AI system observer</p>
            </div>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 18px', background: 'rgba(16,185,129,0.05)', border: '1px solid rgba(16,185,129,0.15)', borderRadius: '12px' }}>
              <FiShield size={15} color="#10b981" />
              <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)', fontWeight: 600 }}>100% local processing — your data never leaves your device</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 18px', background: 'rgba(16,185,129,0.05)', border: '1px solid rgba(16,185,129,0.15)', borderRadius: '12px' }}>
              <FiClock size={15} color="#10b981" />
              <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)', fontWeight: 600 }}>MALUS is independent of RK AI — purchase separately</span>
            </div>
          </div>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px', alignItems: 'start' }}>
          {malusPlans.map((plan, i) => (
            <PlanCard key={plan.name + i} plan={plan} accentPrimary="#10b981" />
          ))}
        </div>
      </section>

      {/* ── BOTTOM CALLOUT ───────────────────────────── */}
      <section style={{ padding: '0 5% 120px', maxWidth: '900px', margin: '0 auto', position: 'relative', zIndex: 10 }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.15 }}
          style={{ padding: '48px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '28px', textAlign: 'center' }}
        >
          <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: 700, marginBottom: '12px' }}>Any questions?</p>
          <h3 style={{ fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 900, letterSpacing: '-0.03em', marginBottom: '16px' }}>Not sure which plan is right for you?</h3>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '15px', lineHeight: 1.7, marginBottom: '32px', maxWidth: '520px', margin: '0 auto 32px' }}>
            Our team can help. Reach out and we'll help you pick the right plan for your workflow.
          </p>
          <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '13px 28px', borderRadius: '99px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontWeight: 700, fontSize: '14px', textDecoration: 'none' }}>
              Contact Us <FiArrowRight size={14} />
            </Link>
            <a href="mailto:rexycoreofficial@gmail.com" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '13px 28px', borderRadius: '99px', background: 'linear-gradient(135deg, #7c3aed, #6366f1)', color: '#fff', fontWeight: 700, fontSize: '14px', textDecoration: 'none', boxShadow: '0 4px 20px rgba(124,58,237,0.35)' }}>
              Email Us Directly
            </a>
          </div>
        </motion.div>
      </section>

      <Footer />
      <ChatWidget />
    </div>
  );
}
