'use client';
import { useEffect, useMemo, useState } from 'react';
import Navbar from '@/components/Navbar';
import ChatWidget from '@/components/ChatWidget';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { getProfile } from '@/lib/api';

export default function Orders() {
    const { user, loading } = useAuth();
    const router = useRouter();
    const [orders, setOrders] = useState([]);
    const [remoteLoading, setRemoteLoading] = useState(false);

    useEffect(() => {
        if (!loading && !user) {
            router.push('/login?redirect=/orders');
        }
    }, [loading, user, router]);

    useEffect(() => {
        if (!loading && user) {
            const load = async () => {
                setRemoteLoading(true);
                try {
                    // 🚀 Proxy through Backend to bypass Appwrite Platform Limits
                    const res = await getProfile(user.$id, user.email || '');
                    const orderRows = Array.isArray(res?.orders) ? res.orders : [];
                    const preorderRows = Array.isArray(res?.preorders) ? res.preorders : [];

                    const normalized = [
                        ...orderRows.map((r) => ({
                            id: r.orderNumber || r.$id,
                            productId: r.productId,
                            productName: r.productName || 'Order',
                            price: r.amount ? `${r.amount}` : r.price,
                            email: r.email,
                            status: r.status,
                            createdAt: r.createdAt || r.$createdAt,
                            kind: 'order',
                        })),
                        ...preorderRows.map((r) => ({
                            id: r.$id,
                            productId: r.productId,
                            productName: r.productName || 'Pre-order',
                            price: r.price,
                            email: r.email,
                            status: r.status || 'submitted',
                            createdAt: r.createdAt || r.$createdAt,
                            kind: 'preorder',
                        })),
                    ].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

                    setOrders(normalized);
                } catch (_) {
                    // Fallback to local storage if backend fails
                    const raw = localStorage.getItem('rexycore_orders') || '[]';
                    const list = JSON.parse(raw);
                    setOrders(Array.isArray(list) ? list : []);
                } finally {
                    setRemoteLoading(false);
                }
            };

            load();
        }
    }, [loading, user]);

    const myOrders = useMemo(() => {
        if (!user) return [];
        const email = user.email;
        return orders.filter(o => !o.email || o.email === email);
    }, [orders, user]);

    if (loading) {
        return <div style={{ background: 'var(--void)', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>Loading...</div>;
    }

    if (!user) {
        return <div style={{ background: 'var(--void)', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>Redirecting...</div>;
    }

    return (
        <div style={{ background: 'var(--void)', minHeight: '100vh', color: '#fff', position: 'relative', overflowX: 'hidden' }}>
            <div className="noise" aria-hidden />
            <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', background: 'radial-gradient(circle at 70% 30%, rgba(37,99,235,0.15) 0%, transparent 60%)' }} />

            <Navbar />
            <div style={{ padding: '140px 20px 80px', maxWidth: '800px', margin: '0 auto', position: 'relative', zIndex: 10 }}>
                <h1 style={{ fontSize: '40px', fontWeight: '800', marginBottom: '12px' }}>Order History</h1>
                <p style={{ color: 'var(--subtext)', marginBottom: '40px' }}>Manage your purchases and hardware orders.</p>
                {remoteLoading ? <div style={{ color: 'var(--subtext)', marginBottom: '18px', fontSize: '13px' }}>Syncing…</div> : null}

                {myOrders.length === 0 ? (
                    <div style={{
                        background: 'rgba(255,255,255,0.02)', border: '1px solid var(--glass-border)',
                        borderRadius: '24px', padding: '60px', textAlign: 'center', backdropFilter: 'blur(16px)'
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px', color: 'var(--blue)' }}>
                            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="21 8 21 21 3 21 3 8" />
                                <rect x="1" y="3" width="22" height="5" />
                                <line x1="10" y1="12" x2="14" y2="12" />
                            </svg>
                        </div>
                        <h3 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '8px' }}>No orders yet</h3>
                        <p style={{ color: 'var(--subtext)', fontSize: '14px' }}>Place a pre-order to see it here.</p>
                        <Link href="/products/rk-ai-home" className="btn-primary" style={{ marginTop: '22px', display: 'inline-block', padding: '12px 24px', borderRadius: '99px' }}>Go to RK AI Home →</Link>
                    </div>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        {myOrders.map(o => (
                            <div key={o.id} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--glass-border-strong)', borderRadius: '20px', padding: '24px', backdropFilter: 'blur(16px)' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
                                    <div style={{ fontWeight: '800', fontSize: '18px' }}>{o.productName || o.productId || 'Order'}</div>
                                    <div style={{ fontWeight: '900', color: 'var(--blue)', fontSize: '16px' }}>{o.price || '₹—'}</div>
                                </div>
                                <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginTop: '12px', color: 'var(--subtext)', fontSize: '13px' }}>
                                    <div>Date: {o.createdAt ? new Date(o.createdAt).toLocaleString() : '—'}</div>
                                    <div>Status: {o.status || 'Pending Payment'}</div>
                                    <div>ID: <span style={{ fontFamily: 'monospace' }}>{o.id}</span></div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <Footer />
            <ChatWidget />
        </div>
    );
}
