'use client';
import Navbar from '@/components/Navbar';
import ChatWidget from '@/components/ChatWidget';
import Footer from '@/components/Footer';
import { Suspense, useEffect, useMemo, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter, useSearchParams } from 'next/navigation';

function NotifyContent() {
    const { user, loading: authLoading } = useAuth();
    const router = useRouter();
    const searchParams = useSearchParams();

    const product = (searchParams.get('product') || '').toLowerCase();
    const productLabel = useMemo(() => {
        if (product === 'rk-ai-home') return 'RK AI Home';
        if (product === 'light-key') return 'Light Key';
        if (product === 'lumina-os') return 'Lumina OS';
        return 'ARKIS';
    }, [product]);

    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        if (!authLoading && !user) {
            const qp = product ? `?product=${encodeURIComponent(product)}` : '';
            router.push(`/login?redirect=${encodeURIComponent(`/notify${qp}`)}`);
        }
        if (!authLoading && user) {
            setEmail((prev) => prev || user.email || '');
        }
    }, [authLoading, user, router, product]);

    const submit = (e) => {
        e.preventDefault();
        try {
            const raw = localStorage.getItem('arkis_notify') || '[]';
            const list = JSON.parse(raw);
            list.unshift({
                id: `${Date.now()}`,
                product: productLabel,
                productKey: product || null,
                email,
                createdAt: new Date().toISOString(),
            });
            localStorage.setItem('arkis_notify', JSON.stringify(list));
        } catch (_) { }
        setSubmitted(true);
    };

    return (
        <div style={{ background: 'var(--background)', minHeight: '100vh', color: 'var(--text)' }}>
            <Navbar />
            <div style={{ padding: '120px 20px 60px', maxWidth: '900px', margin: '0 auto' }}>
                <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                    <div className="badge float-anim" style={{ margin: '0 auto 16px' }}>
                        <span className="dot" style={{ background: 'var(--violet)' }} />
                        Product Alerts
                    </div>
                    <h1 style={{ fontSize: 'clamp(34px, 6vw, 60px)', fontWeight: '900', letterSpacing: '-1px' }}>
                        Notify <span className="grad">Me</span>
                    </h1>
                    <p style={{ color: 'var(--muted)', fontSize: '18px', marginTop: '14px' }}>
                        Get an email when {productLabel} becomes available.
                    </p>
                </div>

                {submitted ? (
                    <div style={{
                        background: 'var(--surface)', border: '1px solid var(--border)',
                        borderRadius: '24px', padding: '60px', textAlign: 'center'
                    }}>
                        <div style={{ fontSize: '56px', marginBottom: '18px' }}>🔔</div>
                        <h2 style={{ fontSize: '26px', fontWeight: '800', marginBottom: '10px' }}>Done.</h2>
                        <p style={{ color: 'var(--muted)', fontSize: '15px', lineHeight: '1.7' }}>
                            We’ll email you at <span style={{ color: 'var(--text)', fontWeight: '700' }}>{email}</span>.
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
                        <div>
                            <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: 'var(--muted)', textTransform: 'uppercase', marginBottom: '8px' }}>Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)', borderRadius: '12px', padding: '14px', color: 'var(--text)', outline: 'none' }}
                            />
                        </div>
                        <button
                            type="submit"
                            className="btn-primary"
                            style={{ marginTop: '24px', padding: '16px 34px', borderRadius: '50px', cursor: 'pointer' }}
                        >
                            Enable Notifications →
                        </button>
                    </form>
                )}
            </div>
            <Footer />
            <ChatWidget />
        </div>
    );
}

export default function NotifyPage() {
    return (
        <Suspense fallback={<div style={{ background: 'var(--background)', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><div className="spinner"></div></div>}>
            <NotifyContent />
        </Suspense>
    );
}

