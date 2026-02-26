'use client';
import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import ChatWidget from '@/components/ChatWidget';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

export default function Subscription() {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
            router.push('/login?redirect=/subscription');
        }
    }, [loading, user, router]);

    if (loading) {
        return <div style={{ background: 'var(--background)', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text)' }}>Loading...</div>;
    }

    if (!user) {
        return <div style={{ background: 'var(--background)', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text)' }}>Redirecting...</div>;
    }

    return (
        <div style={{ background: 'var(--background)', minHeight: '100vh', color: 'var(--text)' }}>
            <Navbar />
            <div style={{ padding: '120px 20px 60px', maxWidth: '1000px', margin: '0 auto' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px' }}>
                    <div>
                        <h1 style={{ fontSize: '40px', fontWeight: '800', marginBottom: '12px' }}>Subscription</h1>
                        <p style={{ color: 'var(--muted)' }}>Manage your ARKIS ecosystem plans and billing.</p>
                    </div>
                    <Link href="/products" className="nav-cta" style={{ borderRadius: '50px', padding: '10px 24px', fontSize: '14px' }}>View All Plans</Link>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
                    <div style={{
                        background: 'var(--surface)', border: '2px solid var(--blue)',
                        borderRadius: '24px', padding: '32px', position: 'relative',
                        boxShadow: '0 10px 40px rgba(79, 156, 249, 0.1)'
                    }}>
                        <div style={{
                            position: 'absolute', top: '20px', right: '20px',
                            background: 'var(--blue)', color: '#fff', fontSize: '10px',
                            fontWeight: '800', padding: '4px 12px', borderRadius: '50px'
                        }}>ACTIVE</div>
                        <div style={{ fontSize: '12px', fontWeight: '700', color: 'var(--blue)', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '10px' }}>FREE TIER</div>
                        <h2 style={{ fontSize: '28px', fontWeight: '800', marginBottom: '8px' }}>Personal</h2>
                        <p style={{ color: 'var(--muted)', fontSize: '14px', marginBottom: '24px' }}>Base personal assistant access.</p>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px' }}>
                            <div style={{ fontSize: '14px', display: 'flex', gap: '10px' }}>✅ Voice AI Assistant</div>
                            <div style={{ fontSize: '14px', display: 'flex', gap: '10px' }}>✅ Local LLM Support</div>
                            <div style={{ fontSize: '14px', display: 'flex', gap: '10px' }}>✅ 500 MB Storage</div>
                        </div>

                        <button disabled style={{
                            width: '100%', background: 'rgba(255,255,255,0.05)',
                            border: '1px solid var(--border)', borderRadius: '12px',
                            padding: '14px', color: 'var(--muted)', fontWeight: '700', cursor: 'default'
                        }}>Current Plan</button>
                    </div>

                    <div style={{
                        background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border)',
                        borderRadius: '24px', padding: '32px', display: 'flex',
                        flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
                        textAlign: 'center'
                    }}>
                        <div style={{ fontSize: '32px', marginBottom: '16px' }}>🚀</div>
                        <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '8px' }}>Upgrade to Student or Pro</h3>
                        <p style={{ color: 'var(--muted)', fontSize: '13px', marginBottom: '24px' }}>Unlock PPT/DOCX generation, AI video, and high-priority processing.</p>
                        <Link href="/products" style={{ color: 'var(--blue)', fontWeight: '700', textDecoration: 'none', fontSize: '14px' }}>Explore Premium Tiers →</Link>
                    </div>
                </div>
            </div>
            <Footer />
            <ChatWidget />
        </div>
    );
}
