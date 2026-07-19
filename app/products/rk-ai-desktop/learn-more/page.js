'use client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ChatWidget from '@/components/ChatWidget';
import Link from 'next/link';
import { FiArrowRight, FiShield, FiCpu, FiServer, FiSettings } from 'react-icons/fi';

const features = [
  { title: 'Dedicated Onboarding', desc: 'White-glove setup and integration for your entire organization, ensuring a smooth transition to local AI workflows.' },
  { title: 'Custom Integrations', desc: 'Connect RK AI Desktop to your proprietary internal tools, databases, and enterprise systems securely.' },
  { title: 'Priority Support', desc: 'Direct line to our core engineering team with guaranteed SLA for immediate issue resolution.' },
  { title: 'Advanced Security', desc: 'Enterprise-grade encryption, on-premise deployment options, and full audit logs for compliance.' },
];

export default function EnterpriseLearnMore() {
  return (
    <div className="enterprise-shell">
      <Navbar />

      <main className="page-wrapper">
        <section className="hero">
          <div className="hero-content">
            <span className="hero-tag">Enterprise Matrix</span>
            <h1>Scale your organization with RK AI.</h1>
            <p>
              Full customization for teams who need more than a standard subscription — dedicated onboarding, tailored workflows, private deployment, and a direct line to our enterprise team.
            </p>
            <div className="hero-actions">
              <button onClick={() => document.dispatchEvent(new Event('rk-chat-open'))} className="btn-primary">
                Chat with Us <FiArrowRight size={18} />
              </button>
              <Link href="/products/rk-ai-desktop" className="btn-secondary">
                Back to Product
              </Link>
            </div>
          </div>
          <div className="hero-card">
            <div className="hero-card-inner">
              <FiServer size={48} color="#9b59f5" style={{ marginBottom: '24px' }} />
              <div className="card-stat">Enterprise Ready</div>
              <p>Massive scale, custom storage, unlimited autonomous agents, and raw dedicated processing power.</p>
            </div>
          </div>
        </section>

        <section className="features-grid">
          <div className="section-header">
            <span>Enterprise Features</span>
            <h2>Built for scale and security.</h2>
          </div>
          <div className="feature-cards">
            {features.map((feature) => (
              <div key={feature.title} className="feature-card">
                <h3>{feature.title}</h3>
                <p>{feature.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="action-section">
          <div className="action-card">
            <div>
              <h2>Ready to upgrade your team?</h2>
              <p>
                Get in touch with our enterprise team to discuss custom pricing and deployment options tailored to your needs.
              </p>
            </div>
            <div className="action-buttons">
              <Link href="/contact" className="btn-primary">Request a Proposal</Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <ChatWidget />

      <style jsx>{`
        .enterprise-shell {
          background: var(--background);
          color: var(--text);
          min-height: 100vh;
        }
        .page-wrapper {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 24px 80px;
        }
        .hero {
          display: grid;
          grid-template-columns: 1.4fr 1fr;
          gap: 40px;
          align-items: center;
          padding: 120px 0 80px;
        }
        .hero-tag {
          display: inline-flex;
          padding: 10px 16px;
          border-radius: 999px;
          background: rgba(155, 89, 245, 0.1);
          color: #9b59f5;
          font-size: 13px;
          letter-spacing: 1px;
          font-weight: 700;
          margin-bottom: 24px;
          text-transform: uppercase;
        }
        .hero h1 {
          font-size: clamp(42px, 6vw, 72px);
          line-height: 1.05;
          margin-bottom: 24px;
          max-width: 650px;
          font-weight: 900;
        }
        .hero p {
          max-width: 600px;
          font-size: 18px;
          line-height: 1.8;
          color: var(--muted);
          margin-bottom: 32px;
        }
        .hero-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 16px;
        }
        .hero-card {
          background: linear-gradient(180deg, rgba(155,89,245,0.08), rgba(79,156,249,0.05));
          border: 1px solid rgba(155,89,245,0.15);
          border-radius: 32px;
          min-height: 380px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px;
          position: relative;
          text-align: center;
        }
        .card-stat {
          font-size: 36px;
          font-weight: 900;
          margin-bottom: 18px;
        }
        .hero-card p {
          color: var(--muted);
          line-height: 1.6;
          margin: 0;
        }
        .features-grid {
          padding: 80px 0;
        }
        .section-header {
          text-align: center;
          margin-bottom: 60px;
        }
        .section-header span {
          display: inline-block;
          color: #9b59f5;
          font-weight: 700;
          letter-spacing: 1px;
          text-transform: uppercase;
          margin-bottom: 12px;
        }
        .section-header h2 {
          font-size: clamp(32px, 4vw, 48px);
          font-weight: 800;
        }
        .feature-cards {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 24px;
        }
        .feature-card {
          padding: 32px;
          border-radius: 24px;
          background: var(--surface);
          border: 1px solid var(--border);
          transition: transform 0.25s ease, border-color 0.25s ease;
        }
        .feature-card:hover {
          transform: translateY(-5px);
          border-color: rgba(155,89,245,0.4);
        }
        .feature-card h3 {
          margin-bottom: 16px;
          font-size: 22px;
          font-weight: 800;
        }
        .feature-card p {
          color: var(--muted);
          line-height: 1.7;
          margin: 0;
        }
        .action-section {
          padding: 40px 0 80px;
        }
        .action-card {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
          padding: 48px;
          border-radius: 32px;
          background: linear-gradient(135deg, rgba(155,89,245,0.08), rgba(79,156,249,0.08));
          border: 1px solid rgba(155,89,245,0.2);
        }
        .action-card h2 {
          font-size: clamp(28px, 4vw, 40px);
          font-weight: 900;
          margin-bottom: 16px;
        }
        .action-card p {
          color: var(--muted);
          line-height: 1.7;
          max-width: 600px;
          margin: 0;
        }
        .btn-primary, .btn-secondary {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          border-radius: 999px;
          font-weight: 800;
          padding: 16px 32px;
          text-decoration: none;
          transition: all 0.3s ease;
          border: none;
          cursor: pointer;
          font-family: inherit;
          font-size: 16px;
        }
        .btn-primary {
          background: linear-gradient(135deg, #9b59f5, #4f9cf9);
          color: #fff;
          box-shadow: 0 10px 30px rgba(155,89,245,0.3);
        }
        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 15px 40px rgba(155,89,245,0.4);
        }
        .btn-secondary {
          background: rgba(255,255,255,0.05);
          color: #fff;
          border: 1px solid rgba(255,255,255,0.1);
        }
        .btn-secondary:hover {
          background: rgba(255,255,255,0.08);
          transform: translateY(-2px);
        }

        @media (max-width: 900px) {
          .hero {
            grid-template-columns: 1fr;
            padding-top: 80px;
          }
          .action-card {
            flex-direction: column;
            text-align: center;
            align-items: center;
          }
        }
      `}</style>
    </div>
  );
}
