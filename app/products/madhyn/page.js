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
  FiCode,
  FiCommand,
  FiCpu,
  FiGitBranch,
  FiLayers,
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


/* ═══════════════════════════════════════════════════════════════
   MADHYN
   Autonomous Developer System
   ═══════════════════════════════════════════════════════════════ */

const ACCENT = '#c7cdd4';
const ACCENT_BRIGHT = '#f1f3f5';


/* ───────────────────────────────────────────────────────────────
   FEATURE DATA
   ─────────────────────────────────────────────────────────────── */

const FEATURES = [
  {
    size: 'wide',
    icon: <FiCpu />,
    title: 'Understand the project before touching it.',
    desc:
      'MADHYN builds context around your repository, structure, files, dependencies, tooling, and existing implementation before deciding what needs to change.',
  },
  {
    size: 'half',
    icon: <FiTarget />,
    title: 'Turn objectives into missions.',
    desc:
      'Give MADHYN an outcome instead of a list of tiny instructions. It can break complex development work into a sequence of actionable stages.',
  },
  {
    size: 'half',
    icon: <FiTerminal />,
    title: 'Execute the actual work.',
    desc:
      'MADHYN is designed to work inside the development environment—editing files, running commands, building software, and inspecting what happens.',
  },
  {
    size: 'half',
    icon: <FiCheckCircle />,
    title: 'Verification is part of the loop.',
    desc:
      'Writing code is not the finish line. MADHYN checks the resulting state and can use those results to determine what needs to happen next.',
  },
  {
    size: 'half',
    icon: <FiActivity />,
    title: 'Never leave the mission silent.',
    desc:
      'The interface is designed around visible mission state, actions, progress, and results so you can understand what MADHYN is actually doing.',
  },
];


const PIPELINE = [
  {
    number: '01',
    icon: <FiCommand />,
    title: 'Command',
    desc: 'Describe the outcome.',
  },
  {
    number: '02',
    icon: <FiCpu />,
    title: 'Understand',
    desc: 'Build project context.',
  },
  {
    number: '03',
    icon: <FiTarget />,
    title: 'Plan',
    desc: 'Create the mission.',
  },
  {
    number: '04',
    icon: <FiTerminal />,
    title: 'Execute',
    desc: 'Make the changes.',
  },
  {
    number: '05',
    icon: <FiCheckCircle />,
    title: 'Verify',
    desc: 'Check the result.',
  },
  {
    number: '06',
    icon: <FiActivity />,
    title: 'Report',
    desc: 'Tell you what happened.',
  },
];


const PRINCIPLES = [
  {
    icon: <FiLayers />,
    title: 'Project-aware',
    desc:
      'MADHYN works with the reality of your codebase rather than treating every task as an isolated prompt.',
  },
  {
    icon: <FiZap />,
    title: 'Execution-first',
    desc:
      'The goal is not another AI chat window. The goal is getting engineering work done.',
  },
  {
    icon: <FiShield />,
    title: 'Visible autonomy',
    desc:
      'Autonomous should never mean invisible. The mission and its state stay understandable.',
  },
];


/* ───────────────────────────────────────────────────────────────
   MISSION CONSOLE
   ─────────────────────────────────────────────────────────────── */

function MissionConsole() {
  const steps = [
    {
      label: 'Repository context',
      status: 'COMPLETE',
      complete: true,
    },
    {
      label: 'Mission planning',
      status: 'COMPLETE',
      complete: true,
    },
    {
      label: 'Implementation',
      status: 'RUNNING',
      complete: false,
      active: true,
    },
    {
      label: 'Verification',
      status: 'QUEUED',
      complete: false,
    },
  ];

  return (
    <Card3D
      orbColor="rgba(199,205,212,0.18)"
      style={{
        padding: 0,
        overflow: 'hidden',
        borderRadius: 24,
        background: 'rgba(255,255,255,0.025)',
        border: '1px solid rgba(255,255,255,0.08)',
      }}
    >
      {/* Console header */}
      <div className="madhyn-console-header">
        <div className="madhyn-window-dots">
          <span />
          <span />
          <span />
        </div>

        <div className="madhyn-console-title">
          <span className="madhyn-live-dot" />
          MADHYN / MISSION CONTROL
        </div>

        <div className="madhyn-console-status">
          ACTIVE
        </div>
      </div>

      {/* Console body */}
      <div className="madhyn-console-body">

        <div className="madhyn-console-top">
          <div>
            <div className="madhyn-console-label">
              ACTIVE MISSION
            </div>

            <div className="madhyn-console-mission">
              Rebuild authentication flow
            </div>
          </div>

          <div className="madhyn-mission-id">
            M-0842
          </div>
        </div>


        {/* Progress */}
        <div className="madhyn-progress">
          <div className="madhyn-progress-track">
            <motion.div
              className="madhyn-progress-fill"
              initial={{ width: 0 }}
              whileInView={{ width: '61%' }}
              viewport={{ once: false }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
            />
          </div>

          <span>61%</span>
        </div>


        {/* Steps */}
        <div className="madhyn-steps">
          {steps.map((step, index) => (
            <motion.div
              key={step.label}
              className={`madhyn-step ${step.active ? 'madhyn-step-active' : ''}`}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false }}
              transition={{
                delay: index * 0.08,
                duration: 0.4,
              }}
            >
              <div
                className={`madhyn-step-icon ${
                  step.complete ? 'madhyn-step-complete' : ''
                }`}
              >
                {step.complete ? (
                  <FiCheckCircle />
                ) : (
                  <FiActivity />
                )}
              </div>

              <div className="madhyn-step-name">
                {step.label}
              </div>

              <div
                className={`madhyn-step-status ${
                  step.active ? 'madhyn-status-active' : ''
                }`}
              >
                {step.status}
              </div>
            </motion.div>
          ))}
        </div>


        {/* Terminal */}
        <div className="madhyn-terminal">
          <div>
            <span className="terminal-symbol">$</span>
            madhyn
          </div>

          <div className="terminal-command">
            --mission auth-rebuild --verify
          </div>

          <div className="terminal-cursor" />
        </div>

      </div>
    </Card3D>
  );
}


