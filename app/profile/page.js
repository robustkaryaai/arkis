'use client';
import { useEffect, useMemo, useState } from 'react';
import Navbar from '@/components/Navbar';
import ChatWidget from '@/components/ChatWidget';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { getProfile } from '@/lib/api';
import { motion } from 'framer-motion';
import { StarField, Card3D, staggerContainer, fadeUp, textVariant } from '@/components/SpaceUI';

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
                const res = await getProfile(user.$id, user.email || '');
                setWaitlistRows(Array.isArray(res?.waitlist) ? res.waitlist : []);
            } catch (_) {
                const raw = localStorage.getItem('rexycore_waitlist') || '[]';
                const list = JSON.parse(raw);
                const filtered = Array.isArray(list) ? list.filter((x) => x?.userId === user.$id || x?.email === user.email) : [];
                setWaitlistRows(filtered);
            } finally {
                setWaitlistLoading(false);
            }
        };

        load();
    }, [loading, user]);

    const waitlistItems = useMemo(() => {
        return Array.isArray(waitlistRows) ? waitlistRows : [];
    }, [waitlistRows]);

    if (loading) return <div style={{ background: '#010104', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>Loading...</div>;
    if (!user) return <div style={{ background: '#010104', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>Redirecting...</div>;

    return (
        <div style={{ background: '#010104', minHeight: '100vh', color: '#fff', position: 'relative', overflowX: 'hidden' }}>
            <StarField />
            <div className="noise" aria-hidden />
            
            <Navbar />
            <div style={{ padding: '140px 20px 80px', maxWidth: '800px', margin: '0 auto', position: 'relative', zIndex: 10 }}>
                <motion.div variants={staggerContainer(0.1, 0.2)} initial="hidden" animate="show">
                    <motion.div variants={fadeUp}>
                        <Card3D orbColor="rgba(124,58,237,0.3)" style={{ padding: '48px 40px', textAlign: 'center', marginBottom: 24 }}>
                            <div style={{
                                width: '100px', height: '100px', borderRadius: '50%',
                                background: 'linear-gradient(135deg, rgba(124,58,237,0.5), rgba(37,99,235,0.5))',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontSize: '40px', fontWeight: '900', color: '#fff',
                                margin: '0 auto 20px', boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
                                border: '4px solid rgba(255,255,255,0.1)'
                            }}>
                                {user.name.charAt(0).toUpperCase()}
                            </div>
                            <h1 style={{ fontSize: '32px', fontWeight: '900', marginBottom: '8px' }}>{user.name}</h1>
                            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '16px', marginBottom: '32px' }}>{user.email}</p>

                            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '40px' }}>
                                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                    <Link href="/orders" className="btn-secondary" style={{ padding: '12px 22px', borderRadius: '99px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', textDecoration: 'none', display: 'inline-block' }}>View Orders</Link>
                                </motion.div>
                                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                    <Link href="/subscription" className="btn-secondary" style={{ padding: '12px 22px', borderRadius: '99px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', textDecoration: 'none', display: 'inline-block' }}>Manage Subscription</Link>
                                </motion.div>
                                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                    <Link href="/products" className="btn-secondary" style={{ padding: '12px 22px', borderRadius: '99px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', textDecoration: 'none', display: 'inline-block' }}>Explore Products</Link>
                                </motion.div>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', textAlign: 'left' }}>
                                <div style={{ background: 'rgba(255,255,255,0.03)', padding: '24px', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.1)' }}>
                                    <div style={{ fontSize: '11px', fontWeight: '700', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '10px' }}>Account ID</div>
                                    <div style={{ fontSize: '15px', fontFamily: 'monospace', color: '#fff' }}>{user.$id}</div>
                                </div>
                                <div style={{ background: 'rgba(255,255,255,0.03)', padding: '24px', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.1)' }}>
                                    <div style={{ fontSize: '11px', fontWeight: '700', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '10px' }}>Member Since</div>
                                    <div style={{ fontSize: '15px', color: '#fff' }}>{new Date(user.$createdAt).toLocaleDateString()}</div>
                                </div>
                            </div>
                        </Card3D>
                    </motion.div>

                    <motion.div variants={fadeUp}>
                        <Card3D orbColor="rgba(37,99,235,0.2)" style={{ padding: '32px' }}>
                            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap', marginBottom: '24px' }}>
                                <div>
                                    <div style={{ fontSize: '11px', fontWeight: '700', letterSpacing: '2px', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase' }}>Early Access</div>
                                    <h2 style={{ fontSize: '20px', fontWeight: '900', marginTop: '6px' }}>My Waitlist</h2>
                                </div>
                                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                    <Link href="/products" className="btn-secondary" style={{ padding: '10px 18px', borderRadius: '50px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', textDecoration: 'none', fontSize: 14 }}>Join Another →</Link>
                                </motion.div>
                            </div>

                            {waitlistLoading ? (
                                <div style={{ marginTop: '16px', color: 'rgba(255,255,255,0.5)', fontSize: '14px' }}>Loading…</div>
                            ) : waitlistItems.length === 0 ? (
                                <div style={{ marginTop: '16px', color: 'rgba(255,255,255,0.5)', fontSize: '14px' }}>
                                    No waitlist entries yet.
                                </div>
                            ) : (
                                <div style={{ marginTop: '8px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                    {waitlistItems.map((r) => (
                                        <div key={r.$id || r.id} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', padding: '20px' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px', flexWrap: 'wrap' }}>
                                                <div style={{ fontWeight: '800', fontSize: '16px' }}>{r.product || r.productLabel || r.productKey || 'Waitlist'}</div>
                                                <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)' }}>{new Date(r.createdAt || r.$createdAt || Date.now()).toLocaleString()}</div>
                                            </div>
                                            <div style={{ marginTop: '8px', fontSize: '14px', color: 'rgba(255,255,255,0.5)' }}>
                                                {r.email || user.email}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </Card3D>
                    </motion.div>
                </motion.div>
            </div>
            <Footer />
            <ChatWidget />
        </div>
    );
}
