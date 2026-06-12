# WebsiteAssembly 3D Prism Scene Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refactor `WebsiteAssembly` to add a foreground layer of 4 CSS glass prism objects that fall into frame on scroll, in front of the existing browser mock.

**Architecture:** Single-file refactor of `components/website-assembly.tsx`. New `useTransform` hooks drive 4 glass objects (triangular prism, tall rectangle, small cube, sphere) and a rainbow light overlay. A scene-scale transform wraps all content to simulate a cinematic zoom. Objects are `pointer-events-none`, hidden on mobile, and rendered at final position when `useReducedMotion` is active.

**Tech Stack:** Next.js 16 App Router · TypeScript · Tailwind CSS v4 · motion/react

---

## File Map

| File | Change |
|------|--------|
| `components/website-assembly.tsx` | Add 10 new `useTransform` hooks, update container structure, add foreground glass layer |

---

### Task 1: Add prism animation transform hooks

**Files:**
- Modify: `components/website-assembly.tsx`

- [ ] **Step 1: Add the 10 new `useTransform` hooks** after the existing `labelY` hook (line 59). Paste this block immediately after `const labelY = useTransform(...)`:

```typescript
  // ── Glass prism objects ───────────────────────────────────────────────────
  // Triangular prism — drops first, brand hero
  const triY       = useTransform(scrollYProgress, [0.18, 0.46], [-280, 0]);
  const triRotate  = useTransform(scrollYProgress, [0.18, 0.46], [-8, 0]);
  const triOpacity = useTransform(scrollYProgress, [0.18, 0.30], [0, 1]);

  // Tall rectangle
  const rectY       = useTransform(scrollYProgress, [0.28, 0.54], [-320, 0]);
  const rectRotate  = useTransform(scrollYProgress, [0.28, 0.54], [5, 0]);
  const rectOpacity = useTransform(scrollYProgress, [0.28, 0.40], [0, 1]);

  // Small cube
  const cubeY       = useTransform(scrollYProgress, [0.34, 0.58], [-240, 0]);
  const cubeRotate  = useTransform(scrollYProgress, [0.34, 0.58], [-3, 0]);
  const cubeOpacity = useTransform(scrollYProgress, [0.34, 0.46], [0, 1]);

  // Sphere
  const sphereY       = useTransform(scrollYProgress, [0.40, 0.64], [-260, 0]);
  const sphereOpacity = useTransform(scrollYProgress, [0.40, 0.52], [0, 1]);

  // Rainbow light + scene zoom
  const rainbowOpacity = useTransform(scrollYProgress, [0.50, 0.80], [0, 1]);
  const sceneScale     = useTransform(scrollYProgress, [0.60, 0.90], [1, 1.06]);
```

- [ ] **Step 2: Verify TypeScript compiles**

```powershell
cd C:\Users\ollie\cj-studio
npx tsc --noEmit
```

Expected: no errors (hooks are valid `useTransform` calls, types inferred automatically).

- [ ] **Step 3: Commit**

```powershell
git add components/website-assembly.tsx
git commit -m "feat(website-assembly): add prism + scene-scale transform hooks"
```

---

### Task 2: Update container structure

**Files:**
- Modify: `components/website-assembly.tsx`

- [ ] **Step 1: Add `overflow-x-hidden` to the 280vh wrapper div and `perspective` to the sticky div**

Replace:
```tsx
    <div ref={containerRef} className="relative h-[280vh]">
      {/* Sticky viewport */}
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
```

With:
```tsx
    <div ref={containerRef} className="relative h-[280vh] overflow-x-hidden">
      {/* Sticky viewport */}
      <div
        className="sticky top-0 h-screen flex items-center justify-center overflow-hidden"
        style={{ perspective: "1000px", transformStyle: "preserve-3d" }}
      >
```

- [ ] **Step 2: Wrap all children of the sticky div in a `motion.div` with `sceneScale`**

Immediately after the opening sticky `<div>` tag, add an opening `motion.div`:

```tsx
        <motion.div
          style={reduce ? {} : { scale: sceneScale }}
          className="relative w-full h-full flex items-center justify-center"
        >
```

Then close it just before the closing `</div>` of the sticky div (after the scroll-hint `motion.div`):

```tsx
        </motion.div>   {/* end sceneScale wrapper */}
```

The sticky div's children should now be ordered:
1. Section label `motion.div` (z-20)
2. Browser chrome `motion.div` (z-0 — add `className="relative z-0 ..."` to existing)
3. *(foreground prisms — Task 3)*
4. Scroll hint `motion.div` (z-20)

