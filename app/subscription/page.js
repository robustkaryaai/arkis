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
    AiOutlineStar,
    AiOutlineCrown,
    AiOutlineRocket,
} from 'react-icons/ai';
import { FiZap, FiShield, FiCpu, FiGlobe, FiAward, FiMonitor, FiHome, FiCloud, FiAperture } from 'react-icons/fi';
import { getProfile, getWaitlistSlots } from '@/lib/api';
import { StarField, staggerContainer, textVariant, fadeUp, triggerNebula } from '@/components/SpaceUI';

/* ── Utility ─────────────────────────────────────────────────────── */
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

/* ── Plan tier icons ────────────────────────────────────────────── */
const TIER_ICONS = {
    free: <FiShield size={22} />,
    pro: <FiZap size={22} />,
    elite: <AiOutlineCrown size={22} />,
    quantum: <AiOutlineRocket size={22} />,
};

/* ── Plan Card ──────────────────────────────────────────────────── */
function PlanCard({ plan, activePlanId, trialActive, onAction, isSaving, idx }) {
    const isTrial = plan.type === 'trial';
    const isWaitlist = plan.type === 'waitlist';
    const isActive = isTrial ? trialActive : !trialActive && plan.id === activePlanId;
    const isPopular = plan.popular || plan.badge === 'POPULAR';
    const isRecommended = plan.badge === 'RECOMMENDED';
    const isUltimate = plan.badge === 'ULTIMATE';

    const btnLabel = isActive
        ? (isTrial ? 'TRIAL ACTIVE' : 'CURRENT PLAN')
        : isTrial
        ? isSaving ? 'ACTIVATING...' : 'START FREE TRIAL'
        : (plan.id === 'free' && !isActive)
        ? 'DOWNGRADE'
        : isSaving ? 'PROCESSING...' : `GET ${plan.name}`;

    const desktopFeatures = plan.desktopFeatures ?? (Array.isArray(plan.features) ? plan.features.slice(0, 3) : []);
    const homeFeatures = plan.homeFeatures ?? (Array.isArray(plan.features) ? plan.features.slice(3) : []);
    const sharedFeatures = plan.sharedFeatures ?? [];
    const [tab, setTab] = useState('desktop');

    // Each plan's gradient direction
    const gradients = {
        free:    'linear-gradient(90deg, #94a3b8, #64748b, #94a3b8)',
        pro:     'linear-gradient(90deg, #10b981, #059669, #34d399, #059669, #10b981)',
        elite:   'linear-gradient(90deg, #8b5cf6, #6d28d9, #a78bfa, #6d28d9, #8b5cf6)',
        quantum: 'linear-gradient(90deg, #f43f5e, #be123c, #fb7185, #be123c, #f43f5e)',
    };
    const glow = plan.glowColor;

    return (
        <motion.div
            variants={fadeUp}
            custom={idx}
            style={{ height: '100%', position: 'relative' }}
        >
            {/* Popular badge */}
            {(isPopular || isRecommended || isUltimate) && (
                <div style={{
                    position: 'absolute', top: -14, left: '50%', transform: 'translateX(-50%)',
                    zIndex: 10, padding: '5px 18px', borderRadius: 99,
                    background: gradients[plan.id],
                    backgroundSize: '200% auto',
                    animation: 'shine-flow 3s linear infinite',
                    fontSize: 10, fontWeight: 900, letterSpacing: 2, color: '#fff',
                    textTransform: 'uppercase', whiteSpace: 'nowrap',
                    boxShadow: `0 4px 20px ${glow}80`,
                }}>
                    {isRecommended ? '★ RECOMMENDED' : isUltimate ? '⚡ ULTIMATE' : '🔥 POPULAR'}
                </div>
            )}

            <motion.div
                whileHover={{ y: -8, scale: 1.01 }}
                transition={{ type: 'spring', stiffness: 260, damping: 22 }}
                style={{
                    height: '100%',
                    background: isActive
                        ? `linear-gradient(90deg, rgba(30, 30, 40, 0.95, 40, 30, rgba(30), rgba(15,15,25,0.98))`
                        : 'rgba(10,10,18,0.7)',
                    backdropFilter: 'blur(24px)',
                    WebkitBackdropFilter: 'blur(24px)',
                    border: isActive
                        ? `1px solid ${glow}CC`
                        : (isRecommended || isPopular || isUltimate)
                            ? `1px solid ${glow}66`
                            : '1px solid rgba(255,255,255,0.07)',
                    borderRadius: 24,
                    padding: '36px 28px',
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'relative',
                    overflow: 'hidden',
                    boxShadow: isActive
                        ? `0 0 60px ${glow}33, 0 20px 60px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.08)`
                        : (isRecommended || isUltimate)
                            ? `0 0 40px ${glow}20, 0 20px 50px rgba(0,0,0,0.5)`
                            : `0 10px 40px rgba(0,0,0,0.4)`,
                    transition: 'border 0.3s ease, box-shadow 0.3s ease',
                }}
            >
                {/* Top glow bar for non-free active/featured */}
                {(isActive || isRecommended || isPopular || isUltimate) && (
                    <div style={{
                        position: 'absolute', top: 0, left: 0, right: 0, height: 3,
                        background: gradients[plan.id],
                        backgroundSize: '200% auto',
                        animation: 'shine-flow 3s linear infinite',
                        boxShadow: `0 0 20px ${glow}`,
                    }} />
                )}

                {/* Corner glow orb */}
                <div style={{
                    position: 'absolute', top: -40, right: -40,
                    width: 160, height: 160,
                    background: `radial-gradient(circle, ${glow}22 0%, transparent 70%)`,
                    pointerEvents: 'none',
                }} />

                {/* ACTIVE ribbon */}
                {isActive && (
                    <div style={{
                        position: 'absolute', top: 20, right: -30,
                        background: glow, color: '#fff',
                        fontSize: 9, fontWeight: 900, padding: '5px 36px',
                        transform: 'rotate(45deg)', letterSpacing: 2,
                        boxShadow: `0 0 20px ${glow}88`,
                    }}>ACTIVE</div>
                )}

                {/* Header */}
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16, marginBottom: 24 }}>
                    <div style={{
                        width: 48, height: 48, borderRadius: 14, flexShrink: 0,
                        background: gradients[plan.id],
                        backgroundSize: '200% auto',
                        animation: 'shine-flow 3s linear infinite',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        boxShadow: `0 8px 24px ${glow}44`,
                        color: '#fff',
                    }}>
                        {TIER_ICONS[plan.id] || <FiZap size={22} />}
                    </div>
                    <div>
                        <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 2.5, color: glow, textTransform: 'uppercase', marginBottom: 4 }}>
                            {plan.badge || 'FREE TIER'}
                        </div>
                        <h2 style={{ fontSize: 22, fontWeight: 900, color: '#fff', letterSpacing: 1, lineHeight: 1.1 }}>
                            {plan.name}
                        </h2>
                        <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', marginTop: 2, fontWeight: 500 }}>
                            {plan.tagline}
                        </p>
                    </div>
                </div>

                {/* Pricing */}
                <div style={{ marginBottom: 24, display: 'flex', alignItems: 'flex-end', gap: 6 }}>
                    {plan.discount && (
                        <span style={{ fontSize: 14, color: '#ef4444', fontWeight: 800, textDecoration: 'line-through', marginBottom: 8, opacity: 0.7 }}>
                            {plan.discount}
                        </span>
                    )}
                    <span style={{
                        fontSize: 48, fontWeight: 900, lineHeight: 1,
                        background: gradients[plan.id],
                        backgroundSize: '200% auto',
                        animation: 'shine-flow 3s linear infinite',
                        WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent',
                        letterSpacing: -1,
                    }}>
                        {plan.price}
                    </span>
                    <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.3)', marginBottom: 8, fontWeight: 700, letterSpacing: 1 }}>
                        {plan.period}
                    </span>
                </div>

                {/* Storage pill */}
                <div style={{
                    display: 'inline-flex', alignItems: 'center', gap: 7,
                    background: `${glow}12`, border: `1px solid ${glow}30`,
                    borderRadius: 99, padding: '7px 14px', marginBottom: 24,
                    alignSelf: 'flex-start',
                }}>
                    <AiOutlineDatabase size={13} color={glow} />
                    <span style={{ fontSize: 11, fontWeight: 800, color: glow, letterSpacing: 1.5, textTransform: 'uppercase' }}>
                        {plan.storageLabel} Storage
                    </span>
                </div>

                {/* Quote */}
                <div style={{
                    padding: '14px 16px', marginBottom: 28,
                    borderLeft: `2px solid ${glow}55`,
                    background: `${glow}08`,
                    borderRadius: '0 12px 12px 0',
                    fontStyle: 'italic', fontSize: 12,
                    color: 'rgba(255,255,255,0.4)', lineHeight: 1.6,
                }}>
                    {plan.quote}
                </div>

                {/* Tab switcher */}
                <div style={{ display: 'flex', gap: 6, marginBottom: 16 }}>
                    {[['desktop', <><FiMonitor size={10} style={{ marginRight: 4 }}/>Desktop</>], ['home', <><FiHome size={10} style={{ marginRight: 4 }}/>Home</>], ['cloud', <><FiCloud size={10} style={{ marginRight: 4 }}/>Cloud</>]].map(([key, label]) => (
                        <button
                            key={key}
                            onClick={() => setTab(key)}
                            style={{
                                flex: 1, padding: '7px 4px', borderRadius: 10, border: 'none',
                                background: tab === key ? `${glow}22` : 'rgba(255,255,255,0.04)',
                                color: tab === key ? glow : 'rgba(255,255,255,0.35)',
                                fontSize: 10, fontWeight: 800, cursor: 'pointer',
                                letterSpacing: 0.5,
                                transition: 'all 0.2s ease',
                                outline: tab === key ? `1px solid ${glow}44` : '1px solid rgba(255,255,255,0.06)',
                            }}
                        >
                            {label}
                        </button>
                    ))}
                </div>

                {/* Feature list */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 28, flexGrow: 1, minHeight: 180 }}>
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={tab}
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -6 }}
                            transition={{ duration: 0.18 }}
                            style={{ display: 'flex', flexDirection: 'column', gap: 10 }}
                        >
                            {(tab === 'desktop' ? desktopFeatures : tab === 'home' ? homeFeatures : sharedFeatures).map((f, i) => (
                                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                                    <div style={{
                                        width: 18, height: 18, borderRadius: 5, flexShrink: 0, marginTop: 1,
                                        background: `${glow}20`, display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    }}>
                                        <AiOutlineCheck size={11} color={glow} />
                                    </div>
                                    <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', fontWeight: 500, lineHeight: 1.4 }}>{f}</span>
                                </div>
                            ))}
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* CTA Button */}
                <motion.button
                    onClick={() => !isActive && onAction(plan)}
                    disabled={isActive || isSaving}
                    whileHover={!isActive && !isSaving ? {
                        scale: 1.02,
                        boxShadow: `0 12px 40px ${glow}66`,
                    } : {}}
                    whileTap={!isActive && !isSaving ? { scale: 0.97 } : {}}
                    style={{
                        width: '100%', height: 54, borderRadius: 14,
                        border: isActive ? `1px solid rgba(255,255,255,0.08)` : `1px solid ${glow}55`,
                        background: isActive
                            ? 'rgba(255,255,255,0.04)'
                            : gradients[plan.id],
                        backgroundSize: '200% auto',
                        animation: !isActive ? 'shine-flow 3s linear infinite' : 'none',
                        color: isActive ? 'rgba(255,255,255,0.25)' : '#fff',
                        fontSize: 13, fontWeight: 900, letterSpacing: 2,
                        cursor: isActive ? 'default' : 'pointer',
                        textTransform: 'uppercase',
                        boxShadow: isActive ? 'none' : `0 6px 24px ${glow}44`,
                        transition: 'box-shadow 0.3s ease',
                        textShadow: isActive ? 'none' : '0 1px 4px rgba(0,0,0,0.4)',
                    }}
                >
                    {btnLabel}
                </motion.button>
            </motion.div>
        </motion.div>
    );
}

