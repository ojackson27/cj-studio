# Hero Section Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the default CJ Studio landing page with a full-screen Aceternity-style animated Aurora hero — brand colours, Plus Jakarta Sans font, centred logo, and a Framer Motion CTA routing to `/work`.

**Architecture:** Four files change. `globals.css` gains the `@keyframes aurora` animation and a `.aurora-gradient` CSS class. `layout.tsx` swaps Geist for Plus Jakarta Sans. A new `AuroraBackground` component wraps a full-viewport div with two animated gradient layers. `page.tsx` is rebuilt as a minimal client component: `AuroraBackground` → logo `<Image>` → `MotionLink` CTA.

**Tech Stack:** Next.js 16 App Router, Tailwind CSS v4, `motion` v12 (`motion/react`), `next/font/google`, `next/image`, `next/link`

---

## File Map

| Action | Path | Responsibility |
|--------|------|---------------|
| Modify | `app/globals.css` | Add `@keyframes aurora`, `--animate-aurora` token, `.aurora-gradient` class; remove stale `.aurora`/`.aurora-animate` |
| Modify | `app/layout.tsx` | Replace Geist fonts with Plus Jakarta Sans; add `font-sans` to `<body>` |
| Create | `components/aurora-background.tsx` | Full-screen animated aurora wrapper component |
| Modify | `app/page.tsx` | Hero-only page: AuroraBackground → logo → MotionLink CTA |

---

## Task 1: Add aurora CSS tokens and keyframe to globals.css

**Files:**
- Modify: `app/globals.css`

- [ ] **Step 1.1 — Add `--animate-aurora` to the existing `@theme inline` block**

  Open `app/globals.css`. The existing `@theme inline` block reads:
  ```css
  @theme inline {
    --color-background: var(--background);
    --color-foreground: var(--foreground);
    --font-sans: var(--font-geist-sans);
    --font-mono: var(--font-geist-mono);
  }
  ```
  Replace the entire block with:
  ```css
  @theme inline {
    --color-background: var(--background);
    --color-foreground: var(--foreground);
    --font-sans: var(--font-plus-jakarta-sans);
    --animate-aurora: aurora 60s linear infinite;
  }
  ```
  (The `--font-mono` line is removed; `--font-geist-sans` reference is replaced.)

- [ ] **Step 1.2 — Add the `.aurora-gradient` CSS class and `@keyframes aurora`**

  Append to the end of `app/globals.css`:
  ```css
  @keyframes aurora {
    from { background-position: 50% 50%, 50% 50%; }
    to   { background-position: 350% 50%, 350% 50%; }
  }

  .aurora-gradient {
    background-image: repeating-linear-gradient(
      100deg,
      #ec4899 10%,
      #8b5cf6 15%,
      #3b82f6 20%,
      #10b981 25%,
      #ec4899 30%
    );
    background-size: 300% 200%;
    filter: blur(10px) invert(1);
  }
  ```

- [ ] **Step 1.3 — Remove the stale `.aurora` and `.aurora-animate` rules**

  Delete the following blocks from `globals.css` (they are replaced by the component):
  ```css
  /* Section-level aurora for hero / CTA — warmer, more intense */
  .aurora {
    background:
      radial-gradient(ellipse at 18% 28%, rgba(251, 113, 133, 0.5) 0%, transparent 55%),
      ...
    filter: blur(60px);
  }

  @keyframes aurora-drift {
    0%, 100% { transform: translate(0, 0) scale(1); }
    33% { transform: translate(24px, -18px) scale(1.06); }
    66% { transform: translate(-18px, 12px) scale(0.96); }
  }

  .aurora-animate {
    animation: aurora-drift 10s ease-in-out infinite;
  }

  @media (prefers-reduced-motion: reduce) {
    .aurora-animate { animation: none; }
  }
  ```

- [ ] **Step 1.4 — Commit**
  ```bash
  git add app/globals.css
  git commit -m "feat: add aurora keyframe and gradient class, wire Plus Jakarta Sans font token"
  ```

---

## Task 2: Replace Geist with Plus Jakarta Sans in layout.tsx

**Files:**
- Modify: `app/layout.tsx`

- [ ] **Step 2.1 — Swap the font import and configuration**

  Replace the entire contents of `app/layout.tsx` with:
  ```tsx
  import type { Metadata } from "next";
  import { Plus_Jakarta_Sans } from "next/font/google";
  import "./globals.css";

  const fontSans = Plus_Jakarta_Sans({
    subsets: ["latin"],
    variable: "--font-plus-jakarta-sans",
  });

  export const metadata: Metadata = {
    title: "CJ Studio | Web Design",
    description: "We build fast, modern websites for UK businesses. Flat fee, no agency markup.",
  };

  export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <html
        lang="en"
        className={`${fontSans.variable} h-full antialiased`}
      >
        <body className="min-h-full flex flex-col font-sans">{children}</body>
      </html>
    );
  }
  ```

  Key changes:
  - `Plus_Jakarta_Sans` imported, both Geist variables removed
  - `fontSans.variable` applies `--font-plus-jakarta-sans` to `<html>`
  - `font-sans` on `<body>` activates the Tailwind token wired in Task 1

