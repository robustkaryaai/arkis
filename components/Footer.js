'use client';
import Link from 'next/link';

export default function Footer() {
    return (
        <footer style={{ 
            padding: '100px 5% 60px', 
            borderTop: '1px solid var(--glass-border-strong)', 
            background: 'rgba(1,1,4,0.8)',
            backdropFilter: 'blur(16px)',
            position: 'relative',
            zIndex: 10
        }}>
            <div style={{ 
                maxWidth: '1200px', 
                margin: '0 auto',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '40px',
                paddingBottom: '60px',
                borderBottom: '1px solid var(--glass-border)'
            }}>
                {/* Brand Column */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        fontSize: '28px',
                        fontWeight: '900',
                        letterSpacing: '-0.05em'
                    }}>
                        <span className="flow-text flow-text--blue">Rexycore</span>
                    </div>
                    <p style={{ color: 'var(--subtext)', fontSize: '15px', lineHeight: '1.6', maxWidth: '280px' }}>
                        Building the intelligence layer for the privacy-first era. Local by default, intelligent by design.
                    </p>
                </div>

                {/* Links Column */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <h4 style={{ color: '#fff', fontSize: '16px', fontWeight: '700' }}>Ecosystem</h4>
                    <Link href="/products/rk-ai-desktop" style={{ color: 'var(--subtext)', textDecoration: 'none', fontSize: '14px', transition: 'color 0.2s' }}>RK AI Desktop</Link>
                    <Link href="/subscription" style={{ color: 'var(--subtext)', textDecoration: 'none', fontSize: '14px', transition: 'color 0.2s' }}>RexyCore Cloud</Link>
                    <Link href="/products/lumina-os" style={{ color: 'var(--subtext)', textDecoration: 'none', fontSize: '14px', transition: 'color 0.2s' }}>Lumina OS</Link>
                    <Link href="/products/malus" style={{ color: 'var(--subtext)', textDecoration: 'none', fontSize: '14px', transition: 'color 0.2s' }}>MALUS</Link>
                    <Link href="/products/light-key" style={{ color: 'var(--subtext)', textDecoration: 'none', fontSize: '14px', transition: 'color 0.2s' }}>Light Key</Link>
                    <Link href="/products/rk-ai-home" style={{ color: 'var(--subtext)', textDecoration: 'none', fontSize: '14px', transition: 'color 0.2s' }}>RK AI Home</Link>
                </div>

                {/* Connect Column */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <h4 style={{ color: '#fff', fontSize: '16px', fontWeight: '700' }}>Connect</h4>
                    <Link href="/about" style={{ color: 'var(--subtext)', textDecoration: 'none', fontSize: '14px', transition: 'color 0.2s' }}>About Us</Link>
                    <Link href="/contact" style={{ color: 'var(--subtext)', textDecoration: 'none', fontSize: '14px', transition: 'color 0.2s' }}>Contact</Link>
                    <Link href="/academy" style={{ color: 'var(--subtext)', textDecoration: 'none', fontSize: '14px', transition: 'color 0.2s' }}>Academy</Link>
                    <a href="mailto:rexycoreofficial@gmail.com" style={{ color: 'var(--subtext)', textDecoration: 'none', fontSize: '14px', transition: 'color 0.2s' }}>rexycoreofficial@gmail.com</a>
                    <a href="https://antverse.vercel.app" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--subtext)', textDecoration: 'none', fontSize: '14px', transition: 'color 0.2s', display: 'flex', alignItems: 'center', gap: '6px' }}>Antverse <span style={{ fontSize: '10px', opacity: 0.5 }}>↗</span></a>
                </div>
            </div>

            <div style={{ 
                maxWidth: '1200px', 
                margin: '40px auto 0',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '20px'
            }}>
                <div style={{ color: 'var(--subtext)', fontSize: '13px' }}>
                    © 2026 Rexycore. All rights reserved.
                </div>
                <div style={{ display: 'flex', gap: '24px' }}>
                    <Link href="/terms" style={{ color: 'var(--subtext)', textDecoration: 'none', fontSize: '13px' }}>Terms & Conditions</Link>
                    <Link href="/privacy" style={{ color: 'var(--subtext)', textDecoration: 'none', fontSize: '13px' }}>Privacy Policy</Link>
                </div>
            </div>
        </footer>
    );
}
