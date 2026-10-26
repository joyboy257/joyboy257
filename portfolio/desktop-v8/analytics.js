"use strict";
/* Privacy-conscious, first-party portfolio interaction tracking.
   Vercel Web Analytics pageviews work when Analytics is enabled in Vercel.
   Custom events are accepted on supported Vercel Pro/Enterprise plans.
   No cookies, fingerprinting, search text, names or contact data are collected here.
*/
(function () {
  const seenProjects = new Set();
  const allowedSources = new Set(["resume","applications","linkedin","outreach","github"]);
  const allowedProjects = new Set(["mirai","amelia","soleil","slate","workos","corpa","amethyst","verticals","agentos","atlas","dreamcraft","rustyindex","heidi","propframe","ami","sole","openbrain","singnote","pokerai","tradedesk","mototiam"]);
  const muted = new URLSearchParams(location.search).has("no_analytics");
  const call = (kind, payload) => {
    if (muted || typeof window.va !== "function") return;
    try { window.va(kind, payload); } catch (_err) { /* tracking must never break navigation */ }
  };
  const source = (location.pathname.match(/^\/from\/(resume|applications|linkedin|outreach|github)\/?$/) || [])[1] || "";
  const surface = () => matchMedia("(max-width:720px)").matches ? "mobile" : "desktop";
  function event(name, data) { call("event", { name, data }); }
  function project(id) {
    if (!allowedProjects.has(id)) return;
    event("Project opened", { project: id, device: surface() });
    // Static HTML has no framework router; record an explicit virtual view once
    // per project per page load to reveal which engineering case studies get attention.
    if (!seenProjects.has(id)) {
      seenProjects.add(id);
      call("pageview", { path: "/projects/" + id });
    }
  }
  function app(name) {
    if (name === "calendar") event("Recruiter brief opened", { device: surface() });
    else if (["finder","photos","notes","browser","about","terminal"].includes(name))
      event("App opened", { app: name, device: surface() });
  }
  if (source && allowedSources.has(source)) event("Application link arrival", { source });
  // Count outbound intent, but send only a predefined destination category.
  document.addEventListener("click", function (e) {
    const a = e.target.closest("a[href]");
    if (!a) return;
    let destination = "";
    try {
      const host = new URL(a.href, location.href).hostname.toLowerCase();
      if (host === "usemirai.app" || host === "www.usemirai.app") destination = "mirai";
      else if (host === "github.com" || host === "www.github.com") destination = "github";
      else if (host === "www.linkedin.com" || host === "linkedin.com") destination = "linkedin";
    } catch (_err) {}
    if (destination) event("Outbound link clicked", { destination, device: surface() });
  }, { capture: true });
  window.PortfolioAnalytics = {
    project,
    app,
    unlock: () => event("Portfolio unlocked", { device: surface() }),
    search: () => event("Project search opened", { device: surface() })
  };
})();
