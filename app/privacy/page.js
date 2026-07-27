'use client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ChatWidget from '@/components/ChatWidget';
import Link from 'next/link';
import { FiDatabase, FiLock, FiEye, FiShare2, FiSliders, FiMail, FiArrowRight, FiShield } from 'react-icons/fi';

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
      'We share data with third parties only when strictly necessary to deliver our service: our payment processor (Stripe) for billing, our email provider for transactional emails, and our cloud hosting provider for account infrastructure. All third parties are bound by strict data processing agreements.',
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
      'You have the right to opt out of all non-essential communications. You may unsubscribe from marketing emails at any time via the unsubscribe link included in every email.',
    ],
  },
  {
    icon: <FiShield size={20} />,
    title: '6. Local Data & On-Device AI',
    content: [
      'All AI inference performed by RK AI Desktop, Malus, and Snapvault Orb occurs entirely on your device. Your prompts, documents, screen captures, and voice recordings are processed exclusively in your local memory and are never transmitted to RexyCore servers.',
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
    <div style={{ background: 'var(--void)', color: '#fff', minHeight: '100vh', position: 'relative', overflowX: 'hidden' }}>
      <div className="noise" aria-hidden />
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', background: 'radial-gradient(circle at 10% 20%, rgba(14,165,233,0.08) 0%, transparent 50%), radial-gradient(circle at 85% 75%, rgba(99,102,241,0.08) 0%, transparent 50%)' }} />
      <Navbar />

      <section style={{ padding: '140px 5% 60px', maxWidth: '860px', margin: '0 auto', position: 'relative', zIndex: 10 }}>

        {/* Header */}
        <div className="reveal" style={{ marginBottom: '60px' }}>
          <div className="hero-eyebrow" style={{ marginBottom: '24px', color: 'rgba(255,255,255,0.7)', border: '1px solid rgba(255,255,255,0.1)' }}>
            <span className="pulse" style={{ background: 'rgba(14,165,233,0.8)' }} /> Legal Document
          </div>
          <h1 style={{ fontSize: 'clamp(40px, 7vw, 64px)', fontWeight: '900', letterSpacing: '-1.5px', lineHeight: '1.05', marginBottom: '20px' }}>
            Privacy{' '}
            <span className="flow-text flow-text--cyan" style={{ display: 'inline-block' }}>Policy</span>
          </h1>
          <p style={{ fontSize: '17px', color: 'var(--subtext)', lineHeight: '1.7' }}>
            Last Updated: July 2026. We believe your data belongs to you. This policy explains exactly what we collect, why, and how we protect it.
          </p>
        </div>

        {/* Core Commitment Banner */}
        <div className="reveal" style={{ marginBottom: '48px', padding: '28px 32px', borderRadius: '20px', background: 'rgba(14,165,233,0.06)', border: '1px solid rgba(14,165,233,0.2)', display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
          <div style={{ flexShrink: 0, width: '44px', height: '44px', borderRadius: '12px', background: 'rgba(14,165,233,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#38bdf8', border: '1px solid rgba(14,165,233,0.25)' }}>
            <FiLock size={20} />
          </div>
          <div>
            <p style={{ fontWeight: '800', fontSize: '16px', marginBottom: '6px' }}>Our Core Commitment</p>
            <p style={{ color: 'var(--subtext)', fontSize: '15px', lineHeight: '1.7', margin: 0 }}>
              Your local AI sessions, documents, screen data, and voice recordings <strong style={{ color: '#fff' }}>never leave your device</strong>. We built RK AI Desktop so that's technically impossible, not just a policy promise.
            </p>
          </div>
        </div>

        {/* Nav Pills */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '48px' }}>
          {sections.map((s, i) => (
            <a key={i} href={`#priv-${i}`} style={{
              padding: '6px 16px', borderRadius: '99px', fontSize: '12px', fontWeight: '700',
              background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
              color: 'rgba(255,255,255,0.5)', textDecoration: 'none', letterSpacing: '0.3px',
              transition: 'all 0.2s',
            }}>
              §{i + 1} {s.title.replace(`${i + 1}. `, '')}
            </a>
          ))}
        </div>

        {/* Sections */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {sections.map((sec, i) => (
            <div key={i} id={`priv-${i}`} className="reveal" style={{
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: '20px',
              padding: '36px',
              backdropFilter: 'blur(20px)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '20px' }}>
                <div style={{
                  width: '40px', height: '40px', borderRadius: '10px',
                  background: 'rgba(14,165,233,0.1)', border: '1px solid rgba(14,165,233,0.2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#38bdf8', flexShrink: 0,
                }}>
                  {sec.icon}
                </div>
                <h2 style={{ fontSize: '18px', fontWeight: '800', letterSpacing: '-0.3px' }}>{sec.title}</h2>
              </div>
              {sec.content.map((para, j) => (
                <p key={j} style={{ color: 'var(--subtext)', lineHeight: '1.8', marginBottom: j < sec.content.length - 1 ? '14px' : 0, fontSize: '15px' }}>
                  {para}
                </p>
              ))}
            </div>
          ))}
        </div>

        {/* Footer Links */}
        <div className="reveal" style={{ marginTop: '60px', display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center', justifyContent: 'space-between', padding: '32px 36px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '20px' }}>
          <div>
            <p style={{ fontWeight: '700', marginBottom: '4px' }}>Questions about your privacy?</p>
            <p style={{ color: 'var(--subtext)', fontSize: '14px', margin: 0 }}>Email our Data Protection Officer at legal@rexycore.ai</p>
          </div>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <Link href="/terms" className="btn-secondary" style={{ fontSize: '14px', padding: '10px 20px' }}>Terms & Conditions</Link>
            <Link href="/contact" className="btn-primary" style={{ fontSize: '14px', padding: '10px 20px' }}>Contact Us <FiArrowRight /></Link>
          </div>
        </div>

      </section>

      <Footer />
      <ChatWidget />
    </div>
  );
}
