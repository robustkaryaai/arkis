'use client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ChatWidget from '@/components/ChatWidget';
import Link from 'next/link';
import { FiArrowRight, FiShield, FiCpu, FiServer, FiSettings, FiHeadphones, FiCheckCircle } from 'react-icons/fi';
import { useState } from 'react';

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
    <div style={{ background: '#050505', color: '#eaeaea', minHeight: '100vh', overflowX: 'hidden', fontFamily: 'var(--font-inter), sans-serif' }}>
      <Navbar />

      <main style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px 80px' }}>
        {/* HERO SECTION */}
        <section style={{ padding: '140px 0 80px', textAlign: 'center', position: 'relative' }}>
          <div style={{ position: 'absolute', top: '20%', left: '50%', transform: 'translate(-50%, -50%)', width: '800px', height: '800px', background: 'radial-gradient(circle, rgba(212,175,55,0.08) 0%, transparent 60%)', pointerEvents: 'none', zIndex: 0 }} />
          
          <div style={{ position: 'relative', zIndex: 1, maxWidth: '800px', margin: '0 auto' }}>
            <span style={{ 
                display: 'inline-flex', padding: '10px 20px', borderRadius: '999px', 
                background: 'rgba(212,175,55,0.08)', color: '#d4af37', border: '1px solid rgba(212,175,55,0.3)',
                fontSize: '13px', letterSpacing: '2px', fontWeight: '800', 
                marginBottom: '28px', textTransform: 'uppercase' 
            }}>
              RK AI For Enterprise
            </span>
            <h1 style={{ fontSize: 'clamp(46px, 7vw, 84px)', lineHeight: '1.05', marginBottom: '24px', fontWeight: '900', letterSpacing: '-2px' }}>
              Built for <span style={{ background: 'linear-gradient(135deg, #d4af37, #f3e5ab)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Scale.</span>
            </h1>
            <p style={{ fontSize: '20px', lineHeight: '1.8', color: '#999', marginBottom: '40px' }}>
              Empower your organization with total privacy, custom integrations, and unlimited local compute. 
              The ultimate AI solution designed for high-security environments and massive scale.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', justifyContent: 'center' }}>
              <button 
                onClick={() => document.getElementById('contact-form').scrollIntoView({ behavior: 'smooth' })}
                style={{ 
                    display: 'inline-flex', alignItems: 'center', gap: '10px', 
                    padding: '18px 40px', borderRadius: '999px', 
                    background: 'linear-gradient(135deg, #d4af37, #b08d2b)', 
                    color: '#000', fontWeight: '900', textDecoration: 'none', border: 'none', cursor: 'pointer',
                    boxShadow: '0 10px 40px rgba(212,175,55,0.25)', transition: 'all 0.3s ease', fontSize: '16px'
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 15px 50px rgba(212,175,55,0.4)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 10px 40px rgba(212,175,55,0.25)'; }}
              >
                Request a Proposal <FiArrowRight size={20} />
              </button>
              <button 
                onClick={() => document.dispatchEvent(new Event('rk-chat-open'))}
                style={{ 
                    display: 'inline-flex', alignItems: 'center', gap: '10px',
                    padding: '18px 40px', borderRadius: '999px', background: 'rgba(255,255,255,0.03)', 
                    color: '#fff', border: '1px solid rgba(255,255,255,0.1)', fontSize: '16px',
                    fontWeight: '800', cursor: 'pointer', transition: 'all 0.3s ease'
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.08)'}
                onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.03)'}
              >
                <FiMessageCircle size={20} /> Chat with Core Team
              </button>
            </div>
          </div>
        </section>

        {/* COMPARISON */}
        <section style={{ padding: '80px 0' }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 style={{ fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: '900', margin: 0 }}>Why go Enterprise?</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
            {/* Standard Tier */}
            <div style={{ padding: '48px', borderRadius: '32px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
              <h3 style={{ fontSize: '24px', fontWeight: '800', marginBottom: '24px', color: '#888' }}>Standard Subscriptions</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '16px', color: '#777' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '12px' }}><FiCheckCircle size={18} /> Metered cloud sync</li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '12px' }}><FiCheckCircle size={18} /> Standard community support</li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '12px' }}><FiCheckCircle size={18} /> Self-serve setup</li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '12px' }}><FiCheckCircle size={18} /> Fixed workflow integrations</li>
              </ul>
            </div>
            {/* Enterprise Tier */}
            <div style={{ padding: '48px', borderRadius: '32px', background: 'linear-gradient(180deg, rgba(212,175,55,0.08), rgba(0,0,0,0))', border: '1px solid rgba(212,175,55,0.3)', position: 'relative' }}>
              <div style={{ position: 'absolute', top: '-1px', left: '10%', right: '10%', height: '2px', background: 'linear-gradient(90deg, transparent, #d4af37, transparent)' }} />
              <h3 style={{ fontSize: '24px', fontWeight: '800', marginBottom: '24px', color: '#d4af37' }}>Enterprise Matrix</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '16px', color: '#eee' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '12px' }}><FiCheckCircle size={18} color="#d4af37" /> Unlimited cloud sync & storage</li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '12px' }}><FiCheckCircle size={18} color="#d4af37" /> Direct core team access (SLA)</li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '12px' }}><FiCheckCircle size={18} color="#d4af37" /> White-glove deployment</li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '12px' }}><FiCheckCircle size={18} color="#d4af37" /> Custom built internal integrations</li>
              </ul>
            </div>
          </div>
        </section>

        {/* FEATURES GRID */}
        <section style={{ padding: '80px 0' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            {enterpriseFeatures.map((feature, i) => (
              <div key={i} style={{ 
                  padding: '40px', borderRadius: '32px', background: 'rgba(255,255,255,0.02)', 
                  border: '1px solid rgba(255,255,255,0.05)', transition: 'all 0.3s ease' 
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.borderColor = 'rgba(212,175,55,0.3)'; e.currentTarget.style.background = 'rgba(212,175,55,0.02)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)'; e.currentTarget.style.background = 'rgba(255,255,255,0.02)'; }}
              >
                <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'rgba(212,175,55,0.1)', color: '#d4af37', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
                  {i === 0 ? <FiShield size={24} /> : i === 1 ? <FiSettings size={24} /> : i === 2 ? <FiCpu size={24} /> : <FiServer size={24} />}
                </div>
                <h3 style={{ fontSize: '22px', fontWeight: '800', marginBottom: '16px' }}>{feature.title}</h3>
                <p style={{ color: '#888', lineHeight: '1.7', margin: 0, fontSize: '15px' }}>{feature.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CONTACT FORM */}
        <section id="contact-form" style={{ padding: '80px 0' }}>
          <div style={{ maxWidth: '700px', margin: '0 auto', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '32px', padding: '60px 40px', boxShadow: '0 20px 40px rgba(0,0,0,0.5)' }}>
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
              <h2 style={{ fontSize: '36px', fontWeight: '900', marginBottom: '12px' }}>Contact Sales</h2>
              <p style={{ color: '#888', fontSize: '16px' }}>Tell us about your organization and we'll design a custom package.</p>
            </div>
            
            {sent ? (
              <div style={{ textAlign: 'center', padding: '40px 0' }}>
                <div style={{ fontSize: '64px', marginBottom: '20px' }}>✨</div>
                <h3 style={{ fontSize: '24px', fontWeight: '800', color: '#d4af37', marginBottom: '12px' }}>Request Prepared</h3>
                <p style={{ color: '#999' }}>Your email client should open shortly. Our enterprise team reviews all inquiries within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <label style={{ fontSize: '12px', fontWeight: '800', color: '#777', textTransform: 'uppercase', letterSpacing: '1px' }}>Full Name</label>
                    <input type="text" required placeholder="Jane Doe" value={form.name} onChange={e => setForm({...form, name: e.target.value})}
                      style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', padding: '16px', color: '#fff', fontSize: '15px', outline: 'none' }}
                      onFocus={e => e.target.style.borderColor = '#d4af37'} onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                    />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <label style={{ fontSize: '12px', fontWeight: '800', color: '#777', textTransform: 'uppercase', letterSpacing: '1px' }}>Company</label>
                    <input type="text" required placeholder="Acme Corp" value={form.company} onChange={e => setForm({...form, company: e.target.value})}
                      style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', padding: '16px', color: '#fff', fontSize: '15px', outline: 'none' }}
                      onFocus={e => e.target.style.borderColor = '#d4af37'} onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                    />
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <label style={{ fontSize: '12px', fontWeight: '800', color: '#777', textTransform: 'uppercase', letterSpacing: '1px' }}>Work Email</label>
                  <input type="email" required placeholder="jane@acme.com" value={form.email} onChange={e => setForm({...form, email: e.target.value})}
                    style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', padding: '16px', color: '#fff', fontSize: '15px', outline: 'none' }}
                    onFocus={e => e.target.style.borderColor = '#d4af37'} onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                  />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <label style={{ fontSize: '12px', fontWeight: '800', color: '#777', textTransform: 'uppercase', letterSpacing: '1px' }}>Project Needs</label>
                  <textarea required rows={5} placeholder="Tell us about your infrastructure and team size..." value={form.needs} onChange={e => setForm({...form, needs: e.target.value})}
                    style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', padding: '16px', color: '#fff', fontSize: '15px', outline: 'none', resize: 'vertical' }}
                    onFocus={e => e.target.style.borderColor = '#d4af37'} onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                  />
                </div>
                <button type="submit" 
                  style={{ 
                    marginTop: '16px', padding: '18px', borderRadius: '12px', background: '#d4af37', color: '#000', 
                    border: 'none', fontSize: '16px', fontWeight: '900', cursor: 'pointer',
                    boxShadow: '0 10px 30px rgba(212,175,55,0.2)', transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 15px 40px rgba(212,175,55,0.3)'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 10px 30px rgba(212,175,55,0.2)'; }}
                >
                  Send Inquiry
                </button>
              </form>
            )}
          </div>
        </section>
      </main>

      <Footer />
      <ChatWidget />
    </div>
  );
}
