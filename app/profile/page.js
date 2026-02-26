'use client';
import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import ChatWidget from '@/components/ChatWidget';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

export default function Profile() {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
            router.push('/login?redirect=/profile');
        }
    }, [loading, user, router]);

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
            </div>
            <Footer />
            <ChatWidget />
        </div>
    );
}
