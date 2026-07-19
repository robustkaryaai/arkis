'use client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ChatWidget from '@/components/ChatWidget';
import Link from 'next/link';
import { FiArrowRight, FiShield, FiCpu, FiServer, FiSettings, FiCheckCircle, FiMessageCircle } from 'react-icons/fi';
import { useState } from 'react';
import { motion } from 'framer-motion';

const enterpriseFeatures = [
  { title: 'Dedicated Onboarding', desc: 'White-glove setup and integration for your entire organization, ensuring a seamless transition to local AI workflows.' },
  { title: 'Custom Integrations', desc: 'Connect RK AI securely to your proprietary internal tools, enterprise databases, and bespoke CRM systems.' },
  { title: 'Unlimited Autonomous Agents', desc: 'Deploy an unmetered fleet of local AI agents to handle background workflows, data processing, and document generation.' },
  { title: 'Advanced Security & Privacy', desc: 'Total data sovereignty. Enterprise-grade encryption, complete on-premise deployment options, and full audit logs for compliance.' },
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
    <div style={{ background: 'var(--background)', color: 'var(--text)', minHeight: '100vh', overflowX: 'hidden' }}>
      <Navbar />

      <main style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px 80px', position: 'relative' }}>
        
        {/* Background Glows */}
        <div style={{ position: 'absolute', top: '20%', left: '50%', transform: 'translate(-50%, -50%)', width: '1000px', height: '1000px', background: 'radial-gradient(circle, rgba(139, 92, 246, 0.12) 0%, transparent 60%)', pointerEvents: 'none', zIndex: 0 }} />

        {/* HERO SECTION */}
        <section className="hero" style={{ padding: '140px 0 100px', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            
            <div className="badge float-anim" style={{ marginBottom: '24px' }}>
                <span className="dot" style={{ background: '#8b5cf6' }} /> RK AI For Enterprise
            </div>
            
            <h1 style={{ fontSize: 'clamp(48px, 8vw, 92px)', lineHeight: '1.05', marginBottom: '24px', fontWeight: '900', letterSpacing: '-2px' }}>
              Built for <span className="grad" style={{ backgroundImage: 'linear-gradient(135deg, #a855f7, #6366f1)' }}>Scale.</span>
            </h1>
            
            <p style={{ fontSize: '20px', lineHeight: '1.8', color: 'var(--muted)', marginBottom: '40px', maxWidth: '700px' }}>
              Empower your organization with total privacy, custom integrations, and unlimited local compute. 
              The ultimate AI solution designed for high-security environments and massive scale.
            </p>
            
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
              <button 
                onClick={() => document.getElementById('contact-form').scrollIntoView({ behavior: 'smooth' })}
                className="btn-primary"
                style={{ 
                    display: 'inline-flex', alignItems: 'center', gap: '10px', 
                    padding: '18px 40px', background: 'linear-gradient(135deg, #8b5cf6, #6366f1)',
                    boxShadow: '0 10px 40px rgba(139, 92, 246, 0.3)', border: 'none', fontSize: '16px'
                }}
              >
                Request a Proposal <FiArrowRight size={20} />
              </button>
              <button 
                onClick={() => document.dispatchEvent(new Event('rk-chat-open'))}
                className="btn-secondary"
                style={{ 
                    display: 'inline-flex', alignItems: 'center', gap: '10px',
                    padding: '18px 40px', fontSize: '16px'
                }}
              >
                <FiMessageCircle size={20} /> Chat with Core Team
              </button>
            </div>
          </motion.div>
        </section>

        {/* COMPARISON */}
        <section style={{ padding: '80px 0', position: 'relative', zIndex: 1 }}>
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} style={{ textAlign: 'center', marginBottom: '80px' }}>
            <span style={{ display: 'inline-block', color: '#a78bfa', fontWeight: '900', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '16px' }}>Plans</span>
            <h2 style={{ fontSize: 'clamp(40px, 5vw, 64px)', fontWeight: '900', margin: 0, letterSpacing: '-1.5px' }}>Why go Enterprise?</h2>
          </motion.div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '40px' }}>
            {/* Standard Tier */}
            <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="feature-card" style={{ padding: '60px', borderRadius: '40px', background: 'var(--surface)', border: '1px solid var(--border)' }}>
              <h3 style={{ fontSize: '28px', fontWeight: '800', marginBottom: '32px', color: 'var(--muted)' }}>Standard Subscriptions</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '20px', color: 'var(--muted)', fontSize: '18px' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '16px' }}><FiCheckCircle size={24} /> Metered cloud sync</li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '16px' }}><FiCheckCircle size={24} /> Standard community support</li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '16px' }}><FiCheckCircle size={24} /> Self-serve setup</li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '16px' }}><FiCheckCircle size={24} /> Fixed workflow integrations</li>
              </ul>
            </motion.div>
            
            {/* Enterprise Tier */}
            <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }} className="feature-card" style={{ padding: '60px', borderRadius: '40px', background: 'linear-gradient(180deg, rgba(139, 92, 246, 0.08), rgba(0,0,0,0))', border: '1px solid rgba(139, 92, 246, 0.4)', position: 'relative', boxShadow: '0 40px 80px rgba(139,92,246,0.1)' }}>
              <div style={{ position: 'absolute', top: '-1px', left: '20%', right: '20%', height: '3px', background: 'linear-gradient(90deg, transparent, #8b5cf6, transparent)' }} />
              <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'radial-gradient(circle at top, rgba(139, 92, 246, 0.15), transparent 70%)', pointerEvents: 'none' }} />
              <h3 style={{ fontSize: '28px', fontWeight: '900', marginBottom: '32px', color: '#a78bfa' }}>Enterprise Matrix</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '20px', color: 'var(--text)', fontSize: '18px', fontWeight: '600' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '16px' }}><FiCheckCircle size={24} color="#a78bfa" /> Unlimited cloud sync & storage</li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '16px' }}><FiCheckCircle size={24} color="#a78bfa" /> Direct core team access (SLA)</li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '16px' }}><FiCheckCircle size={24} color="#a78bfa" /> White-glove deployment</li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '16px' }}><FiCheckCircle size={24} color="#a78bfa" /> Custom built internal integrations</li>
              </ul>
            </motion.div>
          </div>
        </section>

        {/* FEATURES GRID */}
        <section style={{ padding: '100px 0', position: 'relative', zIndex: 1 }}>
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} style={{ textAlign: 'center', marginBottom: '80px' }}>
            <h2 style={{ fontSize: 'clamp(40px, 5vw, 64px)', fontWeight: '900', margin: 0, letterSpacing: '-1.5px' }}>Uncompromising Features.</h2>
          </motion.div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px' }}>
            {enterpriseFeatures.map((feature, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.95, y: 30 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                whileHover={{ y: -5, borderColor: 'rgba(139, 92, 246, 0.5)', background: 'rgba(139, 92, 246, 0.05)' }}
                className="feature-card"
                style={{ 
                  padding: '48px', borderRadius: '40px', background: 'var(--surface)', 
                  border: '1px solid var(--border)'
              }}>
                <div style={{ width: '64px', height: '64px', borderRadius: '16px', background: 'rgba(139, 92, 246, 0.1)', color: '#a78bfa', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px', border: '1px solid rgba(139, 92, 246, 0.2)' }}>
                  {i === 0 ? <FiShield size={28} /> : i === 1 ? <FiSettings size={28} /> : i === 2 ? <FiCpu size={28} /> : <FiServer size={28} />}
                </div>
                <h3 style={{ fontSize: '26px', fontWeight: '900', marginBottom: '16px' }}>{feature.title}</h3>
                <p style={{ color: 'var(--muted)', lineHeight: '1.7', margin: 0, fontSize: '16px' }}>{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CONTACT FORM */}
        <section id="contact-form" style={{ padding: '100px 0', position: 'relative', zIndex: 1 }}>
          <motion.div 
            initial={{ opacity: 0, y: 50 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            transition={{ duration: 0.8 }}
            style={{ maxWidth: '800px', margin: '0 auto', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '48px', padding: '80px 60px', boxShadow: '0 40px 80px rgba(0,0,0,0.5), inset 0 0 80px rgba(139, 92, 246, 0.05)' }}
          >
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
              <h2 style={{ fontSize: '48px', fontWeight: '900', marginBottom: '16px', letterSpacing: '-1px' }}>Contact Sales</h2>
              <p style={{ color: 'var(--muted)', fontSize: '20px' }}>Tell us about your organization and we'll design a custom package.</p>
            </div>
            
            {sent ? (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} style={{ textAlign: 'center', padding: '60px 0' }}>
                <div style={{ fontSize: '80px', marginBottom: '24px' }}>✨</div>
                <h3 style={{ fontSize: '32px', fontWeight: '900', color: '#a78bfa', marginBottom: '16px' }}>Request Prepared</h3>
                <p style={{ color: 'var(--muted)', fontSize: '18px' }}>Your email client should open shortly. Our enterprise team reviews all inquiries within 24 hours.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <label style={{ fontSize: '13px', fontWeight: '900', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '2px' }}>Full Name</label>
                    <input type="text" required placeholder="Jane Doe" value={form.name} onChange={e => setForm({...form, name: e.target.value})}
                      style={{ background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', padding: '20px', color: 'var(--text)', fontSize: '16px', outline: 'none', transition: 'border-color 0.3s ease' }}
                      onFocus={e => e.target.style.borderColor = '#8b5cf6'} onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                    />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <label style={{ fontSize: '13px', fontWeight: '900', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '2px' }}>Company</label>
                    <input type="text" required placeholder="Acme Corp" value={form.company} onChange={e => setForm({...form, company: e.target.value})}
                      style={{ background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', padding: '20px', color: 'var(--text)', fontSize: '16px', outline: 'none', transition: 'border-color 0.3s ease' }}
                      onFocus={e => e.target.style.borderColor = '#8b5cf6'} onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                    />
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <label style={{ fontSize: '13px', fontWeight: '900', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '2px' }}>Work Email</label>
                  <input type="email" required placeholder="jane@acme.com" value={form.email} onChange={e => setForm({...form, email: e.target.value})}
                    style={{ background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', padding: '20px', color: 'var(--text)', fontSize: '16px', outline: 'none', transition: 'border-color 0.3s ease' }}
                    onFocus={e => e.target.style.borderColor = '#8b5cf6'} onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                  />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <label style={{ fontSize: '13px', fontWeight: '900', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '2px' }}>Project Needs</label>
                  <textarea required rows={5} placeholder="Tell us about your infrastructure and team size..." value={form.needs} onChange={e => setForm({...form, needs: e.target.value})}
                    style={{ background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', padding: '20px', color: 'var(--text)', fontSize: '16px', outline: 'none', resize: 'vertical', transition: 'border-color 0.3s ease' }}
                    onFocus={e => e.target.style.borderColor = '#8b5cf6'} onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                  />
                </div>
                <button type="submit" 
                  className="btn-primary"
                  style={{ 
                    marginTop: '20px', padding: '24px', borderRadius: '16px', background: 'linear-gradient(135deg, #8b5cf6, #6366f1)', color: '#fff', 
                    border: 'none', fontSize: '18px', fontWeight: '900', cursor: 'pointer',
                    boxShadow: '0 10px 40px rgba(139, 92, 246, 0.3)'
                  }}
                >
                  Send Inquiry
                </button>
              </form>
            )}
          </motion.div>
        </section>
      </main>

      <Footer />
      <ChatWidget />
    </div>
  );
}
