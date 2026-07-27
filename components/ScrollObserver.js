'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function ScrollObserver() {
    const pathname = usePathname();

    useEffect(() => {
        // Force instant scroll to top on page navigation
        window.scrollTo({ top: 0, behavior: 'instant' });

        // Use a bidirectional observer so reveals re-trigger on scroll up/down
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                } else {
                    // Remove class so it animates again when re-entering
                    entry.target.classList.remove('active');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -40px 0px'
        });

        const timeout = setTimeout(() => {
            document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale').forEach(el => {
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
