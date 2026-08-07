// app/desktop/oauth-success/page.js
//
// Called after OAuth completes. Fires a deep-link back into whichever
// Rexycore desktop product initiated the flow.
//
// URL shape coming in:
//   /desktop/oauth-success?email=...&username=...&slug=...&plan=...&product=neytreya
//   /desktop/oauth-success?email=...&username=...&slug=...&plan=...           ← defaults to rk-ai
//
// Deep-link schemes:
//   rk-ai://oauth-success?...      (RK AI Desktop)
//   neytreya://oauth-success?...   (Neytreya)

"use client";

import { useEffect, useState, useRef } from "react";

// Map product slug → deep-link scheme
const PRODUCT_SCHEMES = {
  "neytreya": "neytreya",
  "rk-ai":    "rk-ai",
};

const PRODUCT_LABELS = {
  "neytreya": "Neytreya",
  "rk-ai":    "RK AI",
};

const PRODUCT_COLORS = {
  "neytreya": { accent: "#10b981", glow: "rgba(16,185,129,0.25)", gradient: "linear-gradient(135deg, #10b981, #34d399)" },
  "rk-ai":    { accent: "#6366f1", glow: "rgba(99,102,241,0.25)",  gradient: "linear-gradient(135deg, #6366f1, #9333ea)" },
};

export default function DesktopOAuthSuccessPage() {
  const [deepLink, setDeepLink]         = useState(null);
  const [productLabel, setProductLabel] = useState("the app");
  const [productKey, setProductKey]     = useState("rk-ai");
  const [phase, setPhase]               = useState("launching"); // "launching" | "fallback"
  const iframeRef = useRef(null);

  useEffect(() => {
    const search = typeof window !== "undefined" ? window.location.search || "" : "";
    const params = new URLSearchParams(search);

    const product = params.get("product") || "rk-ai";
    const scheme  = PRODUCT_SCHEMES[product] || "rk-ai";
    const label   = PRODUCT_LABELS[product]  || "RK AI";

    params.delete("product");
    const forwardedSearch = params.toString() ? `?${params.toString()}` : "";
    const targetLink = `${scheme}://oauth-success${forwardedSearch}`;

    setDeepLink(targetLink);
    setProductLabel(label);
    setProductKey(product);

    // Use iframe trick — fires the deep link without navigating the page away.
    // This way if the app is closed, the user stays on this page and sees fallback UI.
    const launchTimer = setTimeout(() => {
      try {
        // Primary method: iframe deep link (doesn't navigate page)
        if (iframeRef.current) {
          iframeRef.current.src = targetLink;
        }
        // Also try location.href but catch the failure gracefully
        window.location.href = targetLink;
      } catch (e) {
        console.warn("Deep link launch failed:", e);
      }
    }, 600);

    // After 3.5s, if we're still here (page didn't close / app didn't hijack focus),
    // show the fallback "didn't open?" UI.
    const fallbackTimer = setTimeout(() => {
      setPhase("fallback");
    }, 3500);

    return () => {
      clearTimeout(launchTimer);
      clearTimeout(fallbackTimer);
    };
  }, []);

  const colors = PRODUCT_COLORS[productKey] || PRODUCT_COLORS["rk-ai"];

  const handleRetry = () => {
    if (!deepLink) return;
    setPhase("launching");
    setTimeout(() => {
      try {
        if (iframeRef.current) iframeRef.current.src = deepLink;
        window.location.href = deepLink;
      } catch (e) {}
      setTimeout(() => setPhase("fallback"), 3000);
    }, 300);
  };

  return (
    <>
      {/* Hidden iframe for deep-link firing without navigation */}
      <iframe ref={iframeRef} style={{ display: "none" }} title="deeplink" />

      <main style={s.main}>
        {/* Background glow */}
        <div style={{ ...s.bgGlow, background: colors.glow }} />

        <section style={s.card}>
          {/* Animated orb */}
          <div style={s.orbWrap}>
            <div style={{ ...s.orb, background: colors.gradient }} />
            <div style={{ ...s.orbRing, borderColor: colors.accent }} />
          </div>

          {phase === "launching" ? (
            <>
              <h1 style={s.title}>Opening {productLabel}…</h1>
              <p style={s.sub}>
                Google sign-in is complete. {productLabel} should open automatically.
              </p>
              <div style={s.loader}>
                <div style={{ ...s.dot, animationDelay: "0s",   background: colors.accent }} />
                <div style={{ ...s.dot, animationDelay: "0.15s", background: colors.accent }} />
                <div style={{ ...s.dot, animationDelay: "0.3s",  background: colors.accent }} />
              </div>
            </>
          ) : (
            <>
              <h1 style={s.title}>Didn't open?</h1>
              <p style={s.sub}>
                The app may not be running. Start {productLabel}, then click retry — or use
                the manual link below.
              </p>
              <div style={s.actions}>
                <button onClick={handleRetry} style={{ ...s.btn, background: colors.gradient }}>
                  Retry opening {productLabel}
                </button>
                {deepLink && (
                  <a href={deepLink} style={s.manualLink}>
                    Open manually
                  </a>
                )}
              </div>
              <div style={s.hint}>
                <span style={s.hintIcon}>ⓘ</span>
                <span>
                  Make sure <strong>{productLabel}</strong> is installed and running in
                  your system tray / menubar before retrying.
                </span>
              </div>
            </>
          )}
        </section>
      </main>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: .85; transform: scale(1); }
          50%       { opacity: .55; transform: scale(1.1); }
        }
        @keyframes bounce {
          0%, 80%, 100% { transform: translateY(0); opacity: 1; }
          40%           { transform: translateY(-8px); opacity: 0.5; }
        }
        @keyframes spin-slow {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </>
  );
}

