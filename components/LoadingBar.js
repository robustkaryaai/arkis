'use client';
import { useEffect, useRef, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

/* The actual bar logic lives here, wrapped in Suspense because useSearchParams needs it */
function BarInner() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);
  const timerRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    setVisible(true);
    setProgress(30);
    
    const t1 = setTimeout(() => setProgress(70), 150);
    const t2 = setTimeout(() => setProgress(100), 400);
    const t3 = setTimeout(() => { 
      setVisible(false); 
      setTimeout(() => setProgress(0), 200); 
    }, 800);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [pathname, searchParams]);

  if (!visible && progress === 0) return null;

  return (
    <>
      {/* Main bar */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: 99999,
          height: 3,
          width: `${progress}%`,
          background: 'linear-gradient(90deg, #4b5563, #9ca3af, #d1d5db, #9ca3af, #4b5563)',
          backgroundSize: '300% 100%',
          animation: 'loadbar-flow 2s linear infinite',
          boxShadow: '0 0 10px rgba(156,163,175,0.4)',
          transition: progress === 100 ? 'width 0.3s ease, opacity 0.4s ease' : 'width 0.15s ease',
          opacity: progress === 100 ? 0 : 1,
          borderRadius: '0 2px 2px 0',
        }}
      />
      {/* Glow tip */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: `${progress}%`,
          zIndex: 99999,
          width: 60,
          height: 3,
          background: 'radial-gradient(ellipse at right, rgba(255,255,255,0.9) 0%, transparent 70%)',
          transform: 'translateX(-100%)',
          opacity: progress === 100 ? 0 : 1,
          transition: 'opacity 0.4s ease',
          pointerEvents: 'none',
        }}
      />
      <style>{`
        @keyframes loadbar-flow {
          0% { background-position: 0% 50%; }
          100% { background-position: 300% 50%; }
        }
      `}</style>
    </>
  );
}

export default function LoadingBar() {
  return (
    <Suspense fallback={null}>
      <BarInner />
    </Suspense>
  );
}
