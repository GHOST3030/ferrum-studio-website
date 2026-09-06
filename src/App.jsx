import React, { useState, useEffect, useRef } from "react";

/* ---------- DATA ---------- */

const PROJECTS = [
  { id: "aurora", name: "Aurora Skincare", category: "Branding", year: "2025", size: "large", client: "Aurora Labs", role: "Identity, Packaging, Art Direction", overview: "A full identity rebuild for a skincare brand entering the Gulf market — from wordmark to shelf presence.", concept: "We treated the brand like a material study: light passing through gel, oil, and glass. The palette and motion language all trace back to that one optical idea.", results: "Launched across 40 retail doors in Q1 2025; brand recall lifted 3x in post-launch tracking." },
  { id: "monolith", name: "Monolith", category: "3D", year: "2025", size: "small", client: "Monolith Studio", role: "3D Visualization", overview: "A set of architectural renders for a concrete-and-glass residential concept.", concept: "Weight and silence — every render pushes contrast until the structure feels carved rather than built.", results: "Used in the developer's investor deck; renders featured in two architecture publications." },
  { id: "veyra", name: "Veyra Airlines", category: "Advertising", year: "2024", size: "full", client: "Veyra", role: "Campaign, OOH, Motion", overview: "A regional launch campaign built around a single idea: distance is a feeling, not a number.", concept: "Every asset frames the horizon slightly off-center — restlessness held just under control.", results: "Campaign ran across 6 airports and reached 12M impressions in the first month." },
  { id: "nomad", name: "Nomad Coffee", category: "Graphic Design", year: "2024", size: "medium", client: "Nomad Coffee Co.", role: "Packaging, Print", overview: "Packaging system for a specialty coffee roaster sourcing from four countries.", concept: "Each origin gets its own typographic mark, unified by one shared grid.", results: "Packaging redesign coincided with a 22% increase in repeat online orders." },
  { id: "pulse", name: "Pulse", category: "Motion", year: "2024", size: "medium", client: "Pulse Fitness", role: "Motion Graphics", overview: "A motion identity for a fitness app's onboarding and achievement moments.", concept: "Movement that mirrors a heartbeat — sharp attack, soft release.", results: "Onboarding completion improved 18% after the new motion sequences shipped." },
  { id: "sable", name: "Sable House", category: "Photography", year: "2023", size: "large", client: "Sable House Hotels", role: "Photography, Art Direction", overview: "Editorial photography for a boutique hotel group's five properties.", concept: "Shot only at the edges of the day — the hour when the buildings feel most like themselves.", results: "Imagery adopted across the group's entire booking platform and print collateral." },
  { id: "kite", name: "Kite Social", category: "Social Media", year: "2023", size: "small", client: "Kite", role: "Social Design System", overview: "A modular content system built for a two-person social team to move fast without losing consistency.", concept: "A small set of rules that produce endless, on-brand variation.", results: "Content output tripled with no increase in team size." },
];

const SERVICES = [
  { name: "Branding", description: "Identity systems built to hold up across packaging, motion, and space — not just a logo file.", capabilities: ["Naming & positioning", "Visual identity systems", "Brand guidelines"] },
  { name: "3D Design", description: "Photoreal and stylized 3D for products, spaces, and worlds that don't exist yet.", capabilities: ["Product visualization", "Architectural rendering", "3D art direction"] },
  { name: "Advertising", description: "Campaigns built around one idea, carried consistently across every format it touches.", capabilities: ["Campaign concepting", "OOH & print", "Art direction"] },
  { name: "Graphic Design", description: "Print and packaging systems that hold together at a glance and reward a closer look.", capabilities: ["Packaging", "Editorial layout", "Print production"] },
  { name: "Motion", description: "Motion identities that make an interface or a brand feel alive without feeling loud.", capabilities: ["Motion identity", "Explainer & product film", "Micro-interaction design"] },
  { name: "Photography", description: "Photography direction that treats light like part of the brief, not an afterthought.", capabilities: ["Product photography", "Editorial & lifestyle", "Art direction"] },
  { name: "Video Production", description: "Short-form and campaign film, shot and cut to hold attention without tricks.", capabilities: ["Campaign film", "Product film", "Post-production"] },
];

