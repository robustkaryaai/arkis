'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ChatWidget from '@/components/ChatWidget';
import BackButton from '@/components/BackButton';
import { motion } from 'framer-motion';
import {
  FiArrowRight,
  FiCpu,
  FiGitBranch,
  FiTerminal,
  FiCheckCircle,
  FiActivity,
  FiLayers,
  FiZap,
  FiShield,
  FiCode,
  FiTarget,
  FiCommand,
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

/* ──────────────────────────────────────────────────────────────
   MADHYN — product identity
   ────────────────────────────────────────────────────────────── */

const ACCENT = '#c7cdd4';
const ACCENT_BRIGHT = '#f1f3f5';
const ACCENT_DIM = 'rgba(199,205,212,0.16)';

const FEATURES = [
  {
    size: 'wide',
    icon: <FiTarget />,
    title: 'Command the mission. MADHYN handles the work.',
    desc:
      'Give MADHYN a goal instead of a checklist. It turns your request into a development mission, decides what needs to happen, executes the work, and keeps the full operation visible to you.',
  },
  {
    size: 'half',
    icon: <FiLayers />,
    title: 'Understands the project before changing it.',
    desc:
      'MADHYN builds context around your repository, structure, files, tooling, dependencies, and existing implementation before it starts modifying anything.',
  },
  {
    size: 'half',
    icon: <FiGitBranch />,
    title: 'Plans before it executes.',
    desc:
      'Complex work is broken into deliberate stages so the system can reason about dependencies, implementation order, affected files, and what needs verification.',
  },
  {
    size: 'half',
    icon: <FiTerminal />,
    title: 'Actually does the engineering.',
    desc:
      'MADHYN can work through the development environment rather than stopping at suggestions—editing files, running commands, building projects, and inspecting the results.',
  },
  {
    size: 'half',
    icon: <FiCheckCircle />,
    title: 'Verification is part of the loop.',
    desc:
      'A task is not considered finished just because code was written. MADHYN checks the resulting state and uses the outcome to decide what happens next.',
  },
];

const PIPELINE = [
  {
    number: '01',
    icon: <FiCommand />,
    title: 'Command',
    desc: 'Describe the outcome you want.',
  },
  {
    number: '02',
    icon: <FiLayers />,
    title: 'Understand',
    desc: 'Inspect the project and build context.',
  },
  {
    number: '03',
    icon: <FiTarget />,
    title: 'Plan',
    desc: 'Create the execution strategy.',
  },
  {
    number: '04',
    icon: <FiTerminal />,
    title: 'Execute',
    desc: 'Make the actual changes.',
  },
  {
    number: '05',
    icon: <FiCheckCircle />,
    title: 'Verify',
    desc: 'Test, inspect, and validate the result.',
  },
  {
    number: '06',
    icon: <FiActivity />,
    title: 'Report',
    desc: 'Tell you exactly what happened.',
  },
];

const PRINCIPLES = [
  {
    icon: <FiCpu />,
    title: 'Project-aware',
    desc: 'MADHYN works with the reality of your codebase rather than treating every task like an isolated prompt.',
  },
  {
    icon: <FiZap />,
    title: 'Execution-first',
    desc: 'The goal is not another AI chat window. The goal is getting the engineering work done.',
  },
  {
    icon: <FiShield />,
    title: 'Visible autonomy',
    desc: 'Autonomous does not mean invisible. The mission, actions, and resulting state should remain understandable.',
  },
];

/* ──────────────────────────────────────────────────────────────
   Mission visual
   ────────────────────────────────────────────────────────────── */

function MissionConsole() {
  return (
    <Card3D
      orbColor="rgba(199,205,212,0.16)"
      style={{
        padding: 0,
        overflow: 'hidden',
        borderRadius: 24,
        background: 'rgba(255,255,255,0.025)',
        border: '1px solid rgba(255,255,255,0.08)',
      }}
    >
      <div style={{ padding: '18px 20px', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: '#f1f3f5',
              boxShadow: '0 0 10px rgba(241,243,245,0.6)',
            }}
          />
          <span
            style={{
              fontSize: 11,
              fontWeight: 800,
              letterSpacing: 2,
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.55)',
            }}
          >
            MADHYN / MISSION CONTROL
          </span>
        </div>
      </div>

      <div style={{ padding: 24 }}>
        <div
          style={{
            fontSize: 11,
            textTransform: 'uppercase',
            letterSpacing: 2,
            color: ACCENT,
            fontWeight: 800,
            marginBottom: 10,
          }}
        >
          Active mission
        </div>

        <div
          style={{
            fontSize: 24,
            fontWeight: 850,
            letterSpacing: '-0.03em',
            marginBottom: 22,
          }}
        >
          Rebuild authentication flow
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {[
            ['Repository context', 'Complete', true],
            ['Implementation plan', 'Complete', true],
            ['Code changes', 'Running', false],
            ['Verification', 'Queued', false],
          ].map(([label, status, done], index) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false }}
              transition={{ delay: index * 0.08, duration: 0.45 }}
              style={{
                display: 'grid',
                gridTemplateColumns: '24px 1fr auto',
                alignItems: 'center',
                gap: 12,
                padding: '12px 14px',
                borderRadius: 12,
                background: 'rgba(255,255,255,0.025)',
                border: '1px solid rgba(255,255,255,0.05)',
              }}
            >
              <div
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: 8,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: done ? '#111' : ACCENT,
                  background: done ? ACCENT_BRIGHT : 'rgba(255,255,255,0.05)',
                }}
              >
                {done ? <FiCheckCircle size={13} /> : <FiActivity size={13} />}
              </div>

              <div
                style={{
                  fontSize: 13,
                  fontWeight: 650,
                  color: 'rgba(255,255,255,0.8)',
                }}
              >
                {label}
              </div>

              <div
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: done ? ACCENT_BRIGHT : 'rgba(255,255,255,0.35)',
                }}
              >
                {status}
              </div>
            </motion.div>
          ))}
        </div>

        <div
          style={{
            marginTop: 20,
            padding: '12px 14px',
            borderRadius: 12,
            background: 'rgba(199,205,212,0.05)',
            border: '1px solid rgba(199,205,212,0.12)',
            fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
            fontSize: 12,
            color: 'rgba(255,255,255,0.46)',
          }}
        >
          <span style={{ color: ACCENT_BRIGHT }}>$</span>{' '}
          madhyn --mission auth-rebuild --verify
        </div>
      </div>
    </Card3D>
  );
}

