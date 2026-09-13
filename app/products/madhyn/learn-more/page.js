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

const DEV_LOOP = [
  { id: 'research',   label: 'RESEARCH',   desc: 'Searches documentation, GitHub, and the web before acting.' },
  { id: 'understand', label: 'UNDERSTAND', desc: 'Reads the existing project — files, structure, conventions, dependencies.' },
  { id: 'plan',       label: 'PLAN',       desc: 'Decomposes the task and selects the right tools and files to change.' },
  { id: 'build',      label: 'BUILD',      desc: 'Writes and modifies code in a controlled, targeted way.' },
  { id: 'run',        label: 'RUN',        desc: 'Executes terminal commands, dev server, linting, or builds.' },
  { id: 'test',       label: 'TEST',       desc: 'Runs the test suite and observes the output automatically.' },
  { id: 'observe',    label: 'OBSERVE',    desc: 'Reads failures, warnings, and logs — not just success or fail.' },
  { id: 'fix',        label: 'FIX',        desc: 'Diagnoses the root cause and adapts the implementation accordingly.' },
  { id: 'verify',     label: 'VERIFY',     desc: 'Confirms the result before marking the objective complete.' },
  { id: 'learn',      label: 'LEARN',      desc: 'Stores useful decisions and patterns into persistent project memory.' },
];

const OBS_STEPS = [
  { label: 'UNDERSTANDING PROJECT', sub: 'Scanning architecture and entry points...', type: 'default' },
  { label: 'RESEARCHING', sub: 'Checking official framework documentation...', type: 'default' },
  { label: 'PLANNING', sub: '3 files require modification.', type: 'default' },
  { label: 'ACTION', sub: 'Editing src/auth/session.ts', type: 'default' },
  { label: 'TESTING', sub: 'Running authentication tests...', type: 'default' },
  { label: 'FAILURE DETECTED', sub: 'Session refresh test failed.', type: 'error' },
  { label: 'ITERATING', sub: 'Adjusting token refresh logic...', type: 'default' },
  { label: 'VERIFYING', sub: 'Running full test suite again...', type: 'default' },
  { label: 'COMPLETE', sub: 'All 41 tests passed.', type: 'success' },
];

const TRUST_LEVELS = [
  { level: 'Low Risk', color: '#4ade80', items: ['Reading project files', 'Inspecting directories', 'Searching code'] },
  { level: 'Development', color: MC, items: ['Creating files', 'Editing files', 'Installing packages', 'Running tests'] },
  { level: 'Higher Impact', color: '#f87171', items: ['Destructive file ops', 'External network actions', 'Sensitive system commands'] },
];

const ARCH_FEATURES = [
  { icon: <FiDatabase size={22} />, title: 'Project Memory', desc: 'Builds a living context of folder structures, architecture, and decisions so MADHYN becomes more useful over time — not less.' },
  { icon: <FiCpu size={22} />, title: 'Model Freedom', desc: 'The intelligence layer is interchangeable. Local models for privacy. Cloud models for complexity. Fast models for quick tasks.' },
  { icon: <FiBox size={22} />, title: 'Extensible Plugin System', desc: 'File system, terminal, web research, Git, testing, and custom internal plugins all connect through the same unified tool layer.' },
  { icon: <FiGitBranch size={22} />, title: 'Repository Awareness', desc: 'Operates natively inside Git repos. Understands branches, diffs, and history. Give an objective in plain language.' },
  { icon: <FiTerminal size={22} />, title: 'Autonomous Terminal', desc: 'Runs real commands. Installs packages, runs the dev server, executes lint, inspects build errors. Output feeds back into the loop.' },
  { icon: <FiRepeat size={22} />, title: 'Iterative Failure Handling', desc: "First attempts can fail. MADHYN observes, diagnoses, adapts, and retries. A failure is not the end of a task." },
];

