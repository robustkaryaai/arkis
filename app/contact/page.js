'use client';
import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import ChatWidget from '@/components/ChatWidget';

export default function Contact() {
    const [form, setForm] = useState({ name: '', email: '', subject: 'General', message: '' });
    const [sent, setSent] = useState(false);

    useEffect(() => {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        window.location.href = `mailto:rkai.official@gmail.com?subject=${encodeURIComponent(form.subject)}&body=${encodeURIComponent(`Name: ${form.name}\n\n${form.message}`)}`;
        setSent(true);
    };

    return (
        <div style={{ background: 'var(--background)', color: 'var(--text)', minHeight: '100vh' }}>
            <Navbar />

            <section className="hero" style={{ minHeight: '50vh', paddingTop: '120px', paddingBottom: '40px', textAlign: 'center' }}>
                <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                    <div className="badge float-anim" style={{ margin: '0 auto 16px' }}><span className="dot" />We reply within 24 hours</div>
                    <h1 style={{ fontSize: 'clamp(36px,6vw,72px)', lineHeight: '1.2' }}>Get in<br /><span className="grad">touch.</span></h1>
                    <p style={{ fontSize: '1.2rem', opacity: 0.8, marginTop: '20px' }}>Questions, feedback, or business enquiries — we'd love to hear from you.</p>
                </div>
            </section>

            <section style={{ maxWidth: '800px', margin: '0 auto', padding: '40px 5%' }}>
                <div className="reveal">
                    {sent ? (
                        <div style={{ textAlign: 'center', padding: '60px 0' }}>
                            <div style={{ fontSize: '60px', marginBottom: '24px' }}>✅</div>
                            <h2 className="section-title">Message sent!</h2>
                            <p className="section-sub" style={{ margin: '0 auto' }}>Your email client should open. We'll get back to you within 24 hours.</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px', background: 'var(--surface)', border: '1px solid var(--border)', padding: '40px', borderRadius: '24px' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
                                {[
                                    { label: 'Your Name', key: 'name', type: 'text', placeholder: 'Dev The Legend' },
                                    { label: 'Email Address', key: 'email', type: 'email', placeholder: 'you@example.com' },
                                ].map(({ label, key, type, placeholder }) => (
                                    <div key={key} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                        <label style={{ fontSize: '13px', fontWeight: '600', color: 'var(--muted)' }}>{label}</label>
                                        <input type={type} required placeholder={placeholder} value={form[key]}
                                            onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                                            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', borderRadius: '12px', padding: '14px 18px', color: 'var(--text)', fontFamily: 'inherit', fontSize: '14px', outline: 'none' }} />
                                    </div>
                                ))}
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                <label style={{ fontSize: '13px', fontWeight: '600', color: 'var(--muted)' }}>Subject</label>
                                <select value={form.subject} onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}
                                    style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', borderRadius: '12px', padding: '14px 18px', color: 'var(--text)', fontFamily: 'inherit', fontSize: '14px', outline: 'none' }}>
                                    {['General', 'Billing & Subscriptions', 'Technical Support', 'Business & Partnerships', 'Feature Request'].map(s => <option key={s} value={s}>{s}</option>)}
                                </select>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                <label style={{ fontSize: '13px', fontWeight: '600', color: 'var(--muted)' }}>Message</label>
                                <textarea required rows={6} placeholder="Tell us what's on your mind..." value={form.message}
                                    onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                                    style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', borderRadius: '12px', padding: '14px 18px', color: 'var(--text)', fontFamily: 'inherit', fontSize: '14px', outline: 'none', resize: 'vertical' }} />
                            </div>
                            <button type="submit" className="btn-primary" style={{ alignSelf: 'flex-start', cursor: 'pointer', padding: '16px 40px' }}>Send Message →</button>
                        </form>
                    )}
                </div>

                <div style={{ display: 'flex', gap: '24px', marginTop: '60px', flexWrap: 'wrap' }}>
                    {[['📧', 'Email', 'rkai.official@gmail.com'], ['🐦', 'Twitter / X', '@rkai'], ['💬', 'Discord', 'Coming soon']].map(([icon, label, val], i) => (
                        <div key={label} className={`reveal reveal-delay-${i + 1}`} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '24px', flex: '1', minWidth: '220px' }}>
                            <div style={{ fontSize: '32px', marginBottom: '12px' }}>{icon}</div>
                            <div style={{ fontSize: '12px', color: 'var(--muted)', fontWeight: '700', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '6px' }}>{label}</div>
                            <div style={{ fontSize: '15px', fontWeight: '600' }}>{val}</div>
                        </div>
                    ))}
                </div>
            </section>

            <footer className="reveal" style={{ padding: '60px 5%', textAlign: 'center', borderTop: '1px solid var(--border)' }}>
                <span className="logo" style={{ fontSize: '24px', fontWeight: '800' }}><span>ARKIS</span></span>
                <p style={{ color: 'var(--muted)', marginTop: '12px' }}>© 2026 ARKIS. All rights reserved.</p>
                <a href="mailto:arkisglobal.official@gmail.com" style={{ color: 'var(--blue)', textDecoration: 'none' }}>arkisglobal.official@gmail.com</a>
            </footer>

            <ChatWidget />
        </div>
    );
}
