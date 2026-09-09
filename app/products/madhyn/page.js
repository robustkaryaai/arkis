'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ChatWidget from '@/components/ChatWidget';
import BackButton from '@/components/BackButton';

import { motion } from 'framer-motion';
import {
  FiActivity,
  FiArrowRight,
  FiCheckCircle,
  FiChevronRight,
  FiCode,
  FiCommand,
  FiCpu,
  FiFileText,
  FiLayers,
  FiPlay,
  FiShield,
  FiTarget,
  FiTerminal,
} from 'react-icons/fi';

import Link from 'next/link';

import {
  StarField,
  Card3D,
  staggerContainer,
  fadeUp,
  textVariant,
} from '@/components/SpaceUI';

const ACCENT = '#c7cdd4';
const BRIGHT = '#f1f3f5';

const MISSION_STAGES = [
  {
    label: 'CONTEXT',
    title: 'Understand',
    icon: <FiLayers />,
  },
  {
    label: 'REASON',
    title: 'Plan',
    icon: <FiTarget />,
  },
  {
    label: 'ACTION',
    title: 'Execute',
    icon: <FiTerminal />,
  },
  {
    label: 'PROOF',
    title: 'Verify',
    icon: <FiShield />,
  },
];

const FEATURES = [
  {
    icon: <FiLayers />,
    eyebrow: 'PROJECT INTELLIGENCE',
    title: 'Understands the project before touching it.',
    description:
      'MADHYN works from repository context instead of treating every request like an isolated prompt. Structure, files, dependencies and existing patterns become part of the mission.',
  },
  {
    icon: <FiTarget />,
    eyebrow: 'MISSION PLANNING',
    title: 'Turns objectives into executable work.',
    description:
      'Give MADHYN the outcome you want. It can transform that objective into a sequence of concrete development actions and keep the mission moving.',
  },
  {
    icon: <FiTerminal />,
    eyebrow: 'AUTONOMOUS EXECUTION',
    title: 'Moves beyond suggestions.',
    description:
      'MADHYN is built around execution. It can work through the project, apply changes and continue through the mission instead of stopping after generating an answer.',
  },
  {
    icon: <FiCheckCircle />,
    eyebrow: 'VERIFICATION',
    title: 'Treats verification as part of done.',
    description:
      'Tests, builds, checks and project validation belong inside the loop. The objective is not simply to produce code, but to establish whether the resulting work actually holds together.',
  },
];

