'use client';
import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ChatWidget from '@/components/ChatWidget';
import BackButton from '@/components/BackButton';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiDownload, FiEye, FiActivity, FiCpu, FiSearch,
  FiSliders, FiShield, FiMonitor, FiZap, FiArrowRight,
  FiX, FiExternalLink, FiAlertTriangle, FiCheckCircle,
  FiBox, FiTerminal, FiPackage, FiFileText
} from 'react-icons/fi';
import Link from 'next/link';
import { StarField, Card3D, staggerContainer, fadeUp, textVariant, FlowText } from '@/components/SpaceUI';

const AC = '#10b981';
const ACB = '#34d399';

/* ─── DOWNLOAD URLS ─────────────────────────────────── */
const DOWNLOADS = {
  mac:     'https://github.com/robustkaryaai/neytreya_download/releases/download/v1.0.0/Neytreya-1.0.0-beta-arm64.dmg',
  win:     'https://github.com/robustkaryaai/neytreya_download/releases/download/v1.0.0/Neytreya-1.0.0-Setup.exe',
};

const PREREQS = [
  {
    name: 'Ollama',
    desc: 'Local vision model runner.',
    required: true,
    href: 'https://ollama.com/download',
    color: '#a5b4fc',
    icon: <FiBox size={20} />,
  },
  {
    name: 'Python 3.10+',
    desc: 'Core perception & OCR engine.',
    required: true,
    href: 'https://www.python.org/downloads/',
    color: '#fcd34d',
    icon: <FiTerminal size={20} />,
  },
  {
    name: 'Node.js 18+',
    desc: 'Desktop app shell environment.',
    required: true,
    href: 'https://nodejs.org/',
    color: '#6ee7b7',
    icon: <FiPackage size={20} />,
  },
  {
    name: 'Tesseract OCR',
    desc: 'Reads text from screenshots.',
    required: false,
    href: 'https://github.com/UB-Mannheim/tesseract/wiki',
    color: '#7dd3fc',
    icon: <FiFileText size={20} />,
    note: 'macOS: auto-installed',
  },
];

