'use client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ChatWidget from '@/components/ChatWidget';
import BackButton from '@/components/BackButton';
import { motion } from 'framer-motion';
import {
  FiDownload, FiEye, FiActivity, FiCpu, FiSearch,
  FiSliders, FiShield, FiMonitor, FiZap, FiArrowRight
} from 'react-icons/fi';
import Link from 'next/link';
import { StarField, Card3D, staggerContainer, fadeUp, textVariant, FlowText } from '@/components/SpaceUI';

const AC = '#10b981';
const ACB = '#34d399';

const PILLARS = [
  {
    icon: <FiEye size={22} />,
    title: 'Core Perception Engine',
    desc: 'Continuously monitors your active window every 10 seconds using screenshots and OCR. Tracks active apps, window titles, and how long you spend in each. Detects when you\'re stuck without progress.',
    tag: 'Always watching',
  },
  {
    icon: <FiCpu size={22} />,
    title: 'Vision Engine',
    desc: 'Full screen capture sent to a local Qwen3-VL model. Generates context-aware observations, spots errors and crashes, and automatically selects the best model tier (2B / 4B / 8B / 30B) based on your available RAM.',
    tag: '100% local inference',
  },
  {
    icon: <FiSearch size={22} />,
    title: 'Recall Memory Engine',
    desc: 'A dedicated window for browsing your entire activity history. Recent activity, yesterday\'s work, project groupings, errors seen, and full-text search across all observations. Accessible with Option+M.',
    tag: 'Your memory, on-device',
  },
  {
    icon: <FiActivity size={22} />,
    title: 'System Resource Monitor',
    desc: 'Live CPU, RAM, and battery tracking with color-coded load tiers (LOW / MEDIUM / HIGH). Timestamped event log of threshold crossings. Detects problems before they happen.',
    tag: 'One step ahead',
  },
  {
    icon: <FiSliders size={22} />,
    title: 'Granular Settings',
    desc: 'Toggle watching, vision, and indexing independently. Block specific apps from ever being monitored (1Password, Signal, etc.). Choose your TTS voice, set quiet hours, and configure launch at login.',
    tag: 'You control what it sees',
  },
  {
    icon: <FiShield size={22} />,
    title: 'Private by Architecture',
    desc: 'All processing happens on your device. No data leaves your machine. Offline mode works without any account. Settings and memory live in ~/.neytreya/ and never leave.',
    tag: '100% local',
  },
];

