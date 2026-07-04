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

function notifyAuthChanged(detail = {}) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent("rk-auth-changed", { detail }));
}

export function storeSession(token, userId) {
  if (typeof window === "undefined") return;
  localStorage.setItem("rk_web_token", token);
  localStorage.setItem("rk_web_user_id", userId);
  notifyAuthChanged({ token, userId, authenticated: true });
}

export function clearSession() {
  if (typeof window === "undefined") return;
  localStorage.removeItem("rk_web_token");
  localStorage.removeItem("rk_web_user_id");
  notifyAuthChanged({ authenticated: false });
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
  // If there's no stored token or user id, avoid calling the backend (prevents noisy 401s)
  const token = getStoredToken();
  const userId = getStoredUserId();
  if (!token && !userId) return null;

  try {
    const res = await fetch(`${BASE}/web/auth/me`, {
      headers: authHeaders(),
      credentials: "include", // sends cookie too
    });
    if (res.status === 401) {
      clearSession();
      return null;
    }
    if (!res.ok) return null;
    const data = await res.json();
    // Backend now returns { user: null, authenticated: false } gracefully instead of 401
    return data.authenticated ? data.user : null;
  } catch (err) {
    // Network error or CORS issue — treat as unauthenticated
    console.debug("[getMe] Fetch error:", err);
    return null;
  }
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

export async function getWaitlistSlots() {
  const res = await fetch(`${BASE}/web/waitlist/slots`, { cache: "no-store" });
  if (!res.ok) return null;
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

export async function getProfile(userId, email = "") {
  const params = new URLSearchParams();
  if (email) params.set("email", email);
  const query = params.toString();
  const res = await fetch(`${BASE}/web/profile/${userId}${query ? `?${query}` : ""}`, {
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

// Get payment/checkout URL for RK AI Desktop
export function getCheckoutUrl(slug, plan = 'studio', redirectUri = 'rk-ai://payment-success') {
  // Use the new /payment page in this same website!
  const params = new URLSearchParams();
  params.set('slug', slug);
  params.set('plan', plan);
  params.set('redirect_uri', redirectUri);
  return `/payment?${params.toString()}`;
}