const s = {
  main: {
    minHeight: "100vh",
    display: "grid",
    placeItems: "center",
    background: "#05070f",
    color: "#ffffff",
    fontFamily: "Inter, ui-sans-serif, system-ui, -apple-system, sans-serif",
    position: "relative",
    overflow: "hidden",
  },
  bgGlow: {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    width: 600,
    height: 600,
    borderRadius: "50%",
    filter: "blur(120px)",
    pointerEvents: "none",
    zIndex: 0,
  },
  card: {
    textAlign: "center",
    padding: "48px 40px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 24,
    maxWidth: 500,
    position: "relative",
    zIndex: 1,
    background: "rgba(255,255,255,0.025)",
    border: "1px solid rgba(255,255,255,0.07)",
    borderRadius: 24,
    backdropFilter: "blur(20px)",
  },
  orbWrap: {
    position: "relative",
    width: 80,
    height: 80,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  orb: {
    width: 60,
    height: 60,
    borderRadius: "50%",
    opacity: 0.9,
    animation: "pulse 2s cubic-bezier(0.4,0,0.6,1) infinite",
    filter: "blur(3px)",
  },
  orbRing: {
    position: "absolute",
    inset: 0,
    borderRadius: "50%",
    border: "1.5px solid",
    opacity: 0.4,
    animation: "spin-slow 4s linear infinite",
  },
  title: {
    fontSize: 28,
    fontWeight: 800,
    margin: 0,
    letterSpacing: "-0.5px",
    color: "#ffffff",
  },
  sub: {
    color: "#a1a1aa",
    fontSize: 15,
    margin: 0,
    lineHeight: 1.6,
    maxWidth: 380,
  },
  loader: {
    display: "flex",
    gap: 8,
    alignItems: "center",
    marginTop: 4,
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: "50%",
    animation: "bounce 1.2s ease-in-out infinite",
    opacity: 0.8,
  },
  actions: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
    width: "100%",
    alignItems: "center",
  },
  btn: {
    color: "#fff",
    padding: "14px 32px",
    borderRadius: 12,
    fontWeight: 700,
    fontSize: 15,
    border: "none",
    cursor: "pointer",
    width: "100%",
    maxWidth: 320,
    boxShadow: "0 8px 30px rgba(0,0,0,0.3)",
    transition: "opacity 0.15s",
  },
  manualLink: {
    color: "#a1a1aa",
    fontSize: 14,
    textDecoration: "underline",
    cursor: "pointer",
  },
  hint: {
    display: "flex",
    alignItems: "flex-start",
    gap: 10,
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.07)",
    borderRadius: 10,
    padding: "12px 16px",
    fontSize: 13,
    color: "#a1a1aa",
    textAlign: "left",
    lineHeight: 1.55,
    maxWidth: 380,
  },
  hintIcon: {
    flexShrink: 0,
    fontSize: 15,
    opacity: 0.7,
    marginTop: 1,
  },
};
