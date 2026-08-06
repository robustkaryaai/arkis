'use client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ChatWidget from '@/components/ChatWidget';
import Link from 'next/link';
import Image from 'next/image';
import BackButton from '@/components/BackButton';
import { FiArrowRight, FiShield, FiCpu, FiEye, FiZap, FiTerminal, FiBox, FiDatabase, FiLock, FiCodesandbox, FiActivity, FiMessageSquare, FiMic, FiSettings } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { StarField, Card3D, staggerContainer, fadeUp, textVariant } from '@/components/SpaceUI';

const stats = [
  { label: 'Default approach', value: 'Local-first', icon: <FiShield size={22} /> },
  { label: 'Cloud’s role', value: 'When needed', icon: <FiCpu size={22} /> },
  { label: 'Core work', value: 'Desktop AI', icon: <FiZap size={22} /> },
  { label: 'Designed for', value: 'Everyday tasks', icon: <FiEye size={22} /> },
];

const architectureSteps = [
  { 
    phase: 'Foundation', title: 'Work close to the device',
    desc: 'RK AI Desktop is designed to use local models on your hardware whenever practical, keeping capable computation close to the work you are doing.',
    icon: <FiActivity size={24} color="#3b82f6" />
  },
  { 
    phase: 'Capability', title: 'Use the right tool for the task',
    desc: 'For online search, real-time information, cloud-only AI, or tasks beyond available hardware, cloud models can extend capability when you approve their use.',
    icon: <FiCpu size={24} color="#3b82f6" />
  },
  { 
    phase: 'Control', title: 'Keep people informed',
    desc: 'Cloud services are never used silently. The product should make the choice clear and keep the person using it in control.',
    icon: <FiTerminal size={24} color="#3b82f6" />
  },
];

const journeyHighlights = [
  { title: 'A desktop assistant', desc: 'RK AI Desktop helps with conversations, documents, code, writing, studying, research, and everyday computer tasks.', phase: 'Purpose' },
  { title: 'Local when practical', desc: 'Local execution is preferred whenever the device can reasonably complete the task.', phase: 'Approach' },
  { title: 'Cloud when useful', desc: 'Cloud services are available for requests that genuinely need online capability or additional compute, with permission.', phase: 'Choice' },
  { title: 'Designed to evolve', desc: 'The aim is thoughtful software that remains useful in daily work while adapting carefully over time.', phase: 'Direction' },
];