const COMPAT = [
  { platform: 'macOS', detail: 'Apple Silicon (M1–M4) · Intel', status: 'available', color: '#10b981' },
  { platform: 'Windows 10/11', detail: '64-bit x64 · ARM64 (Snapdragon X)', status: 'available', color: '#10b981' },
  { platform: 'Linux', detail: 'Ubuntu / Debian', status: 'coming soon', color: 'rgba(255,255,255,0.25)' },
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
        minHeight: '90vh', display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        textAlign: 'center', padding: '140px 24px 80px',
      }}>
        <motion.div variants={staggerContainer(0.12, 0.1)} initial="hidden" whileInView="show" viewport={{ once: false, amount: 0.15 }}>
          <motion.div
            variants={fadeUp}
            style={{ background: 'rgba(16,185,129,0.12)', border: '1px solid rgba(16,185,129,0.3)', color: ACB, margin: '0 auto 24px', display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 16px', borderRadius: 99, fontSize: 12, fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase' }}
          >
            <motion.span animate={{ opacity: [1, 0.3, 1] }} transition={{ repeat: Infinity, duration: 2 }} style={{ width: 8, height: 8, borderRadius: '50%', background: AC, boxShadow: `0 0 10px ${AC}` }} />
            Perceptual Intelligence · Beta v1.0
          </motion.div>

          <motion.h1
            variants={textVariant(0.1)}
            style={{ fontSize: 'clamp(52px, 8.5vw, 130px)', fontWeight: 900, letterSpacing: '-0.05em', lineHeight: 0.95, marginBottom: 28 }}
          >
            Meet <FlowText gradient="linear-gradient(90deg, #10b981, #059669, #10b981)">Neytreya</FlowText>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            style={{ fontSize: 'clamp(18px, 2.2vw, 24px)', fontWeight: 700, color: 'rgba(255,255,255,0.7)', maxWidth: 720, lineHeight: 1.5, margin: '0 auto 20px' }}
          >
            A local-first perceptual intelligence desktop watcher.
          </motion.p>

          <motion.p
            variants={fadeUp}
            style={{ fontSize: 'clamp(15px, 1.8vw, 18px)', color: 'rgba(255,255,255,0.45)', maxWidth: 620, lineHeight: 1.75, margin: '0 auto 52px' }}
          >
            Neytreya watches your screen every 10 seconds, understands what you are working on using a local vision model, tracks your system resources, and remembers everything—entirely on your device. No cloud. No accounts required.
          </motion.p>

          <motion.div variants={fadeUp} style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <motion.a
              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              href="#download"
              style={{ background: '#fff', color: '#000', padding: '16px 32px', fontSize: 16, borderRadius: 99, display: 'inline-flex', alignItems: 'center', gap: 8, fontWeight: 800, textDecoration: 'none' }}
            >
              <FiDownload /> Download Beta v1.0
            </motion.a>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href="/products/neytreya/learn-more" style={{ padding: '16px 32px', fontSize: 16, borderRadius: 99, border: '1px solid rgba(255,255,255,0.12)', background: 'rgba(255,255,255,0.04)', color: '#fff', fontWeight: 700, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                Deep dive <FiArrowRight size={14} />
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      <hr className="divider" />

      {/* ── WHAT IT IS ─────────────────────── */}
      <section style={{ padding: '80px 5% 40px', position: 'relative', zIndex: 10 }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <motion.div variants={staggerContainer(0.1, 0.1)} initial="hidden" whileInView="show" viewport={{ once: false, amount: 0.15 }} style={{ marginBottom: 16 }}>
            <motion.p variants={fadeUp} style={{ fontSize: 11, fontWeight: 800, letterSpacing: 2, color: ACB, textTransform: 'uppercase', marginBottom: 16, display: 'inline-block', padding: '5px 14px', borderRadius: 8, background: 'rgba(16,185,129,0.08)' }}>What Neytreya is</motion.p>
            <motion.h2 variants={textVariant(0)} style={{ fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 900, letterSpacing: '-0.03em', marginBottom: 20 }}>
              A watcher. Not an assistant.
            </motion.h2>
            <motion.p variants={fadeUp} style={{ fontSize: 17, color: 'rgba(255,255,255,0.5)', maxWidth: 680, lineHeight: 1.75 }}>
              Neytreya runs in the macOS menubar or Windows system tray. It captures your screen every 10 seconds, extracts text with OCR, sends the image to a local Qwen3-VL vision model, and generates observations about what it sees. It does not wait for you to ask. It is always building context.
            </motion.p>
          </motion.div>

          {/* What it is NOT */}
          <motion.div variants={staggerContainer(0.07, 0.1)} initial="hidden" whileInView="show" viewport={{ once: false, amount: 0.1 }} style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 32 }}>
            {['Not a chatbot', 'Not a coding assistant', 'Not an automation engine', 'Not a computer controller', 'Not cloud-dependent'].map(label => (
              <motion.div key={label} variants={fadeUp} style={{ padding: '8px 18px', borderRadius: 99, border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.03)', fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.4)' }}>
                {label}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── SIX PILLARS ─────────────────────── */}
      <section style={{ padding: '60px 5% 80px', position: 'relative', zIndex: 10 }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <motion.div variants={staggerContainer(0.1, 0.2)} initial="hidden" whileInView="show" viewport={{ once: false, amount: 0.15 }}>
            <motion.p variants={fadeUp} style={{ fontSize: 11, fontWeight: 800, letterSpacing: 2, color: ACB, textTransform: 'uppercase', marginBottom: 16, display: 'inline-block', padding: '5px 14px', borderRadius: 8, background: 'rgba(16,185,129,0.08)' }}>Feature set · Beta v1.0</motion.p>
            <motion.h2 variants={textVariant(0)} style={{ fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 900, letterSpacing: '-0.03em', marginBottom: 48 }}>
              What it actually does.
            </motion.h2>

            <motion.div variants={staggerContainer(0.06, 0.08)} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(310px, 1fr))', gap: 20 }}>
              {PILLARS.map((p) => (
                <motion.div key={p.title} variants={fadeUp}>
                  <Card3D style={{ padding: '32px 28px', height: '100%', display: 'flex', flexDirection: 'column', gap: 0 }} orbColor="rgba(16,185,129,0.25)">
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '4px 12px', borderRadius: 99, background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)', color: ACB, fontSize: 10, fontWeight: 800, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 20, width: 'fit-content' }}>
                      {p.tag}
                    </div>
                    <div style={{ width: 44, height: 44, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, marginBottom: 18, background: 'rgba(16,185,129,0.12)', color: ACB }}>
                      {p.icon}
                    </div>
                    <h3 style={{ fontSize: 19, fontWeight: 800, marginBottom: 10 }}>{p.title}</h3>
                    <p style={{ color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, fontSize: 14, margin: 0 }}>{p.desc}</p>
                  </Card3D>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── PLATFORM COMPATIBILITY ───────────── */}
      <section style={{ padding: '60px 5%', position: 'relative', zIndex: 10 }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <motion.div variants={staggerContainer(0.1, 0.15)} initial="hidden" whileInView="show" viewport={{ once: false, amount: 0.15 }}>
            <motion.p variants={fadeUp} style={{ fontSize: 11, fontWeight: 800, letterSpacing: 2, color: ACB, textTransform: 'uppercase', marginBottom: 16, display: 'inline-block', padding: '5px 14px', borderRadius: 8, background: 'rgba(16,185,129,0.08)' }}>Platform support</motion.p>
            <motion.h2 variants={textVariant(0)} style={{ fontSize: 'clamp(28px, 3.5vw, 44px)', fontWeight: 900, letterSpacing: '-0.03em', marginBottom: 40 }}>
              Where it runs.
            </motion.h2>
            <motion.div variants={staggerContainer(0.08, 0.1)} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16 }}>
              {COMPAT.map((c) => (
                <motion.div key={c.platform} variants={fadeUp}>
                  <Card3D style={{ padding: '28px 24px' }} orbColor="rgba(16,185,129,0.2)">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                      <FiMonitor size={22} color={c.color} />
                      <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: 1.5, textTransform: 'uppercase', color: c.color, padding: '3px 10px', borderRadius: 99, border: `1px solid ${c.color}40`, background: `${c.color}12` }}>{c.status}</span>
                    </div>
                    <div style={{ fontSize: 18, fontWeight: 800, marginBottom: 6 }}>{c.platform}</div>
                    <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', lineHeight: 1.5 }}>{c.detail}</div>
                  </Card3D>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── DOWNLOAD ─────────────────── */}
      <section id="download" style={{ padding: '80px 5% 120px', position: 'relative', zIndex: 10 }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <motion.div variants={staggerContainer(0.1, 0.2)} initial="hidden" whileInView="show" viewport={{ once: false, amount: 0.15 }}>
            <motion.div variants={fadeUp}>
              <Card3D style={{ padding: '80px 40px', textAlign: 'center' }} orbColor="rgba(16,185,129,0.15)">
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '5px 14px', borderRadius: 8, background: 'rgba(16,185,129,0.08)', color: ACB, fontSize: 11, fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 24 }}>Beta v1.0</div>
                <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 900, letterSpacing: '-0.04em', marginBottom: 16 }}>Start watching your machine.</h2>
                <p style={{ color: 'rgba(255,255,255,0.45)', marginBottom: 48, fontSize: 16, maxWidth: 520, margin: '0 auto 48px', lineHeight: 1.75 }}>
                  Neytreya is available on macOS and Windows. Requires Ollama and Tesseract for the vision engine. Setup walks you through everything step by step.
                </p>
                <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
                  <motion.a whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} href="#" style={{ background: '#fff', color: '#000', padding: '16px 32px', fontSize: 16, borderRadius: 99, display: 'inline-flex', alignItems: 'center', gap: 10, textDecoration: 'none', fontWeight: 800 }}>
                    <FiDownload size={18} /> Download for macOS
                  </motion.a>
                  <motion.a whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} href="#" style={{ background: 'rgba(255,255,255,0.07)', color: '#fff', padding: '16px 32px', fontSize: 16, borderRadius: 99, display: 'inline-flex', alignItems: 'center', gap: 10, textDecoration: 'none', fontWeight: 700, border: '1px solid rgba(255,255,255,0.1)' }}>
                    <FiDownload size={18} /> Download for Windows
                  </motion.a>
                </div>
                <p style={{ marginTop: 28, fontSize: 12, color: 'rgba(255,255,255,0.25)' }}>Requires macOS 12 Ventura+ or Windows 10/11 · 4 GB RAM minimum</p>
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
