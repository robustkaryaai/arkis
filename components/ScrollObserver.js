'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function ScrollObserver() {
    const pathname = usePathname();

    useEffect(() => {
        // Force instant scroll to top on page navigation
        window.scrollTo({ top: 0, behavior: 'instant' });

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        // Slight delay to allow DOM to paint after route change
        const timeout = setTimeout(() => {
            document.querySelectorAll('.reveal').forEach(el => {
                observer.observe(el);
            });
        }, 150);

        return () => {
            clearTimeout(timeout);
            observer.disconnect();
        };
    }, [pathname]);

    return null;
}