- [ ] **Step 3: Add `aria-label` to the new scale wrapper (remove from browser chrome if present)**

The browser chrome `motion.div` currently has `aria-label="Website assembly animation"`. Move it to the new outer `motion.div`:

```tsx
        <motion.div
          style={reduce ? {} : { scale: sceneScale }}
          className="relative w-full h-full flex items-center justify-center"
          aria-label="Website assembly animation"
        >
```

Remove `aria-label` from the browser chrome `motion.div`.

- [ ] **Step 4: Verify TypeScript compiles**

```powershell
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 5: Commit**

```powershell
git add components/website-assembly.tsx
git commit -m "feat(website-assembly): add perspective container + scene-scale wrapper"
```

---

### Task 3: Add foreground glass prism layer

**Files:**
- Modify: `components/website-assembly.tsx`

- [ ] **Step 1: Add the foreground layer div + triangular prism**

After the closing tag of the browser chrome `motion.div` (and before the scroll-hint), insert:

```tsx
          {/* ── FOREGROUND GLASS OBJECTS ── hidden on mobile, pointer-events-none */}
          <div className="absolute inset-0 z-10 pointer-events-none hidden md:block">

            {/* Triangular prism — hero, drops first, centre */}
            <motion.div
              style={reduce ? {} : { y: triY, rotate: triRotate, opacity: triOpacity }}
              className="absolute left-1/2 bottom-[22%] -translate-x-1/2"
            >
              <svg width="90" height="99" viewBox="0 0 100 110" fill="none" aria-hidden="true">
                <defs>
                  <linearGradient id="triGrad" x1="0" y1="0" x2="100" y2="87" gradientUnits="userSpaceOnUse">
                    <stop offset="0%"   stopColor="#f472b6" stopOpacity="0.55" />
                    <stop offset="50%"  stopColor="#a78bfa" stopOpacity="0.55" />
                    <stop offset="100%" stopColor="#60a5fa" stopOpacity="0.55" />
                  </linearGradient>
                </defs>
                <polygon
                  points="50,4 96,87 4,87"
                  fill="url(#triGrad)"
                  stroke="rgba(255,255,255,0.6)"
                  strokeWidth="1.5"
                />
                <polygon points="50,30 72,72 28,72" fill="rgba(255,255,255,0.35)" />
              </svg>
            </motion.div>
```

- [ ] **Step 2: Add tall rectangle**

Immediately after the triangular prism closing `</motion.div>`:

```tsx
            {/* Tall rectangle — left-centre */}
            <motion.div
              style={reduce ? {} : { y: rectY, rotate: rectRotate, opacity: rectOpacity }}
              className="absolute left-[29%] bottom-[28%]"
            >
              <div
                className="w-9 rounded-md border backdrop-blur-md"
                style={{
                  height: "72px",
                  background: "linear-gradient(160deg, rgba(196,181,253,0.4), rgba(147,197,253,0.35))",
                  borderColor: "rgba(255,255,255,0.55)",
                  boxShadow: "0 4px 20px rgba(167,139,250,0.2)",
                }}
              />
            </motion.div>
```

- [ ] **Step 3: Add small cube**

```tsx
            {/* Small cube — far left */}
            <motion.div
              style={reduce ? {} : { y: cubeY, rotate: cubeRotate, opacity: cubeOpacity }}
              className="absolute left-[19%] bottom-[28%]"
            >
              <div
                className="w-8 h-8 rounded border backdrop-blur-md"
                style={{
                  background: "linear-gradient(135deg, rgba(110,231,183,0.4), rgba(96,165,250,0.35))",
                  borderColor: "rgba(255,255,255,0.55)",
                }}
              />
            </motion.div>
```

- [ ] **Step 4: Add sphere**

```tsx
            {/* Sphere — right */}
            <motion.div
              style={reduce ? {} : { y: sphereY, opacity: sphereOpacity }}
              className="absolute right-[23%] bottom-[27%]"
            >
              <div
                className="w-11 h-11 rounded-full border"
                style={{
                  background: "radial-gradient(circle at 35% 35%, rgba(253,164,175,0.6), rgba(196,181,253,0.35) 60%, rgba(147,197,253,0.2))",
                  borderColor: "rgba(255,255,255,0.6)",
                  boxShadow: "0 4px 20px rgba(253,164,175,0.25)",
                }}
              />
            </motion.div>
