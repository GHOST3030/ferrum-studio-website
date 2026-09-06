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
  bg: "var(--fs-bg)",
  surface: "var(--fs-surface)",
  text: "var(--fs-text)",
  textSec: "var(--fs-text-sec)",
  accent: "var(--fs-accent)",
  accentSoft: "var(--fs-accent-soft)",
  border: "var(--fs-border)",
};

/* ---------- THEME + LANGUAGE ---------- */

const THEME_VARS = `
  :root[data-fs-theme="dark"] {
    --fs-bg: #0C0B09;
    --fs-surface: #17150F;
    --fs-text: #F4F0E6;
    --fs-text-sec: #9C9484;
    --fs-accent: #D6A756;
    --fs-accent-soft: rgba(214,167,86,0.14);
    --fs-border: #2A271F;
  }
  :root[data-fs-theme="light"] {
    --fs-bg: #FAF7F0;
    --fs-surface: #F0EBDD;
    --fs-text: #16140F;
    --fs-text-sec: #6E6656;
    --fs-accent: #9C7222;
    --fs-accent-soft: rgba(156,114,34,0.12);
    --fs-border: #DFD8C4;
  }
`;

const DICT = {
  en: {
    brand: "Ferrum Studio",
    navWork: "Work",
    navServices: "Services",
    navAbout: "About",
    navContact: "Contact",
    startProject: "Start a project",
    heroHeadline: "We build things worth looking at twice.",
    heroSub: "A creative studio working across branding, 3D, advertising and film for clients who don't want to look like anyone else.",
    heroCta: "See the Work",
    whoWeAre: "Who we are",
    introText: "Ferrum Studio is a small team of designers, 3D artists and directors based in Dubai, working with brands, founders and institutions across the region who need their work to hold up in a crowded room.",
    selectedWork: "Selected Work",
    viewAll: "View all projects",
    whatWeDo: "What we do",
    statement: "Good work looks effortless. It rarely is. We spend the effort so it doesn't show.",
    selectedClients: "Selected Clients",
    getInTouch: "Get in touch",
    haveProject: "Have a project in mind?",
    letsWork: "Let's Work Together",
    sitemap: "Sitemap",
    contact: "Contact",
    social: "Social",
    footerTagline: "A creative studio for brands that want to look like nobody else.",
    rights: "All rights reserved.",
    workTitle: "Work",
    noProjects: "No projects found — try another filter.",
    nextProject: "Next Project",
    overview: "Overview",
    concept: "Creative Concept",
    outcome: "Outcome",
    servicesTitle: "Services",
    servicesSub: "Seven capabilities, one studio. We move between them depending on what the brief actually needs.",
    aboutHeadline: "We build visual worlds for people with something specific to say.",
    ourStory: "Our story",
    aboutStoryText: "Ferrum Studio started in 2019 as a two-person 3D shop working nights on architectural renders. Six years on, we're a full creative studio — but the standard hasn't moved: every project has to earn its place in the portfolio, ours or the client's.",
    letsTalk: "Let's talk.",
    name: "Name",
    email: "Email",
    phone: "Phone",
    company: "Company",
    projectType: "Project type",
    message: "Message",
    send: "Send Message",
    sentTitle: "Message sent.",
    sentBody: "We read every message ourselves — expect a reply within two business days.",
    location: "Location",
    whatsapp: "WhatsApp",
    errName: "Enter your name.",
    errEmail: "Enter a valid email.",
    errMessage: "Tell us a little about the project.",
  },
  ar: {
    brand: "استوديو فيروم",
    navWork: "الأعمال",
    navServices: "الخدمات",
    navAbout: "من نحن",
    navContact: "تواصل معنا",
    startProject: "ابدأ مشروعك",
    heroHeadline: "نصنع أعمالاً تستحق أن تنظر إليها مرتين.",
    heroSub: "استوديو إبداعي يعمل في الهوية البصرية، التصميم ثلاثي الأبعاد، الإعلان والأفلام لعملاء لا يريدون أن يشبهوا أحداً.",
    heroCta: "شاهد الأعمال",
    whoWeAre: "من نحن",
    introText: "استوديو فيروم فريق صغير من المصممين وفناني ثلاثي الأبعاد والمخرجين مقره دبي، يعمل مع علامات تجارية ومؤسسين ومؤسسات في المنطقة يحتاجون أعمالهم لتبرز في زحمة المنافسة.",
    selectedWork: "أعمال مختارة",
    viewAll: "عرض كل المشاريع",
    whatWeDo: "ماذا نقدم",
    statement: "العمل الجيد يبدو بلا مجهود. نادراً ما يكون كذلك. نحن نبذل الجهد كي لا يظهر.",
    selectedClients: "عملاء مختارون",
    getInTouch: "تواصل معنا",
    haveProject: "لديك مشروع في بالك؟",
    letsWork: "لنعمل معاً",
    sitemap: "خريطة الموقع",
    contact: "تواصل",
    social: "تابعنا",
    footerTagline: "استوديو إبداعي للعلامات التجارية التي تريد أن تكون مختلفة عن الجميع.",
    rights: "جميع الحقوق محفوظة.",
    workTitle: "الأعمال",
    noProjects: "لا توجد مشاريع — جرّب تصفية أخرى.",
    nextProject: "المشروع التالي",
    overview: "نظرة عامة",
    concept: "الفكرة الإبداعية",
    outcome: "النتيجة",
    servicesTitle: "الخدمات",
    servicesSub: "سبع قدرات، استوديو واحد. ننتقل بينها حسب ما يحتاجه المشروع فعلاً.",
    aboutHeadline: "نصنع عوالم بصرية لأصحاب رسالة واضحة يريدون قولها.",
    ourStory: "قصتنا",
    aboutStoryText: "بدأ استوديو فيروم عام 2019 كورشة عمل ثلاثية الأبعاد من شخصين يعملان ليلاً على تصاميم معمارية. بعد ست سنوات، أصبحنا استوديو إبداعياً متكاملاً — لكن المعيار لم يتغير: كل مشروع يجب أن يستحق مكانه في المعرض، سواء كان مشروعنا أو مشروع العميل.",
    letsTalk: "لنتحدث.",
    name: "الاسم",
    email: "البريد الإلكتروني",
    phone: "الهاتف",
    company: "الشركة",
    projectType: "نوع المشروع",
    message: "الرسالة",
    send: "إرسال الرسالة",
    sentTitle: "تم إرسال الرسالة.",
    sentBody: "نقرأ كل رسالة بأنفسنا — توقع رداً خلال يومي عمل.",
    location: "الموقع",
    whatsapp: "واتساب",
    errName: "الرجاء إدخال اسمك.",
    errEmail: "الرجاء إدخال بريد إلكتروني صحيح.",
    errMessage: "أخبرنا قليلاً عن مشروعك.",
  },
};

