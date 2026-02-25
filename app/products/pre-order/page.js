'use client';
import Navbar from '@/components/Navbar';
import ChatWidget from '@/components/ChatWidget';
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter, useSearchParams } from 'next/navigation';

export default function PreOrderCheckout() {
    const { user, loading: authLoading } = useAuth();
    const router = useRouter();
    const searchParams = useSearchParams();
    const productId = searchParams.get('productId') || 'rkai_home';
    
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        address: '',
        city: '',
        zipCode: '',
        country: 'India'
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (!authLoading && !user) {
            router.push(`/login?redirect=/products/pre-order?productId=${productId}`);
        }
    }, [user, authLoading, router, productId]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Placeholder for payment gateway integration (Razorpay/Stripe)
        setTimeout(() => {
            alert('Redirecting to secure payment gateway...');
            setIsSubmitting(false);
        }, 1500);
    };

    if (authLoading || !user) {
        return <div style={{ background: 'var(--background)', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><div className="spinner"></div></div>;
    }

    return (
        <div style={{ background: 'var(--background)', minHeight: '100vh', color: 'var(--text)' }}>
            <Navbar />
            <div style={{ padding: '140px 5% 80px', maxWidth: '1000px', margin: '0 auto' }}>
                <h1 style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: '900', marginBottom: '40px', textAlign: 'center' }}>
                    Complete Your <span className="grad">Pre-order</span>
                </h1>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '40px' }}>
                    {/* Checkout Form */}
                    <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '24px', padding: '40px' }}>
                        <h2 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '24px' }}>Shipping Details</h2>
                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            <div>
                                <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: 'var(--muted)', textTransform: 'uppercase', marginBottom: '8px' }}>Full Name</label>
                                <input name="fullName" value={formData.fullName} onChange={handleChange} required style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)', borderRadius: '10px', padding: '12px', color: 'var(--text)' }} />
                            </div>
                            <div>
                                <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: 'var(--muted)', textTransform: 'uppercase', marginBottom: '8px' }}>Email Address</label>
                                <input name="email" type="email" value={formData.email} onChange={handleChange} required style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)', borderRadius: '10px', padding: '12px', color: 'var(--text)' }} />
                            </div>
                            <div>
                                <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: 'var(--muted)', textTransform: 'uppercase', marginBottom: '8px' }}>Shipping Address</label>
                                <textarea name="address" value={formData.address} onChange={handleChange} required style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)', borderRadius: '10px', padding: '12px', color: 'var(--text)', minHeight: '100px' }} />
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                                <div>
                                    <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: 'var(--muted)', textTransform: 'uppercase', marginBottom: '8px' }}>City</label>
                                    <input name="city" value={formData.city} onChange={handleChange} required style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)', borderRadius: '10px', padding: '12px', color: 'var(--text)' }} />
                                </div>
                                <div>
                                    <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: 'var(--muted)', textTransform: 'uppercase', marginBottom: '8px' }}>ZIP Code</label>
                                    <input name="zipCode" value={formData.zipCode} onChange={handleChange} required style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)', borderRadius: '10px', padding: '12px', color: 'var(--text)' }} />
                                </div>
                            </div>
                            <button type="submit" disabled={isSubmitting} className="btn-primary" style={{ marginTop: '20px', padding: '16px', borderRadius: '50px', fontWeight: '800', background: 'linear-gradient(135deg, #f59e0b, #d97706)' }}>
                                {isSubmitting ? 'Processing...' : 'Proceed to Payment'}
                            </button>
                        </form>
                    </div>

                    {/* Order Summary */}
                    <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '24px', padding: '40px', alignSelf: 'start' }}>
                        <h2 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '24px' }}>Order Summary</h2>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '24px', paddingBottom: '24px', borderBottom: '1px solid var(--border)' }}>
                            <div style={{ fontSize: '40px', background: 'rgba(255,255,255,0.05)', padding: '20px', borderRadius: '16px' }}>🏠</div>
                            <div>
                                <h3 style={{ fontSize: '18px', fontWeight: '700' }}>RK AI Home</h3>
                                <p style={{ color: 'var(--muted)', fontSize: '14px' }}>Ambient AI Hub</p>
                            </div>
                            <div style={{ marginLeft: 'auto', fontWeight: '800' }}>₹9,999</div>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--muted)' }}>
                                <span>Subtotal</span>
                                <span>₹9,999</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--muted)' }}>
                                <span>Shipping</span>
                                <span style={{ color: '#10b981' }}>FREE</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '20px', fontWeight: '900', marginTop: '12px', paddingTop: '12px', borderTop: '1px solid var(--border)' }}>
                                <span>Total</span>
                                <span className="grad">₹9,999</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ChatWidget />
        </div>
    );
}
