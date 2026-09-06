# LifeLens — Design System Revision + New Standalone Features

Two problems to fix from the last pass: the visual language (ALL-CAPS labels, numbered "01/02" markers, monospace-for-everything, near-black-plus-neon) reads exactly like every other AI-generated space dashboard. And the site is currently one page (landing → universe) wearing a "storytelling" label without actually being structured as one. Below fixes both, then adds real standalone features beyond the planet view.

---

## PART 1 — Design Token Revision (replaces Section 12–13 of the original plan)

### Why the old direction was a tell
Near-black background + single bright accent + monospace data labels + ALL-CAPS section headers + "01 — FOCUS" numbering on things that aren't actually a sequence — that combination is the single most common AI-generated "cosmic/tech" look right now. It's not wrong aesthetically, it's just *default*, and it'll read as generated the second a judge sees it.

### Revised palette
Ground the metaphor in **bioluminescence, not generic sci-fi space.** Your subject is personal, internal, organic data — a deep-sea creature lighting up in response to its environment is a closer metaphor for "your life reacting to your behavior" than cold hard sci-fi chrome, and it's far less visually common in hackathon work.

| Token | Hex | Role |
|---|---|---|
| `abyss` | `#0B1220` | Base background — a desaturated deep-blue-black, not pure black |
| `kelp` | `#1B2E35` | Secondary surface / panel base |
| `bio-cyan` | `#5EEAD4` | Primary glow accent (Focus, active states) |
| `bio-amber` | `#F0B86E` | Secondary warm accent (Learning, achievements) — the counterweight so it isn't monochrome neon |
| `coral` | `#F4776E` | Alert/imbalance state only — used sparingly |
| `mist` | `#C7D6DA` | Body text on dark |

Two accent hues instead of one breaks the "single neon on black" tell immediately. Reserve `coral` exclusively for instability states so it carries meaning, not decoration.

### Type
- Display: **Fraunces** (variable, use a soft/low-contrast optical setting) — a warm serif gives the "living organism" feel real personality instead of the expected geometric sans. Use it big, at 72px+ for hero moments.
- Body/UI: **Inter** at a slightly tighter tracking than default. Two families, clearly distinct roles — no third face for "data," no monospace anywhere unless you're showing literal code.
- Sentence case everywhere. Drop ALL-CAPS labels entirely — replace tracked-out caps eyebrows with simple sentence-case labels at reduced opacity (60%) instead.

### Layout
- Left-align body copy and panels; center-align only the single hero moment per section. Centered-everything is another generic tell.
- Remove the "01 / 02 / 03" numbering from planets and features — they aren't a sequence, they're a set. Where you do have a real sequence (the timeline), numbering is earned there and only there.
- Replace the identical-rounded-card grid for feature panels with varied panel widths and asymmetric grouping — two wide, one tall, not six identical tiles.

### One motion rule
Pick a single orchestrated moment per page as the "wow," not fades-on-every-element. The universe formation sequence is your one non-user-triggered spectacle on the home flow. Everywhere else, motion should respond to what the user does (click, drag, hover) — not play automatically.

---

## PART 2 — The Fluid Cursor Tracker

This is a magnetic, gooey trailing cursor — the physical sensation of "your presence disturbs a living field," which ties directly back to the bioluminescence metaphor instead of being a bolted-on gimmick.

