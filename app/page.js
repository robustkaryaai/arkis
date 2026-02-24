'use client';
import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import ChatWidget from '@/components/ChatWidget';
import Link from 'next/link';

const ROLLING_TEXTS = [
  "Built for the future.",
  "Powered by intelligence.",
  "Designed for autonomy.",
  "Engineered for control.",
  "Privacy by default.",
  "Local. Private. Powerful.",
  "AI without compromise.",
  "Intelligence, redefined.",
  "Your AI. Your rules.",
  "Technology that respects you.",
  "Own your intelligence.",
  "Control the system."
];

function HeroTypewriter() {
  const [index, setIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer;
    const currentFullText = ROLLING_TEXTS[index];
    
    const handleType = () => {
      if (!isDeleting) {
        setDisplayText(currentFullText.substring(0, displayText.length + 1));
        if (displayText.length + 1 === currentFullText.length) {
          // Pause for 5 seconds after typing finishes
          timer = setTimeout(() => setIsDeleting(true), 5000);
        } else {
          timer = setTimeout(handleType, 100);
        }
      } else {
        setDisplayText(currentFullText.substring(0, displayText.length - 1));
        if (displayText.length === 0) {
          setIsDeleting(false);
          setIndex((prev) => (prev + 1) % ROLLING_TEXTS.length);
          timer = setTimeout(handleType, 500);
        } else {
          timer = setTimeout(handleType, 50);
        }
      }
    };

    if (!timer) timer = setTimeout(handleType, 100);
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, index]);

  return (
    <span className="grad" style={{ display: 'inline-block', minHeight: '1.2em' }}>
      {displayText}
      <span className="typewriter-cursor"></span>
    </span>
  );
}

export default function Home() {
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

  return (
    <>
      <Navbar />

      {/* HERO */}
      <section className="hero">
        <div className="badge float-anim"><span className="dot" />Engineered in India</div>
        <h1>An AI-first ecosystem.<br /><HeroTypewriter /></h1>
        <p>ARKIS is a technology company building privacy-focused, ecosystem-driven products that respect your autonomy.</p>
        <div className="hero-btns">
          <Link className="btn-primary" href="/products">Explore Products</Link>
        </div>
      </section>

      {/* FEATURES / WHY ARKIS */}
      <section id="features">
        <div className="label reveal">Why ARKIS</div>
        <h2 className="section-title reveal reveal-delay-1">Built different.<br />By design.</h2>
        <div className="feature-grid" style={{ marginTop: '40px' }}>
          {[
            ['🔒', 'Privacy-First', 'Your data is yours. Our architectures are designed to prioritize local execution and strict data boundaries.'],
            ['🇮🇳', 'Indian-Made', 'Founded and engineered in India, building world-class technology for global users.'],
            ['⚙️', 'AI-Optional', 'We build AI-first, but user-controlled. You have the power to fully disable AI support in our environments.'],
            ['🌐', 'Ecosystem-Driven', 'From the desktop assistant to the operating system, every product is designed to work seamlessly together.'],
          ].map(([icon, title, desc], i) => (
            <div key={title} className={`feature-card reveal reveal-delay-${i + 1}`}>
              <div className="feature-icon">{icon}</div>
              <h3>{title}</h3>
              <p>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="reveal">
        <span className="logo"><span>ARKIS</span></span>
        <span>© 2026 ARKIS. All rights reserved.</span>
        <span>Built with ❤️ and local AI</span>
      </footer>

      <ChatWidget />
    </>
  );
}

