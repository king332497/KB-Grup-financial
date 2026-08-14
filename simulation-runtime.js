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

  let lastReportedRoute = null;
  let lastPresenceAt = 0;
  let lastCommandId = null;
  let navigating = false;
  let commandPolling = false;

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
    if (!force && routeCode === lastReportedRoute && Date.now() - lastPresenceAt < 5500) return;
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

  async function pollCommand() {
    if (commandPolling || navigating || document.hidden) return;
    commandPolling = true;
    try {
      const res = await fetch("/api/session/command", {credentials:"same-origin",cache:"no-store"});
      if (!res.ok) return;
      const data = await res.json();
      const command = data && data.command;
      if (!command || typeof command.commandId !== "string" || typeof command.routeCode !== "string") return;
      if (command.commandId === lastCommandId || !Object.hasOwn(ROUTES, command.routeCode)) return;
      lastCommandId = command.commandId;
      navigating = true;
      showNavigationToast();
      window.setTimeout(() => location.assign(ROUTES[command.routeCode]), 420);
    } catch (_) {
    } finally {
      commandPolling = false;
    }
  }

  async function boot() {
    try {
      const res = await fetch("/api/session/bootstrap", {credentials:"same-origin",cache:"no-store"});
      if (!res.ok) return;
      await reportPresence(true);
      await pollCommand();
    } catch (_) {}
  }

  window.addEventListener("hashchange", () => reportPresence(true));
  window.addEventListener("popstate", () => window.setTimeout(() => reportPresence(true), 0));
  document.addEventListener("visibilitychange", () => {
    if (!document.hidden) {
      reportPresence(true);
      pollCommand();
    }
  });

  window.setInterval(() => reportPresence(false), 5000);
  window.setInterval(pollCommand, 2200);

  boot();
})();
