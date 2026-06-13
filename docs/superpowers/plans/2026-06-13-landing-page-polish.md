# Landing Page Polish Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix five user-identified issues on the CJ Studio landing page: nav consistency, scroll animation timing, laptop logo overlay, hero image rendering, and horizontal carousel content.

**Architecture:** All changes are isolated to three components — `nav.tsx`, `laptop-zoom.tsx`, and `why-it-matters.tsx`. No new files needed except a note about a future video asset. Each task is independently deployable.

**Tech Stack:** Next.js (App Router), Tailwind CSS, motion/react v12 (Framer Motion successor), TypeScript

---

## File Map

| File | Changes |
|---|---|
| `components/nav.tsx` | Fix text colour so it is always dark when scrolled (white bg) |
| `components/laptop-zoom.tsx` | Tighten animation end keyframes, add logo overlay |
| `components/why-it-matters.tsx` | Rewrite all 3 slides with new copy and stat card layout |

---

### Task 1: Fix Nav Text Consistency

**Problem:** `onLight` prop controls text colour independently of `scrolled` state. When `scrolled=true` the background is white (`bg-white/80`) but if `onLight=false` text is still rendered white — invisible on white. Fix: dark text whenever the nav has a white background.

**Files:**
- Modify: `components/nav.tsx:55-57`

- [ ] **Step 1: Verify the bug**

  Run `npm run dev`, open `http://localhost:3000`, scroll past 24 px. Confirm nav text colour matches background at various scroll positions on both home and inner pages (`/work`, `/services`).

- [ ] **Step 2: Fix text colour logic**

  In `components/nav.tsx` line 55-57, change the className conditional so that `scrolled=true` always forces dark text:

  ```tsx
  className={`relative text-[14px] transition-colors duration-300 py-1 group ${
    scrolled || onLight
      ? "text-gray-500 hover:text-gray-900"
      : "text-white/80 hover:text-white"
  }`}
  ```

- [ ] **Step 3: Verify**

  Hard-refresh. Scroll slowly on home page. Nav text must be readable at every scroll position. Visit `/work` and `/services` — nav must be legible against all section backgrounds.

- [ ] **Step 4: Commit**

  ```bash
  git add components/nav.tsx
  git commit -m "fix: nav text always dark when scrolled (white background)"
  ```

---

### Task 2: Tighten Scroll Animation Timing

**Problem:** Section is `h-[250vh]`. White reveal finishes at 82% scroll progress — leaving ~45 vh of dead scrolling (fully white screen, no visible change) before `WhyItMatters` begins. Fix: push all animation end keyframes to 95% so there is almost no dead scroll.

**Files:**
- Modify: `components/laptop-zoom.tsx:27-39`

- [ ] **Step 1: Observe current dead scroll**

  On `http://localhost:3000`, scroll through the zoom section and count how long the white screen persists before the next section appears. This is the dead zone to eliminate.

- [ ] **Step 2: Adjust animation keyframes**

  In `components/laptop-zoom.tsx`, update the three transforms:

  ```tsx
  // p² acceleration — scale 1→9; frozen at 1 for reduced-motion users
  const scale = useTransform(scrollYProgress, (p) =>
    prefersReducedMotion ? 1 : 1 + p * p * 8
  );

  // Room fades out between 60–95% progress (was 60–84%)
  const roomOpacity = useTransform(scrollYProgress, [0.6, 0.95], [1, 0]);

  // White reveal fades in between 55–95% (was 55–82%)
  const revealOpacity = useTransform(scrollYProgress, [0.55, 0.95], [0, 1]);

  // Nav light threshold adjusted to match (was 0.46)
  useMotionValueEvent(scrollYProgress, "change", (p) => {
    onLightChange(p < 0.42);
  });
  ```

- [ ] **Step 3: Verify**

  Scroll through the zoom section. The white reveal should complete just as the section ends and `WhyItMatters` slides in. No perceptible dead zone. The aurora and `WhyItMatters` first slide should feel continuous.

- [ ] **Step 4: Commit**

  ```bash
  git add components/laptop-zoom.tsx
  git commit -m "fix: eliminate dead scroll after zoom animation completes"
  ```

---

### Task 3: Add CJ Studio Logo on Laptop Screen

**Problem:** The laptop object in `hero-master.png` has no CJ Studio branding visible. The zoom transform-origin is `50% 40%` — the laptop screen centre. A small logo mark placed at that position will zoom with the image and feel embedded in the screen.

**Files:**
- Modify: `components/laptop-zoom.tsx` — add Logo import and overlay element

- [ ] **Step 1: Add Logo import**

  At the top of `components/laptop-zoom.tsx`, add:

  ```tsx
  import Logo from "./logo";
  ```

  (Place after the existing `import Image from "next/image";` line.)

