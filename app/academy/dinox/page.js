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

const G = '#10b981';
const GL = '#34d399';

export default function DinoXPage() {
    return (
        <div style={{ background: 'var(--void)', color: '#fff', minHeight: '100vh', overflowX: 'hidden', position: 'relative' }}>
            <div className="noise" aria-hidden />
            <div className="nebula" aria-hidden>
                <div className="nebula__orb" style={{ background: 'radial-gradient(circle, rgba(16,185,129,0.45) 0%, transparent 60%)', width: '80vw', height: '80vw', top: '-25%', left: '-20%', animation: 'drift1 28s ease-in-out infinite alternate' }} />
                <div className="nebula__orb" style={{ background: 'radial-gradient(circle, rgba(5,150,105,0.3) 0%, transparent 60%)', width: '60vw', height: '60vw', bottom: '-15%', right: '-15%', animation: 'drift2 35s ease-in-out infinite alternate-reverse' }} />
                <div className="nebula__orb" style={{ background: 'radial-gradient(circle, rgba(52,211,153,0.2) 0%, transparent 60%)', width: '40vw', height: '40vw', top: '40%', left: '35%', animation: 'drift3 22s ease-in-out infinite alternate' }} />
                <div className="nebula__orb" style={{ background: 'radial-gradient(circle, rgba(16,185,129,0.15) 0%, transparent 60%)', width: '30vw', height: '30vw', top: '15%', right: '10%', animation: 'drift4 30s ease-in-out infinite alternate' }} />
            </div>
            <Navbar />

            {/* HERO */}
            <section className="hero" style={{ textAlign: 'center', padding: '120px 5% 80px' }}>
                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div className="hero-eyebrow float-anim" style={{ marginBottom: '32px', color: GL, border: '1px solid rgba(52,211,153,0.3)', background: 'rgba(16,185,129,0.08)' }}>
                        <span className="pulse" style={{ background: G, boxShadow: `0 0 10px ${G}` }} /> Partner Experience
                    </div>
                    
                    <img src="/dinox.png" alt="DinoX Logo" style={{ width: '140px', height: '140px', objectFit: 'contain', marginBottom: '24px', filter: `drop-shadow(0 10px 40px rgba(16,185,129,0.5))` }} />
                    
                    <h1 style={{ fontSize: 'clamp(40px, 8vw, 82px)', lineHeight: '1.05', marginBottom: '24px', fontWeight: '900', letterSpacing: '-2px' }}>
                        Project <span className="flow-text flow-text--emerald" style={{ display: 'inline-block' }}>DinoX</span>
                    </h1>
                    
                    <p style={{ fontSize: '20px', fontWeight: '600', color: 'rgba(255,255,255,0.9)', marginBottom: '16px' }}>
                        The Ultimate Gamified Coding Universe.
                    </p>
                    <p style={{ fontSize: '18px', lineHeight: '1.8', color: 'rgba(255,255,255,0.5)', marginBottom: '40px', maxWidth: '700px' }}>
                        Learning to code shouldn't be boring. DinoX merges addictive RPG progression with real-world programming education. Play for free, level up, and master Python and JavaScript.
                    </p>
                    
                    <div className="hero-btns">
                        <Link href="/academy#bundles" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '15px 32px', borderRadius: '99px', background: `linear-gradient(135deg, ${G}, #059669)`, color: '#fff', fontWeight: 800, fontSize: 15, textDecoration: 'none', boxShadow: `0 8px 32px rgba(16,185,129,0.4)` }}>
                            View Bundles <FiArrowRight size={18} />
                        </Link>
                        <a href="https://antverse.vercel.app" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '15px 32px', borderRadius: '99px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(52,211,153,0.2)', color: GL, fontWeight: 800, fontSize: 15, textDecoration: 'none' }}>
                            Play DinoX ↗
                        </a>
                    </div>
                </motion.div>
            </section>

            {/* WHAT WE'VE BUILT */}
            <section style={{ padding: '80px 5%', position: 'relative', zIndex: 10 }}>
                <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
                    <div className="reveal" style={{ textAlign: 'center', marginBottom: '56px' }}>
                        <span className="label" style={{ color: GL }}>Features</span>
                        <h2 className="section-title">The Journey &amp; Features</h2>
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
                            <div key={i} className={`feature-card reveal reveal-delay-${i % 3 + 1}`} style={{ borderColor: 'rgba(16,185,129,0.1)' }}>
                                <div className="feature-icon" style={{ background: 'rgba(16,185,129,0.1)', color: G, border: '1px solid rgba(16,185,129,0.2)' }}>
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
            <section style={{ padding: '80px 5%', background: 'rgba(16,185,129,0.03)', borderTop: '1px solid rgba(16,185,129,0.1)', borderBottom: '1px solid rgba(16,185,129,0.1)', position: 'relative', zIndex: 10 }}>
                <div style={{ maxWidth: '900px', margin: '0 auto' }} className="reveal">
                    <h2 style={{ fontSize: '32px', fontWeight: '900', marginBottom: '32px', textAlign: 'center' }}>🛠️ Current Capabilities</h2>
                    <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
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
                            <li key={feature} style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'rgba(16,185,129,0.05)', padding: '16px 20px', borderRadius: '16px', border: '1px solid rgba(16,185,129,0.15)' }}>
                                <FiCheckCircle color={G} size={20} />
                                <span style={{ fontWeight: '600' }}>{feature}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            {/* THE FUTURE */}
            <section style={{ padding: '80px 5% 120px', position: 'relative', zIndex: 10 }}>
                <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
                    <div className="reveal" style={{ textAlign: 'center', marginBottom: '56px' }}>
                        <span className="label" style={{ color: GL }}>Roadmap</span>
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
                            <div key={i} className={`reveal reveal-delay-${i % 3 + 1}`} style={{ padding: '32px', background: 'rgba(16,185,129,0.04)', border: '1px solid rgba(16,185,129,0.12)', borderRadius: '24px' }}>
                                <h3 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <FiZap color={G} /> {item.title}
                                </h3>
                                <p style={{ color: 'rgba(255,255,255,0.5)', lineHeight: '1.6', margin: 0 }}>{item.desc}</p>
                            </div>
                        ))}
                    </div>

                    {/* CTA */}
                    <div className="reveal" style={{ marginTop: '64px', textAlign: 'center' }}>
                        <a href="https://antverse.vercel.app" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', padding: '18px 40px', borderRadius: '99px', background: `linear-gradient(135deg, ${G}, #059669)`, color: '#fff', fontWeight: 900, fontSize: 16, textDecoration: 'none', boxShadow: `0 10px 40px rgba(16,185,129,0.4)` }}>
                            Play DinoX Now <FiArrowRight size={18} />
                        </a>
                    </div>
                </div>
            </section>

            <Footer />
            <ChatWidget />
        </div>
    );
}
