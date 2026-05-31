# CJ Studio Multi-Page Refactor & UI Overhaul Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Break the single-page CJ Studio site into a multi-page Next.js App Router architecture, fix the WebsiteAssembly scroll animation, centre the Hero layout, and overhaul the Founders section with an Apple aesthetic.

**Architecture:** 12 tasks in dependency order — shared data first, component fixes next, new pages last. All components stay as-is unless explicitly modified. New route pages are thin wrappers: Nav + component + Footer. No new libraries.

**Tech Stack:** Next.js 16 App Router · TypeScript · Tailwind CSS v4 · motion/react · next/link · next/image

---

## File Map

| Action | Path | Purpose |
|--------|------|---------|
| Create | `lib/projects.ts` | Shared project data for Work + WorkTeaser |
| Modify | `components/work.tsx` | Import projects from lib |
| Modify | `components/website-assembly.tsx` | Animation offset fix + overflow wrapper + remove debug |
| Modify | `components/nav.tsx` | next/link tags, Logo as Link href="/" |
| Modify | `components/hero.tsx` | Centred single-column layout |
| Modify | `components/founders.tsx` | Apple aesthetic redesign |
| Create | `components/work-teaser.tsx` | Homepage work preview with /work link |
| Modify | `app/page.tsx` | Strip to Hero+Assembly+WorkTeaser+CTA+Footer |
| Create | `app/work/page.tsx` | /work route |
| Create | `app/services/page.tsx` | /services route |
| Create | `app/process/page.tsx` | /process route |
| Create | `app/founders/page.tsx` | /founders route |

---

### Task 1: Extract shared project data

**Files:**
- Create: `lib/projects.ts`

- [ ] **Step 1: Create `lib/projects.ts`**

```typescript
export interface Project {
  name: string;
  type: string;
  img: string;
  color: string;
  enter: { x?: number; y?: number; opacity: number };
}

export const projects: Project[] = [
  {
    name: "Maple & Co",
    type: "Restaurant",
    img: "https://picsum.photos/seed/modern-restaurant-interior/800/600",
    color: "from-amber-100/80 to-orange-100/80",
    enter: { x: -40, opacity: 0 },
  },
  {
    name: "Northfield Law",
    type: "Legal Services",
    img: "https://picsum.photos/seed/law-office-minimal/800/600",
    color: "from-slate-100/80 to-blue-100/80",
    enter: { y: 48, opacity: 0 },
  },
  {
    name: "Bloom Studio",
    type: "Photography",
    img: "https://picsum.photos/seed/photography-studio-light/800/600",
    color: "from-rose-100/80 to-pink-100/80",
    enter: { x: 40, opacity: 0 },
  },
];
```

- [ ] **Step 2: Verify TypeScript**

```powershell
cd C:\Users\ollie\cj-studio
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```powershell
git add lib/projects.ts
git commit -m "feat: extract shared project data to lib/projects.ts"
```

---

### Task 2: Update Work component to use shared data

**Files:**
- Modify: `components/work.tsx`

- [ ] **Step 1: Replace inline `projects` array with import**

Replace the entire file content with:

```tsx
"use client";

import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight } from "@phosphor-icons/react";
import Image from "next/image";
import { projects } from "@/lib/projects";

