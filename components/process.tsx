"use client";

import { motion, useReducedMotion } from "motion/react";
import { ChatCircle, PaintBrush, RocketLaunch } from "@phosphor-icons/react";

const steps = [
  {
    icon: ChatCircle,
    title: "Brief",
    body: "You tell us what you need. We ask the right questions, agree on scope, and you pay 50% to get started.",
    accent: "#8a6cff",
  },
  {
    icon: PaintBrush,
    title: "Build",
    body: "We design and build your site using Claude Code, GitHub, and Vercel. You see a live preview as we go.",
    accent: "#4d7cff",
  },
  {
    icon: RocketLaunch,
    title: "Launch",
    body: "You approve, pay the remaining 50%, and we point your domain. First 30 days of fixes are on us.",
    accent: "#27d7c4",
  },
];

export default function Process() {
  const reduce = useReducedMotion();

  return (
    <section id="process" className="py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-16 max-w-xl"
        >
          <h2 className="text-[clamp(2rem,5vw,3rem)] font-bold tracking-tight text-white leading-tight">
            Simple process,<br />fast results.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          {/* Connector line */}
          <div
            className="hidden md:block absolute top-6 left-[calc(16.66%+1rem)] right-[calc(16.66%+1rem)] h-px"
            style={{ background: "linear-gradient(90deg, #8a6cff, #4d7cff 52%, #27d7c4)", opacity: 0.25 }}
          />

          {steps.map((s, i) => (
            <motion.div
              key={s.title}
              initial={reduce ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: i * 0.15, ease: "easeOut" }}
              className="flex flex-col gap-4"
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center relative z-10 bg-white/[0.07] border border-white/[0.10]"
                style={{ color: s.accent }}
              >
                <s.icon size={22} weight="duotone" />
              </div>
              <div>
                <h3 className="text-[16px] font-semibold text-white mb-2">{s.title}</h3>
                <p className="text-[15px] text-white/55 leading-relaxed">{s.body}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Pricing callout */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
          className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <div className="rounded-2xl border border-white/[0.08] p-8 bg-white/[0.05]">
            <p
              className="text-[11px] uppercase tracking-[0.3em] mb-3"
              style={{ fontFamily: "var(--font-jetbrains-mono), monospace", color: "rgba(255,255,255,0.40)" }}
            >
              Build
            </p>
            <p className="text-3xl font-bold text-white mb-2">Custom quote</p>
            <p className="text-[14px] text-white/55">Priced per project. Paid 50/50. No surprises.</p>
          </div>
          <div className="rounded-2xl border border-[#8a6cff]/20 p-8 bg-[#8a6cff]/[0.07] relative overflow-hidden">
            {/* Prism accent */}
            <div className="aurora-gradient animate-aurora absolute top-0 right-0 w-32 h-32 blur-2xl opacity-20 rounded-bl-full" aria-hidden="true" />
            <p
              className="text-[11px] uppercase tracking-[0.3em] mb-3 relative"
              style={{ fontFamily: "var(--font-jetbrains-mono), monospace", color: "rgba(255,255,255,0.40)" }}
            >
              Monthly upkeep
            </p>
            <p className="text-3xl font-bold text-white mb-2 relative">From your brief</p>
            <p className="text-[14px] text-white/55 relative">Auto-billed monthly. Cancel anytime with 30 days notice.</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