function MissionControl() {
  return (
    <Card3D
      style={{
        padding: 0,
        overflow: 'hidden',
        background: 'rgba(7, 8, 10, 0.84)',
      }}
      orbColor="rgba(199,205,212,0.16)"
    >
      <div className="mission-console">
        <div className="console-topbar">
          <div className="window-dots">
            <span />
            <span />
            <span />
          </div>

          <div className="console-title">
            <FiActivity />
            MADHYN / MISSION CONTROL
          </div>

          <div className="console-status">
            <i />
            ACTIVE
          </div>
        </div>

        <div className="console-body">
          <div className="mission-heading">
            <div>
              <div className="console-label">CURRENT MISSION</div>

              <h3>Rebuild authentication flow</h3>

              <p>
                Refactor the existing authentication layer and verify the
                resulting application.
              </p>
            </div>

            <div className="mission-id">M-0842</div>
          </div>

          <div className="progress-area">
            <div className="progress-info">
              <span>MISSION PROGRESS</span>
              <strong>61%</strong>
            </div>

            <div className="progress-track">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: '61%' }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: 'easeOut' }}
              />
            </div>
          </div>

          <div className="stage-list">
            {MISSION_STAGES.map((stage, index) => (
              <div
                className={`mission-stage ${
                  index < 2
                    ? 'complete'
                    : index === 2
                      ? 'active'
                      : ''
                }`}
                key={stage.title}
              >
                <div className="stage-icon">{stage.icon}</div>

                <div className="stage-copy">
                  <small>{stage.label}</small>
                  <span>{stage.title}</span>
                </div>

                <div className="stage-state">
                  {index < 2 ? (
                    <FiCheckCircle />
                  ) : index === 2 ? (
                    <i className="running-dot" />
                  ) : (
                    <i className="queued-dot" />
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="terminal">
            <div className="terminal-header">
              <span>EXECUTION LOG</span>
              <span>LIVE STREAM</span>
            </div>

            <div className="terminal-line">
              <b>$</b>
              madhyn --mission auth-rebuild --verify
            </div>

            <div className="terminal-line muted">
              <b>›</b>
              Repository context loaded
            </div>

            <div className="terminal-line muted">
              <b>›</b>
              6 relevant files identified
            </div>

            <div className="terminal-line">
              <b>›</b>
              Applying implementation plan
              <i className="cursor" />
            </div>
          </div>
        </div>
      </div>
    </Card3D>
  );
}

function MissionLoop() {
  const stages = [
    {
      number: '01',
      title: 'COMMAND',
      description: 'Define the objective.',
      icon: <FiCommand />,
    },
    {
      number: '02',
      title: 'UNDERSTAND',
      description: 'Build project context.',
      icon: <FiLayers />,
    },
    {
      number: '03',
      title: 'PLAN',
      description: 'Create the execution path.',
      icon: <FiTarget />,
    },
    {
      number: '04',
      title: 'EXECUTE',
      description: 'Apply the actual changes.',
      icon: <FiPlay />,
    },
    {
      number: '05',
      title: 'VERIFY',
      description: 'Test what was built.',
      icon: <FiShield />,
    },
    {
      number: '06',
      title: 'REPORT',
      description: 'Show what happened.',
      icon: <FiFileText />,
    },
  ];

  return (
    <div className="mission-loop">
      {stages.map((stage, index) => (
        <motion.div
          variants={fadeUp}
          className="loop-card"
          key={stage.number}
        >
          <div className="loop-top">
            <span>{stage.number}</span>

            {index !== stages.length - 1 && <FiChevronRight />}
          </div>

          <div className="loop-icon">{stage.icon}</div>

          <h3>{stage.title}</h3>

          <p>{stage.description}</p>
        </motion.div>
      ))}
    </div>
  );
}

export default function MadhynPage() {
  return (
    <main className="madhyn-page">
      <StarField />

      {/* VENAVA-STYLE AMBIENT LIGHTING, MADHYN SILVER PALETTE */}
      <div className="madhyn-glow madhyn-glow-one" />
      <div className="madhyn-glow madhyn-glow-two" />
      <div className="madhyn-glow madhyn-glow-three" />

      <div className="madhyn-noise" />

      <Navbar />
      <BackButton />

      {/* HERO */}

      <section className="madhyn-hero">
        <div className="hero-orbit" />

        <motion.div
          className="hero-inner"
          variants={staggerContainer(0.1, 0.08)}
          initial="hidden"
          animate="show"
        >
          <motion.div variants={fadeUp} className="hero-badge">
            <span />
            AUTONOMOUS DEVELOPER SYSTEM
          </motion.div>

          <motion.h1 variants={textVariant(0.05)}>
            MADHYN
          </motion.h1>

          <motion.div variants={fadeUp} className="hero-tagline">
            Your command center for autonomous development.
          </motion.div>

          <motion.p variants={fadeUp} className="hero-description">
            An autonomous developer system that understands your project,
            plans work, executes changes, verifies results, and reports what
            it accomplished — turning software development into a mission you
            can command.
          </motion.p>

          <motion.div variants={fadeUp} className="hero-actions">
            <a href="#mission" className="primary-button">
              See the mission
              <FiArrowRight />
            </a>

            <Link
              href="/products/madhyn/learn-more"
              className="secondary-button"
            >
              Explore the architecture
            </Link>
          </motion.div>

          <motion.div variants={fadeUp} className="hero-system-line">
            <span>
              <FiActivity />
              MISSION CONTROL
            </span>

            <i />

            <span>
              <FiCpu />
              AUTONOMOUS ENGINE
            </span>

            <i />

            <span>
              <FiCheckCircle />
              VERIFIED OUTPUT
            </span>
          </motion.div>
        </motion.div>
      </section>

      {/* MISSION */}

      <section id="mission" className="mission-section">
        <div className="content-container">
          <motion.div
            variants={staggerContainer(0.1, 0.08)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
          >
            <motion.div variants={fadeUp} className="section-eyebrow">
              <span />
              THE DIFFERENCE
            </motion.div>

            <motion.div variants={fadeUp} className="mission-heading">
              <div>
                <h2>
                  Don't just ask for code.
                  <br />
                  <span>Command the mission.</span>
                </h2>
              </div>

              <p>
                MADHYN is designed around a continuous development loop.
                Context, planning, execution and verification are part of the
                same system.
              </p>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="mission-console-wrap"
            >
              <MissionControl />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* LOOP */}

      <section className="loop-section">
        <div className="content-container">
          <motion.div
            variants={staggerContainer(0.08, 0.07)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.12 }}
          >
            <motion.div variants={fadeUp} className="section-eyebrow">
              <span />
              THE MISSION LOOP
            </motion.div>

            <motion.h2 variants={textVariant(0)}>
              From objective
              <br />
              <span>to verified result.</span>
            </motion.h2>

            <motion.p variants={fadeUp} className="section-description">
              The point isn't to make another chatbot that writes snippets.
              MADHYN is built around completing development objectives.
            </motion.p>

            <MissionLoop />
          </motion.div>
        </div>
      </section>

      {/* FEATURES */}

      <section className="features-section">
        <div className="content-container">
          <motion.div
            variants={staggerContainer(0.1, 0.08)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.12 }}
          >
            <motion.div variants={fadeUp} className="section-eyebrow">
              <span />
              CORE CAPABILITIES
            </motion.div>

            <motion.h2 variants={textVariant(0)}>
              Intelligence that
              <br />
              <span>actually moves.</span>
            </motion.h2>

            <div className="features-grid">
              {FEATURES.map((feature) => (
                <motion.div
                  variants={fadeUp}
                  className="feature-card"
                  key={feature.title}
                >
                  <div className="feature-icon">
                    {feature.icon}
                  </div>

                  <div className="feature-eyebrow">
                    {feature.eyebrow}
                  </div>

                  <h3>{feature.title}</h3>

                  <p>{feature.description}</p>

                  <div className="feature-line" />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* FINAL */}

      <section className="final-section">
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="final-symbol">
            <FiCpu />
          </div>

          <div className="section-eyebrow">
            <span />
            MADHYN
          </div>

          <h2>
            Your project.
            <br />
            <span>Your objective.</span>
            <br />
            <strong>The mission.</strong>
          </h2>

          <p>
            Development doesn't have to mean manually coordinating every
            step. MADHYN is being built to turn intent into execution.
          </p>

          <div className="final-actions">
            <Link
              href="/products/madhyn/learn-more"
              className="primary-button"
            >
              Explore MADHYN
              <FiArrowRight />
            </Link>

            <Link
              href="/products"
              className="secondary-button"
            >
              Explore RexyCore
            </Link>
          </div>
        </motion.div>
      </section>

      <Footer />
      <ChatWidget />

      <style jsx global>{`
        .madhyn-page {
          position: relative;
          min-height: 100vh;
          overflow-x: hidden;
          background: #010104;
          color: #fff;
        }

        /* =========================================================
           AMBIENT GLOW
           Venava-like atmospheric lighting, converted to silver.
           ========================================================= */

        .madhyn-glow {
          position: absolute;
          pointer-events: none;
          z-index: 1;
          border-radius: 50%;
          filter: blur(90px);
        }

        .madhyn-glow-one {
          width: 620px;
          height: 620px;
          top: 70px;
          left: 50%;
          transform: translateX(-50%);
          background: radial-gradient(
            circle,
            rgba(199, 205, 212, 0.105) 0%,
            rgba(199, 205, 212, 0.045) 28%,
            rgba(199, 205, 212, 0.012) 52%,
            transparent 72%
          );
          opacity: 0.9;
        }

        .madhyn-glow-two {
          width: 500px;
          height: 500px;
          top: 780px;
          left: -250px;
          background: radial-gradient(
            circle,
            rgba(199, 205, 212, 0.055),
            transparent 70%
          );
        }

        .madhyn-glow-three {
          width: 500px;
          height: 500px;
          top: 1100px;
          right: -250px;
          background: radial-gradient(
            circle,
            rgba(241, 243, 245, 0.04),
            transparent 70%
          );
        }

        .madhyn-noise {
          position: fixed;
          inset: 0;
          z-index: 2;
          pointer-events: none;
          opacity: 0.022;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.55'/%3E%3C/svg%3E");
        }

        .content-container {
          width: min(1120px, calc(100% - 48px));
          margin: 0 auto;
          position: relative;
          z-index: 5;
        }

        /* =========================================================
           HERO
           ========================================================= */

        .madhyn-hero {
          position: relative;
          z-index: 5;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 150px 24px 105px;
          text-align: center;
          isolation: isolate;
        }

        .hero-inner {
          width: min(1050px, 100%);
          position: relative;
          z-index: 4;
        }

        .hero-orbit {
          position: absolute;
          width: min(720px, 90vw);
          height: min(720px, 90vw);
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          border: 1px solid rgba(199, 205, 212, 0.035);
          border-radius: 50%;
          pointer-events: none;
          box-shadow:
            0 0 100px rgba(199, 205, 212, 0.025),
            inset 0 0 100px rgba(199, 205, 212, 0.015);
        }

        .hero-orbit::before,
        .hero-orbit::after {
          content: '';
          position: absolute;
          border-radius: 50%;
          border: 1px solid rgba(199, 205, 212, 0.025);
        }

        .hero-orbit::before {
          inset: 65px;
        }

        .hero-orbit::after {
          inset: 135px;
        }

        .hero-badge {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 9px;
          padding: 8px 15px;
          margin-bottom: 30px;
          border: 1px solid rgba(199, 205, 212, 0.18);
          border-radius: 999px;
          background: rgba(199, 205, 212, 0.045);
          box-shadow:
            0 0 25px rgba(199, 205, 212, 0.035),
            inset 0 0 15px rgba(255, 255, 255, 0.018);
          color: rgba(255, 255, 255, 0.58);
          font-size: 9px;
          font-weight: 800;
          letter-spacing: 1.8px;
        }

        .hero-badge > span {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: ${BRIGHT};
          box-shadow:
            0 0 8px rgba(241, 243, 245, 0.8),
            0 0 18px rgba(199, 205, 212, 0.35);
          animation: madhynPulse 2s ease-in-out infinite;
        }

        .madhyn-hero h1 {
          position: relative;
          margin: 0;
          font-size: clamp(80px, 15vw, 190px);
          line-height: 0.78;
          letter-spacing: -0.085em;
          font-weight: 950;
          background: linear-gradient(
            145deg,
            #ffffff 0%,
            #a5adb6 26%,
            #ffffff 45%,
            #737c86 69%,
            #ffffff 100%
          );
          background-size: 180% auto;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          filter: drop-shadow(0 0 30px rgba(199, 205, 212, 0.08));
          animation: madhynMetal 8s linear infinite;
        }

        .hero-tagline {
          position: relative;
          margin-top: 36px;
          color: rgba(255, 255, 255, 0.82);
          font-size: clamp(18px, 2.2vw, 25px);
          font-weight: 700;
          letter-spacing: -0.025em;
        }

        .hero-description {
          width: min(700px, 100%);
          margin: 22px auto 0;
          color: rgba(255, 255, 255, 0.45);
          font-size: 16px;
          line-height: 1.75;
        }

        .hero-actions {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 11px;
          flex-wrap: wrap;
          margin-top: 36px;
        }

        .primary-button,
        .secondary-button {
          min-height: 50px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 9px;
          padding: 0 23px;
          border-radius: 999px;
          text-decoration: none;
          font-size: 13px;
          font-weight: 800;
          transition:
            transform 0.25s ease,
            border-color 0.25s ease,
            background 0.25s ease,
            box-shadow 0.25s ease;
        }

        .primary-button {
          color: #050608;
          background: #f4f5f6;
          box-shadow:
            0 0 25px rgba(241, 243, 245, 0.08),
            0 8px 35px rgba(0, 0, 0, 0.3);
        }

        .secondary-button {
          color: rgba(255, 255, 255, 0.76);
          border: 1px solid rgba(255, 255, 255, 0.1);
          background: rgba(255, 255, 255, 0.035);
        }

        .primary-button:hover,
        .secondary-button:hover {
          transform: translateY(-2px);
        }

        .primary-button:hover {
          box-shadow:
            0 0 35px rgba(241, 243, 245, 0.13),
            0 10px 40px rgba(0, 0, 0, 0.35);
        }

        .secondary-button:hover {
          border-color: rgba(199, 205, 212, 0.25);
          background: rgba(255, 255, 255, 0.06);
          box-shadow: 0 0 25px rgba(199, 205, 212, 0.025);
        }

        .hero-system-line {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 15px;
          margin-top: 65px;
          color: rgba(255, 255, 255, 0.24);
          font-family: monospace;
          font-size: 8px;
          letter-spacing: 1.5px;
        }

        .hero-system-line span {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .hero-system-line svg {
          color: rgba(199, 205, 212, 0.7);
        }

        .hero-system-line i {
          width: 3px;
          height: 3px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.2);
        }

        /* =========================================================
           MISSION
           ========================================================= */

        .mission-section {
          position: relative;
          z-index: 5;
          padding: 125px 0;
        }

        .section-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 9px;
          padding: 6px 11px;
          border: 1px solid rgba(199, 205, 212, 0.11);
          border-radius: 7px;
          background: rgba(199, 205, 212, 0.045);
          box-shadow: 0 0 25px rgba(199, 205, 212, 0.02);
          color: rgba(255, 255, 255, 0.42);
          font-family: monospace;
          font-size: 9px;
          font-weight: 800;
          letter-spacing: 1.7px;
        }

        .section-eyebrow > span {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: ${ACCENT};
          box-shadow: 0 0 9px rgba(199, 205, 212, 0.45);
        }

        .mission-heading {
          display: grid;
          grid-template-columns: 1.15fr 0.85fr;
          gap: 60px;
          align-items: end;
          margin-top: 25px;
        }

        .mission-heading h2,
        .loop-section h2,
        .features-section h2 {
          margin: 0;
          font-size: clamp(42px, 5.5vw, 68px);
          line-height: 0.97;
          letter-spacing: -0.06em;
          font-weight: 900;
        }

        .mission-heading h2 span,
        .loop-section h2 span,
        .features-section h2 span {
          color: rgba(255, 255, 255, 0.3);
        }

        .mission-heading p,
        .section-description {
          margin: 0;
          color: rgba(255, 255, 255, 0.42);
          font-size: 15px;
          line-height: 1.75;
        }

        .mission-console-wrap {
          position: relative;
          margin-top: 55px;
        }

        .mission-console-wrap::before {
          content: '';
          position: absolute;
          inset: -50px 10%;
          z-index: -1;
          border-radius: 50%;
          background: radial-gradient(
            ellipse,
            rgba(199, 205, 212, 0.065),
            transparent 68%
          );
          filter: blur(45px);
          pointer-events: none;
        }

        /* =========================================================
           CONSOLE
           ========================================================= */

        .mission-console {
          width: 100%;
        }

        .console-topbar {
          min-height: 48px;
          display: flex;
          align-items: center;
          padding: 0 17px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.065);
          background: rgba(255, 255, 255, 0.025);
        }

        .window-dots {
          width: 110px;
          display: flex;
          gap: 6px;
        }

        .window-dots span {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.15);
        }

        .console-title {
          display: flex;
          align-items: center;
          gap: 7px;
          color: rgba(255, 255, 255, 0.4);
          font-family: monospace;
          font-size: 9px;
          letter-spacing: 1px;
        }

        .console-status {
          display: flex;
          align-items: center;
          gap: 7px;
          margin-left: auto;
          color: rgba(255, 255, 255, 0.25);
          font-family: monospace;
          font-size: 8px;
          letter-spacing: 1px;
        }

        .console-status i {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #eef0f2;
          box-shadow:
            0 0 8px rgba(241, 243, 245, 0.7),
            0 0 16px rgba(199, 205, 212, 0.25);
        }

        .console-body {
          padding: 35px;
        }

        .mission-heading h3 {
          margin: 0;
        }

        .console-label {
          margin-bottom: 9px;
          color: rgba(255, 255, 255, 0.24);
          font-family: monospace;
          font-size: 8px;
          letter-spacing: 1.8px;
        }

        .mission-heading > div:first-child h3 {
          font-size: clamp(22px, 3vw, 31px);
          line-height: 1.1;
          letter-spacing: -0.035em;
        }

        .mission-heading > div:first-child p {
          max-width: 590px;
          margin: 10px 0 0;
          color: rgba(255, 255, 255, 0.32);
          font-size: 12px;
          line-height: 1.6;
        }

        .mission-id {
          padding: 7px 10px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 6px;
          color: rgba(255, 255, 255, 0.35);
          font-family: monospace;
          font-size: 9px;
        }

        .progress-area {
          margin-top: 30px;
        }

        .progress-info {
          display: flex;
          justify-content: space-between;
          margin-bottom: 9px;
          color: rgba(255, 255, 255, 0.25);
          font-family: monospace;
          font-size: 8px;
          letter-spacing: 1px;
        }

        .progress-info strong {
          color: rgba(255, 255, 255, 0.6);
        }

        .progress-track {
          height: 3px;
          overflow: hidden;
          border-radius: 99px;
          background: rgba(255, 255, 255, 0.07);
        }

        .progress-track div {
          height: 100%;
          border-radius: inherit;
          background: linear-gradient(90deg, #747c85, #f1f3f5);
          box-shadow:
            0 0 12px rgba(199, 205, 212, 0.35),
            0 0 25px rgba(199, 205, 212, 0.12);
        }

        .stage-list {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 8px;
          margin-top: 20px;
        }

        .mission-stage {
          min-width: 0;
          padding: 15px;
          border: 1px solid rgba(255, 255, 255, 0.055);
          border-radius: 10px;
          background: rgba(255, 255, 255, 0.018);
          transition:
            border-color 0.25s ease,
            background 0.25s ease,
            box-shadow 0.25s ease;
        }

        .mission-stage.active {
          border-color: rgba(199, 205, 212, 0.19);
          background: rgba(199, 205, 212, 0.045);
          box-shadow:
            0 0 30px rgba(199, 205, 212, 0.035),
            inset 0 0 25px rgba(199, 205, 212, 0.018);
        }

        .stage-icon {
          width: 30px;
          height: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 12px;
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.04);
          color: rgba(255, 255, 255, 0.25);
          font-size: 14px;
        }

        .mission-stage.complete .stage-icon {
          color: #e0e4e8;
        }

        .mission-stage.active .stage-icon {
          color: #fff;
          box-shadow: 0 0 15px rgba(199, 205, 212, 0.08);
        }

        .stage-copy small {
          display: block;
          margin-bottom: 4px;
          color: rgba(255, 255, 255, 0.2);
          font-family: monospace;
          font-size: 7px;
          letter-spacing: 1.2px;
        }

        .stage-copy span {
          display: block;
          color: rgba(255, 255, 255, 0.62);
          font-size: 12px;
          font-weight: 700;
        }

        .stage-state {
          height: 20px;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          margin-top: 4px;
        }

        .stage-state svg {
          color: #dce1e6;
          font-size: 12px;
        }

        .running-dot,
        .queued-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
        }

        .running-dot {
          background: #f1f3f5;
          box-shadow:
            0 0 8px rgba(241, 243, 245, 0.75),
            0 0 18px rgba(199, 205, 212, 0.25);
          animation: madhynPulse 1.5s infinite;
        }

        .queued-dot {
          border: 1px solid rgba(255, 255, 255, 0.16);
        }

        .terminal {
          margin-top: 20px;
          padding: 17px;
          border: 1px solid rgba(255, 255, 255, 0.065);
          border-radius: 10px;
          background: #040507;
          box-shadow:
            0 0 40px rgba(0, 0, 0, 0.25),
            inset 0 0 30px rgba(199, 205, 212, 0.012);
          font-family: monospace;
        }

        .terminal-header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 13px;
          color: rgba(255, 255, 255, 0.2);
          font-size: 7px;
          letter-spacing: 1.3px;
        }

        .terminal-line {
          min-height: 25px;
          display: flex;
          align-items: center;
          gap: 8px;
          color: rgba(255, 255, 255, 0.66);
          font-size: 10px;
        }

        .terminal-line b {
          color: #dfe3e7;
        }

        .terminal-line.muted {
          color: rgba(255, 255, 255, 0.29);
        }

        .cursor {
          width: 5px;
          height: 11px;
          margin-left: 1px;
          background: rgba(255, 255, 255, 0.7);
          animation: madhynBlink 1s step-end infinite;
        }

        /* =========================================================
           LOOP
           ========================================================= */

        .loop-section {
          position: relative;
          z-index: 5;
          padding: 125px 0;
          background:
            radial-gradient(
              ellipse at 50% 35%,
              rgba(199, 205, 212, 0.032),
              transparent 63%
            );
        }

        .section-description {
          width: min(650px, 100%);
          margin-top: 24px;
        }

        .mission-loop {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
          margin-top: 55px;
        }

        .loop-card {
          min-height: 190px;
          padding: 24px;
          border: 1px solid rgba(255, 255, 255, 0.065);
          border-radius: 17px;
          background: rgba(255, 255, 255, 0.018);
          transition:
            transform 0.25s ease,
            border-color 0.25s ease,
            box-shadow 0.25s ease;
        }

        .loop-card:hover {
          transform: translateY(-4px);
          border-color: rgba(199, 205, 212, 0.18);
          box-shadow: 0 12px 45px rgba(199, 205, 212, 0.025);
        }

        .loop-top {
          display: flex;
          justify-content: space-between;
          color: rgba(255, 255, 255, 0.19);
          font-family: monospace;
          font-size: 9px;
        }

        .loop-top svg {
          color: rgba(255, 255, 255, 0.13);
        }

        .loop-icon {
          width: 38px;
          height: 38px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: 25px;
          border: 1px solid rgba(199, 205, 212, 0.11);
          border-radius: 10px;
          background: rgba(199, 205, 212, 0.055);
          color: #dce1e6;
          box-shadow: 0 0 20px rgba(199, 205, 212, 0.025);
        }

        .loop-card h3 {
          margin: 17px 0 6px;
          font-family: monospace;
          font-size: 12px;
          letter-spacing: 1.3px;
        }

        .loop-card p {
          margin: 0;
          color: rgba(255, 255, 255, 0.32);
          font-size: 12px;
        }

        /* =========================================================
           FEATURES
           ========================================================= */

        .features-section {
          position: relative;
          z-index: 5;
          padding: 125px 0;
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 15px;
          margin-top: 55px;
        }

        .feature-card {
          position: relative;
          min-height: 285px;
          overflow: hidden;
          padding: 30px;
          border: 1px solid rgba(255, 255, 255, 0.065);
          border-radius: 18px;
          background:
            linear-gradient(
              145deg,
              rgba(255, 255, 255, 0.04),
              rgba(255, 255, 255, 0.012)
            );
          transition:
            border-color 0.25s ease,
            transform 0.25s ease,
            box-shadow 0.25s ease;
        }

        .feature-card:hover {
          transform: translateY(-3px);
          border-color: rgba(199, 205, 212, 0.17);
          box-shadow: 0 15px 55px rgba(199, 205, 212, 0.022);
        }

        .feature-icon {
          width: 42px;
          height: 42px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 24px;
          border: 1px solid rgba(199, 205, 212, 0.11);
          border-radius: 11px;
          background: rgba(199, 205, 212, 0.06);
          color: #dfe3e7;
          box-shadow: 0 0 25px rgba(199, 205, 212, 0.025);
          font-size: 18px;
        }

        .feature-eyebrow {
          margin-bottom: 9px;
          color: rgba(255, 255, 255, 0.23);
          font-family: monospace;
          font-size: 8px;
          font-weight: 800;
          letter-spacing: 1.6px;
        }

        .feature-card h3 {
          max-width: 500px;
          margin: 0 0 12px;
          font-size: 23px;
          line-height: 1.14;
          letter-spacing: -0.03em;
        }

        .feature-card p {
          max-width: 500px;
          margin: 0;
          color: rgba(255, 255, 255, 0.4);
          font-size: 13px;
          line-height: 1.7;
        }

        .feature-line {
          position: absolute;
          left: 30px;
          right: 30px;
          bottom: 20px;
          height: 1px;
          background: linear-gradient(
            90deg,
            rgba(199, 205, 212, 0.15),
            transparent
          );
        }

        /* =========================================================
           FINAL
           ========================================================= */

        .final-section {
          position: relative;
          z-index: 5;
          padding: 155px 24px 130px;
          text-align: center;
        }

        .final-section::before {
          content: '';
          position: absolute;
          width: 650px;
          height: 450px;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          border-radius: 50%;
          background: radial-gradient(
            ellipse,
            rgba(199, 205, 212, 0.055),
            transparent 70%
          );
          filter: blur(45px);
          pointer-events: none;
        }

        .final-section > div {
          position: relative;
          width: min(850px, 100%);
          margin: 0 auto;
        }

        .final-symbol {
          width: 66px;
          height: 66px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 32px;
          border: 1px solid rgba(199, 205, 212, 0.17);
          border-radius: 50%;
          background: rgba(199, 205, 212, 0.045);
          color: #e6e9ec;
          box-shadow:
            0 0 0 11px rgba(199, 205, 212, 0.018),
            0 0 35px rgba(199, 205, 212, 0.07),
            0 0 90px rgba(199, 205, 212, 0.035);
          font-size: 22px;
        }

        .final-section h2 {
          margin: 22px 0 0;
          font-size: clamp(45px, 7vw, 80px);
          line-height: 0.95;
          letter-spacing: -0.065em;
          font-weight: 900;
        }

        .final-section h2 span {
          color: rgba(255, 255, 255, 0.28);
        }

        .final-section h2 strong {
          font-weight: 900;
          background: linear-gradient(
            90deg,
            #f1f3f5,
            #8b949d,
            #ffffff
          );
          background-size: 180% auto;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: madhynMetal 7s linear infinite;
        }

        .final-section p {
          width: min(620px, 100%);
          margin: 27px auto 36px;
          color: rgba(255, 255, 255, 0.4);
          font-size: 15px;
          line-height: 1.7;
        }

        .final-actions {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
        }

        @keyframes madhynPulse {
          0%,
          100% {
            opacity: 1;
          }

          50% {
            opacity: 0.35;
          }
        }

        @keyframes madhynBlink {
          50% {
            opacity: 0;
          }
        }

        @keyframes madhynMetal {
          0% {
            background-position: 0% center;
          }

          100% {
            background-position: 180% center;
          }
        }

        /* =========================================================
           TABLET
           ========================================================= */

        @media (max-width: 900px) {
          .content-container {
            width: min(100% - 36px, 720px);
          }

          .mission-heading {
            grid-template-columns: 1fr;
            gap: 22px;
          }

          .mission-loop {
            grid-template-columns: repeat(2, 1fr);
          }

          .stage-list {
            grid-template-columns: repeat(2, 1fr);
          }

          .features-grid {
            grid-template-columns: 1fr;
          }
        }

        /* =========================================================
           PHONE
           ========================================================= */

        @media (max-width: 600px) {
          .madhyn-glow-one {
            width: 420px;
            height: 420px;
            top: 90px;
          }

          .madhyn-glow-two,
          .madhyn-glow-three {
            width: 350px;
            height: 350px;
          }

          .content-container {
            width: calc(100% - 32px);
          }

          .madhyn-hero {
            min-height: 88vh;
            padding: 125px 18px 75px;
          }

          .hero-orbit {
            width: 470px;
            height: 470px;
          }

          .hero-orbit::before {
            inset: 45px;
          }

          .hero-orbit::after {
            inset: 95px;
          }

          .madhyn-hero h1 {
            font-size: clamp(65px, 22vw, 110px);
          }

          .hero-tagline {
            margin-top: 28px;
            font-size: 17px;
          }

          .hero-description {
            font-size: 14px;
            line-height: 1.7;
          }

          .hero-actions {
            flex-direction: column;
            width: 100%;
          }

          .primary-button,
          .secondary-button {
            width: 100%;
          }

          .hero-system-line {
            flex-direction: column;
            gap: 10px;
            margin-top: 45px;
          }

          .hero-system-line i {
            display: none;
          }

          .mission-section,
          .loop-section,
          .features-section {
            padding: 90px 0;
          }

          .mission-heading h2,
          .loop-section h2,
          .features-section h2 {
            font-size: clamp(38px, 11vw, 54px);
          }

          .mission-console-wrap {
            margin-top: 38px;
          }

          .console-topbar {
            padding: 0 13px;
          }

          .window-dots {
            width: auto;
            margin-right: 12px;
          }

          .console-title {
            font-size: 7px;
          }

          .console-status {
            display: none;
          }

          .console-body {
            padding: 22px;
          }

          .mission-heading {
            gap: 14px;
          }

          .mission-heading > div:first-child h3 {
            font-size: 22px;
          }

          .stage-list {
            grid-template-columns: 1fr;
          }

          .mission-stage {
            display: grid;
            grid-template-columns: 34px 1fr auto;
            align-items: center;
            gap: 10px;
          }

          .stage-icon {
            margin: 0;
          }

          .stage-state {
            margin: 0;
          }

          .terminal {
            overflow-x: auto;
          }

          .terminal-line {
            white-space: nowrap;
            font-size: 9px;
          }

          .mission-loop {
            grid-template-columns: 1fr;
            margin-top: 40px;
          }

          .loop-card {
            min-height: auto;
          }

          .loop-top svg {
            display: none;
          }

          .features-grid {
            margin-top: 40px;
          }

          .feature-card {
            min-height: auto;
            padding: 27px;
          }

          .final-section {
            padding: 110px 18px;
          }

          .final-section::before {
            width: 450px;
            height: 350px;
          }

          .final-section h2 {
            font-size: clamp(43px, 13vw, 65px);
          }

          .final-actions {
            flex-direction: column;
          }
        }

        @media (max-width: 380px) {
          .content-container {
            width: calc(100% - 28px);
          }

          .hero-badge {
            font-size: 8px;
            letter-spacing: 1.2px;
          }

          .madhyn-hero h1 {
            font-size: 62px;
          }

          .console-body {
            padding: 18px;
          }

          .feature-card {
            padding: 23px;
          }
        }
      `}
      </style>
    </main>
  );
}