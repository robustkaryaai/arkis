'use client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ChatWidget from '@/components/ChatWidget';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { 
    FiArrowRight, FiBookOpen, FiCpu, FiCode, FiAward, 
    FiUsers, FiMonitor, FiCheckCircle, FiStar, 
    FiShield, FiTerminal, FiDatabase, FiGrid, FiChevronDown
} from 'react-icons/fi';

const featuredLearning = [
    { title: 'DinoX', desc: 'Master Python through an immersive RPG experience.', icon: <FiCode size={22} />, partner: true },
    { title: 'AI Foundations', desc: 'Understand modern AI, LLMs, and neural networks from the ground up.', icon: <FiCpu size={22} /> },
    { title: 'Local AI', desc: 'Learn how private AI works directly on your own hardware.', icon: <FiMonitor size={22} /> },
    { title: 'Linux Essentials', desc: 'Master the operating system that runs the modern web.', icon: <FiTerminal size={22} /> },
    { title: 'Privacy Engineering', desc: 'Design systems that protect user data by default.', icon: <FiShield size={22} /> },
    { title: 'Future Computing', desc: 'Explore edge AI, robotics, and the next decade of tech.', icon: <FiDatabase size={22} /> },
];

const bundles = [
    {
        name: 'RK AI Student Pack',
        price: '₹599/mo',
        oldPrice: '₹999',
        badge: 'AI + Coding',
        features: ['RK AI PRO Subscription', 'DinoX Premium Unlocked', 'Exclusive Coding Missions', 'Student Community Access'],
        link: '/payment?plan=pro'
    },
    {
        name: 'Malus Student Pack',
        price: '₹499/mo',
        oldPrice: '₹899',
        badge: 'Security & Learning',
        features: ['Malus Pro (Antivirus)', 'DinoX Premium Unlocked', 'Privacy Engineering Path', 'Beta Developer Programs'],
        link: '/products/malus'
    },
    {
        name: 'Ultimate Ecosystem Pack',
        price: '₹1499/mo',
        oldPrice: '₹2499',
        badge: 'Best Value',
        featured: true,
        features: ['RK AI ELITE Subscription', 'Malus Pro (Antivirus)', 'DinoX Premium Unlocked', 'Future Certifications', 'Priority Support'],
        link: '/payment?plan=elite'
    }
];

const faqs = [
    { q: 'Is DinoX a RexyCore product?', a: 'No, DinoX is an independent partner product. It is our recommended platform for learning Python through an engaging RPG adventure, and we feature it heavily in our Academy bundles.' },
    { q: 'How do Student Bundles work?', a: 'Student bundles combine premium partner experiences (like DinoX) with RexyCore products (like RK AI) at massive educational discounts to give you the ultimate learning ecosystem.' },
    { q: 'Can I use RK AI without DinoX?', a: 'Absolutely. RK AI is a standalone desktop AI assistant. DinoX is simply the learning platform we recommend to help you master programming.' },
    { q: 'Can I buy DinoX separately?', a: 'Yes, you can purchase DinoX directly. However, our Academy bundles offer the highest value by packaging it alongside RK AI and Malus.' },
];