/* ─── PREREQUISITE MODAL ─────────────────────────────── */
function PrereqModal({ onClose, onProceed, platform, downloadUrl }) {
  const [checked, setChecked] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 999999,
        background: 'rgba(0,0,0,0.90)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
        display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
        padding: '24px',
        overflowY: 'auto',
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
        style={{
          background: 'rgba(10, 12, 15, 0.98)',
          backdropFilter: 'blur(40px)', WebkitBackdropFilter: 'blur(40px)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 24,
          maxWidth: 520,
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto',
          boxShadow: '0 40px 100px rgba(0,0,0,0.95), inset 0 1px 0 rgba(255,255,255,0.1)',
          padding: '32px',
          position: 'relative',
        }}
      >
        {/* Close */}
        <button
          onClick={onClose}
          style={{ position: 'absolute', top: 16, right: 16, background: 'transparent', border: 'none', width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'rgba(255,255,255,0.4)', transition: 'color 0.2s' }}
          onMouseEnter={(e) => e.currentTarget.style.color = '#fff'}
          onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.4)'}
        >
          <FiX size={20} />
        </button>

        {/* Warning header */}
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'rgba(251,191,36,0.1)', border: '1px solid rgba(251,191,36,0.2)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
            <FiAlertTriangle size={20} color="#fbbf24" />
          </div>
          <h2 style={{ fontSize: 24, fontWeight: 800, letterSpacing: '-0.02em', margin: '0 0 8px 0', color: '#fff' }}>Install Prerequisites</h2>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', lineHeight: 1.6, margin: 0, padding: '0 20px' }}>
            Neytreya requires these tools to be installed <strong style={{ color: '#fff' }}>before</strong> setup. The vision engine will not run without them.
          </p>
        </div>

        {/* Prereq items - Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 28 }}>
          {PREREQS.map((p) => (
            <div
              key={p.name}
              style={{
                display: 'flex', flexDirection: 'column', gap: 8, padding: '16px',
                borderRadius: 16, background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.05)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ color: p.color }}>{p.icon}</div>
                {p.required && <span style={{ fontSize: 9, fontWeight: 800, letterSpacing: 1, color: '#fbbf24', textTransform: 'uppercase' }}>Required</span>}
              </div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: '#fff', marginBottom: 2 }}>{p.name}</div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', lineHeight: 1.4, marginBottom: 12, minHeight: 34 }}>{p.desc}</div>
                <a
                  href={p.href} target="_blank" rel="noopener noreferrer"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 11, fontWeight: 700, color: p.color, textDecoration: 'none' }}
                >
                  Download <FiExternalLink size={10} />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* macOS unsigned app warning */}
        {platform.toLowerCase().includes('mac') && (
          <div style={{
            marginBottom: 20,
            padding: '16px 18px',
            borderRadius: 14,
            background: 'rgba(251,146,60,0.06)',
            border: '1px solid rgba(251,146,60,0.35)',
          }}>
            <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
              <div style={{ flexShrink: 0, marginTop: 1 }}>
                <FiAlertTriangle size={16} color="#fb923c" />
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#fb923c', marginBottom: 6 }}>
                  macOS Gatekeeper Notice
                </div>
                <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)', lineHeight: 1.65, margin: '0 0 10px' }}>
                  We don&apos;t have a paid Apple developer license yet — we&apos;re still expanding. If macOS says it can&apos;t open Neytreya, here&apos;s how to allow it:
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {[
                    { step: '1', text: 'Open System Settings' },
                    { step: '2', text: 'Go to Privacy & Security' },
                    { step: '3', text: 'Scroll down to the Security section' },
                    { step: '4', text: "You'll see a message about Neytreya — click Open Anyway" },
                  ].map(({ step, text }) => (
                    <div key={step} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{
                        flexShrink: 0,
                        width: 22, height: 22,
                        borderRadius: '50%',
                        background: 'rgba(251,146,60,0.15)',
                        border: '1px solid rgba(251,146,60,0.3)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 10, fontWeight: 800, color: '#fb923c',
                      }}>{step}</div>
                      <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', lineHeight: 1.5 }}>{text}</span>
                    </div>
                  ))}
                </div>
                <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', margin: '12px 0 0', lineHeight: 1.5 }}>
                  macOS only shows this once — after you click Open Anyway, Neytreya will launch normally every time.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Windows SmartScreen warning */}
        {platform.toLowerCase().includes('win') && (
          <div style={{
            marginBottom: 20,
            padding: '16px 18px',
            borderRadius: 14,
            background: 'rgba(251,146,60,0.06)',
            border: '1px solid rgba(251,146,60,0.35)',
          }}>
            <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
              <div style={{ flexShrink: 0, marginTop: 1 }}>
                <FiAlertTriangle size={16} color="#fb923c" />
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#fb923c', marginBottom: 6 }}>
                  Windows SmartScreen Notice
                </div>
                <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)', lineHeight: 1.65, margin: 0 }}>
                  We don&apos;t have a paid software license yet — we&apos;re still expanding. If Windows shows a warning, don&apos;t worry — the app is <strong style={{ color: '#fff' }}>completely safe to use.</strong> Click &ldquo;More info&rdquo; then &ldquo;Run anyway&rdquo; to proceed.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Confirm checkbox */}
        <label style={{ display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer', marginBottom: 24, padding: '14px 16px', borderRadius: 12, background: checked ? 'rgba(16,185,129,0.08)' : 'rgba(255,255,255,0.02)', border: `1px solid ${checked ? 'rgba(16,185,129,0.3)' : 'rgba(255,255,255,0.05)'}`, transition: 'all 0.2s' }}>
          <div
            onClick={() => setChecked(!checked)}
            style={{
              width: 20, height: 20, borderRadius: 6, flexShrink: 0,
              border: `2px solid ${checked ? AC : 'rgba(255,255,255,0.2)'}`,
              background: checked ? AC : 'transparent',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'all 0.2s',
            }}
          >
            {checked && <FiCheckCircle size={12} color="#000" strokeWidth={4} />}
          </div>
          <span style={{ fontSize: 13, color: checked ? '#fff' : 'rgba(255,255,255,0.5)', fontWeight: checked ? 600 : 400, userSelect: 'none', transition: 'color 0.2s' }}>
            I have installed the required tools.
          </span>
        </label>

        {/* Download button */}
        <a
          href={checked ? downloadUrl : '#'}
          download
          onClick={(e) => {
            if (!checked) {
              e.preventDefault();
            } else {
              // Delay unmounting so the browser doesn't abort the download
              setTimeout(onClose, 2000);
            }
          }}
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            width: '100%', padding: '14px 20px', borderRadius: 12,
            background: checked ? '#fff' : 'rgba(255,255,255,0.05)',
            color: checked ? '#000' : 'rgba(255,255,255,0.2)',
            fontWeight: 700, fontSize: 15, textDecoration: 'none',
            transition: 'all 0.2s', cursor: checked ? 'pointer' : 'not-allowed',
          }}
        >
          <FiDownload size={16} />
          {checked ? `Download for ${platform}` : 'Confirm above to download'}
        </a>
      </motion.div>
    </motion.div>
  );
}

