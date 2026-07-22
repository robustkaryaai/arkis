'use client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ChatWidget from '@/components/ChatWidget';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
    FiArrowRight, FiCode, FiGlobe, FiMonitor, 
    FiHeart, FiPlayCircle, FiCloud, FiAward, 
    FiCheckCircle, FiStar, FiZap 
} from 'react-icons/fi';

export default function DinoXPage() {
    return (
        <div style={{ background: 'var(--bg)', color: 'var(--text)', minHeight: '100vh', overflowX: 'hidden' }}>
            <Navbar />

            {/* HERO */}
            <section className="hero" style={{ textAlign: 'center', padding: '120px 5% 80px' }}>
                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div className="badge float-anim" style={{ marginBottom: '32px' }}>
                        <span className="dot" style={{ background: '#2dd4bf' }} /> Partner Experience
                    </div>
                    
                    <img src="/dinox.png" alt="DinoX Logo" style={{ width: '140px', height: '140px', objectFit: 'contain', marginBottom: '24px', filter: 'drop-shadow(0 10px 30px rgba(139, 92, 246, 0.4))' }} />
                    
                    <h1 style={{ fontSize: 'clamp(40px, 8vw, 82px)', lineHeight: '1.05', marginBottom: '24px', fontWeight: '900', letterSpacing: '-2px' }}>
                        Project <span className="grad" style={{ backgroundImage: 'linear-gradient(135deg, #8b5cf6, #2dd4bf)' }}>DinoX</span>
                    </h1>
                    
                    <p style={{ fontSize: '20px', fontWeight: '600', color: 'var(--text)', marginBottom: '16px' }}>
                        The Ultimate Gamified Coding Universe.
                    </p>
                    <p style={{ fontSize: '18px', lineHeight: '1.8', color: 'var(--muted)', marginBottom: '40px', maxWidth: '700px' }}>
                        Learning to code shouldn't be boring. DinoX merges addictive RPG progression with real-world programming education. Play for free, level up, and master Python and JavaScript.
                    </p>
                    
                    <div className="hero-btns">
                        <Link href="/academy#bundles" className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'linear-gradient(135deg, #8b5cf6, #2dd4bf)', boxShadow: '0 14px 28px rgba(139, 92, 246, 0.3)' }}>
                            View Bundles <FiArrowRight size={18} />
                        </Link>
                    </div>
                </motion.div>
            </section>

            {/* WHAT WE'VE BUILT */}
            <section style={{ padding: '80px 5%' }}>
                <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
                    <div className="reveal" style={{ textAlign: 'center', marginBottom: '56px' }}>
                        <h2 className="section-title">The Journey & Features</h2>
                        <p className="section-sub" style={{ margin: '0 auto' }}>From a blank canvas to a fully-fledged learning application.</p>
                    </div>

                    <div className="feature-grid">
                        {[
                            { title: 'The Dashboard', icon: <FiMonitor size={24} />, desc: 'The central hub to track your Level, XP, DinoCoins, Daily Streaks, and Treasure Boxes in a beautiful glassmorphism UI.' },
                            { title: 'Learning Universes', icon: <FiGlobe size={24} />, desc: 'Hundreds of structured missions across thematic worlds like Jurassic and Matrix to learn Python, JS, and HTML/CSS.' },
                            { title: 'The Sandbox', icon: <FiCode size={24} />, desc: 'An integrated Monaco Editor for free-play. Write, run, and test code securely right in your browser.' },
                            { title: 'My Dino', icon: <FiHeart size={24} />, desc: 'A 3D Virtual Pet System. Bond with your Dino, feed it, and use DinoCoins to buy hats, glasses, and backgrounds.' },
                            { title: 'The Arcade', icon: <FiPlayCircle size={24} />, desc: 'Take a break with fully playable mini-games like Flappy Dino, Dino Runner, and Dino Match.' },
                            { title: 'Multiplayer & Cloud', icon: <FiCloud size={24} />, desc: 'Firebase integration for cloud saves, unique @usernames, and a Community Hub to connect with friends.' }
                        ].map((f, i) => (
                            <div key={i} className={`feature-card reveal reveal-delay-${i % 3 + 1}`}>
                                <div className="feature-icon" style={{ background: 'rgba(139, 92, 246, 0.1)', color: '#8b5cf6', borderColor: 'rgba(139, 92, 246, 0.2)' }}>
                                    {f.icon}
                                </div>
                                <h3>{f.title}</h3>
                                <p>{f.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CURRENT FEATURE SET LIST */}
            <section style={{ padding: '80px 5%', background: 'var(--surface)' }}>
                <div style={{ maxWidth: '900px', margin: '0 auto' }} className="reveal">
                    <h2 style={{ fontSize: '32px', fontWeight: '900', marginBottom: '32px', textAlign: 'center' }}>🛠️ Current Capabilities</h2>
                    <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
                        {[
                            'Gamified Progression (XP, Levels, Streaks)',
                            'Interactive Missions & Challenges',
                            'Live Code Execution in Browser',
                            'Virtual Pet System & Wardrobe',
                            'In-Game Economy (DinoCoins)',
                            'Secure Cloud Accounts',
                            'Social System & Friend Requests',
                            'Mini-Games Hub',
                            'Developer Cheat Codes'
                        ].map(feature => (
                            <li key={feature} style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'var(--bg)', padding: '16px 20px', borderRadius: '16px', border: '1px solid var(--border)' }}>
                                <FiCheckCircle color="#8b5cf6" size={20} />
                                <span style={{ fontWeight: '600' }}>{feature}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            {/* THE FUTURE */}
            <section style={{ padding: '80px 5% 120px' }}>
                <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
                    <div className="reveal" style={{ textAlign: 'center', marginBottom: '56px' }}>
                        <span className="label" style={{ color: '#ec4899' }}>Roadmap</span>
                        <h2 className="section-title">Where Does DinoX Go Next?</h2>
                        <p className="section-sub" style={{ margin: '0 auto' }}>The foundation is solid, but the potential is limitless.</p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
                        {[
                            { title: 'Multiplayer Battles', desc: 'Challenge friends to 1v1 coding races. First to solve wins DinoCoins and steals XP!' },
                            { title: 'Global Leaderboards', desc: 'Competitive ranking system for highest levels, streaks, and arcade scores.' },
                            { title: 'Community Missions', desc: 'Use the Sandbox to create and publish custom coding challenges for friends.' },
                            { title: 'Real 3D Integration', desc: 'Fully interactive, animated 3D Dino models using Three.js.' },
                            { title: 'Advanced Trading', desc: 'Trade rare hats, glasses, or backgrounds with friends in a secure economy.' },
                            { title: 'Expanding Universes', desc: 'New programming languages like C++, Rust, and SQL with unique boss battles.' }
                        ].map((item, i) => (
                            <div key={i} className={`reveal reveal-delay-${i % 3 + 1}`} style={{ padding: '32px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '24px' }}>
                                <h3 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <FiZap color="#8b5cf6" /> {item.title}
                                </h3>
                                <p style={{ color: 'var(--muted)', lineHeight: '1.6' }}>{item.desc}</p>
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
