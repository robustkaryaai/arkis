'use client';

import { useState, Suspense, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { AiOutlineCheck, AiOutlineArrowLeft } from 'react-icons/ai';
import { PLANS } from '@/lib/plans';
import { useAuth } from '@/context/AuthContext';

/* ── per-plan colour palette ── */
function getPalette(id, color, accent) {
    const palettes = {
        free: { c1: '#94a3b8', c2: '#64748b', c3: '#475569', c4: '#334155' },
        pro: { c1: '#34d399', c2: '#10b981', c3: '#059669', c4: '#047857' },
        elite: { c1: '#c4b5fd', c2: '#a78bfa', c3: '#8b5cf6', c4: '#6d28d9' },
        quantum: { c1: '#fb7185', c2: '#f43f5e', c3: '#e11d48', c4: '#be123c' },
    };
    return palettes[id] || { c1: accent || color, c2: color, c3: color, c4: color };
}

function PaymentPageContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const { user } = useAuth();

    const planParam = searchParams.get('plan') || 'pro';
    const [selectedPlan] = useState(planParam);
    const activePlan = PLANS.find(p => p.id === selectedPlan) || PLANS[1];

    const [email, setEmail] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [expiry, setExpiry] = useState('');
    const [cvc, setCvc] = useState('');
    const [name, setName] = useState('');

    useEffect(() => {
        if (user) {
            if (user.email) setEmail(prev => prev || user.email);
            if (user.name) setName(prev => prev || user.name);
        }
    }, [user]);

    const [isProcessing, setIsProcessing] = useState(false);
    const [statusText, setStatusText] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);

    const slug = searchParams.get('slug');
    const redirectUri = searchParams.get('redirect_uri') || 'rk-ai://payment-success';
    const BASE = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://rk-ai-backend.onrender.com';

    const pal = getPalette(activePlan.id, activePlan.color, activePlan.accentColor);

    const handleCardNumberChange = (e) => {
        let v = e.target.value.replace(/\s/g, '').replace(/\D/g, '');
        v = v.replace(/(\d{4})(?=\d)/g, '$1 ').slice(0, 19);
        setCardNumber(v);
    };
    const handleExpiryChange = (e) => {
        let v = e.target.value.replace(/\D/g, '');
        if (v.length >= 2) v = v.slice(0, 2) + '/' + v.slice(2, 4);
        setExpiry(v);
    };

    const triggerConfetti = () => {
        const container = document.getElementById('confetti-container');
        if (!container) return;
        const colors = [activePlan.color, '#fff', pal.c1];
        for (let i = 0; i < 120; i++) {
            const el = document.createElement('div');
            el.style.cssText = `
                position:absolute; width:8px;
                height:${Math.random() > 0.5 ? '8px' : '16px'};
                background:${colors[Math.floor(Math.random() * colors.length)]};
                border-radius:${Math.random() > 0.5 ? '50%' : '2px'};
                left:${Math.random() * 100}vw; top:-20px;
                animation-delay:${Math.random() * 0.5}s;
                animation-duration:${Math.random() * 2 + 2}s;
                animation-name:fall; animation-fill-mode:forwards;
                animation-timing-function:cubic-bezier(0.25,0.46,0.45,0.94);
                opacity:${Math.random() * 0.5 + 0.5};
            `;
            container.appendChild(el);
            setTimeout(() => el.remove(), 5000);
        }
    };

    const handlePayment = async (e) => {
        e.preventDefault();
        setIsProcessing(true);
        const statuses = [
            'Initializing Neural Secure Gateway...',
            'Verifying cryptographic signature...',
            'Authorizing digital transaction...',
            `Upgrading matrix to ${activePlan.name}...`
        ];
        for (let i = 0; i < statuses.length; i++) {
            setStatusText(statuses[i]);
            await new Promise(r => setTimeout(r, i === 0 ? 600 : 900));
        }
        try {
            const res = await fetch(BASE + '/rk-ai-desktop/billing/upgrade', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'X-Device-Slug': slug || user?.$id || user?.userId || '' },
                body: JSON.stringify({ 
                    plan: selectedPlan, 
                    payment_token: 'tok_simulated_' + Date.now(), 
                    slug: user?.$id || user?.userId || slug, 
                    email: user?.email,
                    deviceSlug: slug 
                })
            });
            if (res.ok) {
                setIsSuccess(true);
                setStatusText('System Upgraded Successfully! Initializing reboot...');
                triggerConfetti();
                await new Promise(r => setTimeout(r, 2500));
                window.location.href = redirectUri;
            } else {
                setIsProcessing(false);
                setStatusText('Transaction rejected. Please verify credentials.');
            }
        } catch {
            setIsProcessing(false);
            setStatusText('Connection to gateway lost. Retrying...');
        }
    };

    /* Gradient string for static plan-tinted text */
    const textGrad = `linear-gradient(135deg, ${pal.c1} 0%, ${pal.c2} 40%, ${pal.c3} 70%, ${pal.c4} 100%)`;

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
                *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
                body {
                    font-family: 'Inter', system-ui, sans-serif;
                    background: #06060e; color: #fff; overflow-x: hidden;
                }

                /* ── Keyframes ── */
                @keyframes fall {
                    0%   { transform: translateY(0) rotate(0deg); opacity:1; }
                    100% { transform: translateY(110vh) rotate(720deg); opacity:0; }
                }
                @keyframes spinFast { to { transform: rotate(360deg); } }
                @keyframes floatUp {
                    from { transform: translateY(18px); opacity:0; }
                    to   { transform: translateY(0); opacity:1; }
                }
                @keyframes revealRow {
                    from { opacity:0; transform:translateY(8px); }
                    to   { opacity:1; transform:translateY(0); }
                }

                /* ── Fluid blob morphing ── */
                @keyframes blob1 {
                    0%   { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; transform: translate(0,0) scale(1); }
                    20%  { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; transform: translate(40px,-30px) scale(1.05); }
                    40%  { border-radius: 70% 30% 50% 50% / 30% 70% 60% 40%; transform: translate(-20px,50px) scale(0.95); }
                    60%  { border-radius: 40% 60% 30% 70% / 70% 30% 50% 50%; transform: translate(50px,20px) scale(1.08); }
                    80%  { border-radius: 50% 40% 60% 30% / 40% 60% 30% 70%; transform: translate(-30px,-20px) scale(0.98); }
                    100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; transform: translate(0,0) scale(1); }
                }
                @keyframes blob2 {
                    0%   { border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%; transform: translate(0,0) scale(1); }
                    25%  { border-radius: 70% 30% 40% 60% / 60% 40% 50% 40%; transform: translate(-40px,30px) scale(1.06); }
                    50%  { border-radius: 30% 70% 60% 40% / 50% 60% 40% 60%; transform: translate(30px,-50px) scale(0.94); }
                    75%  { border-radius: 60% 40% 30% 70% / 30% 60% 70% 40%; transform: translate(-20px,40px) scale(1.03); }
                    100% { border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%; transform: translate(0,0) scale(1); }
                }
                @keyframes blob3 {
                    0%   { border-radius: 50% 50% 60% 40% / 60% 40% 50% 50%; transform: translate(0,0) scale(1); }
                    33%  { border-radius: 30% 70% 40% 60% / 50% 60% 30% 70%; transform: translate(60px,30px) scale(1.1); }
                    66%  { border-radius: 70% 30% 60% 40% / 40% 50% 70% 30%; transform: translate(-40px,-40px) scale(0.9); }
                    100% { border-radius: 50% 50% 60% 40% / 60% 40% 50% 50%; transform: translate(0,0) scale(1); }
                }
                @keyframes blob4 {
                    0%   { border-radius: 60% 40% 50% 50% / 40% 60% 50% 50%; transform: translate(0,0) scale(1); }
                    30%  { border-radius: 40% 60% 30% 70% / 70% 30% 60% 40%; transform: translate(-50px,20px) scale(1.07); }
                    60%  { border-radius: 70% 30% 70% 30% / 30% 70% 40% 60%; transform: translate(30px,-40px) scale(0.93); }
                    100% { border-radius: 60% 40% 50% 50% / 40% 60% 50% 50%; transform: translate(0,0) scale(1); }
                }

                /* ── Layout ── */
                .page-root {
                    position: relative; min-height: 100vh; overflow-x: hidden;
                    background: #06060e;
                }

                /* Fixed fluid blobs layer */
                .fluid-bg {
                    position: fixed; inset: 0; pointer-events: none; z-index: 0; overflow: hidden;
                }
                .blob {
                    position: absolute; filter: blur(160px); opacity: 0.06;
                }
                .blob-1 {
                    width: 500px; height: 500px; background: ${pal.c2};
                    top: -180px; left: -120px;
                    animation: blob1 22s ease-in-out infinite;
                }
                .blob-2 {
                    width: 420px; height: 420px; background: ${pal.c4};
                    top: 35%; right: -160px;
                    animation: blob2 28s ease-in-out infinite;
                }
                .blob-3 {
                    width: 380px; height: 380px; background: ${pal.c1};
                    bottom: -120px; left: 25%;
                    animation: blob3 32s ease-in-out infinite;
                }
                .blob-4 {
                    width: 300px; height: 300px; background: ${pal.c3};
                    top: 15%; left: 45%;
                    animation: blob4 24s ease-in-out infinite;
                }

                /* Top-row: video left / payment right */
                .top-row {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    min-height: 100vh;
                    position: relative; z-index: 2;
                }

                /* Video column */
                .col-video {
                    display: flex; flex-direction: column;
                    justify-content: center; align-items: flex-end;
                    padding: 80px 48px 60px 60px;
                    border-right: 1px solid rgba(255,255,255,0.05);
                }

                /* Payment column */
                .col-payment {
                    display: flex; align-items: center; justify-content: center;
                    padding: 80px 60px 60px 48px;
                }

                /* Video mockup */
                .mockup-frame {
                    width: 100%; max-width: 520px; aspect-ratio: 16/10;
                    background: rgba(0,0,0,0.6);
                    border: 1px solid rgba(255,255,255,0.08);
                    border-radius: 16px;
                    box-shadow: 0 30px 60px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.04), 0 0 60px ${pal.c3}25;
                    display: flex; align-items: center; justify-content: center;
                    overflow: hidden; position: relative;
                }
                .mockup-frame::before {
                    content: ''; position: absolute; inset: 0;
                    background: radial-gradient(circle at 40% 40%, ${pal.c3}18, transparent 65%);
                }

                /* Glass card */
                .glass-card {
                    width: 100%; max-width: 440px;
                    background: rgba(12, 12, 20, 0.6);
                    border: 1px solid rgba(255,255,255,0.07);
                    border-top: 1px solid rgba(255,255,255,0.13);
                    border-radius: 28px; padding: 44px 40px;
                    backdrop-filter: blur(50px); -webkit-backdrop-filter: blur(50px);
                    box-shadow:
                        0 40px 80px rgba(0,0,0,0.7),
                        inset 0 1px 0 rgba(255,255,255,0.1),
                        0 0 60px ${pal.c3}18;
                    position: relative; z-index: 10;
                    animation: floatUp 0.9s cubic-bezier(0.16,1,0.3,1) forwards;
                }

                /* Static plan-tinted gradient text */
                .plan-gradient-text {
                    background: ${textGrad};
                    background-size: 200% 200%;
                    animation: flowGrad 6s ease infinite;
                    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
                    background-clip: text;
                }
                @keyframes flowGrad {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }

                /* Inputs */
                .input-wrapper { position: relative; margin-bottom: 22px; }
                .floating-label {
                    position: absolute; left: 16px; top: 18px;
                    font-size: 14px; color: rgba(255,255,255,0.35);
                    pointer-events: none;
                    transition: all 0.2s cubic-bezier(0.25,1,0.5,1);
                }
                .premium-input {
                    width: 100%; background: rgba(0,0,0,0.4);
                    border: 1px solid rgba(255,255,255,0.08); border-radius: 12px;
                    padding: 24px 16px 10px 16px; font-size: 15px; color: #fff;
                    font-weight: 500; font-family: 'Inter', system-ui, sans-serif;
                    transition: border-color 0.25s ease, box-shadow 0.25s ease, background 0.25s ease;
                    box-shadow: inset 0 2px 6px rgba(0,0,0,0.3);
                    outline: none; -webkit-appearance: none;
                }
                .premium-input:focus, .premium-input.has-val { border-color: ${pal.c3}99; }
                .premium-input:focus {
                    background: rgba(255,255,255,0.02);
                    box-shadow: 0 0 0 2px ${pal.c3}40, inset 0 2px 6px rgba(0,0,0,0.3);
                }
                .premium-input:focus + .floating-label,
                .premium-input.has-val + .floating-label {
                    top: 7px; font-size: 10px; color: ${pal.c2}; font-weight: 700; letter-spacing: 0.6px;
                }
                .premium-input::placeholder { color: transparent; }

                /* ── Bottom feature row ── */
                .features-row {
                    position: relative; z-index: 2;
                    border-top: 1px solid rgba(255,255,255,0.05);
                    padding: 60px;
                    display: grid;
                    grid-template-columns: 1fr 1fr 1fr;
                    gap: 48px;
                }

                .feat-col-head {
                    font-size: 10px; font-weight: 900; letter-spacing: 2.5px;
                    text-transform: uppercase; margin-bottom: 20px;
                    padding-bottom: 10px;
                    border-bottom: 1px solid ${pal.c3}30;
                }
                .feature-item {
                    display: flex; align-items: flex-start; gap: 10px;
                    margin-bottom: 12px; opacity: 0;
                    animation: revealRow 0.35s ease forwards;
                }

                @media (max-width: 900px) {
                    .top-row { grid-template-columns: 1fr; }
                    .col-video { display: none; }
                    .col-payment { min-height: 100vh; padding: 40px 20px; }
                    .glass-card { padding: 32px 20px; max-width: 100%; }
                    .features-row { grid-template-columns: 1fr; padding: 40px 24px; }
                }
            `}</style>

            <div id="confetti-container" style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 9999 }} />

            {/* ── Fluid blob background ── */}
            <div className="fluid-bg">
                <div className="blob blob-1" />
                <div className="blob blob-2" />
                <div className="blob blob-3" />
                <div className="blob blob-4" />
            </div>

            <div className="page-root">

                {/* ══ TOP ROW: video | payment ══ */}
                <div className="top-row">

                    {/* Video column */}
                    <div className="col-video">
                        <button
                            onClick={() => router.back()}
                            style={{
                                position: 'absolute', top: '40px', left: '40px',
                                background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.09)',
                                borderRadius: '50%', width: '44px', height: '44px',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                cursor: 'pointer', color: '#fff', zIndex: 10,
                                backdropFilter: 'blur(10px)', transition: 'all 0.2s ease'
                            }}
                            onMouseOver={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.09)'; e.currentTarget.style.transform = 'scale(1.06)'; }}
                            onMouseOut={e  => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.transform = 'scale(1)'; }}
                        >
                            <AiOutlineArrowLeft size={18} />
                        </button>

                        <div style={{ width: '100%', maxWidth: '520px' }}>
                            {/* Upgrading badge */}
                            <div style={{
                                display: 'inline-flex', alignItems: 'center', gap: '8px',
                                padding: '4px 12px', borderRadius: '100px',
                                border: `1px solid ${pal.c3}44`, marginBottom: '20px',
                            }}>
                                <span style={{
                                    width: '6px', height: '6px', borderRadius: '50%',
                                    background: pal.c2, display: 'inline-block'
                                }} />
                                <span style={{ color: pal.c2, fontSize: '10px', fontWeight: '800', letterSpacing: '1.5px' }}>
                                    UPGRADING TO
                                </span>
                            </div>

                            {/* Plan name — static gradient */}
                            <h1 style={{
                                fontSize: '54px', fontWeight: '900', letterSpacing: '-1.5px',
                                lineHeight: 1.05, marginBottom: '14px',
                            }} className="plan-gradient-text">
                                {activePlan.name} Tier
                            </h1>

                            <p style={{
                                color: 'rgba(255,255,255,0.4)', fontSize: '14px',
                                lineHeight: 1.7, marginBottom: '36px', maxWidth: '400px',
                                fontStyle: 'italic'
                            }}>
                                {activePlan.quote}
                            </p>

                            {/* Video mockup */}
                            <div className="mockup-frame">
                                <div style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
                                    <div style={{
                                        width: '60px', height: '60px', borderRadius: '50%',
                                        background: `${pal.c3}22`, border: `1px solid ${pal.c3}55`,
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        margin: '0 auto 14px auto', cursor: 'pointer',
                                        transition: 'all 0.2s ease', boxShadow: `0 0 30px ${pal.c3}33`
                                    }}
                                        onMouseOver={e => { e.currentTarget.style.background = `${pal.c3}40`; e.currentTarget.style.transform = 'scale(1.1)'; }}
                                        onMouseOut={e  => { e.currentTarget.style.background = `${pal.c3}22`; e.currentTarget.style.transform = 'scale(1)'; }}
                                    >
                                        <svg width="22" height="22" viewBox="0 0 24 24" fill={pal.c2} style={{ marginLeft: '4px' }}>
                                            <polygon points="5 3 19 12 5 21 5 3" />
                                        </svg>
                                    </div>
                                    <div style={{ color: 'rgba(255,255,255,0.25)', fontSize: '11px', fontWeight: '700', letterSpacing: '2.5px' }}>
                                        DEMO VIDEO
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Payment column */}
                    <div className="col-payment">
                        <div className="glass-card">
                            <div style={{ marginBottom: '36px', textAlign: 'center' }}>
                                <h2 style={{ fontSize: '22px', fontWeight: '800', marginBottom: '6px' }}
                                    className="plan-gradient-text">
                                    Secure Checkout
                                </h2>
                                <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '12px', fontWeight: '600', letterSpacing: '0.4px' }}>
                                    Encrypted via Neural Payment Gateway
                                </p>
                            </div>

                            {/* Order summary */}
                            <div style={{
                                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                                padding: '18px', borderRadius: '14px',
                                background: `${pal.c4}18`, border: `1px solid ${pal.c3}30`,
                                marginBottom: '30px', boxShadow: `inset 0 0 20px ${pal.c4}10`
                            }}>
                                <div>
                                    <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.4)', fontWeight: '700', letterSpacing: '1px', marginBottom: '3px' }}>
                                        SUBSCRIPTION
                                    </div>
                                    <div style={{ fontSize: '17px', fontWeight: '800', color: pal.c1 }}>{activePlan.name}</div>
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    <div style={{ fontSize: '22px', fontWeight: '900', color: '#fff' }}>{activePlan.price}</div>
                                    <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', fontWeight: '500' }}>per month</div>
                                </div>
                            </div>

                            <form onSubmit={handlePayment}>
                                <div className="input-wrapper">
                                    <input type="text" className={`premium-input ${name ? 'has-val' : ''}`}
                                        value={name} onChange={e => setName(e.target.value)}
                                        disabled={isProcessing} required />
                                    <label className="floating-label">Cardholder Name</label>
                                </div>
                                <div className="input-wrapper">
                                    <input type="email" className={`premium-input ${email ? 'has-val' : ''}`}
                                        value={email} onChange={e => setEmail(e.target.value)}
                                        disabled={isProcessing} required />
                                    <label className="floating-label">Email Address</label>
                                </div>
                                <div className="input-wrapper">
                                    <input type="text" className={`premium-input ${cardNumber ? 'has-val' : ''}`}
                                        value={cardNumber} onChange={handleCardNumberChange}
                                        maxLength={19} disabled={isProcessing} required />
                                    <label className="floating-label">Card Number</label>
                                </div>
                                <div style={{ display: 'flex', gap: '14px' }}>
                                    <div className="input-wrapper" style={{ flex: 1 }}>
                                        <input type="text" className={`premium-input ${expiry ? 'has-val' : ''}`}
                                            value={expiry} onChange={handleExpiryChange}
                                            maxLength={5} disabled={isProcessing} required />
                                        <label className="floating-label">MM/YY</label>
                                    </div>
                                    <div className="input-wrapper" style={{ flex: 1 }}>
                                        <input type="text" className={`premium-input ${cvc ? 'has-val' : ''}`}
                                            value={cvc} onChange={e => setCvc(e.target.value.replace(/\D/g, '').slice(0, 4))}
                                            maxLength={4} disabled={isProcessing} required />
                                        <label className="floating-label">CVC</label>
                                    </div>
                                </div>

                                <button type="submit" disabled={isProcessing}
                                    style={{
                                        width: '100%', height: '58px', borderRadius: '16px', outline: 'none',
                                        background: isSuccess
                                            ? '#10b981'
                                            : `linear-gradient(135deg, ${pal.c1}, ${pal.c3}, ${pal.c4})`,
                                        border: 'none', color: '#fff', fontSize: '15px', fontWeight: '800',
                                        letterSpacing: '1.5px', marginTop: '8px',
                                        cursor: isProcessing ? 'default' : 'pointer',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px',
                                        boxShadow: isProcessing ? 'none' : `0 14px 32px ${pal.c3}44`,
                                        transition: 'all 0.3s cubic-bezier(0.16,1,0.3,1)',
                                        fontFamily: 'Inter, system-ui, sans-serif',
                                    }}
                                    onMouseOver={e => { if (!isProcessing) { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = `0 20px 40px ${pal.c3}55`; } }}
                                    onMouseOut={e  => { if (!isProcessing) { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = `0 14px 32px ${pal.c3}44`; } }}
                                >
                                    {isProcessing ? (
                                        <>
                                            <div style={{
                                                width: '18px', height: '18px', borderRadius: '50%',
                                                border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff',
                                                animation: 'spinFast 0.8s linear infinite', flexShrink: 0
                                            }} />
                                            <span>PROCESSING...</span>
                                        </>
                                    ) : isSuccess ? (
                                        <>
                                            <AiOutlineCheck size={22} />
                                            <span>PAYMENT SUCCESSFUL</span>
                                        </>
                                    ) : (
                                        `PAY ${activePlan.price}`
                                    )}
                                </button>

                                {statusText && (
                                    <div style={{
                                        textAlign: 'center', marginTop: '18px', fontSize: '12px',
                                        color: isSuccess ? '#10b981' : 'rgba(255,255,255,0.4)',
                                        animation: 'floatUp 0.3s ease', lineHeight: 1.5
                                    }}>
                                        {statusText}
                                    </div>
                                )}
                            </form>

                            <div style={{
                                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                                marginTop: '28px', color: 'rgba(255,255,255,0.22)', fontSize: '11px', fontWeight: '600'
                            }}>
                                <AiOutlineCheck size={11} color="#10b981" />
                                256-bit AES Encryption
                            </div>
                        </div>
                    </div>
                </div>

                {/* ══ BOTTOM: Feature list spanning full width ══ */}
                <div className="features-row">

                    {/* Desktop features */}
                    <div>
                        <div className="feat-col-head plan-gradient-text">RK AI Desktop</div>
                        {(activePlan.desktopFeatures || []).map((f, i) => (
                            <div key={i} className="feature-item" style={{ animationDelay: `${i * 35}ms` }}>
                                <div style={{
                                    width: '18px', height: '18px', borderRadius: '50%', flexShrink: 0,
                                    background: `${pal.c3}20`, border: `1px solid ${pal.c3}50`,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '1px'
                                }}>
                                    <AiOutlineCheck size={9} color={pal.c2} />
                                </div>
                                <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.75)', fontWeight: '500', lineHeight: 1.45 }}>{f}</span>
                            </div>
                        ))}
                    </div>

                    {/* Home features */}
                    <div>
                        <div className="feat-col-head plan-gradient-text">RK AI Home</div>
                        {(activePlan.homeFeatures || []).map((f, i) => (
                            <div key={i} className="feature-item" style={{ animationDelay: `${i * 35}ms` }}>
                                <div style={{
                                    width: '18px', height: '18px', borderRadius: '50%', flexShrink: 0,
                                    background: `${pal.c2}20`, border: `1px solid ${pal.c2}50`,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '1px'
                                }}>
                                    <AiOutlineCheck size={9} color={pal.c1} />
                                </div>
                                <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.75)', fontWeight: '500', lineHeight: 1.45 }}>{f}</span>
                            </div>
                        ))}
                    </div>

                    {/* Cloud & Limits */}
                    <div>
                        <div className="feat-col-head plan-gradient-text">Cloud & Limits</div>
                        {(activePlan.sharedFeatures || []).map((f, i) => (
                            <div key={i} className="feature-item" style={{ animationDelay: `${i * 35}ms` }}>
                                <div style={{
                                    width: '18px', height: '18px', borderRadius: '50%', flexShrink: 0,
                                    background: `${pal.c4}25`, border: `1px solid ${pal.c4}55`,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '1px'
                                }}>
                                    <AiOutlineCheck size={9} color={pal.c3} />
                                </div>
                                <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.75)', fontWeight: '500', lineHeight: 1.45 }}>{f}</span>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </>
    );
}

export default function PaymentPage() {
    return (
        <Suspense fallback={
            <div style={{
                minHeight: '100vh', background: '#06060e',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
                <div style={{
                    width: '28px', height: '28px', borderRadius: '50%',
                    border: '2px solid rgba(255,255,255,0.1)', borderTopColor: '#fff',
                    animation: 'spinFast 0.8s linear infinite'
                }} />
                <style>{`@keyframes spinFast { to { transform: rotate(360deg); } }`}</style>
            </div>
        }>
            <PaymentPageContent />
        </Suspense>
    );
}