/* ──────────────────────────────────────────────────────────────
   PAGE
   ────────────────────────────────────────────────────────────── */

export default function MadhynPage() {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#010104',
        color: '#fff',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <StarField />
      <div className="noise" aria-hidden />

      <BackButton />
      <Navbar />

      {/* ── HERO ─────────────────────────────────────────────── */}

      <section
        style={{
          position: 'relative',
          zIndex: 10,
          minHeight: '92vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '130px 24px 80px',
        }}
      >
        <motion.div
          variants={staggerContainer(0.12, 0.1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.15 }}
          style={{ width: '100%', maxWidth: 1120 }}
        >
          <motion.div
            variants={fadeUp}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '6px 16px',
              borderRadius: 999,
              background: 'rgba(199,205,212,0.08)',
              border: '1px solid rgba(199,205,212,0.18)',
              color: ACCENT_BRIGHT,
              fontSize: 11,
              fontWeight: 800,
              letterSpacing: 2,
              textTransform: 'uppercase',
              marginBottom: 24,
            }}
          >
            <motion.span
              animate={{ opacity: [1, 0.35, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              style={{
                width: 7,
                height: 7,
                borderRadius: '50%',
                background: ACCENT_BRIGHT,
                boxShadow: '0 0 10px rgba(241,243,245,0.7)',
              }}
            />
            Autonomous developer system
          </motion.div>

          <motion.h1
            variants={textVariant(0.1)}
            style={{
              fontSize: 'clamp(62px, 12vw, 160px)',
              fontWeight: 950,
              letterSpacing: '-0.07em',
              lineHeight: 0.88,
              margin: '0 0 24px',
            }}
          >
            <FlowText gradient="linear-gradient(90deg, #8f969f, #f5f7f8, #9da4ad, #f5f7f8, #8f969f)">
              MADHYN
            </FlowText>
          </motion.h1>

          <motion.h2
            variants={textVariant(0.2)}
            style={{
              fontSize: 'clamp(28px, 4vw, 52px)',
              fontWeight: 850,
              letterSpacing: '-0.03em',
              marginBottom: 28,
            }}
          >
            Your command center for{' '}
            <span style={{ color: ACCENT_BRIGHT }}>autonomous development.</span>
          </motion.h2>

          <motion.p
            variants={fadeUp}
            style={{
              fontSize: 'clamp(16px, 2vw, 20px)',
              lineHeight: 1.7,
              color: 'rgba(255,255,255,0.55)',
              maxWidth: 720,
              margin: '0 auto 44px',
            }}
          >
            Tell MADHYN what you want built. It understands your project,
            plans the mission, executes the work, verifies the result, and
            reports back what actually happened.
          </motion.p>

          <motion.div
            variants={fadeUp}
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: 14,
              flexWrap: 'wrap',
            }}
          >
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              href="#mission"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '16px 30px',
                borderRadius: 999,
                background: '#f1f3f5',
                color: '#07080a',
                fontWeight: 850,
                fontSize: 15,
                textDecoration: 'none',
                boxShadow: '0 0 40px rgba(241,243,245,0.1)',
              }}
            >
              See the mission loop <FiArrowRight />
            </motion.a>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }}>
              <Link
                href="/products/madhyn/learn-more"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '16px 30px',
                  borderRadius: 999,
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: '#fff',
                  fontWeight: 750,
                  fontSize: 15,
                  textDecoration: 'none',
                }}
              >
                Learn more
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Hero mission visual */}

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.1 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          style={{
            width: '100%',
            maxWidth: 920,
            marginTop: 72,
          }}
        >
          <MissionConsole />
        </motion.div>
      </section>

      <hr className="divider" />

      {/* ── WHAT MADHYN DOES ──────────────────────────────────── */}

      <section
        id="mission"
        style={{
          position: 'relative',
          zIndex: 10,
          padding: '100px 5% 120px',
        }}
      >
        <div style={{ maxWidth: 1120, margin: '0 auto' }}>
          <motion.div
            variants={staggerContainer(0.1, 0.05)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.15 }}
          >
            <motion.p
              variants={fadeUp}
              style={{
                color: ACCENT,
                fontSize: 11,
                fontWeight: 850,
                letterSpacing: 3,
                textTransform: 'uppercase',
                marginBottom: 16,
              }}
            >
              The MADHYN loop
            </motion.p>

            <motion.h2
              variants={textVariant(0.1)}
              style={{
                fontSize: 'clamp(36px, 5vw, 64px)',
                lineHeight: 1,
                fontWeight: 900,
                letterSpacing: '-0.045em',
                maxWidth: 700,
                marginBottom: 58,
              }}
            >
              From idea to{' '}
              <FlowText gradient="linear-gradient(90deg, #f1f3f5, #969da6, #f1f3f5)">
                verified result.
              </FlowText>
            </motion.h2>

            <motion.div
              variants={staggerContainer(0.06, 0.05)}
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: 14,
              }}
            >
              {PIPELINE.map((step) => (
                <motion.div key={step.number} variants={fadeUp}>
                  <Card3D
                    orbColor="rgba(199,205,212,0.14)"
                    style={{
                      padding: 24,
                      height: '100%',
                      boxSizing: 'border-box',
                      minHeight: 190,
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        marginBottom: 30,
                      }}
                    >
                      <div
                        style={{
                          width: 42,
                          height: 42,
                          borderRadius: 12,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: ACCENT_BRIGHT,
                          background: 'rgba(199,205,212,0.08)',
                          border: '1px solid rgba(199,205,212,0.12)',
                        }}
                      >
                        {step.icon}
                      </div>

                      <span
                        style={{
                          fontSize: 11,
                          fontWeight: 850,
                          letterSpacing: 2,
                          color: 'rgba(255,255,255,0.22)',
                        }}
                      >
                        {step.number}
                      </span>
                    </div>

                    <h3
                      style={{
                        fontSize: 21,
                        fontWeight: 850,
                        letterSpacing: '-0.025em',
                        marginBottom: 8,
                      }}
                    >
                      {step.title}
                    </h3>

                    <p
                      style={{
                        margin: 0,
                        color: 'rgba(255,255,255,0.45)',
                        lineHeight: 1.6,
                        fontSize: 14,
                      }}
                    >
                      {step.desc}
                    </p>
                  </Card3D>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── FEATURES ──────────────────────────────────────────── */}

      <section
        style={{
          position: 'relative',
          zIndex: 10,
          padding: '20px 5% 120px',
        }}
      >
        <div style={{ maxWidth: 1120, margin: '0 auto' }}>
          <motion.div
            variants={staggerContainer(0.1, 0.05)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.15 }}
          >
            <motion.div variants={fadeUp}>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '5px 13px',
                  borderRadius: 8,
                  background: 'rgba(199,205,212,0.07)',
                  color: ACCENT,
                  fontSize: 10,
                  fontWeight: 850,
                  letterSpacing: 2,
                  textTransform: 'uppercase',
                  marginBottom: 16,
                }}
              >
                <FiCode />
                Core capabilities
              </div>
            </motion.div>

            <motion.h2
              variants={textVariant(0.1)}
              style={{
                fontSize: 'clamp(34px, 4.5vw, 56px)',
                fontWeight: 900,
                letterSpacing: '-0.04em',
                marginBottom: 48,
              }}
            >
              Not an assistant.
              <br />
              <span style={{ color: 'rgba(255,255,255,0.42)' }}>
                An engineering system.
              </span>
            </motion.h2>

            <motion.div
              variants={staggerContainer(0.05, 0.1)}
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: 18,
                gridAutoRows: 'minmax(190px, auto)',
              }}
            >
              {FEATURES.map((feature) => (
                <motion.div
                  key={feature.title}
                  variants={fadeUp}
                  style={{
                    gridColumn:
                      feature.size === 'wide'
                        ? 'span 4'
                        : feature.size === 'half'
                        ? 'span 2'
                        : 'span 4',
                  }}
                >
                  <Card3D
                    orbColor="rgba(199,205,212,0.15)"
                    style={{
                      padding: '30px 28px',
                      height: '100%',
                      boxSizing: 'border-box',
                    }}
                  >
                    <div
                      style={{
                        width: 44,
                        height: 44,
                        borderRadius: 12,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: 24,
                        color: ACCENT_BRIGHT,
                        background: 'rgba(199,205,212,0.08)',
                        border: '1px solid rgba(199,205,212,0.1)',
                        fontSize: 19,
                      }}
                    >
                      {feature.icon}
                    </div>

                    <h3
                      style={{
                        fontSize: 20,
                        fontWeight: 850,
                        letterSpacing: '-0.02em',
                        marginBottom: 12,
                      }}
                    >
                      {feature.title}
                    </h3>

                    <p
                      style={{
                        margin: 0,
                        color: 'rgba(255,255,255,0.48)',
                        fontSize: 15,
                        lineHeight: 1.65,
                        maxWidth: feature.size === 'wide' ? 850 : 620,
                      }}
                    >
                      {feature.desc}
                    </p>
                  </Card3D>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── WHY MADHYN ────────────────────────────────────────── */}

      <section
        style={{
          position: 'relative',
          zIndex: 10,
          padding: '20px 5% 140px',
        }}
      >
        <div style={{ maxWidth: 1120, margin: '0 auto' }}>
          <motion.div
            variants={staggerContainer(0.08, 0.05)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.15 }}
          >
            <motion.div variants={fadeUp}>
              <Card3D
                orbColor="rgba(199,205,212,0.12)"
                style={{
                  padding: '56px 44px',
                }}
              >
                <div
                  style={{
                    maxWidth: 760,
                  }}
                >
                  <div
                    style={{
                      fontSize: 11,
                      fontWeight: 850,
                      letterSpacing: 3,
                      textTransform: 'uppercase',
                      color: ACCENT,
                      marginBottom: 16,
                    }}
                  >
                    Why MADHYN
                  </div>

                  <h2
                    style={{
                      fontSize: 'clamp(34px, 4vw, 52px)',
                      fontWeight: 900,
                      letterSpacing: '-0.04em',
                      lineHeight: 1.04,
                      marginBottom: 20,
                    }}
                  >
                    Software development should feel like giving a mission.
                  </h2>

                  <p
                    style={{
                      fontSize: 17,
                      lineHeight: 1.75,
                      color: 'rgba(255,255,255,0.45)',
                      marginBottom: 42,
                    }}
                  >
                    Traditional coding assistants wait for every instruction.
                    MADHYN is designed around a different interaction model:
                    define the objective, give it the environment, and let the
                    system carry the mission through the engineering loop.
                  </p>

                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(3, 1fr)',
                      gap: 14,
                    }}
                  >
                    {PRINCIPLES.map((item) => (
                      <div
                        key={item.title}
                        style={{
                          padding: 20,
                          borderRadius: 16,
                          background: 'rgba(255,255,255,0.025)',
                          border: '1px solid rgba(255,255,255,0.06)',
                        }}
                      >
                        <div
                          style={{
                            color: ACCENT_BRIGHT,
                            marginBottom: 16,
                            fontSize: 20,
                          }}
                        >
                          {item.icon}
                        </div>

                        <h3
                          style={{
                            margin: '0 0 8px',
                            fontSize: 17,
                            fontWeight: 800,
                          }}
                        >
                          {item.title}
                        </h3>

                        <p
                          style={{
                            margin: 0,
                            fontSize: 13,
                            lineHeight: 1.6,
                            color: 'rgba(255,255,255,0.4)',
                          }}
                        >
                          {item.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </Card3D>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── FINAL CTA ─────────────────────────────────────────── */}

      <section
        style={{
          position: 'relative',
          zIndex: 10,
          padding: '0 5% 140px',
        }}
      >
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.15 }}
            transition={{ duration: 0.8 }}
          >
            <Card3D
              orbColor="rgba(241,243,245,0.14)"
              style={{
                padding: '80px 40px',
                textAlign: 'center',
              }}
            >
              <div
                style={{
                  width: 54,
                  height: 54,
                  borderRadius: 16,
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: '#f1f3f5',
                  color: '#08090a',
                  marginBottom: 24,
                }}
              >
                <FiCommand size={23} />
              </div>

              <h2
                style={{
                  fontSize: 'clamp(34px, 5vw, 58px)',
                  fontWeight: 900,
                  letterSpacing: '-0.05em',
                  lineHeight: 1,
                  marginBottom: 18,
                }}
              >
                Stop prompting.
                <br />
                <span style={{ color: 'rgba(255,255,255,0.42)' }}>
                  Start commanding.
                </span>
              </h2>

              <p
                style={{
                  maxWidth: 620,
                  margin: '0 auto 34px',
                  color: 'rgba(255,255,255,0.45)',
                  fontSize: 16,
                  lineHeight: 1.7,
                }}
              >
                MADHYN is being built for the next kind of development
                workflow—one where an AI system does more than generate code.
              </p>

              <Link
                href="/products/madhyn/learn-more"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '15px 28px',
                  borderRadius: 999,
                  background: '#fff',
                  color: '#000',
                  textDecoration: 'none',
                  fontSize: 15,
                  fontWeight: 850,
                }}
              >
                Explore MADHYN <FiArrowRight />
              </Link>
            </Card3D>
          </motion.div>
        </div>
      </section>

      <Footer />
      <ChatWidget />
    </div>
  );
}