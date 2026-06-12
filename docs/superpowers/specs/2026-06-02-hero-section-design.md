# Hero Section — Design Spec
**Date:** 2026-06-02  
**Status:** Approved

## Objective
Establish the CJ Studio landing page hero: Plus Jakarta Sans typography loaded globally, an Aceternity-style animated Aurora background in brand colours, the CJ Studio logo centred at full-screen, and a Framer Motion CTA routing to `/work`.

## Files Changed

| File | Action |
|------|--------|
| `app/layout.tsx` | Replace Geist fonts with Plus Jakarta Sans |
| `app/globals.css` | Add `@keyframes aurora`, `@theme` animation token, remove old aurora CSS |
| `components/aurora-background.tsx` | New component (Aceternity pattern) |
| `app/page.tsx` | Replace full-page structure with AuroraBackground hero |

## 1. Typography — `app/layout.tsx`
- Import `Plus_Jakarta_Sans` from `next/font/google`
- Config: `subsets: ["latin"]`, `variable: "--font-plus-jakarta-sans"`
- Remove `Geist` and `Geist_Mono` entirely
- Apply `fontSans.variable` to `<html>` className

## 2. Aurora Animation — `app/globals.css`
Add to `@theme`:
```css
--animate-aurora: aurora 60s linear infinite;
```
Add keyframe:
```css
@keyframes aurora {
  from { background-position: 50% 50%, 50% 50%; }
  to   { background-position: 350% 50%, 350% 50%; }
}
```
Remove existing `.aurora` and `.aurora-animate` rules (replaced by component).

## 3. Aurora Background Component — `components/aurora-background.tsx`
- `"use client"` component accepting `children: ReactNode` and optional `className`
- Outer: `relative flex flex-col min-h-screen bg-white items-center justify-center overflow-hidden`
- Aurora layer: `absolute -inset-[10px] opacity-50 will-change-transform animate-aurora`
  - `background-image`: `repeating-linear-gradient(100deg, #ec4899 10%, #8b5cf6 15%, #3b82f6 20%, #10b981 25%, #ec4899 30%)`
  - `background-size: 300% 200%`
  - `filter: blur(10px)` + `invert` for white-bg glow
  - `after:` pseudo-element: same gradient, `mix-blend-difference`, `background-attachment: fixed`
- Children rendered in `relative z-10`

## 4. Hero Assembly — `app/page.tsx`
- Wraps everything in `<AuroraBackground>`
- `<Image src="/cj-studio-logo.png" width={384} height={150} priority alt="CJ Studio" className="w-72 md:w-96 h-auto" />`
  - `height` is approximate; `h-auto` + `width/height` props preserve aspect ratio
- `MotionLink = motion.create(Link)` from `motion/react` + `next/link`
- Button: `px-8 py-3 rounded-full bg-slate-900 text-white text-sm font-medium tracking-tight`
- Entrance: `initial={{ opacity: 0, y: 16 }}` → `animate={{ opacity: 1, y: 0 }}`, `transition={{ delay: 0.4, duration: 0.6 }}`
- Hover: `whileHover={{ scale: 1.04 }}`

## Constraints
- No Nav, Footer, or other sections on this page — hero only per scope
- `motion.create(Link)` not `motion(Link)` — uses `motion` v12 API
- Tailwind v4 — `@theme` for animation tokens, not `tailwind.config.js`
- Logo at `/public/cj-studio-logo.png` ✓ (copied from `Downloads/1.png`)
