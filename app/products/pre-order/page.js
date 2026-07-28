'use client';
import Navbar from '@/components/Navbar';
import ChatWidget from '@/components/ChatWidget';
import Footer from '@/components/Footer';
import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { FiHome, FiPackage, FiMapPin, FiPhone, FiUser, FiMail, FiCheck, FiTruck } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { StarField, staggerContainer, fadeUp, textVariant, FlowText, triggerNebula } from '@/components/SpaceUI';

const AMBER = '#f59e0b';
const AMBER_SOFT = 'rgba(245,158,11,0.12)';

function InputField({ label, icon: Icon, name, type = 'text', value, onChange, required, as: Tag = 'input', ...rest }) {
    const [focused, setFocused] = useState(false);
    return (
        <div>
            <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, fontWeight: 800, color: focused ? AMBER : 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 8, transition: 'color 0.2s' }}>
                {Icon && <Icon size={11} />} {label}
            </label>
            <div style={{ position: 'relative' }}>
                <Tag
                    name={name}
                    type={type}
                    value={value}
                    onChange={onChange}
                    required={required}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    style={{
                        width: '100%',
                        background: focused ? 'rgba(245,158,11,0.04)' : 'rgba(255,255,255,0.03)',
                        border: `1px solid ${focused ? 'rgba(245,158,11,0.5)' : 'rgba(255,255,255,0.08)'}`,
                        borderRadius: 14,
                        padding: Tag === 'textarea' ? '14px 16px' : '14px 16px',
                        color: '#fff',
                        fontSize: 14,
                        outline: 'none',
                        transition: 'all 0.2s ease',
                        boxShadow: focused ? `0 0 0 3px rgba(245,158,11,0.08)` : 'none',
                        resize: Tag === 'textarea' ? 'vertical' : undefined,
                        minHeight: Tag === 'textarea' ? 100 : undefined,
                        fontFamily: 'inherit',
                    }}
                    {...rest}
                />
            </div>
        </div>
    );
}

