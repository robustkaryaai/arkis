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
        <nav className="nav-shell">
            <div className="nav-brand">
                <Link className="nav-logo" href="/">
                    <span>Rexycore</span>
                </Link>
            </div>

            <ul className="nav-links desktop-only">
                <li><Link href="/" className={isActive('/')}>Home</Link></li>
                <li><Link href="/products" className={isActive('/products')}>Products</Link></li>
                <li><Link href="/about" className={isActive('/about')}>About</Link></li>
                <li><Link href="/contact" className={isActive('/contact')}>Contact</Link></li>
            </ul>

            <div className="nav-actions">
                {user ? (
                    <div className="nav-user desktop-only" ref={dropdownRef}>
                        <button
                            type="button"
                            className={dropdownOpen ? 'user-trigger active' : 'user-trigger'}
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                        >
                            <div className="user-avatar">
                                {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                            </div>
                        </button>

                        {dropdownOpen && (
                            <div className="user-dropdown">
                                <div className="user-dropdown-info">
                                    <p>{user.name || 'User'}</p>
                                    <p>{user.email}</p>
                                </div>
                                <div className="user-dropdown-links">
                                    <Link href="/profile">Profile</Link>
                                    <Link href="/orders">Orders</Link>
                                    <Link href="/subscription">RexyCore Cloud</Link>
                                </div>
                                <button type="button" className="user-signout" onClick={handleLogout}>Sign Out</button>
                            </div>
                        )}
                    </div>
                ) : (
                    <Link href="/login" className="btn-primary desktop-only nav-login">Login</Link>
                )}

                <button
                    type="button"
                    className="hamburger"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    aria-expanded={mobileMenuOpen}
                    aria-label="Toggle navigation menu"
                >
                    <span className={mobileMenuOpen ? 'hamburger-line top active' : 'hamburger-line top'} />
                    <span className={mobileMenuOpen ? 'hamburger-line middle active' : 'hamburger-line middle'} />
                    <span className={mobileMenuOpen ? 'hamburger-line bottom active' : 'hamburger-line bottom'} />
                </button>
            </div>

            {mobileMenuOpen && <div className="mobile-menu-overlay" onClick={() => setMobileMenuOpen(false)} />}

            <div ref={mobileMenuRef} className={mobileMenuOpen ? 'mobile-menu mobile-menu-open' : 'mobile-menu'}>
                <Link href="/" className={isActive('/')}>Home</Link>
                <Link href="/products" className={isActive('/products')}>Products</Link>
                <Link href="/about" className={isActive('/about')}>About</Link>
                <Link href="/contact" className={isActive('/contact')}>Contact</Link>
                {user ? (
                    <>
                        <div className="mobile-divider" />
                        <Link href="/profile" className={isActive('/profile')}>Profile</Link>
                        <Link href="/orders" className={isActive('/orders')}>Orders</Link>
                        <Link href="/subscription" className={isActive('/subscription')}>RexyCore Cloud</Link>
                        <button type="button" className="mobile-signout" onClick={handleLogout}>Sign Out</button>
                    </>
                ) : (
                    <Link href="/login" className="mobile-login">Login</Link>
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

                .hamburger-line.top.active {
                    transform: translateY(8px) rotate(45deg);
                }

                .hamburger-line.middle.active {
                    opacity: 0;
                }

                .hamburger-line.bottom.active {
                    transform: translateY(-8px) rotate(-45deg);
                }

                .mobile-menu-overlay {
                    position: fixed;
                    inset: 0;
                    background: rgba(0, 0, 0, 0.55);
                    backdrop-filter: blur(4px);
                    z-index: 999;
                }

                .nav-shell {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    z-index: 1000;
                    background: rgba(7, 7, 15, 0.96);
                    backdrop-filter: blur(18px);
                    border-bottom: 1px solid rgba(255,255,255,0.08);
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 0 5%;
                    min-height: 72px;
                    height: 72px;
                    flex-wrap: wrap;
                }

                .nav-brand {
                    z-index: 1001;
                    flex: 0 0 auto;
                }

                .nav-logo {
                    font-size: 24px;
                    font-weight: 900;
                    letter-spacing: -1px;
                    text-decoration: none;
                }

                .nav-logo span {
                    display: inline-block;
                    background: linear-gradient(90deg, #ff8500, #ffffff, #13bb1a, #4f9cf9, #9b59f5);
                    background-size: 300% 300%;
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    animation: logo-flow 6s ease infinite;
                    text-shadow: 0 0 18px rgba(255, 133, 0, 0.12);
                }

                @keyframes logo-flow {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }

                .nav-links {
                    display: flex;
                    gap: 30px;
                    list-style: none;
                    margin: 0;
                    padding: 0;
                    align-items: center;
                    flex: 1 1 auto;
                    justify-content: center;
                    min-width: 0;
                    white-space: nowrap;
                }

                .nav-links li {
                    display: inline-block;
                }

                .nav-links a,
                .mobile-menu a,
                .user-dropdown-links a {
                    text-decoration: none;
                    color: var(--muted);
                    font-size: 14px;
                    font-weight: 600;
                    transition: color 0.2s ease, transform 0.2s ease;
                }

                .nav-links a:hover,
                .nav-links a.active,
                .mobile-menu a:hover,
                .mobile-menu a.active,
                .user-dropdown-links a:hover {
                    color: var(--text);
                    transform: translateY(-1px);
                }

                .nav-actions {
                    display: flex;
                    align-items: center;
                    justify-content: flex-end;
                    gap: 16px;
                    min-height: 70px;
                }

                .nav-login {
                    padding: 10px 20px;
                    border-radius: 999px;
                }

                .nav-user {
                    position: relative;
                }

                .user-trigger {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    padding: 6px;
                    border: 1px solid transparent;
                    border-radius: 999px;
                    background: rgba(255,255,255,0.06);
                    cursor: pointer;
                    transition: all 0.2s ease;
                }

                .user-trigger.active {
                    border-color: rgba(79,156,249,0.4);
                    background: rgba(79,156,249,0.12);
                }

                .user-avatar {
                    width: 34px;
                    height: 34px;
                    border-radius: 50%;
                    display: grid;
                    place-items: center;
                    background: linear-gradient(135deg, var(--blue), var(--violet));
                    color: #fff;
                    font-size: 14px;
                    font-weight: 800;
                }

                .user-dropdown {
                    position: absolute;
                    top: 56px;
                    right: 0;
                    width: 260px;
                    background: rgba(7,7,15,0.98);
                    border: 1px solid rgba(255,255,255,0.08);
                    border-radius: 20px;
                    padding: 14px;
                    box-shadow: 0 20px 50px rgba(0,0,0,0.35);
                    z-index: 1001;
                }

                .user-dropdown-info {
                    border-bottom: 1px solid rgba(255,255,255,0.08);
                    padding-bottom: 10px;
                    margin-bottom: 10px;
                }

                .user-dropdown-info p:first-child {
                    margin: 0 0 6px;
                    font-weight: 700;
                }

                .user-dropdown-info p:last-child {
                    margin: 0;
                    color: var(--muted);
                    font-size: 12px;
                }

                .user-dropdown-links {
                    display: flex;
                    flex-direction: column;
                    gap: 8px;
                }

                .user-dropdown-links a {
                    display: block;
                    padding: 10px 12px;
                    border-radius: 14px;
                    background: rgba(255,255,255,0.03);
                    border: 1px solid rgba(255,255,255,0.06);
                }

                .user-signout {
                    width: 100%;
                    margin-top: 10px;
                    padding: 12px 14px;
                    border-radius: 14px;
                    border: 1px solid rgba(239,68,68,0.25);
                    background: rgba(239,68,68,0.12);
                    color: #ef4444;
                    font-weight: 700;
                    cursor: pointer;
                }

                .hamburger {
                    display: none;
                    align-items: center;
                    justify-content: center;
                    width: 48px;
                    height: 48px;
                    border-radius: 16px;
                    border: 1px solid rgba(255, 255, 255, 0.12);
                    background: rgba(255, 255, 255, 0.08);
                    box-shadow: 0 18px 36px rgba(0, 0, 0, 0.15);
                    padding: 10px;
                    cursor: pointer;
                    transition: background 0.2s ease, transform 0.2s ease;
                }

                .hamburger:hover {
                    background: rgba(255, 255, 255, 0.12);
                    transform: translateY(-1px);
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
                    display: inline-flex;
                    align-items: center;
                }

                @media (max-width: 900px) {
                    .desktop-only {
                        display: none !important;
                    }

                    .hamburger {
                        display: flex !important;
                    }

                    .nav-links {
                        display: none;
                    }
                }

                @media (max-width: 620px) {
                    .nav-shell {
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
