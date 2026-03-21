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
} from 'react-icons/ai';
import { getProfile } from '@/lib/api';

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
        tier: 0, // matching logic for current setup
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
            '2 AI Images / day',
            '1 AI Video / day',
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
        slots: '100 trials remaining',
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
        price: '₹29',
        period: '/mo',
        storageLabel: '500 MB',
        color: '#4f9cf9',
        glowColor: '#4f9cf9',
        accentColor: '#4f9cf9',
        badge: 'WAITLIST • 80% OFF',
        quote: '"The matrix rewards those who seek knowledge relentlessly."',
        storage: '500 MB',
        slots: '43 slots left',
        discount: '₹149',
        type: 'waitlist',
        features: [
            '500 MB cloud storage',
            '20 AI Images / day',
            '2 AI Videos / day',
            'Google Drive sync',
            '3-day data retention',
            'Lifetime ₹29/mo locked',
        ],
    },
    {
        id: 'pro',
        tier: 3,
        name: 'PRO OPERATIVE',
        tagline: 'Unlimited. Unstoppable.',
        price: '₹49',
        period: '/mo',
        storageLabel: '5 GB',
        color: '#9b59f5',
        glowColor: '#9b59f5',
        accentColor: '#9b59f5',
        badge: 'WAITLIST • 92% OFF',
        quote: '"I didn\'t come here to tell you how this is going to end. I came to tell you how it\'s going to begin."',
        storage: '5 GB',
        slots: '17 slots left',
        discount: '₹599',
        type: 'waitlist',
        popular: true,
        features: [
            '5 GB cloud storage',
            'Unlimited AI Images & Videos',
            '7-day data retention',
            'API access',
            'Priority support',
            'Lifetime ₹49/mo locked',
        ],
    },
];

/* ── Plan Card ──────────────────────────────────────────────────── */
function PlanCard({ plan, currentTierId, onAction, isSaving, idx }) {
    // In rexycore-website we match by id or tier number based on what getProfile returns.
    // For simplicity, assumed currentTierId effectively defaults to 'free' or 0
    const isActive = plan.id === currentTierId || plan.tier === currentTierId;
    const isTrial = plan.type === 'trial';
    const isWaitlist = plan.type === 'waitlist';

    const btnLabel = isActive
        ? 'CURRENT PLAN'
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

            {plan.slots && !isActive && (
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
                    {plan.slots}
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
    const [subLoading, setSubLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    
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
                const res = await getProfile(user.$id || user.id);
                const row = Array.isArray(res?.subscriptions) && res.subscriptions.length > 0 ? res.subscriptions[0] : null;
                setSubRow(row);
            } catch (_) {
                setSubRow(null);
            } finally {
                setSubLoading(false);
            }
        };

        if (isLoaded && isSignedIn) load();
    }, [isLoaded, isSignedIn, router, user]);

    // Use planId if exists, otherwise assume 0/'free'
    const currentTierId = subRow?.planId || 0;

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
                    source: 'rexycore_website_subscription',
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
                            Matrix Tiers
                        </h1>
                        <p style={{ fontSize: '11px', color: '#666', fontWeight: '800', letterSpacing: '2px' }}>
                            SUBSCRIPTION HUB
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
                            currentTierId={currentTierId}
                            onAction={handleAction}
                            isSaving={isSaving}
                            idx={idx}
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
