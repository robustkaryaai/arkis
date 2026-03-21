const BASE = process.env.NEXT_PUBLIC_BACKEND_URL || "https://rk-ai-backend.onrender.com";

// ── Auth token stored in localStorage (plus cookie set by backend) ──
export function getStoredToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("rk_web_token");
}

export function getStoredUserId() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("rk_web_user_id");
}

export function storeSession(token, userId) {
  if (typeof window === "undefined") return;
  localStorage.setItem("rk_web_token", token);
  localStorage.setItem("rk_web_user_id", userId);
}

export function clearSession() {
  if (typeof window === "undefined") return;
  localStorage.removeItem("rk_web_token");
  localStorage.removeItem("rk_web_user_id");
}

// ── Auth headers ──────────────────────────────────────────────────
function authHeaders() {
  const token = getStoredToken();
  const userId = getStoredUserId();
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(userId ? { "x-user-id": userId } : {}),
  };
}

// ── AUTH ──────────────────────────────────────────────────────────

// Redirect browser to Google login
export function loginWithGoogle(redirectTo = "/") {
  const safe = redirectTo.startsWith("/") ? redirectTo : `/${redirectTo}`;
  window.location.href = `${BASE}/web/auth/google/start?redirect=${encodeURIComponent(safe)}`;
}

// Called from /auth/web-callback page after backend redirect
export async function finishWebCallback(token, userId) {
  storeSession(token, userId);
  return getMe();
}

// Get current user
export async function getMe() {
  const res = await fetch(`${BASE}/web/auth/me`, {
    headers: authHeaders(),
    credentials: "include", // sends cookie too
  });
  if (!res.ok) return null;
  return res.json();
}

// Logout
export async function logout() {
  await fetch(`${BASE}/web/auth/logout`, {
    method: "POST",
    credentials: "include",
  });
  clearSession();
}

// ── DATA ──────────────────────────────────────────────────────────

export async function joinWaitlist(email, name = "") {
  const res = await fetch(`${BASE}/web/waitlist`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, name }),
  });
  return res.json();
}

export async function submitPreorder(data) {
  // data: { email, name, phone, plan }
  const res = await fetch(`${BASE}/web/preorder`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function submitContact(data) {
  // data: { email, name, subject, message }
  const res = await fetch(`${BASE}/web/contact`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function submitSubscription(data) {
  // data: { userId, email, plan, paymentId }
  const res = await fetch(`${BASE}/web/subscription`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function getProfile(userId) {
  const res = await fetch(`${BASE}/web/profile/${userId}`, {
    headers: authHeaders(),
    credentials: "include",
  });
  if (!res.ok) return null;
  return res.json();
}

export async function updateProfile(userId, data) {
  const res = await fetch(`${BASE}/web/profile/${userId}`, {
    method: "PUT",
    headers: authHeaders(),
    body: JSON.stringify(data),
    credentials: "include",
  });
  return res.json();
}