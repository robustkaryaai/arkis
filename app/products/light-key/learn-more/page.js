'use client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ChatWidget from '@/components/ChatWidget';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function LightKeyLearnMore() {
    return (
        <div style={{ background: 'var(--void)', minHeight: '100vh', color: 'var(--text)' }}>
            <Navbar />
            
            <main style={{ paddingTop: '120px', paddingBottom: '80px', maxWidth: '1100px', margin: '0 auto', paddingLeft: '4%', paddingRight: '4%' }}>
                <Link href="/products/light-key" style={{ color: '#f59e0b', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '40px', fontWeight: '600' }}>
                    ← Back to Light Key
                </Link>
                
                <div className="reveal reveal-delay-0" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', background: 'rgba(245,158,11,0.1)', color: '#f59e0b', borderRadius: '999px', fontSize: '13px', fontWeight: '700', marginBottom: '24px', letterSpacing: '1px', textTransform: 'uppercase' }}>
                    One identity. Infinite possibilities.
                </div>

                <h1 className="reveal reveal-delay-0" style={{ fontSize: 'clamp(40px, 6vw, 64px)', fontWeight: '900', marginBottom: '24px', lineHeight: '1.1' }}>
                    One Identity. <br /><span className="grad-lightkey">Every RexyCore Product.</span>
                </h1>
                
                <p className="reveal reveal-delay-1" style={{ fontSize: '20px', color: 'var(--subtext)', lineHeight: '1.7', maxWidth: '800px', marginBottom: '60px' }}>
                    Light Key is the unified identity platform powering the RexyCore ecosystem. It provides secure authentication across every RexyCore service while keeping the experience simple.
                    <br /><br />
                    One account gives users seamless access to RK AI Desktop, RK AI Home, Lumina OS, MALUS, DinoX, and every future RexyCore product. Light Key is designed around modern security without sacrificing convenience.
                </p>

                <div className="reveal reveal-delay-2" style={{ background: 'var(--glass)', border: '1px solid var(--glass-border)', borderRadius: '24px', padding: '40px', marginBottom: '40px' }}>
                    <h2 style={{ fontSize: '28px', fontWeight: '800', marginBottom: '24px' }}>Features</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
                        {[
                            'Single Sign-On across RexyCore',
                            'Secure authentication',
                            'Device management',
                            'Session synchronization',
                            'Privacy-focused account system',
                            'Future-ready ecosystem integration'
                        ].map((feature, i) => (
                            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '16px', color: 'var(--text)' }}>
                                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#f59e0b', boxShadow: '0 0 10px #f59e0b' }} />
                                {feature}
                            </div>
                        ))}
                    </div>
                </div>
            </main>

            <Footer />
            <ChatWidget />
        </div>
    );
}
