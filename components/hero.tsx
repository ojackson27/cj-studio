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
