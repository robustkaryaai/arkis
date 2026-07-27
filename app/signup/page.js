'use client';
import Navbar from '@/components/Navbar';
import Link from 'next/link';
import { useState, useEffect, Suspense } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter, useSearchParams } from 'next/navigation';
import ChatWidget from '@/components/ChatWidget';
import { StarField, Card3D, staggerContainer, textVariant, fadeUp } from '@/components/SpaceUI';
import { motion } from 'framer-motion';

function SignupContent() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [localLoading, setLocalLoading] = useState(false);
    const { user, loading: authLoading, loginWithGoogle } = useAuth();
    const router = useRouter();
    const searchParams = useSearchParams();
    const redirectTo = searchParams.get('redirect') || '/';

    useEffect(() => {
        if (!authLoading && user) {
            router.push(redirectTo);
        }
    }, [user, authLoading, router, redirectTo]);

    const handleEmailSignup = async (e) => {
        e.preventDefault();
        setError('');
        setLocalLoading(true);

        // Simulated signup error if backend doesn't support direct email registration yet
        setTimeout(() => {
            setError('Email registration is currently invite-only. Please continue with Google.');
            setLocalLoading(false);
        }, 1000);
    };

    const handleGoogleSignup = () => {
        setLocalLoading(true);
        loginWithGoogle(redirectTo);
    };

    return (
        <div style={{ background: '#010104', minHeight: '100vh', color: '#fff', position: 'relative', overflowX: 'hidden' }}>
            <StarField />
            <div className="noise" aria-hidden />

            <Navbar />

            <div style={{
                minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
                padding: '120px 20px', position: 'relative', zIndex: 10
            }}>
                <motion.div variants={staggerContainer(0.1, 0.2)} initial="hidden" animate="show" style={{ width: '100%', maxWidth: '420px' }}>
                    <motion.div variants={fadeUp}>
                        <Card3D style={{ padding: '48px 40px', width: '100%' }} orbColor="rgba(59,130,246,0.2)">
                            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                                <h1 style={{ fontSize: '32px', fontWeight: '900', letterSpacing: '-0.5px' }}>
                                    <span style={{ background: 'linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Create Account</span>
                                </h1>
                                <p style={{ color: 'rgba(255,255,255,0.4)', marginTop: '8px', fontSize: '15px' }}>Join the Rexycore ecosystem.</p>
                            </div>

                            {error && (
                                <div style={{
                                    background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.25)', color: '#fecaca',
                                    padding: '12px 16px', borderRadius: '12px', fontSize: '14px', marginBottom: '24px'
                                }}>
                                    {error}
                                </div>
                            )}

                            <form onSubmit={handleEmailSignup} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                <div>
                                    <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: 'rgba(255,255,255,0.5)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: 1 }}>Full Name</label>
                                    <input type="text" required value={name} onChange={e => setName(e.target.value)}
                                        style={{
                                            width: '100%', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)',
                                            borderRadius: '12px', padding: '14px 16px', color: '#fff', fontSize: '15px',
                                            outline: 'none', transition: 'border-color 0.2s', boxSizing: 'border-box'
                                        }} onFocus={e => e.target.style.borderColor = '#3b82f6'} onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'} />
                                </div>
                                <div>
                                    <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: 'rgba(255,255,255,0.5)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: 1 }}>Email Address</label>
                                    <input type="email" required value={email} onChange={e => setEmail(e.target.value)}
                                        style={{
                                            width: '100%', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)',
                                            borderRadius: '12px', padding: '14px 16px', color: '#fff', fontSize: '15px',
                                            outline: 'none', transition: 'border-color 0.2s', boxSizing: 'border-box'
                                        }} onFocus={e => e.target.style.borderColor = '#3b82f6'} onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'} />
                                </div>
                                <div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                                        <label style={{ fontSize: '13px', fontWeight: '700', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: 1 }}>Password</label>
                                    </div>
                                    <input type="password" required value={password} onChange={e => setPassword(e.target.value)}
                                        style={{
                                            width: '100%', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)',
                                            borderRadius: '12px', padding: '14px 16px', color: '#fff', fontSize: '15px',
                                            outline: 'none', transition: 'border-color 0.2s', boxSizing: 'border-box'
                                        }} onFocus={e => e.target.style.borderColor = '#3b82f6'} onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'} />
                                </div>

                                <motion.button type="submit" disabled={localLoading} whileHover={!localLoading ? { scale: 1.02 } : {}} whileTap={!localLoading ? { scale: 0.98 } : {}} style={{
                                    width: '100%', padding: '16px', borderRadius: '12px', fontSize: '16px',
                                    fontWeight: '800', cursor: localLoading ? 'not-allowed' : 'pointer', opacity: localLoading ? 0.7 : 1,
                                    marginTop: '8px', background: 'linear-gradient(135deg, #60a5fa, #3b82f6)', color: '#fff', border: 'none',
                                    boxShadow: '0 8px 30px rgba(59,130,246,0.3)'
                                }}>
                                    {localLoading ? 'Creating...' : 'Sign Up'}
                                </motion.button>
                            </form>

                            <div style={{ textAlign: 'center', marginTop: '32px', position: 'relative' }}>
                                <hr style={{ border: 'none', borderTop: '1px solid rgba(255,255,255,0.1)' }} />
                                <span style={{ position: 'absolute', top: '-10px', left: '50%', transform: 'translateX(-50%)', background: '#010104', padding: '0 12px', fontSize: '12px', color: 'rgba(255,255,255,0.4)', fontWeight: '800', borderRadius: '99px' }}>OR</span>
                            </div>

                            <motion.button
                                onClick={handleGoogleSignup}
                                disabled={localLoading}
                                whileHover={!localLoading ? { scale: 1.02, background: 'rgba(255,255,255,0.06)' } : {}}
                                whileTap={!localLoading ? { scale: 0.98 } : {}}
                                style={{
                                    width: '100%', marginTop: '28px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)',
                                    borderRadius: '12px', padding: '14px', color: '#fff', fontSize: '15px', fontWeight: '600',
                                    cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px',
                                    opacity: localLoading ? 0.7 : 1
                                }}>
                                <svg width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" /><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" /><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" /><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" /></svg>
                                {localLoading ? 'Opening Google...' : 'Continue with Google'}
                            </motion.button>

                            <div style={{ marginTop: '28px', textAlign: 'center' }}>
                                <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.4)' }}>
                                    Already have an account? <Link href="/login" style={{ color: '#60a5fa', fontWeight: '600', textDecoration: 'none' }}>Sign In</Link>
                                </p>
                            </div>
                        </Card3D>
                    </motion.div>
                </motion.div>
            </div>

            <ChatWidget />
        </div>
    );
}

export default function Signup() {
    return (
        <Suspense fallback={<div style={{ background: '#010104', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><div className="spinner"></div></div>}>
            <SignupContent />
        </Suspense>
    );
}