export default function Work() {
  const reduce = useReducedMotion();

  return (
    <section id="work" className="py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, type: "spring", stiffness: 80 }}
          className="flex items-end justify-between mb-12"
        >
          <h2 className="text-[clamp(2rem,5vw,3rem)] font-bold tracking-tight text-gray-900 leading-tight">
            Selected work
          </h2>
          <p className="hidden md:block text-[14px] text-gray-400 pb-1">More coming soon</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((p, i) => (
            <motion.div
              key={p.name}
              initial={reduce ? false : p.enter}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.65,
                delay: i * 0.1,
                type: "spring",
                stiffness: 80,
                damping: 18,
              }}
              whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
              className="group cursor-pointer"
            >
              <div className={`rounded-2xl overflow-hidden bg-gradient-to-br ${p.color} aspect-[4/3] relative backdrop-blur-sm border border-white/50`}>
                <Image
                  src={p.img}
                  alt={p.name}
                  fill
                  className="object-cover mix-blend-multiply opacity-75 group-hover:opacity-90 group-hover:scale-[1.04] transition-all duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 group-hover:scale-100 shadow-sm">
                  <ArrowUpRight size={14} weight="bold" className="text-gray-900" />
                </div>
              </div>
              <div className="mt-3 px-1">
                <p className="text-[15px] font-semibold text-gray-900">{p.name}</p>
                <p className="text-[13px] text-gray-400">{p.type}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify TypeScript**

```powershell
npx tsc --noEmit
```

- [ ] **Step 3: Commit**

```powershell
git add components/work.tsx
git commit -m "feat(work): import projects from shared lib"
```

---

### Task 3: Fix WebsiteAssembly animation

**Files:**
- Modify: `components/website-assembly.tsx`

Three changes: (1) wrap return in `overflow-x-hidden` div, (2) fix scroll offset, (3) remove debug log.

- [ ] **Step 1: Remove debug `useMotionValueEvent` call and import**

Remove these two lines from the import block:
```tsx
  useMotionValueEvent,
```

Remove these lines from the hook body (after `const { scrollYProgress }`):
```tsx
  useMotionValueEvent(scrollYProgress, "change", (v) =>
    console.log("[WebsiteAssembly] scrollYProgress:", v.toFixed(3))
  );
```

The import block should now be:
```tsx
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "motion/react";
```

- [ ] **Step 2: Fix scroll offset**

Change:
```tsx
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
```

To:
```tsx
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.9", "end start"],
  });
```

- [ ] **Step 3: Wrap return in `overflow-x-hidden` outer div**

The return currently starts with:
```tsx
  return (
    /* Scroll container — 3× viewport gives scroll room for the animation */
    <div ref={containerRef} className="relative h-[280vh]">
```

Change to:
```tsx
  return (
    <div className="overflow-x-hidden">
      {/* Scroll container — 3× viewport gives scroll room for the animation */}
      <div ref={containerRef} className="relative h-[280vh]">
```

And add the matching closing `</div>` at the very end of the return, after the existing closing `</div>` of the containerRef div:
```tsx
    </div>{/* end overflow-x-hidden */}
  );
```

- [ ] **Step 4: Verify TypeScript**

```powershell
npx tsc --noEmit
```

- [ ] **Step 5: Commit**

```powershell
git add components/website-assembly.tsx
git commit -m "fix(website-assembly): animation offset, overflow-x-hidden wrapper, remove debug log"
```

---

### Task 4: Update Nav to use next/link

**Files:**
- Modify: `components/nav.tsx`

- [ ] **Step 1: Replace entire file**

```tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { List, X } from "@phosphor-icons/react";
import AnimatedButton from "./animated-button";
import Logo from "./logo";

const links = [
  { label: "Work",     href: "/work" },
  { label: "Services", href: "/services" },
  { label: "Process",  href: "/process" },
  { label: "Founders", href: "/founders" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={reduce ? false : { opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/80 backdrop-blur-md shadow-[0_1px_0_rgba(0,0,0,0.06)]" : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <motion.div
          whileHover={reduce ? {} : { scale: 1.03 }}
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
        >
          <Link href="/" aria-label="CJ Studio home">
            <Logo size={30} wordmarkColor="dark" />
          </Link>
        </motion.div>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              className="relative text-[14px] text-gray-500 hover:text-gray-900 transition-colors duration-200 py-1 group"
            >
              {label}
              <span className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-full" />
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden md:block">
          <AnimatedButton href="/contact" variant="primary">
            Start a project
          </AnimatedButton>
        </div>

        {/* Mobile toggle */}
        <motion.button
          whileTap={reduce ? {} : { scale: 0.9 }}
          className="md:hidden p-2 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <motion.div animate={{ rotate: open ? 90 : 0 }} transition={{ duration: 0.2 }}>
            {open ? <X size={20} /> : <List size={20} />}
          </motion.div>
        </motion.button>
      </div>

      {/* Mobile menu */}
      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.25 }}
        className="md:hidden overflow-hidden bg-white/95 backdrop-blur-md border-t border-gray-100"
      >
        <div className="px-6 py-4 flex flex-col gap-4">
          {links.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              className="text-[15px] text-gray-700 hover:text-gray-900 transition-colors py-1"
              onClick={() => setOpen(false)}
            >
              {label}
            </Link>
          ))}
          <AnimatedButton href="/contact" onClick={() => setOpen(false)} className="w-full justify-center">
            Start a project
          </AnimatedButton>
        </div>
      </motion.div>
    </motion.header>
  );
}
```

- [ ] **Step 2: Verify TypeScript**

```powershell
npx tsc --noEmit
```

- [ ] **Step 3: Commit**

```powershell
git add components/nav.tsx
git commit -m "feat(nav): next/link tags, logo links to /, nav routes to pages"
```

---

### Task 5: Centre Hero layout

**Files:**
- Modify: `components/hero.tsx`

- [ ] **Step 1: Replace entire file**

```tsx
"use client";

import { useRef, useId } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { ArrowRight } from "@phosphor-icons/react";

export default function Hero() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const uid = useId();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const prismY     = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  const prismScale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
  const textY      = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const opacity    = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-[100dvh] flex items-center overflow-hidden">
      <motion.div
        style={reduce ? {} : { y: textY, opacity }}
        className="relative max-w-3xl mx-auto px-6 w-full pt-24 pb-16 flex flex-col items-center text-center"
      >
        {/* Eyebrow */}
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-[11px] uppercase tracking-[0.22em] text-gray-400 mb-8 font-medium"
        >
          UK Web Design Studio
        </motion.p>

        {/* Heading */}
        <motion.h1
          initial={reduce ? false : { opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15 }}
          className="text-[clamp(3.2rem,9vw,7rem)] font-bold tracking-[-0.03em] leading-[0.95] text-gray-900 mb-10"
        >
          Websites<br />built to<br />
          <span className="prism-text">stand out.</span>
        </motion.h1>

        {/* Centred prism */}
        <motion.div
          style={reduce ? {} : { y: prismY, scale: prismScale }}
          initial={reduce ? false : { opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.3 }}
          className="mb-10"
        >
          <div className="relative w-[220px] h-[220px] mx-auto">
            {/* Glow rings */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-rose-200/50 via-purple-200/40 to-blue-200/50 blur-3xl" />
            <div className="absolute inset-8 rounded-full bg-gradient-to-tr from-blue-200/30 via-emerald-200/30 to-pink-200/30 blur-2xl aurora-animate" />
            {/* Prism SVG */}
            <div className="absolute inset-0 flex items-center justify-center">
              <svg width="160" height="176" viewBox="0 0 180 210" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-xl">
                <defs>
                  <linearGradient id={`prismHero-${uid}`} x1="0" y1="0" x2="180" y2="155" gradientUnits="userSpaceOnUse">
                    <stop offset="0%"  stopColor="#f472b6" stopOpacity="0.95" />
                    <stop offset="30%" stopColor="#a78bfa" stopOpacity="0.95" />
                    <stop offset="65%" stopColor="#60a5fa" stopOpacity="0.95" />
                    <stop offset="100%" stopColor="#34d399" stopOpacity="0.95" />
                  </linearGradient>
                  <filter id={`glow-${uid}`}>
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
                  </filter>
                </defs>
                <polygon points="90,10 170,155 10,155" fill={`url(#prismHero-${uid})`} filter={`url(#glow-${uid})`} />
                <polygon points="90,48 142,132 38,132" fill="white" opacity="0.92" />
                <line x1="90" y1="155" x2="22" y2="200" stroke="#fda4af" strokeWidth="3" opacity="0.7" />
                <line x1="90" y1="155" x2="48" y2="205" stroke="#c4b5fd" strokeWidth="3" opacity="0.7" />
                <line x1="90" y1="155" x2="75" y2="208" stroke="#93c5fd" strokeWidth="3" opacity="0.7" />
                <line x1="90" y1="155" x2="105" y2="208" stroke="#6ee7b7" strokeWidth="3" opacity="0.7" />
                <line x1="90" y1="155" x2="132" y2="205" stroke="#86efac" strokeWidth="2.5" opacity="0.6" />
                <line x1="90" y1="155" x2="158" y2="200" stroke="#fde68a" strokeWidth="2" opacity="0.5" />
              </svg>
            </div>
          </div>
        </motion.div>

        {/* Sub-copy */}
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.42 }}
          className="text-lg text-gray-500 leading-relaxed max-w-[38ch] mb-10"
        >
          Fast, modern websites for UK businesses. Flat fee, no agency markup.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="flex flex-wrap gap-3 justify-center"
        >
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-gray-900 text-white text-[14px] font-medium hover:bg-gray-700 transition-all duration-200 hover:gap-3"
          >
            Start a project
            <ArrowRight size={15} weight="bold" />
          </Link>
          <Link
            href="/work"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-gray-200 text-gray-700 text-[14px] font-medium hover:border-gray-400 transition-colors duration-200 bg-white/50 backdrop-blur-sm"
          >
            See our work
          </Link>
        </motion.div>

        {/* Location tag */}
        <motion.div
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="absolute bottom-8 left-6 hidden md:flex items-center gap-2 text-[12px] text-gray-300 tracking-widest uppercase"
        >
          <span className="w-8 h-px bg-gray-200" />
          Based in the UK
        </motion.div>
      </motion.div>
    </section>
  );
}
```

- [ ] **Step 2: Verify TypeScript**

```powershell
npx tsc --noEmit
```

- [ ] **Step 3: Commit**

```powershell
git add components/hero.tsx
git commit -m "feat(hero): centred single-column layout, prism below heading, Link tags"
```

---

### Task 6: Founders Apple aesthetic redesign

**Files:**
- Modify: `components/founders.tsx`

- [ ] **Step 1: Replace entire file**

```tsx
"use client";