function PreOrderContent() {
    const { user, loading: authLoading } = useAuth();
    const router = useRouter();
    const searchParams = useSearchParams();
    const productId = searchParams.get('productId') || 'rkai_home';

    const [formData, setFormData] = useState({ fullName: '', email: '', phone: '', address: '', city: '', zipCode: '', country: 'India' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        if (!authLoading && !user) router.push(`/login?redirect=/products/pre-order?productId=${productId}`);
    }, [user, authLoading, router, productId]);

    useEffect(() => {
        if (!authLoading && user) {
            setFormData(prev => ({ ...prev, fullName: prev.fullName || user.name || '', email: prev.email || user.email || '' }));
        }
    }, [authLoading, user]);

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError('');
        const productName = 'RK AI Home';
        const price = '₹4,999';
        try {
            const { submitPreorder } = await import('@/lib/api');
            const reqData = {
                userId: user.$id || user.id, email: formData.email, phone: formData.phone,
                productId, productName, price,
                shippingFullName: formData.fullName, shippingAddress: formData.address,
                shippingCity: formData.city, shippingZip: formData.zipCode, shippingCountry: formData.country
            };
            const res = await submitPreorder(reqData);
            if (!res.ok) throw new Error(res.error || 'Pre-order submission failed');
            // 🎇 Fire the nebula burst!
            triggerNebula('preorder');
            setSuccess(true);
            setTimeout(() => { setIsSubmitting(false); router.push('/orders'); }, 2000);
        } catch (e2) {
            setError(e2?.message || 'Failed to submit pre-order');
            setIsSubmitting(false);
        }
    };

    if (authLoading || !user) {
        return (
            <div style={{ background: '#010104', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 16 }}>
                <div className="spinner" />
                <style>{`.spinner { width: 36px; height: 36px; border: 3px solid rgba(245,158,11,0.15); border-top-color: #f59e0b; border-radius: 50%; animation: spin 0.8s linear infinite; } @keyframes spin { to { transform: rotate(360deg); } }`}</style>
            </div>
        );
    }

    return (
        <div style={{ background: '#010104', minHeight: '100vh', color: '#fff', position: 'relative', overflowX: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <StarField />
            <div className="noise" aria-hidden />

            {/* Ambient golden glow */}
            <div style={{ position: 'fixed', top: '20%', left: '50%', transform: 'translateX(-50%)', width: 600, height: 400, background: 'radial-gradient(ellipse, rgba(245,158,11,0.08), transparent 70%)', pointerEvents: 'none', filter: 'blur(60px)', zIndex: 0 }} />

            <Navbar />

            <div style={{ flex: 1, padding: '130px 5% 80px', maxWidth: '1100px', margin: '0 auto', width: '100%', position: 'relative', zIndex: 10 }}>

                {/* Hero */}
                <motion.div variants={staggerContainer(0.1, 0.1)} initial="hidden" animate="show" style={{ textAlign: 'center', marginBottom: 60 }}>
                    <motion.div variants={fadeUp} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 18px', borderRadius: 99, background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.3)', marginBottom: 24 }}>
                        <motion.span animate={{ opacity: [1, 0.3, 1] }} transition={{ repeat: Infinity, duration: 2 }} style={{ width: 6, height: 6, borderRadius: '50%', background: AMBER, boxShadow: `0 0 8px ${AMBER}` }} />
                        <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase', color: AMBER }}>RK AI Home Pre-order</span>
                    </motion.div>
                    <motion.h1 variants={textVariant(0.1)} style={{ fontSize: 'clamp(36px, 6vw, 72px)', fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1, marginBottom: 16 }}>
                        Reserve Your{' '}
                        <FlowText gradient={`linear-gradient(135deg, ${AMBER}, #fbbf24, #d97706)`}>
                            RK AI Home
                        </FlowText>
                    </motion.h1>
                    <motion.p variants={fadeUp} style={{ fontSize: 16, color: 'rgba(255,255,255,0.4)', maxWidth: 480, margin: '0 auto', lineHeight: 1.7 }}>
                        Secure your unit at the pre-order price. Free shipping across India.
                    </motion.p>
                </motion.div>

                {/* 2-col layout */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 32, alignItems: 'start' }}>

                    {/* Form card */}
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
                        style={{ background: 'rgba(10,10,18,0.75)', backdropFilter: 'blur(24px)', border: '1px solid rgba(245,158,11,0.15)', borderRadius: 24, padding: '36px', position: 'relative', overflow: 'hidden' }}>
                        {/* Top amber bar */}
                        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, transparent, ${AMBER}, transparent)`, boxShadow: `0 0 14px ${AMBER}88` }} />

                        <h2 style={{ fontSize: 18, fontWeight: 900, marginBottom: 28, display: 'flex', alignItems: 'center', gap: 10 }}>
                            <FiMapPin color={AMBER} size={18} /> Shipping Details
                        </h2>

                        <AnimatePresence mode="wait">
                            {success ? (
                                <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} style={{ textAlign: 'center', padding: '40px 0' }}>
                                    <div style={{ width: 60, height: 60, borderRadius: '50%', background: 'rgba(245,158,11,0.15)', border: `1px solid ${AMBER}55`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                                        <FiCheck size={28} color={AMBER} />
                                    </div>
                                    <div style={{ fontSize: 18, fontWeight: 900, marginBottom: 8 }}>Pre-order Placed!</div>
                                    <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: 13 }}>Redirecting to your orders...</div>
                                </motion.div>
                            ) : (
                                <motion.form key="form" onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                                    {error && (
                                        <div style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', color: '#fecaca', padding: '12px 16px', borderRadius: 12, fontSize: 13 }}>
                                            {error}
                                        </div>
                                    )}
                                    <InputField label="Full Name" icon={FiUser} name="fullName" value={formData.fullName} onChange={handleChange} required />
                                    <InputField label="Email Address" icon={FiMail} name="email" type="email" value={formData.email} onChange={handleChange} required />
                                    <InputField label="Phone Number" icon={FiPhone} name="phone" type="tel" value={formData.phone} onChange={handleChange} required />
                                    <InputField label="Shipping Address" icon={FiMapPin} name="address" as="textarea" value={formData.address} onChange={handleChange} required />
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                                        <InputField label="City" name="city" value={formData.city} onChange={handleChange} required />
                                        <InputField label="ZIP Code" name="zipCode" value={formData.zipCode} onChange={handleChange} required />
                                    </div>

                                    <motion.button
                                        type="submit"
                                        disabled={isSubmitting}
                                        whileHover={{ scale: 1.02, boxShadow: `0 12px 40px rgba(245,158,11,0.5)` }}
                                        whileTap={{ scale: 0.97 }}
                                        style={{
                                            marginTop: 8, padding: '17px', borderRadius: 14, fontWeight: 900, fontSize: 15,
                                            background: `linear-gradient(135deg, ${AMBER}, #d97706, #fbbf24)`,
                                            backgroundSize: '200% auto',
                                            animation: 'shine-flow 2.5s linear infinite',
                                            boxShadow: `0 6px 24px rgba(245,158,11,0.4)`,
                                            border: 'none', color: '#000', cursor: isSubmitting ? 'wait' : 'pointer',
                                            letterSpacing: 0.5,
                                            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                                        }}
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <div style={{ width: 16, height: 16, borderRadius: '50%', border: '2px solid rgba(0,0,0,0.2)', borderTopColor: '#000', animation: 'spin 0.7s linear infinite' }} />
                                                Placing Order...
                                            </>
                                        ) : (
                                            <><FiPackage size={16} /> Book RK AI Home — ₹4,999</>
                                        )}
                                    </motion.button>
                                </motion.form>
                            )}
                        </AnimatePresence>
                    </motion.div>

                    {/* Order Summary */}
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.35 }}>
                        {/* Product card */}
                        <div style={{ background: 'rgba(10,10,18,0.75)', backdropFilter: 'blur(24px)', border: '1px solid rgba(245,158,11,0.12)', borderRadius: 24, padding: '32px', marginBottom: 20, position: 'relative', overflow: 'hidden' }}>
                            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, transparent, ${AMBER}88, transparent)` }} />
                            <div style={{ display: 'flex', alignItems: 'center', gap: 18, marginBottom: 28 }}>
                                <div style={{ width: 64, height: 64, borderRadius: 18, background: AMBER_SOFT, border: `1px solid rgba(245,158,11,0.25)`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                    <FiHome size={30} color={AMBER} />
                                </div>
                                <div>
                                    <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 2, color: AMBER, textTransform: 'uppercase', marginBottom: 4 }}>Your Order</div>
                                    <div style={{ fontSize: 20, fontWeight: 900 }}>RK AI Home</div>
                                    <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginTop: 2 }}>Ambient AI Hub · Raspberry Pi Zero W</div>
                                </div>
                            </div>

                            {/* Line items */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 20 }}>
                                {[
                                    ['Subtotal', '₹4,999'],
                                    ['Shipping', 'FREE', '#10b981'],
                                    ['Taxes', 'Included'],
                                ].map(([label, val, col]) => (
                                    <div key={label} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
                                        <span style={{ color: 'rgba(255,255,255,0.4)' }}>{label}</span>
                                        <span style={{ color: col || 'rgba(255,255,255,0.7)', fontWeight: 700 }}>{val}</span>
                                    </div>
                                ))}
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 20, fontWeight: 900, borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: 14, marginTop: 2 }}>
                                    <span>Total</span>
                                    <FlowText gradient={`linear-gradient(135deg, ${AMBER}, #fbbf24)`}>₹4,999</FlowText>
                                </div>
                            </div>
                        </div>

                        {/* Feature pills */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                            {[
                                [FiTruck, 'Free shipping across India'],
                                [FiPackage, 'Estimated delivery: Q3 2025'],
                                [FiCheck, 'No hidden charges'],
                                [FiHome, 'Compatible with any Wi-Fi network'],
                            ].map(([Icon, text]) => (
                                <div key={text} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 12 }}>
                                    <div style={{ width: 30, height: 30, borderRadius: 8, background: AMBER_SOFT, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                        <Icon size={14} color={AMBER} />
                                    </div>
                                    <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)', fontWeight: 600 }}>{text}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>

            <Footer />
            <ChatWidget />
            <style>{`
                @keyframes shine-flow { to { background-position: 200% center; } }
                @keyframes spin { to { transform: rotate(360deg); } }
            `}</style>
        </div>
    );
}

export default function PreOrderCheckout() {
    return (
        <Suspense fallback={
            <div style={{ background: '#010104', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div className="spinner" />
                <style>{`.spinner { width: 36px; height: 36px; border: 3px solid rgba(245,158,11,0.15); border-top-color: #f59e0b; border-radius: 50%; animation: spin 0.8s linear infinite; } @keyframes spin { to { transform: rotate(360deg); } }`}</style>
            </div>
        }>
            <PreOrderContent />
        </Suspense>
    );
}