const CLIENTS = ["Aurora Labs", "Monolith Studio", "Veyra", "Nomad Coffee Co.", "Pulse Fitness", "Sable House Hotels", "Kite", "Ferrum"];

const FILTERS = ["All", "Branding", "3D", "Advertising", "Graphic Design", "Motion", "Photography", "Social Media"];

/* ---------- STYLE TOKENS ---------- */

const T = {
  bg: "#0A0A0A",
  surface: "#161616",
  text: "#F5F5F0",
  textSec: "#8A8A8A",
  accent: "#C7FF2F",
  border: "#292929",
};

/* ---------- SHARED PRIMITIVES ---------- */

function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); io.disconnect(); } },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, visible];
}

function Reveal({ children, delay = 0, as: Comp = "div", style = {} }) {
  const [ref, visible] = useReveal();
  return (
    <Comp
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 700ms cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 700ms cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
        ...style,
      }}
    >
      {children}
    </Comp>
  );
}

function Placeholder({ label, ratio = "56%", tone = 1 }) {
  const tones = [
    "linear-gradient(135deg, #1c1c1c 0%, #0a0a0a 60%)",
    "linear-gradient(135deg, #202018 0%, #0a0a0a 60%)",
    "linear-gradient(135deg, #14181c 0%, #0a0a0a 60%)",
  ];
  return (
    <div
      style={{
        width: "100%",
        paddingTop: ratio,
        position: "relative",
        background: tones[tone % tones.length],
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "flex-end",
          padding: 16,
          fontSize: 12,
          letterSpacing: "0.04em",
          color: T.textSec,
        }}
      >
        {label}
      </div>
    </div>
  );
}

function Button({ children, variant = "primary", onClick, style = {} }) {
  const [hover, setHover] = useState(false);
  const base = {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    padding: "14px 28px",
    fontSize: 14,
    fontWeight: 500,
    letterSpacing: "0.01em",
    cursor: "pointer",
    border: `1px solid ${variant === "cta" ? T.accent : T.text}`,
    background: "transparent",
    color: T.text,
    borderRadius: 2,
    transition: "all 400ms cubic-bezier(0.16,1,0.3,1)",
    fontFamily: "inherit",
  };
  if (variant === "cta") {
    base.borderColor = T.accent;
    base.color = hover ? T.bg : T.accent;
    base.background = hover ? T.accent : "transparent";
  } else {
    base.borderColor = hover ? T.accent : T.text;
    base.color = hover ? T.accent : T.text;
    base.background = hover ? "rgba(199,255,47,0.08)" : "transparent";
  }
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{ ...base, ...style }}
    >
      {children}
    </button>
  );
}

function NavLink({ label, active, onClick }) {
  const [hover, setHover] = useState(false);
  return (
    <span
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        cursor: "pointer",
        fontSize: 14,
        color: active ? T.accent : T.text,
        borderBottom: `1px solid ${active || hover ? T.accent : "transparent"}`,
        paddingBottom: 3,
        transition: "border-color 300ms ease, color 300ms ease",
      }}
    >
      {label}
    </span>
  );
}

function SectionLabel({ children }) {
  return (
    <div style={{ fontSize: 13, color: T.textSec, marginBottom: 16, letterSpacing: "0.01em" }}>
      {children}
    </div>
  );
}

/* ---------- NAV ---------- */

