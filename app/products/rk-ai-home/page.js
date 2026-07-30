'use client';
import { useRef, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ChatWidget from '@/components/ChatWidget';
import BackButton from '@/components/BackButton';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { FiHome, FiWifiOff, FiCpu, FiSettings, FiShoppingCart, FiCheckCircle } from 'react-icons/fi';
import Image from 'next/image';
import Link from 'next/link';
import { StarField, Card3D, staggerContainer, fadeUp, textVariant, FlowText } from '@/components/SpaceUI';

const FEATURES = [
  { size: 'wide', icon: <FiWifiOff />, title: '100+ Offline Commands.', desc: 'Your home doesn\'t stop when the internet drops. RK AI Home executes over 100 native voice commands completely offline using Edge processing.' },
  { size: 'narrow', icon: <FiCpu />, title: 'Pi Zero Optimized', desc: 'Built to run on just 512MB of RAM. The software is infinitely efficient, proving intelligence doesn\'t require a supercomputer.' },
  { size: 'half', icon: <FiHome />, title: 'Smart Intent Routing', desc: 'Our custom intent_classifier.py ensures that local commands stay local, while complex queries are seamlessly routed to Gemini.' },
  { size: 'half', icon: <FiSettings />, title: 'Self-Diagnosis Engine', desc: 'RK AI Home constantly monitors its own health. If a peripheral fails, it diagnoses itself and reports the issue vocally.' },
];

export default function RkAiHome() {
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
        textAlign: 'center', padding: '140px 24px 80px',
      }}>
        <motion.div variants={staggerContainer(0.12, 0.1)} initial="hidden" whileInView="show" viewport={{ once: false, amount: 0.15 }}>
          <motion.div 
            variants={fadeUp}
            className="hero-eyebrow"
            style={{ background: 'rgba(236,72,153,0.12)', border: '1px solid rgba(236,72,153,0.3)', color: '#f472b6', margin: '0 auto 24px', display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 16px', borderRadius: 99, fontSize: 12, fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase' }}
          >
            <motion.span animate={{ opacity: [1, 0.3, 1] }} transition={{ repeat: Infinity, duration: 2 }} style={{ width: 8, height: 8, borderRadius: '50%', background: '#ec4899', boxShadow: '0 0 10px #ec4899' }} />
            Hardware Pre-order Phase
          </motion.div>

          <motion.h1 
            variants={textVariant(0.1)}
            style={{ fontSize: 'clamp(52px, 8.5vw, 130px)', fontWeight: 900, letterSpacing: '-0.05em', lineHeight: 0.95, marginBottom: 20 }}
          >
            RK AI <FlowText gradient="linear-gradient(90deg, #ec4899, #a855f7, #ec4899)">Home</FlowText>
          </motion.h1>
          
          <motion.h2
            variants={textVariant(0.2)}
            style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: 28 }}
          >
            <FlowText gradient="linear-gradient(90deg, #ec4899, #a855f7, #ec4899)">Your home, thinking with you.</FlowText>
          </motion.h2>

          <motion.p 
            variants={fadeUp}
            style={{ fontSize: 'clamp(16px, 2vw, 20px)', color: 'rgba(255,255,255,0.55)', maxWidth: 640, lineHeight: 1.65, margin: '0 auto 48px' }}
          >
            An AI system designed for physical environments — enabling voice control, automation, and intelligent coordination across your entire living space without sacrificing privacy.
          </motion.p>

          <motion.div 
            variants={fadeUp}
            className="hero-actions"
            style={{ display: 'flex', gap: 16, justifyContent: 'center' }}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href="#preorder" className="btn-primary" style={{ background: '#fff', color: '#000', padding: '16px 32px', fontSize: 16, borderRadius: 99, display: 'inline-flex', alignItems: 'center', gap: 8, fontWeight: 800, textDecoration: 'none' }}>
                <FiShoppingCart /> Pre-order Now
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href="/products/rk-ai-home/learn-more" className="btn-secondary" style={{ padding: '16px 32px', fontSize: 16, borderRadius: 99, border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.04)', color: '#fff', fontWeight: 700, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
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
              className="section-label" style={{ color: '#f472b6', fontSize: 11, fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 16, display: 'inline-block', padding: '5px 14px', borderRadius: 8, background: 'rgba(236,72,153,0.08)' }}
            >
              Engineering
            </motion.p>
            <motion.h2 
              variants={textVariant(0)}
              style={{ fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 900, letterSpacing: '-0.03em', marginBottom: 48 }}
            >
              Built for<br />the physical world.
            </motion.h2>

            <motion.div variants={staggerContainer(0.05, 0.1)} className="bento" style={{ display: 'grid', gap: 20, gridTemplateColumns: 'repeat(4, 1fr)', gridAutoRows: 'minmax(200px, auto)' }}>
              {FEATURES.map((feature, index) => (
                <motion.div key={feature.title} variants={fadeUp} className={`bento-cell bento-cell--${feature.size || 'narrow'}`} style={{
                  gridColumn: feature.size === 'wide' ? 'span 4' : feature.size === 'half' ? 'span 2' : 'span 4'
                }}>
                  <Card3D style={{ padding: '32px 28px', height: '100%', boxSizing: 'border-box', display: 'flex', flexDirection: 'column' }} orbColor="rgba(236,72,153,0.3)">
                    <div style={{
                      width: 44, height: 44, borderRadius: 12,
                      display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, marginBottom: 24,
                      background: 'rgba(236,72,153,0.15)', color: '#f472b6'
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

      {/* ── PREORDER ─────────────────── */}
      <section id="preorder" style={{ padding: '80px 5%', position: 'relative', zIndex: 10 }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <motion.div variants={staggerContainer(0.1, 0.2)} initial="hidden" whileInView="show" viewport={{ once: false, amount: 0.15 }}>
            <motion.div variants={fadeUp}>
              <Card3D style={{ padding: '80px 40px', textAlign: 'center' }} orbColor="rgba(236,72,153,0.15)">
                <h2 style={{ fontSize: 44, fontWeight: 800, letterSpacing: '-0.04em', marginBottom: 16 }}>Secure Your Node.</h2>
                <p style={{ color: 'rgba(255,255,255,0.5)', marginBottom: 24, fontSize: 18, maxWidth: 600, margin: '0 auto 24px' }}>
                  RK AI Home is currently in the hardware pre-order phase. Shipping begins Q3 2026.
                </p>
                <div style={{ fontSize: 64, fontWeight: 900, marginBottom: 40, letterSpacing: '-2px' }}>₹4,999</div>
                
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="btn-primary" style={{ background: '#fff', color: '#000', padding: '20px 48px', fontSize: 20, borderRadius: 99, display: 'flex', alignItems: 'center', gap: 12, border: 'none', cursor: 'pointer', fontWeight: 800 }} onClick={() => alert('Pre-order system launching soon! Check back or contact support.')}>
                    <FiShoppingCart /> Pre-order Hardware
                  </motion.button>
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
