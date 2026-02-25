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
                    }}>ARKIS</span>
                </div>
                
                <div style={{ 
                    display: 'flex', 
                    justifyContent: 'center', 
                    gap: '32px', 
                    marginBottom: '32px',
                    flexWrap: 'wrap'
                }}>
                    <Link href="/" style={{ color: 'var(--muted)', textDecoration: 'none', fontSize: '14px', fontWeight: '600' }}>Home</Link>
                    <Link href="/products" style={{ color: 'var(--muted)', textDecoration: 'none', fontSize: '14px', fontWeight: '600' }}>Products</Link>
                    <Link href="/about" style={{ color: 'var(--muted)', textDecoration: 'none', fontSize: '14px', fontWeight: '600' }}>About</Link>
                    <Link href="/contact" style={{ color: 'var(--muted)', textDecoration: 'none', fontSize: '14px', fontWeight: '600' }}>Contact</Link>
                    <Link href="/login" style={{ color: 'var(--muted)', textDecoration: 'none', fontSize: '14px', fontWeight: '600' }}>Account</Link>
                </div>

                <div style={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    gap: '12px',
                    alignItems: 'center'
                }}>
                    <a href="mailto:arkisglobal.official@gmail.com" style={{ 
                        color: 'var(--blue)', 
                        textDecoration: 'none', 
                        fontSize: '14px',
                        fontWeight: '600'
                    }}>
                        arkisglobal.official@gmail.com
                    </a>
                    <p style={{ color: 'var(--muted)', fontSize: '13px', opacity: 0.8 }}>
                        © 2026 ARKIS. All rights reserved. Built for the local AI era.
                    </p>
                </div>
            </div>
        </footer>
    );
}
