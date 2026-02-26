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
        return 'ARKIS';
    }, [product]);

    const [form, setForm] = useState({
        name: '',
        email: '',
        phone: '',
        country: 'India',
        notes: '',
    });
    const [submitted, setSubmitted] = useState(false);

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

    const submit = (e) => {
        e.preventDefault();
        const entry = {
            id: `${Date.now()}`,
            product: productLabel,
            productKey: product || null,
            name: form.name,
            email: form.email,
            phone: form.phone,
            country: form.country,
            notes: form.notes,
            createdAt: new Date().toISOString(),
        };

        try {
            const raw = localStorage.getItem('arkis_waitlist') || '[]';
            const list = JSON.parse(raw);
            list.unshift(entry);
            localStorage.setItem('arkis_waitlist', JSON.stringify(list));
        } catch (_) { }

        setSubmitted(true);
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
                        Join the <span className="grad">Waitlist</span>
                    </h1>
                    <p style={{ color: 'var(--muted)', fontSize: '18px', marginTop: '14px' }}>
                        Reserve your spot for {productLabel} updates, Alpha/Beta access, and launch priority.
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
                            <div>
                                <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: 'var(--muted)', textTransform: 'uppercase', marginBottom: '8px' }}>Phone (Optional)</label>
                                <input
                                    value={form.phone}
                                    onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
                                    style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)', borderRadius: '12px', padding: '14px', color: 'var(--text)', outline: 'none' }}
                                />
                            </div>
                            <div>
                                <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: 'var(--muted)', textTransform: 'uppercase', marginBottom: '8px' }}>Country</label>
                                <input
                                    value={form.country}
                                    onChange={(e) => setForm((p) => ({ ...p, country: e.target.value }))}
                                    style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)', borderRadius: '12px', padding: '14px', color: 'var(--text)', outline: 'none' }}
                                />
                            </div>
                        </div>

                        <div style={{ marginTop: '18px' }}>
                            <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: 'var(--muted)', textTransform: 'uppercase', marginBottom: '8px' }}>What do you want from {productLabel}?</label>
                            <textarea
                                value={form.notes}
                                onChange={(e) => setForm((p) => ({ ...p, notes: e.target.value }))}
                                rows={4}
                                style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)', borderRadius: '12px', padding: '14px', color: 'var(--text)', outline: 'none', resize: 'vertical' }}
                            />
                        </div>

                        <button
                            type="submit"
                            className="btn-primary"
                            style={{ marginTop: '24px', padding: '16px 34px', borderRadius: '50px', cursor: 'pointer' }}
                        >
                            Join Waitlist →
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
