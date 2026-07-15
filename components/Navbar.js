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
    const isActive = (href) => path === href;

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
            if (
                mobileMenuRef.current &&
                !mobileMenuRef.current.contains(event.target) &&
                !event.target.closest('[data-hamburger]')
            ) {
                setMobileMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

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

    const navLinkStyle = (href) => ({
        textDecoration: 'none',
        color: isActive(href) ? '#fff' : 'rgba(255,255,255,0.55)',
        fontSize: '14px',
        fontWeight: '600',
        transition: 'color 0.2s ease',
        padding: '4px 0',
        borderBottom: isActive(href) ? '2px solid #9b59f5' : '2px solid transparent',
    });

    const mobileLinkStyle = (href) => ({
        textDecoration: 'none',
        fontSize: '22px',
        fontWeight: '700',
        color: isActive(href) ? '#fff' : 'rgba(255,255,255,0.6)',
        padding: '8px 0',
        transition: 'color 0.2s ease',
    });

    return (
        <>
            {/* ── Keyframe injection ── */}
            <style>{`
                @keyframes logo-flow {
    from {
        background-position: 0% 50%;
    }
    to {
        background-position: 200% 50%;
    }
}
                @keyframes dropdown-in {
                    from { opacity: 0; transform: translateY(8px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
                @keyframes mobile-slide {
                    from { transform: translateX(100%); }
                    to   { transform: translateX(0); }
                }
                ._nav-link:hover { color: #fff !important; }
                ._dd-link:hover { background: rgba(255,255,255,0.06) !important; color: #fff !important; }
            `}</style>

            {/* ── Overlay ── */}
            {mobileMenuOpen && (
                <div
                    onClick={() => setMobileMenuOpen(false)}
                    style={{
                        position: 'fixed', inset: 0,
                        background: 'rgba(0,0,0,0.6)',
                        backdropFilter: 'blur(4px)',
                        zIndex: 998,
                    }}
                />
            )}

            {/* ── Mobile Drawer ── */}
            <div
                ref={mobileMenuRef}
                style={{
                    position: 'fixed',
                    top: 0, right: 0, bottom: 0,
                    width: '100%',
                    maxWidth: '320px',
                    background: 'rgba(7,7,15,0.98)',
                    borderLeft: '1px solid rgba(255,255,255,0.08)',
                    padding: '100px 36px 32px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
                    transform: mobileMenuOpen ? 'translateX(0)' : 'translateX(100%)',
                    transition: 'transform 0.28s cubic-bezier(0.22,1,0.36,1)',
                    zIndex: 999,
                    overflowY: 'auto',
                    backdropFilter: 'blur(14px)',
                }}
            >
                <Link href="/" style={mobileLinkStyle('/')}>Home</Link>
                <Link href="/products" style={mobileLinkStyle('/products')}>Products</Link>
                <Link href="/about" style={mobileLinkStyle('/about')}>About</Link>
                <Link href="/contact" style={mobileLinkStyle('/contact')}>Contact</Link>
                {user ? (
                    <>
                        <div style={{ height: '1px', background: 'rgba(255,255,255,0.08)', margin: '8px 0' }} />
                        <Link href="/profile" style={mobileLinkStyle('/profile')}>Profile</Link>
                        <Link href="/orders" style={mobileLinkStyle('/orders')}>Orders</Link>
                        <Link href="/subscription" style={mobileLinkStyle('/subscription')}>RexyCore Cloud</Link>
                        <button
                            type="button"
                            onClick={handleLogout}
                            style={{
                                marginTop: '8px',
                                padding: '14px',
                                borderRadius: '14px',
                                border: '1px solid rgba(239,68,68,0.3)',
                                background: 'rgba(239,68,68,0.1)',
                                color: '#ef4444',
                                fontSize: '16px',
                                fontWeight: '700',
                                cursor: 'pointer',
                                textAlign: 'left',
                            }}
                        >
                            Sign Out
                        </button>
                    </>
                ) : (
                    <Link
                        href="/login"
                        style={{
                            marginTop: '16px',
                            padding: '14px',
                            borderRadius: '14px',
                            background: 'linear-gradient(135deg, #4f9cf9, #9b59f5)',
                            color: '#fff',
                            fontSize: '16px',
                            fontWeight: '700',
                            textDecoration: 'none',
                            textAlign: 'center',
                        }}
                    >
                        Login
                    </Link>
                )}
            </div>

            {/* ── Main Navbar ── */}
            <nav style={{
                position: 'fixed',
                top: 0, left: 0, right: 0,
                zIndex: 1000,
                background: 'rgba(7,7,15,0.92)',
                backdropFilter: 'blur(20px)',
                borderBottom: '1px solid rgba(255,255,255,0.07)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0 5%',
                height: '72px',
            }}>
                {/* Logo */}
                <Link
                    href="/"
                    style={{
                        fontSize: '24px',
                        fontWeight: '900',
                        letterSpacing: '-0.5px',
                        textDecoration: 'none',
                        flexShrink: 0,
                    }}
                >
                    <span
                        style={{
                            display: 'inline-block',
background: `
linear-gradient(
    90deg,
    #FF9933,
    #FFC97A,
    #FFF8F0,
    #FFFFFF,
    #EAF7EA,
    #5FCB63,
    #138808,
    #5FCB63,
    #FFFFFF,
    #FFC97A,
    #FF9933
)
`,
backgroundSize: '400% 100%',
animation: 'logo-flow 8s linear infinite',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                            color: 'transparent',
                        }}
                    >
                        Rexycore
                    </span>
                </Link>

                {/* Desktop Links — centered */}
                <ul style={{
                    display: 'flex',
                    gap: '32px',
                    listStyle: 'none',
                    margin: 0,
                    padding: 0,
                    position: 'absolute',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    alignItems: 'center',
                }}
                    className="_desktop-nav"
                >
                    <style>{`
                        @media (max-width: 900px) { ._desktop-nav { display: none !important; } ._hamburger { display: flex !important; } ._desktop-user { display: none !important; } }
                        @media (min-width: 901px) { ._hamburger { display: none !important; } }
                    `}</style>
                    <li><Link href="/" className="_nav-link" style={navLinkStyle('/')}>Home</Link></li>
                    <li><Link href="/products" className="_nav-link" style={navLinkStyle('/products')}>Products</Link></li>
                    <li><Link href="/about" className="_nav-link" style={navLinkStyle('/about')}>About</Link></li>
                    <li><Link href="/contact" className="_nav-link" style={navLinkStyle('/contact')}>Contact</Link></li>
                </ul>

                {/* Right side actions */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
                    {/* Desktop: user avatar / login */}
                    <div className="_desktop-user" ref={dropdownRef} style={{ position: 'relative' }}>
                        {user ? (
                            <>
                                <button
                                    type="button"
                                    onClick={() => setDropdownOpen(!dropdownOpen)}
                                    style={{
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        padding: '5px',
                                        border: dropdownOpen ? '1px solid rgba(79,156,249,0.5)' : '1px solid rgba(255,255,255,0.12)',
                                        borderRadius: '999px',
                                        background: dropdownOpen ? 'rgba(79,156,249,0.12)' : 'rgba(255,255,255,0.06)',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s ease',
                                    }}
                                >
                                    <div style={{
                                        width: '34px',
                                        height: '34px',
                                        borderRadius: '50%',
                                        display: 'grid',
                                        placeItems: 'center',
                                        background: 'linear-gradient(135deg, #4f9cf9, #9b59f5)',
                                        color: '#fff',
                                        fontSize: '14px',
                                        fontWeight: '800',
                                    }}>
                                        {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                                    </div>
                                </button>

                                {dropdownOpen && (
                                    <div style={{
                                        position: 'absolute',
                                        top: '54px',
                                        right: 0,
                                        width: '260px',
                                        background: 'rgba(10,10,20,0.98)',
                                        border: '1px solid rgba(255,255,255,0.09)',
                                        borderRadius: '20px',
                                        padding: '14px',
                                        boxShadow: '0 24px 60px rgba(0,0,0,0.45)',
                                        zIndex: 1001,
                                        animation: 'dropdown-in 0.18s ease forwards',
                                    }}>
                                        <div style={{ borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '10px', marginBottom: '10px' }}>
                                            <p style={{ margin: '0 0 4px', fontWeight: '700', fontSize: '14px', color: '#fff' }}>{user.name || 'User'}</p>
                                            <p style={{ margin: 0, color: 'rgba(255,255,255,0.4)', fontSize: '12px' }}>{user.email}</p>
                                        </div>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                            {[
                                                { href: '/profile', label: 'Profile' },
                                                { href: '/orders', label: 'Orders' },
                                                { href: '/subscription', label: 'RexyCore Cloud' },
                                            ].map(({ href, label }) => (
                                                <Link
                                                    key={href}
                                                    href={href}
                                                    className="_dd-link"
                                                    style={{
                                                        display: 'block',
                                                        padding: '10px 12px',
                                                        borderRadius: '12px',
                                                        background: 'rgba(255,255,255,0.03)',
                                                        border: '1px solid rgba(255,255,255,0.06)',
                                                        textDecoration: 'none',
                                                        color: 'rgba(255,255,255,0.7)',
                                                        fontSize: '13px',
                                                        fontWeight: '600',
                                                        transition: 'background 0.15s, color 0.15s',
                                                    }}
                                                >
                                                    {label}
                                                </Link>
                                            ))}
                                        </div>
                                        <button
                                            type="button"
                                            onClick={handleLogout}
                                            style={{
                                                width: '100%',
                                                marginTop: '10px',
                                                padding: '12px',
                                                borderRadius: '12px',
                                                border: '1px solid rgba(239,68,68,0.25)',
                                                background: 'rgba(239,68,68,0.1)',
                                                color: '#ef4444',
                                                fontWeight: '700',
                                                fontSize: '13px',
                                                cursor: 'pointer',
                                            }}
                                        >
                                            Sign Out
                                        </button>
                                    </div>
                                )}
                            </>
                        ) : (
                            <Link
                                href="/login"
                                style={{
                                    padding: '9px 22px',
                                    borderRadius: '999px',
                                    background: 'linear-gradient(135deg, #4f9cf9, #9b59f5)',
                                    color: '#fff',
                                    textDecoration: 'none',
                                    fontSize: '14px',
                                    fontWeight: '600',
                                    transition: 'opacity 0.2s',
                                }}
                            >
                                Login
                            </Link>
                        )}
                    </div>

                    {/* Hamburger */}
                    <button
                        type="button"
                        data-hamburger="true"
                        className="_hamburger"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-label="Toggle menu"
                        style={{
                            display: 'none',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '5px',
                            width: '46px',
                            height: '46px',
                            borderRadius: '14px',
                            border: '1px solid rgba(255,255,255,0.12)',
                            background: 'rgba(255,255,255,0.07)',
                            cursor: 'pointer',
                            padding: '10px',
                            transition: 'background 0.2s',
                        }}
                    >
                        <span style={{
                            display: 'block', width: '22px', height: '2px',
                            background: '#fff', borderRadius: '999px',
                            transition: 'transform 0.3s, opacity 0.3s',
                            transform: mobileMenuOpen ? 'translateY(7px) rotate(45deg)' : 'none',
                        }} />
                        <span style={{
                            display: 'block', width: '22px', height: '2px',
                            background: '#fff', borderRadius: '999px',
                            opacity: mobileMenuOpen ? 0 : 1,
                            transition: 'opacity 0.3s',
                        }} />
                        <span style={{
                            display: 'block', width: '22px', height: '2px',
                            background: '#fff', borderRadius: '999px',
                            transition: 'transform 0.3s, opacity 0.3s',
                            transform: mobileMenuOpen ? 'translateY(-7px) rotate(-45deg)' : 'none',
                        }} />
                    </button>
                </div>
            </nav>
        </>
    );
}
