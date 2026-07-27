'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useRef } from 'react';

const NAV_LINKS = [
  { href: '/products', label: 'Products' },
  { href: '/about', label: 'About' },
  { href: '/tiers', label: 'Pricing' },
  { href: '/academy', label: 'Academy' },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const path = usePathname();
  const { user, logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [path]);

  const handleLogout = async () => {
    try { await logout(); window.location.href = '/'; }
    catch (e) { console.error(e); }
  };

  return (
    <>
      <nav
        className={`nav-island${scrolled ? ' compact' : ''}`}
        style={{
          boxShadow: scrolled
            ? '0 12px 48px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.08)'
            : '0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.08)',
          background: scrolled
            ? 'rgba(5, 5, 14, 0.94)'
            : 'rgba(10, 10, 20, 0.75)',
        }}
      >
        {/* Logo */}
        <Link
          href="/"
          className="nav-logo"
          style={{
            fontSize: scrolled ? '16px' : '22px',
            transition: 'font-size 0.5s cubic-bezier(0.34, 1.2, 0.64, 1)',
          }}
        >Rexycore</Link>

        {/* Desktop Links */}
        <ul className="nav-links">
          {NAV_LINKS.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className={path === href ? 'active' : ''}
                style={{
                  fontSize: scrolled ? '13px' : '15.5px',
                  padding: scrolled ? '6px 12px' : '10px 18px',
                  transition: 'font-size 0.4s ease, padding 0.4s ease',
                }}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* CTA */}
        {user ? (
          <Link href="/profile" className="nav-cta" style={{ fontSize: scrolled ? '13px' : '15px', padding: scrolled ? '7px 16px' : '11px 24px', transition: 'padding 0.4s ease, font-size 0.4s ease' }}>Profile</Link>
        ) : (
          <Link href="/login" className="nav-cta" style={{ fontSize: scrolled ? '13px' : '15px', padding: scrolled ? '7px 16px' : '11px 24px', transition: 'padding 0.4s ease, font-size 0.4s ease' }}>Sign In</Link>
        )}

        {/* Hamburger */}
        <button
          data-hamburger
          onClick={() => setMobileOpen(p => !p)}
          style={{
            display: 'none',
            background: 'none',
            border: 'none',
            color: '#fff',
            fontSize: '22px',
            cursor: 'pointer',
            marginLeft: '12px',
            padding: '4px 8px',
          }}
        >
          {mobileOpen ? '✕' : '☰'}
        </button>
      </nav>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div style={{
          position: 'fixed', top: 76, left: 16, right: 16, zIndex: 999,
          background: 'rgba(8,8,18,0.97)', backdropFilter: 'blur(40px)',
          border: '1px solid rgba(255,255,255,0.08)', borderRadius: 22,
          padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 8,
          boxShadow: '0 20px 60px rgba(0,0,0,0.6)',
        }}>
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              style={{
                padding: '12px 16px', borderRadius: 12,
                color: path === href ? '#fff' : 'rgba(255,255,255,0.6)',
                textDecoration: 'none', fontSize: '15px', fontWeight: 600,
                background: path === href ? 'rgba(255,255,255,0.06)' : 'transparent',
              }}
            >
              {label}
            </Link>
          ))}
          {user ? (
            <>
              <Link href="/profile" style={{ padding: '12px 16px', borderRadius: 12, color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontSize: '15px', fontWeight: 600 }}>Profile</Link>
              <button onClick={handleLogout} style={{ padding: '12px 16px', borderRadius: 12, color: '#f472b6', background: 'none', border: 'none', textAlign: 'left', fontSize: '15px', fontWeight: 700, cursor: 'pointer' }}>Sign Out</button>
            </>
          ) : (
            <Link href="/login" style={{ marginTop: 8, padding: '14px', borderRadius: 14, background: '#fff', color: '#000', fontSize: '15px', fontWeight: 700, textDecoration: 'none', textAlign: 'center' }}>Sign In</Link>
          )}
        </div>
      )}
    </>
  );
}
