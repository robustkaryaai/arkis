'use client';
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import ChatWidget from '@/components/ChatWidget';

export default function Contact() {
    const [form, setForm] = useState({ name: '', email: '', subject: 'General', message: '' });
    const [sent, setSent] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        // TODO: wire to backend / Formspree
        window.location.href = `mailto:hello@arkis.ai?subject=${encodeURIComponent(form.subject)}&body=${encodeURIComponent(`Name: ${form.name}\n\n${form.message}`)}`;
        setSent(true);
    };

    return (
        <>
            <Navbar />

            <section className="hero" style={{ minHeight: '50vh', paddingTop: '120px', paddingBottom: '40px' }}>
                <div className="badge"><span className="dot" />We reply within 24 hours</div>
                <h1 style={{ fontSize: 'clamp(36px,6vw,72px)' }}>Get in<br /><span className="grad">touch.</span></h1>
                <p>Questions, feedback, or business enquiries — we'd love to hear from you.</p>
            </section>

            <section style={{ maxWidth: '600px', margin: '0 auto' }}>
                {sent ? (
                    <div style={{ textAlign: 'center', padding: '60px 0' }}>
                        <div style={{ fontSize: '60px', marginBottom: '24px' }}>✅</div>
                        <h2 className="section-title">Message sent!</h2>
                        <p className="section-sub" style={{ margin: '0 auto' }}>Your email client should open. We'll get back to you within 24 hours.</p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                        {[
                            { label: 'Your Name', key: 'name', type: 'text', placeholder: 'Dev The Legend' },
                            { label: 'Email Address', key: 'email', type: 'email', placeholder: 'you@example.com' },
                        ].map(({ label, key, type, placeholder }) => (
                            <div key={key} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                <label style={{ fontSize: '13px', fontWeight: '600', color: 'var(--muted)' }}>{label}</label>
                                <input type={type} required placeholder={placeholder} value={form[key]}
                                    onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                                    style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '10px', padding: '12px 16px', color: 'var(--text)', fontFamily: 'inherit', fontSize: '14px', outline: 'none' }} />
                            </div>
                        ))}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            <label style={{ fontSize: '13px', fontWeight: '600', color: 'var(--muted)' }}>Subject</label>
                            <select value={form.subject} onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}
                                style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '10px', padding: '12px 16px', color: 'var(--text)', fontFamily: 'inherit', fontSize: '14px', outline: 'none' }}>
                                {['General', 'Billing & Subscriptions', 'Technical Support', 'Business & Partnerships', 'Feature Request'].map(s => <option key={s} value={s}>{s}</option>)}
                            </select>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            <label style={{ fontSize: '13px', fontWeight: '600', color: 'var(--muted)' }}>Message</label>
                            <textarea required rows={6} placeholder="Tell us what's on your mind..." value={form.message}
                                onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                                style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '10px', padding: '12px 16px', color: 'var(--text)', fontFamily: 'inherit', fontSize: '14px', outline: 'none', resize: 'vertical' }} />
                        </div>
                        <button type="submit" className="btn-primary" style={{ alignSelf: 'flex-start', cursor: 'pointer' }}>Send Message →</button>
                    </form>
                )}

                <div style={{ display: 'flex', gap: '24px', marginTop: '60px', flexWrap: 'wrap' }}>
                    {[['📧', 'Email', 'hello@arkis.ai'], ['🐦', 'Twitter / X', '@arkisai'], ['💬', 'Discord', 'Coming soon']].map(([icon, label, val]) => (
                        <div key={label} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '20px 24px', flex: '1', minWidth: '150px' }}>
                            <div style={{ fontSize: '24px', marginBottom: '8px' }}>{icon}</div>
                            <div style={{ fontSize: '12px', color: 'var(--muted)', fontWeight: '600', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '4px' }}>{label}</div>
                            <div style={{ fontSize: '14px', fontWeight: '500' }}>{val}</div>
                        </div>
                    ))}
                </div>
            </section>

            <footer style={{ marginTop: '80px' }}>
                <span className="logo"><span>ARKIS</span></span>
                <span>© 2026 ARKIS. All rights reserved.</span>
                <a href="mailto:hello@arkis.ai">hello@arkis.ai</a>
            </footer>

            <ChatWidget />
        </>
    );
}