```jsx
// components/FluidCursor.jsx
import { useEffect, useRef } from 'react'

const DOT_COUNT = 12

export default function FluidCursor() {
  const dotsRef = useRef([])
  const mouse = useRef({ x: 0, y: 0 })
  const positions = useRef(
    Array.from({ length: DOT_COUNT }, () => ({ x: 0, y: 0 }))
  )

  useEffect(() => {
    const move = (e) => { mouse.current = { x: e.clientX, y: e.clientY } }
    window.addEventListener('mousemove', move)

    let frame
    const tick = () => {
      let x = mouse.current.x
      let y = mouse.current.y
      positions.current.forEach((p, i) => {
        const ease = 0.35 - i * 0.02 // trailing dots ease progressively slower
        p.x += (x - p.x) * Math.max(ease, 0.08)
        p.y += (y - p.y) * Math.max(ease, 0.08)
        x = p.x; y = p.y
        if (dotsRef.current[i]) {
          dotsRef.current[i].style.transform =
            `translate(${p.x}px, ${p.y}px) scale(${1 - i * 0.06})`
        }
      })
      frame = requestAnimationFrame(tick)
    }
    tick()
    return () => { window.removeEventListener('mousemove', move); cancelAnimationFrame(frame) }
  }, [])

  return (
    <svg className="fixed inset-0 pointer-events-none z-[999] w-full h-full">
      <filter id="goo">
        <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
        <feColorMatrix in="blur" mode="matrix"
          values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -10" />
      </filter>
      <g filter="url(#goo)">
        {Array.from({ length: DOT_COUNT }).map((_, i) => (
          <circle key={i} ref={(el) => (dotsRef.current[i] = el)}
            r={i === 0 ? 7 : 5} fill="#5EEAD4" opacity={1 - i * 0.06} />
        ))}
      </g>
    </svg>
  )
}
```

**What makes this "fluid" rather than a generic trailing-dot cursor:** the SVG `feColorMatrix` goo filter — it's what makes separate circles visually melt into one continuous blob as they get close, instead of looking like a string of beads. That filter is the entire effect; the JS is just staggered easing.

Add cursor state changes on hover — swap the fill to `bio-amber` when hovering a planet, expand `r` slightly when hovering any clickable element. Hide the native cursor (`cursor: none` on `body`) only on desktop; never disable the native cursor on touch devices.

---

## PART 3 — New Standalone Features (beyond the planet universe page)

These are separate routes/sections, not more planets. Each is its own short "chapter" in the storytelling flow, not a settings-style subpage.

### 1. The Constellation Atlas — a dedicated page, not a planet
A full-screen star-map page showing every stat the user has ever logged as a star, connected into constellations by *category*, not chronology. This is different from the Learning planet's mini-constellation — this is the zoomed-out, whole-life view. Users can drag to rotate the star field (OrbitControls, damped) and click a star to see the day/entry it represents.

**Why it earns a separate page:** it's the "look how far you've come" payoff moment — the emotional climax of the storytelling arc, distinct from the day-to-day planet interaction.

### 2. The Signal Log — a scrollable, cinematic journal
Not a CRUD list. Each entry the user has logged renders as a horizontal card that drifts into view on scroll (GSAP ScrollTrigger, one clean parallax layer — background drifts slower than foreground text). This replaces a boring "history" table with something that feels like scrolling through memory.

### 3. Universe Digest — a shareable weekly recap
A single generated screen (not interactive) summarizing the week: stability trend line, one LENS insight, one constellation highlight. Styled to be screenshot-friendly — this is your built-in virality/demo-shareability feature, and it doubles as an easy "wow, that's the whole week in one screen" moment for judges without needing them to explore the full 3D scene.

### 4. Identity Core — profile & calibration, not a "settings" page
Where the user adjusts their baseline sliders (from onboarding) and renames their universe. Frame it as "recalibrating your core" rather than a form — same slider-based interaction as onboarding, reused rather than rebuilt, so users already know how to use it.

---

## PART 4 — Making It Actually Storytelling (site-wide, not just the landing)

Right now "storytelling" only applies to the first 60 seconds. Extend the same scroll-driven chapter structure across the whole site:

```
CHAPTER 0 — The Signal (boot sequence, landing)
CHAPTER 1 — Your Universe Forms (onboarding → birth)
CHAPTER 2 — Explore (the planet universe — main interactive body)
CHAPTER 3 — Look Back (Signal Log)
CHAPTER 4 — See the Whole Picture (Constellation Atlas)
CHAPTER 5 — This Week (Universe Digest)
```