/* ── Comparison table row ───────────────────────────────────────── */
function CompRow({ label, values }) {
    const colors = ['#64748b', '#10b981', '#8b5cf6', '#f43f5e'];
    return (
        <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
            <td style={{ padding: '14px 16px', fontSize: 13, color: 'rgba(255,255,255,0.5)', fontWeight: 600 }}>{label}</td>
            {values.map((v, i) => (
                <td key={i} style={{ padding: '14px 16px', textAlign: 'center', fontSize: 13, fontWeight: 700, color: colors[i] }}>
                    {v === true ? <AiOutlineCheck size={16} color={colors[i]} /> : v === false ? <span style={{ opacity: 0.2 }}>—</span> : v}
                </td>
            ))}
        </tr>
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
    const [realSlots, setRealSlots] = useState({ trial: null, student: null, creator: null, pro: null, studio: null });
    const [slotsReady, setSlotsReady] = useState(false);
    const [showSurvey, setShowSurvey] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [surveyData, setSurveyData] = useState({ paymentIntent: 'Yes', notes: '' });
    const [showCompare, setShowCompare] = useState(false);

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
                try {
                    const activePlan = normalizeActivePlanId(row);
                    localStorage.setItem('rk_plan_tier', activePlan);
                    if (row && (row.currentPeriodEnd || row.expiresOn || row.expiresAt)) {
                        localStorage.setItem('rk_plan_expiry', String(row.currentPeriodEnd || row.expiresOn || row.expiresAt));
                    }
                    localStorage.setItem('rk_plan_raw_data', JSON.stringify(row || {}));
                } catch (e) { console.warn("Failed to write plan to localStorage", e); }
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
                    trial: S.remaining.trial ?? 100, student: S.remaining.student ?? 100,
                    creator: S.remaining.creator ?? 50, pro: S.remaining.pro ?? 25, studio: S.remaining.studio ?? 5
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
                    userId: user.$id || user.id, name: user.name, email: user.email,
                    product: selectedPlan.name, productKey: selectedPlan.id,
                    paymentIntent: surveyData.paymentIntent, notes: surveyData.notes,
                }),
            });
            if (res.ok) { alert('Added to Priority Waitlist! 🚀'); setShowSurvey(false); }
            else { alert('Submission failed. Please try again later.'); }
        } catch { alert('Connection error'); }
        finally { setIsSaving(false); }
    };

    if (authLoading || subLoading) {
        return (
            <div style={{ background: 'var(--void)', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
                <div className="spinner" />
                <div style={{ color: 'rgba(255,255,255,0.3)', fontSize: 13, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase' }}>Loading your plan...</div>
                <style>{`.spinner { width: 36px; height: 36px; border: 3px solid rgba(139,92,246,0.15); border-top-color: #8b5cf6; border-radius: 50%; animation: spin 0.8s linear infinite; } @keyframes spin { to { transform: rotate(360deg); } }`}</style>
            </div>
        );
    }

    if (!user) {
        return <div style={{ background: 'var(--void)', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.4)' }}>Redirecting...</div>;
    }

    return (
        <div style={{ background: '#010104', minHeight: '100vh', color: '#fff', overflowX: 'hidden', position: 'relative', display: 'flex', flexDirection: 'column' }}>
            <StarField />
            <div className="noise" aria-hidden />
            <Navbar />

            {/* ── HERO ────────────────────────────────────────────── */}
            <section style={{ padding: '130px 5% 80px', position: 'relative', zIndex: 10, textAlign: 'center' }}>
                {/* Big ambient orbs */}
                <div style={{ position: 'absolute', top: 60, left: '10%', width: 400, height: 400, background: 'radial-gradient(circle, rgba(139,92,246,0.12), transparent 70%)', pointerEvents: 'none', filter: 'blur(40px)' }} />
                <div style={{ position: 'absolute', top: 80, right: '10%', width: 300, height: 300, background: 'radial-gradient(circle, rgba(16,185,129,0.10), transparent 70%)', pointerEvents: 'none', filter: 'blur(40px)' }} />

                <motion.div variants={staggerContainer(0.1, 0.1)} initial="hidden" animate="show">
                    {/* Eyebrow badge */}
                    <motion.div variants={fadeUp} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 18px', borderRadius: 99, background: 'rgba(139,92,246,0.1)', border: '1px solid rgba(139,92,246,0.3)', marginBottom: 28 }}>
                        <motion.span animate={{ opacity: [1, 0.3, 1] }} transition={{ repeat: Infinity, duration: 2 }} style={{ width: 6, height: 6, borderRadius: '50%', background: '#a78bfa', boxShadow: '0 0 8px #a78bfa' }} />
                        <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase', color: '#a78bfa' }}>RK AI Subscription</span>
                    </motion.div>

                    <motion.h1 variants={textVariant(0.1)} style={{ fontSize: 'clamp(40px, 7vw, 88px)', fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1, marginBottom: 20 }}>
                        Choose Your{' '}
                        <span className="flowing-gradient" style={{ background: 'linear-gradient(90deg, #8b5cf6, #10b981, #f43f5e, #10b981, #8b5cf6)' }}>
                            Intelligence
                        </span>
                    </motion.h1>

                    <motion.p variants={fadeUp} style={{ fontSize: 'clamp(16px, 2vw, 20px)', color: 'rgba(255,255,255,0.4)', maxWidth: 600, margin: '0 auto 16px', lineHeight: 1.7 }}>
                        One subscription unlocks the entire RexyCore ecosystem — RK AI Desktop, RK AI Home, and everything in between.
                    </motion.p>

                    {/* Active plan indicator */}
                    {activePlanSummary && (
                        <motion.div variants={fadeUp} style={{ display: 'inline-flex', alignItems: 'center', gap: 10, marginTop: 20, padding: '10px 20px', borderRadius: 99, background: `${activePlanSummary.glowColor}15`, border: `1px solid ${activePlanSummary.glowColor}40` }}>
                            <div style={{ width: 8, height: 8, borderRadius: '50%', background: activePlanSummary.glowColor, boxShadow: `0 0 10px ${activePlanSummary.glowColor}` }} />
                            <span style={{ fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.6)' }}>
                                Current plan: <span style={{ color: activePlanSummary.glowColor, fontWeight: 900 }}>{activePlanSummary.name}</span>
                            </span>
                        </motion.div>
                    )}
                </motion.div>
            </section>

            {/* ── PRICING NOTICE ──────────────────────────────────── */}
            <div style={{ padding: '0 5% 32px', position: 'relative', zIndex: 10 }}>
                <div style={{ maxWidth: 1300, margin: '0 auto' }}>
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} style={{
                        padding: '14px 20px', borderRadius: 14, background: 'rgba(79,156,249,0.04)',
                        border: '1px solid rgba(79,156,249,0.18)', display: 'flex', alignItems: 'center', gap: 14,
                    }}>
                        <AiOutlineInfoCircle size={18} color="#60a5fa" style={{ flexShrink: 0 }} />
                        <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', margin: 0, lineHeight: 1.5 }}>
                            <span style={{ color: '#60a5fa', fontWeight: 800 }}>Price Lock Notice</span>
                            {' '}— Prices may change after public launch. Existing subscribers keep their current rate as long as their subscription stays active.
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* ── PLANS GRID ──────────────────────────────────────── */}
            <section style={{ padding: '0 5% 80px', position: 'relative', zIndex: 10, flex: 1 }}>
                <div style={{ maxWidth: 1300, margin: '0 auto' }}>
                    <motion.div
                        variants={staggerContainer(0.12, 0.15)}
                        initial="hidden"
                        animate="show"
                        style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}
                    >
                        {PLANS.map((plan, idx) => (
                            <PlanCard
                                key={plan.id}
                                plan={plan}
                                activePlanId={activePlanId}
                                trialActive={trialActive}
                                onAction={handleAction}
                                isSaving={isSaving}
                                idx={idx}
                            />
                        ))}
                    </motion.div>

                    {/* ── Compare toggle ── */}
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} style={{ textAlign: 'center', marginTop: 48 }}>
                        <button
                            onClick={() => setShowCompare(v => !v)}
                            style={{
                                background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)',
                                borderRadius: 99, padding: '12px 28px', color: 'rgba(255,255,255,0.5)',
                                fontSize: 13, fontWeight: 700, cursor: 'pointer', letterSpacing: 0.5,
                                transition: 'all 0.2s ease',
                            }}
                        >
                            {showCompare ? '▲ Hide comparison' : '▼ Compare all tiers'}
                        </button>
                    </motion.div>

                    {/* ── Full comparison table ── */}
                    <AnimatePresence>
                        {showCompare && (
                            <motion.div
                                initial={{ opacity: 0, y: 20, height: 0 }}
                                animate={{ opacity: 1, y: 0, height: 'auto' }}
                                exit={{ opacity: 0, y: 10, height: 0 }}
                                transition={{ duration: 0.4 }}
                                style={{ overflow: 'hidden', marginTop: 32 }}
                            >
                                <div style={{
                                    background: 'rgba(10,10,18,0.8)', backdropFilter: 'blur(24px)',
                                    border: '1px solid rgba(255,255,255,0.07)', borderRadius: 24,
                                    overflow: 'auto',
                                }}>
                                    <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 640 }}>
                                        <thead>
                                            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
                                                <th style={{ padding: '20px 16px', textAlign: 'left', fontSize: 11, fontWeight: 800, color: 'rgba(255,255,255,0.3)', letterSpacing: 2, textTransform: 'uppercase' }}>Feature</th>
                                                {PLANS.map(p => (
                                                    <th key={p.id} style={{ padding: '20px 16px', textAlign: 'center', fontSize: 12, fontWeight: 900, color: p.glowColor, letterSpacing: 1.5, textTransform: 'uppercase' }}>
                                                        {p.name}
                                                    </th>
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <CompRow label="Price" values={['₹0/mo', '₹599/mo', '₹1499/mo', '₹2999/mo']} />
                                            <CompRow label="Cloud Storage" values={['50 MB', '500 MB', '5 GB', '50 GB']} />
                                            <CompRow label="Local AI (Offline)" values={[true, true, true, true]} />
                                            <CompRow label="Cloud AI Access" values={[false, true, true, true]} />
                                            <CompRow label="AI Image Gen / mo" values={['—', '100', '300', '750']} />
                                            <CompRow label="AI Video Gen / mo" values={['—', '10', '50', '100']} />
                                            <CompRow label="Monthly Tokens" values={['—', '1M', '5M', '15M']} />
                                            <CompRow label="Browser Automation" values={[false, true, true, true]} />
                                            <CompRow label="Screen Understanding" values={[false, false, true, true]} />
                                            <CompRow label="Computer Control" values={[false, false, 'Limited', 'Full']} />
                                            <CompRow label="Multi-Agent Workflows" values={[false, false, false, true]} />
                                            <CompRow label="Priority Queue" values={[false, false, true, 'Highest']} />
                                            <CompRow label="Early Beta Access" values={[false, false, false, true]} />
                                            <CompRow label="Support" values={['Community', 'Community', 'Priority', 'Priority']} />
                                        </tbody>
                                    </table>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* ── Ecosystem note ── */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false, amount: 0.3 }}
                        transition={{ duration: 0.5 }}
                        style={{
                            marginTop: 48, borderRadius: 24,
                            background: 'linear-gradient(90deg, rgba(16, 185, 129, 0.05, 129, 185, rgba(16), rgba(139,92,246,0.05))',
                            border: '1px solid rgba(255,255,255,0.07)',
                            padding: '40px 36px', display: 'flex', flexWrap: 'wrap',
                            gap: 32, alignItems: 'center',
                        }}
                    >
                        <div style={{ flex: '1 1 300px' }}>
                            <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 2, color: '#10b981', textTransform: 'uppercase', marginBottom: 10 }}>One Subscription. Entire Ecosystem.</div>
                            <h3 style={{ fontSize: 'clamp(20px, 3vw, 28px)', fontWeight: 900, marginBottom: 12, letterSpacing: '-0.02em' }}>
                                Works Across All{' '}
                                <span className="flowing-gradient" style={{ background: 'linear-gradient(90deg, #10b981, #8b5cf6, #10b981)' }}>
                                    RexyCore Products
                                </span>
                            </h3>
                            <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 14, lineHeight: 1.7 }}>
                                A single Pro or Elite subscription unlocks premium features across RK AI Desktop, RK AI Home, and supported RexyCore products — no separate purchases needed.
                            </p>
                        </div>
                        <div style={{ flex: '1 1 280px', display: 'flex', flexDirection: 'column', gap: 10 }}>
                            {[
                                [<FiMonitor />, 'RK AI Desktop', 'Included'],
                                [<FiHome />, 'RK AI Home', 'Included'],
                                [<FiCloud />, 'RexyCore Cloud', 'Included'],
                                [<FiAperture />, 'MALUS', 'Standalone — separate license'],
                            ].map(([icon, name, note]) => (
                                <div key={name} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px', borderRadius: 12, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                                    <span style={{ fontSize: 18, color: '#10b981', display: 'flex' }}>{icon}</span>
                                    <div>
                                        <div style={{ fontSize: 13, fontWeight: 700, color: '#fff' }}>{name}</div>
                                        <div style={{ fontSize: 11, color: note.includes('separate') ? '#f59e0b' : '#10b981', fontWeight: 600 }}>{note}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* ── Enterprise ── */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false, amount: 0.3 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        style={{
                            marginTop: 24, textAlign: 'center', padding: '36px 32px', borderRadius: 20,
                            background: 'rgba(139,92,246,0.03)', border: '1px solid rgba(139,92,246,0.12)',
                        }}
                    >
                        <AiOutlineCrown size={24} color="#a78bfa" style={{ marginBottom: 12 }} />
                        <h3 style={{ fontSize: 16, fontWeight: 900, color: '#fff', marginBottom: 8, letterSpacing: 1 }}>ENTERPRISE</h3>
                        <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.35)', lineHeight: 1.6, maxWidth: 500, margin: '0 auto' }}>
                            Need massive scale? Custom storage, unlimited autonomous agents, and dedicated processing.{' '}
                            <Link href="/enterprise" style={{ color: '#a78bfa', fontWeight: 800, textDecoration: 'none' }}>
                                Contact the core team →
                            </Link>
                        </p>
                    </motion.div>
                </div>
            </section>

            <Footer />
            <ChatWidget />

            {/* ── Survey Modal ── */}
            <AnimatePresence>
                {showSurvey && selectedPlan && (
                    <div style={{ position: 'fixed', inset: 0, zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowSurvey(false)} style={{ position: 'absolute', inset: 0, background: 'rgba(1,1,4,0.92)', backdropFilter: 'blur(12px)' }} />
                        <motion.div initial={{ scale: 0.9, opacity: 0, y: 30 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 30 }} style={{ width: '100%', maxWidth: 440, padding: 36, position: 'relative', zIndex: 1, background: 'rgba(10,10,18,0.97)', borderRadius: 24, border: `1px solid ${selectedPlan.glowColor}44`, boxShadow: `0 0 60px ${selectedPlan.glowColor}20`, overflow: 'hidden' }}>
                            <button onClick={() => setShowSurvey(false)} style={{ position: 'absolute', top: 20, right: 20, background: 'transparent', border: 'none', color: '#555', cursor: 'pointer', zIndex: 1 }}>
                                <AiOutlineClose size={22} />
                            </button>
                            <div style={{ position: 'relative', zIndex: 1 }}>
                                <div style={{ fontSize: 10, fontWeight: 900, letterSpacing: 2, color: selectedPlan.glowColor, textTransform: 'uppercase', marginBottom: 12 }}>WAITLIST</div>
                                <h2 style={{ fontSize: 22, fontWeight: 900, color: '#fff', marginBottom: 6, textShadow: `0 0 20px ${selectedPlan.glowColor}55` }}>{selectedPlan.name}</h2>
                                <p style={{ fontSize: 12, color: '#666', marginBottom: 24 }}>Locked lifetime price: <span style={{ color: selectedPlan.glowColor, fontWeight: 800 }}>{selectedPlan.price}/mo</span></p>
                                <label style={{ display: 'block', fontSize: 10, fontWeight: 800, color: '#555', marginBottom: 10, letterSpacing: 1 }}>READY TO UPGRADE ONCE INVITED?</label>
                                <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
                                    {['Yes', 'Maybe', 'No'].map(opt => (
                                        <button key={opt} onClick={() => setSurveyData({ ...surveyData, paymentIntent: opt })} style={{ flex: 1, height: 42, borderRadius: 10, background: surveyData.paymentIntent === opt ? `${selectedPlan.glowColor}22` : 'rgba(255,255,255,0.03)', border: surveyData.paymentIntent === opt ? `1px solid ${selectedPlan.glowColor}` : '1px solid rgba(255,255,255,0.06)', color: surveyData.paymentIntent === opt ? selectedPlan.glowColor : '#555', fontSize: 12, fontWeight: 800, cursor: 'pointer' }}>{opt}</button>
                                    ))}
                                </div>
                                <label style={{ display: 'block', fontSize: 10, fontWeight: 800, color: '#555', marginBottom: 10, letterSpacing: 1 }}>WHAT FEATURE DO YOU NEED MOST?</label>
                                <textarea placeholder="e.g. PPT generation, unlimited storage..." value={surveyData.notes} onChange={e => setSurveyData({ ...surveyData, notes: e.target.value })} style={{ width: '100%', height: 90, resize: 'none', background: 'rgba(255,255,255,0.03)', border: `1px solid ${selectedPlan.glowColor}22`, borderRadius: 10, padding: 14, color: '#ccc', fontSize: 13, outline: 'none', marginBottom: 28 }} />
                                <button onClick={submitSurvey} disabled={isSaving} style={{ width: '100%', height: 52, borderRadius: 12, background: `linear-gradient(90deg, ${selectedPlan.glowColor}44, ${selectedPlan.glowColor}11, ${selectedPlan.glowColor}44)`, border: `1px solid ${selectedPlan.glowColor}55`, color: selectedPlan.glowColor, fontSize: 13, fontWeight: 900, letterSpacing: 2, cursor: 'pointer' }}>
                                    {isSaving ? 'JOINING...' : 'CONFIRM WAITLIST →'}
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            <style>{`
                @keyframes shine-flow { to { background-position: 200% center; } }
                .flowing-gradient { background-size: 200% auto; animation: shine-flow 4s linear infinite; -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; display: inline-block; }
                @keyframes pulse { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.4; transform: scale(1.3); } }
            `}</style>
        </div>
    );
}