const ThemeLangContext = React.createContext({ theme: "dark", lang: "en", t: DICT.en, toggleTheme: () => {}, toggleLang: () => {} });
function useThemeLang() {
  return React.useContext(ThemeLangContext);
}

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

function hashSeed(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (h << 5) - h + str.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h);
}

const IMG_MAP = {
  "Aurora Skincare": "1522335789203-aabd1fc54bc9",
  "Monolith": "1618005182384-a83a8bd57fbe",
  "Veyra Airlines": "1436491865332-7a61a109cc05",
  "Nomad Coffee": "1495474472287-4d71bcdd2085",
  "Pulse": "1571019613454-1cb2f99b2d8b",
  "Sable House": "1566073771259-6a8506099945",
  "Kite Social": "1611162617213-7d7a39e9b1d7",
  "Ferrum Studio hero": "1517245386807-bb43f82c33c4",
  "Studio photograph": "1523726491678-bf852e717f6a",
  "Branding": "1611162616305-c69b3fa7fbe0",
  "3D Design": "1618005182384-a83a8bd57fbe",
  "Advertising": "1557838923-2985c318be48",
  "Graphic Design": "1626785774573-4b799315345d",
  "Motion": "1550684848-fac1c5b4e853",
  "Photography": "1516035069371-29a1b244cc32",
  "Video Production": "1492619375914-88005aa9e8fb",
};

