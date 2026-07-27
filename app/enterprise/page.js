'use client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ChatWidget from '@/components/ChatWidget';
import Link from 'next/link';
import { FiArrowRight, FiShield, FiCpu, FiServer, FiSettings, FiCheckCircle, FiMessageCircle } from 'react-icons/fi';
import { useState } from 'react';

const enterpriseFeatures = [
  { icon: <FiShield size={22} />, title: 'Dedicated Onboarding', desc: 'White-glove setup and integration for your entire organization, ensuring a seamless transition to local AI workflows.' },
  { icon: <FiSettings size={22} />, title: 'Custom Integrations', desc: 'Connect RK AI securely to your proprietary internal tools, enterprise databases, and bespoke CRM systems.' },
  { icon: <FiCpu size={22} />, title: 'Unlimited Agents', desc: 'Deploy an unmetered fleet of local AI agents to handle background workflows, data processing, and document generation.' },
  { icon: <FiServer size={22} />, title: 'Advanced Security', desc: 'Total data sovereignty. Enterprise-grade encryption, on-premise deployment options, and full audit logs for compliance.' },
];

export default function EnterprisePage() {
  const [form, setForm] = useState({ name: '', company: '', email: '', needs: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    window.location.href = `mailto:rkai.official@gmail.com?subject=Enterprise Inquiry: ${encodeURIComponent(form.company)}&body=${encodeURIComponent(`Name: ${form.name}\nCompany: ${form.company}\nEmail: ${form.email}\n\nNeeds:\n${form.needs}`)}`;
    setSent(true);
  };

  return (
    <div style={{ background: 'var(--bg)', color: 'var(--text)', minHeight: '100vh', overflowX: 'hidden' }}>
      <Navbar />

      {/* HERO */}
      <section className="hero">
        <div className="hero-eyebrow float-anim">
          <span className="pulse" style={{ background: '#8b5cf6' }} /> RK AI For Enterprise
        </div>
        <h1>Built for <span className="grad" style={{ backgroundImage: 'linear-gradient(135deg, #a855f7, #6366f1)' }}>Scale.</span></h1>
        <p>Empower your organization with total privacy, custom integrations, and unlimited local compute — the ultimate AI for high-security teams.</p>
        <div className="hero-btns">
          <button
            onClick={() => document.getElementById('contact-form').scrollIntoView({ behavior: 'smooth' })}
            className="btn-primary"
            style={{ background: 'linear-gradient(135deg, #8b5cf6, #6366f1)', boxShadow: '0 0 30px rgba(139,92,246,0.35)', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
          >
            Request a Proposal <FiArrowRight size={16} />
          </button>
          <button
            onClick={() => document.dispatchEvent(new Event('rk-chat-open'))}
            className="btn-secondary"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
          >
            <FiMessageCircle size={16} /> Chat with Core Team
          </button>
        </div>
      </section>

      {/* COMPARISON */}
      <section style={{ padding: '80px 5%' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '56px' }} className="reveal">
            <span className="label" style={{ color: '#a78bfa' }}>Plans</span>
            <h2 className="section-title">Why go Enterprise?</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            {/* Standard */}
            <div className="feature-card reveal reveal-delay-1">
              <h3 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '28px', color: 'var(--muted)' }}>Standard Subscriptions</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {['Metered cloud sync', 'Standard community support', 'Self-serve setup', 'Fixed workflow integrations'].map(item => (
                  <li key={item} style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--muted)', fontSize: '14px' }}>
                    <FiCheckCircle size={16} /> {item}
                  </li>
                ))}
              </ul>
            </div>
            {/* Enterprise */}
            <div className="feature-card reveal reveal-delay-2" style={{ border: '1px solid rgba(139, 92, 246, 0.4)', background: 'linear-gradient(180deg, rgba(139,92,246,0.06), var(--surface))', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: 0, left: '20%', right: '20%', height: '2px', background: 'linear-gradient(90deg, transparent, #8b5cf6, transparent)' }} />
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '120px', background: 'radial-gradient(ellipse at top, rgba(139,92,246,0.15), transparent)', pointerEvents: 'none' }} />
              <h3 style={{ fontSize: '20px', fontWeight: '900', marginBottom: '28px', color: '#a78bfa' }}>Enterprise Matrix</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {['Unlimited cloud sync & storage', 'Direct core team access (SLA)', 'White-glove deployment', 'Custom built internal integrations'].map(item => (
                  <li key={item} style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text)', fontSize: '14px', fontWeight: '600' }}>
                    <FiCheckCircle size={16} color="#a78bfa" /> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES GRID */}
      <section style={{ padding: '80px 5%' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '56px' }} className="reveal">
            <h2 className="section-title">Uncompromising Features.</h2>
            <p className="section-sub" style={{ margin: '0 auto' }}>Everything your organization needs — deployed on your terms.</p>
          </div>
          <div className="feature-grid">
            {enterpriseFeatures.map((f, i) => (
              <div key={i} className={`feature-card reveal reveal-delay-${i + 1}`}>
                <div className="feature-icon">
                  {f.icon}
                </div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT FORM */}
      <section id="contact-form" style={{ padding: '80px 5%' }}>
        <div style={{ maxWidth: '640px', margin: '0 auto' }}>
          <div className="feature-card reveal" style={{ padding: '48px 40px' }}>
            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
              <h2 style={{ fontSize: 'clamp(24px, 4vw, 36px)', fontWeight: '900', marginBottom: '10px' }}>Contact Sales</h2>
              <p style={{ color: 'var(--muted)', fontSize: '15px' }}>We'll design a custom package for your organization.</p>
            </div>

            {sent ? (
              <div style={{ textAlign: 'center', padding: '32px 0' }}>
                <div style={{ fontSize: '52px', marginBottom: '16px' }}>✨</div>
                <h3 style={{ fontSize: '22px', fontWeight: '800', color: '#a78bfa', marginBottom: '10px' }}>Request Sent</h3>
                <p style={{ color: 'var(--muted)', fontSize: '14px' }}>Our enterprise team reviews all inquiries within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontSize: '11px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '1.5px' }}>Full Name</label>
                    <input
                      type="text" required placeholder="Jane Doe"
                      value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                      style={{ background: 'rgba(0,0,0,0.35)', border: '1px solid var(--border)', borderRadius: '10px', padding: '12px 14px', color: 'var(--text)', fontSize: '14px', outline: 'none', transition: 'border-color 0.2s ease', fontFamily: 'inherit' }}
                      onFocus={e => e.target.style.borderColor = '#8b5cf6'}
                      onBlur={e => e.target.style.borderColor = 'var(--border)'}
                    />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontSize: '11px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '1.5px' }}>Company</label>
                    <input
                      type="text" required placeholder="Acme Corp"
                      value={form.company} onChange={e => setForm({ ...form, company: e.target.value })}
                      style={{ background: 'rgba(0,0,0,0.35)', border: '1px solid var(--border)', borderRadius: '10px', padding: '12px 14px', color: 'var(--text)', fontSize: '14px', outline: 'none', transition: 'border-color 0.2s ease', fontFamily: 'inherit' }}
                      onFocus={e => e.target.style.borderColor = '#8b5cf6'}
                      onBlur={e => e.target.style.borderColor = 'var(--border)'}
                    />
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={{ fontSize: '11px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '1.5px' }}>Work Email</label>
                  <input
                    type="email" required placeholder="jane@acme.com"
                    value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                    style={{ background: 'rgba(0,0,0,0.35)', border: '1px solid var(--border)', borderRadius: '10px', padding: '12px 14px', color: 'var(--text)', fontSize: '14px', outline: 'none', transition: 'border-color 0.2s ease', fontFamily: 'inherit' }}
                    onFocus={e => e.target.style.borderColor = '#8b5cf6'}
                    onBlur={e => e.target.style.borderColor = 'var(--border)'}
                  />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={{ fontSize: '11px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '1.5px' }}>Project Needs</label>
                  <textarea
                    required rows={4} placeholder="Tell us about your infrastructure and team size..."
                    value={form.needs} onChange={e => setForm({ ...form, needs: e.target.value })}
                    style={{ background: 'rgba(0,0,0,0.35)', border: '1px solid var(--border)', borderRadius: '10px', padding: '12px 14px', color: 'var(--text)', fontSize: '14px', outline: 'none', resize: 'vertical', transition: 'border-color 0.2s ease', fontFamily: 'inherit', lineHeight: '1.6' }}
                    onFocus={e => e.target.style.borderColor = '#8b5cf6'}
                    onBlur={e => e.target.style.borderColor = 'var(--border)'}
                  />
                </div>
                <button
                  type="submit"
                  className="btn-primary"
                  style={{ marginTop: '8px', background: 'linear-gradient(135deg, #8b5cf6, #6366f1)', boxShadow: '0 0 30px rgba(139,92,246,0.3)', width: '100%', justifyContent: 'center' }}
                >
                  Send Inquiry
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      <Footer />
      <ChatWidget />
    </div>
  );
}
