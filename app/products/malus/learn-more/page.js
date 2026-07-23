'use client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ChatWidget from '@/components/ChatWidget';
import Link from 'next/link';
import { FiArrowRight, FiShield, FiLock, FiActivity, FiEyeOff } from 'react-icons/fi';
import { motion } from 'framer-motion';

export default function MalusLearnMore() {
  return (
    <div style={{ background: 'var(--bg)', color: 'var(--text)', minHeight: '100vh', overflowX: 'hidden' }}>
      <Navbar />

      <section className="hero" style={{ textAlign: 'center', padding: '120px 5% 80px', position: 'relative' }}>
        <div style={{ position: 'absolute', top: '-20%', left: '50%', transform: 'translateX(-50%)', width: '800px', height: '600px', background: 'radial-gradient(circle, rgba(16, 185, 129, 0.1), transparent 70%)', pointerEvents: 'none', zIndex: 0 }} />
        
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', zIndex: 1 }}>
          <div className="badge float-anim" style={{ marginBottom: '32px', background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', borderColor: 'rgba(16, 185, 129, 0.2)' }}>
            <span className="dot" style={{ background: '#10b981' }} /> Security Architecture
          </div>
          
          <h1 style={{ fontSize: 'clamp(40px, 8vw, 82px)', lineHeight: '1.05', marginBottom: '24px', fontWeight: '900', letterSpacing: '-2px' }}>
              The Ultimate <span className="grad" style={{ backgroundImage: 'linear-gradient(135deg, #34d399, #10b981)' }}>Protection</span> Layer.
          </h1>
          
          <p style={{ fontSize: '20px', fontWeight: '600', color: 'var(--text)', marginBottom: '16px' }}>
              Powered by local intelligence, designed for absolute privacy.
          </p>
          <p style={{ fontSize: '18px', lineHeight: '1.8', color: 'var(--muted)', marginBottom: '40px', maxWidth: '700px' }}>
              Malus uses advanced on-device heuristics and secure sandboxing to intercept threats in real-time. Uncompromising cybersecurity that never sends your personal data to the cloud.
          </p>
          
          <div className="hero-btns">
            <Link href="/products/malus" className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'linear-gradient(135deg, #34d399, #10b981)', boxShadow: '0 14px 28px rgba(16, 185, 129, 0.3)' }}>
                <FiArrowRight style={{ transform: 'rotate(180deg)' }} size={18} /> Back to Malus
            </Link>
          </div>
        </motion.div>
      </section>

      {/* ARCHITECTURE FEATURES */}
      <section style={{ padding: '80px 5% 120px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
            {[
                { title: 'Intelligent Heuristics', desc: 'Analyzes software behavior dynamically to detect unknown threats before they strike.', icon: <FiActivity size={24} /> },
                { title: 'Zero-Cloud Sandboxing', desc: 'Suspicious files are isolated and detonated in a local secure container on your hardware.', icon: <FiBox size={24} /> },
                { title: 'Privacy-First Scanning', desc: 'No file hashes or telemetry are uploaded. What happens on your machine stays on your machine.', icon: <FiEyeOff size={24} /> },
                { title: 'Real-time Registry Defense', desc: 'Locks down critical system settings and core boot pathways against unauthorized modification.', icon: <FiLock size={24} /> }
            ].map((f, i) => (
                <div key={i} className={`feature-card reveal reveal-delay-${i % 4 + 1}`} style={{ padding: '32px' }}>
                    <div className="feature-icon" style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', borderColor: 'rgba(16, 185, 129, 0.2)', marginBottom: '24px' }}>
                        {f.icon}
                    </div>
                    <h3 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '12px' }}>{f.title}</h3>
                    <p style={{ color: 'var(--muted)', lineHeight: '1.6' }}>{f.desc}</p>
                </div>
            ))}
        </div>
      </section>

      <Footer />
      <ChatWidget />
    </div>
  );
}

const FiBox = ({ size }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
);
