'use client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ChatWidget from '@/components/ChatWidget';
import BackButton from '@/components/BackButton';
import Link from 'next/link';
import {
  FiArrowRight, FiShield, FiEye, FiZap, FiActivity, FiCpu,
  FiSearch, FiSliders, FiMic, FiLogIn, FiMonitor, FiDownload,
  FiCheck, FiClock, FiPackage, FiGitBranch, FiMessageSquare
} from 'react-icons/fi';
import { motion } from 'framer-motion';
import { StarField, Card3D, staggerContainer, fadeUp, textVariant } from '@/components/SpaceUI';

const AC = '#10b981';
const ACB = '#34d399';
const s = (c) => ({ display: 'inline-block', padding: '5px 14px', borderRadius: 8, background: 'rgba(16,185,129,0.08)', color: ACB, fontSize: 11, fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 16 });

// ─── DATA ──────────────────────────────────────────────────────────────
const PERCEPTION_FEATURES = [
  'Continuous screen watching every 10 seconds via screenshots + OCR',
  'Active app detection — knows which app is in focus at all times',
  'Window title tracking for deep context',
  'Time-in-app tracking — measures how long you spend in each application',
  'Stuck detection — alerts when you\'ve been in an app without progress too long',
  'Clipboard monitoring — captures clipboard text as context',
  'Self-filtering — never logs or watches itself (Neytreya/Electron windows excluded)',
];

const VISION_FEATURES = [
  'Full screen capture sent to local Qwen3-VL model (never to the cloud)',
  'Context-aware observations generated from what it sees',
  'Error detection — spots error messages, crashes, and warnings in your apps',
  'Auto model selection — picks the best Qwen3-VL tier based on your available RAM',
  'Triggers vision analysis every time you switch to a new app',
];

const RECALL_FEATURES = [
  'Recent Activity tab — last N apps/contexts with timestamps',
  'Yesterday tab — summarizes what you worked on the day before',
  'Projects tab — groups activity by detected project/context',
  'Errors Seen tab — every error and warning Neytreya has detected',
  'Full-text search across all saved observations and memories',
  'Visual Timeline Strip — scrollable row of screenshot thumbnails every minute',
  'Quick Recall Overlay — Option+M (macOS) opens a floating mini-recall instantly',
  'AI Chat — ask Neytreya questions about your past activity in the Recall tab',
];

const SETTINGS_FEATURES = [
  'Watching Toggle — pause/resume all perception with one click',
  'Vision Toggle — enable or disable the vision engine separately',
  'Indexing Toggle — control whether activity is saved to memory',
  'Blocked Apps — comma-separated list of apps to never monitor (e.g. 1Password, Signal)',
  'Launch at Login — set Neytreya to start automatically on system boot',
  'TTS Voice Selection — choose from available Kokoro text-to-speech voices',
  'Audio Recall — transcribe speaker audio in Hindi+English (x64 macOS/Windows only)',
  'Monthly Report — generate a PDF report of recent activity and productivity trends',
];

const ROADMAP_NEAR = [
  { title: 'Continuous Video Mode', desc: 'Stream a compressed screen video buffer to the VL model for richer temporal context instead of per-10s screenshots.' },
  { title: 'Multi-Monitor Support', desc: 'Track and analyze all connected displays, not just the primary screen.' },
  { title: 'Code Error Auto-Fix Suggestions', desc: 'When Neytreya detects a code error on-screen, suggest a fix directly in the bubble.' },
  { title: 'Focus Score', desc: 'A daily score (0–100) measuring how focused you were, based on app usage patterns.' },
  { title: 'Smart End-of-Day Summaries', desc: 'Auto-generated bullet-point summary from the day\'s observations.' },
  { title: 'Semantic Recall', desc: 'Natural language queries like "What was I working on last Thursday around 3pm?".' },
];

const ROADMAP_MID = [
  { title: 'Cloud Sync via RexyCore', desc: 'Sync recall memories and settings across multiple Macs/PCs.' },
  { title: 'Voice Conversations', desc: 'Ask "What was that error I saw earlier?" and get a spoken answer.' },
  { title: 'Notion & GitHub Integration', desc: 'Push daily summaries to Notion, track which repos you\'re working on.' },
  { title: 'Linux Support', desc: 'Extend to Ubuntu/Debian for developers on Linux.' },
];

