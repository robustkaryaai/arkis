'use client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ChatWidget from '@/components/ChatWidget';

export default function TermsAndConditions() {
  return (
    <div style={{ background: 'var(--bg)', color: 'var(--text)', minHeight: '100vh', overflowX: 'hidden' }}>
      <Navbar />

      <section style={{ padding: '140px 5% 80px', maxWidth: '800px', margin: '0 auto' }}>
        <h1 className="reveal" style={{ fontSize: 'clamp(40px, 8vw, 64px)', fontWeight: '900', marginBottom: '24px', letterSpacing: '-1px' }}>
          Terms & <span className="grad">Conditions</span>
        </h1>
        <p className="reveal reveal-delay-1" style={{ fontSize: '18px', color: 'var(--muted)', marginBottom: '60px' }}>
          Last Updated: July 2026. Please read these terms carefully before using the RexyCore ecosystem.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '40px', background: 'var(--surface)', padding: '40px', borderRadius: '24px', border: '1px solid var(--border)' }}>
            
            <div className="reveal reveal-delay-2">
                <h2 style={{ fontSize: '24px', fontWeight: '800', marginBottom: '16px' }}>1. Local-First Processing & Privacy Guarantee</h2>
                <p style={{ color: 'var(--muted)', lineHeight: '1.7', marginBottom: '12px' }}>
                    By using RK AI Desktop and Malus, you acknowledge that all primary processing, document parsing, and inference occurs locally on your hardware. We do not harvest, upload, or monetize your local application data, chat logs, or visual screen data.
                </p>
                <p style={{ color: 'var(--muted)', lineHeight: '1.7' }}>
                    Certain account management, billing, and authentication actions (such as logging in via our web portal) require a network connection to our secure servers.
                </p>
            </div>

            <div className="reveal reveal-delay-3">
                <h2 style={{ fontSize: '24px', fontWeight: '800', marginBottom: '16px' }}>2. Subscription Tiers (Pro & Elite)</h2>
                <p style={{ color: 'var(--muted)', lineHeight: '1.7', marginBottom: '12px' }}>
                    Access to advanced capabilities, such as Autonomous Overlays, Snapvault Orb, and specific high-parameter on-device routing, may require an active subscription to a Pro or Elite tier.
                </p>
                <p style={{ color: 'var(--muted)', lineHeight: '1.7' }}>
                    Subscriptions are billed on a recurring basis. You may cancel at any time, but partial-month refunds are not provided unless legally mandated in your jurisdiction.
                </p>
            </div>

            <div className="reveal reveal-delay-4">
                <h2 style={{ fontSize: '24px', fontWeight: '800', marginBottom: '16px' }}>3. Acceptable Use of Automation</h2>
                <p style={{ color: 'var(--muted)', lineHeight: '1.7' }}>
                    RK AI Desktop provides powerful autonomous UI navigation and macro execution. You agree not to use these automation features to bypass security controls, commit fraud, engage in denial-of-service attacks, or violate the terms of service of third-party software applications installed on your system.
                </p>
            </div>

            <div className="reveal reveal-delay-5">
                <h2 style={{ fontSize: '24px', fontWeight: '800', marginBottom: '16px' }}>4. Disclaimer of Warranties</h2>
                <p style={{ color: 'var(--muted)', lineHeight: '1.7' }}>
                    The software is provided "as is", without warranty of any kind. While Malus provides robust heuristics and local sandboxing, no security software can guarantee 100% protection against zero-day threats. You are responsible for maintaining system backups.
                </p>
            </div>

        </div>
      </section>

      <Footer />
      <ChatWidget />
    </div>
  );
}
