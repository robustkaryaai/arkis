'use client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ChatWidget from '@/components/ChatWidget';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function RKAiHomeLearnMore() {
    return (
        <div style={{ background: 'var(--void)', minHeight: '100vh', color: 'var(--text)' }}>
            <Navbar />
            
            <main style={{ paddingTop: '120px', paddingBottom: '80px', maxWidth: '1100px', margin: '0 auto', paddingLeft: '4%', paddingRight: '4%' }}>
                <Link href="/products/rk-ai-home" style={{ color: '#ec4899', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '40px', fontWeight: '600' }}>
                    ← Back to RK AI Home
                </Link>
                
                <div className="reveal reveal-delay-0" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', background: 'rgba(236,72,153,0.1)', color: '#ec4899', borderRadius: '999px', fontSize: '13px', fontWeight: '700', marginBottom: '24px', letterSpacing: '1px', textTransform: 'uppercase' }}>
                    Intelligence that feels at home.
                </div>

                <h1 className="reveal reveal-delay-0" style={{ fontSize: 'clamp(40px, 6vw, 64px)', fontWeight: '900', marginBottom: '24px', lineHeight: '1.1' }}>
                    The AI That Lives <br /><span className="grad-home">With You</span>
                </h1>
                
                <p className="reveal reveal-delay-1" style={{ fontSize: '20px', color: 'var(--subtext)', lineHeight: '1.7', maxWidth: '800px', marginBottom: '60px' }}>
                    RK AI Home transforms any home into a private, intelligent environment. Running primarily on low-power hardware like the Raspberry Pi, it delivers voice assistance, automation, announcements, alarms, reminders, music, and family organization—all while keeping your personal data local whenever possible.
                    <br /><br />
                    Unlike traditional smart speakers, RK AI Home is designed around privacy-first intelligence. It understands your routines, communicates naturally, and integrates seamlessly with the RexyCore ecosystem. Whether it's controlling your home, helping students study, managing schedules, or simply playing your favorite playlist, RK AI Home becomes a trusted digital companion rather than just another smart device.
                </p>

                <div className="reveal reveal-delay-2" style={{ background: 'var(--glass)', border: '1px solid var(--glass-border)', borderRadius: '24px', padding: '40px', marginBottom: '40px' }}>
                    <h2 style={{ fontSize: '28px', fontWeight: '800', marginBottom: '24px' }}>Highlights</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
                        {[
                            'Offline-first architecture',
                            'Voice assistant with natural conversations',
                            'Smart home automation',
                            'Family announcements & reminders',
                            'Music & playlist support',
                            'Local AI with optional cloud enhancement',
                            'Seamless RexyCore integration'
                        ].map((feature, i) => (
                            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '16px', color: 'var(--text)' }}>
                                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ec4899', boxShadow: '0 0 10px #ec4899' }} />
                                {feature}
                            </div>
                        ))}
                    </div>
                </div>
            </main>

            <Footer />
            <ChatWidget />
        </div>
    );
}
