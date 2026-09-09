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
  FlowText,
} from '@/components/SpaceUI';

const ACCENT = '#c7cdd4';
const BRIGHT = '#f1f3f5';

const PIPELINE = [
  {
    number: '01',
    icon: <FiCommand />,
    title: 'Command',
    short: 'Tell MADHYN the objective.',
    desc: 'Start with what you want to accomplish instead of manually describing every file and implementation step.',
  },
  {
    number: '02',
    icon: <FiSearch />,
    title: 'Understand',
    short: 'Build project context.',
    desc: 'MADHYN examines the repository, structure, dependencies, configuration and relevant existing code before acting.',
  },
  {
    number: '03',
    icon: <FiTarget />,
    title: 'Plan',
    short: 'Turn intent into a mission.',
    desc: 'The objective becomes an ordered execution plan with concrete changes and verification steps.',
  },
  {
    number: '04',
    icon: <FiPlay />,
    title: 'Execute',
    short: 'Actually do the work.',
    desc: 'MADHYN moves from reasoning to implementation, modifying the project instead of stopping at suggestions.',
  },
  {
    number: '05',
    icon: <FiShield />,
    title: 'Verify',
    short: 'Prove the work.',
    desc: 'Tests, builds, checks and project-level validation become part of the mission rather than an afterthought.',
  },
  {
    number: '06',
    icon: <FiFileText />,
    title: 'Report',
    short: 'Tell you what happened.',
    desc: 'Every mission ends with a clear account of what changed, what passed and whether anything remains unresolved.',
  },
];

const CAPABILITIES = [
  {
    icon: <FiLayers />,
    label: 'PROJECT INTELLIGENCE',
    title: 'It sees the project, not just the prompt.',
    desc: 'MADHYN is designed around repository-level context. Files, dependencies, configuration and existing patterns become part of the reasoning process.',
  },
  {
    icon: <FiTarget />,
    label: 'MISSION PLANNING',
    title: 'Objectives become executable missions.',
    desc: 'Instead of turning every small decision back into a conversation, MADHYN can break a larger objective into concrete steps and track their state.',
  },
  {
    icon: <FiTerminal />,
    label: 'REAL EXECUTION',
    title: 'Reasoning has somewhere to go.',
    desc: 'The goal is not another AI that only writes code in a chat box. MADHYN is built around actually changing, running and checking the project.',
  },
  {
    icon: <FiCheckCircle />,
    label: 'VERIFICATION',
    title: 'Done means verified.',
    desc: 'A successful generation is not the finish line. MADHYN is designed to validate the resulting project and surface failures instead of silently moving on.',
  },
];

function MissionConsole() {
  const stages = [
    ['Repository context', 'complete'],
    ['Mission planning', 'complete'],
    ['Implementation', 'active'],
    ['Verification', 'pending'],
  ];

  return (
    <Card3D
      style={{
        padding: 0,
        overflow: 'hidden',
        background: 'rgba(9,10,12,0.78)',
      }}
      orbColor="rgba(199,205,212,0.16)"
    >
      <div className="console-top">
        <div className="window-dots">
          <span />
          <span />
          <span />
        </div>

        <div className="console-title">
          <FiActivity size={13} />
          MADHYN / MISSION CONTROL
        </div>

        <div className="console-status">
          <span className="status-dot" />
          ACTIVE
        </div>
      </div>

      <div className="console-body">
        <div className="mission-heading">
          <div>
            <div className="micro-label">ACTIVE MISSION</div>
            <h3>Rebuild authentication flow</h3>
          </div>

          <div className="mission-id">M-0842</div>
        </div>

        <div className="progress-row">
          <div className="progress-track">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: '61%' }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
              className="progress-fill"
            />
          </div>

          <span>61%</span>
        </div>

        <div className="stage-list">
          {stages.map(([name, state]) => (
            <div className={`stage stage-${state}`} key={name}>
              <div className="stage-icon">
                {state === 'complete' ? (
                  <FiCheckCircle />
                ) : state === 'active' ? (
                  <FiActivity />
                ) : (
                  <span />
                )}
              </div>

              <span>{name}</span>

              <small>
                {state === 'complete'
                  ? 'DONE'
                  : state === 'active'
                    ? 'RUNNING'
                    : 'QUEUED'}
              </small>
            </div>
          ))}
        </div>

        <div className="terminal">
          <div className="terminal-head">
            <span>EXECUTION LOG</span>
            <span>LIVE</span>
          </div>

          <div className="terminal-line">
            <span className="terminal-prompt">$</span>
            <span>madhyn --mission auth-rebuild --verify</span>
          </div>

          <div className="terminal-line muted">
            <span className="terminal-prompt">›</span>
            <span>Inspecting authentication modules...</span>
          </div>

          <div className="terminal-line muted">
            <span className="terminal-prompt">›</span>
            <span>6 relevant files identified</span>
          </div>

          <div className="terminal-line active-line">
            <span className="terminal-prompt">›</span>
            <span>Applying implementation plan...</span>
            <span className="cursor" />
          </div>
        </div>
      </div>
    </Card3D>
  );
}

