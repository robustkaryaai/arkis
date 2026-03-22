'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ChatWidget from '@/components/ChatWidget';

export default function TheoryPage() {
    return (
        <div style={{ background: 'var(--background)', color: 'var(--text)', minHeight: '100vh' }}>
            <Navbar />

            <main style={{ maxWidth: '720px', margin: '0 auto', padding: '120px 5% 80px' }}>
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
                        fontSize: 'clamp(28px, 5vw, 40px)',
                        fontWeight: '800',
                        lineHeight: 1.2,
                        marginBottom: '24px',
                    }}
                >
                    Local first. <span className="grad">You in control.</span>
                </h1>
                <div
                    style={{
                        fontSize: '1.05rem',
                        lineHeight: 1.75,
                        color: 'var(--muted)',
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
