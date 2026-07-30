'use client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ChatWidget from '@/components/ChatWidget';
import Link from 'next/link';
import { FiShield, FiLock, FiAlertCircle, FiRepeat, FiCode, FiFileText, FiArrowRight } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { StarField, Card3D, staggerContainer, textVariant, fadeUp } from '@/components/SpaceUI';

const VP = { once: false, amount: 0.1 };

const sections = [
  {
    icon: <FiShield size={20} />, color: '#a5b4fc',
    title: '1. Local-First Processing & Privacy',
    content: [
      'RexyCore products prefer local processing whenever practical. Some requests may use cloud services when they need online capabilities, real-time information, cloud-only AI, or more computing power than local hardware can reasonably provide.',
      'Cloud services are never used silently. When information is sent to a cloud service, the user is kept informed and must give permission.',
    ],
  },
  {
    icon: <FiRepeat size={20} />, color: '#7dd3fc',
    title: '2. Product access',
    content: [
      'Product access, availability, and any pricing are described on the relevant published product page. Do not rely on unannounced product capabilities or release dates.',
      'Where a subscription is offered, the applicable terms are presented before purchase.',
    ],
  },
  {
    icon: <FiCode size={20} />, color: '#6ee7b7',
    title: '3. Acceptable use',
    content: [
      'You may not use RexyCore products to bypass security controls, commit fraud, engage in denial-of-service attacks, or scrape data from services in violation of their terms.',
      'Any misuse detected may result in immediate suspension of your account without refund.',
    ],
  },
  {
    icon: <FiAlertCircle size={20} />, color: '#fcd34d',
    title: '4. Disclaimer of Warranties',
    content: [
      'The software is provided "as is", without warranty of any kind. No software can guarantee protection against every security threat or error.',
      'You are solely responsible for maintaining system backups and data integrity. RexyCore shall not be held liable for any data loss, system damage, or business interruption.',
    ],
  },
  {
    icon: <FiLock size={20} />, color: '#f9a8d4',
    title: '5. Intellectual Property',
    content: [
      'All branding, product names, architecture designs, and source code are the exclusive intellectual property of RexyCore. You may not reverse-engineer, decompile, redistribute, or create derivative works without explicit written permission.',
      'User-generated content remains your intellectual property.',
    ],
  },
  {
    icon: <FiFileText size={20} />, color: '#a78bfa',
    title: '6. Governing Law & Amendments',
    content: [
      'These terms are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of courts located in India.',
      'We reserve the right to update these terms at any time. Continued use of our products following any changes constitutes your acceptance of the revised terms.',
    ],
  },
];

export default function TermsAndConditions() {
  return (
    <div style={{ background: '#010104', color: '#fff', minHeight: '100vh', position: 'relative', overflowX: 'hidden' }}>
      <StarField />
      <div className="noise" aria-hidden />
      <Navbar />

      <section style={{ padding: '140px 5% 60px', maxWidth: '900px', margin: '0 auto', position: 'relative', zIndex: 10 }}>

        {/* Header */}
        <motion.div variants={staggerContainer(0.1, 0.1)} initial="hidden" whileInView="show" viewport={VP} style={{ marginBottom: '60px' }}>
          <motion.div variants={fadeUp} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 18px', borderRadius: 99, border: '1px solid rgba(165,180,252,0.2)', background: 'rgba(165,180,252,0.05)', marginBottom: 28 }}>
            <motion.span animate={{ opacity: [1, 0.3, 1] }} transition={{ repeat: Infinity, duration: 2 }} style={{ width: 6, height: 6, borderRadius: '50%', background: '#a5b4fc', boxShadow: '0 0 8px #a5b4fc' }} />
            <span style={{ fontSize: 12, fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase', color: '#a5b4fc' }}>Legal Document</span>
          </motion.div>
          <motion.h1 variants={textVariant(0)} style={{ fontSize: 'clamp(40px, 7vw, 72px)', fontWeight: 900, letterSpacing: '-2px', lineHeight: 1.0, marginBottom: 20 }}>
            Terms &amp;{' '}
            <span style={{ background: 'linear-gradient(90deg, #a5b4fc, #818cf8, #a5b4fc)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Conditions</span>
          </motion.h1>
          <motion.p variants={fadeUp} style={{ fontSize: 17, color: 'rgba(255,255,255,0.45)', lineHeight: 1.7 }}>
            Last Updated: July 2026. Please read these terms carefully before using any product within the Rexycore ecosystem.
          </motion.p>
        </motion.div>

        {/* Nav Pills */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={VP} transition={{ duration: 0.5 }}
          style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '60px' }}>
          {sections.map((s, i) => (
            <a key={i} href={`#section-${i}`} style={{
              padding: '6px 16px', borderRadius: '99px', fontSize: '12px', fontWeight: '700',
              background: `${s.color}10`, border: `1px solid ${s.color}25`,
              color: s.color, textDecoration: 'none', letterSpacing: '0.3px',
              transition: 'all 0.2s',
            }}>
              §{i + 1} {s.title.replace(`${i + 1}. `, '')}
            </a>
          ))}
        </motion.div>

        {/* Sections */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {sections.map((sec, i) => (
            <motion.div key={i} id={`section-${i}`}
              initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={VP} transition={{ duration: 0.6, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}>
              <Card3D orbColor={`${sec.color}20`}>
                <div style={{ padding: '36px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '20px' }}>
                    <div style={{
                      width: '40px', height: '40px', borderRadius: '10px',
                      background: `${sec.color}12`, border: `1px solid ${sec.color}30`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center', color: sec.color, flexShrink: 0,
                    }}>
                      {sec.icon}
                    </div>
                    <h2 style={{ fontSize: '18px', fontWeight: '800', letterSpacing: '-0.3px' }}>{sec.title}</h2>
                  </div>
                  {sec.content.map((para, j) => (
                    <p key={j} style={{ color: 'rgba(255,255,255,0.45)', lineHeight: '1.8', marginBottom: j < sec.content.length - 1 ? '12px' : 0, fontSize: '15px' }}>
                      {para}
                    </p>
                  ))}
                </div>
              </Card3D>
            </motion.div>
          ))}
        </div>

        {/* Footer CTA */}
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={VP} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginTop: '60px' }}>
          <Card3D orbColor="rgba(165,180,252,0.15)">
            <div style={{ padding: '32px 36px', display: 'flex', flexWrap: 'wrap', gap: '20px', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <p style={{ fontWeight: '700', marginBottom: '4px', fontSize: 16 }}>Have questions about these terms?</p>
                <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '14px', margin: 0 }}>Reach out to our legal team at legal@rexycore.ai</p>
              </div>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <Link href="/privacy" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '10px 20px', borderRadius: 99, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontWeight: 700, fontSize: 14, textDecoration: 'none' }}>Privacy Policy</Link>
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
