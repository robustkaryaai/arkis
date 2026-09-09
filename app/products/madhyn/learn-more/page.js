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
  FiGitBranch,
  FiLayers,
  FiPlay,
  FiSearch,
  FiShield,
  FiTarget,
  FiTerminal,
  FiZap,
} from 'react-icons/fi';

import Link from 'next/link';

import {
  StarField,
  Card3D,
  staggerContainer,
  fadeUp,
  textVariant,
} from '@/components/SpaceUI';

const PIPELINE = [
  {
    number: '01',
    icon: <FiCommand />,
    label: 'COMMAND',
    title: 'Define the objective.',
    description:
      'You describe the outcome you want. MADHYN treats it as a development objective rather than a request for a snippet.',
  },
  {
    number: '02',
    icon: <FiSearch />,
    label: 'UNDERSTAND',
    title: 'Build project context.',
    description:
      'The system examines the project structure, relevant files and surrounding implementation before deciding what should change.',
  },
  {
    number: '03',
    icon: <FiTarget />,
    label: 'PLAN',
    title: 'Create the mission.',
    description:
      'The objective becomes a sequence of concrete development actions that can actually be executed.',
  },
  {
    number: '04',
    icon: <FiTerminal />,
    label: 'EXECUTE',
    title: 'Do the work.',
    description:
      'MADHYN moves from reasoning into action, making the required changes across the project.',
  },
  {
    number: '05',
    icon: <FiShield />,
    label: 'VERIFY',
    title: 'Prove the result.',
    description:
      'The mission includes checks, tests and validation so completion is based on evidence.',
  },
  {
    number: '06',
    icon: <FiFileText />,
    label: 'REPORT',
    title: 'Explain what happened.',
    description:
      'MADHYN returns the result of the mission: what changed, what was checked and what remains.',
  },
];

const CAPABILITIES = [
  {
    icon: <FiLayers />,
    eyebrow: 'PROJECT INTELLIGENCE',
    title: 'It sees the project, not just the prompt.',
    description:
      'MADHYN is designed to reason from the environment around the task. Existing architecture, implementation patterns and project structure become part of the context.',
  },
  {
    icon: <FiTarget />,
    eyebrow: 'MISSION PLANNING',
    title: 'Objectives become executable missions.',
    description:
      'Instead of stopping at an explanation, MADHYN can decompose a development objective into a practical sequence of work.',
  },
  {
    icon: <FiZap />,
    eyebrow: 'REAL EXECUTION',
    title: 'Reasoning has somewhere to go.',
    description:
      'The system is built around actually changing the project. The output is not merely a suggestion—it is progress toward the requested outcome.',
  },
  {
    icon: <FiCheckCircle />,
    eyebrow: 'VERIFICATION',
    title: 'Done means verified.',
    description:
      'Validation is part of the development loop. MADHYN can run checks and use their results when determining whether a mission is complete.',
  },
];

function MissionConsole() {
  return (
    <Card3D
      style={{
        padding: 0,
        overflow: 'hidden',
        background: 'rgba(6, 7, 9, 0.88)',
      }}
      orbColor="rgba(199,205,212,0.12)"
    >
      <div className="console">
        <div className="console-header">
          <div className="console-controls">
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
            EXECUTING
          </div>
        </div>

        <div className="console-main">
          <div className="console-mission">
            <div>
              <div className="console-label">ACTIVE MISSION</div>

              <h3>Rebuild authentication flow</h3>

              <p>
                Refactor the existing authentication layer, update dependent
                components and verify the resulting application.
              </p>
            </div>

            <div className="mission-id">M-0842</div>
          </div>

          <div className="console-progress">
            <div className="progress-heading">
              <span>MISSION PROGRESS</span>
              <strong>61%</strong>
            </div>

            <div className="progress-track">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: '61%' }}
                viewport={{ once: true }}
                transition={{ duration: 1.15, ease: 'easeOut' }}
              />
            </div>
          </div>

          <div className="console-grid">
            {[
              ['CONTEXT', 'Loaded', 'complete'],
              ['PLAN', 'Ready', 'complete'],
              ['EXECUTION', 'Running', 'active'],
              ['VERIFY', 'Queued', 'queued'],
            ].map(([label, state, type]) => (
              <div className={`console-stage ${type}`} key={label}>
                <div className="console-stage-top">
                  <span>{label}</span>

                  {type === 'complete' ? (
                    <FiCheckCircle />
                  ) : type === 'active' ? (
                    <i className="active-dot" />
                  ) : (
                    <i className="queued-dot" />
                  )}
                </div>

                <strong>{state}</strong>
              </div>
            ))}
          </div>

          <div className="console-terminal">
            <div className="terminal-top">
              <span>MISSION OUTPUT</span>
              <span>LIVE</span>
            </div>

            <div className="terminal-line">
              <b>›</b>
              Repository context loaded
            </div>

            <div className="terminal-line">
              <b>›</b>
              6 relevant files identified
            </div>

            <div className="terminal-line">
              <b>›</b>
              Dependency graph updated
            </div>

            <div className="terminal-line active-line">
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

