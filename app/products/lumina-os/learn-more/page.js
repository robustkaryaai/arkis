'use client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ChatWidget from '@/components/ChatWidget';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function LuminaOSLearnMore() {
    return (
        <div style={{ background: 'var(--void)', minHeight: '100vh', color: 'var(--text)' }}>
            <Navbar />
            
            <main style={{ paddingTop: '120px', paddingBottom: '80px', maxWidth: '1100px', margin: '0 auto', paddingLeft: '4%', paddingRight: '4%' }}>
                <Link href="/products/lumina-os" style={{ color: '#8b5cf6', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '40px', fontWeight: '600' }}>
                    ← Back to Lumina OS
                </Link>
                
                <h1 className="reveal reveal-delay-0" style={{ fontSize: 'clamp(40px, 6vw, 64px)', fontWeight: '900', marginBottom: '24px' }}>
                    Lumina OS: <span className="grad-lumina">Deep Dive</span>
                </h1>
                
                <p className="reveal reveal-delay-1" style={{ fontSize: '20px', color: 'var(--subtext)', lineHeight: '1.7', maxWidth: '800px', marginBottom: '60px' }}>
                    [Placeholder Overview: Detailed description goes here. Waiting for user context.]
                </p>

                <div className="reveal reveal-delay-2" style={{ background: 'var(--glass)', border: '1px solid var(--glass-border)', borderRadius: '24px', padding: '40px', marginBottom: '40px' }}>
                    <h2 style={{ fontSize: '28px', fontWeight: '800', marginBottom: '20px' }}>Key Capabilities</h2>
                    <p style={{ color: 'var(--subtext)', lineHeight: '1.6' }}>[Placeholder content: List of features, technical specs, etc.]</p>
                </div>

                <div className="reveal reveal-delay-3" style={{ background: 'var(--glass)', border: '1px solid var(--glass-border)', borderRadius: '24px', padding: '40px' }}>
                    <h2 style={{ fontSize: '28px', fontWeight: '800', marginBottom: '20px' }}>How it Works</h2>
                    <p style={{ color: 'var(--subtext)', lineHeight: '1.6' }}>[Placeholder content: Architecture, privacy mechanics, user flow.]</p>
                </div>
            </main>

            <Footer />
            <ChatWidget />
        </div>
    );
}
