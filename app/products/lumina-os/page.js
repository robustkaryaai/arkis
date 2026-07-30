'use client';
import { useRef, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ChatWidget from '@/components/ChatWidget';
import BackButton from '@/components/BackButton';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { FiLock, FiCpu, FiLayers, FiShield, FiCheckCircle, FiArrowRight } from 'react-icons/fi';
import Image from 'next/image';
import Link from 'next/link';
import { StarField, Card3D, staggerContainer, fadeUp, textVariant, FlowText } from '@/components/SpaceUI';

const FEATURES = [
  { size: 'wide', icon: <FiLock />, title: 'Privacy as an architectural decision.', desc: 'Lumina OS is being designed so that privacy is built into the operating environment itself, not added as a setting on top of an existing system. The goal is an OS where local AI, transparent system behavior, and minimal data collection are core decisions, not optional configurations.' },
  { size: 'narrow', icon: <FiCpu />, title: 'Currently in development', desc: 'Lumina OS does not exist yet in a form that is available to users. We are building it. This page describes the vision, not a product you can download today.' },
  { size: 'half', icon: <FiLayers />, title: 'The intended relationship with AI', desc: 'The goal is for local AI to be integrated into the OS itself — not bolted on afterward. AI, applications, and system services are intended to work together without requiring cloud infrastructure.' },
  { size: 'half', icon: <FiShield />, title: 'No telemetry by design', desc: 'The intent is an operating environment that does not collect usage data, does not require an account, and does not communicate with external servers without a clear reason visible to the user.' },
];

export default function LuminaOSPage() {
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
            style={{ background: 'rgba(207,232,255,0.08)', border: '1px solid rgba(207,232,255,0.25)', color: '#cfe8ff', margin: '0 auto 24px', display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 16px', borderRadius: 99, fontSize: 12, fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase' }}
          >
            <motion.span animate={{ opacity: [1, 0.3, 1] }} transition={{ repeat: Infinity, duration: 2 }} style={{ width: 8, height: 8, borderRadius: '50%', background: '#cfe8ff', boxShadow: '0 0 6px #cfe8ff' }} />
            In Development — Not Yet Available
          </motion.div>

          <motion.h1 
            variants={textVariant(0.1)}
            style={{ fontSize: 'clamp(52px, 8.5vw, 130px)', fontWeight: 900, letterSpacing: '-0.05em', lineHeight: 0.95, marginBottom: 20 }}
          >
            Lumina <FlowText gradient="linear-gradient(90deg, #cfe8ff, #60a5fa, #cfe8ff)">OS</FlowText>
          </motion.h1>
          
          <motion.h2
            variants={textVariant(0.2)}
            style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: 28 }}
          >
            <FlowText gradient="linear-gradient(90deg, #cfe8ff, #60a5fa, #cfe8ff)">Privacy built into the OS itself.</FlowText>
          </motion.h2>

          <motion.p 
            variants={fadeUp}
            style={{ fontSize: 'clamp(16px, 2vw, 20px)', color: 'rgba(255,255,255,0.55)', maxWidth: 640, lineHeight: 1.65, margin: '0 auto 48px' }}
          >
            Lumina OS is RexyCore’s long-term vision for an operating system designed around privacy from the start. Rather than adding privacy features on top of an existing platform, the goal is for privacy to be a core architectural decision. It is currently in development and not available to users.
          </motion.p>

          <motion.div 
            variants={fadeUp}
            className="hero-actions"
            style={{ display: 'flex', gap: 16, justifyContent: 'center' }}
          >
            <motion.a whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} href="#alpha" className="btn-primary" style={{ background: '#fff', color: '#000', padding: '16px 32px', fontSize: 16, borderRadius: 99, display: 'inline-flex', alignItems: 'center', gap: 8, fontWeight: 800, textDecoration: 'none' }}>
              Join Alpha Waitlist
            </motion.a>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href="/products/lumina-os/learn-more" className="btn-secondary" style={{ padding: '16px 32px', fontSize: 16, borderRadius: 99, border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.04)', color: '#fff', fontWeight: 700, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
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
              className="section-label" style={{ color: '#cfe8ff', fontSize: 11, fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 16, display: 'inline-block', padding: '5px 14px', borderRadius: 8, background: 'rgba(207,232,255,0.08)' }}
            >
              System Architecture
            </motion.p>
            <motion.h2 
              variants={textVariant(0)}
              style={{ fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 900, letterSpacing: '-0.03em', marginBottom: 48 }}
            >
              What we are<br />building toward.
            </motion.h2>

            <motion.div variants={staggerContainer(0.05, 0.1)} className="bento" style={{ display: 'grid', gap: 20, gridTemplateColumns: 'repeat(4, 1fr)', gridAutoRows: 'minmax(200px, auto)' }}>
              {FEATURES.map((feature, index) => (
                <motion.div key={feature.title} variants={fadeUp} className={`bento-cell bento-cell--${feature.size || 'narrow'}`} style={{
                  gridColumn: feature.size === 'wide' ? 'span 4' : feature.size === 'half' ? 'span 2' : 'span 4'
                }}>
                  <Card3D style={{ padding: '32px 28px', height: '100%', boxSizing: 'border-box', display: 'flex', flexDirection: 'column' }} orbColor="rgba(207,232,255,0.3)">
                    <div style={{
                      width: 44, height: 44, borderRadius: 12,
                      display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, marginBottom: 24,
                      background: 'rgba(207,232,255,0.12)', color: '#cfe8ff'
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

      {/* ── WAITLIST ─────────────────── */}
      <section id="alpha" style={{ padding: '80px 5%', position: 'relative', zIndex: 10 }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <motion.div variants={staggerContainer(0.1, 0.2)} initial="hidden" whileInView="show" viewport={{ once: false, amount: 0.15 }}>
            <motion.div variants={fadeUp}>
              <Card3D style={{ padding: '80px 40px', textAlign: 'center' }} orbColor="rgba(207,232,255,0.15)">
                <h2 style={{ fontSize: 44, fontWeight: 800, letterSpacing: '-0.04em', marginBottom: 16 }}>Request Alpha Access.</h2>
                <p style={{ color: 'rgba(255,255,255,0.5)', marginBottom: 48, fontSize: 18, maxWidth: 600, margin: '0 auto 48px' }}>
                  Spots for the Lumina OS Alpha are extremely limited. Join the waitlist to receive your unique ISO download link when a spot opens.
                </p>
                
                <div style={{ display: 'flex', justifyContent: 'center', gap: 16, flexDirection: 'column', alignItems: 'center' }}>
                  <input type="email" placeholder="Enter your email address" style={{ padding: '16px 24px', width: '100%', maxWidth: 400, borderRadius: 12, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontSize: 16, outline: 'none' }} />
                  <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="btn-primary" style={{ background: '#fff', color: '#000', padding: '16px 48px', fontSize: 18, borderRadius: 99, display: 'flex', alignItems: 'center', gap: 12, border: 'none', cursor: 'pointer', fontWeight: 800 }} onClick={() => alert('Added to Waitlist!')}>
                    Join Waitlist
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
