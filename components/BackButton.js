'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { FiArrowLeft } from 'react-icons/fi';

export default function BackButton({ href = "/products", label = "Product Suite" }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <Link 
      href={href} 
      style={{
        position: 'fixed',
        top: 24,
        left: 24,
        zIndex: 999,
        display: 'flex',
        alignItems: 'center',
        gap: scrolled ? 0 : 8,
        padding: scrolled ? '12px' : '12px 20px',
        borderRadius: 99,
        background: 'rgba(10, 10, 15, 0.7)',
        backdropFilter: 'blur(16px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        color: '#fff',
        textDecoration: 'none',
        fontWeight: 600,
        fontSize: 14,
        transition: 'all 0.5s cubic-bezier(0.34, 1.2, 0.64, 1)',
        overflow: 'hidden',
        whiteSpace: 'nowrap'
      }}
    >
      <FiArrowLeft size={18} style={{ flexShrink: 0 }} />
      <span style={{ 
        width: scrolled ? 0 : 120, 
        opacity: scrolled ? 0 : 1, 
        transition: 'all 0.5s cubic-bezier(0.34, 1.2, 0.64, 1)',
        display: 'inline-block'
      }}>
        {label}
      </span>
    </Link>
  );
}
