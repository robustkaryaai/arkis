'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';
import { account } from '@/lib/appwrite';

export default function Navbar() {
    const path = usePathname();
    const [user, setUser] = useState(null);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const isActive = (href) => path === href ? 'active' : '';

    useEffect(() => {
        checkUser();

        // Close dropdown when clicking outside
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const checkUser = async () => {
        try {
            const session = await account.get();
            setUser(session);
        } catch (error) {
            setUser(null);
        }
    };

    const handleLogout = async () => {
        try {
            await account.deleteSession('current');
            setUser(null);
            window.location.href = '/';
        } catch (error) {
            console.error('Logout failed', error);
        }
    };

    return (
        <nav style={{ position: 'relative' }}>
            <Link className="nav-logo" href="/"><span>ARKIS</span></Link>
            <ul className="nav-links">
                <li><Link href="/" className={isActive('/')}>Home</Link></li>
                <li><Link href="/products" className={isActive('/products')}>Products</Link></li>
                <li><Link href="/about" className={isActive('/about')}>About</Link></li>
                <li><Link href="/contact" className={isActive('/contact')}>Contact</Link></li>
            </ul>

            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                {user ? (
                    <div style={{ position: 'relative' }} ref={dropdownRef}>
                        <button
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                            style={{
                                display: 'flex', alignItems: 'center', gap: '10px',
                                background: 'none', border: 'none', cursor: 'pointer',
                                padding: '4px', borderRadius: '50px',
                                transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                                border: `1px solid ${dropdownOpen ? 'var(--blue)' : 'transparent'}`,
                                background: dropdownOpen ? 'rgba(79, 156, 249, 0.1)' : 'transparent'
                            }}
                        >
                            <div style={{
                                width: '34px', height: '34px', borderRadius: '50%',
                                background: 'linear-gradient(135deg, var(--blue), var(--violet))',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontSize: '13px', fontWeight: '800', color: '#fff',
                                boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                                border: '2px solid rgba(255,255,255,0.1)'
                            }}>
                                {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                            </div>
                        </button>

                        {/* PREMIUM GOOGLE-STYLE DROPDOWN */}
                        {dropdownOpen && (
                            <div style={{
                                position: 'absolute', top: '50px', right: '0',
                                width: '280px', background: 'rgba(15, 15, 25, 0.98)',
                                backdropFilter: 'blur(20px)', border: '1px solid var(--border)',
                                borderRadius: '24px', padding: '16px',
                                boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
                                zIndex: 1000, display: 'flex', flexDirection: 'column',
                                animation: 'scale-up 0.2s cubic-bezier(0.16, 1, 0.3, 1) both'
                            }}>
                                {/* User Info Summary */}
                                <div style={{
                                    display: 'flex', flexDirection: 'column', alignItems: 'center',
                                    padding: '12px 8px 16px', borderBottom: '1px solid var(--border)',
                                    marginBottom: '12px', textAlign: 'center'
                                }}>
                                    <div style={{
                                        width: '64px', height: '64px', borderRadius: '50%',
                                        background: 'linear-gradient(135deg, var(--blue), var(--violet))',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        fontSize: '24px', fontWeight: '800', color: '#fff',
                                        marginBottom: '10px', boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
                                        border: '3px solid rgba(255,255,255,0.1)'
                                    }}>
                                        {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                                    </div>
                                    <div style={{ fontSize: '16px', fontWeight: '700', color: 'var(--text)', marginBottom: '2px' }}>{user.name}</div>
                                    <div style={{ fontSize: '13px', color: 'var(--muted)', fontWeight: '400', wordBreak: 'break-all' }}>{user.email}</div>
                                </div>

                                {/* Menu Items */}
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                    <Link href="/profile" onClick={() => setDropdownOpen(false)} style={{ padding: '12px', borderRadius: '12px', color: 'var(--text)', textDecoration: 'none', fontSize: '14px', transition: 'background 0.2s', display: 'flex', alignItems: 'center', gap: '12px' }} onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'} onMouseLeave={e => e.currentTarget.style.background = 'none'}>
                                        <span style={{ fontSize: '18px' }}>👤</span> Manage Account
                                    </Link>
                                    <Link href="/orders" onClick={() => setDropdownOpen(false)} style={{ padding: '12px', borderRadius: '12px', color: 'var(--text)', textDecoration: 'none', fontSize: '14px', transition: 'background 0.2s', display: 'flex', alignItems: 'center', gap: '12px' }} onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'} onMouseLeave={e => e.currentTarget.style.background = 'none'}>
                                        <span style={{ fontSize: '18px' }}>📦</span> Order History
                                    </Link>
                                    <Link href="/products#pricing" onClick={() => setDropdownOpen(false)} style={{ padding: '12px', borderRadius: '12px', color: 'var(--text)', textDecoration: 'none', fontSize: '14px', transition: 'background 0.2s', display: 'flex', alignItems: 'center', gap: '12px' }} onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'} onMouseLeave={e => e.currentTarget.style.background = 'none'}>
                                        <span style={{ fontSize: '18px' }}>💎</span> Subscriptions
                                    </Link>
                                </div>

                                <div style={{ height: '1px', background: 'var(--border)', margin: '12px 0' }}></div>

                                <button onClick={handleLogout} style={{
                                    padding: '12px', borderRadius: '12px', color: '#ff4d4d',
                                    background: 'rgba(255, 77, 77, 0.05)', border: '1px solid rgba(255, 77, 77, 0.1)',
                                    textAlign: 'center', cursor: 'pointer', fontSize: '14px', fontWeight: '700',
                                    transition: 'all 0.2s', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px'
                                }} onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255, 77, 77, 0.1)'; e.currentTarget.style.borderColor = 'rgba(255, 77, 77, 0.2)'; }} onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255, 77, 77, 0.05)'; e.currentTarget.style.borderColor = 'rgba(255, 77, 77, 0.1)'; }}>
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <Link className="nav-cta" href="/login">Login</Link>
                )}
            </div>
        </nav>
    );
}
