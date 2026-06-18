"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { projects } from "@/lib/projects";

const quotes = projects.filter((p) => p.quote);

export default function Testimonials() {
  const reduce = useReducedMotion();
  // Only animate hover on true pointer devices — avoids false-fire on touch
  const [canHover, setCanHover] = useState(false);
  useEffect(() => {
    setCanHover(window.matchMedia("(hover: hover) and (pointer: fine)").matches);
  }, []);

  return (
    <section className="py-20 px-6 border-t border-white/[0.08]" aria-label="Client testimonials">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <p
            className="text-[11px] uppercase tracking-[0.3em] mb-4"
            style={{ fontFamily: "var(--font-jetbrains-mono), monospace", color: "rgba(255,255,255,0.40)" }}
          >
            What clients say
          </p>
          <h2 className="text-[clamp(1.75rem,4vw,2.5rem)] font-bold tracking-tight leading-tight" style={{ color: "#ffffff" }}>
            Results speak louder<br className="hidden sm:block" /> than promises.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10" style={{ perspective: "1200px" }}>
          {quotes.map((p, i) => (
            <motion.div
              key={p.slug}
              initial={reduce ? false : { opacity: 0, y: 32, rotateX: 8, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
              whileHover={reduce || !canHover ? {} : { y: -6, scale: 1.02 }}
              viewport={{ once: true, amount: 0.1, margin: "-40px" }}
              transition={{ type: "spring", duration: 0.6, bounce: 0.15, delay: i * 0.1 }}
              className="flex flex-col gap-5"
              style={{ transformOrigin: "center bottom" }}
            >
              {/* Quote mark */}
              <div
                className="text-[2.5rem] leading-none font-serif select-none"
                style={{
                  background: "linear-gradient(90deg, #8a6cff, #4d7cff 52%, #27d7c4)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
                aria-hidden="true"
              >
                &ldquo;
              </div>

              <p
                className="text-[15px] leading-[1.7] flex-1"
                style={{ color: "rgba(255,255,255,0.72)" }}
              >
                {p.quote!.text}
              </p>

              <div className="pt-2 border-t border-white/[0.10]">
                <p className="text-[13px] font-semibold" style={{ color: "#ffffff" }}>
                  {p.quote!.author}
                </p>
                <p className="text-[12px] mt-0.5" style={{ color: "rgba(255,255,255,0.40)" }}>
                  {p.name} · {p.type}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
