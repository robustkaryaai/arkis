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
import { StarField, Card3D, staggerContainer, textVariant, fadeUp } from '@/components/SpaceUI';
import { FiPackage, FiArrowRight, FiClock, FiCheckCircle } from 'react-icons/fi';

const VP = { once: false, amount: 0.1 };

const STATUS_COLOR = {
  submitted: '#a5b4fc',
  confirmed: '#6ee7b7',
  shipped: '#7dd3fc',
  delivered: '#4ade80',
  pending: '#fcd34d',
  cancelled: '#f87171',
};

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
    return orders.filter(o => !o.email || o.email === user.email);
  }, [orders, user]);

  if (loading) {
    return (
      <div style={{ background: '#010104', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
        <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1.5 }} style={{ fontSize: 14, color: 'rgba(255,255,255,0.4)' }}>Loading…</motion.div>
      </div>
    );
  }

  if (!user) {
    return <div style={{ background: '#010104', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>Redirecting…</div>;
  }

  return (
    <div style={{ background: '#010104', minHeight: '100vh', color: '#fff', position: 'relative', overflowX: 'hidden' }}>
      <StarField />
      <div className="noise" aria-hidden />
      <Navbar />

      <div style={{ padding: '140px 5% 80px', maxWidth: '860px', margin: '0 auto', position: 'relative', zIndex: 10 }}>

        {/* Header */}
        <motion.div variants={staggerContainer(0.1, 0.1)} initial="hidden" whileInView="show" viewport={VP} style={{ marginBottom: 48 }}>
          <motion.div variants={fadeUp} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 18px', borderRadius: 99, border: '1px solid rgba(99,102,241,0.25)', background: 'rgba(99,102,241,0.07)', marginBottom: 24 }}>
            <FiPackage size={12} color="#818cf8" />
            <span style={{ fontSize: 12, fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase', color: '#818cf8' }}>My Orders</span>
          </motion.div>
          <motion.h1 variants={textVariant(0)} style={{ fontSize: 'clamp(36px, 6vw, 56px)', fontWeight: 900, letterSpacing: '-2px', lineHeight: 1.05, marginBottom: 12 }}>
            Order{' '}
            <span style={{ background: 'linear-gradient(90deg, #818cf8, #a5b4fc, #818cf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>History</span>
          </motion.h1>
          <motion.p variants={fadeUp} style={{ color: 'rgba(255,255,255,0.4)', fontSize: 17 }}>
            Manage your purchases and hardware orders.
          </motion.p>
          {remoteLoading && (
            <motion.div variants={fadeUp} style={{ marginTop: 16, display: 'flex', alignItems: 'center', gap: 8, color: 'rgba(255,255,255,0.3)', fontSize: 13 }}>
              <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }} style={{ width: 12, height: 12, borderRadius: '50%', border: '1.5px solid rgba(99,102,241,0.5)', borderTopColor: '#818cf8' }} />
              Syncing orders…
            </motion.div>
          )}
        </motion.div>

        {myOrders.length === 0 ? (
          <motion.div initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={VP} transition={{ duration: 0.7 }}>
            <Card3D orbColor="rgba(99,102,241,0.2)">
              <div style={{ padding: '64px', textAlign: 'center' }}>
                <motion.div animate={{ y: [0, -8, 0] }} transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
                  style={{ fontSize: 56, marginBottom: 20 }}>📦</motion.div>
                <h3 style={{ fontSize: '24px', fontWeight: '800', marginBottom: '10px' }}>No orders yet</h3>
                <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '15px', lineHeight: 1.7, marginBottom: 32 }}>
                  Place a pre-order or subscribe to see your order history here.
                </p>
                <Link href="/products/rk-ai-home" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '13px 28px', borderRadius: 99, background: '#fff', color: '#000', fontWeight: 800, fontSize: 14, textDecoration: 'none' }}>
                  Go to RK AI Home <FiArrowRight size={14} />
                </Link>
              </div>
            </Card3D>
          </motion.div>
        ) : (
          <motion.div variants={staggerContainer(0.07, 0.2)} initial="hidden" whileInView="show" viewport={VP}
            style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {myOrders.map((o, i) => {
              const statusColor = STATUS_COLOR[o.status?.toLowerCase()] || '#a5b4fc';
              return (
                <motion.div key={o.id} variants={fadeUp}>
                  <Card3D orbColor={`${statusColor}18`}>
                    <div style={{ padding: '28px 32px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px', flexWrap: 'wrap', alignItems: 'flex-start', marginBottom: 16 }}>
                        <div>
                          <div style={{ fontWeight: '800', fontSize: '18px', marginBottom: 4 }}>{o.productName || o.productId || 'Order'}</div>
                          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '3px 10px', borderRadius: 99, background: `${statusColor}15`, border: `1px solid ${statusColor}30`, fontSize: 11, fontWeight: 800, color: statusColor, textTransform: 'uppercase', letterSpacing: 1 }}>
                            <FiCheckCircle size={10} /> {o.status || 'Pending'}
                          </div>
                        </div>
                        <div style={{ fontWeight: '900', color: statusColor, fontSize: '20px' }}>{o.price || '₹—'}</div>
                      </div>
                      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', color: 'rgba(255,255,255,0.35)', fontSize: '13px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                          <FiClock size={12} />
                          {o.createdAt ? new Date(o.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : '—'}
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                          <FiPackage size={12} />
                          {o.kind === 'preorder' ? 'Pre-order' : 'Order'} · <span style={{ fontFamily: 'monospace', fontSize: 11 }}>{o.id?.slice(0, 12)}…</span>
                        </div>
                      </div>
                    </div>
                  </Card3D>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </div>

      <Footer />
      <ChatWidget />
    </div>
  );
}
