'use client';
import Navbar from '@/components/Navbar';
import ChatWidget from '@/components/ChatWidget';
import Footer from '@/components/Footer';
import { Suspense, useEffect, useMemo, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter, useSearchParams } from 'next/navigation';

function WaitlistContent() {
    const { user, loading: authLoading } = useAuth();
    const router = useRouter();
    const searchParams = useSearchParams();

    const product = (searchParams.get('product') || '').toLowerCase();
    const productLabel = useMemo(() => {
        if (product === 'lumina-os') return 'Lumina OS';
        if (product === 'light-key') return 'Light Key';
        return 'Rexycore';
    }, [product]);

    const [form, setForm] = useState({
        name: '',
        email: '',
        phone: '',
        country: 'India',
        notes: '',
        paymentIntent: 'Maybe',
    });
    const [submitted, setSubmitted] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (!authLoading && !user) {
            const qp = product ? `?product=${encodeURIComponent(product)}` : '';
            router.push(`/login?redirect=${encodeURIComponent(`/waitlist${qp}`)}`);
        }
        if (!authLoading && user) {
            setForm((prev) => ({
                ...prev,
                name: prev.name || user.name || '',
                email: prev.email || user.email || '',
            }));
        }
    }, [authLoading, user, router, product]);

    const submit = async (e) => {
        e.preventDefault();
        if (!user) return;
        setError('');
        setSubmitting(true);

        const entry = {
            product: productLabel,
            productKey: product || 'rexycore',
            userId: user.$id,
            name: form.name,
            email: form.email,
            phone: form.phone,
            country: form.country,
            notes: form.notes,
            paymentIntent: form.paymentIntent,
        };

        try {
            // 🚀 Proxy all Appwrite calls through the Backend to bypass Platform Limits
            const response = await fetch('https://rk-ai-backend.onrender.com/web/waitlist', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(entry)
            });

            if (!response.ok) {
                const data = await response.json().catch(() => ({}));
                throw new Error(data.error || 'Failed to join waitlist via backend');
            }

            // Local persistence for UX
            try {
                const legacyRaw = localStorage.getItem('rexycore_waitlist');
                const raw = legacyRaw || '[]';
                const list = JSON.parse(raw);
                list.unshift({ ...entry, createdAt: new Date().toISOString() });
                localStorage.setItem('rexycore_waitlist', JSON.stringify(list));
            } catch (_) { }

            setSubmitted(true);
        } catch (err) {
            setError(err.message || 'Failed to join waitlist');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div style={{ background: 'var(--background)', minHeight: '100vh', color: 'var(--text)' }}>
            <Navbar />
            <div style={{ padding: '120px 20px 60px', maxWidth: '900px', margin: '0 auto' }}>
                <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                    <div className="badge float-anim" style={{ margin: '0 auto 16px' }}>
                        <span className="dot" style={{ background: 'var(--blue)' }} />
                        Early Access
                    </div>
                    <h1 style={{ fontSize: 'clamp(36px, 6vw, 64px)', fontWeight: '900', letterSpacing: '-1px' }}>
                        Control your entire home with AI — <span className="grad">better than Alexa</span>
                    </h1>
                    <p style={{ color: 'var(--muted)', fontSize: '18px', marginTop: '14px' }}>
                        RK AI Home learns your habits, automates everything, and works offline.
                    </p>
                    <p style={{ color: 'var(--blue)', fontSize: '14px', marginTop: '12px', fontWeight: '700' }}>
                        ⚡ Only 100 early users will get lifetime ₹49/month. Pay later when your slot is ready.
                    </p>
                </div>

                {submitted ? (
                    <div style={{
                        background: 'var(--surface)', border: '1px solid var(--border)',
                        borderRadius: '24px', padding: '60px', textAlign: 'center'
                    }}>
                        <div style={{ fontSize: '56px', marginBottom: '18px' }}>✅</div>
                        <h2 style={{ fontSize: '26px', fontWeight: '800', marginBottom: '10px' }}>You’re on the list.</h2>
                        <p style={{ color: 'var(--muted)', fontSize: '15px', lineHeight: '1.7' }}>
                            We’ll email you when {productLabel} opens for early access.
                        </p>
                        <div style={{ marginTop: '24px', padding: '20px', background: 'rgba(59,130,246,0.05)', borderRadius: '16px', border: '1px solid rgba(59,130,246,0.1)' }}>
                            <p style={{ fontSize: '14px', fontWeight: '700', color: 'var(--blue)' }}>🔥 PRO MOVE</p>
                            <p style={{ fontSize: '13px', color: 'var(--muted)', marginTop: '4px' }}>Want priority access? Share this with 3 friends to jump the queue!</p>
                        </div>
                        <button
                            className="btn-secondary"
                            style={{ marginTop: '28px', padding: '14px 28px', borderRadius: '50px', cursor: 'pointer' }}
                            onClick={() => router.push('/products')}
                        >
                            Back to Products
                        </button>
                    </div>
                ) : (
                    <form onSubmit={submit} style={{
                        background: 'var(--surface)', border: '1px solid var(--border)',
                        borderRadius: '24px', padding: '40px'
                    }}>
                        {error ? (
                            <div style={{ marginBottom: '18px', background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.25)', color: '#fecaca', padding: '12px 14px', borderRadius: '14px', fontSize: '13px' }}>
                                {error}
                            </div>
                        ) : null}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '18px' }}>
                            <div>
                                <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: 'var(--muted)', textTransform: 'uppercase', marginBottom: '8px' }}>Full Name</label>
                                <input
                                    value={form.name}
                                    onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                                    required
                                    style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)', borderRadius: '12px', padding: '14px', color: 'var(--text)', outline: 'none' }}
                                />
                            </div>
                            <div>
                                <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: 'var(--muted)', textTransform: 'uppercase', marginBottom: '8px' }}>Email</label>
                                <input
                                    type="email"
                                    value={form.email}
                                    onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                                    required
                                    style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)', borderRadius: '12px', padding: '14px', color: 'var(--text)', outline: 'none' }}
                                />
                            </div>
                            <div style={{ gridColumn: 'span 2' }}>
                                <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: 'var(--muted)', textTransform: 'uppercase', marginBottom: '8px' }}>Would you pay ₹99/month for this?</label>
                                <div style={{ display: 'flex', gap: '12px' }}>
                                    {['Yes', 'Maybe', 'No'].map((opt) => (
                                        <button
                                            key={opt}
                                            type="button"
                                            onClick={() => setForm((p) => ({ ...p, paymentIntent: opt }))}
                                            style={{
                                                flex: 1,
                                                padding: '12px',
                                                borderRadius: '12px',
                                                border: '1px solid',
                                                borderColor: form.paymentIntent === opt ? 'var(--blue)' : 'var(--border)',
                                                background: form.paymentIntent === opt ? 'rgba(59,130,246,0.1)' : 'transparent',
                                                color: form.paymentIntent === opt ? 'var(--blue)' : 'var(--text)',
                                                fontSize: '14px',
                                                fontWeight: '700',
                                                cursor: 'pointer',
                                                transition: '0.2s'
                                            }}
                                        >
                                            {opt}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div style={{ marginTop: '18px' }}>
                            <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: 'var(--muted)', textTransform: 'uppercase', marginBottom: '8px' }}>What feature would make you pay?</label>
                            <textarea
                                value={form.notes}
                                onChange={(e) => setForm((p) => ({ ...p, notes: e.target.value }))}
                                rows={4}
                                placeholder="Example: Better local control, more storage, etc."
                                style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)', borderRadius: '12px', padding: '14px', color: 'var(--text)', outline: 'none', resize: 'vertical' }}
                            />
                        </div>

                        <button
                            type="submit"
                            className="btn-primary"
                            disabled={submitting}
                            style={{ marginTop: '24px', padding: '16px 34px', borderRadius: '50px', cursor: submitting ? 'default' : 'pointer', opacity: submitting ? 0.7 : 1, width: '100%' }}
                        >
                            {submitting ? 'Joining…' : 'Get Early Access →'}
                        </button>
                    </form>
                )}
            </div>
            <Footer />
            <ChatWidget />
        </div>
    );
}

export default function WaitlistPage() {
    return (
        <Suspense fallback={<div style={{ background: 'var(--background)', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><div className="spinner"></div></div>}>
            <WaitlistContent />
        </Suspense>
    );
}