```

- [ ] **Step 5: Add rainbow light overlay and close the foreground div**

```tsx
            {/* Rainbow light — fades in as objects land */}
            <motion.div
              style={reduce ? {} : { opacity: rainbowOpacity }}
              className="absolute bottom-0 left-0 right-0 h-[32%]"
              aria-hidden="true"
              // inline style needed for multi-stop radial gradient
              {...{
                style: {
                  ...(reduce ? {} : { opacity: rainbowOpacity as unknown as number }),
                  background: [
                    "radial-gradient(ellipse at 30% 100%, rgba(253,164,175,0.22) 0%, transparent 50%)",
                    "radial-gradient(ellipse at 52% 100%, rgba(196,181,253,0.18) 0%, transparent 45%)",
                    "radial-gradient(ellipse at 74% 100%, rgba(147,197,253,0.15) 0%, transparent 40%)",
                  ].join(", "),
                },
              }}
            />

          </div>{/* end foreground glass objects */}
```

> **Note on the rainbow div:** `motion.div` does not accept both `style` prop and spread `style` simultaneously. Use a single `style` object that merges the MotionValue opacity with the background string:

Replace the above with this cleaner pattern:

```tsx
            {/* Rainbow light — fades in as objects land */}
            <motion.div
              style={
                reduce
                  ? {
                      background: [
                        "radial-gradient(ellipse at 30% 100%, rgba(253,164,175,0.22) 0%, transparent 50%)",
                        "radial-gradient(ellipse at 52% 100%, rgba(196,181,253,0.18) 0%, transparent 45%)",
                        "radial-gradient(ellipse at 74% 100%, rgba(147,197,253,0.15) 0%, transparent 40%)",
                      ].join(", "),
                    }
                  : {
                      opacity: rainbowOpacity,
                      background: [
                        "radial-gradient(ellipse at 30% 100%, rgba(253,164,175,0.22) 0%, transparent 50%)",
                        "radial-gradient(ellipse at 52% 100%, rgba(196,181,253,0.18) 0%, transparent 45%)",
                        "radial-gradient(ellipse at 74% 100%, rgba(147,197,253,0.15) 0%, transparent 40%)",
                      ].join(", "),
                    }
              }
              className="absolute bottom-0 left-0 right-0 h-[32%]"
              aria-hidden="true"
            />

          </div>{/* end foreground glass objects */}
```

- [ ] **Step 6: Verify TypeScript compiles**

```powershell
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 7: Commit**

```powershell
git add components/website-assembly.tsx
git commit -m "feat(website-assembly): add foreground glass prism objects with scroll animation"
```

---

### Task 4: Visual verification

**Files:**
- Read: `components/website-assembly.tsx` (verify final state)

- [ ] **Step 1: Start dev server**

```powershell
cd C:\Users\ollie\cj-studio
npm run dev
```

Open `http://localhost:3000` in the browser.

- [ ] **Step 2: Verify scroll animation — desktop (≥768px viewport)**

Scroll slowly through the homepage past the WebsiteAssembly section. Check:
- [ ] Section label ("How we work") visible at top, fades out as scroll begins
- [ ] Browser mock fades and scales in as before
- [ ] Triangular prism drops in first (centre, slight left-tilt)
- [ ] Tall rectangle drops shortly after (left-centre)
- [ ] Small cube drops next (far left)
- [ ] Sphere drops last (right)
- [ ] Rainbow light gradient fades in at the bottom as all objects settle
- [ ] Entire scene subtly zooms in toward the end of the scroll
- [ ] No horizontal scrollbar at any scroll position

- [ ] **Step 3: Verify reduced motion**

In browser DevTools → Rendering panel → check "Emulate CSS media feature prefers-reduced-motion". Reload and scroll. Check:
- [ ] All 4 objects visible immediately in their resting positions
- [ ] Browser mock visible at full opacity/scale immediately
- [ ] Rainbow light visible immediately
- [ ] No layout shift or invisible content

- [ ] **Step 4: Verify mobile (below 768px)**

Resize browser to 375px width. Check:
- [ ] Glass objects are hidden (`hidden md:block` means they don't render below md breakpoint)
- [ ] Browser mock still animates normally
- [ ] No horizontal overflow

- [ ] **Step 5: Final commit**

```powershell
git add components/website-assembly.tsx
git commit -m "feat(website-assembly): 3D prism scene complete — glass objects fall on scroll"
```