- [ ] **Step 2.2 — Commit**
  ```bash
  git add app/layout.tsx
  git commit -m "feat: replace Geist with Plus Jakarta Sans as global font"
  ```

---

## Task 3: Create the AuroraBackground component

**Files:**
- Create: `components/aurora-background.tsx`

- [ ] **Step 3.1 — Create the file**

  Create `components/aurora-background.tsx` with the following content:
  ```tsx
  "use client";

  import { ReactNode } from "react";

  interface Props {
    children: ReactNode;
    className?: string;
  }

  export default function AuroraBackground({ children, className = "" }: Props) {
    return (
      <div
        className={`relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-white ${className}`}
      >
        {/* Primary aurora layer */}
        <div className="aurora-gradient pointer-events-none absolute -inset-[10px] animate-aurora opacity-50 will-change-transform" />
        {/* Secondary layer — reversed direction, shorter cycle, mix-blend for depth */}
        <div
          className="aurora-gradient pointer-events-none absolute -inset-[10px] animate-aurora opacity-30 will-change-transform"
          style={{ animationDirection: "reverse", animationDuration: "40s" }}
        />
        {/* Content */}
        <div className="relative z-10 flex flex-col items-center">
          {children}
        </div>
      </div>
    );
  }
  ```

  How it works:
  - Two absolutely-positioned `.aurora-gradient` divs animate at different speeds in opposite directions, creating the layered shimmer
  - `filter: blur(10px) invert(1)` (from the CSS class) turns the vivid gradient into soft pastel glows on the white background
  - `opacity-50` / `opacity-30` keep the effect subtle and premium
  - Children sit in `z-10` above both layers

- [ ] **Step 3.2 — Commit**
  ```bash
  git add components/aurora-background.tsx
  git commit -m "feat: add AuroraBackground component with brand-colour animated gradient"
  ```

---

## Task 4: Rebuild page.tsx as the hero

**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 4.1 — Replace page.tsx with the hero assembly**

  Replace the entire contents of `app/page.tsx` with:
  ```tsx
  "use client";

  import Image from "next/image";
  import Link from "next/link";
  import { motion } from "motion/react";
  import AuroraBackground from "@/components/aurora-background";

  const MotionLink = motion.create(Link);

  export default function Home() {
    return (
      <AuroraBackground>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-center gap-10"
        >
          <Image
            src="/cj-studio-logo.png"
            width={384}
            height={150}
            alt="CJ Studio"
            priority
            className="w-72 h-auto md:w-96"
          />
          <MotionLink
            href="/work"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.98 }}
            className="rounded-full bg-slate-900 px-8 py-3 text-sm font-medium tracking-tight text-white transition-shadow hover:shadow-lg"
          >
            View Our Work
          </MotionLink>
        </motion.div>
      </AuroraBackground>
    );
  }
  ```

  Notes:
  - `motion.create(Link)` is the v12 API — do not use `motion(Link)`
  - `width={384} height={150}` on `<Image>` combined with `h-auto` CSS preserves the logo's aspect ratio at any rendered size
  - `priority` triggers eager loading (no lazy decode delay)
  - The outer `motion.div` entrance fade covers both logo and button; the inner `MotionLink` has its own staggered delay

- [ ] **Step 4.2 — Commit**
  ```bash
  git add app/page.tsx
  git commit -m "feat: rebuild home page as aurora hero with logo and CTA"
  ```

---

## Task 5: Verify the hero renders correctly

**Files:** none (read-only verification)

- [ ] **Step 5.1 — Start the dev server**
  ```bash
  cd C:/Users/ollie/cj-studio
  npm run dev
  ```
  Expected: server starts on `http://localhost:3000`, no TypeScript or Tailwind errors in the terminal.

- [ ] **Step 5.2 — Check the hero at `http://localhost:3000`**

  Verify each of the following:
  - [ ] Background is pure white with soft, animated aurora colour bands (pink, violet, blue, emerald) drifting across it
  - [ ] The CJ Studio logo (triangle icon + "CJ Studio." wordmark) is centred, crisp, and `w-72` on mobile / `w-96` on ≥ md
  - [ ] The aurora animates continuously — bands move left-to-right
  - [ ] "View Our Work" pill button is below the logo with `bg-slate-900` dark background and white text
  - [ ] Hovering the button scales it up slightly (`scale: 1.04`)
  - [ ] Clicking "View Our Work" navigates to `/work` without a full page reload (Next.js client-side routing)
  - [ ] Typography throughout the page is Plus Jakarta Sans (check DevTools → Computed → font-family on `<body>`)

- [ ] **Step 5.3 — Check for console errors**

  Open DevTools → Console. There should be zero errors. Common issues:
  - `Image` component warning about missing `width`/`height` → already provided
  - 404 for `/cj-studio-logo.png` → verify `public/cj-studio-logo.png` exists
  - `motion.create is not a function` → means `motion` is being imported from wrong path; must be `motion/react`

- [ ] **Step 5.4 — Final commit**
  ```bash
  git add -A
  git commit -m "feat: complete hero section — aurora bg, logo, Plus Jakarta Sans, CTA"
  ```