function Nav({ page, go }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    ["Work", "work"],
    ["Services", "services"],
    ["About", "about"],
  ];

  return (
    <>
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "22px 5vw",
          background: scrolled ? "rgba(10,10,10,0.9)" : "transparent",
          borderBottom: scrolled ? `1px solid ${T.border}` : "1px solid transparent",
          backdropFilter: scrolled ? "blur(8px)" : "none",
          transition: "background 300ms ease, border-color 300ms ease",
        }}
      >
        <span
          onClick={() => go("home")}
          style={{ cursor: "pointer", fontSize: 18, fontWeight: 600, letterSpacing: "-0.01em", color: T.text }}
        >
          Ferrum&nbsp;Studio
        </span>
        <div style={{ display: "flex", alignItems: "center", gap: 40 }} className="ferrum-desktop-nav">
          {links.map(([label, key]) => (
            <NavLink key={key} label={label} active={page === key} onClick={() => go(key)} />
          ))}
          <Button onClick={() => go("contact")} style={{ padding: "10px 20px" }}>
            Start a project
          </Button>
        </div>
        <span
          className="ferrum-mobile-toggle"
          onClick={() => setMenuOpen((v) => !v)}
          style={{ display: "none", cursor: "pointer", color: T.text, fontSize: 14 }}
        >
          {menuOpen ? "Close" : "Menu"}
        </span>
      </div>

      {menuOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: T.bg,
            zIndex: 49,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: 28,
            padding: "0 8vw",
          }}
        >
          {[...links, ["Contact", "contact"]].map(([label, key]) => (
            <span
              key={key}
              onClick={() => { go(key); setMenuOpen(false); }}
              style={{
                fontSize: 40,
                fontWeight: 500,
                color: page === key ? T.accent : T.text,
                cursor: "pointer",
              }}
            >
              {label}
            </span>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 860px) {
          .ferrum-desktop-nav { display: none !important; }
          .ferrum-mobile-toggle { display: block !important; }
        }
      `}</style>
    </>
  );
}

/* ---------- FOOTER + CTA (shared across pages) ---------- */

function ClosingCTA({ go }) {
  return (
    <section style={{ padding: "160px 5vw", textAlign: "center", borderTop: `1px solid ${T.border}` }}>
      <Reveal>
        <SectionLabel>Get in touch</SectionLabel>
        <h2 style={{ fontSize: "clamp(36px, 6vw, 88px)", fontWeight: 500, letterSpacing: "-0.02em", margin: "0 0 40px", color: T.text, lineHeight: 1.05 }}>
          Have a project in mind?
        </h2>
        <Button variant="cta" onClick={() => go("contact")}>Let's Work Together</Button>
      </Reveal>
    </section>
  );
}

function Footer({ go }) {
  return (
    <footer style={{ padding: "64px 5vw 48px", borderTop: `1px solid ${T.border}` }}>
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: 48 }}>
        <div style={{ maxWidth: 260 }}>
          <div style={{ fontSize: 18, fontWeight: 600, marginBottom: 12, color: T.text }}>Ferrum Studio</div>
          <div style={{ fontSize: 14, color: T.textSec, lineHeight: 1.6 }}>
            A creative studio for brands that want to look like nobody else.
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <span style={{ fontSize: 13, color: T.textSec, marginBottom: 4 }}>Sitemap</span>
          {["home", "work", "services", "about", "contact"].map((k) => (
            <span key={k} onClick={() => go(k)} style={{ cursor: "pointer", fontSize: 14, color: T.text, textTransform: "capitalize" }}>{k}</span>
          ))}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <span style={{ fontSize: 13, color: T.textSec, marginBottom: 4 }}>Contact</span>
          <span style={{ fontSize: 14, color: T.text }}>hello@ferrumstudio.co</span>
          <span style={{ fontSize: 14, color: T.text }}>+971 4 000 0000</span>
          <span style={{ fontSize: 14, color: T.textSec }}>Dubai, UAE</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <span style={{ fontSize: 13, color: T.textSec, marginBottom: 4 }}>Social</span>
          {["Instagram", "Behance", "LinkedIn"].map((s) => (
            <span key={s} style={{ fontSize: 14, color: T.text, cursor: "pointer" }}>{s}</span>
          ))}
        </div>
      </div>
      <div style={{ marginTop: 64, paddingTop: 24, borderTop: `1px solid ${T.border}`, fontSize: 12, color: T.textSec }}>
        © 2026 Ferrum Studio. All rights reserved.
      </div>
    </footer>
  );
}

/* ---------- PROJECT BLOCK ---------- */

function ProjectBlock({ project, span, onOpen, toneIdx }) {
  const [hover, setHover] = useState(false);
  return (
    <div
      style={{ gridColumn: span, cursor: "pointer" }}
      onClick={() => onOpen(project)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div style={{ overflow: "hidden" }}>
        <div style={{ transform: hover ? "scale(1.045)" : "scale(1)", transition: "transform 650ms cubic-bezier(0.16,1,0.3,1)" }}>
          <Placeholder label={project.name} tone={toneIdx} ratio={span === "span 12" ? "42%" : "68%"} />
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 14, fontSize: 13 }}>
        <span style={{ color: T.text }}>{project.name}</span>
        <span style={{ display: "flex", gap: 16 }}>
          <span style={{ color: hover ? T.accent : T.textSec, transition: "color 300ms ease" }}>{project.category}</span>
          <span style={{ color: T.textSec }}>{project.year}</span>
        </span>
      </div>
    </div>
  );
}

/* ---------- HOME PAGE ---------- */

function Home({ go, openProject }) {
  const featured = PROJECTS.slice(0, 4);
  const spans = ["span 8", "span 4", "span 12", "span 6"];
  const seconds = ["span 4", "span 8", null, "span 6"];

  return (
    <>
      {/* HERO */}
      <section style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "0 5vw 96px", position: "relative" }}>
        <div style={{ position: "absolute", inset: 0, zIndex: -1 }}>
          <Placeholder label="Hero visual — signature 3D render" ratio="100%" tone={0} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, #0A0A0A 5%, rgba(10,10,10,0.2) 60%)" }} />
        </div>
        <Reveal>
          <h1 style={{ fontSize: "clamp(48px, 9vw, 150px)", fontWeight: 500, letterSpacing: "-0.02em", lineHeight: 0.98, margin: "0 0 24px", color: T.text, maxWidth: 1100 }}>
            We build things worth looking at twice.
          </h1>
        </Reveal>
        <Reveal delay={150}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 24 }}>
            <p style={{ fontSize: 18, color: T.textSec, maxWidth: 420, margin: 0, lineHeight: 1.6 }}>
              A creative studio working across branding, 3D, advertising and film for clients who don't want to look like anyone else.
            </p>
            <Button variant="cta" onClick={() => go("work")}>See the Work</Button>
          </div>
        </Reveal>
      </section>

      {/* INTRO */}
      <section style={{ padding: "128px 5vw", maxWidth: 780 }}>
        <Reveal>
          <SectionLabel>Who we are</SectionLabel>
          <p style={{ fontSize: "clamp(22px, 3vw, 34px)", lineHeight: 1.4, color: T.text, fontWeight: 400 }}>
            Ferrum Studio is a small team of designers, 3D artists and directors based in Dubai, working with brands, founders and institutions across the region who need their work to hold up in a crowded room.
          </p>
        </Reveal>
      </section>

      {/* FEATURED WORK */}
      <section style={{ padding: "0 5vw 128px" }}>
        <Reveal>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 40 }}>
            <h2 style={{ fontSize: "clamp(32px, 4vw, 56px)", fontWeight: 500, color: T.text, margin: 0, letterSpacing: "-0.01em" }}>Selected Work</h2>
            <span onClick={() => go("work")} style={{ cursor: "pointer", fontSize: 14, color: T.textSec, borderBottom: `1px solid ${T.border}` }}>View all projects</span>
          </div>
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gap: 24 }}>
          {featured.map((p, i) => (
            <Reveal key={p.id} delay={i * 80} style={{ gridColumn: spans[i] }}>
              <ProjectBlock project={p} span={spans[i]} onOpen={openProject} toneIdx={i} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* SERVICES (compact list) */}
      <section style={{ padding: "0 5vw 128px" }}>
        <Reveal><SectionLabel>What we do</SectionLabel></Reveal>
        <div>
          {SERVICES.slice(0, 6).map((s, i) => (
            <Reveal key={s.name} delay={i * 40}>
              <ServiceRow service={s} onClick={() => go("services")} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* CREATIVE STATEMENT */}
      <section style={{ minHeight: "70vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "0 5vw", textAlign: "center", borderTop: `1px solid ${T.border}`, borderBottom: `1px solid ${T.border}` }}>
        <Reveal>
          <h3 style={{ fontSize: "clamp(28px, 5vw, 72px)", fontWeight: 500, lineHeight: 1.2, maxWidth: 1000, color: T.text, letterSpacing: "-0.01em" }}>
            Good work looks effortless. It rarely is. We spend the effort so it doesn't show.
          </h3>
        </Reveal>
      </section>

      {/* CLIENTS */}
      <section style={{ padding: "80px 5vw" }}>
        <Reveal><SectionLabel>Selected Clients</SectionLabel></Reveal>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "32px 48px" }}>
          {CLIENTS.map((c) => (
            <span key={c} style={{ fontSize: 15, color: T.textSec, transition: "color 300ms ease", cursor: "default" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = T.text)}
              onMouseLeave={(e) => (e.currentTarget.style.color = T.textSec)}
            >{c}</span>
          ))}
        </div>
      </section>

      <ClosingCTA go={go} />
    </>
  );
}

function ServiceRow({ service, onClick }) {
  const [hover, setHover] = useState(false);
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "28px 20px",
        borderTop: `1px solid ${T.border}`,
        cursor: "pointer",
        background: hover ? "rgba(255,255,255,0.02)" : "transparent",
        transition: "background 300ms ease",
      }}
    >
      <span style={{ fontSize: "clamp(22px, 3vw, 32px)", color: hover ? T.accent : T.text, transition: "color 300ms ease" }}>{service.name}</span>
      <span style={{ fontSize: 14, color: T.textSec, maxWidth: 380, textAlign: "right", display: window.innerWidth < 700 ? "none" : "block" }}>{service.description}</span>
    </div>
  );
}

/* ---------- WORK PAGE ---------- */

function Work({ go, openProject }) {
  const [filter, setFilter] = useState("All");
  const filtered = filter === "All" ? PROJECTS : PROJECTS.filter((p) => p.category === filter);
  const spanFor = (size) => (size === "large" ? "span 8" : size === "full" ? "span 12" : size === "medium" ? "span 6" : "span 4");

  return (
    <>
      <section style={{ padding: "160px 5vw 48px" }}>
        <Reveal>
          <h1 style={{ fontSize: "clamp(40px, 6vw, 88px)", fontWeight: 500, color: T.text, margin: "0 0 40px", letterSpacing: "-0.02em" }}>Work</h1>
        </Reveal>
        <Reveal delay={100}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 24, borderBottom: `1px solid ${T.border}`, paddingBottom: 24, overflowX: "auto" }}>
            {FILTERS.map((f) => (
              <span
                key={f}
                onClick={() => setFilter(f)}
                style={{
                  cursor: "pointer",
                  fontSize: 14,
                  whiteSpace: "nowrap",
                  color: filter === f ? T.accent : T.textSec,
                  borderBottom: filter === f ? `1px solid ${T.accent}` : "1px solid transparent",
                  paddingBottom: 4,
                }}
              >
                {f}
              </span>
            ))}
          </div>
        </Reveal>
      </section>

      <section style={{ padding: "0 5vw 128px" }}>
        {filtered.length === 0 ? (
          <div style={{ padding: "80px 0", textAlign: "center", color: T.textSec, fontSize: 14 }}>
            No projects found — try another filter.
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gap: 24 }}>
            {filtered.map((p, i) => (
              <Reveal key={p.id} delay={(i % 6) * 60} style={{ gridColumn: spanFor(p.size) }}>
                <ProjectBlock project={p} span={spanFor(p.size)} onOpen={openProject} toneIdx={i} />
              </Reveal>
            ))}
          </div>
        )}
      </section>

      <ClosingCTA go={go} />
    </>
  );
}

/* ---------- PROJECT DETAIL PAGE ---------- */

function ProjectDetail({ project, go, next, openProject }) {
  if (!project) return null;
  return (
    <>
      <section style={{ padding: "160px 5vw 48px" }}>
        <Reveal>
          <div style={{ display: "flex", gap: 24, fontSize: 13, color: T.textSec, marginBottom: 20 }}>
            <span>{project.category}</span>
            <span>{project.client}</span>
            <span>{project.year}</span>
          </div>
          <h1 style={{ fontSize: "clamp(36px, 6vw, 84px)", fontWeight: 500, color: T.text, margin: 0, letterSpacing: "-0.02em" }}>{project.name}</h1>
        </Reveal>
      </section>

      <section style={{ padding: "0 5vw 96px" }}>
        <Reveal><Placeholder label={`${project.name} — hero artwork`} ratio="52%" tone={1} /></Reveal>
      </section>

      <section style={{ padding: "0 5vw 96px", display: "grid", gridTemplateColumns: "2fr 1fr", gap: 64 }} className="ferrum-detail-grid">
        <Reveal>
          <SectionLabel>Overview</SectionLabel>
          <p style={{ fontSize: 20, lineHeight: 1.6, color: T.text, maxWidth: 620 }}>{project.overview}</p>
        </Reveal>
        <Reveal delay={100}>
          <div style={{ display: "flex", flexDirection: "column", gap: 16, borderTop: `1px solid ${T.border}`, paddingTop: 20 }}>
            {[["Client", project.client], ["Year", project.year], ["Category", project.category], ["Role", project.role]].map(([k, v]) => (
              <div key={k} style={{ display: "flex", justifyContent: "space-between", fontSize: 14 }}>
                <span style={{ color: T.textSec }}>{k}</span>
                <span style={{ color: T.text, textAlign: "right", maxWidth: 220 }}>{v}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      <section style={{ padding: "0 5vw 96px", maxWidth: 720 }}>
        <Reveal>
          <SectionLabel>Creative Concept</SectionLabel>
          <p style={{ fontSize: 20, lineHeight: 1.7, color: T.text }}>{project.concept}</p>
        </Reveal>
      </section>

      <section style={{ padding: "0 5vw 32px" }}>
        <Reveal><Placeholder label="Full-width visual" ratio="46%" tone={2} /></Reveal>
      </section>
      <section style={{ padding: "0 5vw 96px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }} className="ferrum-detail-grid">
        <Reveal><Placeholder label="Detail 01" ratio="80%" tone={0} /></Reveal>
        <Reveal delay={80}><Placeholder label="Detail 02" ratio="80%" tone={1} /></Reveal>
      </section>

      <section style={{ padding: "0 5vw 128px", maxWidth: 720 }}>
        <Reveal>
          <SectionLabel>Outcome</SectionLabel>
          <p style={{ fontSize: 22, lineHeight: 1.5, color: T.text }}>{project.results}</p>
        </Reveal>
      </section>

      {next && (
        <div onClick={() => openProject(next)} style={{ cursor: "pointer", borderTop: `1px solid ${T.border}`, padding: "64px 5vw", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 13, color: T.textSec }}>Next Project</span>
          <span style={{ fontSize: "clamp(24px,4vw,48px)", color: T.text }}>{next.name}</span>
        </div>
      )}

      <ClosingCTA go={go} />

      <style>{`
        @media (max-width: 760px) {
          .ferrum-detail-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
        }
      `}</style>
    </>
  );
}

/* ---------- SERVICES PAGE ---------- */

function ServicesPage({ go }) {
  return (
    <>
      <section style={{ padding: "160px 5vw 80px" }}>
        <Reveal>
          <h1 style={{ fontSize: "clamp(40px, 6vw, 88px)", fontWeight: 500, color: T.text, margin: "0 0 20px", letterSpacing: "-0.02em" }}>Services</h1>
          <p style={{ fontSize: 18, color: T.textSec, maxWidth: 520 }}>Seven capabilities, one studio. We move between them depending on what the brief actually needs.</p>
        </Reveal>
      </section>

      {SERVICES.map((s, i) => (
        <section key={s.name} style={{ padding: "64px 5vw", borderTop: `1px solid ${T.border}`, display: "grid", gridTemplateColumns: i % 2 === 0 ? "1fr 1fr" : "1fr 1fr", gap: 48 }} className="ferrum-service-grid">
          {i % 2 === 0 ? (
            <>
              <Reveal><Placeholder label={s.name} ratio="70%" tone={i} /></Reveal>
              <Reveal delay={100}><ServiceDetail s={s} /></Reveal>
            </>
          ) : (
            <>
              <Reveal className="ferrum-order-2"><ServiceDetail s={s} /></Reveal>
              <Reveal delay={100} className="ferrum-order-1"><Placeholder label={s.name} ratio="70%" tone={i} /></Reveal>
            </>
          )}
        </section>
      ))}

      <ClosingCTA go={go} />

      <style>{`
        @media (max-width: 760px) {
          .ferrum-service-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}

function ServiceDetail({ s }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: 20 }}>
      <h2 style={{ fontSize: "clamp(28px, 3.5vw, 44px)", fontWeight: 500, color: T.text, margin: 0 }}>{s.name}</h2>
      <p style={{ fontSize: 16, color: T.textSec, lineHeight: 1.6, maxWidth: 420 }}>{s.description}</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 8 }}>
        {s.capabilities.map((c) => (
          <div key={c} style={{ fontSize: 14, color: T.text, borderTop: `1px solid ${T.border}`, paddingTop: 8 }}>{c}</div>
        ))}
      </div>
    </div>
  );
}

