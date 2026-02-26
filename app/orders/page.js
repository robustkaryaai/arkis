'use client';
import { useEffect, useMemo, useState } from 'react';
import Navbar from '@/components/Navbar';
import ChatWidget from '@/components/ChatWidget';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { DATABASE_ID, Query, TABLES, tables } from '@/lib/appwrite';

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
                    if (DATABASE_ID) {
                        const [orderRes, preorderRes] = await Promise.all([
                            tables.listRows(
                                DATABASE_ID,
                                TABLES.ORDER,
                                [Query.equal('userId', user.$id), Query.orderDesc('$createdAt'), Query.limit(50)]
                            ),
                            tables.listRows(
                                DATABASE_ID,
                                TABLES.PREORDER,
                                [Query.equal('userId', user.$id), Query.orderDesc('$createdAt'), Query.limit(50)]
                            )
                        ]);

                        const orderRows = Array.isArray(orderRes?.rows) ? orderRes.rows : [];
                        const preorderRows = Array.isArray(preorderRes?.rows) ? preorderRes.rows : [];

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
                    } else {
                        const raw = localStorage.getItem('rexycore_orders') || '[]';
                        const list = JSON.parse(raw);
                        setOrders(Array.isArray(list) ? list : []);
                    }
                } catch (_) {
                    try {
                        const raw = localStorage.getItem('rexycore_orders') || '[]';
                        const list = JSON.parse(raw);
                        setOrders(Array.isArray(list) ? list : []);
                    } catch (_) {
                        setOrders([]);
                    }
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
        return <div style={{ background: 'var(--background)', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text)' }}>Loading...</div>;
    }

    if (!user) {
        return <div style={{ background: 'var(--background)', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text)' }}>Redirecting...</div>;
    }

    return (
        <div style={{ background: 'var(--background)', minHeight: '100vh', color: 'var(--text)' }}>
            <Navbar />
            <div style={{ padding: '120px 20px 60px', maxWidth: '800px', margin: '0 auto' }}>
                <h1 style={{ fontSize: '40px', fontWeight: '800', marginBottom: '12px' }}>Order History</h1>
                <p style={{ color: 'var(--muted)', marginBottom: '40px' }}>Manage your purchases and hardware orders.</p>
                {remoteLoading ? <div style={{ color: 'var(--muted)', marginBottom: '18px', fontSize: '13px' }}>Syncing…</div> : null}

                {myOrders.length === 0 ? (
                    <div style={{
                        background: 'var(--surface)', border: '1px solid var(--border)',
                        borderRadius: '24px', padding: '60px', textAlign: 'center'
                    }}>
                        <div style={{ fontSize: '48px', marginBottom: '20px' }}>📦</div>
                        <h3 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '8px' }}>No orders yet</h3>
                        <p style={{ color: 'var(--muted)', fontSize: '14px' }}>Place a pre-order to see it here.</p>
                        <Link href="/products/rk-ai-home" className="btn-primary" style={{ marginTop: '22px', display: 'inline-block', padding: '12px 24px', borderRadius: '50px' }}>Go to RK AI Home →</Link>
                    </div>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        {myOrders.map(o => (
                            <div key={o.id} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '20px', padding: '20px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
                                    <div style={{ fontWeight: '800', fontSize: '16px' }}>{o.productName || o.productId || 'Order'}</div>
                                    <div style={{ fontWeight: '900' }}>{o.price || '₹—'}</div>
                                </div>
                                <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', marginTop: '10px', color: 'var(--muted)', fontSize: '13px' }}>
                                    <div>📅 {o.createdAt ? new Date(o.createdAt).toLocaleString() : '—'}</div>
                                    <div>🧾 {o.status || 'Pending Payment'}</div>
                                    <div>🆔 {o.id}</div>
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