const PILLARS = [
  {
    num: '01', icon: <FiSearch size={28} />, title: 'CONTEXT',
    headline: 'Understand before acting.',
    desc: 'Inspect files, architecture, dependencies, Git state, and the relevant environment. MADHYN never approaches a project as an empty canvas.',
    detail: ['Project structure & files', 'Dependencies & configuration', 'Existing architecture', 'Git repositories & branches'],
  },
  {
    num: '02', icon: <FiCpu size={28} />, title: 'INTELLIGENCE',
    headline: 'Reason about the objective.',
    desc: 'Decompose tasks, evaluate implementation approaches, plan which files and tools are involved, and identify the dependencies that matter.',
    detail: ['Task decomposition', 'Architecture analysis', 'Tool selection', 'Implementation planning'],
  },
  {
    num: '03', icon: <FiCode size={28} />, title: 'ACTION',
    headline: 'Execute, not just generate.',
    desc: 'Edit files, run terminal commands, build the project, search documentation. MADHYN is an acting development system, not a chatbot.',
    detail: ['File creation & editing', 'Terminal execution', 'Web & docs research', 'Testing & building'],
  },
  {
    num: '04', icon: <FiCheckCircle size={28} />, title: 'PROOF',
    headline: 'Prove the solution works.',
    desc: 'Code is not done because it was generated. MADHYN runs tests, observes failures, iterates, and verifies — before calling the objective complete.',
    detail: ['Automated test execution', 'Failure diagnosis', 'Iterative fixing', 'Final verification'],
  },
];

