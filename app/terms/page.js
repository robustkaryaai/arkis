'use client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ChatWidget from '@/components/ChatWidget';
import Link from 'next/link';
import { FiShield, FiLock, FiAlertCircle, FiRepeat, FiCode, FiFileText, FiArrowRight } from 'react-icons/fi';

const sections = [
  {
    icon: <FiShield size={20} />,
    title: '1. Local-First Processing & Privacy Guarantee',
    content: [
      'By using RK AI Desktop and Malus, you acknowledge that all primary processing, document parsing, and inference occurs locally on your hardware. We do not harvest, upload, or monetize your local application data, chat logs, or visual screen data.',
      'Certain account management, billing, and authentication actions (such as logging in via our web portal) require a network connection to our secure servers. These requests are always encrypted with TLS 1.3 and never contain local AI context.',
    ],
  },
  {
    icon: <FiRepeat size={20} />,
    title: '2. Subscription Tiers (Pro & Elite)',
    content: [
      'Access to advanced capabilities — including Autonomous Overlays, Snapvault Orb, and high-parameter on-device routing — requires an active subscription to a Pro or Elite tier.',
      'Subscriptions are billed on a recurring basis. You may cancel at any time, and cancellation takes effect at the end of the current billing period. Partial-month refunds are not provided unless legally mandated in your jurisdiction.',
    ],
  },
  {
    icon: <FiCode size={20} />,
    title: '3. Acceptable Use of Automation',
    content: [
      'RK AI Desktop provides powerful autonomous UI navigation and macro execution capabilities. You agree not to use these features to bypass security controls, commit fraud, engage in denial-of-service attacks, scrape data from services in violation of their terms, or violate the terms of service of third-party software installed on your system.',
      'Any misuse detected may result in immediate suspension of your account without refund.',
    ],
  },
  {
    icon: <FiAlertCircle size={20} />,
    title: '4. Disclaimer of Warranties',
    content: [
      'The software is provided "as is", without warranty of any kind, express or implied. While Malus provides robust heuristics and local sandboxing, no security software can guarantee 100% protection against zero-day threats.',
      'You are solely responsible for maintaining system backups and data integrity on your device. RexyCore shall not be held liable for any data loss, system damage, or business interruption arising from the use of our software.',
    ],
  },
  {
    icon: <FiLock size={20} />,
    title: '5. Intellectual Property',
    content: [
      'All branding, product names, architecture designs, and source code are the exclusive intellectual property of RexyCore. You may not reverse-engineer, decompile, redistribute, or create derivative works based on our software without explicit written permission.',
      'User-generated prompts and macros created through our SDK remain your intellectual property.',
    ],
  },
  {
    icon: <FiFileText size={20} />,
    title: '6. Governing Law & Amendments',
    content: [
      'These terms are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of courts located in India.',
      'We reserve the right to update these terms at any time. Continued use of our products following any changes constitutes your acceptance of the revised terms. We will notify registered users of material changes via email.',
    ],
  },
];

export default function TermsAndConditions() {
  return (
    <div style={{ background: 'var(--void)', color: '#fff', minHeight: '100vh', position: 'relative', overflowX: 'hidden' }}>
      <div className="noise" aria-hidden />
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', background: 'radial-gradient(circle at 15% 20%, rgba(99,102,241,0.1) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(59,130,246,0.08) 0%, transparent 50%)' }} />
      <Navbar />

      <section style={{ padding: '140px 5% 60px', maxWidth: '860px', margin: '0 auto', position: 'relative', zIndex: 10 }}>
        
        {/* Header */}
        <div className="reveal" style={{ marginBottom: '60px' }}>
          <div className="hero-eyebrow" style={{ marginBottom: '24px', color: 'rgba(255,255,255,0.7)', border: '1px solid rgba(255,255,255,0.1)' }}>
            <span className="pulse" style={{ background: 'rgba(99,102,241,0.8)' }} /> Legal Document
          </div>
          <h1 style={{ fontSize: 'clamp(40px, 7vw, 64px)', fontWeight: '900', letterSpacing: '-1.5px', lineHeight: '1.05', marginBottom: '20px' }}>
            Terms &{' '}
            <span className="flow-text flow-text--blue" style={{ display: 'inline-block' }}>Conditions</span>
          </h1>
          <p style={{ fontSize: '17px', color: 'var(--subtext)', lineHeight: '1.7' }}>
            Last Updated: July 2026. Please read these terms carefully before using any product within the RexyCore ecosystem.
          </p>
        </div>

        {/* Nav Pills */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '60px' }}>
          {sections.map((s, i) => (
            <a key={i} href={`#section-${i}`} style={{
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
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          {sections.map((sec, i) => (
            <div key={i} id={`section-${i}`} className="reveal" style={{
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: '20px',
              padding: '36px',
              marginBottom: '16px',
              backdropFilter: 'blur(20px)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '20px' }}>
                <div style={{
                  width: '40px', height: '40px', borderRadius: '10px',
                  background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#818cf8', flexShrink: 0,
                }}>
                  {sec.icon}
                </div>
                <h2 style={{ fontSize: '18px', fontWeight: '800', letterSpacing: '-0.3px' }}>{sec.title}</h2>
              </div>
              {sec.content.map((para, j) => (
                <p key={j} style={{ color: 'var(--subtext)', lineHeight: '1.8', marginBottom: j < sec.content.length - 1 ? '12px' : 0, fontSize: '15px' }}>
                  {para}
                </p>
              ))}
            </div>
          ))}
        </div>

        {/* Footer Links */}
        <div className="reveal" style={{ marginTop: '60px', display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center', justifyContent: 'space-between', padding: '32px 36px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '20px' }}>
          <div>
            <p style={{ fontWeight: '700', marginBottom: '4px' }}>Have questions about these terms?</p>
            <p style={{ color: 'var(--subtext)', fontSize: '14px', margin: 0 }}>Reach out to our legal team at legal@rexycore.ai</p>
          </div>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <Link href="/privacy" className="btn-secondary" style={{ fontSize: '14px', padding: '10px 20px' }}>Privacy Policy</Link>
            <Link href="/contact" className="btn-primary" style={{ fontSize: '14px', padding: '10px 20px' }}>Contact Us <FiArrowRight /></Link>
          </div>
        </div>

      </section>

      <Footer />
      <ChatWidget />
    </div>
  );
}