/* ---------- ABOUT PAGE ---------- */

function About({ go }) {
  const values = [
    { title: "Craft over noise", text: "We'd rather ship one considered idea than ten loud ones." },
    { title: "Client work first", text: "Nothing on this site is decoration for its own sake — it exists to sell the work." },
    { title: "Direct feedback", text: "We tell clients what we actually think, even when it's not what they expected to hear." },
  ];
  return (
    <>
      <section style={{ padding: "160px 5vw 80px" }}>
        <Reveal>
          <h1 style={{ fontSize: "clamp(36px, 6vw, 80px)", fontWeight: 500, color: T.text, margin: 0, letterSpacing: "-0.02em", maxWidth: 900 }}>
            We build visual worlds for people with something specific to say.
          </h1>
        </Reveal>
      </section>

      <section style={{ padding: "0 5vw 96px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64 }} className="ferrum-detail-grid">
        <Reveal><Placeholder label="Studio photograph" ratio="110%" tone={1} /></Reveal>
        <Reveal delay={100}>
          <SectionLabel>Our story</SectionLabel>
          <p style={{ fontSize: 18, lineHeight: 1.7, color: T.text }}>
            Ferrum Studio started in 2019 as a two-person 3D shop working nights on architectural renders. Six years on, we're a full creative studio — but the standard hasn't moved: every project has to earn its place in the portfolio, ours or the client's.
          </p>
        </Reveal>
      </section>

      <section style={{ padding: "0 5vw 128px" }}>
        {values.map((v, i) => (
          <Reveal key={v.title} delay={i * 60}>
            <div style={{ display: "flex", gap: 40, padding: "32px 0", borderTop: `1px solid ${T.border}`, flexWrap: "wrap" }}>
              <span style={{ fontSize: "clamp(22px,3vw,32px)", color: T.text, minWidth: 260 }}>{v.title}</span>
              <span style={{ fontSize: 15, color: T.textSec, maxWidth: 480 }}>{v.text}</span>
            </div>
          </Reveal>
        ))}
      </section>

      <ClosingCTA go={go} />

      <style>{`
        @media (max-width: 760px) {
          .ferrum-detail-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
        }
      `}</style>
    </>
  );
}

/* ---------- CONTACT PAGE ---------- */

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", company: "", type: "Branding", message: "" });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    const errs = {};
    if (!form.name.trim()) errs.name = "Enter your name.";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) errs.email = "Enter a valid email.";
    if (!form.message.trim()) errs.message = "Tell us a little about the project.";
    setErrors(errs);
    if (Object.keys(errs).length === 0) setSent(true);
  };

  const fieldStyle = {
    width: "100%",
    background: "transparent",
    border: "none",
    borderBottom: `1px solid ${T.border}`,
    color: T.text,
    fontSize: 16,
    padding: "12px 0",
    outline: "none",
    fontFamily: "inherit",
  };
  const labelStyle = { fontSize: 12, color: T.textSec, letterSpacing: "0.02em" };

  if (sent) {
    return (
      <section style={{ minHeight: "80vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: "160px 5vw", textAlign: "center" }}>
        <Reveal>
          <h1 style={{ fontSize: "clamp(32px, 5vw, 56px)", color: T.text, fontWeight: 500, marginBottom: 16 }}>Message sent.</h1>
          <p style={{ color: T.textSec, fontSize: 16 }}>We read every message ourselves — expect a reply within two business days.</p>
        </Reveal>
      </section>
    );
  }

  return (
    <section style={{ padding: "160px 5vw 128px", display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: 80 }} className="ferrum-contact-grid">
      <div>
        <Reveal>
          <h1 style={{ fontSize: "clamp(36px, 6vw, 76px)", fontWeight: 500, color: T.text, margin: "0 0 48px", letterSpacing: "-0.02em" }}>
            Let's talk.
          </h1>
        </Reveal>
        <Reveal delay={100}>
          <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 32 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }} className="ferrum-form-row">
              <div>
                <div style={labelStyle}>Name</div>
                <input style={fieldStyle} value={form.name} onChange={set("name")} />
                {errors.name && <div style={{ color: "#e08a7d", fontSize: 12, marginTop: 6 }}>{errors.name}</div>}
              </div>
              <div>
                <div style={labelStyle}>Email</div>
                <input style={fieldStyle} value={form.email} onChange={set("email")} />
                {errors.email && <div style={{ color: "#e08a7d", fontSize: 12, marginTop: 6 }}>{errors.email}</div>}
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }} className="ferrum-form-row">
              <div>
                <div style={labelStyle}>Phone</div>
                <input style={fieldStyle} value={form.phone} onChange={set("phone")} />
              </div>
              <div>
                <div style={labelStyle}>Company</div>
                <input style={fieldStyle} value={form.company} onChange={set("company")} />
              </div>
            </div>
            <div>
              <div style={labelStyle}>Project type</div>
              <select style={{ ...fieldStyle, appearance: "none" }} value={form.type} onChange={set("type")}>
                {SERVICES.map((s) => (<option key={s.name} style={{ background: T.bg }}>{s.name}</option>))}
              </select>
            </div>
            <div>
              <div style={labelStyle}>Message</div>
              <textarea rows={4} style={{ ...fieldStyle, resize: "vertical" }} value={form.message} onChange={set("message")} />
              {errors.message && <div style={{ color: "#e08a7d", fontSize: 12, marginTop: 6 }}>{errors.message}</div>}
            </div>
            <div>
              <Button variant="cta" onClick={submit} style={{ width: "fit-content" }}>Send Message</Button>
            </div>
          </form>
        </Reveal>
      </div>

      <Reveal delay={150}>
        <div style={{ display: "flex", flexDirection: "column", gap: 32, paddingTop: 8 }}>
          {[
            ["Email", "hello@ferrumstudio.co"],
            ["Phone", "+971 4 000 0000"],
            ["WhatsApp", "+971 50 000 0000"],
            ["Location", "Dubai, UAE"],
          ].map(([k, v]) => (
            <div key={k}>
              <div style={{ fontSize: 12, color: T.textSec, marginBottom: 4 }}>{k}</div>
              <div style={{ fontSize: 17, color: T.text }}>{v}</div>
            </div>
          ))}
          <div style={{ display: "flex", gap: 20, marginTop: 8 }}>
            {["Instagram", "Behance", "LinkedIn"].map((s) => (
              <span key={s} style={{ fontSize: 14, color: T.textSec, cursor: "pointer" }}>{s}</span>
            ))}
          </div>
        </div>
      </Reveal>

      <style>{`
        @media (max-width: 760px) {
          .ferrum-contact-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
          .ferrum-form-row { grid-template-columns: 1fr !important; gap: 20px !important; }
        }
      `}</style>
    </section>
  );
}

/* ---------- ROOT APP ---------- */

export default function App() {
  const [page, setPage] = useState("home");
  const [activeProject, setActiveProject] = useState(null);

  const go = (p) => {
    setPage(p);
    setActiveProject(null);
    window.scrollTo(0, 0);
  };

  const openProject = (p) => {
    setActiveProject(p);
    setPage("project");
    window.scrollTo(0, 0);
  };

  const nextProject = activeProject
    ? PROJECTS[(PROJECTS.findIndex((p) => p.id === activeProject.id) + 1) % PROJECTS.length]
    : null;

  return (
    <div style={{ background: T.bg, color: T.text, fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif", minHeight: "100vh" }}>
      <Nav page={page} go={go} />
      {page === "home" && <Home go={go} openProject={openProject} />}
      {page === "work" && <Work go={go} openProject={openProject} />}
      {page === "project" && <ProjectDetail project={activeProject} go={go} next={nextProject} openProject={openProject} />}
      {page === "services" && <ServicesPage go={go} />}
      {page === "about" && <About go={go} />}
      {page === "contact" && <Contact />}
      <Footer go={go} />
    </div>
  );
}
