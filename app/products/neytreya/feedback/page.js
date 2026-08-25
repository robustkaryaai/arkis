'use client';
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import ChatWidget from '@/components/ChatWidget';
import Footer from '@/components/Footer';
import BackButton from '@/components/BackButton';
import Link from 'next/link';
import { FiSend, FiArrowRight, FiHeart, FiAlertCircle, FiStar, FiMessageCircle, FiCpu } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { StarField, Card3D, staggerContainer, textVariant, fadeUp } from '@/components/SpaceUI';

const AC = '#10b981';
const ACB = '#34d399';

const CATEGORIES = [
  'General Feedback',
  'Bug Report',
  'Feature Request',
  'Performance Issue',
  'Privacy Concern',
  'Recall / Timeline',
  'Vision Engine (Ollama)',
  'Audio Recall',
  'Settings & Controls',
  'Other',
];

const RATINGS = [
  { value: '5', label: 'Love it', color: '#10b981' },
  { value: '4', label: 'Pretty good', color: '#34d399' },
  { value: '3', label: 'Okay', color: '#f59e0b' },
  { value: '2', label: 'Needs work', color: '#f97316' },
  { value: '1', label: 'Not great', color: '#f43f5e' },
];

const CHANNELS = [
  { icon: <FiAlertCircle size={22} />, label: 'Bug Reports', value: 'rexycoreofficial@gmail.com', color: '#f43f5e', sub: 'Critical bugs — email with logs attached' },
  { icon: <FiMessageCircle size={22} />, label: 'Discord', value: 'Coming soon', color: '#a78bfa', sub: 'Community support & feature discussions' },
  { icon: <FiStar size={22} />, label: 'Feature Requests', value: 'Use the form \u2192', color: '#34d399', sub: 'Tag category as "Feature Request"' },
];

