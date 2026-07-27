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
                
                <div className="reveal reveal-delay-0" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', background: 'rgba(139,92,246,0.1)', color: '#8b5cf6', borderRadius: '999px', fontSize: '13px', fontWeight: '700', marginBottom: '24px', letterSpacing: '1px', textTransform: 'uppercase' }}>
                    An operating system that understands you.
                </div>

                <h1 className="reveal reveal-delay-0" style={{ fontSize: 'clamp(40px, 6vw, 64px)', fontWeight: '900', marginBottom: '24px', lineHeight: '1.1' }}>
                    The Operating System <br /><span className="grad-lumina">Built Around AI</span>
                </h1>
                
                <p className="reveal reveal-delay-1" style={{ fontSize: '20px', color: 'var(--subtext)', lineHeight: '1.7', maxWidth: '800px', marginBottom: '60px' }}>
                    Lumina OS is RexyCore's vision for the future of personal computing—an operating system where AI is deeply integrated without compromising user control or privacy.
                    <br /><br />
                    Instead of treating AI as another application, Lumina makes intelligence a native part of the operating system. Every interaction is designed to feel fluid, contextual, and distraction-free. AI understands your workflow, assists when needed, and disappears when it isn't.
                    <br /><br />
                    <span style={{ color: 'var(--text)', fontWeight: '600' }}>At its core, Lumina follows one philosophy: Your computer should adapt to you—not the other way around.</span>
                </p>

                <div className="reveal reveal-delay-2" style={{ background: 'var(--glass)', border: '1px solid var(--glass-border)', borderRadius: '24px', padding: '40px', marginBottom: '40px' }}>
                    <h2 style={{ fontSize: '28px', fontWeight: '800', marginBottom: '24px' }}>Key Features</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
                        {[
                            'AI-native desktop experience',
                            'Privacy-first architecture',
                            'Offline-first capabilities',
                            'Modular RexyCore ecosystem integration',
                            'Intelligent workflow optimization',
                            'Clean, distraction-free interface',
                            'Full user control over AI behavior'
                        ].map((feature, i) => (
                            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '16px', color: 'var(--text)' }}>
                                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#8b5cf6', boxShadow: '0 0 10px #8b5cf6' }} />
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
