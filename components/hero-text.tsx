"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import Link from "next/link";

const ease = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.11, delayChildren: 0.05 } },
};

export default function HeroText() {
  const reduce = useReducedMotion();
  const [btnHovered, setBtnHovered] = useState(false);

  return (
    <main
      className="flex flex-col bg-white text-[#0c0e14]"
      style={{
        minHeight: "100svh",
        padding: "calc(64px + clamp(24px, 3.4vw, 42px)) clamp(22px, 5vw, 80px) clamp(28px, 4vw, 52px)",
      }}
    >
      {/* Stage */}
      <motion.section
        className="flex-1 flex flex-col justify-center items-start w-full mx-auto"
        style={{ maxWidth: 1180, paddingBlock: "6vh" }}
        variants={stagger}
        initial={reduce ? "visible" : "hidden"}
        animate="visible"
      >
        {/* Eyebrow */}
        <motion.span
          variants={fadeUp}
          className="inline-flex items-center gap-[14px]"
          style={{
            fontFamily: "var(--font-jetbrains-mono), ui-monospace, monospace",
            fontSize: 12,
            letterSpacing: "0.30em",
            textTransform: "uppercase",
            color: "rgba(12,14,20,0.40)",
            marginBottom: "clamp(26px, 3vw, 40px)",
          }}
        >
          <span
            aria-hidden
            style={{ width: 34, height: 1, background: "rgba(12,14,20,0.22)", flexShrink: 0 }}
          />
          Design &amp; Build Studio
        </motion.span>

        {/* Headline */}
        <motion.h1
          variants={fadeUp}
          className="m-0"
          style={{
            fontFamily: "var(--font-space-grotesk), sans-serif",
            fontWeight: 500,
            fontSize: "clamp(46px, 8.2vw, 128px)",
            lineHeight: 0.98,
            letterSpacing: "-0.035em",
            maxWidth: "16ch",
            color: "#0c0e14",
          }}
        >
          Websites built
          <br />
          to{" "}
          <span style={{ color: "rgba(12,14,20,0.40)", fontWeight: 400 }}>
            stand out.
          </span>
        </motion.h1>

        {/* Sub-copy */}
        <motion.p
          variants={fadeUp}
          style={{
            margin: "clamp(28px, 3.2vw, 42px) 0 0",
            maxWidth: "48ch",
            fontSize: "clamp(17px, 1.45vw, 21px)",
            lineHeight: 1.55,
            color: "rgba(12,14,20,0.56)",
          }}
        >
          We design and develop fast, distinctive sites for brands that refuse
          to blend in — strategy, identity, and engineering under one roof.
        </motion.p>

        {/* CTA */}
        <motion.div
          variants={fadeUp}
          style={{ marginTop: "clamp(34px, 4vw, 52px)" }}
        >
          <Link
            href="/work"
            onMouseEnter={() => setBtnHovered(true)}
            onMouseLeave={() => setBtnHovered(false)}
            style={{
              fontFamily: "var(--font-space-grotesk), sans-serif",
              fontWeight: 500,
              fontSize: 15.5,
              letterSpacing: "0.01em",
              textDecoration: "none",
              padding: "15px 30px",
              borderRadius: 100,
              border: `1px solid ${btnHovered ? "#0c0e14" : "rgba(12,14,20,0.22)"}`,
              color: "#0c0e14",
              background: "transparent",
              display: "inline-block",
              transition: "border-color 0.3s cubic-bezier(0.22,1,0.36,1), transform 0.4s cubic-bezier(0.22,1,0.36,1)",
              transform: btnHovered ? "translateY(-2px)" : "none",
            }}
          >
            View our work
          </Link>
        </motion.div>
      </motion.section>

      {/* Footer strip */}
      <footer
        className="flex items-end justify-between gap-6"
        style={{
          fontFamily: "var(--font-jetbrains-mono), ui-monospace, monospace",
          fontSize: 11.5,
          letterSpacing: "0.16em",
          color: "rgba(12,14,20,0.40)",
          textTransform: "uppercase",
        }}
      >
        <span>Est · 2026</span>
        <div className="hidden md:flex" style={{ gap: "clamp(20px, 2.4vw, 40px)" }}>
          <span>Available for new work</span>
          <span>United Kingdom</span>
        </div>
      </footer>
    </main>
  );
}