import { motion, useReducedMotion } from "motion/react";

const founders = [
  {
    name: "Josh Carter",
    role: "Co-founder",
    initials: "JC",
    bio: "Obsessed with clean code and making things that work. Handles the build side and makes sure every site ships on time.",
  },
  {
    name: "Ollie Jackson",
    role: "Co-founder",
    initials: "OJ",
    bio: "Leads design and client relationships. Believes a great website is the best first impression a business can make.",
  },
];

export default function Founders() {
  const reduce = useReducedMotion();

  return (
    <section id="founders" className="py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, type: "spring", stiffness: 80 }}
          className="mb-16"
        >
          <h2 className="text-[clamp(2rem,5vw,3rem)] font-bold tracking-tight text-gray-900 leading-tight">
            The people behind<br />the pixels.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {founders.map((f, i) => (
            <motion.div
              key={f.name}
              initial={reduce ? false : { opacity: 0, y: 48 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{
                duration: 0.7,
                delay: i * 0.15,
                type: "spring",
                stiffness: 70,
                damping: 16,
              }}
              whileHover={reduce ? {} : {
                scale: 1.02,
                transition: { type: "spring", stiffness: 300, damping: 20 },
              }}
              className="bg-white border border-gray-100 rounded-3xl p-8 flex flex-col gap-6"
            >
              {/* Avatar + name */}
              <div className="flex items-center gap-4">
                {/* Gradient-border circle */}
                <div
                  className="w-14 h-14 rounded-full p-px shrink-0"
                  style={{ background: "linear-gradient(135deg, #f472b6, #a78bfa, #60a5fa)" }}
                >
                  <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                    <span className="text-[14px] font-semibold tracking-tight text-gray-900">
                      {f.initials}
                    </span>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold tracking-tight text-gray-900">{f.name}</h3>
                  <p className="text-[13px] text-gray-400 tracking-tight mt-0.5">{f.role}, CJ Studio</p>
                </div>
              </div>

              {/* Bio */}
              <p className="text-[15px] text-gray-500 leading-relaxed">{f.bio}</p>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={reduce ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 text-center text-[14px] text-gray-400"
        >
          Two people. One studio. Every site built with care.
        </motion.p>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify TypeScript**

```powershell
npx tsc --noEmit
```

- [ ] **Step 3: Commit**

```powershell
git add components/founders.tsx
git commit -m "feat(founders): Apple aesthetic — white cards, gradient avatar border, scale hover"
```

---

### Task 7: Create WorkTeaser component

**Files:**
- Create: `components/work-teaser.tsx`

- [ ] **Step 1: Create the file**

```tsx
"use client";

import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, ArrowUpRight } from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";
import { projects } from "@/lib/projects";

export default function WorkTeaser() {
  const reduce = useReducedMotion();

  return (
    <section className="py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, type: "spring", stiffness: 80 }}
          className="flex items-end justify-between mb-12"
        >
          <h2 className="text-[clamp(2rem,5vw,3rem)] font-bold tracking-tight text-gray-900 leading-tight">
            Selected work
          </h2>
          <Link
            href="/work"
            className="hidden md:flex items-center gap-1.5 text-[14px] text-gray-500 hover:text-gray-900 transition-colors pb-1 group"
          >
            View all work
            <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((p, i) => (
            <motion.div
              key={p.name}
              initial={reduce ? false : p.enter}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.65,
                delay: i * 0.1,
                type: "spring",
                stiffness: 80,
                damping: 18,
              }}
              whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
              className="group cursor-pointer"
            >
              <Link href="/work">
                <div className={`rounded-2xl overflow-hidden bg-gradient-to-br ${p.color} aspect-[4/3] relative border border-white/50`}>
                  <Image
                    src={p.img}
                    alt={p.name}
                    fill
                    className="object-cover mix-blend-multiply opacity-75 group-hover:opacity-90 group-hover:scale-[1.04] transition-all duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 group-hover:scale-100 shadow-sm">
                    <ArrowUpRight size={14} weight="bold" className="text-gray-900" />
                  </div>
                </div>
                <div className="mt-3 px-1">
                  <p className="text-[15px] font-semibold text-gray-900">{p.name}</p>
                  <p className="text-[13px] text-gray-400">{p.type}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Mobile CTA */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 flex md:hidden justify-center"
        >
          <Link
            href="/work"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-gray-200 text-[14px] text-gray-700 hover:border-gray-400 transition-colors"
          >
            View all work <ArrowRight size={14} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify TypeScript**

```powershell
npx tsc --noEmit
```

- [ ] **Step 3: Commit**

```powershell
git add components/work-teaser.tsx
git commit -m "feat: WorkTeaser component for homepage with /work link"
```

---

### Task 8: Strip homepage to core sections

**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 1: Replace file**

```tsx
import Nav from "@/components/nav";
import Hero from "@/components/hero";
import WebsiteAssembly from "@/components/website-assembly";
import WorkTeaser from "@/components/work-teaser";
import CTA from "@/components/cta";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <main className="min-h-[100dvh]">
      <Nav />
      <Hero />
      <WebsiteAssembly />
      <WorkTeaser />
      <CTA />
      <Footer />
    </main>
  );
}
```

- [ ] **Step 2: Verify TypeScript**

```powershell
npx tsc --noEmit
```

- [ ] **Step 3: Commit**

```powershell
git add app/page.tsx
git commit -m "feat(home): strip to Hero+Assembly+WorkTeaser+CTA+Footer"
```

---

### Task 9: Create /work route

**Files:**
- Create: `app/work/page.tsx`

- [ ] **Step 1: Create file**

```tsx
import type { Metadata } from "next";
import Nav from "@/components/nav";
import Work from "@/components/work";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "Work | CJ Studio",
  description: "Selected web design projects by CJ Studio.",
};

export default function WorkPage() {
  return (
    <main className="min-h-[100dvh] pt-16">
      <Nav />
      <Work />
      <Footer />
    </main>
  );
}
```

- [ ] **Step 2: Verify TypeScript**

```powershell
npx tsc --noEmit
```

- [ ] **Step 3: Commit**

```powershell
git add app/work/page.tsx
git commit -m "feat: /work route page"
```

---

### Task 10: Create /services route

**Files:**
- Create: `app/services/page.tsx`

- [ ] **Step 1: Create file**

```tsx
import type { Metadata } from "next";
import Nav from "@/components/nav";
import Services from "@/components/services";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "Services | CJ Studio",
  description: "Web design, build, and maintenance services from CJ Studio.",
};

export default function ServicesPage() {
  return (
    <main className="min-h-[100dvh] pt-16">
      <Nav />
      <Services />
      <Footer />
    </main>
  );
}
```

- [ ] **Step 2: Verify TypeScript**

```powershell
npx tsc --noEmit
```

- [ ] **Step 3: Commit**

```powershell
git add app/services/page.tsx
git commit -m "feat: /services route page"
```

---

### Task 11: Create /process route

**Files:**
- Create: `app/process/page.tsx`

- [ ] **Step 1: Create file**

```tsx
import type { Metadata } from "next";
import Nav from "@/components/nav";
import Process from "@/components/process";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "Process | CJ Studio",
  description: "How CJ Studio builds websites — from brief to launch.",
};

export default function ProcessPage() {
  return (
    <main className="min-h-[100dvh] pt-16">
      <Nav />
      <Process />
      <Footer />
    </main>
  );
}
```

- [ ] **Step 2: Verify TypeScript**

```powershell
npx tsc --noEmit
```

- [ ] **Step 3: Commit**

```powershell
git add app/process/page.tsx
git commit -m "feat: /process route page"
```

---

### Task 12: Create /founders route

**Files:**
- Create: `app/founders/page.tsx`

- [ ] **Step 1: Create file**

```tsx
import type { Metadata } from "next";
import Nav from "@/components/nav";
import Founders from "@/components/founders";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "Founders | CJ Studio",
  description: "Meet Ollie and Josh, the people behind CJ Studio.",
};

export default function FoundersPage() {
  return (
    <main className="min-h-[100dvh] pt-16">
      <Nav />
      <Founders />
      <Footer />
    </main>
  );
}
```

- [ ] **Step 2: Verify TypeScript**

```powershell
npx tsc --noEmit
```

- [ ] **Step 3: Commit**

```powershell
git add app/founders/page.tsx
git commit -m "feat: /founders route page"
```

---

### Task 13: Final verification

**Files:** None — verification only.

- [ ] **Step 1: Full TypeScript check**

```powershell
cd C:\Users\ollie\cj-studio
npx tsc --noEmit
```

Expected: zero errors.

- [ ] **Step 2: Start dev server**

```powershell
npm run dev
```

Open `http://localhost:3000`.

- [ ] **Step 3: Verify homepage**

- [ ] Nav logo links to `/`
- [ ] Nav links route to `/work`, `/services`, `/process`, `/founders`
- [ ] Hero is single centred column — eyebrow → heading → prism → sub-copy → CTAs
- [ ] "See our work" CTA routes to `/work`
- [ ] WebsiteAssembly animation begins as section enters viewport (no blank-white delay)
- [ ] No horizontal scrollbar at any viewport width
- [ ] WorkTeaser shows 3 cards with "View all work →" link to `/work`

- [ ] **Step 4: Verify inner pages**

Visit each route and check:
- [ ] `http://localhost:3000/work` — Work component renders, Nav + Footer present, `pt-16` clears fixed nav
- [ ] `http://localhost:3000/services` — Services component renders
- [ ] `http://localhost:3000/process` — Process component renders
- [ ] `http://localhost:3000/founders` — Founders Apple redesign renders: white cards, gradient-border avatars, scale on hover

- [ ] **Step 5: Verify reduced motion**

In DevTools → Rendering → Emulate `prefers-reduced-motion`. Reload homepage. All animations should show final state immediately.

- [ ] **Step 6: Final commit if any fixups were needed**

```powershell
git add -A
git commit -m "fix: post-verification tweaks"
```
