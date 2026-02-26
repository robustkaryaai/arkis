 'use client';
 import Navbar from '@/components/Navbar';
 import ChatWidget from '@/components/ChatWidget';
 import Footer from '@/components/Footer';
 
 const plans = [
   { emoji: '🆓', name: 'Free', color: '#9333ea', price: '₹0', period: '/mo', desc: 'Personal exploration & testing.', storage: '500 MB', videos: 'No videos', features: ['Voice chat + wake word', 'Any local Ollama model', 'Music playback', '500 MB storage'], locked: ['Video generation', 'PPT / DOCX gen', 'AI image generation'], cta: 'Download Free', href: '/#download', ghost: true },
   { emoji: '🟢', name: 'Student', color: '#4caf50', price: '₹149', period: '/mo', desc: 'Students & Assignments.', storage: '5 GB', videos: 'No videos', features: ['5 GB storage', 'Unlimited text documents', 'PPT & DOCX generation', 'Priority support'], locked: ['AI video generation'], cta: 'Get Student Plan' },
   { emoji: '🔵', name: 'Creator', color: '#2196f3', featured: true, price: '₹299', period: '/mo', desc: 'Content Creators.', storage: '20 GB', videos: '2 videos/mo', features: ['20 GB storage', '2 AI videos/month', 'Thumbnail generation', 'All document types', 'Advanced AI'], locked: [], cta: 'Get Creator Plan' },
   { emoji: '🟣', name: 'Pro', color: '#9c27b0', price: '₹599', period: '/mo', desc: 'Power Users & Pros.', storage: '50 GB', videos: '10 videos/mo', features: ['50 GB storage', '10 AI videos/month', 'Unlimited documents', 'Priority processing', 'API access'], locked: [], cta: 'Get Pro Plan' },
   { emoji: '🔴', name: 'Studio', color: '#f44336', price: '₹999', period: '/mo', desc: 'Studios & Schools.', storage: '120 GB', videos: '30 videos/mo', features: ['120 GB storage', '30 AI videos/month', 'Team collaboration', 'White-label', 'Dedicated support'], locked: [], cta: 'Get Studio Plan' },
 ];
 
 export default function Tiers() {
   return (
     <div style={{ background: 'var(--background)', minHeight: '100vh', color: 'var(--text)' }}>
       <Navbar />
 
       <section className="hero" style={{ minHeight: '50vh', paddingTop: '120px', paddingBottom: '40px', textAlign: 'center' }}>
         <div style={{ maxWidth: '900px', margin: '0 auto' }}>
           <div className="badge" style={{ margin: '0 auto 16px' }}><span className="dot" />ARKIS Cloud</div>
           <h1 style={{ fontSize: 'clamp(36px,6vw,72px)', lineHeight: '1.2' }}>Choose Your <span className="grad">Tier</span></h1>
           <p style={{ fontSize: '1.1rem', color: 'var(--muted)', marginTop: '16px' }}>Flexible plans for students, creators, and professionals.</p>
         </div>
       </section>
 
       <section style={{ padding: '40px 5%' }}>
         <div className="label">Plans</div>
         <div className="pricing-grid">
           {plans.map((p) => (
             <div key={p.name} className={`tier-card ${p.featured ? 'featured' : ''}`}>
               <div className="tier-name" style={{ color: p.color }}>{p.emoji} {p.name}</div>
               <div className="tier-price">
                 <span className="amount">{p.price}</span>
                 <span className="period">{p.period}</span>
               </div>
               <p className="tier-desc">💾 {p.storage} · 🎥 {p.videos}</p>
               <ul className="tier-features">
                 {p.features.map(f => (<li key={f}><span className="tick">✓</span>{f}</li>))}
                 {p.locked.map(f => (<li key={f}><span className="cross">✗</span>{f}</li>))}
               </ul>
               <a href={p.href || '#'} className={`tier-btn ${p.ghost ? 'ghost' : ''}`} onClick={!p.href ? (e) => { e.preventDefault(); alert(`Payments launching soon!\nEmail hello@arkis.ai for early access to ${p.name}.`); } : undefined}>
                 {p.cta}
               </a>
             </div>
           ))}
         </div>
         <p style={{ textAlign: 'center', color: 'var(--muted)', fontSize: '13px', marginTop: '20px' }}>
           🔒 Secure payments via Paytm · UPI · Cards
         </p>
       </section>
 
       <Footer />
       <ChatWidget />
     </div>
   );
 }
