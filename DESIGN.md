# Creative Agency Website — UI/UX Design System & Art Direction

---

## STEP 1 — ART DIRECTION

**Concept:** "The Void & The Work" — an obsidian-black exhibition space where the interface disappears and the portfolio becomes light. The site behaves like a gallery at night: dim architecture, spotlighted art, one electric accent used like a laser pointer.

**Mood:** Confident, quiet, editorial. Tension between restraint (UI) and intensity (imagery). Nothing decorative — every element earns its place.

**Composition:** Asymmetric, editorial-grid based. Generous negative space. Full-bleed imagery breaking out of the grid at key moments (hero, featured work, case studies). Text blocks are narrow and left-aligned against wide open canvas — magazine logic, not app logic.

**Typography direction:** Oversized display headlines (culturally closer to a fashion campaign than a SaaS landing page), paired with a utilitarian grotesk for UI/body. Type is a visual object, not just a label.

**Image direction:** Full-bleed, uncorrected, high-fidelity. Images sit on black with no card chrome — black background does the framing. Hover reveals subtle scale, never filters.

**Motion direction:** Motion is a reveal mechanism, not decoration — text and images arrive (fade/slide up, mask-reveal), cursor-driven micro-interactions, slow confident easing. Never bouncy, never busy.

---

## STEP 2 — DESIGN SYSTEM

### Color Tokens
| Token | Hex | Usage |
|---|---|---|
| `bg-primary` | `#0A0A0A` | Base background, hero, nav, footer |
| `bg-surface` | `#161616` | Cards, forms, secondary sections |
| `text-primary` | `#F5F5F0` | Headings, primary content |
| `text-secondary` | `#8A8A8A` | Descriptions, metadata, labels |
| `accent` | `#C7FF2F` | CTA, hover, active state, small highlights only |
| `border` | `#292929` | Dividers, input borders, card edges |

**Distribution:** 70% `bg-primary` / 15% `bg-surface` / 10% `text-primary` / 5% `accent`. Accent never fills a surface — text, underline, icon, or 1–2px stroke only.