function ArchitectureDiagram() {
  return (
    <div className="architecture">
      <div className="arch-node arch-command">
        <FiCommand />
        <span>COMMAND</span>
        <small>Objective</small>
      </div>

      <div className="arch-line" />

      <div className="arch-node">
        <FiLayers />
        <span>CONTEXT</span>
        <small>Repository intelligence</small>
      </div>

      <div className="arch-line" />

      <div className="arch-node arch-bright">
        <FiCpu />
        <span>MISSION ENGINE</span>
        <small>Reason · plan · decide</small>
      </div>

      <div className="arch-split">
        <div className="arch-branch-line" />

        <div className="arch-node">
          <FiCode />
          <span>EXECUTION</span>
          <small>Implement changes</small>
        </div>

        <div className="arch-node">
          <FiShield />
          <span>VERIFICATION</span>
          <small>Test & validate</small>
        </div>
      </div>

      <div className="arch-line arch-final" />

      <div className="arch-node arch-report">
        <FiFileText />
        <span>MISSION REPORT</span>
        <small>What happened</small>
      </div>
    </div>
  );
}

export default function MadhynLearnMorePage() {
  return (
    <div className="madhyn-page">
      <StarField />
      <div className="noise" aria-hidden />

      <BackButton />
      <Navbar />

      {/* HERO */}
      <section className="learn-hero">
        <motion.div
          variants={staggerContainer(0.12, 0.08)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.15 }}
        >
          <motion.div variants={fadeUp} className="hero-eyebrow">
            <span className="eyebrow-dot" />
            Inside MADHYN
          </motion.div>

          <motion.h1 variants={textVariant(0.1)}>
            How the
            <br />
            <FlowText gradient="linear-gradient(90deg,#f1f3f5,#8f98a3,#ffffff,#aeb5bd)">
              autonomous developer
            </FlowText>
            <br />
            works.
          </motion.h1>

          <motion.p variants={fadeUp} className="hero-copy">
            MADHYN is designed to turn a development objective into a
            complete, observable mission — from understanding the project
            to verifying the result.
          </motion.p>

          <motion.div variants={fadeUp} className="hero-meta">
            <span>
              <FiActivity />
              PROJECT AWARE
            </span>
            <span>
              <FiZap />
              EXECUTION FIRST
            </span>
            <span>
              <FiShield />
              VERIFICATION BUILT IN
            </span>
          </motion.div>
        </motion.div>
      </section>

      <hr className="divider" />

      {/* MISSION LOOP */}
      <section className="section">
        <div className="section-container">
          <motion.div
            variants={staggerContainer(0.08, 0.1)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.1 }}
          >
            <motion.div variants={fadeUp} className="section-label">
              THE MISSION LOOP
            </motion.div>

            <motion.h2 variants={textVariant(0)}>
              From command
              <br />
              <span>to verified software.</span>
            </motion.h2>

            <motion.p variants={fadeUp} className="section-intro">
              The core idea behind MADHYN is simple: autonomous development
              should be a loop, not a single generation.
            </motion.p>

            <div className="pipeline">
              {PIPELINE.map((item, index) => (
                <motion.div
                  variants={fadeUp}
                  className="pipeline-item"
                  key={item.number}
                >
                  <div className="pipeline-number">{item.number}</div>

                  <div className="pipeline-icon">{item.icon}</div>

                  <div className="pipeline-content">
                    <div className="pipeline-title-row">
                      <h3>{item.title}</h3>
                      {index < PIPELINE.length - 1 && (
                        <FiChevronRight className="pipeline-arrow" />
                      )}
                    </div>

                    <strong>{item.short}</strong>

                    <p>{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* LIVE CONSOLE */}
      <section className="console-section">
        <div className="section-container">
          <motion.div
            variants={staggerContainer(0.1, 0.1)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.15 }}
          >
            <motion.div variants={fadeUp} className="console-copy">
              <div className="section-label">MISSION CONTROL</div>

              <h2>
                Autonomy should
                <br />
                <span>be visible.</span>
              </h2>

              <p>
                MADHYN shouldn't disappear behind a loading spinner and
                return with a wall of text. Its work should have state,
                progress and a clear outcome.
              </p>
            </motion.div>

            <motion.div variants={fadeUp}>
              <MissionConsole />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ARCHITECTURE */}
      <section className="section architecture-section">
        <div className="section-container">
          <motion.div
            variants={staggerContainer(0.1, 0.1)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.15 }}
          >
            <motion.div variants={fadeUp} className="section-label">
              SYSTEM ARCHITECTURE
            </motion.div>

            <motion.h2 variants={textVariant(0)}>
              A developer
              <br />
              <span>built around missions.</span>
            </motion.h2>

            <motion.p variants={fadeUp} className="section-intro">
              MADHYN's architecture is centered around one continuous
              execution cycle rather than treating planning, coding and
              verification as disconnected activities.
            </motion.p>

            <motion.div variants={fadeUp}>
              <ArchitectureDiagram />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* PROJECT INTELLIGENCE */}
      <section className="intelligence-section">
        <div className="section-container">
          <motion.div
            variants={staggerContainer(0.08, 0.1)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.12 }}
          >
            <motion.div variants={fadeUp} className="section-label">
              CORE CAPABILITIES
            </motion.div>

            <motion.h2 variants={textVariant(0)}>
              Not another
              <br />
              <span>code generator.</span>
            </motion.h2>

            <div className="capability-grid">
              {CAPABILITIES.map((item) => (
                <motion.div
                  variants={fadeUp}
                  key={item.title}
                  className="capability-card"
                >
                  <div className="capability-icon">{item.icon}</div>

                  <div className="capability-label">{item.label}</div>

                  <h3>{item.title}</h3>

                  <p>{item.desc}</p>

                  <div className="card-corner" />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* REPORT */}
      <section className="report-section">
        <div className="section-container">
          <motion.div
            variants={staggerContainer(0.1, 0.1)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.15 }}
          >
            <motion.div variants={fadeUp} className="section-label">
              MISSION REPORT
            </motion.div>

            <motion.h2 variants={textVariant(0)}>
              You should always know
              <br />
              <span>what MADHYN did.</span>
            </motion.h2>

            <motion.div variants={fadeUp}>
              <Card3D
                style={{
                  padding: 0,
                  overflow: 'hidden',
                }}
                orbColor="rgba(199,205,212,0.13)"
              >
                <div className="report-header">
                  <div>
                    <div className="report-kicker">MISSION COMPLETE</div>
                    <h3>Authentication flow rebuilt.</h3>
                  </div>

                  <div className="report-success">
                    <FiCheckCircle />
                    VERIFIED
                  </div>
                </div>

                <div className="report-stats">
                  <div>
                    <span>FILES CHANGED</span>
                    <strong>06</strong>
                  </div>

                  <div>
                    <span>TESTS EXECUTED</span>
                    <strong>24</strong>
                  </div>

                  <div>
                    <span>TESTS PASSED</span>
                    <strong>24</strong>
                  </div>

                  <div>
                    <span>BUILD STATUS</span>
                    <strong>PASS</strong>
                  </div>
                </div>

                <div className="report-footer">
                  <span>
                    <FiGitBranch />
                    working tree inspected
                  </span>

                  <span>
                    <FiCheckCircle />
                    no unresolved issues detected
                  </span>
                </div>
              </Card3D>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="final-section">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="final-orbit">
            <FiCpu />
          </div>

          <div className="section-label">THE IDEA</div>

          <h2>
            Stop prompting.
            <br />
            <FlowText gradient="linear-gradient(90deg,#ffffff,#9da5ae,#ffffff)">
              Start commanding.
            </FlowText>
          </h2>

          <p>
            MADHYN is being built to make autonomous development feel less
            like talking to a chatbot — and more like directing a capable
            engineering system.
          </p>

          <div className="final-actions">
            <Link href="/products/madhyn" className="primary-btn">
              Back to MADHYN
              <FiArrowRight />
            </Link>

            <Link href="/products" className="secondary-btn">
              Explore RexyCore
            </Link>
          </div>
        </motion.div>
      </section>

      <Footer />
      <ChatWidget />

      <style jsx global>{`
        .madhyn-page {
          min-height: 100vh;
          background: #010104;
          color: #fff;
          position: relative;
          overflow-x: hidden;
        }

        .divider {
          border: 0;
          border-top: 1px solid rgba(255, 255, 255, 0.07);
          margin: 0;
        }

        .learn-hero {
          position: relative;
          z-index: 10;
          min-height: 88vh;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 150px 24px 100px;
        }

        .learn-hero > div {
          max-width: 1050px;
        }

        .hero-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 9px;
          padding: 7px 16px;
          margin-bottom: 28px;
          border-radius: 999px;
          border: 1px solid rgba(199, 205, 212, 0.22);
          background: rgba(199, 205, 212, 0.07);
          color: #dce1e6;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 2px;
          text-transform: uppercase;
        }

        .eyebrow-dot,
        .status-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #e7ebef;
          box-shadow: 0 0 10px rgba(231, 235, 239, 0.8);
          animation: madhynPulse 2s ease-in-out infinite;
        }

        .learn-hero h1 {
          margin: 0;
          font-size: clamp(50px, 8vw, 112px);
          line-height: 0.94;
          letter-spacing: -0.065em;
          font-weight: 900;
        }

        .hero-copy {
          max-width: 690px;
          margin: 34px auto 30px;
          color: rgba(255, 255, 255, 0.56);
          font-size: clamp(16px, 2vw, 19px);
          line-height: 1.7;
        }

        .hero-meta {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 10px;
        }

        .hero-meta span {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 8px 12px;
          border: 1px solid rgba(255, 255, 255, 0.07);
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.025);
          color: rgba(255, 255, 255, 0.42);
          font-size: 9px;
          letter-spacing: 1.3px;
          font-weight: 800;
        }

        .hero-meta svg {
          color: #c7cdd4;
        }

        .section {
          position: relative;
          z-index: 10;
          padding: 120px 5%;
        }

        .section-container {
          max-width: 1120px;
          margin: 0 auto;
        }

        .section-label {
          display: inline-block;
          margin-bottom: 18px;
          padding: 6px 13px;
          border-radius: 8px;
          background: rgba(199, 205, 212, 0.07);
          border: 1px solid rgba(199, 205, 212, 0.12);
          color: #cbd1d7;
          font-size: 10px;
          font-weight: 900;
          letter-spacing: 2px;
        }

        .section h2,
        .console-copy h2,
        .final-section h2 {
          margin: 0;
          font-size: clamp(38px, 5vw, 65px);
          line-height: 0.98;
          letter-spacing: -0.055em;
          font-weight: 900;
        }

        .section h2 span,
        .console-copy h2 span {
          color: rgba(255, 255, 255, 0.32);
        }

        .section-intro {
          max-width: 650px;
          margin: 25px 0 65px;
          color: rgba(255, 255, 255, 0.47);
          font-size: 17px;
          line-height: 1.7;
        }

        /* PIPELINE */

        .pipeline {
          position: relative;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }

        .pipeline-item {
          position: relative;
          min-height: 250px;
          padding: 28px;
          border-radius: 20px;
          border: 1px solid rgba(255, 255, 255, 0.07);
          background:
            linear-gradient(
              145deg,
              rgba(255, 255, 255, 0.055),
              rgba(255, 255, 255, 0.015)
            );
          transition:
            transform 0.3s ease,
            border-color 0.3s ease,
            background 0.3s ease;
        }

        .pipeline-item:hover {
          transform: translateY(-5px);
          border-color: rgba(199, 205, 212, 0.2);
          background: rgba(255, 255, 255, 0.045);
        }

        .pipeline-number {
          position: absolute;
          top: 20px;
          right: 22px;
          color: rgba(255, 255, 255, 0.17);
          font-family: monospace;
          font-size: 11px;
          letter-spacing: 1px;
        }

        .pipeline-icon {
          width: 43px;
          height: 43px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 32px;
          border-radius: 12px;
          color: #dfe3e7;
          background: rgba(199, 205, 212, 0.09);
          border: 1px solid rgba(199, 205, 212, 0.12);
          font-size: 18px;
        }

        .pipeline-title-row {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .pipeline-item h3 {
          margin: 0;
          font-size: 21px;
          font-weight: 800;
        }

        .pipeline-arrow {
          color: rgba(255, 255, 255, 0.2);
        }

        .pipeline-item strong {
          display: block;
          margin: 9px 0 12px;
          color: rgba(255, 255, 255, 0.7);
          font-size: 13px;
        }

        .pipeline-item p {
          margin: 0;
          color: rgba(255, 255, 255, 0.42);
          font-size: 13px;
          line-height: 1.65;
        }

        /* CONSOLE */

        .console-section {
          position: relative;
          z-index: 10;
          padding: 120px 5%;
          background:
            radial-gradient(
              ellipse at center,
              rgba(199, 205, 212, 0.045),
              transparent 60%
            );
        }

        .console-copy {
          max-width: 720px;
          margin-bottom: 45px;
        }

        .console-copy p {
          max-width: 600px;
          margin: 24px 0 0;
          color: rgba(255, 255, 255, 0.48);
          line-height: 1.7;
          font-size: 16px;
        }

        .console-top {
          min-height: 50px;
          padding: 0 18px;
          display: flex;
          align-items: center;
          border-bottom: 1px solid rgba(255, 255, 255, 0.07);
          background: rgba(255, 255, 255, 0.025);
        }

        .window-dots {
          display: flex;
          gap: 6px;
          width: 100px;
        }

        .window-dots span {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.18);
        }

        .console-title {
          display: flex;
          align-items: center;
          gap: 8px;
          color: rgba(255, 255, 255, 0.48);
          font-family: monospace;
          font-size: 10px;
          letter-spacing: 1px;
          font-weight: 700;
        }

        .console-status {
          display: flex;
          align-items: center;
          gap: 7px;
          margin-left: auto;
          color: rgba(255, 255, 255, 0.35);
          font-family: monospace;
          font-size: 9px;
          letter-spacing: 1px;
        }

        .console-body {
          padding: 34px;
        }

        .mission-heading {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 20px;
        }

        .micro-label {
          margin-bottom: 8px;
          color: rgba(255, 255, 255, 0.27);
          font-size: 9px;
          font-weight: 900;
          letter-spacing: 2px;
        }

        .mission-heading h3 {
          margin: 0;
          font-size: clamp(21px, 3vw, 30px);
          letter-spacing: -0.025em;
        }

        .mission-id {
          padding: 7px 10px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 7px;
          color: rgba(255, 255, 255, 0.35);
          font-family: monospace;
          font-size: 10px;
        }

        .progress-row {
          display: flex;
          align-items: center;
          gap: 14px;
          margin: 27px 0;
        }

        .progress-track {
          height: 4px;
          flex: 1;
          overflow: hidden;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.07);
        }

        .progress-fill {
          height: 100%;
          border-radius: inherit;
          background: linear-gradient(90deg, #7c848d, #f1f3f5);
          box-shadow: 0 0 18px rgba(241, 243, 245, 0.25);
        }

        .progress-row > span {
          width: 35px;
          color: rgba(255, 255, 255, 0.45);
          font-family: monospace;
          font-size: 11px;
        }

        .stage-list {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 8px;
          margin-bottom: 28px;
        }

        .stage {
          min-width: 0;
          padding: 14px;
          border: 1px solid rgba(255, 255, 255, 0.055);
          border-radius: 11px;
          background: rgba(255, 255, 255, 0.02);
        }

        .stage-active {
          border-color: rgba(199, 205, 212, 0.2);
          background: rgba(199, 205, 212, 0.055);
        }

        .stage-icon {
          display: flex;
          align-items: center;
          margin-bottom: 10px;
          color: rgba(255, 255, 255, 0.25);
        }

        .stage-complete .stage-icon {
          color: #dce1e6;
        }

        .stage-active .stage-icon {
          color: #f1f3f5;
          animation: madhynPulse 1.7s ease-in-out infinite;
        }

        .stage-icon > span {
          width: 9px;
          height: 9px;
          border: 1px solid rgba(255, 255, 255, 0.16);
          border-radius: 50%;
        }

        .stage > span {
          display: block;
          overflow: hidden;
          margin-bottom: 7px;
          color: rgba(255, 255, 255, 0.65);
          font-size: 12px;
          font-weight: 700;
          white-space: nowrap;
          text-overflow: ellipsis;
        }

        .stage small {
          color: rgba(255, 255, 255, 0.25);
          font-family: monospace;
          font-size: 8px;
          letter-spacing: 1px;
        }

        .stage-active small {
          color: #c7cdd4;
        }

        .terminal {
          padding: 18px;
          border: 1px solid rgba(255, 255, 255, 0.07);
          border-radius: 12px;
          background: #050608;
          font-family: monospace;
        }

        .terminal-head {
          display: flex;
          justify-content: space-between;
          margin-bottom: 18px;
          color: rgba(255, 255, 255, 0.22);
          font-size: 8px;
          letter-spacing: 1.5px;
        }

        .terminal-line {
          display: flex;
          align-items: center;
          gap: 9px;
          min-height: 27px;
          color: rgba(255, 255, 255, 0.72);
          font-size: 11px;
        }

        .terminal-line.muted {
          color: rgba(255, 255, 255, 0.35);
        }

        .terminal-prompt {
          color: #dce1e6;
        }

        .cursor {
          width: 6px;
          height: 13px;
          margin-left: 2px;
          background: rgba(255, 255, 255, 0.65);
          animation: madhynBlink 1s step-end infinite;
        }

        /* ARCHITECTURE */

        .architecture-section {
          padding-top: 120px;
        }

        .architecture {
          position: relative;
          max-width: 760px;
          margin: 70px auto 0;
          padding: 45px 25px;
          border: 1px solid rgba(255, 255, 255, 0.07);
          border-radius: 24px;
          background: rgba(255, 255, 255, 0.018);
        }

        .arch-node {
          position: relative;
          width: min(100%, 280px);
          margin: 0 auto;
          padding: 17px 20px;
          display: grid;
          grid-template-columns: 28px 1fr;
          column-gap: 10px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.035);
        }

        .arch-node svg {
          grid-row: span 2;
          align-self: center;
          color: #c7cdd4;
        }

        .arch-node span {
          font-family: monospace;
          font-size: 10px;
          letter-spacing: 1px;
          font-weight: 800;
        }

        .arch-node small {
          margin-top: 3px;
          color: rgba(255, 255, 255, 0.3);
          font-size: 10px;
        }

        .arch-bright {
          border-color: rgba(241, 243, 245, 0.22);
          background: rgba(241, 243, 245, 0.07);
          box-shadow: 0 0 50px rgba(199, 205, 212, 0.06);
        }

        .arch-line {
          width: 1px;
          height: 38px;
          margin: 0 auto;
          background: linear-gradient(
            to bottom,
            rgba(255, 255, 255, 0.15),
            rgba(255, 255, 255, 0.04)
          );
        }

        .arch-split {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          margin-top: 38px;
          position: relative;
        }

        .arch-split .arch-node {
          width: 100%;
        }

        .arch-branch-line {
          position: absolute;
          left: 25%;
          right: 25%;
          top: -20px;
          height: 1px;
          background: rgba(255, 255, 255, 0.1);
        }

        .arch-branch-line::before,
        .arch-branch-line::after {
          content: '';
          position: absolute;
          top: 0;
          width: 1px;
          height: 20px;
          background: rgba(255, 255, 255, 0.1);
        }

        .arch-branch-line::before {
          left: 0;
        }

        .arch-branch-line::after {
          right: 0;
        }

        .arch-final {
          margin-top: 38px;
        }

        .arch-report {
          border-color: rgba(199, 205, 212, 0.16);
        }

        /* CAPABILITIES */

        .intelligence-section {
          position: relative;
          z-index: 10;
          padding: 120px 5%;
          background:
            linear-gradient(
              180deg,
              transparent,
              rgba(255, 255, 255, 0.018),
              transparent
            );
        }

        .capability-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 18px;
          margin-top: 60px;
        }

        .capability-card {
          position: relative;
          min-height: 280px;
          padding: 34px;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.07);
          border-radius: 20px;
          background: rgba(255, 255, 255, 0.025);
        }

        .capability-card:hover {
          border-color: rgba(199, 205, 212, 0.18);
        }

        .capability-icon {
          width: 44px;
          height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 25px;
          border-radius: 12px;
          color: #e1e5e8;
          background: rgba(199, 205, 212, 0.09);
          font-size: 19px;
        }

        .capability-label {
          margin-bottom: 10px;
          color: rgba(255, 255, 255, 0.27);
          font-family: monospace;
          font-size: 9px;
          letter-spacing: 1.7px;
          font-weight: 800;
        }

        .capability-card h3 {
          max-width: 450px;
          margin: 0 0 13px;
          font-size: 23px;
          line-height: 1.15;
          letter-spacing: -0.025em;
        }

        .capability-card p {
          max-width: 490px;
          margin: 0;
          color: rgba(255, 255, 255, 0.42);
          font-size: 14px;
          line-height: 1.7;
        }

        .card-corner {
          position: absolute;
          width: 100px;
          height: 100px;
          right: -60px;
          bottom: -60px;
          border: 1px solid rgba(255, 255, 255, 0.06);
          transform: rotate(45deg);
        }

        /* REPORT */

        .report-section {
          position: relative;
          z-index: 10;
          padding: 120px 5%;
        }

        .report-section .section-container > div > .section-label {
          margin-bottom: 18px;
        }

        .report-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 20px;
          padding: 30px 32px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.07);
        }

        .report-kicker {
          margin-bottom: 8px;
          color: #c7cdd4;
          font-family: monospace;
          font-size: 9px;
          letter-spacing: 1.8px;
          font-weight: 800;
        }

        .report-header h3 {
          margin: 0;
          font-size: 24px;
          letter-spacing: -0.025em;
        }

        .report-success {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 11px;
          border: 1px solid rgba(199, 205, 212, 0.17);
          border-radius: 8px;
          color: #dce1e6;
          font-family: monospace;
          font-size: 9px;
          letter-spacing: 1px;
        }

        .report-stats {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          padding: 28px 32px;
          gap: 20px;
        }

        .report-stats div {
          padding-right: 20px;
          border-right: 1px solid rgba(255, 255, 255, 0.07);
        }

        .report-stats div:last-child {
          border-right: 0;
        }

        .report-stats span {
          display: block;
          margin-bottom: 9px;
          color: rgba(255, 255, 255, 0.27);
          font-family: monospace;
          font-size: 8px;
          letter-spacing: 1.3px;
        }

        .report-stats strong {
          color: rgba(255, 255, 255, 0.86);
          font-family: monospace;
          font-size: 22px;
        }

        .report-footer {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          gap: 12px;
          padding: 18px 32px;
          border-top: 1px solid rgba(255, 255, 255, 0.07);
          color: rgba(255, 255, 255, 0.3);
          font-family: monospace;
          font-size: 9px;
        }

        .report-footer span {
          display: flex;
          align-items: center;
          gap: 7px;
        }

        .report-footer svg {
          color: #c7cdd4;
        }

        /* FINAL */

        .final-section {
          position: relative;
          z-index: 10;
          padding: 150px 24px;
          text-align: center;
          overflow: hidden;
        }

        .final-section > div {
          max-width: 850px;
          margin: 0 auto;
        }

        .final-orbit {
          width: 70px;
          height: 70px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 35px;
          border: 1px solid rgba(199, 205, 212, 0.2);
          border-radius: 50%;
          color: #e6eaed;
          background: rgba(199, 205, 212, 0.06);
          box-shadow:
            0 0 0 12px rgba(199, 205, 212, 0.02),
            0 0 60px rgba(199, 205, 212, 0.08);
          font-size: 24px;
        }

        .final-section h2 {
          font-size: clamp(42px, 6vw, 78px);
        }

        .final-section p {
          max-width: 650px;
          margin: 28px auto 38px;
          color: rgba(255, 255, 255, 0.43);
          line-height: 1.7;
          font-size: 16px;
        }

        .final-actions {
          display: flex;
          justify-content: center;
          gap: 12px;
          flex-wrap: wrap;
        }

        .primary-btn,
        .secondary-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 9px;
          min-height: 52px;
          padding: 0 25px;
          border-radius: 999px;
          text-decoration: none;
          font-size: 14px;
          font-weight: 800;
          transition:
            transform 0.25s ease,
            background 0.25s ease;
        }

        .primary-btn {
          color: #000;
          background: #fff;
        }

        .secondary-btn {
          color: #fff;
          border: 1px solid rgba(255, 255, 255, 0.1);
          background: rgba(255, 255, 255, 0.04);
        }

        .primary-btn:hover,
        .secondary-btn:hover {
          transform: translateY(-2px);
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

        @media (max-width: 900px) {
          .pipeline {
            grid-template-columns: repeat(2, 1fr);
          }

          .stage-list {
            grid-template-columns: repeat(2, 1fr);
          }

          .capability-grid {
            grid-template-columns: 1fr;
          }

          .report-stats {
            grid-template-columns: repeat(2, 1fr);
          }

          .report-stats div:nth-child(2) {
            border-right: 0;
          }

          .report-stats div:nth-child(-n + 2) {
            padding-bottom: 18px;
            border-bottom: 1px solid rgba(255, 255, 255, 0.07);
          }
        }

        @media (max-width: 600px) {
          .learn-hero {
            min-height: 82vh;
            padding: 130px 18px 80px;
          }

          .learn-hero h1 {
            font-size: clamp(45px, 14vw, 72px);
          }

          .hero-copy {
            margin-top: 26px;
            font-size: 15px;
          }

          .hero-meta {
            flex-direction: column;
            align-items: center;
          }

          .section,
          .console-section,
          .intelligence-section,
          .report-section {
            padding: 85px 18px;
          }

          .section h2,
          .console-copy h2 {
            font-size: clamp(36px, 11vw, 52px);
          }

          .section-intro {
            margin-bottom: 42px;
            font-size: 15px;
          }

          .pipeline {
            grid-template-columns: 1fr;
          }

          .pipeline-item {
            min-height: auto;
            padding: 25px;
          }

          .pipeline-icon {
            margin-bottom: 23px;
          }

          .pipeline-arrow {
            display: none;
          }

          .console-body {
            padding: 22px;
          }

          .console-top {
            padding: 0 13px;
          }

          .window-dots {
            width: auto;
            margin-right: 13px;
          }

          .console-title {
            font-size: 8px;
          }

          .console-status {
            display: none;
          }

          .mission-heading {
            align-items: flex-start;
            flex-direction: column;
          }

          .stage-list {
            grid-template-columns: 1fr;
          }

          .stage {
            display: grid;
            grid-template-columns: 25px 1fr auto;
            align-items: center;
            gap: 7px;
          }

          .stage-icon {
            margin: 0;
          }

          .stage > span {
            margin: 0;
          }

          .terminal {
            padding: 14px;
            overflow-x: auto;
          }

          .terminal-line {
            white-space: nowrap;
            font-size: 9px;
          }

          .architecture {
            margin-top: 45px;
            padding: 28px 14px;
          }

          .arch-split {
            grid-template-columns: 1fr;
            gap: 15px;
            margin-top: 38px;
          }

          .arch-branch-line {
            display: none;
          }

          .arch-split .arch-node {
            width: min(100%, 280px);
          }

          .capability-grid {
            margin-top: 42px;
          }

          .capability-card {
            min-height: auto;
            padding: 28px;
          }

          .report-header {
            padding: 25px;
            align-items: flex-start;
            flex-direction: column;
          }

          .report-header h3 {
            font-size: 20px;
          }

          .report-stats {
            padding: 25px;
            gap: 0;
          }

          .report-stats div {
            padding: 15px 10px 15px 0;
          }

          .report-footer {
            padding: 17px 25px;
            flex-direction: column;
          }

          .final-section {
            padding: 110px 18px;
          }

          .final-section h2 {
            font-size: clamp(42px, 12vw, 62px);
          }

          .final-section p {
            font-size: 15px;
          }

          .final-actions {
            flex-direction: column;
          }

          .primary-btn,
          .secondary-btn {
            width: 100%;
          }
        }

        @media (max-width: 380px) {
          .learn-hero h1 {
            font-size: 43px;
          }

          .hero-eyebrow {
            font-size: 9px;
            letter-spacing: 1.4px;
          }

          .console-body {
            padding: 18px;
          }

          .report-stats strong {
            font-size: 18px;
          }
        }
      `}
      </style>
    </div>
  );
}