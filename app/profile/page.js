'use client';
import { useEffect, useMemo, useState } from 'react';
import Navbar from '@/components/Navbar';
import ChatWidget from '@/components/ChatWidget';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { DATABASE_ID, Query, TABLES, tables } from '@/lib/appwrite';

export default function Profile() {
    const { user, loading } = useAuth();
    const router = useRouter();
    const [waitlistRows, setWaitlistRows] = useState([]);
    const [waitlistLoading, setWaitlistLoading] = useState(false);

    useEffect(() => {
        if (!loading && !user) {
            router.push('/login?redirect=/profile');
        }
    }, [loading, user, router]);

    useEffect(() => {
        const load = async () => {
            if (loading || !user) return;
            setWaitlistLoading(true);
            try {
                if (DATABASE_ID) {
                    const res = await tables.listRows(
                        DATABASE_ID,
                        TABLES.WAITLIST,
                        [
                            Query.equal('userId', user.$id),
                            Query.orderDesc('$createdAt'),
                            Query.limit(25),
                        ]
                    );
                    setWaitlistRows(Array.isArray(res?.rows) ? res.rows : []);
                } else {
                    const raw = localStorage.getItem('arkis_waitlist') || '[]';
                    const list = JSON.parse(raw);
                    const filtered = Array.isArray(list) ? list.filter((x) => x?.userId === user.$id || x?.email === user.email) : [];
                    setWaitlistRows(filtered);
                }
            } catch (_) {
                setWaitlistRows([]);
            } finally {
                setWaitlistLoading(false);
            }
        };

        load();
    }, [loading, user]);

    const waitlistItems = useMemo(() => {
        return Array.isArray(waitlistRows) ? waitlistRows : [];
    }, [waitlistRows]);

    if (loading) return <div style={{ background: 'var(--background)', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text)' }}>Loading...</div>;
    if (!user) return <div style={{ background: 'var(--background)', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text)' }}>Redirecting...</div>;

    return (
        <div style={{ background: 'var(--background)', minHeight: '100vh', color: 'var(--text)' }}>
            <Navbar />
            <div style={{ padding: '120px 20px 60px', maxWidth: '800px', margin: '0 auto' }}>
                <div style={{
                    background: 'var(--surface)', border: '1px solid var(--border)',
                    borderRadius: '24px', padding: '40px', textAlign: 'center'
                }}>
                    <div style={{
                        width: '100px', height: '100px', borderRadius: '50%',
                        background: 'linear-gradient(135deg, var(--blue), var(--violet))',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '40px', fontWeight: '800', color: '#fff',
                        margin: '0 auto 20px', boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
                        border: '4px solid rgba(255,255,255,0.1)'
                    }}>
                        {user.name.charAt(0).toUpperCase()}
                    </div>
                    <h1 style={{ fontSize: '32px', fontWeight: '800', marginBottom: '8px' }}>{user.name}</h1>
                    <p style={{ color: 'var(--muted)', fontSize: '16px', marginBottom: '32px' }}>{user.email}</p>

                    <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '30px' }}>
                        <Link href="/orders" className="btn-secondary" style={{ padding: '12px 22px', borderRadius: '50px' }}>View Orders</Link>
                        <Link href="/subscription" className="btn-secondary" style={{ padding: '12px 22px', borderRadius: '50px' }}>Manage Subscription</Link>
                        <Link href="/products" className="btn-secondary" style={{ padding: '12px 22px', borderRadius: '50px' }}>Explore Products</Link>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', textAlign: 'left' }}>
                        <div style={{ background: 'rgba(255,255,255,0.03)', padding: '20px', borderRadius: '16px', border: '1px solid var(--border)' }}>
                            <div style={{ fontSize: '11px', fontWeight: '700', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>Account ID</div>
                            <div style={{ fontSize: '14px', fontFamily: 'monospace', opacity: 0.8 }}>{user.$id}</div>
                        </div>
                        <div style={{ background: 'rgba(255,255,255,0.03)', padding: '20px', borderRadius: '16px', border: '1px solid var(--border)' }}>
                            <div style={{ fontSize: '11px', fontWeight: '700', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>Member Since</div>
                            <div style={{ fontSize: '14px', opacity: 0.8 }}>{new Date(user.$createdAt).toLocaleDateString()}</div>
                        </div>
                    </div>
                </div>

                <div style={{ marginTop: '22px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '24px', padding: '26px' }}>
                    <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap' }}>
                        <div>
                            <div style={{ fontSize: '11px', fontWeight: '700', letterSpacing: '2px', color: 'var(--muted)', textTransform: 'uppercase' }}>Early Access</div>
                            <h2 style={{ fontSize: '20px', fontWeight: '900', marginTop: '6px' }}>My Waitlist</h2>
                        </div>
                        <Link href="/products" className="btn-secondary" style={{ padding: '10px 18px', borderRadius: '50px' }}>Join Another →</Link>
                    </div>

                    {waitlistLoading ? (
                        <div style={{ marginTop: '16px', color: 'var(--muted)', fontSize: '14px' }}>Loading…</div>
                    ) : waitlistItems.length === 0 ? (
                        <div style={{ marginTop: '16px', color: 'var(--muted)', fontSize: '14px' }}>
                            No waitlist entries yet.
                        </div>
                    ) : (
                        <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            {waitlistItems.map((r) => (
                                <div key={r.$id || r.id} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', borderRadius: '16px', padding: '16px' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px', flexWrap: 'wrap' }}>
                                        <div style={{ fontWeight: '800' }}>{r.product || r.productLabel || r.productKey || 'Waitlist'}</div>
                                        <div style={{ fontSize: '12px', color: 'var(--muted)' }}>{new Date(r.createdAt || r.$createdAt || Date.now()).toLocaleString()}</div>
                                    </div>
                                    <div style={{ marginTop: '8px', fontSize: '13px', color: 'var(--muted)' }}>
                                        {r.email || user.email}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            <Footer />
            <ChatWidget />
        </div>
    );
}
