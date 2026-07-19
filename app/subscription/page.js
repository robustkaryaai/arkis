'use client';

import { useEffect, useState, useRef } from 'react';
import Navbar from '@/components/Navbar';
import ChatWidget from '@/components/ChatWidget';
import Footer from '@/components/Footer';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { PLANS, TIER_INDEX_TO_PLAN } from '@/lib/plans';
import {
    AiOutlineCheck,
    AiOutlineThunderbolt,
    AiOutlineArrowLeft,
    AiOutlineClose,
    AiOutlineInfoCircle,
    AiOutlineDatabase,
    AiOutlineUser,
    AiOutlineLink,
} from 'react-icons/ai';
import { getProfile, getWaitlistSlots } from '@/lib/api';

/* ── Matrix Rain Canvas ─────────────────────────────────────────── */
function MatrixRain({ color = '#00ff9d', opacity = 0.08 }) {
    const canvasRef = useRef(null);
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
        const cols = Math.floor(canvas.width / 16);
        const drops = Array(cols).fill(1);
        const chars = 'アイウエオカキクケコ01RKAIMATRIX';
        let frame;
        const draw = () => {
            ctx.fillStyle = 'rgba(0,0,0,0.07)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = color;
            ctx.font = '12px monospace';
            drops.forEach((y, i) => {
                const c = chars[Math.floor(Math.random() * chars.length)];
                ctx.fillText(c, i * 16, y * 16);
                if (y * 16 > canvas.height && Math.random() > 0.975) drops[i] = 0;
                drops[i]++;
            });
            frame = requestAnimationFrame(draw);
        };
        draw();
        return () => cancelAnimationFrame(frame);
    }, [color]);
    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'absolute', inset: 0, width: '100%', height: '100%',
                opacity, pointerEvents: 'none', borderRadius: 'inherit'
            }}
        />
    );
}

/* ── Glitch text effect ─────────────────────────────────────────── */
function GlitchBadge({ children, color }) {
    return (
        <span style={{
            display: 'inline-block', fontSize: '9px', fontWeight: '900',
            letterSpacing: '2px', padding: '3px 10px', borderRadius: '4px',
            background: `${color}22`, border: `1px solid ${color}66`,
            color, textTransform: 'uppercase'
        }}>
            {children}
        </span>
    );
}




function normalizeActivePlanId(subRow) {
    if (!subRow) return 'free';
    const raw = subRow.planId ?? subRow.plan ?? subRow.tier ?? subRow.packageId;
    if (raw == null || raw === '') return 'free';
    if (typeof raw === 'string') {
        const k = raw.toLowerCase().replace(/\s/g, '');
        if (['free', 'pro', 'elite', 'quantum'].includes(k)) return k;
    }
    const n = Number(raw);
    if (!Number.isNaN(n) && TIER_INDEX_TO_PLAN[n] !== undefined) return TIER_INDEX_TO_PLAN[n];
    return 'free';
}

function trialLinkedActive(trials) {
    if (!Array.isArray(trials) || trials.length === 0) return false;
    const end = trials[0].trialEnd;
    if (!end) return false;
    return new Date(end).getTime() > Date.now();
}

