# LifeLens — Bioluminescent 3D Human Analytics Engine

> **Observe your life as a living, reacting universe.**  
> LifeLens transforms raw human signals—focus blocks, digital screen consumption, physical vitality, learning momentum, and strategic goal vectors—into a real-time, interactive 3D WebGL planetary ecosystem.

---

## Features Across 6 Interactive Storytelling Chapters

### Chapter 0 — The Signal
* **Terminal Boot Sequence**: Monospace boot diagnostics (`LIFELENS OS v2.5`) with blinking block cursor and sentence-case signal initialization.
* **Serif Hero Storytelling**: Fraunces display typography paired with Fontshare's Switzer sans-serif, warm off-white text (`#F3F0E8`), and clustered teal wave underlines.

### Chapter 1 — Signal Calibration
* **System Stability Engine**: Real-time calculation of overall system equilibrium (0–99%) based on positive domain drivers vs. digital noise penalty.
* **Simulation Presets**: Instantly trigger presets (*High Focus Flow*, *Digital Over-Orbit*, *Strategic Goal Surge*, *Circadian Peak*) or manually calibrate domain sliders.

### Chapter 2 — 3D WebGL Universe
* **Dynamic Life Core**: Center glowing icosahedron that scales, wobbles, and morphs into a wireframe warning when stability drops below threshold.
* **Data-Driven Orbits**: 6 planetary domains orbiting the center with emissive atmosphere shells, 3D HTML labels (`@react-three/drei`), hover scaling, and clickHandlers.
* **Cinematic Camera Flight**: GSAP interpolation smoothly flying camera to focused planets using `power3.inOut` easing.
* **LENS Intelligence Lines**: Renders 3D connecting beams between correlated planets when cross-domain pattern detection is active.
* **Postprocessing Glow**: High-impact **Bloom** (`intensity={0.85}`, `mipmapBlur`) and **Vignette** passes.

### Chapter 3 — The Signal Log
* **Chronological Memory Journal**: Parallax cards tracking focus blocks, recovery windows, and knowledge synthesis entries.
* **Category Filters & Modal**: Filter entries by category (*Focus*, *Digital*, *Learning*, *Vitality*, *Goals*) and log new human reflections inline.

### Chapter 4 — Constellation Atlas
* **Full-Screen 3D Star Sky**: Dedicated Three.js star-map where logged achievements form category-connected constellations.
* **Interactive Star Inspection**: Click stars to view dates, signal values, and reflection notes.

### Chapter 5 — Universe Digest
* **Shareable Weekly Card**: 7-day stability trend curve built with Recharts, peak domain highlights, top LENS directives, and one-click copy to clipboard.

### Dual Fluid Physics Cursor Stack
* **`SplashCursor`**: Real-time WebGL fluid simulation solver with dynamic `RAINBOW_MODE` spectrum splats.
* **`FluidCursor`**: SVG `feColorMatrix` trailing goo filter blending 12 galaxy palette nodes across pointer gestures.

---

## Tech Stack

| Layer | Technologies Used |
|---|---|
| **Framework & UI** | React 18, Vite 5, Zustand, Tailwind CSS |
| **3D & Animation** | Three.js, React Three Fiber (R3F), @react-three/drei, @react-three/postprocessing, GSAP, Framer Motion |
| **Charts & Icons** | Recharts, Lucide React |
| **Typography** | Fraunces (Google Fonts), Switzer (Fontshare) |

---

## Quickstart Guide

### Prerequisites
* **Node.js**: v18.0.0 or higher
* **npm**: v9.0.0 or higher

### Installation & Run

```bash
# 1. Clone the repository
git clone https://github.com/thamizhselvanm-web/LifeLens.git
cd LifeLens

# 2. Install dependencies
npm install

# 3. Launch local dev server
npm run dev
```

Visit `http://localhost:3000/` in your browser.

### Production Build

```bash
npm run build
npm run preview
```

---

## Privacy & Local State

LifeLens processes all human signal physics locally within Zustand state. No private biometrics or screen usage data leaves your local browser session.

---

## License

Created with ❤️ by **[Thamizh Selvan](https://github.com/thamizhselvanm-web)**. Open source under the MIT License.
