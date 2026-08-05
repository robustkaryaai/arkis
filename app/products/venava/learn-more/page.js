'use client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ChatWidget from '@/components/ChatWidget';
import BackButton from '@/components/BackButton';
import Link from 'next/link';
import { FiArrowRight, FiShield, FiEdit3, FiHeart, FiLayers, FiLock } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { StarField, Card3D, staggerContainer, fadeUp, textVariant } from '@/components/SpaceUI';

const AC = '#14b8a6';
const ACB = '#5eead4';
const principles = [
  { icon: <FiEdit3 size={22} />, title: 'Your expression, not a generic voice', desc: 'Venava pays attention to the details that make communication yours: vocabulary, punctuation, formatting, phrases, tone, and sentence patterns.' },
  { icon: <FiHeart size={22} />, title: 'Language can stay layered', desc: 'Your voice does not need to fit a template. Venava is designed to respect language mixing, slang, and the informal rhythm that makes a message feel human.' },
  { icon: <FiLayers size={22} />, title: 'An expression layer', desc: 'RK AI can understand what you mean. Venava gives that meaning your character. It is not the brain, a chatbot, or an AI writer.' },
  { icon: <FiShield size={22} />, title: 'Quiet by design', desc: 'No complex interface competing for attention. Venava works as an invisible layer, helping technology adapt to the person using it.' },
  { icon: <FiLock size={22} />, title: 'Memory you own', desc: 'Personal style memory is deeply personal. Venava is designed around privacy, secure personalization, and user ownership of that memory.' },
  { icon: <FiArrowRight size={22} />, title: 'Built for the ecosystem', desc: 'Venava is a core RexyCore product: the expression layer alongside intelligence, awareness, and the computing environment.' },
];

const layers = [
  { label: 'RK AI', value: 'Understands intent', sub: 'The intelligence layer' },
  { label: 'Venava', value: 'Expresses it like you', sub: 'The expression layer', active: true },
  { label: 'Lumina OS', value: 'Creates the environment', sub: 'The computing environment' },
  { label: 'Neytreya', value: 'Builds awareness', sub: 'The awareness layer' },
];

