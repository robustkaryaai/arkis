'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { AiOutlineCheck, AiOutlineArrowLeft } from 'react-icons/ai';
import { PLANS } from '@/lib/plans';

function PaymentPageContent() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const planParam = searchParams.get('plan') || 'pro';
    const [selectedPlan] = useState(planParam);
    const activePlan = PLANS.find(p => p.id === selectedPlan) || PLANS[1];

    const [email, setEmail] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [expiry, setExpiry] = useState('');
    const [cvc, setCvc] = useState('');
    const [name, setName] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [statusText, setStatusText] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);

    const slug = searchParams.get('slug');
    const redirectUri = searchParams.get('redirect_uri') || 'rk-ai://payment-success';
    const BASE = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://rk-ai-backend.onrender.com';

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
        const colors = [activePlan.color, '#fff', '#000'];
        for (let i = 0; i < 120; i++) {
            const el = document.createElement('div');
            el.style.cssText = `
                position: absolute;
                width: 8px;
                height: ${Math.random() > 0.5 ? '8px' : '16px'};
                background: ${colors[Math.floor(Math.random() * colors.length)]};
                border-radius: ${Math.random() > 0.5 ? '50%' : '2px'};
                left: ${Math.random() * 100}vw;
                top: -20px;
                animation-delay: ${Math.random() * 0.5}s;
                animation-duration: ${Math.random() * 2 + 2}s;
                animation-name: fall;
                animation-fill-mode: forwards;
                animation-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94);
                opacity: ${Math.random() * 0.5 + 0.5};
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
                headers: { 'Content-Type': 'application/json', 'X-Device-Slug': slug },
                body: JSON.stringify({ plan: selectedPlan, payment_token: 'tok_simulated_' + Date.now(), slug })
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

    const c      = activePlan.color;
    const a1     = activePlan.accentColor || c;
    const aurora2 = activePlan.id === 'pro'     ? '#6366f1'
                  : activePlan.id === 'elite'   ? '#f43f5e'
                  : activePlan.id === 'quantum'  ? '#8b5cf6'
                  :                               '#10b981';
    const aurora3 = activePlan.id === 'pro'     ? '#f59e0b'
                  : activePlan.id === 'elite'   ? '#06b6d4'
                  : activePlan.id === 'quantum'  ? '#f59e0b'
                  :                               '#3b82f6';

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
                *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
                body { font-family: 'Inter', system-ui, sans-serif; background: #06060e; color: #fff; overflow-x: hidden; }

                @keyframes fall {
                    0%   { transform: translateY(0) rotate(0deg); opacity: 1; }
                    100% { transform: translateY(110vh) rotate(720deg); opacity: 0; }
                }
                @keyframes spinFast { to { transform: rotate(360deg); } }
                @keyframes floatUp {
                    from { transform: translateY(20px); opacity: 0; }
                    to   { transform: translateY(0); opacity: 1; }
                }
                @keyframes auroraShift {
                    0%   { background-position: 0% 50%; }
                    50%  { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
                @keyframes orbDrift1 {
                    0%   { transform: translate(0,0) scale(1); }
                    33%  { transform: translate(60px,-40px) scale(1.1); }
                    66%  { transform: translate(-30px,50px) scale(0.95); }
                    100% { transform: translate(0,0) scale(1); }
                }
                @keyframes orbDrift2 {
                    0%   { transform: translate(0,0) scale(1); }
                    33%  { transform: translate(-50px,30px) scale(1.08); }
                    66%  { transform: translate(40px,-40px) scale(0.92); }
                    100% { transform: translate(0,0) scale(1); }
                }
                @keyframes orbDrift3 {
                    0%   { transform: translate(0,0) scale(1); }
                    50%  { transform: translate(30px,60px) scale(1.12); }
                    100% { transform: translate(0,0) scale(1); }
                }
                @keyframes textShimmer {
                    0%   { background-position: -200% center; }
                    100% { background-position:  200% center; }
                }
                @keyframes revealRow {
                    from { opacity: 0; transform: translateX(12px); }
                    to   { opacity: 1; transform: translateX(0); }
                }
                @keyframes pulseDot {
                    0%, 100% { box-shadow: 0 0 0 0 ${c}66; }
                    50%       { box-shadow: 0 0 0 5px transparent; }
                }

                .tri-layout {
                    display: grid;
                    grid-template-columns: 1fr 460px 1fr;
                    min-height: 100vh;
                    position: relative;
                    overflow: hidden;
                    background: #06060e;
                }
                .aurora-bg {
                    position: fixed; inset: 0;
                    pointer-events: none; z-index: 0; overflow: hidden;
                }
                .aurora-mesh {
                    position: absolute; top: 0; left: 0; right: 0; height: 3px;
                    background: linear-gradient(90deg, ${c}, ${aurora2}, ${aurora3}, ${a1}, ${c});
                    background-size: 400% 100%;
                    animation: auroraShift 6s linear infinite;
                    opacity: 0.9;
                }
                .aurora-orb {
                    position: absolute; border-radius: 50%;
                    filter: blur(120px); mix-blend-mode: screen;
                }
                .ao1 { width:700px; height:700px; background:${c};      opacity:0.13; top:-200px;  left:-150px;  animation: orbDrift1 14s ease-in-out infinite; }
                .ao2 { width:600px; height:600px; background:${aurora2}; opacity:0.10; top:30%;    right:-200px; animation: orbDrift2 18s ease-in-out infinite; }
                .ao3 { width:500px; height:500px; background:${aurora3}; opacity:0.09; bottom:-150px; left:30%;  animation: orbDrift3 22s ease-in-out infinite; }
                .ao4 { width:400px; height:400px; background:${a1};      opacity:0.08; bottom:10%; right:10%;    animation: orbDrift1 26s ease-in-out infinite reverse; }

                .col-video {
                    position: relative; z-index: 2;
                    display: flex; flex-direction: column;
                    justify-content: center; align-items: flex-end;
                    padding: 80px 40px 80px 60px;
                    border-right: 1px solid rgba(255,255,255,0.04);
                }
                .col-payment {
                    position: relative; z-index: 2;
                    display: flex; align-items: center; justify-content: center;
                    padding: 40px 24px;
                }
                .col-features {
                    position: relative; z-index: 2;
                    display: flex; flex-direction: column;
                    justify-content: center;
                    padding: 80px 60px 80px 40px;
                    border-left: 1px solid rgba(255,255,255,0.04);
                    overflow-y: auto;
                }

                .mockup-frame {
                    width: 100%; max-width: 480px; aspect-ratio: 16/10;
                    background: #000; border: 6px solid #1c1c28; border-radius: 14px;
                    box-shadow: 0 30px 60px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.06), 0 0 80px ${c}20;
                    display: flex; align-items: center; justify-content: center;
                    overflow: hidden; position: relative;
                }
                .mockup-frame::before {
                    content: ''; position: absolute; inset: 0;
                    background: radial-gradient(circle at 40% 40%, ${c}15, transparent 70%);
                }

                .glass-card {
                    width: 100%; max-width: 440px;
                    background: rgba(14, 14, 22, 0.55);
                    border: 1px solid rgba(255,255,255,0.07);
                    border-top: 1px solid rgba(255,255,255,0.12);
                    border-radius: 28px; padding: 44px 40px;
                    backdrop-filter: blur(48px); -webkit-backdrop-filter: blur(48px);
                    box-shadow: 0 40px 80px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.1), 0 0 60px ${c}15;
                    position: relative; z-index: 10;
                    animation: floatUp 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                }

                .shimmer-text {
                    background: linear-gradient(90deg, rgba(255,255,255,0.9) 0%, ${c} 40%, rgba(255,255,255,0.9) 60%, ${aurora2}cc 100%);
                    background-size: 200% auto;
                    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
                    background-clip: text;
                    animation: textShimmer 3.5s linear infinite;
                }
                .shimmer-label {
                    background: linear-gradient(90deg, rgba(255,255,255,0.5) 0%, ${c}cc 50%, rgba(255,255,255,0.5) 100%);
                    background-size: 200% auto;
                    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
                    background-clip: text;
                    animation: textShimmer 4s linear infinite;
                }

                .input-wrapper { position: relative; margin-bottom: 22px; }
                .floating-label {
                    position: absolute; left: 16px; top: 18px;
                    font-size: 14px; color: rgba(255,255,255,0.35);
                    pointer-events: none;
                    transition: all 0.2s cubic-bezier(0.25, 1, 0.5, 1);
                }
                .premium-input {
                    width: 100%; background: rgba(0,0,0,0.35);
                    border: 1px solid rgba(255,255,255,0.08); border-radius: 12px;
                    padding: 24px 16px 10px 16px; font-size: 15px; color: #fff;
                    font-weight: 500; font-family: 'Inter', system-ui, sans-serif;
                    transition: border-color 0.25s ease, box-shadow 0.25s ease, background 0.25s ease;
                    box-shadow: inset 0 2px 6px rgba(0,0,0,0.25);
                    outline: none; -webkit-appearance: none;
                }
                .premium-input:focus, .premium-input.has-val {
                    border-color: ${c}88;
                }
                .premium-input:focus {
                    background: rgba(255,255,255,0.02);
                    box-shadow: 0 0 0 2px ${c}33, inset 0 2px 6px rgba(0,0,0,0.25);
                }
                .premium-input:focus + .floating-label,
                .premium-input.has-val + .floating-label {
                    top: 7px; font-size: 10px; color: ${c}; font-weight: 700; letter-spacing: 0.6px;
                }
                .premium-input::placeholder { color: transparent; }

                .feat-section-title {
                    font-size: 10px; font-weight: 900; letter-spacing: 2.5px;
                    text-transform: uppercase; margin-bottom: 14px;
                    margin-top: 28px; padding-bottom: 8px;
                    border-bottom: 1px solid ${c}22;
                    display: block;
                }
                .feature-row {
                    display: flex; align-items: center; gap: 12px;
                    margin-bottom: 11px; opacity: 0;
                    animation: revealRow 0.4s ease forwards;
                }

                @media (max-width: 1100px) {
                    .tri-layout { grid-template-columns: 1fr; }
                    .col-video    { display: none; }
                    .col-features { display: none; }
                    .col-payment  { min-height: 100vh; padding: 40px 20px; }
                    .glass-card   { padding: 32px 20px; max-width: 100%; }
                }
            `}</style>

            <div id="confetti-container" style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 9999 }} />

            <div className="aurora-bg">
                <div className="aurora-mesh" />
                <div className="aurora-orb ao1" />
                <div className="aurora-orb ao2" />
                <div className="aurora-orb ao3" />
                <div className="aurora-orb ao4" />
            </div>

            <div className="tri-layout">

                {/* COL 1: VIDEO */}
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
                        onMouseOver={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.09)'; e.currentTarget.style.transform = 'scale(1.05)'; }}
                        onMouseOut={e  => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.transform = 'scale(1)'; }}
                    >
                        <AiOutlineArrowLeft size={18} />
                    </button>

                    <div style={{ width: '100%', maxWidth: '480px' }}>
                        <div style={{
                            display: 'inline-flex', alignItems: 'center', gap: '8px',
                            padding: '4px 12px', borderRadius: '100px',
                            border: `1px solid ${c}44`, marginBottom: '18px',
                        }}>
                            <span style={{
                                display: 'inline-block', width: '6px', height: '6px',
                                borderRadius: '50%', background: c,
                                animation: 'pulseDot 1.8s ease-in-out infinite'
                            }} />
                            <span style={{ color: c, fontSize: '10px', fontWeight: '800', letterSpacing: '1.5px' }}>
                                UPGRADING TO
                            </span>
                        </div>

                        <h1 style={{ fontSize: '52px', fontWeight: '900', letterSpacing: '-1px', lineHeight: 1.05, marginBottom: '14px' }}
                            className="shimmer-text">
                            {activePlan.name} Tier
                        </h1>

                        <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '14px', lineHeight: 1.7, marginBottom: '32px', maxWidth: '380px', fontStyle: 'italic' }}>
                            {activePlan.quote}
                        </p>

                        <div className="mockup-frame">
                            <div style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
                                <div style={{
                                    width: '60px', height: '60px', borderRadius: '50%',
                                    background: `${c}20`, border: `1px solid ${c}44`,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    margin: '0 auto 14px auto', cursor: 'pointer',
                                    transition: 'all 0.2s ease', boxShadow: `0 0 30px ${c}33`
                                }}
                                    onMouseOver={e => { e.currentTarget.style.background = `${c}35`; e.currentTarget.style.transform = 'scale(1.08)'; }}
                                    onMouseOut={e  => { e.currentTarget.style.background = `${c}20`; e.currentTarget.style.transform = 'scale(1)'; }}
                                >
                                    <svg width="22" height="22" viewBox="0 0 24 24" fill={c} style={{ marginLeft: '4px' }}>
                                        <polygon points="5 3 19 12 5 21 5 3" />
                                    </svg>
                                </div>
                                <div style={{ color: 'rgba(255,255,255,0.25)', fontSize: '11px', fontWeight: '700', letterSpacing: '2.5px' }}>
                                    DEMO VIDEO
                                </div>
                            </div>
                        </div>

                        <div style={{
                            marginTop: '28px', padding: '16px 20px', borderRadius: '14px',
                            background: `${c}0d`, border: `1px solid ${c}22`,
                            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                        }}>
                            <div>
                                <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.4)', fontWeight: '700', letterSpacing: '1px' }}>PLAN</div>
                                <div style={{ fontSize: '16px', fontWeight: '800', color: c, marginTop: '2px' }}>{activePlan.name}</div>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                                <div style={{ fontSize: '26px', fontWeight: '900', color: '#fff', lineHeight: 1 }}>{activePlan.price}</div>
                                <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', fontWeight: '600', marginTop: '2px' }}>per month</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* COL 2: PAYMENT */}
                <div className="col-payment">
                    <div className="glass-card">
                        <div style={{ marginBottom: '36px', textAlign: 'center' }}>
                            <h2 style={{ fontSize: '22px', fontWeight: '800', marginBottom: '6px' }}
                                className="shimmer-text">
                                Secure Checkout
                            </h2>
                            <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '12px', fontWeight: '600', letterSpacing: '0.5px' }}>
                                Encrypted via Neural Payment Gateway
                            </p>
                        </div>

                        <div style={{
                            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                            padding: '18px', borderRadius: '14px',
                            background: `${c}0d`, border: `1px solid ${c}33`,
                            marginBottom: '30px', boxShadow: `inset 0 0 24px ${c}0a`
                        }}>
                            <div>
                                <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.4)', fontWeight: '700', letterSpacing: '1px', marginBottom: '3px' }}>SUBSCRIPTION</div>
                                <div style={{ fontSize: '17px', fontWeight: '800', color: c }}>{activePlan.name}</div>
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
                                    background: isSuccess ? '#10b981' : `linear-gradient(135deg, ${c}, ${aurora2})`,
                                    border: 'none', color: '#fff', fontSize: '15px', fontWeight: '800',
                                    letterSpacing: '1.5px', marginTop: '8px', cursor: isProcessing ? 'default' : 'pointer',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px',
                                    boxShadow: isProcessing ? 'none' : `0 14px 32px ${c}44`,
                                    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                                    fontFamily: 'Inter, system-ui, sans-serif',
                                }}
                                onMouseOver={e => { if (!isProcessing) { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = `0 20px 40px ${c}55`; } }}
                                onMouseOut={e  => { if (!isProcessing) { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = `0 14px 32px ${c}44`; } }}
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
                            marginTop: '28px', color: 'rgba(255,255,255,0.25)', fontSize: '11px', fontWeight: '600'
                        }}>
                            <AiOutlineCheck size={11} color="#10b981" />
                            256-bit AES Encryption
                        </div>
                    </div>
                </div>

                {/* COL 3: FEATURES */}
                <div className="col-features">
                    <div style={{ maxWidth: '420px' }}>
                        <span className="shimmer-label" style={{ fontSize: '10px', fontWeight: '900', letterSpacing: '3px', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
                            What you unlock
                        </span>
                        <h2 style={{ fontSize: '22px', fontWeight: '800', marginBottom: '4px', color: '#fff' }}>
                            {activePlan.name} Features
                        </h2>
                        <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.35)', marginBottom: '4px', fontWeight: '500', lineHeight: 1.6 }}>
                            {activePlan.tagline}
                        </p>

                        <span className="feat-section-title shimmer-label">RK AI Desktop</span>
                        {(activePlan.desktopFeatures || []).map((f, i) => (
                            <div key={i} className="feature-row" style={{ animationDelay: `${i * 35}ms` }}>
                                <div style={{
                                    width: '18px', height: '18px', borderRadius: '50%', flexShrink: 0,
                                    background: `${c}18`, border: `1px solid ${c}44`,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                }}>
                                    <AiOutlineCheck size={9} color={c} />
                                </div>
                                <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.8)', fontWeight: '500', lineHeight: 1.4 }}>{f}</span>
                            </div>
                        ))}

                        <span className="feat-section-title shimmer-label" style={{ marginTop: '24px' }}>RK AI Home</span>
                        {(activePlan.homeFeatures || []).map((f, i) => (
                            <div key={i} className="feature-row" style={{ animationDelay: `${(activePlan.desktopFeatures?.length || 0) * 35 + i * 35}ms` }}>
                                <div style={{
                                    width: '18px', height: '18px', borderRadius: '50%', flexShrink: 0,
                                    background: `${aurora2}18`, border: `1px solid ${aurora2}44`,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                }}>
                                    <AiOutlineCheck size={9} color={aurora2} />
                                </div>
                                <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.8)', fontWeight: '500', lineHeight: 1.4 }}>{f}</span>
                            </div>
                        ))}

                        {(activePlan.sharedFeatures || []).length > 0 && (
                            <>
                                <span className="feat-section-title shimmer-label" style={{ marginTop: '24px' }}>Cloud & Limits</span>
                                {(activePlan.sharedFeatures || []).map((f, i) => (
                                    <div key={i} className="feature-row" style={{ animationDelay: `${((activePlan.desktopFeatures?.length || 0) + (activePlan.homeFeatures?.length || 0)) * 35 + i * 35}ms` }}>
                                        <div style={{
                                            width: '18px', height: '18px', borderRadius: '50%', flexShrink: 0,
                                            background: `${aurora3}18`, border: `1px solid ${aurora3}44`,
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        }}>
                                            <AiOutlineCheck size={9} color={aurora3} />
                                        </div>
                                        <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.8)', fontWeight: '500', lineHeight: 1.4 }}>{f}</span>
                                    </div>
                                ))}
                            </>
                        )}
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
