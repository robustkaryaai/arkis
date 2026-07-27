'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useRef } from 'react';

const NAV_LINKS = [
  { href: '/products', label: 'Products' },
  { href: '/about', label: 'About' },
  { href: '/academy', label: 'Academy' },
  { href: '/contact', label: 'Contact' },
];

/* ── Animated Hamburger Icon ────────────── */
function HamburgerIcon({ open }) {
  const bar = (deg, y) => ({
    display: 'block',
    width: '22px',
    height: '2px',
    borderRadius: '2px',
    background: '#fff',
    transformOrigin: 'center',
    transition: 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.25s ease',
    transform: open
      ? y === 0 ? `translateY(8px) rotate(${deg}deg)` : y === 1 ? 'scaleX(0)' : `translateY(-8px) rotate(${deg}deg)`
      : 'none',
    opacity: open && y === 1 ? 0 : 1,
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', cursor: 'pointer' }}>
      <span style={bar(45, 0)} />
      <span style={bar(0, 1)} />
      <span style={bar(-45, 2)} />
    </div>
  );
}

export default function Navbar() {
  const path = usePathname();
  const { user, logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  // Close drawer on route change
  useEffect(() => { setDrawerOpen(false); }, [path]);

  // Lock body scroll when drawer open
  useEffect(() => {
    if (drawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [drawerOpen]);

  const handleLogout = async () => {
    try { await logout(); window.location.href = '/'; }
    catch (e) { console.error(e); }
  };

  return (
    <>
      <nav className={`nav-island${scrolled ? ' compact' : ''}`}>
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

        {/* Desktop CTA */}
        {user ? (
          <Link href="/profile" className="nav-cta" style={{ fontSize: scrolled ? '13px' : '15px', padding: scrolled ? '7px 16px' : '11px 24px', transition: 'padding 0.4s ease, font-size 0.4s ease' }}>Profile</Link>
        ) : (
          <Link href="/login" className="nav-cta" style={{ fontSize: scrolled ? '13px' : '15px', padding: scrolled ? '7px 16px' : '11px 24px', transition: 'padding 0.4s ease, font-size 0.4s ease' }}>Sign In</Link>
        )}

        {/* Mobile Hamburger */}
        <button
          className="nav-hamburger"
          onClick={() => setDrawerOpen(p => !p)}
          aria-label={drawerOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={drawerOpen}
        >
          <HamburgerIcon open={drawerOpen} />
        </button>
      </nav>

      {/* ── MOBILE SIDE DRAWER ─────────────────── */}

      {/* Backdrop */}
      <div
        className={`drawer-backdrop${drawerOpen ? ' open' : ''}`}
        onClick={() => setDrawerOpen(false)}
        aria-hidden
      />

      {/* Drawer Panel */}
      <aside className={`nav-drawer${drawerOpen ? ' open' : ''}`} aria-label="Navigation menu">
        {/* Drawer header */}
        <div className="drawer-header">
          <Link href="/" className="nav-logo" style={{ fontSize: '20px' }}>Rexycore</Link>
          <button
            onClick={() => setDrawerOpen(false)}
            className="drawer-close"
            aria-label="Close menu"
          >
            ✕
          </button>
        </div>

        {/* Nav links */}
        <nav className="drawer-nav">
          {NAV_LINKS.map(({ href, label }, i) => (
            <Link
              key={href}
              href={href}
              className={`drawer-link${path === href ? ' active' : ''}`}
              style={{ animationDelay: `${0.05 + i * 0.04}s` }}
            >
              <span>{label}</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </Link>
          ))}
        </nav>

        {/* Divider */}
        <div className="drawer-divider" />

        {/* Auth CTA */}
        <div className="drawer-footer">
          {user ? (
            <>
              <Link href="/profile" className="drawer-cta-secondary">
                View Profile
              </Link>
              <button onClick={handleLogout} className="drawer-logout">
                Sign Out
              </button>
            </>
          ) : (
            <Link href="/login" className="drawer-cta-primary">
              Sign In to Rexycore
            </Link>
          )}

          <p className="drawer-footer-tag">Engineered in India 🇮🇳</p>
        </div>
      </aside>
    </>
  );
}