const FALLBACK_IMGS = [
  "1550745165-9bc0b252726f",
  "1620121692029-d088224ddc74",
  "1620641788421-7a1c342ea42e",
  "1487958449943-2429e8be8625",
];

function unsplashUrl(id, w = 1600) {
  return `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=70`;
}

function Placeholder({ label, ratio = "56%", tone = 1 }) {
  const [imgFailed, setImgFailed] = useState(false);
  const seed = hashSeed(label || "ferrum");
  const hue1 = seed % 360;
  const hue2 = (hue1 + 40 + (seed % 60)) % 360;
  const angle = (seed % 8) * 45;
  const cx = 20 + (seed % 60);
  const cy = 20 + ((seed >> 3) % 60);
  const r1 = 30 + (seed % 25);
  const r2 = 20 + ((seed >> 4) % 20);

  const photoId = IMG_MAP[label] || FALLBACK_IMGS[seed % FALLBACK_IMGS.length];
  const imgSrc = unsplashUrl(photoId);

  return (
    <div
      style={{
        width: "100%",
        paddingTop: ratio,
        position: "relative",
        background: "var(--fs-surface)",
        overflow: "hidden",
      }}
    >
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid slice"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
      >
        <defs>
          <linearGradient id={`g-${seed}`} x1="0%" y1="0%" x2="100%" y2="100%" gradientTransform={`rotate(${angle} .5 .5)`}>
            <stop offset="0%" stopColor={`hsl(${hue1}, 12%, 8%)`} />
            <stop offset="100%" stopColor={`hsl(${hue2}, 14%, 4%)`} />
          </linearGradient>
          <radialGradient id={`r1-${seed}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" style={{ stopColor: "var(--fs-accent)", stopOpacity: 0.18 }} />
            <stop offset="100%" style={{ stopColor: "var(--fs-accent)", stopOpacity: 0 }} />
          </radialGradient>
          <radialGradient id={`r2-${seed}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={`hsla(${hue1}, 60%, 55%, 0.14)`} />
            <stop offset="100%" stopColor={`hsla(${hue1}, 60%, 55%, 0)`} />
          </radialGradient>
        </defs>
        <rect width="100" height="100" fill={`url(#g-${seed})`} />
        <circle cx={cx} cy={cy} r={r1} fill={`url(#r1-${seed})`} />
        <circle cx={100 - cx} cy={100 - cy} r={r2} fill={`url(#r2-${seed})`} />
        <line x1="0" y1={cy} x2="100" y2={cy - 12} stroke="rgba(245,245,240,0.06)" strokeWidth="0.3" />
        <line x1={cx} y1="0" x2={cx + 10} y2="100" stroke="rgba(245,245,240,0.05)" strokeWidth="0.3" />
      </svg>
      {!imgFailed && (
        <img
          src={imgSrc}
          alt={label}
          loading="lazy"
          onError={() => setImgFailed(true)}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: "grayscale(0.35) contrast(1.06) brightness(0.82)",
          }}
        />
      )}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to top, var(--fs-bg) 0%, rgba(0,0,0,0) 55%)",
          opacity: 0.75,
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "flex-end",
          padding: 16,
          fontSize: 12,
          letterSpacing: "0.04em",
          color: T.text,
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
    base.background = hover ? "var(--fs-accent-soft)" : "transparent";
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

function ToggleChip({ label, active, onClick, title }) {
  const [hover, setHover] = useState(false);
  return (
    <span
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      title={title}
      style={{
        cursor: "pointer",
        fontSize: 12,
        fontWeight: 500,
        letterSpacing: "0.03em",
        color: active || hover ? T.accent : T.textSec,
        border: `1px solid ${active || hover ? T.accent : T.border}`,
        borderRadius: 20,
        padding: "8px 14px",
        minWidth: 40,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        background: active || hover ? "var(--fs-accent-soft)" : "transparent",
        transition: "all 250ms ease",
      }}
    >
      {label}
    </span>
  );
}

