'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
    const path = usePathname();
    const isActive = (href) => path === href ? 'active' : '';
    return (
        <nav>
            <Link className="nav-logo" href="/"><span>ARKIS</span></Link>
            <ul className="nav-links">
                <li><Link href="/" className={isActive('/')}>Home</Link></li>
                <li><Link href="/products" className={isActive('/products')}>Products</Link></li>
                <li><Link href="/about" className={isActive('/about')}>About</Link></li>
                <li><Link href="/contact" className={isActive('/contact')}>Contact</Link></li>
                <li><Link href="/login" className={isActive('/login')}>Login</Link></li>
            </ul>
            <Link className="nav-cta" href="/products">Get Started →</Link>
        </nav>
    );
}
