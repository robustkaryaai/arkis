'use client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ChatWidget from '@/components/ChatWidget';
import Link from 'next/link';
import { FiDatabase, FiLock, FiEye, FiShare2, FiSliders, FiMail, FiArrowRight, FiShield } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { StarField, Card3D, staggerContainer, textVariant, fadeUp } from '@/components/SpaceUI';

const VP = { once: false, amount: 0.1 };

const COLORS = ['#7dd3fc', '#a5b4fc', '#6ee7b7', '#fcd34d', '#f9a8d4', '#38bdf8', '#a78bfa'];

const sections = [
  {
    icon: <FiDatabase size={20} />,
    title: '1. What Data We Collect',
    content: [
      'Account Data: When you register, we collect your email address, chosen username, and encrypted password hash. Payment details are handled entirely by our third-party payment processor (Stripe) and are never stored on our servers.',
      'Usage Analytics: We collect aggregate, anonymized usage statistics — such as which features are used most often — to improve our products. This data is never linked to your personal identity.',
      'We never collect the content of your local AI sessions, your documents, your screen captures, or your voice recordings. All of that stays on your device.',
    ],
  },
  {
    icon: <FiEye size={20} />,
    title: '2. How We Use Your Data',
    content: [
      'Account data is used exclusively for authentication, billing communications, product update notifications, and customer support.',
      'Anonymized usage data is used internally to guide feature prioritization and improve system performance. It is never sold to third parties.',
    ],
  },
  {
    icon: <FiShare2 size={20} />,
    title: '3. Data Sharing & Third Parties',
    content: [
      'We do not sell your personal data. Period.',
      'We share data with third parties only when strictly necessary: our payment processor (Stripe) for billing, our email provider for transactional emails, and our cloud hosting provider for account infrastructure. All third parties are bound by strict data processing agreements.',
    ],
  },
  {
    icon: <FiLock size={20} />,
    title: '4. Data Security',
    content: [
      'All data transmitted to and from our servers is encrypted using TLS 1.3. Account passwords are hashed using bcrypt with a per-user salt and are never stored in plaintext.',
      'We perform regular security audits and penetration testing. In the event of a data breach, we will notify all affected users within 72 hours as required by applicable law.',
    ],
  },
  {
    icon: <FiSliders size={20} />,
    title: '5. Your Rights & Controls',
    content: [
      'You have the right to access, correct, or delete your personal data at any time from your account settings. You may also request a full export of your data by contacting legal@rexycore.ai.',
      'You have the right to opt out of all non-essential communications at any time.',
    ],
  },
  {
    icon: <FiShield size={20} />,
    title: '6. Local Data & On-Device AI',
    content: [
      'All AI inference performed by RK AI Desktop, Malus, and Snapvault Orb occurs entirely on your device. Your prompts, documents, screen captures, and voice recordings are processed exclusively in your local memory and are never transmitted to Rexycore servers.',
      'This architecture is a core design principle, not a policy — it is technically impossible for us to access your local AI data because it is never sent to us.',
    ],
  },
  {
    icon: <FiMail size={20} />,
    title: '7. Contact & Policy Updates',
    content: [
      'For any privacy-related inquiries, please contact our Data Protection Officer at: legal@rexycore.ai.',
      'We may update this policy to reflect changes in law or our practices. We will notify you of material changes via email at least 14 days before they take effect.',
    ],
  },
];

