'use client';
import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import ChatWidget from '@/components/ChatWidget';
import Footer from '@/components/Footer';

export default function Suggest() {
    const [form, setForm] = useState({ name: '', email: '', feature: '', impact: '' });
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
        window.location.href = `mailto:rkai.official@gmail.com?subject=Feature Request: ${encodeURIComponent(form.feature)}&body=${encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\nFeature: ${form.feature}\n\nExpected Impact:\n${form.impact}`)}`;
        setSent(true);
    };

    return (
        <div style={{ background: 'var(--background)', color: 'var(--text)', minHeight: '100vh' }}>
            <Navbar />

            <section className="hero" style={{ minHeight: '50vh', paddingTop: '120px', paddingBottom: '40px', textAlign: 'center' }}>
                <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                    <div className="badge float-anim" style={{ margin: '0 auto 16px' }}><span className="dot" />Shape the Future</div>
                    <h1 style={{ fontSize: 'clamp(36px,6vw,72px)', lineHeight: '1.2' }}>Suggest a<br /><span className="grad">Feature.</span></h1>
                    <p style={{ fontSize: '1.2rem', opacity: 0.8, marginTop: '20px' }}>Your ideas power RK AI Home. Tell us what you want to see built next.</p>
                </div>
            </section>

            <section style={{ maxWidth: '800px', margin: '0 auto', padding: '40px 5%' }}>
                <div className="reveal">
                    {sent ? (
                        <div style={{ textAlign: 'center', padding: '60px 0' }}>
                            <div style={{ fontSize: '60px', marginBottom: '24px' }}>🚀</div>
                            <h2 className="section-title">Idea submitted!</h2>
                            <p className="section-sub" style={{ margin: '0 auto' }}>Your email client should open. The engineering team reads every submission.</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px', background: 'var(--surface)', border: '1px solid var(--border)', padding: '40px', borderRadius: '24px' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
                                {[
                                    { label: 'Your Name', key: 'name', type: 'text', placeholder: 'Tony Stark' },
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
                                <label style={{ fontSize: '13px', fontWeight: '600', color: 'var(--muted)' }}>Feature Idea</label>
                                <input type="text" required placeholder="e.g. Integrate with smart blinds" value={form.feature}
                                    onChange={e => setForm(f => ({ ...f, feature: e.target.value }))}
                                    style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', borderRadius: '12px', padding: '14px 18px', color: 'var(--text)', fontFamily: 'inherit', fontSize: '14px', outline: 'none' }} />
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                <label style={{ fontSize: '13px', fontWeight: '600', color: 'var(--muted)' }}>How would this impact your daily life?</label>
                                <textarea required rows={6} placeholder="Tell us how you would use it..." value={form.impact}
                                    onChange={e => setForm(f => ({ ...f, impact: e.target.value }))}
                                    style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', borderRadius: '12px', padding: '14px 18px', color: 'var(--text)', fontFamily: 'inherit', fontSize: '14px', outline: 'none', resize: 'vertical' }} />
                            </div>
                            <button type="submit" className="btn-primary" style={{ alignSelf: 'flex-start', cursor: 'pointer', padding: '16px 40px' }}>Submit Idea →</button>
                        </form>
                    )}
                </div>
            </section>

            <Footer />
            <ChatWidget />
        </div>
    );
}
