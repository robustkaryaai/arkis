'use client';
// app/auth/web-callback/page.js
// Backend redirects here after Google OAuth with ?token=...&userId=...&redirect=...

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { finishWebCallback } from '@/lib/api';
import { Suspense } from 'react';

function WebCallbackClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [message, setMessage] = useState('Finishing sign-in…');

  useEffect(() => {
    const finish = async () => {
      const token = searchParams.get('token');
      const userId = searchParams.get('userId');
      const slug = searchParams.get('slug');
      const plan = searchParams.get('plan');
      const redirect = searchParams.get('redirect') || '/';

      if (!token || !userId) {
        setMessage('Sign-in failed. Redirecting…');
        setTimeout(() => router.replace('/login?error=oauth_failed'), 1200);
        return;
      }

      try {
        const data = await finishWebCallback(token, userId);
        // If getMe() returned a user, great. But even if it didn't (API issue),
        // we have already stored the token/userId via storeSession inside finishWebCallback.
        // Count it as success if we have a valid token and userId.
        if (data || (token && userId)) {
          const email = data?.email || '';
          const username = data?.name || '';
          let nextUrl = redirect.startsWith('rkphone://') ? redirect : (redirect.startsWith('/') ? redirect : `/${redirect}`);

          if (nextUrl.includes('/desktop/oauth-success') || nextUrl.startsWith('rkphone://')) {
            const urlObj = new URL(nextUrl, nextUrl.startsWith('rkphone://') ? undefined : window.location.origin);
            if (email) urlObj.searchParams.set('email', email);
            if (username) urlObj.searchParams.set('username', username);
            if (slug) urlObj.searchParams.set('slug', slug);
            if (plan) urlObj.searchParams.set('plan', plan);
            
            if (nextUrl.startsWith('rkphone://')) {
              urlObj.searchParams.set('token', token);
              urlObj.searchParams.set('userId', userId);
            }
            
            nextUrl = nextUrl.startsWith('rkphone://') ? urlObj.href : (urlObj.pathname + urlObj.search);
            window.location.href = nextUrl; // Force hard redirect
          } else {
            router.replace(nextUrl);
          }
        } else {
          setMessage('Sign-in failed. Redirecting…');
          setTimeout(() => router.replace('/login?error=oauth_failed'), 1200);
        }
      } catch (_) {
        if (token && userId) {
          let fallbackUrl = redirect.startsWith('rkphone://') ? redirect : (redirect.startsWith('/') ? redirect : `/${redirect}`);
          if (fallbackUrl.startsWith('rkphone://')) {
            const urlObj = new URL(fallbackUrl);
            urlObj.searchParams.set('token', token);
            urlObj.searchParams.set('userId', userId);
            window.location.href = urlObj.href;
          } else {
            router.replace(fallbackUrl);
          }
        } else {
          setMessage('Sign-in failed. Redirecting…');
          setTimeout(() => router.replace('/login?error=oauth_failed'), 1200);
        }
      }

    };

    finish();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <p style={{ color: 'var(--muted)', fontSize: 14 }}>{message}</p>
    </div>
  );
}

export const dynamic = 'force-dynamic';

export default function WebCallbackPage() {
  return (
    <Suspense fallback={
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ color: 'var(--muted)', fontSize: 14 }}>Finishing sign-in…</p>
      </div>
    }>
      <WebCallbackClient />
    </Suspense>
  );
}