function ArchitectureDiagram() {
  return (
    <div className="architecture">
      <div className="architecture-node">
        <div className="architecture-icon">
          <FiCommand />
        </div>

        <div>
          <small>INPUT</small>
          <strong>DEVELOPMENT OBJECTIVE</strong>
          <span>What you want accomplished</span>
        </div>
      </div>

      <div className="architecture-line" />

      <div className="architecture-node">
        <div className="architecture-icon">
          <FiSearch />
        </div>

        <div>
          <small>CONTEXT</small>
          <strong>PROJECT INTELLIGENCE</strong>
          <span>Files · structure · dependencies · state</span>
        </div>
      </div>

      <div className="architecture-line" />

      <div className="architecture-node core">
        <div className="architecture-icon">
          <FiCpu />
        </div>

        <div>
          <small>ORCHESTRATION</small>
          <strong>MISSION ENGINE</strong>
          <span>Reason · plan · coordinate · adapt</span>
        </div>
      </div>

      <div className="architecture-split">
        <div className="architecture-branch">
          <FiCode />

          <div>
            <small>ACTION</small>
            <strong>EXECUTION</strong>
            <span>Apply project changes</span>
          </div>
        </div>

        <div className="architecture-branch">
          <FiShield />

          <div>
            <small>PROOF</small>
            <strong>VERIFICATION</strong>
            <span>Check the resulting state</span>
          </div>
        </div>
      </div>

      <div className="architecture-line" />

      <div className="architecture-node report">
        <div className="architecture-icon">
          <FiFileText />
        </div>

        <div>
          <small>OUTPUT</small>
          <strong>MISSION REPORT</strong>
          <span>Changes · checks · outcome</span>
        </div>
      </div>
    </div>
  );
}