function Nav({ page, go }) {
  const { theme, lang, t, toggleTheme, toggleLang } = useThemeLang();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    [t.navWork, "work"],
    [t.navServices, "services"],
    [t.navAbout, "about"],
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
          background: scrolled ? "var(--fs-bg)" : "transparent",
          opacity: scrolled ? 0.97 : 1,
          borderBottom: scrolled ? `1px solid ${T.border}` : "1px solid transparent",
          backdropFilter: scrolled ? "blur(8px)" : "none",
          transition: "background 300ms ease, border-color 300ms ease",
        }}
      >
        <span
          onClick={() => go("home")}
          style={{ cursor: "pointer", fontSize: 18, fontWeight: 600, letterSpacing: "-0.01em", color: T.text }}
        >
          {t.brand}
        </span>
        <div style={{ display: "flex", alignItems: "center", gap: 32 }} className="ferrum-desktop-nav">
          {links.map(([label, key]) => (
            <NavLink key={key} label={label} active={page === key} onClick={() => go(key)} />
          ))}
          <div style={{ display: "flex", gap: 8 }}>
            <ToggleChip
              label={lang === "en" ? "AR" : "EN"}
              onClick={toggleLang}
              title="Switch language / تبديل اللغة"
            />
            <ToggleChip
              label={theme === "dark" ? "☾" : "☀"}
              onClick={toggleTheme}
              title="Switch theme"
            />
          </div>
          <Button onClick={() => go("contact")} style={{ padding: "10px 20px" }}>
            {t.startProject}
          </Button>
        </div>
        <div className="ferrum-mobile-toggle" style={{ display: "none", alignItems: "center", gap: 12 }}>
          <ToggleChip label={lang === "en" ? "AR" : "EN"} onClick={toggleLang} />
          <ToggleChip label={theme === "dark" ? "☾" : "☀"} onClick={toggleTheme} />
          <span
            onClick={() => setMenuOpen((v) => !v)}
            style={{ cursor: "pointer", color: T.text, fontSize: 14 }}
          >
            {menuOpen ? "✕" : "☰"}
          </span>
        </div>
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
          {[...links, [t.navContact, "contact"]].map(([label, key]) => (
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
          .ferrum-mobile-toggle { display: flex !important; }
        }
      `}</style>
    </>
  );
}

/* ---------- FOOTER + CTA (shared across pages) ---------- */

function ClosingCTA({ go }) {
  const { t } = useThemeLang();
  return (
    <section style={{ padding: "160px 5vw", textAlign: "center", borderTop: `1px solid ${T.border}` }}>
      <Reveal>
        <SectionLabel>{t.getInTouch}</SectionLabel>
        <h2 style={{ fontSize: "clamp(36px, 6vw, 88px)", fontWeight: 500, letterSpacing: "-0.02em", margin: "0 0 40px", color: T.text, lineHeight: 1.05 }}>
          {t.haveProject}
        </h2>
        <Button variant="cta" onClick={() => go("contact")}>{t.letsWork}</Button>
      </Reveal>
    </section>
  );
}

function Footer({ go }) {
  const { t } = useThemeLang();
  const sitemapKeys = [
    ["home", t.navWork === "الأعمال" ? "الرئيسية" : "Home"],
    ["work", t.navWork],
    ["services", t.navServices],
    ["about", t.navAbout],
    ["contact", t.navContact],
  ];
  return (
    <footer style={{ padding: "64px 5vw 48px", borderTop: `1px solid ${T.border}` }}>
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: 48 }}>
        <div style={{ maxWidth: 260 }}>
          <div style={{ fontSize: 18, fontWeight: 600, marginBottom: 12, color: T.text }}>{t.brand}</div>
          <div style={{ fontSize: 14, color: T.textSec, lineHeight: 1.6 }}>
            {t.footerTagline}
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <span style={{ fontSize: 13, color: T.textSec, marginBottom: 4 }}>{t.sitemap}</span>
          {sitemapKeys.map(([k, label]) => (
            <span key={k} onClick={() => go(k)} style={{ cursor: "pointer", fontSize: 14, color: T.text }}>{label}</span>
          ))}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <span style={{ fontSize: 13, color: T.textSec, marginBottom: 4 }}>{t.contact}</span>
          <span style={{ fontSize: 14, color: T.text, direction: "ltr", textAlign: t.brand === "استوديو فيروم" ? "right" : "left" }}>hello@ferrumstudio.co</span>
          <span style={{ fontSize: 14, color: T.text, direction: "ltr", textAlign: t.brand === "استوديو فيروم" ? "right" : "left" }}>+971 4 000 0000</span>
          <span style={{ fontSize: 14, color: T.textSec }}>Dubai, UAE</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <span style={{ fontSize: 13, color: T.textSec, marginBottom: 4 }}>{t.social}</span>
          {["Instagram", "Behance", "LinkedIn"].map((s) => (
            <span key={s} style={{ fontSize: 14, color: T.text, cursor: "pointer" }}>{s}</span>
          ))}
        </div>
      </div>
      <div style={{ marginTop: 64, paddingTop: 24, borderTop: `1px solid ${T.border}`, fontSize: 12, color: T.textSec }}>
        © 2026 {t.brand}. {t.rights}
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
  const { t } = useThemeLang();
  const featured = PROJECTS.slice(0, 4);
  const spans = ["span 8", "span 4", "span 12", "span 6"];
  const seconds = ["span 4", "span 8", null, "span 6"];

  return (
    <>
      {/* HERO */}
      <section style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", padding: "120px 5vw 96px", position: "relative" }}>
        <div style={{ position: "absolute", inset: 0, zIndex: -1 }}>
          <Placeholder label="Ferrum Studio hero" ratio="100%" tone={0} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, var(--fs-bg) 8%, rgba(10,10,10,0.15) 65%)" }} />
        </div>
        <Reveal>
          <div style={{ fontSize: 13, color: T.accent, letterSpacing: "0.02em", marginBottom: 20 }}>
            {t.brand === "استوديو فيروم" ? "دبي · استوديو إبداعي" : "Dubai · Creative Studio"}
          </div>
        </Reveal>
        <Reveal delay={80}>
          <h1 style={{ fontSize: "clamp(38px, 8.5vw, 140px)", fontWeight: 600, letterSpacing: "-0.02em", lineHeight: 1.05, margin: "0 0 32px", color: T.text, maxWidth: 1100 }}>
            {t.heroHeadline}
          </h1>
        </Reveal>
        <Reveal delay={180}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 24 }}>
            <p style={{ fontSize: 18, color: T.textSec, maxWidth: 420, margin: 0, lineHeight: 1.7 }}>
              {t.heroSub}
            </p>
            <Button variant="cta" onClick={() => go("work")}>{t.heroCta}</Button>
          </div>
        </Reveal>
      </section>

      {/* INTRO */}
      <section style={{ padding: "128px 5vw", maxWidth: 780 }}>
        <Reveal>
          <SectionLabel>{t.whoWeAre}</SectionLabel>
          <p style={{ fontSize: "clamp(22px, 3vw, 34px)", lineHeight: 1.4, color: T.text, fontWeight: 400 }}>
            {t.introText}
          </p>
        </Reveal>
      </section>

      {/* FEATURED WORK */}
      <section style={{ padding: "0 5vw 128px" }}>
        <Reveal>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 40 }}>
            <h2 style={{ fontSize: "clamp(32px, 4vw, 56px)", fontWeight: 500, color: T.text, margin: 0, letterSpacing: "-0.01em" }}>{t.selectedWork}</h2>
            <span onClick={() => go("work")} style={{ cursor: "pointer", fontSize: 14, color: T.textSec, borderBottom: `1px solid ${T.border}` }}>{t.viewAll}</span>
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
        <Reveal><SectionLabel>{t.whatWeDo}</SectionLabel></Reveal>
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
            {t.statement}
          </h3>
        </Reveal>
      </section>

      {/* CLIENTS */}
      <section style={{ padding: "80px 5vw" }}>
        <Reveal><SectionLabel>{t.selectedClients}</SectionLabel></Reveal>
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
  const { t } = useThemeLang();
  const [filter, setFilter] = useState("All");
  const filtered = filter === "All" ? PROJECTS : PROJECTS.filter((p) => p.category === filter);
  const spanFor = (size) => (size === "large" ? "span 8" : size === "full" ? "span 12" : size === "medium" ? "span 6" : "span 4");

  return (
    <>
      <section style={{ padding: "160px 5vw 48px" }}>
        <Reveal>
          <h1 style={{ fontSize: "clamp(40px, 6vw, 88px)", fontWeight: 500, color: T.text, margin: "0 0 40px", letterSpacing: "-0.02em" }}>{t.workTitle}</h1>
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
            {t.noProjects}
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
  const { t } = useThemeLang();
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
          <SectionLabel>{t.overview}</SectionLabel>
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
          <SectionLabel>{t.concept}</SectionLabel>
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
          <SectionLabel>{t.outcome}</SectionLabel>
          <p style={{ fontSize: 22, lineHeight: 1.5, color: T.text }}>{project.results}</p>
        </Reveal>
      </section>

      {next && (
        <div onClick={() => openProject(next)} style={{ cursor: "pointer", borderTop: `1px solid ${T.border}`, padding: "64px 5vw", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 13, color: T.textSec }}>{t.nextProject}</span>
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
  const { t } = useThemeLang();
  return (
    <>
      <section style={{ padding: "160px 5vw 80px" }}>
        <Reveal>
          <h1 style={{ fontSize: "clamp(40px, 6vw, 88px)", fontWeight: 500, color: T.text, margin: "0 0 20px", letterSpacing: "-0.02em" }}>{t.servicesTitle}</h1>
          <p style={{ fontSize: 18, color: T.textSec, maxWidth: 520 }}>{t.servicesSub}</p>
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
  const { t } = useThemeLang();
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
            {t.aboutHeadline}
          </h1>
        </Reveal>
      </section>

      <section style={{ padding: "0 5vw 96px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64 }} className="ferrum-detail-grid">
        <Reveal><Placeholder label="Studio photograph" ratio="110%" tone={1} /></Reveal>
        <Reveal delay={100}>
          <SectionLabel>{t.ourStory}</SectionLabel>
          <p style={{ fontSize: 18, lineHeight: 1.7, color: T.text }}>
            {t.aboutStoryText}
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
  const { t } = useThemeLang();
  const [form, setForm] = useState({ name: "", email: "", phone: "", company: "", type: "Branding", message: "" });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    const errs = {};
    if (!form.name.trim()) errs.name = t.errName;
    if (!/^\S+@\S+\.\S+$/.test(form.email)) errs.email = t.errEmail;
    if (!form.message.trim()) errs.message = t.errMessage;
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
          <h1 style={{ fontSize: "clamp(32px, 5vw, 56px)", color: T.text, fontWeight: 500, marginBottom: 16 }}>{t.sentTitle}</h1>
          <p style={{ color: T.textSec, fontSize: 16 }}>{t.sentBody}</p>
        </Reveal>
      </section>
    );
  }

  return (
    <section style={{ padding: "160px 5vw 128px", display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: 80 }} className="ferrum-contact-grid">
      <div>
        <Reveal>
          <h1 style={{ fontSize: "clamp(36px, 6vw, 76px)", fontWeight: 500, color: T.text, margin: "0 0 48px", letterSpacing: "-0.02em" }}>
            {t.letsTalk}
          </h1>
        </Reveal>
        <Reveal delay={100}>
          <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 32 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }} className="ferrum-form-row">
              <div>
                <div style={labelStyle}>{t.name}</div>
                <input style={fieldStyle} value={form.name} onChange={set("name")} />
                {errors.name && <div style={{ color: "#e08a7d", fontSize: 12, marginTop: 6 }}>{errors.name}</div>}
              </div>
              <div>
                <div style={labelStyle}>{t.email}</div>
                <input style={fieldStyle} value={form.email} onChange={set("email")} />
                {errors.email && <div style={{ color: "#e08a7d", fontSize: 12, marginTop: 6 }}>{errors.email}</div>}
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }} className="ferrum-form-row">
              <div>
                <div style={labelStyle}>{t.phone}</div>
                <input style={fieldStyle} value={form.phone} onChange={set("phone")} />
              </div>
              <div>
                <div style={labelStyle}>{t.company}</div>
                <input style={fieldStyle} value={form.company} onChange={set("company")} />
              </div>
            </div>
            <div>
              <div style={labelStyle}>{t.projectType}</div>
              <select style={{ ...fieldStyle, appearance: "none" }} value={form.type} onChange={set("type")}>
                {SERVICES.map((s) => (<option key={s.name} style={{ background: T.bg }}>{s.name}</option>))}
              </select>
            </div>
            <div>
              <div style={labelStyle}>{t.message}</div>
              <textarea rows={4} style={{ ...fieldStyle, resize: "vertical" }} value={form.message} onChange={set("message")} />
              {errors.message && <div style={{ color: "#e08a7d", fontSize: 12, marginTop: 6 }}>{errors.message}</div>}
            </div>
            <div>
              <Button variant="cta" onClick={submit} style={{ width: "fit-content" }}>{t.send}</Button>
            </div>
          </form>
        </Reveal>
      </div>

      <Reveal delay={150}>
        <div style={{ display: "flex", flexDirection: "column", gap: 32, paddingTop: 8 }}>
          {[
            [t.email, "hello@ferrumstudio.co"],
            [t.phone, "+971 4 000 0000"],
            [t.whatsapp, "+971 50 000 0000"],
            [t.location, "Dubai, UAE"],
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
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = window.localStorage?.getItem("fs-theme");
      if (saved) return saved;
      if (window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches) return "light";
    }
    return "dark";
  });
  const [lang, setLang] = useState(() => {
    if (typeof window !== "undefined") {
      return window.localStorage?.getItem("fs-lang") || "ar";
    }
    return "ar";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-fs-theme", theme);
    window.localStorage?.setItem("fs-theme", theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.setAttribute("dir", lang === "ar" ? "rtl" : "ltr");
    document.documentElement.setAttribute("lang", lang);
    window.localStorage?.setItem("fs-lang", lang);
  }, [lang]);

  const toggleTheme = () => setTheme((th) => (th === "dark" ? "light" : "dark"));
  const toggleLang = () => setLang((l) => (l === "en" ? "ar" : "en"));

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

  const t = DICT[lang] || DICT.en;

  return (
    <ThemeLangContext.Provider value={{ theme, lang, t, toggleTheme, toggleLang }}>
      <style>{THEME_VARS}</style>
      <style>{`
        html, body { background: var(--fs-bg); }
        ::selection { background: var(--fs-accent); color: var(--fs-bg); }
        [dir="rtl"] .ferrum-detail-grid,
        [dir="rtl"] .ferrum-contact-grid { direction: rtl; }
        input, textarea, select { direction: inherit; }
      `}</style>
      <div
        dir={lang === "ar" ? "rtl" : "ltr"}
        style={{
          background: T.bg,
          color: T.text,
          fontFamily: lang === "ar"
            ? "'Tajawal', 'Segoe UI', 'Inter', sans-serif"
            : "'Inter', 'Helvetica Neue', Arial, sans-serif",
          minHeight: "100vh",
          transition: "background 300ms ease, color 300ms ease",
        }}
      >
        <Nav page={page} go={go} />
        {page === "home" && <Home go={go} openProject={openProject} />}
        {page === "work" && <Work go={go} openProject={openProject} />}
        {page === "project" && <ProjectDetail project={activeProject} go={go} next={nextProject} openProject={openProject} />}
        {page === "services" && <ServicesPage go={go} />}
        {page === "about" && <About go={go} />}
        {page === "contact" && <Contact />}
        <Footer go={go} />
      </div>
    </ThemeLangContext.Provider>
  );
}
