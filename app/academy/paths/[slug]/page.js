'use client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ChatWidget from '@/components/ChatWidget';
import Link from 'next/link';
import { FiArrowLeft, FiClock } from 'react-icons/fi';

export default function ComingSoonPath({ params }) {
    // Basic formatting for the path name
    const pathName = params.slug 
        ? params.slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
        : 'Learning Path';

    return (
        <div style={{ background: 'var(--bg)', color: 'var(--text)', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Navbar />
            
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '120px 5%' }}>
                <div style={{ textAlign: 'center', maxWidth: '600px' }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '80px', height: '80px', borderRadius: '24px', background: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6', marginBottom: '24px' }}>
                        <FiClock size={40} />
                    </div>
                    
                    <h1 style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: '900', marginBottom: '16px' }}>
                        {pathName}
                    </h1>
                    
                    <p style={{ fontSize: '18px', color: 'var(--muted)', lineHeight: '1.6', marginBottom: '32px' }}>
                        We are currently crafting this exclusive curriculum. Check back soon or enroll in an Academy Bundle to get early access when it drops!
                    </p>
                    
                    <Link href="/academy" className="btn-secondary" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 24px', borderRadius: '100px', fontSize: '16px' }}>
                        <FiArrowLeft /> Back to Academy
                    </Link>
                </div>
            </div>

            <Footer />
            <ChatWidget />
        </div>
    );
}
