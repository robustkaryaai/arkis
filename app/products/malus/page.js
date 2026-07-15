'use client';
import { useState, useRef, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FiCpu, FiEye, FiZap, FiShield, FiMessageSquare, FiActivity, FiLayers, FiCode, FiBookOpen, FiCrosshair, FiCheckSquare, FiCoffee, FiDownload, FiArrowDown } from 'react-icons/fi';

const emeraldTheme = {
    primary: '#10B981',
    primaryHover: '#059669',
    accent: '#34D399',
    bg: '#04120D',
    surface: '#0B1F17',
    border: 'rgba(16,185,129,0.15)',
    glow: 'rgba(16,185,129,0.4)',
    textPrimary: '#FFFFFF',
    textSecondary: '#C7D2D0'
};

const floatAnim = {
    y: [0, -10, 0],
    transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
    }
};

const glowAnim = {
    boxShadow: [
        `0 0 20px ${emeraldTheme.border}`,
        `0 0 40px ${emeraldTheme.glow}`,
        `0 0 20px ${emeraldTheme.border}`
    ],
    transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
    }
};

export default function MalusProductPage() {
    const { scrollYProgress } = useScroll();
    const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
    
    return (
        <div style={{ backgroundColor: emeraldTheme.bg, minHeight: '100vh', color: emeraldTheme.textPrimary, fontFamily: 'Inter, sans-serif', overflowX: 'hidden' }}>
            <Navbar />

            {/* HERO SECTION */}
            <section style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative', padding: '140px 5% 80px', textAlign: 'center', overflow: 'hidden' }}>
                {/* Background ambient glow */}
                <div style={{ position: 'absolute', top: '20%', left: '50%', transform: 'translate(-50%, -50%)', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(16,185,129,0.1) 0%, transparent 70%)', filter: 'blur(60px)', zIndex: 0 }} />

                <div style={{ position: 'relative', zIndex: 1, maxWidth: '1000px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                        <div style={{ display: 'inline-block', padding: '8px 16px', borderRadius: '50px', background: 'rgba(16,185,129,0.1)', border: `1px solid ${emeraldTheme.border}`, color: emeraldTheme.primary, fontSize: '14px', fontWeight: '600', marginBottom: '24px', letterSpacing: '1px', textTransform: 'uppercase' }}>
                            Your AI Operating Companion
                        </div>
                    </motion.div>

                    <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} style={{ fontSize: 'clamp(48px, 8vw, 92px)', fontWeight: '900', lineHeight: '1.1', letterSpacing: '-2px', marginBottom: '24px' }}>
                        Meet <span style={{ color: emeraldTheme.primary, textShadow: `0 0 40px ${emeraldTheme.glow}` }}>MALUS</span>
                    </motion.h1>

                    <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} style={{ fontSize: 'clamp(20px, 3vw, 28px)', color: emeraldTheme.textPrimary, fontWeight: '500', marginBottom: '16px', maxWidth: '800px', lineHeight: '1.4' }}>
                        Your computer already knows what's happening. <br/>
                        <span style={{ color: emeraldTheme.textSecondary }}>Now it has an intelligence that understands it.</span>
                    </motion.p>

                    <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }} style={{ fontSize: 'clamp(16px, 1.8vw, 20px)', color: emeraldTheme.textSecondary, maxWidth: '750px', lineHeight: '1.7', marginBottom: '40px' }}>
                        Malus is an AI Operating Companion that understands your workflow, observes your computer with your permission, and naturally offers help when it matters. It doesn't wait for commands—it understands context.
                    </motion.p>

                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }} style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
                        <Link href="#download" style={{ textDecoration: 'none' }}>
                            <motion.button whileHover={{ scale: 1.05, backgroundColor: emeraldTheme.primaryHover, boxShadow: `0 0 30px ${emeraldTheme.glow}` }} whileTap={{ scale: 0.95 }} style={{ padding: '16px 48px', fontSize: '18px', background: emeraldTheme.primary, border: 'none', cursor: 'pointer', fontWeight: '700', borderRadius: '50px', color: '#fff', transition: 'background-color 0.3s ease', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                Download for Windows
                            </motion.button>
                        </Link>
                        <Link href="#architecture" style={{ textDecoration: 'none' }}>
                            <motion.button whileHover={{ scale: 1.05, backgroundColor: 'rgba(16,185,129,0.1)' }} whileTap={{ scale: 0.95 }} style={{ padding: '16px 48px', fontSize: '18px', background: 'transparent', border: `1px solid ${emeraldTheme.primary}`, cursor: 'pointer', fontWeight: '700', borderRadius: '50px', color: emeraldTheme.primary, transition: 'all 0.3s ease', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                Learn More
                            </motion.button>
                        </Link>
                    </motion.div>

                    {/* Animated Illustration Placeholder */}
                    <motion.div animate={floatAnim} style={{ marginTop: '80px', position: 'relative', width: '100%', maxWidth: '800px', height: '400px', background: emeraldTheme.surface, border: `1px solid ${emeraldTheme.border}`, borderRadius: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', boxShadow: `0 20px 60px rgba(0,0,0,0.5)` }}>
                        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(/malus.jpeg)', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.4, filter: 'blur(4px)' }} />
                        <motion.div animate={glowAnim} style={{ width: '120px', height: '120px', borderRadius: '50%', background: emeraldTheme.primary, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2, position: 'relative' }}>
                            <FiActivity size={50} color="#fff" />
                        </motion.div>
                        {/* Connecting lines illustration */}
                        <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 1 }} opacity="0.3">
                            <line x1="50%" y1="50%" x2="20%" y2="20%" stroke={emeraldTheme.primary} strokeWidth="2" strokeDasharray="4" />
                            <line x1="50%" y1="50%" x2="80%" y2="20%" stroke={emeraldTheme.primary} strokeWidth="2" strokeDasharray="4" />
                            <line x1="50%" y1="50%" x2="20%" y2="80%" stroke={emeraldTheme.primary} strokeWidth="2" strokeDasharray="4" />
                            <line x1="50%" y1="50%" x2="80%" y2="80%" stroke={emeraldTheme.primary} strokeWidth="2" strokeDasharray="4" />
                        </svg>
                    </motion.div>
                </div>
                
                {/* Scroll Indicator */}
                <motion.div animate={{ y: [0, 10, 0], opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity }} style={{ position: 'absolute', bottom: '40px', color: emeraldTheme.primary }}>
                    <FiArrowDown size={32} />
                </motion.div>
            </section>

            {/* FEATURES SECTION */}
            <section style={{ padding: '120px 5%', position: 'relative', zIndex: 2 }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <h2 style={{ fontSize: 'clamp(32px, 5vw, 48px)', textAlign: 'center', marginBottom: '80px', fontWeight: '800' }}>Beyond an Assistant. <span style={{ color: emeraldTheme.primary }}>An Extension of You.</span></h2>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px' }}>
                        {[
                            { icon: FiEye, title: "Context Awareness", desc: "Understands what application you're using and what you're trying to accomplish." },
                            { icon: FiZap, title: "Workflow Intelligence", desc: "Learns your workflow and offers timely suggestions without interrupting." },
                            { icon: FiCpu, title: "Local AI First", desc: "Runs with local language models whenever possible for privacy and speed." },
                            { icon: FiActivity, title: "Resource Aware", desc: "Continuously monitors RAM, CPU, GPU, battery, and system health before deciding which AI model to use." },
                            { icon: FiShield, title: "Privacy by Design", desc: "Nothing is observed without user permission. Privacy is a core principle—not an afterthought." },
                            { icon: FiMessageSquare, title: "Smart Conversations", desc: "Talks like a teammate instead of a robotic assistant. Supports, jokes, warns, and explains naturally." }
                        ].map((feature, i) => (
                            <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }} whileHover={{ y: -5, borderColor: emeraldTheme.primary, boxShadow: `0 10px 30px rgba(16,185,129,0.1)` }} style={{ background: emeraldTheme.surface, padding: '40px', borderRadius: '24px', border: `1px solid ${emeraldTheme.border}`, transition: 'all 0.3s ease' }}>
                                <div style={{ width: '64px', height: '64px', borderRadius: '16px', background: 'rgba(16,185,129,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
                                    <feature.icon size={32} color={emeraldTheme.primary} />
                                </div>
                                <h3 style={{ fontSize: '24px', marginBottom: '16px', fontWeight: '700' }}>{feature.title}</h3>
                                <p style={{ color: emeraldTheme.textSecondary, lineHeight: '1.6', fontSize: '16px' }}>{feature.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* EXAMPLE SCENARIOS SECTION */}
            <section style={{ padding: '120px 5%', background: `linear-gradient(to bottom, transparent, ${emeraldTheme.surface})` }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <h2 style={{ fontSize: 'clamp(32px, 5vw, 48px)', textAlign: 'center', marginBottom: '80px', fontWeight: '800' }}>Help at the Right Moment</h2>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
                        {[
                            { icon: FiCode, title: "Coding", text: "\"Looks like you've been debugging this function for a while. The object might not be initialized before use.\"" },
                            { icon: FiBookOpen, title: "Studying", text: "\"This topic appears frequently in previous exams. Want a quick revision?\"" },
                            { icon: FiCrosshair, title: "Gaming", text: "\"You've attempted this boss several times. Try changing your strategy instead of your weapon.\"" },
                            { icon: FiCheckSquare, title: "Productivity", text: "\"This repetitive task can be automated in under a minute.\"" },
                            { icon: FiCoffee, title: "Healthy Habits", text: "\"You've been scrolling for a while. Maybe it's a good time for a short break.\"" }
                        ].map((scenario, i) => (
                            <motion.div key={i} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.1 }} style={{ background: emeraldTheme.bg, padding: '32px', borderRadius: '20px', border: `1px solid ${emeraldTheme.border}`, display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <scenario.icon size={24} color={emeraldTheme.accent} />
                                    <h4 style={{ color: emeraldTheme.accent, fontWeight: '600' }}>{scenario.title}</h4>
                                </div>
                                <p style={{ fontSize: '18px', fontStyle: 'italic', color: emeraldTheme.textPrimary, lineHeight: '1.5' }}>{scenario.text}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ARCHITECTURE SECTION */}
            <section id="architecture" style={{ padding: '120px 5%' }}>
                <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                    <FiLayers size={48} color={emeraldTheme.primary} style={{ marginBottom: '24px' }} />
                    <h2 style={{ fontSize: 'clamp(32px, 5vw, 48px)', marginBottom: '32px', fontWeight: '800' }}>The Context Engine</h2>
                    <p style={{ fontSize: '20px', color: emeraldTheme.textSecondary, marginBottom: '60px', maxWidth: '700px', lineHeight: '1.6' }}>
                        Malus acts as a context engine that securely understands what's happening on your system in real-time, feeding that awareness into its intelligence layer.
                    </p>

                    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '16px', marginBottom: '60px' }}>
                        {['Active Applications', 'Workflow Patterns', 'System Resources', 'User Context', 'Open Files (with permission)', 'Clipboard (optional)', 'Notifications (optional)'].map((item, i) => (
                            <motion.div key={i} whileHover={{ scale: 1.05, backgroundColor: 'rgba(16,185,129,0.1)' }} style={{ padding: '12px 24px', borderRadius: '50px', border: `1px solid ${emeraldTheme.border}`, background: emeraldTheme.surface, color: emeraldTheme.textPrimary, fontSize: '16px', fontWeight: '500' }}>
                                {item}
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* REXYCORE ECOSYSTEM SECTION */}
            <section style={{ padding: '120px 5%', background: emeraldTheme.surface }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <h2 style={{ fontSize: 'clamp(32px, 5vw, 48px)', textAlign: 'center', marginBottom: '80px', fontWeight: '800' }}>The RexyCore Ecosystem</h2>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
                        
                        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ width: '100%', maxWidth: '600px', padding: '40px', borderRadius: '24px', background: `linear-gradient(135deg, rgba(16,185,129,0.15), rgba(16,185,129,0.05))`, border: `1px solid ${emeraldTheme.primary}`, textAlign: 'center', position: 'relative' }}>
                            <h3 style={{ fontSize: '28px', color: emeraldTheme.primary, marginBottom: '8px', fontWeight: '800' }}>MALUS</h3>
                            <p style={{ color: emeraldTheme.accent, fontWeight: '600', marginBottom: '16px' }}>AI Operating Companion</p>
                            <p style={{ color: emeraldTheme.textSecondary, lineHeight: '1.6' }}>Observes context, understands workflows, and provides intelligent awareness.</p>
                        </motion.div>

                        <motion.div animate={{ y: [0, 5, 0] }} transition={{ duration: 2, repeat: Infinity }} style={{ color: emeraldTheme.primary }}>
                            <FiArrowDown size={32} />
                        </motion.div>

                        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} style={{ width: '100%', maxWidth: '600px', padding: '40px', borderRadius: '24px', background: '#09090b', border: '1px solid rgba(255,255,255,0.1)', textAlign: 'center' }}>
                            <h3 style={{ fontSize: '28px', color: '#fff', marginBottom: '8px', fontWeight: '800' }}>RK AI</h3>
                            <p style={{ color: '#ec4899', fontWeight: '600', marginBottom: '16px' }}>AI Assistant</p>
                            <p style={{ color: '#a1a1aa', lineHeight: '1.6' }}>Executes tasks, performs reasoning, automation, generation, and tool usage.</p>
                        </motion.div>

                        <motion.div animate={{ y: [0, 5, 0] }} transition={{ duration: 2, repeat: Infinity }} style={{ color: 'rgba(255,255,255,0.2)' }}>
                            <FiArrowDown size={32} />
                        </motion.div>

                        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }} style={{ width: '100%', maxWidth: '600px', padding: '40px', borderRadius: '24px', background: 'transparent', border: '1px dashed rgba(255,255,255,0.2)', textAlign: 'center' }}>
                            <h3 style={{ fontSize: '24px', color: '#fff', marginBottom: '16px', fontWeight: '700' }}>Future RexyCore Products</h3>
                            <p style={{ color: '#a1a1aa', lineHeight: '1.6' }}>Designed to integrate seamlessly with the ecosystem.</p>
                        </motion.div>
                        
                    </div>
                    
                    <p style={{ textAlign: 'center', marginTop: '60px', color: emeraldTheme.textSecondary, fontStyle: 'italic', fontSize: '18px' }}>
                        "MALUS and RK AI are independent products that become even more powerful when used together."
                    </p>
                </div>
            </section>

            {/* DOWNLOAD SECTION */}
            <section id="download" style={{ padding: '120px 5%', position: 'relative', zIndex: 2 }}>
                <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center', background: `linear-gradient(to bottom right, ${emeraldTheme.surface}, ${emeraldTheme.bg})`, padding: '80px 40px', borderRadius: '32px', border: `1px solid ${emeraldTheme.border}`, boxShadow: `0 20px 80px rgba(0,0,0,0.5)` }}>
                    <FiDownload size={48} color={emeraldTheme.primary} style={{ marginBottom: '24px' }} />
                    <h2 style={{ fontSize: 'clamp(36px, 5vw, 56px)', fontWeight: '900', marginBottom: '16px' }}>Download MALUS</h2>
                    <p style={{ fontSize: '20px', color: emeraldTheme.accent, fontWeight: '600', marginBottom: '40px' }}>Windows (Initial Release)</p>
                    
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '48px', flexWrap: 'wrap' }}>
                        <Link href="#" style={{ textDecoration: 'none' }}>
                            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} style={{ padding: '16px 48px', fontSize: '18px', background: emeraldTheme.primary, border: 'none', cursor: 'pointer', fontWeight: '700', borderRadius: '50px', color: '#fff' }}>
                                Download (Coming Soon)
                            </motion.button>
                        </Link>
                        <Link href="#" style={{ textDecoration: 'none' }}>
                            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} style={{ padding: '16px 48px', fontSize: '18px', background: 'transparent', border: `1px solid rgba(255,255,255,0.2)`, cursor: 'pointer', fontWeight: '700', borderRadius: '50px', color: '#fff' }}>
                                Release Notes
                            </motion.button>
                        </Link>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'center', gap: '32px', color: emeraldTheme.textSecondary }}>
                        <div>
                            <p style={{ fontWeight: '700', marginBottom: '8px', color: '#fff' }}>Coming Later:</p>
                            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', gap: '16px' }}>
                                <li>• Linux</li>
                                <li>• macOS</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* FOOTER QUOTE */}
            <section style={{ padding: '100px 5%', textAlign: 'center', background: emeraldTheme.bg }}>
                <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                    <p style={{ fontSize: 'clamp(24px, 4vw, 36px)', fontWeight: '300', fontStyle: 'italic', lineHeight: '1.5', color: emeraldTheme.textPrimary }}>
                        "The smartest computer isn't the fastest one.<br/>
                        <span style={{ color: emeraldTheme.primary, fontWeight: '600' }}>It's the one that understands you.</span>"
                    </p>
                </div>
            </section>

            <Footer />
        </div>
    );
}
