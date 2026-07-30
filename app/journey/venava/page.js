'use client';
import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import ChatWidget from '@/components/ChatWidget';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { FiCheckCircle, FiCircle, FiArrowRight } from 'react-icons/fi';

const timeline = [
    {
        title: "Expression research",
        desc: "Exploring the patterns that make each person’s writing recognizably their own: vocabulary, rhythm, tone, and language mixing.",
        status: "completed",
        date: "Q4 2025"
    },
    {
        title: "Style memory foundations",
        desc: "Defining a private, user-owned way for Venava to remember the communication patterns a person chooses to share.",
        status: "completed",
        date: "Q2 2026"
    },
    {
        title: "Personalization preview",
        desc: "Refining how technology can carry an intended message into a person’s own natural expression—without flattening their voice.",
        status: "active",
        date: "Q3 2026"
    },
    {
        title: "Ecosystem connection",
        desc: "Connecting Venava with the future RexyCore ecosystem, where RK AI understands intent and Venava expresses it personally.",
        status: "upcoming",
        date: "Q1 2027"
    },
    {
        title: "Looking ahead",
        desc: "Venava is in development. Follow the product for future milestones in personal expression technology.",
        status: "upcoming",
        date: "Q2 2027"
    }
];

export default function VenavaJourney() {
    useEffect(() => {
        const observerOptions = { threshold: 0.2, rootMargin: '0px 0px -50px 0px' };
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    return (
        <div style={{ background: 'var(--background)', color: 'var(--text)', minHeight: '100vh', overflowX: 'hidden' }}>
            <Navbar />

            <section className="hero" style={{ minHeight: '60vh', paddingTop: '140px', paddingBottom: '60px', textAlign: 'center', position: 'relative' }}>
                <div style={{ position: 'absolute', top: '20%', left: '50%', transform: 'translate(-50%, -50%)', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(245, 158, 11, 0.15) 0%, transparent 70%)', zIndex: 0, pointerEvents: 'none' }} />
                
                <div style={{ maxWidth: '800px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
                    <div className="hero-eyebrow float-anim" style={{ margin: '0 auto 16px', background: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b', border: '1px solid rgba(245, 158, 11, 0.3)' }}>
                        <span className="pulse" style={{ background: '#f59e0b', boxShadow: '0 0 10px #f59e0b' }} />
                        Venava Journey
                    </div>
                    <h1 style={{ fontSize: 'clamp(40px, 8vw, 80px)', lineHeight: '1.1', letterSpacing: '-2px' }}>
                        Technology that <br />
                        <span style={{ background: 'linear-gradient(90deg, #f59e0b, #d97706, #f59e0b)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                            adapts to you.
                        </span>
                    </h1>
                    <p style={{ fontSize: '1.2rem', opacity: 0.8, marginTop: '24px', maxWidth: '600px', margin: '24px auto 0' }}>
                        Follow our journey as we build a personal expression layer that helps technology sound like you.
                    </p>
                </div>
            </section>

            <section style={{ maxWidth: '1000px', margin: '0 auto', padding: '60px 5% 100px', position: 'relative' }}>
                {/* Vertical Line */}
                <div style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', top: '60px', bottom: '100px', width: '2px', background: 'linear-gradient(90deg, rgba(245, 158, 11, 0.5, 11, 158, rgba(245), rgba(217, 119, 6, 0.1))', zIndex: 0 }} className="timeline-line" />

                <div style={{ display: 'flex', flexDirection: 'column', gap: '60px', position: 'relative', zIndex: 1 }}>
                    {timeline.map((item, i) => {
                        const isLeft = i % 2 === 0;
                        const isCompleted = item.status === 'completed';
                        const isActive = item.status === 'active';
                        const color = isActive ? '#f59e0b' : isCompleted ? '#22c55e' : 'var(--muted)';

                        return (
                            <div key={i} className="reveal reveal-delay-1" style={{ 
                                display: 'flex', 
                                flexDirection: isLeft ? 'row' : 'row-reverse',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '40px'
                            }}>
                                {/* Content Box */}
                                <div style={{ 
                                    flex: 1, 
                                    display: 'flex', 
                                    justifyContent: isLeft ? 'flex-end' : 'flex-start',
                                    textAlign: isLeft ? 'right' : 'left'
                                }}>
                                    <div style={{ 
                                        background: isActive ? 'rgba(245, 158, 11, 0.05)' : 'var(--surface)', 
                                        border: `1px solid ${isActive ? 'rgba(245, 158, 11, 0.3)' : 'var(--border)'}`, 
                                        padding: '30px', 
                                        borderRadius: '20px',
                                        maxWidth: '400px',
                                        boxShadow: isActive ? '0 10px 40px rgba(245, 158, 11, 0.1)' : 'none',
                                        transition: 'transform 0.3s',
                                    }}
                                    onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-5px)'}
                                    onMouseLeave={e => e.currentTarget.style.transform = ''}
                                    >
                                        <div style={{ fontSize: '12px', fontWeight: '800', color, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '8px' }}>
                                            {item.date}
                                        </div>
                                        <h3 style={{ fontSize: '24px', fontWeight: '800', marginBottom: '12px', color: isActive ? '#fff' : 'var(--text)' }}>
                                            {item.title}
                                        </h3>
                                        <p style={{ fontSize: '15px', color: 'var(--muted)', lineHeight: '1.6' }}>
                                            {item.desc}
                                        </p>
                                    </div>
                                </div>

                                {/* Center Dot */}
                                <div style={{ 
                                    flexShrink: 0, 
                                    width: '40px', 
                                    height: '40px', 
                                    borderRadius: '50%', 
                                    background: 'var(--background)',
                                    border: `2px solid ${color}`,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: color,
                                    boxShadow: isActive ? `0 0 20px ${color}` : 'none',
                                    zIndex: 2
                                }}>
                                    {isCompleted ? <FiCheckCircle size={20} /> : <FiCircle size={20} fill={isActive ? color : 'transparent'} />}
                                </div>

                                {/* Empty space for balance */}
                                <div style={{ flex: 1 }} />
                            </div>
                        );
                    })}
                </div>
            </section>

            <section style={{ padding: '80px 5%', textAlign: 'center', background: 'linear-gradient(90deg, transparent, rgba(245, 158, 11, 0.05, 11, 158, rgba(245, transparent))', borderTop: '1px solid var(--border)' }}>
                <div style={{ maxWidth: '600px', margin: '0 auto' }} className="reveal">
                    <h2 style={{ fontSize: '36px', fontWeight: '900', marginBottom: '20px' }}>Follow Venava.</h2>
                    <p style={{ fontSize: '16px', color: 'var(--muted)', marginBottom: '40px' }}>
                        Hear about future milestones in personal expression technology.
                    </p>
                    <Link href="/notify?product=venava" style={{
                        display: 'inline-flex', alignItems: 'center', gap: '12px',
                        background: 'linear-gradient(90deg, #f59e0b, #d97706, #f59e0b)',
                        color: '#fff', padding: '18px 40px', borderRadius: '50px',
                        fontWeight: '800', fontSize: '16px', textDecoration: 'none',
                        boxShadow: '0 10px 30px rgba(245, 158, 11, 0.3)',
                        transition: 'transform 0.3s, box-shadow 0.3s'
                    }}
                    onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.05)'; e.currentTarget.style.boxShadow = '0 15px 40px rgba(245, 158, 11, 0.5)'; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 10px 30px rgba(245, 158, 11, 0.3)'; }}
                    >
                        Sign Up Now <FiArrowRight size={20} />
                    </Link>
                </div>
            </section>

            <Footer />
            <ChatWidget />
            
            <style>{`
                @media (max-width: 768px) {
                    .timeline-line { left: 40px !important; transform: none !important; }
                    .reveal { flex-direction: row !important; text-align: left !important; gap: 20px !important; }
                    .reveal > div:first-child { justify-content: flex-start !important; text-align: left !important; }
                    .reveal > div:last-child { display: none; }
                }
            `}</style>
        </div>
    );
}
