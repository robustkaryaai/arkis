'use client';
import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiArrowRight, FiDatabase, FiBox, FiGitBranch, FiCpu,
  FiMonitor, FiTerminal, FiCheckCircle, FiSearch, FiCode,
  FiActivity, FiLayers, FiShield, FiEye, FiRepeat, FiZap,
} from 'react-icons/fi';
import Navbar from '@/components/Navbar';
import ChatWidget from '@/components/ChatWidget';
import Footer from '@/components/Footer';
import BackButton from '@/components/BackButton';
import { StarField, Card3D, staggerContainer, textVariant, fadeUp, FlowText } from '@/components/SpaceUI';

const MC = '#94a3b8';
const MCA = '#cbd5e1';
const BG = '#010104';

/* ── Expanded Development Loop ── */
const DEV_LOOP = [
  { id: 'research', label: 'RESEARCH', color: '#94a3b8', desc: 'Searches documentation, GitHub, and the web before acting.' },
  { id: 'understand', label: 'UNDERSTAND', color: '#94a3b8', desc: 'Reads the existing project — files, structure, conventions, dependencies.' },
  { id: 'plan', label: 'PLAN', color: '#94a3b8', desc: 'Decomposes the task and selects the right tools and files.' },
  { id: 'build', label: 'BUILD', color: '#94a3b8', desc: 'Writes and modifies code in a controlled, targeted way.' },
  { id: 'run', label: 'RUN', color: '#94a3b8', desc: 'Executes terminal commands, dev server, linting, or builds.' },
  { id: 'test', label: 'TEST', color: '#94a3b8', desc: 'Runs the test suite and observes the output automatically.' },
  { id: 'observe', label: 'OBSERVE', color: '#94a3b8', desc: 'Reads failures, warnings, and logs — not just success/fail.' },
  { id: 'fix', label: 'FIX', color: '#94a3b8', desc: 'Diagnoses the root cause and adapts the implementation.' },
  { id: 'verify', label: 'VERIFY', color: '#94a3b8', desc: 'Confirms the result before marking the objective complete.' },
  { id: 'learn', label: 'LEARN', color: '#94a3b8', desc: 'Stores useful decisions and patterns into project memory.' },
];

/* ── Observability Steps ── */
const OBS_STEPS = [
  { label: 'UNDERSTANDING PROJECT', sub: 'Scanning architecture and entry points...' },
  { label: 'RESEARCHING', sub: 'Checking official framework documentation...' },
  { label: 'PLANNING', sub: '3 files require modification.' },
  { label: 'ACTION', sub: 'Editing src/auth/session.ts' },
  { label: 'TESTING', sub: 'Running authentication tests...' },
  { label: 'FAILURE', sub: 'Session refresh test failed.', warn: true },
  { label: 'ITERATING', sub: 'Adjusting token refresh logic...' },
  { label: 'VERIFYING', sub: 'Running test suite again...' },
  { label: 'COMPLETE', sub: 'All tests passed.', success: true },
];

/* ── Pillars ── */
const PILLARS = [
  { num: '01', icon: <FiSearch size={22} />, title: 'CONTEXT', desc: 'Understand the project before acting. Inspect files, architecture, dependencies, Git state, and relevant environment.' },
  { num: '02', icon: <FiCpu size={22} />, title: 'INTELLIGENCE', desc: 'Reason about the objective. Decompose tasks, select tools, analyze dependencies, evaluate implementation approaches.' },
  { num: '03', icon: <FiCode size={22} />, title: 'ACTION', desc: 'Use tools to actually perform development work. Edit files, run commands, run tests, search the web, interact with Git.' },
  { num: '04', icon: <FiCheckCircle size={22} />, title: 'PROOF', desc: 'Test, verify, and iterate. Code is not done because it was generated — MADHYN tries to prove it works.' },
];

