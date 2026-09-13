'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiArrowRight, FiDatabase, FiBox, FiGitBranch, FiCpu, FiMonitor } from 'react-icons/fi';
import Navbar from '@/components/Navbar';
import ChatWidget from '@/components/ChatWidget';
import Footer from '@/components/Footer';
import BackButton from '@/components/BackButton';
import { StarField, Card3D, staggerContainer, textVariant, fadeUp, SectionHeader, FlowText } from '@/components/SpaceUI';

// Silver / Graphite Theme
const MC = '#94a3b8'; // Slate 400
const MCA = '#cbd5e1'; // Slate 300
const BG = '#010104';

const ARCH_FEATURES = [
  {
    icon: <FiDatabase size={32} />,
    title: 'Project Memory & Understanding',
    desc: 'MADHYN builds a living context of your project. It understands folder structures, existing architecture, dependencies, and important design decisions. This prevents the AI from repeatedly rediscovering the same information, making it more contextually useful over time.'
  },
  {
    icon: <FiCpu size={32} />,
    title: 'Model Freedom',
    desc: 'The product is the orchestration, environment, tools, and security — not the underlying LLM. MADHYN treats the AI model as an interchangeable engine. Switch between local models for privacy, coding-focused models for complex logic, or fast models for quick tasks.'
  },
  {
    icon: <FiBox size={32} />,
    title: 'Extensible Tool System',
    desc: 'An extensible plugin architecture allows MADHYN to interact with the real world. Capabilities include secure file operations, terminal execution, web research, documentation search, testing frameworks, and custom internal plugins.'
  },
  {
    icon: <FiGitBranch size={32} />,
    title: 'Repository Awareness',
    desc: 'MADHYN understands repositories as actual development environments. It natively works with local folders, Git branches, diffs, and project history, allowing you to ask it to "fix the auth flow in this branch" without needing to paste a single line of code.'
  }
];

export default function MadhynLearnMore() {
  return (
    <div style={{ minHeight: '100vh', background: BG, color: '#fff', position: 'relative', overflow: 'hidden' }}>
      <StarField density="low" />
      
      {/* Background glow */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '60vh', background: 'radial-gradient(ellipse at 50% 0%, rgba(148,163,184,0.08) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 0 }} />

      <Navbar />
      <div style={{ position: 'fixed', top: 90, left: '5%', zIndex: 50 }}><BackButton /></div>

      {/* ── HERO ── */}
      <section style={{ position: 'relative', zIndex: 10, padding: '160px 5% 80px', textAlign: 'center' }}>
        <motion.div variants={staggerContainer(0.1, 0.2)} initial="hidden" animate="show" style={{ maxWidth: 860, margin: '0 auto' }}>
          <motion.div variants={fadeUp(0.05)} style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '8px 24px', borderRadius: 99, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', marginBottom: 24 }}>
            <FiMonitor color={MC} />
            <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: 1, color: '#fff', textTransform: 'uppercase' }}>Technical Deep Dive</span>
          </motion.div>
          
          <motion.h1 variants={textVariant(0.1)} style={{ fontSize: 'clamp(36px, 5vw, 64px)', fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1.1, marginBottom: 24 }}>
            Engineering + Intelligence + <FlowText gradient={`linear-gradient(90deg, ${MC}, ${MCA})`}>Control.</FlowText>
          </motion.h1>
          
          <motion.p variants={fadeUp(0.2)} style={{ fontSize: 20, color: 'rgba(255,255,255,0.5)', lineHeight: 1.6, maxWidth: 680, margin: '0 auto' }}>
            A closer look at the architecture that makes autonomous development possible without sacrificing developer control.
          </motion.p>
        </motion.div>
      </section>

      {/* ── ARCHITECTURE FEATURES ── */}
      <section style={{ position: 'relative', zIndex: 10, padding: '80px 5% 120px' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 40 }}>
          {ARCH_FEATURES.map((feat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Card3D orbColor={`${MC}22`} style={{ padding: '40px 48px', display: 'flex', gap: 32, alignItems: 'flex-start' }}>
                <div style={{ width: 64, height: 64, borderRadius: 16, background: 'rgba(148,163,184,0.05)', border: `1px solid ${MC}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: MC, flexShrink: 0 }}>
                  {feat.icon}
                </div>
                <div>
                  <h3 style={{ fontSize: 24, fontWeight: 800, marginBottom: 12, color: '#fff' }}>{feat.title}</h3>
                  <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.6)', lineHeight: 1.7 }}>{feat.desc}</p>
                </div>
              </Card3D>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ position: 'relative', zIndex: 10, padding: '0 5% 140px', textAlign: 'center' }}>
        <Link href="/products" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '16px 36px', borderRadius: 99, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontWeight: 700, fontSize: 16, textDecoration: 'none' }}>
          Back to Products <FiArrowRight />
        </Link>
      </section>

      <Footer />
      <ChatWidget />
    </div>
  );
}
