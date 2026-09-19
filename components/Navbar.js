'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

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
  const [profileOpen, setProfileOpen] = useState(false);

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

        {/* Desktop Profile Badge / Sign In */}
        <div style={{ position: 'relative' }}>
          {user ? (
            <button
              onClick={() => setProfileOpen(p => !p)}
              className="desktop-auth-btn"
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                width: scrolled ? '32px' : '36px', height: scrolled ? '32px' : '36px',
                padding: '0', borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.08)',
                color: '#fff', border: '1px solid rgba(255,255,255,0.2)',
                fontWeight: 700, fontSize: scrolled ? 13 : 14,
                transition: 'all 0.5s cubic-bezier(0.34, 1.2, 0.64, 1)',
                marginLeft: '16px', cursor: 'pointer',
                boxShadow: 'inset 0 0 10px rgba(255,255,255,0.05)'
              }}
            >
              {user?.email?.charAt(0).toUpperCase() || 'U'}
            </button>
          ) : (
            <Link
              href="/login"
              className="desktop-auth-btn"
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                padding: scrolled ? '8px 16px' : '10px 20px', borderRadius: 99,
                background: 'rgba(255, 255, 255, 0.1)', color: '#fff',
                textDecoration: 'none', fontWeight: 700, fontSize: scrolled ? 13 : 14,
                transition: 'all 0.5s cubic-bezier(0.34, 1.2, 0.64, 1)',
                marginLeft: '16px', border: '1px solid rgba(255,255,255,0.2)',
              }}
            >
              Sign In
            </Link>
          )}

          {/* Desktop Dropdown */}
          <AnimatePresence>
            {user && profileOpen && (
              <>
                <div style={{ position: 'fixed', inset: 0, zIndex: 998 }} onClick={() => setProfileOpen(false)} />
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  style={{
                    position: 'absolute', top: '100%', right: 0, marginTop: '12px',
                    width: '240px', background: 'rgba(10,10,15,0.96)',
                    backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '16px', padding: '8px', zIndex: 999,
                    boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
                    overflow: 'hidden',
                  }}
                >
                  {/* User summary row */}
                  <div style={{ padding: '12px 14px', marginBottom: '4px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                      <div style={{
                        width: 32, height: 32, borderRadius: '50%',
                        background: 'linear-gradient(135deg, #7c3aed, #3b82f6)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 13, fontWeight: 800, color: '#fff',
                        boxShadow: '0 0 12px rgba(124,58,237,0.5)',
                        animation: 'nav-avatar-pulse 3s ease-in-out infinite',
                      }}>
                        {user?.email?.charAt(0).toUpperCase() || user?.name?.charAt(0).toUpperCase() || 'U'}
                      </div>
                      <div style={{ minWidth: 0, flex: 1 }}>
                        <div style={{ fontSize: '13px', fontWeight: 700, color: '#fff', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                          {user?.name || user?.email?.split('@')[0] || 'User'}
                        </div>
                        <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                          {user?.email || ''}
                        </div>
                      </div>
                    </div>
                  </div>

                  <Link href="/profile" onClick={() => setProfileOpen(false)} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 14px', color: '#fff', textDecoration: 'none', fontSize: '13px', fontWeight: 600, borderRadius: '10px', marginBottom: '4px', background: 'rgba(124,58,237,0.08)', border: '1px solid rgba(124,58,237,0.18)' }}>
                    <span style={{
                      width: 18, height: 18, borderRadius: '5px',
                      background: 'rgba(124,58,237,0.2)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '10px', fontWeight: 900, color: '#a78bfa',
                    }}>PR</span>
                    View Profile
                  </Link>
                  <Link href="/subscription" onClick={() => setProfileOpen(false)} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 14px', color: '#fff', textDecoration: 'none', fontSize: '13px', fontWeight: 600, borderRadius: '8px', marginBottom: '4px', background: 'rgba(255,255,255,0.03)' }}>
                    <span style={{
                      width: 18, height: 18, borderRadius: '5px',
                      background: 'rgba(16,185,129,0.18)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '10px', fontWeight: 900, color: '#34d399',
                    }}>SB</span>
                    Manage Subscription
                  </Link>
                  <Link href="/orders" onClick={() => setProfileOpen(false)} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 14px', color: '#fff', textDecoration: 'none', fontSize: '13px', fontWeight: 600, borderRadius: '8px', marginBottom: '4px', background: 'rgba(255,255,255,0.03)' }}>
                    <span style={{
                      width: 18, height: 18, borderRadius: '5px',
                      background: 'rgba(59,130,246,0.18)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '10px', fontWeight: 900, color: '#60a5fa',
                    }}>OR</span>
                    View Orders
                  </Link>
                  <div style={{ height: '1px', background: 'rgba(255,255,255,0.06)', margin: '4px 0' }} />
                  <button onClick={() => { setProfileOpen(false); handleLogout(); }} style={{ width: '100%', textAlign: 'left', padding: '10px 14px', color: '#ef4444', background: 'rgba(239,68,68,0.08)', border: 'none', fontSize: '13px', fontWeight: 600, borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{
                      width: 18, height: 18, borderRadius: '5px',
                      background: 'rgba(239,68,68,0.18)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '10px', fontWeight: 900,
                    }}>
                      <span style={{
                        width: '6px', height: '2px', background: '#ef4444', display: 'block',
                        boxShadow: '0 -5px 0 #ef4444, 0 5px 0 #ef4444',
                      }} />
                    </span>
                    Log Out
                  </button>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>

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
            <span style={{
              display: 'inline-block', width: '18px', height: '18px', position: 'relative',
            }}>
              <span style={{
                position: 'absolute', top: '50%', left: 0, width: '100%', height: '2px',
                background: 'rgba(255,255,255,0.7)', transform: 'translateY(-50%) rotate(45deg)',
                borderRadius: '2px',
              }} />
              <span style={{
                position: 'absolute', top: '50%', left: 0, width: '100%', height: '2px',
                background: 'rgba(255,255,255,0.7)', transform: 'translateY(-50%) rotate(-45deg)',
                borderRadius: '2px',
              }} />
            </span>
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
              <Link href="/profile" className="drawer-cta-primary" onClick={() => setDrawerOpen(false)} style={{ marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '10px', justifyContent: 'center' }}>
                <span style={{
                  width: 16, height: 16, borderRadius: '4px',
                  background: 'rgba(124,58,237,0.3)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '9px', fontWeight: 900, color: '#a78bfa',
                }}>PR</span>
                View Profile
              </Link>
              <Link href="/subscription" className="drawer-cta-secondary" onClick={() => setDrawerOpen(false)} style={{ marginBottom: '8px' }}>
                Manage Subscription
              </Link>
              <Link href="/orders" className="drawer-cta-secondary" onClick={() => setDrawerOpen(false)} style={{ marginBottom: '8px' }}>
                View Orders
              </Link>
              <button onClick={() => { setDrawerOpen(false); handleLogout(); }} className="drawer-logout">
                Sign Out
              </button>
            </>
          ) : (
            <Link href="/login" className="drawer-cta-primary">
              Sign In to Rexycore
            </Link>
          )}

          <p className="drawer-footer-tag" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: '2px',
              padding: '2px 6px', borderRadius: '4px',
              background: 'linear-gradient(180deg, #ff9933 0%, #ff9933 33%, #ffffff 33%, #ffffff 66%, #138808 66%, #138808 100%)',
              boxShadow: '0 0 8px rgba(255,153,51,0.3)',
              animation: 'nav-india-wave 4s ease-in-out infinite',
            }}>
              <span style={{ display: 'inline-block', width: '12px', height: '8px', borderRadius: '1px' }} />
            </span>
            Engineered in India
          </p>
        </div>

        {/* Navbar embedded styles for animations */}
        <style>{`
          @keyframes nav-avatar-pulse {
            0%, 100% { transform: scale(1); box-shadow: 0 0 12px rgba(124,58,237,0.5); }
            50%      { transform: scale(1.06); box-shadow: 0 0 20px rgba(124,58,237,0.8); }
          }
          @keyframes nav-india-wave {
            0%, 100% { transform: skewX(0deg) scale(1); filter: saturate(1); }
            25%      { transform: skewX(-4deg) scale(1.03); filter: saturate(1.2); }
            75%      { transform: skewX(4deg) scale(0.98); filter: saturate(0.9); }
          }
        `}</style>
      </aside>
    </>
  );
}