/* ───────────────────────────────────────────────────────────────
   PAGE
   ═══════════════════════════════════════════════════════════════ */

export default function MadhynPage() {
  return (
    <div className="madhyn-page">

      <StarField />

      <div className="noise" aria-hidden />

      <BackButton />
      <Navbar />


      {/* ═══════════════════════════════════════════════════════
          HERO
          ═══════════════════════════════════════════════════════ */}

      <section className="madhyn-hero">

        <motion.div
          className="madhyn-hero-content"
          variants={staggerContainer(0.12, 0.1)}
          initial="hidden"
          whileInView="show"
          viewport={{
            once: false,
            amount: 0.15,
          }}
        >

          {/* Eyebrow */}

          <motion.div
            variants={fadeUp}
            className="madhyn-eyebrow"
          >
            <motion.span
              className="madhyn-eyebrow-dot"
              animate={{
                opacity: [1, 0.3, 1],
              }}
              transition={{
                repeat: Infinity,
                duration: 2,
              }}
            />

            Autonomous developer system
          </motion.div>


          {/* Title */}

          <motion.h1
            variants={textVariant(0.1)}
            className="madhyn-title"
          >
            <FlowText
              gradient="
                linear-gradient(
                  90deg,
                  #858c95 0%,
                  #f7f8f9 28%,
                  #aeb5bd 50%,
                  #ffffff 72%,
                  #858c95 100%
                )
              "
            >
              MADHYN
            </FlowText>
          </motion.h1>


          {/* Tagline */}

          <motion.h2
            variants={textVariant(0.2)}
            className="madhyn-tagline"
          >
            Your command center for{' '}
            <span>autonomous development.</span>
          </motion.h2>


          {/* Description */}

          <motion.p
            variants={fadeUp}
            className="madhyn-hero-description"
          >
            Tell MADHYN what you want built. It understands your project,
            plans the mission, executes the work, verifies the result,
            and reports back what actually happened.
          </motion.p>


          {/* Actions */}

          <motion.div
            variants={fadeUp}
            className="madhyn-hero-actions"
          >
            <motion.a
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              href="#mission"
              className="madhyn-primary-button"
            >
              See the mission loop
              <FiArrowRight />
            </motion.a>

            <motion.div
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              <Link
                href="/products/madhyn/learn-more"
                className="madhyn-secondary-button"
              >
                Learn more
              </Link>
            </motion.div>
          </motion.div>

        </motion.div>


        {/* Mission UI */}

        <motion.div
          className="madhyn-console-wrapper"
          initial={{
            opacity: 0,
            y: 50,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: false,
            amount: 0.1,
          }}
          transition={{
            duration: 0.9,
            delay: 0.2,
          }}
        >
          <MissionConsole />
        </motion.div>

      </section>


      <hr className="divider" />


      {/* ═══════════════════════════════════════════════════════
          MISSION LOOP
          ═══════════════════════════════════════════════════════ */}

      <section
        id="mission"
        className="madhyn-section"
      >

        <div className="madhyn-container">

          <motion.div
            variants={staggerContainer(0.08, 0.05)}
            initial="hidden"
            whileInView="show"
            viewport={{
              once: false,
              amount: 0.15,
            }}
          >

            <motion.div
              variants={fadeUp}
              className="madhyn-section-label"
            >
              THE MADHYN LOOP
            </motion.div>


            <motion.h2
              variants={textVariant(0.1)}
              className="madhyn-section-title"
            >
              From idea to{' '}
              <FlowText
                gradient="
                  linear-gradient(
                    90deg,
                    #f1f3f5,
                    #9ca3aa,
                    #f1f3f5
                  )
                "
              >
                verified result.
              </FlowText>
            </motion.h2>


            <motion.div
              variants={staggerContainer(0.06, 0.05)}
              className="madhyn-pipeline"
            >

              {PIPELINE.map((step) => (
                <motion.div
                  key={step.number}
                  variants={fadeUp}
                  className="madhyn-pipeline-card"
                >

                  <div className="madhyn-pipeline-top">

                    <div className="madhyn-pipeline-icon">
                      {step.icon}
                    </div>

                    <span className="madhyn-pipeline-number">
                      {step.number}
                    </span>

                  </div>

                  <h3>{step.title}</h3>

                  <p>{step.desc}</p>

                </motion.div>
              ))}

            </motion.div>

          </motion.div>

        </div>

      </section>


      {/* ═══════════════════════════════════════════════════════
          FEATURES
          ═══════════════════════════════════════════════════════ */}

      <section className="madhyn-section madhyn-features-section">

        <div className="madhyn-container">

          <motion.div
            variants={staggerContainer(0.08, 0.05)}
            initial="hidden"
            whileInView="show"
            viewport={{
              once: false,
              amount: 0.15,
            }}
          >

            <motion.div
              variants={fadeUp}
              className="madhyn-section-label"
            >
              CORE CAPABILITIES
            </motion.div>


            <motion.h2
              variants={textVariant(0.1)}
              className="madhyn-section-title"
            >
              Not another assistant.
              <br />

              <span className="madhyn-muted">
                An engineering system.
              </span>
            </motion.h2>


            <motion.div
              variants={staggerContainer(0.05, 0.1)}
              className="madhyn-feature-grid"
            >

              {FEATURES.map((feature) => (
                <motion.div
                  key={feature.title}
                  variants={fadeUp}
                  className={`madhyn-feature-card ${
                    feature.size === 'wide'
                      ? 'madhyn-feature-wide'
                      : 'madhyn-feature-half'
                  }`}
                >

                  <Card3D
                    orbColor="rgba(199,205,212,0.14)"
                    style={{
                      padding: '30px 28px',
                      height: '100%',
                      boxSizing: 'border-box',
                    }}
                  >

                    <div className="madhyn-feature-icon">
                      {feature.icon}
                    </div>

                    <h3>
                      {feature.title}
                    </h3>

                    <p>
                      {feature.desc}
                    </p>

                  </Card3D>

                </motion.div>
              ))}

            </motion.div>

          </motion.div>

        </div>

      </section>


      {/* ═══════════════════════════════════════════════════════
          THE IDEA
          ═══════════════════════════════════════════════════════ */}

      <section className="madhyn-section madhyn-idea-section">

        <div className="madhyn-container">

          <motion.div
            initial={{
              opacity: 0,
              y: 30,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: false,
              amount: 0.15,
            }}
            transition={{
              duration: 0.8,
            }}
          >

            <Card3D
              orbColor="rgba(199,205,212,0.12)"
              style={{
                padding: 0,
                overflow: 'hidden',
              }}
            >

              <div className="madhyn-idea-grid">

                {/* Left */}

                <div className="madhyn-idea-copy">

                  <div className="madhyn-section-label">
                    WHY MADHYN
                  </div>

                  <h2>
                    Software development
                    <br />
                    should feel like
                    <br />
                    <span>giving a mission.</span>
                  </h2>

                  <p>
                    Traditional coding assistants wait for every
                    instruction. MADHYN is designed around a different
                    interaction model: define the objective, give it
                    the environment, and let the system carry the
                    mission through the engineering loop.
                  </p>

                </div>


                {/* Right */}

                <div className="madhyn-principles">

                  {PRINCIPLES.map((item, index) => (
                    <motion.div
                      key={item.title}
                      initial={{
                        opacity: 0,
                        x: 20,
                      }}
                      whileInView={{
                        opacity: 1,
                        x: 0,
                      }}
                      viewport={{
                        once: false,
                      }}
                      transition={{
                        delay: index * 0.1,
                      }}
                      className="madhyn-principle"
                    >

                      <div className="madhyn-principle-icon">
                        {item.icon}
                      </div>

                      <div>
                        <h3>
                          {item.title}
                        </h3>

                        <p>
                          {item.desc}
                        </p>
                      </div>

                    </motion.div>
                  ))}

                </div>

              </div>

            </Card3D>

          </motion.div>

        </div>

      </section>


      {/* ═══════════════════════════════════════════════════════
          FINAL CTA
          ═══════════════════════════════════════════════════════ */}

      <section className="madhyn-section madhyn-final-section">

        <div className="madhyn-final-container">

          <motion.div
            initial={{
              opacity: 0,
              y: 30,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: false,
              amount: 0.15,
            }}
            transition={{
              duration: 0.8,
            }}
          >

            <Card3D
              orbColor="rgba(241,243,245,0.13)"
              style={{
                padding: 0,
                overflow: 'hidden',
              }}
            >

              <div className="madhyn-final-card">

                <div className="madhyn-command-icon">
                  <FiCommand />
                </div>

                <h2>
                  Stop prompting.
                  <br />

                  <span>
                    Start commanding.
                  </span>
                </h2>

                <p>
                  MADHYN is being built for a development workflow where
                  an AI system does more than generate code.
                </p>

                <Link
                  href="/products/madhyn/learn-more"
                  className="madhyn-primary-button"
                >
                  Explore MADHYN
                  <FiArrowRight />
                </Link>

              </div>

            </Card3D>

          </motion.div>

        </div>

      </section>


      <Footer />
      <ChatWidget />


      {/* ═══════════════════════════════════════════════════════
          RESPONSIVE CSS
          ═══════════════════════════════════════════════════════ */}

      <style jsx global>{`

        /* ──────────────────────────────────────────────────────
           BASE
           ────────────────────────────────────────────────────── */

        .madhyn-page {
          min-height: 100vh;
          background: #010104;
          color: #fff;
          position: relative;
          overflow-x: hidden;
        }

        .madhyn-container {
          width: min(1120px, calc(100% - 48px));
          margin: 0 auto;
        }


        /* ──────────────────────────────────────────────────────
           HERO
           ────────────────────────────────────────────────────── */

        .madhyn-hero {
          position: relative;
          z-index: 10;

          min-height: 92vh;

          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;

          text-align: center;

          padding:
            140px
            24px
            100px;

          box-sizing: border-box;
        }

        .madhyn-hero-content {
          width: 100%;
          max-width: 1120px;
        }

        .madhyn-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 9px;

          padding: 7px 16px;

          border-radius: 999px;

          background: rgba(199,205,212,0.07);
          border: 1px solid rgba(199,205,212,0.17);

          color: #dce0e4;

          font-size: 11px;
          font-weight: 850;
          letter-spacing: 2px;
          text-transform: uppercase;

          margin-bottom: 26px;
        }

        .madhyn-eyebrow-dot {
          width: 7px;
          height: 7px;

          border-radius: 50%;

          background: #f1f3f5;

          box-shadow:
            0 0 8px rgba(241,243,245,0.75);
        }

        .madhyn-title {
          font-size: clamp(58px, 11vw, 158px);

          font-weight: 950;

          letter-spacing: -0.075em;

          line-height: 0.86;

          margin:
            0
            0
            28px;
        }

        .madhyn-tagline {
          max-width: 950px;

          margin:
            0
            auto
            28px;

          font-size: clamp(28px, 4.2vw, 56px);

          font-weight: 850;

          letter-spacing: -0.045em;

          line-height: 1.02;
        }

        .madhyn-tagline span {
          color: #cdd2d7;
        }

        .madhyn-hero-description {
          max-width: 720px;

          margin:
            0
            auto
            46px;

          color: rgba(255,255,255,0.53);

          font-size: clamp(16px, 2vw, 20px);

          line-height: 1.7;
        }

        .madhyn-hero-actions {
          display: flex;
          align-items: center;
          justify-content: center;

          gap: 14px;

          flex-wrap: wrap;
        }

        .madhyn-primary-button,
        .madhyn-secondary-button {
          min-height: 52px;

          padding:
            15px
            27px;

          box-sizing: border-box;

          border-radius: 999px;

          display: inline-flex;
          align-items: center;
          justify-content: center;

          gap: 9px;

          text-decoration: none;

          font-size: 15px;
          font-weight: 850;

          white-space: nowrap;
        }

        .madhyn-primary-button {
          background: #f1f3f5;
          color: #08090a;

          box-shadow:
            0 0 35px rgba(241,243,245,0.08);
        }

        .madhyn-secondary-button {
          color: #fff;

          background: rgba(255,255,255,0.035);

          border:
            1px solid
            rgba(255,255,255,0.1);
        }


        /* ──────────────────────────────────────────────────────
           MISSION CONSOLE
           ────────────────────────────────────────────────────── */

        .madhyn-console-wrapper {
          width: 100%;
          max-width: 900px;

          margin-top: 70px;
        }

        .madhyn-console-header {
          height: 52px;

          display: grid;
          grid-template-columns: 1fr auto 1fr;

          align-items: center;

          padding:
            0
            18px;

          box-sizing: border-box;

          border-bottom:
            1px solid
            rgba(255,255,255,0.07);
        }

        .madhyn-window-dots {
          display: flex;
          gap: 6px;
        }

        .madhyn-window-dots span {
          width: 7px;
          height: 7px;

          border-radius: 50%;

          background: rgba(255,255,255,0.2);
        }

        .madhyn-console-title {
          display: flex;
          align-items: center;
          gap: 8px;

          color: rgba(255,255,255,0.55);

          font-size: 10px;
          font-weight: 850;
          letter-spacing: 2px;
        }

        .madhyn-live-dot {
          width: 6px;
          height: 6px;

          border-radius: 50%;

          background: #f1f3f5;

          box-shadow:
            0 0 9px rgba(241,243,245,0.7);
        }

        .madhyn-console-status {
          justify-self: end;

          color: #cdd2d7;

          font-size: 9px;
          font-weight: 850;
          letter-spacing: 1.5px;
        }

        .madhyn-console-body {
          padding: 30px;
        }

        .madhyn-console-top {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;

          gap: 20px;

          margin-bottom: 24px;
        }

        .madhyn-console-label {
          margin-bottom: 8px;

          color: #aeb5bd;

          font-size: 10px;
          font-weight: 850;
          letter-spacing: 2px;
        }

        .madhyn-console-mission {
          font-size: 25px;
          font-weight: 850;

          letter-spacing: -0.035em;
        }

        .madhyn-mission-id {
          color: rgba(255,255,255,0.28);

          font-family:
            ui-monospace,
            SFMono-Regular,
            Menlo,
            monospace;

          font-size: 11px;
        }

        .madhyn-progress {
          display: flex;
          align-items: center;

          gap: 12px;

          margin-bottom: 20px;
        }

        .madhyn-progress-track {
          height: 4px;

          flex: 1;

          border-radius: 999px;

          background: rgba(255,255,255,0.06);

          overflow: hidden;
        }

        .madhyn-progress-fill {
          height: 100%;

          border-radius: inherit;

          background:
            linear-gradient(
              90deg,
              #777e86,
              #f1f3f5
            );
        }

        .madhyn-progress > span {
          color: rgba(255,255,255,0.35);

          font-size: 10px;
          font-weight: 800;

          width: 30px;
        }

        .madhyn-steps {
          display: flex;
          flex-direction: column;

          gap: 8px;
        }

        .madhyn-step {
          min-height: 50px;

          display: grid;
          grid-template-columns: 30px 1fr auto;

          align-items: center;

          gap: 12px;

          padding:
            9px
            12px;

          box-sizing: border-box;

          border-radius: 12px;

          background: rgba(255,255,255,0.022);

          border:
            1px solid
            rgba(255,255,255,0.045);
        }

        .madhyn-step-active {
          background: rgba(199,205,212,0.055);

          border-color:
            rgba(199,205,212,0.14);
        }

        .madhyn-step-icon {
          width: 28px;
          height: 28px;

          display: flex;
          align-items: center;
          justify-content: center;

          border-radius: 9px;

          background: rgba(255,255,255,0.045);

          color: #aeb5bd;

          font-size: 13px;
        }

        .madhyn-step-complete {
          color: #08090a;

          background: #dce0e4;
        }

        .madhyn-step-name {
          font-size: 13px;
          font-weight: 650;

          color: rgba(255,255,255,0.72);
        }

        .madhyn-step-status {
          color: rgba(255,255,255,0.28);

          font-size: 9px;
          font-weight: 850;
          letter-spacing: 1px;
        }

        .madhyn-status-active {
          color: #e6e9ec;
        }

        .madhyn-terminal {
          margin-top: 18px;

          padding:
            15px
            16px;

          border-radius: 11px;

          background: #050608;

          border:
            1px solid
            rgba(255,255,255,0.06);

          color: rgba(255,255,255,0.42);

          font-family:
            ui-monospace,
            SFMono-Regular,
            Menlo,
            Monaco,
            Consolas,
            monospace;

          font-size: 11px;

          text-align: left;
        }

        .terminal-symbol {
          color: #f1f3f5;

          margin-right: 7px;
        }

        .terminal-command {
          display: inline;
        }

        .terminal-cursor {
          display: inline-block;

          width: 6px;
          height: 12px;

          margin-left: 5px;

          vertical-align: -2px;

          background: rgba(241,243,245,0.65);

          animation:
            madhynBlink
            1s
            infinite;
        }

        @keyframes madhynBlink {
          0%,
          45% {
            opacity: 1;
          }

          46%,
          100% {
            opacity: 0;
          }
        }


        /* ──────────────────────────────────────────────────────
           SECTIONS
           ────────────────────────────────────────────────────── */

        .madhyn-section {
          position: relative;

          z-index: 10;

          padding:
            105px
            0;
        }

        .madhyn-section-label {
          display: inline-block;

          margin-bottom: 16px;

          padding:
            5px
            13px;

          border-radius: 8px;

          background:
            rgba(199,205,212,0.07);

          color: #bfc5cb;

          font-size: 10px;
          font-weight: 850;

          letter-spacing: 2.5px;

          text-transform: uppercase;
        }

        .madhyn-section-title {
          max-width: 800px;

          margin:
            0
            0
            52px;

          font-size:
            clamp(36px, 5vw, 62px);

          font-weight: 900;

          letter-spacing: -0.055em;

          line-height: 0.98;
        }

        .madhyn-muted {
          color: rgba(255,255,255,0.4);
        }


        /* ──────────────────────────────────────────────────────
           PIPELINE
           ────────────────────────────────────────────────────── */

        .madhyn-pipeline {
          display: grid;

          grid-template-columns:
            repeat(3, 1fr);

          gap: 14px;
        }

        .madhyn-pipeline-card {
          min-height: 190px;

          padding: 24px;

          box-sizing: border-box;

          border:
            1px solid
            rgba(255,255,255,0.07);

          border-radius: 18px;

          background:
            rgba(255,255,255,0.025);

          transition:
            transform 0.25s ease,
            border-color 0.25s ease,
            background 0.25s ease;
        }

        .madhyn-pipeline-card:hover {
          transform: translateY(-4px);

          border-color:
            rgba(199,205,212,0.18);

          background:
            rgba(255,255,255,0.04);
        }

        .madhyn-pipeline-top {
          display: flex;

          align-items: flex-start;

          justify-content: space-between;

          margin-bottom: 30px;
        }

        .madhyn-pipeline-icon {
          width: 42px;
          height: 42px;

          display: flex;
          align-items: center;
          justify-content: center;

          border-radius: 12px;

          color: #e1e4e7;

          background:
            rgba(199,205,212,0.08);

          border:
            1px solid
            rgba(199,205,212,0.1);
        }

        .madhyn-pipeline-number {
          color: rgba(255,255,255,0.22);

          font-size: 10px;
          font-weight: 850;

          letter-spacing: 2px;
        }

        .madhyn-pipeline-card h3 {
          margin:
            0
            0
            8px;

          font-size: 20px;
          font-weight: 850;

          letter-spacing: -0.025em;
        }

        .madhyn-pipeline-card p {
          margin: 0;

          color: rgba(255,255,255,0.4);

          font-size: 14px;

          line-height: 1.6;
        }


        /* ──────────────────────────────────────────────────────
           FEATURES
           ────────────────────────────────────────────────────── */

        .madhyn-features-section {
          padding-top: 20px;
        }

        .madhyn-feature-grid {
          display: grid;

          grid-template-columns:
            repeat(4, 1fr);

          gap: 16px;
        }

        .madhyn-feature-wide {
          grid-column: span 4;
        }

        .madhyn-feature-half {
          grid-column: span 2;
        }

        .madhyn-feature-card {
          min-height: 210px;
        }

        .madhyn-feature-icon {
          width: 44px;
          height: 44px;

          display: flex;
          align-items: center;
          justify-content: center;

          margin-bottom: 22px;

          border-radius: 12px;

          background:
            rgba(199,205,212,0.08);

          border:
            1px solid
            rgba(199,205,212,0.1);

          color: #e1e4e7;

          font-size: 19px;
        }

        .madhyn-feature-card h3 {
          margin:
            0
            0
            11px;

          font-size: 20px;
          font-weight: 850;

          letter-spacing: -0.025em;
        }

        .madhyn-feature-card p {
          max-width: 850px;

          margin: 0;

          color: rgba(255,255,255,0.45);

          font-size: 14px;

          line-height: 1.65;
        }


        /* ──────────────────────────────────────────────────────
           IDEA SECTION
           ────────────────────────────────────────────────────── */

        .madhyn-idea-section {
          padding-top: 40px;
        }

        .madhyn-idea-grid {
          display: grid;

          grid-template-columns:
            1.15fr
            0.85fr;

          min-height: 480px;
        }

        .madhyn-idea-copy {
          padding: 58px 50px;

          border-right:
            1px solid
            rgba(255,255,255,0.06);
        }

        .madhyn-idea-copy h2 {
          margin:
            0
            0
            25px;

          font-size:
            clamp(34px, 4vw, 52px);

          font-weight: 900;

          letter-spacing: -0.05em;

          line-height: 1.02;
        }

        .madhyn-idea-copy h2 span {
          color: rgba(255,255,255,0.4);
        }

        .madhyn-idea-copy p {
          max-width: 650px;

          margin: 0;

          color: rgba(255,255,255,0.43);

          font-size: 16px;

          line-height: 1.75;
        }

        .madhyn-principles {
          padding: 38px;

          display: flex;

          flex-direction: column;

          justify-content: center;

          gap: 12px;
        }

        .madhyn-principle {
          display: grid;

          grid-template-columns:
            44px
            1fr;

          gap: 15px;

          padding: 18px;

          border-radius: 15px;

          background:
            rgba(255,255,255,0.025);

          border:
            1px solid
            rgba(255,255,255,0.055);
        }

        .madhyn-principle-icon {
          width: 42px;
          height: 42px;

          display: flex;
          align-items: center;
          justify-content: center;

          border-radius: 11px;

          color: #dfe3e6;

          background:
            rgba(199,205,212,0.08);
        }

        .madhyn-principle h3 {
          margin:
            0
            0
            5px;

          font-size: 16px;
          font-weight: 800;
        }

        .madhyn-principle p {
          margin: 0;

          color: rgba(255,255,255,0.38);

          font-size: 12px;

          line-height: 1.55;
        }


        /* ──────────────────────────────────────────────────────
           FINAL
           ────────────────────────────────────────────────────── */

        .madhyn-final-section {
          padding-top: 30px;
          padding-bottom: 140px;
        }

        .madhyn-final-container {
          width: min(900px, calc(100% - 48px));

          margin: 0 auto;
        }

        .madhyn-final-card {
          padding:
            82px
            40px;

          text-align: center;
        }

        .madhyn-command-icon {
          width: 54px;
          height: 54px;

          display: inline-flex;
          align-items: center;
          justify-content: center;

          margin-bottom: 25px;

          border-radius: 16px;

          background: #f1f3f5;

          color: #08090a;

          font-size: 23px;
        }

        .madhyn-final-card h2 {
          margin:
            0
            0
            20px;

          font-size:
            clamp(38px, 5vw, 62px);

          font-weight: 900;

          letter-spacing: -0.055em;

          line-height: 0.98;
        }

        .madhyn-final-card h2 span {
          color: rgba(255,255,255,0.38);
        }

        .madhyn-final-card p {
          max-width: 620px;

          margin:
            0
            auto
            34px;

          color: rgba(255,255,255,0.42);

          font-size: 16px;

          line-height: 1.7;
        }


        /* ══════════════════════════════════════════════════════
           TABLET
           ══════════════════════════════════════════════════════ */

        @media (max-width: 900px) {

          .madhyn-hero {
            min-height: auto;

            padding-top: 130px;
          }

          .madhyn-pipeline {
            grid-template-columns:
              repeat(2, 1fr);
          }

          .madhyn-feature-grid {
            grid-template-columns:
              repeat(2, 1fr);
          }

          .madhyn-feature-wide {
            grid-column: span 2;
          }

          .madhyn-feature-half {
            grid-column: span 1;
          }

          .madhyn-idea-grid {
            grid-template-columns: 1fr;
          }

          .madhyn-idea-copy {
            border-right: none;

            border-bottom:
              1px solid
              rgba(255,255,255,0.06);
          }

        }


        /* ══════════════════════════════════════════════════════
           PHONE
           ══════════════════════════════════════════════════════ */

        @media (max-width: 600px) {

          .madhyn-container {
            width:
              calc(100% - 32px);
          }


          /* HERO */

          .madhyn-hero {
            padding:
              115px
              16px
              70px;
          }

          .madhyn-eyebrow {
            max-width: 92%;

            padding:
              7px
              12px;

            font-size: 9px;

            letter-spacing: 1.4px;

            text-align: center;
          }

          .madhyn-title {
            font-size:
              clamp(55px, 18vw, 92px);

            letter-spacing: -0.075em;

            margin-bottom: 22px;
          }

          .madhyn-tagline {
            font-size:
              clamp(27px, 8vw, 40px);

            line-height: 1.04;

            max-width: 360px;
          }

          .madhyn-hero-description {
            max-width: 360px;

            font-size: 15px;

            line-height: 1.65;

            margin-bottom: 32px;
          }

          .madhyn-hero-actions {
            width: 100%;

            flex-direction: column;

            gap: 10px;
          }

          .madhyn-primary-button,
          .madhyn-secondary-button {
            width: 100%;

            max-width: 340px;

            min-height: 51px;

            padding:
              14px
              20px;
          }


          /* CONSOLE */

          .madhyn-console-wrapper {
            margin-top: 48px;

            width: 100%;
          }

          .madhyn-console-header {
            height: 46px;

            grid-template-columns:
              auto
              1fr
              auto;

            padding:
              0
              12px;
          }

          .madhyn-console-title {
            justify-self: center;

            font-size: 8px;

            letter-spacing: 1.1px;
          }

          .madhyn-console-status {
            font-size: 7px;
          }

          .madhyn-window-dots span {
            width: 6px;
            height: 6px;
          }

          .madhyn-console-body {
            padding: 18px 14px;
          }

          .madhyn-console-top {
            margin-bottom: 18px;

            gap: 10px;
          }

          .madhyn-console-label {
            font-size: 8px;

            letter-spacing: 1.4px;
          }

          .madhyn-console-mission {
            font-size: 17px;

            line-height: 1.2;
          }

          .madhyn-mission-id {
            font-size: 8px;
          }

          .madhyn-step {
            min-height: 46px;

            grid-template-columns:
              27px
              minmax(0, 1fr)
              auto;

            gap: 8px;

            padding:
              8px;
          }

          .madhyn-step-icon {
            width: 27px;
            height: 27px;

            font-size: 11px;
          }

          .madhyn-step-name {
            font-size: 11px;
          }

          .madhyn-step-status {
            font-size: 7px;

            letter-spacing: 0.7px;
          }

          .madhyn-terminal {
            overflow: hidden;

            white-space: nowrap;

            font-size: 9px;

            padding:
              12px;
          }


          /* SECTIONS */

          .madhyn-section {
            padding:
              75px
              0;
          }

          .madhyn-section-title {
            font-size:
              clamp(34px, 10vw, 47px);

            line-height: 1;

            margin-bottom: 35px;
          }

          .madhyn-section-label {
            font-size: 8px;

            letter-spacing: 2px;

            padding:
              5px
              10px;
          }


          /* PIPELINE */

          .madhyn-pipeline {
            grid-template-columns: 1fr;

            gap: 10px;
          }

          .madhyn-pipeline-card {
            min-height: auto;

            padding: 20px;
          }

          .madhyn-pipeline-top {
            margin-bottom: 22px;
          }

          .madhyn-pipeline-card h3 {
            font-size: 18px;
          }

          .madhyn-pipeline-card p {
            font-size: 13px;
          }


          /* FEATURES */

          .madhyn-features-section {
            padding-top: 10px;
          }

          .madhyn-feature-grid {
            grid-template-columns: 1fr;

            gap: 12px;
          }

          .madhyn-feature-wide,
          .madhyn-feature-half {
            grid-column: span 1;
          }

          .madhyn-feature-card {
            min-height: 0;
          }

          .madhyn-feature-icon {
            margin-bottom: 18px;
          }

          .madhyn-feature-card h3 {
            font-size: 18px;

            line-height: 1.2;
          }

          .madhyn-feature-card p {
            font-size: 13px;
          }


          /* IDEA */

          .madhyn-idea-grid {
            display: block;
          }

          .madhyn-idea-copy {
            padding:
              34px
              24px;
          }

          .madhyn-idea-copy h2 {
            font-size:
              clamp(31px, 9vw, 43px);

            line-height: 1.02;
          }

          .madhyn-idea-copy p {
            font-size: 14px;
          }

          .madhyn-principles {
            padding:
              18px;
          }

          .madhyn-principle {
            grid-template-columns:
              38px
              minmax(0, 1fr);

            padding:
              15px;

            gap: 12px;
          }

          .madhyn-principle-icon {
            width: 38px;
            height: 38px;
          }

          .madhyn-principle h3 {
            font-size: 15px;
          }

          .madhyn-principle p {
            font-size: 11px;
          }


          /* FINAL */

          .madhyn-final-section {
            padding-top: 0;

            padding-bottom: 90px;
          }

          .madhyn-final-container {
            width:
              calc(100% - 32px);
          }

          .madhyn-final-card {
            padding:
              58px
              22px;
          }

          .madhyn-final-card h2 {
            font-size:
              clamp(36px, 10vw, 48px);
          }

          .madhyn-final-card p {
            font-size: 14px;

            line-height: 1.65;
          }

        }


        /* ══════════════════════════════════════════════════════
           VERY SMALL PHONES
           ══════════════════════════════════════════════════════ */

        @media (max-width: 380px) {

          .madhyn-hero {
            padding-left: 12px;
            padding-right: 12px;
          }

          .madhyn-title {
            font-size: 53px;
          }

          .madhyn-console-title {
            font-size: 7px;
          }

          .madhyn-console-status {
            display: none;
          }

          .madhyn-step-status {
            display: none;
          }

          .madhyn-terminal {
            font-size: 8px;
          }

          .madhyn-final-card {
            padding:
              52px
              18px;
          }

        }

      `}</style>

    </div>
  );
}