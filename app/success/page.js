'use client';

import { useEffect, Suspense, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { PLANS } from '@/lib/plans';
import { StarField } from '@/components/SpaceUI';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCheck, FiArrowRight } from 'react-icons/fi';

function SuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [countdown, setCountdown] = useState(6);

  const planParam = searchParams.get('plan') || 'free';
  const activePlan = PLANS.find(p => p.id === planParam) || PLANS[0];
  const planColor = activePlan.color || '#a5b4fc';
  const planColorRgb = planColor.startsWith('#')
    ? parseInt(planColor.slice(1, 3), 16) + ',' + parseInt(planColor.slice(3, 5), 16) + ',' + parseInt(planColor.slice(5, 7), 16)
    : '165,180,252';

  useEffect(() => {
    setMounted(true);
    let t = 6;
    const interval = setInterval(() => {
      t -= 1;
      setCountdown(t);
      if (t <= 0) {
        clearInterval(interval);
        router.push('/');
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [router]);

  if (!mounted) return null;

  return (
    <div style={{
      position: 'relative', minHeight: '100vh',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      overflow: 'hidden', background: '#010104',
    }}>
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <StarField />
        <div className="noise" aria-hidden />
      </div>

      {/* Subtle ambient glow — not a harsh circle, just a soft halo */}
      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 600, height: 600, borderRadius: '50%',
          background: `radial-gradient(circle, rgba(${planColorRgb},0.08) 0%, rgba(${planColorRgb},0.03) 40%, transparent 70%)`,
          filter: 'blur(40px)',
          pointerEvents: 'none', zIndex: 1,
        }}
      />

      <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', padding: '40px 24px', maxWidth: 540, width: '100%' }}>
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Check ring — clean, not cheesy */}
            <div style={{ position: 'relative', width: 72, height: 72, margin: '0 auto 36px' }}>
              <motion.svg
                width={72} height={72}
                initial={{ rotate: -90 }}
                animate={{ rotate: 270 }}
                transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                style={{ position: 'absolute', inset: 0 }}
              >
                <circle cx={36} cy={36} r={32} fill="none" stroke={`rgba(${planColorRgb},0.12)`} strokeWidth={1.5} />
                <motion.circle
                  cx={36} cy={36} r={32}
                  fill="none" stroke={planColor} strokeWidth={1.5}
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 32}`}
                  initial={{ strokeDashoffset: 2 * Math.PI * 32 }}
                  animate={{ strokeDashoffset: 0 }}
                  transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
                />
              </motion.svg>
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.9, ease: [0.34, 1.56, 0.64, 1] }}
                style={{
                  position: 'absolute', inset: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: planColor, fontSize: 26,
                }}
              >
                <FiCheck strokeWidth={2.5} />
              </motion.div>
            </div>

            {/* Plan badge */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                padding: '4px 14px', borderRadius: 99,
                background: `rgba(${planColorRgb},0.1)`,
                border: `1px solid rgba(${planColorRgb},0.25)`,
                marginBottom: 24,
                fontSize: 11, fontWeight: 800, letterSpacing: 1.5,
                color: planColor, textTransform: 'uppercase',
              }}
            >
              <span style={{ width: 5, height: 5, borderRadius: '50%', background: planColor, display: 'inline-block' }} />
              {activePlan.name}
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              style={{ fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 900, letterSpacing: '-0.04em', marginBottom: 16, lineHeight: 1.1 }}
            >
              You&apos;re all set.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.85, duration: 0.5 }}
              style={{ fontSize: 17, color: 'rgba(255,255,255,0.45)', maxWidth: 380, margin: '0 auto 40px', lineHeight: 1.7 }}
            >
              Your {activePlan.name} plan is active. You&apos;re heading home in {countdown} second{countdown !== 1 ? 's' : ''}.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.5 }}
              style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}
            >
              <motion.button
                onClick={() => router.push('/')}
                whileHover={{ scale: 1.03, y: -1 }}
                whileTap={{ scale: 0.97 }}
                style={{
                  padding: '13px 28px', borderRadius: 99,
                  background: '#fff', color: '#000',
                  fontWeight: 800, fontSize: 15, cursor: 'pointer',
                  border: 'none', display: 'inline-flex', alignItems: 'center', gap: 8,
                  fontFamily: 'inherit',
                }}
              >
                Go home <FiArrowRight size={14} />
              </motion.button>
              <motion.button
                onClick={() => router.push('/products')}
                whileHover={{ scale: 1.03, y: -1 }}
                whileTap={{ scale: 0.97 }}
                style={{
                  padding: '13px 28px', borderRadius: 99,
                  background: 'rgba(255,255,255,0.05)', color: '#fff',
                  fontWeight: 700, fontSize: 15, cursor: 'pointer',
                  border: '1px solid rgba(255,255,255,0.1)',
                  backdropFilter: 'blur(12px)', fontFamily: 'inherit',
                }}
              >
                Browse products
              </motion.button>
            </motion.div>

            {/* Countdown progress bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
              style={{ marginTop: 40, maxWidth: 280, margin: '40px auto 0' }}
            >
              <div style={{ height: 2, background: 'rgba(255,255,255,0.06)', borderRadius: 99, overflow: 'hidden' }}>
                <motion.div
                  initial={{ width: '100%' }}
                  animate={{ width: '0%' }}
                  transition={{ duration: 6, ease: 'linear' }}
                  style={{ height: '100%', background: planColor, borderRadius: 99 }}
                />
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: '100vh', background: '#010104' }} />}>
      <SuccessContent />
    </Suspense>
  );
}
