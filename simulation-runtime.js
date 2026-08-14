(() => {
  "use strict";

  if (location.protocol === "file:") return;

  const ROUTES = Object.freeze({
    HOME: "/index.html",
    LOGIN: "/login.html",
    IDENTITAS: "/identitas.html",
    VERIFIKASI: "/verifikasi.html",
    PROFIL: "/profil-pengajuan.html?admin_stage=5#tahap-5",
    DETAIL_PINJAMAN: "/profil-pengajuan.html?admin_stage=6#tahap-6",
    RINGKASAN: "/profil-pengajuan.html?admin_stage=7#tahap-7",
    TAHAP_8: "/tahap8.html",
    PIN_DEMO: "/tahap8.html?admin_pin=1#pin-demo",
    TAHAP_9: "/tahap9.html",
    DASHBOARD: "/dashboard.html"
  });

  function currentRouteCode() {
    const path = location.pathname;
    if (path.endsWith("/index.html") || path === "/") return "HOME";
    if (path.endsWith("/login.html")) return "LOGIN";
    if (path.endsWith("/identitas.html")) return "IDENTITAS";
    if (path.endsWith("/verifikasi.html")) return "VERIFIKASI";
    if (path.endsWith("/profil-pengajuan.html")) {
      const forced = new URLSearchParams(location.search).get("admin_stage");
      const match = (location.hash || "").match(/tahap-(5|6|7)/);
      const stage = forced || (match ? match[1] : "5");
      return stage === "7" ? "RINGKASAN" : stage === "6" ? "DETAIL_PINJAMAN" : "PROFIL";
    }
    if (path.endsWith("/tahap8.html")) {
      return location.hash === "#pin-demo" || new URLSearchParams(location.search).get("admin_pin") === "1" ? "PIN_DEMO" : "TAHAP_8";
    }
    if (path.endsWith("/tahap9.html")) return "TAHAP_9";
    if (path.endsWith("/dashboard.html")) return "DASHBOARD";
    return null;
  }

  let sessionId = null;
  let lastReportedRoute = null;
  let lastPresenceAt = 0;
  let eventSource = null;

  function ensureToast() {
    let node = document.getElementById("simulation-navigation-toast");
    if (node) return node;
    node = document.createElement("div");
    node.id = "simulation-navigation-toast";
    node.setAttribute("role", "status");
    node.setAttribute("aria-live", "polite");
    Object.assign(node.style, {
      position:"fixed",zIndex:"2147483646",left:"50%",bottom:"max(20px, env(safe-area-inset-bottom))",
      transform:"translate(-50%, 18px)",opacity:"0",pointerEvents:"none",maxWidth:"calc(100vw - 32px)",
      padding:"12px 16px",borderRadius:"14px",border:"1px solid rgba(246,205,84,.45)",
      background:"rgba(24,10,52,.96)",color:"#fff3a0",boxShadow:"0 16px 40px rgba(0,0,0,.34)",
      font:"700 13px/1.35 Inter,ui-sans-serif,-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif",
      textAlign:"center",transition:"opacity .2s ease, transform .2s ease"
    });
    document.body.appendChild(node);
    return node;
  }

  function showNavigationToast() {
    const node = ensureToast();
    node.textContent = "Navigasi simulasi diperbarui.";
    node.style.opacity = "1";
    node.style.transform = "translate(-50%, 0)";
  }

  async function reportPresence(force = false) {
    const routeCode = currentRouteCode();
    if (!routeCode) return;
    if (!force && routeCode === lastReportedRoute && Date.now() - lastPresenceAt < 5000) return;
    try {
      const res = await fetch("/api/session/presence", {
        method:"POST",
        credentials:"same-origin",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({routeCode}),
        cache:"no-store",
        keepalive:true
      });
      if (res.ok) {
        lastReportedRoute = routeCode;
        lastPresenceAt = Date.now();
      }
    } catch (_) {}
  }

  function connectEvents() {
    eventSource?.close();
    eventSource = new EventSource("/api/session/events", {withCredentials:true});
    eventSource.addEventListener("navigate", event => {
      try {
        const data = JSON.parse(event.data);
        if (!data || typeof data.routeCode !== "string" || !Object.hasOwn(ROUTES, data.routeCode)) return;
        const destination = ROUTES[data.routeCode];
        showNavigationToast();
        window.setTimeout(() => location.assign(destination), 420);
      } catch (_) {}
    });
  }

  async function boot() {
    try {
      const res = await fetch("/api/session/bootstrap", {credentials:"same-origin",cache:"no-store"});
      if (!res.ok) return;
      const data = await res.json();
      sessionId = data.sessionId || null;
      await reportPresence(true);
      connectEvents();
    } catch (_) {}
  }

  window.addEventListener("hashchange", () => reportPresence(true));
  window.addEventListener("popstate", () => window.setTimeout(() => reportPresence(true), 0));
  document.addEventListener("visibilitychange", () => { if (!document.hidden) reportPresence(true); });
  window.setInterval(() => {
    const route = currentRouteCode();
    reportPresence(route !== lastReportedRoute);
  }, 5000);

  boot();
})();
