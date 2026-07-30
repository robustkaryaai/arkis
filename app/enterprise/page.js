'use client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ChatWidget from '@/components/ChatWidget';
import Link from 'next/link';
import { FiArrowRight, FiShield, FiCpu, FiServer, FiSettings, FiCheckCircle, FiMessageCircle } from 'react-icons/fi';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { StarField, Card3D, staggerContainer, textVariant, fadeUp } from '@/components/SpaceUI';

const VP = { once: false, amount: 0.12 };

const enterpriseFeatures = [
  { icon: <FiShield size={22} />, title: 'Dedicated Onboarding', desc: 'White-glove setup and integration for your entire organization, ensuring a seamless transition to local AI workflows.', c: '#a78bfa' },
  { icon: <FiSettings size={22} />, title: 'Custom Integrations', desc: 'Connect RK AI securely to your proprietary internal tools, enterprise databases, and bespoke CRM systems.', c: '#7dd3fc' },
  { icon: <FiCpu size={22} />, title: 'Unlimited Agents', desc: 'Deploy an unmetered fleet of local AI agents to handle background workflows, data processing, and document generation.', c: '#6ee7b7' },
  { icon: <FiServer size={22} />, title: 'Advanced Security', desc: 'Total data sovereignty. Enterprise-grade encryption, on-premise deployment options, and full audit logs for compliance.', c: '#fcd34d' },
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
    <div style={{ background: '#010104', color: '#fff', minHeight: '100vh', overflowX: 'hidden', position: 'relative' }}>
      <StarField />
      <div className="noise" aria-hidden />
      <Navbar />

      {/* HERO */}
      <section style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', padding: '140px 5% 80px', position: 'relative', zIndex: 10 }}>
        <div style={{ maxWidth: 1100, width: '100%', margin: '0 auto' }}>
          <motion.div variants={staggerContainer(0.12, 0.1)} initial="hidden" whileInView="show" viewport={VP}>
            <motion.div variants={fadeUp} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 18px', borderRadius: 99, border: '1px solid rgba(139,92,246,0.3)', background: 'rgba(139,92,246,0.08)', marginBottom: 36 }}>
              <motion.span animate={{ opacity: [1, 0.3, 1] }} transition={{ repeat: Infinity, duration: 2 }} style={{ width: 6, height: 6, borderRadius: '50%', background: '#a78bfa', boxShadow: '0 0 8px #a78bfa' }} />
              <span style={{ fontSize: 12, fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase', color: '#a78bfa' }}>RK AI For Enterprise</span>
            </motion.div>
            <motion.h1 variants={textVariant(0.1)} style={{ fontSize: 'clamp(52px, 8vw, 88px)', fontWeight: 900, lineHeight: 1.0, letterSpacing: '-0.04em', marginBottom: 24 }}>
              Built for{' '}
              <span style={{ background: 'linear-gradient(90deg, #a855f7, #6366f1, #a855f7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Scale.</span>
            </motion.h1>
            <motion.p variants={fadeUp} style={{ fontSize: 18, color: 'rgba(255,255,255,0.55)', lineHeight: 1.7, maxWidth: 560, marginBottom: 40 }}>
              Empower your organization with total privacy, custom integrations, and unlimited local compute — the ultimate AI for high-security teams.
            </motion.p>
            <motion.div variants={fadeUp} style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              <button
                onClick={() => document.getElementById('contact-form').scrollIntoView({ behavior: 'smooth' })}
                style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 32px', borderRadius: 99, background: 'linear-gradient(90deg, #8b5cf6, #6366f1, #8b5cf6)', color: '#fff', fontWeight: 800, fontSize: 15, border: 'none', cursor: 'pointer', boxShadow: '0 8px 32px rgba(139,92,246,0.35)', fontFamily: 'inherit' }}
              >
                Request a Proposal <FiArrowRight size={16} />
              </button>
              <button
                onClick={() => document.dispatchEvent(new Event('rk-chat-open'))}
                style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '13px 28px', borderRadius: 99, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontWeight: 700, fontSize: 15, cursor: 'pointer', fontFamily: 'inherit' }}
              >
                <FiMessageCircle size={16} /> Chat with Core Team
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* COMPARISON */}
      <section style={{ padding: '80px 5%', position: 'relative', zIndex: 10 }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <motion.div variants={staggerContainer(0.1, 0.2)} initial="hidden" whileInView="show" viewport={VP} style={{ marginBottom: '56px', textAlign: 'center' }}>
            <motion.div variants={fadeUp} style={{ fontSize: 11, fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase', color: '#a78bfa', marginBottom: 16 }}>Plans</motion.div>
            <motion.h2 variants={textVariant(0)} style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 900, letterSpacing: '-1px' }}>Why go Enterprise?</motion.h2>
          </motion.div>
          <motion.div variants={staggerContainer(0.1, 0.3)} initial="hidden" whileInView="show" viewport={VP} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            <motion.div variants={fadeUp}>
              <Card3D orbColor="rgba(255,255,255,0.05)">
                <div style={{ padding: '36px' }}>
                  <h3 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '28px', color: 'rgba(255,255,255,0.4)' }}>Standard Subscriptions</h3>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    {['Metered cloud sync', 'Standard community support', 'Self-serve setup', 'Fixed workflow integrations'].map(item => (
                      <li key={item} style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'rgba(255,255,255,0.45)', fontSize: '14px' }}>
                        <FiCheckCircle size={16} /> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </Card3D>
            </motion.div>
            <motion.div variants={fadeUp}>
              <Card3D orbColor="rgba(139,92,246,0.25)" style={{ border: '1px solid rgba(139, 92, 246, 0.4)', background: 'linear-gradient(90deg, rgba(139, 92, 246, 0.06, 246, 92, rgba(139), transparent)' }}>
                <div style={{ padding: '36px', position: 'relative', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', top: 0, left: '20%', right: '20%', height: '2px', background: 'linear-gradient(90deg, transparent, #8b5cf6, transparent)' }} />
                  <h3 style={{ fontSize: '20px', fontWeight: '900', marginBottom: '28px', color: '#a78bfa' }}>Enterprise Matrix</h3>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    {['Unlimited cloud sync & storage', 'Direct core team access (SLA)', 'White-glove deployment', 'Custom built internal integrations'].map(item => (
                      <li key={item} style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#fff', fontSize: '14px', fontWeight: '600' }}>
                        <FiCheckCircle size={16} color="#a78bfa" /> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </Card3D>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* FEATURES GRID */}
      <section style={{ padding: '80px 5%', position: 'relative', zIndex: 10 }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <motion.div variants={staggerContainer(0.1, 0.2)} initial="hidden" whileInView="show" viewport={VP}>
            <motion.div variants={fadeUp} style={{ textAlign: 'center', marginBottom: '56px' }}>
              <h2 style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 900, letterSpacing: '-1px', marginBottom: 16 }}>Uncompromising Features.</h2>
              <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: 18, maxWidth: 600, margin: '0 auto' }}>Everything your organization needs — deployed on your terms.</p>
            </motion.div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
              {enterpriseFeatures.map((f, i) => (
                <motion.div key={i} variants={fadeUp}>
                  <Card3D orbColor={`${f.c}33`} style={{ height: '100%' }}>
                    <div style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: 16 }}>
                      <div style={{ width: 48, height: 48, borderRadius: 12, background: `${f.c}15`, color: f.c, border: `1px solid ${f.c}33`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{f.icon}</div>
                      <h3 style={{ fontSize: '20px', fontWeight: '800', margin: 0 }}>{f.title}</h3>
                      <p style={{ color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, margin: 0 }}>{f.desc}</p>
                    </div>
                  </Card3D>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CONTACT FORM */}
      <section id="contact-form" style={{ padding: '80px 5% 120px', position: 'relative', zIndex: 10 }}>
        <div style={{ maxWidth: '640px', margin: '0 auto' }}>
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={VP} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>
            <Card3D orbColor="rgba(139,92,246,0.2)">
              <div style={{ padding: '48px 40px' }}>
                <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                  <h2 style={{ fontSize: 'clamp(24px, 4vw, 36px)', fontWeight: '900', marginBottom: '10px' }}>Contact Sales</h2>
                  <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '15px' }}>We'll design a custom package for your organization.</p>
                </div>

                {sent ? (
                  <div style={{ textAlign: 'center', padding: '32px 0' }}>
                    <div style={{ fontSize: '52px', marginBottom: '16px' }}>✨</div>
                    <h3 style={{ fontSize: '22px', fontWeight: '800', color: '#a78bfa', marginBottom: '10px' }}>Request Sent</h3>
                    <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px' }}>Our enterprise team reviews all inquiries within 24 hours.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px' }}>
                      {[{ label: 'Full Name', key: 'name', placeholder: 'Jane Doe' }, { label: 'Company', key: 'company', placeholder: 'Acme Corp' }].map(({ label, key, placeholder }) => (
                        <div key={key} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                          <label style={{ fontSize: '11px', fontWeight: '800', color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', letterSpacing: '1.5px' }}>{label}</label>
                          <input type="text" required placeholder={placeholder} value={form[key]} onChange={e => setForm({ ...form, [key]: e.target.value })}
                            style={{ background: 'rgba(0,0,0,0.35)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '12px 14px', color: '#fff', fontSize: '14px', outline: 'none', fontFamily: 'inherit' }}
                            onFocus={e => e.target.style.borderColor = '#8b5cf6'} onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.08)'} />
                        </div>
                      ))}
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <label style={{ fontSize: '11px', fontWeight: '800', color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', letterSpacing: '1.5px' }}>Work Email</label>
                      <input type="email" required placeholder="jane@acme.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                        style={{ background: 'rgba(0,0,0,0.35)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '12px 14px', color: '#fff', fontSize: '14px', outline: 'none', fontFamily: 'inherit' }}
                        onFocus={e => e.target.style.borderColor = '#8b5cf6'} onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.08)'} />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <label style={{ fontSize: '11px', fontWeight: '800', color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', letterSpacing: '1.5px' }}>Project Needs</label>
                      <textarea required rows={4} placeholder="Tell us about your infrastructure and team size..." value={form.needs} onChange={e => setForm({ ...form, needs: e.target.value })}
                        style={{ background: 'rgba(0,0,0,0.35)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '12px 14px', color: '#fff', fontSize: '14px', outline: 'none', resize: 'vertical', fontFamily: 'inherit', lineHeight: '1.6' }}
                        onFocus={e => e.target.style.borderColor = '#8b5cf6'} onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.08)'} />
                    </div>
                    <button type="submit"
                      style={{ marginTop: '8px', background: 'linear-gradient(90deg, #8b5cf6, #6366f1, #8b5cf6)', boxShadow: '0 8px 32px rgba(139,92,246,0.3)', width: '100%', justifyContent: 'center', display: 'flex', alignItems: 'center', gap: 8, padding: '15px', borderRadius: 99, color: '#fff', fontWeight: 800, fontSize: 15, border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}>
                      Send Inquiry
                    </button>
                  </form>
                )}
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
