'use client';
import Navbar from '@/components/Navbar';
import ChatWidget from '@/components/ChatWidget';

export default function Orders() {
    return (
        <div style={{ background: 'var(--background)', minHeight: '100vh', color: 'var(--text)' }}>
            <Navbar />
            <div style={{ padding: '120px 20px 60px', maxWidth: '800px', margin: '0 auto' }}>
                <h1 style={{ fontSize: '40px', fontWeight: '800', marginBottom: '12px' }}>Order History</h1>
                <p style={{ color: 'var(--muted)', marginBottom: '40px' }}>Manage your purchases and hardware orders.</p>

                <div style={{
                    background: 'var(--surface)', border: '1px solid var(--border)',
                    borderRadius: '24px', padding: '60px', textAlign: 'center'
                }}>
                    <div style={{ fontSize: '48px', marginBottom: '20px' }}>📦</div>
                    <h3 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '8px' }}>No orders yet</h3>
                    <p style={{ color: 'var(--muted)', fontSize: '14px' }}>When you purchase ARKIS hardware or services, they will appear here.</p>
                </div>
            </div>
            <ChatWidget />
        </div>
    );
}
