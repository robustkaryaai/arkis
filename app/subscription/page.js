'use client';

import { useEffect, useState, useRef } from 'react';
import Navbar from '@/components/Navbar';
import ChatWidget from '@/components/ChatWidget';
import Footer from '@/components/Footer';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
    AiOutlineCheck,
    AiOutlineThunderbolt,
    AiOutlineArrowLeft,
    AiOutlineClose,
    AiOutlineClockCircle,
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

/* ── Plan data ──────────────────────────────────────────────────── */
const PLANS = [
    {
        id: 'free',
        tier: 0,
        name: 'FREE AGENT',
        tagline: 'Enter the matrix.',
        price: '₹0',
        period: '/mo',
        storageLabel: '50 MB',
        color: '#888',
        glowColor: '#888888',
        accentColor: '#aaaaaa',
        badge: null,
        quote: '"Every expert was once a beginner in the matrix."',
        storage: '50 MB',
        slots: null,
        discount: null,
        type: 'active',
        features: [
            'Voice chat + wake word',
            '1 AI Video / week (5 sec)',
            '24h data retention',
            'Basic matrix commands',
        ],
    },
    {
        id: 'trial',
        tier: 'trial',
        name: '7-DAY TRIAL',
        tagline: 'Full access. Zero cost.',
        price: '₹0',
        period: '/ 7 days',
        storageLabel: '500 MB',
        color: '#00ff9d',
        glowColor: '#00ff9d',
        accentColor: '#00ff9d',
        badge: 'LIMITED',
        quote: '"Take the green pill. See how deep the matrix goes."',
        storage: '500 MB',
        slots: null,
        discount: null,
        type: 'trial',
        features: [
            'Everything in FREE',
            'Unlimited AI Images (7d)',
            '10 AI Videos / day',
            '500 MB cloud storage',
            'Priority matrix processing',
            'No credit card required',
        ],
    },
    {
        id: 'student',
        tier: 1,
        name: 'STUDENT NODE',
        tagline: 'Learn. Build. Dominate.',
        price: '₹151',
        period: '/mo',
        storageLabel: '500 MB',
        color: '#4f9cf9',
        glowColor: '#4f9cf9',
        accentColor: '#4f9cf9',
        badge: 'WAITLIST • 40% OFF',
        quote: '"The matrix rewards those who seek knowledge relentlessly."',
        storage: '500 MB',
        slots: null,
        discount: '₹249',
        type: 'waitlist',
        features: [
            'Everything in FREE tier',
            '2 AI Videos / week (5 sec)',
            '36h data retention',
            'Homework AI Buddy Mode',
            'Drive Integration enabled',
            'Lifetime ₹151/mo locked',
        ],
    },
    {
        id: 'creator',
        tier: 2,
        name: 'CREATOR PROTOCOL',
        tagline: 'Create. Inspire. Expand.',
        price: '₹451',
        period: '/mo',
        storageLabel: '2 GB',
        color: '#ff8500',
        glowColor: '#ff8500',
        accentColor: '#ff8500',
        badge: 'WAITLIST • 25% OFF',
        quote: '"Imagination is the only weapon in the war against reality."',
        storage: '2 GB',
        slots: null,
        discount: '₹599',
        type: 'waitlist',
        features: [
            'Everything in STUDENT tier',
            '3 AI Videos / week (10 sec)',
            '5 days data retention',
            'Video Model: LTX-2 Fast',
            'Viral Thumbnail Generator',
            '2 GB Cloud Storage',
            'Lifetime ₹451/mo locked',
        ],
    },
    {
        id: 'pro',
        tier: 3,
        name: 'PRO OPERATIVE',
        tagline: 'Unlimited. Unstoppable.',
        price: '₹951',
        period: '/mo',
        storageLabel: '5 GB',
        color: '#9b59f5',
        glowColor: '#9b59f5',
        accentColor: '#9b59f5',
        badge: 'WAITLIST • 27% OFF',
        quote: '"I didn\'t come here to tell you how this is going to end. I came to tell you how it\'s going to begin."',
        storage: '5 GB',
        slots: null,
        discount: '₹1299',
        type: 'waitlist',
        popular: true,
        features: [
            'Everything in CREATOR tier',
            '3 AI Videos / week (2K Pro)',
            '7 days data retention',
            'Custom Voice training (rk-voice)',
            'Access to personlized files',
            '5 GB Cloud Storage',
            'Lifetime ₹951/mo locked',
        ],
    },
    {
        id: 'studio',
        tier: 4,
        name: 'STUDIO MATRIX',
        tagline: 'The Ultimate AI Arsenal.',
        price: '₹1601',
        period: '/mo',
        storageLabel: '10 GB',
        color: '#e8305f',
        glowColor: '#e8305f',
        accentColor: '#e8305f',
        badge: 'WAITLIST • 25% OFF',
        quote: '"We are the architects of our own reality."',
        storage: '10 GB',
        slots: null,
        discount: '₹2199',
        type: 'waitlist',
        features: [
            'Everything in PRO tier',
            '3 AI Videos / week (4K Pro)',
            '2 weeks data retention',
            'Multi-Character Scene Generation',
            'Best Model Tier (4K+)',
            '10 GB Cloud Storage',
            'Lifetime ₹1601/mo locked',
        ],
    },
];