export default function NeytreyaLearnMore() {
  return (
    <div style={{ background: '#010104', color: '#fff', minHeight: '100vh', overflowX: 'hidden', position: 'relative' }}>
      <StarField />
      <div className="noise" aria-hidden />
      <BackButton href="/products/neytreya" label="Neytreya" />
      <Navbar />

      {/* ── HERO ──────────────────────────────────────── */}
      <section style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', padding: '160px 5% 80px', position: 'relative', zIndex: 10 }}>
        <div style={{ maxWidth: '1100px', width: '100%', margin: '0 auto' }}>
          <motion.div variants={staggerContainer(0.12, 0.1)} initial="hidden" whileInView="show" viewport={{ once: false, amount: 0.15 }}>
            <motion.div variants={fadeUp} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 16px', borderRadius: 99, background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.25)', color: ACB, fontSize: 12, fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 28 }}>
              <motion.span animate={{ opacity: [1, 0.3, 1] }} transition={{ repeat: Infinity, duration: 2 }} style={{ width: 8, height: 8, borderRadius: '50%', background: AC, boxShadow: `0 0 10px ${AC}` }} /> Deep Dive · Beta v1.0
            </motion.div>
            <motion.h1 variants={textVariant(0.1)} style={{ fontSize: 'clamp(44px, 7vw, 84px)', fontWeight: 900, lineHeight: 1.05, letterSpacing: '-0.04em', marginBottom: 28, maxWidth: 900 }}>
              How Neytreya works.<br />
              <span style={{ color: ACB }}>Every system. Explained.</span>
            </motion.h1>
            <motion.p variants={fadeUp} style={{ maxWidth: 620, fontSize: 19, color: 'rgba(255,255,255,0.55)', lineHeight: 1.75, marginBottom: 44 }}>
              A local-first perceptual intelligence desktop watcher. This page explains every engine, every feature, system requirements, and what's coming next.
            </motion.p>
            <motion.div variants={fadeUp} style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              <a href="#perception" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 28px', borderRadius: 99, background: `linear-gradient(90deg, ${AC}, ${ACB}, ${AC})`, color: '#000', fontWeight: 800, fontSize: 15, textDecoration: 'none' }}>
                Explore Features <FiArrowRight />
              </a>
              <Link href="/products/neytreya" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 28px', borderRadius: 99, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontWeight: 700, fontSize: 15, textDecoration: 'none' }}>
                Back to Neytreya
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

