 'use client';
 import { Suspense, useEffect, useState } from 'react';
 import { useRouter, useSearchParams } from 'next/navigation';
 import { account, client } from '@/lib/appwrite';
 
 function CallbackContent() {
   const router = useRouter();
   const searchParams = useSearchParams();
   const [status, setStatus] = useState('processing');
 
   useEffect(() => {
     const run = async () => {
       try {
         const userId = searchParams.get('userId');
         const secret = searchParams.get('secret');
         const next = searchParams.get('next') || '/';
         if (userId && secret) {
           await account.createSession(userId, secret);
           try {
             const jwt = await account.createJWT();
             localStorage.setItem('auth_jwt', jwt.jwt);
             client.setJWT(jwt.jwt);
           } catch (_) {}
           const url = new URL(window.location.href);
           url.searchParams.delete('userId');
           url.searchParams.delete('secret');
           window.history.replaceState({}, '', url.toString());
           setStatus('success');
           router.replace(next);
         } else {
           const err = searchParams.get('error') || '';
           setStatus(err ? 'error' : 'idle');
         }
       } catch (_) {
         setStatus('error');
       }
     };
     run();
   }, [router, searchParams]);
 
   return (
     <div style={{ background: 'var(--background)', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text)' }}>
       <div style={{ padding: '24px 32px', border: '1px solid var(--border)', borderRadius: '16px', background: 'var(--surface)', minWidth: '280px', textAlign: 'center' }}>
         <div className="spinner" />
         <p style={{ marginTop: '12px', fontWeight: '700' }}>
           {status === 'processing' ? 'Finishing sign in...' : status === 'success' ? 'Signed in' : 'OAuth failed'}
         </p>
       </div>
     </div>
   );
 }
 
 export default function AuthCallback() {
   return (
     <Suspense fallback={<div style={{ background: 'var(--background)', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><div className="spinner"></div></div>}>
       <CallbackContent />
     </Suspense>
   );
 }