/* ─── DOWNLOAD BUTTON ────────────────────────────────── */
function DownloadBtn({ label, platform, downloadUrl, primary = false, onClick }) {
  return (
      <motion.button
        whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
        onClick={onClick}
        style={{
          padding: '16px 32px', fontSize: 16, borderRadius: 99,
          display: 'inline-flex', alignItems: 'center', gap: 10,
          fontWeight: 800, cursor: 'pointer', border: 'none', fontFamily: 'inherit',
          background: primary ? '#fff' : 'rgba(255,255,255,0.07)',
          color: primary ? '#000' : '#fff',
          boxShadow: primary ? '0 0 30px rgba(255,255,255,0.1)' : 'none',
          ...(primary ? {} : { border: '1px solid rgba(255,255,255,0.1)' }),
        }}
      >
        <FiDownload size={18} /> {label}
      </motion.button>
  );
}

/* ─── FEATURE PILLARS ────────────────────────────────── */
const PILLARS = [
  { icon: <FiEye size={22} />,      title: 'Core Perception Engine',  desc: 'Continuously monitors your active window every 10 seconds using screenshots and OCR. Tracks active apps, window titles, and how long you spend in each. Detects when you\'re stuck without progress.', tag: 'Always watching' },
  { icon: <FiCpu size={22} />,      title: 'Vision Engine',           desc: 'Full screen capture sent to a local Qwen3-VL model. Generates context-aware observations, spots errors and crashes, and automatically selects the best model tier (2B / 4B / 8B / 30B) based on your available RAM.', tag: '100% local inference' },
  { icon: <FiSearch size={22} />,   title: 'Recall Memory Engine',    desc: 'A dedicated window for browsing your entire activity history. Recent activity, yesterday\'s work, project groupings, errors seen, and full-text search across all observations. Accessible with Option+M.', tag: 'Your memory, on-device' },
  { icon: <FiActivity size={22} />, title: 'System Resource Monitor', desc: 'Live CPU, RAM, and battery tracking with color-coded load tiers (LOW / MEDIUM / HIGH). Timestamped event log of threshold crossings. Detects problems before they happen.', tag: 'One step ahead' },
  { icon: <FiSliders size={22} />,  title: 'Granular Settings',       desc: 'Toggle watching, vision, and indexing independently. Block specific apps from ever being monitored (1Password, Signal, etc.). Choose your TTS voice, set quiet hours, and configure launch at login.', tag: 'You control what it sees' },
  { icon: <FiShield size={22} />,   title: 'Private by Architecture', desc: 'All processing happens on your device. No data leaves your machine. Offline mode works without any account. Settings and memory live in ~/.neytreya/ and never leave.', tag: '100% local' },
];