{/* ── ANIMATED SHOWCASE ──────────────────── */}
      <section style={{ padding: '40px 0 120px', position: 'relative', zIndex: 10, overflow: 'hidden' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 100 }}>
          
          {/* Group 1: The Command Center */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
            <motion.div initial={{ opacity: 0, y: -20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} style={{ padding: '0 5%', textAlign: 'center', maxWidth: 800, margin: '0 auto' }}>
              <div style={s()}>The Command Center</div>
              <h3 style={{ fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 900, marginBottom: 16 }}>Everything from the menubar.</h3>
              <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.5)', lineHeight: 1.7 }}>
                Instant access to Neytreya. Toggle tracking, view quick insights, configure settings, and access the mini-recall tab without interrupting your workflow.
              </p>
            </motion.div>
            
            <div style={{ display: 'flex', gap: 24, overflowX: 'auto', padding: '10px 5% 40px', scrollSnapType: 'x mandatory', WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              {[
                '/images/neytreya-screens/neytreya-main-panel-floating-one-it-opens-when-i-click-eye-from-menubar.png',
                '/images/neytreya-screens/the-recall-tab-in-panel.png',
                '/images/neytreya-screens/the-settings-tab-in-floating-panel.png',
                '/images/neytreya-screens/settings-scroolled-down.png',
              ].map((src, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ delay: i * 0.1 }} style={{ flexShrink: 0, scrollSnapAlign: 'center' }}>
                  <Card3D style={{ padding: 12, height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }} orbColor="rgba(16,185,129,0.15)">
                    <img src={src} style={{ width: 340, objectFit: 'contain', borderRadius: 8, filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.4))' }} alt="Panel UI" />
                  </Card3D>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Group 2: Context Awareness */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
            <motion.div initial={{ opacity: 0, y: -20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} style={{ padding: '0 5%', textAlign: 'center', maxWidth: 800, margin: '0 auto' }}>
              <div style={s()}>Deep Context Awareness</div>
              <h3 style={{ fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 900, marginBottom: 16 }}>It knows what you are doing.</h3>
              <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.5)', lineHeight: 1.7 }}>
                Whether you're coding, browsing Safari, or messaging on WhatsApp, Neytreya adapts. It even extracts page titles and specific conversational context to build a rich, searchable timeline of your work.
              </p>
            </motion.div>
            
            <div style={{ display: 'flex', gap: 24, overflowX: 'auto', padding: '10px 5% 40px', scrollSnapType: 'x mandatory', WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              {[
                '/images/neytreya-screens/neytreya-while-i-am-coding.png',
                '/images/neytreya-screens/neytreya-shoing-me-when-i-am-using-safari.png',
                '/images/neytreya-screens/neytreya-showing-me-when-i-use-whatsapp.png',
                '/images/neytreya-screens/i-was-browsing-a-page-here-and-neytreya-even-got-the-title-of-page.png',
              ].map((src, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ delay: i * 0.1 }} style={{ flexShrink: 0, scrollSnapAlign: 'center' }}>
                  <Card3D style={{ padding: 16, height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }} orbColor="rgba(16,185,129,0.15)">
                    <img src={src} style={{ width: '85vw', maxWidth: 800, objectFit: 'contain', borderRadius: 12, filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.4))' }} alt="Context tracking" />
                  </Card3D>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Group 3: Recall Window */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
            <motion.div initial={{ opacity: 0, y: -20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} style={{ padding: '0 5%', textAlign: 'center', maxWidth: 800, margin: '0 auto' }}>
              <div style={s()}>Time Travel</div>
              <h3 style={{ fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 900, marginBottom: 16 }}>The Visual Timeline.</h3>
              <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.5)', lineHeight: 1.7 }}>
                Scroll back in time. The main Recall window visually maps out your entire day. Find exactly what you were working on hours or days ago, filter by 'Today' or 'Yesterday', and review your history seamlessly.
              </p>
            </motion.div>
            
            <div style={{ display: 'flex', gap: 24, overflowX: 'auto', padding: '10px 5% 40px', scrollSnapType: 'x mandatory', WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              {[
                '/images/neytreya-screens/neytreya-recall-window-.png',
                '/images/neytreya-screens/visual-timeline-widnow-.png',
                '/images/neytreya-screens/the-today-tab-in-recall-window-.png',
                '/images/neytreya-screens/the-yesterday-tab-in-recall-window.png',
                '/images/neytreya-screens/recall-tab-scrolled-down.png'
              ].map((src, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ delay: i * 0.1 }} style={{ flexShrink: 0, scrollSnapAlign: 'center' }}>
                  <Card3D style={{ padding: 16, height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }} orbColor="rgba(16,185,129,0.25)">
                    <img src={src} style={{ width: '85vw', maxWidth: 900, objectFit: 'contain', borderRadius: 12, filter: 'drop-shadow(0 30px 60px rgba(0,0,0,0.6))' }} alt="Recall Window" />
                  </Card3D>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ── 1. CORE PERCEPTION ENGINE ──────────────── */}
      <section id="perception" style={{ padding: '60px 5% 80px', position: 'relative', zIndex: 10 }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <motion.div variants={staggerContainer(0.1, 0.15)} initial="hidden" whileInView="show" viewport={{ once: false, amount: 0.15 }}>
            <motion.div variants={fadeUp} style={s()}>Core Perception Engine</motion.div>
            <motion.h2 variants={textVariant(0)} style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 900, letterSpacing: '-0.03em', marginBottom: 16 }}>
              It watches so you don't have to.
            </motion.h2>
            <motion.p variants={fadeUp} style={{ fontSize: 17, color: 'rgba(255,255,255,0.5)', maxWidth: 640, lineHeight: 1.75, marginBottom: 40 }}>
              Every 10 seconds, Neytreya captures your screen, extracts text via OCR, identifies your active application and window title, and logs how long you have been there. This forms the foundation for every other feature.
            </motion.p>
            <motion.div variants={staggerContainer(0.05, 0.08)} style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 12 }}>
              {PERCEPTION_FEATURES.map((f) => (
                <motion.div key={f} variants={fadeUp} style={{ display: 'flex', alignItems: 'flex-start', gap: 14, padding: '16px 20px', borderRadius: 14, background: 'rgba(16,185,129,0.04)', border: '1px solid rgba(16,185,129,0.1)' }}>
                  <FiCheck size={16} color={ACB} style={{ marginTop: 2, flexShrink: 0 }} />
                  <span style={{ fontSize: 15, color: 'rgba(255,255,255,0.7)', lineHeight: 1.6 }}>{f}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── 2. VISION ENGINE ──────────────────────── */}
      <section style={{ padding: '60px 5% 80px', position: 'relative', zIndex: 10 }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <motion.div variants={staggerContainer(0.1, 0.15)} initial="hidden" whileInView="show" viewport={{ once: false, amount: 0.15 }}>
            <motion.div variants={fadeUp} style={s()}>Vision Engine · Qwen3-VL</motion.div>
            <motion.h2 variants={textVariant(0)} style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 900, letterSpacing: '-0.03em', marginBottom: 16 }}>
              It understands what's on your screen.
            </motion.h2>
            <motion.p variants={fadeUp} style={{ fontSize: 17, color: 'rgba(255,255,255,0.5)', maxWidth: 640, lineHeight: 1.75, marginBottom: 40 }}>
              Screenshots are sent to a local Qwen3-VL model — never to a remote server. The model reads your screen, understands the context, generates observations, and detects errors. The model tier is automatically chosen based on your available RAM.
            </motion.p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 20, marginBottom: 32 }}>
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false }}>
                <Card3D style={{ padding: '28px 24px', height: '100%' }} orbColor="rgba(16,185,129,0.2)">
                  <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: 2, color: ACB, textTransform: 'uppercase', marginBottom: 16 }}>Vision Model RAM Requirements</div>
                  {[
                    { model: 'qwen3-vl:2b', ram: '1 GB+', size: '~1.6 GB', note: 'Low-end / 4 GB RAM machines' },
                    { model: 'qwen3-vl:4b', ram: '4 GB+', size: '~3.2 GB', note: 'Mid-range machines' },
                    { model: 'qwen3-vl:8b', ram: '8 GB+', size: '~6.1 GB', note: '✅ Recommended (16 GB RAM)' },
                    { model: 'qwen3-vl:30b', ram: '22 GB+', size: '~20 GB', note: 'High-end / M3 Max' },
                  ].map((m) => (
                    <div key={m.model} style={{ display: 'grid', gridTemplateColumns: '1fr 60px 72px', gap: 8, padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,0.05)', alignItems: 'center' }}>
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 700, fontFamily: 'monospace', color: '#fff', marginBottom: 2 }}>{m.model}</div>
                        <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)' }}>{m.note}</div>
                      </div>
                      <div style={{ fontSize: 12, color: ACB, fontWeight: 700 }}>{m.ram}</div>
                      <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>{m.size}</div>
                    </div>
                  ))}
                </Card3D>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false }} transition={{ delay: 0.1 }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {VISION_FEATURES.map((f) => (
                    <div key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: 14, padding: '14px 18px', borderRadius: 14, background: 'rgba(16,185,129,0.04)', border: '1px solid rgba(16,185,129,0.1)' }}>
                      <FiCheck size={15} color={ACB} style={{ marginTop: 2, flexShrink: 0 }} />
                      <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.65)', lineHeight: 1.6 }}>{f}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── 3. RECALL ENGINE ──────────────────────── */}
      <section style={{ padding: '60px 5% 80px', position: 'relative', zIndex: 10 }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <motion.div variants={staggerContainer(0.1, 0.15)} initial="hidden" whileInView="show" viewport={{ once: false, amount: 0.15 }}>
            <motion.div variants={fadeUp} style={s()}>Recall · Memory Engine</motion.div>
            <motion.h2 variants={textVariant(0)} style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 900, letterSpacing: '-0.03em', marginBottom: 16 }}>
              Your entire work history. On your machine.
            </motion.h2>
            <motion.p variants={fadeUp} style={{ fontSize: 17, color: 'rgba(255,255,255,0.5)', maxWidth: 640, lineHeight: 1.75, marginBottom: 40 }}>
              Recall is a dedicated window for browsing everything Neytreya has seen and understood. Full-text search, project groupings, error history, visual timeline, and an AI chat interface — all local, all yours.
            </motion.p>

            {/* Placeholder screenshot for Recall */}
            <motion.div variants={fadeUp} style={{ marginBottom: 32 }}>
              <Card3D style={{ height: 320, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 16 }} orbColor="rgba(16,185,129,0.15)">
                <FiSearch size={36} color="rgba(52,211,153,0.4)" />
                <p style={{ fontSize: 13, fontWeight: 700, color: 'rgba(255,255,255,0.2)', textTransform: 'uppercase', letterSpacing: 2 }}>Recall window — screenshot coming soon</p>
              </Card3D>
            </motion.div>

            <motion.div variants={staggerContainer(0.05, 0.08)} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 12 }}>
              {RECALL_FEATURES.map((f) => (
                <motion.div key={f} variants={fadeUp} style={{ display: 'flex', alignItems: 'flex-start', gap: 14, padding: '14px 18px', borderRadius: 14, background: 'rgba(16,185,129,0.04)', border: '1px solid rgba(16,185,129,0.1)' }}>
                  <FiCheck size={15} color={ACB} style={{ marginTop: 2, flexShrink: 0 }} />
                  <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.65)', lineHeight: 1.6 }}>{f}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── 4. SETTINGS + AUTH ──────────────────── */}
      <section style={{ padding: '60px 5% 80px', position: 'relative', zIndex: 10 }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(480px, 1fr))', gap: 40 }}>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, amount: 0.15 }}>
            <div style={s()}>Settings</div>
            <h2 style={{ fontSize: 'clamp(26px, 3.5vw, 38px)', fontWeight: 900, letterSpacing: '-0.03em', marginBottom: 12 }}>Granular control.</h2>
            <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.45)', lineHeight: 1.75, marginBottom: 28 }}>
              Toggle each subsystem independently. Block apps that should never be monitored. Nothing runs silently without your knowledge.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {SETTINGS_FEATURES.map((f) => (
                <div key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: '12px 16px', borderRadius: 12, background: 'rgba(16,185,129,0.04)', border: '1px solid rgba(16,185,129,0.1)' }}>
                  <FiCheck size={14} color={ACB} style={{ marginTop: 2, flexShrink: 0 }} />
                  <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', lineHeight: 1.6 }}>{f}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, amount: 0.15 }} transition={{ delay: 0.1 }}>
            <div style={s()}>Auth &amp; Identity</div>
            <h2 style={{ fontSize: 'clamp(26px, 3.5vw, 38px)', fontWeight: 900, letterSpacing: '-0.03em', marginBottom: 12 }}>No account required.</h2>
            <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.45)', lineHeight: 1.75, marginBottom: 28 }}>
              Neytreya works completely offline without any account. Google OAuth is available for optional RexyCore sync features — but the core product never needs it.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                { icon: <FiLogIn size={18} />, title: 'Google OAuth Login', desc: 'Secure sign-in via Google (opens browser, deep-links back via neytreya://). Optional.' },
                { icon: <FiShield size={18} />, title: 'Offline Mode', desc: 'Use Neytreya without any account for fully private operation. All features still work.' },
                { icon: <FiCheck size={18} />, title: 'Persistent Login', desc: 'Login state survives restarts and is never overwritten by background processes.' },
              ].map((item) => (
                <Card3D key={item.title} style={{ padding: '20px 22px', display: 'flex', gap: 16, alignItems: 'flex-start' }} orbColor="rgba(16,185,129,0.2)">
                  <div style={{ width: 38, height: 38, borderRadius: 10, background: 'rgba(16,185,129,0.1)', color: ACB, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{item.icon}</div>
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 800, marginBottom: 4 }}>{item.title}</div>
                    <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', lineHeight: 1.6 }}>{item.desc}</div>
                  </div>
                </Card3D>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── SYSTEM REQUIREMENTS ─────────────────── */}
      <section style={{ padding: '60px 5% 80px', position: 'relative', zIndex: 10 }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <motion.div variants={staggerContainer(0.1, 0.15)} initial="hidden" whileInView="show" viewport={{ once: false, amount: 0.15 }}>
            <motion.div variants={fadeUp} style={s()}>System Requirements</motion.div>
            <motion.h2 variants={textVariant(0)} style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 900, letterSpacing: '-0.03em', marginBottom: 16 }}>
              What you need.
            </motion.h2>
            <motion.p variants={fadeUp} style={{ fontSize: 17, color: 'rgba(255,255,255,0.5)', maxWidth: 640, lineHeight: 1.75, marginBottom: 40 }}>
              Neytreya runs in text-only mode from 4 GB RAM. The Vision Engine (Qwen3-VL) requires Ollama and at least 8 GB for the recommended experience.
            </motion.p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(440px, 1fr))', gap: 24 }}>
              {/* Minimum */}
              <motion.div variants={fadeUp}>
                <Card3D style={{ padding: '32px' }} orbColor="rgba(16,185,129,0.15)">
                  <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 2, color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', marginBottom: 20 }}>Minimum · Text-only mode</div>
                  {[
                    ['OS', 'macOS 12 Ventura+ or Windows 10/11'],
                    ['CPU', 'Intel i5 8th gen / Ryzen 5 / Apple M1 / Snapdragon X'],
                    ['RAM', '4 GB (Vision Engine disabled at this tier)'],
                    ['Storage', '2 GB free disk space'],
                    ['Display', '1280×720 or higher'],
                  ].map(([k, v]) => (
                    <div key={k} style={{ display: 'grid', gridTemplateColumns: '100px 1fr', gap: 12, padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                      <span style={{ fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase' }}>{k}</span>
                      <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.7)' }}>{v}</span>
                    </div>
                  ))}
                </Card3D>
              </motion.div>

              {/* Recommended */}
              <motion.div variants={fadeUp}>
                <Card3D style={{ padding: '32px', border: `1px solid ${AC}30` }} orbColor="rgba(16,185,129,0.3)">
                  <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 2, color: ACB, textTransform: 'uppercase', marginBottom: 20 }}>✅ Recommended · Full Vision Engine</div>
                  {[
                    ['OS', 'macOS 14 Sonoma+ (Apple Silicon) or Windows 11 64-bit'],
                    ['CPU', 'Apple M2 / Intel i7 12th gen / AMD Ryzen 7'],
                    ['RAM', '8 GB+ (16 GB for best vision model)'],
                    ['Storage', '25 GB free (Ollama + model weights ~20 GB)'],
                    ['GPU', 'Apple Unified Memory or NVIDIA/AMD with 4 GB+ VRAM'],
                    ['Ollama', 'Installed and running locally'],
                  ].map(([k, v]) => (
                    <div key={k} style={{ display: 'grid', gridTemplateColumns: '100px 1fr', gap: 12, padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                      <span style={{ fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase' }}>{k}</span>
                      <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.7)' }}>{v}</span>
                    </div>
                  ))}
                </Card3D>
              </motion.div>
            </div>

            {/* Platform Notes */}
            <motion.div variants={staggerContainer(0.06, 0.08)} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16, marginTop: 24 }}>
              {[
                { platform: 'macOS Apple Silicon', notes: ['Native arm64 binary', 'Unified Memory → significantly faster inference', 'Screen recording permission prompted on first launch', 'Tesseract OCR auto-installed via Homebrew'] },
                { platform: 'macOS Intel', notes: ['All features work; vision inference is slower', 'Native Intel binaries — Rosetta 2 not needed'] },
                { platform: 'Windows 10/11 x64', notes: ['Full feature support', 'Tesseract must be installed manually (UB-Mannheim)', 'Ollama for Windows available at ollama.com'] },
                { platform: 'Windows 11 ARM64', notes: ['Native ARM64 build supported', 'Audio Recall (faster-whisper) not available on ARM64', 'All other features work normally'] },
              ].map((p) => (
                <motion.div key={p.platform} variants={fadeUp}>
                  <Card3D style={{ padding: '24px 20px', height: '100%' }} orbColor="rgba(16,185,129,0.15)">
                    <div style={{ fontSize: 14, fontWeight: 800, marginBottom: 14, color: '#fff' }}>{p.platform}</div>
                    <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
                      {p.notes.map((n) => (
                        <li key={n} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                          <FiCheck size={13} color={ACB} style={{ marginTop: 2, flexShrink: 0 }} />
                          <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', lineHeight: 1.5 }}>{n}</span>
                        </li>
                      ))}
                    </ul>
                  </Card3D>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── ROADMAP ─────────────────────────────── */}
      <section style={{ padding: '60px 5% 80px', position: 'relative', zIndex: 10 }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <motion.div variants={staggerContainer(0.1, 0.15)} initial="hidden" whileInView="show" viewport={{ once: false, amount: 0.15 }}>
            <motion.div variants={fadeUp} style={s()}>Roadmap</motion.div>
            <motion.h2 variants={textVariant(0)} style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 900, letterSpacing: '-0.03em', marginBottom: 16 }}>
              What's coming next.
            </motion.h2>
            <motion.p variants={fadeUp} style={{ fontSize: 17, color: 'rgba(255,255,255,0.5)', maxWidth: 640, lineHeight: 1.75, marginBottom: 48 }}>
              Beta v1.0 is the foundation. Here is what's planned for the next versions.
            </motion.p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(460px, 1fr))', gap: 40 }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24 }}>
                  <FiClock size={16} color={ACB} />
                  <span style={{ fontSize: 13, fontWeight: 800, color: ACB, textTransform: 'uppercase', letterSpacing: 2 }}>Near-Term · v1.1 – v1.5</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  {ROADMAP_NEAR.map((item) => (
                    <div key={item.title} style={{ display: 'flex', gap: 14, padding: '16px 18px', borderRadius: 14, background: 'rgba(16,185,129,0.04)', border: '1px solid rgba(16,185,129,0.1)' }}>
                      <FiGitBranch size={16} color="rgba(52,211,153,0.5)" style={{ marginTop: 2, flexShrink: 0 }} />
                      <div>
                        <div style={{ fontSize: 14, fontWeight: 800, marginBottom: 4 }}>{item.title}</div>
                        <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', lineHeight: 1.6 }}>{item.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24 }}>
                  <FiPackage size={16} color="rgba(165,180,252,0.7)" />
                  <span style={{ fontSize: 13, fontWeight: 800, color: 'rgba(165,180,252,0.7)', textTransform: 'uppercase', letterSpacing: 2 }}>Mid-Term · v1.5 – v2.0</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  {ROADMAP_MID.map((item) => (
                    <div key={item.title} style={{ display: 'flex', gap: 14, padding: '16px 18px', borderRadius: 14, background: 'rgba(165,180,252,0.04)', border: '1px solid rgba(165,180,252,0.1)' }}>
                      <FiGitBranch size={16} color="rgba(165,180,252,0.4)" style={{ marginTop: 2, flexShrink: 0 }} />
                      <div>
                        <div style={{ fontSize: 14, fontWeight: 800, marginBottom: 4 }}>{item.title}</div>
                        <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', lineHeight: 1.6 }}>{item.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────── */}
      <section style={{ padding: '60px 5% 120px', position: 'relative', zIndex: 10 }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, amount: 0.2 }}>
            <Card3D style={{ padding: '64px 48px', display: 'flex', flexWrap: 'wrap', gap: 32, alignItems: 'center', justifyContent: 'space-between' }} orbColor="rgba(16,185,129,0.3)">
              <div style={{ flex: '1 1 320px' }}>
                <h2 style={{ fontSize: 'clamp(24px, 3.5vw, 38px)', fontWeight: 900, letterSpacing: '-0.03em', marginBottom: 12 }}>Start watching your machine.</h2>
                <p style={{ color: 'rgba(255,255,255,0.5)', lineHeight: 1.75, margin: 0, fontSize: 16 }}>
                  Beta v1.0 is ready for macOS and Windows. Setup takes a few minutes.
                </p>
              </div>
              <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
                <Link href="/products/neytreya#download" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '16px 32px', borderRadius: 99, background: `linear-gradient(90deg, ${AC}, ${ACB}, ${AC})`, color: '#000', fontWeight: 800, fontSize: 15, textDecoration: 'none' }}>
                  <FiDownload size={16} /> Download Neytreya
                </Link>
                <Link href="/products/neytreya" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '16px 32px', borderRadius: 99, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontWeight: 700, fontSize: 15, textDecoration: 'none' }}>
                  Back to Product
                </Link>
              </div>
            </Card3D>
          </motion.div>
        </div>
      </section>

      <Footer />
      <ChatWidget />
    </div>
  );
}