export default function MadhynLearnMore() {
  const [activeLoop, setActiveLoop] = useState(0);

  return (
    <div style={{ minHeight: '100vh', background: BG, color: '#fff', position: 'relative', overflow: 'hidden' }}>
      <StarField density="medium" />
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '80vh', background: 'radial-gradient(ellipse at 50% -10%, rgba(148,163,184,0.09) 0%, transparent 65%)', pointerEvents: 'none', zIndex: 0 }} />

      <Navbar />
      <div style={{ position: 'fixed', top: 90, left: '5%', zIndex: 50 }}><BackButton /></div>

      {/* ── HERO ── */}
      <section style={{ position: 'relative', zIndex: 10, padding: '160px 5% 100px', textAlign: 'center' }}>
        <motion.div variants={staggerContainer(0.1, 0.2)} initial="hidden" animate="show" style={{ maxWidth: 920, margin: '0 auto' }}>
          <motion.div variants={fadeUp(0.05)} style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '8px 24px', borderRadius: 99, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', marginBottom: 32 }}>
            <FiMonitor color={MC} size={14} />
            <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: 2, color: MCA, textTransform: 'uppercase' }}>Technical Deep Dive</span>
          </motion.div>

          <motion.h1 variants={textVariant(0.1)} style={{ fontSize: 'clamp(48px, 7vw, 88px)', fontWeight: 900, letterSpacing: '-0.05em', lineHeight: 1.02, marginBottom: 32, paddingBottom: '0.15em' }}>
            Engineering +<br />Intelligence +{' '}
            <FlowText gradient={`linear-gradient(90deg, ${MC}, #fff, ${MCA}, ${MC})`}>Control.</FlowText>
          </motion.h1>

          <motion.p variants={fadeUp(0.2)} style={{ fontSize: 'clamp(17px, 2vw, 21px)', color: 'rgba(255,255,255,0.45)', lineHeight: 1.7, maxWidth: 700, margin: '0 auto' }}>
            MADHYN is not a VS Code clone or an AI autocomplete window. It is a full autonomous development environment — an acting engineering system that understands, reasons, builds, tests, and verifies.
          </motion.p>
        </motion.div>
      </section>

      {/* ── FOUR PILLARS — full-width alternating ── */}
      <section style={{ position: 'relative', zIndex: 10, padding: '80px 0 120px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 5%' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ marginBottom: 80 }}>
            <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 3, color: `${MC}77`, textTransform: 'uppercase', marginBottom: 14 }}>Architecture</div>
            <h2 style={{ fontSize: 'clamp(32px, 5vw, 60px)', fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1.05 }}>Four pillars.</h2>
          </motion.div>

          {PILLARS.map((p, i) => (
            <motion.div
              key={p.num}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: 0.05 }}
              style={{
                display: 'grid',
                gridTemplateColumns: i % 2 === 0 ? '1fr 1.2fr' : '1.2fr 1fr',
                gap: 0,
                marginBottom: 2,
                borderTop: '1px solid rgba(255,255,255,0.05)',
                paddingTop: 0,
              }}
            >
              {/* Number + title side */}
              {i % 2 !== 0 && (
                <div style={{ padding: '72px 64px 72px 0', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 24 }}>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                    {p.detail.map((d, j) => (
                      <span key={j} style={{ padding: '6px 14px', borderRadius: 99, background: `${MC}10`, border: `1px solid ${MC}25`, fontSize: 12, color: MCA, fontWeight: 600 }}>{d}</span>
                    ))}
                  </div>
                </div>
              )}
              <div style={{ padding: i % 2 === 0 ? '72px 80px 72px 0' : '72px 0 72px 80px', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 28, borderRight: i % 2 === 0 ? '1px solid rgba(255,255,255,0.05)' : 'none', borderLeft: i % 2 !== 0 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                  <span style={{ fontSize: 72, fontWeight: 900, color: 'rgba(255,255,255,0.04)', letterSpacing: '-0.04em', lineHeight: 1, fontVariantNumeric: 'tabular-nums', flexShrink: 0 }}>{p.num}</span>
                  <div style={{ width: 56, height: 56, borderRadius: 16, background: `${MC}0f`, border: `1px solid ${MC}33`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: MC, flexShrink: 0 }}>{p.icon}</div>
                </div>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 900, letterSpacing: 3, color: MC, textTransform: 'uppercase', marginBottom: 12 }}>{p.title}</div>
                  <h3 style={{ fontSize: 'clamp(22px, 3vw, 34px)', fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1.1, marginBottom: 16 }}>{p.headline}</h3>
                  <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.5)', lineHeight: 1.7 }}>{p.desc}</p>
                </div>
              </div>
              {i % 2 === 0 && (
                <div style={{ padding: '72px 0 72px 64px', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 16 }}>
                  {p.detail.map((d, j) => (
                    <div key={j} style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                      <div style={{ width: 1, height: 32, background: `linear-gradient(180deg, ${MC}55, transparent)`, flexShrink: 0 }} />
                      <span style={{ fontSize: 15, color: 'rgba(255,255,255,0.55)', fontWeight: 500 }}>{d}</span>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }} />
        </div>
      </section>

      {/* ── THE EXPANDED LOOP ── */}
      <section style={{ position: 'relative', zIndex: 10, padding: '120px 5%', background: 'rgba(255,255,255,0.015)', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ marginBottom: 72 }}>
            <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 3, color: `${MC}77`, textTransform: 'uppercase', marginBottom: 14 }}>The engineering loop</div>
            <h2 style={{ fontSize: 'clamp(32px, 5vw, 60px)', fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1.05, marginBottom: 20 }}>
              Not one-shot generation.<br />A continuous cycle.
            </h2>
            <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.4)', lineHeight: 1.7, maxWidth: 560 }}>
              A simple task might skip directly to action and verify. A complex task runs the full loop — and iterates on failures. MADHYN dynamically determines what is necessary.
            </p>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: 40, alignItems: 'start' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              {DEV_LOOP.map((step, i) => (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: i * 0.04 }}
                  onMouseEnter={() => setActiveLoop(i)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 16,
                    padding: '16px 20px', borderRadius: 14,
                    border: `1px solid ${activeLoop === i ? MC + '44' : 'transparent'}`,
                    background: activeLoop === i ? `${MC}0a` : 'transparent',
                    cursor: 'pointer', transition: 'all 0.22s ease',
                  }}
                >
                  <div style={{
                    width: 32, height: 32, borderRadius: 10, flexShrink: 0,
                    background: activeLoop === i ? MC : 'rgba(255,255,255,0.04)',
                    color: activeLoop === i ? '#000' : 'rgba(255,255,255,0.2)',
                    fontSize: 11, fontWeight: 900, display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'all 0.22s ease',
                  }}>{String(i + 1).padStart(2, '0')}</div>
                  <span style={{ fontSize: 12, fontWeight: 900, letterSpacing: 2, color: activeLoop === i ? '#fff' : 'rgba(255,255,255,0.3)', textTransform: 'uppercase', transition: 'color 0.22s' }}>{step.label}</span>
                  {activeLoop === i && <FiArrowRight size={14} color={MC} style={{ marginLeft: 'auto' }} />}
                </motion.div>
              ))}
            </div>

            <div style={{ position: 'sticky', top: 120 }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeLoop}
                  initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0)' }}
                  exit={{ opacity: 0, y: -10, filter: 'blur(10px)' }}
                  transition={{ duration: 0.28 }}
                >
                  <Card3D orbColor={`${MC}2a`} style={{ padding: '56px 48px', minHeight: 340 }}>
                    <div style={{ fontSize: 10, fontWeight: 900, letterSpacing: 3, color: `${MC}88`, textTransform: 'uppercase', marginBottom: 28 }}>STAGE {activeLoop + 1} / {DEV_LOOP.length}</div>
                    <h3 style={{ fontSize: 52, fontWeight: 900, letterSpacing: '-0.05em', lineHeight: 1, marginBottom: 28, color: '#fff' }}>{DEV_LOOP[activeLoop].label}</h3>
                    <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.55)', lineHeight: 1.65 }}>{DEV_LOOP[activeLoop].desc}</p>
                    {activeLoop < DEV_LOOP.length - 1 && (
                      <div style={{ marginTop: 40, display: 'flex', alignItems: 'center', gap: 10, fontSize: 12, color: 'rgba(255,255,255,0.2)' }}>
                        Next <FiArrowRight size={12} />
                        <span style={{ color: MC, fontWeight: 800 }}>{DEV_LOOP[activeLoop + 1].label}</span>
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
      <section style={{ position: 'relative', zIndex: 10, padding: '120px 5%' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 3, color: `${MC}77`, textTransform: 'uppercase', marginBottom: 14 }}>Transparency</div>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 52px)', fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1.08, marginBottom: 24 }}>
              Never an invisible process.
            </h2>
            <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.45)', lineHeight: 1.7, marginBottom: 20 }}>
              At every stage, MADHYN surfaces what it is doing — what it scanned, what it edited, what failed, what it fixed, and what passed.
            </p>
            <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.45)', lineHeight: 1.7 }}>
              You see activity, not internal AI reasoning. The developer controls the objective. MADHYN handles the orchestration.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
            <div style={{ borderRadius: 20, border: '1px solid rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.02)', overflow: 'hidden' }}>
              <div style={{ padding: '16px 24px', borderBottom: '1px solid rgba(255,255,255,0.05)', background: 'rgba(255,255,255,0.02)', display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: 'rgba(255,255,255,0.1)' }} />
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: 'rgba(255,255,255,0.1)' }} />
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: 'rgba(255,255,255,0.1)' }} />
                <span style={{ marginLeft: 8, fontSize: 11, color: 'rgba(255,255,255,0.25)', fontWeight: 700, letterSpacing: 1 }}>ACTIVITY</span>
              </div>
              <div style={{ padding: '28px 28px' }}>
                {OBS_STEPS.map((s, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: -8 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14, paddingBottom: i < OBS_STEPS.length - 1 ? 18 : 0, borderBottom: i < OBS_STEPS.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none', marginBottom: i < OBS_STEPS.length - 1 ? 18 : 0 }}>
                      <div style={{ width: 6, height: 6, borderRadius: '50%', flexShrink: 0, marginTop: 5, background: s.type === 'error' ? '#f87171' : s.type === 'success' ? '#4ade80' : `${MC}88` }} />
                      <div>
                        <div style={{ fontSize: 11, fontWeight: 900, letterSpacing: 1.5, color: s.type === 'error' ? '#f87171' : s.type === 'success' ? '#4ade80' : MCA, textTransform: 'uppercase', marginBottom: 3 }}>{s.label}</div>
                        <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)' }}>{s.sub}</div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── SECURITY MODEL ── */}
      <section style={{ position: 'relative', zIndex: 10, padding: '100px 5% 120px', background: 'rgba(255,255,255,0.015)', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ marginBottom: 64 }}>
            <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 3, color: `${MC}77`, textTransform: 'uppercase', marginBottom: 14 }}>Security</div>
            <h2 style={{ fontSize: 'clamp(32px, 5vw, 60px)', fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1.05, marginBottom: 20 }}>Autonomy with boundaries.</h2>
            <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.4)', lineHeight: 1.7, maxWidth: 580 }}>
              Every action passes through a security and policy layer before touching the system. Different actions carry different levels of trust.
            </p>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, marginBottom: 56 }}>
            {TRUST_LEVELS.map((tl, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <div style={{ padding: '32px 28px', borderRadius: 20, border: `1px solid ${tl.color}18`, background: `${tl.color}06`, height: '100%' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24 }}>
                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: tl.color, boxShadow: `0 0 12px ${tl.color}66` }} />
                    <span style={{ fontSize: 12, fontWeight: 900, letterSpacing: 1.5, color: tl.color, textTransform: 'uppercase' }}>{tl.level}</span>
                  </div>
                  {tl.items.map((item, j) => (
                    <div key={j} style={{ fontSize: 14, color: 'rgba(255,255,255,0.55)', marginBottom: 10, paddingLeft: 18, borderLeft: `1px solid ${tl.color}33` }}>{item}</div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, flexWrap: 'wrap' }}>
            {['USER', 'MADHYN', 'SECURITY / POLICY', 'TOOL', 'SYSTEM'].map((node, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ padding: '12px 22px', borderRadius: 12, fontSize: 12, fontWeight: 800, letterSpacing: 1, background: i === 2 ? 'rgba(248,113,113,0.07)' : 'rgba(255,255,255,0.03)', border: `1px solid ${i === 2 ? 'rgba(248,113,113,0.25)' : 'rgba(255,255,255,0.07)'}`, color: i === 2 ? '#f87171' : 'rgba(255,255,255,0.65)' }}>{node}</div>
                {i < 4 && <FiArrowRight size={14} color="rgba(255,255,255,0.18)" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CORE CAPABILITIES ── */}
      <section style={{ position: 'relative', zIndex: 10, padding: '120px 5% 80px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ marginBottom: 64 }}>
            <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 3, color: `${MC}77`, textTransform: 'uppercase', marginBottom: 14 }}>Core capabilities</div>
            <h2 style={{ fontSize: 'clamp(32px, 5vw, 60px)', fontWeight: 900, letterSpacing: '-0.04em' }}>What makes it work.</h2>
          </motion.div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 20 }}>
            {ARCH_FEATURES.map((feat, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: i * 0.07 }}>
                <Card3D orbColor={`${MC}18`} style={{ padding: '36px 30px', height: '100%', display: 'flex', flexDirection: 'column', gap: 20 }}>
                  <div style={{ width: 48, height: 48, borderRadius: 14, background: `${MC}0f`, border: `1px solid ${MC}2a`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: MC }}>{feat.icon}</div>
                  <div>
                    <h3 style={{ fontSize: 18, fontWeight: 800, color: '#fff', marginBottom: 10, lineHeight: 1.3 }}>{feat.title}</h3>
                    <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', lineHeight: 1.7 }}>{feat.desc}</p>
                  </div>
                </Card3D>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CLOSING QUOTE ── */}
      <section style={{ position: 'relative', zIndex: 10, padding: '60px 5% 60px' }}>
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          style={{ maxWidth: 960, margin: '0 auto', padding: '80px 8%', borderRadius: 32, background: 'rgba(255,255,255,0.02)', border: `1px solid ${MC}1e`, textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: -80, left: '50%', transform: 'translateX(-50%)', width: '80%', height: 200, background: `radial-gradient(ellipse, ${MC}18 0%, transparent 70%)`, filter: 'blur(50px)', pointerEvents: 'none' }} />
          <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 3, color: `${MC}66`, textTransform: 'uppercase', marginBottom: 28 }}>In one sentence</div>
          <p style={{ fontSize: 'clamp(20px, 3vw, 30px)', fontWeight: 600, lineHeight: 1.55, color: 'rgba(255,255,255,0.85)', position: 'relative', letterSpacing: '-0.02em' }}>
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