/* ── Security trust levels ── */
const TRUST_LEVELS = [
  { level: 'Low Risk', color: '#4ade80', items: ['Reading project files', 'Inspecting directories', 'Searching code'] },
  { level: 'Development', color: MC, items: ['Creating files', 'Editing files', 'Installing dependencies', 'Running tests'] },
  { level: 'Higher Impact', color: '#f87171', items: ['Destructive file ops', 'External network actions', 'Sensitive system commands'] },
];

/* ── Architecture features ── */
const ARCH_FEATURES = [
  {
    icon: <FiDatabase size={26} />, title: 'Project Memory',
    desc: 'Builds a living context of folder structures, architecture, conventions, and decisions — so MADHYN becomes more useful over time, not less.'
  },
  {
    icon: <FiCpu size={26} />, title: 'Model Freedom',
    desc: 'The intelligence layer is interchangeable. Local models for privacy. Cloud models for complexity. Fast models for quick tasks. You choose.'
  },
  {
    icon: <FiBox size={26} />, title: 'Extensible Plugin System',
    desc: 'New capabilities can be added without touching the core. File system, terminal, web research, Git, testing, and custom internal plugins all connect through the same tool layer.'
  },
  {
    icon: <FiGitBranch size={26} />, title: 'Repository Awareness',
    desc: 'Operates natively inside Git repos. Understands branches, diffs, and history. Give it an objective in natural language — MADHYN finds the relevant code.'
  },
  {
    icon: <FiTerminal size={26} />, title: 'Autonomous Terminal',
    desc: 'Runs real commands in the background. Installs packages, runs the dev server, executes lint, inspects build errors. Terminal output feeds back directly into the reasoning loop.'
  },
  {
    icon: <FiRepeat size={26} />, title: 'Iterative Failure Handling',
    desc: "First attempts can fail. That's by design. MADHYN observes the failure, diagnoses the root cause, adapts, and retries. A failure is not the end of a task."
  },
];

