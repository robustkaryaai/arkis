'use client';

import { useEffect, Suspense, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { PLANS } from '@/lib/plans';
import { triggerNebula, StarField } from '@/components/SpaceUI';
import { FiCheckCircle } from 'react-icons/fi';
import { motion } from 'framer-motion';

function SuccessContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [mounted, setMounted] = useState(false);

    const planParam = searchParams.get('plan') || 'free';
    const activePlan = PLANS.find(p => p.id === planParam) || PLANS[0];

    useEffect(() => {
        setMounted(true);
        // Trigger Nebula with plan colors
        if (activePlan.id !== 'free') {
            const colors = [activePlan.color, activePlan.accentColor || '#fff', activePlan.color];
            triggerNebula('custom', colors);
        }

        // Auto redirect after 5 seconds
        const timer = setTimeout(() => {
            router.push('/');
        }, 5000);

        return () => clearTimeout(timer);
    }, [activePlan, router]);

    if (!mounted) return null;

    return (
        <div style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', background: '#010104' }}>
            <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
                <StarField />
                <div className="noise" aria-hidden />
            </div>

            <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', padding: '40px' }}>
                <motion.div
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                    <div style={{
                        width: '80px', height: '80px', borderRadius: '50%',
                        background: `linear-gradient(135deg, ${activePlan.color}, ${activePlan.accentColor || '#fff'})`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        margin: '0 auto 24px', boxShadow: `0 0 40px ${activePlan.color}66`
                    }}>
                        <FiCheckCircle size={40} color="#fff" />
                    </div>

                    <h1 style={{ fontSize: '48px', fontWeight: 900, color: '#fff', marginBottom: '16px', letterSpacing: '-1px' }}>
                        Welcome to {activePlan.name}
                    </h1>
                    <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.6)', maxWidth: '400px', margin: '0 auto 32px' }}>
                        Your subscription has been successfully updated. The future is yours to build.
                    </p>

                    <button
                        onClick={() => router.push('/')}
                        style={{
                            padding: '14px 32px', borderRadius: '99px',
                            background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)',
                            color: '#fff', fontWeight: 700, fontSize: '15px', cursor: 'pointer',
                            transition: 'all 0.2s ease', backdropFilter: 'blur(10px)'
                        }}
                        onMouseOver={e => e.currentTarget.style.background = 'rgba(255,255,255,0.15)'}
                        onMouseOut={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
                    >
                        Return Home
                    </button>
                </motion.div>
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
