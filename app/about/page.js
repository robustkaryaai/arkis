'use client';
import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import ChatWidget from '@/components/ChatWidget';
import Footer from '@/components/Footer';
import Link from 'next/link';

export default function About() {
    useEffect(() => {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

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
        <div style={{ background: 'var(--background)', color: 'var(--text)', minHeight: '100vh' }}>
            <Navbar />

            <section className="hero" style={{ minHeight: '60vh', paddingTop: '120px', paddingBottom: '60px', textAlign: 'center' }}>
                <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                    <div className="badge float-anim" style={{ margin: '0 auto 16px' }}><span className="dot" />Our Vision</div>
                    <h1 style={{ fontSize: 'clamp(36px,6vw,72px)', lineHeight: '1.2' }}>Built for,<br /><span className="grad">everyone.</span></h1>
                    <p style={{ fontSize: '1.2rem', opacity: 0.8, marginTop: '20px' }}>ARKIS is a technology company focused on building intelligent systems — from AI assistants to operating systems.</p>
                </div>
            </section>

            <section style={{ padding: '80px 5%', maxWidth: '1200px', margin: '0 auto' }}>
                <div className="label reveal">Mission</div>
                <h2 className="section-title reveal reveal-delay-1">AI that respects you.</h2>
                <div className="section-sub reveal reveal-delay-2" style={{ maxWidth: '900px', lineHeight: '1.8', opacity: 0.9 }}>
                    <p style={{ marginBottom: '24px' }}>
                        ARKIS is a technology company dedicated to building the intelligent systems of the future — from specialized AI assistants to native operating systems. Our mission is to bridge the gap between high-performance computing and true personal privacy. We believe that technology should empower human potential without requiring the sacrifice of digital autonomy.
                    </p>
                    <p style={{ marginBottom: '24px' }}>
                        At the core of our philosophy is the belief that the future of AI is local. By shifting processing power from the cloud back to the edge, we enable experiences that are fast, private, and entirely under your control. Whether you are using our <strong>RK AI Desktop</strong> for professional workflows or our <strong>RK AI Home</strong> assistant for hands-free coordination, ARKIS builds the infrastructure that keeps your data where it belongs: with you.
                    </p>
                    <p>
                        We aren't just building tools; we are designing an ecosystem. From the custom-engineered hardware of our <strong>Home Assistant</strong> to the AI-native kernel of <strong>Lumina OS</strong>, every product we create is a pillar in a new standard of computing. One where privacy is the default, ownership is real, and innovation is relentless.
                    </p>
                </div>
            </section>

            <section style={{ padding: '80px 5%', maxWidth: '1200px', margin: '0 auto' }}>
                <div className="label reveal">Ecosystem</div>
                <h2 className="section-title reveal reveal-delay-1">Technological pillars.</h2>
                <div className="feature-grid" style={{
                    display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: '40px', marginTop: '60px'
                }}>
                    {[
                        ['💻', 'ARKIS Desktop', 'The flagship AI layer for Windows & macOS. Local model execution, system-wide automation, and privacy-first intelligence.'],
                        ['🏠', 'ARKIS Home', 'Hardware-integrated ambient intelligence powered by Gemini. Optimized for Raspberry Pi Zero W with offline fallback and intent routing.'],
                        ['💿', 'Lumina OS', 'A next-generation, AI-native operating system built on Linux. Includes a system-level AI disable switch for total user control.'],
                        ['⌨️', 'Light Key', 'An intelligent input system that bridges the gap between thoughts and machines with contextual suggestions and smart commands.'],
                    ].map(([icon, title, desc], i) => (
                        <div key={title} className={`feature-card reveal reveal-delay-${(i % 4) + 1}`} style={{
                            background: 'var(--surface)', padding: '32px', borderRadius: '24px',
                            border: '1px solid var(--border)'
                        }}>
                            <div style={{ fontSize: '40px', marginBottom: '20px' }}>{icon}</div>
                            <h3 style={{ fontSize: '22px', marginBottom: '12px' }}>{title}</h3>
                            <p style={{ color: 'var(--muted)', fontSize: '15px', lineHeight: '1.6' }}>{desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section style={{ textAlign: 'center', padding: '100px 5%' }} className="reveal">
                <h2 className="section-title">Join the ecosystem.</h2>
                <p className="section-sub" style={{ margin: '0 auto 32px' }}>Be part of the future of intelligent computing.</p>
                <Link className="btn-primary" href="/products" style={{ padding: '18px 40px', borderRadius: '50px' }}>Explore ARKIS Products →</Link>
            </section>

            <Footer />
            <ChatWidget />
        </div>
    );
}