const TIER_INDEX_TO_PLAN = { 0: 'free', 1: 'student', 2: 'creator', 3: 'pro', 4: 'studio' };

function normalizeActivePlanId(subRow) {
    if (!subRow) return 'free';
    const raw = subRow.planId ?? subRow.plan ?? subRow.tier ?? subRow.packageId;
    if (raw == null || raw === '') return 'free';
    if (typeof raw === 'string') {
        const k = raw.toLowerCase().replace(/\s/g, '');
        if (['free', 'student', 'creator', 'pro', 'studio', 'trial'].includes(k)) return k;
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
        : isSaving ? 'JOINING...' : `JOIN WAITLIST →`;

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.08, type: 'spring', stiffness: 120 }}
            style={{
                position: 'relative',
                borderRadius: '20px',
                overflow: 'hidden',
                border: isActive
                    ? `2px solid ${plan.glowColor}`
                    : plan.popular
                    ? `1px solid ${plan.glowColor}88`
                    : '1px solid rgba(255,255,255,0.07)',
                background: isActive
                    ? `linear-gradient(145deg, ${plan.glowColor}12, rgba(0,0,0,0) 60%)`
                    : 'rgba(8,12,30,0.85)',
                boxShadow: isActive
                    ? `0 0 40px ${plan.glowColor}30, inset 0 0 60px ${plan.glowColor}08`
                    : plan.popular
                    ? `0 0 25px ${plan.glowColor}18`
                    : 'none',
                padding: '28px 24px',
            }}
        >
            <MatrixRain color={plan.glowColor} opacity={isActive ? 0.05 : 0.03} />

            {plan.popular && (
                <div style={{
                    position: 'absolute', top: 0, left: 0, right: 0, height: '3px',
                    background: `linear-gradient(90deg, transparent, ${plan.glowColor}, transparent)`,
                }} />
            )}

            {isActive && (
                <div style={{
                    position: 'absolute', top: '14px', right: '-28px',
                    background: plan.glowColor, color: '#000',
                    fontSize: '9px', fontWeight: '900', padding: '4px 36px',
                    transform: 'rotate(45deg)', letterSpacing: '2px',
                }}>
                    ACTIVE
                </div>
            )}

            {slotsText && !isActive && (
                <div style={{
                    position: 'absolute', top: '16px', right: '16px',
                    fontSize: '9px', fontWeight: '900', letterSpacing: '1px',
                    color: plan.glowColor, display: 'flex', alignItems: 'center', gap: '5px',
                }}>
                    <span style={{
                        display: 'inline-block', width: '6px', height: '6px',
                        borderRadius: '50%', background: plan.glowColor,
                        animation: 'pulse 1.5s infinite',
                    }} />
                    {slotsText}
                </div>
            )}

            <div style={{ marginBottom: '18px', position: 'relative', zIndex: 1 }}>
                {plan.badge && (
                    <div style={{ marginBottom: '10px' }}>
                        <GlitchBadge color={plan.glowColor}>{plan.badge}</GlitchBadge>
                    </div>
                )}
                <h2 style={{
                    fontSize: '19px', fontWeight: '900', color: '#fff',
                    letterSpacing: '1px', marginBottom: '4px',
                    textShadow: `0 0 20px ${plan.glowColor}66`,
                }}>
                    {plan.name}
                </h2>
                <p style={{ fontSize: '11px', color: plan.glowColor, fontWeight: '700', letterSpacing: '0.5px' }}>
                    {plan.tagline}
                </p>
            </div>

            <div style={{
                display: 'flex', alignItems: 'flex-end', gap: '8px',
                marginBottom: '6px', position: 'relative', zIndex: 1,
            }}>
                {plan.discount && (
                    <span style={{
                        fontSize: '13px', color: '#ef4444', fontWeight: '800',
                        textDecoration: 'line-through', marginBottom: '6px',
                    }}>
                        {plan.discount}
                    </span>
                )}
                <span style={{
                    fontSize: '36px', fontWeight: '900', color: plan.glowColor,
                    lineHeight: 1, textShadow: `0 0 30px ${plan.glowColor}88`,
                }}>
                    {plan.price}
                </span>
                <span style={{ fontSize: '11px', color: '#666', fontWeight: '700', marginBottom: '6px' }}>
                    {plan.period}
                </span>
            </div>

            <div style={{
                display: 'inline-flex', alignItems: 'center', gap: '6px',
                fontSize: '11px', color: '#555', fontWeight: '700',
                marginBottom: '20px', position: 'relative', zIndex: 1,
            }}>
                <AiOutlineDatabase size={12} />
                {plan.storageLabel} storage
            </div>

            <div style={{
                padding: '12px 14px', marginBottom: '20px',
                borderLeft: `2px solid ${plan.glowColor}55`,
                background: `${plan.glowColor}08`, borderRadius: '0 8px 8px 0',
                position: 'relative', zIndex: 1,
            }}>
                <p style={{ fontSize: '11px', color: '#888', fontStyle: 'italic', lineHeight: '1.5', letterSpacing: '0.3px' }}>
                    {plan.quote}
                </p>
            </div>

            <div style={{
                display: 'flex', flexDirection: 'column', gap: '10px',
                marginBottom: '24px', position: 'relative', zIndex: 1,
            }}>
                {plan.features.map((f, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <AiOutlineCheck size={14} color={plan.glowColor} style={{ flexShrink: 0 }} />
                        <span style={{ fontSize: '12px', color: '#ccc', fontWeight: '500' }}>{f}</span>
                    </div>
                ))}
            </div>

            <button
                onClick={() => !isActive && onAction(plan)}
                disabled={isActive || isSaving}
                style={{
                    width: '100%', height: '50px', borderRadius: '12px',
                    border: isActive ? '1px solid rgba(255,255,255,0.1)' : `1px solid ${plan.glowColor}66`,
                    background: isActive
                        ? 'rgba(255,255,255,0.03)'
                        : `linear-gradient(135deg, ${plan.glowColor}22, ${plan.glowColor}11)`,
                    color: isActive ? '#555' : plan.glowColor,
                    fontSize: '12px', fontWeight: '900', letterSpacing: '2px',
                    cursor: isActive ? 'default' : 'pointer',
                    position: 'relative', zIndex: 1,
                    transition: 'all 0.2s ease',
                    boxShadow: isActive ? 'none' : `0 0 20px ${plan.glowColor}22`,
                    textTransform: 'uppercase',
                }}
            >
                {btnLabel}
            </button>
            {isWaitlist && !isActive && (
                <p style={{ textAlign: 'center', fontSize: '10px', color: '#444', marginTop: '10px', position: 'relative', zIndex: 1 }}>
                    🔒 Locked pricing — never goes up
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
                const row = Array.isArray(res?.subscriptions) && res.subscriptions.length > 0 ? res.subscriptions[0] : null;
                setSubRow(row);
                setLinkedTrials(Array.isArray(res?.trials) ? res.trials : []);
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
        setSelectedPlan(plan);
        setShowSurvey(true);
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
            
            <div style={{ padding: '120px 20px 80px', maxWidth: '1100px', margin: '0 auto' }}>
                
                {/* ── Header ── */}
                <header style={{ marginBottom: '40px', display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={() => router.back()}
                        style={{
                            background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)',
                            borderRadius: '14px', width: '48px', height: '48px',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            cursor: 'pointer', color: '#4f9cf9', flexShrink: 0,
                        }}
                    >
                        <AiOutlineArrowLeft size={20} />
                    </motion.button>
                    <div>
                        <h1 style={{
                            fontSize: '32px', fontWeight: '900', color: '#fff',
                            letterSpacing: '2px', marginBottom: '4px',
                            textShadow: '0 0 30px #4f9cf988', textTransform: 'uppercase'
                        }}>
                            REXYCORE CLOUD
                        </h1>
                        <p style={{ fontSize: '11px', color: '#666', fontWeight: '800', letterSpacing: '2px' }}>
                            MATRIX TIERS · PRICING & ACCESS
                        </p>
                    </div>
                </header>

                {/* ── Account + device slug (RK Home app) ── */}
                <motion.section
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{
                        marginBottom: '28px',
                        padding: '20px 22px',
                        borderRadius: '18px',
                        border: '1px solid rgba(255,255,255,0.08)',
                        background: 'rgba(79,156,249,0.06)',
                        display: 'grid',
                        gap: '14px',
                    }}
                >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <AiOutlineUser size={22} color="#4f9cf9" />
                        <div>
                            <div style={{ fontSize: '11px', fontWeight: '800', color: '#666', letterSpacing: '1px' }}>SIGNED IN</div>
                            <div style={{ fontSize: '15px', fontWeight: '700', color: '#fff' }}>{user.email || user.name || user.$id}</div>
                        </div>
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center' }}>
                        <Link
                            href="/profile"
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '8px',
                                padding: '10px 18px',
                                borderRadius: '12px',
                                background: 'rgba(255,255,255,0.06)',
                                border: '1px solid rgba(255,255,255,0.1)',
                                color: '#4f9cf9',
                                fontWeight: '800',
                                fontSize: '13px',
                                textDecoration: 'none',
                            }}
                        >
                            <AiOutlineLink size={16} />
                            Account & orders
                        </Link>
                    </div>
                    <p style={{ margin: 0, fontSize: '12px', color: '#888', lineHeight: 1.55 }}>
                        RK AI Home uses your <strong style={{ color: '#fff' }}>device slug</strong> (9 digits) from the mobile app after you connect the Pi. Open{' '}
                        <strong style={{ color: '#fff' }}>RK Home → Connect</strong> to link; billing and limits follow that device.
                    </p>
                    {linkedTrials[0]?.deviceSlug && (
                        <p style={{ margin: 0, fontSize: '12px', color: '#aaa' }}>
                            Linked slug from trial:{' '}
                            <code style={{ color: '#00ff9d', fontWeight: '700' }}>{linkedTrials[0].deviceSlug}</code>
                        </p>
                    )}
                </motion.section>

                {/* ── Active tier summary ── */}
                {activePlanSummary && (
                    <motion.section
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.05 }}
                        style={{
                            marginBottom: '28px',
                            padding: '22px 24px',
                            borderRadius: '18px',
                            border: `1px solid ${activePlanSummary.glowColor}44`,
                            background: `linear-gradient(145deg, ${activePlanSummary.glowColor}14, rgba(0,0,0,0) 55%)`,
                        }}
                    >
                        <div style={{ fontSize: '10px', fontWeight: '900', letterSpacing: '2px', color: activePlanSummary.glowColor, marginBottom: '8px' }}>
                            YOUR ACTIVE TIER
                        </div>
                        <h2 style={{ margin: '0 0 6px', fontSize: '22px', fontWeight: '900', color: '#fff' }}>{activePlanSummary.name}</h2>
                        <p style={{ margin: '0 0 16px', fontSize: '12px', color: '#999' }}>{activePlanSummary.tagline}</p>
                        <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            {activePlanSummary.features.map((f, i) => (
                                <li key={i} style={{ display: 'flex', gap: '10px', fontSize: '13px', color: '#ccc' }}>
                                    <AiOutlineCheck size={16} color={activePlanSummary.glowColor} style={{ flexShrink: 0, marginTop: 2 }} />
                                    {f}
                                </li>
                            ))}
                        </ul>
                    </motion.section>
                )}

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
                    <AiOutlineClockCircle size={20} color="#4f9cf9" style={{ flexShrink: 0 }} />
                    <p style={{ fontSize: '13px', color: '#999', lineHeight: '1.5' }}>
                        <span style={{ color: '#4f9cf9', fontWeight: '800' }}>Early-Access Pricing</span>
                        {' '}— Waitlist spots are strictly limited. Lock in your discounted rate forever before the public launch.
                    </p>
                </motion.div>

                {/* ── Plans Grid ── */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px' }}>
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
            `}</style>
        </div>
    );
}
