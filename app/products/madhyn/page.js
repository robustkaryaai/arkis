'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowRight, FiShield, FiCpu, FiCode, FiLayers, FiActivity, FiSearch, FiCheckCircle } from 'react-icons/fi';
import Navbar from '@/components/Navbar';
import ChatWidget from '@/components/ChatWidget';
import Footer from '@/components/Footer';
import BackButton from '@/components/BackButton';
import { StarField, Card3D, staggerContainer, textVariant, fadeUp, SectionHeader, FlowText } from '@/components/SpaceUI';

// Silver / Graphite Theme
const MC = '#94a3b8'; // Slate 400
const MCA = '#cbd5e1'; // Slate 300
const BG = '#010104';

// Abstract Loop Steps
const LOOP_STEPS = [
  { id: 'context', label: 'CONTEXT', desc: 'Analyzes architecture, dependencies, and objectives.', icon: <FiSearch /> },
  { id: 'reason', label: 'REASON', desc: 'Researches docs and plans the necessary modifications.', icon: <FiCpu /> },
  { id: 'action', label: 'ACTION', desc: 'Executes controlled edits, builds, and runs tests.', icon: <FiCode /> },
  { id: 'proof', label: 'PROOF', desc: 'Iterates on failures and verifies the final result.', icon: <FiCheckCircle /> },
];

