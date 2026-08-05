'use client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ChatWidget from '@/components/ChatWidget';
import BackButton from '@/components/BackButton';
import { motion } from 'framer-motion';
import { FiEdit3, FiEye, FiMessageCircle, FiShield, FiArrowRight, FiCpu, FiMonitor, FiActivity } from 'react-icons/fi';
import Link from 'next/link';
import { StarField, Card3D, staggerContainer, fadeUp, textVariant, FlowText } from '@/components/SpaceUI';

const ACCENT = '#5eead4';
const FEATURES = [
  { size: 'wide', icon: <FiEdit3 />, title: 'Your expression, preserved.', desc: 'Venava learns the words you reach for, your tone, formatting habits, personal phrases, punctuation, slang, sentence patterns, and the natural way you mix languages—whether that is English, Hinglish, or your own blend.' },
  { size: 'narrow', icon: <FiEye />, title: 'Invisible intelligence.', desc: 'No chatbot. No complicated interface. No rewriting your personality. Venava works quietly in the background so technology can adapt to you.' },
  { size: 'half', icon: <FiMessageCircle />, title: 'From thought to your words.', desc: 'RK AI understands intent. Venava is the expression layer that carries that intent into language that still feels unmistakably yours.' },
  { size: 'half', icon: <FiShield />, title: 'Personal style memory.', desc: 'Your communication patterns are personal. Venava is designed around private, secure memory, with ownership and control kept with you.' },
];

const ECOSYSTEM = [
  { icon: <FiCpu />, name: 'RK AI', detail: 'The intelligence layer.' },
  { icon: <FiEdit3 />, name: 'Venava', detail: 'The expression layer.', active: true },
  { icon: <FiMonitor />, name: 'Lumina OS', detail: 'The computing environment.' },
  { icon: <FiActivity />, name: 'Neytreya', detail: 'The awareness layer.' },
];