function RKInteractiveShowcase() {
  return (
    <section style={{ padding: '40px 5% 120px', position: 'relative', zIndex: 10 }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, amount: 0.2 }} transition={{ duration: 0.7 }} style={{ marginBottom: 48, textAlign: 'center' }}>
          <p style={{ fontSize: 11, fontWeight: 800, letterSpacing: 3, color: 'rgba(59,130,246,0.5)', textTransform: 'uppercase', marginBottom: 12 }}>Interactive Experience</p>
          <h2 style={{ fontSize: 'clamp(26px, 3.5vw, 42px)', fontWeight: 900, letterSpacing: '-0.04em', marginBottom: 10 }}>Native integration. Pure focus.</h2>
          <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.35)', maxWidth: 600, margin: '0 auto' }}>RK AI runs as a native overlay on your desktop. No clunky windows, just beautiful, non-intrusive elements precisely when you need them.</p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '40px' }}>
          {/* THE MOCKUP CANVAS */}
          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: false, amount: 0.2 }} transition={{ duration: 0.8 }} 
            style={{ 
              position: 'relative', width: '100%', height: '600px', borderRadius: '24px', overflow: 'hidden', 
              boxShadow: '0 20px 80px rgba(0,0,0,0.6)', border: '1px solid rgba(255,255,255,0.1)' 
            }}>
            {/* Background Wallpaper */}
            <Image src="/bg.webp" alt="Desktop Background" fill style={{ objectFit: 'cover' }} unoptimized />
            
            {/* Dark overlay for contrast */}
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(1,1,4,0.4), transparent)' }} />

            {/* --- COMPONENT 1: Proactive System Status --- */}
            <motion.div 
              initial={{ opacity: 0, y: -20, scale: 0.9 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} transition={{ delay: 0.5, duration: 0.6 }}
              style={{ position: 'absolute', top: 40, right: 40, zIndex: 10 }}
            >
              <div style={{ 
                background: 'rgba(15,15,20,0.6)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
                borderRadius: '16px', padding: '16px 20px', border: '1px solid rgba(255,255,255,0.08)',
                boxShadow: '0 10px 40px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)',
                display: 'flex', alignItems: 'center', gap: 14, maxWidth: 300
              }}>
                <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 15px rgba(59,130,246,0.4)' }}>
                  <FiActivity color="#fff" size={18} />
                </div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#fff', marginBottom: 2 }}>System Online</div>
                  <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)' }}>Welcome back. I am online and ready to assist you.</div>
                </div>
              </div>
            </motion.div>

            {/* --- COMPONENT 2: Seamless AI Chat Bubbles --- */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: 1, duration: 0.6 }}
              style={{ position: 'absolute', top: '35%', left: 60, zIndex: 10, display: 'flex', flexDirection: 'column', gap: 12 }}
            >
              <div style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.5)', marginLeft: 16 }}>RK AI</div>
              <div style={{ 
                background: 'rgba(139,92,246,0.15)', backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)',
                borderRadius: '20px 20px 20px 4px', padding: '16px 24px', border: '1px solid rgba(139,92,246,0.3)',
                boxShadow: '0 10px 30px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.1), 0 0 20px rgba(139,92,246,0.1)',
                maxWidth: 340, color: '#fff', fontSize: 14, lineHeight: 1.6
              }}>
                Hey! Not much on my end, just making sure your systems are running smoothly. What's on your agenda today?
              </div>
            </motion.div>

            {/* --- COMPONENT 3: Floating Command Center (Omnibar) --- */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 1.5, duration: 0.6, type: 'spring', damping: 20 }}
              style={{ position: 'absolute', bottom: 60, left: '50%', x: '-50%', zIndex: 10 }}
            >
              <div style={{ 
                background: 'rgba(10,10,12,0.7)', backdropFilter: 'blur(30px)', WebkitBackdropFilter: 'blur(30px)',
                borderRadius: '99px', padding: '8px 12px', border: '1px solid rgba(255,255,255,0.1)',
                boxShadow: '0 20px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)',
                display: 'flex', alignItems: 'center', gap: 16, width: 600
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 12px', background: 'rgba(255,255,255,0.05)', borderRadius: 99 }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#10b981', boxShadow: '0 0 10px #10b981' }} />
                  <span style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.7)', letterSpacing: 1 }}>CPU 12%</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 12px', background: 'rgba(255,255,255,0.05)', borderRadius: 99 }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#3b82f6', boxShadow: '0 0 10px #3b82f6' }} />
                  <span style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.7)', letterSpacing: 1 }}>RAM 4.2GB</span>
                </div>
                
                <div style={{ flex: 1, borderLeft: '1px solid rgba(255,255,255,0.1)', paddingLeft: 16, display: 'flex', alignItems: 'center' }}>
                  <span style={{ fontSize: 15, color: 'rgba(255,255,255,0.4)', fontWeight: 500 }}>Ask RK...</span>
                  <motion.span animate={{ opacity: [1, 0, 1] }} transition={{ repeat: Infinity, duration: 1 }} style={{ width: 2, height: 18, background: '#3b82f6', marginLeft: 4 }} />
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <motion.div whileHover={{ scale: 1.1, background: 'rgba(255,255,255,0.1)' }} style={{ width: 36, height: 36, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#fff' }}>
                    <FiMic size={18} />
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.1, background: 'rgba(255,255,255,0.1)' }} style={{ width: 36, height: 36, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#fff' }}>
                    <FiSettings size={18} />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* EXPLANATION CARDS */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24, marginTop: 24 }}>
            <Card3D orbColor="rgba(59,130,246,0.15)">
              <div style={{ padding: '32px' }}>
                <h3 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: 10 }}><FiActivity color="#60a5fa" /> Proactive System Status</h3>
                <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '15px', lineHeight: '1.7', margin: 0 }}>
                  RK AI isn't just a chatbot waiting for you; it's a proactive assistant that monitors its own systems, wakes up with your computer, and lets you know when it's ready to handle tasks.
                </p>
              </div>
            </Card3D>
            
            <Card3D orbColor="rgba(139,92,246,0.15)">
              <div style={{ padding: '32px' }}>
                <h3 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: 10 }}><FiMessageSquare color="#a78bfa" /> Seamless AI Chat Bubbles</h3>
                <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '15px', lineHeight: '1.7', margin: 0 }}>
                  Instead of a clunky, full-screen chat window, RK AI uses beautiful, translucent floating chat bubbles that hover over your desktop. A premium UI that stays out of the way of your actual work.
                </p>
              </div>
            </Card3D>
            
            <Card3D orbColor="rgba(16,185,129,0.15)">
              <div style={{ padding: '32px' }}>
                <h3 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: 10 }}><FiTerminal color="#34d399" /> Floating Command Center</h3>
                <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '15px', lineHeight: '1.7', margin: 0 }}>
                  The "Omnibar" is your non-intrusive, always-ready command center. Type or use voice commands from anywhere. Live system vitals prove RK AI is deeply integrated with your OS.
                </p>
              </div>
            </Card3D>
          </div>

        </div>
      </div>
    </section>
  );
}