- [ ] **Step 2: Add logo overlay inside the motion div**

  Inside the `<motion.div style={{ scale, opacity: roomOpacity }} ...>` block, after the `<Image ... />` element and the aurora tint div, add:

  ```tsx
  {/* CJ Studio mark centred on laptop screen — zooms with image */}
  <div
    className="pointer-events-none absolute"
    style={{
      top: "38%",
      left: "50%",
      transform: "translateX(-50%)",
    }}
  >
    <Logo variant="mark" height={28} className="opacity-80" />
  </div>
  ```

- [ ] **Step 3: Verify position**

  Open `http://localhost:3000`. The logo mark should appear centred on the laptop screen at rest. As you scroll, it should zoom in with the laptop. Fine-tune `top` value (try 36%–42%) until it sits cleanly on the screen glass area.

- [ ] **Step 4: Adjust if needed**

  If the logo is misaligned, update the `top` percentage. Increments of 1% are enough. When correct, save.

- [ ] **Step 5: Commit**

  ```bash
  git add components/laptop-zoom.tsx
  git commit -m "feat: add CJ Studio logo mark overlay on laptop screen"
  ```

---

### Task 4: Improve Hero Image Rendering Quality

**Problem:** `hero-master.png` (5.1 MB raster) is scaled up to 9× by CSS transform. Browsers apply bilinear interpolation which softens edges at high scale. This is inherent to raster scaling — the long-term fix is a video loop. Short-term: ensure Next.js serves full uncompressed resolution and note the video asset requirement.

**Files:**
- Modify: `components/laptop-zoom.tsx:61-67`
- Note: `public/assets/hero-video.mp4` — **future asset, not yet created**

- [ ] **Step 1: Serve full-resolution image**

  Update the `<Image>` component to disable Next.js compression and set the largest plausible size:

  ```tsx
  <Image
    src="/assets/hero-master.png"
    alt="CJ Creative Studio workspace"
    fill
    priority
    quality={100}
    sizes="100vw"
    className="object-cover"
  />
  ```

- [ ] **Step 2: Verify rendering improvement**

  Reload and scroll to full zoom. The image should be marginally sharper. If the source PNG is already lower resolution than the display, no improvement is visible — this confirms the asset replacement path is needed.

- [ ] **Step 3: Prepare video slot (future asset)**

  Below the `<Image>` in the same motion div, add a commented-out `<video>` slot for when the animation video is ready:

  ```tsx
  {/*
    TODO: Replace hero-master.png with a looping video once the asset is created.
    Drop hero-video.mp4 into public/assets/ and uncomment:

  <video
    autoPlay
    loop
    muted
    playsInline
    className="absolute inset-0 w-full h-full object-cover"
  >
    <source src="/assets/hero-video.mp4" type="video/mp4" />
  </video>
  */}
  ```

- [ ] **Step 4: Commit**

  ```bash
  git add components/laptop-zoom.tsx
  git commit -m "fix: serve hero image at full quality, add video slot for future asset"
  ```

---

### Task 5: Redesign Horizontal Carousel Content

**Problem:** Current slide layout:
- Slide 1: "Your website is the first thing they judge." — correct headline, no description
- Slide 2: "The numbers don't lie" + bullet facts — wrong headline, wrong structure
- Slide 3: "See our work ↓" buffer — should be the research stats

New layout (user spec):
- Slide 1: Same headline + short description paragraph below
- Slide 2: "It's your digital first impression." (same h2 style) + description
- Slide 3: Research stats as large-number stat cards

**Files:**
- Modify: `components/why-it-matters.tsx` — full content rewrite, `facts` array stays

- [ ] **Step 1: Add description to Slide 1**

  In `why-it-matters.tsx`, after the closing `</h2>` tag on line 82, replace the existing "Keep scrolling" block (lines 84–97) with:

  ```tsx
  <p
    style={{
      fontFamily: "var(--font-space-grotesk), sans-serif",
      fontSize: "clamp(15px, 1.5vw, 18px)",
      lineHeight: 1.7,
      color: "rgba(12,14,20,0.55)",
      maxWidth: "44ch",
      margin: "clamp(20px,3vw,32px) 0 0",
    }}
  >
    Before you speak a single word, your site has already made an
    introduction. Visitors form an opinion in as little as 0.05 seconds
    — and that impression shapes everything that follows.
  </p>
  ```

