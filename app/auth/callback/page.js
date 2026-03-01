'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { account } from '@/lib/appwrite';

export default function AuthCallback() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [message, setMessage] = useState('Finishing sign-in…');

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
          await account.get();
          router.replace(redirect.startsWith('/') ? redirect : `/${redirect}`);
        } catch {
          setMessage('Sign-in failed. Redirecting to login…');
          setTimeout(() => router.replace('/login?error=oauth_failed'), 1200);
        }
      } catch {
        setMessage('Sign-in failed. Redirecting to login…');
        setTimeout(() => router.replace('/login?error=oauth_failed'), 1200);
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