export default function PrivacyPolicy() {
  return (
    <div style={{ background: '#010104', color: '#fff', minHeight: '100vh', position: 'relative', overflowX: 'hidden' }}>
      <StarField />
      <div className="noise" aria-hidden />
      <Navbar />

      <section style={{ padding: '140px 5% 60px', maxWidth: '900px', margin: '0 auto', position: 'relative', zIndex: 10 }}>

        {/* Header */}
        <motion.div variants={staggerContainer(0.1, 0.1)} initial="hidden" whileInView="show" viewport={VP} style={{ marginBottom: '60px' }}>
          <motion.div variants={fadeUp} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 18px', borderRadius: 99, border: '1px solid rgba(14,165,233,0.25)', background: 'rgba(14,165,233,0.07)', marginBottom: 28 }}>
            <motion.span animate={{ opacity: [1, 0.3, 1] }} transition={{ repeat: Infinity, duration: 2 }} style={{ width: 6, height: 6, borderRadius: '50%', background: '#38bdf8', boxShadow: '0 0 8px #38bdf8' }} />
            <span style={{ fontSize: 12, fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase', color: '#38bdf8' }}>Legal Document</span>
          </motion.div>
          <motion.h1 variants={textVariant(0)} style={{ fontSize: 'clamp(40px, 7vw, 72px)', fontWeight: 900, letterSpacing: '-2px', lineHeight: 1.0, marginBottom: 20 }}>
            Privacy{' '}
            <span style={{ background: 'linear-gradient(135deg, #38bdf8, #7dd3fc)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Policy</span>
          </motion.h1>
          <motion.p variants={fadeUp} style={{ fontSize: 17, color: 'rgba(255,255,255,0.45)', lineHeight: 1.7 }}>
            Last Updated: July 2026. We believe your data belongs to you. This policy explains exactly what we collect, why, and how we protect it.
          </motion.p>
        </motion.div>

        {/* Core Commitment Banner */}
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={VP} transition={{ duration: 0.6 }}>
          <Card3D orbColor="rgba(14,165,233,0.2)" style={{ marginBottom: 48 }}>
            <div style={{ padding: '28px 32px', display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
              <div style={{ flexShrink: 0, width: '44px', height: '44px', borderRadius: '12px', background: 'rgba(14,165,233,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#38bdf8', border: '1px solid rgba(14,165,233,0.3)' }}>
                <FiLock size={20} />
              </div>
              <div>
                <p style={{ fontWeight: '800', fontSize: '16px', marginBottom: '6px' }}>Our Core Commitment</p>
                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '15px', lineHeight: '1.7', margin: 0 }}>
                  Your local AI sessions, documents, screen data, and voice recordings <strong style={{ color: '#7dd3fc' }}>never leave your device</strong>. We built RK AI Desktop so that's technically impossible, not just a policy promise.
                </p>
              </div>
            </div>
          </Card3D>
        </motion.div>

        {/* Nav Pills */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={VP} transition={{ duration: 0.5 }}
          style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '48px' }}>
          {sections.map((s, i) => (
            <a key={i} href={`#priv-${i}`} style={{
              padding: '6px 16px', borderRadius: '99px', fontSize: '12px', fontWeight: '700',
              background: `${COLORS[i % COLORS.length]}10`, border: `1px solid ${COLORS[i % COLORS.length]}25`,
              color: COLORS[i % COLORS.length], textDecoration: 'none', letterSpacing: '0.3px',
            }}>
              §{i + 1} {s.title.replace(`${i + 1}. `, '')}
            </a>
          ))}
        </motion.div>

        {/* Sections */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {sections.map((sec, i) => (
            <motion.div key={i} id={`priv-${i}`}
              initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={VP} transition={{ duration: 0.6, delay: 0.04, ease: [0.16, 1, 0.3, 1] }}>
              <Card3D orbColor={`${COLORS[i % COLORS.length]}18`}>
                <div style={{ padding: '36px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '20px' }}>
                    <div style={{
                      width: '40px', height: '40px', borderRadius: '10px',
                      background: `${COLORS[i % COLORS.length]}12`, border: `1px solid ${COLORS[i % COLORS.length]}30`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center', color: COLORS[i % COLORS.length], flexShrink: 0,
                    }}>
                      {sec.icon}
                    </div>
                    <h2 style={{ fontSize: '18px', fontWeight: '800', letterSpacing: '-0.3px' }}>{sec.title}</h2>
                  </div>
                  {sec.content.map((para, j) => (
                    <p key={j} style={{ color: 'rgba(255,255,255,0.45)', lineHeight: '1.8', marginBottom: j < sec.content.length - 1 ? '14px' : 0, fontSize: '15px' }}>
                      {para}
                    </p>
                  ))}
                </div>
              </Card3D>
            </motion.div>
          ))}
        </div>

        {/* Footer CTA */}
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={VP} transition={{ duration: 0.6 }} style={{ marginTop: '60px' }}>
          <Card3D orbColor="rgba(56,189,248,0.15)">
            <div style={{ padding: '32px 36px', display: 'flex', flexWrap: 'wrap', gap: '20px', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <p style={{ fontWeight: '700', marginBottom: '4px', fontSize: 16 }}>Questions about your privacy?</p>
                <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '14px', margin: 0 }}>Email our Data Protection Officer at legal@rexycore.ai</p>
              </div>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <Link href="/terms" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '10px 20px', borderRadius: 99, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontWeight: 700, fontSize: 14, textDecoration: 'none' }}>Terms &amp; Conditions</Link>
                <Link href="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '10px 20px', borderRadius: 99, background: '#fff', color: '#000', fontWeight: 800, fontSize: 14, textDecoration: 'none' }}>Contact Us <FiArrowRight size={14} /></Link>
              </div>
            </div>
          </Card3D>
        </motion.div>
      </section>

      <Footer />
      <ChatWidget />
    </div>
  );
}
