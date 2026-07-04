import React, { useEffect, useState } from 'react';

// MacOS Desktop Mock with RK AI Orb
export default function MacDesktop() {
  const [thinking, setThinking] = useState(false);

  // Toggle thinking state every 7 seconds for demo
  useEffect(() => {
    const iv = setInterval(() => {
      setThinking((prev) => !prev);
    }, 7000);
    return () => clearInterval(iv);
  }, []);

  return (
    <div className="mac-desktop-container">
      {/* Menu Bar */}
      <div className="mac-menu-bar">
        <div className="mac-menu-left">
          <span style={{ fontSize: '13px', fontWeight: 'bold' }}></span>
          <span style={{ fontWeight: 'bold' }}>RK OS</span>
          <span>File</span>
          <span>Edit</span>
          <span>View</span>
          <span>Go</span>
          <span>Window</span>
          <span>Help</span>
        </div>
        <div className="mac-menu-right">
          <span style={{ opacity: 0.8 }}>100% [🔋]</span>
          <span style={{ opacity: 0.8 }}>⚡</span>
          <span style={{ fontWeight: '500' }}>Mon 9:41 AM</span>
        </div>
      </div>

      {/* Desktop area */}
      <div className="desktop-body">
        {/* Placeholder for background wallpaper */}
        <div className="wallpaper" />
        {/* RK AI Orb widget */}
        <div id="rk-orb" className={`orb ${thinking ? 'thinking' : 'idle'}`}>
          <div className="liquid-bg" />
          <div className="liquid-bg2" />
          <div className="dot-face">
            <div className="eyes">
              <div className="eye eye-left"><div className="pupil" /></div>
              <div className="eye eye-right"><div className="pupil" /></div>
            </div>
            <div className="mouth" />
          </div>
        </div>
      </div>

      {/* Dock */}
      <div className="mac-dock">
        <div className="dock-item"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z" /><path d="M12 3v18M3 10h18M8 14h8" /></svg></div>
        <div className="dock-item"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" fill="#3b82f6" /></svg></div>
        <div className="dock-item"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg></div>
        <div className="dock-item"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="4 17 10 11 4 5" /><line x1="12" y1="19" x2="20" y2="19" /></svg></div>
        <div className="dock-item separator" />
        <div className="dock-item rk-dock-spot" />
      </div>

      {/* Styles */}
      <style jsx>{`
        :root {
          --char-color-1: #a7f3d0;
          --char-color-2: #34d399;
          --char-color-bg: #064e3b;
          --char-glow: 5, 150, 105;
        }
        .mac-desktop-container {
          position: relative;
          width: 100%;
          height: 100%;
          overflow: hidden;
          background: #09090b;
          border-radius: 16px;
          border: 1px solid rgba(255,255,255,0.08);
        }
        .mac-menu-bar {
          height: 26px;
          background: rgba(15,15,20,0.5);
          backdrop-filter: blur(16px);
          border-bottom: 1px solid rgba(255,255,255,0.06);
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 16px;
          font-size: 11px;
          color: rgba(255,255,255,0.85);
        }
        .mac-menu-left, .mac-menu-right { display: flex; gap: 12px; align-items: center; }
        .desktop-body { flex: 1; position: relative; display: flex; align-items: center; justify-content: center; }
        .wallpaper {
          position: absolute;
          inset: 0;
          background: url('/wallpaper.png') center/cover no-repeat;
          opacity: 0.6;
        }
        .mac-dock {
          position: absolute;
          bottom: 8px;
          left: 50%;
          transform: translateX(-50%);
          height: 48px;
          background: rgba(15,15,20,0.35);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 14px;
          padding: 4px 8px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .dock-item {
          width: 34px; height: 34px; border-radius: 8px;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.05);
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; transition: transform 0.2s ease;
        }
        .dock-item:hover { transform: scale(1.15) translateY(-4px); }
        .dock-item.separator { width:1px; height:24px; background: rgba(255,255,255,0.15); margin:02px; pointer-events:none; }
        .dock-item.rk-dock-spot { background: rgba(16,185,129,0.04); border: 1px dashed rgba(16,185,129,0.2); }
        /* Orb */
        .orb {
          position: relative;
          width: 120px;
          height: 120px;
          border-radius: 50%;
          background: radial-gradient(circle at 30% 30%, var(--char-color-1), var(--char-color-bg));
          box-shadow: 0 0 20px rgba(var(--char-glow),0.5), inset 0 0 20px rgba(255,255,255,0.2);
          display: flex; align-items: center; justify-content: center;
          overflow: hidden;
          cursor: grab;
        }
        .liquid-bg, .liquid-bg2 {
          position: absolute;
          border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%;
          background: rgba(255,255,255,0.1);
          animation: morph 8s ease-in-out infinite alternate;
        }
        .liquid-bg { top:-10%; left:-10%; right:-10%; bottom:-10%; }
        .liquid-bg2 { top:0; left:0; right:0; bottom:0; animation-delay:-4s; background: rgba(var(--char-glow),0.2); }
        @keyframes morph {
          0% { border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%; }
          100% { border-radius: 60% 40% 30% 70% / 60% 50% 40% 50%; }
        }
        .dot-face {
          position: relative; width:60%; height:60%; z-index:10;
          display:flex; flex-direction:column; align-items:center; justify-content:center;
        }
        .eyes { display:flex; gap:15px; margin-bottom:5px; }
        .eye { width:12px; height:16px; background:white; border-radius:50%; position:relative; overflow:hidden; box-shadow:0 0 5px rgba(255,255,255,0.8); animation:blink 4s infinite; }
        .pupil { width:6px; height:6px; background:#022c22; border-radius:50%; position:absolute; bottom:2px; left:3px; transition:0.1s; }
        @keyframes blink { 0%,96%,98%,100% { transform:scaleY(1);} 97%,99% { transform:scaleY(0.1);} }
        .mouth { width:16px; height:8px; border-bottom:3px solid white; border-radius:0 0 20px 20px; transition:0.3s; }
        /* Thinking state */
        .orb.thinking { animation: thinkBob 2s ease-in-out infinite; }
        @keyframes thinkBob { 0%{transform:rotate(-5deg) scale(1);} 50%{transform:rotate(5deg) scale(1.03);} 100%{transform:rotate(-5deg) scale(1);} }
        .orb.thinking .dot-face::before {
          content:''; position:absolute; top:-18px; left:50%; margin-left:-10px; width:5px; height:5px; border-radius:50%; background:var(--char-color-1);
          box-shadow:10px 0 0 var(--char-color-1), 20px 0 0 var(--char-color-1);
          filter:drop-shadow(0 0 3px rgba(var(--char-glow),0.9));
          animation: thinkDotsBounce 0.9s ease-in-out infinite;
        }
        @keyframes thinkDotsBounce {
          0%,100%{transform:translateY(0); box-shadow:10px 0 0 var(--char-color-1), 20px 0 0 var(--char-color-1);}
          20%{transform:translateY(-5px); box-shadow:10px 0 0 var(--char-color-1), 20px 0 0 var(--char-color-1);}
          40%{transform:translateY(0); box-shadow:10px -5px 0 var(--char-color-1), 20px 0 0 var(--char-color-1);}
          60%{transform:translateY(0); box-shadow:10px 0 0 var(--char-color-1), 20px -5px 0 var(--char-color-1);}
          80%{transform:translateY(0); box-shadow:10px 0 0 var(--char-color-1), 20px 0 0 var(--char-color-1);}
        }
      `}</style>
    </div>
  );
}