export default function MadhynPage() {
  const [activeStep, setActiveStep] = useState('context');

  return (
    <div style={{ minHeight: '100vh', background: BG, color: '#fff', position: 'relative', overflow: 'hidden' }}>
      <StarField density="medium" />
      
      {/* Soft silver/graphite background glow */}
      <div style={{ position: 'absolute', top: '10%', left: '50%', transform: 'translate(-50%, -50%)', width: '80vw', height: '80vw', background: 'radial-gradient(circle, rgba(148,163,184,0.03) 0%, transparent 60%)', filter: 'blur(100px)', pointerEvents: 'none', zIndex: 0 }} />

      <Navbar />
      <div style={{ position: 'fixed', top: 90, left: '5%', zIndex: 50 }}><BackButton /></div>

      {/* ── HERO ── */}
      <section style={{ position: 'relative', zIndex: 10, minHeight: '85vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '160px 5% 100px' }}>
        <motion.div variants={staggerContainer(0.1, 0.2)} initial="hidden" animate="show" style={{ maxWidth: 860, width: '100%' }}>
          
          <motion.div variants={fadeUp(0.05)} style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '8px 24px', borderRadius: 99, border: '1px solid rgba(148,163,184,0.3)', background: 'rgba(148,163,184,0.05)', backdropFilter: 'blur(20px)', marginBottom: 40, boxShadow: '0 0 20px rgba(148,163,184,0.1)' }}>
            <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: 2, color: MCA, textTransform: 'uppercase' }}>RexyCore / Autonomous Development</span>
          </motion.div>

          <motion.div variants={fadeUp(0.1)} style={{ marginBottom: 30, display: 'flex', justifyContent: 'center' }}>
            <div style={{ position: 'relative', width: 120, height: 120, borderRadius: 24, overflow: 'hidden', border: `1px solid ${MC}40`, boxShadow: `0 0 40px ${MC}20`, background: 'rgba(0,0,0,0.5)' }}>
               <Image src="/madhyn-logo.jpg" alt="MADHYN Logo" fill style={{ objectFit: 'cover' }} />
            </div>
          </motion.div>

          <motion.h1 variants={textVariant(0.1)} style={{ fontSize: 'clamp(48px, 8vw, 96px)', fontWeight: 900, letterSpacing: '-0.05em', lineHeight: 1.05, marginBottom: 28, textShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>
            Imagine it.<br />
            Let <FlowText gradient={`linear-gradient(90deg, ${MC}, #fff, ${MCA}, ${MC})`}>MADHYN</FlowText> build it.
          </motion.h1>

          <motion.p variants={fadeUp(0.2)} style={{ fontSize: 'clamp(18px, 2.5vw, 22px)', color: 'rgba(255,255,255,0.5)', lineHeight: 1.6, marginBottom: 48, maxWidth: 720, margin: '0 auto 48px' }}>
            MADHYN understands your project, researches what it needs, writes and modifies code, runs it, tests it, fixes failures, and verifies the result — all inside a controlled development environment.
          </motion.p>

          <motion.div variants={fadeUp(0.3)} style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/products/madhyn/learn-more" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '16px 36px', borderRadius: 99, background: `linear-gradient(90deg, ${MC}, ${MCA}, ${MC})`, color: '#000', fontWeight: 800, fontSize: 16, textDecoration: 'none', boxShadow: `0 8px 30px ${MC}33` }}>
              Explore MADHYN
            </Link>
            <a href="#workflow" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '16px 36px', borderRadius: 99, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontWeight: 700, fontSize: 16, textDecoration: 'none' }}>
              See how it works
            </a>
          </motion.div>

        </motion.div>
      </section>

      {/* ── THE PROBLEM ── */}
      <section style={{ position: 'relative', zIndex: 10, padding: '100px 5%' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto', textAlign: 'center' }}>
          <SectionHeader title="The Problem" subtitle="Stop Micromanaging the Machine." gradient={`linear-gradient(90deg, ${MC}, ${MCA})`} />
          <p style={{ fontSize: 24, fontWeight: 500, color: 'rgba(255,255,255,0.6)', lineHeight: 1.5, maxWidth: 800, margin: '0 auto 60px' }}>
            Modern AI coding tools still leave you orchestrating every step. You prompt. You inspect. You copy. You test. You debug. You repeat. MADHYN compresses that loop.
          </p>
          
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 24 }}>
            {['You Prompt', 'You Inspect', 'You Test', 'You Debug'].map((step, i) => (
              <Card3D key={i} orbColor={`${MC}22`} style={{ padding: '32px 24px', textAlign: 'center', opacity: 0.5, flex: '1 1 200px', maxWidth: 280 }}>
                <div style={{ textDecoration: 'line-through', fontSize: 18, fontWeight: 800 }}>{step}</div>
              </Card3D>
            ))}
          </div>
        </div>
      </section>

      {/* ── THE MADHYN LOOP ── */}
      <section id="workflow" style={{ position: 'relative', zIndex: 10, padding: '140px 5%' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <SectionHeader title="The Workflow" subtitle="Context. Reason. Action. Proof." gradient={`linear-gradient(90deg, ${MC}, ${MCA})`} align="left" />
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: 60, alignItems: 'center', marginTop: 60 }}>
            {/* Steps List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {LOOP_STEPS.map((step) => (
                <div 
                  key={step.id} 
                  onMouseEnter={() => setActiveStep(step.id)}
                  style={{ 
                    padding: '24px', 
                    borderRadius: 20, 
                    border: `1px solid ${activeStep === step.id ? MC + '66' : 'rgba(255,255,255,0.05)'}`,
                    background: activeStep === step.id ? 'rgba(148,163,184,0.08)' : 'transparent',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 16
                  }}
                >
                  <div style={{ width: 40, height: 40, borderRadius: 12, background: activeStep === step.id ? MC : 'rgba(255,255,255,0.05)', color: activeStep === step.id ? '#000' : 'rgba(255,255,255,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, transition: 'all 0.3s ease' }}>
                    {step.icon}
                  </div>
                  <div>
                    <div style={{ fontSize: 18, fontWeight: 800, color: activeStep === step.id ? '#fff' : 'rgba(255,255,255,0.5)', marginBottom: 6, letterSpacing: 1 }}>{step.label}</div>
                    <div style={{ fontSize: 14, color: activeStep === step.id ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.3)', lineHeight: 1.5 }}>{step.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Visualizer */}
            <Card3D orbColor={`${MC}33`} style={{ height: 500, padding: 40, display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', inset: 0, background: 'url(/noise.png)', opacity: 0.03, mixBlendMode: 'overlay' }} />
              <AnimatePresence mode="wait">
                <motion.div 
                  key={activeStep}
                  initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
                  animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
                  transition={{ duration: 0.4 }}
                  style={{ textAlign: 'center' }}
                >
                  {activeStep === 'context' && (
                    <div>
                      <FiSearch size={64} color={MC} style={{ marginBottom: 24, opacity: 0.8 }} />
                      <h3 style={{ fontSize: 32, fontWeight: 800, marginBottom: 16 }}>Scanning Architecture</h3>
                      <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 16 }}>Building an understanding of folder structures, dependencies, and entry points before making changes.</p>
                    </div>
                  )}
                  {activeStep === 'reason' && (
                    <div>
                      <FiLayers size={64} color={MC} style={{ marginBottom: 24, opacity: 0.8 }} />
                      <h3 style={{ fontSize: 32, fontWeight: 800, marginBottom: 16 }}>Formulating a Plan</h3>
                      <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 16 }}>Cross-referencing official documentation and deciding which files require modifications to achieve the goal.</p>
                    </div>
                  )}
                  {activeStep === 'action' && (
                    <div>
                      <FiCode size={64} color={MC} style={{ marginBottom: 24, opacity: 0.8 }} />
                      <h3 style={{ fontSize: 32, fontWeight: 800, marginBottom: 16 }}>Executing Edits</h3>
                      <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 16 }}>Making targeted file modifications and running terminal commands in the background.</p>
                    </div>
                  )}
                  {activeStep === 'proof' && (
                    <div>
                      <FiActivity size={64} color={MC} style={{ marginBottom: 24, opacity: 0.8 }} />
                      <h3 style={{ fontSize: 32, fontWeight: 800, marginBottom: 16 }}>Verifying Results</h3>
                      <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 16 }}>Observing test outputs, investigating failures, and iterating until the software works as intended.</p>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </Card3D>
          </div>
        </div>
      </section>

      {/* ── SECURITY ── */}
      <section style={{ position: 'relative', zIndex: 10, padding: '100px 5% 160px' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto', textAlign: 'center' }}>
          <SectionHeader title="Controlled Autonomy" subtitle="Security By Design" gradient={`linear-gradient(90deg, ${MC}, ${MCA})`} />
          <p style={{ fontSize: 20, color: 'rgba(255,255,255,0.6)', lineHeight: 1.6, marginBottom: 60, maxWidth: 700, margin: '0 auto 60px' }}>
            MADHYN does not receive unchecked access to your machine. Every action passes through a strict security and policy layer before touching your system.
          </p>
          
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, flexWrap: 'wrap' }}>
            {['AI INTENT', 'POLICY LAYER', 'TOOL EXECUTION', 'SYSTEM'].map((node, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <Card3D orbColor={i === 1 ? 'rgba(255,0,0,0.2)' : `${MC}22`} style={{ padding: '20px 30px', border: i === 1 ? '1px solid rgba(255,50,50,0.3)' : undefined, background: i === 1 ? 'rgba(255,50,50,0.05)' : undefined }}>
                  <div style={{ fontSize: 14, fontWeight: 800, letterSpacing: 1, color: i === 1 ? '#ff8080' : '#fff' }}>{node}</div>
                </Card3D>
                {i < 3 && <FiArrowRight size={20} color="rgba(255,255,255,0.3)" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section style={{ position: 'relative', zIndex: 10, padding: '0 5% 140px' }}>
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, amount: 0.2 }}
          style={{ maxWidth: 900, margin: '0 auto', padding: '80px 5%', borderRadius: 32, background: 'rgba(255,255,255,0.02)', border: `1px solid ${MC}33`, textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: -100, left: '50%', transform: 'translateX(-50%)', width: '80%', height: 200, background: `radial-gradient(ellipse, ${MC}22 0%, transparent 70%)`, filter: 'blur(50px)' }} />
          
          <h2 style={{ fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 900, letterSpacing: '-0.04em', marginBottom: 20, position: 'relative' }}>
            Stop micromanaging the machine.
          </h2>
          <p style={{ fontSize: 20, color: 'rgba(255,255,255,0.5)', marginBottom: 40, position: 'relative' }}>
            Start directing it.
          </p>
          
          <Link href="/products/madhyn/learn-more" style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', gap: 10, padding: '18px 40px', borderRadius: 99, background: '#fff', color: '#000', fontWeight: 800, fontSize: 16, textDecoration: 'none', boxShadow: `0 10px 40px rgba(255,255,255,0.2)` }}>
            Dive deeper into MADHYN <FiArrowRight />
          </Link>
        </motion.div>
      </section>

      <Footer />
      <ChatWidget />
    </div>
  );
}