export default function MadhynLearnMore() {
  return (
    <main className="madhyn-learn">
      <StarField />

      <div className="page-noise" />

      <Navbar />
      <BackButton />

      {/* HERO */}

      <section className="learn-hero">
        <motion.div
          className="hero-content"
          variants={staggerContainer(0.08, 0.08)}
          initial="hidden"
          animate="show"
        >
          <motion.div variants={fadeUp} className="hero-eyebrow">
            <span />
            INSIDE MADHYN
          </motion.div>

          <motion.h1 variants={fadeUp}>
            How the{' '}
            <span className="hero-gradient">
              autonomous developer
            </span>{' '}
            works.
          </motion.h1>

          <motion.p variants={fadeUp} className="hero-copy">
            MADHYN is designed to turn a development objective into a
            complete, observable mission — from understanding the project to
            verifying the result.
          </motion.p>

          <motion.div variants={fadeUp} className="hero-meta">
            <span>PROJECT AWARE</span>
            <i />
            <span>EXECUTION FIRST</span>
            <i />
            <span>VERIFICATION BUILT IN</span>
          </motion.div>
        </motion.div>
      </section>

      <div className="divider" />

      {/* LOOP */}

      <section className="section loop-section">
        <div className="section-container">
          <motion.div
            variants={staggerContainer(0.08, 0.07)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.12 }}
          >
            <motion.div variants={fadeUp} className="section-label">
              <span />
              THE MISSION LOOP
            </motion.div>

            <motion.div variants={fadeUp} className="section-heading">
              <h2>
                From command
                <br />
                <span>to verified result.</span>
              </h2>

              <p>
                MADHYN isn't designed around answering a prompt and stopping.
                Its fundamental unit of work is the mission.
              </p>
            </motion.div>

            <div className="pipeline">
              {PIPELINE.map((stage) => (
                <motion.div
                  variants={fadeUp}
                  className="pipeline-card"
                  key={stage.number}
                >
                  <div className="pipeline-top">
                    <span>{stage.number}</span>
                    <FiChevronRight />
                  </div>

                  <div className="pipeline-icon">{stage.icon}</div>

                  <div className="pipeline-label">
                    {stage.label}
                  </div>

                  <h3>{stage.title}</h3>

                  <p>{stage.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CONSOLE */}

      <section className="section console-section">
        <div className="section-container">
          <motion.div
            variants={staggerContainer(0.08, 0.08)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.12 }}
          >
            <motion.div variants={fadeUp} className="section-label">
              <span />
              MISSION CONTROL
            </motion.div>

            <motion.div variants={fadeUp} className="section-heading">
              <h2>
                Make development
                <br />
                <span>observable.</span>
              </h2>

              <p>
                Autonomous doesn't have to mean invisible. MADHYN exposes the
                state of the mission so you can understand where the system
                is, what it is doing and what has been verified.
              </p>
            </motion.div>

            <motion.div variants={fadeUp} className="console-wrapper">
              <MissionConsole />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ARCHITECTURE */}

      <section className="section architecture-section">
        <div className="section-container">
          <motion.div
            variants={staggerContainer(0.08, 0.08)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.12 }}
          >
            <motion.div variants={fadeUp} className="section-label">
              <span />
              SYSTEM ARCHITECTURE
            </motion.div>

            <motion.div variants={fadeUp} className="section-heading">
              <h2>
                Context becomes
                <br />
                <span>execution.</span>
              </h2>

              <p>
                The architecture is built around a simple idea: an autonomous
                developer needs more than intelligence. It needs context,
                orchestration, tools and a way to verify what it has done.
              </p>
            </motion.div>

            <motion.div variants={fadeUp}>
              <ArchitectureDiagram />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CAPABILITIES */}

      <section className="section capabilities-section">
        <div className="section-container">
          <motion.div
            variants={staggerContainer(0.08, 0.08)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.12 }}
          >
            <motion.div variants={fadeUp} className="section-label">
              <span />
              CORE CAPABILITIES
            </motion.div>

            <motion.h2 variants={fadeUp} className="capabilities-title">
              Intelligence that
              <br />
              <span>actually moves.</span>
            </motion.h2>

            <div className="capability-grid">
              {CAPABILITIES.map((capability) => (
                <motion.div
                  variants={fadeUp}
                  className="capability-card"
                  key={capability.title}
                >
                  <div className="capability-icon">
                    {capability.icon}
                  </div>

                  <div className="capability-eyebrow">
                    {capability.eyebrow}
                  </div>

                  <h3>{capability.title}</h3>

                  <p>{capability.description}</p>

                  <div className="capability-line" />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* REPORT */}

      <section className="section report-section">
        <div className="section-container">
          <motion.div
            variants={staggerContainer(0.08, 0.08)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.12 }}
          >
            <motion.div variants={fadeUp} className="section-label">
              <span />
              MISSION REPORT
            </motion.div>

            <motion.div variants={fadeUp} className="report-heading">
              <div>
                <h2>
                  Don't just say
                  <br />
                  <span>“it's done.”</span>
                </h2>
              </div>

              <p>
                A completed mission should leave behind evidence. The report
                is the final layer connecting autonomous execution back to
                the developer.
              </p>
            </motion.div>

            <motion.div variants={fadeUp} className="report-panel">
              <div className="report-header">
                <div>
                  <span>MISSION</span>
                  <strong>AUTH-REBUILD</strong>
                </div>

                <div className="report-success">
                  <FiCheckCircle />
                  VERIFIED
                </div>
              </div>

              <div className="report-stats">
                <div>
                  <strong>06</strong>
                  <span>FILES CHANGED</span>
                </div>

                <div>
                  <strong>24</strong>
                  <span>TESTS EXECUTED</span>
                </div>

                <div>
                  <strong>24</strong>
                  <span>TESTS PASSED</span>
                </div>

                <div>
                  <strong>PASS</strong>
                  <span>BUILD STATUS</span>
                </div>
              </div>

              <div className="report-summary">
                <FiCheckCircle />

                <div>
                  <strong>Mission completed successfully.</strong>

                  <p>
                    Authentication flow rebuilt, dependent components updated,
                    validation completed and project build verified.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}

      <section className="final-section">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
        >
          <div className="final-icon">
            <FiCpu />
          </div>

          <div className="section-label">
            <span />
            MADHYN
          </div>

          <h2>
            Stop prompting.
            <br />
            <span>Start commanding.</span>
          </h2>

          <p>
            Give your development work an objective. Let MADHYN turn it into
            a mission.
          </p>

          <div className="final-actions">
            <Link
              href="/products/madhyn"
              className="primary-button"
            >
              Back to MADHYN
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
        .madhyn-learn {
          position: relative;
          min-height: 100vh;
          overflow-x: hidden;
          background: #010104;
          color: #fff;
        }

        .page-noise {
          position: fixed;
          inset: 0;
          z-index: 2;
          pointer-events: none;
          opacity: 0.022;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.55'/%3E%3C/svg%3E");
        }

        .section-container {
          width: min(1120px, calc(100% - 48px));
          margin: 0 auto;
          position: relative;
          z-index: 5;
        }

        /* HERO */

        .learn-hero {
          position: relative;
          z-index: 5;
          isolation: isolate;
          min-height: 88vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 145px 24px 95px;
          text-align: center;
        }

        .hero-content {
          width: min(980px, 100%);
          position: relative;
          z-index: 3;
        }

        .hero-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 9px;
          padding: 7px 12px;
          border: 1px solid rgba(199, 205, 212, 0.13);
          border-radius: 7px;
          background: rgba(199, 205, 212, 0.045);
          color: rgba(255, 255, 255, 0.4);
          font-family: monospace;
          font-size: 9px;
          font-weight: 800;
          letter-spacing: 1.7px;
        }

        .hero-eyebrow span {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #c7cdd4;
          box-shadow: 0 0 10px rgba(199, 205, 212, 0.55);
        }

        .learn-hero h1 {
          max-width: 1000px;
          margin: 28px auto 0;
          font-size: clamp(55px, 8.2vw, 105px);
          line-height: 0.93;
          letter-spacing: -0.075em;
          font-weight: 900;
        }

        .hero-gradient {
          display: inline;
          background: linear-gradient(
            100deg,
            #f1f3f5 0%,
            #8d959e 24%,
            #ffffff 48%,
            #aab1b9 72%,
            #f1f3f5 100%
          );
          background-size: 220% auto;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: madhynGradient 7s linear infinite;
        }

        .hero-copy {
          width: min(690px, 100%);
          margin: 28px auto 0;
          color: rgba(255, 255, 255, 0.43);
          font-size: 15px;
          line-height: 1.75;
        }

        .hero-meta {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 13px;
          flex-wrap: wrap;
          margin-top: 35px;
          color: rgba(255, 255, 255, 0.23);
          font-family: monospace;
          font-size: 8px;
          font-weight: 800;
          letter-spacing: 1.4px;
        }

        .hero-meta i {
          width: 3px;
          height: 3px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.18);
        }

        .divider {
          width: min(1120px, calc(100% - 48px));
          height: 1px;
          margin: 0 auto;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.08),
            transparent
          );
        }

        /* SHARED */

        .section {
          position: relative;
          z-index: 5;
          padding: 125px 0;
        }

        .section-label {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px 10px;
          border: 1px solid rgba(199, 205, 212, 0.1);
          border-radius: 7px;
          background: rgba(199, 205, 212, 0.035);
          color: rgba(255, 255, 255, 0.37);
          font-family: monospace;
          font-size: 8px;
          font-weight: 800;
          letter-spacing: 1.7px;
        }

        .section-label > span {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #c7cdd4;
        }

        .section-heading {
          display: grid;
          grid-template-columns: 1.08fr 0.92fr;
          align-items: end;
          gap: 70px;
          margin-top: 25px;
        }

        .section-heading h2,
        .report-heading h2 {
          margin: 0;
          font-size: clamp(44px, 5.8vw, 70px);
          line-height: 0.96;
          letter-spacing: -0.06em;
          font-weight: 900;
        }

        .section-heading h2 span,
        .report-heading h2 span,
        .capabilities-title span {
          color: rgba(255, 255, 255, 0.28);
        }

        .section-heading p,
        .report-heading p {
          margin: 0;
          color: rgba(255, 255, 255, 0.4);
          font-size: 14px;
          line-height: 1.8;
        }

        /* PIPELINE */

        .pipeline {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
          margin-top: 55px;
        }

        .pipeline-card {
          min-height: 255px;
          padding: 24px;
          border: 1px solid rgba(255, 255, 255, 0.065);
          border-radius: 17px;
          background: rgba(255, 255, 255, 0.017);
          transition:
            transform 0.25s ease,
            border-color 0.25s ease;
        }

        .pipeline-card:hover {
          transform: translateY(-4px);
          border-color: rgba(199, 205, 212, 0.17);
        }

        .pipeline-top {
          display: flex;
          justify-content: space-between;
          color: rgba(255, 255, 255, 0.2);
          font-family: monospace;
          font-size: 9px;
        }

        .pipeline-top svg {
          color: rgba(255, 255, 255, 0.13);
        }

        .pipeline-icon {
          width: 39px;
          height: 39px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: 25px;
          border: 1px solid rgba(199, 205, 212, 0.1);
          border-radius: 10px;
          background: rgba(199, 205, 212, 0.045);
          color: #dfe3e7;
        }

        .pipeline-label {
          margin-top: 19px;
          color: rgba(255, 255, 255, 0.22);
          font-family: monospace;
          font-size: 8px;
          font-weight: 800;
          letter-spacing: 1.5px;
        }

        .pipeline-card h3 {
          margin: 8px 0 9px;
          font-size: 19px;
          line-height: 1.15;
          letter-spacing: -0.025em;
        }

        .pipeline-card p {
          margin: 0;
          color: rgba(255, 255, 255, 0.34);
          font-size: 12px;
          line-height: 1.65;
        }

        /* CONSOLE */

        .console-section {
          background:
            radial-gradient(
              ellipse at center,
              rgba(199, 205, 212, 0.028),
              transparent 62%
            );
        }

        .console-wrapper {
          margin-top: 55px;
        }

        .console {
          width: 100%;
        }

        .console-header {
          min-height: 48px;
          display: flex;
          align-items: center;
          padding: 0 17px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.065);
          background: rgba(255, 255, 255, 0.025);
        }

        .console-controls {
          width: 110px;
          display: flex;
          gap: 6px;
        }

        .console-controls span {
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
          box-shadow: 0 0 10px rgba(238, 240, 242, 0.7);
        }

        .console-main {
          padding: 34px;
        }

        .console-mission {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 30px;
        }

        .console-label {
          margin-bottom: 9px;
          color: rgba(255, 255, 255, 0.22);
          font-family: monospace;
          font-size: 8px;
          letter-spacing: 1.7px;
        }

        .console-mission h3 {
          margin: 0;
          font-size: clamp(22px, 3vw, 30px);
          line-height: 1.1;
          letter-spacing: -0.04em;
        }

        .console-mission p {
          max-width: 620px;
          margin: 10px 0 0;
          color: rgba(255, 255, 255, 0.3);
          font-size: 12px;
          line-height: 1.65;
        }

        .mission-id {
          padding: 7px 10px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 6px;
          color: rgba(255, 255, 255, 0.3);
          font-family: monospace;
          font-size: 8px;
        }

        .console-progress {
          margin-top: 30px;
        }

        .progress-heading {
          display: flex;
          justify-content: space-between;
          margin-bottom: 9px;
          color: rgba(255, 255, 255, 0.22);
          font-family: monospace;
          font-size: 8px;
          letter-spacing: 1px;
        }

        .progress-heading strong {
          color: rgba(255, 255, 255, 0.6);
        }

        .progress-track {
          height: 3px;
          overflow: hidden;
          border-radius: 99px;
          background: rgba(255, 255, 255, 0.065);
        }

        .progress-track div {
          height: 100%;
          border-radius: inherit;
          background: linear-gradient(90deg, #737b85, #f1f3f5);
          box-shadow: 0 0 18px rgba(241, 243, 245, 0.25);
        }

        .console-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 8px;
          margin-top: 20px;
        }

        .console-stage {
          padding: 15px;
          border: 1px solid rgba(255, 255, 255, 0.055);
          border-radius: 10px;
          background: rgba(255, 255, 255, 0.018);
        }

        .console-stage.active {
          border-color: rgba(199, 205, 212, 0.18);
          background: rgba(199, 205, 212, 0.045);
        }

        .console-stage-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          color: rgba(255, 255, 255, 0.22);
          font-family: monospace;
          font-size: 7px;
          letter-spacing: 1.1px;
        }

        .console-stage-top svg {
          color: #dfe3e7;
          font-size: 11px;
        }

        .console-stage strong {
          display: block;
          margin-top: 12px;
          color: rgba(255, 255, 255, 0.57);
          font-size: 12px;
        }

        .active-dot,
        .queued-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
        }

        .active-dot {
          background: #f1f3f5;
          box-shadow: 0 0 10px rgba(241, 243, 245, 0.75);
          animation: madhynPulse 1.5s infinite;
        }

        .queued-dot {
          border: 1px solid rgba(255, 255, 255, 0.15);
        }

        .console-terminal {
          margin-top: 18px;
          padding: 17px;
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 10px;
          background: #030405;
          font-family: monospace;
        }

        .terminal-top {
          display: flex;
          justify-content: space-between;
          margin-bottom: 12px;
          color: rgba(255, 255, 255, 0.2);
          font-size: 7px;
          letter-spacing: 1.4px;
        }

        .terminal-line {
          display: flex;
          align-items: center;
          min-height: 24px;
          gap: 8px;
          color: rgba(255, 255, 255, 0.31);
          font-size: 10px;
        }

        .terminal-line b {
          color: #dce1e6;
        }

        .active-line {
          color: rgba(255, 255, 255, 0.65);
        }

        .cursor {
          width: 5px;
          height: 11px;
          margin-left: 1px;
          background: rgba(255, 255, 255, 0.7);
          animation: madhynBlink 1s step-end infinite;
        }

        /* ARCHITECTURE */

        .architecture-section {
          background:
            radial-gradient(
              ellipse at 50% 40%,
              rgba(199, 205, 212, 0.022),
              transparent 60%
            );
        }

        .architecture {
          width: min(800px, 100%);
          margin: 60px auto 0;
          padding: 42px 35px;
          border: 1px solid rgba(255, 255, 255, 0.065);
          border-radius: 22px;
          background: rgba(255, 255, 255, 0.015);
        }

        .architecture-node {
          width: min(430px, 100%);
          margin: 0 auto;
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 17px 19px;
          border: 1px solid rgba(255, 255, 255, 0.075);
          border-radius: 11px;
          background: rgba(255, 255, 255, 0.025);
        }

        .architecture-node.core {
          border-color: rgba(199, 205, 212, 0.19);
          background: rgba(199, 205, 212, 0.045);
          box-shadow: 0 0 60px rgba(199, 205, 212, 0.035);
        }

        .architecture-node.report {
          border-color: rgba(199, 205, 212, 0.13);
        }

        .architecture-icon {
          width: 35px;
          height: 35px;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid rgba(199, 205, 212, 0.1);
          border-radius: 9px;
          background: rgba(199, 205, 212, 0.045);
          color: #dfe3e7;
        }

        .architecture-node small,
        .architecture-branch small {
          display: block;
          margin-bottom: 4px;
          color: rgba(255, 255, 255, 0.2);
          font-family: monospace;
          font-size: 7px;
          letter-spacing: 1.3px;
        }

        .architecture-node strong,
        .architecture-branch strong {
          display: block;
          color: rgba(255, 255, 255, 0.67);
          font-family: monospace;
          font-size: 9px;
          letter-spacing: 0.8px;
        }

        .architecture-node span,
        .architecture-branch span {
          display: block;
          margin-top: 4px;
          color: rgba(255, 255, 255, 0.27);
          font-size: 10px;
        }

        .architecture-line {
          width: 1px;
          height: 35px;
          margin: 0 auto;
          background: linear-gradient(
            to bottom,
            rgba(255, 255, 255, 0.12),
            rgba(255, 255, 255, 0.035)
          );
        }

        .architecture-split {
          position: relative;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 55px;
          margin: 35px auto;
        }

        .architecture-split::before {
          content: '';
          position: absolute;
          left: 25%;
          right: 25%;
          top: -18px;
          height: 1px;
          background: rgba(255, 255, 255, 0.08);
        }

        .architecture-branch {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 16px;
          border: 1px solid rgba(255, 255, 255, 0.065);
          border-radius: 10px;
          background: rgba(255, 255, 255, 0.018);
        }

        .architecture-branch > svg {
          flex-shrink: 0;
          color: #c7cdd4;
          font-size: 17px;
        }

        /* CAPABILITIES */

        .capabilities-title {
          margin: 25px 0 0;
          font-size: clamp(44px, 5.8vw, 70px);
          line-height: 0.96;
          letter-spacing: -0.06em;
          font-weight: 900;
        }

        .capability-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 14px;
          margin-top: 55px;
        }

        .capability-card {
          position: relative;
          min-height: 290px;
          overflow: hidden;
          padding: 30px;
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 18px;
          background:
            linear-gradient(
              145deg,
              rgba(255, 255, 255, 0.035),
              rgba(255, 255, 255, 0.012)
            );
        }

        .capability-icon {
          width: 43px;
          height: 43px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 23px;
          border: 1px solid rgba(199, 205, 212, 0.11);
          border-radius: 11px;
          background: rgba(199, 205, 212, 0.05);
          color: #e0e4e8;
          font-size: 18px;
        }

        .capability-eyebrow {
          margin-bottom: 9px;
          color: rgba(255, 255, 255, 0.21);
          font-family: monospace;
          font-size: 8px;
          font-weight: 800;
          letter-spacing: 1.5px;
        }

        .capability-card h3 {
          max-width: 510px;
          margin: 0 0 12px;
          font-size: 22px;
          line-height: 1.15;
          letter-spacing: -0.03em;
        }

        .capability-card p {
          max-width: 530px;
          margin: 0;
          color: rgba(255, 255, 255, 0.37);
          font-size: 13px;
          line-height: 1.7;
        }

        .capability-line {
          position: absolute;
          right: 30px;
          bottom: 21px;
          left: 30px;
          height: 1px;
          background: linear-gradient(
            90deg,
            rgba(199, 205, 212, 0.13),
            transparent
          );
        }

        /* REPORT */

        .report-heading {
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 70px;
          align-items: end;
          margin-top: 25px;
        }

        .report-panel {
          margin-top: 55px;
          padding: 30px;
          border: 1px solid rgba(255, 255, 255, 0.07);
          border-radius: 18px;
          background: rgba(255, 255, 255, 0.018);
        }

        .report-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          padding-bottom: 22px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
        }

        .report-header span {
          display: block;
          margin-bottom: 5px;
          color: rgba(255, 255, 255, 0.2);
          font-family: monospace;
          font-size: 7px;
          letter-spacing: 1.4px;
        }

        .report-header strong {
          color: rgba(255, 255, 255, 0.65);
          font-family: monospace;
          font-size: 11px;
          letter-spacing: 1px;
        }

        .report-success {
          display: flex;
          align-items: center;
          gap: 7px;
          color: rgba(255, 255, 255, 0.55);
          font-family: monospace;
          font-size: 8px;
          letter-spacing: 1px;
        }

        .report-success svg {
          color: #e6eaed;
        }

        .report-stats {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1px;
          margin-top: 1px;
          background: rgba(255, 255, 255, 0.055);
        }

        .report-stats > div {
          padding: 25px 20px;
          background: #060709;
        }

        .report-stats strong {
          display: block;
          color: rgba(255, 255, 255, 0.8);
          font-family: monospace;
          font-size: 25px;
          letter-spacing: -0.05em;
        }

        .report-stats span {
          display: block;
          margin-top: 7px;
          color: rgba(255, 255, 255, 0.2);
          font-family: monospace;
          font-size: 7px;
          letter-spacing: 1px;
        }

        .report-summary {
          display: flex;
          align-items: flex-start;
          gap: 13px;
          margin-top: 18px;
          padding: 17px;
          border: 1px solid rgba(199, 205, 212, 0.08);
          border-radius: 10px;
          background: rgba(199, 205, 212, 0.025);
        }

        .report-summary > svg {
          flex-shrink: 0;
          margin-top: 2px;
          color: #dfe3e7;
        }

        .report-summary strong {
          color: rgba(255, 255, 255, 0.65);
          font-size: 12px;
        }

        .report-summary p {
          margin: 5px 0 0;
          color: rgba(255, 255, 255, 0.3);
          font-size: 11px;
          line-height: 1.6;
        }

        /* FINAL */

        .final-section {
          position: relative;
          z-index: 5;
          padding: 155px 24px 130px;
          text-align: center;
        }

        .final-section > div {
          width: min(850px, 100%);
          margin: 0 auto;
        }

        .final-icon {
          width: 66px;
          height: 66px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 31px;
          border: 1px solid rgba(199, 205, 212, 0.16);
          border-radius: 50%;
          background: rgba(199, 205, 212, 0.04);
          color: #e4e8eb;
          box-shadow:
            0 0 0 11px rgba(199, 205, 212, 0.016),
            0 0 55px rgba(199, 205, 212, 0.065);
          font-size: 22px;
        }

        .final-section h2 {
          margin: 22px 0 0;
          font-size: clamp(47px, 7vw, 80px);
          line-height: 0.94;
          letter-spacing: -0.065em;
          font-weight: 900;
        }

        .final-section h2 span {
          color: rgba(255, 255, 255, 0.3);
        }

        .final-section p {
          width: min(600px, 100%);
          margin: 27px auto 35px;
          color: rgba(255, 255, 255, 0.38);
          font-size: 15px;
          line-height: 1.7;
        }

        .final-actions {
          display: flex;
          justify-content: center;
          gap: 10px;
          flex-wrap: wrap;
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
            background 0.25s ease,
            border-color 0.25s ease;
        }

        .primary-button {
          color: #050608;
          background: #f2f3f4;
        }

        .secondary-button {
          color: rgba(255, 255, 255, 0.7);
          border: 1px solid rgba(255, 255, 255, 0.1);
          background: rgba(255, 255, 255, 0.035);
        }

        .primary-button:hover,
        .secondary-button:hover {
          transform: translateY(-2px);
        }

        .secondary-button:hover {
          border-color: rgba(199, 205, 212, 0.22);
          background: rgba(255, 255, 255, 0.055);
        }

        @keyframes madhynGradient {
          0% {
            background-position: 0% center;
          }

          100% {
            background-position: 220% center;
          }
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

        /* TABLET */

        @media (max-width: 900px) {
          .section-container {
            width: min(100% - 36px, 720px);
          }

          .section-heading,
          .report-heading {
            grid-template-columns: 1fr;
            gap: 22px;
          }

          .pipeline {
            grid-template-columns: repeat(2, 1fr);
          }

          .console-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .capability-grid {
            grid-template-columns: 1fr;
          }

          .report-stats {
            grid-template-columns: repeat(2, 1fr);
          }

          .architecture-split {
            gap: 20px;
          }
        }

        /* PHONE */

        @media (max-width: 600px) {
          .section-container {
            width: calc(100% - 32px);
          }

          .learn-hero {
            min-height: 84vh;
            padding: 125px 18px 75px;
          }

          .learn-hero h1 {
            margin-top: 24px;
            font-size: clamp(46px, 13.5vw, 72px);
            line-height: 0.96;
          }

          .hero-copy {
            margin-top: 22px;
            font-size: 13px;
            line-height: 1.7;
          }

          .hero-meta {
            margin-top: 28px;
            gap: 8px;
            font-size: 7px;
          }

          .hero-meta i {
            display: none;
          }

          .divider {
            width: calc(100% - 32px);
          }

          .section {
            padding: 90px 0;
          }

          .section-heading {
            margin-top: 22px;
          }

          .section-heading h2,
          .report-heading h2,
          .capabilities-title {
            font-size: clamp(40px, 11.5vw, 54px);
          }

          .section-heading p,
          .report-heading p {
            font-size: 13px;
          }

          .pipeline {
            grid-template-columns: 1fr;
            margin-top: 40px;
          }

          .pipeline-card {
            min-height: auto;
            padding: 22px;
          }

          .console-wrapper {
            margin-top: 40px;
          }

          .console-header {
            padding: 0 13px;
          }

          .console-controls {
            width: auto;
            margin-right: 12px;
          }

          .console-title {
            font-size: 7px;
          }

          .console-status {
            display: none;
          }

          .console-main {
            padding: 22px;
          }

          .console-mission {
            flex-direction: column;
            gap: 13px;
          }

          .console-mission h3 {
            font-size: 21px;
          }

          .console-grid {
            grid-template-columns: 1fr;
          }

          .console-stage {
            display: flex;
            align-items: center;
            justify-content: space-between;
          }

          .console-stage strong {
            margin-top: 0;
          }

          .console-terminal {
            overflow-x: auto;
          }

          .terminal-line {
            white-space: nowrap;
            font-size: 9px;
          }

          .architecture {
            margin-top: 42px;
            padding: 25px 14px;
          }

          .architecture-split {
            grid-template-columns: 1fr;
            gap: 10px;
          }

          .architecture-split::before {
            display: none;
          }

          .architecture-branch {
            width: 100%;
          }

          .capability-grid {
            margin-top: 40px;
          }

          .capability-card {
            min-height: auto;
            padding: 25px;
          }

          .report-panel {
            margin-top: 40px;
            padding: 22px;
          }

          .report-header {
            align-items: flex-start;
            flex-direction: column;
          }

          .report-stats {
            grid-template-columns: 1fr 1fr;
          }

          .report-stats > div {
            padding: 20px 15px;
          }

          .report-stats strong {
            font-size: 21px;
          }

          .report-summary {
            padding: 14px;
          }

          .final-section {
            padding: 110px 18px;
          }

          .final-section h2 {
            font-size: clamp(43px, 12.5vw, 63px);
          }

          .final-actions {
            flex-direction: column;
          }

          .primary-button,
          .secondary-button {
            width: 100%;
          }
        }

        @media (max-width: 380px) {
          .section-container {
            width: calc(100% - 26px);
          }

          .learn-hero {
            padding-left: 14px;
            padding-right: 14px;
          }

          .learn-hero h1 {
            font-size: 44px;
          }

          .hero-eyebrow {
            font-size: 8px;
            letter-spacing: 1.2px;
          }

          .console-main {
            padding: 18px;
          }

          .capability-card {
            padding: 22px;
          }

          .report-panel {
            padding: 17px;
          }
        }
      `}
      </style>
    </main>
  );
}