export default function VenavaPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#010104', color: '#fff', position: 'relative' }}>
      <StarField />
      <div className="noise" aria-hidden />
      <BackButton />
      <Navbar />

      <section style={{ position: 'relative', zIndex: 10, minHeight: '90vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '140px 24px 80px' }}>
        <motion.div variants={staggerContainer(0.12, 0.1)} initial="hidden" whileInView="show" viewport={{ once: false, amount: 0.15 }}>
          <motion.div variants={fadeUp} className="hero-eyebrow" style={{ background: 'rgba(20,184,166,0.12)', border: '1px solid rgba(94,234,212,0.28)', color: ACCENT, margin: '0 auto 24px', display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 16px', borderRadius: 99, fontSize: 12, fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase' }}>
            <motion.span animate={{ opacity: [1, 0.3, 1] }} transition={{ repeat: Infinity, duration: 2 }} style={{ width: 8, height: 8, borderRadius: '50%', background: '#14b8a6', boxShadow: '0 0 8px #14b8a6' }} />
            Personal expression layer
          </motion.div>
          <motion.h1 variants={textVariant(0.1)} style={{ fontSize: 'clamp(58px, 10vw, 142px)', fontWeight: 900, letterSpacing: '-0.06em', lineHeight: 0.92, marginBottom: 20 }}>
            <FlowText gradient="linear-gradient(90deg, #99f6e4, #14b8a6, #7dd3fc, #99f6e4)">Venava</FlowText>
          </motion.h1>
          <motion.h2 variants={textVariant(0.2)} style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: 28 }}>
            Your typing, amplified.
          </motion.h2>
          <motion.p variants={fadeUp} style={{ fontSize: 'clamp(16px, 2vw, 20px)', color: 'rgba(255,255,255,0.6)', maxWidth: 680, lineHeight: 1.65, margin: '0 auto 48px' }}>
            Technology should understand your voice, not replace it. Venava learns your natural expression and helps you communicate everywhere exactly the way you do.
          </motion.p>
          <motion.div variants={fadeUp} className="hero-actions" style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <motion.a whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} href="#expression" className="btn-primary" style={{ background: '#fff', color: '#000', padding: '16px 32px', fontSize: 16, borderRadius: 99, display: 'inline-flex', alignItems: 'center', gap: 8, fontWeight: 800, textDecoration: 'none' }}>
              Explore Venava <FiArrowRight />
            </motion.a>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href="/products/venava/learn-more" className="btn-secondary" style={{ padding: '16px 32px', fontSize: 16, borderRadius: 99, border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.04)', color: '#fff', fontWeight: 700, textDecoration: 'none', display: 'inline-flex' }}>
                Learn more
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      <hr className="divider" />
      <section id="expression" className="section layer" style={{ padding: '80px 5%', position: 'relative', zIndex: 10 }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <motion.div variants={staggerContainer(0.1, 0.2)} initial="hidden" whileInView="show" viewport={{ once: false, amount: 0.15 }}>
            <motion.p variants={fadeUp} className="section-label" style={{ color: ACCENT, fontSize: 11, fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 16, display: 'inline-block', padding: '5px 14px', borderRadius: 8, background: 'rgba(20,184,166,0.1)' }}>Made to sound like you</motion.p>
            <motion.h2 variants={textVariant(0)} style={{ fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 900, letterSpacing: '-0.03em', marginBottom: 48 }}>AI understands what you mean.<br /><span style={{ color: ACCENT }}>Venava helps it sound like you.</span></motion.h2>
            <motion.div variants={staggerContainer(0.05, 0.1)} className="bento" style={{ display: 'grid', gap: 20, gridTemplateColumns: 'repeat(4, 1fr)', gridAutoRows: 'minmax(200px, auto)' }}>
              {FEATURES.map((feature) => <motion.div key={feature.title} variants={fadeUp} className={`bento-cell bento-cell--${feature.size}`} style={{ gridColumn: feature.size === 'wide' ? 'span 4' : feature.size === 'half' ? 'span 2' : 'span 4' }}><Card3D style={{ padding: '32px 28px', height: '100%', boxSizing: 'border-box', display: 'flex', flexDirection: 'column' }} orbColor="rgba(20,184,166,0.26)"><div style={{ width: 44, height: 44, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, marginBottom: 24, background: 'rgba(20,184,166,0.14)', color: ACCENT }}>{feature.icon}</div><h3 style={{ fontSize: 20, fontWeight: 800, marginBottom: 12 }}>{feature.title}</h3><p style={{ color: 'rgba(255,255,255,0.55)', lineHeight: 1.6, fontSize: 15 }}>{feature.desc}</p></Card3D></motion.div>)}
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section style={{ padding: '80px 5% 120px', position: 'relative', zIndex: 10 }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}><motion.div variants={staggerContainer(0.1, 0.2)} initial="hidden" whileInView="show" viewport={{ once: false, amount: 0.15 }}><motion.div variants={fadeUp}><Card3D style={{ padding: '56px 40px' }} orbColor="rgba(20,184,166,0.2)"><p style={{ color: ACCENT, fontSize: 11, fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 16 }}>RexyCore Ecosystem</p><h2 style={{ fontSize: 'clamp(30px, 4vw, 48px)', fontWeight: 900, letterSpacing: '-0.04em', marginBottom: 40 }}>Technology adapts to you.</h2><div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: 16 }}>{ECOSYSTEM.map((item) => <div key={item.name} style={{ padding: 20, borderRadius: 16, background: item.active ? 'rgba(20,184,166,0.12)' : 'rgba(255,255,255,0.03)', border: `1px solid ${item.active ? 'rgba(94,234,212,0.3)' : 'rgba(255,255,255,0.08)'}` }}><div style={{ color: item.active ? ACCENT : '#7dd3fc', marginBottom: 16 }}>{item.icon}</div><h3 style={{ fontSize: 18, fontWeight: 800, marginBottom: 7 }}>{item.name}</h3><p style={{ margin: 0, color: 'rgba(255,255,255,0.5)', fontSize: 14 }}>{item.detail}</p></div>)}</div></Card3D></motion.div></motion.div></div>
      </section>
      <Footer /><ChatWidget />
    </div>
  );
}
