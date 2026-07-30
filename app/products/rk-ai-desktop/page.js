'use client';
import { useRef, useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ChatWidget from '@/components/ChatWidget';
import BackButton from '@/components/BackButton';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { FiDownload, FiTerminal, FiShield, FiMic, FiLayout, FiCpu, FiBox, FiCheckCircle } from 'react-icons/fi';
import { FaApple, FaWindows, FaLinux } from 'react-icons/fa';
import Link from 'next/link';
import { StarField, Card3D, staggerContainer, fadeUp, textVariant, FlowText } from '@/components/SpaceUI';

const FEATURES = [
  { size: 'wide', icon: <FiShield />, title: 'Local AI execution.', desc: 'RK AI Desktop runs AI models on your own hardware. When you send a query, it is processed by your CPU or GPU. Nothing in that process requires a network connection or sends your input to a remote server.' },
  { size: 'narrow', icon: <FiCpu />, title: 'Works with your documents', desc: 'It can read and work with documents, notes, code, and images you already have. That context stays on your machine.' },
  { size: 'half', icon: <FiMic />, title: 'Offline-capable', desc: 'Because AI runs locally, RK AI Desktop can function without an internet connection. You need local model files installed, but no subscription to a cloud service.' },
  { size: 'half', icon: <FiLayout />, title: 'Part of the ecosystem', desc: 'When MALUS is also installed, RK AI Desktop can use your current system state as context. Each product remains independent, but they can share information locally.' },
];

export default function RkAiDesktop() {
  const [activeOS, setActiveOS] = useState(null);

  useEffect(() => {
    const platform = window.navigator.platform.toLowerCase();
    if (platform.includes('mac')) setActiveOS('mac');
    else if (platform.includes('win')) setActiveOS('win');
    else if (platform.includes('linux')) setActiveOS('linux');
  }, []);
  return (
    <div style={{ minHeight: '100vh', background: '#010104', color: '#fff', position: 'relative' }}>
      
      <StarField />
      <div className="noise" aria-hidden />

      <BackButton />
      <Navbar />

      {/* ── HERO ────────────────────────────────────────────── */}
      <section style={{
        position: 'relative', zIndex: 10,
        minHeight: '90vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        textAlign: 'center', padding: '110px 24px 60px',
      }}>
        <motion.div variants={staggerContainer(0.12, 0.1)} initial="hidden" whileInView="show" viewport={{ once: false, amount: 0.15 }}>
          <motion.div 
            variants={fadeUp}
            className="hero-eyebrow"
            style={{ background: 'rgba(59,130,246,0.12)', border: '1px solid rgba(59,130,246,0.3)', color: '#93c5fd', margin: '0 auto 24px', display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 16px', borderRadius: 99, fontSize: 12, fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase' }}
          >
            <motion.span animate={{ opacity: [1, 0.3, 1] }} transition={{ repeat: Infinity, duration: 2 }} style={{ width: 8, height: 8, borderRadius: '50%', background: '#60a5fa', boxShadow: '0 0 10px #60a5fa' }} />
            Available Now for Mac, Windows & Linux
          </motion.div>

          <motion.h1 
            variants={textVariant(0.1)}
            style={{ fontSize: 'clamp(52px, 8.5vw, 130px)', fontWeight: 900, letterSpacing: '-0.05em', lineHeight: 0.95, marginBottom: 20 }}
          >
            RK AI <FlowText gradient="linear-gradient(90deg, #3b82f6, #60a5fa, #3b82f6)">Desktop</FlowText>
          </motion.h1>
          
            <motion.h2
            variants={textVariant(0.2)}
            className="tagline-fix"
            style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: 28 }}
          >
            <FlowText gradient="linear-gradient(90deg, #3b82f6, #8b5cf6, #3b82f6)">
              A local AI assistant for everyday computing.
            </FlowText>
          </motion.h2>

          <motion.p 
            variants={fadeUp}
            style={{ fontSize: 'clamp(16px, 2vw, 20px)', color: 'rgba(255,255,255,0.55)', maxWidth: 640, lineHeight: 1.65, margin: '0 auto 48px' }}
          >
            RK AI Desktop helps you work with documents, code, notes, and conversations using AI that runs on your own machine. It is designed to be useful for studying, development, and writing without routing your work through a cloud service.
          </motion.p>

          <motion.div 
            variants={fadeUp}
            className="hero-actions"
            style={{ display: 'flex', gap: 16, justifyContent: 'center' }}
          >
            <motion.a whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} href="#download" className="btn-primary" style={{ background: '#fff', color: '#000', padding: '16px 32px', fontSize: 16, borderRadius: 99, display: 'inline-flex', alignItems: 'center', gap: 8, fontWeight: 800, textDecoration: 'none' }}>
              <FiDownload /> Download RK AI
            </motion.a>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href="/products/rk-ai-desktop/learn-more" className="btn-secondary" style={{ padding: '16px 32px', fontSize: 16, borderRadius: 99, border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.04)', color: '#fff', fontWeight: 700, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                Learn More
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      <hr className="divider" />

      {/* ── FEATURES BENTO ─────────────────── */}
      <section className="section layer" style={{ padding: '80px 5%', position: 'relative', zIndex: 10 }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <motion.div variants={staggerContainer(0.1, 0.2)} initial="hidden" whileInView="show" viewport={{ once: false, amount: 0.15 }}>
            <motion.p 
              variants={fadeUp}
              className="section-label" style={{ color: '#60a5fa', fontSize: 11, fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 16, display: 'inline-block', padding: '5px 14px', borderRadius: 8, background: 'rgba(59,130,246,0.08)' }}
            >
              Core Architecture
            </motion.p>
            <motion.h2 
              variants={textVariant(0)}
              style={{ fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 900, letterSpacing: '-0.03em', marginBottom: 48 }}
            >
              How it<br />works.
            </motion.h2>

            <motion.div variants={staggerContainer(0.05, 0.1)} className="bento" style={{ display: 'grid', gap: 20, gridTemplateColumns: 'repeat(4, 1fr)', gridAutoRows: 'minmax(200px, auto)' }}>
              {FEATURES.map((feature, index) => (
                <motion.div key={feature.title} variants={fadeUp} className={`bento-cell bento-cell--${feature.size || 'narrow'}`} style={{
                  gridColumn: feature.size === 'wide' ? 'span 4' : feature.size === 'half' ? 'span 2' : 'span 4'
                }}>
                  <Card3D style={{ padding: '32px 28px', height: '100%', boxSizing: 'border-box', display: 'flex', flexDirection: 'column' }} orbColor="rgba(59,130,246,0.3)">
                    <div style={{
                      width: 44, height: 44, borderRadius: 12,
                      display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, marginBottom: 24,
                      background: 'rgba(59,130,246,0.15)', color: '#60a5fa'
                    }}>
                      {feature.icon}
                    </div>
                    <h3 style={{ fontSize: 20, fontWeight: 800, marginBottom: 12 }}>{feature.title}</h3>
                    <p style={{ color: 'rgba(255,255,255,0.5)', lineHeight: 1.6, fontSize: 15 }}>{feature.desc}</p>
                  </Card3D>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── DOWNLOAD ─────────────────── */}
      <section id="download" style={{ padding: '80px 5%', position: 'relative', zIndex: 10 }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <motion.div variants={staggerContainer(0.1, 0.2)} initial="hidden" whileInView="show" viewport={{ once: false, amount: 0.15 }}>
            <motion.div variants={fadeUp}>
              <Card3D style={{ padding: '80px 40px', textAlign: 'center' }} orbColor="rgba(59,130,246,0.15)">
                <h2 style={{ fontSize: 44, fontWeight: 800, letterSpacing: '-0.04em', marginBottom: 16 }}>Download and run it on your hardware.</h2>
                <p style={{ color: 'rgba(255,255,255,0.5)', marginBottom: 48, fontSize: 18, maxWidth: 600, margin: '0 auto 48px' }}>
                  RK AI Desktop runs on your local hardware using open AI models. 8GB RAM is the practical minimum. 16GB or more is recommended for larger models.
                </p>
                
                <div style={{ display: 'flex', justifyContent: 'center', gap: 20, flexWrap: 'wrap' }}>
                  <motion.a whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} href="/downloads/rk-ai-windows.exe" className="btn-secondary" style={{ padding: '24px 32px', display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'center', width: 220, borderRadius: 24, background: activeOS === 'win' ? 'rgba(59,130,246,0.1)' : 'rgba(255,255,255,0.03)', border: activeOS === 'win' ? '1px solid rgba(59,130,246,0.5)' : '1px solid rgba(255,255,255,0.08)', boxShadow: activeOS === 'win' ? '0 0 20px rgba(59,130,246,0.3)' : 'none', textDecoration: 'none' }}>
                    <FaWindows size={48} style={{ color: activeOS === 'win' ? '#60a5fa' : '#3b82f6' }} />
                    <div>
                      <div style={{ fontWeight: 800, fontSize: 20, color: '#fff' }}>Windows</div>
                      <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', marginTop: 4 }}>Windows 10 / 11<br/>(.exe)</div>
                    </div>
                  </motion.a>
                  <motion.a whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} href="/downloads/rk-ai-macos.dmg" className="btn-secondary" style={{ padding: '24px 32px', display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'center', width: 220, borderRadius: 24, background: activeOS === 'mac' ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.03)', border: activeOS === 'mac' ? '1px solid rgba(255,255,255,0.5)' : '1px solid rgba(255,255,255,0.08)', boxShadow: activeOS === 'mac' ? '0 0 20px rgba(255,255,255,0.2)' : 'none', textDecoration: 'none' }}>
                    <FaApple size={48} style={{ color: '#fff' }} />
                    <div>
                      <div style={{ fontWeight: 800, fontSize: 20, color: '#fff' }}>macOS</div>
                      <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', marginTop: 4 }}>Apple Silicon M1+<br/>(.dmg)</div>
                    </div>
                  </motion.a>
                  <motion.a whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} href="/downloads/rk-ai-linux.AppImage" className="btn-secondary" style={{ padding: '24px 32px', display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'center', width: 220, borderRadius: 24, background: activeOS === 'linux' ? 'rgba(251,191,36,0.1)' : 'rgba(255,255,255,0.03)', border: activeOS === 'linux' ? '1px solid rgba(251,191,36,0.5)' : '1px solid rgba(255,255,255,0.08)', boxShadow: activeOS === 'linux' ? '0 0 20px rgba(251,191,36,0.3)' : 'none', textDecoration: 'none' }}>
                    <FaLinux size={48} style={{ color: activeOS === 'linux' ? '#fde68a' : '#fbbf24' }} />
                    <div>
                      <div style={{ fontWeight: 800, fontSize: 20, color: '#fff' }}>Linux</div>
                      <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', marginTop: 4 }}>Ubuntu / Debian<br/>(AppImage)</div>
                    </div>
                  </motion.a>
                </div>
              </Card3D>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />
      <ChatWidget />
    </div>
  );
}
