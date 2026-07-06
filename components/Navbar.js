'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';
import { useAuth } from '@/context/AuthContext';

export default function Navbar() {
    const path = usePathname();
    const { user, logout } = useAuth();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const dropdownRef = useRef(null);
    const mobileMenuRef = useRef(null);
    const isActive = (href) => path === href ? 'active' : '';

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
            if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target) && !event.target.closest('.hamburger')) {
                setMobileMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Close mobile menu when path changes
    useEffect(() => {
        setMobileMenuOpen(false);
    }, [path]);

    const handleLogout = async () => {
        try {
            await logout();
            window.location.href = '/';
        } catch (error) {
            console.error('Logout failed', error);
        }
    };

    return (
        <nav style={{ 
            position: 'fixed', 
            top: 0, 
            left: 0, 
            right: 0, 
            zIndex: 1000, 
            background: 'rgba(7, 7, 15, 0.95)',
            backdropFilter: 'blur(10px)',
            borderBottom: '1px solid var(--border)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '0 5%',
            height: '70px'
        }}>
            <Link className="nav-logo" href="/" style={{ zIndex: 1001, minWidth: 'fit-content' }}>
                <span style={{
                    fontSize: '24px',
                    fontWeight: '800',
                    letterSpacing: '-1px',
                    background: 'linear-gradient(115deg, #ff8500, #ffffff, #13bb1a)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    textShadow: '0 0 18px rgba(255, 133, 0, 0.12)',
                }}>Rexycore</span>
            </Link>

            {/* Desktop Links */}
            <ul className="nav-links desktop-only" style={{ 
                display: 'flex', 
                gap: '30px', 
                listStyle: 'none',
                margin: 0,
                padding: 0
            }}>
                <li><Link href="/" className={isActive('/')}>Home</Link></li>
                <li><Link href="/products" className={isActive('/products')}>Products</Link></li>
                <li><Link href="/about" className={isActive('/about')}>About</Link></li>
                
                <li><Link href="/contact" className={isActive('/contact')}>Contact</Link></li>
            </ul>

            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                {user ? (
                    <div className="desktop-only" style={{ position: 'relative' }} ref={dropdownRef}>
                        <button
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                            style={{
                                display: 'flex', alignItems: 'center', gap: '10px',
                                background: 'none', border: 'none', cursor: 'pointer',
                                padding: '4px', borderRadius: '50px',
                                transition: 'all 0.2s',
                                border: `1px solid ${dropdownOpen ? 'var(--blue)' : 'transparent'}`,
                                background: dropdownOpen ? 'rgba(79, 156, 249, 0.1)' : 'transparent'
                            }}
                        >
                            <div style={{
                                width: '34px', height: '34px', borderRadius: '50%',
                                background: 'linear-gradient(135deg, var(--blue), var(--violet))',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontSize: '13px', fontWeight: '800', color: '#fff'
                            }}>
                                {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                            </div>
                        </button>

                        {dropdownOpen && (
                            <div style={{
                                position: 'absolute', top: '50px', right: '0',
                                width: '240px', background: 'rgba(7, 7, 15, 0.98)',
                                backdropFilter: 'blur(20px)', border: '1px solid var(--border)',
                                borderRadius: '20px', padding: '12px',
                                boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
                                zIndex: 1000
                            }}>
                                <div style={{ padding: '8px 12px', borderBottom: '1px solid var(--border)', marginBottom: '8px' }}>
                                    <p style={{ margin: 0, fontWeight: '700', fontSize: '14px' }}>{user.name || 'User'}</p>
                                    <p style={{ margin: 0, fontSize: '12px', color: 'var(--muted)' }}>{user.email}</p>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', padding: '6px 6px 10px' }}>
                                    <Link
                                        href="/profile"
                                        style={{
                                            padding: '10px 10px',
                                            borderRadius: '12px',
                                            textDecoration: 'none',
                                            color: 'var(--text)',
                                            fontSize: '14px',
                                            fontWeight: '600',
                                            background: 'rgba(255,255,255,0.02)',
                                            border: '1px solid var(--border)',
                                        }}
                                    >
                                        Profile
                                    </Link>
                                    <Link
                                        href="/orders"
                                        style={{
                                            padding: '10px 10px',
                                            borderRadius: '12px',
                                            textDecoration: 'none',
                                            color: 'var(--text)',
                                            fontSize: '14px',
                                            fontWeight: '600',
                                            background: 'rgba(255,255,255,0.02)',
                                            border: '1px solid var(--border)',
                                        }}
                                    >
                                        Orders
                                    </Link>
                                    <Link
                                        href="/subscription"
                                        style={{
                                            padding: '10px 10px',
                                            borderRadius: '12px',
                                            textDecoration: 'none',
                                            color: 'var(--text)',
                                            fontSize: '14px',
                                            fontWeight: '600',
                                            background: 'rgba(255,255,255,0.02)',
                                            border: '1px solid var(--border)',
                                        }}
                                    >
                                        RexyCore Cloud
                                    </Link>
                                </div>
                                <button 
                                    onClick={handleLogout}
                                    style={{ 
                                        width: '100%', padding: '10px', textAlign: 'left',
                                        background: 'none', border: 'none', color: '#ef4444',
                                        cursor: 'pointer', fontSize: '14px', fontWeight: '600'
                                    }}
                                >
                                    Sign Out
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <Link href="/login" className="btn-primary desktop-only" style={{ padding: '8px 20px', fontSize: '14px' }}>Login</Link>
                )}

                {/* Hamburger Menu Toggle */}
                <button 
                    className="hamburger"
                    type="button"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    aria-expanded={mobileMenuOpen}
                    aria-label="Toggle navigation menu"
                >
                    <span className={mobileMenuOpen ? 'hamburger-line active top' : 'hamburger-line top'} />
                    <span className={mobileMenuOpen ? 'hamburger-line active middle' : 'hamburger-line middle'} />
                    <span className={mobileMenuOpen ? 'hamburger-line active bottom' : 'hamburger-line bottom'} />
                </button>
            </div>

            {/* Mobile Menu Overlay Background */}
            {mobileMenuOpen && (
                <div 
                    className="mobile-menu-overlay"
                    onClick={() => setMobileMenuOpen(false)}
                />
            )}

            {/* Mobile Menu */}
            <div 
                ref={mobileMenuRef}
                className={mobileMenuOpen ? 'mobile-menu mobile-menu-open' : 'mobile-menu'}
            >
                <Link href="/" className={isActive('/')} style={{ fontSize: '20px', fontWeight: '700', textDecoration: 'none', color: isActive('/') ? 'var(--blue)' : 'var(--text)' }}>Home</Link>
                <Link href="/products" className={isActive('/products')} style={{ fontSize: '20px', fontWeight: '700', textDecoration: 'none', color: isActive('/products') ? 'var(--blue)' : 'var(--text)' }}>Products</Link>
                <Link href="/about" className={isActive('/about')} style={{ fontSize: '20px', fontWeight: '700', textDecoration: 'none', color: isActive('/about') ? 'var(--blue)' : 'var(--text)' }}>About</Link>
                <Link href="/contact" className={isActive('/contact')} style={{ fontSize: '20px', fontWeight: '700', textDecoration: 'none', color: isActive('/contact') ? 'var(--blue)' : 'var(--text)' }}>Contact</Link>
                {user ? (
                    <>
                        <div style={{ height: '1px', background: 'var(--border)', margin: '10px 0' }} />
                        <Link href="/profile" style={{ fontSize: '18px', fontWeight: '700', textDecoration: 'none', color: isActive('/profile') ? 'var(--blue)' : 'var(--text)' }}>Profile</Link>
                        <Link href="/orders" style={{ fontSize: '18px', fontWeight: '700', textDecoration: 'none', color: isActive('/orders') ? 'var(--blue)' : 'var(--text)' }}>Orders</Link>
                        <Link href="/subscription" style={{ fontSize: '18px', fontWeight: '700', textDecoration: 'none', color: isActive('/subscription') ? 'var(--blue)' : 'var(--text)' }}>RexyCore Cloud</Link>
                        <button
                            onClick={handleLogout}
                            style={{
                                marginTop: '18px',
                                padding: '14px',
                                textAlign: 'center',
                                background: 'rgba(239, 68, 68, 0.12)',
                                borderRadius: '50px',
                                border: '1px solid rgba(239, 68, 68, 0.25)',
                                color: '#ef4444',
                                fontWeight: '800',
                                cursor: 'pointer',
                                fontSize: '14px',
                                fontFamily: 'inherit'
                            }}
                        >
                            Sign Out
                        </button>
                    </>
                ) : (
                    <Link href="/login" style={{ marginTop: '20px', padding: '14px', textAlign: 'center', background: 'var(--blue)', borderRadius: '50px', textDecoration: 'none', color: '#fff', fontWeight: '800' }}>Login</Link>
                )}
            </div>

            <style jsx>{`
                .hamburger {
                    display: none;
                    align-items: center;
                    justify-content: center;
                    width: 48px;
                    height: 48px;
                    border-radius: 16px;
                    background: rgba(255, 255, 255, 0.08);
                    border: 1px solid rgba(255, 255, 255, 0.12);
                    box-shadow: 0 18px 36px rgba(0, 0, 0, 0.15);
                    padding: 10px;
                    cursor: pointer;
                    transition: background 0.2s ease, transform 0.2s ease;
                }

                .hamburger:hover {
                    background: rgba(255, 255, 255, 0.12);
                    transform: translateY(-1px);
                }

                .hamburger-line {
                    display: block;
                    width: 22px;
                    height: 2px;
                    background: var(--text);
                    border-radius: 999px;
                    transition: transform 0.3s ease, opacity 0.3s ease;
                }

                .hamburger-line + .hamburger-line {
                    margin-top: 6px;
                }

                .hamburger-line.active.top {
                    transform: translateY(8px) rotate(45deg);
                }

                .hamburger-line.active.middle {
                    opacity: 0;
                }

                .hamburger-line.active.bottom {
                    transform: translateY(-8px) rotate(-45deg);
                }

                .mobile-menu-overlay {
                    position: fixed;
                    inset: 0;
                    background: rgba(0, 0, 0, 0.55);
                    backdrop-filter: blur(4px);
                    z-index: 999;
                }

                .mobile-menu {
                    position: fixed;
                    top: 0;
                    right: 0;
                    bottom: 0;
                    width: 100%;
                    max-width: 320px;
                    background: rgba(7, 7, 15, 0.98);
                    border-left: 1px solid rgba(255,255,255,0.08);
                    padding: 100px 36px 32px;
                    display: flex;
                    flex-direction: column;
                    gap: 24px;
                    transform: translateX(100%);
                    transition: transform 0.28s cubic-bezier(0.22, 1, 0.36, 1);
                    z-index: 1000;
                    overflow-y: auto;
                    backdrop-filter: blur(14px);
                }

                .mobile-menu.mobile-menu-open {
                    transform: translateX(0);
                }

                .mobile-menu a {
                    font-size: 20px;
                    font-weight: 700;
                }

                .desktop-only {
                    display: inherit;
                }

                @media (max-width: 900px) {
                    .desktop-only {
                        display: none !important;
                    }

                    .hamburger {
                        display: flex !important;
                    }
                }

                @media (max-width: 620px) {
                    nav {
                        padding: 0 18px;
                    }

                    .mobile-menu {
                        width: 100%;
                        padding: 88px 18px 28px;
                    }
                }
            `}</style>
        </nav>
    );
}
