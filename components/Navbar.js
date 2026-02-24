'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { account } from '@/lib/appwrite';

export default function Navbar() {
    const path = usePathname();
    const [user, setUser] = useState(null);
    const isActive = (href) => path === href ? 'active' : '';

    useEffect(() => {
        checkUser();
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
        <nav>
            <Link className="nav-logo" href="/"><span>ARKIS</span></Link>
            <ul className="nav-links">
                <li><Link href="/" className={isActive('/')}>Home</Link></li>
                <li><Link href="/products" className={isActive('/products')}>Products</Link></li>
                <li><Link href="/about" className={isActive('/about')}>About</Link></li>
                <li><Link href="/contact" className={isActive('/contact')}>Contact</Link></li>
            </ul>

            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                {user ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                            <span style={{ fontSize: '12px', fontWeight: '700', color: 'var(--text)' }}>{user.name}</span>
                            <button onClick={handleLogout} style={{
                                background: 'none', border: 'none', color: 'var(--muted)',
                                fontSize: '11px', cursor: 'pointer', padding: 0, fontWeight: '600'
                            }}>Logout</button>
                        </div>
                        <div style={{
                            width: '36px', height: '36px', borderRadius: '50%',
                            background: 'linear-gradient(135deg, var(--blue), var(--violet))',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: '14px', fontWeight: '800', color: '#fff',
                            border: '1px solid var(--border)'
                        }}>
                            {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                        </div>
                    </div>
                ) : (
                    <Link className="nav-cta" href="/login">Login</Link>
                )}
            </div>
        </nav>
    );
}
