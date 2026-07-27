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
import { StarField, Card3D, staggerContainer, fadeUp, textVariant } from '@/components/SpaceUI';

const G = '#10b981';
const GL = '#34d399';

export default function DinoXPage() {
    return (
        <div style={{ background: '#010104', color: '#fff', minHeight: '100vh', overflowX: 'hidden', position: 'relative' }}>
            <StarField />
            <div className="noise" aria-hidden />
            <Navbar />

            {/* HERO */}
            <section className="hero" style={{ textAlign: 'center', padding: '120px 5% 80px', position: 'relative', zIndex: 10 }}>
                <motion.div variants={staggerContainer(0.12, 0.1)} initial="hidden" whileInView="show" viewport={{ once: false, amount: 0.15 }} style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <motion.div variants={fadeUp} style={{ marginBottom: '32px', color: GL, border: '1px solid rgba(52,211,153,0.3)', background: 'rgba(16,185,129,0.08)', display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 16px', borderRadius: 99, fontSize: 12, fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase' }}>
                        <motion.span animate={{ opacity: [1, 0.3, 1] }} transition={{ repeat: Infinity, duration: 2 }} style={{ width: 8, height: 8, borderRadius: '50%', background: G, boxShadow: `0 0 10px ${G}` }} /> Partner Experience
                    </motion.div>
                    
                    <motion.img variants={fadeUp} src="/dinox.png" alt="DinoX Logo" style={{ width: '140px', height: '140px', objectFit: 'contain', marginBottom: '24px', filter: `drop-shadow(0 10px 40px rgba(16,185,129,0.5))` }} />
                    
                    <motion.h1 variants={textVariant(0.1)} style={{ fontSize: 'clamp(40px, 8vw, 82px)', lineHeight: '1.05', marginBottom: '24px', fontWeight: '900', letterSpacing: '-2px' }}>
                        Project <span style={{ background: 'linear-gradient(135deg, #10b981, #059669)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', display: 'inline-block' }}>DinoX</span>
                    </motion.h1>
                    
                    <motion.p variants={fadeUp} style={{ fontSize: '20px', fontWeight: '600', color: 'rgba(255,255,255,0.9)', marginBottom: '16px' }}>
                        The Ultimate Gamified Coding Universe.
                    </motion.p>
                    <motion.p variants={fadeUp} style={{ fontSize: '18px', lineHeight: '1.8', color: 'rgba(255,255,255,0.5)', marginBottom: '40px', maxWidth: '700px' }}>
                        Learning to code shouldn't be boring. DinoX merges addictive RPG progression with real-world programming education. Play for free, level up, and master Python and JavaScript.
                    </motion.p>
                    
                    <motion.div variants={fadeUp} style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center' }}>
                        <Link href="/academy#bundles" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '15px 32px', borderRadius: '99px', background: `linear-gradient(135deg, ${G}, #059669)`, color: '#fff', fontWeight: 800, fontSize: 15, textDecoration: 'none', boxShadow: `0 8px 32px rgba(16,185,129,0.4)` }}>
                            View Bundles <FiArrowRight size={18} />
                        </Link>
                        <a href="https://antverse.vercel.app" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '15px 32px', borderRadius: '99px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(52,211,153,0.2)', color: GL, fontWeight: 800, fontSize: 15, textDecoration: 'none' }}>
                            Play DinoX ↗
                        </a>
                    </motion.div>
                </motion.div>
            </section>

            {/* WHAT WE'VE BUILT */}
            <section style={{ padding: '80px 5%', position: 'relative', zIndex: 10 }}>
                <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
                    <motion.div variants={staggerContainer(0.1, 0.2)} initial="hidden" whileInView="show" viewport={{ once: false, amount: 0.15 }}>
                        <motion.div variants={fadeUp} style={{ textAlign: 'center', marginBottom: '56px' }}>
                            <span style={{ color: GL, fontSize: 11, fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 16, display: 'inline-block' }}>Features</span>
                            <h2 style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: '900', letterSpacing: '-1px', marginBottom: '16px' }}>The Journey &amp; Features</h2>
                            <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.6)', maxWidth: '600px', margin: '0 auto' }}>From a blank canvas to a fully-fledged learning application.</p>
                        </motion.div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
                            {[
                                { title: 'The Dashboard', icon: <FiMonitor size={24} />, desc: 'The central hub to track your Level, XP, DinoCoins, Daily Streaks, and Treasure Boxes in a beautiful glassmorphism UI.' },
                                { title: 'Learning Universes', icon: <FiGlobe size={24} />, desc: 'Hundreds of structured missions across thematic worlds like Jurassic and Matrix to learn Python, JS, and HTML/CSS.' },
                                { title: 'The Sandbox', icon: <FiCode size={24} />, desc: 'An integrated Monaco Editor for free-play. Write, run, and test code securely right in your browser.' },
                                { title: 'My Dino', icon: <FiHeart size={24} />, desc: 'A 3D Virtual Pet System. Bond with your Dino, feed it, and use DinoCoins to buy hats, glasses, and backgrounds.' },
                                { title: 'The Arcade', icon: <FiPlayCircle size={24} />, desc: 'Take a break with fully playable mini-games like Flappy Dino, Dino Runner, and Dino Match.' },
                                { title: 'Multiplayer & Cloud', icon: <FiCloud size={24} />, desc: 'Firebase integration for cloud saves, unique @usernames, and a Community Hub to connect with friends.' }
                            ].map((f, i) => (
                                <motion.div key={i} variants={fadeUp}>
                                    <Card3D orbColor="rgba(16,185,129,0.2)" style={{ height: '100%' }}>
                                        <div style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: 16 }}>
                                            <div style={{ width: 48, height: 48, borderRadius: 12, background: 'rgba(16,185,129,0.1)', color: G, border: '1px solid rgba(16,185,129,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                {f.icon}
                                            </div>
                                            <h3 style={{ fontSize: '22px', fontWeight: '800', margin: 0 }}>{f.title}</h3>
                                            <p style={{ color: 'rgba(255,255,255,0.6)', lineHeight: '1.7', margin: 0 }}>{f.desc}</p>
                                        </div>
                                    </Card3D>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
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
                    <motion.div variants={staggerContainer(0.1, 0.2)} initial="hidden" whileInView="show" viewport={{ once: false, amount: 0.15 }}>
                        <motion.div variants={fadeUp} style={{ textAlign: 'center', marginBottom: '56px' }}>
                            <span style={{ color: GL, fontSize: 11, fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 16, display: 'inline-block' }}>Roadmap</span>
                            <h2 style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: '900', letterSpacing: '-1px', marginBottom: '16px' }}>Where Does DinoX Go Next?</h2>
                            <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.6)', maxWidth: '600px', margin: '0 auto' }}>The foundation is solid, but the potential is limitless.</p>
                        </motion.div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
                            {[
                                { title: 'Multiplayer Battles', desc: 'Challenge friends to 1v1 coding races. First to solve wins DinoCoins and steals XP!' },
                                { title: 'Global Leaderboards', desc: 'Competitive ranking system for highest levels, streaks, and arcade scores.' },
                                { title: 'Community Missions', desc: 'Use the Sandbox to create and publish custom coding challenges for friends.' },
                                { title: 'Real 3D Integration', desc: 'Fully interactive, animated 3D Dino models using Three.js.' },
                                { title: 'Advanced Trading', desc: 'Trade rare hats, glasses, or backgrounds with friends in a secure economy.' },
                                { title: 'Expanding Universes', desc: 'New programming languages like C++, Rust, and SQL with unique boss battles.' }
                            ].map((item, i) => (
                                <motion.div key={i} variants={fadeUp}>
                                    <Card3D orbColor="rgba(16,185,129,0.15)" style={{ height: '100%' }}>
                                        <div style={{ padding: '32px' }}>
                                            <h3 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                <FiZap color={G} /> {item.title}
                                            </h3>
                                            <p style={{ color: 'rgba(255,255,255,0.5)', lineHeight: '1.6', margin: 0 }}>{item.desc}</p>
                                        </div>
                                    </Card3D>
                                </motion.div>
                            ))}
                        </div>

                        {/* CTA */}
                        <motion.div variants={fadeUp} style={{ marginTop: '64px', textAlign: 'center' }}>
                            <a href="https://antverse.vercel.app" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', padding: '18px 40px', borderRadius: '99px', background: `linear-gradient(135deg, ${G}, #059669)`, color: '#fff', fontWeight: 900, fontSize: 16, textDecoration: 'none', boxShadow: `0 10px 40px rgba(16,185,129,0.4)` }}>
                                Play DinoX Now <FiArrowRight size={18} />
                            </a>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            <Footer />
            <ChatWidget />
        </div>
    );
}