export default function NeytreyaFeedback() {
  const [form, setForm] = useState({ name: '', email: '', category: 'General Feedback', rating: '', message: '', version: 'v1.0.0 (Beta)' });
  const [sent, setSent] = useState(false);
  const [focused, setFocused] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const { submitFeedback } = await import('@/lib/api');
      await submitFeedback({ ...form, product: 'neytreya' });
      setSent(true);
    } catch (err) {
      console.error(err);
      alert('Failed to send feedback. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputStyle = (key) => ({
    background: focused === key ? 'rgba(16,185,129,0.06)' : 'rgba(255,255,255,0.02)',
    border: `1px solid ${focused === key ? 'rgba(16,185,129,0.5)' : 'rgba(255,255,255,0.08)'}`,
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
      <BackButton href="/products/neytreya" label="Neytreya" />
      <Navbar />

      <div style={{ position: 'fixed', top: 100, left: '5%', width: 500, height: 500, background: 'radial-gradient(circle, rgba(16,185,129,0.08), transparent 70%)', pointerEvents: 'none', filter: 'blur(60px)', zIndex: 0 }} />
      <div style={{ position: 'fixed', top: 200, right: '5%', width: 350, height: 350, background: 'radial-gradient(circle, rgba(52,211,153,0.05), transparent 70%)', pointerEvents: 'none', filter: 'blur(40px)', zIndex: 0 }} />

      {/* HERO */}
      <section style={{ minHeight: '50vh', display: 'flex', alignItems: 'center', padding: '140px 5% 60px', position: 'relative', zIndex: 10 }}>
        <div style={{ maxWidth: '1100px', width: '100%', margin: '0 auto' }}>
          <motion.div variants={staggerContainer(0.12, 0.1)} initial="hidden" whileInView="show" viewport={{ once: false, amount: 0.15 }}>
            <motion.div variants={fadeUp} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 16px', borderRadius: 99, background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.25)', color: ACB, fontSize: 12, fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 28 }}>
              <motion.span animate={{ opacity: [1, 0.3, 1] }} transition={{ repeat: Infinity, duration: 2 }} style={{ width: 8, height: 8, borderRadius: '50%', background: AC, boxShadow: '0 0 10px #10b981' }} />
              Neytreya Beta &middot; Shape What&apos;s Next
            </motion.div>
            <motion.h1 variants={textVariant(0.1)} style={{ fontSize: 'clamp(52px, 7vw, 88px)', fontWeight: 900, lineHeight: 1.05, letterSpacing: '-0.04em', marginBottom: 24 }}>
              Tell us what<br />
              <span style={{ background: 'linear-gradient(90deg, #10b981, #34d399, #10b981)', WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                you think.
              </span>
            </motion.h1>
            <motion.p variants={fadeUp} style={{ fontSize: 18, color: 'rgba(255,255,255,0.55)', lineHeight: 1.7, maxWidth: 560 }}>
              Neytreya is in Beta and your feedback directly shapes what gets built next. Bugs, ideas, things you love &mdash; all of it matters.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section style={{ padding: '60px 5% 140px', position: 'relative', zIndex: 10 }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', gap: 64, alignItems: 'start' }}>

          {/* FORM */}
          <motion.div variants={staggerContainer(0.1, 0.2)} initial="hidden" whileInView="show" viewport={{ once: false, amount: 0.15 }}>
            {sent ? (
              <motion.div variants={fadeUp}>
                <Card3D style={{ padding: '60px 40px', textAlign: 'center' }} orbColor="rgba(16,185,129,0.2)">
                  <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', fontSize: 28 }}>
                    <FiHeart color="#10b981" />
                  </div>
                  <h2 style={{ fontSize: 28, fontWeight: 900, marginBottom: 12 }}>Thank you!</h2>
                  <p style={{ color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, marginBottom: 28 }}>
                    Your feedback has been received. We read every single submission and it directly influences what we build next for Neytreya.
                  </p>
                  <button onClick={() => setSent(false)} style={{ padding: '12px 28px', borderRadius: 99, background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.3)', color: '#34d399', fontWeight: 700, fontSize: 14, cursor: 'pointer' }}>
                    Send More Feedback
                  </button>
                </Card3D>
              </motion.div>
            ) : (
              <motion.div variants={fadeUp}>
                <Card3D style={{ padding: '40px' }} orbColor="rgba(16,185,129,0.15)">
                  <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    <div style={{ fontSize: 20, fontWeight: 800, marginBottom: 4 }}>Send Feedback</div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                      {[
                        { label: 'Your Name (optional)', key: 'name', type: 'text', placeholder: 'Dev The Legend' },
                        { label: 'Email (optional)', key: 'email', type: 'email', placeholder: 'you@example.com' },
                      ].map(({ label, key, type, placeholder }) => (
                        <div key={key} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                          <label style={{ fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: 1 }}>{label}</label>
                          <input type={type} placeholder={placeholder} value={form[key]}
                            onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                            onFocus={() => setFocused(key)} onBlur={() => setFocused(null)}
                            style={inputStyle(key)} />
                        </div>
                      ))}
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                      <label style={{ fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: 1 }}>Category</label>
                      <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
                        onFocus={() => setFocused('category')} onBlur={() => setFocused(null)}
                        style={{ ...inputStyle('category'), cursor: 'pointer' }}>
                        {CATEGORIES.map(c => <option key={c} value={c} style={{ background: '#0a0a0f' }}>{c}</option>)}
                      </select>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                      <label style={{ fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: 1 }}>Overall Rating</label>
                      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                        {RATINGS.map(r => (
                          <button key={r.value} type="button" onClick={() => setForm(f => ({ ...f, rating: r.value }))}
                            style={{
                              padding: '8px 14px', borderRadius: 99, fontSize: 13, fontWeight: 700, cursor: 'pointer',
                              background: form.rating === r.value ? `${r.color}20` : 'rgba(255,255,255,0.03)',
                              border: `1px solid ${form.rating === r.value ? r.color : 'rgba(255,255,255,0.08)'}`,
                              color: form.rating === r.value ? r.color : 'rgba(255,255,255,0.5)',
                              transition: 'all 0.15s',
                            }}>
                            {r.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                      <label style={{ fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: 1 }}>Neytreya Version</label>
                      <select value={form.version} onChange={e => setForm(f => ({ ...f, version: e.target.value }))}
                        onFocus={() => setFocused('version')} onBlur={() => setFocused(null)}
                        style={{ ...inputStyle('version'), cursor: 'pointer' }}>
                        {['v1.0.0 (Beta)', 'Other'].map(v => <option key={v} value={v} style={{ background: '#0a0a0f' }}>{v}</option>)}
                      </select>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                      <label style={{ fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: 1 }}>Your Feedback *</label>
                      <textarea required rows={6} placeholder="Tell us what you think, what broke, or what you'd love to see..."
                        value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                        onFocus={() => setFocused('message')} onBlur={() => setFocused(null)}
                        style={{ ...inputStyle('message'), resize: 'vertical', fontFamily: 'inherit' }} />
                    </div>

                    <motion.button type="submit" disabled={isSubmitting} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                      style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '16px 32px', borderRadius: 99, background: 'linear-gradient(90deg, #10b981, #34d399, #10b981)', color: '#000', fontWeight: 800, fontSize: 15, border: 'none', cursor: 'pointer', boxShadow: '0 8px 32px rgba(16,185,129,0.35)', opacity: isSubmitting ? 0.7 : 1 }}>
                      <FiSend /> {isSubmitting ? 'Sending...' : 'Send Feedback'}
                    </motion.button>
                  </form>
                </Card3D>
              </motion.div>
            )}
          </motion.div>

          {/* RIGHT COLUMN */}
          <motion.div variants={staggerContainer(0.1, 0.4)} initial="hidden" whileInView="show" viewport={{ once: false, amount: 0.15 }} style={{ display: 'flex', flexDirection: 'column' }}>
            <motion.div variants={textVariant(0)} style={{ fontSize: 20, fontWeight: 800, marginBottom: 24 }}>Other ways to reach us</motion.div>

            {CHANNELS.map((ch) => (
              <motion.div key={ch.label} variants={fadeUp} style={{ marginBottom: 16 }}>
                <Card3D style={{ padding: '24px 28px', display: 'flex', gap: 20, alignItems: 'center' }} orbColor={`${ch.color}33`}>
                  <div style={{ width: 52, height: 52, borderRadius: 14, background: `${ch.color}15`, border: `1px solid ${ch.color}33`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: ch.color, flexShrink: 0 }}>{ch.icon}</div>
                  <div>
                    <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 4 }}>{ch.label}</div>
                    <div style={{ fontSize: 16, fontWeight: 700, color: '#fff', marginBottom: 2 }}>{ch.value}</div>
                    <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>{ch.sub}</div>
                  </div>
                </Card3D>
              </motion.div>
            ))}

            <motion.div variants={fadeUp} style={{ marginTop: 8 }}>
              <Card3D style={{ padding: '32px' }} orbColor="rgba(16,185,129,0.2)">
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(16,185,129,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#34d399' }}>
                    <FiCpu size={18} />
                  </div>
                  <div style={{ fontSize: 16, fontWeight: 800 }}>What happens to your feedback?</div>
                </div>
                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 14, lineHeight: 1.7, marginBottom: 16 }}>
                  Every submission is reviewed by the core team. Bug reports go into the fix queue immediately. Feature requests are discussed and the most requested ones ship first.
                </p>
                <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                  <Link href="/products/neytreya/learn-more" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '9px 18px', borderRadius: 99, background: 'rgba(16,185,129,0.08)', color: '#34d399', fontSize: 13, fontWeight: 700, textDecoration: 'none', border: '1px solid rgba(16,185,129,0.2)' }}>
                    Deep Dive <FiArrowRight size={14} />
                  </Link>
                  <Link href="/products/neytreya" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '9px 18px', borderRadius: 99, background: 'rgba(255,255,255,0.04)', color: '#fff', fontSize: 13, fontWeight: 700, textDecoration: 'none', border: '1px solid rgba(255,255,255,0.08)' }}>
                    Back to Neytreya <FiArrowRight size={14} />
                  </Link>
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
