# WebsiteAssembly — 3D Prism Scene Design

**Date:** 2026-05-31  
**Status:** Approved  
**File:** `components/website-assembly.tsx`

---

## Overview

Refactor the existing `WebsiteAssembly` scroll-driven animation to add a foreground layer of CSS glass prism objects that fall into frame as the user scrolls. The existing browser mock remains as the background "monitor". Objects are front-facing (not angled/perspective camera). All animation is scroll-driven via `motion/react` `useScroll` + `useTransform`.

---

## Scene Structure

Two layers inside the existing sticky viewport:

### Background — Browser Mock
- The existing browser chrome and website content, scaled to ~85% width
- Acts as the "monitor" seen in the reference video
- Fades in and scales up exactly as today (no changes to existing logic)

### Foreground — Glass Prism Objects
Four CSS glass objects positioned in front of the browser mock. Listed left to right in final resting position:

| Object | Shape | Position | Glass colour |
|--------|-------|----------|--------------|
| Small cube | 30×30px square div | Far left, bottom-third | Mint → sky (`#6ee7b7` → `#93c5fd`) |
| Tall rectangle | 36×72px rect div | Left-centre, bottom-third | Lavender → sky (`#c4b5fd` → `#93c5fd`) |
| Triangular prism | SVG polygon, 80px | Centre, slightly lower | Brand gradient: rose → lavender → sky |
| Sphere | 44×44px circle div | Right-centre, bottom-third | Rose → lavender → sky radial |

All objects use: `backdrop-blur-md`, semi-transparent gradient backgrounds (~40–55% opacity), `border border-white/55`, soft coloured box-shadow.

### Rainbow Light
A `position:absolute` gradient overlay at the bottom of the sticky container. Fades in as objects land. Uses radial gradients in rose, lavender, and sky to simulate prismatic light on a surface.

---

## Animation Sequence

Scroll container: `280vh` (unchanged). All values mapped to `scrollYProgress` [0, 1]:

```
0.00 → 0.08   Section label visible ("How we work" / "Every site, built from scratch.")
0.05 → 0.22   Browser mock fades in + scales up (unchanged from today)
0.18 → 0.46   Triangular prism drops  — y: -280px → 0, rotateZ: -8deg → 0deg, opacity: 0 → 1
0.28 → 0.54   Tall rectangle drops    — y: -320px → 0, rotateZ:  5deg → 0deg, opacity: 0 → 1
0.34 → 0.58   Small cube drops        — y: -240px → 0, rotateZ: -3deg → 0deg, opacity: 0 → 1
0.40 → 0.64   Sphere drops            — y: -260px → 0, rotateZ:  0deg,        opacity: 0 → 1
0.50 → 0.80   Rainbow light overlay   — opacity: 0 → 1
0.60 → 0.90   Scene scale up          — scale: 1.0 → 1.06 (zoom-in feel)
0.80 → 1.00   Hold final state
```

Triangular prism drops first (brand hero). Each subsequent object is staggered ~0.08–0.10 scroll units later. No bounce physics — pure linear/ease transforms via `useTransform`.

---

## Glass Styling

### Triangular prism (SVG)
```
fill: linear-gradient(brand) at 55% opacity
inner cutout: white polygon at 35% opacity
stroke: rgba(255,255,255,0.6), 1.5px
drop-shadow-xl
```

### Tall rectangle
```
background: linear-gradient(160deg, rgba(196,181,253,0.4), rgba(147,197,253,0.35))
border: 1px solid rgba(255,255,255,0.55)
border-radius: 6px
backdrop-filter: blur(8px)
box-shadow: 0 4px 20px rgba(167,139,250,0.2)
```

### Sphere
```
background: radial-gradient(circle at 35% 35%, rgba(253,164,175,0.6), rgba(196,181,253,0.35) 60%, rgba(147,197,253,0.2))
border: 1px solid rgba(255,255,255,0.6)
border-radius: 50%
box-shadow: 0 4px 20px rgba(253,164,175,0.25)
```

### Small cube
```
background: linear-gradient(135deg, rgba(110,231,183,0.4), rgba(96,165,250,0.35))
border: 1px solid rgba(255,255,255,0.55)
border-radius: 4px
backdrop-filter: blur(8px)
```

---

## Reduced Motion Fallback

When `useReducedMotion()` returns true:
- All 4 objects render immediately in their final resting positions (no transforms)
- Browser mock renders at full opacity and scale immediately
- Rainbow light overlay renders at full opacity immediately
- Zero animation, zero JS transform overhead

---

## Constraints

- `"use client"` at top of file
- All imports from `motion/react` (not `framer-motion`)
- Single `useScroll` call on `containerRef` (the 280vh wrapper)
- All `motion.div` style props gated on `reduce ? {} : { ...transforms }`
- No Canvas, no image sequences, no third-party animation libraries
- Tailwind v4 utility classes only — no arbitrary CSS files

---

## What Is Not Changing

- The 280vh scroll container height
- The sticky viewport setup
- The existing browser mock content (nav, hero, cards, footer) — untouched
- The section label ("How we work") animation
- The `frameScale`, `frameOpacity`, `frameShadow` browser frame transforms
