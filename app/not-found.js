'use client';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ChatWidget from '@/components/ChatWidget';
import { motion } from 'framer-motion';
import { StarField, textVariant, fadeUp, staggerContainer } from '@/components/SpaceUI';
import { FiArrowRight, FiHome } from 'react-icons/fi';

const VP = { once: false, amount: 0.1 };

export default function NotFound() {
  return (
    <div style={{ background: '#010104', color: '#fff', minHeight: '100vh', position: 'relative', overflowX: 'hidden' }}>
      <StarField />
      <div className="noise" aria-hidden />
      <Navbar />

      <section style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '140px 5% 80px', position: 'relative', zIndex: 10 }}>
        <motion.div variants={staggerContainer(0.1, 0.1)} initial="hidden" animate="show" style={{ textAlign: 'center', maxWidth: 600, width: '100%' }}>
          
          <motion.div variants={fadeUp} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 18px', borderRadius: 99, border: '1px solid rgba(239,68,68,0.25)', background: 'rgba(239,68,68,0.07)', marginBottom: 28 }}>
            <motion.span animate={{ opacity: [1, 0.3, 1] }} transition={{ repeat: Infinity, duration: 2 }} style={{ width: 6, height: 6, borderRadius: '50%', background: '#f87171', boxShadow: '0 0 8px #f87171' }} />
            <span style={{ fontSize: 12, fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase', color: '#f87171' }}>Error 404</span>
          </motion.div>

          <motion.h1 variants={textVariant(0)} style={{ fontSize: 'clamp(64px, 10vw, 120px)', fontWeight: 900, letterSpacing: '-4px', lineHeight: 1.0, marginBottom: 16 }}>
            Lost in{' '}
            <span style={{ background: 'linear-gradient(135deg, #f87171, #fca5a5)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Space.</span>
          </motion.h1>

          <motion.p variants={fadeUp} style={{ color: 'rgba(255,255,255,0.45)', fontSize: 18, lineHeight: 1.7, margin: '0 auto 40px' }}>
            The page you are looking for has drifted beyond the observable universe.
          </motion.p>

          <motion.div variants={fadeUp} style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 32px', borderRadius: 99, background: '#fff', color: '#000', fontWeight: 800, fontSize: 15, textDecoration: 'none', transition: 'transform 0.2s' }}>
              <FiHome size={16} /> Return Home
            </Link>
            <Link href="/products" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '13px 28px', borderRadius: 99, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontWeight: 700, fontSize: 15, textDecoration: 'none' }}>
              Explore Ecosystem <FiArrowRight size={16} />
            </Link>
          </motion.div>

        </motion.div>
      </section>

      <div style={{ position: 'absolute', bottom: 0, width: '100%' }}>
        <Footer />
      </div>
      <ChatWidget />
    </div>
  );
}