/* ── Plan Card ──────────────────────────────────────────────────── */
function PlanCard({ plan, activePlanId, trialActive, onAction, isSaving, idx, dynamicSlots, slotsReady }) {
    const isTrial = plan.type === 'trial';
    const isWaitlist = plan.type === 'waitlist';
    const isActive = isTrial ? trialActive : !trialActive && plan.id === activePlanId;
    const slotsText = !slotsReady
        ? 'Checking live slots...'
        : typeof dynamicSlots === 'number'
            ? `${dynamicSlots} price-lock slots left`
            : plan.slots;

    const btnLabel = isActive
        ? (isTrial ? 'TRIAL ACTIVE' : 'CURRENT PLAN')
        : isTrial
        ? isSaving ? 'ACTIVATING...' : 'START FREE TRIAL'
        : (plan.id === 'free' && !isActive)
        ? 'DOWNGRADE'
        : isSaving ? 'PROCESSING...' : `UPGRADE NOW`;

    const displayColor = isActive ? '#ffffff' : plan.glowColor;

    const desktopFeatures = plan.desktopFeatures ?? (Array.isArray(plan.features) ? plan.features.slice(0, 3) : []);
    const homeFeatures = plan.homeFeatures ?? (Array.isArray(plan.features) ? plan.features.slice(3) : []);
    const sharedFeatures = plan.sharedFeatures ?? [];

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0, transition: { delay: idx * 0.1, type: 'spring', stiffness: 100, damping: 15 } }}
            whileHover={!isActive ? { y: -10, scale: 1.02, boxShadow: `0 25px 50px ${plan.glowColor}25` } : {}}
            style={{
                position: 'relative',
                borderRadius: '24px',
                overflow: 'hidden',
                border: isActive
                    ? `2px solid #ffffff`
                    : plan.popular
                    ? `1px solid ${plan.glowColor}AA`
                    : '1px solid rgba(255,255,255,0.08)',
                background: isActive
                    ? `linear-gradient(160deg, rgba(30,30,30,0.9), rgba(5,5,5,0.95))`
                    : 'rgba(12, 16, 30, 0.7)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                boxShadow: isActive
                    ? `0 0 50px rgba(255,255,255,0.2), inset 0 0 80px rgba(255,255,255,0.1)`
                    : plan.popular
                    ? `0 0 35px ${plan.glowColor}20`
                    : '0 10px 30px rgba(0,0,0,0.5)',
                padding: '36px 32px',
                display: 'flex',
                flexDirection: 'column'
            }}
        >
            <MatrixRain color={displayColor} opacity={0.08} />

            {plan.popular && (
                <div style={{
                    position: 'absolute', top: 0, left: 0, right: 0, height: '4px',
                    background: `linear-gradient(90deg, transparent, ${plan.glowColor}, transparent)`,
                    boxShadow: `0 2px 15px ${plan.glowColor}AA`
                }} />
            )}

            {isActive && (
                <div style={{
                    position: 'absolute', top: '20px', right: '-35px',
                    background: '#ffffff', color: '#000',
                    fontSize: '10px', fontWeight: '900', padding: '6px 40px',
                    transform: 'rotate(45deg)', letterSpacing: '2px',
                    boxShadow: `0 0 20px rgba(255,255,255,0.6)`
                }}>
                    ACTIVE
                </div>
            )}

            {slotsText && !isActive && (
                <div style={{
                    position: 'absolute', top: '20px', right: '20px',
                    fontSize: '10px', fontWeight: '900', letterSpacing: '1px',
                    color: plan.glowColor, display: 'flex', alignItems: 'center', gap: '6px',
                    background: `${plan.glowColor}15`, padding: '6px 12px', borderRadius: '12px',
                    border: `1px solid ${plan.glowColor}44`
                }}>
                    <span style={{
                        display: 'inline-block', width: '6px', height: '6px',
                        borderRadius: '50%', background: plan.glowColor,
                        boxShadow: `0 0 8px ${plan.glowColor}`,
                        animation: 'pulse 1.5s infinite',
                    }} />
                    {slotsText}
                </div>
            )}

            <div style={{ marginBottom: '24px', position: 'relative', zIndex: 1 }}>
                {plan.badge && (
                    <div style={{ marginBottom: '16px' }}>
                        <GlitchBadge color={displayColor}>{plan.badge}</GlitchBadge>
                    </div>
                )}
                <h2 style={{
                    fontSize: '26px', fontWeight: '900', color: '#fff',
                    letterSpacing: '1.5px', marginBottom: '8px',
                    textShadow: `0 0 25px ${displayColor}99`,
                }}>
                    {plan.name}
                </h2>
                <p style={{ fontSize: '13px', color: displayColor, fontWeight: '700', letterSpacing: '0.8px', opacity: 0.9 }}>
                    {plan.tagline}
                </p>
            </div>

            <div style={{
                display: 'flex', alignItems: 'flex-end', gap: '8px',
                marginBottom: '12px', position: 'relative', zIndex: 1,
            }}>
                {plan.discount && (
                    <span style={{
                        fontSize: '15px', color: '#ef4444', fontWeight: '800',
                        textDecoration: 'line-through', marginBottom: '8px',
                        opacity: 0.8
                    }}>
                        {plan.discount}
                    </span>
                )}
                <span style={{
                    fontSize: '48px', fontWeight: '900', color: displayColor,
                    lineHeight: 1, textShadow: `0 0 45px ${displayColor}AA`,
                }}>
                    {plan.price}
                </span>
                <span style={{ fontSize: '13px', color: '#888', fontWeight: '700', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '1px' }}>
                    {plan.period}
                </span>
            </div>

            <div style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                fontSize: '12px', color: '#ccc', fontWeight: '700',
                marginBottom: '28px', position: 'relative', zIndex: 1,
                background: 'rgba(255,255,255,0.05)', padding: '8px 14px',
                borderRadius: '10px', border: '1px solid rgba(255,255,255,0.1)'
            }}>
                <AiOutlineDatabase size={15} color={displayColor} />
                {plan.storageLabel} STORAGE
            </div>

            <div style={{
                padding: '16px 20px', marginBottom: '28px',
                borderLeft: `3px solid ${displayColor}`,
                background: `linear-gradient(90deg, ${displayColor}15, rgba(0,0,0,0))`,
                borderRadius: '0 12px 12px 0',
                position: 'relative', zIndex: 1,
            }}>
                <p style={{ fontSize: '13px', color: '#aaa', fontStyle: 'italic', lineHeight: '1.6', letterSpacing: '0.4px', margin: 0 }}>
                    {plan.quote}
                </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', marginBottom: '36px', position: 'relative', zIndex: 1, flexGrow: 1 }}>
                <div>
                    <div style={{ fontSize: '11px', fontWeight: '900', color: displayColor, letterSpacing: '1.5px', marginBottom: '12px', borderBottom: `1px solid ${displayColor}33`, paddingBottom: '6px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <AiOutlineThunderbolt size={14} /> RK AI DESKTOP FEATURES
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {desktopFeatures.map((f, i) => (
                            <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                                <AiOutlineCheck size={14} color={displayColor} style={{ flexShrink: 0, marginTop: '2px' }} />
                                <span style={{ fontSize: '13px', color: '#ddd', fontWeight: '500', lineHeight: 1.4 }}>{f}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div>
                    <div style={{ fontSize: '11px', fontWeight: '900', color: displayColor, letterSpacing: '1.5px', marginBottom: '12px', borderBottom: `1px solid ${displayColor}33`, paddingBottom: '6px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <AiOutlineThunderbolt size={14} /> RK AI HOME FEATURES
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {homeFeatures.map((f, i) => (
                            <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                                <AiOutlineCheck size={14} color={displayColor} style={{ flexShrink: 0, marginTop: '2px' }} />
                                <span style={{ fontSize: '13px', color: '#ddd', fontWeight: '500', lineHeight: 1.4 }}>{f}</span>
                            </div>
                        ))}
                    </div>
                </div>
                {sharedFeatures.length > 0 && (
                    <div>
                        <div style={{ fontSize: '11px', fontWeight: '900', color: displayColor, letterSpacing: '1.5px', marginBottom: '12px', borderBottom: `1px solid ${displayColor}33`, paddingBottom: '6px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <AiOutlineDatabase size={14} /> SHARED CLOUD LIMITS
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            {sharedFeatures.map((f, i) => (
                                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                                    <AiOutlineCheck size={14} color={displayColor} style={{ flexShrink: 0, marginTop: '2px' }} />
                                    <span style={{ fontSize: '13px', color: '#ddd', fontWeight: '500', lineHeight: 1.4 }}>{f}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            <motion.button
                onClick={() => !isActive && onAction(plan)}
                disabled={isActive || isSaving}
                whileHover={!isActive && !isSaving ? { scale: 1.03, boxShadow: `0 10px 35px ${plan.glowColor}88`, background: `linear-gradient(135deg, ${plan.glowColor}66, ${plan.glowColor}22)` } : {}}
                whileTap={!isActive && !isSaving ? { scale: 0.97 } : {}}
                style={{
                    width: '100%', height: '56px', borderRadius: '14px',
                    border: isActive ? '1px solid rgba(255,255,255,0.1)' : `1px solid ${plan.glowColor}88`,
                    background: isActive
                        ? 'rgba(255,255,255,0.05)'
                        : `linear-gradient(135deg, ${plan.glowColor}33, ${plan.glowColor}11)`,
                    color: isActive ? '#777' : '#fff',
                    fontSize: '14px', fontWeight: '900', letterSpacing: '2px',
                    cursor: isActive ? 'default' : 'pointer',
                    position: 'relative', zIndex: 1,
                    transition: 'border 0.3s ease',
                    boxShadow: isActive ? 'none' : `0 5px 20px ${plan.glowColor}33`,
                    textTransform: 'uppercase',
                    textShadow: isActive ? 'none' : `0 0 10px ${plan.glowColor}`,
                }}
            >
                {btnLabel}
            </motion.button>
            {isWaitlist && !isActive && (
                <p style={{ textAlign: 'center', fontSize: '12px', color: '#666', marginTop: '16px', position: 'relative', zIndex: 1, fontWeight: '600' }}>
                    <span style={{ color: plan.glowColor }}>🔒</span> Locked pricing — never goes up
                </p>
            )}
        </motion.div>
    );
}

/* ── Main Page ──────────────────────────────────────────────────── */
export default function Subscription() {
    const { user, loading: authLoading } = useAuth();
    const router = useRouter();

    const [subRow, setSubRow] = useState(null);
    const [linkedTrials, setLinkedTrials] = useState([]);
    const [subLoading, setSubLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [realSlots, setRealSlots] = useState({
        trial: null,
        student: null,
        creator: null,
        pro: null,
        studio: null,
    });
    const [slotsReady, setSlotsReady] = useState(false);
    
    // Modal state
    const [showSurvey, setShowSurvey] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [surveyData, setSurveyData] = useState({ paymentIntent: 'Yes', notes: '' });

    const isLoaded = !authLoading;
    const isSignedIn = !!user;

    useEffect(() => {
        if (isLoaded && !isSignedIn) { router.push('/login?redirect=/subscription'); return; }
        
        const load = async () => {
            if (!user) return;
            try {
                const res = await getProfile(user.$id || user.id, user.email || '');
                const localTier = localStorage.getItem('rk_plan_tier');
                const row = Array.isArray(res?.subscriptions) && res.subscriptions.length > 0 
                    ? res.subscriptions[0] 
                    : (localTier ? { planId: localTier } : null);
                setSubRow(row);
                setLinkedTrials(Array.isArray(res?.trials) ? res.trials : []);
                
                // Save plan details to localStorage for global frontend access
                try {
                    const activePlan = normalizeActivePlanId(row);
                    localStorage.setItem('rk_plan_tier', activePlan);
                    if (row && (row.currentPeriodEnd || row.expiresOn || row.expiresAt)) {
                        localStorage.setItem('rk_plan_expiry', String(row.currentPeriodEnd || row.expiresOn || row.expiresAt));
                    }
                    localStorage.setItem('rk_plan_raw_data', JSON.stringify(row || {}));
                } catch (e) {
                    console.warn("Failed to write plan to localStorage", e);
                }
            } catch (_) {
                setSubRow(null);
            } finally {
                setSubLoading(false);
            }
        };

        if (isLoaded && isSignedIn) load();
    }, [isLoaded, isSignedIn, router, user]);

    useEffect(() => {
        if (!isLoaded || !isSignedIn) return;
        let cancelled = false;
        const loadSlots = async () => {
            try {
                const S = await getWaitlistSlots();
                if (cancelled || !S?.remaining) return;
                setRealSlots({
                            trial: S.remaining.trial ?? 100,
                            student: S.remaining.student ?? 100,
                            creator: S.remaining.creator ?? 50,
                            pro: S.remaining.pro ?? 25,
                            studio: S.remaining.studio ?? 5
                });
            } catch (err) {
                console.warn('[Subscription] Failed to load live slots:', err);
            } finally {
                if (!cancelled) setSlotsReady(true);
            }
        };

        loadSlots();
        return () => { cancelled = true; };
    }, [isLoaded, isSignedIn]);

    const trialActive = trialLinkedActive(linkedTrials);
    const activePlanId = normalizeActivePlanId(subRow);
    const activePlanSummary = PLANS.find((p) => {
        if (trialActive && p.type === 'trial') return true;
        if (!trialActive && p.id === activePlanId) return true;
        return false;
    }) || PLANS.find((p) => p.id === 'free');

    const handleAction = (plan) => {
        if (plan.type === 'trial') { handleTrial(); return; }
        router.push(`/payment?plan=${plan.id}`);
    };

    const handleTrial = async () => {
        setIsSaving(true);
        // Simulation of trial activation for the website (typically device-bound in backend)
        setTimeout(() => {
            alert("7-Day Pro Trial requested. Please link a device from the RK Home app to activate.");
            setIsSaving(false);
        }, 1000);
    };

    const submitSurvey = async () => {
        setIsSaving(true);
        try {
            const BASE = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://rk-ai-backend.onrender.com';
            const res = await fetch(`${BASE}/web/waitlist`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userId: user.$id || user.id,
                    name: user.name, email: user.email,
                    product: selectedPlan.name,
                    productKey: selectedPlan.id,
                    paymentIntent: surveyData.paymentIntent,
                    notes: surveyData.notes,
                }),
            });
            if (res.ok) {
                alert('Added to Priority Waitlist! 🚀');
                setShowSurvey(false);
            } else {
                alert('Submission failed. Please try again later.');
            }
        } catch { 
            alert('Connection error'); 
        } finally { 
            setIsSaving(false); 
        }
    };

    if (authLoading || subLoading) {
        return <div style={{ background: 'var(--background)', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div className="spinner" />
            <style>{`.spinner { width: 36px; height: 36px; border: 3px solid rgba(79,156,249,0.15); border-top-color: #4f9cf9; border-radius: 50%; animation: spin 0.8s linear infinite; } @keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>;
    }

    if (!user) {
        return <div style={{ background: 'var(--background)', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text)' }}>Redirecting...</div>;
    }

    return (
        <div style={{ background: 'var(--background)', minHeight: '100vh', color: '#fff', overflowX: 'hidden' }}>
            <Navbar />
            
            <div style={{ padding: '120px 20px 80px', maxWidth: '1400px', margin: '0 auto' }}>
                
                {/* ── Header ── */}
                <header style={{ marginBottom: '50px', display: 'flex', alignItems: 'center', gap: '24px' }}>
                    <motion.button
                        whileTap={{ scale: 0.9 }}
                        whileHover={{ scale: 1.05, background: 'rgba(79,156,249,0.1)' }}
                        onClick={() => router.back()}
                        style={{
                            background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)',
                            borderRadius: '16px', width: '54px', height: '54px',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            cursor: 'pointer', color: '#4f9cf9', flexShrink: 0,
                            backdropFilter: 'blur(10px)', transition: 'all 0.2s ease'
                        }}
                    >
                        <AiOutlineArrowLeft size={22} />
                    </motion.button>
                    <div>
                        <h1 style={{
                            fontSize: '38px', fontWeight: '900', color: '#fff',
                            letterSpacing: '2.5px', marginBottom: '6px',
                            animation: 'glowPulse 3s infinite', textTransform: 'uppercase'
                        }}>
                            MATRIX TIERS
                        </h1>
                        <p style={{ fontSize: '13px', color: '#888', fontWeight: '800', letterSpacing: '3px', textTransform: 'uppercase' }}>
                            RK AI DESKTOP & REXYCORE CLOUD SUBSCRIPTION
                        </p>
                    </div>
                </header>

                {/* ── Early-access notice ── */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    style={{
                        padding: '16px 20px', marginBottom: '32px',
                        borderRadius: '16px', background: 'rgba(79,156,249,0.05)',
                        border: '1px solid rgba(79,156,249,0.2)',
                        display: 'flex', alignItems: 'center', gap: '14px',
                    }}
                >
                    <AiOutlineInfoCircle size={20} color="#4f9cf9" style={{ flexShrink: 0 }} />
                    <p style={{ fontSize: '13px', color: '#999', lineHeight: '1.5' }}>
                        <span style={{ color: '#4f9cf9', fontWeight: '800' }}>Pricing Notice</span>
                        {' '}— Subscription prices may change after the public launch. Existing subscribers keep their current price for as long as their subscription remains active.
                    </p>
                </motion.div>

                {/* ── Plans Grid ── */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
                    {PLANS.map((plan, idx) => (
                        <PlanCard
                            key={plan.id}
                        plan={plan}
                        activePlanId={activePlanId}
                        trialActive={trialActive}
                        onAction={handleAction}
                        isSaving={isSaving}
                        idx={idx}
                        dynamicSlots={
                            plan.id === 'trial'
                                ? realSlots.trial
                                : plan.id === 'student'
                                    ? realSlots.student
                                    : plan.id === 'creator'
                                        ? realSlots.creator
                                        : plan.id === 'pro'
                                            ? realSlots.pro
                                            : plan.id === 'studio'
                                                ? realSlots.studio
                                                : null
                        }
                        slotsReady={slotsReady}
                    />
                ))}
                </div>

                {/* ── Enterprise section ── */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    style={{
                        marginTop: '50px', textAlign: 'center', padding: '32px',
                        borderRadius: '20px', background: 'rgba(155,89,245,0.03)',
                        border: '1px solid rgba(155,89,245,0.15)',
                    }}
                >
                    <AiOutlineThunderbolt size={24} color="#9b59f5" style={{ marginBottom: '12px' }} />
                    <h3 style={{ fontSize: '15px', fontWeight: '900', color: '#fff', marginBottom: '8px', letterSpacing: '1px' }}>
                        ENTERPRISE MATRIX
                    </h3>
                    <p style={{ fontSize: '13px', color: '#666', lineHeight: '1.6', maxWidth: '600px', margin: '0 auto' }}>
                        Need massive scale? Custom storage, unlimited autonomous agents, and raw dedicated processing power.{' '}
                        <Link href="/contact" style={{ color: '#9b59f5', fontWeight: '800', textDecoration: 'none' }}>Contact the core team →</Link>
                    </p>
                </motion.div>

                {/* ── Waitlist / Survey Modal ── */}
                <AnimatePresence>
                    {showSurvey && selectedPlan && (
                        <div style={{
                            position: 'fixed', inset: 0, zIndex: 9999,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            padding: '20px',
                        }}>
                            <motion.div
                                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                onClick={() => setShowSurvey(false)}
                                style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.92)', backdropFilter: 'blur(12px)' }}
                            />
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0, y: 30 }}
                                animate={{ scale: 1, opacity: 1, y: 0 }}
                                exit={{ scale: 0.9, opacity: 0, y: 30 }}
                                style={{
                                    width: '100%', maxWidth: '440px', padding: '36px',
                                    position: 'relative', zIndex: 1,
                                    background: 'rgba(6,9,22,0.97)', borderRadius: '24px',
                                    border: `1px solid ${selectedPlan.glowColor}44`,
                                    boxShadow: `0 0 60px ${selectedPlan.glowColor}20`,
                                    overflow: 'hidden',
                                }}
                            >
                                <MatrixRain color={selectedPlan.glowColor} opacity={0.04} />
                                
                                <button
                                    onClick={() => setShowSurvey(false)}
                                    style={{
                                        position: 'absolute', top: '24px', right: '24px',
                                        background: 'transparent', border: 'none',
                                        color: '#555', cursor: 'pointer', zIndex: 1,
                                    }}
                                >
                                    <AiOutlineClose size={24} />
                                </button>

                                <div style={{ position: 'relative', zIndex: 1 }}>
                                    <GlitchBadge color={selectedPlan.glowColor}>WAITLIST</GlitchBadge>
                                    <h2 style={{
                                        fontSize: '24px', fontWeight: '900', color: '#fff',
                                        marginTop: '16px', marginBottom: '6px',
                                        textShadow: `0 0 20px ${selectedPlan.glowColor}55`,
                                    }}>
                                        {selectedPlan.name}
                                    </h2>
                                    <p style={{ fontSize: '13px', color: '#666', marginBottom: '8px' }}>
                                        Locked lifetime price:{' '}
                                        <span style={{ color: selectedPlan.glowColor, fontWeight: '800' }}>
                                            {selectedPlan.price}/mo
                                        </span>
                                        {selectedPlan.discount && (
                                            <span style={{ textDecoration: 'line-through', color: '#ef4444', marginLeft: '8px' }}>
                                                {selectedPlan.discount}
                                            </span>
                                        )}
                                    </p>

                                    {selectedPlan.slots && (
                                        <div style={{
                                            display: 'inline-flex', alignItems: 'center', gap: '6px',
                                            fontSize: '11px', color: selectedPlan.glowColor,
                                            fontWeight: '800', marginBottom: '28px',
                                        }}>
                                            <span style={{
                                                display: 'inline-block', width: '6px', height: '6px',
                                                borderRadius: '50%', background: selectedPlan.glowColor,
                                                animation: 'pulse 1.5s infinite',
                                            }} />
                                            {selectedPlan.slots}
                                        </div>
                                    )}

                                    <div style={{
                                        padding: '14px 16px', marginBottom: '28px',
                                        borderLeft: `2px solid ${selectedPlan.glowColor}44`,
                                        background: `${selectedPlan.glowColor}06`,
                                        borderRadius: '0 10px 10px 0',
                                    }}>
                                        <p style={{ fontSize: '12px', color: '#777', fontStyle: 'italic', lineHeight: '1.5' }}>
                                            {selectedPlan.quote}
                                        </p>
                                    </div>

                                    <label style={{
                                        display: 'block', fontSize: '11px', fontWeight: '800',
                                        color: '#666', marginBottom: '12px', letterSpacing: '1px',
                                    }}>
                                        READY TO UPGRADE ONCE INVITED?
                                    </label>
                                    <div style={{ display: 'flex', gap: '10px', marginBottom: '24px' }}>
                                        {['Yes', 'Maybe', 'No'].map(opt => (
                                            <button
                                                key={opt}
                                                onClick={() => setSurveyData({ ...surveyData, paymentIntent: opt })}
                                                style={{
                                                    flex: 1, height: '44px', borderRadius: '12px',
                                                    background: surveyData.paymentIntent === opt
                                                        ? `${selectedPlan.glowColor}33`
                                                        : 'rgba(255,255,255,0.03)',
                                                    border: surveyData.paymentIntent === opt
                                                        ? `1px solid ${selectedPlan.glowColor}`
                                                        : '1px solid rgba(255,255,255,0.06)',
                                                    color: surveyData.paymentIntent === opt
                                                        ? selectedPlan.glowColor : '#666',
                                                    fontSize: '12px', fontWeight: '800', cursor: 'pointer',
                                                }}
                                            >
                                                {opt}
                                            </button>
                                        ))}
                                    </div>

                                    <label style={{
                                        display: 'block', fontSize: '11px', fontWeight: '800',
                                        color: '#666', marginBottom: '12px', letterSpacing: '1px',
                                    }}>
                                        WHAT FEATURE DO YOU NEED MOST?
                                    </label>
                                    <textarea
                                        placeholder="e.g. PPT generation, unlimited storage..."
                                        value={surveyData.notes}
                                        onChange={e => setSurveyData({ ...surveyData, notes: e.target.value })}
                                        style={{
                                            width: '100%', height: '100px', resize: 'none',
                                            background: 'rgba(255,255,255,0.03)',
                                            border: `1px solid ${selectedPlan.glowColor}22`,
                                            borderRadius: '12px', padding: '16px',
                                            color: '#ccc', fontSize: '13px', outline: 'none',
                                            marginBottom: '32px',
                                        }}
                                    />

                                    <button
                                        onClick={submitSurvey}
                                        disabled={isSaving}
                                        style={{
                                            width: '100%', height: '56px', borderRadius: '14px',
                                            background: `linear-gradient(135deg, ${selectedPlan.glowColor}33, ${selectedPlan.glowColor}11)`,
                                            border: `1px solid ${selectedPlan.glowColor}66`,
                                            color: selectedPlan.glowColor,
                                            fontSize: '14px', fontWeight: '900', letterSpacing: '2px',
                                            cursor: 'pointer', boxShadow: `0 0 30px ${selectedPlan.glowColor}22`,
                                        }}
                                    >
                                        {isSaving ? 'JOINING WAITLIST...' : 'CONFIRM WAITLIST →'}
                                    </button>
                                </div>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>

            </div>
            
            <Footer />
            <ChatWidget />
            
            <style>{`
                @keyframes pulse {
                    0%, 100% { opacity: 1; transform: scale(1); }
                    50% { opacity: 0.4; transform: scale(1.3); }
                }
                @keyframes glowPulse {
                    0%, 100% { text-shadow: 0 0 40px rgba(155,89,245,0.4); }
                    50% { text-shadow: 0 0 70px rgba(155,89,245,0.9); }
                }
            `}</style>
        </div>
    );
}
