'use client';
import { useRef, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ChatWidget from '@/components/ChatWidget';
import BackButton from '@/components/BackButton';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { FiDownload, FiEye, FiActivity, FiZap, FiTarget, FiCheckCircle } from 'react-icons/fi';
import Image from 'next/image';
import Link from 'next/link';
import { StarField, Card3D, staggerContainer, fadeUp, textVariant, FlowText } from '@/components/SpaceUI';

const FEATURES = [
  { size: 'wide', icon: <FiEye />, title: 'Continuous system observation.', desc: 'Neytreya observes hardware usage, applications, workflows, and system behaviour locally to build awareness of the computer itself.' },
  { size: 'narrow', icon: <FiActivity />, title: 'Not a chatbot', desc: 'Neytreya is not a chatbot, coding assistant, automation engine, or computer controller. Its job is awareness—not conversation or action.' },
  { size: 'half', icon: <FiZap />, title: 'Context when appropriate', desc: 'That awareness can be shared with other RexyCore products when appropriate, while Neytreya remains useful as an independent system intelligence layer.' },
  { size: 'half', icon: <FiTarget />, title: 'Designed for control', desc: 'Local observation is the foundation. Any use of a cloud service is visible to the user and requires permission.' },
];

export default function NeytreyaPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#010104', color: '#fff', position: 'relative' }}>
      
      <StarField />
      <div className="noise" aria-hidden />

      <BackButton />
      <Navbar />

      {/* ── HERO ──────────────────────────── */}
      <section style={{
        position: 'relative', zIndex: 10,
        minHeight: '90vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        textAlign: 'center', padding: '140px 24px 80px',
      }}>
        <motion.div variants={staggerContainer(0.12, 0.1)} initial="hidden" whileInView="show" viewport={{ once: false, amount: 0.15 }}>
          <motion.div 
            variants={fadeUp}
            className="hero-eyebrow"
            style={{ background: 'rgba(16,185,129,0.12)', border: '1px solid rgba(16,185,129,0.3)', color: '#6ee7b7', margin: '0 auto 24px', display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 16px', borderRadius: 99, fontSize: 12, fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase' }}
          >
            <motion.span animate={{ opacity: [1, 0.3, 1] }} transition={{ repeat: Infinity, duration: 2 }} style={{ width: 8, height: 8, borderRadius: '50%', background: '#10b981', boxShadow: '0 0 10px #10b981' }} />
            System intelligence layer
          </motion.div>

          <motion.h1 
            variants={textVariant(0.1)}
            style={{ fontSize: 'clamp(52px, 8.5vw, 130px)', fontWeight: 900, letterSpacing: '-0.05em', lineHeight: 0.95, marginBottom: 20 }}
          >
            Meet <FlowText gradient="linear-gradient(90deg, #10b981, #059669, #10b981)">Neytreya</FlowText>
          </motion.h1>
          
          <motion.h2
            variants={textVariant(0.2)}
            style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: 28 }}
          >
            <FlowText gradient="linear-gradient(90deg, #10b981, #059669, #10b981)">A system intelligence layer.</FlowText>
          </motion.h2>

          <motion.p 
            variants={fadeUp}
            style={{ fontSize: 'clamp(16px, 2vw, 20px)', color: 'rgba(255,255,255,0.55)', maxWidth: 640, lineHeight: 1.65, margin: '0 auto 48px' }}
          >
            Neytreya observes how your computer behaves—hardware usage, applications, workflows, and system behaviour. It is not a chatbot, automation engine, coding assistant, or computer controller. Its purpose is awareness.
          </motion.p>

          <motion.div 
            variants={fadeUp}
            className="hero-actions"
            style={{ display: 'flex', gap: 16, justifyContent: 'center' }}
          >
            <motion.a whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} href="#download" className="btn-primary" style={{ background: '#fff', color: '#000', padding: '16px 32px', fontSize: 16, borderRadius: 99, display: 'inline-flex', alignItems: 'center', gap: 8, fontWeight: 800, textDecoration: 'none' }}>
              Download Neytreya
            </motion.a>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href="/products/neytreya/learn-more" className="btn-secondary" style={{ padding: '16px 32px', fontSize: 16, borderRadius: 99, border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.04)', color: '#fff', fontWeight: 700, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
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
              className="section-label" style={{ color: '#34d399', fontSize: 11, fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 16, display: 'inline-block', padding: '5px 14px', borderRadius: 8, background: 'rgba(16,185,129,0.08)' }}
            >
              Capabilities
            </motion.p>
            <motion.h2 
              variants={textVariant(0)}
              style={{ fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 900, letterSpacing: '-0.03em', marginBottom: 48 }}
            >
              What it<br />observes.
            </motion.h2>

            <motion.div variants={staggerContainer(0.05, 0.1)} className="bento" style={{ display: 'grid', gap: 20, gridTemplateColumns: 'repeat(4, 1fr)', gridAutoRows: 'minmax(200px, auto)' }}>
              {FEATURES.map((feature, index) => (
                <motion.div key={feature.title} variants={fadeUp} className={`bento-cell bento-cell--${feature.size || 'narrow'}`} style={{
                  gridColumn: feature.size === 'wide' ? 'span 4' : feature.size === 'half' ? 'span 2' : 'span 4'
                }}>
                  <Card3D style={{ padding: '32px 28px', height: '100%', boxSizing: 'border-box', display: 'flex', flexDirection: 'column' }} orbColor="rgba(16,185,129,0.3)">
                    <div style={{
                      width: 44, height: 44, borderRadius: 12,
                      display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, marginBottom: 24,
                      background: 'rgba(16,185,129,0.15)', color: '#34d399'
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
              <Card3D style={{ padding: '80px 40px', textAlign: 'center' }} orbColor="rgba(16,185,129,0.15)">
                <h2 style={{ fontSize: 44, fontWeight: 800, letterSpacing: '-0.04em', marginBottom: 16 }}>Start Your Companion.</h2>
                <p style={{ color: 'rgba(255,255,255,0.5)', marginBottom: 48, fontSize: 18, maxWidth: 600, margin: '0 auto 48px' }}>
                  Neytreya is currently available exclusively for Windows 10/11. macOS and Linux support coming later this year.
                </p>
                
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <motion.a whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} href="/downloads/neytreya-windows.exe" className="btn-primary" style={{ background: '#fff', color: '#000', padding: '24px 48px', fontSize: 20, borderRadius: 99, display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none', fontWeight: 800 }}>
                    <FiDownload size={24} /> Download for Windows
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
