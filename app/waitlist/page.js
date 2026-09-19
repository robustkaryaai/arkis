'use client';
import Navbar from '@/components/Navbar';
import ChatWidget from '@/components/ChatWidget';
import Footer from '@/components/Footer';
import { Suspense, useEffect, useMemo, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { StarField, Card3D, staggerContainer, textVariant, fadeUp } from '@/components/SpaceUI';
import { FiZap, FiArrowRight, FiCheck } from 'react-icons/fi';

const VP = { once: false, amount: 0.1 };

const PRODUCT_ICON = {
  'lumina-os': (
    <span style={{ display: 'inline-flex', width: '48px', height: '48px', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
      <span style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(135deg, #38bdf8, #0ea5e9)',
        borderRadius: '10px',
        boxShadow: '0 0 18px rgba(56,189,248,0.6)',
        animation: 'wl-icon-pulse 3s ease-in-out infinite',
      }} />
      <span style={{ position: 'relative', width: '32px', height: '24px', display: 'inline-flex', flexDirection: 'column', alignItems: 'center' }}>
        <span style={{
          width: '100%', height: '20px',
          border: '2px solid rgba(255,255,255,0.9)',
          borderRadius: '4px',
          background: 'linear-gradient(135deg, rgba(255,255,255,0.2), rgba(255,255,255,0.05))',
        }} />
        <span style={{ width: '14px', height: '3px', background: 'rgba(255,255,255,0.75)', marginTop: '1px', borderRadius: '0 0 3px 3px' }} />
        <span style={{ width: '22px', height: '2px', background: 'rgba(255,255,255,0.6)', marginTop: '1px', borderRadius: '2px' }} />
      </span>
    </span>
  ),
  venava: (
    <span style={{ display: 'inline-flex', width: '48px', height: '48px', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
      <span style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(135deg, #5eead4, #14b8a6)',
        borderRadius: '50%',
        boxShadow: '0 0 20px rgba(94,234,212,0.55)',
        animation: 'wl-icon-pulse 2.6s ease-in-out infinite',
      }} />
      <span style={{
        position: 'relative', display: 'inline-block',
        width: '22px', height: '22px',
      }}>
        {[0, 60, 120, 180, 240, 300].map((deg, i) => (
          <span key={i} style={{
            position: 'absolute', top: '50%', left: '50%',
            width: '3px', height: '11px',
            marginLeft: '-1.5px', marginTop: '-11px',
            background: '#fff',
            borderRadius: '2px',
            transformOrigin: '50% 100%',
            transform: `rotate(${deg}deg)`,
            opacity: 0.95,
            boxShadow: '0 0 4px rgba(255,255,255,0.7)',
            animation: `wl-ray-spin ${3 + i * 0.15}s linear infinite`,
          }} />
        ))}
        <span style={{
          position: 'absolute', top: '50%', left: '50%',
          width: '8px', height: '8px', marginLeft: '-4px', marginTop: '-4px',
          borderRadius: '50%',
          background: 'radial-gradient(circle at 30% 30%, #fff, #ccfbf1)',
          boxShadow: '0 0 8px rgba(255,255,255,0.9)',
        }} />
      </span>
    </span>
  ),
  default: (
    <span style={{ display: 'inline-flex', width: '48px', height: '48px', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
      <span style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(135deg, #a5b4fc, #6366f1)',
        borderRadius: '12px',
        transform: 'rotate(-8deg)',
        boxShadow: '0 8px 20px rgba(99,102,241,0.55)',
        animation: 'wl-rocket-tilt 2.8s ease-in-out infinite',
      }} />
      <span style={{ position: 'relative', display: 'inline-flex', flexDirection: 'column', alignItems: 'center' }}>
        <span style={{
          width: '14px', height: '22px',
          background: 'linear-gradient(180deg, #fff, #e0e7ff)',
          borderRadius: '14px 14px 6px 6px',
          position: 'relative',
          boxShadow: '0 0 10px rgba(255,255,255,0.6)',
        }}>
          <span style={{
            position: 'absolute', top: '5px', left: '50%',
            width: '6px', height: '6px', marginLeft: '-3px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #818cf8, #6366f1)',
            border: '1px solid rgba(99,102,241,0.6)',
          }} />
        </span>
        <span style={{ display: 'flex', gap: '2px', marginTop: '-1px' }}>
          <span style={{
            width: '5px', height: '7px',
            background: 'linear-gradient(180deg, #fbbf24, #f97316, #dc2626)',
            borderRadius: '0 0 50% 50%',
            animation: 'wl-flame-flicker 0.22s ease-in-out infinite',
            boxShadow: '0 0 6px #f97316',
          }} />
          <span style={{
            width: '6px', height: '10px',
            background: 'linear-gradient(180deg, #fde047, #f97316, #dc2626)',
            borderRadius: '0 0 50% 50%',
            animation: 'wl-flame-flicker 0.17s ease-in-out infinite',
            boxShadow: '0 0 8px #f97316',
          }} />
          <span style={{
            width: '5px', height: '7px',
            background: 'linear-gradient(180deg, #fbbf24, #f97316, #dc2626)',
            borderRadius: '0 0 50% 50%',
            animation: 'wl-flame-flicker 0.26s ease-in-out infinite',
            boxShadow: '0 0 6px #f97316',
          }} />
        </span>
      </span>
    </span>
  ),
};

const PRODUCT_META = {
  'lumina-os': { color: '#7dd3fc', glow: 'rgba(14,165,233,0.25)', iconKey: 'lumina-os', desc: 'Privacy-first AI operating system' },
  venava: { color: '#5eead4', glow: 'rgba(20,184,166,0.25)', iconKey: 'venava', desc: 'Personal expression, privately remembered' },
  default:     { color: '#a5b4fc', glow: 'rgba(99,102,241,0.25)', iconKey: 'default', desc: 'Get priority access to the Rexycore ecosystem' },
};

function WaitlistContent() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  const product = (searchParams.get('product') || '').toLowerCase();
  const productLabel = useMemo(() => {
    if (product === 'lumina-os') return 'Lumina OS';
    if (product === 'venava') return 'Venava';
    return 'Rexycore';
  }, [product]);

  const meta = PRODUCT_META[product] || PRODUCT_META.default;

  const [form, setForm] = useState({ name: '', email: '', phone: '', country: 'India', notes: '' });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!authLoading && !user) {
      const qp = product ? `?product=${encodeURIComponent(product)}` : '';
      router.push(`/login?redirect=${encodeURIComponent(`/waitlist${qp}`)}`);
    }
    if (!authLoading && user) {
      setForm((prev) => ({ ...prev, name: prev.name || user.name || '', email: prev.email || user.email || '' }));
    }
  }, [authLoading, user, router, product]);

  const submit = async (e) => {
    e.preventDefault();
    if (!user) return;
    setError('');
    setSubmitting(true);

    const entry = {
      product: productLabel, productKey: product || 'rexycore',
      userId: user.$id, name: form.name, email: form.email,
      phone: form.phone, country: form.country, notes: form.notes,
    };

    try {
      const response = await fetch('https://rk-ai-backend.onrender.com/web/waitlist', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(entry),
      });
      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.error || 'Failed to join waitlist');
      }
      try {
        const raw = localStorage.getItem('rexycore_waitlist') || '[]';
        const list = JSON.parse(raw);
        list.unshift({ ...entry, createdAt: new Date().toISOString() });
        localStorage.setItem('rexycore_waitlist', JSON.stringify(list));
      } catch (_) {}
      setSubmitted(true);
    } catch (err) {
      setError(err.message || 'Failed to join waitlist');
    } finally {
      setSubmitting(false);
    }
  };

  const inputStyle = { width: '100%', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '14px 16px', color: '#fff', outline: 'none', fontSize: 14, fontFamily: 'inherit', transition: 'border-color 0.2s' };
  const labelStyle = { display: 'block', fontSize: '11px', fontWeight: '800', color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '8px' };

  return (
    <div style={{ background: '#010104', minHeight: '100vh', color: '#fff', position: 'relative', overflowX: 'hidden' }}>
      <StarField />
      <div className="noise" aria-hidden />
      <Navbar />

      <div style={{ padding: '140px 5% 80px', maxWidth: '860px', margin: '0 auto', position: 'relative', zIndex: 10 }}>

        {/* Header */}
        <motion.div variants={staggerContainer(0.1, 0.1)} initial="hidden" whileInView="show" viewport={VP} style={{ textAlign: 'center', marginBottom: 52 }}>
          <motion.div variants={fadeUp} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 18px', borderRadius: 99, border: `1px solid ${meta.color}30`, background: `${meta.color}08`, marginBottom: 28 }}>
            <motion.span animate={{ opacity: [1, 0.3, 1] }} transition={{ repeat: Infinity, duration: 2 }} style={{ width: 6, height: 6, borderRadius: '50%', background: meta.color, boxShadow: `0 0 8px ${meta.color}` }} />
            <span style={{ fontSize: 12, fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase', color: meta.color }}>Early Access</span>
          </motion.div>
          <motion.div variants={fadeUp} style={{ fontSize: 56, marginBottom: 16, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{PRODUCT_ICON[meta.iconKey] || PRODUCT_ICON.default}</motion.div>
          <motion.h1 variants={textVariant(0)} style={{ fontSize: 'clamp(36px, 6vw, 64px)', fontWeight: 900, letterSpacing: '-2px', lineHeight: 1.05, marginBottom: 16 }}>
            Join the{' '}
            <span style={{ background: `linear-gradient(90deg, ${meta.color}, #fff, ${meta.color})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{productLabel}</span>{' '}
            Waitlist
          </motion.h1>
          <motion.p variants={fadeUp} style={{ color: 'rgba(255,255,255,0.45)', fontSize: 18, lineHeight: 1.7, maxWidth: 560, margin: '0 auto 16px' }}>
            {meta.desc}. Get priority access and be the first to know when we launch.
          </motion.p>
          <motion.p variants={fadeUp} style={{ color: meta.color, fontSize: 13, fontWeight: 800 }}>
            <FiZap size={12} style={{ display: 'inline', marginRight: 4 }} />
            Early access is limited — priority invites go to waitlist members first.
          </motion.p>
        </motion.div>

        {/* Form / Success */}
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={VP} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>
          {submitted ? (
            <Card3D orbColor={meta.glow}>
              <div style={{ padding: '64px 40px', textAlign: 'center' }}>
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', duration: 0.6 }}
                  style={{ width: 72, height: 72, borderRadius: '50%', background: `${meta.color}15`, border: `2px solid ${meta.color}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', color: meta.color }}>
                  <FiCheck size={32} />
                </motion.div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '12px' }}>
                  <h2 style={{ fontSize: '28px', fontWeight: '800', margin: 0 }}>You're on the list!</h2>
                  <span style={{ display: 'inline-flex', width: '36px', height: '36px', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                    {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => (
                      <span key={i} style={{
                        position: 'absolute', top: '50%', left: '50%',
                        width: '2px', height: '10px', marginLeft: '-1px', marginTop: '-18px',
                        background: meta.color,
                        borderRadius: '2px',
                        transformOrigin: '50% 18px',
                        transform: `rotate(${deg}deg)`,
                        opacity: 0.7,
                        animation: `wl-confetti-burst ${1.4 + i * 0.08}s ease-in-out infinite`,
                      }} />
                    ))}
                    <span style={{
                      position: 'relative', zIndex: 2,
                      width: '16px', height: '16px', borderRadius: '50%',
                      background: `radial-gradient(circle at 30% 30%, #fff, ${meta.color})`,
                      boxShadow: `0 0 12px ${meta.color}`,
                      animation: 'wl-confetti-core 1.4s ease-in-out infinite',
                    }} />
                  </span>
                </div>
                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '16px', lineHeight: '1.7', marginBottom: 32 }}>
                  We'll email you when <strong style={{ color: meta.color }}>{productLabel}</strong> opens for early access.
                </p>
                <div style={{ padding: '20px 24px', background: `${meta.color}08`, borderRadius: '16px', border: `1px solid ${meta.color}20`, marginBottom: 32, position: 'relative', overflow: 'hidden' }}>
                  <p style={{ fontSize: '13px', fontWeight: '800', color: meta.color, marginBottom: 4, display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{
                      display: 'inline-flex', width: '16px', height: '16px', alignItems: 'center', justifyContent: 'center', position: 'relative',
                    }}>
                      <span style={{
                        position: 'absolute', inset: 0, borderRadius: '50%',
                        background: `radial-gradient(circle at 30% 30%, #fde047, #f97316 60%, #b91c1c)`,
                        boxShadow: '0 0 8px #f97316',
                        animation: 'wl-pro-flame 1.1s ease-in-out infinite',
                      }} />
                      <span style={{
                        position: 'absolute', bottom: '-2px', left: '50%',
                        width: '4px', height: '4px', marginLeft: '-2px',
                        borderRadius: '50%',
                        background: '#fbbf24',
                        filter: 'blur(1px)',
                        opacity: 0.6,
                      }} />
                    </span>
                    PRO MOVE
                  </p>
                  <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)', margin: 0 }}>Share this with 3 friends to jump the queue!</p>
                </div>
                <button onClick={() => router.push('/products')}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '13px 28px', borderRadius: 99, background: '#fff', color: '#000', fontWeight: 800, fontSize: 14, border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}>
                  Explore Products <FiArrowRight size={14} />
                </button>
              </div>
            </Card3D>
          ) : (
            <Card3D orbColor={meta.glow}>
              <div style={{ padding: '40px' }}>
                {error && (
                  <div style={{ marginBottom: '18px', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.25)', color: '#fecaca', padding: '12px 16px', borderRadius: '12px', fontSize: '13px' }}>
                    {error}
                  </div>
                )}
                <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '18px' }}>
                    <div>
                      <label style={labelStyle}>Full Name</label>
                      <input value={form.name} onChange={(e) => setForm(p => ({ ...p, name: e.target.value }))} required placeholder="Jane Doe"
                        style={inputStyle} onFocus={e => e.target.style.borderColor = meta.color} onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.08)'} />
                    </div>
                    <div>
                      <label style={labelStyle}>Email</label>
                      <input type="email" value={form.email} onChange={(e) => setForm(p => ({ ...p, email: e.target.value }))} required placeholder="you@example.com"
                        style={inputStyle} onFocus={e => e.target.style.borderColor = meta.color} onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.08)'} />
                    </div>
                  </div>
                  <div>
                    <label style={labelStyle}>What feature would make {productLabel} essential for you?</label>
                    <textarea value={form.notes} onChange={(e) => setForm(p => ({ ...p, notes: e.target.value }))} rows={4}
                      placeholder="Example: Secure offline routines, advanced privacy controls, smart scene automation."
                      style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.6 }}
                      onFocus={e => e.target.style.borderColor = meta.color} onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.08)'} />
                  </div>
                  <button type="submit" disabled={submitting}
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginTop: '4px', padding: '16px', borderRadius: 99, background: submitting ? 'rgba(255,255,255,0.1)' : '#fff', color: submitting ? 'rgba(255,255,255,0.4)' : '#000', fontWeight: 800, fontSize: 15, border: 'none', cursor: submitting ? 'default' : 'pointer', transition: 'all 0.2s', fontFamily: 'inherit', width: '100%' }}>
                    {submitting ? (
                      <>
                        <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }} style={{ width: 14, height: 14, borderRadius: '50%', border: '2px solid rgba(255,255,255,0.2)', borderTopColor: '#fff' }} />
                        Joining…
                      </>
                    ) : <>Get Early Access <FiArrowRight size={14} /></>}
                  </button>
                </form>
              </div>
            </Card3D>
          )}
        </motion.div>
      </div>

      <Footer />
      <ChatWidget />
    </div>
  );
}

export default function WaitlistPage() {
  return (
    <Suspense fallback={
      <div style={{ background: '#010104', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1.5 }} style={{ color: 'rgba(255,255,255,0.3)', fontSize: 14 }}>Loading…</motion.div>
      </div>
    }>
      <WaitlistContent />
    </Suspense>
  );
}
