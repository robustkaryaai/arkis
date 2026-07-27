'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ChatWidget from '@/components/ChatWidget';

export default function TheoryPage() {
    return (
        <div style={{ background: 'var(--void)', color: '#fff', minHeight: '100vh', position: 'relative', overflowX: 'hidden' }}>
            <div className="noise" aria-hidden />
            <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', background: 'radial-gradient(circle at 50% 10%, rgba(59,130,246,0.1) 0%, transparent 60%)' }} />

            <Navbar />

            <main style={{ maxWidth: '720px', margin: '0 auto', padding: '140px 5% 80px', position: 'relative', zIndex: 10 }}>
                <p
                    style={{
                        fontSize: '11px',
                        fontWeight: '800',
                        letterSpacing: '3px',
                        color: 'var(--blue)',
                        marginBottom: '16px',
                    }}
                >
                    REXYCORE
                </p>
                <h1
                    style={{
                        fontSize: 'clamp(32px, 6vw, 48px)',
                        fontWeight: '900',
                        lineHeight: 1.1,
                        marginBottom: '24px',
                        letterSpacing: '-1px'
                    }}
                >
                    Local first. <span className="flow-text flow-text--blue">You in control.</span>
                </h1>
                <div
                    style={{
                        fontSize: '18px',
                        lineHeight: 1.75,
                        color: 'var(--subtext)',
                    }}
                >
                    <p style={{ marginBottom: '20px' }}>
                        RexyCore builds assistants and systems that default to privacy: your voice and data stay
                        on your device whenever possible, with the cloud as an optional boost — not the owner of
                        your experience.
                    </p>
                    <p style={{ margin: 0 }}>
                        That is the idea in one line: powerful AI without giving up the room you live in.
                    </p>
                </div>
            </main>

            <Footer />
            <ChatWidget />
        </div>
    );
}