### Typography Scale
Two families max:
- **Display/UI:** A modern grotesk (e.g. Neue Montreal, General Sans, or Suisse Int'l style) — used for everything.
- **Optional editorial serif** (e.g. a variable serif like Fraunces) reserved *only* for pull-quotes/creative statements, if used at all.

| Style | Size (desktop) | Weight | Tracking | Line-height |
|---|---|---|---|---|
| Display XL (hero) | 120–160px | 500–600 | -2% | 0.95 |
| Display L (section titles) | 64–88px | 500 | -1% | 1.0 |
| Heading M | 32–40px | 500 | 0 | 1.15 |
| Body | 16–18px | 400 | 0 | 1.6 |
| Label/Meta | 12–13px | 500 | +8% uppercase | 1.4 |

### Spacing System
`8 · 16 · 24 · 32 · 48 · 64 · 80 · 96 · 128` — section vertical rhythm uses 96/128; component internal spacing uses 8–32.

### Grid
- Desktop: 12-col, 24px gutter, 1440px max container (full-bleed sections ignore container)
- Tablet: 8-col, 20px gutter
- Mobile: 4-col, 16px gutter

### Radius / Border / Shadow
- Radius: 0–4px only (sharp, editorial — not app-like). Images: 0px.
- Borders: 1px `#292929`, used sparingly for dividers and input outlines.
- Shadows: none/near-none. Depth comes from contrast and layering, not drop shadows.

### Buttons
- **Primary:** transparent bg, 1px `text-primary` border, text `text-primary` → on hover: border/text becomes `accent`, subtle background wash `rgba(199,255,47,0.08)`.
- **Secondary (text link style):** text `text-primary` with underline offset; hover → `accent`.
- **CTA (footer/contact):** larger, pill-free rectangular button, `accent` text + border, fills solid `accent` bg with `#0A0A0A` text on hover (only place accent fills a surface).

### Cards / Project Blocks
No boxed cards. A "project block" = image + meta row underneath (name / category / year in `text-secondary`, small caps). On hover: image scales 1.03–1.05 over 500–700ms ease, meta row's category label shifts to `accent`.

### Form Fields
Bottom-border-only inputs (no boxes): 1px `border`, background transparent, on focus border → `accent`. Labels float above as small caps `text-secondary`.

### Motion Principles
- Duration: 300–700ms, ease `cubic-bezier(0.16, 1, 0.3, 1)` (confident decel)
- Entrance: opacity 0→1 + translateY 24px→0
- Image reveal: clip-path mask wipe on scroll-in
- No parallax gimmicks, no infinite loops, no bounce

---

## STEP 3 — UX ARCHITECTURE

### Sitemap
```
Home
├─ Work (Portfolio, filterable)
│   └─ Project Detail (dynamic per project)
├─ Services
├─ About
└─ Contact
```

### Navigation
Sticky, transparent-over-hero → solidifies to `bg-primary` w/ bottom border on scroll.
`Logo — Work — Services — About — Contact` + primary CTA button ("Start a Project") right-aligned. Mobile: logo + hamburger → full-screen takeover menu (large stacked type links, `accent` used on active link only).

### Primary Conversion Path
`Home (Hero) → Featured Work → Project Detail → Contact CTA`
Secondary path: `Home → Services → Contact`. Every page footer ends in the same closing CTA block, so no page is a dead end.

### User Flow Priorities
1. Communicate identity/quality in <3s (hero)
2. Prove it with work (featured work, immediately below fold)
3. Let deep-divers filter/browse (Work page)
4. Convert (Contact, always one click away via nav CTA)

---

## STEP 4 — HOMEPAGE

1. **Nav** — as above.
2. **Hero** — Display XL headline (2 lines max), one-line supporting sentence in `text-secondary`, primary CTA button, full-bleed background: looping subtle 3D render or still, dimmed to let text sit on top. Scroll-cue at bottom (small animated line).
3. **Introduction** — narrow centered/left column (max 640px), Heading M statement of who they are, one paragraph body.
4. **Featured Work** — asymmetric editorial grid: e.g. Row 1 = one large (8-col) + one small (4-col); Row 2 = full-width; Row 3 = two medium (6/6). Each block: image, then meta row (name · category · year).
5. **Services** — stacked list rows (not icon grid): each service is a full-width row with large type name, one-line description, small "→" indicator; row highlights (background wash) on hover.
6. **Creative Statement** — full-viewport-height section, huge centered type statement, one word or phrase in `accent`, minimal else.
7. **Selected Clients** — single row (desktop) / 2-col grid (mobile) of monochrome logos at `text-secondary` opacity, brighten to `text-primary` on hover. No section heading needed beyond a small label ("Selected Clients").
8. **CTA** — full-width dark-to-black section, Display L "Have a project in mind?", CTA button "Let's Work Together" in accent-fill style.
9. **Footer** — logo, nav links repeated, socials, email/phone, location, copyright — 3–4 column layout collapsing to stacked on mobile.

---

## STEP 5 — WORK / PORTFOLIO PAGE

- Header: page title "Work" (Display L) + filter row beneath: `All / Branding / 3D / Advertising / Graphic Design / Motion / Photography / Social Media` — text pills, active = `accent` underline, no boxes.
- Layout: masonry/variable-size editorial grid (mix of 4-col, 6-col, 8-col, 12-col blocks) — never a uniform 3-up card grid.
- Filtering: instant client-side fade/reflow (300ms), no page reload, filter bar becomes sticky on scroll.
- Each block: image + meta row identical to homepage featured work.

---

## STEP 6 — PROJECT DETAIL PAGE

1. Meta header: category / client / year in `text-secondary`, small caps, above a Display L project title.
2. Full-bleed hero artwork (first key visual).
3. Two-column intro: left = "Overview" short paragraph, right = quick facts (Client, Year, Services, Role) as label/value pairs.
4. "Creative Concept" — narrow single-column editorial text block.
5. "Process" — optional 2–3 step visual sequence (images + short captions).
6. Full-width visual breaks between text sections (let images breathe — min 80–128px vertical margin around them).
7. Additional image gallery — simple stacked full-width or alternating half/half.
8. Embedded video block if available (native player, minimal chrome).
9. "Results/Outcome" — short statement, can use pull-quote styling.
10. "Next Project" — full-width link block at bottom with next project's image/title (keeps user moving through portfolio).
11. Closing Contact CTA (same as homepage CTA block).

---

## STEP 7 — SERVICES PAGE

- Header: "Services" Display L + one-line positioning statement.
- Each service = full-width alternating section: large representative visual on one side, service name (Heading M), description, and 2–3 capability bullets on the other. Alternate left/right per service for rhythm.
- No icon-and-3-words boxes — services read like mini case studies, not a feature list.
- Ends in Contact CTA.

---

## STEP 8 — ABOUT PAGE

- Header: Display L brand statement (e.g. "We build visual worlds.")
- Story section: narrow editorial text column beside/under a strong photograph.
- Vision / Mission / Values: presented as a stacked sequence of short statements with large numerals (01, 02, 03) in `text-secondary`, not icon cards.
- Team (optional): grid of portraits, name + role in small caps beneath, greyscale → color on hover.
- Ends in Contact CTA.

---

## STEP 9 — CONTACT PAGE

- Header: Display L "Let's talk" / "Start a project."
- Two-column layout: left = form, right = direct contact info (Email, Phone, WhatsApp, Location, Social links) stacked with generous spacing.
- Form fields (bottom-border style): Name, Email, Phone, Company, Project Type (select), Budget (optional select), Message (textarea).
- Submit button: accent-fill CTA style.
- Validation: inline, small `text-secondary` → error state in a muted warm red, never breaking the palette drastically.
- Success state: form area transitions to a simple full-height confirmation message, no modal popups.

---

## STEP 10 — RESPONSIVE BEHAVIOR

| Breakpoint | Range | Key changes |
|---|---|---|
| Desktop | 1440px+ | Full asymmetric grids, 12-col |
| Laptop | 1024–1439px | Grid scales proportionally, hero type reduces ~20% |
| Tablet | 768–1023px | 8-col grid, featured work drops to 2 blocks/row max, nav condenses (CTA may drop to icon) |
| Mobile | 320–767px | 4-col, full-screen nav takeover, all editorial grids become single-column stacked, hero type ~40–56px, sections retain generous vertical spacing (reduced ~30–40%) but never cramped, CTA always visible near top of fold or sticky |

Mobile-specific rules: no horizontal scroll ever; images remain full-bleed edge-to-edge; typography hierarchy preserved via weight/size even at small scale; filters on Work page become a horizontally scrollable chip row.

---

## STEP 11 — INTERACTION STATES

| Element | Default | Hover | Active/Focus |
|---|---|---|---|
| Primary button | outline `text-primary` | border+text → `accent`, bg wash | pressed: scale 0.98 |
| CTA button | `accent` outline | fills `accent`, text→`#0A0A0A` | scale 0.98 |
| Nav link | `text-primary` | `accent` underline slide-in | current page: `accent` |
| Project block | static image | scale 1.03–1.05, meta category → `accent` | — |
| Filter pill | `text-secondary` | `text-primary` | selected: `accent` underline |
| Input | `border` bottom-line | — | focus: `accent` bottom-line |
| Social icon | `text-secondary` | `text-primary` | — |
| Loading | thin `accent` progress line top of viewport | — | — |
| Empty state (e.g. no filtered results) | centered small caps message in `text-secondary`, "No projects found — try another filter" | — | — |

---

## SUMMARY — DESIGN QUALITY CHECKLIST
- [x] Dark luxury palette, accent used at ~5% only
- [x] No boxed cards, no glassmorphism, no gradients
- [x] Editorial asymmetric grids over uniform grids
- [x] Sharp radii (0–4px), minimal shadows
- [x] Type-driven hierarchy at every scale
- [x] Motion = reveal, never decoration
- [x] Portfolio imagery always the visual hero
- [x] Every page ends in the same closing CTA pattern

This document defines the full visual and UX direction. No implementation/code has been produced — ready to move into React component build-out once approved.
