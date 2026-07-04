'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { account, client } from '@/lib/appwrite';

export default function CallbackClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [message, setMessage] = useState('Finishing sign-in…');
  const [status, setStatus] = useState('loading'); // 'loading' | 'success' | 'error'

  useEffect(() => {
    const finish = async () => {
      const userId = searchParams.get('userId');
      const secret = searchParams.get('secret');
      const redirect = searchParams.get('redirect') || '/';
      try {
        if (userId && secret) {
          await account.createSession(userId, secret);
        }
        try {
          const current = await account.getSession('current');
          if (current?.$id) {
            client.setHeader('X-Appwrite-Session', current.$id);
            try { window.localStorage.setItem('appwrite_session_id', current.$id); } catch (_) {}
          }
        } catch (_) {}
        try {
          await account.get();
          // show success briefly so user sees confirmation
          setStatus('success');
          setMessage("You're signed in — redirecting…");
          setTimeout(() => router.replace(redirect.startsWith('/') ? redirect : `/${redirect}`), 900);
          return;
        } catch {
          setStatus('error');
          setMessage('Sign-in failed. Redirecting to login…');
          setTimeout(() => router.replace('/login?error=oauth_failed'), 1200);
        }
      } catch {
        setStatus('error');
        setMessage('Sign-in failed. Redirecting to login…');
        setTimeout(() => router.replace('/login?error=oauth_failed'), 1200);
      }
    };
    finish();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 18, alignItems: 'center', textAlign: 'center' }}>
        <div style={{ width: 96, height: 96, display: 'grid', placeItems: 'center' }}>
          {status === 'loading' && (
            <svg width="64" height="64" viewBox="0 0 44 44" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="g" x1="0%" x2="100%">
                  <stop offset="0%" stopColor="var(--blue)" />
                  <stop offset="100%" stopColor="var(--violet)" />
                </linearGradient>
              </defs>
              <circle cx="22" cy="22" r="18" stroke="rgba(255,255,255,0.06)" strokeWidth="4" fill="none" />
              <path d="M22 4 a18 18 0 0 1 0 36" stroke="url(#g)" strokeWidth="4" strokeLinecap="round" fill="none">
                <animateTransform attributeName="transform" type="rotate" from="0 22 22" to="360 22 22" dur="1s" repeatCount="indefinite" />
              </path>
            </svg>
          )}
          {status === 'success' && (
            <div style={{ width: 64, height: 64, borderRadius: 20, display: 'grid', placeItems: 'center', background: 'linear-gradient(135deg,var(--blue),var(--violet))' }}>
              <svg width="34" height="34" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 6L9 17l-5-5" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          )}
          {status === 'error' && (
            <div style={{ width: 64, height: 64, borderRadius: 20, display: 'grid', placeItems: 'center', background: 'rgba(255,80,90,0.12)', border: '1px solid rgba(255,80,90,0.25)' }}>
              <svg width="34" height="34" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 6L6 18M6 6l12 12" stroke="#ff505a" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          )}
        </div>

        <div style={{ maxWidth: 420 }}>
          <h3 style={{ margin: 0, fontSize: 18, fontWeight: 700, letterSpacing: -0.2 }}>{status === 'loading' ? 'Finishing sign‑in' : status === 'success' ? 'Welcome back' : 'Sign‑in failed'}</h3>
          <p style={{ margin: '8px 0 0', color: 'var(--muted)', fontSize: 14 }}>{message}</p>
        </div>
      </div>
    </div>
  );
}