Each chapter transition uses a consistent visual grammar: camera pulls back to a wide starfield view, a single line of Fraunces serif type states the chapter name, then pushes into the new scene. Reusing one transition motif across all five chapter changes is what makes it read as an authored story rather than five separate pages stapled together — variety in the transition itself would undercut the "one continuous universe" premise the whole product is built on.
# LifeLens — Premium Look: Full Implementation

Drop-in code for everything covered: fonts, palette, the eyebrow/arrow/radius/accent fixes, warm off-white text, and grain texture. Organized by file — copy each block into the matching path.

---

## 1. Fonts — `index.html`

Fraunces and Switzer both need loading. Fraunces is on Google Fonts; Switzer is Fontshare (not on Google Fonts), so it needs its own `<link>`.

```html
<!-- index.html, inside <head> -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300..600&display=swap" rel="stylesheet">
<link href="https://api.fontshare.com/v2/css?f[]=switzer@400,500,600,700&display=swap" rel="stylesheet">
```

---

## 2. Tailwind Config — `tailwind.config.js`

```js
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        abyss: '#090D14',
        panel: '#121A24',
        'text-warm': '#F3F0E8',
        'bio-teal': '#5EEAD4',
        'bio-amber': '#E8A669',
        line: '#243040',
      },
      fontFamily: {
        display: ['"Fraunces"', 'serif'],
        body: ['"Switzer"', 'sans-serif'],
      },
      fontOpticalSizing: {
        display: 'auto',
      },
    },
  },
  plugins: [],
}
```

---

## 3. Global Styles — `styles/globals.css`

Includes the base type setup, the grain texture overlay, and the fix for cramped headline line-height / letter-spacing.

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  background: #090D14;
  color: #F3F0E8;
  font-family: 'Switzer', sans-serif;
  -webkit-font-smoothing: antialiased;
}

.font-display {
  font-family: 'Fraunces', serif;
  font-optical-sizing: auto;
  font-weight: 420;
  line-height: 1.15;      /* was too tight before — more breathing room */
  letter-spacing: -0.01em; /* slightly tightened tracking to read confident, not loose */
}

/* Grain texture overlay — sits above the background, below content */
.grain-overlay {
  position: fixed;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  opacity: 0.03;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  mix-blend-mode: overlay;
}
```

Mount the grain once at the app root:

```jsx
// App.jsx
<div className="grain-overlay" />
```

---

## 4. The Fixed Hero — `components/Hero.jsx`

This directly fixes the five issues flagged in the screenshot: no eyebrow pill, no arrow on CTA, varied border-radius by hierarchy, accent clustered instead of orphaned, warm off-white text.

```jsx
export default function Hero({ onEnterUniverse, onCalibrate }) {
  return (
    <section className="relative z-10 max-w-5xl px-8 pt-24">
      {/* Eyebrow pill removed entirely — headline stands alone */}

      <h1 className="font-display text-warm text-6xl md:text-7xl">
        Observe your life as a{' '}
        <span className="relative inline-block">
          living, reacting
          {/* accent now clustered: underline + icon dot together, not a lone stray dot */}
          <svg className="absolute -bottom-2 left-0 w-full" height="6" viewBox="0 0 100 6" preserveAspectRatio="none">
            <path d="M0,3 Q50,0 100,3" stroke="#5EEAD4" strokeWidth="2" fill="none" opacity="0.7" />
          </svg>
        </span>{' '}
        universe.
      </h1>

      <p className="mt-8 max-w-xl text-lg text-text-warm/70 font-body leading-relaxed">
        Map focus blocks, digital screen consumption, health vitality, and goal
        horizons into a dynamic 3D <span className="text-bio-teal">bioluminescent mesh</span> that
        pulses with your behavior.
      </p>

      <div className="mt-10 flex items-center gap-4">
        {/* Primary CTA: sharp corners, filled — signals "this is the one action that matters" */}
        <button
          onClick={onEnterUniverse}
          className="rounded-md bg-bio-teal text-abyss font-body font-semibold px-6 py-3
                     hover:bg-bio-teal/90 transition-colors"
        >
          Enter 3D Universe
        </button>

        {/* Secondary: soft rounded, outlined — visually subordinate, no arrow */}
        <button
          onClick={onCalibrate}
          className="rounded-full border border-line text-text-warm/80 font-body px-6 py-3
                     hover:border-bio-teal/50 hover:text-text-warm transition-colors"
        >
          Calibrate Signals
        </button>
      </div>
    </section>
  )
}
```

---

## 5. The Fixed Nav — `components/Navbar.jsx`

Chapter nav kept (it's a real sequence, so numbering is earned here — unlike the old "01/02" planet labels). Sharpened spacing and swapped the pill-everywhere look for a single active-state underline instead of a filled pill, which reads calmer and more premium.

```jsx
const chapters = [
  { id: 0, label: 'Signal' },
  { id: 1, label: 'Calibration' },
  { id: 2, label: '3D Universe' },
  { id: 3, label: 'Signal Log' },
  { id: 4, label: 'Atlas' },
  { id: 5, label: 'Digest' },
]