export default function MadhynLearnMore() {
  const [activeLoop, setActiveLoop] = useState(0);

  return (
    <div style={{ minHeight: '100vh', background: BG, color: '#fff', position: 'relative', overflow: 'hidden' }}>
      <StarField density="medium" />
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '70vh', background: 'radial-gradient(ellipse at 50% 0%, rgba(148,163,184,0.07) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 0 }} />

      <Navbar />
      <div style={{ position: 'fixed', top: 90, left: '5%', zIndex: 50 }}><BackButton /></div>

      {/* ── HERO ── */}
      <section style={{ position: 'relative', zIndex: 10, padding: '160px 5% 80px', textAlign: 'center' }}>
        <motion.div variants={staggerContainer(0.1, 0.2)} initial="hidden" animate="show" style={{ maxWidth: 860, margin: '0 auto' }}>
          <motion.div variants={fadeUp(0.05)} style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '8px 24px', borderRadius: 99, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', marginBottom: 24 }}>
            <FiMonitor color={MC} />
            <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: 1, color: '#fff', textTransform: 'uppercase' }}>Technical Deep Dive</span>
          </motion.div>

          <motion.h1 variants={textVariant(0.1)} style={{ fontSize: 'clamp(40px, 6vw, 72px)', fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1.05, marginBottom: 28, paddingBottom: '0.2em' }}>
            Engineering + Intelligence +{' '}
            <FlowText gradient={`linear-gradient(90deg, ${MC}, #fff, ${MCA}, ${MC})`}>Control.</FlowText>
          </motion.h1>

          <motion.p variants={fadeUp(0.2)} style={{ fontSize: 20, color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, maxWidth: 700, margin: '0 auto' }}>
            MADHYN is not another VS Code clone or an AI autocomplete window. It is a full autonomous development environment — an acting engineering system that understands, reasons, builds, tests, and verifies inside a controlled environment.
          </motion.p>
        </motion.div>
      </section>

      {/* ── FOUR PILLARS ── */}
      <section style={{ position: 'relative', zIndex: 10, padding: '80px 5% 120px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: 'center', marginBottom: 60 }}>
            <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 3, color: `${MC}88`, textTransform: 'uppercase', marginBottom: 14 }}>Architecture</div>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 900, letterSpacing: '-0.04em' }}>The Four Pillars</h2>
          </motion.div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 24 }}>
            {PILLARS.map((p, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}>
                <Card3D orbColor={`${MC}22`} style={{ padding: '36px 28px', height: '100%', display: 'flex', flexDirection: 'column', gap: 20 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <span style={{ fontSize: 11, fontWeight: 900, letterSpacing: 2, color: `${MC}66`, fontVariantNumeric: 'tabular-nums' }}>{p.num}</span>
                    <div style={{ width: 44, height: 44, borderRadius: 14, background: `${MC}12`, border: `1px solid ${MC}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: MC }}>{p.icon}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 900, letterSpacing: 2, color: MC, textTransform: 'uppercase', marginBottom: 10 }}>{p.title}</div>
                    <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.55)', lineHeight: 1.7 }}>{p.desc}</p>
                  </div>
                </Card3D>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── THE EXPANDED LOOP ── */}
      <section style={{ position: 'relative', zIndex: 10, padding: '100px 5% 120px', background: 'rgba(255,255,255,0.01)', borderTop: '1px solid rgba(255,255,255,0.04)', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ marginBottom: 60 }}>
            <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 3, color: `${MC}88`, textTransform: 'uppercase', marginBottom: 14 }}>The engineering loop</div>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 52px)', fontWeight: 900, letterSpacing: '-0.04em', maxWidth: 700, lineHeight: 1.1, marginBottom: 18 }}>
              Not one-shot generation.<br />A continuous development cycle.
            </h2>
            <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.45)', lineHeight: 1.7, maxWidth: 600 }}>
              Not every task requires every stage. MADHYN dynamically determines what is necessary. A simple task might skip directly to action and verify. A complex task runs the full loop — and iterates.
            </p>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 48, alignItems: 'start' }}>
            {/* Clickable step list */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {DEV_LOOP.map((step, i) => (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.04 }}
                  onMouseEnter={() => setActiveLoop(i)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 16, padding: '14px 20px', borderRadius: 16,
                    border: `1px solid ${activeLoop === i ? MC + '55' : 'rgba(255,255,255,0.04)'}`,
                    background: activeLoop === i ? `${MC}0d` : 'transparent',
                    cursor: 'pointer', transition: 'all 0.25s ease',
                  }}
                >
                  <div style={{ width: 28, height: 28, borderRadius: 8, background: activeLoop === i ? MC : 'rgba(255,255,255,0.05)', color: activeLoop === i ? '#000' : 'rgba(255,255,255,0.25)', fontSize: 11, fontWeight: 900, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.25s ease', flexShrink: 0 }}>{i + 1}</div>
                  <span style={{ fontSize: 13, fontWeight: 800, letterSpacing: 1.5, color: activeLoop === i ? '#fff' : 'rgba(255,255,255,0.35)', textTransform: 'uppercase', transition: 'color 0.25s' }}>{step.label}</span>
                </motion.div>
              ))}
            </div>

            {/* Detail card */}
            <div style={{ position: 'sticky', top: 120 }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeLoop}
                  initial={{ opacity: 0, y: 16, filter: 'blur(8px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0)' }}
                  exit={{ opacity: 0, y: -16, filter: 'blur(8px)' }}
                  transition={{ duration: 0.3 }}
                >
                  <Card3D orbColor={`${MC}33`} style={{ padding: '48px 40px', minHeight: 300, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <div style={{ fontSize: 11, fontWeight: 900, letterSpacing: 3, color: MC, textTransform: 'uppercase', marginBottom: 20 }}>Stage {activeLoop + 1} of {DEV_LOOP.length}</div>
                    <h3 style={{ fontSize: 40, fontWeight: 900, letterSpacing: '-0.04em', marginBottom: 20 }}>{DEV_LOOP[activeLoop].label}</h3>
                    <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.6)', lineHeight: 1.7 }}>{DEV_LOOP[activeLoop].desc}</p>
                    <div style={{ marginTop: 32, height: 1, background: `linear-gradient(90deg, ${MC}44, transparent)` }} />
                    {activeLoop < DEV_LOOP.length - 1 && (
                      <div style={{ marginTop: 20, fontSize: 12, color: 'rgba(255,255,255,0.25)', display: 'flex', alignItems: 'center', gap: 8 }}>
                        Next: <span style={{ color: MC, fontWeight: 700 }}>{DEV_LOOP[activeLoop + 1].label}</span> <FiArrowRight size={12} />
                      </div>
                    )}
                  </Card3D>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* ── OBSERVABILITY ── */}
      <section style={{ position: 'relative', zIndex: 10, padding: '120px 5% 120px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 3, color: `${MC}88`, textTransform: 'uppercase', marginBottom: 14 }}>Transparency</div>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1.1, marginBottom: 24 }}>
              MADHYN should never feel like an invisible process.
            </h2>
            <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, marginBottom: 24 }}>
              At every stage of its execution, MADHYN surfaces what it is doing — what it scanned, what it edited, what failed, what it fixed, and what passed. You see activity, not internal AI reasoning.
            </p>
            <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.5)', lineHeight: 1.7 }}>
              The developer stays in control of the objective and important decisions. MADHYN handles the orchestration in between.
            </p>
          </motion.div>

          {/* Live activity log simulation */}
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}>
            <Card3D orbColor={`${MC}22`} style={{ padding: '24px 28px', fontFamily: "'JetBrains Mono', 'Fira Code', monospace" }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.3)', letterSpacing: 1, marginBottom: 20, textTransform: 'uppercase' }}>Activity Log</div>
              {OBS_STEPS.map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.3 }}
                  style={{ marginBottom: 16 }}
                >
                  <div style={{ fontSize: 11, fontWeight: 900, letterSpacing: 1.5, color: s.warn ? '#f87171' : s.success ? '#4ade80' : MCA, textTransform: 'uppercase' }}>{s.label}</div>
                  <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', marginTop: 2 }}>{s.sub}</div>
                  {i < OBS_STEPS.length - 1 && <div style={{ marginTop: 10, height: 1, background: 'rgba(255,255,255,0.04)' }} />}
                </motion.div>
              ))}
            </Card3D>
          </motion.div>
        </div>
      </section>

      {/* ── SECURITY MODEL ── */}
      <section style={{ position: 'relative', zIndex: 10, padding: '100px 5% 120px', background: 'rgba(255,255,255,0.01)', borderTop: '1px solid rgba(255,255,255,0.04)', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: 'center', marginBottom: 60 }}>
            <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 3, color: `${MC}88`, textTransform: 'uppercase', marginBottom: 14 }}>Security</div>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 900, letterSpacing: '-0.04em', marginBottom: 20 }}>Autonomy with boundaries.</h2>
            <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.45)', maxWidth: 620, margin: '0 auto', lineHeight: 1.7 }}>
              Autonomy does not mean unrestricted machine access. Every action MADHYN takes passes through a security and policy layer before touching the system.
            </p>
          </motion.div>

          {/* Trust level cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, marginBottom: 60 }}>
            {TRUST_LEVELS.map((tl, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.12 }}>
                <Card3D orbColor={`${tl.color}22`} style={{ padding: '32px 28px', height: '100%', border: `1px solid ${tl.color}22` }}>
                  <div style={{ fontSize: 12, fontWeight: 900, letterSpacing: 1.5, color: tl.color, textTransform: 'uppercase', marginBottom: 20 }}>{tl.level}</div>
                  {tl.items.map((item, j) => (
                    <div key={j} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                      <div style={{ width: 6, height: 6, borderRadius: '50%', background: tl.color, opacity: 0.7, flexShrink: 0 }} />
                      <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)' }}>{item}</span>
                    </div>
                  ))}
                </Card3D>
              </motion.div>
            ))}
          </div>

          {/* Policy flow */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, flexWrap: 'wrap' }}>
            {['USER', 'MADHYN', 'SECURITY / POLICY', 'TOOL', 'SYSTEM'].map((node, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{
                  padding: '14px 24px', borderRadius: 14,
                  background: i === 2 ? 'rgba(248,113,113,0.07)' : 'rgba(255,255,255,0.03)',
                  border: `1px solid ${i === 2 ? 'rgba(248,113,113,0.3)' : 'rgba(255,255,255,0.08)'}`,
                  fontSize: 12, fontWeight: 800, letterSpacing: 1,
                  color: i === 2 ? '#f87171' : 'rgba(255,255,255,0.7)',
                }}>
                  {node}
                </div>
                {i < 4 && <FiArrowRight size={16} color="rgba(255,255,255,0.2)" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ARCHITECTURE FEATURES ── */}
      <section style={{ position: 'relative', zIndex: 10, padding: '120px 5% 80px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ marginBottom: 60 }}>
            <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 3, color: `${MC}88`, textTransform: 'uppercase', marginBottom: 14 }}>Core capabilities</div>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 52px)', fontWeight: 900, letterSpacing: '-0.04em' }}>What makes it work.</h2>
          </motion.div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 28 }}>
            {ARCH_FEATURES.map((feat, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }}>
                <Card3D orbColor={`${MC}1a`} style={{ padding: '36px 30px', height: '100%', display: 'flex', flexDirection: 'column', gap: 20 }}>
                  <div style={{ width: 52, height: 52, borderRadius: 14, background: `${MC}0d`, border: `1px solid ${MC}33`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: MC }}>
                    {feat.icon}
                  </div>
                  <div>
                    <h3 style={{ fontSize: 20, fontWeight: 800, color: '#fff', marginBottom: 10, lineHeight: 1.3 }}>{feat.title}</h3>
                    <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.55)', lineHeight: 1.7 }}>{feat.desc}</p>
                  </div>
                </Card3D>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ONE PARAGRAPH ── */}
      <section style={{ position: 'relative', zIndex: 10, padding: '80px 5% 60px' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          style={{ maxWidth: 900, margin: '0 auto', padding: '64px 5%', borderRadius: 32, background: 'rgba(255,255,255,0.02)', border: `1px solid ${MC}22`, textAlign: 'center', position: 'relative', overflow: 'hidden' }}
        >
          <div style={{ position: 'absolute', top: -60, left: '50%', transform: 'translateX(-50%)', width: '70%', height: 160, background: `radial-gradient(ellipse, ${MC}1a 0%, transparent 70%)`, filter: 'blur(40px)' }} />
          <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 3, color: `${MC}88`, textTransform: 'uppercase', marginBottom: 24 }}>In one sentence</div>
          <p style={{ fontSize: 'clamp(20px, 3vw, 28px)', fontWeight: 600, lineHeight: 1.55, color: 'rgba(255,255,255,0.85)', position: 'relative' }}>
            MADHYN is an autonomous AI engineering environment that turns developer objectives into{' '}
            <FlowText gradient={`linear-gradient(90deg, ${MC}, #fff, ${MCA}, ${MC})`}>researched, executed, tested</FlowText>
            {' '}and verified software.
          </p>
        </motion.div>
      </section>

      {/* ── CTA ── */}
      <section style={{ position: 'relative', zIndex: 10, padding: '40px 5% 140px', textAlign: 'center' }}>
        <Link href="/products/madhyn" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '16px 36px', borderRadius: 99, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontWeight: 700, fontSize: 16, textDecoration: 'none' }}>
          Back to MADHYN <FiArrowRight />
        </Link>
      </section>

      <Footer />
      <ChatWidget />
    </div>
  );
}
