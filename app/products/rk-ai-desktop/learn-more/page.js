'use client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ChatWidget from '@/components/ChatWidget';
import Link from 'next/link';
import { FiArrowRight, FiShield, FiCpu, FiEye, FiZap, FiBox, FiTerminal, FiDatabase } from 'react-icons/fi';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const stats = [
  { label: 'Local-first AI', value: '100%', icon: <FiShield size={28} /> },
  { label: 'Private workflows', value: 'Zero Cloud', icon: <FiCpu size={28} /> },
  { label: 'Latency reduction', value: '3x faster', icon: <FiZap size={28} /> },
  { label: 'Screens processed', value: 'Live & Secure', icon: <FiEye size={28} /> },
];

const features = [
  { title: 'System Automation', desc: 'Natural language control for apps, files, and workflows across Windows, macOS, and Linux.', icon: <FiTerminal size={24} /> },
  { title: 'Smart Documents', desc: 'Generate PPTX, DOCX, reports and briefs instantly, with local AI privacy.', icon: <FiBox size={24} /> },
  { title: 'Voice & Chat', desc: 'Offline voice commands, assistant chat, and hands-free productivity built into your desktop.', icon: <FiDatabase size={24} /> },
  { title: 'Privacy First', desc: 'All processing remains on your machine by default. No hidden cloud telemetry.', icon: <FiShield size={24} /> },
];

const journeyHighlights = [
  { title: 'Local AI Engine', desc: 'RK AI runs models natively on your computer using Ollama and local GPU/CPU acceleration, eliminating latency.', year: 'Phase 1' },
  { title: 'Deep System Reach', desc: 'Integrated directly into file search, task automation, and screen understanding for unparalleled desktop control.', year: 'Phase 2' },
  { title: 'Multi-modal Workflows', desc: 'Seamlessly combine voice, text, documents, and system automation into one continuous intelligent workflow.', year: 'Phase 3' },
  { title: 'Global Scale', desc: 'Designed and shipped from India, built specifically for high-performance global professionals and creators.', year: 'Phase 4' },
];