- [ ] **Step 2: Rewrite Slide 2**

  Replace the entire Slide 2 block (lines 100–152) with:

  ```tsx
  {/* Slide 2 — digital first impression */}
  <div className={prefersReducedMotion
    ? "w-full py-20 flex flex-col justify-center px-[clamp(24px,8vw,120px)]"
    : "w-screen h-screen flex flex-col justify-center px-[clamp(24px,8vw,120px)]"
  }>
    <span
      className="mb-8 uppercase"
      style={{
        fontFamily: "var(--font-jetbrains-mono), monospace",
        fontSize: 11,
        letterSpacing: "0.30em",
        color: "rgba(12,14,20,0.38)",
      }}
    >
      Why it matters
    </span>

    <h2
      style={{
        fontFamily: "var(--font-space-grotesk), sans-serif",
        fontWeight: 700,
        fontSize: "clamp(2.5rem, 6vw, 5rem)",
        lineHeight: 1.05,
        letterSpacing: "-0.03em",
        maxWidth: "22ch",
        color: "#0c0e14",
        margin: 0,
      }}
    >
      It&apos;s your digital{" "}
      <span
        style={{
          background:
            "linear-gradient(90deg, #8a6cff, #4d7cff 52%, #27d7c4)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        first impression.
      </span>
    </h2>

    <p
      style={{
        fontFamily: "var(--font-space-grotesk), sans-serif",
        fontSize: "clamp(15px, 1.5vw, 18px)",
        lineHeight: 1.7,
        color: "rgba(12,14,20,0.55)",
        maxWidth: "44ch",
        margin: "clamp(20px,3vw,32px) 0 0",
      }}
    >
      A poor first impression is nearly impossible to recover from. Your
      website isn&apos;t just a digital brochure — it&apos;s your most
      powerful sales tool, working around the clock.
    </p>
  </div>
  ```

- [ ] **Step 3: Rewrite Slide 3 as research stats**

  Replace the Slide 3 buffer block (lines 154–177) with:

  ```tsx
  {/* Slide 3 — research stats */}
  <div className={prefersReducedMotion
    ? "w-full py-20 flex flex-col justify-center px-[clamp(24px,8vw,120px)]"
    : "w-screen h-screen flex flex-col justify-center px-[clamp(24px,8vw,120px)]"
  }>
    <span
      className="mb-10 uppercase"
      style={{
        fontFamily: "var(--font-jetbrains-mono), monospace",
        fontSize: 11,
        letterSpacing: "0.30em",
        color: "rgba(12,14,20,0.38)",
      }}
    >
      The research
    </span>

    <div className="grid grid-cols-2 gap-x-[clamp(32px,6vw,80px)] gap-y-[clamp(28px,4vw,48px)] max-w-[680px]">
      {[
        { stat: "75%",   label: "of users judge brand credibility by website design alone" },
        { stat: "0.05s", label: "is all it takes for visitors to form a lasting first impression" },
        { stat: "38%",   label: "of users abandon a site if the layout is unattractive" },
        { stat: "200%",  label: "potential uplift in conversions from professional web design" },
      ].map(({ stat, label }) => (
        <div key={stat}>
          <div
            style={{
              fontFamily: "var(--font-space-grotesk), sans-serif",
              fontWeight: 700,
              fontSize: "clamp(2rem, 4.5vw, 3.5rem)",
              lineHeight: 1,
              letterSpacing: "-0.03em",
              background: "linear-gradient(90deg, #8a6cff, #4d7cff 52%, #27d7c4)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {stat}
          </div>
          <p
            style={{
              fontFamily: "var(--font-space-grotesk), sans-serif",
              fontSize: "clamp(13px, 1.2vw, 15px)",
              lineHeight: 1.5,
              color: "rgba(12,14,20,0.55)",
              marginTop: 8,
              maxWidth: "22ch",
            }}
          >
            {label}
          </p>
        </div>
      ))}
    </div>
  </div>
  ```

- [ ] **Step 4: Remove the now-unused `facts` array**

  Delete lines 6–11 at the top of `why-it-matters.tsx` (the `const facts = [...]` array). The stats are now inline in the component.

- [ ] **Step 5: Verify carousel**

  Open `http://localhost:3000`, scroll into the `WhyItMatters` section. Verify:
  - Slide 1: headline + description paragraph visible, no "Keep scrolling" indicator
  - Slide 2: "It's your digital first impression." with gradient, description below, same heading size as slide 1
  - Slide 3: 2×2 grid of stat cards with gradient numbers

- [ ] **Step 6: Check reduced-motion fallback**

  In browser devtools → Rendering → Emulate CSS media feature `prefers-reduced-motion: reduce`. Verify all 3 slides stack vertically with correct content.

- [ ] **Step 7: Commit**

  ```bash
  git add components/why-it-matters.tsx
  git commit -m "feat: redesign carousel — 3 content slides with copy, impressions, and research stats"
  ```

---

## Self-Review

**Spec coverage:**
- ✅ Banner text inconsistency → Task 1
- ✅ Scroll animation too long → Task 2
- ✅ Laptop logo missing → Task 3
- ✅ Hero image blurry → Task 4 (interim fix + video slot)
- ✅ Carousel slide 1 — headline + description → Task 5 Step 1
- ✅ Carousel slide 2 — "It's your digital first impression" → Task 5 Step 2
- ✅ Carousel slide 3 — research stats → Task 5 Step 3

**Asset dependency (not blocking):** A proper hero animation fix requires `public/assets/hero-video.mp4`. The commented video slot in Task 4 is the handoff point for when that asset exists.

**Placeholder scan:** No TBDs, TODOs, or vague instructions. All code steps are complete.

**Type consistency:** `Logo` component used with `variant="mark" height={28}` — matches the existing `LogoProps` interface in `components/logo.tsx`. No new types introduced.