export default function VenavaLearnMore() {
  return <div style={{ background: '#010104', color: '#fff', minHeight: '100vh', overflowX: 'hidden', position: 'relative' }}>
    <StarField /><div className="noise" aria-hidden />
    <BackButton href="/products/venava" label="Venava" /><Navbar />
    <section style={{ minHeight: '88vh', display: 'flex', alignItems: 'center', padding: '160px 5% 80px', position: 'relative', zIndex: 10 }}><div style={{ maxWidth: 1100, width: '100%', margin: '0 auto' }}><motion.div variants={staggerContainer(0.12, 0.1)} initial="hidden" whileInView="show" viewport={{ once: false, amount: 0.15 }}>
      <motion.div variants={fadeUp} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 16px', borderRadius: 99, background: 'rgba(20,184,166,0.09)', border: '1px solid rgba(94,234,212,0.25)', color: ACB, fontSize: 12, fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 28 }}><motion.span animate={{ opacity: [1, .3, 1] }} transition={{ repeat: Infinity, duration: 2 }} style={{ width: 8, height: 8, borderRadius: '50%', background: AC, boxShadow: `0 0 10px ${AC}` }} /> Personal expression layer</motion.div>
      <motion.h1 variants={textVariant(.1)} style={{ fontSize: 'clamp(48px, 7vw, 88px)', fontWeight: 900, lineHeight: 1.05, letterSpacing: '-.04em', marginBottom: 28, maxWidth: 900 }}>Technology should understand your voice,<br /><span style={{ color: ACB }}>not replace it.</span></motion.h1>
      <motion.p variants={fadeUp} style={{ maxWidth: 680, fontSize: 20, color: 'rgba(255,255,255,.6)', lineHeight: 1.7, marginBottom: 44 }}>Venava learns how you naturally communicate and helps technology express your thoughts in a way that stays recognizably yours.</motion.p>
      <motion.div variants={fadeUp} style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}><a href="#principles" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 28px', borderRadius: 99, background: `linear-gradient(90deg, ${AC}, ${ACB}, ${AC})`, color: '#001413', fontWeight: 800, fontSize: 15, textDecoration: 'none' }}>Discover Venava <FiArrowRight /></a><Link href="/products/venava" style={{ display: 'inline-flex', alignItems: 'center', padding: '14px 28px', borderRadius: 99, background: 'rgba(255,255,255,.05)', border: '1px solid rgba(255,255,255,.1)', color: '#fff', fontWeight: 700, fontSize: 15, textDecoration: 'none' }}>Back to Venava</Link></motion.div>
    </motion.div></div></section>
    <section style={{ padding: '0 5% 100px', position: 'relative', zIndex: 10 }}><div style={{ maxWidth: 1100, margin: '0 auto' }}><motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: false, amount: .15 }}><Card3D style={{ padding: '48px 40px', background: 'rgba(7,20,22,.78)' }} orbColor="rgba(20,184,166,.2)"><p style={{ color: ACB, fontSize: 12, fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 18 }}>The core idea</p><p style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(25px, 4vw, 44px)', lineHeight: 1.35, maxWidth: 820, margin: 0 }}>“AI understands what you mean. <span style={{ color: ACB }}>Venava helps it sound like you.</span>”</p></Card3D></motion.div></div></section>
    <section id="principles" style={{ padding: '80px 5%', position: 'relative', zIndex: 10 }}><div style={{ maxWidth: 1100, margin: '0 auto' }}><motion.div variants={staggerContainer(.1, .2)} initial="hidden" whileInView="show" viewport={{ once: false, amount: .15 }} style={{ marginBottom: 56 }}><motion.div variants={fadeUp} style={{ display: 'inline-block', padding: '5px 14px', borderRadius: 8, background: 'rgba(20,184,166,.09)', color: ACB, fontSize: 11, fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 16 }}>How Venava thinks</motion.div><motion.h2 variants={textVariant(0)} style={{ fontSize: 'clamp(32px,4vw,52px)', fontWeight: 900, letterSpacing: '-.03em', lineHeight: 1.1 }}>Personal, quiet, and yours.</motion.h2></motion.div><motion.div variants={staggerContainer(.05,.1)} initial="hidden" whileInView="show" viewport={{ once: false, amount: .15 }} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 20 }}>{principles.map(p => <motion.div key={p.title} variants={fadeUp}><Card3D style={{ padding: '32px 28px', height: '100%' }} orbColor="rgba(20,184,166,.18)"><div style={{ width: 48, height: 48, borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(20,184,166,.12)', color: ACB, marginBottom: 20 }}>{p.icon}</div><h3 style={{ fontSize: 18, fontWeight: 800, marginBottom: 10 }}>{p.title}</h3><p style={{ fontSize: 14, color: 'rgba(255,255,255,.55)', lineHeight: 1.7, margin: 0 }}>{p.desc}</p></Card3D></motion.div>)}</motion.div></div></section>
    <section style={{ padding: '100px 5% 120px', position: 'relative', zIndex: 10 }}><div style={{ maxWidth: 1100, margin: '0 auto' }}><motion.div variants={staggerContainer(.1,.2)} initial="hidden" whileInView="show" viewport={{ once: false, amount: .15 }}><motion.div variants={fadeUp}><Card3D style={{ padding: '52px 40px' }} orbColor="rgba(20,184,166,.18)"><p style={{ color: ACB, fontSize: 11, fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 16 }}>RexyCore Ecosystem</p><h2 style={{ fontSize: 'clamp(28px,4vw,48px)', fontWeight: 900, letterSpacing: '-.03em', marginBottom: 36 }}>One ecosystem. Different layers.</h2><div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 16 }}>{layers.map(layer => <div key={layer.label} style={{ padding: 20, borderRadius: 16, background: layer.active ? 'rgba(20,184,166,.12)' : 'rgba(255,255,255,.03)', border: `1px solid ${layer.active ? 'rgba(94,234,212,.35)' : 'rgba(255,255,255,.08)'}` }}><p style={{ margin: '0 0 12px', color: layer.active ? ACB : '#7dd3fc', fontWeight: 800 }}>{layer.label}</p><h3 style={{ fontSize: 16, marginBottom: 8 }}>{layer.value}</h3><p style={{ margin: 0, color: 'rgba(255,255,255,.45)', fontSize: 13 }}>{layer.sub}</p></div>)}</div></Card3D></motion.div></motion.div></div></section>
    <Footer /><ChatWidget />
  </div>;
}
