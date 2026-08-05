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
//   rk-ai://oauth-success?...      (RK AI Desktop — existing behaviour)
//   neytreya://oauth-success?...   (Neytreya)

"use client";

import { useEffect, useState } from "react";

// Map product slug → deep-link scheme
const PRODUCT_SCHEMES = {
  "neytreya": "neytreya",
  "rk-ai":    "rk-ai",
};

const PRODUCT_LABELS = {
  "neytreya": "Neytreya",
  "rk-ai":    "RK AI",
};

export default function DesktopOAuthSuccessPage() {
  const [deepLink, setDeepLink] = useState(null);
  const [productLabel, setProductLabel] = useState("RK AI");

  useEffect(() => {
    const search = typeof window !== "undefined" ? window.location.search || "" : "";
    const params = new URLSearchParams(search);

    // Determine which product is calling back
    const product = params.get("product") || "rk-ai";
    const scheme  = PRODUCT_SCHEMES[product] || "rk-ai";
    const label   = PRODUCT_LABELS[product]  || "RK AI";

    // Forward all params (minus "product" itself) to the app
    params.delete("product");
    const forwardedSearch = params.toString() ? `?${params.toString()}` : "";

    const targetLink = `${scheme}://oauth-success${forwardedSearch}`;

    setDeepLink(targetLink);
    setProductLabel(label);

    // Auto-fire the deep link after a short delay
    const timer = setTimeout(() => {
      window.location.href = targetLink;
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // Accent colour per product
  const accent = productLabel === "Neytreya"
    ? "linear-gradient(90deg, #10b981, #34d399, #10b981)"   // emerald
    : "linear-gradient(90deg, #6366f1, #9333ea, #6366f1)";  // indigo/purple

  return (
    <main style={styles.main}>
      <section style={styles.card}>

        {/* Animated orb */}
        <div style={{ ...styles.orb, background: accent }} />

        <h1 style={styles.title}>Opening {productLabel}…</h1>
        <p style={styles.text}>
          Google sign-in is complete. {productLabel} should open automatically.
        </p>

        {deepLink && (
          <a href={deepLink} style={{ ...styles.link, background: accent }}>
            Open {productLabel}
          </a>
        )}
      </section>
    </main>
  );
}

const styles = {
  main: {
    minHeight: "100vh",
    display: "grid",
    placeItems: "center",
    background: "#050509",
    color: "#ffffff",
    fontFamily:
      "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif",
  },
  card: {
    textAlign: "center",
    padding: 40,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 20,
    maxWidth: 480,
  },
  orb: {
    width: 72,
    height: 72,
    borderRadius: "50%",
    opacity: 0.85,
    animation: "pulse 2s cubic-bezier(0.4,0,0.6,1) infinite",
    filter: "blur(2px)",
  },
  title: {
    fontSize: 28,
    fontWeight: 800,
    margin: 0,
    letterSpacing: "-0.5px",
  },
  text: {
    color: "#a1a1aa",
    fontSize: 16,
    margin: 0,
  },
  link: {
    color: "#fff",
    padding: "12px 28px",
    borderRadius: 12,
    fontWeight: 700,
    fontSize: 15,
    textDecoration: "none",
    display: "inline-block",
    boxShadow: "0 8px 30px rgba(0,0,0,0.3)",
  },
};