export default function RKDesktopLearnMore() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const yBg = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <div style={{ background: 'var(--background)', color: 'var(--text)', minHeight: '100vh', overflowX: 'hidden' }}>
      <Navbar />

      <main style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px 80px', position: 'relative' }}>
        
        {/* Background Glows */}
        <div style={{ position: 'absolute', top: '10%', left: '50%', transform: 'translate(-50%, -50%)', width: '1000px', height: '1000px', background: 'radial-gradient(circle, rgba(79, 156, 249, 0.08) 0%, transparent 60%)', pointerEvents: 'none', zIndex: 0 }} />
        <div style={{ position: 'absolute', bottom: '20%', right: '-20%', width: '1200px', height: '1200px', background: 'radial-gradient(circle, rgba(155, 89, 245, 0.06) 0%, transparent 60%)', pointerEvents: 'none', zIndex: 0 }} />

        {/* HERO SECTION */}
        <section className="hero" style={{ position: 'relative', zIndex: 1, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '60px', alignItems: 'center', padding: '140px 0 80px' }}>
          <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, ease: "easeOut" }}>
            <div className="badge float-anim" style={{ marginBottom: '24px' }}>
                <span className="dot" style={{ background: 'var(--blue)' }} /> RK AI Desktop — Learn More
            </div>
            <h1 style={{ fontSize: 'clamp(48px, 6vw, 84px)', lineHeight: '1.05', marginBottom: '24px', fontWeight: '900', letterSpacing: '-2px' }}>
              Meet the AI layer for your <span className="grad">computer.</span>
            </h1>
            <p style={{ fontSize: '20px', lineHeight: '1.8', color: 'var(--muted)', marginBottom: '40px', maxWidth: '600px' }}>
              RK AI Desktop brings local-first intelligence to Windows, macOS, and Linux.
              It combines offline voice, contextual chat, document generation, system automation,
              and smart desktop workflows—all while keeping your data strictly private.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
              <Link href="#why-rk-ai" className="btn-primary" style={{ padding: '18px 36px', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '16px' }}>
                Why RK AI? <FiArrowRight size={20} />
              </Link>
              <Link href="/products/rk-ai-desktop" className="btn-secondary" style={{ padding: '18px 36px', fontSize: '16px' }}>
                Back to Product
              </Link>
            </div>
          </motion.div>

          <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 30 }} 
              animate={{ opacity: 1, scale: 1, y: 0 }} 
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              style={{ 
              background: 'var(--surface)', 
              border: '1px solid var(--border)', 
              borderRadius: '40px', 
              minHeight: '480px', padding: '60px', display: 'flex', flexDirection: 'column', 
              justifyContent: 'center', position: 'relative', overflow: 'hidden',
              boxShadow: '0 40px 80px rgba(0,0,0,0.5), inset 0 0 60px rgba(79, 156, 249, 0.15)'
          }}>
            <div style={{ 
                position: 'absolute', top: '-20%', right: '-20%', width: '400px', height: '400px', 
                background: 'radial-gradient(circle, rgba(79, 156, 249, 0.25) 0%, transparent 70%)', 
                pointerEvents: 'none', filter: 'blur(40px)'
            }} />
            
            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{ display: 'inline-flex', background: 'rgba(255,255,255,0.08)', color: '#d1d5db', padding: '10px 16px', borderRadius: '999px', fontSize: '12px', fontWeight: '800', marginBottom: '24px', letterSpacing: '2px', textTransform: 'uppercase' }}>
                Trusted by creators & teams
              </div>
              <div style={{ fontSize: '56px', fontWeight: '900', marginBottom: '20px', lineHeight: '1', letterSpacing: '-1px' }}>AI Desktop</div>
              <p style={{ color: 'var(--muted)', lineHeight: '1.7', fontSize: '18px', marginBottom: '40px' }}>
                Local-first assistant for professional workflows, code, content, and automation.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', fontSize: '14px', color: '#999', fontWeight: '700' }}>
                <span style={{ padding: '8px 16px', background: 'rgba(0,0,0,0.4)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>macOS • Windows • Linux</span>
                <span style={{ padding: '8px 16px', background: 'rgba(0,0,0,0.4)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>Private by default</span>
              </div>
            </div>
          </motion.div>
        </section>

        {/* TRUST GRID */}
        <section id="why-rk-ai" style={{ position: 'relative', zIndex: 1, padding: '100px 0' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px' }}>
            {stats.map((item, i) => (
              <motion.div 
                key={item.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                whileHover={{ y: -5, borderColor: 'rgba(79, 156, 249, 0.4)' }}
                className="feature-card" style={{ 
                  background: 'var(--surface)', border: '1px solid var(--border)', 
                  borderRadius: '32px', padding: '40px', display: 'flex', flexDirection: 'column', gap: '20px',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
              }}>
                <div style={{ width: '64px', height: '64px', borderRadius: '16px', background: 'linear-gradient(135deg, rgba(79, 156, 249, 0.1), rgba(79, 156, 249, 0.05))', border: '1px solid rgba(79,156,249,0.2)', color: 'var(--blue)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {item.icon}
                </div>
                <strong style={{ fontSize: '42px', fontWeight: '900', letterSpacing: '-1px' }}>{item.value}</strong>
                <p style={{ color: 'var(--muted)', margin: 0, fontWeight: '700', fontSize: '18px' }}>{item.label}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* HUGE TIMELINE JOURNEY */}
        <section style={{ position: 'relative', zIndex: 1, padding: '140px 0' }}>
          <div style={{ marginBottom: '80px', textAlign: 'center' }}>
            <span style={{ display: 'inline-block', color: 'var(--blue)', fontWeight: '900', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '16px' }}>Evolution</span>
            <h2 style={{ fontSize: 'clamp(40px, 5vw, 64px)', fontWeight: '900', margin: 0, letterSpacing: '-1.5px' }}>The RK AI Journey.</h2>
            <p style={{ color: 'var(--muted)', fontSize: '20px', maxWidth: '700px', margin: '24px auto 0', lineHeight: '1.7' }}>
              How we built the ultimate intelligent layer for your operating system, phase by phase.
            </p>
          </div>
          
          <div style={{ position: 'relative', maxWidth: '1000px', margin: '0 auto' }}>
            {/* The animated center line */}
            <motion.div 
              initial={{ height: 0 }}
              whileInView={{ height: '100%' }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              style={{ 
                position: 'absolute', top: 0, bottom: 0, left: '50%', transform: 'translateX(-50%)', 
                width: '4px', background: 'linear-gradient(to bottom, transparent, var(--blue), var(--violet), transparent)',
                borderRadius: '4px', zIndex: 0
              }} 
            />

            <div style={{ display: 'flex', flexDirection: 'column', gap: '60px' }}>
              {journeyHighlights.map((item, index) => {
                const isEven = index % 2 === 0;
                return (
                  <motion.div 
                    key={item.title}
                    initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    style={{ 
                      display: 'flex', 
                      justifyContent: isEven ? 'flex-start' : 'flex-end',
                      position: 'relative', zIndex: 1, width: '100%'
                    }}
                  >
                    {/* The connector dot */}
                    <div style={{
                      position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                      width: '24px', height: '24px', borderRadius: '50%', background: 'var(--background)',
                      border: '6px solid var(--blue)', boxShadow: '0 0 20px rgba(79, 156, 249, 0.6)', zIndex: 2
                    }} />

                    {/* The Card */}
                    <div className="feature-card" style={{ 
                      width: 'calc(50% - 60px)', padding: '48px', borderRadius: '32px', 
                      background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)',
                      backdropFilter: 'blur(20px)', position: 'relative', overflow: 'hidden'
                    }}>
                      <div style={{ position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', background: 'linear-gradient(to bottom, var(--blue), var(--violet))' }} />
                      <span style={{ display: 'inline-block', padding: '6px 14px', borderRadius: '8px', background: 'rgba(79, 156, 249, 0.1)', color: 'var(--blue)', fontSize: '13px', fontWeight: '800', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '20px' }}>
                        {item.year}
                      </span>
                      <h3 style={{ fontSize: '28px', fontWeight: '900', marginBottom: '16px', letterSpacing: '-0.5px' }}>{item.title}</h3>
                      <p style={{ color: '#aaa', lineHeight: '1.8', margin: 0, fontSize: '16px' }}>{item.desc}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
            style={{ display: 'flex', flexWrap: 'wrap', gap: '32px', justifyContent: 'center', marginTop: '100px' }}
          >
            <Link href="/journey/lumina-os" className="feature-card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', maxWidth: '400px', padding: '36px', borderRadius: '32px', background: 'var(--surface)', border: '1px solid rgba(79,156,249,0.2)', textDecoration: 'none', color: 'inherit' }}>
              <div>
                <strong style={{ display: 'block', fontSize: '20px', fontWeight: '800', marginBottom: '8px' }}>Lumina OS Story</strong>
                <p style={{ margin: 0, fontSize: '15px', color: 'var(--muted)' }}>See how our OS journey shaped RK AI.</p>
              </div>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(79,156,249,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <FiArrowRight size={24} color="var(--blue)" />
              </div>
            </Link>
            <Link href="/journey/light-key" className="feature-card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', maxWidth: '400px', padding: '36px', borderRadius: '32px', background: 'var(--surface)', border: '1px solid rgba(79,156,249,0.2)', textDecoration: 'none', color: 'inherit' }}>
              <div>
                <strong style={{ display: 'block', fontSize: '20px', fontWeight: '800', marginBottom: '8px' }}>Light Key Path</strong>
                <p style={{ margin: 0, fontSize: '15px', color: 'var(--muted)' }}>How intelligent input defined our workflow.</p>
              </div>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(79,156,249,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <FiArrowRight size={24} color="var(--blue)" />
              </div>
            </Link>
          </motion.div>
        </section>

        {/* FEATURES GRID COMPONENTIZED */}
        <section style={{ position: 'relative', zIndex: 1, padding: '100px 0' }}>
          <div style={{ marginBottom: '80px', textAlign: 'center' }}>
            <span style={{ display: 'inline-block', color: 'var(--blue)', fontWeight: '800', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '12px' }}>Core strengths</span>
            <h2 style={{ fontSize: 'clamp(40px, 5vw, 64px)', fontWeight: '900', margin: 0, letterSpacing: '-1.5px' }}>What RK AI Desktop gives you.</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px' }}>
            {features.map((feature, i) => (
              <motion.div 
                key={feature.title}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="feature-card" style={{ 
                  padding: '48px', borderRadius: '32px', background: 'rgba(255,255,255,0.01)', 
                  border: '1px solid rgba(255,255,255,0.06)', backdropFilter: 'blur(10px)',
                  display: 'flex', flexDirection: 'column', gap: '20px'
              }}>
                <div style={{ width: '56px', height: '56px', borderRadius: '16px', background: 'rgba(255,255,255,0.05)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {feature.icon}
                </div>
                <h3 style={{ fontSize: '26px', fontWeight: '900', margin: 0 }}>{feature.title}</h3>
                <p style={{ color: 'var(--muted)', lineHeight: '1.7', margin: 0, fontSize: '16px' }}>{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CHARTS */}
        <section style={{ position: 'relative', zIndex: 1, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))', gap: '80px', alignItems: 'center', padding: '140px 0' }}>
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <span style={{ display: 'block', color: 'var(--blue)', fontWeight: '800', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '16px' }}>Performance snapshot</span>
            <h2 style={{ fontSize: 'clamp(40px, 5vw, 64px)', fontWeight: '900', marginBottom: '32px', lineHeight: '1.1', letterSpacing: '-1.5px' }}>Designed to accelerate your workflow.</h2>
            <p style={{ color: 'var(--muted)', lineHeight: '1.8', fontSize: '20px' }}>
              RK AI Desktop lowers friction by keeping analytics and automation local, so actions happen instantly,
              files stay private, and AI can work directly with your screen context.
            </p>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}
          >
            {[
                { label: 'Task completion speed', detail: 'Up to 3x faster than cloud-only assistants', progress: '80%', color: 'var(--blue)' },
                { label: 'Privacy compliance', detail: 'Data stays on your machine permanently', progress: '96%', color: '#22c55e' },
                { label: 'Uptime and availability', detail: 'Always ready, even when offline', progress: '92%', color: 'var(--violet)' }
            ].map((chart, i) => (
                <div key={i} className="feature-card" style={{ padding: '40px', borderRadius: '32px', background: 'var(--surface)', border: '1px solid var(--border)' }}>
                    <span style={{ display: 'block', fontWeight: '900', marginBottom: '20px', fontSize: '18px' }}>{chart.label}</span>
                    <div style={{ width: '100%', height: '16px', background: 'rgba(255,255,255,0.06)', borderRadius: '999px', overflow: 'hidden', marginBottom: '20px' }}>
                        <motion.div 
                            initial={{ width: 0 }} whileInView={{ width: chart.progress }} viewport={{ once: true }} transition={{ duration: 1.5, delay: 0.3 }}
                            style={{ height: '100%', background: chart.color, borderRadius: '999px', boxShadow: `0 0 20px ${chart.color}66` }} 
                        />
                    </div>
                    <small style={{ color: 'var(--muted)', fontWeight: '700', fontSize: '14px' }}>{chart.detail}</small>
                </div>
            ))}
          </motion.div>
        </section>

        {/* MEDIA */}
        <section style={{ position: 'relative', zIndex: 1, padding: '140px 0' }}>
          <div style={{ marginBottom: '80px', maxWidth: '800px', margin: '0 auto 80px', textAlign: 'center' }}>
            <span style={{ display: 'inline-block', color: 'var(--blue)', fontWeight: '800', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '16px' }}>Media</span>
            <h2 style={{ fontSize: 'clamp(40px, 5vw, 64px)', fontWeight: '900', marginBottom: '24px', letterSpacing: '-1.5px' }}>Interactive preview.</h2>
            <p style={{ color: 'var(--muted)', lineHeight: '1.8', fontSize: '20px' }}>
              Watch how RK AI Desktop acts like a creative partner, managing documents, voice workflows, and automation across apps.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '40px' }}>
            <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
                className="feature-card" style={{ borderRadius: '40px', border: '1px solid var(--border)', overflow: 'hidden', background: 'var(--surface)', position: 'relative', padding: 0 }}>
              <video autoPlay muted loop playsInline style={{ width: '100%', height: '540px', objectFit: 'cover', display: 'block' }}>
                <source src="/rk-ai-home-images/img_2565.mov" type="video/quicktime" />
              </video>
              <div style={{ position: 'absolute', bottom: '32px', left: '32px', padding: '12px 24px', background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(20px)', borderRadius: '999px', fontSize: '14px', fontWeight: '800', letterSpacing: '1px' }}>DEMO PREVIEW</div>
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }}
                className="feature-card" style={{ borderRadius: '40px', border: '1px solid var(--border)', background: 'linear-gradient(135deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01))', padding: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div>
                <span style={{ display: 'block', fontSize: '40px', fontWeight: '900', lineHeight: '1.3', marginBottom: '40px', letterSpacing: '-1px' }}>
                  “RK AI Desktop feels like a local companion, not another cloud app.”
                </span>
                <p style={{ color: 'var(--blue)', fontWeight: '800', margin: 0, fontSize: '18px', textTransform: 'uppercase', letterSpacing: '1px' }}>— Early Access Creator</p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* CTA */}
        <section style={{ position: 'relative', zIndex: 1, padding: '100px 0 40px' }}>
          <motion.div 
              initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
              style={{ 
              display: 'flex', flexWrap: 'wrap', gap: '60px', alignItems: 'center', justifyContent: 'space-between', 
              padding: '100px 80px', borderRadius: '48px', background: 'var(--surface)', 
              border: '1px solid rgba(79, 156, 249, 0.3)',
              boxShadow: '0 60px 100px rgba(0,0,0,0.5), inset 0 0 80px rgba(79, 156, 249, 0.1)'
          }}>
            <div style={{ flex: '1 1 400px' }}>
              <h2 style={{ fontSize: 'clamp(40px, 5vw, 56px)', fontWeight: '900', marginBottom: '24px', letterSpacing: '-1.5px' }}>Want a faster, smarter desktop?</h2>
              <p style={{ color: 'var(--muted)', lineHeight: '1.8', fontSize: '20px', margin: 0, maxWidth: '600px' }}>
                RK AI Desktop combines offline intelligence, system automation, and privacy-first design into one seamless experience.
              </p>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
              <Link href="/products/rk-ai-desktop" className="btn-secondary" style={{ padding: '20px 48px', fontSize: '18px' }}>Back to Product</Link>
              <Link href="/subscription" className="btn-primary" style={{ padding: '20px 48px', fontSize: '18px' }}>Explore Subscription</Link>
            </div>
          </motion.div>
        </section>
      </main>

      <Footer />
      <ChatWidget />
    </div>
  );
}
