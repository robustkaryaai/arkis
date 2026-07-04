// app/desktop/oauth-success/page.js

"use client";

import { useEffect, useState } from "react";

export default function DesktopOAuthSuccessPage() {
  const [deepLink, setDeepLink] = useState("rk-ai://oauth-success");

  useEffect(() => {
    const search = typeof window !== "undefined" ? window.location.search || "" : "";
    const targetLink = `rk-ai://oauth-success${search}`;
    setDeepLink(targetLink);

    const timer = setTimeout(() => {
      window.location.href = targetLink;
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <main style={styles.main}>
      <section style={styles.card}>
        <h1 style={styles.title}>Opening RK AI...</h1>
        <p style={styles.text}>
          Google sign-in is complete. RK AI should open automatically.
        </p>
        <a href={deepLink} style={styles.link}>
          Open RK AI
        </a>
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
    padding: 24,
  },
  title: {
    fontSize: 28,
    marginBottom: 12,
  },
  text: {
    color: "#a1a1aa",
    fontSize: 16,
    marginBottom: 24,
  },
  link: {
    color: "#ffffff",
    background: "linear-gradient(135deg, #6366f1, #9333ea)",
    padding: "12px 18px",
    borderRadius: 10,
    fontWeight: 700,
    textDecoration: "none",
    display: "inline-block",
  },
};