export default function AcademyPage() {
    const [openFaq, setOpenFaq] = useState(0);

    return (
        <div style={{ background: 'var(--bg)', color: 'var(--text)', minHeight: '100vh', overflowX: 'hidden' }}>
            <Navbar />

            {/* HERO SECTION */}
            <section className="hero" style={{ textAlign: 'center' }}>
                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div className="badge float-anim" style={{ marginBottom: '24px' }}>
                        <span className="dot" style={{ background: '#4ade80' }} /> RexyCore Academy
                    </div>
                    
                    <h1 style={{ fontSize: 'clamp(40px, 8vw, 82px)', lineHeight: '1.05', marginBottom: '24px', fontWeight: '900', letterSpacing: '-2px' }}>
                        The Real Future <span className="grad" style={{ backgroundImage: 'linear-gradient(135deg, #34d399, #3b82f6)' }}>Building Blocks.</span>
                    </h1>
                    
                    <p style={{ fontSize: '18px', lineHeight: '1.8', color: 'var(--muted)', marginBottom: '40px', maxWidth: '700px' }}>
                        Learn the technologies shaping tomorrow—from programming and AI to privacy-first computing—with carefully curated learning experiences, partner products, and exclusive student benefits.
                    </p>
                    
                    <div className="hero-btns">
                        <button onClick={() => document.getElementById('featured').scrollIntoView({ behavior: 'smooth' })} className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'linear-gradient(135deg, #34d399, #3b82f6)' }}>
                            Explore Learning <FiArrowRight size={18} />
                        </button>
                        <button onClick={() => document.getElementById('bundles').scrollIntoView({ behavior: 'smooth' })} className="btn-secondary" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                            <FiAward size={18} /> Student Programs
                        </button>
                    </div>
                </motion.div>
            </section>

            {/* FEATURED LEARNING */}
            <section id="featured" style={{ padding: '80px 5%' }}>
                <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
                    <div className="reveal" style={{ textAlign: 'center', marginBottom: '56px' }}>
                        <span className="label" style={{ color: '#34d399' }}>Curriculum</span>
                        <h2 className="section-title">Featured Learning</h2>
                        <p className="section-sub" style={{ margin: '0 auto' }}>Essential skills for the next generation of engineers and creators.</p>
                    </div>

                    <div className="feature-grid">
                        {featuredLearning.map((item, i) => (
                            <div key={i} className={`feature-card reveal reveal-delay-${i % 4 + 1}`}>
                                <div className="feature-icon" style={{ background: 'linear-gradient(135deg, rgba(52, 211, 153, 0.1), rgba(59, 130, 246, 0.1))', borderColor: 'rgba(52, 211, 153, 0.2)' }}>
                                    {item.icon}
                                </div>
                                {item.partner && (
                                    <span style={{ display: 'inline-block', padding: '4px 10px', background: 'rgba(251, 191, 36, 0.1)', color: '#fbbf24', fontSize: '10px', fontWeight: '800', letterSpacing: '1px', borderRadius: '4px', marginBottom: '12px', textTransform: 'uppercase' }}>
                                        Partner Experience
                                    </span>
                                )}
                                <h3>{item.title}</h3>
                                <p>{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* DINOX PARTNER HIGHLIGHT & BUNDLES */}
            <section id="bundles" style={{ padding: '80px 5%' }}>
                <div className="reveal" style={{ maxWidth: '1100px', margin: '0 auto', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '32px', padding: '60px', position: 'relative', overflow: 'hidden' }}>
                    <div style={{ position: 'absolute', top: 0, right: 0, width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(251, 191, 36, 0.08), transparent 70%)', pointerEvents: 'none' }} />
                    
                    <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexWrap: 'wrap', gap: '48px', alignItems: 'stretch' }}>
                        <div style={{ flex: '1 1 450px', display: 'flex', flexDirection: 'column' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
                                <img src="/dinox.png" alt="DinoX Logo" style={{ width: '60px', filter: 'drop-shadow(0 10px 20px rgba(251, 191, 36, 0.2))' }} />
                                <span style={{ display: 'inline-block', padding: '6px 14px', background: 'rgba(251, 191, 36, 0.1)', color: '#fbbf24', fontSize: '11px', fontWeight: '800', letterSpacing: '1px', borderRadius: '100px', textTransform: 'uppercase', border: '1px solid rgba(251, 191, 36, 0.2)' }}>
                                    Featured Learning Partner
                                </span>
                            </div>
                            <h2 style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: '900', marginBottom: '20px', letterSpacing: '-1px' }}>
                                DinoX
                            </h2>
                            <p style={{ color: 'var(--muted)', fontSize: '18px', lineHeight: '1.7', marginBottom: '32px' }}>
                                DinoX is our recommended platform for mastering Python through an engaging RPG adventure. Learn by playing, coding, and conquering.
                            </p>
                            
                            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 40px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                                {['Python 3', '400+ Missions', 'XP Progression', 'RPG Learning', 'Offline Mode', 'Desktop App'].map(f => (
                                    <li key={f} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '15px', fontWeight: '600', color: 'var(--text)' }}>
                                        <FiCheckCircle color="#fbbf24" size={18} /> {f}
                                    </li>
                                ))}
                            </ul>

                            <div style={{ marginTop: 'auto', display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                                <Link href="/academy/dinox" className="btn-primary" style={{ background: 'linear-gradient(135deg, #fbbf24, #f59e0b)', display: 'inline-flex', alignItems: 'center' }}>
                                    Learn More About DinoX
                                </Link>
                            </div>
                        </div>
                        
                        <div style={{ flex: '1 1 350px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            <h3 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '8px', color: '#fff' }}>Student Bundles</h3>
                            {bundles.map(b => (
                                <div key={b.name} style={{ background: b.featured ? 'rgba(59, 130, 246, 0.05)' : 'rgba(0,0,0,0.4)', border: `1px solid ${b.featured ? 'rgba(59, 130, 246, 0.3)' : 'var(--border)'}`, borderRadius: '20px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px', position: 'relative', overflow: 'hidden' }}>
                                    {b.featured && <div style={{ position: 'absolute', top: 0, right: 0, background: '#3b82f6', color: '#fff', fontSize: '10px', fontWeight: '800', padding: '4px 12px', borderBottomLeftRadius: '12px' }}>BEST VALUE</div>}
                                    <div>
                                        <div style={{ color: b.featured ? '#3b82f6' : '#fbbf24', fontSize: '11px', fontWeight: '800', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '4px' }}>{b.badge}</div>
                                        <div style={{ fontSize: '20px', fontWeight: '900', marginBottom: '4px' }}>{b.name}</div>
                                        <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                                            <span style={{ fontSize: '24px', fontWeight: '900' }}>{b.price}</span>
                                            <span style={{ fontSize: '14px', color: 'var(--muted)', textDecoration: 'line-through' }}>{b.oldPrice}</span>
                                        </div>
                                    </div>
                                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                        {b.features.map(f => (
                                            <li key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13px', color: 'var(--muted)' }}>
                                                <FiCheckCircle size={14} color={b.featured ? '#3b82f6' : 'var(--muted)'} style={{ flexShrink: 0, marginTop: '3px' }} />
                                                <span>{f}</span>
                                            </li>
                                        ))}
                                    </ul>
                                    <Link href={b.link} className={b.featured ? 'btn-primary' : 'btn-secondary'} style={{ width: '100%', padding: '10px', fontSize: '14px', marginTop: 'auto', background: b.featured ? 'linear-gradient(135deg, #34d399, #3b82f6)' : undefined, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                                        Claim Bundle
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* LEARNING PATHS & RESOURCES */}
            <section style={{ padding: '80px 5%' }}>
                <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '40px' }}>
                    
                    {/* Learning Paths */}
                    <div className="reveal reveal-delay-1">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                            <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(59, 130, 246, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#3b82f6' }}>
                                <FiGrid size={20} />
                            </div>
                            <h3 style={{ fontSize: '24px', fontWeight: '800' }}>Learning Paths</h3>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            {['Programming (Python, C++, Rust)', 'Artificial Intelligence (LLMs, Local AI)', 'Privacy & Security (Linux, Cyber)', 'Future Computing'].map(path => (
                                <div key={path} className="feature-card" style={{ padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}>
                                    <span style={{ fontWeight: '600' }}>{path}</span>
                                    <FiArrowRight color="var(--muted)" />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Certifications & Developer */}
                    <div className="reveal reveal-delay-2">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                            <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(168, 85, 247, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#a855f7' }}>
                                <FiAward size={20} />
                            </div>
                            <h3 style={{ fontSize: '24px', fontWeight: '800' }}>Certifications</h3>
                            <span style={{ background: 'rgba(255,255,255,0.1)', padding: '4px 8px', borderRadius: '4px', fontSize: '10px', fontWeight: '800', letterSpacing: '1px' }}>COMING SOON</span>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '40px' }}>
                            {['Python Foundations', 'AI Foundations', 'Privacy First Computing', 'Edge AI'].map(cert => (
                                <div key={cert} style={{ padding: '16px 20px', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border)', borderRadius: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', opacity: 0.6 }}>
                                    <span style={{ fontWeight: '600', fontSize: '14px' }}>{cert}</span>
                                    <FiAward color="var(--muted)" />
                                </div>
                            ))}
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                            <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(236, 72, 153, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ec4899' }}>
                                <FiCode size={20} />
                            </div>
                            <h3 style={{ fontSize: '24px', fontWeight: '800' }}>Developer Resources</h3>
                        </div>
                        <p style={{ color: 'var(--muted)', fontSize: '14px', lineHeight: '1.6', marginBottom: '16px' }}>
                            Access SDK tutorials, plugin development guides, and architecture breakdowns to build on top of RexyCore infrastructure.
                        </p>
                        <Link href="#" style={{ color: '#ec4899', fontSize: '14px', fontWeight: '700', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                            View Developer Docs <FiArrowRight />
                        </Link>
                    </div>

                </div>
            </section>

            {/* COMMUNITY & TESTIMONIALS */}
            <section style={{ padding: '80px 5%' }}>
                <div style={{ maxWidth: '1100px', margin: '0 auto', background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.05), rgba(168, 85, 247, 0.05))', border: '1px solid var(--border)', borderRadius: '32px', padding: '60px', textAlign: 'center' }} className="reveal">
                    <FiUsers size={40} color="#3b82f6" style={{ marginBottom: '24px' }} />
                    <h2 style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: '900', marginBottom: '16px' }}>Join the Academy Community</h2>
                    <p style={{ color: 'var(--muted)', maxWidth: '600px', margin: '0 auto 40px', fontSize: '16px', lineHeight: '1.7' }}>
                        Connect with thousands of students, participate in hackathons, share your projects, and learn together in our active Discord community.
                    </p>
                    
                    <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '60px' }}>
                        {['Student Discord', 'Hackathons', 'Leaderboards', 'Challenges'].map(c => (
                            <div key={c} style={{ padding: '10px 20px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '100px', fontSize: '14px', fontWeight: '600' }}>
                                {c}
                            </div>
                        ))}
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', textAlign: 'left' }}>
                        {[
                            { name: 'Arjun K.', role: 'Computer Science Student', text: '"The Creator Bundle completely changed how I learn. Playing DinoX while using RK AI to understand complex algorithms is literally the future of education."' },
                            { name: 'Sarah M.', role: 'Self-taught Developer', text: '"Finally, a platform that teaches real-world AI and privacy-first computing instead of just generic web dev tutorials. The quality is unmatched."' }
                        ].map((t, i) => (
                            <div key={i} style={{ background: 'var(--bg)', padding: '32px', borderRadius: '24px', border: '1px solid var(--border)' }}>
                                <div style={{ display: 'flex', gap: '4px', color: '#fbbf24', marginBottom: '16px' }}>
                                    <FiStar fill="currentColor" /><FiStar fill="currentColor" /><FiStar fill="currentColor" /><FiStar fill="currentColor" /><FiStar fill="currentColor" />
                                </div>
                                <p style={{ color: 'var(--text)', fontSize: '15px', lineHeight: '1.7', fontStyle: 'italic', marginBottom: '24px' }}>
                                    {t.text}
                                </p>
                                <div>
                                    <div style={{ fontWeight: '800', fontSize: '14px' }}>{t.name}</div>
                                    <div style={{ color: 'var(--muted)', fontSize: '12px' }}>{t.role}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section style={{ padding: '80px 5% 120px' }}>
                <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                    <div className="reveal" style={{ textAlign: 'center', marginBottom: '56px' }}>
                        <h2 className="section-title">Frequently Asked Questions</h2>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        {faqs.map((faq, i) => (
                            <div key={i} className="reveal reveal-delay-1" style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '16px', overflow: 'hidden' }}>
                                <button 
                                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                                    style={{ width: '100%', padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'none', border: 'none', color: 'var(--text)', cursor: 'pointer', textAlign: 'left' }}
                                >
                                    <span style={{ fontSize: '16px', fontWeight: '700' }}>{faq.q}</span>
                                    <FiChevronDown size={20} style={{ transform: openFaq === i ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.3s' }} />
                                </button>
                                {openFaq === i && (
                                    <div style={{ padding: '0 24px 24px', color: 'var(--muted)', fontSize: '15px', lineHeight: '1.7' }}>
                                        {faq.a}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
            <ChatWidget />
        </div>
    );
}