export default function Navbar({ active, onNavigate, lensOn, onToggleLens }) {
  return (
    <nav className="flex items-center justify-between px-8 py-4 border-b border-line/50">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-panel border border-line flex items-center justify-center">
          <span className="text-bio-teal text-xs">◉</span>
        </div>
        <div>
          <p className="font-display text-text-warm text-sm leading-none">LifeLens</p>
          <p className="text-text-warm/40 text-[11px] font-body">Bioluminescent Observatory</p>
        </div>
      </div>

      <div className="flex items-center gap-6">
        {chapters.map((c) => (
          <button
            key={c.id}
            onClick={() => onNavigate(c.id)}
            className={`font-body text-sm pb-1 border-b-2 transition-colors ${
              active === c.id
                ? 'text-text-warm border-bio-teal'
                : 'text-text-warm/40 border-transparent hover:text-text-warm/70'
            }`}
          >
            Ch {c.id}: {c.label}
          </button>
        ))}
      </div>

      <button
        onClick={onToggleLens}
        className="rounded-full border border-line px-4 py-2 text-sm font-body text-text-warm/70
                   hover:border-bio-teal/50 transition-colors"
      >
        LENS {lensOn ? 'On' : 'Off'}
      </button>
    </nav>
  )
}
```

---

## 6. Reusable Button Variants — `components/ui/Button.jsx`

Centralizes the radius-by-hierarchy rule so it's consistent everywhere, not just the hero.

```jsx
export function ButtonPrimary({ children, ...props }) {
  return (
    <button {...props}
      className="rounded-md bg-bio-teal text-abyss font-body font-semibold px-6 py-3
                 hover:bg-bio-teal/90 transition-colors">
      {children}
    </button>
  )
}

export function ButtonSecondary({ children, ...props }) {
  return (
    <button {...props}
      className="rounded-full border border-line text-text-warm/80 font-body px-6 py-3
                 hover:border-bio-teal/50 hover:text-text-warm transition-colors">
      {children}
    </button>
  )
}
```

---

## Checklist — what changed vs. the screenshot

- [x] Eyebrow pill above headline — removed
- [x] Arrow on primary CTA — removed, copy states the action directly
- [x] Uniform pill radius everywhere — primary is now sharp `rounded-md`, secondary stays `rounded-full`
- [x] Orphaned accent dot — replaced with a clustered underline + inline color on "bioluminescent mesh"
- [x] Generic system serif — swapped to Fraunces with tuned optical sizing and weight
- [x] Pure white text — swapped to `#F3F0E8` warm off-white throughout
- [x] Flat background — grain overlay added at 3% opacity via `mix-blend-mode: overlay`
- [x] Cramped headline — line-height raised to 1.15, tracking tightened slightly