export default function RKDesktopLearnMore() {
  return (
    <div style={{ background: '#010104', color: '#fff', minHeight: '100vh', overflowX: 'hidden', position: 'relative' }}>
      
      <StarField />
      <div className="noise" aria-hidden />

      <BackButton href="/products/rk-ai-desktop" label="RK AI Desktop" />
      <Navbar />

      {/* HERO */}
      <section style={{ textAlign: 'left', alignItems: 'flex-start', paddingTop: '160px', paddingBottom: '80px', position: 'relative', zIndex: 10 }}>
        <div style={{ maxWidth: '1100px', width: '100%', margin: '0 auto', padding: '0 5%' }}>
          <motion.div variants={staggerContainer(0.12, 0.1)} initial="hidden" whileInView="show" viewport={{ once: false, amount: 0.15 }}>
            <motion.div variants={fadeUp} style={{ marginBottom: '24px', color: '#fff', border: '1px solid rgba(59,130,246,0.3)', display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 16px', borderRadius: 99, fontSize: 12, fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase', background: 'rgba(59,130,246,0.1)' }}>
              <motion.span animate={{ opacity: [1, 0.3, 1] }} transition={{ repeat: Infinity, duration: 2 }} style={{ width: 8, height: 8, borderRadius: '50%', background: '#3b82f6', boxShadow: '0 0 10px #3b82f6' }} /> Deep Dive: Architecture
            </motion.div>
            <motion.h1 variants={textVariant(0.1)} style={{ maxWidth: '900px', fontSize: 'clamp(48px, 8vw, 80px)', lineHeight: '1.05', letterSpacing: '-2px', fontWeight: '900' }}>
              The anatomy of <span style={{ background: 'linear-gradient(90deg, #3b82f6, #8b5cf6, #3b82f6)', WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent', display: 'inline-block' }}>native intelligence.</span>
            </motion.h1>
            <motion.p variants={fadeUp} style={{ maxWidth: '700px', margin: '24px 0 40px', fontSize: '20px', color: 'rgba(255,255,255,0.6)', lineHeight: '1.7' }}>
              RK AI Desktop is a personal assistant designed for everyday work. Explore the thinking behind a local-first approach that keeps cloud capability available when it is genuinely useful.
            </motion.p>
            <motion.div variants={fadeUp} style={{ display: 'flex', gap: 16 }}>
              <Link href="/products/rk-ai-desktop" className="btn-secondary" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 28px', borderRadius: 99, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontWeight: 700, fontSize: 15, textDecoration: 'none' }}>
                <FiArrowRight style={{ transform: 'rotate(180deg)' }} /> Back to Product
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* INTERACTIVE CSS SHOWCASE */}
      <RKInteractiveShowcase />

      {/* STATS */}
      <section style={{ padding: '40px 5%', position: 'relative', zIndex: 10 }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <motion.div variants={staggerContainer(0.1, 0.2)} initial="hidden" whileInView="show" viewport={{ once: false, amount: 0.15 }} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20 }}>
            {stats.map((item, i) => (
              <motion.div key={item.label} variants={fadeUp}>
                <Card3D orbColor="rgba(59,130,246,0.3)">
                  <div style={{ padding: '32px 28px', display: 'flex', flexDirection: 'column', gap: 14, height: '100%' }}>
                    <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(59,130,246,0.1)', color: '#60a5fa', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{item.icon}</div>
                    <strong style={{ fontSize: '36px', fontWeight: '900', letterSpacing: '-1px', lineHeight: '1' }}>{item.value}</strong>
                    <p style={{ fontWeight: '700', fontSize: '14px', color: 'rgba(255,255,255,0.4)', margin: 0, textTransform: 'uppercase', letterSpacing: '1px' }}>{item.label}</p>
                  </div>
                </Card3D>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* THE ARCHITECTURE */}
      <section style={{ padding: '120px 5%', position: 'relative', zIndex: 10 }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <motion.div variants={staggerContainer(0.1, 0.2)} initial="hidden" whileInView="show" viewport={{ once: false, amount: 0.15 }} style={{ marginBottom: '64px' }}>
            <motion.div variants={fadeUp} style={{ display: 'inline-block', padding: '5px 14px', borderRadius: 8, background: 'rgba(59,130,246,0.08)', color: '#60a5fa', fontSize: 11, fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 16 }}>System Pipeline</motion.div>
            <motion.h2 variants={textVariant(0)} style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: '900', letterSpacing: '-1px', marginBottom: '16px' }}>How it actually works.</motion.h2>
            <motion.p variants={fadeUp} style={{ fontSize: '18px', color: 'rgba(255,255,255,0.6)', maxWidth: '600px', lineHeight: '1.7' }}>
              The product is designed around a simple idea: use local computing whenever practical, and use cloud capability intentionally when a task calls for it.
            </motion.p>
          </motion.div>

          <motion.div variants={staggerContainer(0.1, 0.2)} initial="hidden" whileInView="show" viewport={{ once: false, amount: 0.15 }} style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '24px' }}>
            {architectureSteps.map((step, i) => (
              <motion.div key={i} variants={fadeUp}>
                <Card3D orbColor="rgba(59,130,246,0.15)">
                  <div style={{ padding: '40px', display: 'grid', gridTemplateColumns: '80px 1fr', gap: '32px', alignItems: 'center' }}>
                    <div style={{
                      width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(59,130,246,0.1)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(59,130,246,0.3)',
                      boxShadow: '0 0 30px rgba(59,130,246,0.1)'
                    }}>
                      {step.icon}
                    </div>
                    <div>
                      <div style={{ fontSize: '12px', fontWeight: '800', color: '#60a5fa', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '8px' }}>
                        {step.phase}
                      </div>
                      <h3 style={{ fontSize: '24px', fontWeight: '800', marginBottom: '12px' }}>{step.title}</h3>
                      <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '16px', lineHeight: '1.7', margin: 0 }}>
                        {step.desc}
                      </p>
                    </div>
                  </div>
                </Card3D>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* THE JOURNEY / TIMELINE */}
      <section id="journey" style={{ padding: '120px 5%', position: 'relative', zIndex: 10 }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <motion.div variants={staggerContainer(0.1, 0.2)} initial="hidden" whileInView="show" viewport={{ once: false, amount: 0.15 }} style={{ textAlign: 'center', marginBottom: '80px' }}>
            <motion.div variants={fadeUp} style={{ display: 'inline-block', padding: '5px 14px', borderRadius: 8, background: 'rgba(59,130,246,0.08)', color: '#60a5fa', fontSize: 11, fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 16 }}>Evolution</motion.div>
            <motion.h2 variants={textVariant(0)} style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: '900', letterSpacing: '-1px' }}>The Capability Stack.</motion.h2>
            <motion.p variants={fadeUp} style={{ margin: '16px auto 0', textAlign: 'center', color: 'rgba(255,255,255,0.6)', fontSize: '18px', maxWidth: '600px' }}>
              The choices behind an assistant that is designed to work naturally with your computer.
            </motion.p>
          </motion.div>

          <div style={{ position: 'relative', maxWidth: '800px', margin: '0 auto' }}>
            {/* Center line */}
            <div style={{
              position: 'absolute', top: 0, bottom: 0, left: '32px',
              width: '2px', background: 'linear-gradient(90deg, transparent, #3b82f6, transparent)',
              borderRadius: '2px', zIndex: 0
            }} />

            <motion.div variants={staggerContainer(0.1, 0.2)} initial="hidden" whileInView="show" viewport={{ once: false, amount: 0.15 }} style={{ display: 'flex', flexDirection: 'column', gap: '64px' }}>
              {journeyHighlights.map((item, index) => (
                <motion.div key={item.title} variants={fadeUp} style={{ display: 'flex', position: 'relative', zIndex: 1, paddingLeft: '80px' }}>
                  {/* Connector dot */}
                  <div style={{
                    position: 'absolute', top: '24px', left: '24px',
                    width: '18px', height: '18px', borderRadius: '50%',
                    background: '#010104', border: '4px solid #3b82f6',
                    boxShadow: '0 0 16px rgba(59, 130, 246, 0.5)', zIndex: 2
                  }} />

                  <Card3D style={{ width: '100%' }} orbColor="rgba(59,130,246,0.2)">
                    <div style={{ padding: '32px' }}>
                      <span style={{
                        display: 'inline-block', padding: '6px 14px', borderRadius: '8px',
                        background: 'rgba(59,130,246,0.1)', color: '#60a5fa', border: '1px solid rgba(59,130,246,0.2)',
                        fontSize: '11px', fontWeight: '800', letterSpacing: '1.5px',
                        textTransform: 'uppercase', marginBottom: '16px'
                      }}>
                        {item.phase}
                      </span>
                      <h3 style={{ fontSize: '22px', fontWeight: '800', marginBottom: '12px' }}>{item.title}</h3>
                      <p style={{ color: 'rgba(255,255,255,0.5)', lineHeight: '1.7', margin: 0, fontSize: '15px' }}>{item.desc}</p>
                    </div>
                  </Card3D>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* CODE EXAMPLE SECTION */}
      <section style={{ padding: '80px 5%', position: 'relative', zIndex: 10 }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <motion.div variants={staggerContainer(0.1, 0.2)} initial="hidden" whileInView="show" viewport={{ once: false, amount: 0.15 }}>
            <motion.div variants={fadeUp}>
              <Card3D orbColor="rgba(59,130,246,0.2)">
                <div style={{ display: 'flex', flexWrap: 'wrap', overflow: 'hidden' }}>
                  <div style={{ flex: '1 1 400px', padding: '60px 40px' }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#60a5fa', fontWeight: '800', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '16px' }}>
                      <FiCodesandbox size={16} /> Developer First
                    </div>
                    <h2 style={{ fontSize: '32px', fontWeight: '900', marginBottom: '20px', letterSpacing: '-1px' }}>Extendable by nature.</h2>
                    <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '16px', lineHeight: '1.7', marginBottom: '32px' }}>
                      RK AI Desktop isn't just a black box. You can write custom TypeScript macros to define complex multi-step workflows. We expose our entire UI intent engine via a simple SDK.
                    </p>
                    <Link href="/academy" className="btn-primary" style={{ padding: '14px 28px', background: '#fff', color: '#000', borderRadius: 99, textDecoration: 'none', fontWeight: 800 }}>View Documentation</Link>
                  </div>
                  <div style={{ flex: '1 1 500px', background: '#0d1117', padding: '40px', borderLeft: '1px solid rgba(255,255,255,0.05)' }}>
                    <pre style={{ margin: 0, fontFamily: 'monospace', fontSize: '14px', lineHeight: '1.6', color: '#c9d1d9', overflowX: 'auto' }}>
                      <code style={{ color: '#ff7b72' }}>import</code> {'{ RKDesktop }'} <code style={{ color: '#ff7b72' }}>from</code> <code style={{ color: '#a5d6ff' }}>'@rexycore/sdk'</code>;<br/><br/>
                      <code style={{ color: '#ff7b72' }}>const</code> ai = <code style={{ color: '#ff7b72' }}>new</code> RKDesktop();<br/><br/>
                      <code style={{ color: '#8b949e' }}>// Define an autonomous workflow</code><br/>
                      ai.<code style={{ color: '#d2a8ff' }}>onCommand</code>(<code style={{ color: '#a5d6ff' }}>'prepare meeting'</code>, <code style={{ color: '#ff7b72' }}>async</code> () ={'>'} {'{'}<br/>
                      &nbsp;&nbsp;<code style={{ color: '#ff7b72' }}>await</code> ai.app.<code style={{ color: '#d2a8ff' }}>open</code>(<code style={{ color: '#a5d6ff' }}>'Slack'</code>);<br/>
                      &nbsp;&nbsp;<code style={{ color: '#ff7b72' }}>await</code> ai.ui.<code style={{ color: '#d2a8ff' }}>click</code>(<code style={{ color: '#a5d6ff' }}>'#status-button'</code>);<br/>
                      &nbsp;&nbsp;<code style={{ color: '#ff7b72' }}>await</code> ai.ui.<code style={{ color: '#d2a8ff' }}>type</code>(<code style={{ color: '#a5d6ff' }}>'In a meeting 🔴'</code>);<br/>
                      &nbsp;&nbsp;<br/>
                      &nbsp;&nbsp;<code style={{ color: '#ff7b72' }}>await</code> ai.app.<code style={{ color: '#d2a8ff' }}>open</code>(<code style={{ color: '#a5d6ff' }}>'Zoom'</code>);<br/>
                      &nbsp;&nbsp;<code style={{ color: '#ff7b72' }}>await</code> ai.ui.<code style={{ color: '#d2a8ff' }}>clickText</code>(<code style={{ color: '#a5d6ff' }}>'Join Meeting'</code>);<br/>
                      {'}'});
                    </pre>
                  </div>
                </div>
              </Card3D>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '80px 5% 120px', position: 'relative', zIndex: 10 }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <motion.div variants={staggerContainer(0.1, 0.2)} initial="hidden" whileInView="show" viewport={{ once: false, amount: 0.15 }}>
            <motion.div variants={fadeUp}>
              <Card3D orbColor="rgba(59,130,246,0.3)">
                <div style={{ padding: '60px 48px', display: 'flex', flexWrap: 'wrap', gap: 32, alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ flex: '1 1 400px' }}>
                    <h2 style={{ fontSize: 'clamp(32px, 4vw, 40px)', fontWeight: '900', marginBottom: '16px', letterSpacing: '-1px' }}>Ready to upgrade your system?</h2>
                    <p style={{ color: 'rgba(255,255,255,0.6)', lineHeight: '1.7', margin: 0, fontSize: '18px' }}>
                      A personal desktop AI assistant for documents, code, writing, research, and everyday work.
                    </p>
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
                    <Link href="/products/rk-ai-desktop" className="btn-secondary" style={{ padding: '16px 32px', borderRadius: 99, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontWeight: 700, textDecoration: 'none' }}>Back to Product</Link>
                    <Link href="/subscription" className="btn-primary" style={{ padding: '16px 32px', background: '#fff', color: '#000', borderRadius: 99, fontWeight: 800, textDecoration: 'none' }}>Explore Subscription</Link>
                  </div>
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
