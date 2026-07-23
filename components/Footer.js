'use client';
import Link from 'next/link';

export default function Footer() {
    return (
        <footer style={{ 
            padding: '80px 5% 40px', 
            borderTop: '1px solid var(--border)', 
            textAlign: 'center',
            background: 'var(--background)',
            position: 'relative',
            zIndex: 10
        }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                <div style={{ 
                    display: 'flex', 
                    justifyContent: 'center', 
                    alignItems: 'center', 
                    gap: '10px',
                    marginBottom: '24px',
                    fontSize: '24px',
                    fontWeight: '800',
                    letterSpacing: '-1px'
                }}>
                    <span style={{ 
                        background: 'linear-gradient(135deg, var(--blue), var(--violet))',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                    }}>Rexycore</span>
                </div>

                <div style={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    gap: '12px',
                    alignItems: 'center'
                }}>
                    <a href="mailto:rexycoreofficial@gmail.com" style={{ 
                        color: 'var(--blue)', 
                        textDecoration: 'none', 
                        fontSize: '14px',
                        fontWeight: '600'
                    }}>
                        rexycoreofficial@gmail.com
                    </a>
                    <div style={{ display: 'flex', gap: '16px', color: 'var(--muted)', fontSize: '13px', opacity: 0.8 }}>
                        <span>© 2026 Rexycore. All rights reserved.</span>
                        <span>•</span>
                        <Link href="/terms" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Terms & Conditions</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
