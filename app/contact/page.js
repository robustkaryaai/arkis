'use client';
import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import ChatWidget from '@/components/ChatWidget';
import Footer from '@/components/Footer';
import { FiMail, FiTwitter, FiMessageCircle, FiArrowRight, FiSend } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { StarField, Card3D, staggerContainer, textVariant, fadeUp } from '@/components/SpaceUI';

const SUBJECTS = ['General Inquiry', 'Billing & Subscriptions', 'Technical Support', 'Business & Partnerships', 'Feature Request', 'Press & Media'];

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: 'General Inquiry', message: '' });
  const [sent, setSent] = useState(false);
  const [focused, setFocused] = useState(null);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const { submitContact } = await import('@/lib/api');
      await submitContact(form);
      setSent(true);
    } catch (err) {
      console.error(err);
      alert('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputStyle = (key) => ({
    background: focused === key ? 'rgba(236,72,153,0.05)' : 'rgba(255,255,255,0.02)',
    border: `1px solid ${focused === key ? 'rgba(236,72,153,0.4)' : 'rgba(255,255,255,0.08)'}`,
    borderRadius: 14,
    padding: '16px 20px',
    color: '#fff',
    fontFamily: 'inherit',
    fontSize: 15,
    outline: 'none',
    width: '100%',
    boxSizing: 'border-box',
    transition: 'border-color 0.2s, background 0.2s',
  });

  return (
    <div style={{ background: '#010104', color: '#fff', minHeight: '100vh', overflowX: 'hidden', position: 'relative' }}>
      <StarField />
      <div className="noise" aria-hidden />
      <Navbar />

      {/* HERO */}
      <section style={{ minHeight: '50vh', display: 'flex', alignItems: 'center', padding: '140px 5% 60px', position: 'relative', zIndex: 10 }}>
        <div style={{ maxWidth: '1100px', width: '100%', margin: '0 auto' }}>
          <motion.div variants={staggerContainer(0.12, 0.1)} initial="hidden" whileInView="show" viewport={{ once: false, amount: 0.15 }}>
            <motion.div variants={fadeUp} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 16px', borderRadius: 99, background: 'rgba(236,72,153,0.08)', border: '1px solid rgba(236,72,153,0.2)', color: '#f472b6', fontSize: 12, fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 28 }}>
              <motion.span animate={{ opacity: [1, 0.3, 1] }} transition={{ repeat: Infinity, duration: 2 }} style={{ width: 8, height: 8, borderRadius: '50%', background: '#ec4899', boxShadow: '0 0 10px #ec4899' }} /> We reply within 24 hours
            </motion.div>
            <motion.h1 variants={textVariant(0.1)} style={{ fontSize: 'clamp(52px, 7vw, 88px)', fontWeight: 900, lineHeight: 1.05, letterSpacing: '-0.04em', marginBottom: 24 }}>
              Get in<br />
              <span style={{ background: 'linear-gradient(90deg, #f472b6, #fb7185, #f472b6)', WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                touch.
              </span>
            </motion.h1>
            <motion.p variants={fadeUp} style={{ fontSize: 18, color: 'rgba(255,255,255,0.55)', lineHeight: 1.7, maxWidth: 560 }}>
              Questions, feedback, or business enquiries — we'd love to hear from you. Our team is small but responsive.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section style={{ padding: '40px 5% 120px', position: 'relative', zIndex: 10 }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: 48, alignItems: 'start' }}>
          
          {/* FORM */}
          <motion.div variants={staggerContainer(0.1, 0.2)} initial="hidden" whileInView="show" viewport={{ once: false, amount: 0.15 }}>
            {sent ? (
              <motion.div variants={fadeUp}>
                <Card3D style={{ padding: '60px 40px', textAlign: 'center' }} orbColor="rgba(16,185,129,0.2)">
                  <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', fontSize: 28 }}>
                    <FiSend color="#10b981" />
                  </div>
                  <h2 style={{ fontSize: 28, fontWeight: 900, marginBottom: 12 }}>Message sent!</h2>
                  <p style={{ color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, marginBottom: 28 }}>Your email client should open. We'll get back to you within 24 hours.</p>
                  <button onClick={() => setSent(false)} style={{ padding: '12px 28px', borderRadius: 99, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontWeight: 700, fontSize: 14, cursor: 'pointer' }}>
                    Send Another
                  </button>
                </Card3D>
              </motion.div>
            ) : (
              <motion.div variants={fadeUp}>
                <Card3D style={{ padding: '40px' }} orbColor="rgba(236,72,153,0.15)">
                  <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                    <div style={{ fontSize: 20, fontWeight: 800, marginBottom: 4 }}>Send a message</div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                      {[{ label: 'Your Name', key: 'name', type: 'text', placeholder: 'Dev The Legend' }, { label: 'Email Address', key: 'email', type: 'email', placeholder: 'you@example.com' }].map(({ label, key, type, placeholder }) => (
                        <div key={key} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                          <label style={{ fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: 1 }}>{label}</label>
                          <input type={type} required placeholder={placeholder} value={form[key]}
                            onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                            onFocus={() => setFocused(key)} onBlur={() => setFocused(null)}
                            style={inputStyle(key)} />
                        </div>
                      ))}
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                      <label style={{ fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: 1 }}>Subject</label>
                      <select value={form.subject} onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}
                        onFocus={() => setFocused('subject')} onBlur={() => setFocused(null)}
                        style={{ ...inputStyle('subject'), cursor: 'pointer' }}>
                        {SUBJECTS.map(s => <option key={s} value={s} style={{ background: '#0a0a0f' }}>{s}</option>)}
                      </select>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                      <label style={{ fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: 1 }}>Message</label>
                      <textarea required rows={6} placeholder="Tell us what's on your mind..."
                        value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                        onFocus={() => setFocused('message')} onBlur={() => setFocused(null)}
                        style={{ ...inputStyle('message'), resize: 'vertical', fontFamily: 'inherit' }} />
                    </div>
                    <motion.button type="submit" disabled={isSubmitting} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '16px 32px', borderRadius: 99, background: 'linear-gradient(90deg, #ec4899, #f472b6, #ec4899)', color: '#fff', fontWeight: 800, fontSize: 15, border: 'none', cursor: 'pointer', boxShadow: '0 8px 32px rgba(236,72,153,0.3)', opacity: isSubmitting ? 0.7 : 1 }}>
                      <FiSend /> {isSubmitting ? 'Sending...' : 'Send Message'}
                    </motion.button>
                  </form>
                </Card3D>
              </motion.div>
            )}
          </motion.div>

          {/* CONTACT CHANNELS */}
          <motion.div variants={staggerContainer(0.1, 0.4)} initial="hidden" whileInView="show" viewport={{ once: false, amount: 0.15 }} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <motion.div variants={textVariant(0)} style={{ fontSize: 20, fontWeight: 800, marginBottom: 4 }}>Other channels</motion.div>
            {[
              { icon: <FiMail size={22} />, label: 'Email', value: 'rexycoreofficial@gmail.com', color: '#ec4899', sub: 'Best for detailed enquiries' },
              { icon: <FiTwitter size={22} />, label: 'Twitter / X', value: '@rexycoreofficial', color: '#3B82F6', sub: 'Quick updates and announcements' },
              { icon: <FiMessageCircle size={22} />, label: 'Discord', value: 'Coming soon', color: '#a78bfa', sub: 'Community & real-time support' },
            ].map((ch, i) => (
              <motion.div key={ch.label} variants={fadeUp} style={{ marginBottom: 16 }}>
                <Card3D style={{ padding: '24px 28px', display: 'flex', gap: 20, alignItems: 'center' }} orbColor={`${ch.color}33`} delay={0}>
                  <div style={{ width: 52, height: 52, borderRadius: 14, background: `${ch.color}15`, border: `1px solid ${ch.color}33`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: ch.color, flexShrink: 0 }}>{ch.icon}</div>
                  <div>
                    <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 4 }}>{ch.label}</div>
                    <div style={{ fontSize: 16, fontWeight: 700, color: '#fff', marginBottom: 2 }}>{ch.value}</div>
                    <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>{ch.sub}</div>
                  </div>
                </Card3D>
              </motion.div>
            ))}

            {/* FAQ TEASER */}
            <motion.div variants={fadeUp}>
              <Card3D style={{ padding: '28px', marginTop: 8 }} orbColor="rgba(124,58,237,0.2)">
                <div style={{ fontSize: 16, fontWeight: 800, marginBottom: 8 }}>Looking for quick answers?</div>
                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 14, lineHeight: 1.6, marginBottom: 16 }}>Check our Academy FAQ or the product pages for common setup questions.</p>
                <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                  <a href="/academy" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '9px 18px', borderRadius: 99, background: 'rgba(124,58,237,0.1)', color: '#a78bfa', fontSize: 13, fontWeight: 700, textDecoration: 'none' }}>
                    Academy FAQ <FiArrowRight size={14} />
                  </a>
                  <a href="/products" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '9px 18px', borderRadius: 99, background: 'rgba(255,255,255,0.04)', color: '#fff', fontSize: 13, fontWeight: 700, textDecoration: 'none', border: '1px solid rgba(255,255,255,0.08)' }}>
                    Product Pages <FiArrowRight size={14} />
                  </a>
                </div>
              </Card3D>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />
      <ChatWidget />
    </div>
  );
}