const COMPAT = [
  { platform: 'macOS', detail: 'Apple Silicon (M1–M4)', status: 'available', color: '#10b981' },
  { platform: 'Windows 10/11', detail: 'Intel / AMD / ARM64', status: 'available', color: '#10b981' },
  { platform: 'Linux', detail: 'Ubuntu / Debian', status: 'coming soon', color: 'rgba(255,255,255,0.25)' },
];

export default function NeytreyaPage() {
  const [modalData, setModalData] = useState(null);
  const [detectedOs, setDetectedOs] = useState('mac');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const ua = window.navigator.userAgent.toLowerCase();
      if (ua.includes('win')) setDetectedOs('win');
      else if (ua.includes('linux')) setDetectedOs('linux');
      else setDetectedOs('mac');
    }
  }, []);

  return (
    <div style={{ minHeight: '100vh', background: '#010104', color: '#fff', position: 'relative' }}>
      <StarField />
      <div className="noise" aria-hidden />
      <BackButton />
      <Navbar />

      {/* ── HERO ──────────────────────────── */}
      <section style={{ position: 'relative', zIndex: 10, minHeight: '90vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '140px 24px 80px' }}>
        <motion.div variants={staggerContainer(0.12, 0.1)} initial="hidden" whileInView="show" viewport={{ once: false, amount: 0.15 }}>
          <motion.div variants={fadeUp} style={{ background: 'rgba(16,185,129,0.12)', border: '1px solid rgba(16,185,129,0.3)', color: ACB, margin: '0 auto 24px', display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 16px', borderRadius: 99, fontSize: 12, fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase' }}>
            <motion.span animate={{ opacity: [1, 0.3, 1] }} transition={{ repeat: Infinity, duration: 2 }} style={{ width: 8, height: 8, borderRadius: '50%', background: AC, boxShadow: `0 0 10px ${AC}` }} />
            Perceptual Intelligence · Beta v1.0
          </motion.div>

          <motion.h1 variants={textVariant(0.1)} style={{ fontSize: 'clamp(52px, 8.5vw, 130px)', fontWeight: 900, letterSpacing: '-0.05em', lineHeight: 0.95, marginBottom: 28 }}>
            Meet <FlowText gradient="linear-gradient(90deg, #10b981, #059669, #10b981)">Neytreya</FlowText>
          </motion.h1>

          <motion.p variants={fadeUp} style={{ fontSize: 'clamp(18px, 2.2vw, 24px)', fontWeight: 700, color: 'rgba(255,255,255,0.7)', maxWidth: 720, lineHeight: 1.5, margin: '0 auto 20px' }}>
            A local-first perceptual intelligence desktop watcher.
          </motion.p>
          <motion.p variants={fadeUp} style={{ fontSize: 'clamp(15px, 1.8vw, 18px)', color: 'rgba(255,255,255,0.45)', maxWidth: 620, lineHeight: 1.75, margin: '0 auto 52px' }}>
            Neytreya watches your screen every 10 seconds, understands what you are working on using a local vision model, tracks your system resources, and remembers everything—entirely on your device. No cloud. No accounts required.
          </motion.p>

          <motion.div variants={fadeUp} style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            {detectedOs === 'win' ? (
              <DownloadBtn label="Download for Windows" platform="Windows" downloadUrl={DOWNLOADS.win} primary onClick={() => setModalData({ platform: 'Windows', url: DOWNLOADS.win })} />
            ) : (
              <DownloadBtn label="Download for macOS" platform="macOS (Apple Silicon)" downloadUrl={DOWNLOADS.mac} primary onClick={() => setModalData({ platform: 'macOS (Apple Silicon)', url: DOWNLOADS.mac })} />
            )}
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
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
            <motion.h2 variants={textVariant(0)} style={{ fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 900, letterSpacing: '-0.03em', marginBottom: 20 }}>A watcher. Not an assistant.</motion.h2>
            <motion.p variants={fadeUp} style={{ fontSize: 17, color: 'rgba(255,255,255,0.5)', maxWidth: 680, lineHeight: 1.75 }}>
              Neytreya runs in the macOS menubar or Windows system tray. It captures your screen every 10 seconds, extracts text with OCR, sends the image to a local Qwen3-VL vision model, and generates observations about what it sees. It does not wait for you to ask. It is always building context.
            </motion.p>
          </motion.div>

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
            <motion.h2 variants={textVariant(0)} style={{ fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 900, letterSpacing: '-0.03em', marginBottom: 48 }}>What it actually does.</motion.h2>
            <motion.div variants={staggerContainer(0.06, 0.08)} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(310px, 1fr))', gap: 20 }}>
              {PILLARS.map((p) => (
                <motion.div key={p.title} variants={fadeUp}>
                  <Card3D style={{ padding: '32px 28px', height: '100%', display: 'flex', flexDirection: 'column' }} orbColor="rgba(16,185,129,0.25)">
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '4px 12px', borderRadius: 99, background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)', color: ACB, fontSize: 10, fontWeight: 800, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 20, width: 'fit-content' }}>{p.tag}</div>
                    <div style={{ width: 44, height: 44, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, marginBottom: 18, background: 'rgba(16,185,129,0.12)', color: ACB }}>{p.icon}</div>
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
            <motion.h2 variants={textVariant(0)} style={{ fontSize: 'clamp(28px, 3.5vw, 44px)', fontWeight: 900, letterSpacing: '-0.03em', marginBottom: 40 }}>Where it runs.</motion.h2>
            <motion.div variants={staggerContainer(0.08, 0.1)} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
              {COMPAT.map((c) => (
                <motion.div key={c.platform} variants={fadeUp}>
                  <Card3D style={{ padding: '28px 24px' }} orbColor="rgba(16,185,129,0.2)">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                      <FiMonitor size={22} color={c.color} />
                      <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: 1.5, textTransform: 'uppercase', color: c.color, padding: '3px 10px', borderRadius: 99, border: `1px solid ${c.color}40`, background: `${c.color}12` }}>{c.status}</span>
                    </div>
                    <div style={{ fontSize: 17, fontWeight: 800, marginBottom: 6 }}>{c.platform}</div>
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
              <Card3D style={{ padding: '64px 40px', textAlign: 'center' }} orbColor="rgba(16,185,129,0.15)">
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '5px 14px', borderRadius: 8, background: 'rgba(16,185,129,0.08)', color: ACB, fontSize: 11, fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 24 }}>Beta v1.0 — Now available</div>
                <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 900, letterSpacing: '-0.04em', marginBottom: 16 }}>Start watching your machine.</h2>
                <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 16, maxWidth: 520, margin: '0 auto 48px', lineHeight: 1.75 }}>
                  Choose your platform below. A quick setup checklist will appear to make sure everything is ready before the file downloads.
                </p>

                {/* Download grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 14, maxWidth: 460, margin: '0 auto 32px' }}>
                  <DownloadBtn label="macOS (Apple Silicon)" platform="macOS (Apple Silicon)" downloadUrl={DOWNLOADS.mac} primary onClick={() => setModalData({ platform: 'macOS (Apple Silicon)', url: DOWNLOADS.mac })} />
                  <DownloadBtn label="Windows" platform="Windows" downloadUrl={DOWNLOADS.win} onClick={() => setModalData({ platform: 'Windows', url: DOWNLOADS.win })} />
                </div>

                <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.2)' }}>Requires macOS 12+ or Windows 10/11 · 4 GB RAM minimum · Ollama required for Vision Engine</p>
              </Card3D>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />
      <ChatWidget />

      {/* MODAL MOUNTED AT ROOT LEVEL TO PREVENT CLIPPING */}
      <AnimatePresence>
        {modalData && (
          <PrereqModal
            onClose={() => setModalData(null)}
            platform={modalData.platform}
            downloadUrl={modalData.url}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
