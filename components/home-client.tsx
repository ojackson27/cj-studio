"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useReducedMotion, useInView } from "motion/react";
import EditorialNav from "@/components/editorial-nav";

// ease-out-expo — decisive, editorial
const EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

const capabilities = [
  {
    title: "Identity Systems",
    body: "Naming, visual logic, art direction, and reusable brand systems.",
  },
  {
    title: "Digital Interfaces",
    body: "Premium product pages, editorial websites, and interaction systems.",
  },
  {
    title: "Design Operations",
    body: "Component libraries, launch systems, and governance for scale.",
  },
];

/**
 * Fade + rise on scroll into view.
 * Immediately visible (no opacity gate) when prefers-reduced-motion is set.
 */
function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const inView = useInView(ref, { once: true, margin: "-60px 0px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={reduced ? false : { opacity: 0, y: 20 }}
      animate={
        reduced
          ? {}
          : inView
          ? { opacity: 1, y: 0 }
          : { opacity: 0, y: 20 }
      }
      transition={{ duration: 0.65, ease: EXPO, delay }}
    >
      {children}
    </motion.div>
  );
}

export default function HomeClient() {
  const reduced = useReducedMotion();

  return (
    <div className="bg-white">
      <EditorialNav />

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="bg-white pt-14" aria-label="Hero">
        <div className="px-6 pt-12 pb-10">
          {/* Kicker row — fades in on mount */}
          <motion.div
            className="flex items-center justify-between mb-10"
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.55, ease: EXPO, delay: 0.1 }}
          >
            <span
              className="text-[11px] uppercase tracking-[0.3em]"
              style={{ fontFamily: "var(--font-jetbrains-mono)", color: "rgba(12,14,20,0.38)" }}
            >
              Boutique Digital Design Agency
            </span>
            <span
              className="text-[11px] uppercase tracking-[0.3em]"
              style={{ fontFamily: "var(--font-jetbrains-mono)", color: "rgba(12,14,20,0.38)" }}
            >
              United Kingdom
            </span>
          </motion.div>

          {/* Display heading — each line clips up from below */}
          <h1
            className="text-[clamp(2.5rem,6vw,5rem)] leading-[0.92] tracking-[-0.03em] text-[#0c0e14] mb-8"
            style={{ fontFamily: "var(--font-archivo-black)" }}
          >
            {["Quiet systems", "for exacting", "digital brands."].map(
              (line, i) => (
                <span key={line} className="block overflow-hidden">
                  <motion.span
                    className="block"
                    initial={reduced ? false : { opacity: 0, y: "0.3em" }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.7,
                      ease: EXPO,
                      delay: 0.2 + i * 0.1,
                    }}
                  >
                    {line}
                  </motion.span>
                </span>
              )
            )}
          </h1>

          {/* Rule + body — fades in after headline */}
          <motion.div
            className="flex items-start gap-8 mt-2"
            initial={reduced ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: EXPO, delay: 0.55 }}
          >
            <div className="w-10 border-t-[2px] border-[#0c0e14] mt-2 shrink-0" />
            <p className="max-w-[340px] text-[15px] leading-[1.65]" style={{ color: "rgba(12,14,20,0.55)" }}>
              CJ Studio builds refined identities, product interfaces, and web
              systems for founders and teams who value restraint, clarity, and
              craft.
            </p>
          </motion.div>
        </div>

        {/* Media placeholder — rises in last */}
        <motion.div
          className="mx-6 mb-0 border border-gray-100 bg-[#f5f5f5] relative"
          style={{ height: "clamp(240px, 33vw, 460px)" }}
          initial={reduced ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: EXPO, delay: 0.68 }}
        >
          <span
            className="absolute top-4 left-5 text-[11px] uppercase tracking-[0.3em]"
            style={{ fontFamily: "var(--font-jetbrains-mono)", color: "rgba(12,14,20,0.38)" }}
          >
            Reserved Media Plane
          </span>
          <div
            className="absolute left-4 right-4 border-t border-gray-200"
            style={{ top: "58%" }}
          />
          <span
            className="absolute bottom-4 left-5 text-[11px] uppercase tracking-[0.3em]"
            style={{ fontFamily: "var(--font-jetbrains-mono)", color: "rgba(12,14,20,0.38)" }}
          >
            Future 3D Scroll Animation Asset
          </span>
        </motion.div>
      </section>

      {/* ── Methodology / Capabilities ───────────────────────── */}
      <section
        className="bg-white px-6 py-28"
        aria-label="Methodology and capabilities"
      >
        <div className="max-w-[1280px] mx-auto">
          {/* Header row */}
          <Reveal className="grid grid-cols-[auto_1fr] gap-x-8 items-start mb-16">
            <span
              className="text-[11px] uppercase tracking-[0.3em] mt-2 whitespace-nowrap"
              style={{ fontFamily: "var(--font-jetbrains-mono)", color: "rgba(12,14,20,0.38)" }}
            >
              Capabilities
            </span>
            <h2
              className="text-[clamp(1.75rem,4.5vw,3rem)] leading-[1.05] tracking-[-0.025em] text-[#0c0e14] text-right"
              style={{ fontFamily: "var(--font-archivo-black)" }}
            >
              A precise framework, without the ceremony.
            </h2>
          </Reveal>

          {/* Capabilities — staggered entrance, no numbered markers */}
          <div className="border-t border-gray-100">
            {capabilities.map(({ title, body }, i) => (
              <Reveal key={title} delay={i * 0.08}>
                <div className="border-b border-gray-100 py-8 flex flex-col md:flex-row md:items-start md:gap-16">
                  <h3
                    className="text-[17px] font-semibold tracking-[-0.01em] text-[#0c0e14] md:w-56 shrink-0 mb-2 md:mb-0"
                  >
                    {title}
                  </h3>
                  <p
                    className="text-[15px] leading-[1.65] max-w-[44ch]"
                    style={{ color: "rgba(12,14,20,0.55)" }}
                  >
                    {body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Selected Work ────────────────────────────────────── */}
      <section className="bg-white px-6 pb-28" aria-label="Selected work">
        <div className="max-w-[1280px] mx-auto">
          {/* Header row */}
          <Reveal className="grid grid-cols-[auto_1fr] gap-x-8 items-start mb-14">
            <span
              className="text-[11px] uppercase tracking-[0.3em] mt-2 whitespace-nowrap"
              style={{ fontFamily: "var(--font-jetbrains-mono)", color: "rgba(12,14,20,0.38)" }}
            >
              Selected Work
            </span>
            <h2
              className="text-[clamp(1.75rem,4.5vw,3rem)] leading-[1.05] tracking-[-0.025em] text-[#0c0e14] text-right"
              style={{ fontFamily: "var(--font-archivo-black)" }}
            >
              Case-study frames for quiet, high-value launches.
            </h2>
          </Reveal>

          {/* Carousel placeholder */}
          <Reveal delay={0.1}>
            <div
              className="bg-[#f5f5f5] border border-gray-100 flex items-center justify-center"
              style={{ height: "clamp(280px, 36vw, 500px)" }}
            >
              <span
                className="text-[11px] uppercase tracking-[0.3em]"
                style={{ fontFamily: "var(--font-jetbrains-mono)", color: "rgba(12,14,20,0.38)" }}
              >
                Portfolio work coming soon
              </span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────────── */}
      <footer className="bg-[#0a0a0a]" aria-label="Site footer">
        <Reveal className="px-4 pt-10 overflow-hidden">
          <p
            className="text-white leading-[0.85] select-none uppercase"
            style={{
              fontFamily: "var(--font-archivo-black)",
              fontSize: "clamp(3rem, 14vw, 16rem)",
            }}
          >
            <span style={{ display: "block", whiteSpace: "nowrap" }}>
              CJ Creative
            </span>
            <span style={{ display: "block", whiteSpace: "nowrap" }}>
              Studio
            </span>
          </p>
        </Reveal>
        <div className="px-6 py-5 flex items-center justify-between border-t border-white/[0.08] mt-6">
          <span className="text-[11px] text-white/40 tracking-wide">
            © 2026
          </span>
          <div className="hidden md:flex gap-6">
            {[
              { label: "Work", href: "/work" },
              { label: "Services", href: "/services" },
              { label: "About", href: "/about" },
              { label: "Contact", href: "/contact" },
              { label: "Privacy", href: "/privacy" },
            ].map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                className="text-[11px] text-white/30 transition-[color] duration-[180ms] ease-out [@media(hover:hover)_and_(pointer:fine)]:hover:text-white/60 tracking-wide"
              >
                {label}
              </Link>
            ))}
          </div>
          <span className="text-[11px] text-white/40 tracking-wide">
            London, United Kingdom
          </span>
        </div>
      </footer>
    </div>
  );
}
